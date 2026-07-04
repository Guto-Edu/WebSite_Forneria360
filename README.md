<div align="center">
  <a href="https://www.forneria360.com.br/">
    <img src="assets/logo.png" alt="Logo da Forneria 360" width="180" />
  </a>

  <h1>Forneria 360º</h1>

  <p><strong>Site institucional estático com foco em marca, conversão e presença local.</strong></p>
  <p>Uma experiência web para apresentar a Forneria 360º, destacar o novo momento presencial da casa e direcionar pedidos para o InstaDelivery.</p>

  <p>
    <a href="https://www.forneria360.com.br/"><strong>Acessar site</strong></a>
    ·
    <a href="https://instadelivery.com.br/forneria360">Pedir no InstaDelivery</a>
    ·
    <a href="https://www.instagram.com/forneria_360/">Instagram</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-CDN-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS CDN" />
    <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111827" alt="JavaScript Vanilla" />
    <img src="https://img.shields.io/badge/SEO-Open_Graph%20%2B%20Sitemap-0F172A?style=for-the-badge" alt="SEO" />
  </p>
</div>

---

## Sobre o projeto

Este repositório contém a repaginação estática do site da Forneria 360º. O projeto foi construído com páginas HTML independentes, Tailwind via CDN, CSS embutido por página e pequenos trechos de JavaScript para comportamento e renderização dinâmica do blog.

O site comunica três frentes principais:

- posicionamento da marca e proposta da pizza napolitana
- conversão para pedido online via InstaDelivery
- reforço da nova experiência presencial em São João del-Rei

## Páginas e experiências

| Página | Objetivo |
| --- | --- |
| `index.html` | Landing principal com hero, destaques do cardápio, bloco institucional, blog e localização |
| `cardapio.html` | Vitrine dos sabores com CTAs para finalizar o pedido no InstaDelivery |
| `sobre.html` | História da marca, contexto da transição para o presencial e apresentação do pizzaiolo |
| `localizacao.html` | Endereço, contexto da pousada, fotos do ambiente e rota para visita |
| `blog.html` | Listagem dos conteúdos editoriais |
| `blog/post.html` | Template dinâmico dos posts a partir do JSON local |

## Destaques técnicos

- arquitetura 100% estática, simples de hospedar e manter
- Tailwind CSS carregado por CDN, sem etapa de build
- CSS interno por página para preservar autonomia entre telas
- blog renderizado no cliente com `fetch()` de [`assets/blog-posts.json`](assets/blog-posts.json)
- metadados de SEO por página com `title`, `description`, `canonical` e Open Graph
- presença de `robots.txt`, `sitemap.xml` e dados estruturados para negócio local
- design responsivo com direção visual editorial e foco em conversão

## Stack

| Camada | Tecnologias |
| --- | --- |
| Estrutura | HTML5 |
| Estilo | Tailwind CSS via CDN + CSS inline |
| Interações | JavaScript vanilla |
| Conteúdo dinâmico | JSON local + renderização client-side |
| Fontes | Google Fonts |
| SEO | Open Graph, canonical, `robots.txt`, `sitemap.xml`, JSON-LD |

## Estrutura do repositório

```text
WebSite_Forneria360/
├── assets/                  # Logos, fotos, imagens do cardápio e arquivos do blog
├── blog/
│   ├── post.html            # Template dinâmico para leitura dos posts
│   ├── pizza-na-pousada.html
│   ├── pizza-napolitana-sao-joao-del-rei.html
│   └── como-escolher-pizza-meio-a-meio.html
├── index.html               # Página inicial
├── cardapio.html            # Página de cardápio
├── sobre.html               # Página institucional
├── localizacao.html         # Página de localização
├── blog.html                # Listagem do blog
├── robots.txt
├── sitemap.xml
└── README.md
```

## Como rodar localmente

Como o blog usa `fetch()` para carregar o arquivo JSON local, o ideal é abrir o projeto com um servidor estático, e não via `file://`.

### Opção 1: Python

```bash
python -m http.server 5500
```

Depois abra `http://localhost:5500`.

### Opção 2: VS Code Live Server

Abra a pasta no VS Code e execute a extensão Live Server na raiz do projeto.

## Conteúdo configurável

Os pontos principais de atualização ficam nestes arquivos:

- `assets/blog-posts.json`: títulos, descrições, imagens e corpo dos posts
- `assets/blog.js`: listagem do blog e renderização dos posts
- `assets/`: logos, fotos, cardápio e imagens de apoio
- `index.html`, `sobre.html`, `cardapio.html`, `localizacao.html`: textos institucionais, CTAs, horários e blocos visuais

## Links principais da operação

- Site: `https://www.forneria360.com.br/`
- Pedido online: `https://instadelivery.com.br/forneria360`
- Instagram: `https://www.instagram.com/forneria_360/`
- Google Maps: `https://maps.app.goo.gl/q2sva2yknLpbwB6Q7`

## Observações

- O projeto não possui `package.json`, pipeline de build ou bundler.
- Cada página concentra seu próprio estilo e scripts locais.
- Se imagens forem substituídas, o caminho pode ser mantido pelo mesmo nome do arquivo para evitar ajustes extras no HTML.

---

<div align="center">
  <p><strong>Forneria 360º · pizza napolitana, presença local e conversão direta.</strong></p>
</div>
