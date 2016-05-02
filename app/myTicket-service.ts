/**
 * Created by namita on 4/24/16.
 */

import {Injectable} from "angular2/core";
import {Http} from 'angular2/http';

@Injectable()
export class MyTicketService {
    constructor(private _http:Http) {
    }

    getTicketData() {
        return this._http.get("./ticketData.json")
            .map(function (response) {
                return response.json()
            });
    }
}