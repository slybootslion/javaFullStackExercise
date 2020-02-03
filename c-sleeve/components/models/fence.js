import {
  Cell
} from './cell.js'

class Fence {
  cells = []
  specs

  constructor(specs) {
    this.specs = specs
  }

  init() {
    this.specs.forEach(i => {
      const cell = new Cell(i)
      this.cells.push(cell)
    })
  }

  pushValueTitle(title) {
    this.valueTitles.push(title)
  }
}

export {
  Fence
}