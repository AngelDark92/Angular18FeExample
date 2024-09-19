import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImmaginiService } from '../../services/immagini.service';
import { Dato } from '../../../../core/models/dato.model';
import { DatiService } from '../../services/dati.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ImmagineResponse } from '../../../../core/models/immagine-response.model';

@Component({
  selector: 'app-dato',
  standalone: true,
  templateUrl: './dato.component.html',
  imports: [MatCardModule, MatGridListModule, MatDividerModule, CommonModule, MatFormField, MatLabel, MatSelect, MatOption],
  styleUrl: './dato.component.scss'
})
export class DatoComponent implements OnInit {
  datoId: any;
  dato: Dato | null = null;
  selectedImageData!: SafeUrl;
  selectedImageNome: string = "";  // Store the name of the selected image


  constructor(
    private immaginiService: ImmaginiService,
    private sanitizer: DomSanitizer,
    private datiService: DatiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.datoId = this.route.snapshot.paramMap.get("id");
    if (this.datoId) {
      this.datiService.getDato(this.datoId).subscribe({
        next: (response) => {
          console.log('Dati ricevuti', response);
          this.dato = response;
        },
        error: (errorResponse) => {
          console.error('Errore durante il recupero dei dati', errorResponse);

        }
      });

    }
  }

  onImageSelect(event: any) {
    const imageId = event.value;
    this.fetchImage(imageId);
  }

  fetchImage(imageId: string) {
    this.immaginiService.getImmagine(imageId).subscribe({
      next: (response) => {
        const objectURL = `data:${response.type};base64,${response.base64Date}`;
        this.selectedImageData = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.selectedImageNome = response.nomeFile || 'Unknown'; 
        
      },
      error: (errorResponse) => {
        console.error('Errore durante il recupero dei dati della immagine', errorResponse);

      }});
  }
}
