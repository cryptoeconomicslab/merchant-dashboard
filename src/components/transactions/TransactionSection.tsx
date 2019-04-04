import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../redux/modules'
import { State as WalletState } from '../../redux/modules/chamberWallet/wallet'
import TransactionItem from './TransactionItem'

interface StateProps {
  wallet: WalletState
}

class TransactionSection extends React.Component<StateProps> {
  public async componentDidMount() {
    const { ref } = this.props.wallet

    ref.init()
    ref.on('updated', this.onUpdate)
  }

  public componentWillUnmount() {
    const { ref } = this.props.wallet
    ref.off('updated', this.onUpdate)
  }

  public render() {
    const { wallet } = this.props
    return (
      <div>
        <h2>Transactions</h2>
        {wallet.txs.map((value, i) => (
          <TransactionItem key={i} value={value} />
        ))}
      </div>
    )
  }

  private onUpdate = async () => {
    const { ref } = this.props.wallet
    await ref.syncChildChain()
    this.forceUpdate()
  }
}

export default connect((state: AppState) => ({
  wallet: state.chamberWallet.wallet
}))(TransactionSection)
