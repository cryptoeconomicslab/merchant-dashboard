import { ChamberWallet } from '@layer2/wallet'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '..'

// CONSTANTS
export enum DEPOSIT_STATUS {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR'
}

// Action types
export enum DEPOSIT_ACTION_TYPES {
  DEPOSIT_START = 'DEPOSIT_START',
  DEPOSIT_SUCCESS = 'DEPOSIT_SUCCESS',
  DEPOSIT_FAIL = 'DEPOSIT_FAIL',
  CLEAR_DEPOSIT_ERROR = 'CLEAR_DEPOSIT_ERROR'
}

// Action creators
export const depositStart = () => ({
  type: DEPOSIT_ACTION_TYPES.DEPOSIT_START
})

export const depositSuccess = () => ({
  type: DEPOSIT_ACTION_TYPES.DEPOSIT_SUCCESS
})

export const depositFail = (error: Error) => ({
  type: DEPOSIT_ACTION_TYPES.DEPOSIT_FAIL,
  payload: error
})

export const clearDepositError = () => ({
  type: DEPOSIT_ACTION_TYPES.CLEAR_DEPOSIT_ERROR
})

// Reducer
export interface State {
  status: DEPOSIT_STATUS
  error: Error | null
}

const initialState: State = {
  status: DEPOSIT_STATUS.INITIAL,
  error: null
}

interface DepositAction {
  type: DEPOSIT_ACTION_TYPES
  payload?: any
}

const reducer = (state: State = initialState, action: DepositAction): State => {
  switch (action.type) {
    case DEPOSIT_ACTION_TYPES.DEPOSIT_START:
      return {
        ...state,
        status: DEPOSIT_STATUS.LOADING
      }
    case DEPOSIT_ACTION_TYPES.DEPOSIT_SUCCESS:
      return {
        ...state,
        status: DEPOSIT_STATUS.LOADED
      }
    case DEPOSIT_ACTION_TYPES.DEPOSIT_FAIL:
      return {
        ...state,
        status: DEPOSIT_STATUS.ERROR,
        error: action.payload
      }
    case DEPOSIT_ACTION_TYPES.CLEAR_DEPOSIT_ERROR:
      return {
        ...state,
        status: DEPOSIT_STATUS.INITIAL,
        error: null
      }
    default:
      return state
  }
}

export default reducer

// thunks
export const deposit = (
  ether: number
): ThunkAction<void, AppState, void, any> => async (
  dispatch: Dispatch,
  getState /** TODO: add util Type for getState */
) => {
  dispatch(depositStart())
  const state = getState()
  const ref: ChamberWallet = state.chamberWallet.wallet.ref

  await ref.deposit(ether.toString())
  // TODO: swithc based on result.
  // currently @layer2/wallet does return no value.
  // Fix @layer2/wallet ChamberWallet.deposit to return result value.
  // if (result.success) {
  //   dispatch(depositSuccess())
  // } else {
  //   dispatch(depositFail(result.error))
  // }

  dispatch(depositSuccess())
}
