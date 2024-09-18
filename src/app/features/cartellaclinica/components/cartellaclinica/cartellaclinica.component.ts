import { Component, OnInit } from '@angular/core';
import { Dato } from '../../../../core/models/dato.model';
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
import { Cartellaclinica } from '../../../../core/models/cartellaclinica.model';



@Component({
  selector: 'app-cartellaclinica',
  standalone: true,
  imports: [MatTableModule,MatToolbarModule,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, CommonModule, MatButtonModule],
  templateUrl: './cartellaclinica.component.html',
  styleUrls: ['./cartellaclinica.component.scss']
})
export class CartellaclinicaComponent implements OnInit {
  dati: Dato[] = [];
  id: any;
  idMedico: any;
  userData: Utenti | null = null;
  immagineId: any;
  cartellaId: any;
  datoId: any;

  // Definisci le colonne che vuoi visualizzare nella tabella perchè uso mat tab
  displayedColumns: string[] = ['reparto', 'diagnosi', 'terapia', 'cartellaClinica', 'immagine', "visualizza"];


  constructor(private datiService: DatiService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.userData = this.userService.getUtentiData();
    this.idMedico = this.userData?.medicoDTO?.id;
    this.id = this.userData?.pazienteDTO?.id;
    this.datoId = this.route.snapshot.paramMap.get("id"); // prende il parametro di quello che ha chiamato il componente
    if (this.id) {
      this.datiService.getDatiByPazienteId(this.id).subscribe({
        next: (response) => {
          console.log('Dati ricevuti', response);
          this.dati = response;
        },
        error: (errorResponse) => {
          console.error('Errore durante il recupero dei dati', errorResponse);

        }
      });
    } 
    else if(this.datoId){
      this.datiService.getDati(this.datoId).subscribe({
        next: (response) => {
          console.log('Dati ricevuti', response);
          this.dati = response;
        },
        error: (errorResponse) => {
          console.error('Errore durante il recupero dei dati', errorResponse);

        }
      });

    }
    
    else {
      console.warn('ID paziente non trovato');
    }
  }

  visualizza(): void { 
    this.router.navigate(['/immagine', this.immagineId]);
  }

  elimina() : void{
    this.router.navigate(['/cartellacinica', this.cartellaId])
  }

}





