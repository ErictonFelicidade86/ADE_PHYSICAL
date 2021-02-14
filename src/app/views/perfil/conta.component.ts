import { Component, OnInit, ViewChild }                             from '@angular/core';
import { FormBuilder, FormGroup, Validators }       from '@angular/forms';
import { HttpClient }                                               from '@angular/common/http';
import { ToastrManager }                                            from 'ng6-toastr-notifications';
import { ModalDirective }                                           from 'ngx-bootstrap/modal';
import { AngularFireAuth }                                          from '@angular/fire/auth';
import { FirebaseError }                                            from 'firebase';
import { AngularFirestore }                                         from '@angular/fire/firestore';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./perfil.component.css']
})
export class ContaComponent implements OnInit {

  @ViewChild('myModal')           public myModal: ModalDirective;
  @ViewChild('largeModal')        public largeModal: ModalDirective;
  @ViewChild('smallModal')        public smallModal: ModalDirective;
  @ViewChild('primaryModal')      public primaryModal: ModalDirective;
  @ViewChild('successModal')      public successModal: ModalDirective;
  @ViewChild('warningModal')      public warningModal: ModalDirective;
  @ViewChild('dangerModal')       public dangerModal: ModalDirective;
  @ViewChild('infoModal')         public infoModal: ModalDirective;

  // //Mascaras de texto
  celPhoneMask = ['(',/[0-9]/, /\d/, ')',' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cepMask = [/[0-9]/, /\d/,/\d/ ,/\d/ ,/\d/, '-', /\d/, /\d/, /\d/];

  // //Form Groups
  contaForm: FormGroup;

  email:            any;
  senha:            any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrManager,
    private angularFire: AngularFireAuth,
    private angularFirestore: AngularFirestore) {


    this.contaForm = this.formBuilder.group ({
      nome: [null, [Validators.required]],
      email: [null,[Validators.required,Validators.email]],
      senha: [null, [
                      Validators.required,
                      //Validators.pattern(/^[A-Z-9_\-]+$/),
                      Validators.minLength(6),
                      Validators.maxLength(30)
                    ]
      ],
      confirmaSenha: [null, [
                      Validators.required,
                      //Validators.pattern(/^[A-Z-9_\-]+$/),
                      Validators.minLength(6),
                      Validators.maxLength(30)
                    ]
      ],
      cep: [null,[Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    });
  }

  cadastrar(){
    this.email = this.contaForm.get('email').value;
    this.senha = this.contaForm.get('senha').value;
    this.angularFire.createUserWithEmailAndPassword(this.email, this.senha).then((resposta) => {

      // SE CADASTROU, ATUALIZA O NOME DO USUARIO
      resposta.user.updateProfile({
        displayName: this.contaForm.get('nome').value
      }).then(() => {
        // SE ATUALIZOU INSERE AS OUTRAS INFORMACOES NO FIREBASE
        const nome = this.contaForm.get('nome').value;
        const email = this.contaForm.get('email').value;
        const senha = this.contaForm.get('senha').value;
        const confirmaSenha = this.contaForm.get('confirmaSenha').value;

        const firebaseArray ={
          'nome': nome, 'email': email, 'senha': senha, 'confirmaSenha': confirmaSenha
        }
        this.angularFirestore.collection('login-usuarios').doc(resposta.user.uid).set(firebaseArray).then((res) => {
          console.log('RESPOSTA DO FIRESTORE', res);
        }, (error) => console.log(error))
      }, (error) => console.log(error))

    }, (error: FirebaseError) => {
      switch (error.code){
        case 'auth/invalid-email':
          alert('seu email é invalido.');
          break;
        case 'auth/email-already-in-use':
          alert('O email já existe.');
          break;
        case 'auth/weak-password':
          alert('Minimo 6 caracteres na senha.');
          break;
      }
    })
    this.contaForm.reset();
  }

  consultaCEP(){
    let cep = this.contaForm.get('cep').value;
    cep = cep.replace('-', '');
    //Verifica se campo cep possui valor informado.
    if (cep != ""){
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;
      //Valida o formato do CEP.
      if(validacep.test(cep)) {
        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
        .subscribe(resp => {
          if (!("erro" in resp)) {
            this.populaFormulario(resp);
          } else {
            this.toastr.warningToastr('CEP inválido','Atenção');
          }
        });
      }
    }
  }

  populaFormulario(dados){
    this.contaForm.patchValue({
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
    });
  }

  modalReset(){
    this.contaForm.reset();
  }

  verificaValidação(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if (controle instanceof FormGroup){
        this.verificaValidação(controle);
      }
    });
  }

  validacaoCSS(campo: string){
    let atributo = this.contaForm.get(campo);
    if (atributo.valid && (atributo.touched || atributo.dirty)){ return "is-valid" }
    if (atributo.invalid && (atributo.touched || atributo.dirty)) { return "is-invalid" }
  }

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
  }

  expanded(event: any): void {
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  ngOnInit(): void {
  }

}
