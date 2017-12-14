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
var wx = require("weixin-js-sdk");
//import styles
import 'weui';
require('jquery');
import 'weui/dist/style/weui.min.css';
require("../../font/iconfont.css");
require("../../css/common.css");
require("../../css/fileSearch.css");
let o;

const {Button} = WeUI;
import * as fileSearchAction from '../actions/fileSearch';

class FileSearch extends Component {
	constructor(props,context){
		super(props,context);
		this.state = {
			val:'',
			style:false,
			page:1,
			back:{},
			flag:false,
			pageNum:20,
			pageStyle:[],
			pre:1,
			param:false,
			user:{},
			class:"click",
			display:"none",
			add:"添加新产品文档"
		}
		this.context.router;
		const { store } = this.context;
		this.checkValue = this.checkValue.bind(this);
		this.blurEvent = this.blurEvent.bind(this);
		this.fileSearch = this.fileSearch.bind(this);
		this.saveValue = this.saveValue.bind(this);
		this.collect = this.collect.bind(this);
		this.qrcode = this.qrcode.bind(this);
		this.propSearch = this.propSearch.bind(this);
		this.clearProp = this.clearProp.bind(this);
		this.unsubscribe = store.subscribe(() =>
      		this.forceUpdate(store.getState())
      		 //console.log(store.getState())
    	);

	}
	componentWillMount(){
		if(sessionStorage.user){
			this.setState({
				user:JSON.parse(sessionStorage.user)
			})
			let user = JSON.parse(sessionStorage.user);

			if(typeof(user.q)!=="undefined"){
				let q = decodeURI(user.q);
				this.setState({
					val:q
				})
				delete user.q;
				sessionStorage.user = JSON.stringify(user);
			}
		}else{
			let url = window.location.href;
			url = url.split("view")[0]+"view/prop.html";
			//window.location.href=url;
		}
	}
	forceUpdate(res){
	console.log("forceupdate$$$$$$$$$$$$$$$$$$$$$$")
		console.log(res)
	}
	clearProp(){
		$(".hint").css("display","none")
	}
	propSearch(res){
		console.log("search")
		$(".hint").css("display",'block');
		this.setState({
			val:res
		})
		$(".hint").css("display",'none');
		//this.props.fileSearchAction.search(this.state.val,1);
	}
	collect(){
		this.context.router.push("collect");
	}
	qrcode(){
		this.context.router.push("qrcode");
	}
	componentDidMount(){
		document.documentElement.scrollTop = 0;
		//分页点击事
		console.log(this.props.params)
		this.props.fileSearchAction.wechart();
		let page;
		console.log(this.props.location.query)
		if(this.props.location.query&&this.props.location.query.name){
			console.log("this.props.location.query")
			this.setState({
				param:true,
				val:this.props.location.query.name
			})
			this.props.fileSearchAction.current(1);
			this.props.fileSearchAction.search(this.props.location.query.name,1)
		}else if(this.props.fileSearch.save){
			console.log("this.props.fileSearch.save")
			this.setState({
				val:this.props.fileSearch.val
			})
		}else if(this.state.val){
			console.log("this.state.val")
			this.props.fileSearchAction.current(1);
			this.props.fileSearchAction.search(this.state.val,1)
		}else{
			let user = this.state.user;
			this.props.fileSearchAction.file("ly1024","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTgzMjY4ODI2NTgiLCJleHAiOjE1MTQ5Mzc2MDAsImlhdCI6MTUxMjM2OTk2N30.JcED4m2wV75crDrT-pp5O56tn9N4tC12GanCNABnzb8");
			
		}
		
	}
	componentDidUpdate(){
		$(window).scrollTop(0);
		
	}
	componentWillUpdate(){
		
	}
	
	checkValue(e){
		e.preventDefault();
		if(this.props.location.query&&this.props.location.query.name){
			this.props.location.query = {}
		}
		var select = e.target.innerHTML;
		if(select=="搜全站"){
			this.setState({
				style:false
			})
			if(this.state.val==""){
				$(".search").css('border','1px solid orange');
			}else{
				this.props.fileSearchAction.current(1);
				this.props.fileSearchAction.search(this.state.val,1);
			}
			
		}else{
			this.setState({
				style:true
			})
			if(this.state.val==""){
				$(".search").css('border','1px solid orange');
			}else{
				this.props.fileSearchAction.current(1);
				this.props.fileSearchAction.search(this.state.val,1,"doc")
			}
			
		}
		
	}
	componentWillReceiveProps(nextProps) {
	
  	}
  	
	saveValue(e){
		$(".hint").css("display",'block');
		this.props.fileSearchAction.promtMessage(e.target.value)
		this.setState({
			val:e.target.value
		})
		if(e.target.value==""){
			$(".hint").css("display",'none');
		}
	}
	blurEvent(){
		
		$(".search").css('border','1px solid #ccc');
	}
	fileSearch(){
		this.props.location.query = null;
		this.setState({
			param:false
		})
		this.props.fileSearchAction.file();
	}
	selectChange(e){
		if(e.target.value=="扫码添加"){
			var that = this;
	        wx.scanQRCode({
	            needResult : 1, 
	            scanType : [ "qrCode"], 
	            success : function(res) {
	            	var result = res.resultStr;
	            	alert("success")
	            }
			})
		}else{
			this.context.router.push("addfile");
		}
		this.setState({
			add:e.target.value
		})
	}
	iframePage(res){
		window.location.hash = "";
		let data = {};
		data.url = res.url;
		data.title = res.title;
		data.topicid = res.topicid;
		data.filename = res.filename;
		data.ContentType = res.ContentType;
		let path = {
			pathname:'iframe',
			query:data
		}
		this.props.fileSearchAction.saveValue(this.props.fileSearch,this.state.val);
		hashHistory.push(path);
	}
	componentWillReceiveProps(nextProps){
	}
	componentWillUnmount(){
		
	}
	delete(res){

	}
	pageChange(res){
		let page = this.state.page
		if(res=="pre"){
			if(this.state.page-1>0){
				page = page - 1;
				this.setState({
					page:page
				})
				this.props.fileSearchAction.search(this.state.val,page)
				$(".e").removeClass("noclick");
			}else{
				this.setState({
					page:1
				})
				$(".s").addClass("noclick");
			}
			
		}else if(res=="next"){
			if(this.state.page + 1<=this.props.fileSearch.page){
				page = page + 1;
				this.setState({
					page:page
				})
				$(".s").removeClass("noclick");
				this.props.fileSearchAction.search(this.state.val,page)
			}else{
				$(".e").addClass("noclick");
			}
			
		}else{
			this.setState({
				page:res
			})
			$(".s").removeClass("noclick");
			$(".e").removeClass("noclick");
			this.props.fileSearchAction.search(this.state.val,res)
		}
	}
    render() {
    	let list;
    	console.log("************************")
    	console.log(this.props.fileSearch)
    	let wechat = this.props.fileSearch.wechat;
    	if(wechat){
    		 wx.config({
                debug: false,
                appId: wechat.values.appId,
                timestamp: wechat.values.timestamp,
                nonceStr: wechat.values.nonceStr,
                signature: wechat.values.signature,
                jsApiList: [
                    'checkJsApi',
                    'scanQRCode'
                ],

            });
    	}
    	wx.ready(function() {
            wx.checkJsApi({
                jsApiList : ['scanQRCode'],
                success : function(res) {

                }
            });
        })

    	let display = this.props.fileSearch.chart&&this.props.fileSearch.chart.message.Maxpage>0||this.props.fileSearch.save ? "block" : "none";
    	//一级目录的结果
    	let	data = this.props.fileSearch.data;
    	console.log(data)
 		//查询的结果
    	let chart;
    	if(this.props.fileSearch.chart){
    		chart = this.props.fileSearch.chart;
    	}else if(this.props.fileSearch.save&&this.props.fileSearch.save.chart){
    		chart = this.props.fileSearch.save.chart;
    	}
    	//按钮样式
		let all;
		let haulf;
		let page = [];
		if(this.state.style){
			haulf={background:'orange',color:'#fff'};
			all={background:'#fff',color:'orange'};
		}else{
			haulf={background:'#fff',color:'orange'};
			all={background:'orange',color:'#fff'};
		}
		let max;
		if(chart&&chart.result=="success"){
			max = chart.message.Maxpage;
		}

		//一级目录
		let menu;
		if(data&&data.result=="success"&&data.message.length>0){		
			menu = data.message.map(function(item,index){	
			 	return (
			 		<li key={index}>
			 			<div className="cbox" key={index} >
						    <Link className="weui-cell weui-cell_access" activeClassName="active" key={index} to={`/fileone/${item.firtcontent}`}>
						        <div className="weui-cell__bd">
						    		<p>{item.bookname}</p>
						        </div>
						    	<div className="weui-cell__ft">
						    	</div>
						    </Link>
						    <div onClick={this.delete.bind(this,item)} className="delete">
							    删除
							</div>
						</div>
					</li>
			 	)
			},this)
			menu.push(
				<li key="99">
					 <a className="weui-cell weui-cell_access" style={{width:'88%',position:'relative'}}> 
						<select value={this.state.add} onChange={this.selectChange.bind(this)}>
							<option style={{display:"none"}}>添加新产品文档</option>
							<option value="搜索添加">搜索添加</option>
							<option value="扫码添加">扫码添加</option>
						</select>
						<i className="iconfont icon-add">&#xe601;</i>
					</a>
				</li>
			)
		}else if(data&&data.result=="fail"){
			menu =(<div>{data.message}</div>);
		}else if(data&&data.message&&data.message.length==0){
			menu = (<div>没有匹配到相关信息！</div>);
		}
		//搜索本页
		let child;
		if(chart&&chart.result=="success"&&chart.message&&chart.message.objArray&&chart.message.objArray.length>0){
			child = chart.message.objArray.map(function(item,index){
				
				return (
					<div className="weui-panel weui-panel_access" key={index}>
						<div className="weui-panel__bd">
							<a className="weui-media-box weui-media-box_appmsg" onClick={this.iframePage.bind(this,item)}>
								<div className="weui-media-box__bd">
        							<h4 className="weui-media-box__title">{item.title}</h4>
        							<div className="weui-media-box__desc">
        								<ul>
        									{item.body.substr(0,40)+'...'}
        								</ul>
        							</div>
        							<p className="time">{item.time.split("T")[0]}</p>
     							</div>
							</a>
						</div>
					</div>
				)
			},this)
		}else if(chart&&chart.result=="fail"){
			child =(<div>{chart.message}</div>);
		}else if(chart&&chart.message&&chart.message.length==0){
			child =(<div>没有匹配到相关信息！</div>);
		}
		if(child){
			list = child ? child : "您可以浏览文档与收藏、手工输入关键字或扫描二维码查询，或向用户社区发布主题参与讨论。"
		}else{
			list = menu ? menu : "";
		}
		let popm;
		if(this.props.fileSearch.message){
	 		popm = this.props.fileSearch.message.map(function(item,index){
	 			if(index<5){
		 			return (
		 				<li onClick={this.propSearch.bind(this,item)} key={index}>{item}</li>
		 			)
	 			}	
	 		
	 		},this)
	 	}
        return (
        	<div>
        		<div className="content searchs">
	        		<div className="search-box" onBlur={this.blurEvent}>
					  	<div className="search-input">
					  		<input type="text"
					  		 placeholder="关键字" 
					  		 value={this.state.val}
					  		 className="search"  
					  		 onChange={this.saveValue}
					  		 
					  		 />
						</div>
						<div className="search-btn">
							<label className="btn" style={haulf}
							onClick={this.checkValue} >搜文档</label>
							<label className="btn" style={all}
							onClick={this.checkValue} >搜全站</label>
							
						</div>
					</div>
					<div className="hint" id="hint">
			  		 	<ul >
			  		 		{popm}
			  		 	</ul>
					</div>
					<div className="weui-cells" onFocus={this.clearProp}>
						<ul id="itemContainer">
							{list}
						</ul>
					</div>
					<div className="holder" style={{display:display}}>
					   <section>
							<nav role="navigation">
								<ul className="cd-pagination">
									<li className="s" onClick={this.pageChange.bind(this,1)}>首页</li>
									<li className="button1" onClick={this.pageChange.bind(this,"pre")}>上页</li>
									
									<li className="button2" onClick={this.pageChange.bind(this,"next")}>下页</li>
									<li className="e" onClick={this.pageChange.bind(this,max)}>尾页</li>
								</ul>
							</nav> 
						</section>
					</div>
				</div>
				<footer>
					<div className="weui-tabbar">
				    	<Link to="" className="weui-tabbar__item weui-bar__item--on" onClick={this.fileSearch}>
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
					        <i className="iconfont icon-help" >&#xe60b;</i>
					      </div>
					      <p className="weui-tabbar__label">扫码求助</p>
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
        );
    }
}
FileSearch.contextTypes = {
	router: React.PropTypes.object,
	store:React.PropTypes.object
}

function mapStateToProps(state, ownProps){
  return {
    fileSearch:state.fileSearch
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fileSearchAction: bindActionCreators(fileSearchAction, dispatch)
  }
} 

export default connect(	
	mapStateToProps,
	mapDispatchToProps
)(FileSearch);