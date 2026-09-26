#!/usr/bin/env bash
set -u

HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:3000/health}"
STATE_DIR="/var/lib/practica7-monitor"
STATE_FILE="${STATE_DIR}/state"
CURRENT_STATE="down"

mkdir -p "${STATE_DIR}"

if curl --silent --show-error --fail --max-time 8 "${HEALTH_URL}" >/dev/null; then
  CURRENT_STATE="up"
fi

PREVIOUS_STATE="unknown"
if [[ -f "${STATE_FILE}" ]]; then
  PREVIOUS_STATE="$(<"${STATE_FILE}")"
fi

if [[ "${CURRENT_STATE}" != "${PREVIOUS_STATE}" ]]; then
  if [[ "${CURRENT_STATE}" == "up" ]]; then
    MESSAGE="✅ API Práctica 7 disponible en AWS EC2 (${HEALTH_URL})"
  else
    MESSAGE="🚨 API Práctica 7 no responde en AWS EC2 (${HEALTH_URL})"
  fi

  PAYLOAD="$(printf '{"username":"Monitor Práctica 7","content":"%s"}' "${MESSAGE}")"
  curl --silent --show-error --fail --max-time 10 \
    -H 'Content-Type: application/json' \
    -d "${PAYLOAD}" \
    "${DISCORD_WEBHOOK_URL}" >/dev/null
fi

printf '%s\n' "${CURRENT_STATE}" >"${STATE_FILE}"
