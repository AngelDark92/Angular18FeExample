import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { Utenti } from '../../../core/models/utenti.model';
import { MatCardModule } from '@angular/material/card';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MessageService } from '../../services/message.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ErrorService } from '../../services/error.service';
import { MatIcon } from '@angular/material/icon';



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
    MatTabsModule,
    MatIcon
  ]
})
export class LayoutComponent implements OnInit, OnDestroy {
  userData: Utenti | null = null;
  activeLink: string = '';
  message: string = "";
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  links = [{ path: '/home', label: 'Home' }];
  private errorSubscription!: Subscription;

  constructor(private userService: UserService, private router: Router, private messageService: MessageService, private errorService: ErrorService,
    private snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.errorSubscription = this.errorService.error$.subscribe({

      next: (message) => {
        this.showErrorPopup(message);
      },
      error: (errorResponse) => {
        this.showErrorPopup(errorResponse);
      }

    });
    this.activeLink = this.router.url;

    // Update activeLink when the route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = this.router.url;
      }
    });
    // Carica i dati del paziente al momento dell'inizializzazione del componente
    this.userData = this.userService.getUtentiData();
    this.message = this.messageService.getMessage();
    if (this.message) {
      this._snackBar.open(this.message, "", {
        duration: 7000, horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
    }
    if (this.userData?.pazienteDTO) {
      this.links = [
        { path: '/home', label: 'Home' },
        { path: '/cartella-clinica', label: 'Cartella Clinica' },

      ]

    }
    else if (this.userData?.medicoDTO) {
      this.links = [
        { path: '/home', label: 'Home' },
        { path: '/cartelle-cliniche', label: 'Lista cartelle cliniche' },
        { path: '/pazienti', label: 'Lista pazienti' },



      ];
    }
  }

  showErrorPopup(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
