import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private headers: HttpHeaders;
  private url: string = environment.api_url_app + 'state';

  constructor(private _http: HttpClient) { }

  get() {
    this.headers = new HttpHeaders()
      .set('X-Requested-With', 'XMLHttpRequest')
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');

    return this._http.get(this.url, {headers: this.headers});
  }
}
