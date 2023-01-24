import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit{

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
              private chamadoService: ChamadoService, private toast: ToastrService, 
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(reposta => {
      this.chamado = reposta;
    }, err => {
      this.toast.error(err.error.error, 'Erro ao buscar chamado', {timeOut: 6000});
    });
  }

  update(): void {
    this.chamadoService.update(this.chamado).subscribe(resposta => {
      this.toast.success('Chamado ID: ' + this.chamado.id + ' atualizado com sucesso!' , 'Atualização' , {timeOut: 6000});
      this.router.navigate(['chamados']);
    }, err => {
      if(err.error.errors){
        err.error.errors.forEach(element => {
          this.toast.error(element.message, 'Erro ao atualizar' , {timeOut: 6000});
          console.log(element.message);
        });
      } else {
        this.toast.error(err.error.message, 'Erro ao atualizar' , {timeOut: 6000});
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

  statusDescricao(status: any): string {
    if (status == 0) {
      return "ABERTO";
    } else if (status == 1) {
      return "ANDAMENTO";
    } else if (status == 2) {
      return "ENCERRADO";
    } else {
    return "NÃO INFORMADO";
    }
  }

  prioridadeDescricao(prioridade: any): string {
    if (prioridade == 0) {
      return "BAIXA";
    }
    else if (prioridade == 1) {
      return "MÉDIA";
    }
    else if (prioridade == 2) {
      return "ALTA";
    }
    else {
      return "NÃO INFORMADO";
    }
  }

  limparCampos(): void {
    this.chamado.titulo = '';
    this.chamado.status = '';
    this.chamado.prioridade = '';
    this.chamado.tecnico = '';
    this.chamado.cliente = '';
    this.chamado.observacoes = '';
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
 

