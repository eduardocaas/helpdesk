import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  };

  nome: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  cpf: FormControl =  new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]);
  email: FormControl = new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(80)]);
  senha: FormControl =  new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
  
  constructor(private service: TecnicoService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  
  create(): void {
    this.service.create(this.tecnico).subscribe(resposta => {
      this.toast.success('Técnico criado com sucesso!', 'Cadastro', { timeOut: 6000});
    }, err => {
      if(err.error.errors) {
        err.error.errors.forEach(element => {
          this.toast.error(element.message, 'Erro', { timeOut: 6000});
        });
      } else {
        this.toast.error(err.error.message, 'Erro', { timeOut: 6000});
      }     
    });
  }

  addPerfil(perfil: any): void {
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    } 
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }
  
  getErrorMessageNome(){
    if (this.nome.hasError('required')) {
      return 'Você deve informar um nome';
    }
    if (this.nome.hasError('maxlength')) {
      return 'O nome deve ter no máximo 50 caracteres';
    }
    if (this.nome.hasError('minlength')) {
      return 'O nome deve ter no mínimo 3 caracteres';
    }
    return null;
  }

  getErrorMessageCpf(){
    if (this.cpf.hasError('required')) {
      return 'Você deve informar um CPF';
    }
    if (this.cpf.hasError('minlength')) {
      return 'CPF inválido';
    }
    if (this.cpf.hasError('maxlength')) {
      return 'CPF inválido';
    }
    return null;
  }

  getErrorMessageEmail(){
    if (this.email.hasError('required')) {
      return 'Você deve informar um email';
    }
    if (this.email.hasError('maxlength')) {
      return 'O email deve ter no máximo 80 caracteres';
    }

    return this.email.hasError('email') ? 'Email inválido' : '';
  }

  getErrorMessagePassword() {
    if (this.senha.hasError('minlength')) {
      return 'A senha deve ter no mínimo 5 caracteres';
    }
    if (this.senha.hasError('maxlength')) {
      return 'A senha deve ter no máximo 50 caracteres';
    }
    if (this.senha.hasError('required')) {
      return 'Você deve informar uma senha';
    }

    return null;
  }

}



