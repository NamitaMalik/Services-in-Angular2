/**
 * Created by namita on 4/24/16.
 */

import {Injectable} from "@angular/core";
import {Http} from '@angular/http';

@Injectable()
export class MyTicketService {
    constructor(public _http:Http) {
    }

    getTicketData() {
        return this._http.get("./ticketData.json")
            .map(function (response) {
                return response.json()
            });
    }
}