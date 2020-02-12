import { Http } from '../utils/http'
class Categories {
  roots = [] // 根目录
  subs = [] // 二级分类

  async getAll() {
    const data = await Http.request({
      url: `/category/all`
    })
    this.roots = data.roots
    this.subs = data.subs
  }

  getRoots() {
    return this.roots
  }

  getRoot(rootId) {
    return this.roots.find(root => root.id === Number(rootId))
  }

  getSubs(rootId) {
    return this.subs.filter(sub => sub.parent_id === Number(rootId))
  }

}

export {
  Categories
}
