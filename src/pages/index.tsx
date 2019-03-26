import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../redux/modules'
import WalletCard from '../components/wallet/WalletCard'
import CreateWalletSection from '../components/wallet/CreateWalletSection'
import {
  State as WalletState,
  WALLET_STATUS,
  loadWallet
} from '../redux/modules/chamberWallet/wallet'
import Layout from '../components/Layout'
import { FONT_SIZE } from '../constants/size'

interface StateProps {
  wallet: WalletState
}

interface DispatchProps {
  loadWallet: () => void
}

class App extends React.Component<StateProps & DispatchProps> {
  public componentDidMount() {
    // TODO: subscribe receive event
    const { wallet, loadWallet } = this.props
    if (wallet.status === WALLET_STATUS.INITIAL) {
      loadWallet()
    }
  }

  public render() {
    const { wallet } = this.props

    return (
      <Layout title="Wallet">
        {/* wallet status condition */
        wallet.status === WALLET_STATUS.INITIAL ||
        wallet.status === WALLET_STATUS.LOADING ? (
          <div>LOADING...</div>
        ) : wallet.status === WALLET_STATUS.LOADED ? (
          <WalletCard walletName="Chamber Wallet" />
        ) : wallet.status === WALLET_STATUS.NO_WALLET ? (
          <CreateWalletSection />
        ) : wallet.status === WALLET_STATUS.ERROR ? (
          <div>{wallet.error.message}</div>
        ) : null}
        <style jsx>{`
          .title {
            font-size: ${FONT_SIZE.LARGE};
            padding: 1.2rem;
          }
        `}</style>
      </Layout>
    )
  }
}

export default connect(
  (state: AppState) => ({
    wallet: state.chamberWallet.wallet
  }),
  { loadWallet }
)(App)
