import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteParams} from 'angular2/router';

import {EventFilterPipe} from './event-filter.pipe';
import {TruncatePipe} from '../shared/truncate.pipe';
import {EventService} from './event.service';

@Component({
  templateUrl: 'app/events/events-list.component.html',
  styleUrls: ['app/events/events-list.component.css'],
  pipes: [EventFilterPipe, TruncatePipe],
  directives: [ROUTER_DIRECTIVES]
})
export class EventsListComponent implements OnInit {
  _message: string = "Howdy Partner";
  _city: string;
  _page: int;
  _numPages: int;
  listFilter: string = "";
  errorMessage: string;
  events: any[];

  constructor(private _eventService: EventService, private _routeParams: RouteParams, private _router: Router) {
    this._city = decodeURIComponent(this._routeParams.get('city'));
    this._page = Number(this._routeParams.get('page'));
  }
  getEvents(): void {
    // call the EventService here
    let data: any = this._eventService.getEvents(this._city, this._page)
        .subscribe(
          data => {
            if (data && data.events) {
              this._message = "";
              this._numPages = Number(data.page_count);
              this.events = data.events.event;
            } else {
              this._message = "There are no events for " + this._city;
            }
          },
          error => this.errorMessage = <any>error);
  }
  // get events for new city name
  getEventsForCity(): void {
    this._page = 1;
    this.getEvents();
  }
  ngOnInit(): void {
    this.getEvents();
  }
  onNotify(message: string): void {console.log("parent notified!", message)}

  // paging stuff
  onPageFirst(): void {
    this._router.navigate(['EventsList',{city: this._city, page: 1}]);
  }
  onPageLast(): void {
    this._router.navigate(['EventsList',{city: this._city, page: this._numPages}]);
  }
  onPagePlus(): void {
    this._router.navigate(['EventsList',{city: this._city, page: (this._page + 1) % this._numPages}]);
  }
  onPageMinus(): void {
    this._router.navigate(['EventsList',{city: this._city, page: (this._page -1) > 0 ? this._page -1 : this._numPages}]);
  }
}
