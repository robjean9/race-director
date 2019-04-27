import * as React from 'react';
import { Props } from './types';
import ReactEcharts from 'echarts-for-react';

const styles = require('./SingleBarChart.css');

export class SingleBarChart extends React.PureComponent<Props> {
  getSingleBarChart = () => {
    const { value, maxValue } = this.props;
    return {
      xAxis: {
        type: 'category',
        data: ['Mon']
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: maxValue
      },
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      series: {
        label: {
          show: true
        },
        barGap: '0%',
        barCategoryGap: '0%',
        data: [value],
        type: 'bar'
      }
    };
  };

  render() {
    const { title } = this.props;
    return (
      <div>
        <span className={styles.title}>{title}</span>
        <ReactEcharts
          style={{ width: '5vw', height: '25vh' }}
          option={this.getSingleBarChart()}
        />
      </div>
    );
  }
}
