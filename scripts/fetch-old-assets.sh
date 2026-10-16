#!/usr/bin/env bash
# Downloads the reusable assets of the old site into public/.
# Product and realisation photos are no longer fetched: they are archived in Photo_Produits/ (not served).
set -euo pipefail
cd "$(dirname "$0")/.."
B="https://www.climatisation-chauffage-orleans.com"
UA="Mozilla/5.0 (dargent-thermique migration)"
get() { # get <old path> <new path>
  mkdir -p "$(dirname "public/$2")"
  if [ ! -s "public/$2" ]; then curl -sfL -A "$UA" -o "public/$2" "$B/$1" || echo "MISSING $1"; fi
}
# Logos, favicon
get assets/img/logo-couleur.png logo.png
get climatisation-chauffage.ico favicon.ico
# Qualifications
for f in logo-qualibat.jpg logo-professionnels-du-gaz.jpg RGE.png attestation-manipulation-fluides-frigorigenes.jpg ecologic.png; do get "assets/img/$f" "images/qualifications/$f"; done
# Partenaires
for f in GRDF.jpg atlantic-fujitsu.jpg chappee.jpg daikin.jpg frisquet.jpg mitsubishi-electric.jpg vaillant.jpg; do get "assets/img/partenaires/$f" "images/partenaires/$f"; done
# Clients (chemins relevés sur /references/clients/)
while read -r p; do get "assets/img/clients/$p" "images/clients/$p"; done <<'LIST'
assurances/logo-GMF.jpg
assurances/logo-MAE.jpg
assurances/logo-MMA.jpg
assurances/logo-matmut.jpg
assurances/logo-mutame.jpg
banques/logo-BNP-paribas.jpg
banques/logo-banque-populaire.png
banques/logo-caisse-d-epargne.png
boutiques/logo-MIM.jpg
boutiques/logo-Saint-Maclou.jpg
boutiques/logo-Swarovski.jpg
boutiques/logo-bizzbee.jpg
boutiques/logo-bonobo.jpg
boutiques/logo-cache-cache.jpg
boutiques/logo-carefil.jpg
boutiques/logo-chauss-expo.jpg
boutiques/logo-gemo.jpg
boutiques/logo-jennyfer.jpg
boutiques/logo-keria.jpg
boutiques/logo-opticien-krys.png
boutiques/logo-paraboot.jpg
boutiques/logo-patrice-breal.jpg
boutiques/logo-sfr.jpg
boutiques/logo-yves-rocher.jpg
collectivites/logo-creche-fay-aux-loges.jpg
grand-tertiaire/Logo-Kverneland.jpg
grand-tertiaire/logo-baudin-chateauneuf.jpg
grand-tertiaire/logo-gam-ingenierie.jpg
grand-tertiaire/logo-gemey-maybelline.jpg
grand-tertiaire/logo-kuehne-nagel.jpg
grand-tertiaire/logo-partnaire.jpg
grand-tertiaire/logo-schenker-joyau.jpg
hotels-restaurants/logo-buffalo.jpg
hotels-restaurants/logo-courtepaille.jpg
industrie/logo-Novartis.jpg
industrie/logo-guinault.jpg
industrie/logo-iris-instruments.jpg
industrie/logo-servier.jpg
tertiaire-divers/logo-Gamaf.jpg
tertiaire-divers/logo-adecco.jpg
tertiaire-divers/logo-cars-dunois.jpg
tertiaire-divers/logo-clemessy.jpg
tertiaire-divers/logo-croixalmetal.jpg
tertiaire-divers/logo-croixmarie.jpg
tertiaire-divers/logo-elephant-bleu.jpg
tertiaire-divers/logo-ets-cornet.jpg
tertiaire-divers/logo-vergnet.jpg
LIST
# Documents et vidéos
for f in attestation-de-capacite.pdf brochure-living.pdf brochure-living-connect.pdf brochure-living-eco.pdf brochure-rehau-plancher-chauffant-rafraichissant.pdf brochure-rehau-regulation-multizone.pdf; do get "assets/pdf/$f" "documents/$f"; done
for f in video-1.mp4 video-3.mp4 video-4.mp4; do get "assets/videos/$f" "videos/$f"; done
echo "done: $(find public -type f | wc -l) files in public/"
