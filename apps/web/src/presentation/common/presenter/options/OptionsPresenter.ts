import { GetOptionsService } from '../../../../application/services/GetOptions/GetOptionsService';
import { LoadInstrumentService } from '../../../../application/services/LoadInstrument/LoadInstrumentService';
import { SetInstrumentService } from '../../../../application/services/SetInstrument/SetInstrumentService';
import { SetMutedService } from '../../../../application/services/SetMuted/SetMutedService';
import {
  InstrumentEnum,
  instrumentLabels,
} from '../../../../domain/enum/InstrumentEnum';
import { Presenter } from '../../base/Presenter';
import { OptionsPresenterState } from './OptionsPresenterState';

const instruments: { label: string; value: string }[] = Object.values(
  InstrumentEnum,
).map(instrument => ({
  label: instrumentLabels.get(instrument) ?? instrument,
  value: instrument,
}));

const initalState: OptionsPresenterState = {
  displayInstrumentPicker: false,
  displayLoadingMessage: false,
  instruments,
  muted: true,
  selectedInstrument: '',
};

export class OptionsPresenter extends Presenter<OptionsPresenterState> {
  private getOptionsService: GetOptionsService;
  private setMutedService: SetMutedService;
  private setInstrumentService: SetInstrumentService;
  private loadInstrumentService: LoadInstrumentService;

  constructor(
    getOptionsService: GetOptionsService,
    setMutedService: SetMutedService,
    setInstrumentService: SetInstrumentService,
    loadInstrumentService: LoadInstrumentService,
  ) {
    super(initalState);

    this.getOptionsService = getOptionsService;
    this.setMutedService = setMutedService;
    this.setInstrumentService = setInstrumentService;
    this.loadInstrumentService = loadInstrumentService;

    this.init();
  }

  async init() {
    const options = await this.getOptionsService.execute();
    this.setState({
      displayInstrumentPicker: true,
      displayLoadingMessage: false,
      instruments,
      muted: options.muted,
      selectedInstrument: options.instrument,
    });
  }

  async setMuted(muted: boolean) {
    if (!muted) {
      await this.loadInstrument(this.state.selectedInstrument);
    }
    await this.setMutedService.execute({ muted });
    this.changeState({ muted });
  }

  async setInstrument(instrument: string) {
    await this.loadInstrument(instrument);
    await this.setInstrumentService.execute({ instrument });
    this.changeState({ selectedInstrument: instrument });
  }

  private async loadInstrument(instrument: string) {
    this.changeState({
      displayInstrumentPicker: false,
      displayLoadingMessage: true,
    });
    await this.loadInstrumentService.execute({ instrument });
    this.changeState({
      displayInstrumentPicker: true,
      displayLoadingMessage: false,
    });
  }
}
