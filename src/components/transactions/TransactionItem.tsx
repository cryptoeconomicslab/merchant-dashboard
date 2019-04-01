import * as React from 'react'
import {
  SignedTransaction,
  SignedTransactionWithProof,
  SplitTransaction
} from '@layer2/core'
import { FONT_SIZE, PADDING, BORDER } from '../../constants/size'
import colors from '../../constants/colors'

const TransactionItem = ({
  tx,
  isFast
}: {
  tx: SignedTransaction | SignedTransactionWithProof
  isFast: boolean
}) => {
  console.info(tx, isFast)

  if (tx instanceof SignedTransaction) {
    const tx0 = tx.txs[0]
    const from: string = tx0 instanceof SplitTransaction ? tx0.from : 'NOWHERE'
    const segment = tx0.getSegments()[0]
    const amount = segment.end.toNumber() - segment.start.toNumber()

    return (
      <div className="container">
        <div>
          <label>From</label>
          <p className="value">{from}</p>
        </div>
        <div>
          <label>Amount</label>
          <p className="value">{amount}</p>
        </div>
        <style jsx>{`
          .container {
            padding: ${PADDING.MEDIUM};
            border: solid ${BORDER.THIN} ${colors.BORDER_COLOR_LIGHT};
          }

          label {
            font-size: ${FONT_SIZE.TINY};
            font-weight: bold;
          }
        `}</style>
      </div>
    )
  } else if (tx instanceof SignedTransactionWithProof) {
    const segment = tx.getOutput().getSegment(0)
    const amount = segment.end.toNumber() - segment.start.toNumber()

    return <div>{amount}</div>
  }

  return null
  // TODO:
}

export default TransactionItem
