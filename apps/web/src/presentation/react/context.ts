import { TxTypesEnum } from '@cryptochords/shared'
import { createContext } from 'react'
import * as context from '../common/context/presenters'

export const presenters = createContext<context.Presenters>(context.presenters)

let ws: WebSocket
const { appPresenter } = context.presenters


if (import.meta.env.VITE_USE_API_MOCK === 'true') {
  mockBlockRecursively()
} else {
  appPresenter.subscribe((state) => {
    setWebserviceUrl(state.selectedNetworkWsUrl)
  })
}


function setWebserviceUrl(url: string | null) {
  if (ws?.url == url) {
    return
  }

  stopWebsocket()

  if (!url) {
    return
  }

  startWebsocket(url)
}

function mockBlockRecursively() {
  setTimeout(() => {
    const randomTxType = Object.values(TxTypesEnum)[Math.floor(Math.random() * Object.values(TxTypesEnum).length)]
    const randomAddress = '0x' + Math.random().toString(16).slice(2)
    handleBlockCreation(randomTxType, randomAddress)
    mockBlockRecursively()
  }, Math.random() * 3000)
}

function startWebsocket(url: string) {
  ws = new WebSocket(url)
  ws.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data)
    handleBlockCreation(data.txType, data.address)
  }
  return ws
}

function stopWebsocket() {
  ws?.close()
}

async function handleBlockCreation(txType: TxTypesEnum, address: string) {
  await appPresenter.createTransaction(txType, address, appPresenter.state.selectedNetworkName!)
}

