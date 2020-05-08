import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Book } from './models/book';

@Injectable({
  providedIn: 'root'
})
export class BookCatalogueService {
  apiUrl = 'http://localhost:54552/api/book';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(this.apiUrl + '/' + id);
  }
}
