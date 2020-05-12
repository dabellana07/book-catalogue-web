import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
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
    private router: Router,
    private formBuilder: FormBuilder,
    private bookCatalogueService: BookCatalogueService
  ) {
    let dp = new DatePipe(navigator.language);
    let p = 'y-MM-dd'; // YYYY-MM-DD
    let dtr = dp.transform(new Date(), p);

    this.createForm = this.formBuilder.group({
      title: '',
      description: '',
      author: '',
      genre: '',
      publisher: '',
      publishDate: dtr
    });
  }

  ngOnInit(): void {
  }

  onSubmit(bookData) {
    console.log(bookData);
    this.bookCatalogueService.addBook(bookData)
      .subscribe(
        result => { },
        error => {
          console.log(error);
        },
        () => {
          this.router.navigate(['']);
        }
      );
  }

}
