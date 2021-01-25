// miniprogram/pages/post-detail/post-detail.js
// 导入数据
import {
  postList
} from '../../data/data.js'
// 导入全局变量
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    _pid: null,
    collected: false,
    _postsCollected: {},
    isPlaying:app.gIsPlayingMusic
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.data._pid = options.pid
    const postData = postList[options.pid]
    const postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      this.data._postsCollected = postsCollected
    }
    let collected = postsCollected[this.data._pid]
    if (collected === undefined) {
      collected = false
    }
    // console.log(postData);
    this.setData({
      postData,
      collected,
      isPlaying:this.currentMusicIsPlaying()
    })

    const mgr = wx.getBackgroundAudioManager()
    this.data._mgr = mgr
    mgr.onPlay(() => {
      mgr.onPlay(this.onMusicStart)
      mgr.onPause(this.onMusicStop)
    })
  },

  // 收藏点击函数
  onCollect() {
    const postsCollected = this.data._postsCollected
    wx.getStorageSync('key')
    postsCollected[this.data._pid] = !this.data.collected
    this.setData({
      collected: !this.data.collected
    })
    console.log(postsCollected);
    wx.setStorageSync('posts_collected', postsCollected)
    // wx.showToast({
    //   title: this.data.collected ? '收藏成功' : '取消收藏'
    // })
    wx.showModal({
      title: this.data.collected ? '确定收藏？' : '取消收藏？',
      success: () => {
        wx.showToast({
          title: this.data.collected ? '收藏成功' : '取消收藏'
        })
      }
    })
    // // 异步promise实现模态框功能
    // const result = await wx.showModal({
    //   title: '是否收藏'
    // })
    // if(result.confirm){
    //   // 上面操作内容
    // }
  },

  // 分享点击函数
  onShare() {
    wx.showActionSheet({
      itemList: ['分享到QQ', '分享到微信', '分享到朋友圈', '更多'],
      success(res) {
        // 具体点击哪个
        console.log(res.tapIndex);
      }
    })
  },

  // 音乐播放点击函数
  onMusicStart(){
    const mgr = this.data._mgr
    const music = postList[this.data._pid].music
    mgr.src = music.url
    mgr.title = music.title
    mgr.coverImgUrl = music.coverImg
    app.gIsPlayingMusic = true
    app.gIsPlayingPostId = this.data._pid
    this.setData({
      isPlaying:true
    })
  },

  // 暂停播放点击按钮
  onMusicStop(){
    const mgr = this.data._mgr
    // 暂停音乐
    mgr.pause()
    // 停止音乐
    // mgr.stop()
    app.gIsPlayingMusic = false
    app.gIsPlayingPostId = -1
    this.setData({
      isPlaying:false
    })
  },
  
  currentMusicIsPlaying(){
    if(app.gIsPlayingMusic && app.gIsPlayingPostId === this.data._pid){
      return true
    }
    return false
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