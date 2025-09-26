# Equiparação de Clínicas – Landing Page

Aplicação front-end em React que apresenta os serviços jurídicos de equiparação de clínicas a hospitais. A página enfatiza conformidade ética, critérios técnicos e um fluxo de contato claro para potenciais clientes.

## Stack principal

- **React 19** com **TypeScript**
- **Vite 7** para bundling e servidor de desenvolvimento
- **Tailwind CSS 3** e PostCSS para estilização utilitária
- **Motion 12** (sucessor do Framer Motion) para animações
- **Lucide React** para ícones vetoriais
- **ESLint + TypeScript ESLint** para análise estática do código

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão **18 LTS** ou superior
- npm 10+ (instalado automaticamente com o Node)

Verifique as versões instaladas:

```bash
node --version
npm --version
```

## Como rodar o projeto localmente

```bash
git clone https://github.com/juanmmendes/equiparacao-clinicas.git
cd equiparacao-clinicas
npm install
npm run dev
```

O comando `npm run dev` inicia o servidor de desenvolvimento da Vite (porta padrão `5173`). Acesse `http://localhost:5173` no navegador.

## Scripts disponíveis

| Script           | Descrição                                                                 |
| ---------------- | ------------------------------------------------------------------------- |
| `npm run dev`    | Servidor de desenvolvimento com HMR                                       |
| `npm run build`  | Compila o projeto para produção (`dist/`)                                 |
| `npm run preview`| Servidor local para validar os arquivos gerados após o build              |
| `npm run lint`   | Executa o ESLint usando as regras definidas em `eslint.config.js`         |

## Build e deploy

1. Gere os artefatos de produção:
   ```bash
   npm run build
   ```
2. Os arquivos otimizados ficarão em `dist/`. Você pode publicar essa pasta em qualquer serviço de hosting estático (como GitHub Pages, Netlify, Vercel ou no seu servidor próprio).
3. Para testar o build localmente, rode:
   ```bash
   npm run preview
   ```

## Estrutura resumida

```
├── public/              # Assets públicos copiados sem processamento
├── src/
│   ├── App.tsx          # Página principal da landing page
│   ├── assets/          # Imagens e ícones customizados
│   ├── main.tsx         # Ponto de entrada da aplicação
│   └── index.css        # Estilos globais + Tailwind
├── tailwind.config.ts   # Configuração do Tailwind CSS
├── postcss.config.cjs   # Pipeline PostCSS
└── vite.config.ts       # Configuração do Vite
```

## Próximos passos sugeridos

- Configurar GitHub Actions ou outra pipeline para publicar automaticamente o conteúdo de `dist/` após cada push.
- Adicionar testes end-to-end (ex.: Playwright) para validar formulários e interações principais antes de deploys.

---

Ficou com dúvidas ou quer evoluir a landing page? Abra uma issue ou entre em contato! 💬
