import {
  Cell
} from './cell.js'

class Fence {
  cells = []
  specs
  title
  id

  constructor(specs) {
    this.specs = specs
    this.id = specs[0].key_id
    this.title = specs[0].key
  }

  init() {
    this._initCells()
  }

  _initCells() {
    this.specs.forEach(i => {
      const existed = this.cells.some(s => s.id === i.value_id)
      if (existed) return false
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