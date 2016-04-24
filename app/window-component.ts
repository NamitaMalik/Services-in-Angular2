/**
 * Created by namita on 4/24/16.
 */

import {Component} from 'angular2/core';
import {BookingService} from "./booking-service";

@Component({
    selector: 'cinema-window',
    template: `
    <div>
    <h1>ABC Cinemas</h1>
    <span>Hello Admin</span>
    <p>Currently, Number of Tickets available are: {{ticketCount}}</p>
    <button (click)="bookTicket()">Book Ticket</button>
    </div>
    `
})

    export class WindowComponent{
    constructor (private bookingService:BookingService){
    }
    ticketCount = bookingService.totalTicketCount;
    bookTicket = () => {
        bookingService.totalTicketCount = bookingService.totalTicketCount - 1;
        this.ticketCount = bookingService.totalTicketCount;
    };
}
