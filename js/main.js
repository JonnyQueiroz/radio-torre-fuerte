/**
 * Radio Torre Fuerte — JavaScript Principal
 * Iglesia Bautista Torre Fuerte, Concepción, Chile
 */

'use strict';

/* ============================================================
   VERSÍCULOS DEL DÍA
   ============================================================ */
const VERSICULOS = [
  {
    texto: '«Porque yo sé los planes que tengo para vosotros —declara el Señor— planes de bienestar y no de calamidad, para daros un futuro y una esperanza.»',
    ref:   'Jeremías 29:11'
  },
  {
    texto: '«El Señor es mi pastor; nada me faltará.»',
    ref:   'Salmos 23:1'
  },
  {
    texto: '«Todo lo puedo en Cristo que me fortalece.»',
    ref:   'Filipenses 4:13'
  },
  {
    texto: '«El Señor es mi luz y mi salvación; ¿a quién temeré? El Señor es la fortaleza de mi vida; ¿de quién me atemorizaré?»',
    ref:   'Salmos 27:1'
  },
  {
    texto: '«Fíate del Señor con todo tu corazón, y no te apoyes en tu propia prudencia; reconócelo en todos tus caminos, y él enderezará tus sendas.»',
    ref:   'Proverbios 3:5-6'
  },
  {
    texto: '«No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.»',
    ref:   'Isaías 41:10'
  },
  {
    texto: '«Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.»',
    ref:   'Juan 3:16'
  },
  {
    texto: '«Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.»',
    ref:   '1 Pedro 5:7'
  },
  {
    texto: '«Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.»',
    ref:   'Mateo 6:33'
  },
  {
    texto: '«El nombre del Señor es torre fuerte; a él corre el justo y está seguro.»',
    ref:   'Proverbios 18:10'
  }
];

/**
 * Muestra el versículo del día.
 * Usa la fecha como semilla para que sea consistente durante todo el día.
 */
function mostrarVersiculoDelDia() {
  const hoy   = new Date();
  const seed  = hoy.getFullYear() * 10000 + (hoy.getMonth() + 1) * 100 + hoy.getDate();
  const idx   = seed % VERSICULOS.length;
  const v     = VERSICULOS[idx];

  const textoEl = document.getElementById('versiculo-texto');
  const refEl   = document.getElementById('versiculo-ref');

  if (textoEl) textoEl.textContent = v.texto;
  if (refEl)   refEl.textContent   = '— ' + v.ref;
}

/* ============================================================
   MENÚ HAMBURGER (MÓVIL)
   ============================================================ */
function initHamburger() {
  const btn     = document.getElementById('hamburger-btn');
  const menu    = document.getElementById('nav-menu');
  const overlay = document.getElementById('nav-overlay');

  if (!btn || !menu) return;

  function abrir() {
    btn.classList.add('open');
    menu.classList.add('open');
    overlay && overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    btn.setAttribute('aria-expanded', 'true');
  }

  function cerrar() {
    btn.classList.remove('open');
    menu.classList.remove('open');
    overlay && overlay.classList.remove('open');
    document.body.style.overflow = '';
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', () => {
    if (menu.classList.contains('open')) cerrar();
    else abrir();
  });

  overlay && overlay.addEventListener('click', cerrar);

  // Cerrar al seleccionar un link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', cerrar);
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrar();
  });
}

/* ============================================================
   REPRODUCTOR DE AUDIO EN VIVO
   ============================================================ */
let estaReproduciendo = false;

function initPlayer() {
  const audio    = document.getElementById('stream-audio');
  const btnPlay  = document.getElementById('btn-play');
  const volSlide = document.getElementById('volume-slider');
  const statusEl = document.getElementById('player-status');
  const dotEl    = document.getElementById('vivo-dot');

  if (!audio || !btnPlay) return;

  // Volumen inicial
  audio.volume = volSlide ? parseFloat(volSlide.value) : 0.8;

  btnPlay.addEventListener('click', () => {
    if (estaReproduciendo) {
      audio.pause();
      audio.src = '';                     // liberar la conexión
      estaReproduciendo = false;
      actualizarBoton(false);
    } else {
      // Reasignar src para reconectar al stream
      const src = audio.dataset.src || audio.getAttribute('data-src');
      if (src) audio.src = src;
      audio.play()
        .then(() => {
          estaReproduciendo = true;
          actualizarBoton(true);
        })
        .catch((err) => {
          console.warn('Error al reproducir stream:', err);
          mostrarOffline();
        });
    }
  });

  if (volSlide) {
    volSlide.addEventListener('input', () => {
      audio.volume = parseFloat(volSlide.value);
    });
  }

  audio.addEventListener('error', () => {
    estaReproduciendo = false;
    actualizarBoton(false);
    mostrarOffline();
  });

  audio.addEventListener('playing', () => {
    estaReproduciendo = true;
    actualizarBoton(true);
    mostrarEnVivo();
  });

  audio.addEventListener('pause', () => {
    estaReproduciendo = false;
    actualizarBoton(false);
  });

  /**
   * Verifica periódicamente si el stream está disponible
   * haciendo una petición HEAD al URL.
   */
  function verificarStream() {
    const src = audio.dataset.src || audio.getAttribute('data-src') || '';
    if (!src || src.includes('XXXXXXXXX')) {
      // Placeholder — no intentar conectar
      mostrarPlaceholder();
      return;
    }
    // Intentar verificar con fetch (puede fallar por CORS, es informativo)
    fetch(src, { method: 'HEAD', mode: 'no-cors' })
      .then(() => { if (!estaReproduciendo) mostrarEnVivo(); })
      .catch(() => { if (!estaReproduciendo) mostrarOffline(); });
  }

  // Comprobar al inicio y cada 60 s
  setTimeout(verificarStream, 1500);
  setInterval(verificarStream, 60000);
}

function actualizarBoton(playing) {
  const btn = document.getElementById('btn-play');
  if (!btn) return;
  btn.setAttribute('aria-label', playing ? 'Pausar' : 'Reproducir');
  btn.textContent = playing ? '⏸' : '▶';
}

function mostrarEnVivo() {
  const el  = document.getElementById('player-status');
  const dot = document.getElementById('vivo-dot');
  if (!el) return;
  el.innerHTML = '';
  if (dot) {
    dot.style.display = 'inline-block';
    el.appendChild(dot);
  }
  const span = document.createElement('span');
  span.className = 'vivo-label';
  span.textContent = 'EN VIVO';
  el.appendChild(span);
}

function mostrarOffline() {
  const el  = document.getElementById('player-status');
  const dot = document.getElementById('vivo-dot');
  if (!el) return;
  el.innerHTML = '';
  if (dot) dot.style.display = 'none';
  const span = document.createElement('span');
  span.className = 'offline-label';
  span.textContent = '⏸ FUERA DEL AIRE';
  el.appendChild(span);
}

function mostrarPlaceholder() {
  const el  = document.getElementById('player-status');
  const dot = document.getElementById('vivo-dot');
  if (!el) return;
  el.innerHTML = '';
  if (dot) { dot.style.display = 'inline-block'; el.appendChild(dot); }
  const span = document.createElement('span');
  span.className = 'vivo-label';
  span.textContent = 'EN VIVO';
  el.appendChild(span);
}

/* ============================================================
   MINI REPRODUCTORES DE PREDICACIONES
   ============================================================ */
function initMiniPlayers() {
  document.querySelectorAll('.mini-play-btn').forEach(btn => {
    const audioEl = btn.closest('.mini-player')?.querySelector('audio');
    if (!audioEl) return;

    btn.addEventListener('click', () => {
      if (audioEl.paused) {
        // Pausar otros mini reproductores
        document.querySelectorAll('.mini-player audio').forEach(a => {
          if (a !== audioEl) { a.pause(); a.currentTime = 0; }
        });
        document.querySelectorAll('.mini-play-btn').forEach(b => { b.textContent = '▶'; });
        audioEl.play();
        btn.textContent = '⏸';
      } else {
        audioEl.pause();
        btn.textContent = '▶';
      }
    });

    audioEl.addEventListener('ended', () => { btn.textContent = '▶'; });
  });
}

/* ============================================================
   AÑO ACTUAL EN EL FOOTER
   ============================================================ */
function setAnioFooter() {
  document.querySelectorAll('.footer-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ============================================================
   MARCAR LINK ACTIVO EN LA NAVBAR
   ============================================================ */
function marcarNavActivo() {
  const actual = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === actual || (actual === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ============================================================
   PRÓXIMO PROGRAMA (home)
   ============================================================ */
const PROGRAMACION = [
  { hora: '07:00', nombre: 'Devocional Matutino',    desc: 'Lunes a Viernes',          dias: [1,2,3,4,5] },
  { hora: '09:00', nombre: 'Música de Alabanza',     desc: 'Lunes a Sábado',           dias: [1,2,3,4,5,6] },
  { hora: '19:00', nombre: 'Predicaciones',          desc: 'Lunes a Viernes',          dias: [1,2,3,4,5] },
  { hora: '11:00', nombre: 'Culto Dominical',        desc: 'Transmisión en vivo',      dias: [0] },
  { hora: '19:00', nombre: 'Culto Vespertino',       desc: 'Transmisión en vivo',      dias: [0] },
  { hora: '20:00', nombre: 'Estudio Bíblico',        desc: 'Miércoles',                dias: [3] },
];

function mostrarProximoPrograma() {
  const el = document.getElementById('proximo-programa');
  if (!el) return;

  const ahora    = new Date();
  const horaAct  = ahora.getHours() * 60 + ahora.getMinutes();
  const diaAct   = ahora.getDay();

  let proximo = null;
  let menorDiff = Infinity;

  PROGRAMACION.forEach(p => {
    const [h, m] = p.hora.split(':').map(Number);
    const minProg = h * 60 + m;

    p.dias.forEach(dia => {
      let diff = (dia - diaAct + 7) % 7 * 1440 + (minProg - horaAct);
      if (diff <= 0) diff += 7 * 1440;
      if (diff < menorDiff) {
        menorDiff = diff;
        proximo = p;
      }
    });
  });

  if (proximo) {
    el.querySelector('.proximo-time').textContent = proximo.hora;
    el.querySelector('.proximo-name').textContent = proximo.nombre;
    el.querySelector('.proximo-desc').textContent = proximo.desc;
  }
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  mostrarVersiculoDelDia();
  initHamburger();
  initPlayer();
  initMiniPlayers();
  setAnioFooter();
  initSmoothScroll();
  marcarNavActivo();
  mostrarProximoPrograma();
});
