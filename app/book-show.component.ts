/**
 * Created by namita on 4/24/16.
 */

import {Component} from 'angular2/core';
import {BookingService} from "./booking-service";
import {MyTicketService} from "./myTicket-service";

@Component({
    selector: 'book-show',
    template: `
    <div>
    <h1>Welcome to bookshow.com</h1>
    <span>Welcome User</span>
    <p>Currently, Number of Tickets available are: {{ticketCount}}</p>
    <button (click)="bookShow()">Book Ticket</button>
    <button (click)="showMyTicket()">Show Ticket</button>
    <div class="box" [hidden]="!dataAvailable">
    <span>Your Ticket Details:</span>
    <ul class="li-style">
    <li>{{ticketData.cinemaName}}</li>
    <li>{{ticketData.showTime}}</li>
    <li>{{ticketData.date}}</li>
    <li>{{ticketData.seatNumber}}</li>
    <li>{{ticketData.ticketNumber}}</li>
    </ul>
    </div>
    </div>
    `
})

export class BookShowComponent{
    constructor (private bookingService:BookingService,private myTicketService:MyTicketService ){
    }
    ticketCount = bookingService.totalTicketCount;
    ticketData = {};
    dataAvailable = false;
    bookShow = () => {
        bookingService.totalTicketCount = bookingService.totalTicketCount - 1;
        this.ticketCount = bookingService.totalTicketCount;
    };
    showMyTicket = () => {
        myTicketService.getTicketData()
        .subscribe(
            data => _this.ticketData = data,
            this.dataAvailable = true
        ,(error) => {

            }
        );
    }
}
