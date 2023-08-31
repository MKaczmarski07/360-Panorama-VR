import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.checkCssSupport();
  }

  checkCssSupport() {
    let isSupported = CSS.supports('height: 100svh');
    const elem = document.querySelectorAll(
      '.dynamicHeight'
    ) as NodeListOf<HTMLElement>;
    if (elem) {
      if (isSupported) {
        elem.forEach((e) => e.classList.add('supported'));
      } else {
        elem.forEach((e) => e.classList.add('not-supported'));
      }
    }
  }
}
