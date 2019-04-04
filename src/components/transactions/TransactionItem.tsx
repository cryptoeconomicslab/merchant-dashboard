import * as React from 'react'
import {
  SignedTransaction,
  SignedTransactionWithProof,
  SplitTransaction
} from '@layer2/core'
import { FONT_SIZE, PADDING, BORDER, RADIUS } from '../../constants/size'
import colors from '../../constants/colors'
import { UserAction } from '@layer2/wallet/dist/models'

interface SentTx {
  tx: SignedTransaction | SignedTransactionWithProof
  isFast: boolean
  time: Date
}

const TransactionItem = ({ value }: { value: SentTx | UserAction }) => {
  const { tx, isFast, time } = value as SentTx
  let from: string
  let amount: number
  let isWithProof: boolean = false
  let timestamp = time

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
    from = (value as UserAction).address
    amount = (value as UserAction).amount
    isWithProof = true

    timestamp = timestamp
      ? new Date((value as UserAction).timestamp)
      : undefined
  }

  console.log(value)

  return (
    <div className="container">
      <div className="heading">
        {isWithProof ? (
          <span className="tag success">With Proof</span>
        ) : (
          <span className="tag warn">Without Proof</span>
        )}
        {timestamp && (
          <span className="timestamp">{timestamp.toISOString()}</span>
        )}
      </div>
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

        .heading {
          display: flex;
          justify-content: space-between;
        }

        .timestamp {
          font-size: ${FONT_SIZE.MEDIUM};
          color: ${colors.TEXT_MAIN};
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
