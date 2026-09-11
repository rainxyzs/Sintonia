'use strict';

/* ============================================================
   SINTONIA — lógica do aplicativo (JavaScript puro)
   API: iTunes Search (sem chave, com CORS liberado)
   ============================================================ */

(function () {
  const API = 'https://itunes.apple.com/search';
  const LS = {
    sessoes: 'sintonia_sessoes',
    coletadas: 'sintonia_coletadas',
    previews: 'sintonia_previews',
    historico: 'sintonia_historico'
  };

  const PLACEHOLDER = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
    "<stop offset='0' stop-color='#341463'/><stop offset='1' stop-color='#150a38'/></linearGradient></defs>" +
    "<rect width='600' height='600' fill='url(#g)'/>" +
    "<circle cx='300' cy='255' r='70' fill='#4dd9ff' opacity='.85'/>" +
    "<text x='300' y='380' text-anchor='middle' font-family='monospace' font-size='30' fill='#ffd166'>SINTONIA</text></svg>"
  );

  const ICONES = {
    play: '<svg viewBox="0 0 12 12" class="icone"><path d="M2 1v10l9-5z"/></svg>',
    pause: '<svg viewBox="0 0 12 12" class="icone"><path d="M2 1h3.2v10H2zM6.8 1H10v10H6.8z"/></svg>'
  };

  // ---------------- estado persistente (evita repetições) ----------------
  function ler(key, padrao) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : padrao; }
    catch (e) { return padrao; }
  }
  function salvar(key, valor) {
    try { localStorage.setItem(key, JSON.stringify(valor)); } catch (e) {}
  }
  let sessoes = ler(LS.sessoes, {});
  let coletadas = ler(LS.coletadas, []);
  let nPreviews = ler(LS.previews, 0);
  let historico = ler(LS.historico, []);

  // ---------------- elementos da página ----------------
  const player = document.getElementById('player');
  const btn = document.getElementById('btnSintonizar');
  const btnOutras = document.getElementById('btnBuscarOutras');
  const estado = document.getElementById('estado');
  const rotuloHumor = document.getElementById('rotuloHumor');
  const grade = document.getElementById('grade');
  const resultado = document.getElementById('resultado');
  const entrada = document.getElementById('humorCustom');
  const listaHist = document.getElementById('listaHistorico');
  const numDescobertas = document.getElementById('numDescobertas');
  const numPreviews = document.getElementById('numPreviews');
  const equalizador = document.getElementById('equalizador');
  const bola3d = document.getElementById('bola3d');

  let loteAtual = new Map();
  let tocando = null;
  let botaoTocando = null;

  // ---------------- utilidades ----------------
  function slugify(s) {
    return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 40);
  }
  function escapeHtml(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function embaralhar(arr) {
    for (let i = 1; i < arr.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  /* ---------------- bola de espelho 3D ----------------
     Gera ~200 facetas distribuídas na esfera (linhas de latitude).
     Cada faceta é um plano tangente posicionado em 3D. */
  function construirBola() {
    bola3d.innerHTML = '';
    const RAIO = 82;
    const LINHAS = 14;
    const FACETAS_EQUADOR = 16;
    const fragmentos = document.createDocumentFragment();

    for (let r = 0; r < LINHAS; r++) {
      const lat = 12 + (168 - 12) * (r / (LINHAS - 1)); // 12° .. 168°
      const seno = Math.sin(lat * Math.PI / 180);
      const n = Math.max(3, Math.round(FACETAS_EQUADOR * seno));
      const tam = Math.max(4, Math.round(13 * seno));

      for (let j = 0; j < n; j++) {
        const lon = (360 * j) / n;
        const f = document.createElement('span');
        f.className = 'faceta';
        f.style.width = tam + 'px';
        f.style.height = tam + 'px';
        f.style.marginLeft = (-tam / 2) + 'px';
        f.style.marginTop = (-tam / 2) + 'px';
        f.style.transform = 'rotateY(' + lon + 'deg) rotateX(' + (lat - 90) + 'deg) translateZ(' + RAIO + 'px)';
        if (Math.random() < 0.16) f.classList.add('clara');
        fragmentos.appendChild(f);
      }
    }
    bola3d.appendChild(fragmentos);
  }

  // ---------------- equalizador anos 80 ----------------
  function montarEqualizador() {
    equalizador.innerHTML = '';
    const BARRAS = 18;
    const fragmentos = document.createDocumentFragment();
    for (let i = 0; i < BARRAS; i++) {
      const b = document.createElement('span');
      b.className = 'eq-barra';
      b.style.animationDelay = (Math.random() * 1.2).toFixed(2) + 's';
      b.style.animationDuration = (0.75 + Math.random() * 0.9).toFixed(2) + 's';
      fragmentos.appendChild(b);
    }
    equalizador.appendChild(fragmentos);
  }

  // ---------------- busca na API do iTunes ----------------
  async function buscar(termo) {
    const offset = Math.floor(Math.random() * 41);
    const url = API + '?term=' + encodeURIComponent(termo) +
      '&media=music&entity=song&limit=25&offset=' + offset;
    const resp = await fetch(url);
    if (!resp.ok) return [];
    const dados = await resp.json();
    return (dados.results || []).filter(function (t) {
      return t.trackId && t.artworkUrl100 && t.previewUrl;
    });
  }

  // Expande o humor digitado em vários estilos -> gêneros internacionais
  function termosBusca(custom) {
    const base = custom.toLowerCase().trim();
    const estilos = [
      '', ' pop', ' rock', ' acoustic', ' electronic', ' dance', ' jazz',
      ' hip hop', ' soul', ' funk', ' indie', ' metal', ' punk', ' blues',
      ' country', ' classical', ' latin', ' reggae', ' r&b', ' folk',
      ' alternative', ' house', ' trance', ' ambient', ' gospel', ' opera'
    ];
    return estilos.map(function (s) { return (base + s).trim().slice(0, 60); });
  }

  // ---------------- ação principal ----------------
  function sintonizar() {
    const custom = entrada.value.trim();
    if (!custom) {
      estado.textContent = 'Digite um humor para sintonizar.';
      return;
    }
    const moodKey = slugify(custom);
    const rotulo = custom;
    let ok = false;
    rotuloHumor.textContent = rotulo;
    estado.textContent = 'Sintonizando "' + rotulo + '"...';
    btn.disabled = true;
    btnOutras.disabled = true;

    (async function () {
      const termos = termosBusca(custom);
      const candidatas = [];
      for (let i = 0; i < termos.length; i++) {
        try {
          const resultados = await buscar(termos[i]);
          for (let j = 0; j < resultados.length; j++) candidatas.push(resultados[j]);
        } catch (err) { /* termo seguinte */ }
      }
      if (!candidatas.length) {
        const termosBackup = ['pop', 'rock', 'acoustic', 'electronic', 'jazz'];
        for (let k = 0; k < termosBackup.length; k++) {
          try {
            const fallbackResultados = await buscar(termosBackup[k]);
            for (let m = 0; m < fallbackResultados.length; m++) candidatas.push(fallbackResultados[m]);
          } catch (err) { /* próximo termo de fallback */ }
          if (candidatas.length > 2) break;
        }
      }
      if (!candidatas.length) throw new Error('sem resultados');

      const faixas = escolher6(moodKey, candidatas);
      renderGrade(faixas);
      resultado.hidden = false;
      ok = true;
      setTimeout(function () {
        resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 80);
    })().catch(function () {
      estado.textContent = 'Não consegui sintonizar agora. Verifique a internet e tente de novo.';
    }).then(function () {
      btn.disabled = false;
      btnOutras.disabled = false;
      if (ok) estado.textContent = '';
    });
  }

  entrada.addEventListener('keydown', function (e) { if (e.key === 'Enter') sintonizar(); });
  btn.addEventListener('click', sintonizar);
  btnOutras.addEventListener('click', sintonizar);

  // ---------------- escolha SEM repetição ----------------
  function escolher6(moodKey, candidatas) {
    const jaVistas = new Set(sessoes[moodKey] || []);
    const unicas = [];
    const presentes = new Set();
    for (let i = 0; i < candidatas.length; i++) {
      const t = candidatas[i];
      const id = String(t.trackId);
      if (!presentes.has(id)) { presentes.add(id); unicas.push({ t: t, id: id }); }
    }

    embaralhar(unicas);
    const novas = unicas.filter(function (x) { return !jaVistas.has(x.id); });
    const antigas = unicas.filter(function (x) { return jaVistas.has(x.id); });
    const escolhidas = novas.concat(antigas).slice(0, 6);
    const ids = escolhidas.map(function (x) { return x.id; });

    sessoes[moodKey] = (sessoes[moodKey] || []).concat(ids);
    if (sessoes[moodKey].length > 800) { sessoes[moodKey] = sessoes[moodKey].slice(-800); }
    salvar(LS.sessoes, sessoes);

    for (let i = 0; i < ids.length; i++) {
      if (coletadas.indexOf(ids[i]) === -1) coletadas.push(ids[i]);
    }
    salvar(LS.coletadas, coletadas.slice(-1200));

    return embaralhar(escolhidas.map(function (x) { return x.t; }));
  }

  // ---------------- renderização dos 6 cards ----------------
  function renderGrade(faixas) {
    grade.innerHTML = '';
    loteAtual = new Map();
    const registros = [];

    faixas.forEach(function (t, indice) {
      const capa = t.artworkUrl100 ? t.artworkUrl100.replace('100x100', '600x600') : PLACEHOLDER;
      const nome = String(t.trackName || 'Faixa sem nome');
      const artista = String(t.artistName || 'Artista desconhecido');
      const genero = String(t.primaryGenreName || '');

      const card = document.createElement('article');
      card.className = 'card';
      card.style.animationDelay = (indice * 0.07).toFixed(2) + 's';
      card.innerHTML =
        '<img class="capa" src="' + escapeHtml(capa) + '" alt="Capa da faixa ' + escapeHtml(nome) + '" loading="lazy">' +
        '<div class="card-info">' +
        '<h3 title="' + escapeHtml(nome) + '">' + escapeHtml(nome) + '</h3>' +
        '<span class="artista">' + escapeHtml(artista) + '</span>' +
        (genero ? '<span class="genero">' + escapeHtml(genero) + '</span>' : '') +
        '</div>' +
        '<button class="btn-preview" type="button" data-id="' + escapeHtml(String(t.trackId)) + '">' +
        ICONES.play + '<span class="rotulo-btn">Prévia</span></button>';

      loteAtual.set(String(t.trackId), t);
      grade.appendChild(card);
      registros.push({ titulo: nome, artista: artista, capa: capa });
    });

    historico = historico.concat(registros).slice(-20);
    salvar(LS.historico, historico);
    renderHistorico();
    atualizarInfo();
  }

  // ---------------- prévia de 30 segundos ----------------
  grade.addEventListener('click', function (ev) {
    const b = ev.target.closest('.btn-preview');
    if (!b) return;
    const faixa = loteAtual.get(b.dataset.id);
    if (!faixa) return;

    if (tocando === faixa.previewUrl) { parar(); return; }

    parar();
    tocando = faixa.previewUrl;
    player.src = faixa.previewUrl;
    botaoTocando = b;
    b.classList.add('tocando');
    b.innerHTML = ICONES.pause + '<span class="rotulo-btn">Parar</span>';
    nPreviews = nPreviews + 1;
    salvar(LS.previews, nPreviews);
    atualizarInfo();
    equalizador.classList.add('ativo');
    player.play().catch(function () {
      estado.textContent = 'Não deu para tocar a prévia nesta rede.';
      parar();
    });
  });

  player.addEventListener('ended', parar);

  function parar() {
    player.pause();
    player.currentTime = 0;
    if (botaoTocando) {
      botaoTocando.classList.remove('tocando');
      botaoTocando.innerHTML = ICONES.play + '<span class="rotulo-btn">Prévia</span>';
    }
    equalizador.classList.remove('ativo');
    tocando = null;
    botaoTocando = null;
  }

  // ---------------- histórico e contadores ----------------
  function renderHistorico() {
    listaHist.innerHTML = '';
    const itens = historico.slice(-12).reverse();
    if (!itens.length) {
      const li = document.createElement('li');
      li.className = 'vazio';
      li.textContent = 'Ainda não sintonizou nada — digite um humor acima!';
      listaHist.appendChild(li);
      return;
    }
    itens.forEach(function (h) {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = h.capa || PLACEHOLDER;
      img.alt = 'Capa';
      img.loading = 'lazy';
      const txt = document.createElement('span');
      txt.textContent = (h.titulo || '') + ' — ' + (h.artista || '');
      li.appendChild(img);
      li.appendChild(txt);
      listaHist.appendChild(li);
    });
  }

  function atualizarInfo() {
    numDescobertas.textContent = String(coletadas.length);
    numPreviews.textContent = String(nPreviews);
  }

  // ---------------- inicialização ----------------
  construirBola();
  montarEqualizador();
  atualizarInfo();
  renderHistorico();
})();