import { Component, OnInit } from '@angular/core';
import { Cartellaclinica } from '../../../../core/models/cartellaclinica.model';
import { Utenti } from '../../../../core/models/utenti.model';
import { UserService } from '../../../../core/services/user.service';
import { DatiService } from '../../services/dati.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-lista-cartelle',
  standalone: true,
  imports: [MatTableModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatInputModule,
    FormsModule, MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './lista-cartelle.component.html',
  styleUrl: './lista-cartelle.component.scss'
})
export class ListaCartelleComponent implements OnInit {
  idMedico: any;
  userData: Utenti | null = null;
  cartelle: Cartellaclinica[] = [];
  datoId: any;
  displayedColumns: string[] = ['nomePaziente', 'cognomePaziente', 'codiceFiscale', 'dato', 'visualizza'];

  constructor(private userService: UserService, private datiService: DatiService, private router: Router) { }

  ngOnInit(): void {
    this.userData = this.userService.getUtentiData();
    this.idMedico = this.userData?.medicoDTO?.id;
    if (this.idMedico && this.userData) {
      this.datiService.getListaCartelle(this.userData).subscribe({
        next: (response) => {
          console.log('Lista ricevuta', response);
          this.cartelle = response;
        },
        error: (errorResponse) => {
          console.error('Errore durante il recupero della lista delle cartelle', errorResponse);

        }
      })
    }

  }


  visualizza(datoId: any): void {
    if (datoId) {
      this.router.navigate(['/dato', datoId]);
    }
  }

  visualizzaDatiCartella(pazienteId: string): void {
    this.router.navigate(['/cartella-clinica', pazienteId]);
  }
  elimina(cartellaId: any): void {
    // Chiamata al servizio per eliminare la cartella
    if(this.idMedico) {
      this.datiService.eliminaCartella(this.idMedico, cartellaId).subscribe({
        next: () => {
          // Rimuovere la cartella dalla lista locale dopo l'eliminazione
          this.cartelle = this.cartelle.filter(cartella => cartella.id !== cartellaId);
          console.log('Cartella eliminata con successo');
        },
        error: (errorResponse) => {
          console.error('Errore durante l\'eliminazione della cartella', errorResponse);
        }
      });
    }else {
      console.error('Utente non è un medico, non può eliminare la cartella');
    }
  }

}
