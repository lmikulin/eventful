import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
    templateUrl: 'app/home/welcome.component.html'
})
export class WelcomeComponent {
    public city: string = "";
    public message: string = "";

    constructor(private _router: Router) {}

    searchCity(): void {
      if (this.city) {
        this.message = "";
        this._router.navigate(['EventsList', {city: this.city, page: 1}]);
      } else {
        this.message="Type in a City to get the list of Events!";
      }
    }
}
