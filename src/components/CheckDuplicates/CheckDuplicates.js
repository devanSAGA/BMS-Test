import React, { Component } from "react";

class CheckDuplicates extends Component {
  state = {
    input: "",
    duplicateEnteries: [],
    enteries: [],
    error: ""
  };

  changeInput = event => {
    let value = event.target.value;
    this.setState({
      input: value
    });
  };

  addEntry = () => {
    let inputString = this.state.input.trim();
    let inputValues = inputString.split(",");

    let isInvalidInputFound = false;
    let newEntries = [];

    for (let input of inputValues) {
      let trimmedInput = input.trim();
      if (this.validateInput(trimmedInput)) {
        let hasRange = trimmedInput.includes("-") ? true : false;
        if (hasRange) {
          let [lowerLimit, upperLimit] = trimmedInput.split("-");
          lowerLimit = parseInt(lowerLimit);
          upperLimit = parseInt(upperLimit);
          for (let start = lowerLimit; start <= upperLimit; start++) {
            newEntries.push(start);
          }
        } else {
          newEntries.push(parseInt(trimmedInput));
        }
      } else {
        isInvalidInputFound = true;
        break;
      }
    }

    if (!isInvalidInputFound) {
      this.processEntry(newEntries);
    }

    this.setState({
      input: ""
    });
  };

  processEntry = newEntries => {
    let { enteries, duplicateEnteries } = this.state;
    for (let entry of newEntries) {
      if (!enteries.includes(entry)) {
        enteries = [...enteries, entry];
      } else {
        if (!duplicateEnteries.includes(entry)) {
          duplicateEnteries = [...duplicateEnteries, entry];
        }
      }
    }
    enteries.sort((a, b) => (a < b ? -1 : 1));
    duplicateEnteries.sort((a, b) => (a < b ? -1 : 1));

    this.setState({
      enteries,
      duplicateEnteries
    });
  };

  validateInput = input => {
    let isInputValid = true;
    let error = "";

    if (input.includes("-")) {
      const rangeInputs = input.split("-");
      if (rangeInputs.length !== 2) {
        error =
          "Please enter valid Range. it should be in the format number1-number2";
      } else if (isNaN(rangeInputs[0]) || isNaN(rangeInputs[1])) {
        error = "Please enter number as input.";
      } else if (parseInt(rangeInputs[0]) > parseInt(rangeInputs[1])) {
        error = "Please add valid Range.";
      }
    } else if (isNaN(input)) {
      error = "Please enter number as input.";
    }

    if (error) {
      isInputValid = false;
    }
    this.setState({
      error
    });
    return isInputValid;
  };

  render() {
    const { input, duplicateEnteries, enteries, error } = this.state;
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Enter a Number"
            value={input}
            onChange={this.changeInput}
          />
          <button onClick={this.addEntry}>Add</button>
        </div>
        {error ? <div>{error}</div> : null}
        <ul>
          Note:
          <li>You can add single entry</li>
          <li>
            You can enter comma seperated multiple enteries (for example
            10,20,30)
          </li>
          <li>You can enter a range of numbers too (for example 10-25).</li>
        </ul>
        <div>
          <div>{enteries.length ? enteries.join(",") : "No Entry Added."}</div>
          <div>
            {duplicateEnteries.length
              ? duplicateEnteries.join(",")
              : "No Duplicate Entry"}
          </div>
        </div>
      </div>
    );
  }
}

export default CheckDuplicates;
