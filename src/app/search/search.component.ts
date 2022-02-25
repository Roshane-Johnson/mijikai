import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private shortService: SearchService) {}

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

  fetchCompleted: boolean | null = null;
  shortenedUrl: string = '';
  copyStatusText: string = 'Copy';

  shortenUrl() {
    this.fetchCompleted = false;
    if (this.url?.valid) {
      this.shortService
        .shortenUrl(this.shortenUrlForm.get('q')?.value)
        .subscribe((resp: any) => {
          this.fetchCompleted = true;
          this.shortenedUrl = resp.link;
          this.url?.setValue('');
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
}
