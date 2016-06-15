import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EventService {
  private _appKey = 'R4MgQHSsm53XqS35';
  private _productUrl = 'http://api.eventful.com/json/events/search';
  constructor(private _http: Http) {}

  getEvents(city, page): Observable<any[]> {
    return this._http.get(this._productUrl + '?cors_filter=1&app_key=' + this._appKey + '&location=' + city + '&page=' + page)
      .map((response: Response) => {
        console.log("RESPONSE!", response);
        return <any[]>response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any[]> {
    console.log("did done broke it good:", error);
    return null;
  }
}
