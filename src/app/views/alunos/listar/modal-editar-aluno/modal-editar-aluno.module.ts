import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalEditarAlunoComponent } from './modal-editar-aluno.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [ModalEditarAlunoComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    ModalEditarAlunoComponent
  ]
})
export class ModalEditarAlunoModule { }
