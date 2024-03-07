export type InstrumentState = {
  id: string
  name: string
}

export type OptionsPresenterState = {
  muted: boolean
  selectedInstrument: string
  instruments: InstrumentState[]
  displayLoadingMessage: boolean
  displayInstrumentPicker: boolean
}
