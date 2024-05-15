import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  form: any = {
    username: null,
    password: null
  };

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

  reloadPage(): void {
    window.location.reload();
  }

  onSubmit(): void {
    this.auth.loginBS(this.loginForm.value).subscribe({
      next: data => {
        console.log(data, "data");
        if(data == 0){
          this.toastr.error('Por favor, verifica las credenciales proporcionadas....', 'Error', {
            positionClass: 'toast-bottom-left',
          }); 
        }else{
          this.router.navigate(['/listaUsuario']);
        }
      },
      error: (error: any) => {
        console.error('Error en la solicitud:', error);
        console.error('Respuesta del servidor:', error.error); // Imprime el cuerpo de la respuesta del servidor
        // Manejar el error, por ejemplo, mostrando un mensaje de error al usuario
      }
    });
  }
}
