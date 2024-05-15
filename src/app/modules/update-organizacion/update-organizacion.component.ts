import { Component, Inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { AuthService } from '../../service/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { time } from 'console';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-update-organizacion',
  standalone: true,
  imports: [NgFor, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogModule, MatDialogTitle, MatDialogContent],
  templateUrl: './update-organizacion.component.html',
  styleUrl: './update-organizacion.component.css'
})
export class UpdateOrganizacionComponent {
  constructor(public dialogRef: MatDialogRef<UpdateOrganizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string, private fb: FormBuilder, private http: AuthService) { }
  //variable global almacena id localstorage de la organizacion seleccionada
  idOrg: any;
  //variable array que almacena lov de tipo de organizaciones
  arrayTipoOrg: any[] = [];
  //llenar inputs con valores
  datos: any[] = [];

  async ngOnInit() {
    this.http.LovTipoUsers('tipoOrganizacion').subscribe((data: any) => {
      this.arrayTipoOrg = data;
    })
    let idOrglocalstorage = this.idOrg = await localStorage.getItem('id_org_update');
    this.http.mostrarOrganizacionForID(idOrglocalstorage).subscribe((data: any) => {
      this.datos = data;
    })

  }

  async modificarOrganizacion() {
    let idOrglocalstorage = this.idOrg = await localStorage.getItem('id_org_update');

    this.http.actualizar_organizacion(idOrglocalstorage, this.datos[0].nombre_organizacion, this.datos[0].fk_id_tipo_organizacion).subscribe((data: any) => {
      if (data.success == 1) {
        Swal.fire({
          title: 'Actualizacion Exitoso!',
          icon: 'success',
          text: 'Datos Actualizados exitosamente',
          timer: 2000
        })
      } else {
        Swal.fire({
          title: '¡Oops..!',
          icon: 'error',
          text: 'Hubo un error al querer actualizar el registro',
          timer: 2000
        });
      }

    })

  }

  cerrarDialogo() {
    this.dialogRef.close(true);
  }
}
