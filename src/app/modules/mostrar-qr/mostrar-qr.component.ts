import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../service/auth.service';
import * as QRCode from 'qrcode';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mostrar-qr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar-qr.component.html',
  styleUrl: './mostrar-qr.component.css'
})
export class MostrarQrComponent {
  qrCodeUrl: string = '';
  qr: any[] = [];
  qrService: any;
  constructor(
    private http: AuthService,
    public dialogRef: MatDialogRef<MostrarQrComponent>,) {

  }

  ngOnInit() {
    let texto = localStorage.getItem('codeqr');
    if (texto) {
      QRCode.toDataURL(texto, {
        width: 160,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      }, (err, url) => {
        if (err) {
          console.error(err);
          return;
        }
        this.qrCodeUrl = url;
      });
    } else {
      console.error('No se encontró texto en localStorage con la clave "codeqr".');
    }
  }
  cerrarDialogo() {
    this.dialogRef.close(true);
  }
}
