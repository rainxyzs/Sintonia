# SINTONIA 🎵

Site retrô anos 80 que escolhe **6 músicas reais** conforme o seu humor.

## Como abrir

1. **Duplo clique em `index.html`** (o jeito mais simples) ou
2. Servidor local:

```powershell
python -m http.server 8123 --directory sintonia
# depois abra http://localhost:8123
```

## Tecnologias

- HTML, CSS e JavaScript puros (sem frameworks)
- API pública do **iTunes Search** (sem chave, sem cadastro)
- Fotos de álbuns reais e prévias oficiais de **30 segundos**

## Funcionalidades

- 8 humores prontos + humor personalizado
- 6 músicas por geração, **sem repetição** entre gerações (localStorage)
- Botão de prévia de 30 s em cada música
- Painel com contadores (músicas descobertas / prévias tocadas)
- Histórico "Últimas sintonias"
- **Bola de espelho girando** (CSS puro) com neons suaves
- Efeito visual anos 80: fontes arcade `Press Start 2P` e `VT323`
- Responsivo: funciona no celular e no computador