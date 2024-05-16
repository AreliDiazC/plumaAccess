import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SidebarService } from '../../service/sidebar.service';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, 
  public dialog: MatDialog,private sidebarService: SidebarService) {}
  public isBarraLateralVisible: boolean = true;

  toggleSidebar() {
    this.sidebarService.toggleMostrarBarraLateral();
    this.isBarraLateralVisible = !this.isBarraLateralVisible;
  }

  ngOnInit(): void {
  }
  
  logoutBS(): void {
    this.auth.logoutBS();
  }
}
