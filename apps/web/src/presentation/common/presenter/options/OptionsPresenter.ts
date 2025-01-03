import { GetOptionsService } from '../../../../application/services/GetOptions/GetOptionsService'
import { LoadInstrumentService } from '../../../../application/services/LoadInstrument/LoadInstrumentService'
import { SetInstrumentService } from '../../../../application/services/SetInstrument/SetInstrumentService'
import { SetMutedService } from '../../../../application/services/SetMuted/SetMutedService'
import { InstrumentEnum, instrumentLabels } from '../../../../domain/enum/InstrumentEnum'
import { Presenter } from '../../base/Presenter'
import { OptionsPresenterState } from './OptionsPresenterState'

const instruments: { label: string, value: string }[] = Object.values(InstrumentEnum).map(
  (instrument) => ({
    label: instrumentLabels.get(instrument) ?? instrument,
    value: instrument
  })
)

const initalState: OptionsPresenterState = {
  muted: true,
  selectedInstrument: '',
  instruments,
  displayLoadingMessage: false,
  displayInstrumentPicker: false
}

export class OptionsPresenter extends Presenter<OptionsPresenterState> {

  private getOptionsService: GetOptionsService
  private setMutedService: SetMutedService
  private setInstrumentService: SetInstrumentService
  private loadInstrumentService: LoadInstrumentService

  constructor(
    getOptionsService: GetOptionsService,
    setMutedService: SetMutedService,
    setInstrumentService: SetInstrumentService,
    loadInstrumentService: LoadInstrumentService
  ) {
    super(initalState)

    this.getOptionsService = getOptionsService
    this.setMutedService = setMutedService
    this.setInstrumentService = setInstrumentService
    this.loadInstrumentService = loadInstrumentService

    this.init()
  }

  async init() {
    const options = await this.getOptionsService.execute()
    this.setState({
      muted: options.muted,
      selectedInstrument: options.instrument,
      instruments,
      displayLoadingMessage: false,
      displayInstrumentPicker: true
    })
  }


  async setMuted(muted: boolean) {
    if (!muted) {
      await this.loadInstrument(this.state.selectedInstrument)
    }
    await this.setMutedService.execute({ muted })
    this.changeState({ muted })
  }

  async setInstrument(instrument: string) {
    await this.loadInstrument(instrument)
    await this.setInstrumentService.execute({ instrument })
    this.changeState({ selectedInstrument: instrument })
  }

  private async loadInstrument(instrument: string) {
    this.changeState({ displayLoadingMessage: true, displayInstrumentPicker: false })
    await this.loadInstrumentService.execute({ instrument })
    this.changeState({ displayLoadingMessage: false, displayInstrumentPicker: true })
  }
}
