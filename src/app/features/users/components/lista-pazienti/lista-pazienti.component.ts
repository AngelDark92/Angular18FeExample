import { Component, OnInit } from '@angular/core';
import { Paziente } from '../../../../core/models/paziente.model';
import { Utenti } from '../../../../core/models/utenti.model';
import { UserService } from '../../../../core/services/user.service';
import { PazientiService } from '../../services/pazienti.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-pazienti',
  standalone: true,
  imports: [MatTableModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatInputModule,
    FormsModule, MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './lista-pazienti.component.html',
  styleUrl: './lista-pazienti.component.scss'
})
export class ListaPazientiComponent implements OnInit{
  idMedico: any;
  userData: Utenti | null = null;
  pazienti: Paziente[] = [];
  displayedColumns: string[] = ['nome', 'cognome', 'codiceFiscale', 'comuneDiResidenza', 'email', 'numeroDiTelefono', 'visualizza' ];

  constructor(private userService: UserService, private pazientiService: PazientiService, private router: Router) { }

  ngOnInit(): void {
    this.userData = this.userService.getUtentiData();
    this.idMedico = this.userData?.medicoDTO?.id;
    if (this.idMedico && this.userData) {
      this.pazientiService.getListaPazienti().subscribe({
        next: (response) => {
          console.log('Lista ricevuta', response);
          this.pazienti = response;
        },
        error: (errorResponse) => {
          console.error('Errore durante il recupero della lista dei pazienti', errorResponse);

        }
      })
    }

  }

  visualizzaDatiCartella(pazienteId: any): void {
      this.router.navigate(['/cartella-clinica', pazienteId]);
    
  }

  elimina(pazienteId: any): void {
    // Chiamata al servizio per eliminare la cartella
    if(this.idMedico) {
      this.pazientiService.eliminaPaziente(pazienteId).subscribe({
        next: () => {
          
          this.pazienti = this.pazienti.filter(paziente => paziente.id !== pazienteId);
          console.log('Paziente eliminata con successo');
        },
        error: (errorResponse) => {
          console.error('Errore durante l\'eliminazione del paziente', errorResponse);
        }
      });
    }else {
      console.error('Utente non è un medico, non può eliminare la cartella');
    }
  }


}
