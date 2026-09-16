#!/usr/bin/env bash
# =============================================================
#  Setup Git + push Xyverse ke GitHub (xykalnotkel)
#  Jalankan:  bash push.sh
#
#  PENTING: rotasi dulu semua kunci di uploads/kuncikerjasama.txt
#  sebelum menjalankan ini. Skrip ini butuh token GitHub BARU.
# =============================================================
set -euo pipefail

REPO="xyverse-web"
USER="xykalnotkel"
VISIBILITAS="private"   # ganti ke "public" kalau mau terbuka

biru()  { printf "\033[1;34m%s\033[0m\n" "$*"; }
hijau() { printf "\033[1;32m%s\033[0m\n" "$*"; }
merah() { printf "\033[1;31m%s\033[0m\n" "$*"; }

cd "$(dirname "$0")"

# ---------- 1. Jaring pengaman: pastikan tidak ada rahasia ----------
biru "==> Memeriksa rahasia yang tidak sengaja ikut..."
if [ ! -f .gitignore ]; then
  merah "!! .gitignore tidak ada. Berhenti."
  exit 1
fi

POLA='sk_live|re_[A-Za-z0-9]{20,}|ghp_|github_pat_|AIza[0-9A-Za-z_-]{30,}|CLOUDINARY_URL'
BOCOR=$(grep -rIl -E "$POLA" \
  --exclude-dir={node_modules,dist,.git,.astro} \
  --exclude=push.sh --exclude=.gitignore . 2>/dev/null || true)
if [ -n "$BOCOR" ]; then
  merah "!! Pola mirip kredensial ditemukan di:"
  echo "$BOCOR"
  merah "   Bersihkan dulu, lalu jalankan ulang."
  exit 1
fi
hijau "    Bersih."

# ---------- 2. Inisialisasi repo ----------
if [ ! -d .git ]; then
  biru "==> git init"
  git init -b main
else
  biru "==> Repo Git sudah ada, dilanjutkan"
  git checkout -B main
fi

# Identitas lokal, hanya untuk repo ini
git config user.name  "$(git config --global user.name  || echo 'Kal')"
git config user.email "$(git config --global user.email || echo 'halo@xyverse.my.id')"

# ---------- 3. Commit ----------
biru "==> Menyiapkan commit"
git add -A
if git diff --cached --quiet; then
  biru "    Tidak ada perubahan untuk di-commit."
else
  git commit -m "Xyverse: situs Astro — Cloud PC, aplikasi, legal, SEO"
  hijau "    Commit dibuat."
fi

# ---------- 4. Buat repo & push ----------
if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  biru "==> Memakai GitHub CLI"
  if gh repo view "$USER/$REPO" >/dev/null 2>&1; then
    git remote get-url origin >/dev/null 2>&1 || \
      git remote add origin "https://github.com/$USER/$REPO.git"
  else
    gh repo create "$USER/$REPO" --"$VISIBILITAS" --source=. --remote=origin \
      --description "Situs resmi Xyverse — sewa Cloud PC, produksi apps & software"
  fi
  git push -u origin main
else
  biru "==> GitHub CLI tidak tersedia / belum login."
  echo
  echo "    Pilihan A (disarankan) — pasang & login gh:"
  echo "        gh auth login"
  echo "        bash push.sh"
  echo
  echo "    Pilihan B — manual:"
  echo "        1) Buat repo kosong di https://github.com/new"
  echo "           nama: $REPO   pemilik: $USER   JANGAN centang README"
  echo "        2) git remote add origin https://github.com/$USER/$REPO.git"
  echo "        3) git push -u origin main"
  echo
  exit 0
fi

hijau "==> Selesai: https://github.com/$USER/$REPO"
echo
echo "Langkah lanjutan yang disarankan:"
echo "  • Settings › Secrets: simpan kunci di sana, bukan di dalam kode"
echo "  • Settings › Code security: aktifkan Secret scanning + Push protection"
echo "  • Deploy: hubungkan ke Vercel/Netlify/Cloudflare Pages (build: npm run build, output: dist)"
