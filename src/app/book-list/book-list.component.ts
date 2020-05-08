import { Component, OnInit } from '@angular/core';
import { BookCatalogueService } from '../book-catalogue.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private bookCatalogueService: BookCatalogueService) { }

  ngOnInit(): void {
    this.bookCatalogueService.getBooks()
      .subscribe(books => this.books = books);
  }

}
