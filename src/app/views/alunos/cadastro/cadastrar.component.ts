// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Adicionais
import { ToastrManager } from 'ng6-toastr-notifications';
// Projeto
import { Aluno } from '../shared/aluno';
import { AlunoDataService } from '../shared/aluno-data.service';
import { AlunosService } from '../shared/alunos.service';
import { EstadoBr, CidadeBr } from '../estado-cidade-br';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['../alunos.component.css']
})
export class CadastrarComponent implements OnInit {

  // //Mascaras de texto
  dataMask = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  phoneMask = ['(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  celPhoneMask = ['(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cepMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  cpfMask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  private CSScep: string;
  private estados: Observable<EstadoBr[]>;
  private cidades: Observable<CidadeBr[]>;
  private novoAluno: FormGroup;

  aluno: Aluno
  key: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrManager,
    private service: AlunosService,
    private alunoDataService: AlunoDataService) {

    this.novoAluno = this.formBuilder.group({
      nome: [null, [Validators.required]],
      dataNascimento: [null],
      sexo: [null, [Validators.required]],
      cep: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      rua: [null],
      bairro: [null],
      estado: [null],
      cidade: [null],
      complemento: [null],
      telefone: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      celular: [null, [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
      cpf: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      responsavel: [null],
      email: [null, [Validators.required, Validators.email]],
      faixaEtaria: [null],
      etnia: [null],
      descricao: [null, [Validators.maxLength(500)]]
    });
  }

  getNovoAluno(){
    return this.novoAluno;
  }

  getEstados(){
    return this.estados;
  }

  getCidades(){
    return this.cidades;
  }

  consultaCEP() {
    let cep = this.novoAluno.get('cep').value;
    //Verifica se campo cep possui valor informado.
    if (cep != "" && cep != null) {
      this.service.consultaCEP(cep).subscribe(resp => {
        if (!("erro" in resp)) {
          this.populaFormulario(resp);
          this.CSScep = "is-valid";
        } else {
          this.toastr.warningToastr('CEP inválido', 'Atenção');
          this.CSScep = "is-invalid";
        }
      });
    }
  }

  populaFormulario(dados) {
    this.novoAluno.patchValue({
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
    });
  }

  verificaValidação(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if (controle instanceof FormGroup) {
        this.verificaValidação(controle);
      }
    });
  }

  validacaoCSS(campo: string) {
    let atributo = this.novoAluno.get(campo)
    switch (campo) {
      case 'cpf': {

      }
      case 'cep': {
        return this.verificaCampo(campo);
      }
      case 'telefone': {
        return this.verificaCampo(campo);
      }
      case 'celular': {
        return this.verificaCampo(campo);
      }
      default: {
        if (atributo.invalid && (atributo.touched || atributo.dirty)) { return "is-invalid" }
        if (atributo.valid && (atributo.touched || atributo.dirty)) { return "is-valid" }
      }
    }

  }

  verificaCampo(campo) {
    let tamanho;
    if (campo == 'rg') { tamanho = 8; }
    if (campo == 'cep') {
      if (this.CSScep == ''){
        tamanho = 8;
      } else {
        return this.CSScep;
      }
    }
    if (campo == 'cpf') { tamanho = 11; }
    if (campo == 'celular') { tamanho = 11; }

    let atributo = this.novoAluno.get(campo);
    if (atributo.value != null && atributo.value != '') {
      let atributoValor = atributo.value.replace(/[^0-9]+/g, '');
      if (atributoValor.length < tamanho) {
        if (atributo.touched || atributo.pristine) { return "is-invalid" }
      } else if (atributoValor.length == tamanho) {
        if (atributo.valid && (atributo.touched || atributo.dirty)) { return "is-valid" }
      }
    } else if (atributo.invalid && (atributo.touched || atributo.dirty)) { return "is-invalid" }
  }

  ConstruirCidades(){
    if (this.novoAluno.get('estado').value != null && this.novoAluno.get('estado').value != ''){
      this.cidades = this.service.getCidadesBR();
    }
  }

  ngOnInit(){
    this.estados = this.service.getEstadosBR();
    this.aluno = new Aluno();
    this.alunoDataService.currentAluno.subscribe(data => {
      if (data.aluno && data.key){
        this.aluno = new Aluno();
        this.aluno.nome = data.aluno.nome;
        this.aluno.dataNascimento = data.aluno.dataNascimento;
        this.aluno.sexo = data.aluno.sexo;
        this.aluno.cep = data.aluno.cep;
        this.aluno.rua = data.aluno.rua;
        this.aluno.bairro = data.aluno.bairro;
        this.aluno.estado = data.aluno.estado;
        this.aluno.cidade = data.aluno.cidade;
        // this.aluno.complemento = data.aluno.complemento;
        // this.aluno.telefone = data.aluno.telefone;
        this.aluno.celular = data.aluno.celular;
        this.aluno.cpf = data.aluno.cpf;
        // this.aluno.responsavel = data.aluno.responsavel;
        this.aluno.email = data.aluno.email;
        // this.aluno.faixaEtaria = data.aluno.faixaEtaria
        // this.aluno.etnia = data.aluno.etnia;
        // this.aluno.descricao = data.aluno.descricao;
        this.key = data.key;
      }
    })
  }

  onSubmit(){
    if (this.key){
      this.service.update(this.aluno, this.key);
    } else {
      this.service.insert(this.aluno);
    }
    this.aluno = new Aluno();
    this.novoAluno.reset();

  }

}
