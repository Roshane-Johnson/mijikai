import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  API_KEY = 'addd21c590aafdf5521d6bc5e5ff02ba8a97ea8a';

  shortenUrl(url: string) {
    return this.http.post(
      'https://api-ssl.bitly.com/v4/bitlinks',
      { long_url: url },
      {
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
