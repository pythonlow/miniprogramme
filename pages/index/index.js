// index.js
// 获取应用实例
const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: 'tabs',
      path: 'miniprogramme/node_modules/@miniprogram-component-plus/tabs/miniprogram_dist/index'
    }
  },
  data: {
    books: [],
    tabs: [],
    activeTab: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    const titles = ['推荐', '排行', '其他']
    const tabs = titles.map(item => ({ title: item }))
    this.setData({ tabs })

  },
  onTabClick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
    if (index == '1') {
      let that = this
      wx.request({
        url: 'http://localhost:3000/allBook',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          for (let i = 0; i < res.data.length; i++) {
            var newarray = {
              bId: res.data[i].bId,
              btitle: res.data[i].bTitle,
              bcover: '../../../images/books_cover/' + res.data[i].bCover,
              author: res.data[i].author,
              press: res.data[i].press,
              publishtime: res.data[i].publishtime,
              price: res.data[i].price,
              rating: res.data[i].rating
            }
            that.data.books = that.data.books.concat(newarray)
          }
          that.setData({
            books: that.data.books
          })
          // console.log(that.data.books)
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
  },
  handleClick(e) {
    // wx.navigateTo({
    //   url: './webview',
    // })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
