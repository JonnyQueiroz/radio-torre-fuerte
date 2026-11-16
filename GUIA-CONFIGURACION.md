# ⚙️ Guía de Configuración — Radio Torre Fuerte

> Sigue estos pasos EN ORDEN. Cada paso tiene un enlace directo.

---

## ✅ PASO 1 — Crear cuenta en GitHub (para el sitio web GRATIS)

**🔗 Ir a:** https://github.com/signup *(abre en tu navegador personal — tiene CAPTCHA)*

1. Ingresa tu email
2. Crea una contraseña segura
3. Elige un nombre de usuario (ej: `iglesiatorreituerte` o `radiotorreifuerte`)
4. Verifica tu cuenta con el código que llega al email
5. Elige el plan **Free** (gratuito)

**Después de crear la cuenta:**
- Anota tu nombre de usuario de GitHub aquí: `torrefuerteconce-eng`
- Ve a `config/radio-config.js` y reemplaza `REEMPLAZAR_CON_TU_USUARIO` con ese usuario

---

## ✅ PASO 2 — Crear cuenta en Zeno.fm (para el stream de audio GRATIS)

**🔗 Ir a:** https://zeno.fm/signup/ → luego en https://tools.zeno.fm/

1. Regístrate con tu email
2. Confirma tu email
3. Una vez dentro, haz clic en **"Create Station"**
4. Nombre: `Radio Torre Fuerte`
5. Categoría: `Christian`
6. País: `Chile`
7. Después de crear la estación, ve a **"Listeners"** → copia la **Stream URL**
   - Se verá así: `https://stream.zeno.fm/abcdefgh123`

**Después de obtener el Stream URL:**
- Ve a `config/radio-config.js` y reemplaza `REEMPLAZAR_CON_TU_URL`

---

## ✅ PASO 3 — Crear cuenta en Formspree (para el formulario de oración GRATIS)

**🔗 Ir a:** https://formspree.io/register

1. Regístrate con tu email
2. Haz clic en **"+ New Form"**
3. Nombre del formulario: `Peticiones de Oración - Torre Fuerte`
4. Email de destino: (el email donde recibirás las peticiones)
5. Copia el **Form ID** (las letras y números al final, ej: `xpzgkwqr`)

**Después de obtener el Form ID:**
- Ve a `config/radio-config.js` y reemplaza `REEMPLAZAR_CON_TU_ID`

---

## ✅ PASO 4 — Publicar el sitio en GitHub Pages

### 4a. Instalar Git
**🔗 Descargar:** https://git-scm.com/download/win
- Instala con las opciones por defecto

### 4b. Crear el repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre del repositorio: `radio-torre-fuerte`
3. Visibilidad: **Public**
4. Haz clic en **Create repository**

### 4c. Subir los archivos del sitio
Abre **PowerShell** o **Git Bash** en la carpeta `H:\Web Radio Torre Fuerte\` y ejecuta:

```bash
git init
git add .
git commit -m "Lanzamiento inicial Radio Torre Fuerte"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/radio-torre-fuerte.git
git push -u origin main
```
*(Reemplaza `TU_USUARIO` con tu usuario de GitHub)*

### 4d. Activar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú izquierdo, clic en **Pages**
4. En "Source", selecciona **GitHub Actions**
5. ¡Tu sitio se publicará automáticamente!
6. URL del sitio: `https://TU_USUARIO.github.io/radio-torre-fuerte`

---

## ✅ PASO 5 — Configurar BUTT para transmitir en vivo

**🔗 Descargar BUTT:** https://danielnoethen.de/butt/

1. Instala BUTT (broadcast using this tool)
2. Abre BUTT → Settings → Server
3. Haz clic en **ADD**
4. Tipo de servidor: **Icecast**
5. Datos de conexión (los obtienes en Zeno.fm → Dashboard → "How to broadcast"):
   - **Address:** `upload.zeno.fm`
   - **Port:** `80`
   - **Password:** (tu contraseña de stream de Zeno.fm)
   - **Mount point:** (el mount point de tu estación)
6. Haz clic en **Save**

**Para transmitir:**
- Haz clic en el botón **PLAY** en BUTT
- El ícono se pondrá verde cuando estés conectado
- ¡Los oyentes escucharán tu voz en tiempo real!

---

## 📋 Checklist Final

- [ ] Cuenta GitHub creada
- [ ] Cuenta Zeno.fm creada y estación configurada
- [ ] Cuenta Formspree creada
- [ ] `config/radio-config.js` actualizado con todos los datos
- [ ] Repositorio creado en GitHub
- [ ] Archivos subidos con `git push`
- [ ] GitHub Pages activado
- [ ] BUTT instalado y configurado
- [ ] Primera transmisión de prueba realizada
- [ ] ¡Anunciar la radio en la iglesia! 🎉

---

## 🆘 ¿Necesitas ayuda?

Si tienes algún problema con alguno de estos pasos, describe el error al agente y te ayudará a resolverlo.

---
*Radio Torre Fuerte · Iglesia Bautista Torre Fuerte · Concepción, Chile*
