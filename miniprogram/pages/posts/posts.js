// miniprogram/pages/posts/posts.js

// 第一种数据导入方式
// var postCont = require('../../data/data')
// console.log(postCont);
// 第二种数据导入方式(推荐)
import {postList} from '../../data/data'
// console.log(postList);
 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   * 生命周期函数 也是 钩子函数 hook function
   */
  onLoad(options) {
    // setData   在setData中定义的数据会自动加载到data当中
    // this.setData({
    //   posts:postList
    // })  
    
    // 更简洁的es6语法
    this.setData({
      postList
    })
  },

  // 点击跳转详情页
  onGoToDetail(event){
    console.log(event);
    const pid = event.currentTarget.dataset.postId
    wx.navigateTo({
      url: '/pages/post-detail/post-detail?pid=' + pid,
    })
  },
  // 轮播图获取当前播放下标
  goToDetail(e){
    this.data.currentIndex = e.detail.current 
  },
  // 轮播图跳转详情页
  toPage(){
    wx.navigateTo({
      url: '/pages/post-detail/post-detail?pid=' + this.data.currentIndex,
    })
  },

  // 自定义组件的自定义事件
  onGoToDetail(event){
    // swiper的跳转和下面详情的跳转用的同一个函数，如果pid的获取方式不同，可以写成下面的表达式
    // const pid = event.currentTarget.dataset.postId | event.detail.pid
    const pid = event.detail.pid
    wx.navigateTo({
      url: '/pages/post-detail/post-detail?pid=' + pid,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.data);
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