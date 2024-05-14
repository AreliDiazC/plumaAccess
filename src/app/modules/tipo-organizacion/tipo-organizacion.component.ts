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
import {MatButtonModule} from '@angular/material/button';
import {usuarioService } from '../../service/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tipo-organizacion',
  standalone: true,
  imports: [

    MatButtonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent

  ],
  templateUrl: './tipo-organizacion.component.html',
  styleUrl: './tipo-organizacion.component.css'
})
export class TipoOrganizacionComponent {
  resultado!: string;
  
  formOrg: FormGroup;
  
  constructor(public dialogRef: MatDialogRef<TipoOrganizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,private fb: FormBuilder) {
     
      this.formOrg = this.fb.group({
        nombre_tipo_organizacion: ['', [Validators.required]],
        
      });
    }


  
    cerrarDialogo(){
      this.dialogRef.close(true);
    }
   
}
