import {Paging} from "../utils/paging";

class Search {
  static search(q) {
    return new Paging({
      req: {
        url: `/search?q=${q}`
      },
      count: 5
    })
  }
}

export {
  Search
}
