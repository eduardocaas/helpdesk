import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  };

  nome: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  cpf: FormControl =  new FormControl(null, [Validators.required]);
  email: FormControl = new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(80)]);
  senha: FormControl =  new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(250)]);
  
  constructor(private service: ClienteService, private toast: ToastrService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      resposta.perfis = [];
      this.cliente = resposta;
    });
  }
  

  update(): void {
    this.service.update(this.cliente).subscribe(resposta => {
      this.toast.success('Cliente ' + (this.cliente.nome).toUpperCase() + ' atualizado com sucesso!', 'Atualização', { timeOut: 6000});
      this.router.navigate(['clientes']);
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
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    } 
  }

  limparCampos(): void {
    let checks = document.querySelectorAll('input[type=checkbox]') as HTMLInputElement[] | any;
    checks.forEach(check => {
      check.checked = false;
    });
    this.cliente.nome = '';
    this.cliente.cpf = '';
    this.cliente.email = '';
    this.cliente.senha = '';
    this.cliente.perfis = [];

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


