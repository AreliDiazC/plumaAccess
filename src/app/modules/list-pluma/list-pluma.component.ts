import { Component,OnInit } from '@angular/core';
import { PlumaComponent } from '../pluma/pluma.component';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { plumaService } from '../../service/pluma.service';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { EditarPlumaComponent } from '../editar-pluma/editar-pluma.component';
@Component({
  selector: 'app-list-pluma',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule,FormsModule,MatInputModule,MatFormFieldModule],
  templateUrl: './list-pluma.component.html',
  styleUrl: './list-pluma.component.css'
})
export class ListPlumaComponent implements OnInit{
  pluma: any;
  organizaciones: any;
  formulariOrg: FormGroup;
  plumaOr: any;

  constructor(
    public dialog: MatDialog, 
    private plumaS: plumaService,
    private fb: FormBuilder
  ) { 
    this.formulariOrg = this.fb.group({
      organizacion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.verOrg();
   
  }

  editar(pluma: any) {
    const dialogRef = this.dialog.open(EditarPlumaComponent, {
      width: '60%', 
      height: '60%', 
      disableClose: true, 
      data: { pluma: pluma.id_pluma }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  crearPluma() {
    const dialogRef = this.dialog.open(PlumaComponent, {
      width: '60%', 
      height: '60%', 
      disableClose: true, 
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  verOrg(){
    this.plumaS.verOrganizacion().subscribe((respuesta) =>{
      this.organizaciones = respuesta;
    })
  }

  verPlumas(){
    console.log(this.formulariOrg.value);
    this.plumaS.mostrarPlumas(this.formulariOrg.value).subscribe((respuesta) =>{
      this.plumaOr = respuesta;
    })
  }

}
