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

Now, let's add some code to these components in order to join these parts and make them work:


