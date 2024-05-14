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



@Component({
  selector: 'app-pluma',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule,MatButtonModule],
  templateUrl: './pluma.component.html',
  styleUrl: './pluma.component.css'
})
export class PlumaComponent implements OnInit{

  formularioPluma: FormGroup;
  tipoUsuario: any;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
     
      this.formularioPluma = this.fb.group({
        nombre: ['', [Validators.required]],
        tipoUsuario: ['', [Validators.required]],
      });
    }


  ngOnInit(): void {
    
  }

  cerrarDialogo(){
   // this.dialogRef.close(true);
  }

  submit() {
    /*if (this.formularioContacto.valid){
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
    }*/
  }
  
}
