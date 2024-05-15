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
  MatDialogActions
} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { usuarioService } from '../../service/usuario.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogModule,MatDialogTitle,MatDialogContent, MatDialogActions],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
  animations: [
  ]
})
export class UsuarioComponent implements OnInit{
  resultado!: string;
  horaSeleccionadaI: string = '';
  horaSeleccionadaF: string = '';
  fechaSeleccionadaI: string = '';
  fechaSeleccionadaF: string = '';
  tipoUsuario: any;
  qr: any;
  formularioContacto: FormGroup;

  constructor(public dialogRef: MatDialogRef<UsuarioComponent>,
  @Inject(MAT_DIALOG_DATA) public mensaje: string,private fb: FormBuilder, private toastr: ToastrService, private usuario:usuarioService) {
   
    this.formularioContacto = this.fb.group({
      nombre:  ['', Validators.compose([ Validators.required, Validators.pattern(/^[A-Za-zñÑáéíóú ]*[A-Za-z][A-Za-zñÑáéíóú ]*$/)])],
      celular: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(10),  Validators.pattern(/^(0|[1-9][0-9]*)$/)])],
      tipoUsuario: ['', [Validators.required]],
      codigoQR: ['', [Validators.required]],
      perteneceA: [116, [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaFin: ['', [Validators.required]],
      visible: ['1', [Validators.required]],
      code_phone_device: [],
    });
  }

  ngOnInit(): void {
    this.tipoUsuarios();
    this.codigoQr();
  }

  submit() {
    if (this.formularioContacto.valid) {
      this.usuario.agregarUsuario(this.formularioContacto.value).subscribe({
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
    } else {
      this.toastr.error('Complete los campos requeridos', 'Error', {
        positionClass: 'toast-bottom-left',
      });
    }
  }
  

  cerrarDialogo(){
    this.dialogRef.close(true);
  }

  tipoUsuarios(){
    this.usuario.tipoUsuario().subscribe((respuesta) =>{
      this.tipoUsuario = respuesta;
    })
  }

  codigoQr(){
    this.usuario.mostrarqr().subscribe((respuesta) =>{
      this.qr = respuesta;
    })
  }

  onFechaChangeInicio(event: any) {
    this.fechaSeleccionadaI = event.target.value;
    this.formularioContacto.patchValue({ 
      fechaInicio: this.fechaSeleccionadaI 
    });
  }

  onFechaChangeFin(event: any) {
    this.fechaSeleccionadaF = event.target.value;
    this.formularioContacto.patchValue({ 
      fechaFin: this.fechaSeleccionadaF
    });
    
  }

  onHoraChangeFin(event: any) {
    this.horaSeleccionadaF = event.target.value;
    this.formularioContacto.patchValue({ 
      horaFin: this.horaSeleccionadaF
    });
  }
  
  onHoraChangeInicio(event: any) {
    this.horaSeleccionadaI = event.target.value;
    this.formularioContacto.patchValue({ 
      horaInicio: this.horaSeleccionadaI
    });
  }
}
