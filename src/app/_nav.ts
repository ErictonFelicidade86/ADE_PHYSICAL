import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'PÁGINA INICIAL',
    url: '/dashboard',
    icon: 'icon-home',
  },
  {
    name: 'Alunos',
    url: '/alunos',
    icon: 'icon-people',
    badge : {
      variant: 'info',
      text: 'NOVO',
    },
    children: [
      {
        name: 'Cadastrar',
        url: '/alunos/cadastrar',
        icon: 'icon-user',
      },
      {
        name: 'Listar',
        url: '/alunos/listar',
        icon: 'icon-people',
      }
    ]
  },
  {
    name: 'Avaliações',
    url: '/avaliacoes',
    icon: 'icon-note',
    badge: {
      variant: 'info',
      text: 'NOVO',
    },
    children: [
      {
        name: 'Agendar',
        url: '/avaliacoes/agendar',
        icon: 'icon-calendar',
      },
      {
       name: 'Consultar',
       url: '/avaliacoes/consultar',
       icon: 'icon-note',
      },
      {
        name: 'Realizar',
        url: '/avaliacoes/tipo',
        icon: 'icon-note',
        children: [
          {
            name: 'Avaliação Simples',
            url: '/avaliacoes/tipo/simples',
            icon: 'icon-user',
          },
        ]
      }
    ]
  },
  {
    name: 'Usuário',
    url: '/avaliacoes/tipo',
    icon: 'icon-note',
    badge : {
      variant: 'info',
      text: 'NOVO',
    },
    children: [
      {
        name: 'Novo Usuário',
        url: '/perfil/conta',
        icon: 'icon-user',
      },
    ]
  },
];

