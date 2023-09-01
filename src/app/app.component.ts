import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { VrThreeService } from './vr-three.service';
import { ThreeService } from './three.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'VanGogh';
  loading = false;

  constructor(
    private router: Router,
    public vrThreeService: VrThreeService,
    public threeService: ThreeService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationStart &&
        (event.url === '/vr' || event.url === '/basic')
      ) {
        this.loading = true;
      } else if (
        event instanceof NavigationEnd &&
        (event.url === '/vr' || event.url === '/basic')
      ) {
        let timeoutDuration = 0;
        const checkLoadingInterval = setInterval(() => {
          if (!this.threeService.isLoading || !this.vrThreeService.isLoading) {
            clearInterval(checkLoadingInterval);
            this.loading = false;
          }
          timeoutDuration += 1000;
        }, 1000);
      }
    });
  }
}
