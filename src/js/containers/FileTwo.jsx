import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  hashHistory,
  PropTypes 
} from 'react-router';
import { createStore,bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import Using ES6 syntax
import WeUI from 'react-weui';
require("../util/jquery-weui.min.js");
//import styles
import 'weui';
require('jquery');
import 'weui/dist/style/weui.min.css';
require("../../font/iconfont.css");
require("../../css/common.css");
import * as fileTwoAction from '../actions/filetwo'

class FileTwo extends Component {
	constructor(props,context){
		super(props,context)
		this.state = {
			val:'',
			style:false,
			page:1,
			hash:'',
			user:{}
		}
		this.context.router;
		this.saveValue = this.saveValue.bind(this);
		this.checkValue = this.checkValue.bind(this);
		this.collect = this.collect.bind(this);
		this.qrcode = this.qrcode.bind(this);
	}
	componentWillMount(){
		if(sessionStorage.user){
			this.setState({
				user:JSON.parse(sessionStorage.user)
			})
		}else{
			let url = window.location.href;
			url = url.split("view")[0]+"view/prop.html";
			console.log(url);
			window.location.href=url;
		}
	}
	checkValue(e){
		e.preventDefault();
		var select = e.target.innerHTML;
		if(select=="搜全站"){
			this.setState({
				style:false
			})
			let data = {name:this.state.val};
			let path = {
				pathname:'/',
				query:data
			}
			hashHistory.push(path);
		}else{
			this.setState({
				style:true
			})

		}
		
	}
	saveValue(e){
		
		this.setState({
			val:e.target.value
		})
	}
	componentWillUpdate(){
		
	}
	componentDidMount(){
		const params = this.props.params;
		const twoP = JSON.parse(params.message);
		let pa =  decodeURIComponent(twoP.item);
		if(twoP&&twoP.item == "所有"){
			if(twoP.result===0){
				pa = twoP.item;
			}else if(twoP.result===1){
				pa = "驱动器错误码"
			}
		}
		//搜索三级目录
		this.props.fileTwoAction.threeMenu(pa,twoP.upIndex);
		console.log(this.state.val)

	}
	collect(){
		console.log("go")
		this.context.router.push("collect");
	}
	qrcode(){
		this.context.router.push("qrcode")
	}
	iframePage(para){
		let data = para;
		let path = {
			pathname:'iframe',
			query:data
		}
		hashHistory.push(path);
	}
	render(){
		const result = this.props.filetwo.three;
		//搜索结果
		let menu;
		let all;
		let haulf;
		//分页
		let tpage = [];
		if(this.state.style){
			haulf={background:'orange',color:'#fff'};
			all={background:'#fff',color:'orange'};
		}else{
			haulf={background:'#fff',color:'orange'};
			all={background:'orange',color:'#fff'};
		}
		if(result&&result.result=="success"&&result.message.title){
			menu = result.message.title.map(function(item,index){
				return (
			 		<li key={index}>
					  <a className="weui-cell weui-cell_access" key={index} onClick={this.iframePage.bind(this,item)}>
					    <div className="weui-cell__bd">
					      <p>{item.title}</p>
					    </div>
					    <div className="weui-cell__ft">
					    </div>
					  </a>
					</li>
				)
			},this)
		}else if(result&&result.result=="fail"){
			menu =(<div>{result.message}</div>);
		}else if(result&&result.message.length==0){
			menu = (<div>没有匹配到相关信息！</div>);
		}
		return(
			<div className="two">
				<div className="content">
					<div className="search-box">
					  	<div className="search-input">
					  		<input type="text"
					  		 placeholder="关键字" 
					  		 className="search"  onChange={this.saveValue}/>
						</div>
						<div className="search-btn">
							<label className="btn" style={haulf}
							onClick={this.checkValue} >搜文档</label>
							<label className="btn" style={all}
							onClick={this.checkValue} >搜全站</label>
						</div>
					</div>
					<div className="weui-cells">
						<ul id="itemContainer">
							{menu}
						</ul>
					</div>
				</div>
				<footer>
					<div className="weui-tabbar">
				    	<Link to="/" className="weui-tabbar__item weui-bar__item--on">
				      		<div className="weui-tabbar__icon">
				        		<i className="iconfont icon-title" style={{color:"orange"}} >&#xe656;</i>
				     		</div>
				      		<p className="weui-tabbar__label">帮助文档</p>
				    	</Link>
				    	<Link to="collect" className="weui-tabbar__item" onClick={this.collect}>
				      		<div className="weui-tabbar__icon">
				        		<i className="iconfont icon-collect" >&#xe616;</i>
				      		</div>
				      		<p className="weui-tabbar__label">我的收藏</p>
				    	</Link>
					    <Link className="weui-tabbar__item" onClick={this.qrcode}>
					      <div className="weui-tabbar__icon">
					        <i className="iconfont icon-help">&#xe60b;</i>
					      </div>
					      <p className="weui-tabbar__label">扫码求助</p>
					    </Link>
					    <a href="javascript:;" className="weui-tabbar__item" >
					      <div className="weui-tabbar__icon">
					        <i className="iconfont icon-r" style={{color:"#ddd"}}>&#xe6fd;</i>
					      </div>
					      <p className="weui-tabbar__label">用户社区</p>
					    </a>
				  	</div>
				</footer>
			</div>
		)
	}
}

FileTwo.contextTypes = {
	router:React.PropTypes.object
}
function mapStateToProps(state){
  return {
     filetwo:state.filetwo
  }
}
function mapDispatchToProps(dispatch) {
  return {
     fileTwoAction:bindActionCreators(fileTwoAction,dispatch)
  }
} 

export default connect(	
	mapStateToProps,
	mapDispatchToProps
)(FileTwo);