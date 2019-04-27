import * as React from 'react';
import { EChart } from '../EChart';

const styles = require('./RPMGaugeChart.css');

export class RPMGaugeChart extends React.PureComponent {
  getRPMChart = () => {
    return {
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      series: [
        {
          name: 'RPM',
          title: { offsetCenter: [0, '-40%'], color: '#818181', fontSize: 10 },
          type: 'gauge',
          min: 0,
          max: 10,
          detail: {
            formatter: (params: number) => params * 1000,
            offsetCenter: [0, '45%'],
            color: '#818181',
            fontSize: 16
          },
          pointer: {
            width: 5,
            length: '90%'
          },
          axisLine: {
            lineStyle: {
              width: 5
            }
          },
          splitLine: { length: 5 },
          itemStyle: {
            color: '#f8614e'
          },
          data: [{ value: 3.2, name: 'x1000' }]
        }
      ]
    };
  };

  render() {
    return (
      <div className={styles.chartWrapper}>
        <span className={styles.title}>Engine RPM</span>
        <div className={styles.gaugeWrapper}>
          <EChart option={this.getRPMChart()} height={'30vh'} />
        </div>
      </div>
    );
  }
}
