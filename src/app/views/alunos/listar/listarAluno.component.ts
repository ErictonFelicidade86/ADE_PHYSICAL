import { Aluno }                                from './../shared/aluno';
import { AlunosService }                        from '../shared/alunos.service';
import { Component, OnInit  }                   from '@angular/core';
import { Observable }                           from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { ModalEditarAlunoComponent } from './modal-editar-aluno/modal-editar-aluno.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-listarAluno',
  templateUrl: './listarAluno.component.html',
  styleUrls: ['./listarAluno.component.scss']
})
export class ListarAlunoComponent implements OnInit {

  alunos: Observable<any>;
  data: Observable<any>;
  public form: FormGroup;
  aluno: any;

  
  constructor(
    private alunosService: AlunosService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.alunos = this.alunosService.getAll();
  }

  delete(key: string){
    this.alunosService.detlete(key);
  }

  openModal(aluno: Aluno){
    let dialogRef = this.dialog.open(ModalEditarAlunoComponent, {
      height: '540px',
      width: '800px',
      data: aluno
    });

  }

  search(){

  }
  

}
