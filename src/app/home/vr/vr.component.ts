import { Component, OnInit } from '@angular/core';
import { VrThreeService } from 'src/app/vr-three.service';

@Component({
  selector: 'app-vr',
  templateUrl: './vr.component.html',
  styleUrls: ['./vr.component.scss'],
})
export class VrComponent implements OnInit {
  constructor(public vrThreeService: VrThreeService) {}

  ngOnInit(): void {
    this.vrThreeService.createScene();
  }
}
