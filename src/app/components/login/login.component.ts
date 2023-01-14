import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required, Validators.minLength(3)]);

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  constructor(private toast: ToastrService) { }

  ngOnInit(): void { 
  }

  logar() {
    this.toast.error('Usuário ou senha inválidos', 'Login');
  }

  validaCampos(): boolean {
    if(this.email.valid && this.senha.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Você deve informar um email';
    }

    return this.email.hasError('email') ? 'Email inválido' : '';
  }

  getErrorMessagePassword() {
    if (this.senha.hasError('required')) {
      return 'Você deve informar uma senha';
    }
    return null;
  }
}
