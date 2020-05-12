import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BookCatalogueService } from '../book-catalogue.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];

  searchTerm: string = '';
  genre: string = '';
  dateFrom: Date;
  dateTo: Date;

  constructor(private bookCatalogueService: BookCatalogueService) { }

  ngOnInit(): void {
    this.bookCatalogueService.getBooks()
      .subscribe(books => this.books = books);
  }

  onSearch() {
    console.log('search term: ' + this.searchTerm);
    console.log('genre: ' + this.genre);
    console.log('date from: ' + this.dateFrom);
    console.log('date to: ' + this.dateTo);

    const dateFromString = this.formatDateToString(this.dateFrom);
    const dateToString = this.formatDateToString(this.dateTo);
    this.bookCatalogueService.getBooks(this.searchTerm, this.genre,
      dateFromString, dateToString).subscribe(books => this.books = books);
  }

  private formatDateToString(date: Date): string {
    const dp = new DatePipe(navigator.language);
    let p = 'y-MM-dd';
    let dtr = dp.transform(date, p);
    return dtr;
  }

}
