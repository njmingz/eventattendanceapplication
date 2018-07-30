import React, {Component} from "react";
import QrReader from 'react-qr-reader';

const styles = {
	width: '100%'
}

export default class Scanner extends Component{
	constructor(props){
		super(props);
		this.handleError = this.handleError.bind(this);
		this.handleScan = this.handleScan.bind(this);
		
		this.state = {result: ""};
	}
	
	handleScan(result){
		console.log("result", result);
		if(result){
			this.setState({result});
		}
	}
	
	handleError(err){
		console.log("Error occurred", err);
		alert("Error occurred");
	}
	
	render(){
		return(
			<div>
				<QrReader delay={this.state.delay}
				onScan = {this.handleScan}
				onError = {this.handleError}
				style = {styles}/> 
			</div>
		)
	}
}