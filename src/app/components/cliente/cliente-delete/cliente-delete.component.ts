import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  };

  constructor(private service: ClienteService, private toast: ToastrService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      this.cliente = resposta;
    });
  }
  

  delete(): void {
    this.service.delete(this.cliente.id).subscribe(resposta => {
      this.toast.success('Cliente ' + (this.cliente.nome).toUpperCase() + ' deletado com sucesso!', 'Delete', { timeOut: 6000});
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

}
