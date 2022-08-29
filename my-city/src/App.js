import React from 'react';
import axios from 'axios';

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      display_name : '',
      lat : '',
      lon : '',
      errFlag : false,
      mapFlag : false
    }
  }
  
  getLocationData = async (event) => {
    event.preventDefault();
    const cityName = event.target.city.value;
    //send request to the third party
    const key = 'pk.7aedc85ff3620b0d3b6865ccab5efd25';
    const URL = `https://us1.locationiq.com/v1/search?key=${key}&q=${cityName}&format=json`
    
    try 
    {
      let resResult = await axios.get(URL);
      this.setState({
        display_name : resResult.data[0].display_name,
        lat : resResult.data[0].lat,
        lon : resResult.data[0].lon,
        mapFlag : true
      })
    }
    catch
    {
      console.log('err');
      this.setState({
        errFlag : true
      })
    }

    
    

  }
  render(){
    return(
      <div>
        <h1>Location App</h1>
        <form onSubmit={this.getLocationData}>
          <input type="text" name="city" placeholder='Enter a city'/>
          <button type='submit'>Submit</button>
        </form>

        <h3>Display name : {this.state.display_name}</h3>
        <p>Lon : {this.state.lon}</p>
        <p>Lat : {this.state.lat}</p>

        {this.state.mapFlag && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.7aedc85ff3620b0d3b6865ccab5efd25&center=${this.state.lat},${this.state.lon}`}></img>}
        {this.state.errFlag && <h4>Error : sorry something went wrong!</h4>}
        
      </div>
    )
  }
}
export default App;