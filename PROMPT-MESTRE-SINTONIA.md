# PROMPT MESTRE — SINTONIA (para o Antigravity)

Copie e cole o bloco abaixo no Antigravity para recriar ou evoluir o aplicativo SINTONIA.

---

```
Crie um aplicativo web chamado SINTONIA — um site de música retrô anos 80
que recomenda 6 músicas reais com base no humor que o usuário digita.

============================================================
1. IDENTIDADE E VISUAL (ANOS 80 / SYNTHWAVE)
============================================================
- Nome: SINTONIA
- Tema: retrô anos 80 (synthwave), com neon SUAVE (não estourado)
- Fontes do Google Fonts:
  * "Press Start 2P" (títulos, estilo arcade 8-bit)
  * "VT323" (textos do corpo)
- Paleta de cores (variáveis CSS):
  * --ciano: #4dd9ff
  * --rosa: #ff6fd8
  * --violeta: #a78bfa
  * --amarelo: #ffd166
  * --fundo-1: #150a38  --fundo-2: #341463  --fundo-3: #571b5e
  * --texto: #f5e9ff  --texto-suave: #cdb5ef
- Fundo: gradiente escuro (#050208 → #0a0412) + imagem de fundo
  synthwave (Background80s.png) com cortina escura sutil para legibilidade
- Efeitos: brilhos flutuantes (blur), título com brilho neon pulsante,
  grade retrô, cards com efeito "vidro" (backdrop-filter: blur)

============================================================
2. ELEMENTOS OBRIGATÓRIOS DA INTERFACE
============================================================
- Título "SINTONIA" com efeito neon
- Descrição: "Digite como você está se sentindo e sintonize seis músicas
  sob medida para o momento."
- Campo de texto (#humorCustom) para o usuário digitar o humor
  (placeholder: "Ex.: aventureiro, acolhido, eufórico...", maxlength 40)
- Botão "Sintonizar" (#btnSintonizar)
- Botão "Buscar outras músicas" (#btnBuscarOutras)
- Área de resultado (#resultado) com grade de 6 cards
- Painel de estatísticas: "músicas descobertas" e "prévias tocadas"
- Histórico "Últimas sintonias"
- Rodapé com créditos da API

============================================================
3. ANIMAÇÕES (obrigatórias)
============================================================
- BOLA DE ESPELHO 3D realista:
  * Gerada via JavaScript (~200 facetas distribuídas em linhas de latitude)
  * Cada faceta é um <span> posicionado em 3D com
    transform: rotateY() rotateX() translateZ(82px)
  * Rotação contínua (girarBola 18s linear infinite)
  * Balanço pendurada por um fio (balancoBola 5.8s)
  * Núcleo escuro + camada de luz + faíscas cintilantes
- EQUALIZADOR animado (18 barras):
  * Estado calmo (eqCalmo) e estado tocando (eqForte, mais rápido)
  * Ativa quando uma prévia toca
- Título com neonPulsar
- Cards com animação "surgir" (fade + translateY)
- Brilhos flutuantes (brilhoFlutua)

============================================================
4. LÓGICA DE MÚSICAS (JavaScript puro)
============================================================
- API: iTunes Search (https://itunes.apple.com/search)
  * Sem chave, CORS liberado
  * Parâmetros: media=music, entity=song, limit=25, country=US, offset aleatório
  * Filtra resultados que tenham trackId, artworkUrl100 e previewUrl
- FILTRO DE MÚSICAS BRASILEIRAS (remover):
  * Remover gêneros: sertanejo, funk carioca, forró, axé, pagode, samba,
    arrocha, brega, bossa nova, pagode baiano (MPB é mantido)
  * Remover músicas com texto em português (detectar acentos e palavras
    comuns: de, da, do, me, te, eu, meu, minha, que, não, sem, com, pra,
    nós, ela, você, só, tem, para, princesa)
- MAPA DE HUMORES → TERMOS EMOCIONAIS (MOOD_TERMOS):
  * triste → triste, saudade, choro, coração partido, solidão
  * feliz → alegria, felicidade, sorriso, celebrar
  * apaixonado → amor, paixão, romance
  * animado → animado, energia, festa, celebrar
  * calmo → calma, paz, serenidade, relax
  * nostálgico → nostalgia, recordação, memória, saudade
  * bravo → ira, raiva, revolta, furioso
  * focado → foco, concentração, determinação
  * eufórico → euforia, êxtase, alegria intensa
  * melancólico → melancolia, tristeza suave, saudade
  * relaxado → relaxamento, descanso, tranquilidade
  * aventureiro → aventura, liberdade, estrada, explorar
  * rebelde → rebelde, rebeldia, gritar, explodir
  * sonhador → sonho, imaginar, fantasia
  * confiante → confiança, poder, vencer, forte
  * vitorioso → vitória, conquista, campeão, vencedor
  * tranquilo → tranquilidade, paz, silencioso
  * misterioso → mistério, sombrio, enigma
  * acolhido → aconchego, abrigo, casa, amparo
  (incluir variações femininas: apaixonada, animada, calma, etc.)
- Se o humor não estiver no mapa, usar o próprio texto como termo
- FALLBACK: se não houver resultados, buscar pop, rock, acoustic,
  electronic, jazz

============================================================
5. SELEÇÃO DE 6 MÚSICAS SEM REPETIÇÃO
============================================================
- Função escolher6(moodKey, candidatas):
  * Deduplicar por trackId
  * Embaralhar (Fisher-Yates)
  * Separar em "novas" (não vistas) e "antigas" (já vistas)
  * Priorizar novas, completar com antigas, pegar as 6 primeiras
  * Salvar os IDs vistos no localStorage por humor (limite 800)
  * Salvar IDs coletados globalmente (limite 1200)
- Persistência via localStorage:
  * sintonia_sessoes, sintonia_coletadas, sintonia_previews, sintonia_historico

============================================================
6. PLAYER DE PRÉVIA (30 segundos)
============================================================
- Cada card tem botão "Prévia" com ícone play/pause (SVG inline)
- Ao clicar: toca o previewUrl no <audio id="player">
- Botão muda para "Parar" e ganha classe .tocando
- Equalizador ativa
- Ao terminar (evento 'ended') ou clicar de novo: parar()
- Incrementa contador de prévias tocadas
- Tratamento de erro: mensagem amigável se não tocar

============================================================
7. CARDS DE MÚSICA
============================================================
- Capa do álbum (artworkUrl100 trocado para 600x600)
- Placeholder SVG caso não haja capa
- Título da música, artista, gênero
- Botão de prévia
- Animação de entrada escalonada (animationDelay por índice)

============================================================
8. HISTÓRICO E CONTADORES
============================================================
- Histórico: últimas 12 sintonias (capa + título + artista)
- Contador de músicas descobertas (total coletado)
- Contador de prévias tocadas
- Estado vazio: "Ainda não sintonizou nada — digite um humor acima!"

============================================================
9. PWA (PROGRESSIVE WEB APP)
============================================================
- manifest.json:
  * name/short_name: SINTONIA
  * version: 1.0.1
  * display: standalone, orientation: portrait, lang: pt-BR
  * theme_color: #4dd9ff, background_color: #050208
  * ícones 192x192 e 512x512 (purpose: any maskable)
- sw.js (Service Worker):
  * Cache "sintonia-v1.0.1" com index.html, style.css, app.js,
    manifest.json, ícones
  * Estratégia: cache-first com fallback para fetch
  * skipWaiting + clients.claim
- index.html registra o service worker no evento 'load'

============================================================
10. RESPONSIVIDADE E ACESSIBILIDADE
============================================================
- Grade: 3 colunas no desktop, 1 coluna no celular
- Media query max-width: 560px (ajustes de título e padding)
- prefers-reduced-motion: desativa animações
- Atributos ARIA: aria-label, aria-live, role="status"
- Todos os textos em português do Brasil

============================================================
11. ESTRUTURA DE ARQUIVOS
============================================================
/                    → index.html, style.css, app.js,
                       manifest.json, sw.js, icon-192.png,
                       icon-512.png, Background80s.png
docs/                → README.md
releases/            → SINTONIA-vX.Y.Z.apk
PROMPT-MESTRE-SINTONIA.md

============================================================
12. REQUISITOS DO TRABALHO ESCOLAR (atendidos)
============================================================
- Título, descrição, informações, campo de entrada, botão,
  interação, resultado, animação, interface organizada, português
- Aplicativo de recomendação (exemplo do roteiro)
- Funcionalidades extras: contadores, histórico, PWA, APK

============================================================
13. TECNOLOGIAS
============================================================
- HTML5, CSS3, JavaScript puro (sem frameworks)
- API iTunes Search (fetch)
- localStorage para persistência
- Service Worker + Manifest (PWA)
- Google Fonts (Press Start 2P, VT323)
```

---

## Como usar

1. Copie o bloco de código acima
2. Cole no Antigravity como solicitação inicial
3. A ferramenta vai recriar o SINTONIA completo