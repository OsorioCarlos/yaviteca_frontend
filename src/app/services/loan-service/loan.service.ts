import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private headers: HttpHeaders;
  private url: string = environment.api_url_app + 'loan';

  constructor(private _http: HttpClient) { }

  get() {
    this.headers = new HttpHeaders()
      .set('X-Requested-With', 'XMLHttpRequest')
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');

    return this._http.get(this.url, {headers: this.headers});
  }

  post(data: any) {
    this.headers = new HttpHeaders()
      .set('X-Requested-With', 'XMLHttpRequest')
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    
    return this._http.post(this.url, data, {headers: this.headers});
  }

  update(id: number, data: any) {
    this.headers = new HttpHeaders()
      .set('X-Requested-With', 'XMLHttpRequest')
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    
    return this._http.put(`${this.url}/${id}`, data, {headers: this.headers});
  }

  delete(id: number) {
    this.headers = new HttpHeaders()
      .set('X-Requested-With', 'XMLHttpRequest')
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');
    
    return this._http.delete(`${this.url}/${id}`, {headers: this.headers});
  }
}
