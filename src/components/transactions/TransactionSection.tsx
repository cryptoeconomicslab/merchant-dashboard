import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../redux/modules'
import { State as WalletState } from '../../redux/modules/chamberWallet/wallet'
import TransactionItem from './TransactionItem'

interface StateProps {
  wallet: WalletState
}

class TransactionSection extends React.Component<StateProps> {
  public render() {
    const { wallet } = this.props
    return (
      <div>
        <h2>Transactions</h2>
        {wallet.txs.map(tx => (
          <TransactionItem key={tx.hash()} tx={tx} />
        ))}
      </div>
    )
  }
}

export default connect((state: AppState) => ({
  wallet: state.chamberWallet.wallet
}))(TransactionSection)
