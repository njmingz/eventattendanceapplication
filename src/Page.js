import React, {Component} from 'react';
import Scanner from './Page/Scanner';
import axios from 'axios';
import {welcomeMessage,serverURL} from "./lib/const";

export default class Page extends Component{
	constructor(props){
		super(props);
		this.getGuestList = this.getGuestList.bind(this);

		this.state = {guestList:[]};
	}
	componentDidMount(){
		this.getGuestList();
	}

	getGuestList(){
		axios.get(serverURL + '/api/getGuestList').then((response)=>{
			console.log("response", response);
			if(response.data.success){
				this.setState({'guestList':response.data.guestList});
			}
			else{
				console.log("API failed. /api/getGuestList.");
			}
		}).catch((err)=>{
			console.log("Server error occurred. /api/getGuestList.", err);
		});
	}
	
	render(){
		if(this.state.guestList.length == 0){
			return(<div>LOADING...</div>);
		}
		else{
			return(
				<div>
					<h1>{welcomeMessage}</h1>
					<Scanner />
				</div>
			);
		}
	}
	
}