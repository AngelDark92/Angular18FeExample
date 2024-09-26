import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DatiService } from '../../services/dati.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../../shared/services/message.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { ErrorService } from '../../../../shared/services/error.service';

// Funzione per il validatore della data
export function dateFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // RegEx per YYYY-MM-DD
      const valid = dateRegex.test(control.value);
      return valid ? null : { invalidDate: { value: control.value } };
  };
}


@Component({
  selector: 'app-crea-immagine',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
  ],
  templateUrl: './crea-immagine.component.html',
  styleUrl: './crea-immagine.component.scss'
})
export class CreaImmagineComponent {
  createImageForm: FormGroup;
  datoId: any;
  fileUploaded: boolean = false;  // To track file upload
  selectedFile!: File;             // To store the file object

  private baseUrl = "http://localhost:8080";

  constructor(private datiService: DatiService, private route: ActivatedRoute, public fb: FormBuilder, public router: Router, private messageService: MessageService, private errorService:ErrorService) {
    this.createImageForm = this.fb.group({
      nome: [" ", [Validators.required]], // Nome dell'immagine
      tipo: ['', Validators.required], // Base64 del file
      dataInserimento: ['', [Validators.required, dateFormatValidator()]], // Data di inserimento con validatore


    });
  }

  // Metodo per gestire il caricamento del file
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileUploaded = true;  // Set flag to true if a file is uploaded
      this.selectedFile = file;  // Store the file in the component
    } else {
      this.fileUploaded = false; // Set flag to false if no file is uploaded
    }
  }

  crea() {
    this.datoId = this.route.snapshot.paramMap.get("id");

    if (this.createImageForm.valid && this.fileUploaded) {
      const { nome, dataInserimento, tipo } = this.createImageForm.value;

      const formData = new FormData();

      // Append the file to FormData
      formData.append('file', this.selectedFile);

      // Append other form values to FormData
      formData.append('nome', this.createImageForm.get('nome')?.value);
      formData.append('dataInserimento', this.createImageForm.get('dataInserimento')?.value);
      formData.append('tipo', this.createImageForm.get('tipo')?.value);
      formData.append('idDato', this.datoId);

      this.datiService.aggiungiImmagine(formData, this.datoId).subscribe({
        next: (response) => {
          console.log('Immagine creata con successo', response);
          this.messageService.setMessage('Immagine creata con successo.');
        },
        error: (errorResponse) => {
          this.errorService.reportError(errorResponse);

        }
      });
    } else {
      console.error('Il modulo non è valido o il file non è stato caricato');
    }
  }
}





