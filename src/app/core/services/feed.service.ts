import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { IResponseFeed } from '@interfaces/response.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  getFeeds(skip = 0, limit = 20): Observable<IResponseFeed> {
    const url = `${base_url}/feed?skip=${skip}&limit=${limit}`;
    return this.http.get<IResponseFeed>(url);
  }

}
