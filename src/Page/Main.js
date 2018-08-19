import React, {Component} from 'react';
import {date, groom, bride, backgroundColor} from "../lib/const";
import background from '../static/img/background.jpg';
import backgroundMobile from '../static/img/background-mobile.jpg';

export default class Main extends Component{
	constructor(props){
		super(props);
	}
	
	render(){
		return(
			<div className='page' style={{backgroundColor:backgroundColor}}>
				<div className="page background">
					<img src={background} className="img-responsive" />
    				<img src={backgroundMobile} className="img-responsive mobile" />
				</div>
				<div className="page overlay">
					<div className="couple">
						<pre className='coupleText'>{groom}  &  {bride}</pre>
					</div>
					<span className='dateText'>{date.format("DD MMMM YYYY, dddd")}</span>
                    {this.props.children}
				</div>
			</div>
		);
	}
}