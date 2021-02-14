import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aluno } from '../../shared/aluno';
import { AlunosService } from '../../shared/alunos.service';

@Component({
  selector: 'app-modal-editar-aluno',
  templateUrl: './modal-editar-aluno.component.html',
  styleUrls: ['./modal-editar-aluno.component.css']
})
export class ModalEditarAlunoComponent {
  
  public aluno: Aluno;

  constructor(@Inject(MAT_DIALOG_DATA)
    public data: any,
    private service: AlunosService) {
    // console.log('DADOS VINDO DA LISTAGEM', data)
    this.aluno = this.data;
  }

  edit(data: Aluno){
    this.service.update(data, data.key);
  }

}
