/**
 * Created by namita on 4/24/16.
 */

import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

bootstrap(AppComponent, [HTTP_PROVIDERS]);