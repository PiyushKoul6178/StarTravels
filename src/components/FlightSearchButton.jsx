import { Component } from "react";
class FlightSearchButton extends Component{
    render(){
        let iconName=`${this.props.iconname} button-icon`;
        return( 
                <button className="switch-buttons" onClick={()=>{this.props.clicked()}}>
                    <i className={iconName}></i>
                    <span className="button-heading">{this.props.heading}</span>
                </button>
        )
    }
}
export default FlightSearchButton;