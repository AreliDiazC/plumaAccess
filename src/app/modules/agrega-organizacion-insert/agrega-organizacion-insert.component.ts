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
@Component({
  selector: 'app-agrega-organizacion-insert',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogModule, MatDialogTitle, MatDialogContent],
  templateUrl: './agrega-organizacion-insert.component.html',
  styleUrl: './agrega-organizacion-insert.component.css'
})
export class AgregaOrganizacionInsertComponent {
  resultado!: string;
  //variable array que almacena lov de tipo de organizaciones
  arrayTipoOrg: any[] = [];

  constructor(public dialogRef: MatDialogRef<AgregaOrganizacionInsertComponent>,
  @Inject(MAT_DIALOG_DATA) public mensaje: string, private fb: FormBuilder, private http: AuthService) { }
  formularioContacto = this.fb.group({
    nombre: ['', [Validators.required]],
    organizacion: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.http.LovTipoUsers('tipoOrganizacion').subscribe((data: any) => {
      this.arrayTipoOrg = data;
    })
  }

  submit() {
    this.http.insertar_org(this.formularioContacto.value.nombre, this.formularioContacto.value.organizacion).subscribe((data: any) => {
      if (data.length > 0) {
        Swal.fire({
          title: '¡Registro Exitoso!',
          icon: 'success',
          text: 'Datos ingresados exitosamente',
          timer: 2000

        });
      } else {
        Swal.fire({
          title: '¡Oops..!',
          icon: 'error',
          text: 'Hubo un error al querer registrar',
          timer: 2000
        });
      }
    })

    if (this.formularioContacto.valid) {
      this.resultado = "Todos los datos son válidos";
    }
    else {
      this.resultado = "Hay datos inválidos en el formulario";
    }

  }

  cerrarDialogo() {
    this.dialogRef.close(true);
  }
}
