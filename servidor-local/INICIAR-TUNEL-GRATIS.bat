@echo off
chcp 65001 >nul
title Radio Torre Fuerte — Túnel Público Gratuito (Cloudflare)
cls
color 0B
echo.
echo =====================================================================
echo    RADIO TORRE FUERTE — ACTIVANDO TUNEL PUBLICO GRATUITO
echo    Iglesia Bautista Torre Fuerte · Concepción, Chile
echo =====================================================================
echo.
echo  Conectando tu Icecast local (puerto 8000) a Internet de forma segura...
echo.
echo  NOTA:
echo  En unos segundos verás una línea con tu URL pública gratuita:
echo  Ejemplo: https://xxxx-xxxx.trycloudflare.com
echo.
echo  El enlace público de tu radio será:
echo  https://xxxx-xxxx.trycloudflare.com/radio
echo.
echo =====================================================================
echo.

"%~dp0cloudflared.exe" tunnel --url http://localhost:8000
pause
