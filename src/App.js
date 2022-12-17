import "./App.css";
import { Component } from "react";
import FlightSearch from "./components/FlightSearch";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchedFlights from "./components/SearchedFlights";
class App extends Component {
  state={
    test:"ok",
    data:{}
  }
  onprathamhandler=(mydata)=>{
    this.setState({data:mydata})
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FlightSearch onclick={(name)=>this.onprathamhandler(name)}/>} />
            <Route path="/flightsearched" element={<SearchedFlights data={this.state.data}/>} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
