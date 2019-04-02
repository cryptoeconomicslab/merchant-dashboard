import { Dispatch } from 'redux'
import { ChamberWallet } from '@layer2/wallet'
import WalletFactory from '../../../helpers/wallet'
import delay from '../../../utils/delay'
import { SignedTransaction, SignedTransactionWithProof } from '@layer2/core'

// CONSTANTS
export enum WALLET_STATUS {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  NO_WALLET = 'NO_WALLET',
  ERROR = 'ERROR'
}

// Action types
export enum WALLET_ACTION_TYPES {
  LOAD_WALLET_START = 'LOAD_WALLET_START',
  LOAD_WALLET_SUCCESS = 'LOAD_WALLET_SUCCESS',
  LOAD_WALLET_FAIL = 'LOAD_WALLET_FAIL',
  CLEAR_WALLET_ERROR = 'CLEAR_WALLET_ERROR',
  SET_WALLET_STATUS = 'SET_WALLET_STATUS',
  RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION'
}

// Action creators
export const loadWalletStart = () => ({
  type: WALLET_ACTION_TYPES.LOAD_WALLET_START
})

export const loadWalletSuccess = (wallet: ChamberWallet) => ({
  type: WALLET_ACTION_TYPES.LOAD_WALLET_SUCCESS,
  payload: wallet
})

export const loadWalletFail = (error: Error) => ({
  type: WALLET_ACTION_TYPES.LOAD_WALLET_FAIL,
  payload: error
})

export const clearWalletError = () => ({
  type: WALLET_ACTION_TYPES.CLEAR_WALLET_ERROR
})

export const setWalletStatus = (status: WALLET_STATUS) => ({
  type: WALLET_ACTION_TYPES.SET_WALLET_STATUS,
  payload: status
})

const receiveTransaction = value => ({
  type: WALLET_ACTION_TYPES.RECEIVE_TRANSACTION,
  payload: value
})

// Reducer
export interface State {
  status: WALLET_STATUS
  error: Error | null
  ref: ChamberWallet | null
  txs: Array<{
    tx: SignedTransaction | SignedTransactionWithProof
    isFast: boolean | undefined
    time: Date
  }>
}

const initialState: State = {
  status: WALLET_STATUS.INITIAL,
  ref: null,
  error: null,
  txs: []
}

interface WalletAction {
  type: WALLET_ACTION_TYPES
  payload?: any
}

const reducer = (state: State = initialState, action: WalletAction): State => {
  switch (action.type) {
    case WALLET_ACTION_TYPES.SET_WALLET_STATUS:
      return {
        ...state,
        status: action.payload
      }
    case WALLET_ACTION_TYPES.LOAD_WALLET_START:
      return {
        ...state,
        status: WALLET_STATUS.LOADING
      }
    case WALLET_ACTION_TYPES.LOAD_WALLET_SUCCESS:
      return {
        ...state,
        status: WALLET_STATUS.LOADED,
        ref: action.payload
      }
    case WALLET_ACTION_TYPES.LOAD_WALLET_FAIL:
      return {
        ...state,
        status: WALLET_STATUS.ERROR,
        error: action.payload
      }
    case WALLET_ACTION_TYPES.CLEAR_WALLET_ERROR:
      return {
        ...state,
        status: WALLET_STATUS.INITIAL,
        error: null
      }
    case WALLET_ACTION_TYPES.RECEIVE_TRANSACTION:
      return {
        ...state,
        txs: [action.payload, ...state.txs]
      }
    default:
      return state
  }
}

export default reducer

// Thunks
const onWalletLoaded = (wallet: ChamberWallet, dispatch: Dispatch) => {
  dispatch(loadWalletSuccess(wallet))
  // TODO: how to load transactions on initial mount
  console.log('addEventListeners')
  wallet.addListener('receive', value => {
    console.log('received!!')
    // TODO: change timestamp
    const time = new Date()
    dispatch(receiveTransaction({ ...value, time }))
  })

  wallet.addListener('updated', value => {
    console.log('updated', value)
  })
}

export const loadWallet = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadWalletStart())

    // Load wallet if in storage
    const wallet = WalletFactory.loadWallet()
    if (wallet) {
      onWalletLoaded(wallet, dispatch)
    } else {
      dispatch(setWalletStatus(WALLET_STATUS.NO_WALLET))
    }
  }
}

// TODO: create random, create from mnemonic
export const createWallet = (privateKey: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadWalletStart())
    await delay(500)

    try {
      const wallet = WalletFactory.createWallet({ privateKey })
      onWalletLoaded(wallet, dispatch)
    } catch (e) {
      dispatch(loadWalletFail(e)) // TODO: make custom error ErrorCreateWallet
    }
  }
}
