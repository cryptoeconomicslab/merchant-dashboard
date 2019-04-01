import * as React from 'react'
import QRCode from 'qrcode.react'
import { ChamberWallet } from '@layer2/wallet'

const QRSection = ({ walletRef }: { walletRef: ChamberWallet }) => {
  const address = walletRef.getAddress()
  const value = `${process.env.USER_WALLET_URL ||
    'http://localhost:8080'}/transfer?address=${address}&amount=0&isFF=true`
  return (
    <div>
      <h2>Merchant address</h2>
      <QRCode value={value} renderAs="svg" />
      <span>{address}</span>
    </div>
  )
}

export default QRSection
