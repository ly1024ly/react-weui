import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  hashHistory
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
import * as fileOneAction from '../actions/fileone'

class FileOne extends Component {
	constructor(props,context){
		super(props,context)
		this.state = {
			val:'',
			style:false,
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
			console.log("bug")
			//url = url.split("view")[0]+"view/prop.html";
			console.log(url);
			//window.location.href=url;
		}
	}

	componentDidMount(){
		const params = JSON.parse(this.props.params.message);
		document.title = params.bookname;
		console.log(JSON.parse(this.props.params.message));
		this.props.fileOneAction.twoMenu(params);	
		var yy = window.frames['myframe'].document;
		var myframe = document.getElementById('myframe');
		var doc = myframe.contentWindow;
		myframe.onload = function(e){
			doc.addEventListener('click',function(e){
				let topicid = myframe.contentWindow.document.body.getAttribute("id");
				e.cancelBubble = true;
				e.preventDefault();
				let hrefs;
				let title;
				if(e.target.children[0]){
					hrefs = e.target.children[0].href;
					title = e.target.children[0].innerText;
				}else{
					hrefs = e.target.href;
					title = e.target.innerText;
				}
				document.title = title;
				console.log("kkkkkkkkkkkkkkkkkkk");
				console.log(topicid)
				if(hrefs!==""){
					let data = {
						href:hrefs,
						id:topicid,
						_id:params._id
					}
					let path = {
						pathname:'iframe',
						query:data
					}
					if(hrefs){
						hashHistory.push(path);
					}
				}
			},false)  
		} 	
	}
	collect(){
		console.log("go")
		this.context.router.push("collect");
	}
	qrcode(){
		this.context.router.push("qrcode")
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
	render(){
		const result = this.props.fileone.two;
		//搜索结果
		console.log(document.body.clientHeight)
		let menu;
		let all;
		let haulf;
		//分页
		let page = [];
		if(this.state.style){
			haulf={background:'orange',color:'#fff'};
			all={background:'#fff',color:'orange'};
		}else{
			haulf={background:'#fff',color:'orange'};
			all={background:'orange',color:'#fff'};
		}
		if(result&&result.result=="success"&&result.message.ProductName){
			menu = result.message.ProductName.map(function(item,index){
				let obj = {};
				obj.item = encodeURIComponent(item);
				obj.upIndex = this.props.params.message;
				obj.result = result.index;
				return (
			 		<li key={index}>
					  <Link className="weui-cell weui-cell_access" activeClassName="active" key={index} to={`/filetwo/${JSON.stringify(obj)}`}>
					    <div className="weui-cell__bd">
					      <p>{item}</p>
					    </div>
					    <div className="weui-cell__ft">
					    </div>
					  </Link>
					</li>
				)
			},this)
		}else if(result&&result.result=="fail"){
			menu =(<div>{result.message}</div>);
		}else if(result&&result.message.length==0){
			menu = (<div>没有匹配到相关信息！</div>);
		}
		return(
			<div>
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
					<div style={{height:document.body.clientHeight+"px"}} >
						<iframe id="myframe" name="myframe" style={{height:window.screen.height+"px",paddingBottom:"70px"}} src={result&&result.result=="success" ? result.message : ""}></iframe>
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
					      <p className="weui-tabbar__label" >扫码求助</p>
					    </Link>
					    <a href="javascript:;" className="weui-tabbar__item">
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

FileOne.contextTypes = {
	router:React.PropTypes.object
}

function mapStateToProps(state){
  return {
     fileone:state.fileone
  }
}
function mapDispatchToProps(dispatch) {
  return {
     fileOneAction:bindActionCreators(fileOneAction,dispatch)
  }
} 

export default connect(	
	mapStateToProps,
	mapDispatchToProps
)(FileOne);