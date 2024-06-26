import { Component, Inject, OnInit} from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { organizacionService } from '../../service/organizacion.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar-tipo-organizacion',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogModule,MatDialogTitle,MatDialogContent],
  templateUrl: './editar-tipo-organizacion.component.html',
  styleUrl: './editar-tipo-organizacion.component.css'
})
export class EditarTipoOrganizacionComponent implements OnInit{
  formularioEditarTipoOrganizacion: FormGroup;
  id: any;
  resultadoData:  any = {};

  constructor(public dialogRef: MatDialogRef<EditarTipoOrganizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private fb: FormBuilder, private organizacion:organizacionService, private toastr: ToastrService) {
      
      this.organizacion.verTipoOrgID(this.data.organizacion).subscribe({
        next: (resultData) => {
        this.resultadoData = resultData;
           this.formularioEditarTipoOrganizacion.setValue({
            nombre_tipo_organizacion: this.resultadoData[0].nombre_tipo_organizacion,
            p_id_tipo_organizacion: this.resultadoData[0].id_tipo_organizacion, 
           });
        }
      });

      this.formularioEditarTipoOrganizacion = this.fb.group({
        nombre_tipo_organizacion: ['', [Validators.required]],
        p_id_tipo_organizacion: [this.data.organizacion],
      });
    }

    ngOnInit(): void { }
    
    actualizaTipOrg() {
      if (this.formularioEditarTipoOrganizacion.valid){     
        this.organizacion.actualizaTipOrg(this.formularioEditarTipoOrganizacion.value).subscribe({
        next: (respuesta) => {
          Swal.fire({
            title: '¡Registro actualizado con exito!',
            icon: 'success',
            text: 'Datos ingresados exitosamente',
            timer: 2000
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          Swal.fire({
            title: '¡Oops..!',
            icon: 'error',
            text: 'Hubo un error al querer registrar',
            timer: 2000
          });
          this.dialogRef.close(true);
        }
      });
    }
    else{
        this.toastr.warning('Complete los campos requeridos', 'Error', {
          positionClass: 'toast-bottom-left',
        }); 
      }
    }
    

    cerrarDialogo(){
      this.dialogRef.close(true);
    }
}
