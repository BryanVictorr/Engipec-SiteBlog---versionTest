# Engipec - Sistema de Gerenciamento

Sistema de gerenciamento de funcionários e artigos desenvolvido para a Engipec.

## Funcionalidades

- Sistema de autenticação para admin e funcionários
- Gerenciamento de funcionários (CRUD completo)
- Gerenciamento de artigos
- Perfil de funcionário com foto
- Dashboard administrativo
- Sistema de categorias para artigos
- Gerenciamento de cargos e departamentos

## Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- Shadcn/ui
- React Hook Form
- Zod
- Context API

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/engipec-siteBlog.git
```

2. Entre no diretório do projeto:
```bash
cd engipec-siteBlog
```

3. Instale as dependências:
```bash
npm install
# ou
yarn install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Acesse o sistema em `http://localhost:5173`

## Credenciais Padrão

### Administrador
- Email: admin@engipec.com.br
- Senha: admin123

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── context/       # Contextos da aplicação
  ├── lib/           # Utilitários e funções auxiliares
  ├── pages/         # Páginas da aplicação
  └── styles/        # Estilos globais
```

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
