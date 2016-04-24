/**
 * Created by namita on 4/24/16.
 */

import {Component} from 'angular2/core';
import {BookingService} from "./booking-service";

@Component({
    selector: 'book-show',
    template: `
    <div>
    <h1>Welcome to bookshow.com</h1>
    <span>Welcome User</span>
    <p>Currently, Number of Tickets available are: {{ticketCount}}</p>
    <button (click)="bookShow()">Book Ticket</button>
    </div>
    `

})

export class BookShowComponent{
    constructor (private bookingService:BookingService){
    }
    ticketCount = bookingService.totalTicketCount;
    bookShow = () => {
        bookingService.totalTicketCount = bookingService.totalTicketCount - 1;
        this.ticketCount = bookingService.totalTicketCount;
    };
}
