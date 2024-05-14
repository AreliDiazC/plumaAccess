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
import { usuarioService } from '../../service/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogModule,MatDialogTitle,MatDialogContent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
  animations: [
  ]
})
export class UsuarioComponent implements OnInit{
  resultado!: string;
  horaSeleccionada: string = '';
  fechaSeleccionada: string = '';
  tipoUsuario: any;
  qr: any;
  formularioContacto: FormGroup;

  constructor(public dialogRef: MatDialogRef<UsuarioComponent>,
  @Inject(MAT_DIALOG_DATA) public mensaje: string,private fb: FormBuilder, private toastr: ToastrService, private usuario:usuarioService) {
   
    this.formularioContacto = this.fb.group({
      nombre: ['', [Validators.required]],
      celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
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
    if (this.formularioContacto.valid){
      this.usuario.agregarUsuario(this.formularioContacto.value).subscribe((respuesta)=>{
        this.toastr.success('Usuario agregado correctamente', 'Exito', {
          positionClass: 'toast-bottom-left',
        }); 
        this.dialogRef.close(true);
      })
    }else{
      this.toastr.warning('Complete los campos requeridos', 'Error', {
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
    this.fechaSeleccionada = event.target.value;
    this.formularioContacto.patchValue({ 
      fechaInicio: this.fechaSeleccionada 
    });
  }

  onFechaChangeFin(event: any) {
    this.fechaSeleccionada = event.target.value;
    this.formularioContacto.patchValue({ 
      fechaFin: this.fechaSeleccionada 
    });
    
  }

  onHoraChangeFin(event: any) {
    this.horaSeleccionada = event.target.value;
    this.formularioContacto.patchValue({ 
      horaFin: this.horaSeleccionada 
    });
  }
  
  onHoraChangeInicio(event: any) {
    this.horaSeleccionada = event.target.value;
    this.formularioContacto.patchValue({ 
      horaInicio: this.horaSeleccionada 
    });
  }
}
