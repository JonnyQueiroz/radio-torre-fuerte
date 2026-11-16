# Guía de Instalación Completa — Sistema de Streaming Radio Torre Fuerte

> **Iglesia Bautista Torre Fuerte — Concepción, Chile**  
> Sistema de transmisión en vivo para cultos y programas

---

## Índice

1. [Instalar Icecast2 en Windows](#parte-1--instalar-icecast2-en-windows)
2. [Instalar y configurar BUTT](#parte-2--instalar-y-configurar-butt)
3. [Instalar Cloudflare Tunnel](#parte-3--instalar-cloudflare-tunnel-cloudflared)
4. [Actualizar el sitio web con la nueva URL](#parte-4--actualizar-el-sitio-web-con-la-nueva-url)
5. [Protocolo de transmisión en vivo](#parte-5--protocolo-de-transmisión-en-vivo)
6. [Solución de problemas comunes](#parte-6--solución-de-problemas-comunes)

---

## Parte 1 — Instalar Icecast2 en Windows

Icecast2 es el servidor que recibe el audio de BUTT y lo distribuye a todos los oyentes.

### Paso 1.1 — Descargar Icecast2

1. Abre tu navegador y ve a: **https://icecast.org/download/**
2. En la sección **"Windows"**, haz clic en el enlace del instalador `.exe` (por ejemplo `icecast2_win32_2.4.4.exe`).
3. Guarda el archivo en tu carpeta de Descargas.

### Paso 1.2 — Instalar Icecast2

1. Haz doble clic en el instalador descargado.
2. Si aparece una ventana de **Control de Cuentas de Usuario (UAC)**, haz clic en **"Sí"**.
3. En el asistente de instalación:
   - **Welcome**: clic en **Next**
   - **License Agreement**: selecciona *I Agree* → **Next**
   - **Choose Install Location**: deja la ruta por defecto `C:\Program Files\Icecast` → **Install**
   - **Completing**: deja marcada la opción de crear acceso directo si lo deseas → **Finish**
4. Icecast quedará instalado en `C:\Program Files\Icecast\`.

### Paso 1.3 — Copiar el archivo de configuración

El archivo `icecast.xml` de esta carpeta ya está configurado para Radio Torre Fuerte. Debes copiarlo a la carpeta de instalación para que Icecast lo encuentre cuando se inicie manualmente (el script `INICIAR-SERVIDOR.bat` siempre usará el de esta carpeta).

```
Origen:  H:\Web Radio Torre Fuerte\servidor-local\icecast.xml
Destino: C:\Program Files\Icecast\icecast.xml
```

> **Nota:** Puedes saltarte este paso si siempre inicias Icecast con el script `INICIAR-SERVIDOR.bat`, que usa el `icecast.xml` de esta carpeta directamente.

### Paso 1.4 — Verificar que Icecast funciona

1. Haz doble clic en `INICIAR-SERVIDOR.bat` (en esta misma carpeta).
2. Si todo está correcto, verás las URLs de acceso.
3. Abre Chrome y ve a: `http://localhost:8000`  
   Deberías ver la página de estado de Icecast.

---

## Parte 2 — Instalar y configurar BUTT

BUTT (**B**roadcast **U**sing **T**his **T**ool) es el programa que captura el audio del micrófono y lo envía al servidor Icecast.

### Paso 2.1 — Descargar BUTT

1. Ve a: **https://danielnoethen.de/butt/**
2. Descarga la versión para **Windows** (archivo `.exe`).
3. Instala normalmente (siguiente, siguiente, finalizar).

### Paso 2.2 — Configurar el servidor en BUTT

Una vez abierto BUTT:

1. Haz clic en el botón **"Settings"** (ícono de engranaje ⚙️).
2. Ve a la pestaña **"Main"** → sección **"Server"**.
3. Haz clic en **"Add"** para añadir un servidor nuevo.
4. Completa los campos exactamente así:

| Campo | Valor |
|-------|-------|
| **Type** | `Icecast` |
| **Address** | `localhost` |
| **Port** | `8000` |
| **Password** | `torrefuerte2024` |
| **Mount** | `/radio` |
| **Name** | `Radio Torre Fuerte` *(opcional)* |

5. Haz clic en **"Add"** para guardar.
6. Asegúrate de que el servidor recién creado esté seleccionado en la lista.

### Paso 2.3 — Configurar el micrófono

1. Ve a la pestaña **"Audio"** en Settings.
2. En **"Primary Audio Device"**, selecciona tu micrófono o mezcladora.
3. En **"Samplerate"** selecciona `44100 Hz`.
4. En **"Channel"** selecciona `Stereo` (o `Mono` si solo tienes un micrófono).
5. Ve a la pestaña **"Stream"**:
   - **Format**: `mp3`
   - **Bitrate**: `128 kBit/s`
6. Haz clic en **"OK"** para guardar todo.

### Paso 2.4 — Iniciar y detener transmisión

**Para iniciar:**
1. Asegúrate de que Icecast esté corriendo (`INICIAR-SERVIDOR.bat`).
2. En BUTT, haz clic en el botón **▶ (Play)**.
3. El indicador debe volverse **verde** y mostrar el tiempo de transmisión.

**Para detener:**
1. Haz clic en el botón **■ (Stop)** en BUTT.
2. Icecast sigue corriendo para el próximo servicio.

> **Consejo:** Siempre prueba la conexión 10 minutos antes del culto. Abre `http://localhost:8000/radio` en el navegador para escuchar y verificar.

---

## Parte 3 — Instalar Cloudflare Tunnel (cloudflared)

Cloudflare Tunnel crea un túnel seguro entre tu servidor local y los oyentes en internet, **sin necesidad de abrir puertos en el router** ni contratar un servidor.

### Opción A — Túnel rápido sin cuenta (Recomendado para comenzar)

Esta opción no requiere registro y genera una URL pública en segundos.

1. Descarga `cloudflared.exe` desde:  
   **https://github.com/cloudflare/cloudflared/releases/latest**  
   Busca el archivo `cloudflared-windows-amd64.exe`.

2. Renómbralo a `cloudflared.exe` y guárdalo en:  
   `H:\Web Radio Torre Fuerte\servidor-local\cloudflared.exe`

3. Abre una ventana de **Símbolo del sistema** (CMD) y ejecuta:

```cmd
cd /d "H:\Web Radio Torre Fuerte\servidor-local"
cloudflared tunnel --url http://localhost:8000
```

4. Espera unos segundos. Verás en pantalla algo como:

```
Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):
https://abc-123-def.trycloudflare.com
```

5. Esa URL es tu dirección pública. Úsala para que los oyentes escuchen:  
   `https://abc-123-def.trycloudflare.com/radio`

> ⚠️ **Importante:** La URL cambia cada vez que reinicias el comando. Para URL permanente, usa la Opción B.

---

### Opción B — Túnel permanente con cuenta Cloudflare

Esta opción requiere un dominio y una cuenta gratuita en Cloudflare.

#### Paso 3.1 — Crear cuenta en Cloudflare

1. Ve a: **https://dash.cloudflare.com/sign-up**
2. Regístrate con tu correo electrónico.
3. Sigue los pasos para agregar tu dominio `torrefuerte.cl` a Cloudflare.
4. Apunta los nameservers de tu dominio a los que Cloudflare te indique (en tu proveedor de dominio).

#### Paso 3.2 — Descargar cloudflared

1. Descarga `cloudflared.exe` desde:  
   **https://github.com/cloudflare/cloudflared/releases/latest**  
   Archivo: `cloudflared-windows-amd64.exe`
2. Renómbralo a `cloudflared.exe`.
3. Muévelo a: `C:\Windows\System32\cloudflared.exe`  
   *(Esto lo hace accesible desde cualquier terminal)*

#### Paso 3.3 — Autenticarse con Cloudflare

Abre **Símbolo del sistema como Administrador** y ejecuta:

```cmd
cloudflared tunnel login
```

Se abrirá el navegador. Inicia sesión con tu cuenta de Cloudflare y selecciona el dominio `torrefuerte.cl`. El archivo de credenciales se guardará automáticamente en:  
`C:\Users\USUARIO\.cloudflared\cert.pem`

#### Paso 3.4 — Crear el túnel

```cmd
cloudflared tunnel create radio-torre-fuerte
```

Esto genera un archivo de credenciales en:  
`C:\Users\USUARIO\.cloudflared\<UUID>.json`

Anota el UUID que aparece en pantalla.

#### Paso 3.5 — Crear registro DNS

```cmd
cloudflared tunnel route dns radio-torre-fuerte radio.torrefuerte.cl
```

Esto crea automáticamente un registro CNAME en Cloudflare para `radio.torrefuerte.cl`.

#### Paso 3.6 — Editar el archivo de configuración

Abre `cloudflare-config.yml` (en esta carpeta) y reemplaza `USUARIO` con tu nombre de usuario de Windows real.

#### Paso 3.7 — Iniciar el túnel permanente

```cmd
cloudflared tunnel --config "H:\Web Radio Torre Fuerte\servidor-local\cloudflare-config.yml" run
```

Ahora `https://radio.torrefuerte.cl` apunta a tu servidor Icecast local.

#### Paso 3.8 — Instalar el túnel como servicio de Windows (opcional)

Para que el túnel inicie automáticamente con Windows:

```cmd
cloudflared service install
```

---

## Parte 4 — Actualizar el sitio web con la nueva URL

Una vez que tengas tu URL pública (ya sea del Quick Tunnel o del túnel permanente), debes actualizar el reproductor en el sitio web.

### Paso 4.1 — Encontrar la línea del stream en index.html

Abre el archivo `H:\Web Radio Torre Fuerte\index.html` y busca la sección del reproductor de audio. Busca una línea similar a:

```html
<audio src="https://URL-ANTERIOR/radio" ...>
```

o en el JavaScript:

```javascript
const streamUrl = 'https://URL-ANTERIOR/radio';
```

### Paso 4.2 — Cambiar la URL

Reemplaza la URL anterior por tu nueva URL pública:

**Con Quick Tunnel (temporal):**
```html
<audio src="https://abc-123-def.trycloudflare.com/radio" controls>
```

**Con túnel permanente (recomendado):**
```html
<audio src="https://radio.torrefuerte.cl/radio" controls>
```

### Paso 4.3 — Publicar los cambios

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
git add index.html
git commit -m "Actualizar URL del stream de audio"
git push origin main
```

El sitio en GitHub Pages se actualizará automáticamente en 1-2 minutos.

---

## Parte 5 — Protocolo de transmisión en vivo

### Lista de verificación antes de cada culto o programa

Seguir estos pasos **15 minutos antes** del inicio:

---

**☐ Paso 1 — Encender el PC servidor**  
El PC de la radio debe estar encendido y conectado a internet.

---

**☐ Paso 2 — Iniciar el servidor Icecast**  
Haz doble clic en:
```
H:\Web Radio Torre Fuerte\servidor-local\INICIAR-SERVIDOR.bat
```
Verifica que aparezca el mensaje "SERVIDOR INICIADO CORRECTAMENTE".

---

**☐ Paso 3 — Verificar Icecast en el navegador**  
Abre Chrome y ve a: `http://localhost:8000`  
Debes ver la página de estado de Icecast sin errores.

---

**☐ Paso 4 — Iniciar Cloudflare Tunnel**  
Si usas Quick Tunnel, abre una terminal y ejecuta:
```cmd
cd /d "H:\Web Radio Torre Fuerte\servidor-local"
cloudflared tunnel --url http://localhost:8000
```
Anota la URL pública generada si cambió desde la última vez.

---

**☐ Paso 5 — Abrir BUTT**  
Abre el programa BUTT en el PC servidor.

---

**☐ Paso 6 — Verificar la conexión en BUTT**  
En BUTT, verifica que el servidor seleccionado sea `Radio Torre Fuerte` (localhost:8000).  
Haz clic en **▶** para conectar. El indicador debe volverse **verde**.

---

**☐ Paso 7 — Prueba de audio**  
Habla por el micrófono y verifica en BUTT que el medidor de nivel de audio se mueva.  
Desde otro dispositivo (celular con datos móviles), escucha la URL pública del stream para confirmar que llega correctamente.

---

**☐ Paso 8 — Iniciar transmisión oficial**  
Cuando el culto comience, el audio se transmite automáticamente (ya está conectado desde el Paso 6).

---

**☐ Paso 9 — Al terminar el culto**  
Haz clic en **■** en BUTT para detener la transmisión.  
**No cierres Icecast** — puede quedar corriendo para el próximo servicio.  
El Cloudflare Tunnel puede quedar activo también.

---

## Parte 6 — Solución de problemas comunes

### ❌ "BUTT no conecta" (indicator rojo o error de conexión)

**Causas y soluciones:**

1. **Icecast no está corriendo**  
   → Ejecuta `INICIAR-SERVIDOR.bat` y vuelve a intentar.

2. **Puerto o contraseña incorrectos en BUTT**  
   → Verifica en Settings de BUTT:  
   - Address: `localhost`  
   - Port: `8000`  
   - Password: `torrefuerte2024`  
   - Mount: `/radio`

3. **Firewall de Windows bloqueando el puerto**  
   → Abre el Firewall de Windows → "Permitir una aplicación" → Agrega `icecast.exe`.

---

### ❌ "Los oyentes no pueden escuchar desde internet"

**Causas y soluciones:**

1. **Cloudflare Tunnel no está activo**  
   → Verifica que la ventana de `cloudflared` esté abierta y mostrando "Connected".  
   → Reinicia el túnel si es necesario.

2. **La URL del stream en el sitio web está desactualizada**  
   → Si usas Quick Tunnel, la URL cambia cada vez. Actualiza `index.html` y haz push.  
   → Considera migrar al túnel permanente con dominio propio.

3. **BUTT no está transmitiendo**  
   → Verifica que el indicador en BUTT sea verde y el contador de tiempo esté avanzando.

---

### ❌ "Mucho delay (retardo) para los oyentes"

El delay de 10-30 segundos es **normal en streaming**. Para reducirlo:

1. En BUTT, ve a **Settings → Audio**:
   - Reduce el valor de **"Buffer"** (prueba con 50ms o menos).
   
2. En `icecast.xml`, el valor `<burst-size>65536</burst-size>` controla cuántos datos se envían al conectar. Redúcelo a `32768` para menos delay inicial.

3. Verifica la velocidad de subida de tu conexión a internet en: **https://www.speedtest.net/**  
   Para transmitir a 128kbps necesitas al menos **1 Mbps de subida**.

---

### ❌ "Icecast se cierra solo"

1. Verifica el log de errores en:  
   `H:\Web Radio Torre Fuerte\servidor-local\logs\icecast_error.log`

2. Puede ser un conflicto de puerto. Verifica que nada más use el puerto 8000:
   ```cmd
   netstat -ano | findstr :8000
   ```

3. Reinstala Icecast si el problema persiste.

---

### ❌ "El script INICIAR-SERVIDOR.bat dice que Icecast no está instalado"

1. Verifica que Icecast esté en `C:\Program Files\Icecast\icecast.exe`.
2. Si está en otra ruta, abre el .bat con el Bloc de notas y cambia la línea:
   ```bat
   set "ICECAST_DIR=C:\Program Files\Icecast"
   ```

---

*Última actualización: Noviembre 2026 — Radio Torre Fuerte*
