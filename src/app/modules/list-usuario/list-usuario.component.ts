import { Component,OnInit } from '@angular/core';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { UsuarioComponent } from '../usuario/usuario.component';
import { usuarioService } from '../../service/usuario.service';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MatIcon } from '@angular/material/icon';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-list-usuario',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, PaginationModule, MatIcon, NgbPaginationModule, NgbTypeaheadModule],
  templateUrl: './list-usuario.component.html',
  styleUrl: './list-usuario.component.css'
})
export class ListUsuarioComponent implements OnInit{
  
  usuarios: any; 
  page = 1;
	pageSize = 4;
  collectionSize = 0;
  currentPageUsuarios: any[] = [];

  constructor(
    public dialog: MatDialog, 
    private usuario: usuarioService
  ) { 
  }
  
  ngOnInit(): void {
    this.verUsuario();
  }

  verUsuario() {
    this.usuario.verUsuarios().subscribe((respuesta) => {
      this.usuarios = respuesta;
      this.collectionSize = this.usuarios.length;
      this.refreshUsuario();
    });
  }

  refreshUsuario() {
		this.currentPageUsuarios = this.usuarios.map((country: any, i:any) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}

  crearUsuario() {
    const dialogRef = this.dialog.open(UsuarioComponent, {
      width: '60%', 
      height: '80%', 
      disableClose: true, 
    });
    dialogRef.afterClosed().subscribe(result => {
      this.usuario.verUsuarios().subscribe((respuesta) => {
        this.usuarios = respuesta;
        this.collectionSize = this.usuarios.length;
        this.refreshUsuario();
      });
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
      this.usuario.verUsuarios().subscribe((respuesta) => {
        this.usuarios = respuesta;
        this.collectionSize = this.usuarios.length;
        this.refreshUsuario();
      });
    });
  }
  
}
