import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Book } from './models/book';

@Injectable({
  providedIn: 'root'
})
export class BookCatalogueService {
  apiUrl = 'https://localhost:5001/api/book';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/search')
      .pipe(catchError(this.handleError));
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(this.apiUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  addBook(book: Book) {
    return this.http.post(this.apiUrl, book)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
