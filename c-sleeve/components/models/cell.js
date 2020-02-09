import { CellStatus } from '../../core/enum.js'

class Cell {
  title
  id
  spec
  status = CellStatus.WAITING
  skuImg

  constructor(spec) {
    this.title = spec.value
    this.id = spec.value_id
    this.spec = spec
  }

  static getCellCode(spec) {
    return spec.key_id + '-' + spec.value_id
  }
}

export {
  Cell
}