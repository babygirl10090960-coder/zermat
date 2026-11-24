/* Test de personalidad olfativa.
   Cómo funciona: cada respuesta suma puntos a un "alma aromática" (inspirada en los cinco grandes
   rasgos de personalidad: sociable, cariñosa, curiosa, organizada e intensa) y a las familias de aroma.
   Luego se compara ese perfil con las notas de cada fragancia del catálogo, ajustado por temporada e intensidad.
   Es una guía para escoger qué probar, no un diagnóstico: la última palabra la tiene tu piel. */
(function(){
  const FAM = {
    citrico:   { nombre:'Cítrico',   emoji:'🍋', desc:'limón, bergamota, toronja, mandarina' },
    acuatico:  { nombre:'Acuático',  emoji:'🌊', desc:'notas marinas, frescas, “recién bañado”' },
    aromatico: { nombre:'Aromático', emoji:'🌿', desc:'lavanda, menta, romero, hierbas' },
    floral:    { nombre:'Floral',    emoji:'🌸', desc:'rosa, jazmín, peonía, azahar' },
    frutal:    { nombre:'Frutal',    emoji:'🍓', desc:'frutos rojos, cereza, piña, manzana' },
    dulce:     { nombre:'Dulce',     emoji:'🍫', desc:'vainilla, chocolate, caramelo, almendra' },
    amaderado: { nombre:'Amaderado', emoji:'🌲', desc:'cedro, sándalo, vetiver' },
    oriental:  { nombre:'Especiado', emoji:'🔥', desc:'canela, pimienta, ámbar, cuero, oud' }
  };

  /* Qué tan bien va cada familia en cada temporada (0 a 3).
     El calor intensifica el aroma, por eso en verano van mejor las notas ligeras; el frío lo apaga, por eso en invierno lucen las cálidas. */
  const TEMP = {
    verano:    { citrico:3, acuatico:3, aromatico:2, frutal:2, floral:1 },
    primavera: { floral:3, frutal:2, citrico:2, aromatico:1, acuatico:1 },
    otono:     { amaderado:3, oriental:2, dulce:2, frutal:1, aromatico:1 },
    invierno:  { oriental:3, dulce:3, amaderado:3, floral:1 }
  };

  const ALMAS = {
    radiante: { nombre:'Alma Radiante', emoji:'☀️', colores:'amarillo, coral y naranja',
      fam:{citrico:3, frutal:3, floral:1},
      desc:'Llegas y se prende el ambiente. Eres sociable, platicas con todos y la gente se acuerda de tu risa.',
      resalta:'tu energía y tu buena vibra',
      consejo:'Los cítricos y frutales te hacen ver luminosa(o) y accesible. De día, frutal fresco; de noche, súbele con un frutal dulce.' },
    romantica: { nombre:'Alma Romántica', emoji:'🌹', colores:'rosa, lila y blanco',
      fam:{floral:3, frutal:1, dulce:1},
      desc:'Eres detallista, cariñosa(o) y te importa cómo se sienten los demás. Te acuerdas de los cumpleaños de todos.',
      resalta:'tu ternura y tu calidez',
      consejo:'Las flores (rosa, jazmín, peonía) transmiten cercanía. Ponte tu perfume también en el cabello o en la bufanda para dejar un rastro suave.' },
    magnetica: { nombre:'Alma Magnética', emoji:'🔥', colores:'rojo vino, negro y dorado',
      fam:{oriental:3, dulce:2, amaderado:1},
      desc:'Eres intensa(o), misteriosa(o) y no pasas desapercibida(o). Prefieres pocas personas, pero de verdad.',
      resalta:'tu misterio y tu seguridad',
      consejo:'Vainilla, especias y ámbar se quedan pegados a la piel y la ropa. Con 2 disparos basta: tu aroma debe descubrirse de cerca, no anunciarse.' },
    elegante: { nombre:'Alma Elegante', emoji:'✨', colores:'madera, beige y azul marino',
      fam:{amaderado:2, aromatico:2, floral:2},
      desc:'Eres organizada(o), segura(o) y cuidas los detalles. La gente confía en ti y te pide consejo.',
      resalta:'tu presencia y tu confianza',
      consejo:'Maderas, lavanda y flores clásicas dan imagen de seriedad sin ser pesadas. Ideales para la oficina, juntas y entrevistas.' },
    aventurera: { nombre:'Alma Aventurera', emoji:'🌊', colores:'azul, verde y turquesa',
      fam:{acuatico:3, citrico:2, aromatico:2, amaderado:1},
      desc:'Eres curiosa(o), te gusta probar cosas nuevas y siempre tienes un plan. No te quedas quieta(o).',
      resalta:'tu libertad y tu frescura',
      consejo:'Las notas marinas, cítricas y verdes huelen a aire libre y a “recién bañado”. Perfectas para el día, el gym y el calor.' }
  };

  const PREG = [
    { id:'para', t:'¿Para quién es el perfume?', ayuda:'Si es regalo, contesta lo demás pensando en esa persona.', op:[
      { e:'👩', t:'Para mí (dama)', set:{para:'dama'} },
      { e:'👨', t:'Para mí (caballero)', set:{para:'caballero'} },
      { e:'🎁', t:'Regalo para ella', set:{para:'dama', regalo:true} },
      { e:'🎁', t:'Regalo para él', set:{para:'caballero', regalo:true} },
      { e:'✨', t:'Me da igual, quiero el mejor para mí', set:{para:'todos'} } ]},
    { id:'sabado', t:'Tu sábado libre perfecto es…', op:[
      { e:'🏖️', t:'Playa, lago o parque', alma:{aventurera:2}, fam:{acuatico:2, citrico:1} },
      { e:'💃', t:'Fiesta, baile o carne asada con amigos', alma:{radiante:2}, fam:{frutal:2, dulce:1} },
      { e:'🕯️', t:'Una cena romántica', alma:{romantica:2}, fam:{floral:2, oriental:1} },
      { e:'🍷', t:'Restaurante elegante o un evento', alma:{elegante:2}, fam:{amaderado:1, aromatico:1, floral:1} },
      { e:'🎬', t:'Película en casa con cobija', alma:{magnetica:1, romantica:1}, fam:{dulce:2, amaderado:1} } ]},
    { id:'amigos', t:'¿Cómo te describen tus amigos?', op:[
      { e:'😄', t:'Alegre y platicador(a)', alma:{radiante:3} },
      { e:'💗', t:'Cariñoso(a) y detallista', alma:{romantica:3} },
      { e:'🧭', t:'Aventurero(a) y curioso(a)', alma:{aventurera:3} },
      { e:'🎯', t:'Seguro(a), organizado(a), líder', alma:{elegante:3} },
      { e:'🌙', t:'Misterioso(a) e intenso(a)', alma:{magnetica:3} } ]},
    { id:'sentir', t:'Cuando pasas, ¿qué quieres que sientan?', ayuda:'Esto es lo que tu perfume va a resaltar de ti.', op:[
      { e:'🌿', t:'Frescura y limpieza', alma:{aventurera:1}, fam:{citrico:2, acuatico:2, aromatico:1} },
      { e:'💪', t:'Seguridad y poder', alma:{elegante:2}, fam:{amaderado:2, oriental:1} },
      { e:'🌹', t:'Ternura y romance', alma:{romantica:2}, fam:{floral:3} },
      { e:'🔥', t:'Misterio y seducción', alma:{magnetica:2}, fam:{oriental:2, dulce:1} },
      { e:'⚡', t:'Alegría y energía', alma:{radiante:2}, fam:{frutal:2, citrico:2} } ]},
    { id:'color', t:'Escoge un color', op:[
      { e:'🟡', t:'Amarillo o naranja', alma:{radiante:1}, fam:{citrico:3, frutal:1} },
      { e:'🔵', t:'Azul', alma:{aventurera:1}, fam:{acuatico:3} },
      { e:'🌸', t:'Rosa o lila', alma:{romantica:1}, fam:{floral:2, frutal:1, dulce:1} },
      { e:'🟢', t:'Verde', alma:{aventurera:1}, fam:{aromatico:3, citrico:1} },
      { e:'🟤', t:'Café o color madera', alma:{elegante:1}, fam:{amaderado:3, oriental:1} },
      { e:'🍷', t:'Rojo vino o negro', alma:{magnetica:1}, fam:{oriental:3, dulce:1} } ]},
    { id:'antojo', t:'¿Qué se te antoja más?', op:[
      { e:'🍋', t:'Limonada o fruta picada', fam:{citrico:2, frutal:2} },
      { e:'🍫', t:'Chocolate, pan dulce o vainilla', fam:{dulce:3} },
      { e:'🍓', t:'Fresas con crema', fam:{frutal:2, dulce:2} },
      { e:'☕', t:'Café de olla con canela', fam:{oriental:2, amaderado:1, dulce:1} },
      { e:'🌱', t:'Té de hierbabuena', fam:{aromatico:3} } ]},
    { id:'uso', t:'¿Cuándo lo vas a usar más?', op:[
      { e:'💼', t:'Diario: trabajo o escuela', set:{uso:'diario'}, int:-1 },
      { e:'🌃', t:'Salidas de noche y fiestas', set:{uso:'noche'}, int:1, fam:{oriental:1, dulce:1} },
      { e:'💍', t:'Ocasiones especiales', set:{uso:'especial'}, int:1 },
      { e:'🔁', t:'Un poco de todo', set:{uso:'todo'} } ]},
    { id:'temporada', t:'¿En qué temporada lo usarás más?', ayuda:'El calor hace que el perfume se sienta más fuerte; el frío lo apaga.', op:[
      { e:'☀️', t:'Verano, con calor', set:{temporada:'verano'} },
      { e:'🌷', t:'Primavera', set:{temporada:'primavera'} },
      { e:'🍂', t:'Otoño', set:{temporada:'otono'} },
      { e:'❄️', t:'Invierno, con frío', set:{temporada:'invierno'} },
      { e:'📅', t:'Todo el año', set:{temporada:'todo'} } ]},
    { id:'intensidad', t:'¿Qué tanto quieres que se note?', op:[
      { e:'🤍', t:'Suave: solo quien se acerque', set:{int:1} },
      { e:'💫', t:'Medio: que se sienta sin exagerar', set:{int:2} },
      { e:'📣', t:'Que se note cuando llegue', set:{int:3} } ]}
  ];

  const NOM_TEMP = { verano:'verano', primavera:'primavera', otono:'otoño', invierno:'invierno', todo:'todo el año' };

  function norm(v){ return Math.sqrt(Object.values(v).reduce((s,x)=>s+x*x,0)) || 1; }
  function coseno(a, b){ let s = 0; for (const k in a) s += a[k] * (b[k] || 0); return s / (norm(a) * norm(b)); }
  function sumar(dst, src, f = 1){ for (const k in src || {}) dst[k] = (dst[k] || 0) + src[k] * f; }

  /* respuestas: índice de opción elegida por pregunta */
  function calcular(respuestas, catalogo){
    const alma = {}, fam = {}, set = { para:'todos', temporada:'todo', int:2, uso:'todo', regalo:false };
    let ajusteInt = 0;
    PREG.forEach((p, i) => { const o = p.op[respuestas[i]]; if (!o) return;
      sumar(alma, o.alma); sumar(fam, o.fam); Object.assign(set, o.set || {}); ajusteInt += o.int || 0; });
    const orden = Object.keys(ALMAS).sort((a, b) => (alma[b] || 0) - (alma[a] || 0));
    const top = orden[0], segunda = orden[1];
    // El alma también empuja las familias: la personalidad pesa, pero no manda sola
    sumar(fam, ALMAS[top].fam, 0.9); sumar(fam, ALMAS[segunda].fam, 0.35);
    const intDeseada = Math.max(1, Math.min(3, set.int + (ajusteInt > 0 ? 0.4 : ajusteInt < 0 ? -0.4 : 0)));

    const aptos = catalogo.filter(p => set.para === 'todos' || p.para === set.para || p.para === 'todos');
    const puntuar = (p, temporada) => {
      const base = coseno(fam, p.fam);
      const t = temporada !== 'todo' ? coseno(TEMP[temporada], p.fam) : 0.5;
      return base * 0.72 + t * 0.2 - Math.abs(p.int - intDeseada) * 0.06 + (p.para === set.para ? 0.04 : 0);
    };
    const lista = aptos.map(p => ({ p, s: puntuar(p, set.temporada) })).sort((a, b) => b.s - a.s);
    const max = lista[0]?.s || 1;
    lista.forEach(x => x.pct = Math.round(Math.max(55, Math.min(98, 97 * x.s / max))));

    const mejorEn = (temp, sin) => aptos.filter(p => !sin.includes(p.id))
      .map(p => ({ p, s: puntuar(p, temp) * 0.6 + coseno(TEMP[temp], p.fam) * 0.4 })).sort((a, b) => b.s - a.s)[0]?.p;
    const top3 = lista.slice(0, 3);
    const vistos = top3.map(x => x.p.id);
    const verano = mejorEn('verano', vistos);
    const invierno = mejorEn('invierno', [...vistos, verano?.id]);

    const famOrden = Object.keys(fam).sort((a, b) => fam[b] - fam[a]).slice(0, 3);
    return { alma: top, almaDatos: ALMAS[top], segunda, fam, famOrden, set, intDeseada, top3, verano, invierno,
      consejos: consejos(top, set, top3[0]?.p) };
  }

  function consejos(alma, set, p){
    const c = [];
    c.push(ALMAS[alma].consejo);
    const temp = {
      verano: 'Con calor el perfume se siente más fuerte y dura menos: usa 1 o 2 disparos menos y lleva una mini para retocar en la tarde.',
      primavera: 'En primavera lucen los florales y frutales frescos. Es buena época para estrenar aroma de día.',
      otono: 'En otoño empieza el frío: sube a maderas y notas dulces suaves. Duran más en la ropa.',
      invierno: 'El frío apaga el perfume: usa Eau de Parfum, ponlo también en la bufanda o el abrigo y escoge notas cálidas (vainilla, ámbar, maderas).',
      todo: 'Lo ideal es tener dos: uno fresco para el calor y uno cálido para el frío. Así tu aroma se siente bien todo el año.'
    }[set.temporada];
    c.push(temp);
    const int = set.int === 1 ? '2 disparos: cuello y una muñeca.' : set.int === 2 ? '3 disparos: cuello, muñecas y nuca.' : '3 o 4 disparos: cuello, pecho, muñecas y ropa. Ojo en lugares cerrados.';
    c.push(`Cuánto ponerte: ${int}${p && p.tipo === 'EDT' ? ' Como es Eau de Toilette, puedes retocar a mediodía.' : p ? ' Como es Eau de Parfum, dura de 6 a 8 horas.' : ''}`);
    c.push('Ponlo en piel hidratada (crema sin olor) y no frotes las muñecas: rompe las notas y dura menos.');
    if (set.uso === 'diario') c.push('Para el trabajo o la escuela, menos es más: que se note solo cuando alguien se acerca.');
    if (set.uso === 'noche') c.push('Para la noche, ponte el perfume 15 minutos antes de salir para que las notas de fondo ya estén abiertas.');
    if (set.regalo) c.push('Para regalo: pide una muestra primero y, si puedes, que la persona la pruebe en su piel. Cada piel cambia el aroma.');
    c.push('Guárdalo lejos del sol y del baño: el calor y la humedad lo echan a perder.');
    return c;
  }

  window.PERFIL = { FAM, ALMAS, PREG, TEMP, NOM_TEMP, calcular };
})();
