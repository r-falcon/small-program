// miniprogram/pages/movies/movies.js

// 获取app中设置的数据
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 正在热映
    inTheaters: [],
    // 即将上映
    comingSoon: [],
    // 豆瓣Top250
    top250: [],
    searchResult: false,
    searchData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 正在热映
    wx.request({
      url: app.gBaseUrl + 'in_theaters',
      data: {
        start: 0,
        count: 3
      },
      success: (res) => {
        this.setData({
          inTheaters: res.data.subjects
        })
      }
    })
    // 即将上映
    wx.request({
      url: app.gBaseUrl + 'coming_soon?start=0&count=3',
      success: (res) => {
        this.setData({
          comingSoon: res.data.subjects
        })
      }
    })
    // top250
    wx.request({
      url: app.gBaseUrl + 'top250?start=0&count=3',
      success: (res) => {
        this.setData({
          top250: res.data.subjects
        })
      }
    })
  },

  // 实现搜索功能
  onConfirm(event) {
    this.setData({
      searchResult: true
    })
    wx.request({
      url: app.gBaseUrl + 'search',
      data: {
        q: event.detail.value
      },
      success:(res) => {
        this.setData({
          searchData:res.data.subjects
        })
      }
    })
  },

  // 搜索取消
  onSearchCancel(){
    console.log(123);
    this.setData({
      searchResult:false
    })
  },

  // 跳转到更多电影页面
  onGoToMore(event) {
    console.log(event);
    const type = event.target.dataset.type
    wx.navigateTo({
      url: '/pages/more-movie/more-movie?type=' + type,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})