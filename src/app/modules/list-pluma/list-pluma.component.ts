import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-list-pluma',
  standalone: true,
  imports: [],
  templateUrl: './list-pluma.component.html',
  styleUrl: './list-pluma.component.css'
})
export class ListPlumaComponent implements OnInit{
  pluma: any;

  ngOnInit(): void {
    
  }

  editar(usuario: any) {
  }

  crearPluma() {
    /*const dialogRef = this.dialog.open(UsuarioComponent, {
      width: '60%', 
      height: '80%', 
      disableClose: true, 
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });*/
  }


}
