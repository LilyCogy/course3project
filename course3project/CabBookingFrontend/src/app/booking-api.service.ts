import { Injectable } from '@angular/core';
import axios from 'axios';
import {  SelectedBooking } from './booking/booking.component';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {

  constructor() { }

  findAllCabs() {
    return axios.get('http://localhost:8282/cabfare/findAllCabs', {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: false,
    });
  }

  book(data: SelectedBooking ){
    return axios.post(
      'http://localhost:8181/bookcab/book',
       data, {
       headers: {
        'Content-type': 'application/json',
       },
       withCredentials: false,
    }
    )
  }
}
