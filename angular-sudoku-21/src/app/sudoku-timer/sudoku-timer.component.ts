import { Component, OnInit, Input } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { Timer } from '../shared/timer';

@Component({
  selector: 'app-sudoku-timer',
  templateUrl: './sudoku-timer.component.html',
  styleUrls: ['./sudoku-timer.component.css']
})
export class SudokuTimerComponent implements OnInit {

  @Input() isDone = false;
  timer: Timer;
  timerDisplay: string;

  sub: Subscription;

  constructor() { }

  ngOnInit() {
    this.timer = new Timer();
    this.sub = interval(1000).subscribe(x => {
      this.timerDisplay = this.timer.asMinutesColonSeconds();
      if (this.isDone) {
        this.timer.finish();
        this.sub.unsubscribe();
      }
    });
  }

}