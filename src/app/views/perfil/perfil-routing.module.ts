import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContaComponent } from './conta.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Perfil'
    },
    children: [
      {
        path: '',
        redirectTo: 'perfil'
      },
      {
        path: 'conta',
        component: ContaComponent,
        data: {
          title: 'Conta'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule {}
