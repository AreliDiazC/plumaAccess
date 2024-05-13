import { Component } from '@angular/core';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { UsuarioComponent } from '../usuario/usuario.component';

@Component({
  selector: 'app-list-usuario',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './list-usuario.component.html',
  styleUrl: './list-usuario.component.css'
})
export class ListUsuarioComponent {
  constructor(
    public dialog: MatDialog, 
  ) { 
  }

  crearUsuario() {
    const dialogRef = this.dialog.open(UsuarioComponent, {
      width: '60%', 
      height: '80%', 
      disableClose: true, 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
