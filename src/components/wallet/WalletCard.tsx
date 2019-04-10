import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../redux/modules'
import {
  DEPOSIT_STATUS,
  State as DepositState,
  deposit
} from '../../redux/modules/chamberWallet/deposit'
import {
  WALLET_STATUS,
  State as WalletState,
  changeToken
} from '../../redux/modules/chamberWallet/wallet'
import UTXOList from './UTXOList'
import TransferSection from './TransferSection'
import { Button, LoadingSpinner } from '../common'
import { FONT_SIZE, PADDING, BORDER, MARGIN } from '../../constants/size'
import colors from '../../constants/colors'
import { getTokenName, getTokenMinDigits } from '../../helpers/utils'

interface Props {
  walletName: string
}

interface StateProps {
  wallet: WalletState
  depositState: DepositState
}

interface DispatchProps {
  deposit: (amount: number) => void
  changeToken: (token: { address: string; id: number }) => void
}

interface State {
  depositAmount: number
}

class WalletCard extends React.Component<
  Props & StateProps & DispatchProps,
  State
> {
  public state = {
    depositAmount: 1
  }

  public async componentDidMount() {
    const { ref } = this.props.wallet

    await ref.init()
    await ref.syncChildChain()
    ref.on('updated', this.onUpdate)
    this.forceUpdate()
  }

  public componentWillUnmount() {
    const { ref } = this.props.wallet
    ref.off('updated', this.onUpdate)
  }

  public render() {
    const { walletName, wallet } = this.props
    if (wallet.status === WALLET_STATUS.INITIAL) {
      return <div>Wallet is not loaded. Please import.</div>
    }

    // Maybe no need this status
    if (wallet.status === WALLET_STATUS.LOADING) {
      return <div>Importing Wallet</div>
    }

    if (wallet.status === WALLET_STATUS.ERROR) {
      return <div>something went wrong. Please import wallet again</div>
    }

    const { ref } = wallet
    const tokenId = wallet.selectedToken.id
    const balance = ref.getBalance(tokenId)
    const depositStatus = this.props.depositState.status
    const utxos = ref.getUTXOArray()

    return (
      <main className="container">
        <section className="title-section">
          <div>
            <h2 className="wallet-title">{walletName}</h2>
            <p className="address">{ref.getAddress()}</p>
          </div>
          <div>
            <select onChange={this.handleChangeToken} value={tokenId}>
              {wallet.tokens.map(token => (
                <option key={token.id} value={token.id}>
                  {getTokenName(token.id)}
                </option>
              ))}
            </select>
          </div>
        </section>
        <section className="balance-section">
          {/* Balance section */}
          <h3 className="balance-title">Balance</h3>
          <div>
            <span className="balance-value">
              {getTokenMinDigits(tokenId, balance)}
              <span className="balance-unit">{getTokenName(tokenId)}</span>
            </span>
          </div>
        </section>
        {/* UTXOList section */}
        <UTXOList utxos={utxos} wallet={ref} />
        <section className="control-section">
          {/* Control section */}
          <h3 className="control-title">DEPOSIT</h3>
          <div className="deposit-control">
            <div>
              <select
                className="deposit-amount-select"
                onChange={this.handleChangeDepositAmount}
              >
                <option value={1}>1 ETH</option>
                <option value={2}>2 ETH</option>
                <option value={5}>5 ETH</option>
                <option value={10}>10 ETH</option>
              </select>
            </div>
            <div className="controls">
              <Button
                disabled={depositStatus === DEPOSIT_STATUS.LOADING}
                onClick={this.handleDeposit}
              >
                Deposit
              </Button>
              {depositStatus === DEPOSIT_STATUS.LOADING && (
                <LoadingSpinner size="medium" />
              )}
            </div>
          </div>
        </section>
        <TransferSection />
        <style jsx>{`
          .container {
            width: calc(100% - 2.4rem);
            height: 90vh;
            padding: 1.2rem;
            border-radius: 8px;
            margin: auto;
            overflow-y: scroll;
          }

          .title-section {
            border-bottom: solid ${BORDER.THICK} ${colors.BORDER_COLOR_LIGHT};
            padding-bottom: ${PADDING.TINY};
          }

          .wallet-title {
            font-size: ${FONT_SIZE.SEMI_LARGE};
            text-transform: uppercase;
          }

          .address {
            word-break: break-word;
          }

          .balance-section {
            height: 25vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .balance-title {
            text-transform: uppercase;
            font-size: ${FONT_SIZE.SEMI_LARGE};
          }

          .balance-value {
            font-size: ${FONT_SIZE.VERY_LARGE};
          }

          .balance-unit {
            font-size: ${FONT_SIZE.SEMI_LARGE};
            margin-left: ${MARGIN.MEDIUM};
          }

          .control-section {
            padding-top: ${PADDING.MEDIUM};
            border-top: solid ${BORDER.THICK} ${colors.BORDER_COLOR_LIGHT};
          }

          .deposit-control {
            display: flex;
            align-items: center;
          }

          .deposit-control > .controls {
            display: flex;
            align-items: center;
          }

          .deposit-amount-select {
            color: ${colors.TEXT_MAIN};
            background-color: transparent;
            border: solid ${BORDER.THICK} ${colors.BORDER_COLOR_LIGHT};
            font-size: ${FONT_SIZE.MEDIUM};
            margin-right: ${MARGIN.MEDIUM};
            padding: ${PADDING.MEDIUM};
          }

          .deposit-title {
            font-size: ${FONT_SIZE.MEDIUM};
          }
        `}</style>
      </main>
    )
  }

  private handleDeposit = () => {
    this.props.deposit(this.state.depositAmount)
  }

  private handleChangeDepositAmount = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({ depositAmount: Number(e.target.value) })
  }

  private onUpdate = async () => {
    const { ref } = this.props.wallet
    await ref.syncChildChain()
    this.forceUpdate()
  }

  private handleChangeToken = e => {
    const id = Number(e.target.value)
    const { wallet } = this.props
    const selectedToken = wallet.tokens.find(t => t.id === id)
    this.props.changeToken(selectedToken)
  }
}

export default connect(
  (state: AppState): StateProps => ({
    wallet: state.chamberWallet.wallet,
    depositState: state.chamberWallet.deposit
  }),
  {
    deposit,
    changeToken
  }
)(WalletCard)
