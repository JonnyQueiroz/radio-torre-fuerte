@echo off
chcp 65001 >nul
title Radio Torre Fuerte — Servidor Icecast

:: =============================================================================
::  INICIAR-SERVIDOR.bat
::  Radio Torre Fuerte — Iglesia Bautista Torre Fuerte, Concepción, Chile
::
::  Este script inicia el servidor de streaming Icecast2.
::  Ejecútalo cada vez que enciendas el PC antes de una transmisión.
:: =============================================================================

cls
color 0A

:: -----------------------------------------------------------------------------
:: BANNER ASCII
:: -----------------------------------------------------------------------------
echo.
echo  =====================================================================
echo.
echo    ██████╗  █████╗ ██████╗ ██╗ ██████╗     ████████╗ ██████╗ ██████╗
echo    ██╔══██╗██╔══██╗██╔══██╗██║██╔═══██╗       ██╔══╝██╔═══██╗██╔══██╗
echo    ██████╔╝███████║██║  ██║██║██║   ██║        ██║  ██║   ██║██████╔╝
echo    ██╔══██╗██╔══██║██║  ██║██║██║   ██║        ██║  ██║   ██║██╔══██╗
echo    ██║  ██║██║  ██║██████╔╝██║╚██████╔╝        ██║  ╚██████╔╝██║  ██║
echo    ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝ ╚═════╝         ╚═╝   ╚═════╝ ╚═╝  ╚═╝
echo.
echo     ███████╗██╗   ██╗███████╗██████╗ ████████╗███████╗
echo     ██╔════╝██║   ██║██╔════╝██╔══██╗╚══██╔══╝██╔════╝
echo     █████╗  ██║   ██║█████╗  ██████╔╝   ██║   █████╗
echo     ██╔══╝  ██║   ██║██╔══╝  ██╔══██╗   ██║   ██╔══╝
echo     ██║     ╚██████╔╝███████╗██║  ██║   ██║   ███████╗
echo     ╚═╝      ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
echo.
echo       Iglesia Bautista Torre Fuerte — Concepción, Chile
echo.
echo  =====================================================================
echo.

:: -----------------------------------------------------------------------------
:: VERIFICAR QUE ICECAST ESTÁ INSTALADO
:: -----------------------------------------------------------------------------
echo  [1/3] Verificando instalación de Icecast2...

set "ICECAST_DIR=C:\Program Files\Icecast"
set "ICECAST_EXE=%ICECAST_DIR%\icecast.exe"
set "CONFIG_FILE=%~dp0icecast.xml"

if not exist "%ICECAST_EXE%" (
    color 0C
    echo.
    echo  ╔══════════════════════════════════════════════════════════════╗
    echo  ║   ERROR: Icecast2 no está instalado en:                      ║
    echo  ║   %ICECAST_DIR%
    echo  ║                                                              ║
    echo  ║   Descárgalo desde: https://icecast.org/download/            ║
    echo  ║   Luego ejecuta este script nuevamente.                      ║
    echo  ╚══════════════════════════════════════════════════════════════╝
    echo.
    goto :FIN
)

echo  [OK] Icecast2 encontrado en: %ICECAST_DIR%
echo.

:: -----------------------------------------------------------------------------
:: VERIFICAR QUE EL ARCHIVO DE CONFIGURACIÓN EXISTE
:: -----------------------------------------------------------------------------
echo  [2/3] Verificando archivo de configuración...

if not exist "%CONFIG_FILE%" (
    color 0C
    echo.
    echo  ╔══════════════════════════════════════════════════════════════╗
    echo  ║   ERROR: No se encontró icecast.xml en esta carpeta.         ║
    echo  ║   Asegúrate de que icecast.xml esté en la misma carpeta      ║
    echo  ║   que este script .bat                                       ║
    echo  ╚══════════════════════════════════════════════════════════════╝
    echo.
    goto :FIN
)

echo  [OK] Configuración encontrada: %CONFIG_FILE%
echo.

:: -----------------------------------------------------------------------------
:: INICIAR ICECAST
:: -----------------------------------------------------------------------------
echo  [3/3] Iniciando servidor Icecast2...
echo.

start "" "%ICECAST_EXE%" -c "%CONFIG_FILE%"

:: Esperar 2 segundos para que el servidor arranque
timeout /t 2 /nobreak >nul

:: -----------------------------------------------------------------------------
:: MOSTRAR INFORMACIÓN DE ACCESO
:: -----------------------------------------------------------------------------
echo  =====================================================================
echo.
echo   SERVIDOR INICIADO CORRECTAMENTE
echo.
echo   URL del stream (para oyentes):
echo     http://localhost:8000/radio
echo.
echo   Panel de administración:
echo     http://localhost:8000/admin
echo     Usuario: admin
echo     Contraseña: admin_torre2024
echo.
echo   Para abrir el panel admin en el navegador, escribe:
echo     start http://localhost:8000/admin
echo   y presiona ENTER, o pega la URL directamente en Chrome/Firefox.
echo.
echo  =====================================================================
echo.
echo   PRÓXIMOS PASOS:
echo   1. Abre BUTT (broadcast using this tool)
echo   2. Verifica que BUTT conecte al servidor
echo   3. Cuando estés listo, presiona PLAY en BUTT para transmitir
echo.
echo   Para detener el servidor, cierra la ventana de Icecast
echo   o usa el panel de administración.
echo.
echo  =====================================================================
echo.

:FIN
echo  Presiona cualquier tecla para salir de este script...
echo  (El servidor Icecast sigue corriendo en segundo plano)
pause >nul
