const app = getApp()
var api = 'http://api.budejie.com/api/api_open.php?a=square&c=topic'
Page({
  data:{
  	dataList:[],
  },
  onLoad(){
 	this.getData();
 	console.log(this.data.dataList)
  },
  getData(){
		var that = this;
		wx.request({
			url: api,
			header: {
			    'content-type': 'application/json' // 默认值
			},
			success: function(res) {
			    that.setData({
			    	dataList:res.data.square_list
			    })
		  	}

	    })

	}
})
