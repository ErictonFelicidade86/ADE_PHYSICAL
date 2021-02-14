import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarComponent } from './cadastro/cadastrar.component';
import { ListarAlunoComponent } from './listar/listarAluno.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Alunos'
    },
    children: [
      {
        path: '',
        redirectTo: 'alunos'
      },
      {
        path: 'cadastrar',
        component: CadastrarComponent,
        data: {
          title: 'Cadastrar'
        }
      },
      {
        path: 'listar',
        component: ListarAlunoComponent,
        data: {
          title: 'Listar Aluno'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule {}
