/**
 * Created by Namita Malik on 4/24/16.
 */
import {bootstrap}      from '@angular/platform-browser-dynamic';
import {AppComponent}   from './app.component';
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';

bootstrap(AppComponent, [HTTP_PROVIDERS]);