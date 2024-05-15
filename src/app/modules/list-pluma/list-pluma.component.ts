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
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-list-pluma',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule,FormsModule,MatInputModule,MatFormFieldModule,NgbPaginationModule,NgbTypeaheadModule],
  templateUrl: './list-pluma.component.html',
  styleUrl: './list-pluma.component.css'
})
export class ListPlumaComponent implements OnInit{
  pluma: any;
  organizaciones: any;
  formulariOrg: FormGroup;
  plumaOr: any;
  currentPagePluma: any[] = [];
  page = 1;
	pageSize = 4;
  collectionSize = 0;

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

  verOrg(){
    this.plumaS.verOrganizacion().subscribe((respuesta) =>{
      this.organizaciones = respuesta;
    })
  }

  verPlumas(){
    this.plumaS.mostrarPlumas(this.formulariOrg.value).subscribe((respuesta) =>{
      if(respuesta == null){
        this.currentPagePluma = [];
      }else{
        this.plumaOr = respuesta;
        this.collectionSize = this.plumaOr.length;
        this.refreshPluma();
      }
    })
  }

  refreshPluma() {
		this.currentPagePluma = this.plumaOr.map((country: any, i:any) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}

  editar(pluma: any) {
    const dialogRef = this.dialog.open(EditarPlumaComponent, {
      width: '60%', 
      height: '60%', 
      disableClose: true, 
      data: { pluma: pluma.id_pluma }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.plumaS.mostrarPlumas(this.formulariOrg.value).subscribe((respuesta) =>{
        if(respuesta == null){
          this.currentPagePluma = [];
        }else{
          this.plumaOr = respuesta;
          this.collectionSize = this.plumaOr.length;
          this.refreshPluma();
        }
      })
    });
  }

  crearPluma() {
    const dialogRef = this.dialog.open(PlumaComponent, {
      width: '60%', 
      height: '60%', 
      disableClose: true, 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.plumaS.mostrarPlumas(this.formulariOrg.value).subscribe((respuesta) =>{
        if(respuesta == null){
          this.currentPagePluma = [];
        }else{
          this.plumaOr = respuesta;
          this.collectionSize = this.plumaOr.length;
          this.refreshPluma();
        }
      })
    });
  }
}
