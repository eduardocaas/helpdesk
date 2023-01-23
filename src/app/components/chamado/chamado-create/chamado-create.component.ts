import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  titulo: FormControl = new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
  observacoes: FormControl = new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(250)]);
  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);

  constructor(private tecnicoService : TecnicoService, private clienteService: ClienteService, 
              private chamadoService: ChamadoService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(resposta => {
      this.toast.success('Chamado criado com sucesso!' , 'Cadastro' , {timeOut: 6000});
      this.router.navigate(['chamados']);
    }, err => {
      if(err.error.errors){
        err.error.errors.forEach(element => {
          this.toast.error(element.message, 'Erro ao cadastrar' , {timeOut: 6000});
          console.log(element.message);
        });
      } else {
        this.toast.error(err.error.message, 'Erro ao cadastrar' , {timeOut: 6000});
        console.log(err.error.message);
      }
    });
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    });
  }

  limparCampos(): void {   
  }

  validaCampos(): boolean {
    return this.titulo.valid && this.observacoes.valid && this.prioridade.valid && this.status.valid && this.tecnico.valid && this.cliente.valid;
  }

  getErrorMessageTitulo(){
    if(this.titulo.hasError('required')){
      return 'Você deve informar um título';
    }
    if(this.titulo.hasError('minlength')){
      return 'O título deve ter no mínimo 5 caracteres';
    }
    if(this.titulo.hasError("maxlength")){
      return 'O título deve ter no máximo 50 caracteres';
    }
    return null;
  }

  getErrorMessageObservacoes(){
    if(this.observacoes.hasError('required')){
      return 'Você deve informar uma descrição';
    }
    if(this.observacoes.hasError('minlength')){
      return 'A descrição deve ter no mínimo 10 caracteres'
    }
    if(this.observacoes.hasError('maxlength')){
      return 'A descrição deve ter no máximo 250 caracteres'
    }
    return null;
  }

  getErrorMessagePrioridade(){
    if(this.prioridade.hasError('required')){
      return 'Você deve selecionar uma prioridade';
    }
    return null;
  }

  getErrorMessageStatus(){
    if(this.status.hasError('required')){
      return 'Você deve selecionar um status'
    }
    return null;
  }

  getErrorMessageTecnico(){
    if(this.tecnico.hasError('required')){
      return 'Você deve selecionar um técnico';
    }
    return null;
  }

  getErrorMessageCliente(){
    if(this.cliente.hasError('required')){
      return 'Você deve selecionar um cliente';
    }
    return null;
  }
}
 