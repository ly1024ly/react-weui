  import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Link,
    hashHistory
} from 'react-router';
import { createStore, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import Using ES6 syntax
import WeUI from 'react-weui';
import 'weui';
require('jquery');
var wx = require("weixin-js-sdk");
import 'weui/dist/style/weui.min.css';
require("../../font/iconfont.css");
require("../../css/common.css");
require("../../css/iframe.css");
import * as iframeAction from '../actions/iframe'
var firstGuid = require('../../img/share-it.png');

class Iframe extends Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            like: {},
            collect: {},
            user:{},
            height:'',
            docHeight:'',
            contentType:'',
            topic:''
        }
        const { store } = this.context;
        this.like = this.like.bind(this);
        this.hideFlow = this.hideFlow.bind(this);
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillMount(){
        document.documentElement.scrollTop = 0;
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
    forceUpdate(){
        
    }
    componentDidMount() {
        //跨域
        let contentType;
        var that = this;
        let topicid = '';
        let collect = {};
        var reader = new FileReader();  
        var framecont = document.getElementById("frameContent");
        var doc = framecont.contentWindow;
        framecont.onload = function(e){
            doc.addEventListener('click',function(event){
                if(event.target.tagName=='A'){
                    delete that.props.iframe.like;
                    that.props.location.query.href = event.target.href;
                }
                
            });
            e.path.forEach(function(value){
                if(value&&value.tagName=="IFRAME"){
                    let ht = value.contentWindow.document.children[0].children;
                    for(var i in ht){
                        if(ht[i].tagName=="HEAD"){
                            for(var e in ht[i].childNodes){
                               if(ht[i].childNodes[e].name == "ContentType"){
                                    contentType = ht[i].childNodes[e].content;
                                    collect.ContentType = ht[i].childNodes[e].content;
                               }
                            }
                        }
                        if(ht[i].tagName=='BODY'){
                            let id = ht[i].getAttribute("id");
                            topicid = id;
                            that.props.iframeAction.topicid(id);
                        }
                    }
                }
            },this)
            let title = document.getElementById("frameContent").contentWindow.document.getElementsByTagName("h1")[0].innerText;
            let user = that.state.user;
            //collect.username = that.state.user.username;
            collect.username = "rxt123";
            collect.topicid = topicid;
            collect.title = title;
            collect.topicURL = that.props.location.query.href||that.props.location.query.url;
            if(that.props.location.query.ContentType){
                collect.ContentType = that.props.location.query.ContentType
            }else if(collect.ContentType===undefined){
                collect.ContentType = "其他";
            }
            console.log(collect);
            let obj = {};
            //obj.username = that.state.user.username;
            obj.username="rxt123";
            obj.topicid = topicid;
            obj.title = title;

            that.setState({
                like: obj,
                collect:collect,
                topic:topicid
            });
            let o = {};
            //o.username = user.username;
            o.username = "rxt123";
            o.topicid = topicid;
            that.props.iframeAction.keyword(topicid);
            that.props.iframeAction.saveLike(o);
        }
        console.log(contentType,topicid)
        $(window).scrollTop(0);
        this.setState({
            height:window.screen.height
        })
        let height = document.body.clientHeight ;
        height = height - 30 + "px";
        $(".ss").css("height",height);
        this.props.iframeAction.wechat();
        document.documentElement.scrollTop = 0;
        console.log(document.documentElement.scrollTop )
    }
    like() {
        this.props.iframeAction.like(this.state.like)
    }
    componentWillUnmount() {
        this.props.iframeAction.clear();
    }
    collect(res) {
       let collect = this.state.collect;
        collect.status = res;
        this.props.iframeAction.collect(collect);
    }
    delcollect(res) {
        let collect = this.state.collect;
        collect.status = res;
        this.props.iframeAction.delCollect(collect);
    }
    share(res, url) {
        $("#shareit").show();

    }
    hideFlow(){
        $("#shareit").hide();
    }
    keySearch(res){
        console.log(res);
        let data = {name:res};
        let path = {
            pathname:'/',
            query:data
        }
        hashHistory.push(path);
    }
   
    render() {
        //点赞
        const props = this.props;
        const { store } = this.context;
        const state = store.getState();
        console.log(this.props.iframe)
        let success = false;
        if (this.props.iframe.is&&this.props.iframe.is.luad) {
            success = this.props.iframe.is.luad;
        }else if(this.props.iframe.like&&this.props.iframe.like.result=="success"){
            success = true;
        }else{
            success = false;
        }
        //收藏
        let collect = false;
        if (this.props.iframe.store) {
            collect = this.props.iframe.store;
        }
        let wechat = this.props.iframe.wechat;
        let url = this.props.location.query.href || this.props.location.query.url;
        //获得关键字
        let keyword;
        if(this.props.iframe.key&&this.props.iframe.key.result=="success"&&this.props.iframe.key.message.length>0){
            keyword = this.props.iframe.key.message[0].keyworlds.map(function(item,index){
                if(item!=="NA"){
                   return (
                    <li key={index} onClick={this.keySearch.bind(this,item)}>{item}</li>
                   )
                }
            },this)
        } 
        //初始化微信接口
        if (wechat&&JSON.stringify(wechat)!=="{}") {
            wx.config({
                debug: false,
                appId: wechat.values.appId,
                timestamp: wechat.values.timestamp,
                nonceStr: wechat.values.nonceStr,
                signature: wechat.values.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareQZone',
                    'showMenuItems',
                    "showOptionMenu"
                ],

            });
            var title = "分享经验";
            if(this.props.location.query.title){
                title = "维宏云在线帮助：" + this.props.location.query.title;
            }
            let topicid = this.props.iframe.id;
            url = encodeURIComponent(url);
            wx.ready(function() {
                wx.showOptionMenu();
                var shareDate = {
                    title: title,
                    link: "https://nccloud.weihong.com.cn/nchelp/share.html?topicid=" + topicid + "&shareUrl=" + url,
                    imgUrl: "https://nccloud.weihong.com.cn/img/share.jpg",
                    trigger: function(res) {
                    },
                    success: function(res) {
                        $("#share_btn").css("color","orange");
                    },
                    cancel: function(res) {
                       $("#share_btn").css("color","black");
                    }
                };


                wx.onMenuShareTimeline(shareDate);
                wx.onMenuShareAppMessage(shareDate);
                wx.onMenuShareQQ(shareDate);
                wx.onMenuShareQZone(shareDate);

            });

            wx.error(function(res) {
            	console.log(res)
               
            });
        }
        //分享
        let heights = window.innerHeight- 60;
        console.log(heights)
        let share = false;
        let display = keyword ? "block" : "none";
        let luadnum = this.props.iframe.luad;

        return ( 
      	  <div id="iframe">
            <div id="shareit" onClick={this.hideFlow}>
                <img className="arrow" src= {firstGuid} />
                <div  id="follow">
                    点击右上角按钮，开始分享
                </div>
            </div>
            <div style={{overflow:'auto',height:heights+"px"}} className="ss">
			    <iframe id="frameContent" style={{width:window.screen.width+"px",height:document.body.clientHeight+"px"}} src={this.props.location.query.href||this.props.location.query.url}></iframe>
            </div>
            <div className="key" style={{display:display}}>
                <ul>
                    <li>关键字 :</li>
                    {keyword}
                </ul>
            </div>
			<footer>
				<div className="iframe">
					<div className="box">
                        <span>同行评价{luadnum}赞</span>
						{success ? <i className="iconfont icon-yes">&#xe63a;</i> : <i className="iconfont icon-no" onClick={this.like}>&#xe67f;</i>}
						{collect ? <i className="iconfont icon-yes" onClick={this.delcollect.bind(this,false)}>&#xe620;</i> : <i className="iconfont icon-no" onClick={this.collect.bind(this,true)}>&#xe616;</i>}
						<i className="iconfont" onClick={this.share.bind(this,this.props.iframe.wechat,url)} id="share_btn">&#xe619;</i>
					</div>
				</div>
			</footer>
		</div>
        )
    }
}
Iframe.contextTypes = {
    store:React.PropTypes.object
}

function mapStateToProps(state) {
    return {
        iframe: state.iframe
    }
}

function mapDispatchToProps(dispatch) {
    return {
        iframeAction: bindActionCreators(iframeAction, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Iframe);