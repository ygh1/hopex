import React, { Component } from 'react'
import { connect } from 'dva'
import { Mixin, ShowJsonTip } from '@components'
import LatestRecord from './LatestRecord'
import TradeChart from './TradeChart'
import EnsureRecord from './EnsureRecord'
import styles from './index.less'

const Comp = {
  LatestRecord,
  TradeChart,
  EnsureRecord
}
@connect(({ home: model, theme, loading, dispatch }) => ({
  model,
  theme
}))
export default class View extends Component {
  startInit() {
    console.log('父组件')
  }

  renderView = (name) => {
    const props = this.props
    const RenderItem = Comp[name]
    return <RenderItem {...props} />
  }

  render() {
    const { renderView } = this
    return (
      <Mixin {...{ that: this }}>
        <ShowJsonTip data={this.props.model} ></ShowJsonTip >
        <div className={styles.views} >
          {
            renderView('LatestRecord')
          }
          {
            renderView('TradeChart')
          }
          {
            renderView('EnsureRecord')
          }
        </div >

      </Mixin >
    )
  }
}

