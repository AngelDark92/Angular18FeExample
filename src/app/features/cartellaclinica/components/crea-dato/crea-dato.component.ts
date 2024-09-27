import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Dato } from '../../../../core/models/dato.model';
import { DatiService } from '../../services/dati.service';
import { MessageService } from '../../../../shared/services/message.service';


@Component({
  selector: 'app-crea-dato',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './crea-dato.component.html',
  styleUrl: './crea-dato.component.scss'
})
export class CreaDatoComponent {
  datoForm: FormGroup;
  cartellaId: any;

  private baseUrl = "http://localhost:8080";

  constructor(public fb: FormBuilder, public router: Router, public route: ActivatedRoute, private datiService: DatiService, private messageService: MessageService) {
    this.datoForm = this.fb.group({
      diagnosi: ["", [Validators.required]],
      reparto: ["", [Validators.required]],
      terapia: ["", [Validators.required]],

    });
  }
  create() {
    this.cartellaId = this.route.snapshot.paramMap.get("id");
    if (this.datoForm.valid) {
      // Se il modulo è valido, i valori dei campi email e password vengono estratti dall'oggetto userForm.value. Questi valori verranno utilizzati per la richiesta di login.
      const { diagnosi, reparto, terapia } = this.datoForm.value;
      // Crea un oggetto User
      const datoDTO: Dato = {
        diagnosi,
        reparto,
        terapia,

      };

      this.datiService.creaDatoPerCartella(datoDTO, this.cartellaId).subscribe({
        next: (response) => {
          console.log('Creazione dato avvenuta con successo', response);
          this.messageService.setMessage('Creazione dato avvenuta con successo.');
          this.router.navigate(["/cartelle-cliniche"]);
        },
        error: (errorResponse) => {
          console.error('Errore durante la creazione dato', errorResponse);

        }
      });
    } else {
      console.error('Il modulo non è valido');
    }

  }
}



