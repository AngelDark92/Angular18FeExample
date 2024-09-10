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
  groups = [
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
    { id: 3, name: 'Group 3' },
  ];
  private baseUrl = "http://localhost:8080";


  constructor(private groupService: GroupService, private userService: UserService, public fb: FormBuilder, public router: Router) {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]],
      group: [null, [Validators.required]]
    });
  }
  // ngOnInit(): void {
  //   // Carica i gruppi al caricamento del componente
  //   this.loadGroups();
  // }

  // // Metodo per caricare i gruppi dal servizio
  // loadGroups() {
  //   this.groupService.getGroup().subscribe({
  //     next: (response) => {
  //       this.groups = response;  // Popola l'array dei gruppi
  //     },
  //     error: (error) => {
  //       console.error('Errore durante il recupero dei gruppi:', error);
  //     }
  //   });
  // }

  register() {
    if (this.registerForm.valid) {
      // Se il modulo è valido, i valori dei campi email e password vengono estratti dall'oggetto userForm.value. Questi valori verranno utilizzati per la richiesta di login.
      const { username, email, password, group } = this.registerForm.value;
      this.userService.createUser({ username, email, password, group }).subscribe({
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


