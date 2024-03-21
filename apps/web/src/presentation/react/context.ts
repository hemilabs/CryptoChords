import { createContext } from 'react'
import * as context from '../common/context/presenters'
import { TxTypesEnum } from '@cryptochords/shared'

export const presenters = createContext<context.Presenters>(context.presenters)

const { appPresenter } = context.presenters

if (import.meta.env.VITE_USE_API_MOCK === 'true') {
  mockBlock()
} else {  
  startWebsocket()
}

function mockBlock() {
  setTimeout(() => {
    const randomTxType = Object.values(TxTypesEnum)[Math.floor(Math.random() * Object.values(TxTypesEnum).length)]
    const randomAddress = '0x' + Math.random().toString(16).slice(2)
    notifyPresenters(randomTxType, randomAddress)
    mockBlock()
  }, Math.random() * 3000)
}

function startWebsocket() {
  const ws = new WebSocket(getWebsocketUrl())
  ws.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data)
    notifyPresenters(data.txType, data.address)
  }
  return ws
}

function getWebsocketUrl() {
  const url = import.meta.env.VITE_API_WEBSERVICE_URL
  if (!url) {
    throw new Error('VITE_API_WEBSERVICE_URL is not defined')
  }

  // replaces ${host} with the host address ignoring spaces and tabs within the brackets
  const regex = /\$\{[ \t]*host[ \t]*\}/i 
  return url.replace(regex, document.location.host)
}

async function notifyPresenters(txType: TxTypesEnum, address: string) {
  await appPresenter.createTransaction(txType, address)
}

