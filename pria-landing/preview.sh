#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-4173}"
HOST="${2:-0.0.0.0}"
LOCAL_URL="http://127.0.0.1:${PORT}/pria-landing/"

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "${SCRIPT_DIR}/.." && pwd)"
cd "$REPO_ROOT"

LAN_IP=""
if command -v hostname >/dev/null 2>&1; then
  LAN_IP="$(hostname -I 2>/dev/null | awk '{print $1}')"
fi

echo "[preview] serving host=${HOST} port=${PORT}"
echo "[preview] local  : ${LOCAL_URL}"
if [[ -n "$LAN_IP" ]]; then
  echo "[preview] network: http://${LAN_IP}:${PORT}/pria-landing/"
fi
echo "[preview] stop server: Ctrl+C"

# 브라우저 자동 열기 (가능한 환경에서)
(
  sleep 1

  # WSL에서는 powershell로 Windows 기본 브라우저를 여는 것이 가장 안정적
  if command -v powershell.exe >/dev/null 2>&1; then
    powershell.exe -NoProfile -Command "Start-Process '${LOCAL_URL}'" >/dev/null 2>&1 && exit 0
  fi

  # 그 외 환경은 Python webbrowser 사용
  python - "$LOCAL_URL" <<'PY'
import sys
import webbrowser

url = sys.argv[1]
opened = webbrowser.open(url, new=2)
print(f"[preview] browser_open={'ok' if opened else 'failed'} url={url}")
PY
) &

python -m http.server "$PORT" --bind "$HOST"
