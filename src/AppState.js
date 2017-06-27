import { observable, action } from 'mobx';

class AppState {
  @observable timer = 0;

  constructor() {
    setInterval(() => {
      this.increaseTimer();
    }, 1000);
  }

  @action
  increaseTimer = () => {
    this.timer += 1;
  }

  @action
  resetTimer = () => {
    this.timer = 0;
  }
}

export default AppState;