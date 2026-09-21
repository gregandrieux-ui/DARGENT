#!/usr/bin/env python3
"""xlsx de spécification -> src/data/spec.json (une entrée par future URL) + redirects.json.
Relancer après toute modification du classeur : python3 scripts/spec-to-json.py"""
import json, re, sys, pathlib
import openpyxl

ROOT = pathlib.Path(__file__).resolve().parent.parent
XLSX = ROOT / "specification-production-seo-dargent-thermique.xlsx"
OUT = ROOT / "src" / "data"
wb = openpyxl.load_workbook(XLSX, data_only=True)

def rows(sheet):
    ws = wb[sheet]
    it = ws.iter_rows(values_only=True)
    header = [str(h).strip() for h in next(it)]
    for r in it:
        if not any(c is not None for c in r):
            continue
        yield {header[i]: (r[i].strip() if isinstance(r[i], str) else r[i]) for i in range(len(header))}

KEY = {
    "ID": "id", "Priorité": "priority", "Statut": "status", "Future URL": "url",
    "Type de page": "type", "Objectif": "objective", "Audience": "audience",
    "Mot-clé principal": "keyword", "Validation du mot-clé": "keywordValidation",
    "Mots-clés secondaires": "secondaryKeywords", "Intention": "intent", "Zone ciblée": "area",
    "Title SEO": "title", "Meta description": "description", "H1": "h1",
    "Promesse principale": "promise", "Sections H2": "h2", "Contenu attendu": "content",
    "Preuves nécessaires": "proofs", "CTA principal": "cta", "CTA secondaire": "cta2",
    "Liens entrants": "inbound", "Liens sortants": "outbound", "Ancienne URL": "oldUrl",
    "Migration": "migration", "Justification": "justification", "Schema.org": "schema",
    "Données à confirmer": "toConfirm", "Responsable": "owner", "Critère de validation": "validation",
}
SPLIT = {"secondaryKeywords": ";", "h2": "·", "outbound": ";", "toConfirm": ";"}

pages = []
for r in rows("Spécifications"):
    p = {KEY[k]: v for k, v in r.items() if k in KEY}
    p["path"] = re.sub(r"^https://dargent-thermique\.fr", "", p["url"]) or "/"
    for k, sep in SPLIT.items():
        if p.get(k):
            p[k] = [s.strip() for s in str(p[k]).split(sep) if s.strip()]
    pages.append(p)

redirects = []
for r in rows("Redirections"):
    redirects.append({
        "order": r.get("Ordre"), "case": r.get("Type de cas"), "old": r.get("Ancienne URL"),
        "new": r.get("Nouvelle URL"), "status": r.get("Statut HTTP"), "check": r.get("Vérification nécessaire"),
    })

linking = list(rows("Maillage interne"))
toConfirm = list(rows("A confirmer"))
checklist = list(rows("Checklist"))

OUT.mkdir(parents=True, exist_ok=True)
(OUT / "spec.json").write_text(json.dumps({"pages": pages, "redirects": redirects, "linking": linking,
    "toConfirm": toConfirm, "checklist": checklist}, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"{len(pages)} pages, {len(redirects)} redirect rows -> {OUT/'spec.json'}")
