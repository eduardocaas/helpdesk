import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent {

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

  constructor(private chamadoService: ChamadoService, private toast: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(reposta => {
      this.chamado = reposta;
    }, err => {
      this.toast.error(err.error.error, 'Erro ao buscar chamado', {timeOut: 6000});
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
}
