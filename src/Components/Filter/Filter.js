import { Component } from "react";

class Filter extends Component {
  state = {
    currentFilterValue: this.props.initialValue || ""
  };

  setFilterValue = newValue => {
    this.setState({
      currentFilterValue: newValue
    });
  };

  render() {
    const { render } = this.props;
    const { currentFilterValue } = this.state;
    const setFilterValue = this.setFilterValue;

    return render({ currentFilterValue, setFilterValue });
  }
}

export default Filter;
