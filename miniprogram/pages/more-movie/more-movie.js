// miniprogram/pages/more-movie/more-movie.js
// 引入全局变量
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    _type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data._type = options.type
    wx.request({
      url: app.gBaseUrl + this.data._type,
      data: {
        start: 0,
        count: 12
      },
      success: (res) => {
        console.log(res);
        this.setData({
          movies: res.data.subjects
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // setTitleText
    let title = ''
    switch(this.data._type){
      case 'in_theaters':title="正在热映";break
      case 'coming_soon':title="即将上映";break
      case 'top250':title="豆瓣Top250";break
    }
    wx.setNavigationBarTitle({
      title: title,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 下拉刷新
    wx.request({
      url: app.gBaseUrl + this.data._type,
      data: {
        start: 0,
        count: 12
      },
      success:(res) => {
        this.setData({
          movies:res.data.subjects
        })
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 4.显示加载的图标
    wx.showNavigationBarLoading()
    // 触底加载更多
    wx.request({
      // 1.将type类型保存在全局变量中使用
      url: app.gBaseUrl + this.data._type,
      data: {
        // 2.每次从不同的起点加载相同数量的内容
        start: this.data.movies.length,
        count: 12
      },
      success: (res) => {
        console.log(res);
        this.setData({
          // 3.返回的结果是对现有数组的追加而不是替换
          movies: this.data.movies.concat(res.data.subjects)
        })
        // 5.加载成功，隐藏正在加载的图标
        wx.hideNavigationBarLoading()
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})