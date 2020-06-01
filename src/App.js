import React, { Component } from "react";
import { grey600 } from "material-ui/styles/colors";
import styles from "./style";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ActionHome from "material-ui/svg-icons/action/home";
import ActionFlightTakeoff from "material-ui/svg-icons/action/flight-takeoff";
import FileCloudDownload from "material-ui/svg-icons/file/cloud-download";
import BottomSheet from "./BottomSheet";

class App extends Component {
	constructor(props){
		super(props)
		this.bottomSheetRef = React.createRef();

		this.items = [
			{
			  text: "Home",
			  icon: <ActionHome />,
			  onClick: toggleAnimation => {
				alert("Home");
				toggleAnimation();
			  }
			},
			{
			  text: "Flight",
			  icon: <ActionFlightTakeoff />,
			  onClick: () => alert("Flight")
			},
			{
			  text: "Cloud",
			  icon: <FileCloudDownload />,
			  onClick: () => alert("Cloud")
			}
		  ];
	}
	
	getView = () => {
		return(<div>
			{this.items.map((item, index) => {
					  return (
						<li key={index}>
						  <button
							onClick={e => {
							  e.stopPropagation();
							  item.onClick.call(this, this.bottomSheetRef.current.animate);// bottomSheetRef.current
							}}
							style={styles.button}
						  >
							{React.cloneElement(item.icon, {
							  style: {
								marginRight: "36px",
								color: grey600
							  }
							})}
							<span style={styles.text}>{item.text}</span>
						  </button>
						</li>
					  );
					})}
		</div>)
	}

  componentWillMount() {
    
  }

  render(){
	return (<MuiThemeProvider>
		<BottomSheet
		  ref={this.bottomSheetRef}
		  items={this.items}
		  startHidden={false}
		  buttonElement={
			<button
			  style={{
				margin: "20px auto",
				display: "block",
				backgroundColor: "cadetblue",
				border: "none",
				padding: "16px 24px",
				color: "#fff",
				fontWeight: "bold",
				cursor: "pointer",
				borderRadius: 6,
				fontSize: "20px",
				fontFamily: "'Pangolin', cursive"
			  }}
			>
			  Click me
			</button>
		  }
		> {this.getView()}
		</BottomSheet>
	  </MuiThemeProvider>)
  }
}

export default App