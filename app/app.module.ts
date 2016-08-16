/**
 * Created by namita on 8/16/16.
 */

import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { HttpModule} from '@angular/http';
import {BookingService} from "./booking-service";
import {MyTicketService} from "./myTicket-service";



@NgModule({
    declarations: [AppComponent],
    imports:      [BrowserModule,HttpModule],
    bootstrap:    [AppComponent],
    providers: [BookingService,MyTicketService      ]
})
export class AppModule {}
