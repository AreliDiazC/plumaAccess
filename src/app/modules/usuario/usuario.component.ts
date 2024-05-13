import { Component, Inject, OnInit} from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogModule,MatDialogTitle,MatDialogContent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
  animations: [
  ]
})
export class UsuarioComponent implements OnInit{
  resultado!: string;

  constructor(public dialogRef: MatDialogRef<UsuarioComponent>,
  @Inject(MAT_DIALOG_DATA) public mensaje: string,private fb: FormBuilder) { }

  formularioContacto = this.fb.group({
    nombre: ['', [Validators.required]],
    celular: ['', [Validators.required, Validators.minLength(10)]],
    mensaje: ['', [Validators.required, Validators.maxLength(500)]]
  });

  ngOnInit(): void {

  }

  submit() {
    if (this.formularioContacto.valid)
      this.resultado = "Todos los datos son válidos";
    else
      this.resultado = "Hay datos inválidos en el formulario";
  }

  cerrarDialogo(){
    this.dialogRef.close(true);
  }
}
