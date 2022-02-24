import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Odometer from "react-odometerjs";
import numeral from "numeral";
import CustomTooltip from "../charts/custom_tooltip";

class PortfoLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cashBalance: null, // null to string
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleHover(e) {
    if (e.activePayload && this.props.data) {
      this.setState({
        cashBalance: e.activePayload[0].payload.cash_balance,
      });
    }
  }

  handleMouseLeave(e) {
    this.setState({
      cashBalance: null,
    });
  }

  render() {
    const { data } = this.props;
    if (!data) {
      return <div></div>;
    } else {
      const cashBalance = data[data.length - 1].cash_balance;
      return (
        <div className='stock-graph'>
          <div className='odometer'>
            $
            <Odometer
              value={
                !this.state.cashBalance
                  ? cashBalance.toFixed(2)
                  : this.state.cashBalance.toFixed(2)
              }
              format='(,ddd).dd'
            />
          </div>
          {/* <ResponsiveContainer id="responsive-container"> */}
          <LineChart
            // id="stock-line-chart"
            width={676}
            height={361}
            data={this.props.data}
            margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            onMouseMove={this.handleHover}
            onMouseLeave={this.handleMouseLeave}>
            <XAxis tickLine={false} dataKey='label' hide={true} />
            <YAxis hide={true} domain={["auto", "dataMax + 400"]} />
            <Tooltip
              isAnimationActive={false}
              content={<CustomTooltip />}
              offset={2}
              position={{ y: 20 }}
            />
            <Line
              type='monotone'
              dataKey='cash_balance'
              stroke='#add5ff'
              strokeWidth={2}
              dot={false}
              connectNulls={true}
            />
          </LineChart>
          {/* </ResponsiveContainer> */}
        </div>
      );
    }
  }
}

export default PortfoLineChart;
