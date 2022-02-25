import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'dotenv';

config();

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  shortenUrl(url: string) {
    return this.http.post(
      'https://api-ssl.bitly.com/v4/bitlinks',
      { long_url: url },
      {
        headers: {
          Authorization: `Bearer ${process.env['API_KEY']}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
