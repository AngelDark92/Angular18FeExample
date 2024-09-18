import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ImmaginiService } from '../../services/immagini.service';
import { Immagine } from '../../../../core/models/immagine.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Utenti } from '../../../../core/models/utenti.model';
import { UserService } from '../../../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ImmagineResponse } from '../../../../core/models/immagine-response.model';

@Component({
  selector: 'app-visualizza-immagine',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    CommonModule,
    MatCardModule,
    MatTableModule,
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
  immagini!: ImmagineResponse;

  displayedColumns: string[] = ['nome', 'file', 'dataInserimento', 'tipo'];

  constructor(private route: ActivatedRoute, private userService: UserService, private immaginiService: ImmaginiService, private router: Router) { }

  ngOnInit(): void {
    this.userData = this.userService.getUtentiData();
    this.idImmagine = this.route.snapshot.paramMap.get("id");
    this.immaginiService.getImmagine(this.idImmagine).subscribe({
      next: (response) => {
        console.log('Dati immagine ricevuti', response);
        this.immagini = response;
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
