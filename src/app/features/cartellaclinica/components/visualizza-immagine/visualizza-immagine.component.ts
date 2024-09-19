import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ImmaginiService } from '../../services/immagini.service';
import { Immagine } from '../../../../core/models/immagine.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { Utenti } from '../../../../core/models/utenti.model';
import { UserService } from '../../../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ImmagineResponse } from '../../../../core/models/immagine-response.model';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { DatiService } from '../../services/dati.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-visualizza-immagine',
  standalone: true,
  imports: [
    MatButtonModule,
    MatGridListModule, 
    MatDividerModule,
    MatMenuModule,
    RouterModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule],
  templateUrl: './visualizza-immagine.component.html',
  styleUrl: './visualizza-immagine.component.scss'
})
export class VisualizzaImmagineComponent {
  userData: Utenti | null = null;
  idImmagine: any;
  immagine!: ImmagineResponse; //!: inizializzerò questa variabile successivamente.
  selectedImageData!: SafeUrl;
  selectedImageNome: string = "";


  constructor(private route: ActivatedRoute, private userService: UserService, private immaginiService: ImmaginiService, private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userData = this.userService.getUtentiData();
    this.idImmagine = this.route.snapshot.paramMap.get("id");
    this.immaginiService.getImmagine(this.idImmagine).subscribe({
      next: (response) => {
        console.log('Dati immagine ricevuti', response);
        const objectURL = `data:${response.type};base64,${response.base64Date}`;
        this.selectedImageData = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.selectedImageNome = response.nomeFile || 'Unknown'; 
        this.immagine = response;
      },
      error: (errorResponse) => {
        console.error('Errore durante il recupero dei dati della immagine', errorResponse);

      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);

  }
  
  }
