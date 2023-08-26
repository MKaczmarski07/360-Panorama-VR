import { Component, OnInit } from '@angular/core';
import { ThreeService } from '../three.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public threeService: ThreeService) {}
  alpha: number | null = 0;
  beta: number | null = 0;
  gamma: number | null = 0;

  ngOnInit() {
    this.threeService.createScene();
  }
}
