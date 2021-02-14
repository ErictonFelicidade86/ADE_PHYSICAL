import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { AngularFireModule }          from '@angular/fire';
import { AngularFireAuthModule }      from '@angular/fire/auth';
import { environment }                from '../../../../environments/environment';
import { AngularFirestoreModule }     from '@angular/fire/firestore';



@NgModule({
  declarations: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    CommonModule
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ]
})
export class MyFirebaseModule { }
