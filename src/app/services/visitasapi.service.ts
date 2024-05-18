import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class VisitasApiService {

  public url: string;
  public password: string = 'dwec';

  constructor(private _http: HttpClient) {
    this.url = 'https://6646fe2151e227f23ab0912d.mockapi.io/api/comments/';
  };

  getVisitas(): Observable<any> {
    return this._http.get(this.url);
  }

  getVisita(id: number): Observable<any> {
    return this._http.get(this.url + id);
  }

  createVisita(datos: any): Observable<any> {
    return this._http.post(this.url, datos);
  }

  updateVisita(id: number, datos: any): Observable<any> {
    return this._http.put(this.url + id, datos);
  }

  deleteVisita(id: number): Observable<any> {
    return this._http.delete(this.url + id);
  }
}
