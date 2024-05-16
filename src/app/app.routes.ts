import { UsuarioComponent } from './modules/usuario/usuario.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { ListUsuarioComponent } from './modules/list-usuario/list-usuario.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { AdminDashboardComponent } from './modules/admin-dashboard/admin-dashboard.component';
import { PlumaComponent } from './modules/pluma/pluma.component';
import { TipoOrganizacionComponent } from './modules/tipo-organizacion/tipo-organizacion.component';
import { ListPlumaComponent } from './modules/list-pluma/list-pluma.component';
import { ListCodigoComponent } from './modules/list-codigo/list-codigo.component';
import { AgregarOrgComponent } from './modules/agregar-org/agregar-org.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    {
        path: '',
        component: AdminDashboardComponent,
        children: [
            { path: 'listaUsuario', component: ListUsuarioComponent, canActivate: [AuthGuard]},
            { path: 'listaPluma', component: ListPlumaComponent, canActivate: [AuthGuard]},
            { path: 'tipoOrg', component: TipoOrganizacionComponent, canActivate: [AuthGuard]},
            { path: 'listaCodigo', component: ListCodigoComponent, canActivate: [AuthGuard]}, 
            { path: 'listaOrganizacion', component: AgregarOrgComponent, canActivate: [AuthGuard]},
        ],
    }, 
];


@NgModule({
    //imports: [RouterModule.forRoot(routes)],
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }