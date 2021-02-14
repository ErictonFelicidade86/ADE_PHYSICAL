import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Aluno } from './aluno';

@Injectable({
    providedIn: 'root'
})

export class AlunoDataService {
    private alunoSource = new BehaviorSubject({ aluno: null, key: '' });
    currentAluno = this.alunoSource.asObservable();

    constructor() {}
        changeAluno(aluno: Aluno, key: string) {
            this.alunoSource.next({ aluno: aluno, key: key });
            // console.log(key);
        }
}