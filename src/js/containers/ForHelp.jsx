import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
} from 'react-router';
//import Using ES6 syntax
import WeUI from 'react-weui';
require("../util/jquery-weui.min.js");
//import styles
import 'weui';
var $ = require('jquery');
import 'weui/dist/style/weui.min.css';
require("../../font/iconfont.css");
require("../../css/common.css");
const {Button} = WeUI;

class ForHelp extends Component {
	constructor(props,context){
		super(props,context);
		this.context.router;
		
	}
	componentWillUnmount(){
		$(".weui-mask").css({display:'none'});
  		$(".weui-dialog").css({display:'none'});
	}
	componentDidMount(){
		const router = this.context.router;
		$.alert("在设备上打开'维宏云助手'，按F2进入'扫码求助'页面，扫描二维码", "", function() {
  			 router.push("qrcode");
  			 console.log("fgfdg")
  			 $(".weui-mask").css({display:'none'});
  			 $(".weui-dialog").css({display:'none'});
		},this);
		$(".weui-dialog__btn.primary").text("确定");
	}

    render() {
        return (
        	<div>
        		<div className="content">
	        		<div className="search-box">
					  	<div className="search-input">
					  		<input type="text" placeholder="关键字" className="search" />
						</div>
						<div className="search-btn">
							<input type="button" value="搜本页" className="btn"/>
							<input type="button" value="搜全站" className="btn"/>
						</div>
					</div>
					<div className="weui-cells">
					  <a className="weui-cell weui-cell_access" href="javascript:;">
					    <div className="weui-cell__bd">
					      <p>cell standard</p>
					    </div>
					    <div className="weui-cell__ft">
					    </div>
					  </a>
					</div>
				</div>
				<footer>
					 <div className="weui-tabbar">
				    	<Link to="/" className="weui-tabbar__item weui-bar__item--on">
				      		<div className="weui-tabbar__icon">
				        		<i className="iconfont icon-title" >&#xe656;</i>
				     		</div>
				      		<p className="weui-tabbar__label">帮助文档</p>
				    	</Link>
				    	<Link to="collect" className="weui-tabbar__item">
				      		<div className="weui-tabbar__icon">
				        		<i className="iconfont icon-collect">&#xe616;</i>
				      		</div>
				      		<p className="weui-tabbar__label">我的收藏</p>
				    	</Link>
					    <a href="javascript:;" className="weui-tabbar__item">
					      <div className="weui-tabbar__icon">
					        <i className="iconfont icon-help" style={{color:"orange"}}>&#xe60b;</i>
					      </div>
					      <p className="weui-tabbar__label">扫码求助</p>
					    </a>
					    <a href="javascript:;" className="weui-tabbar__item">
					      <div className="weui-tabbar__icon">
					        <i className="iconfont icon-r" >&#xe6fd;</i>
					      </div>
					      <p className="weui-tabbar__label">用户社区</p>
					    </a>
				  	</div>
				</footer>
        	</div>
        );
    }
};
ForHelp.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default ForHelp