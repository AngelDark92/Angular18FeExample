import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MessageService } from '../../../../shared/services/message.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';





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
  successMessage: string = "";
  private _snackBar = inject(MatSnackBar);//utilizza l'API inject() per l'iniezione dei servizi, in questo caso per l'iniezione del servizio MatSnackBar di Angular Material.
  /*
  inject() è un metodo fornito da Angular che consente di ottenere un'istanza di un servizio direttamente all'interno di una classe, funzione o componente senza dover usare il costruttore per l'iniezione delle dipendenze.
Questa API rende più concisa l'iniezione dei servizi, eliminando la necessità di aggiungere il servizio nei parametri del costruttore.
  */
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';



// al costruttore si passano i servizi (anche Router e HttpClient sono servizi)
  constructor(private userService: UserService, private http: HttpClient, private router: Router, private messageService: MessageService) {

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
          this.userService.storeUtentiData(response); // Gestisce la risosta di successo
          this.messageService.setMessage('Login avvenuto con successo.');
          this.router.navigate(["/home"]); // è un metodo di Angular utilizzato per navigare programmaticamente tra le diverse rotte dell'applicazione. In questo caso, esegue il reindirizzamento dell'utente alla rotta /home.
        /*
        Il metodo navigate() è usato per effettuare la navigazione programmatica verso una nuova rotta.
  Accetta un array di stringhe che rappresenta il percorso della rotta alla quale si desidera accedere. 
  In questo caso, ["/home"] rappresenta la rotta /home.
        */  
        },
        error: (errorResponse) => {
          console.error('Login failed:',errorResponse);  // Gestisce la risposta d'errore
          this.errore = errorResponse;
        }
      });
    }
    else {
      //Se il modulo non è valido, viene impostata la variabile errore su true,
      //il che potrebbe far scattare una logica di visualizzazione di un messaggio di errore o altre azioni correttive.
      this.errore = "Email non valida o password troppo corta";

    }
  }

  register(): void { 
    this.router.navigate(['/register']);
  }

  // quando inizializzi una classe fa qualcosa perchè il costruttore non può fare cose complesse, chiamare servizi e caricare e recuperare dati del backend (dai servizi)
  ngOnInit(): void {
    this.successMessage = this.messageService.getMessage();
    if (this.successMessage) {
      this._snackBar.open(this.successMessage, "", {duration: 8000, horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,});
    }
  }
}
