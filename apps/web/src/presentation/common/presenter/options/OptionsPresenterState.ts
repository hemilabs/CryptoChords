export type InstrumentState = {
  value: string
  label: string
}

export type OptionsPresenterState = {
  muted: boolean
  selectedInstrument: string
  instruments: InstrumentState[]
  displayLoadingMessage: boolean
  displayInstrumentPicker: boolean
}
