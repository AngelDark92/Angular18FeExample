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
    this.message = '';  // Clear the message after retrieval
    return msg;
  }
}

