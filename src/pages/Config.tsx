import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../redux/modules'
import {
  State as WalletState,
  WALLET_STATUS,
  loadWallet
} from '../redux/modules/chamberWallet/wallet'
import Layout from '../components/Layout'
import QRSection from '../components/config/QRSection'
import { FONT_SIZE } from '../constants/size'

interface StateProps {
  wallet: WalletState
}

interface DispatchProps {
  loadWallet: () => void
}

class Config extends React.Component<StateProps & DispatchProps> {
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
          <QRSection walletRef={wallet.ref} />
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
)(Config)
