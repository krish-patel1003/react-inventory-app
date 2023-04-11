import React from "react";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount(){
    console.log("mounted!");
  }

  componentDidUpdate() {
    console.log("updated");
  }

  componentWillUnmount(){
    console.log("cleanUP!");
  }

  clickPressed() {
    this.setState({
      count: this.state.count + 1,
    });
    console.log("clicked!");
    if(this.state.count > 5){
        this.props.destroy(false)
    }
  }

  render() {
    return (
      <div className="container">
        <p>Clicked: {this.state.count}</p>
        <button className="btn btn-primary" onClick={() => this.clickPressed()}>
          Click Me!
        </button>
      </div>
    );
  }
}

export default Test