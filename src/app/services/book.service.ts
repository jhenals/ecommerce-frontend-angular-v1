import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { ApiResponse } from '../interface/api-response';
import { UtilService } from './util.service';
import { OrderService } from './order.service';

import { Book } from '../interface/book';
import { Author } from '../interface/author';
import { Category } from '../interface/category';
import { Observable } from 'rxjs';
import { Page } from '../interface/page';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly baseUrl = 'http://localhost:8081/api/v1';
  searchInput: string = '';
  constructor(
    private httpClient: HttpClient,
    private utilService: UtilService,
    private orderService: OrderService,
    private router: Router
  ) { }

  getBooks(page: number = 0, size: number = 12, sortBy: string = 'id', sortDirection: string = "ASC"): Observable<ApiResponse<Page>> {
    const endpoint = '/books';
    const url = `${this.baseUrl}${endpoint}`;
    return this.httpClient.get<ApiResponse<Page>>(`${url}?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`);
  }

  getBooksByCategories(categoryIds: number[], page: number = 0, size: number = 12): Observable<ApiResponse<Page>> {
    const endpoint = '/books/categories';
    const url = `${this.baseUrl}${endpoint}`;
    return this.httpClient.get<ApiResponse<Page>>(`${url}?ids=${categoryIds}&page=${page}&size=${size}`);
  }

  getAuthorsByBookId(id: number): Observable<Author[]> {
    const endpoint = '/authors/book';
    const url = `${this.baseUrl}${endpoint}?id=${id}`;
    return this.httpClient.get<Author[]>(`${url}`);
  }


  getBookById(id: number) {
    const endpoint = `/books/book?id=${id}`;
    const url = `${this.baseUrl}${endpoint}`;
    return this.httpClient.get<Book>(`${url}`);
  }

  goToBookDetails(book: Book) {
    const bookId = book.id;
    const bookTitle = book.title;
    this.router.navigate([`book/${bookId}/${bookTitle}`]);
  }


  getDiscountedPrice(book: Book): number {
    return book.price - (book.price * book.discount / 100);
  }


  getAllCategories(): Observable<Category[]> {
    const endpoint = '/categories';
    const url = `${this.baseUrl}${endpoint}`;
    return this.httpClient.get<Category[]>(`${url}`);
  }

  addNewBook(book: Book) {
    //POST METHOD
  }

  getAllDiscountedBooks() {
    const endpoint = '/books/discounted-books';
    const url = `${this.baseUrl}${endpoint}`;
    return this.httpClient.get<Book[]>(`${url}`);
  }

  getBestSellers() {
    const endpoint = '/books/best-sellers';
    const url = `${this.baseUrl}${endpoint}`;
    return this.httpClient.get<Book[]>(`${url}`);
  }

  updateBook(book: Book) {
    console.log("book:", book);
    const endpoint = `/books/book?id=${book.id}`;
    const url = `${this.baseUrl}${endpoint}`;
    this.httpClient.put(url, book).subscribe(
      response => {
        console.log('API response:', response);
        this.getBooks(0, 12, 'id', 'ASC');
      },
      error => {
        console.error('API error:', error);
      }
    );
  }

  deleteBook(book: Book) {
    //DELETE METHOD
  }

}//book.service.ts
