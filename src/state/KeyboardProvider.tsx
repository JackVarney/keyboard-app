import * as React from 'react';
import { WaveType } from '../enums/WaveType';
import { MusicUtils } from '../utilities/MusicUtils';

export interface State {
  waveType: WaveType;
  rootNote: number;
  attack: number;
  decay: number;
}

export interface KeyboardState {
  waveType: WaveType;
  setWave: Function;
  rootNote: number;
  setRootNote: Function;
  resetRootNote: Function;
  attack: number;
  setAttack: Function;
  decay: number;
  setDecay: Function;
}

export const KeyboardContext = React.createContext({}) as React.Context<KeyboardState>;
const c4 = 261.63;

export default class KeyboardProvider extends React.Component<{}, State> {
  state = {
    waveType: WaveType.sine,
    rootNote: c4,
    attack: 0.001,
    decay: 0.5
  };

  render() {
    return (
      <KeyboardContext.Provider
        value={{
          waveType: this.state.waveType,
          setWave: (waveType: WaveType) => this.setState({ waveType }),
          rootNote: this.state.rootNote,
          setRootNote: (change: number) => this.setState({ rootNote: MusicUtils.getSemitone(this.state.rootNote, change) }),
          resetRootNote: () => this.setState({ rootNote: c4 }),
          attack: this.state.attack,
          setAttack: (attack: number) => this.setState({ attack }),
          decay: this.state.decay,
          setDecay: (decay: number) => this.setState({ decay })
        }}
      >
        {this.props.children}
      </KeyboardContext.Provider>
    );
  }
}
