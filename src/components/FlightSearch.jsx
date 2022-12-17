import { Component } from "react";
import Navbar from "./Navbar";
import "../App.css";
import FlightSearchButton from "./FlightSearchButton";
import Content from "./Content";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
class FlightSearch extends Component {
  state = {
    flight: true,
    tour: false,
    hotel: false,
    visa: false,
    adults: 0,
    children: 0,
    infant: 0,
    passengerCount: 0,
    category: "Select Cabin Class",
    from: "",
    to: "",
    date: ""
  };
  onclickflight = () => {
    this.setState({ flight: true, tour: false, hotel: false, visa: false });
  };
  onclicktour = () => {
    this.setState({ flight: false, tour: true, hotel: false, visa: false });
  };
  onclickhotel = () => {
    this.setState({ flight: false, tour: false, hotel: true, visa: false });
  };
  onclickvisa = () => {
    this.setState({ flight: false, tour: false, hotel: false, visa: true });
  };
  onaddadult = () => {
    let newadults = this.state.adults + 1;
    let total = this.state.children + newadults + this.state.infant;
    this.setState({ passengerCount: total, adults: newadults });
  };
  onsubadult = () => {
    if(this.state.adults-1>=0){
      let newadults = this.state.adults - 1;
      let total = this.state.children + newadults + this.state.infant;
      this.setState({ passengerCount: total, adults: newadults });
    }
  };
  onaddchildren = () => {
    let newchildren = this.state.children + 1;
    let total = this.state.adults + newchildren + this.state.infant;
    this.setState({ passengerCount: total, children: newchildren });
  };
  onsubchildren = () => {
    if(this.state.children-1>=0){
      let newchildren = this.state.children - 1;
      let total = this.state.adults + newchildren + this.state.infant;
      this.setState({ passengerCount: total, children: newchildren });
    }
  };
  onaddinfant = () => {
    let newinfant = this.state.infant + 1;
    let total = this.state.children + newinfant + this.state.adults;
    this.setState({ passengerCount: total, infant: newinfant });
  };
  onsubinfant = () => {
    if(this.state.infant-1>=0){
      let newinfant = this.state.infant - 1;
      let total = this.state.children + newinfant + this.state.adults;
      this.setState({ passengerCount: total, infant: newinfant });
    }
  };
  onclickbusiness = () => {
    this.setState({ category: "Business" });
  };
  onclickeconomy = () => {
    this.setState({ category: "Economy" });
  };
  onclickfirstclass = () => {
    this.setState({ category: "First Class" });
  };
  onfromchange = (e) => {
    this.setState({ from: e.target.value });
  };
  ontochange = (e) => {
    this.setState({ to: e.target.value });
  };
  ondatechange = (e) => {
    this.setState({ date: e.target.value });
  };
  render() {
    let data={
      adults: this.state.adults,
      children: this.state.children,
      infant: this.state.infant,
      passengerCount: this.state.passengerCount,
      category: this.state.category,
      from: this.state.from,
      to: this.state.to,
      date: this.state.date
    }
    let content = <h1></h1>;
    if (this.state.flight) {
      content = (
        <>
          <div className="input-container">
            <div className="from-div">
              <span className="from-div-head1">
                From <i className="fa fa-plane-departure from-head1-icon"></i>
              </span>
              <input
                className="from-div-input"
                type="text"
                placeholder="Enter City Name"
                onChange={this.onfromchange}
              />
            </div>
            <div className="icon-div">
              <i className="fa fa-exchange-alt"></i>
            </div>
            <div className="to-div">
              <span className="to-div-head1">
                To <i className="fas fa-plane-arrival to-head1-icon"></i>
              </span>
              <input
                className="to-div-input"
                type="text"
                placeholder="Enter City Name"
                onChange={this.ontochange}
              />
            </div>
            <div className="date-div">
              <span className="date-div-head1">Journey Date </span>
              <input
                className="date-div-input"
                type="date"
                onChange={this.ondatechange}
              />
            </div>
            <button className="passenger-div" type="button" data-toggle="collapse" data-target="#collapse-div">
              <span className="passenger-div-head">Passenger, Class</span>
              <span className="passenger-div-passengercount">{this.state.passengerCount} Passengers</span>
              <span className="passenger-div-cabin">{this.state.category}</span>
            </button>
          </div>
          <div className="collapse" id="collapse-div">
            <div className="collapse-div-1">{this.state.adults} Adults <i className="fa-solid fa-plus plus-icon" onClick={this.onaddadult}></i><i class="fa-solid fa-minus minus-icon" onClick={this.onsubadult}></i></div><br />
            <div className="collapse-div-2">{this.state.children} Children <i className="fa-solid fa-plus plus-icon" onClick={this.onaddchildren}></i><i class="fa-solid fa-minus minus-icon" onClick={this.onsubchildren}></i></div><br />
            <div className="collapse-div-3">{this.state.infant} Infant <i className="fa-solid fa-plus plus-icon" onClick={this.onaddinfant}></i><i class="fa-solid fa-minus minus-icon" onClick={this.onsubinfant}></i></div><br />
            <hr style={{marginRight:"2em",marginBottom:"0"}}/><br />
            <span style={{}}>Select Class</span><br />
            <button style={{marginTop:"2em"}} onClick={this.onclickeconomy} className="cabin-select-button1">Economy</button><br />         
            <button className="cabin-select-button2" onClick={this.onclickbusiness}>Business</button><br />
            <button className="cabin-select-button3" onClick={this.onclickfirstclass}>First Class</button>
          </div>
          <Link to={"/flightsearched"}>
            <div className="flight-search-button-div">
            <button
              style={{background:"none",outline:"none",border:"none"}}
              className="flight-search-link"
              onClick={() => this.props.onclick(data)}
            >
              Search
            </button>
            </div>
          </Link>
        </>
      );
    } else if (this.state.tour) {
      content = <h1>This is tour component</h1>;
    } else if (this.state.hotel) {
      content = <h1>This is hotel component</h1>;
    } else if (this.state.visa) {
      content = <h1>This is visa component</h1>;
    }
    return (
      <>
        <Navbar />
        <Content />
        <div className="main-container">
          <div className="search-div">
            <div className="route-buttons">
              <FlightSearchButton
                iconname="fas fa-plane-departure active"
                heading="Flight"
                clicked={this.onclickflight}
              />
              <FlightSearchButton
                iconname="fas fa-globe"
                heading="Tour"
                clicked={this.onclicktour}
              />
              <FlightSearchButton
                iconname="fas fa-hotel"
                heading="Hotels"
                clicked={this.onclickhotel}
              />
              <FlightSearchButton
                iconname="fas fa-passport"
                heading="Visa"
                clicked={this.onclickvisa}
              />
            </div>
            {content}
          </div>
        </div>
      </>
    );
  }
}
export default FlightSearch;
