import { Component, OnInit } from '@angular/core';
import { Dato } from '../../../../core/models/dato.model';
import { DatiService } from '../../services/dati.service';
import { UserService } from '../../../../core/services/user.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-cartellaclinica',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './cartellaclinica.component.html',
  styleUrl: './cartellaclinica.component.scss'
})
export class CartellaclinicaComponent implements OnInit {
  dati: Dato[] = [];
  id: any;
  // Definisci le colonne che vuoi visualizzare nella tabella perchè uso mat tab
  displayedColumns: string[] = ['reparto', 'diagnosi', 'terapia', 'cartellaClinica'];


  constructor(private datiService: DatiService, private userService: UserService) { }


  ngOnInit(): void {
    this.id = this.userService.getUtentiData()?.pazienteDTO?.id;
    this.datiService.getDati(this.id).subscribe({
      next: (response) => {
        console.log('Dati ricevuti', response);
        this.dati = response;

      },
      error: (errorResponse) => {
        console.error('Errore durante il recupero dei dati', errorResponse);

      }
    });


  }




}
