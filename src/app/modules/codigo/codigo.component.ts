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
        codigo: ['', [Validators.required]],
        idPluma: ['', [Validators.required]],
        identificador: ['', [Validators.required]],
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
  
submit() {
    if (this.formularioPluma.valid){
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
  
}
