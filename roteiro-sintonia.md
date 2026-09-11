# ROTEIRO DE ATIVIDADE PRÁTICA
## DESENVOLVIMENTO DE SISTEMAS
### DESAFIO: MEU PRIMEIRO APLICATIVO AUTÔNOMO

**Nome do estudante:** Bryan Damaso Brasil
**Turma:** 3°B  **Data:** 23/09/2026
**Professor:** Washington Oliveira Santos

## 1. TEMA DA ATIVIDADE

Desenvolvimento de um aplicativo web interativo.

Nesta atividade, desenvolvi, de forma autônoma, uma aplicação web chamada **SINTONIA**. O usuário informa o humor que está sentindo e a aplicação retorna **6 músicas reais** que combinam com esse humor, com capa do álbum, nome do artista e prévia de 30 segundos, tudo com visual retrô anos 80.

## 2. OBJETIVOS

Ao realizar esta atividade, desenvolvi as seguintes habilidades:

- Planejar uma aplicação antes de iniciar seu desenvolvimento;
- Identificar um problema que possa ser solucionado por meio de uma aplicação;
- Definir as principais funcionalidades de um sistema;
- Elaborar uma descrição clara para orientar o desenvolvimento;
- Utilizar uma ferramenta de desenvolvimento assistido;
- Analisar o resultado produzido;
- Realizar testes;
- Identificar problemas;
- Solicitar alterações e melhorias;
- Verificar se as alterações realmente funcionaram;
- Compreender a relação entre interface, interação e comportamento de uma aplicação.

## 3. O DESAFIO

Tema escolhido: **Música**.

Desenvolvi um **aplicativo de recomendação de músicas pelo humor**. O usuário digita o humor que está sentindo, clica em **Sintonizar** e recebe 6 músicas de gêneros variados, com foto de álbum real e prévia de áudio de 30 segundos. As músicas **não se repetem** quando o usuário gera mais de uma vez.

## 4. REQUISITOS MÍNIMOS

1. **Título:** SINTONIA — aparece com destaque e efeito neon.
2. **Descrição:** textos explicando a finalidade do aplicativo.
3. **Informações:** cada música mostra nome, artista, gênero e capa do álbum; há também um painel com contadores (músicas descobertas e prévias tocadas).
4. **Campo de entrada:** campo de texto no qual o usuário digita o humor que está sentindo.
5. **Botão:** "Sintonizar" e "Buscar outras músicas".
6. **Interação:** ao clicar, a aplicação busca músicas reais na API do iTunes e monta os cards.
7. **Resultado:** 6 músicas são apresentadas na tela, cada uma com botão de prévia.
8. **Animação:** bola de espelho realista girando (centenas de espelhinhos em 3D), equalizador animado e efeito neon pulsante.
9. **Interface:** organizada em cartões, tema retrô anos 80 e cores neon suaves.
10. **Idioma:** todos os textos em português do Brasil.

## 5. ETAPA 1 — PLANEJAMENTO

### 5.1 Nome do aplicativo

**SINTONIA**

### 5.2 Qual problema o aplicativo pretende resolver?

É difícil e demorado escolher músicas que combinem com o humor do momento. O SINTONIA resolve isso: o usuário diz como está se sentindo e, em poucos segundos, recebe 6 músicas reais que combinam com o seu estado de espírito.

### 5.3 Quem utilizará o aplicativo?

Jovens e estudantes que gostam de música e usam celular ou computador no dia a dia, aproximadamente de 13 a 25 anos.

### 5.4 O que o usuário poderá fazer?

1. Digitar o humor que está sentindo (ex.: eufórico, nostálgico);
2. Receber 6 músicas reais, com capa, artista e prévia de 30 segundos;
3. Pedir "outras músicas" sem que as anteriores se repitam;
4. Acompanhar o histórico e o contador de músicas descobertas.

### 5.5 Qual será a principal ação do aplicativo?

Ao clicar em **Sintonizar**, o aplicativo expande o humor digitado em vários estilos (pop, rock, acústica, eletrônica etc.), consulta a API do iTunes, sorteia 6 faixas e mostra os cards com a prévia. As músicas já exibidas ficam gravadas no navegador para **não se repetirem** nas próximas gerações.

## 6. ETAPA 2 — PLANEJAMENTO DA INTERFACE

### Modelo

```
+------------------------------------------+
|                                          |
|           NOME DO APLICATIVO             |
|                                          |
|        Descrição da aplicação            |
|                                          |
|        [ Campo de entrada ]              |
|                                          |
|             [ BOTÃO ]                    |
|                                          |
|        Resultado da ação                 |
|                                          |
+------------------------------------------+
```

### Meu projeto

```
+------------------------------------------+
|                SINTONIA                   |
|                                          |
|   Digite o seu humor e sintonize 6      |
|        músicas para você!                |
|                                          |
|    [ Digite seu humor aqui... ]          |
|              [ Sintonizar ]              |
|                                          |
|        ( bola de espelho 3D )            |
|        ( equalizador animado )           |
|                                          |
|            +------+                      |
|            | capa |   6 cards          |
|            |prévia |                    |
|            +------+                      |
|                                          |
|     [ Buscar outras músicas ]            |
|                                          |
|  999 músicas descobertas · histórico    |
+------------------------------------------+
```

## 7. ETAPA 3 — DESENVOLVIMENTO

Desenvolvi a aplicação em **HTML, CSS e JavaScript** puros, usando o Antigravity como ferramenta de desenvolvimento assistido. Na solicitação expliquei: nome, objetivo, público; informações que deveriam aparecer (músicas com capa, artista e gênero); campo de texto para o humor; botões (Sintonizar e Buscar outras); ação principal (gerar 6 músicas); resultado esperado; aparência (anos 80, neons suaves, bola de espelho realista e equalizador) e funcionamento em diferentes tamanhos de tela.

A aplicação usa a **API pública do iTunes Search** (sem necessidade de chave) para buscar músicas reais e o **localStorage** do navegador para guardar as músicas já exibidas.

## 8. ETAPA 4 — PRIMEIRO TESTE

| Teste | Funcionou? | Observação |
|---|---|---|
| O aplicativo abriu corretamente? | Sim | Abriu no navegador (servidor local). |
| O título aparece corretamente? | Sim | "SINTONIA" com brilho neon. |
| Os textos estão em português? | Sim | Todos em pt-BR. |
| O campo de entrada funciona? | Sim | Aceita o humor digitado. |
| O botão aparece corretamente? | Sim | "Sintonizar" em destaque. |
| O botão executa a ação esperada? | Sim | Chamou a API e carregou 6 músicas. |
| O resultado aparece corretamente? | Sim | 6 cards com capa, artista, gênero e prévia. |
| A animação funciona? | Sim | Bola de espelho realista gira com as facetas. |
| O equalizador funciona? | Sim | As barras aceleram quando a prévia toca. |
| A aplicação está organizada visualmente? | Sim | Tema retrô anos 80, neons suaves. |
| A aplicação funciona em diferentes tamanhos de tela? | Sim | Grade responsiva (3 colunas no PC, 1 no celular). |

## 9. ETAPA 5 — IDENTIFICANDO PROBLEMAS

**Problema 1 — repetição de músicas:** no primeiro teste, percebi que, ao gerar várias vezes, a mesma música podia aparecer de novo.

- O que deveria acontecer? Cada geração deveria trazer músicas diferentes.
- O que realmente aconteceu? O sorteio acontecia sobre o mesmo conjunto e algumas músicas se repetiam entre gerações.

**Problema 2 — rede lenta:** sem internet ou com rede lenta, a busca demorava e não avisava o usuário.

- O que deveria acontecer? Mostrar uma mensagem amigável em vez de uma tela parada.
- O que realmente aconteceu? A página ficava em silêncio até responder.

## 10. ETAPA 6 — CORREÇÃO

Expliquei o problema e solicitei a correção no Antigravity: adicionar **controle de músicas já exibidas** (usando o `localStorage`) e **tratamento de erro** com mensagem amigável.

- Problema corrigido? **(X) Sim**  ( ) Não
- O que foi alterado? Foi criada a função `escolher6()`, que guarda os `trackId` já exibidos de cada humor e filtra antes do sorteio; e as chamadas à API ganharam `try/catch`.
- O problema foi resolvido? **(X) Sim**  ( ) Não

Na segunda rodada de testes, as 6 músicas foram **todas diferentes** das anteriores.

## 11. ETAPA 7 — MELHORIA

Minha melhoria será: **painel com contador de músicas descobertas e prévias tocadas**, além do **histórico das últimas sintonias**, para o usuário visualizar o quanto já explorou.

Depois implementei a melhoria e testei novamente: o painel atualiza os contadores a cada geração e cada prévia tocada, e o histórico mostra as últimas músicas. Funcionou.

## 12. DESAFIO EXTRA

Minha funcionalidade extra: **botão "Buscar outras músicas"** que gera um novo lote **sem repetir** as já exibidas.

Por que escolhi essa funcionalidade? Porque é essa a diferença do aplicativo: cada geração entrega combinações diferentes, como em um serviço de música de verdade.

## 13. REFLEXÃO SOBRE A ATIVIDADE

1. **Qual foi a maior dificuldade encontrada durante o desenvolvimento?** Garantir que as músicas não se repetissem entre gerações.
2. **O aplicativo ficou exatamente como você havia planejado?** ( ) Sim **(X) Parcialmente** ( ) Não — Explique: o visual ficou como planejado e a busca de músicas reais até superou o esperado, mas precisei ajustar o controle de repetição e o tratamento de erros.
3. **Você encontrou algum problema durante os testes?** **(X) Sim** ( ) Não — Se sim, qual? Repetição de músicas e mensagens de erro em rede lenta.
4. **Como você resolveu o problema?** Com deduplicação via `localStorage` e `try/catch` com mensagem amigável.
5. **O que você aprendeu durante esta atividade?** Estrutura de projeto em HTML/CSS/JS, consumo de API com `fetch`, responsividade, animações em CSS e persistência com `localStorage`.
6. **Se tivesse mais tempo, o que acrescentaria ao aplicativo?** Criação de playlists, login e modo escuro personalizado.

## 14. APRESENTAÇÃO

- **Nome do aplicativo:** SINTONIA
- **Problema que ele pretende resolver:** dificuldade de escolher músicas que combinem com o humor do momento.
- **Público-alvo:** jovens e estudantes que gostam de música.
- **Principais funcionalidades:** humor digitado pelo usuário, 6 músicas reais com prévia de 30 s, sem repetição, bola de espelho realista, equalizador, contadores e histórico.
- **Como o usuário interage com a aplicação:** digita o humor, clica em "Sintonizar", toca as prévias e usa "Buscar outras músicas".
- **Uma dificuldade encontrada:** impedir que as músicas se repetissem entre gerações.
- **Como o problema foi solucionado:** guardando as músicas já exibidas no `localStorage` e filtrando antes do sorteio.
- **Uma melhoria realizada:** contadores e histórico das últimas sintonias.

## 15. ORIENTAÇÕES IMPORTANTES

Durante toda a atividade: li todas as etapas antes de começar; planejei antes de desenvolver; testei todas as funcionalidades; observei atentamente o resultado; investiguei os problemas; fiz alterações de maneira organizada; testei novamente depois de cada alteração; e procurei entender o que foi desenvolvido para conseguir explicar o funcionamento.

## 16. ENTREGA

1. **Aplicativo funcionando** — arquivos `index.html`, `style.css` e `app.js` na raiz do repositório.
2. **Planejamento preenchido** — seções 5 e 6.
3. **Tabela de testes preenchida** — seção 8.
4. **Registro dos problemas encontrados e das correções realizadas** — seções 9 e 10.
5. **Respostas da reflexão** — seção 13.
6. **Apresentação do aplicativo ao professor** — seção 14.