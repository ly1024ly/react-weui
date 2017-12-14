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
      val:""
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
    this.props.fileAction.list("ly1024","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTgzMjY4ODI2NTgiLCJleHAiOjE1MTQ5Mzc2MDAsImlhdCI6MTUxMjM2OTk2N30.JcED4m2wV75crDrT-pp5O56tn9N4tC12GanCNABnzb8")
  }
  checkValue(){
    console.log(this.state.val)
  }
  render(){
    let a = "hhh";
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
              <Link to={`//${JSON.stringify(a)}`}><label className="btn" 
              onClick={this.checkValue} >搜索产品文档</label></Link>
            </div>
          </div>
          <div>
            <span className="warn">提示：本页仅显示可公开文档；对于保密文档，请联系设备商获取二维码后扫码添加.</span>
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