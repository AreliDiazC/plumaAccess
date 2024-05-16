import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AgregaOrganizacionInsertComponent } from '../agrega-organizacion-insert/agrega-organizacion-insert.component';
import { UpdateOrganizacionComponent } from '../update-organizacion/update-organizacion.component';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-agregar-org',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatDialogModule, NgbPaginationModule],
  templateUrl: './agregar-org.component.html',
  styleUrl: './agregar-org.component.css'
})
export class AgregarOrgComponent {
  organizaciones: any[] = [];
  page = 1;
	pageSize = 4;
  collectionSize = 0;
  currentPageUsuarios: any[] = [];

  constructor(
    private http: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.http.mostrarOrganizacion().subscribe((data: any) => {
      this.organizaciones = data;
      this.collectionSize = this.organizaciones.length;
      this.refreshOrg();
    })
  }

  refreshOrg() {
		this.currentPageUsuarios = this.organizaciones.map((country: any, i:any) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}

  editar(id: any) {
    localStorage.setItem('id_org_update', id);
    const dialogRef = this.dialog.open(UpdateOrganizacionComponent, {
      width: '60%',
      height: '60%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.http.mostrarOrganizacion().subscribe((data: any) => {
        this.organizaciones = data;
        this.collectionSize = this.organizaciones.length;
        this.refreshOrg();
      })
    });
  }

  crearOrganizacion() {
    const dialogRef = this.dialog.open(AgregaOrganizacionInsertComponent, {
      width: '60%',
      height: '60%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.http.mostrarOrganizacion().subscribe((data: any) => {
        this.organizaciones = data;
        this.collectionSize = this.organizaciones.length;
        this.refreshOrg();
      })
    });
  }
}
