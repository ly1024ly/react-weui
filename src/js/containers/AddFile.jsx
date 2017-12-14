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
		
	}
	addMenu(res){
		console.log(res)
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
		this.props.fileAction.list(this.state.val)
	}
	render(){
		let a = "hhh";
		let addFile;
		if(this.props.addfile.success&&this.props.addfile.success.result=="success"){
			$.toast("添加成功");
		}
		if(this.props.addfile.add.result&&this.props.addfile.add.result=="success"){
			addFile = this.props.addfile.add.message.map(function(item,index){
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
					  		 
					  		 />
					  		 <div className="hint" id="hint">
					  		 	<ul >
					  		 		
					  		 	</ul>
					  		 </div>
						</div>
						<div className="search-btn">
							<label className="btn" 
							onClick={this.checkValue} >搜索产品文档</label>
						</div>
					</div>
					<div>
						<span className="warn">提示：本页仅显示可公开文档；对于保密文档，请联系设备商获取二维码后扫码添加.</span>
						<ul>
						{addFile}
						</ul>
					</div>
				</div>
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