import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Main from './Page/Main';
import Scanner from './Page/Scanner';
import Display from './Page/Display';
import Manual from './Page/Manual';


export default class Page extends Component{
	constructor(props){
		super(props);
	}
	
	render(){
		return(
			<Main>
				<Switch>
					<Route path='/display/:uuid' component={Display}/>
					<Route path="/manual" component={Manual}/>
					<Route path="/" component={Scanner}/>
				</Switch>
			</Main>
		);
	}
}