// components/post/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    res:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 自定义组件的自定义事件发生
    onTap(event){
      const pid = this.properties.res.postId
      this.triggerEvent('posttap',{
        pid
      })
    }
  }
})
