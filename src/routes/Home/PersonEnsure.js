import React, { Component } from 'react'
import { classNames, moment, dealInterval, _ } from '@utils'
import { Table, Mixin } from '@components'
import { SCROLLX } from '@constants'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class View extends Component {
  startInit = () => {
    this.getPersonalEnsure()
  }

  getPersonalEnsure = () => {
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getPersonalEnsure`
    }).then((res) => {
        dealInterval(() => {
          this.getPersonalEnsure()
        })
      }
    )
  }

  render() {
    const { model: { personalEnsures, userInfo }, dispatch, modelName } = this.props
    const columns = [
      {
        title: '合约',
        dataIndex: 'market',
      },
      {
        title: '类型',
        dataIndex: 'type',
        //render: (value, record) => record.side === '1' ? '卖出' : '买入'
      },
      {
        title: '杠杆倍数',
        dataIndex: 'sex',
        // render: (value, record) => ''
      },
      {
        title: '数量(张)',
        dataIndex: 'amount',
      },
      {
        title: '委托价格',
        dataIndex: 'price',
      },
      {
        title: '成交数量(张)',
        dataIndex: 'amount',
       // render: (value, record) => value - record.left
      },
      {
        title: '成交均价',
        dataIndex: 'work',
      },
      {
        title: '委托占用保证金',
        dataIndex: 'work',
      },
      {
        title: '手续费',
        dataIndex: 'taker_fee',
      },
      {
        title: '委托时间',
        dataIndex: 'ctime',
        // render: (value) => value ? moment.formatHMS(String(value).split('.')[0] * 1000) : null
      },
      {
        title: '状态',
        dataIndex: 'amount',
        // render: (value, record) => value && value === record.left ? '等待成交' : (value ? '部分成交' : null)
      },
      {
        title: '操作',
        dataIndex: 'amount',
        render: (value, record) => {
          return (
            <span onClick={() => {
              dispatch({
                type: `${modelName}/doCancelPersonEnsure`,
                payload: {
                  market: record.market,
                  orderId: record.orderId
                }
              })
            }
            } ><a >撤销</a ></span >
          )
        }
      },
    ]
    const dataSource = personalEnsures
    const tableProp = {
      className: styles.tableContainer,
      columns,
      dataSource: _.merge((new Array(4)).fill(), dataSource),
      scroll: {
        x: SCROLLX.X
      }
    }
    return (
      <Mixin.Child that={this} >
        <div
          className={
            classNames(
              {
                view: true
              },
              styles.PersonEnsure
            )
          }
        >
          <ScrollPannel
            header={
              <div >活跃委托</div >
            }
          >
            <Table  {...tableProp} />

          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

