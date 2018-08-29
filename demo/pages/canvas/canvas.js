function getGoogleMap(x, y, z) {
  var maxX = Math.pow(2, z);
  var src = 'https://mt2.google.cn/vt/x=' + x + '&y=' + y + '&z=' + z;
  return src;
}

Page({
  data: {
    x: 0,
    y: 0,
    z: 1,
    hidden: true
  },
  start: function (e) {
    this.setData({
      hidden: false,
      x: e.touches[0].x,
      y: e.touches[0].y
    })
    wx.canvasGetImageData({
      canvasId: 'myCanvas',
      x: e.touches[0].x,
      y: e.touches[0].y,
      width: 1,
      height: 1,
      success(res) {
        console.log(res.data[0] + ',' + res.data[1] + ',' + res.data[2]) // 100 * 100 * 4
      }
    })        
  },
  loadImg: function(e){
    var z = this.data.z
    var ctx = wx.createCanvasContext('myCanvas')    
    for(var i = 0; i < 2; i++){
      for (var j = 0; j < 2; j++) {
        var width = wx.getSystemInfoSync().windowWidth;                  
        ctx.drawImage(getGoogleMap(i, j, z), i * width / 2, j * 200, width / 2, 200)        
      }
    } 
    ctx.draw()    
  },  
  zoomIn: function(e){    
    this.setData({
      z: this.data.z+1
    })
    var z = this.data.z
    var ctx = wx.createCanvasContext('myCanvas');
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 2; j++) {
        var width = wx.getSystemInfoSync().windowWidth;
        ctx.drawImage(getGoogleMap(i, j, z), i * width / 2, j * 200, width / 2, 200);
      }
    }
    ctx.draw();
  },
  zoomOut: function (e) {
    this.setData({
      z: this.data.z - 1
    })
    var z = this.data.z
    var ctx = wx.createCanvasContext('myCanvas');
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 2; j++) {
        var width = wx.getSystemInfoSync().windowWidth;
        ctx.drawImage(getGoogleMap(i, j, z), i * width / 2, j * 200, width / 2, 200);
      }
    }
    ctx.draw();
  },
  move: function (e) {
    this.setData({
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  end: function (e) {
    this.setData({
      hidden: false
    })
  }
})
