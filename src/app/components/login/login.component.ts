import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private toast: ToastrService, private service: AuthService, private router: Router) { }

  ngOnInit(): void { }

  logar() {
    this.service.authenticate(this.creds).subscribe(response => {
      this.service.successfulLogin(response.headers.get('Authorization').substring(7));
      this.toast.success('Login efetuado com sucesso', 'Entrar', { timeOut: 2000 });
      this.router.navigate(['']);
    }, () => {
      this.toast.error('Usuário ou senha inválidos');
    });
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
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
