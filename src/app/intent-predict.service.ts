import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class IntentPredictService {

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };

  constructor(private http: HttpClient) { }
  
  private apiUrl =
    "http://ec2-52-15-118-138.us-east-2.compute.amazonaws.com:8000/pred_intent/";

  getPrediction(message: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + message);
  }
}
