import { Component, OnInit } from '@angular/core';
import { DatiService } from '../../services/dati.service';
import { UserService } from '../../../../core/services/user.service';
import { MatTableModule } from '@angular/material/table';
import { Utenti } from '../../../../core/models/utenti.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaDati } from '../../../../core/models/lista-dati.model';
import { MatIconModule } from '@angular/material/icon';
import { ErrorService } from '../../../../shared/services/error.service';



@Component({
  selector: 'app-cartellaclinica',
  standalone: true,
  imports: [MatTableModule, MatToolbarModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatIconModule, FormsModule, CommonModule, MatButtonModule],
  templateUrl: './cartellaclinica.component.html',
  styleUrls: ['./cartellaclinica.component.scss']
})
export class CartellaclinicaComponent implements OnInit {
  dati: ListaDati | null = null;
  immagineId: any;
  id: any;
  idMedico: any;
  userData: Utenti | null = null;
  pazienteId: any;
  datoId : any;



  // Definisci le colonne che vuoi visualizzare nella tabella perchè uso mat tab
  displayedColumns: string[] = ['reparto', 'diagnosi', 'terapia', 'cartellaClinica', 'immagine', "visualizza"];


  constructor(private datiService: DatiService, private userService: UserService, private router: Router, private route: ActivatedRoute, private errorService: ErrorService) { }


  ngOnInit(): void {
    this.userData = this.userService.getUtentiData();
    this.idMedico = this.userData?.medicoDTO?.id;
    this.id = this.userData?.pazienteDTO?.id;
    this.pazienteId = this.route.snapshot.paramMap.get("id"); // prende il parametro di quello che ha chiamato il componente
    if (this.id) { // id del paziente che ha fatto il login(localstorage)
      this.datiService.getDatiByPazienteId(this.id).subscribe({
        next: (response) => {
          console.log('Dati ricevuti', response);
          this.dati = response;
        },
        error: (errorResponse) => {
          this.errorService.reportError(errorResponse);

        }
      });
    }
    else if (this.pazienteId) { //id del paziente relativo alla cartella selezionata
      this.datiService.getDatiByPazienteId(this.pazienteId).subscribe({
        next: (response) => {
          console.log('Dati ricevuti', response);
          this.dati = response;
        },
        error: (errorResponse) => {
          this.errorService.reportError(errorResponse);


        }
      });

    }

    else {
      console.warn('ID paziente non trovato');
    }
  }

  visualizza(immagineId: any): void {
    this.router.navigate(['/immagine', immagineId]);
  }

  eliminaDato(datoId: any): void {
    // Chiamata al servizio per eliminare il dato solo se l'utente è un medico
    if (this.idMedico) {
      this.datiService.eliminaDato(datoId).subscribe({
        next: () => {
          // Rimuovi il dato dalla lista locale dopo l'eliminazione
          if (this.dati?.dati) {
            this.dati.dati = this.dati.dati.filter(dato => dato.id !== datoId);
          }
          console.log('Dato eliminato con successo');
        },
        error: (errorResponse) => {
          this.errorService.reportError(errorResponse);

        }
      });
    } else {
      console.error('L\'utente non è un medico, eliminazione non consentita');
    }
  }

  nuovaImmagine(datoId: any): void {
    this.router.navigate(['/nuova-immagine', datoId]);
  }

}










