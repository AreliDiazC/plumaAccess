import { Component,OnInit } from '@angular/core';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MatIcon } from '@angular/material/icon';
import { InsertTipoOrgComponent } from '../insert-tipo-org/insert-tipo-org.component';
import { organizacionService } from '../../service/organizacion.service';
import { EditarTipoOrganizacionComponent } from '../editar-tipo-organizacion/editar-tipo-organizacion.component';


@Component({
  selector: 'app-tipo-organizacion',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, PaginationModule, MatIcon],
  templateUrl: './tipo-organizacion.component.html',
  styleUrl: './tipo-organizacion.component.css'
})
export class TipoOrganizacionComponent implements OnInit{

  tiposOrganizaciones: any;


  
  constructor(
    public dialog: MatDialog, 
    private organizacion: organizacionService

   
  ) {
   }
    
  ngOnInit(): void {
    this.verOrganizacion();
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

   insert_tipo_org() {
    const dialogRef = this.dialog.open(InsertTipoOrgComponent, {
      width: '60%', 
      height: '80%', 
      disableClose: true, 
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  verOrganizacion() {
    this.organizacion.tiposOrganizaciones().subscribe((respuesta) => {
      this.tiposOrganizaciones = respuesta;
    });
  }

  editar(organizacion: any) {
    const dialogRef = this.dialog.open(EditarTipoOrganizacionComponent, {
      width: '60%',
      height: '80%',
      disableClose: true,
      data: { organizacion: organizacion.id_tipo_organizacion }
    });
    dialogRef.afterClosed().subscribe(result => {
      // Aquí puedes manejar cualquier resultado que recibas después de que se cierre el diálogo
    });
  }

}