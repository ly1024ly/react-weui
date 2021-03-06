import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  hashHistory
} from 'react-router';
//import Using ES6 syntax
import { createStore,bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WeUI from 'react-weui';
require("../util/jquery-weui.min.js");
//import styles
import 'weui';
import 'weui/dist/style/weui.min.css';
require("../../font/iconfont.css");
require("../../css/common.css");
require("../../css/collect.css");
import * as collectAction from '../actions/collect'

class Collect extends Component {
	constructor(props,context){
		super(props,context);
		this.context.router;
		this.store = props.store || context.store
		this.state={
			style:false,
			del:0,
			val:'',
			page:1,
			user:{},
			back:0
		}
		this.blurEvent = this.blurEvent.bind(this);
		this.saveVal = this.saveVal.bind(this);
		this.checkValue = this.checkValue.bind(this);
		this.reflesh = this.reflesh.bind(this);
		this.qrcode = this.qrcode.bind(this);
	}
	componentDidMount(){
		document.title = '我的收藏';
		$(".hint").css("display",'none');
		if(JSON.stringify(this.props.collect.chart)=="{}"){
			this.props.collectAction.getCollect("rxt123");
			//this.props.collectAction.getCollect(this.state.user.username);
		}
		if(JSON.stringify(this.props.collect.val)!=="{}"){
			this.setState({
				val:this.props.collect.val
			})
		}
		
	}
	
	//点击菜单刷新页面
	reflesh(){
		$(".hint").css("display",'none');
		//this.props.collectAction.getCollect(this.state.user.username);
		this.props.collectAction.getCollect("rxt123");
		if(this.state.val===""){
			$(".search").val("")
		}
		
	}
	componentWillMount(){
		if(sessionStorage.user){
			this.setState({
				user:JSON.parse(sessionStorage.user)
			})
		}else{
			let url = window.location.href;
			url = url.split("view")[0]+"view/prop.html";
			//window.location.href=url;
		}
		
	}
	checkValue(e){
		e.preventDefault();
		let q;
		$(".hint").css("display",'none');
		$(".cd-pagination li").removeClass("noclick");
		var select = e.target.innerHTML;
		if(select=="搜全站"){
			this.setState({
				style:false			
			});
			this.props.collectAction.current(1);
			if(this.state.val){
				q = this.state.val;
				this.props.collectAction.inputVal(q);
				this.props.collectAction.cpage(1);
				this.props.collectAction.searchAll(q,1);
			}else if(this.state.val==""){
				$(".search").css('border','1px solid orange');
			}
		}else{
			this.setState({
				style:true
			})
			var p;
			if(this.state.val===""){
				$(".search").css('border','1px solid orange');
			}else{
				
				//this.props.collectAction.search(this.state.user.username,this.state.val);
				this.props.collectAction.cpage(1);
				this.props.collectAction.inputVal(this.state.val);
				this.props.collectAction.search("rxt123",this.state.val);
			}			
		}	
	}
	delete(res){
		console.log("res="+res)
		let obj = {};
		//obj.username = this.state.user.username;
		obj.username = "rxt123";
		obj.topicid = res.result.topicid;
		obj.title = res.result.title;
		obj.topicURL = res.html;
		obj.ContentType = res.result.ContentType;
		obj.status = false;
		this.props.collectAction.deCollect(obj,this.props.collect.collect);
	}
	saveVal(e){
		this.setState({
			val:e.target.value
		});
		$(".hint").css("display",'block');
		this.props.collectAction.promtMessage(e.target.value)
	}
	remove(i){
		$(".weui-cells").find(".cbox").eq(i).remove();
	}
	iframePage(para){
		let data;
		let collect = this.props.collect;
		this.props.collectAction.inputVal(this.state.val);
		if(!this.state.val==""){
			this.props.collectAction.inputVal(this.state.val);
		}
		if(JSON.stringify(collect.collect)!=="{}"){
			this.props.collectAction.saveValue(collect.collect,"collect")
		}else if(JSON.stringify(collect.chart)!=="{}"){
			this.props.collectAction.saveValue(collect.chart,"chart")
		}
		if(para.result){
			data ={
				url:para.html,
				topicid:para.result.topicid,
				title:para.result.title,
				filename:para.result.filename,
				ContentType:para.result.ContentType
			}
		}else{
			data = {
				url:para.url,
				topicid:para.topicid,
				title:para.title,
				filename:para.filename, 
				ContentType:para.ContentType
			};
		}
		let path = {
			pathname:'iframe',
			query:data
		}
		hashHistory.push(path);
	}
	componentDidUpdate(){
		//flag确定是否删除的标志在action里添加
		if(this.props.collect.collect.flag){
			window.location.reload();
		}
	}
	blurEvent(){
		$(".search").css('border','1px solid #ccc');		
	}
	qrcode(){
		this.context.router.push("qrcode")
	}
	touchEvent(index,e){
		console.log("gfdgfd");
		console.log(index)
		console.log($(".weui-cells .x"))
		this.setState({
			back:index
		})
	}
	propSearch(e){
		console.log("search"+this.state.val)
		$(".hint").css("display",'block');
		this.setState({
			val:e
		})
		$(".hint").css("display",'none');
	}
	pageChange(res){
		let max = this.props.collect.chart.message.Maxpage;
		let val = this.state.val||this.props.collect.val
		let page;
		$(".cd-pagination li").removeClass("noclick");
		if(this.props.collect.page){
			page = this.props.collect.page;
			this.setState({
				page:this.props.collect.page
			})
		}else{
			page = this.state.page;
		}
		if(res=="pre"){
			if(this.state.page-1>0){
				page = page - 1;
				this.setState({
					page:page
				})
				this.props.collectAction.cpage(page)
				$(".e").removeClass("noclick");
				this.props.collectAction.searchAll(val,page)
			}else{
				this.setState({
					page:1
				})
				this.props.collectAction.cpage(1);
				$(".button1").addClass("noclick");
				$(".s").addClass("noclick");
			}
			
		}else if(res=="next"){
			if(page + 1<=max){
				page = page + 1;
				this.setState({
					page:page
				})
				this.props.collectAction.cpage(page);
				$(".s").removeClass("noclick");
				$(".cd-pagination li").removeClass("noclick");
				this.props.collectAction.searchAll(val,page)
			}else{
				$(".e").addClass("noclick");
			}
			
		}else{
			this.setState({
				page:res
			})
			if(res==1){
				$(".s").addClass("noclick");
				$(".button1").addClass("noclick");
			}else{
				$(".e").addClass("noclick");
				$(".button2").addClass("noclick");
			}
			this.props.collectAction.cpage(res)
			this.props.collectAction.searchAll(val,res)
		}
	}	
    render() {
    	const props = this.props;
    	const { store } = this.context;
    	const state = store.getState();
    	let value;
    	if(this.state.val){
    		value = this.state.val;
    	}else if(JSON.stringify(this.props.collect.val)!=="{}"){
    		value = this.props.collect.val;
    	}
    	let all;
			let haulf;
			let page = [];
			let max;
			if(this.state.style){
				haulf={background:'orange',color:'#fff'};
				all={background:'#fff',color:'orange'};
			}else{
				haulf={background:'#fff',color:'orange'};
				all={background:'orange',color:'#fff'};
			} 
    	let result;
    	if(JSON.stringify(this.props.collect.collect)!=="{}"){
    		result = this.props.collect.collect;
    	}
    	let chart;
    	if(JSON.stringify(this.props.collect.chart)!=="{}"){
    		chart = this.props.collect.chart;
    	}
    	let touch = this.props.collect.touch;
    	let list;
    	let menu;
    	//目录
    	if(result&&result.result==="success"){
    		menu = result.message.map(function(item,index){
    			let display = this.props.collect.title&&this.props.collect.title.del == item.result.topicid ? "none" : "block"
    			let width = this.state.back===index ? "" : "back";
    			let show = this.state.back===index ? "block" : "none";
    			console.log("item="+item)
    			return (
    			<div className="x" key={index} onTouchMove={this.touchEvent.bind(this,index)} >
    				<div className={"cbox "+width} key={index} style={{display:display}} >
	    				<a className={"weui-cell weui-cell_access "+width} onClick={this.iframePage.bind(this,item)} key={index}>
						    <div className="weui-cell__bd">
						      <p>{item.result.title}</p>
						      <div className="collect_title">{item.result.ContentType}</div>
						    </div>
						    <div className="weui-cell__ft">
						    </div>
						</a>
						<div onClick={this.delete.bind(this,item)} className="delete" style={{display:show}}>
						    删除
						</div>
						<div className="clear"></div>
					</div>
				</div>
    			)
    		},this)
    	}else{
    		menu = (
    			<div>收藏为空或点击“我的收藏”进行查询</div>
    		)
    	}
   		//搜索本页
		let child;

		if(chart&&chart.result=="success"&&chart.message||chart&&chart.chart&&chart.chart.result=="success"){
			$(window).scrollTop(0);	
			if(chart&&chart.result=="success"&&chart.message.objArray){
				max = chart.message.Maxpage;
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
			}else if(chart&&chart.result=="success"&&chart.message instanceof Array&&chart.message.length>0){
				child = chart.message.map(function(item,index){
					return (
						<div className="weui-panel weui-panel_access" key={index}>
							<div className="weui-panel__bd">
								<a className="weui-media-box weui-media-box_appmsg" onClick={this.iframePage.bind(this,item)}>
									<div className="weui-media-box__bd">
	        							<h4 className="weui-media-box__title">{item.result.title}</h4>
	        							<div className="weui-media-box__desc">
	        								<ul>
	        									
	        								</ul>
	        							</div>
	        							<p className="time"></p>
	     							</div>
								</a>
							</div>
						</div>
					)
				},this)
			}else if(chart&&chart.message&&chart.message.length===0){
				child =(<div>没有匹配到相关信息！</div>);
			}
		}else if(chart&&chart.result=="fail"){
			child =(<div>{chart.message}</div>);
		}
		if(child){
			list = child ? child : "您可以浏览文档与收藏、手工输入关键字或扫描二维码查询，或向用户社区发布主题参与讨论。"
		}else{
			list = menu ? menu : "";
		}
		let display = max ? "block" : "none";
		let popm;
		console.log(this.props.collect)
		if(this.props.collect.message){
	 		popm = this.props.collect.message.map(function(item,index){
	 			if(index<5){
		 			return (
		 				<li onClick={this.propSearch.bind(this,item)} key={index}>{item}</li>
		 			)
	 			}	
	 		
	 		},this)
	 	}	
        return (
        	<div>
        		<div className="content collect">
	        		<div className="search-box" >
						  	<div className="search-input"> 
						  		<input type="text" placeholder="关键字" value={this.state.val} className="search" onChange={this.saveVal} onBlur={this.blurEvent}/>
								</div>
								<div className="search-btn">
									<label type="button" className="btn" style={haulf}
									onClick={this.checkValue}>搜本页</label>
									<label className="btn" style={all}
									onClick={this.checkValue} >搜全站</label>
								</div>
								<div className="hint" id="hint" >
					  		 	<ul >
					  		 		{popm}
					  		 	</ul>
								</div>
							</div>
							<div className="weui-cells">
							 {list}
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
				    	<Link to="" className="weui-tabbar__item weui-bar__item--on" >
				      		<div className="weui-tabbar__icon">
				        		<i className="iconfont icon-title" >&#xe656;</i>
				     		</div>
				      		<p className="weui-tabbar__label">帮助文档</p>
				    	</Link>
				    	<Link to="collect" className="weui-tabbar__item" onClick={this.reflesh}>
				      		<div className="weui-tabbar__icon">
				        		<i className="iconfont icon-collect" style={{color:"orange"}}>&#xe616;</i>
				      		</div>
				      		<p className="weui-tabbar__label">我的收藏</p>
				    	</Link>
					    <Link  className="weui-tabbar__item" onClick={this.qrcode}>
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
        );
    }
}
Collect.contextTypes = {
	store:React.PropTypes.object,
	router: React.PropTypes.object
}

function mapStateToProps(state){
  return {
     collect:state.collect
  }
}
function mapDispatchToProps(dispatch) {
  return {
     collectAction:bindActionCreators(collectAction,dispatch) 
  }
} 

export default connect(	
	mapStateToProps,
	mapDispatchToProps
)(Collect);