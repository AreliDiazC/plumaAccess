import { Component,OnInit } from '@angular/core';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MatIcon } from '@angular/material/icon';
import { InsertTipoOrgComponent } from '../insert-tipo-org/insert-tipo-org.component';
import { organizacionService } from '../../service/organizacion.service';
import { EditarTipoOrganizacionComponent } from '../editar-tipo-organizacion/editar-tipo-organizacion.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-tipo-organizacion',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, PaginationModule, MatIcon,NgbPaginationModule],
  templateUrl: './tipo-organizacion.component.html',
  styleUrl: './tipo-organizacion.component.css'
})
export class TipoOrganizacionComponent implements OnInit{

  tiposOrganizaciones: any;
  page = 1;
	pageSize = 4;
  collectionSize = 0;
  currentPageTipo: any[] = [];
  
  constructor(
    public dialog: MatDialog, 
    private organizacion: organizacionService
  ) {
   }
    
  ngOnInit(): void {
    this.verOrganizacion();
  }

   verOrganizacion() {
    this.organizacion.tiposOrganizaciones().subscribe((respuesta) => {
      this.tiposOrganizaciones = respuesta;
      this.collectionSize = this.tiposOrganizaciones.length;
      this.refreshTipo();
    });
  }

   refreshTipo() {
		this.currentPageTipo = this.tiposOrganizaciones.map((country: any, i:any) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}

   insert_tipo_org() {
    const dialogRef = this.dialog.open(InsertTipoOrgComponent, {
      width: '60%', 
      height: '80%', 
      disableClose: true, 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.organizacion.tiposOrganizaciones().subscribe((respuesta) => {
        this.tiposOrganizaciones = respuesta;
      });
    });
  }

  editar(organizacion: any) {
    const dialogRef = this.dialog.open(EditarTipoOrganizacionComponent, {
      width: '60%',
      height: '80%',
      disableClose: true,
      data: { organizacion: organizacion.id_tipo_organizacion }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.organizacion.tiposOrganizaciones().subscribe((respuesta) => {
        this.tiposOrganizaciones = respuesta;
      });
    });
  }

}