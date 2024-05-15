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
import { codigoService } from '../../service/codigo.service';
import { CodigoComponent } from '../codigo/codigo.component';
import { EditarCodigoComponent } from '../editar-codigo/editar-codigo.component';

@Component({
  selector: 'app-list-codigo',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule,MatButtonModule],
  templateUrl: './list-codigo.component.html',
  styleUrl: './list-codigo.component.css'
})
export class ListCodigoComponent {
  organizaciones: any;
  formulariOrg: FormGroup;
  codigoOr: any;

  constructor(
    public dialog: MatDialog, 
    private codigoS: codigoService,
    private fb: FormBuilder
  ) { 
    this.formulariOrg = this.fb.group({
      organizacion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.verOrg();
   
  }

  editar(codigo: any) {
    console.log(codigo, "codigo");
    const dialogRef = this.dialog.open(EditarCodigoComponent, {
      width: '60%', 
      height: '60%', 
      disableClose: true, 
      data: { codigo: codigo.id_code_qr }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  crearPluma() {
    const dialogRef = this.dialog.open(CodigoComponent, {
      width: '60%', 
      height: '70%', 
      disableClose: true, 
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  verOrg(){
    this.codigoS.verOrganizacion().subscribe((respuesta) =>{
      this.organizaciones = respuesta;
    })
  }

  verCodigo(){
    console.log(this.formulariOrg.value);
    this.codigoS.mostrarCodigo(this.formulariOrg.value).subscribe((respuesta) =>{
      this.codigoOr = respuesta;
    })
  }

}
