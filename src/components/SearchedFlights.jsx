import { Component } from "react";
import Navbar from "./Navbar";
import "../App.css";
import FlightSearchButton from "./FlightSearchButton";
import Content from "./Content";
import axios from "axios";
class SearchedFlights extends Component {
  state = {
    flight: true,
    search: [],
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
    if (this.state.adults - 1 >= 0) {
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
    if (this.state.children - 1 >= 0) {
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
    if (this.state.infant - 1 >= 0) {
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
  onupdatesearch=()=>{
    axios
      .post(
        "http://localhost:5500/search",
        {
          CityName: this.state.from,
          ToCityName: this.state.to,
          DateofTravel: this.state.date
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((result) => {
        this.setState({ search: result.data.result });
      })
      .catch((err) => console.log(err));
  }
  componentDidMount = () => {
    this.setState(this.props.data);
    axios
      .post(
        "http://localhost:5500/search",
        {
          CityName: this.props.data.from,
          ToCityName: this.props.data.to,
          DateofTravel: this.props.data.date,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((result) => {
        this.setState({ search: result.data.result });
      })
      .catch((err) => console.log(err));
  };
  render() {
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
                value={this.state.from}
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
                value={this.state.to}
              />
            </div>
            <div className="date-div">
              <span className="date-div-head1">Journey Date </span>
              <input
                className="date-div-input"
                type="date"
                onChange={this.ondatechange}
                value={this.state.date}
              />
            </div>
            <button
              className="passenger-div"
              type="button"
              data-toggle="collapse"
              data-target="#collapse-div"
            >
              <span className="passenger-div-head">Passenger, Class</span>
              <span className="passenger-div-passengercount">
                {this.state.passengerCount} Passengers
              </span>
              <span className="passenger-div-cabin">{this.state.category}</span>
            </button>
          </div>
          <div className="collapse" id="collapse-div">
            <div className="collapse-div-1">
              {this.state.adults} Adults{" "}
              <i
                className="fa-solid fa-plus plus-icon"
                onClick={this.onaddadult}
              ></i>
              <i
                className="fa-solid fa-minus minus-icon"
                onClick={this.onsubadult}
              ></i>
            </div>
            <br />
            <div className="collapse-div-2">
              {this.state.children} Children{" "}
              <i
                className="fa-solid fa-plus plus-icon"
                onClick={this.onaddchildren}
              ></i>
              <i
                className="fa-solid fa-minus minus-icon"
                onClick={this.onsubchildren}
              ></i>
            </div>
            <br />
            <div className="collapse-div-3">
              {this.state.infant} Infant{" "}
              <i
                className="fa-solid fa-plus plus-icon"
                onClick={this.onaddinfant}
              ></i>
              <i
                className="fa-solid fa-minus minus-icon"
                onClick={this.onsubinfant}
              ></i>
            </div>
            <br />
            <hr style={{ marginRight: "2em", marginBottom: "0" }} />
            <br />
            <span>Select Class</span>
            <br />
            <button
              style={{ marginTop: "2em" }}
              onClick={this.onclickeconomy}
              className="cabin-select-button1"
            >
              Economy
            </button>
            <br />
            <button
              className="cabin-select-button2"
              onClick={this.onclickbusiness}
            >
              Business
            </button>
            <br />
            <button
              className="cabin-select-button3"
              onClick={this.onclickfirstclass}
            >
              First Class
            </button>
          </div>
          <div className="flight-search-button-div">
            <button
              className="update-search-button"
              onClick={this.onupdatesearch}
            >
              Update Search
            </button>
          </div>
        </>
      );
    } else if (this.state.tour) {
      content = <h1>This is tour component</h1>;
    } else if (this.state.hotel) {
      content = <h1>This is hotel component</h1>;
    } else if (this.state.visa) {
      content = <h1>This is visa component</h1>;
    }
    let searcheddivs = this.state.search.map((data) => {
      return (
        <div className="searched-divs-items">
          <div>Hi</div>
          <div className="item-2"><span style={{marginRight:"8em",fontSize:"15px"}}>{data.CityCode}&nbsp;{data.CityName}</span><span style={{marginRight:"8em",fontSize:"15px"}}>-&emsp;&emsp;{data.Layover}&emsp;&emsp;-</span><span style={{fontSize:"15px"}}>{data.ToCityCode}&nbsp;{data.ToCityName}</span></div>
          <div className="item-3"><span style={{fontWeight:"620",fontSize:"23px",marginRight:"6.3em"}}>{data.DepartTime}</span><span style={{fontWeight:"bold",fontSize:"15px",marginRight:"8.2em"}}>{data.JourneyTime}</span><span style={{fontWeight:"620",fontSize:"23px"}}>{data.ArrivalTime}</span><button>Book Now</button></div>
          <div><span>{data.Layover}</span></div>
        </div>
      );
    });
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
        <div className="result-container">{searcheddivs}</div>
      </>
    );
  }
}
export default SearchedFlights;
