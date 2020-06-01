import React, { Component, forwardRef } from "react";
import { Motion, spring } from "react-motion";
import styles from "./style";

class BottomSheet extends Component {
  state = {
    opacity: 0,
    translate: 100,
    display: "hidden"
  };

  componentWillMount() {
    if (this.props.startHidden === false) {
      setTimeout(() => {
		this.setState({
			opacity: 0.5,
			translate: 0,
			display: "visible"
		  });
	  }, 200);
    }
  }

  animate = () => {
    this.setState(
      {
        opacity: this.state.opacity === 0.5 ? 0 : 0.5,
        translate: this.state.opacity === 0 ? 0 : 100
      },
      () => {
        if (this.state.opacity === 0) {
          setTimeout(() => {
            this.setState({
              display: "hidden"
            });
          }, 200);
        } else {
          this.setState({
            display: "visible"
          });
        }
      }
    );
  };

  render() {
    return (
      <div>
        {React.cloneElement(this.props.buttonElement, {
          onClick: this.animate
        })}
        <Motion
          style={{
            opacity: spring(this.state.opacity),
            translate: spring(this.state.translate)
          }}
        >
          {({ opacity, translate }) => (
            <div
              style={Object.assign({}, styles.container, {
                visibility: this.state.display
              })}
              onClick={this.animate}
            >
              <div
                style={Object.assign({}, styles.backgroundContainer, {
                  opacity: opacity
                })}
              />
              <ul
                style={Object.assign({}, styles.list, {
                  transform: `translateY(${translate}%)`
                })}
              >
                {this.props.children}
              </ul>
            </div>
          )}
        </Motion>
      </div>
    );
  }
}

export default BottomSheet

