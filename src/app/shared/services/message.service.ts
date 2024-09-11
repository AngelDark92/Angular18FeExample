import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private message: string = '';

  setMessage(message: string) {
    this.message = message;
  }

  getMessage(): string {
    const msg = this.message;
    this.message = '';  // cancella il messaggio dopo il recupero, dopo 8 secondi
    return msg;
  }
}

