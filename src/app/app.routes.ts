import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/users/components/login/login.component';
import { PaginaNonEsistenteComponent } from './shared/components/pagina-non-esistente/pagina-non-esistente.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { RegisterComponent } from './features/users/components/register/register.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { CartellaclinicaComponent } from './features/cartellaclinica/components/cartellaclinica/cartellaclinica.component';
import { VisualizzaImmagineComponent } from './features/cartellaclinica/components/visualizza-immagine/visualizza-immagine.component';
import { ListaCartelleComponent } from './features/cartellaclinica/components/lista-cartelle/lista-cartelle.component';



export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect base URL to /login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: '',
    component: LayoutComponent,
    //
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'cartella-clinica', component: CartellaclinicaComponent},
      { path: 'cartelle-cliniche', component: ListaCartelleComponent},
      { path: 'immagine/:id', component: VisualizzaImmagineComponent},
      { path: 'cartellaclinica/:id', component: CartellaclinicaComponent},

      
         
        ]
      },
      
    
    
      

      // Altri componenti qui
    
  { path: '**',  component: PaginaNonEsistenteComponent},  // Wildcard route for handling undefined routes


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {}
