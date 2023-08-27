import { Component, OnInit } from '@angular/core';
import { ThreeService } from 'src/app/three.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit {
  constructor(public threeService: ThreeService) {}

  ngOnInit(): void {
    this.threeService.createScene();
  }
}
