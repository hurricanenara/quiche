import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import CustomTooltip from "../charts/custom_tooltip";
import Odometer from "react-odometerjs";
import Spinner from "../ui/Spinner";

class AssetLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closePrice: null,
      loading: true,
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleHover(e) {
    if (e.activePayload && this.props.data) {
      this.setState({
        closePrice: e.activePayload[0].payload.close,
      });
    }
  }

  handleMouseLeave(e) {
    this.setState({
      closePrice: null,
    });
  }

  render() {
    const { data, closePrice, range } = this.props;
    if (!data) {
      <div>
        <Spinner type='Loader' />
      </div>;
    } else if (!data.every((data) => data.marketClose !== null)) {
      <div>
        There was a problem fetching data from IEX Cloud. Please try again.
      </div>;
    }

    return (
      <div className='stock-graph'>
        <div className='odometer'>
          $
          <Odometer
            value={
              closePrice
                ? closePrice?.toFixed(2)
                : this.state.closePrice?.toFixed(2)
            }
            format='(,ddd).dd'
          />
        </div>
        {/* <ResponsiveContainer id="responsive-container"> */}
        <LineChart
          width={676}
          height={361}
          data={this.props.data}
          margin={{ top: 50, right: 30, left: 20, bottom: 50 }}
          onMouseMove={this.handleHover}
          onMouseLeave={this.handleMouseLeave}>
          <XAxis tickLine={false} dataKey='label' hide={true} />
          <YAxis hide={true} domain={["dataMin", "dataMax"]} />
          <Tooltip
            content={<CustomTooltip />}
            isAnimationActive={false}
            range={range}
            offset={2}
            position={{ y: 20 }}
            // coordinate={{y: 1}}
          />
          <ReferenceLine
            y={this.props.prevClose}
            label=''
            stroke='#bdecb6'
            strokeDasharray='2 2'
            strokeWidth='2'
          />
          <Line
            type='monotone'
            dataKey='close'
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

export default AssetLineChart;
