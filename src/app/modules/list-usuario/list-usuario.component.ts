import { Component,OnInit } from '@angular/core';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { UsuarioComponent } from '../usuario/usuario.component';
import { usuarioService } from '../../service/usuario.service';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MatIcon } from '@angular/material/icon';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-usuario',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, PaginationModule, MatIcon, NgbPaginationModule],
  templateUrl: './list-usuario.component.html',
  styleUrl: './list-usuario.component.css'
})
export class ListUsuarioComponent implements OnInit{
  
  usuarios: any;
  currentPage = 1;
  itemsPerPage = 5; 

  constructor(
    public dialog: MatDialog, 
    private usuario: usuarioService
  ) { 
  }
  
  ngOnInit(): void {
    this.verUsuario();
  }

  crearUsuario() {
    const dialogRef = this.dialog.open(UsuarioComponent, {
      width: '60%', 
      height: '80%', 
      disableClose: true, 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.usuario.verUsuarios(116).subscribe((respuesta) => {
        this.usuarios = respuesta;
      });
    });
  }

  verUsuario() {
    this.usuario.verUsuarios(116).subscribe((respuesta) => {
      this.usuarios = respuesta;
    });
  }

  editar(usuario: any) {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '60%',
      height: '80%',
      disableClose: true,
      data: { usuario: usuario.id_user }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.usuario.verUsuarios(116).subscribe((respuesta) => {
        this.usuarios = respuesta;
      });
    });
  }
  
}
