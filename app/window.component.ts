/**
 * Created by Namita Malik on 4/24/16.
 */
import {Component} from 'angular2/core';
import {BookingService} from "./booking-service";
import {MyTicketService} from "./myTicket-service";

@Component({
    selector: 'cinema-window',
    template: `
    <div>
        <h1>ABC Cinemas</h1>
        <span>Hello Admin</span>
        <p>Currently, Number of Tickets available are: {{ticketCount}}</p>
        <button (click)="bookTicket()">Book Ticket</button>
        <button (click)="showTicket()">Show Ticket</button>
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

export class WindowComponent {
    constructor(private bookingService:BookingService, private myTicketService:MyTicketService) {
    }

    ticketData = {};
    dataAvailable = false;
    ticketCount = bookingService.totalTicketCount;
    bookTicket = () => {
        bookingService.totalTicketCount = bookingService.totalTicketCount - 1;
        this.ticketCount = bookingService.totalTicketCount;
    };
    showTicket = () => {
        myTicketService.getTicketData()
            .subscribe(
                data => this.ticketData = data,
                this.dataAvailable = true,
                (error) => {
                }
            );
    }
}