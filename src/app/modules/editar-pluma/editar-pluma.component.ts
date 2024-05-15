import { Component, Inject, OnInit} from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { usuarioService } from '../../service/usuario.service';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { plumaService } from '../../service/pluma.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-pluma',
  standalone: true,
  imports: [ReactiveFormsModule,MatDialogModule, MatDialogTitle, MatDialogContent],
  templateUrl: './editar-pluma.component.html',
  styleUrl: './editar-pluma.component.css'
})
export class EditarPlumaComponent {

  formularioPluma: FormGroup;
  resultadoData:  any = {};
  organizaciones: any;

  constructor(public dialogRef: MatDialogRef<EditarPlumaComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private pluma: plumaService, private fb: FormBuilder, private usuario:usuarioService, private toastr: ToastrService) {
    this.pluma.mostrarPlumasId(this.data.pluma).subscribe({
      next: (resultData) => {
      
      this.resultadoData = resultData;
         this.formularioPluma.setValue({
          codigo: this.resultadoData[0].codigo_pluma,
          organizacion: this.resultadoData[0].fk_id_organizacion,
          p_id_pluma: this.resultadoData[0].id_pluma
         });
      }
    });

    this.formularioPluma = this.fb.group({
      codigo: ['', [Validators.required]],
      organizacion: ['', [Validators.required]],
      p_id_pluma: [this.data.pluma]
    });
  
  }

  ngOnInit(): void {
    this.verOrg();
  }

  actualizar() {
    if (this.formularioPluma.valid){
      this.pluma.actualizarPluma(this.formularioPluma.value).subscribe({
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
    }else{
      this.toastr.warning('Complete los campos requeridos', 'Error', {
        positionClass: 'toast-bottom-left',
      }); 
    }
  }

  cerrarDialogo(){
    this.dialogRef.close(true);
  }

  verOrg(){
    this.pluma.verOrganizacion().subscribe((respuesta) =>{
      this.organizaciones = respuesta;
    })
  }

}
