import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { retry } from 'rxjs';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  
  titulo: FormControl = new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
  descricao: FormControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);
  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);

  constructor() { }

  ngOnInit(): void {
  }

  limparCampos(): void {   
  }

  validaCampos(): boolean {
    return this.titulo.valid && this.descricao.valid && this.prioridade.valid && this.status.valid && this.tecnico.valid && this.cliente.valid;
  }

  getErrorMessageTitulo(){
    if(this.titulo.hasError('required')){
      return 'Você deve inserir um título';
    }
    if(this.titulo.hasError('minlength')){
      return 'O título deve ter no mínimo 5 caracteres';
    }
    if(this.titulo.hasError("maxlength")){
      return 'O título deve ter no máximo 50 caracteres';
    }
    return null;
  }

  getErrorMessageDescricao(){
    if(this.descricao.hasError('required')){
      return 'Você deve inserir uma descrição';
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
 