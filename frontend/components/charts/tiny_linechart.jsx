import React from "react";
import { LineChart, Line, XAxis, YAxis, ReferenceLine } from "recharts";
import Spinner from "../ui/Spinner";

class TinyLineChart extends React.Component {
  chopData(dataArr, mod) {
    let chopped = [];
    dataArr.forEach((data, i) => {
      if (i % mod === 0) {
        chopped.push(data);
      }
    });
    return chopped;
  }

  render() {
    const { data } = this.props;
    let interval = {};
    if (!data) {
      return (
        <div>
          <Spinner type='Skinny-loader' />
        </div>
      );
    } else {
      if (data && !data[0]) {
        return <div>error</div>;
      }

      return (
        <LineChart width={60} height={30} data={this.chopData(data, 2)}>
          <XAxis tickLine={false} dataKey='label' hide={true} />
          <YAxis hide={true} domain={["dataMin", "dataMax"]} />
          <ReferenceLine
            y={this.props.prevClose}
            label=''
            stroke='grey'
            strokeDasharray='2 2'
          />
          <Line
            type='linear'
            dataKey='close'
            stroke={
              data[0].close - data[data.length - 1].close < 0
                ? "#bdecb6"
                : "#facbd1"
            }
            strokeWidth={1}
            dot={false}
            connectNulls={true}
          />
        </LineChart>
      );
    }
  }
}

export default TinyLineChart;
