import { Cell } from './cell';

enum Direction {
  Left,
  Right
};

export class SudokuBoard {

  size: number;
  cells: Cell[][];

  // setup filters
  rowFilters: Set<number>[];
  colFilters: Set<number>[];
  quadrantFilters: Set<number>[];

  isDone = false;

  constructor () {
    this.initialize();
  }

  initialize(): void {
    this.resetFilters();
    
    this.cells = [];
    for (let row = 0; row < 9; row++) {
      this.cells[row] = [];
      for (let col = 0; col < 9; col++) {
        this.cells[row][col] = new Cell(this.getRandomNumber(row, col), row, col, Math.random() >= 0.5);
      }
    }
  }

  resetFilters() {
    this.rowFilters = [];
    this.colFilters = [];
    this.quadrantFilters = [];
    for (let i = 0; i < 9; i++) {
      this.rowFilters[i] = new Set();
      this.colFilters[i] = new Set();
      this.quadrantFilters[i] = new Set();
    }
  }

  getRandomNumber(row: number, col: number): number {
    // I'm beginning with a full list of numbers;
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let quadrant = this.getQuadrant(row, col);

    for (let i = 0; i < nums.length; i++) {
      if (this.rowFilters[row].has(nums[i]) ||
          this.colFilters[col].has(nums[i]) ||
          this.quadrantFilters[quadrant].has(nums[i])) {
        nums.splice(i, 1);
        i--;
      }
    }
    
    let num = nums[Math.floor(Math.random() * nums.length)];

    this.rowFilters[row].add(num);
    this.colFilters[col].add(num);
    this.quadrantFilters[quadrant].add(num);

    return num;
  }

  getQuadrant(row, col) {
    let quadrant = 0
    if (row >= 0 && row <= 2) {
      if (col > 2 && col <= 5) {
        quadrant = 1;
      }
      if (col > 5 && col <= 8) {
        quadrant = 2;
      }
    }
    if (row > 2 && row <= 5) {
      if (col >= 0 && col <= 2) {
        quadrant = 3;
      }
      if (col > 2 && col <= 5) {
        quadrant = 4;
      }
      if (col > 5 && col <= 8) {
        quadrant = 5;
      }
    }
    if (row > 5 && row <= 8) {
      if (col >= 0 && col <= 2) {
        quadrant = 6;
      }
      if (col > 2 && col <= 5) {
        quadrant = 7;
      }
      if (col > 5 && col <= 8) {
        quadrant = 8;
      }
    }

    return quadrant;
  }

  isUndefined(): boolean {
    for (let row of this.cells) {
      for (let cell of row) {
        if (cell.value == undefined) return true;
      }
    }

    return false;
  }
}