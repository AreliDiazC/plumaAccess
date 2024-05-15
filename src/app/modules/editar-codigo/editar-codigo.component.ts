import { Component, OnInit, Inject} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { plumaService } from '../../service/pluma.service';
import { codigoService } from '../../service/codigo.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar-codigo',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule,MatButtonModule],
  templateUrl: './editar-codigo.component.html',
  styleUrl: './editar-codigo.component.css'
})
export class EditarCodigoComponent {

  formularioPluma: FormGroup;
  plumas: any;
  resultadoData:  any = {};

  constructor(public dialogRef: MatDialogRef<EditarCodigoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder, private toastr: ToastrService, private pluma: plumaService, private codigo: codigoService) {
      this.codigo.mostrarCodigoId(this.data.codigo).subscribe({
        next: (resultData) => {
        this.resultadoData = resultData;
           this.formularioPluma.setValue({
            codigo: this.resultadoData[0].codigo,
            idPluma: this.resultadoData[0].fk_id_pluma,
            identificador: this.resultadoData[0].identificadorQR,
            p_id_codigo: this.resultadoData[0].id_code_qr,
           });
        }
      });

      this.formularioPluma = this.fb.group({
        codigo: ['', [Validators.required]],
        idPluma: ['', [Validators.required]],
        identificador: ['', [Validators.required]],
        p_id_codigo: [this.data.codigo],
      });
    }

  actualizar(){
    if (this.formularioPluma.valid){
      this.codigo.actualizarCodigo(this.formularioPluma.value).subscribe({
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

  ngOnInit(): void {
    this.verPluma();
    
  }

  cerrarDialogo(){
   this.dialogRef.close(true);
  }

  verPluma(){
    this.pluma.verPlumas().subscribe((respuesta) =>{
      this.plumas = respuesta;
    })
  }

}
