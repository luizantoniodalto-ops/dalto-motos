# 🏍️ Apex Moto Tires - E-commerce de Pneus de Alta Performance

Landing page e e-commerce moderno, agressivo e de alta conversão especializado em pneus para motocicletas esportivas, street, touring, trail e off-road.

Inspirado na identidade visual da linha **Metzeler Sportec M9 RR**, com fundo preto/grafite, detalhes em laranja vibrante, tipografia racing e localizador inteligente de pneus por marca, modelo e ano da moto.

---

## 🚀 Como Publicar no GitHub e Netlify

O projeto já está 100% configurado para deploy imediato no **Netlify** via **GitHub** com suporte total a Single Page Application (SPA), redirecionamento de rotas e compressão de ativos.

### Arquivos de Configuração Inclusos
- `netlify.toml`: Define o comando de build (`npm run build`), diretório de saída (`dist`), versão do Node.js (20) e regras de redirecionamento SPA e cabeçalhos de segurança.
- `public/_redirects`: Regra de fallback SPA (`/* /index.html 200`) para garantir que links diretos e recarregamentos de página nunca gerem erro 404.

---

### Passo 1: Enviar o Projeto para o GitHub

1. No seu terminal local, dentro da pasta do projeto, inicialize o repositório Git (caso ainda não esteja inicializado):
```bash
git init
git add .
git commit -m "feat: landing page e-commerce apex moto tires"
```

2. Crie um novo repositório no seu GitHub (ex.: `apex-moto-tires`).

3. Conecte o repositório local ao GitHub e envie os arquivos:
```bash
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/apex-moto-tires.git
git push -u origin main
```

---

### Passo 2: Publicar no Netlify via GitHub (Deploy Contínuo Automático)

Esta é a opção recomendada, pois **qualquer alteração enviada ao GitHub atualizará o site na Netlify automaticamente**:

1. Acesse **[app.netlify.com](https://app.netlify.com)** e faça login (pode usar sua conta do GitHub).
2. Clique no botão **"Add new site"** > **"Import an existing project"**.
3. Escolha **GitHub** e selecione o repositório `apex-moto-tires`.
4. As configurações já serão detectadas automaticamente pelo arquivo `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Clique em **"Deploy apex-moto-tires"**.

Em menos de 1 minuto seu site estará online com link público seguro (`https://seu-site.netlify.app`).

---

### Opção Alternativa: Publicar Direto pelo Terminal (Netlify CLI)

Se você preferir publicar sem precisar conectar o GitHub de imediato:

1. Gere a versão de produção:
```bash
npm run build
```

2. Faça o deploy manual via Netlify CLI:
```bash
npx netlify deploy --prod --dir=dist
```
Siga as instruções rápidas na tela para autenticar e publicar.

---

### 🌐 Adicionando Domínio Personalizado (ex.: `apexmoto.com.br`)

No painel do Netlify:
1. Vá em **Site configuration** > **Domain management** > **Add a domain**.
2. Digite seu domínio próprio e configure os apontamentos de DNS (CNAME ou nameservers da Netlify).
3. O certificado de segurança **SSL/HTTPS gratuito** é emitido automaticamente em minutos.

---

## 🛠️ Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento local na porta 3000.
- `npm run build`: Compila e otimiza a aplicação para produção na pasta `dist/`.
- `npm run preview`: Pré-visualiza localmente os arquivos compilados da pasta `dist/`.
- `npm run lint`: Valida tipos e sintaxe com TypeScript (`tsc --noEmit`).

---

## ⚡ Tecnologias Utilizadas
- **React 19** + **TypeScript**
- **Vite 8** (Build ultra-rápido)
- **Tailwind CSS v4**
- **Lucide React** (Ícones modernos)
- **Motion** (Micro-animações)
