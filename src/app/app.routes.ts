import { UsuarioComponent } from './modules/usuario/usuario.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { ListUsuarioComponent } from './modules/list-usuario/list-usuario.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { AdminDashboardComponent } from './modules/admin-dashboard/admin-dashboard.component';
import { PlumaComponent } from './modules/pluma/pluma.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    {
        path: '',
        component: AdminDashboardComponent,
        children: [
            { path: 'listaUsuario', component: ListUsuarioComponent},
            { path: 'pluma', component: PlumaComponent},
        ],
    }, 
];


@NgModule({
    //imports: [RouterModule.forRoot(routes)],
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }