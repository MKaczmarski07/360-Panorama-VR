import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { VrThreeService } from './vr-three.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'VanGogh';
  loading = false;

  constructor(private router: Router, public vrThreeService: VrThreeService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.url === '/vr') {
        this.loading = true;
      } else if (event instanceof NavigationEnd && event.url === '/vr') {
        let timeoutDuration = 0;
        const checkLoadingInterval = setInterval(() => {
          if (!this.vrThreeService.isLoading) {
            clearInterval(checkLoadingInterval);
            this.loading = false;
          }
          timeoutDuration += 1000;
        }, 1000);
      }
    });
  }
}
