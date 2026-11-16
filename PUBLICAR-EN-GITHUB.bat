@echo off
chcp 65001 >nul
echo.
echo ╔══════════════════════════════════════════════════╗
echo ║   Radio Torre Fuerte — Publicar en GitHub Pages  ║
echo ╚══════════════════════════════════════════════════╝
echo.
echo Inicializando repositorio Git...
git init
git add .
git commit -m "Lanzamiento inicial - Radio Torre Fuerte"
git branch -M main
echo.
echo Conectando con GitHub...
git remote add origin https://github.com/JonnyQueiroz/radio-torre-fuerte.git
echo.
echo Subiendo archivos a GitHub...
git push -u origin main
echo.
echo ╔══════════════════════════════════════════════════╗
echo ║  ¡Listo! Tu sitio se publicará en:              ║
echo ║  https://JonnyQueiroz.github.io/                ║
echo ║            radio-torre-fuerte                   ║
echo ╚══════════════════════════════════════════════════╝
echo.
echo Ahora ve a GitHub ^> Settings ^> Pages ^> Source: GitHub Actions
pause
