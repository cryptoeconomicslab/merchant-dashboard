import * as React from 'react'
import { SignedTransaction, SignedTransactionWithProof } from '@layer2/core'

const TransactionItem = ({
  tx
}: {
  tx: SignedTransaction | SignedTransactionWithProof
}) => {
  // TODO:
  // const segment = tx.getOutput()
  // const amount = segment.end.toNumber() - segment.start.toNumber()
  return <div>{JSON.stringify(tx)}</div>
}

export default TransactionItem
