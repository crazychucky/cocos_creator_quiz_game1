
import { _decorator, Component, CCInteger, CCBoolean } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('QuizController')
export class QuizController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property({ type: CCInteger })
    private _time = 0;

    @property({})
    private _gameStartFlag = false;

    start () {
      let asNode = this.node.getChildByName("Answers")
      let asList = asNode.children
      for (let elem of asList) {
        let btn = elem.getChildByName('btn')
        btn.on('chose_answer', (option,arg2) => {
              console.log(option,arg2);  // print 1, 2, 3
          });
      }
    }

    startQuiz () {
      this._time = 0;
      this._gameStartFlag = true;
      this.node.emit('start_count_down', 10);
    }


    update (deltaTime: number) {
      if(this._gameStartFlag){
        this._time = this._time + deltaTime;
        // console.log("Quiz Update:" + this._time);
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
