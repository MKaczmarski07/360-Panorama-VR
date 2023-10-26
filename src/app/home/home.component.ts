import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public fileUploadService: FileUploadService) {}

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
