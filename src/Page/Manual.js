import React, {Component} from 'react';
import axios from 'axios';
import Select from 'react-select';

export default class Manual extends Component{
	constructor(props){
        super(props);

        this.handleReset = this.handleReset.bind(this);
        this.handleGroom = this.handleGroom.bind(this);
        this.handleBride = this.handleBride.bind(this);
        this.handleFamily = this.handleFamily.bind(this);
        this.handleFriend = this.handleFriend.bind(this);
        this.handleColleague = this.handleColleague.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.state = {guestList:[], side:"", relationship:"", name:""};
    }

    componentDidMount(){
        axios.get('/api/getAllGuest').then((response)=>{
            //console.log("response",response);
            if(response.data.success){
                this.setState({guestList:response.data.guestList});
            }
            else{
                //console.log("ERROR. LOADING GUEST LIST.");
                alert("ERROR. LOADING GUEST LIST.");
            }
        }).catch((err)=>{
            alert("ERROR."+err);
        });
        
        //this.setState({guestList:[{name:"Test User 1"}]});
    }

    handleReset(){
        this.setState({side:"", relationship:"", name:""});
    }
    handleGroom(){
        this.setState({side:"groom"});
    }
    handleBride(){
        this.setState({side:"bride"});
    }
    handleFamily(){
        this.setState({relationship:"family"});
    }
    handleFriend(){
        this.setState({relationship:"friend"});
    }
    handleColleague(){
        this.setState({relationship:"colleague"});
    }
    handleChange(selectedOption){
        let url = "/display/"+selectedOption.value;
        this.props.history.push(url);
    }


	
	render(){
        if(this.state.guestList.length == 0){
            return(
				<div>
					<pre className="guestText loading">LOADING. PLEASE WAIT.</pre>
				</div>
			)
        }
        else{
            if(this.state.side == ""){
                return(
                    <div className="manual">
                        <div className="buttonContainer">
                            <button className="btnSelect" onClick={this.handleGroom}>GROOM</button>
                            <button className="btnSelect" onClick={this.handleBride}>BRIDE</button>
                        </div>
                        <a className="clear link red" href="javascript:void(0)" onClick={this.handleReset}>CLEAR</a>
                    </div>
                );
            }
            else{
                if(this.state.relationship == ""){
                    return(
                        <div className="manual">
                            <div className="buttonContainer">
                                <button className="btnSelect" onClick={this.handleFamily}>FAMILY</button>
                                <button className="btnSelect" onClick={this.handleFriend}>FRIEND</button>
                                <button className="btnSelect" onClick={this.handleColleague}>COLLEAGUE</button>
                            </div>
                            <a className="clear link red" href="javascript:void(0)" onClick={this.handleReset}>CLEAR</a>
                        </div>
                    );
                }
                else{
                    console.log(this.state.guestList[this.state.side][this.state.relationship]);
                    return(
                        <div className="manual">
                            <Select 
                                className="selectGuest"
                                //options={[{label:"ABC",value:"ABC",uuid:"abcdefg-1234567-987654-123"},{label:"BCD", value:"BCD",uuid:"123"}]}
                                options={this.state.guestList[this.state.side][this.state.relationship]}
                                onChange={this.handleChange}
                                placeholder="Enter Guest Name"
                                isClearable={true}
                                isSearchable={true}
                                />
                            <a className="clear link red" href="javascript:void(0)" onClick={this.handleReset}>CLEAR</a>
                        </div>
                    );
                }
            }
            
        }
	}
}