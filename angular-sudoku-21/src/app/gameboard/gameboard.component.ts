import { Component, OnInit } from '@angular/core';

import { SudokuBoard } from '../shared/sudoku-board';
import { Cell } from '../shared/cell';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  board: SudokuBoard;
  activeNumber: number;

  isDone = false;

  constructor() { }

  ngOnInit() {
    this.board = new SudokuBoard();
    while (this.board.isUndefined()) {
      this.board.initialize();
    }
  }

  reload() {
    this.board.initialize();
  }

  setActive(button, number: number): void {
    if (this.activeNumber == number) {
      this.activeNumber = undefined;
    } else {
      this.activeNumber = number;
    }
  }

  onCellSelect(cell: Cell): void {
    if (this.activeNumber == -1 || cell.guess == this.activeNumber) {
      cell.makeGuess(undefined); 
    } else {
      cell.makeGuess(this.activeNumber);
    }

    if (document.getElementsByClassName('incomplete').length == 0) {
      this.isDone = true;
    }
  }

}