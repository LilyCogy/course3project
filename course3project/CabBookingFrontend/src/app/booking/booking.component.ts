import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingApiService } from '../booking-api.service';

export interface Booking{
  fromlocation?: string,
  tolocation?: string,
  typeofcab?: string,
  amount?: Number,
  numberofseats?: Number
}

export interface SelectedBooking{
  cname?: string,
  destination?: string,
  source?: string,
  typeofcab?: string,
  numberofseats?: string,
}


@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  selectedBooking : SelectedBooking = {};
  allBookings : Booking[] = []
  onBookResponse: string | undefined;

  bookings = this.allBookings.slice(0, 4);

  constructor(private bookingApiService: BookingApiService) {}


  ngOnInit(): void {
    this.getBookings()
  }

  isSelected() {
    return this.selectedBooking !== undefined;
  };

  onBook(){

    this.bookingApiService.book(this.selectedBooking)
    .then(response => {
      this.onBookResponse = response.data;
      console.log("==========Booked Cab==========");
      console.log(response.data)
      console.log("==========Booked Cab==========");
    })
    .catch(error => {
      console.log(error);
    });
  }

  onCustomerNameChange(event: Event): void {
    if (event.target) {
      const element: HTMLInputElement = event.target as HTMLInputElement;
      this.selectedBooking.cname = element.value;
    }
  }

  onTypeOfCabChange(event: Event): void {
    if (event.target) {
      const element: HTMLInputElement = event.target as HTMLInputElement;
      this.selectedBooking.typeofcab = element.value;
    }
  }

  selectBookingFunction(book: Booking){
    this.selectedBooking.destination = book.tolocation;
    this.selectedBooking.source = book.fromlocation;
    this.selectedBooking.typeofcab = book.typeofcab;
    this.selectedBooking.numberofseats = book.numberofseats + '';
  }

  onToAddressChange(event: Event): void {
    if (event.target) {
      const element: HTMLInputElement = event.target as HTMLInputElement;
      this.selectedBooking.destination = element.value;
    }
  }

  onFromAddressChange(event: Event): void {
    if (event.target) {
      const element: HTMLInputElement = event.target as HTMLInputElement;
      this.selectedBooking.source = element.value;
    }
  }

  onNumberOfSeats(event: Event): void {
    if (event.target) {
      const element: HTMLInputElement = event.target as HTMLInputElement;
      this.selectedBooking.numberofseats = element.value;
    }
  }
  getBookings() {
    this.bookingApiService.findAllCabs()
      .then(response => {
        this.allBookings = response.data;
        this.updateBooking();
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateBooking(){
    this.bookings = this.allBookings.slice(0, 4);
  }

  prevFunction() {    
    const saved = this.allBookings.shift();
    if(saved){
      this.allBookings.push(saved);
    }

    this.updateBooking();
    
  }  


  nextFunction(){
    const saved = this.allBookings.pop()
    if(saved){
      this.allBookings.unshift(saved);
    }
    this.updateBooking();  }
}
