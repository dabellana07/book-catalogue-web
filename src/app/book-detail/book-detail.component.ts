import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BookCatalogueService } from '../book-catalogue.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  updateForm;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private bookCatalogueService: BookCatalogueService
  ) { 
    this.updateForm = this.formBuilder.group({
      title: '',
      description: '',
      author: '',
      genre: '',
      publisher: '',
      publishDate: new Date()
    });
  }

  ngOnInit(): void {
    this.getBook();
  }

  getBook() {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookCatalogueService.getBook(id)
      .subscribe(book => {
        this.book =  book;
        this.updateForm.get('title').setValue(book.title);
        this.updateForm.get('description').setValue(book.description);
        this.updateForm.get('author').setValue(book.author);
        this.updateForm.get('genre').setValue(book.genre);
        this.updateForm.get('publisher').setValue(book.publisher);
        this.updateForm.get('publishDate').setValue(book.publishDate);
      });
  }

}
