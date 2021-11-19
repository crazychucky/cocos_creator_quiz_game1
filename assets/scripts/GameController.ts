
import { _decorator, Component, CCInteger, CCBoolean } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    // start () {
    //     console.log("Quiz Start")
    //     // [3]
    // }
    @property({ type: CCInteger })
    private _time = 0;

    @property({})
    private _gameStartFlag = false;

    startQuiz () {
      this._time = 0;
      this._gameStartFlag = true;
    }


    update (deltaTime: number) {
      if(this._gameStartFlag){
        this._time = this._time + deltaTime;
        console.log("Quiz Update:" + this._time);
      }
        // [4]
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
