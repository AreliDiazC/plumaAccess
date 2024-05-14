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

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule,MatDialogModule, MatDialogTitle, MatDialogContent],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit{
  horaSeleccionada: string = '';
  fechaSeleccionada: string = '';
  tipoUsuario: any;
  qr: any;
  form: FormGroup;
  resultadoData:  any = {};

  constructor(public dialogRef: MatDialogRef<EditarUsuarioComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any ,private fb: FormBuilder, private usuario:usuarioService, private toastr: ToastrService) {
    

    this.usuario.verUsuariosId(this.data.usuario).subscribe({
      next: (resultData) => {
      this.resultadoData = resultData;
         this.form.setValue({
           celular: this.resultadoData[0].celular,
           nombre: this.resultadoData[0].nombre_completo,
           fechaFin: this.resultadoData[0].end_date,
           horaFin: this.resultadoData[0].end_hour,
           codigoQR: this.resultadoData[0].fk_id_qr_code,
           perteneceA: this.resultadoData[0].perteneceA,
           tipoUsuario: this.resultadoData[0].fk_id_tipo_user,
           fechaInicio: this.resultadoData[0].start_date,
           horaInicio: this.resultadoData[0].start_hour,
           visible: this.resultadoData[0].visible,
           code_phone_device: this.resultadoData[0].code_phone_device,
           p_id_user: this.resultadoData[0].id_user,
         });
      }
    });

    this.form = this.fb.group({
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
      p_id_user: [this.data.usuario],
    });
  
  }

  ngOnInit(): void {
    this.codigoQr();
    this.tipoUsuarios();
  }

  actualizar() {
    if (this.form.valid){
      this.usuario.actualizaUsuario(this.form.value).subscribe((respuesta)=>{
        this.toastr.success('Usuario actualizado correctamente', 'Exito', {
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
    this.form.patchValue({ 
      fechaInicio: this.fechaSeleccionada 
    });
  }

  onFechaChangeFin(event: any) {
    this.fechaSeleccionada = event.target.value;
    this.form.patchValue({ 
      fechaFin: this.fechaSeleccionada 
    });
    
  }

  onHoraChangeFin(event: any) {
    this.horaSeleccionada = event.target.value;
    this.form.patchValue({ 
      horaFin: this.horaSeleccionada 
    });
  }
  
  onHoraChangeInicio(event: any) {
    this.horaSeleccionada = event.target.value;
    this.form.patchValue({ 
      horaInicio: this.horaSeleccionada 
    });
  }

}
