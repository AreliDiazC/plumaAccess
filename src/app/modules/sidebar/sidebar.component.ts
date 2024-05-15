import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { SidebarService } from '../../service/sidebar.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import { BooleanInput } from '@angular/cdk/coercion';
import { BreakpointObserver} from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule, RouterOutlet,HeaderComponent,MatSidenav],
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  mostrarBarraLateral = false;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  drawerMode: MatDrawerMode = "push";
  mdcBackdrop: BooleanInput = false;
  readonly breakpoint$ = this.breakpointObserver
  .observe([ '(max-width: 500px)']);

  constructor(private breakpointObserver: BreakpointObserver,private auth: AuthService, public dialog: MatDialog, private router: Router, private sidebarService: SidebarService,private mediaMatcher: MediaMatcher) {

    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => {
      this.mostrarBarraLateral = !this.mobileQuery.matches;
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
    
    this.breakpoint$.subscribe(() =>
      this.breakpointChanges()
  );
  }
  
  isRouteActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  

  get modoBarraLateral(): MatDrawerMode {
    return this.mobileQuery.matches ? 'over' : 'side';
  }

  ngOnInit() {
    this.sidebarService.mostrarBarraLateral$.subscribe((mostrar) => {
      this.mostrarBarraLateral = mostrar;
    });
  }

 
  logoutBS(): void {
    this.auth.logoutBS();
  }

  pluma(): void {
    this.router.navigate(["./listaPluma"]);
  }

  misUsuarios(): void {
    this.router.navigate(["./listaUsuario"]);
  }

  tipoOrg(): void {
    this.router.navigate(["./tipoOrg"]);
  }

  listCodigo(): void {
    this.router.navigate(["./listaCodigo"]);
  }

  breakpointChanges(): void {
    if (this.breakpointObserver.isMatched('(max-width: 500px)')) {
      this.drawerMode = "over";
      this.mdcBackdrop = true;
    } else {
      this.drawerMode = "push";
      this.mdcBackdrop = false;
    }
  }

  listOrganizacion(): void {
    this.router.navigate(["./listaOrganizacion"]);
  }

  
}
