import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  hashHistory
} from 'react-router';
//import Using ES6 syntax
var $ = require("jquery");
import WeUI from 'react-weui';
import { createStore, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
require("../util/jquery-weui.min.js");
//import styles
import 'weui';
import 'weui/dist/style/weui.min.css';
require("../../font/iconfont.css");
require("../../css/common.css");
require('../../css/qrcode.css');
const {Button} = WeUI;
var wx = require("weixin-js-sdk");
import * as qrAction from '../actions/qrcode'

class Qrcode extends Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            err:'',
            val:'',
            page:1,
            all:false,
            user:''
        }
        this.show = this.show.bind(this);
        this.context.router;
        this.valueChage = this.valueChage.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.scanCode = this.scanCode.bind(this)
    }
    componentDidMount(){
        var that = this;
        $(".content").css("paddingBottom","50px");
        $(".popup").css("display","none");
        $(window).unbind('scroll');

       if(sessionStorage.user){
            this.setState({
                user:JSON.parse(sessionStorage.user)
            })
        }else{
            let url = window.location.href;
            url = url.split("view")[0]+"view/prop.html";
            window.location.href=url;
        }   
        this.props.qrAction.wechat();
        var that = this;
        if(this.props.qrcode.save.val){
            $(".weui-mask,.weui-dialog").addClass("display");
            this.setState({
                val:this.props.qrcode.save.val,
                page:this.props.qrcode.save.page,
                all:this.props.qrcode.save.all
            })
            
        }else{
        //扫码弹窗
            $.confirm({
              text: '在设备上打开“维宏云助手”，按F2进入“扫码求助”页面，扫描二维码。',
              onOK: function () {
                that.scanCode();
                $(".weui-mask,.weui-dialog").removeClass("display");
              },
              onCancel: function () {
                $(".weui-mask,.weui-dialog").addClass("display");
              }
            });
            $(".weui-dialog__btn.default").text("取消");
            $(".weui-dialog__btn.primary").text("开始扫码");
        }
    }
    collect(){
        this.context.router.push("collect");
    }
    componentWillUnmount(){
        this.props.qrAction.saveValue(this.state.val,this.state.page,this.state.all);
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log("nextState=");
        console.log(nextState);
        console.log('this.state');
        console.log(this.state);
        console.log('nextProps=')
        console.log(nextProps.qrcode);
        console.log("this.props.qrcode=")
        console.log(this.props.qrcode);
        if(JSON.stringify(nextProps.qrcode)==JSON.stringify(this.props.qrcode)&&JSON.stringify(this.state)==JSON.stringify(nextState)){
        console.log("false")
            return false
        }else{
        
            return true
        }
    }
    iframePage(obj){
        this.props.qrAction.saveValue(this.state.val,this.state.page);
        let path = {
            pathname:'iframe',
            query:obj
        }
        hashHistory.push(path);
    }
    pageChange(res){
        //将维修申请的弹窗关闭
        $(".content").css("paddingBottom","50px");
        $(".popup").css("display","none");
        $(window).unbind('scroll');
        let max = this.props.qrcode.err.Maxpage||this.props.qrcode.chart.Maxpage;
        let page = Number(this.state.page);
        if(!this.state.all){
            if(res=="pre"){
                $(".button2").removeClass("noclick");
                if(this.state.page>1){
                    this.props.qrAction.findErr(this.state.val,this.state.page-1);

                    this.setState({
                        page:page-1
                    })
                }else{
                    
                    $(".button1").addClass("noclick");
                }
            }else if(res=="next"){
                $(".button1").removeClass("noclick");
                if(page+1<max){
                    this.props.qrAction.findErr(this.state.val,page+1);
                    this.setState({
                        page:page+1
                    })
                }else if(page+1==max){
                    this.props.qrAction.findErr(this.state.val,page+1);
                    this.setState({
                        page:page+1
                    })
                    $(".button2").addClass("noclick");
                    this.show();
                }else{
                    $(".button2").addClass("noclick");
                }
            }else if(res=="max"){
                this.show();
                this.props.qrAction.findErr(this.state.val,max);
                $(".cd-pagination li").removeClass("noclick");
                this.setState({
                    page:max
                })              
            }else{
                this.props.qrAction.findErr(this.state.val,res);
                $(".cd-pagination li").removeClass("noclick");
                this.setState({
                    page:res
                })
            }
        }else{
            if(res=="pre"){
                $(".button2").removeClass("noclick");
                if(this.state.page>1){
                    this.props.qrAction.searchAll(this.state.val,this.state.page-1);

                    this.setState({
                        page:page-1
                    })
                }else{
                    
                    $(".button1").addClass("noclick");
                }
            }else if(res=="next"){
                $(".button1").removeClass("noclick");
                if(this.state.page<max){
                    this.props.qrAction.searchAll(this.state.val,page+1);
                    this.setState({
                        page:page+1
                    })
                }else{
                    $(".button2").addClass("noclick");
                }
            }else if(res=="max"){
                this.show();
                this.props.qrAction.searchAll(this.state.val,max);
                $(".cd-pagination li").removeClass("noclick");
                this.setState({
                    page:max
                })          
            }else{  
                this.props.qrAction.searchAll(this.state.val,res);
                $(".cd-pagination li").removeClass("noclick");
                this.setState({
                    page:res
                })

            }       
        }
    }
    componentDidUpdate(){
        $(window).scrollTop(0);
    }
    show(){
        $(".content").css("paddingBottom","100px");
        if(document.body.scrollTop==0){
            $(".popup").css('display','block');
        }else{
            $(window).scroll(function () {
              //已经滚动到上面的页面高度
             var scrollTop = $(this).scrollTop()+50;
              //页面高度
             var scrollHeight = $(document).height();
               //浏览器窗口高度
             var windowHeight = $(this).height();
              //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
              if (scrollTop + windowHeight  > scrollHeight) {
                $(".popup").css('display','block');
              }else{
                
                $(".popup").css('display','none');  
              }
            });
        }
    }
    checkValue(e){
        //将维修申请的弹窗关闭
        $(".content").css("paddingBottom","50px");
        $(".popup").css("display","none");
        $(window).unbind('scroll');
        //清除分页不可点击的class
        $(".cd-pagination li").removeClass("noclick");
        let btn = e.target.innerHTML;
        $(".btn").removeClass("clickBtn");
        if(this.state.val.trim()==""){
            $(".search").css("border","1px solid orange");
        }else{
            $(".search").css("border","1px solid #ccc");
            if(btn=="搜文档"){
                this.props.qrAction.findErr(this.state.val,1);
                $(".search-btn .text").addClass("clickBtn");
                this.setState({
                    all:false,
                    page:1
                })
            }else{
                this.props.qrAction.searchAll(this.state.val,1);
                this.setState({
                    all:true,
                    page:1
                })
                $(".search-btn .all").addClass("clickBtn")
            }
        }
    }
    scanCode(){
        var that = this;
        wx.scanQRCode({
            needResult : 1, 
            scanType : [ "qrCode"], 
            success : function(res) {
                let error = res.resultStr;
                error = error.split("?")[1].split("&");
                let obj = {};
                for(var i=0;i<error.length;i++){
                    obj[error[i].split("=")[0]] = error[i].split("=")[1];
                }
                let token = "";
                obj.username = "";
                if(that.state.user){
                    obj.username = that.state.user.username;
                    token = that.state.user.token;
                }
                var t = new Date().toISOString();
                obj.timeState = t;
                let er = res.resultStr.split("ERROR1=")[1].split("&")[0];
                that.props.qrAction.findErr(er,1)
                that.props.qrAction.saveWarning(obj,token);
                $(".weui-mask,.weui-dialog").addClass("display");
                that.setState({
                    err:er,
                    val:er,
                    all:false
                })
               
            }
        });
       
    }
    valueChage(e){
        this.setState({
            val:e.target.value
        })
    }
    reflesh(){
        var that = this;
        $.confirm({
            text: '在设备上打开“维宏云助手”，按F2进入“扫码求助”页面，扫描二维码。',
            onOK: function () {
              that.scanCode();
                $(".weui-mask,.weui-dialog").removeClass("display");
            },
            onCancel: function () {
                $(".weui-mask,.weui-dialog").addClass("display");
            }
        });
            $(".weui-dialog__btn.default").text("取消");
            $(".weui-dialog__btn.primary").text("开始扫码");
        
    }

    render() {
        let max;
        let wechat = this.props.qrcode.wechat;
        //初始化微信接口
        let qrcode = this.props.qrcode; 
        console.log("===============render========");
        console.log(this.props.qrcode)
        if (JSON.stringify(wechat)!=="{}") {
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
        let list;
        let page ;
        let all;
        if(qrcode.err&&qrcode.err.objArray&&qrcode.err.objArray.length>0){
            max = qrcode.err.Maxpage;
            page = qrcode.err.objArray.map(function(item,index){
            
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
        }
        if(qrcode.chart&&qrcode.chart.objArray&&qrcode.chart.objArray.length>0){
            max = qrcode.chart.Maxpage;
            all = qrcode.chart.objArray.map(function(item,index){
                
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
        }
        if(page){
            list = page;
        }else{
            list = all;
        }
        return (
            <div>
                <div className="content qrcode">
                    <div className="search-box">
                        <div className="search-input">
                            <input type="text" placeholder="关键字" className="search" value={this.state.val} onChange={this.valueChage}/>
                        </div>
                        <div className="search-btn">
                            <label type="button" value="搜文档" className="btn text" onClick={this.checkValue}>搜文档</label>
                            <label type="button" value="搜全站" className="btn all" onClick={this.checkValue}>搜全站</label>
                        </div>
                    </div>
                    <div className="weui-cells">
                        {list}
                    </div>
                    <div className="holder" >
                        <section>
                            <nav role="navigation">
                                <ul className="cd-pagination">
                                    <li className="s" onClick={this.pageChange.bind(this,1)}>首页</li>
                                    <li className="button1" onClick={this.pageChange.bind(this,"pre")}>上页</li>
                                    
                                    <li className="button2" onClick={this.pageChange.bind(this,"next")}>下页</li>
                                    <li className="e" onClick={this.pageChange.bind(this,"max")}>尾页</li>
                                </ul>
                            </nav> 
                        </section>
                    </div>
                </div>
                <div className="popup" >
                    <div className="subscrib">以上是智能检索的关联文档，如不能满足您的需求，请填写维修申请</div>
                    <Link to={`/maintenance/${this.state.val}`}><div className="label">维修申请</div></Link>
                </div>
                <footer>
                     <div className="weui-tabbar">
                        <Link to="/" className="weui-tabbar__item weui-bar__item--on">
                            <div className="weui-tabbar__icon">
                                <i className="iconfont icon-title" >&#xe656;</i>
                            </div>
                            <p className="weui-tabbar__label">帮助文档</p>
                        </Link>
                        <Link to="collect" className="weui-tabbar__item" onClick={this.collect.bind(this)}>
                            <div className="weui-tabbar__icon">
                                <i className="iconfont icon-collect">&#xe616;</i>
                            </div>
                            <p className="weui-tabbar__label">我的收藏</p>
                        </Link>
                        <a href="javascript:;" className="weui-tabbar__item" onClick={this.reflesh.bind(this)}>
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
}
Qrcode.contextTypes = {
    router:React.PropTypes.object

}
function mapStateToProps(state) {
    return {
        qrcode: state.qrcode
    }
}

function mapDispatchToProps(dispatch) {
    return {
        qrAction: bindActionCreators(qrAction, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Qrcode);