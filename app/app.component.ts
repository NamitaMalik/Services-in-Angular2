/**
 * Created by namita on 4/24/16.
 */

import {Component} from 'angular2/core';
import {BookingService} from "./booking-service";
import {MyTicketService} from "./myTicket-service";
import {WindowComponent} from "./window-component";
import {BookShowComponent} from "./book-show.component";
@Component({
    selector: 'my-app',
    template: `
    <cinema-window></cinema-window>
    <book-show></book-show>
    `,
    directives:[WindowComponent,BookShowComponent],
    providers : [BookingService,MyTicketService]
})

export class AppComponent {
}