import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatiService } from '../../services/dati.service';
import { Dato } from '../../../../core/models/dato.model';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dato',
  standalone: true,
  imports: [MatCardModule,MatGridListModule,MatDividerModule, CommonModule],
  templateUrl: './dato.component.html',
  styleUrl: './dato.component.scss'
})
export class DatoComponent {
  datoId: any;
  dato: Dato | null = null;


  constructor(private router: Router, private route: ActivatedRoute,private datiService: DatiService){}

  ngOnInit(): void {
   
    this.datoId = this.route.snapshot.paramMap.get("id");
    if(this.datoId){
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


}
