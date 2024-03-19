import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UtilService } from './util.service';

import { Book } from '../models/Book';
import { OrderDetail } from '../models/OrderDetail';
import { OrderForm } from '../models/OrderForm';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly baseUrl = 'http://localhost:8081/api/v1';
  private orderDetails: OrderDetail[] = [];

  constructor(
    private httpClient: HttpClient,
    private utilService: UtilService
  ) {

  }

  getOrderDetailList(): OrderDetail[] {
    return this.orderDetails;
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.orderDetails.forEach((orderDetail) => {
      totalPrice += orderDetail.finalPrice * orderDetail.quantity;
    }
    );
    return totalPrice;

  }

  addToCart(book: Book) {
    const orderDetail = new OrderDetail();
    orderDetail.book = book;
    orderDetail.quantity = 1;
    orderDetail.finalPrice = book.finalPrice;
    this.orderDetails.push(orderDetail);
  }

  bookIsInCart(book: Book): boolean {
    let ret = false;
    this.orderDetails.forEach((orderDetail) => {
      if (orderDetail.book.id === book.id) {
        ret = true;
      }
    });
    return ret;
  }

  checkout(orderForm: OrderForm) {
    const userId = sessionStorage.getItem('userId');
    const endpoint = `/orders/user?id=${userId}`;
    const url = `${this.baseUrl}${endpoint}`;
    this.httpClient.post(url, orderForm).subscribe(
      response => {
        console.log('API response:', response);
        this.utilService.showToast('New Order Added Successfully');
        this.utilService.goToLink('/orders');
      },
      error => {
        console.error('API error:', error);
        this.utilService.showToast("Error adding new order. Please try again.");
      }
    )
  }
}
