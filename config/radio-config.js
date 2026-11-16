/**
 * ============================================================
 *  RADIO TORRE FUERTE — Archivo de Configuración Central
 *  Iglesia Bautista Torre Fuerte · Concepción, Chile
 * ============================================================
 * 
 *  INSTRUCCIONES:
 *  Después de crear tus cuentas, reemplaza los valores
 *  marcados con TODO por tus datos reales.
 * ============================================================
 */

const RadioConfig = {

  // ----------------------------------------------------------
  // 1. INFORMACIÓN DE LA RADIO
  // ----------------------------------------------------------
  nombre: "Radio Torre Fuerte",
  eslogan: "Transmitiendo la Palabra de Dios",
  iglesia: "Iglesia Bautista Torre Fuerte",
  ciudad: "Concepción, Chile",

  // ----------------------------------------------------------
  // 2. STREAMING — ZENO.FM
  //    TODO: Reemplaza con tu URL de stream de Zeno.fm
  //    Cómo obtenerla:
  //      1. Entra a https://zeno.fm/dashboard
  //      2. Crea tu estación
  //      3. Ve a "Listeners" → copia la "Stream URL"
  //      Ejemplo: https://stream.zeno.fm/abcd1234xyz
  // ----------------------------------------------------------
  streamUrl: "https://stream.zeno.fm/REEMPLAZAR_CON_TU_URL",
  zenoDashboard: "https://zeno.fm/dashboard",

  // ----------------------------------------------------------
  // 3. FORMULARIO DE ORACIÓN — FORMSPREE
  //    TODO: Reemplaza con tu ID de Formspree
  //    Cómo obtenerlo:
  //      1. Entra a https://formspree.io/dashboard
  //      2. Crea un nuevo formulario
  //      3. Copia el ID (ej: xpzgkwqr)
  //      Ejemplo de action: https://formspree.io/f/xpzgkwqr
  // ----------------------------------------------------------
  formspreeId: "REEMPLAZAR_CON_TU_ID",
  get formspreeUrl() {
    return `https://formspree.io/f/${this.formspreeId}`;
  },

  // ----------------------------------------------------------
  // 4. GITHUB PAGES — TU SITIO WEB
  //    TODO: Reemplaza con tu usuario de GitHub
  //    Tu sitio estará en: https://USUARIO.github.io/radio-torre-fuerte
  // ----------------------------------------------------------
  githubUsuario: "JonnyQueiroz",
  githubRepo: "radio-torre-fuerte",
  get siteUrl() {
    return `https://${this.githubUsuario}.github.io/${this.githubRepo}`;
  },

  // ----------------------------------------------------------
  // 5. REDES SOCIALES
  //    TODO: Agrega tus links de redes sociales
  // ----------------------------------------------------------
  redes: {
    facebook: "https://facebook.com/REEMPLAZAR",
    youtube: "https://youtube.com/@REEMPLAZAR",
    whatsapp: "https://wa.me/56XXXXXXXXX",
    instagram: "https://instagram.com/REEMPLAZAR"
  },

  // ----------------------------------------------------------
  // 6. INFORMACIÓN DE CONTACTO DE LA IGLESIA
  //    TODO: Completa con la información real
  // ----------------------------------------------------------
  contacto: {
    direccion: "REEMPLAZAR — Calle y número, Concepción",
    telefono: "+56 XXXXXXXXX",
    email: "contacto@REEMPLAZAR.cl",
    googleMapsEmbed: "REEMPLAZAR_CON_IFRAME_DE_GOOGLE_MAPS"
  },

  // ----------------------------------------------------------
  // 7. VERSÍCULOS DEL DÍA (rotativo)
  //    Puedes agregar más versículos aquí
  // ----------------------------------------------------------
  versiculos: [
    { texto: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.", referencia: "Juan 3:16" },
    { texto: "Todo lo puedo en Cristo que me fortalece.", referencia: "Filipenses 4:13" },
    { texto: "El Señor es mi pastor; nada me faltará.", referencia: "Salmo 23:1" },
    { texto: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.", referencia: "Proverbios 3:5" },
    { texto: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal.", referencia: "Jeremías 29:11" },
    { texto: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.", referencia: "Mateo 6:33" },
    { texto: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.", referencia: "Isaías 41:10" },
    { texto: "Estad quietos, y conoced que yo soy Dios.", referencia: "Salmo 46:10" },
    { texto: "Todo lo que es verdadero, todo lo honesto, todo lo justo... en esto pensad.", referencia: "Filipenses 4:8" },
    { texto: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.", referencia: "Romanos 8:28" },
    { texto: "Jehová es mi luz y mi salvación; ¿de quién temeré?", referencia: "Salmo 27:1" },
    { texto: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes.", referencia: "Josué 1:9" }
  ],

  // ----------------------------------------------------------
  // 8. PROGRAMACIÓN SEMANAL
  //    Modifica según los programas reales de la radio
  // ----------------------------------------------------------
  programacion: [
    { dia: "Lunes a Viernes", hora: "07:00 - 08:00", programa: "Devocional Matutino", tipo: "devocional" },
    { dia: "Lunes a Viernes", hora: "08:00 - 12:00", programa: "Música de Alabanza", tipo: "musica" },
    { dia: "Lunes a Viernes", hora: "12:00 - 13:00", programa: "Al Mediodía con la Palabra", tipo: "predicacion" },
    { dia: "Lunes a Viernes", hora: "19:00 - 20:00", programa: "Predicaciones Clásicas", tipo: "predicacion" },
    { dia: "Sábado",          hora: "10:00 - 12:00", programa: "Música Especial del Sábado", tipo: "musica" },
    { dia: "Sábado",          hora: "19:00 - 20:00", programa: "Preparándonos para el Culto", tipo: "devocional" },
    { dia: "Domingo",         hora: "09:00 - 10:30", programa: "Escuela Dominical", tipo: "educacion" },
    { dia: "Domingo",         hora: "11:00 - 13:00", programa: "🔴 Culto en Vivo", tipo: "culto-vivo" },
    { dia: "Domingo",         hora: "19:00 - 21:00", programa: "🔴 Culto Vespertino en Vivo", tipo: "culto-vivo" }
  ]
};

// Exporta la configuración para uso en otros scripts
if (typeof module !== 'undefined') module.exports = RadioConfig;
