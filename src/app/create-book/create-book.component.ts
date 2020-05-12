import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BookCatalogueService } from '../book-catalogue.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  createForm;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private bookCatalogueService: BookCatalogueService
  ) { 
    this.createForm = this.formBuilder.group({
      title: '',
      description: '',
      author: '',
      genre: '',
      publisher: '',
      publishDate: new Date()
    });
  }

  ngOnInit(): void {
  }

  onSubmit(bookData) {
    console.log(bookData);
    this.bookCatalogueService.addBook(bookData).subscribe();
  }

}
