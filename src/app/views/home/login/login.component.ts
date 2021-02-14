import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {

        url="../../../assets/img/logo-img/logo-ade.fw.png";

        loginForm: FormGroup;
        password: any;
        email: any;

        constructor(
          private formBuilder: FormBuilder,
          private angularFire: AngularFireAuth,
          private authService: AuthService,
          private router: Router) { }

        ngOnInit(): void {
          this.loginForm = this.formBuilder.group({
              email:    ['', Validators.required],
              password: ['', Validators.required]
          });
        }
        async login() {
          console.log(this.loginForm.getRawValue());
          this.email = this.loginForm.get('email').value;
          this.password = this.loginForm.get('password').value;
          // LOGAR COM FIREBASE
          this.angularFire.signInWithEmailAndPassword(this.email, this.password).then((res) => {
            console.log(res);
          }, (error) => {
            console.log(error)
          })
          try{
            const user = await this.authService.login(this.email, this.password);
            if (user){
              // redirecionar
              this.router.navigate(['./dashboard'])
            }
          } catch(error){
            console.log(error);
          }
        }
}
