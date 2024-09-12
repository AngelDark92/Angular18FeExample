import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { Utenti } from '../../../core/models/utenti.model';
import { MatCardModule } from '@angular/material/card';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';



@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    CommonModule,
    MatCardModule,
    MatTabsModule
  ]
})
export class LayoutComponent implements OnInit {
    userData: Utenti | null = null;
  
    constructor(private userService: UserService, private router: Router) { }
  
    ngOnInit(): void {
      // Carica i dati del paziente al momento dell'inizializzazione del componente
      this.userData = this.userService.getUtentiData();
  
    }
    navigateTo(route : string) : void{
      console.log("sono entrato nel metodo");
      this.router.navigate([`/${route}`]);

    } 

    onTabChange(event: MatTabChangeEvent) {
      if (event.index === 0) {
        this.navigateTo('home');
      } else if (event.index === 1) {
        this.navigateTo('cartellaclinica');
      }
    }
}
