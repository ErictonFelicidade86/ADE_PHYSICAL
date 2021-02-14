import { AlunosService } from './shared/alunos.service';
// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// //Outros modulos
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskModule } from 'angular2-text-mask';

// // Cadastrar Component
import { CadastrarComponent } from './cadastro/cadastrar.component';
// Listar Aluno Component
import { ListarAlunoComponent } from './listar/listarAluno.component';

// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';

// // Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// // Component Routing
import { AlunosRoutingModule } from './alunos-routing.module';

// // BsDatePickerModule
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// Modall
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalEditarAlunoModule } from './listar/modal-editar-aluno/modal-editar-aluno.module';
import { ModalEditarAlunoComponent } from './listar/modal-editar-aluno/modal-editar-aluno.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalEditarAlunoModule,
    MatDialogModule,
    AlunosRoutingModule,
    TextMaskModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    CadastrarComponent,
    ListarAlunoComponent,
  ],
  entryComponents: [
    ModalEditarAlunoComponent
  ],
  providers: [
    AlunosService,
    MatDialog
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AlunosModule { }
