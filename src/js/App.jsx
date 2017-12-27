import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
} from 'react-router';
require("../font/iconfont.css");
import { Provider } from 'react-redux';
import { createStore } from 'react-redux';
import Index from './containers/Index.jsx';
import configureStore from './store/configureStore';
import FileSearch from './containers/FileSearch.jsx';
import Collect from './containers/Collect.jsx';
import ForHelp from './containers/ForHelp.jsx';
import Qrcode from './containers/Qrcode.jsx';
import FileOne from './containers/FileOne.jsx';
import FileTwo from './containers/FileTwo.jsx';
import Iframe from './containers/Iframe.jsx';
import Maintenance from './containers/Maintenance.jsx';
import AddFile from './containers/AddFile.jsx';
const store = configureStore();

function inPage(e){
	
}





const routes = (
	<Provider store={store} >
		<Router history={hashHistory}>
			<Route path="/(/:add)" component={Index}>
				<IndexRoute component={FileSearch} onEnter={inPage} name="帮助文档"/>
				<Route path="collect" component={Collect} onEnter={inPage} name="我的收藏"/>
				<Route path="forhelp" component={ForHelp} onEnter={inPage} name="扫码求助"/>
				<Route path="fileone/:message" component={FileOne} onEnter={inPage} name="帮助文档" />
				<Route path="filetwo/:message" component={FileTwo} onEnter={inPage} name="故障排查" />
				<Route path="addfile" component={AddFile} />
				<Route path="qrcode" component={Qrcode} name="二维码/条码" onEnter={inPage}/>
				<Route path="iframe" component={Iframe} name="帮助文档" onEnter={inPage}/>
				<Router path="maintenance/:error" name="维修申请" component={Maintenance} onEnter={inPage} />
			</Route>
		</Router>
	</Provider>
)

ReactDom.render(
	routes,
	document.getElementById('root')
)