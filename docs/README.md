# SINTONIA 🎵

Site retrô anos 80 que escolhe **6 músicas reais** conforme o seu humor.

**Versão atual:** 1.0.1

## Como abrir

1. **Duplo clique em `index.html`** (o jeito mais simples) ou
2. Servidor local:

```powershell
python -m http.server 8123
# depois abra http://localhost:8123
```

## Tecnologias

- HTML, CSS e JavaScript puros (sem frameworks)
- API pública do **iTunes Search** (sem chave, sem cadastro)
- Fotos de álbuns reais e prévias oficiais de **30 segundos**
- PWA (manifest + service worker) — instalável no celular

## Funcionalidades

- Campo de texto para o usuário digitar o humor que está sentindo
- 6 músicas por geração, **sem repetição** entre gerações (localStorage)
- Botão de prévia de 30 s em cada música
- Painel com contadores (músicas descobertas / prévias tocadas)
- Histórico "Últimas sintonias"
- **Bola de espelho 3D girando** (facetas geradas em JS) com neons suaves
- Equalizador animado que reage à prévia
- Efeito visual anos 80: fontes arcade `Press Start 2P` e `VT323`
- Responsivo: funciona no celular e no computador

## Estrutura do repositório

```
/                    → index.html, style.css, app.js, manifest.json, sw.js, ícones
├── docs/            → documentação (este README)
├── releases/        → APK para Android
└── roteiro-sintonia.md
```

## Versões

- **v1.0.1** — correção da estrutura do GitHub Pages, versão no rodapé e cache do service worker atualizado
- **v1.0.0** — primeira versão publicada (site + APK)