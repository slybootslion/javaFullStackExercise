import { Cell } from './cell.js'

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

  setFenceSketch(skuList) {
    console.log(this.cells)
    this.cells.forEach(c => {
      this._setCellSkuImg(c, skuList)
    })
    console.log(skuList)
  }

  _setCellSkuImg(cell, skuList) {
    const specCode = Cell.getCellCode(cell.spec)
    const matchedSku = skuList.find(s => s.code.includes(specCode))
    if (matchedSku) cell.skuImg = matchedSku.img
  }

  pushValueTitle(title) {
    this.valueTitles.push(title)
  }
}

export {
  Fence
}