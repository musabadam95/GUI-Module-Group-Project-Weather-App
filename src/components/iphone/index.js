// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import NavButton from '../nav_button';
import style_iphoneNav from '../nav_button/style_iphoneNav';
   
   function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.display === 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
   }


export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/e3a94b55f3a41aa8/conditions/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
		// document.getElementById("eggs").style.display = 'none';
		document.getElementById('top').style.display = 'block';
		document.getElementById('bot').style.display = 'block';
		document.getElementById('nav').style.display = 'block';
		document.getElementById('button').style.display = 'block';
		document.getElementById('toppest').style.display = 'block';	
		toggle_visibility("toppest");
	}
	
	changeWeatherData = (ends) => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = `http://api.wunderground.com/api/e3a94b55f3a41aa8/conditions/q/UK/${ends}.json`;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
		// document.getElementById("eggs").style.display = 'none';
		document.getElementById('top').style.display = 'block';
		document.getElementById('bot').style.display = 'block';
		document.getElementById('nav').style.display = 'block';
		document.getElementById("demo").innerHTML = "Good day";
	}
	
	recommendFunction=(parsed_json)=> {
		var temp= parseInt(parsed_json['current_observation']['temp_c']);
		document.write(temp);
   	 	
   	 }
    
    }
	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container }>
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData } /> : null }
				</div>
				
				<div id="top" class={style.TopCard}>
				<div id="toppest" class= {style.ToppestCard}>
					Location <input type="text" id="me"/>
					<button onClick={() => this.changeWeatherData(document.getElementById("me").value)}>Show</button> 
				</div>
					<div class={ style.header }>
						<div class={ style.city }>{ this.state.locate }</div>
						<div class={ style.country }>{ this.state.ends }</div>
						<span id="temp" class={ tempStyles }>{ this.state.temp }</span>
						<div class={ style.conditions }>{ this.state.cond }</div>
					</div>
				</div>
				<div id="bot" class={style.BottomCard} >
					<div class={ style.header }>
						<div class={ style.recommendationsTitle }>Recommendations</div>
						<div class={ style.recommendations } >	
							<ul>	
								<li>Abdooooollah</li>
								<li>Raheeeeeeeeeeeeeem</li>
								<li>Shazzy d</li>
								<li>Sinyin</li>
								<li>Moooooooooooosab</li>
								<li>{this.recommendFunction(parsed_json)} </li>
								<li>	</li>
							</ul>
						</div>
					</div>
				</div>
				<div id="nav" class={style.NavigationBar} >
					<ul>
					<li><a onClick={() => this.changeWeatherData("Stepney")}>Stepney</a></li>
					<li><a onClick={() => this.changeWeatherData("Whitechapel")}>Whitechapel</a></li>
					<li><a onClick={() => this.changeWeatherData("Mile End")}>Mile End</a></li>
					<li><a onClick={() => this.changeWeatherData("Bow")}>Bow</a></li>
					</ul>
					
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var place = parsed_json['current_observation']['display_location']['country'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			ends: place,
			temp: temp_c,
			cond : conditions
		});      
	}
	
	secondparseResponse = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var place = parsed_json['current_observation']['display_location']['country'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];
		recommendFunction(location);
	}
}
