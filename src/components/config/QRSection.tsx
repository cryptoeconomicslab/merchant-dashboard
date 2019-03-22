import * as React from 'react'
import QRCode from 'qrcode.react'
import { ChamberWallet } from '@layer2/wallet'

const QRSection = ({ walletRef }: { walletRef: ChamberWallet }) => {
  const address = walletRef.getAddress()
  // TODO: use env for url
  const value = `http://localhost:8080/transfer?address=${address}&amount=0`
  return (
    <div>
      <QRCode value={value} renderAs="svg" />
    </div>
  )
}

export default QRSection
