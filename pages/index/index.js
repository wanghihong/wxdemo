//index.js
//获取应用实例
const app = getApp()
const BaseURL = "http://api.budejie.com/api/api_open.php"
//1->全部;41->视频;10->图片;29->段子;31->声音;
var dataType = ["1","41","10","29","31"];
Page({
	data:{
		dataList:[],
		allDataList:[],
	    videoDataList:[],
	    pictureDataList:[],
	    textDataList:[],
	    voiceDataList:[],
		swiperHeight:0,
		tabcurrent:0,
		tabItems:["全部","视频","图片","段子","声音"],

	},
	 onLoad(){
	 	this.getData();
	 },
	 onReady:function(){
	    var that = this;
	     wx.getSystemInfo({
	       success: function(res) {
	         that.setData({
	            swiperHeight: (res.windowHeight-37)
	         });
	       }
	     })
	  },
	   switchTap(e){

	  	this.setData({
	  		tabcurrent : e.currentTarget.dataset.idx
	  		
	  	});
	  	if (this.needNewData()) {
	      	this.getData();
	    }
	  	
	  },
	  bindChange(e){
	  	var that = this;
	    that.setData({
	      tabcurrent:e.detail.current
	    });

	    if (this.needNewData()) {
	      	this.getData();
	    }
	    
	  },

	  setNewData(res,target){
       switch(dataType[this.data.tabcurrent]) {
      //全部
       case '1':
        target.setData({
			allDataList: res.data.list,
		})
       break;
      //视频
        case '41':
        target.setData({
			videoDataList: res.data.list,
		})
        break;
      //图片
      	case '10':
        target.setData({
			pictureDataList: res.data.list,
		})
        break;
      //段子
        case '29':
        target.setData({
			textDataList: res.data.list,
		})
        break;
      //声音
      	case '31':
        target.setData({
			voiceDataList: res.data.list,
		})
        break;
      default:
        break;
    }
  },
//滚动后需不要加载数据
  needNewData:function(){

    switch(dataType[this.data.tabcurrent]) {
      //全部
      case '1':
        return this.data.allDataList.length > 0 ? false : true;
        
      //视频
      case '41':
        return this.data.videoDataList.length > 0 ? false : true;
        
      //图片
      case '10':
        return this.data.pictureDataList.length > 0 ? false : true;
        
      //段子
      case '29':
        return this.data.textDataList.length > 0 ? false : true;
        
      //声音
      case '31':
        return this.data.voiceDataList.length > 0 ? false : true;
        
      default:
        break;
    }

    return false;
  },
	getData(){
		var that = this;
		//?a=list&c=data&type=1
		
		wx.request({
			url: `${BaseURL}?a=list&c=data&type=${dataType[this.data.tabcurrent]}`, 
			header: {
			    'content-type': 'application/json' // 默认值
			},
			success: function(res) {
			    that.setNewData(res,that);

		  	}

	    })

	}
  
})
