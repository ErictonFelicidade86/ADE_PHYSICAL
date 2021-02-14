import { of } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstadoBr, CidadeBr } from '../estado-cidade-br';

import { Aluno } from "./aluno";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  findById: any;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
    ) { }

  insert(aluno: Aluno){
    this.db.list('aluno').push(aluno)
    .then((result: any) => {
      // console.log(result.key);
    })
  }

  update(aluno: Aluno, key: string){
    // console.log(key);
    this.db.list('aluno').update(key, aluno)
    .then((data: any) => {
      // console.log(data);
    })
    .catch((error: any) =>{
      console.error(error);
    })
  }

  getAll(){
    return this.db.list('aluno')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
      })
    );
  }

  detlete(key: string){
    this.db.object(`aluno/${key}`).remove();
  }

  consultaCEP(cep: string){
    //Verifica se campo cep possui valor informado.
    if (cep != "" && cep != null){
      cep = cep.replace('-', '');
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;
      //Valida o formato do CEP.
      if(validacep.test(cep)) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
      }
    }
    return of ({'erro': true});
  }

  getEstadosBR(){
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }

  getCidadesBR(){
    return this.http.get<CidadeBr[]>('assets/dados/cidadesbr.json');
  }
}