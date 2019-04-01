import * as React from 'react'
import {
  SignedTransaction,
  SignedTransactionWithProof,
  SplitTransaction
} from '@layer2/core'
import { FONT_SIZE, PADDING, BORDER, RADIUS } from '../../constants/size'
import colors from '../../constants/colors'

const TransactionItem = ({
  tx,
  isFast
}: {
  tx: SignedTransaction | SignedTransactionWithProof
  isFast: boolean
}) => {
  console.info(tx, isFast)

  let from: string
  let amount: number
  let isWithProof: boolean = false
  if (tx instanceof SignedTransaction) {
    const tx0 = tx.txs[0]
    from = tx0 instanceof SplitTransaction ? tx0.from : 'NOWHERE' // TODO: implement other tx
    const segment = tx0.getSegments()[0]
    amount = segment.end.toNumber() - segment.start.toNumber()
  } else if (tx instanceof SignedTransactionWithProof) {
    const tx0 = tx.signedTx.txs[0]
    from = tx0 instanceof SplitTransaction ? tx0.from : 'NOWHERE' // TODO: implement other tx
    const segment = tx.getOutput().getSegment(0)
    amount = segment.end.toNumber() - segment.start.toNumber()
    isWithProof = true
  } else {
    // TODO: implement other
    from = 'nowhere'
    amount = 0
  }

  return (
    <div className="container">
      {isWithProof ? (
        <span className="tag success">With Proof</span>
      ) : (
        <span className="tag warn">Without Proof</span>
      )}
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

        .tag {
          padding: ${PADDING.TINY};
          font-size: ${FONT_SIZE.TINY};
          border: solid 2px ${isWithProof ? 'green' : 'orange'};
          border-radius: ${RADIUS.NORMAL};
          color: ${isWithProof ? 'green' : 'orange'};
        }
      `}</style>
    </div>
  )
}

export default TransactionItem
