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
    tags: [],
    height: 0
  },
  lifetimes: {
    ready() {
      wx.getImageInfo({
        src: this.data.data.img,
        success: (res) => {
          console.log(res)
          const originHeight = res.height;
          const originWidth = res.width;
          const width = 350
          const height = width * originHeight / originWidth

          this.setData({
            height: height + 'rpx'
          })
        }
      })


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
  methods: {  }
})
