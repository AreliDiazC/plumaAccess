import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AgregaOrganizacionInsertComponent } from '../agrega-organizacion-insert/agrega-organizacion-insert.component';
import { UpdateOrganizacionComponent } from '../update-organizacion/update-organizacion.component';
@Component({
  selector: 'app-agregar-org',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatDialogModule],
  templateUrl: './agregar-org.component.html',
  styleUrl: './agregar-org.component.css'
})
export class AgregarOrgComponent {
  organizaciones: any[] = [];

  constructor(
    private http: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.http.mostrarOrganizacion().subscribe((data: any) => {
      this.organizaciones = data;
    })
  }
  editar(id: any) {
    localStorage.setItem('id_org_update', id);
    const dialogRef = this.dialog.open(UpdateOrganizacionComponent, {
      width: '60%',
      height: '80%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
    });

  }
  crearOrganizacion() {
    const dialogRef = this.dialog.open(AgregaOrganizacionInsertComponent, {
      width: '60%',
      height: '80%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
