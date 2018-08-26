import React, {Component} from "react";
//import {Link} from 'react-router-dom';
import QrReader from 'react-qr-reader';
//import Display from './Display';

const styles = {
	width:'250px',
	opacity:'1'
}

export default class Scanner extends Component{
	constructor(props){
		super(props);
		this.handleScan = this.handleScan.bind(this);
		this.handleError = this.handleError.bind(this);
		this.handleManual = this.handleManual.bind(this);

		this.state = {"delay":100}
	}

	handleManual(){
		let url = "/manual"
		this.props.history.push(url);
	}

	handleScan(uuid){
		if(uuid){
			console.log("uuid",uuid);
			if(uuid != ""){
				console.log("this",this);
				let url = "/display/"+uuid;
				this.props.history.push(url);
			}
		}
	}
	
	handleError(err){
		console.log("ERROR. QR Reader.", err);
		alert("ERROR. QR Reader.");
	}
	
	render(){
		return(
			<div>
				<div className="qrScannerDiv">
					<QrReader delay={this.state.delay}
					onScan = {this.handleScan}
					onError = {this.handleError}
					style = {styles}
					className = "qrScanner"/>
				</div>
				<pre className="linkText">No QR Code? <a className="link" href="javascript:void(0)" onClick={this.handleManual}>Click Here.</a></pre>
			</div>
		)
	}
}