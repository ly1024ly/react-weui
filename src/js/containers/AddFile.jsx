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
require("../../css/addfile.css");
import * as fileAction from '../actions/addfile'

class AddFile extends Component{
	constructor(props,context){
		super(props,context);
		this.state={
			val:"",
			user:{},
			book:''
		}
		this.saveValue = this.saveValue.bind(this);
		this.checkValue = this.checkValue.bind(this);
	}
	saveValue(e){
		this.setState({
			val:e.target.value
		})
	}
	componentDidMount(){
		document.title = '搜索添加';
		if(sessionStorage.user){
      this.setState({
          user:JSON.parse(sessionStorage.user)
      })
    }else{
        let url = window.location.href;
        url = url.split("view")[0]+"view/prop.html";
        //window.location.href=url;
    }
    this.props.fileAction.file("yang6");
		this.props.fileAction.all("yang6");
	}
	addMenu(res){
		this.setState({
			book:res.bookname
		});
		let obj = {};
		obj.username = "yang6";
		obj.bookid = res.id;
		obj.bookname = res.bookname;
		obj.ifsecrecy = true;
		this.props.fileAction.addMenu(obj);
	}
	checkValue(){
		if(this.state.val===""){

			this.props.fileAction.all("yang6")
		}else{
			this.props.fileAction.list(this.state.val)
		}
	}
	onKeyup =(e) => {
		e.keyCode == 13 && this.handler()
	}
	handler = (e) =>{
		if(this.state.val===""){
			this.props.fileAction.all("yang6")
		}else{
			this.props.fileAction.list(this.state.val)
		}	
	}
	render(){
		let addFile;
		let list;
		if(this.props.addfile.success&&this.props.addfile.success.result=="success"){
			$.toast("添加成功");
			window.location.reload();
			this.props.addfile.success = {};
		}else if(this.props.addfile.success&&this.props.addfile.success.result=="fail"){
			$.toast(this.props.addfile.success.message)
			this.props.addfile.success = {}
		}
		if(this.props.addfile.add.result=="success"&&this.props.addfile.add.result=="success"){
			if(this.props.addfile.add.message.length>0){
				addFile = this.props.addfile.add.message.map(function(item,index){
					let i;
					this.props.addfile.added.forEach(function(val){
						if(item.id==val){
							i = val
						}
					})
					let show = i ? "none" : "block";
				 	return (
				 		<li key={index}>
				 			<div className="cbox" key={index} >
							    <a className="weui-cell weui-cell_access"  key={index} >
							        <div className="weui-cell__bd">
							    		<p>{item.bookname}</p>
							        </div>
							       <i className="iconfont icon-add" style={{display:show}} onClick={this.addMenu.bind(this,item)}>&#xe601;</i>
							    </a>
							</div>
						</li>
				 	)
				},this)
			}else{
				addFile = <p style={{textAlign:'center',padding:'10px',color:'orange'}}>没有相关书籍。</p>
			}
		}
		if(this.props.addfile.list&&this.props.addfile.list.result=="success"){
			list = this.props.addfile.list.message.map(function(item,index){
				return (
			 		<li key={index}>
			 			<div className="cbox" key={index} >
						    <a className="weui-cell weui-cell_access"  key={index} >
						        <div className="weui-cell__bd">
						    		<p>{item.bookname}</p>
						        </div>
						    	<i className="iconfont icon-add" onClick={this.addMenu.bind(this,item)}>&#xe601;</i>
						    </a>
						</div>
					</li>
			 	)
			},this)
			
		}
		return(
			<div>
				<div className="content addfile">
					<div className="search-box" onBlur={this.blurEvent}>
					  	<div className="search-input">
					  		<input type="text"
					  		 placeholder="关键字" 
					  		 value={this.state.val}
					  		 className="search"  
					  		 onChange={this.saveValue}
					  		 onKeyUp={this.onKeyup}
					  		 />
					  		 <div className="hint" id="hint">
					  		 	<ul >
					  		 		
					  		 	</ul>
					  		 </div>
						</div>
						<div className="search-btn">
							<label className="btn" 
							onClick={this.checkValue} 
							>搜索产品文档</label>
						</div>
					</div>
					<div>
						<span className="warn">提示：本页仅显示可公开文档；对于保密文档，请联系设备商获取二维码后扫码添加.</span>
						<ul>
						{list ? list : addFile}
						</ul>
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
		)
	}
}
AddFile.contextTypes = {
	router: React.PropTypes.object,
	store:React.PropTypes.object
}

function mapStateToProps(state, ownProps){
  return {
   addfile:state.addfile
  }
}
function mapDispatchToProps(dispatch) {
  return {
     fileAction:bindActionCreators(fileAction,dispatch)
  }
} 

export default connect(	
	mapStateToProps,
	mapDispatchToProps
)(AddFile);