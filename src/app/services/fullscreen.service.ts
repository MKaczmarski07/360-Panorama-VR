import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FullscreenService {
  isFullscreen = false;

  constructor() {}

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
