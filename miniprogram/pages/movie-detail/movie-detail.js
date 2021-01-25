// miniprogram/pages/movie-detail/movie-detail.js
const app = getApp()
import {convertToCastString,convertToCastInfos} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 电影详情数据
    movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const mid = options.mid
    wx.request({
      url: app.gBaseUrl + 'subject/' + mid,
      success:(res) => {
        console.log(res.data);
        this.processMovieData(res.data)
        // this.setData({
        //   movie:res.data
        // })
      }
    })
  },

  // 图片预览的效果
  onViewPost(event){
    wx.previewImage({
      urls: [this.data.movie.images.large],
    })
  },

  // 处理电影详情获取的数据
  processMovieData(movie){
    const data = {}
    data.directors = convertToCastString(movie.directors)
    data.casts = convertToCastString(movie.casts)
    data.image = movie.images.large
    data.title = movie.title
    data.subtitle = movie.countries[0] + '·' + movie.year
    data.wishCount = movie.wish_count
    data.commentsCount = movie.comments_count
    data.rating = movie.rating.stars/10
    data.average = movie.rating.average
    data.summary = movie.summary
    data.castsInfo = convertToCastInfos(movie.casts)
   data.genres = movie.genres.join('、')
    this.setData({
      movie:data
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