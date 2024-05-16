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
  selector: 'app-codigo',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule,MatButtonModule],
  templateUrl: './codigo.component.html',
  styleUrl: './codigo.component.css'
})
export class CodigoComponent {

  formularioPluma: FormGroup;
  tipoUsuario: any;
  plumas: any;

  constructor(public dialogRef: MatDialogRef<CodigoComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,private fb: FormBuilder, private toastr: ToastrService, private pluma: plumaService, private codigo: codigoService) {
     
      this.formularioPluma = this.fb.group({
        codigo: [{ value: '', disabled: true }, Validators.required], // Establecer `disabled` a `true`
        idPluma: ['', [Validators.required]],
        identificador: ['', [Validators.required]]
      });
  }

  ngOnInit(): void {
    this.verOrg();
  }

  cerrarDialogo(){
   this.dialogRef.close(true);
  }

  verOrg(){
    this.pluma.verPlumas().subscribe((respuesta) =>{
      this.plumas = respuesta;
    })
  }
  
  generar(){
    const codigoAleatorio = this.generarCodigoAleatorio();
    this.formularioPluma.patchValue({
      codigo: codigoAleatorio
    });
  }

  submit() {
    if (this.formularioPluma.valid){
      this.formularioPluma.get('codigo')?.enable();
      this.codigo.agregarCodigo(this.formularioPluma.value).subscribe({
        next: (respuesta) => {
          Swal.fire({
            title: '¡Registro Exitoso!',
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
 
 generarCodigoAleatorio(): string {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const longitud = 20;
  let codigo = '';
  
  const fechaActual = new Date();
  const dia = fechaActual.getDate().toString().padStart(2, '0');
  const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  const año = fechaActual.getFullYear().toString();

  // Agregar la fecha al código
  codigo += `${dia}${mes}${año}`;

  // Generar caracteres aleatorios
  for (let i = 0; i < longitud - 8; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres.charAt(indiceAleatorio);
  }
  return codigo;
}

}
