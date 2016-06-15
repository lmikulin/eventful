import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx'; // load all features
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {EventsListComponent} from './events/events-list.component';
import {EventService} from './events/event.service';
import {WelcomeComponent} from './home/welcome.component';

@Component({
  selector: 'pm-app',
  template: `
  <div>
    <nav class='nav navbar-default'>
      <div class='container-fluid'>
        <a class='navbar-brand'><img src="./app/assets/images/logo.gif"
            class="img-responsive left-block"
             style="max-height:72px;padding-bottom:52px"/>
        </a>
        <ul class='nav navbar-nav'>
          <li><a [routerLink]="['Welcome']">Home</a></li>
          <li><a [routerLink]="['EventsList', {city: 'Vancouver', page: 1}]">Events List</a></li>
        </ul>
      </div>
    </nav>
    <router-outlet></router-outlet>
  </div>
  `,
  directives:[ROUTER_DIRECTIVES],
  providers:[EventService, HTTP_PROVIDERS, ROUTER_PROVIDERS]
})
@RouteConfig([
  {path: '/welcome', name: 'Welcome', component: WelcomeComponent, useAsDefault: true},
  {path: '/results/:city/:page', name: 'EventsList', component: EventsListComponent}
])
export class AppComponent {
  pageTitle: string = "Liana's World of Marvels"
}
