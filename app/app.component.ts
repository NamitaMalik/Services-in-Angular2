/**
 * Created by Namita Malik on 4/24/16.
 */
import {Component} from '@angular/core';
import {WindowComponent} from "./window.component";
import {BookShowComponent} from "./book-show.component";
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
    <cinema-window></cinema-window>
    <book-show></book-show>
    `,
    directives: [WindowComponent, BookShowComponent]
})

export class AppComponent {
}