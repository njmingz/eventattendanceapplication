import React, {Component} from 'react';

export default class Display extends Component{
	constructor(props){
		super(props);
		
		this.state = {}
	}
	
	render(){
		return(
			<div>
				<h1>WELCOME {this.props.guestname}</h1>
				<span>YOUR TABLE NO.</span>
				<h1>{this.props.tablenumber}</h1>
			</div>
		)
	}
}