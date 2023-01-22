import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {


  constructor(private service: ChamadoService) { }

  ngOnInit() {
    this.findAll();
  }

  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];
  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade','status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }
    
  statusDescricao(status: any): string {
    if (status == 0) {
      return "ABERTO";
    } else if (status == 1) {
      return "ANDAMENTO";
    } else if (status == 2) {
      return "FECHADO";
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

  orderByStatus(status: any): void {
    let list: Chamado[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if (element.status == status) {
        list.push(element);
      }
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }
}
