import * as React from 'react'
import { SignedTransaction } from '@layer2/core'

const TransactionItem = ({ tx }: { tx: SignedTransaction }) => {
  const segment = tx.getSegments()[0]
  const amount = segment.end.toNumber() - segment.start.toNumber()
  return <div>{amount}</div>
}

export default TransactionItem
