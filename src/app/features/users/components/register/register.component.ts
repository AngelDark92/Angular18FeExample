import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';

import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { GroupService } from '../../../../shared/services/group.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { Group } from '../../../../core/models/group.model';
import { User } from '../../../../core/models/user.model';
import { UtentePaziente } from '../../../../core/models/utente-paziente.model';
import { Paziente } from '../../../../core/models/paziente.model';


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


  constructor(private groupService: GroupService, private userService: UserService, public fb: FormBuilder, public router: Router) {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]],
      group: [{ value: 1, disabled: true }, Validators.required],
      nome: ["", [Validators.required]],
      cognome: ["", [Validators.required]],
      codiceFiscale: ["", [Validators.required, Validators.maxLength(16)]],
      comuneDiResidenza: ["", [Validators.required]],
      numeroDiTelefono: ["", [Validators.required]],
    });
  }
  /*ngOnInit(): void {
    // Carica i gruppi al caricamento del componente
    this.loadGroups();
  }

  // Metodo per caricare i gruppi dal servizio
  loadGroups() {
    this.groupService.getGroup().subscribe({
      next: (response) => {
        this.groups = response;  // Popola l'array dei gruppi
      },
      error: (error) => {
        console.error('Errore durante il recupero dei gruppi:', error);
      }
    });
  }*/
 

  register() {
    if (this.registerForm.valid) {
      // Se il modulo è valido, i valori dei campi email e password vengono estratti dall'oggetto userForm.value. Questi valori verranno utilizzati per la richiesta di login.
      const { username, email, password, group, nome, cognome, codiceFiscale,comuneDiResidenza, numeroDiTelefono } = this.registerForm.value;
      // Crea un oggetto User
      const newUser: User = {
        username,
        email,
        password,
        group
  
      };
      const newPaziente: Paziente = {
        nome,
        cognome,
        codiceFiscale,
        comuneDiResidenza,
        numeroDiTelefono,
        user:newUser
      };

      this.userService.createUserPaziente({ user: newUser, paziente: newPaziente }).subscribe({
        next: (response) => {
          console.log('Registrazione avvenuta con successo', response);
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


