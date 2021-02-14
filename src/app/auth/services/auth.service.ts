import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthService {

  public user: User;

  constructor(public angularAuth: AngularFireAuth) { }

  async login(email: string, password: string) {
    try{
      const result = await this.angularAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error){
      console.log(error);
    }
  }

  async logout (){
    try{
      await this.angularAuth.signOut();
    } catch (error){
      console.log(error);
    }
  }

  getCurrentUser(){
    return this.angularAuth.authState.pipe(first()).toPromise();
  }

}