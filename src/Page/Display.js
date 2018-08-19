import React, {Component} from 'react';
import axios from 'axios';

export default class Display extends Component{
	constructor(props){
		super(props);
		console.log("this", this);

		this.state = {timeout:"", uuid:this.props.match.params.uuid, guest:[]};
	}
	/*componentWillMount(){
		
	}*/
	componentDidMount(){
		axios.post('/api/postUpdateGuestArrival',{"uuid":this.state.uuid}).then((response)=>{
			if(response.data.success){
				let timeout = setTimeout(()=>{
					let url = "/";
					this.props.history.push(url);
				}, 10000);
				this.setState({"guest":[response.data.guest], timeout:timeout});
			}
			else{
				alert("Guest not found.");
			}
		}).catch((err)=>{
			alert("UUID," + uuid + ", NOT FOUND.");
		})
	}

	componentWillUnmount(){
		clearTimeout(this.state.timeout);
	}
	
	render(){
		if(this.state.guest.length == 0){
			return(
				<div>
					<pre className="guestText loading">LOADING. PLEASE WAIT.</pre>
				</div>
			)
		}
		else{
			return(
				<div>
					<pre className="guestText welcomeLabel">Welcome</pre>
					<pre className="guestText name">{this.state.guest[0].guestName}</pre>
					<span className="tableLabel">TABLE NO.</span>
					<span className="tableNumber">{this.state.guest[0].tableNumber}</span>
				</div>
			)
		}
	}
}