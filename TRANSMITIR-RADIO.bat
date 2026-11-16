@echo off
chcp 65001 >nul
title Radio Torre Fuerte — Panel de Transmisión
color 0B
cls

echo.
echo ==============================================================================
echo              📻 RADIO TORRE FUERTE — LANZADOR TODO EN UNO
echo            Iglesia Bautista Torre Fuerte · Concepción, Chile
echo ==============================================================================
echo.

set "SCRIPT_DIR=%~dp0"
set "ICECAST_DIR=C:\Program Files\Icecast"
set "ICECAST_EXE=%ICECAST_DIR%\icecast.exe"
set "BUTT_EXE=%LOCALAPPDATA%\butt\butt.exe"
set "CONFIG_XML=%SCRIPT_DIR%servidor-local\icecast.xml"
set "CLOUDFLARED=%SCRIPT_DIR%servidor-local\cloudflared.exe"

:: -----------------------------------------------------------------------------
:: PASO 1: VERIFICAR E INSTALAR ICECAST SI ES LA PRIMERA VEZ
:: -----------------------------------------------------------------------------
if not exist "%ICECAST_EXE%" (
    echo [1/4] Icecast no está instalado todavía.
    echo       Abriendo instalador automático de Icecast...
    echo.
    echo   👉 IMPORTANTE: En la ventana que aparece, haz clic en:
    echo      "Next" (Siguiente) -> "Install" (Instalar) -> "Finish" (Finalizar)
    echo.
    if exist "%SCRIPT_DIR%servidor-local\instaladores\icecast_win64_2.5.0.exe" (
        start /wait "" "%SCRIPT_DIR%servidor-local\instaladores\icecast_win64_2.5.0.exe"
    ) else (
        start /wait "" "%SCRIPT_DIR%servidor-local\instaladores\icecast_installer.exe"
    )
    echo.
    echo   Verificando instalación...
    timeout /t 2 >nul
)

if not exist "%ICECAST_EXE%" (
    echo.
    echo ❌ No se detectó la instalación de Icecast en C:\Program Files\Icecast
    echo    Por favor ejecuta el instalador que está en:
    echo    %SCRIPT_DIR%servidor-local\instaladores\icecast_win64_2.5.0.exe
    echo.
    pause
    exit /b 1
)

echo  ✅ [1/4] Servidor Icecast detectado correctamente.

:: -----------------------------------------------------------------------------
:: PASO 2: INICIAR EL SERVIDOR ICECAST LOCAL
:: -----------------------------------------------------------------------------
echo  ⏳ [2/4] Iniciando Servidor Icecast local (puerto 8000)...

:: Crear carpeta de logs si no existe
if not exist "%SCRIPT_DIR%servidor-local\logs" mkdir "%SCRIPT_DIR%servidor-local\logs"

:: Iniciar Icecast minimizado o en segundo plano
start "Icecast-RadioTorreFuerte" /min "%ICECAST_EXE%" -c "%CONFIG_XML%"
timeout /t 2 >nul
echo  ✅ [2/4] Servidor Icecast transmitiendo en localhost:8000/radio

:: -----------------------------------------------------------------------------
:: PASO 3: INICIAR EL TÚNEL SEGURO DE CLOUDFLARE A INTERNET
:: -----------------------------------------------------------------------------
echo  ⏳ [3/4] Conectando tu radio a Internet de forma segura y gratuita...

if exist "%CLOUDFLARED%" (
    start "Tunel-Cloudflare-Radio" /min cmd /c ""%CLOUDFLARED%" tunnel --url http://localhost:8000 > "%TEMP%\cloudflare_radio.log" 2>&1"
    echo  ✅ [3/4] Túnel de Internet activado en segundo plano.
) else (
    echo  ⚠️  No se encontró cloudflared.exe en servidor-local. Solo transmisión local activa.
)

:: -----------------------------------------------------------------------------
:: PASO 4: ABRIR BUTT (YA CONFIGURADO)
:: -----------------------------------------------------------------------------
echo  ⏳ [4/4] Abriendo BUTT para transmisión de audio...
if exist "%BUTT_EXE%" (
    start "" "%BUTT_EXE%"
    echo  ✅ [4/4] BUTT abierto y listo.
) else (
    echo  ⚠️  BUTT no encontrado en %BUTT_EXE%. Ábrelo desde tu escritorio.
)

:: -----------------------------------------------------------------------------
:: PANEL PRINCIPAL Y MONITOREO
:: -----------------------------------------------------------------------------
cls
color 0A
echo.
echo ==============================================================================
echo             🎉 ¡RADIO TORRE FUERTE ESTÁ LISTA PARA TRANSMITIR!
echo ==============================================================================
echo.
echo   📌 ESTADO DE LOS SERVICIOS:
echo   ----------------------------------------------------------------------------
echo   [●] Servidor Local Icecast:   ACTIVO en http://localhost:8000/radio
echo   [●] Panel de Administración:  http://localhost:8000/admin (User: admin)
echo   [●] BUTT Emisor de Micrófono: INICIADO (Perfil: Radio Torre Fuerte)
echo   [●] Túnel de Internet:        CONECTANDO A CLOUDFLARE...
echo   ----------------------------------------------------------------------------
echo.
echo   🎙️ INSTRUCCIONES PARA TRANSMITIR:
echo   1. En la ventana de BUTT, haz clic en el botón ▶ (Play).
echo   2. El botón se pondrá en color y tu voz ya estará saliendo al aire.
echo.
echo   🌐 TU SITIO WEB OFICIAL:
echo      https://jonnyqueiroz.github.io/radio-torre-fuerte/
echo.
echo ==============================================================================
echo   ⚠️ Deja esta ventana abierta mientras dure el culto o programa.
echo   Para cerrar la radio y apagar el servidor, presiona cualquier tecla.
echo ==============================================================================
echo.

pause >nul

echo.
echo Deteniendo servicios de la radio...
taskkill /F /FI "WINDOWTITLE eq Icecast-RadioTorreFuerte*" >nul 2>&1
taskkill /F /IM cloudflared.exe >nul 2>&1
echo Todo detenido correctamente. ¡Dios te bendiga!
timeout /t 2 >nul
