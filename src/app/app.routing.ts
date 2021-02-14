import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { LoginComponent } from './views/home/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'alunos',
        loadChildren: () => import('./views/alunos/alunos.module').then(m => m.AlunosModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./views/perfil/perfil.module').then(m => m.PerfilModule)
      },
      {
        path: 'avaliacoes',
        loadChildren: () => import('./views/avaliacoes/avaliacoes.module').then(m => m.AvaliacoesModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
