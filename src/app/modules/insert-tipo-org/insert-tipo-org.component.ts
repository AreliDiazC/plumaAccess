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

@Component({
  selector: 'app-insert-tipo-org',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogModule,MatDialogTitle,MatDialogContent],
  templateUrl: './insert-tipo-org.component.html',
  styleUrl: './insert-tipo-org.component.css',
  animations: [
  ]
})
export class InsertTipoOrgComponent implements OnInit{
  
  resultado!: string;
  formularioTipoOrganizacion: FormGroup;
  nombre_tipo_org: any;

  constructor(public dialogRef: MatDialogRef<InsertTipoOrgComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,private fb: FormBuilder, private toastr: ToastrService, private organizacion: organizacionService ) {
      
      
      this.formularioTipoOrganizacion = this.fb.group({
        nombre_tipo_org: ['', [Validators.required]],
      });
    }
    ngOnInit(): void {
      
     
    }
    submit() {
      if (this.formularioTipoOrganizacion.valid){
        this.organizacion.agregarTipoOrganizacion(this.formularioTipoOrganizacion.value).subscribe((respuesta)=>{
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


    

  


  
}
