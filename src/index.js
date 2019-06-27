import Scatter from './components/heat-map'
import React from 'react'
import ReactDOM from 'react-dom'
import HeatMap from './components/heat-map';

looker.plugins.visualizations.add({
  options: {
    color: {
      type: "array",
      label: "Color",
      display: "color",
      default: ["#5b5d9a"]
    }
  },
  // Looker runs this function first
  create: function(element, config) {
    element.innerHTML = `
      <style>
        .heat-map {
          width: 100%;
          height: 100%;
        }
        .highcharts-container {
        }
      </style>
    `;

    var container = element.appendChild(document.createElement("div"));
    container.className = "heat-map";

    this._textElement = container.appendChild(document.createElement("div"));

    // I don't know what this does to be honest
    this.heatMap = ReactDOM.render(
      <HeatMap
        done={false}
      />
     ,this._textElement
    );

  },
  // Called when state changes
  updateAsync: function(data, element, config, queryResponse, details, done) {

    this.clearErrors();

    if (queryResponse.fields.dimensions.length < 3) {
      this.addError({title: "Not Enough Dimensions", message: "This Visualization requires 3 dimensions."});
      return;
    }

    // console.log(data);

    this.heatMap = ReactDOM.render(
      <HeatMap
        key="heat_map"
        config={config}
        data={data}
        done={done}
        queryResponse={queryResponse}
      />,
      this._textElement
    );

    done()
  }
});
