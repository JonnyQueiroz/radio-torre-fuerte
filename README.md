# Radio Torre Fuerte — Sitio Web Oficial

> Web radio cristiana de la **Iglesia Bautista Torre Fuerte**, Concepción, Chile.  
> *"Transmitiendo la Palabra de Dios"*

---

## 📁 Estructura del Proyecto

```
Web Radio Torre Fuerte/
├── index.html          ← Página de inicio con reproductor en vivo
├── programacion.html   ← Tabla de programación semanal
├── predicaciones.html  ← Archivo de sermones
├── oracion.html        ← Formulario de petición de oración
├── contacto.html       ← Información de contacto y mapa
├── css/
│   └── style.css       ← Hoja de estilos completa
├── js/
│   └── main.js         ← JavaScript (reproductor, versículo, menú)
├── audio/              ← (Crear esta carpeta) Archivos MP3 de predicaciones
└── README.md           ← Este archivo
```

---

## 1. 🌐 Publicar en GitHub Pages (paso a paso)

### Requisitos previos
- Una cuenta gratuita en [GitHub](https://github.com)
- Git instalado en tu computador (opcional, puedes usar la interfaz web)

### Pasos

**Opción A — Interfaz Web (sin instalar Git):**

1. Entra a [github.com](https://github.com) e inicia sesión.
2. Haz clic en **"New repository"** (botón verde, arriba a la derecha).
3. Nómbralo: `radio-torre-fuerte` (o como prefieras).
4. Márcalo como **Public**.
5. Haz clic en **"Create repository"**.
6. En la página del repositorio vacío, haz clic en **"uploading an existing file"**.
7. Arrastra **todos los archivos y carpetas** del proyecto.
8. Haz clic en **"Commit changes"**.
9. Ve a **Settings → Pages** (en el menú lateral del repositorio).
10. En **"Source"**, selecciona la rama `main` y la carpeta `/ (root)`.
11. Haz clic en **Save**.
12. ¡Listo! En unos minutos tu sitio estará en:  
    `https://TU_USUARIO.github.io/radio-torre-fuerte/`

**Opción B — Con Git (línea de comandos):**

```bash
# 1. Entra a la carpeta del proyecto
cd "H:\Web Radio Torre Fuerte"

# 2. Inicializa Git
git init
git add .
git commit -m "Primer commit — sitio Radio Torre Fuerte"

# 3. Conecta con GitHub (reemplaza TU_USUARIO y el nombre del repo)
git remote add origin https://github.com/TU_USUARIO/radio-torre-fuerte.git
git branch -M main
git push -u origin main

# 4. Luego activa GitHub Pages en Settings → Pages del repositorio
```

---

## 2. 📻 Reemplazar el URL del Stream (Zeno.fm)

### Crear tu stream en Zeno.fm
1. Regístrate gratis en [zeno.fm](https://zeno.fm).
2. Crea una nueva emisora (Station).
3. En el panel de tu emisora, copia el **Stream URL**. Tiene el formato:  
   `https://stream.zeno.fm/abcde12345uv`

### Actualizar el sitio
Abre `index.html` y busca esta línea:

```html
<audio
  id="stream-audio"
  preload="none"
  data-src="https://stream.zeno.fm/XXXXXXXXX"
```

Reemplaza `XXXXXXXXX` con tu ID real de Zeno.fm:

```html
  data-src="https://stream.zeno.fm/abcde12345uv"
```

Guarda el archivo y vuelve a subir a GitHub Pages.

---

## 3. 🙏 Configurar Formspree (Formulario de Oración)

### Crear cuenta en Formspree
1. Ve a [formspree.io](https://formspree.io) y crea una cuenta gratuita.
2. Haz clic en **"+ New Form"**.
3. Ingresa el email donde recibirás las peticiones de oración.
4. Copia el **Form ID** (ej: `xpzgdvkb`).

### Actualizar el formulario
Abre `oracion.html` y busca:

```html
action="https://formspree.io/f/XXXXXXXX"
```

Reemplaza `XXXXXXXX` con tu Form ID real:

```html
action="https://formspree.io/f/xpzgdvkb"
```

> **Nota:** El plan gratuito de Formspree permite hasta 50 envíos por mes.

---

## 4. 🎙️ Agregar Nuevas Predicaciones

### Paso 1 — Preparar el audio
- Convierte el audio a **MP3** (calidad recomendada: 128 kbps).
- Nómbralo descriptivamente: `predicacion-07-fe-y-obras.mp3`.
- Colócalo en la carpeta `audio/` del proyecto.

### Paso 2 — Agregar la tarjeta en predicaciones.html
Copia este bloque y agrégalo dentro de `<div class="predicaciones-grid">`:

```html
<article class="predicacion-card fade-in" aria-labelledby="pred-7-title">
  <div class="card-thumb" aria-hidden="true">✝️</div>
  <div class="card-body">
    <div class="card-meta">
      <span class="badge">DD Mes AAAA</span>
      <span class="badge">XX min</span>
    </div>
    <h3 class="card-title" id="pred-7-title">
      Título del Sermón
    </h3>
    <p class="card-preacher">
      📖 Referencia Bíblica · Nombre del Predicador
    </p>
    <div class="mini-player">
      <button class="mini-play-btn" aria-label="Reproducir 'Título'">▶</button>
      <div class="mini-info">
        <span>Título del Sermón</span>
        <span>Predicador</span>
      </div>
      <audio preload="none" aria-hidden="true">
        <source src="audio/predicacion-07-fe-y-obras.mp3" type="audio/mpeg" />
      </audio>
    </div>
  </div>
</article>
```

Actualiza: fecha, duración, título, referencia bíblica, nombre del predicador y el `src` del audio.

> **Alternativa sin archivos locales:** Si tus audios están en YouTube o SoundCloud,  
> puedes enlazar directamente al video/pista en lugar de subir el MP3.

---

## 5. 🎚️ Transmitir con BUTT (Broadcast Using This Tool)

BUTT es una aplicación gratuita para transmitir audio desde tu computador a Zeno.fm.

### Instalación
1. Descarga BUTT desde [danielnoethen.de/butt](https://danielnoethen.de/butt/).
2. Instala normalmente.

### Configuración básica
1. Abre BUTT.
2. Ve a **Settings (Configuración)**.
3. En la pestaña **"Server"**, haz clic en **"Add"**.
4. Configura:
   - **Type:** Icecast
   - **Address:** (el servidor de Zeno.fm — ver panel de tu emisora)
   - **Port:** (el puerto de Zeno.fm)
   - **Password:** (tu contraseña de stream de Zeno.fm)
   - **Mount point / Stream ID:** (tu ID de Zeno.fm)
5. En **"Audio"**, selecciona tu **micrófono** o **mezcladora**.
6. Haz clic en **"►"** para comenzar a transmitir.

> **Consejo:** En el panel de Zeno.fm encontrarás los datos exactos del servidor  
> (host, port, password, mount point) listos para copiar en BUTT.

---

## 📝 Personalización adicional

| Elemento              | Archivo            | Qué buscar                        |
|-----------------------|--------------------|-----------------------------------|
| Dirección física      | `contacto.html`    | `Calle Ejemplo 1234`              |
| Teléfono              | Todos los archivos | `+56 41 234 5678`                 |
| Correo electrónico    | Todos los archivos | `radio@torrefuerte.cl`            |
| WhatsApp              | Todos los archivos | `wa.me/56912345678`               |
| Facebook URL          | `index.html`       | `facebook.com/TorreFuerte...`     |
| YouTube URL           | `index.html`       | `youtube.com/@TorreFuerte...`     |
| Mapa de Google Maps   | `contacto.html`    | Bloque `<!-- MAPA PLACEHOLDER -->` |
| Colores del sitio     | `css/style.css`    | Variables `:root { --color-... }` |
| Versículos del día    | `js/main.js`       | Array `VERSICULOS`                |
| Programación          | `js/main.js`       | Array `PROGRAMACION`              |

---

## ✅ Lista de verificación antes de publicar

- [ ] Reemplazar URL del stream en `index.html` (`data-src`)
- [ ] Configurar Formspree en `oracion.html` (action del form)
- [ ] Actualizar dirección real en `contacto.html`
- [ ] Actualizar teléfono real en todos los archivos
- [ ] Actualizar correo electrónico real en todos los archivos
- [ ] Actualizar URLs de Facebook y YouTube en `index.html`
- [ ] Actualizar número de WhatsApp en `index.html` y `contacto.html`
- [ ] Agregar iframe de Google Maps en `contacto.html`
- [ ] Crear carpeta `audio/` y agregar los MP3 de predicaciones
- [ ] Probar el sitio localmente antes de publicar

---

*Radio Torre Fuerte — Iglesia Bautista Torre Fuerte, Concepción, Chile*  
*Para la gloria de Dios*
