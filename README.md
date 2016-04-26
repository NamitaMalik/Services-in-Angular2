# Services-in-Angular2

This repo contains a small example that discusses use cases of services and also compares **Angular2 services** with **Angular1.x services**.

Well, whenever we think about services, two common use cases come into our minds:

* Sharing data between the components of the application
* Making `http` requests

To demonstrate above use cases, let us take a following example:

Suppose, there is a cinema named as 'ABC'. To keep our example simple, let us assume that cinema has `10` seats only and it sells tickets either through a _ticket window_ or through a ticket booking site named _bookshow.com_.

So let's break our small application into parts:

* `app component` -> This will be the parent component of our application. This component would include various child components.
* `book-show component` -> This component would be used by users booking tickets through _bookshow.com_.
* `window component` -> Operator at ticket window/counter would use this component to book tickets.
* `booking-service` -> This service gives the number of tickets available.
* `myTicket-service` -> Ticket details are provided by this service.
* `ticketData.json` -> This json contains hard coded ticket details for demonstration purpose. We will be maiking a `get` call to fetch data from this `json`.

Now, let's add some code to these components in order to join these parts and make them work.

Here is the 'app.component.ts' file:

```
import {Component} from 'angular2/core';
import {WindowComponent} from "./window.component";
import {BookShowComponent} from "./book-show.component";
@Component({
    selector: 'my-app',
    template: `
    <cinema-window></cinema-window>
    <book-show></book-show>
    `,
    directives: [WindowComponent, BookShowComponent],
})

export class AppComponent {
}
```

In the above code, we have simply added two child components i.e. `WindowComponent` and `BookShowComponent`.

Now, let's have a look at these two components:

```window.component.ts
import {Component} from 'angular2/core';

@Component({
    selector: 'cinema-window',
    template: `
    <div>
        <h1>ABC Cinemas</h1>
        <span>Hello Admin</span>
        <p>Currently, Number of Tickets available are: {{ticketCount}}</p>
        <button (click)="bookTicket()">Book Ticket</button>
        <button (click)="showTicket()">Show Ticket</button>
    </div>  `
})

export class WindowComponent {
    ticketCount = '';
    bookTicket = () => {
    };
    showTicket = () => {
}
```
We have two functions : `bookTicket` and `showTicket` in the `WindowComponent`. As the name suggests `bookTicket` component is used to book tickets while `showTicket` component is used to display the ticket details.
We also have a variabke `ticketCount` which is empty so far but will be displaying the number of tickets available.

Before moving ahead, let's have a look at the `BookShowComponent` too:

```
import {Component} from 'angular2/core';

@Component({
    selector: 'book-show',
    template: `
    <div>
        <h1>Welcome to bookshow.com</h1>
        <span>Welcome User</span>
        <p>Currently, Number of Tickets available are: {{ticketCount}}</p>
        <button (click)="bookShow()">Book Ticket</button>
        <button (click)="showMyTicket()">Show Ticket</button>
    </div>
    `
})

export class BookShowComponent {
    ticketCount = ";
    bookShow = () => {
    };
    showMyTicket = () => {
    }
}
```

Well, `BookShowComponent` also looks pretty much the same.

So now its time to get into some more action. The first use case that we discussed for **services** was **data sharing** amongst the components.
Hence, we are making a booking service here, which will give the count of tickets available. Here is the service:

```
import {Injectable} from "angular2/core";

@Injectable()
export class BookingService {
    totalTicketCount:number = 10;
}
```

We have hardcoded the ticket count in this service to `10`. We have named the above file as `booking-service.ts`. It is a common practice to name the service files with `-service` suffix.

Now we want this service to be exposed to our `BookShowComponent` and the `WindowComponent`. To achieve let's add the following lines to our `app.component.ts`:

```import {BookingService} from "./booking-service";
```
Above statement is an import statement while below code needs to be added to the `@Component` decorator.

```providers: [BookingService]
```

Any service that we want to use, needs to be injected in ```providers```. Now let's see how to use this service in `BookShowComponent` and `WindowComponent`.

```
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
        <button (click)="showTicket()">Show Ticket</button>
    </div>
    `
})
export class WindowComponent {
    constructor(private _bookingService:BookingService) {
    }
    ticketCount = _bookingService.totalTicketCount;
    bookTicket = () => {
        _bookingService.totalTicketCount = _bookingService.totalTicketCount - 1;
        this.ticketCount = _bookingService.totalTicketCount;
    };
    showTicket = () =>{
    }
}
```

After making similar changes to the `BookShowComponent`, it will look like this:

```
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
        <button (click)="showMyTicket()">Show Ticket</button>
    </div>
    `
})

export class BookShowComponent {
    constructor(private _bookingService:BookingService) {
    }

    ticketCount = _bookingService.totalTicketCount;
    bookShow = () => {
        _bookingService.totalTicketCount = _bookingService.totalTicketCount - 1;
        this.ticketCount = _bookingService.totalTicketCount;
    };
    showMyTicket = () => {
    }
}
```

Now, let's discuss the changes that we have made:

* We have imported the `BookingService` service into these two child components.
* The `WindowComponent` or the `BookShowComponent` are requesting the injection of `BookingService` **object** by declaring the constructor argument with a type.

```
 constructor(private _bookingService:BookingService) {
    }
```  
  
> Note: `_` is prefixed before variables to denote that they are private variables.

In the `ticketCount` variable we have assigned the `totalTicketCount` which is given by the service `BookingService`.

So and once user clicks on the `Book Ticket` button in the `WindowComponent`, `bookShow()` function is called, where `totalTicketCount` shared by the `BookingService` is decremented by `1` and the new `_bookingService.totalTicketCount` is then assigned to `ticketCount` to update on the view.

Supposing that `bookShow()` function has been called once in the `WindowComponent`, now the `totalTicketCount` would be `9`. Now, let's move to `BookShowComponent`, and click on the `Book Ticket` button here and you will notice that, `ticketCount` would now become `9-1` i.e. `8` here.

> Note: Currently, there is one flaw in the application i.e. once we change the `totalTicketCount` from one component, it should get updated on the view of the second component, but this part is currently out of the scope of this post.


  
  





