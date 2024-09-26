import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new Subject<string>();

  error$ = this.errorSubject.asObservable();

  reportError(error: any) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.error && error.error.message) {
        errorMessage = `Server-side error: ${error.error.message}`;
      } else if (typeof error.error === 'string') {
        // If error.error is a string, try to parse it
        try {
          const parsedError = JSON.parse(error.error);
          errorMessage = `Server-side error: ${parsedError.message}`;
        } catch (e) {
          errorMessage = `Server-side error: ${error.error}`;
        }
      } else {
        errorMessage = `Server-side error: ${error.status} - ${error.statusText}`;
      }
    }
    this.handleError(errorMessage);
  }

  private handleError(message: string) {
    this.errorSubject.next(message);
  }
}
