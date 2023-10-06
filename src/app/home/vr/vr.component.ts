import { Component, OnInit } from '@angular/core';
import { VrThreeService } from 'src/app/vr-three.service';
import { FullscreenService } from 'src/app/fullscreen.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-vr',
  templateUrl: './vr.component.html',
  styleUrls: ['./vr.component.scss'],
  animations: [
    trigger('toggleVisibility', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translate(50%, 100%)',
        }),
        animate(
          '100ms ease-out',
          style({ opacity: 1, transform: 'translate(50%, 0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('100ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class VrComponent implements OnInit {
  controlsInfo = '';

  constructor(
    public vrThreeService: VrThreeService,
    public fullscreenService: FullscreenService
  ) {}

  ngOnInit(): void {
    this.vrThreeService.createScene();
  }

  showControlInfo() {
    if (this.vrThreeService.orbitControlMode) {
      this.controlsInfo = 'Orientation';
      setTimeout(() => {
        this.controlsInfo = '';
      }, 4000);
    } else {
      this.controlsInfo = 'Orbit';
      setTimeout(() => {
        this.controlsInfo = '';
      }, 4000);
    }
  }
}
