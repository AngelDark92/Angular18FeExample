import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { User } from '../../../../core/models/user.model';
import { Paziente } from '../../../../core/models/paziente.model';
import { MessageService } from '../../../../shared/services/message.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  

  private baseUrl = "http://localhost:8080";


  constructor(private userService: UserService, public fb: FormBuilder, public router: Router, private messageService: MessageService) {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]],
      nome: ["", [Validators.required]],
      cognome: ["", [Validators.required]],
      codiceFiscale: ["", [Validators.required, Validators.maxLength(16)]],
      comuneDiResidenza: ["", [Validators.required]],
      numeroDiTelefono: ["", [Validators.required, Validators.maxLength(10)]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      // Se il modulo è valido, i valori dei campi email e password vengono estratti dall'oggetto userForm.value. Questi valori verranno utilizzati per la richiesta di login.
      const { username, email, password, nome, cognome, codiceFiscale,comuneDiResidenza, numeroDiTelefono } = this.registerForm.value;
      // Crea un oggetto User
      const newUser: User = {
        username,
        email,
        password,
  
      };
      const newPaziente: Paziente = {
        nome,
        cognome,
        codiceFiscale,
        email,
        comuneDiResidenza,
        numeroDiTelefono,
        user:newUser
      };
// NOTA: le variabili dei parametri che passo al metodo devono essere uguali alle variabili sate nel cotroller di spring e nei models di angular.
//vedi-> userDTO e pasienteDTO usato sia nel modello utente-pazienre che nello userController come parametro passato nel requestbody
      this.userService.createUserPaziente({ userDTO: newUser, pazienteDTO: newPaziente }).subscribe({
        next: (response) => {
          console.log('Registrazione avvenuta con successo', response);
          this.messageService.setMessage('Registrazione avvenuta con successo. Puoi effettuare il login.');
          this.router.navigate(["/login"]);
        },
        error: (errorResponse) => {
          console.error('Errore durante la registrazione', errorResponse);
          
        }
      });
    } else {
      console.error('Il modulo non è valido');
    }

  }

}


