// component/l-dome/l-dome.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    tags: []
  },
  lifetimes: {
    ready() {
      let tags
      if(this.data.data.tags){
        tags = this.data.data.tags.split('$')
      }
     this.setData({
       tags
     })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData(){
      console.log(this.data)
    }

  }
})
