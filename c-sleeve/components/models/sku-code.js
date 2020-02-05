import {
  combination
} from '../../utils/util.js'

class SkuCode {
  code
  spuId
  totalSegments = []

  constructor(code) {
    this.code = code
    this._splitToSegments()
  }

  _splitToSegments() {
    // 2$1-45#3-9#4-14
    const spuAndSpec = this.code.split('$')
    this.spuId = spuAndSpec[0]

    const specCodeArray = spuAndSpec[1].split('#')
    for (let i = 0; i < specCodeArray.length; i++) {
      const segments = combination(specCodeArray, i + 1)
      const newSegments = segments.map(segs => segs.join('#'))
      this.totalSegments = [...this.totalSegments, ...newSegments]
    }
  }
}

export {
  SkuCode
}