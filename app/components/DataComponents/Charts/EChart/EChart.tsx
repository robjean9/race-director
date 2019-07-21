import * as React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Props, EchartStyle } from './types';

import styles from './EChart.css';

export class EChart extends React.PureComponent<Props> {
  render() {
    const { option, height = '20vh', width } = this.props;

    const style: EchartStyle = { height, width };

    return (
      <ReactEcharts style={style} option={option} className={styles.echart} />
    );
  }
}
