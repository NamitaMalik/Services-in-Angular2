# Services In Angular2

This repo contains a small example that discusses use cases of **service**s and also compares **Angular2 services** with
**Angular1 services**.

Well, whenever we think about **service**s, two common use cases come into our minds:

* Sharing data between the components of the application
* Making `http` requests

To demonstrate above use cases, let us take a following example:

Suppose, there is a cinema named as `ABC`. To keep our example simple, let us assume that cinema has `10` seats only and
it sells tickets either through a **ticket window** or through a ticket booking site named **bookshow.com**.

So let's break our application into small parts:

* `AppComponent` -> This will be the parent component of our application. This component would include various child
components.
* `BookShowComponent` -> This component would be used by users booking tickets through **bookshow.com**.
* `WindowComponent` -> Operator at ticket window/counter would use this component to book tickets.
* `BookingService` -> This **service** gives the number of tickets available.
* `MyTicketService` -> Ticket details are provided by this **service**.
* `ticketData.json` -> This json contains hard coded ticket details for demonstration purpose. We will be making a `get`
 call to fetch data from this `json`.

Now, let's add some code to these components in order to join these parts and make them work.

Here is the `app.component.ts` file:

```TypeScript
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

**window.component.ts**
```TypeScript
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

We have two functions : `bookTicket` and `showTicket` in the `WindowComponent`. As the name suggests `bookTicket` 
component will be used to book tickets while `showTicket` component will be used to display the ticket details.

We also have a variable `ticketCount` which is empty so far but will be displaying the number of tickets available.

Before moving ahead, let's have a look at the `BookShowComponent` too:

**book-show.component.ts**
```TypeScript
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

So now its time to get into some more action. The first use case that we discussed for **service**s was **data sharing**
amongst the components.

Hence, we are making a booking **service** here, which will give the count of tickets available. Here is the **service**:

**booking-service.ts**
```TypeScript
import {Injectable} from "angular2/core";

@Injectable()
export class BookingService {
    totalTicketCount:number = 10;
}
```

We have hardcoded the ticket count in this **service** to `10`. We have named the above file as `booking-service.ts`. It
is a common practice to name the **service** files with `-service` suffix.

Now we want this **service** to be exposed to our `BookShowComponent` and the `WindowComponent`. To achieve let's add 
the following lines to our `app.component.ts`:

```import {BookingService} from "./booking-service";```

Above statement is an import statement while below code needs to be added to the `@Component` decorator.

```providers: [BookingService]```

Now, our `app.component.ts` would look like:

```TypeScript
import {Component} from 'angular2/core';
import {BookingService} from "./booking-service";
import {WindowComponent} from "./window.component";
import {BookShowComponent} from "./book-show.component";
@Component({
    selector: 'my-app',
    template: `
    <cinema-window></cinema-window>
    <book-show></book-show>
    `,
    directives: [WindowComponent, BookShowComponent],
    providers: [BookingService]
})

export class AppComponent {
}
```

Any **service** that we want to use, needs to be injected in `providers`. Now let's see how to use this **service** in 
`BookShowComponent` and `WindowComponent`.

```TypeScript
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

```TypeScript
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

* We have imported the `BookingService` **service** into these two child components.
* The `WindowComponent` or the `BookShowComponent` are requesting the injection of `BookingService` **object** by 
declaring the constructor argument with a type.

```TypeScript
constructor(private _bookingService:BookingService) {
}
```  
  
> Note: `_` is prefixed before variables to denote that they are private variables.

In the `ticketCount` variable we have assigned the `totalTicketCount` which is given by the **service** `BookingService`.

So and once user clicks on the `Book Ticket` button in the `WindowComponent`, `bookShow()` function is called, where 
`totalTicketCount` shared by the `BookingService` is decremented by `1` and the new `_bookingService.totalTicketCount` is
then assigned to `ticketCount` to update on the view.

Supposing that `bookShow()` function has been called once in the `WindowComponent`, now the `totalTicketCount` would be 
`9`. Now, let's move to `BookShowComponent`, and click on the `Book Ticket` button here and you will notice that, 
`ticketCount` would now become `9-1` i.e. `8` here.

Let's book another ticket through `WindowComponent` and see that available count would now change to `7`.

> Note: Currently, there is one flaw in the application i.e. once we change the `totalTicketCount` from one component, 
it should get updated on the view of the second component, but this part is currently out of the scope of this post.

Now, let's move on to our second use case, i.e. making `http` requests. To start with, here is your hardcoded json from 
which we would be fetching the ticket details.

**ticketData.json**
```JSON
{
  "cinemaName" : "ABC Cinemas",
  "showTime" : "9:30PM",
  "date": "25-04-2016",
  "seatNumber": "A1",
  "ticketNumber": 1362196405309
}
```

Now, let's make `myTicket-service` which will make `http` request. Here we go:

**myTicket-service.ts**
```TypeScript
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
```

Here we are importing `Http` and have a look at the `getTicketData()` function where we are making our `http` request. 
Response from the request is then fed into a map, where the response is being converted into  **JSON**.

Well.. the story doesn't ends here. Now, let's go back to `WindowComponent`. We had made a `showTicket()` function here, 
which unfortunately as of now is not doing anything. So its time to make it work:

```TypeScript
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
    constructor(private _bookingService:BookingService, private _myTicketService:MyTicketService) {
    }

    ticketData = {};
    dataAvailable = false;
    ticketCount = _bookingService.totalTicketCount;
    bookTicket = () => {
        _bookingService.totalTicketCount = _bookingService.totalTicketCount - 1;
        this.ticketCount = _bookingService.totalTicketCount;
    };
    showTicket = () => {
        _myTicketService.getTicketData()
            .subscribe(
                data => this.ticketData = data,
                this.dataAvailable = true,
                (error) => {
                }
            );
    }
}
```

To start from the top, changes that I have made in the `WindowComponent` are:

* Imported the `MyTicketService`.
* We have added `MyTicketService` as a constructor argument as done earlier for requesting the injection of 
    `MyTicketService` object.
* There is a `ticketData` object, which will be used to display ticket details on the view. `dataAvailable` flag is also t
    here which would be set to `true` once we successfully receive the data.
* Now let's understand what is happening in the `showTicket()` function - We are calling the `getTicketData()` function 
    of `MyTicketService` which makes the `http` call. In the response we get an **Observable** which is parsed as 
    **JSON** in the **map** function which also returns an **Observable**. We then call **.subscribe()** method on this 
    **Observable** object. 

* **.subscribe()** method takes 3 **event handlers** as arguments - **onNext**, **onError** and **onCompleted**. It is 
    the **onNext** method which will receive the **HTTP** response data. As you can observe, we are populating 
    `ticketData` object in this method.

Let's make the similar changes to `BookShowComponent`. So, `BookShowComponent` would look something like:

```TypeScript
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
export class BookShowComponent {
    constructor(private _bookingService:BookingService, private _myTicketService:MyTicketService) {
    }

    ticketCount = _bookingService.totalTicketCount;
    ticketData = {};
    dataAvailable = false;
    bookShow = () => {
        _bookingService.totalTicketCount = _bookingService.totalTicketCount - 1;
        this.ticketCount = _bookingService.totalTicketCount;
    };
    showMyTicket = () => {
        _myTicketService.getTicketData()
            .subscribe(
                data => _this.ticketData = data,
                this.dataAvailable = true
                , (error) => {

                }
            );
    }
}
```

Now, we need to make the one last change in order to make everything work. Here it is :

In our `main.ts`, we need to import `rxjs` and `http` so that they can be used throughout the application:

**main.ts**
```TypeScript
import {bootstrap}      from 'angular2/platform/browser';
import {AppComponent}   from './app.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

bootstrap(AppComponent, [HTTP_PROVIDERS]);
```

We are passing `HTTP_PROVIDERS` to `bootstrap()`. `http` module of **Angular2** exposes `HTTP_PROVIDERS` which has the 
providers required for making `http` requests.

You can notice that we are also importing `rxjs`so now the question that is coming to our mind is what are `rxjs`. Well 
let's have a look at these in brief.

`rxjs` is a library by **Microsoft** which is being used in **Angular 2** for making async calls. So when we make a 
call suppose `http.get()`, an `Observable` object is returned. `Observables` are though similar to `Promises` and help 
in managing `async` calls they still are different from **Promises**.

* **Observables** emit multiple values.
* They are treated as **Arrays** which means we can use **Array** like methods such as **map** , **reduce** etc.

Also, we need to make one last change that is registering our `MyTicketService` in the `app.component.ts`:

```TypeScript
import {Component} from 'angular2/core';
import {BookingService} from "./booking-service";
import {MyTicketService} from "./myTicket-service";
import {WindowComponent} from "./window.component";
import {BookShowComponent} from "./book-show.component";
@Component({
    selector: 'my-app',
    template: `
    <cinema-window></cinema-window>
    <book-show></book-show>
    `,
    directives: [WindowComponent, BookShowComponent],
    providers: [BookingService, MyTicketService]
})

export class AppComponent {
}
```

Well, now if you run the code, you would be able to get the ticket details.

Before we end this blog it would be important for us to discuss the major difference between the **Services in Angular 
1.x** and **Services in Angular2**:

**Services in Angular 1.x** are **singleton** i.e. you would get one **object** for the entire application but that is 
not the case in **Angular2**. You had seen that in our `app.ts`, we had done:

`providers: [BookingService, MyTicketService]`

In the above line we had registered our **providers** `BookingService` and `MyTicketService`. Since both of these 
**providers** are being used all throughout the application, also we had to share data between our components i.e. between both 
the child components, the ideal place to register our both the providers was in `AppComponent`. Had we registered our 
**provider** separately in each component, then we would have got the separate instance of that **provider** in each 
component. 

So now suppose that original `totalTicketCount` is `10` and booking the ticket from `WindowComponent` would have 
decreased the count to `9` and then on making a booking from `BookShowComponent`, the count would change to `9`. `9`? But 
why `9`? Because there would be different instances of `BookingService` in the `WindowComponent` and the `BookShowComponent`.

Hence, this is the major difference between the services in **Angular 1.x and Angular2**.

Follow Me
---
[Github](https://github.com/NamitaMalik)

[Twitter](https://twitter.com/namita13_04)

[LinkedIn](https://in.linkedin.com/in/namita-malik-a7885b23)

[More Blogs By Me](https://namitamalik.github.io/)