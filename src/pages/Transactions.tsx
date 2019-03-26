import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../redux/modules'
import {
  State as WalletState,
  WALLET_STATUS,
  loadWallet
} from '../redux/modules/chamberWallet/wallet'
import CreateWalletSection from '../components/wallet/CreateWalletSection'
import Layout from '../components/Layout'
import TransactionSection from '../components/transactions/TransactionSection'

interface StateProps {
  wallet: WalletState
}

interface DispatchProps {
  loadWallet: () => void
}

class Transactions extends React.Component<StateProps & DispatchProps> {
  public componentDidMount() {
    const { wallet, loadWallet } = this.props
    if (wallet.status === WALLET_STATUS.INITIAL) {
      loadWallet()
    }
  }

  public render() {
    const { wallet } = this.props
    return (
      <Layout>
        {/* wallet status condition */
        wallet.status === WALLET_STATUS.INITIAL ||
        wallet.status === WALLET_STATUS.LOADING ? (
          <div>LOADING...</div>
        ) : wallet.status === WALLET_STATUS.LOADED ? (
          <TransactionSection />
        ) : wallet.status === WALLET_STATUS.NO_WALLET ? (
          <CreateWalletSection />
        ) : wallet.status === WALLET_STATUS.ERROR ? (
          <div>{wallet.error.message}</div>
        ) : null}
      </Layout>
    )
  }
}

export default connect(
  (state: AppState) => ({
    wallet: state.chamberWallet.wallet
  }),
  { loadWallet }
)(Transactions)
