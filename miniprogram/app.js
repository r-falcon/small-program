App({
  onLaunch(){
    console.log('小程序启动');
  },
  // 全局变量（应用程序关闭，全局变量失效）
  gIsPlayingMusic:false,
  gIsPlayingPostId:-1,
  gBaseUrl:"http://t.talelin.com/v2/movie/"
})