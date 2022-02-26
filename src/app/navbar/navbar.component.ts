import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  isDarkMode: boolean = false;

  toggleTheme() {
    const documentElement = document.querySelector('body');

    if (localStorage['theme'] == 'dark') {
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
    localStorage.getItem('theme') ? (localStorage['theme'] = 'dark') : null;
    document.querySelector('body')?.classList.add('dark');
    this.isDarkMode = true;
  }
}
