import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(private shortService: SearchService) {}

  fetchCompleted: boolean | undefined;
  errorMessage: string | undefined;
  shortenSubscription: Subscription | undefined;
  shortenedUrl: string = '';
  copyStatusText: string = 'Copy';

  shortenUrlForm: FormGroup = new FormGroup({
    q: new FormControl('', [
      Validators.pattern(
        /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
      ),
      Validators.required,
    ]),
  });

  get url() {
    return this.shortenUrlForm.get('q');
  }

  shortenUrl() {
    this.fetchCompleted = false;
    if (this.url?.valid) {
      this.shortenSubscription = this.shortService
        .shortenUrl(this.shortenUrlForm.get('q')?.value)
        .subscribe({
          next: (resp: any) => {
            this.shortenedUrl = resp.link;
            this.url?.setValue('');
          },
          error: (resp: HttpErrorResponse) => {
            switch (resp.error.message) {
              case 'ALREADY_A_BITLY_LINK':
                this.errorMessage = 'This is already a short link';
                break;
              case 'RATE_LIMIT_EXCEEDED':
                this.errorMessage = 'Server error RL500';
                break;
              default:
                this.errorMessage = 'An unknown error occured';
                break;
            }

            console.log(resp);
          },
          complete: () => {
            this.fetchCompleted = true;
          },
        });
      return;
    }
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    this.copyStatusText = 'Copied!';
    setTimeout(() => (this.copyStatusText = 'Copy'), 3 * 1000);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.shortenSubscription?.unsubscribe();
  }
}
