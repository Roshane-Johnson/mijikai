import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  isDarkMode: boolean = true;

  toggleTheme() {
    const documentElement = document.querySelector('body');

    if (localStorage['theme'] === 'dark') {
      documentElement?.classList.remove('dark');
      localStorage['theme'] = 'light';
      this.isDarkMode = false;
    } else {
      documentElement?.classList.add('dark');
      localStorage['theme'] = 'dark';
      this.isDarkMode = true;
    }
  }

  ngOnInit(): void {
    if (localStorage['theme'] === 'dark') {
      document.querySelector('body')?.classList.add('dark');
      this.isDarkMode = true;
    } else if (localStorage['theme'] === 'light') {
      document.querySelector('body')?.classList.remove('dark');
      this.isDarkMode = false;
    } else {
      localStorage['theme'] = 'dark';
      document.querySelector('body')?.classList.add('dark');
      this.isDarkMode = true;
    }
  }
}
