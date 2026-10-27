r"""Gera as versões web das fotos do ensaio.

Lê os JPG originais de uma pasta fora do repositório, corrige a orientação pelo EXIF,
remove metadados, redimensiona para várias larguras e grava WebP e AVIF em `img/`,
mais um `img/manifest.json` com largura e altura de cada arquivo (para os atributos
width/height do HTML).

Uso:
    python scripts/otimizar_fotos.py --origem "C:\caminho\originais" [--so edu-27,edu-32]
                                     [--larguras 480,800,1200,1600] [--formatos webp,avif]
                                     [--destino img]

Requer Pillow (pip install pillow). AVIF precisa de Pillow 11.2 ou mais novo.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path

from PIL import Image, ImageOps, features

LARGURAS_PADRAO = (480, 800, 1200, 1600)
QUALIDADE = {"webp": 78, "avif": 60}


def _numero(nome: str) -> int:
    m = re.search(r"(\d+)", nome)
    return int(m.group(1)) if m else 0


def listar_origem(origem: Path, so: set[str] | None) -> list[Path]:
    arquivos = sorted(
        (p for p in origem.iterdir() if p.suffix.lower() in (".jpg", ".jpeg")),
        key=lambda p: _numero(p.stem),
    )
    if so:
        arquivos = [p for p in arquivos if p.stem in so]
        faltando = so - {p.stem for p in arquivos}
        if faltando:
            print(f"aviso: não achei na origem: {', '.join(sorted(faltando))}", file=sys.stderr)
    return arquivos


def abrir(caminho: Path, largura_maxima: int) -> Image.Image:
    im = Image.open(caminho)
    # Decodifica o JPEG já reduzido (rápido) mas nunca abaixo do dobro da maior largura pedida,
    # para o LANCZOS final ter material suficiente.
    im.draft("RGB", (largura_maxima * 2, largura_maxima * 2))
    im = ImageOps.exif_transpose(im.convert("RGB"))
    return im


def processar(caminho: Path, destino: Path, larguras: tuple[int, ...], formatos: tuple[str, ...]) -> dict:
    original = Image.open(caminho)
    orig_w, orig_h = ImageOps.exif_transpose(original).size
    original.close()

    im = abrir(caminho, max(larguras))
    entradas = {}
    for largura in larguras:
        if largura > orig_w:
            continue
        altura = round(orig_h * largura / orig_w)
        versao = im.resize((largura, altura), Image.LANCZOS)
        for fmt in formatos:
            saida = destino / f"{caminho.stem}-{largura}.{fmt}"
            if fmt == "webp":
                versao.save(saida, "WEBP", quality=QUALIDADE["webp"], method=6)
            elif fmt == "avif":
                versao.save(saida, "AVIF", quality=QUALIDADE["avif"], speed=4)
            else:
                raise SystemExit(f"formato desconhecido: {fmt}")
            tamanho = saida.stat().st_size
            entradas[saida.name] = {"largura": largura, "altura": altura, "bytes": tamanho}
            print(f"  {saida.name:<24} {largura}x{altura}  {tamanho/1024:7.0f} KB")
    return {"original": {"largura": orig_w, "altura": orig_h}, "arquivos": entradas}


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--origem", required=True, help="pasta com os JPG originais")
    ap.add_argument("--destino", default="img", help="pasta de saída (padrão: img)")
    ap.add_argument("--so", default="", help="lista separada por vírgula de nomes sem extensão, ex.: edu-27,edu-32")
    ap.add_argument("--larguras", default=",".join(map(str, LARGURAS_PADRAO)))
    ap.add_argument("--formatos", default="webp,avif")
    args = ap.parse_args()

    origem = Path(args.origem)
    if not origem.is_dir():
        raise SystemExit(f"origem não é uma pasta: {origem}")
    destino = Path(args.destino)
    destino.mkdir(parents=True, exist_ok=True)

    larguras = tuple(sorted({int(x) for x in args.larguras.split(",") if x.strip()}))
    formatos = tuple(f.strip().lower() for f in args.formatos.split(",") if f.strip())
    if "avif" in formatos and not features.check("avif"):
        print("aviso: este Pillow não grava AVIF; gerando só os outros formatos", file=sys.stderr)
        formatos = tuple(f for f in formatos if f != "avif")

    so = {s.strip() for s in args.so.split(",") if s.strip()} or None
    arquivos = listar_origem(origem, so)
    if not arquivos:
        raise SystemExit("nenhum JPG para processar")

    manifest_path = destino / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {}

    for caminho in arquivos:
        print(caminho.name)
        manifest[caminho.stem] = processar(caminho, destino, larguras, formatos)

    manifest = dict(sorted(manifest.items(), key=lambda kv: _numero(kv[0])))
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"manifest: {manifest_path} ({len(manifest)} fotos)")


if __name__ == "__main__":
    main()
