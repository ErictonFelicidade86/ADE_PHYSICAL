// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// //Outros modulos
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskModule } from 'angular2-text-mask';

// // Cadastrar Component
import { ContaComponent } from './conta.component';

// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';

// // Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// // Component Routing
import { PerfilRoutingModule } from './perfil-routing.module';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PerfilRoutingModule,
    TextMaskModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    MatDialogModule
  ],
  declarations: [
  ContaComponent]
})
export class PerfilModule { }
