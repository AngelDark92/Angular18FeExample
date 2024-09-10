import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';





@Component({                               // sono le pagine, il codice html e il corrispondente ts e gli stili
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,], // rendi gli import disponibili anche all'html di questo componente
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',

})
export class LoginComponent {
  userForm = new FormGroup({ email: new FormControl("", [Validators.required, Validators.email]), password: new FormControl("", [Validators.required, Validators.minLength(5)]) })
  private baseUrl = "http://localhost:8080";
  errore: string = "";



  constructor(private userService: UserService, private http: HttpClient, private router: Router) {

  }

  submit() {
    if (this.userForm.valid) {
      const email: string = this.userForm.value.email ?? "";   // Se il modulo è valido, i valori dei campi email e password vengono estratti dall'oggetto userForm.value. Questi valori verranno utilizzati per la richiesta di login.
      const password: string = this.userForm.value.password ?? ""; //questa email se è nulla o indefinita gli dai stringa vuota, se no il valore della value
      this.userService.login(email, password).subscribe({
        /*sottoscrive l'observable, lo osserva e qunado riceve next, error fa quello che c'è nelle parentesi
        per ascoltare i nuovi valori o eventi che emette ( next, error, complete)
        La funzione login del servizio userService viene chiamata con i valori di email e password.
        Questa funzione restituisce un Observable, e .subscribe viene utilizzato per gestire la risposta asincrona.
        Se la richiesta di login ha successo, il metodo next viene chiamato con la risposta dal server.
        Qui, viene effettuato un log della risposta e si naviga alla pagina /home utilizzando il router di Angular.*/
        next: (response) => {
          console.log('Login successful:', response);  // Handle successful response
        this.router.navigate(["/home"]);
        },
        error: (errorResponse) => {
          console.error('Login failed:',errorResponse);  // Handle errors
          this.errore = errorResponse;
        }
      });
    }
    else{
      //Se il modulo non è valido, viene impostata la variabile errore su true,
      //il che potrebbe far scattare una logica di visualizzazione di un messaggio di errore o altre azioni correttive.
      this.errore = "Email non valida o password troppo corta";

    }
  }
  login (email: string, password: string): Observable<User>{
    const loginData = {email,password};
    return this.http.post(this.baseUrl+"/user/login", loginData)

  }

  register(): void {
    this.router.navigate(['/register']);
  }
}
