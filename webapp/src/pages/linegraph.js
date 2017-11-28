import React, { Component } from 'react';
//import '../styling/linegraph.css';
//import '../styling/linegraph.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries,LineSeries} from 'react-vis';
import '../react-vis/dist/style.css';

const linegraph=()=>(
<XYPlot
  width={300}
  height={300}
  color="red"
  background="black"
  >
  <LineMarkSeries
  color="red"
    data={[
      {x: 1, y: 10},
      {x: 2, y: 5},
      {x: 3, y: 15},
      {x: 7, y: 8}
    ]}
    />
  <XAxis title="X" />
  <YAxis title="Y" />
</XYPlot>
)

export default linegraph

