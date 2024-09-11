import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/users/components/login/login.component';
import { PaginaNonEsistenteComponent } from './shared/components/pagina-non-esistente/pagina-non-esistente.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { RegisterComponent } from './features/users/components/register/register.component';
import { LayoutComponent } from './shared/components/layout/layout.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect base URL to /login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: '',
    component: LayoutComponent,
    //
    children: [
      { path: 'home', component: HomeComponent },
      // Altri componenti qui
    ],
  },
  { path: '**',  component: PaginaNonEsistenteComponent},  // Wildcard route for handling undefined routes


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {}
