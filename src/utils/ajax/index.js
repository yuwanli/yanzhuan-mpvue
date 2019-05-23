
import type from 'type-of'
import {getWxData} from '../login'

const CUT_START = -6

function appendQuery (url, query) {
  if (query === '') return url
  return (url + '&' + query).replace(/[&?]{1,2}/, '?')
}

var escape = encodeURIComponent

function serialize (params, obj, traditional, scope) {
  var array = type(obj) === 'array'
  for (var key in obj) {
    var value = obj[key]

    if (scope) key = traditional ? scope : scope + '[' + (array ? '' : key) + ']'
    // handle data in serializeArray() format
    if (!scope && array) params.add(value.name, value.value)
    // recurse into nested objects
    else if (traditional ? (type(value) === 'array') : (type(value) === 'object')) { serialize(params, value, traditional, key) } else params.add(key, value)
  }
}

function serializeData (options) {
  options.data = options.data || {}
  if (options.sono) {
    options.url = `https://admin.sono.mobi/${options.sono}`
  }
  if (type(options.data) === 'string' && type(options.data_bk) === 'object') {
    options.data = options.data_bk
  }
  if (type(options.data) === 'object') {
    options.data_bk = {
      ...options.data
    }
    options.data.token = wx.getStorageSync('sono_token')
    options.data = param(options.data)
  }
  if (options.query) {
    options.url = appendQuery(options.url, param(options.query))
  }
}

function param (obj, traditional) {
  var params = []
  params.add = function (k, v) {
    this.push(escape(k) + '=' + escape(v))
  }
  serialize(params, obj, traditional)
  return params.join('&').replace('%20', '+')
}

export const ajax = (options) => {
  serializeData(options)
  if (!options.hideLoading) {
    wx.showLoading({
      title: '加载中'
    })
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: options.method,
      data: options.data,
      success: function (resp) {
        wx.hideLoading()
        resp = resp.data
        let errcode = parseInt(resp.errcode)
        if (errcode === 0) {
          resolve(resp.data)
        } else if (errcode === -1) {
          if (options.noLogin) { // 无需登陆的接口
            return
          }
          let mid = Math.floor(Math.random() * 1000) + (new Date().getTime()
            .toString()
            .slice(CUT_START))
          !wx.callbacks && (wx.callbacks = {})
          wx.callbacks[mid] = () => {
            resolve(ajax(options))
          }
          getWxData(mid)
        } else {
          wx.showToast({
            title: resp.errmsg || '未知错误',
            icon: 'none',
            duration: 2000
          })
          reject(resp)
        }
      }
    })
  })
}
