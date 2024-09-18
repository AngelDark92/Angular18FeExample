import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MessageService } from '../../../../shared/services/message.service';
import { Utenti } from '../../../../core/models/utenti.model';
import { UserService } from '../../../../core/services/user.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home', // posso usare questo selettore per arrivare alla pagina di home (questa) su html si scrive con <app-home> </app-home>
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, MatCardModule]
})
export class HomeComponent {
  successMessage: string = "";
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  userData: Utenti | null = null;

  constructor(private messageService: MessageService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userData = this.userService.getUtentiData();
    this.successMessage = this.messageService.getMessage();
    if (this.successMessage) {
      this._snackBar.open(this.successMessage, "", {
        duration: 7000, horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
    }
  }

}
