import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';


import { BookAuthor } from 'src/app/models/BookAuthor';
import { Book } from 'src/app/models/Book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: BookAuthor = new BookAuthor();

  constructor(
    private route: ActivatedRoute,
    // private cartService: CartService,
    private bookService: BookService,
    private authService: AuthService,
    private utilsService: UtilService
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bookId = parseInt(params.get('id') || '', 10);
      this.bookService.getBookAuthorByBookId(bookId).subscribe(book => {
        this.book = book;
        console.log(this.book)
      })
    })


  }

  getDiscountedPrice(book: Book) {
    return this.bookService.getDiscountedPrice(book);
  }

  goToLink(url: string) {
    this.utilsService.goToLink(url);
  }

  addToCart(book: Book) {
    // this.cartService.addToCart(book);
  }


}
