import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  };

  constructor(private service: TecnicoService, private toast: ToastrService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      this.tecnico = resposta;
    });
  }
  

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe(resposta => {
      this.toast.success('Técnico ' + (this.tecnico.nome).toUpperCase() + ' deletado com sucesso!', 'Delete', { timeOut: 6000});
      this.router.navigate(['tecnicos']);
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
