import { NgModule, CUSTOM_ELEMENTS_SCHEMA }             from "@angular/core";
import { LoginComponent }                               from './login/login.component';
import { ReactiveFormsModule, FormsModule }             from '@angular/forms';
import { CommonModule }                                 from '@angular/common';
import { VMessageModule }                               from '../shared/vmessage/vmessage.module';
import { MyFirebaseModule }                             from '../shared/my-firebase/my-firebase.module';
import { HttpClientModule }                             from '@angular/common/http';


@NgModule ({
    declarations: [ LoginComponent, ],
    imports: [
                CommonModule,
                ReactiveFormsModule,
                FormsModule,
                VMessageModule,
                HttpClientModule,
                MyFirebaseModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class HomeModule { }