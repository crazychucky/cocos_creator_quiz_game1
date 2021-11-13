
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TestButton
 * DateTime = Sat Oct 02 2021 16:16:30 GMT+0800 (中国标准时间)
 * Author = crazychucky
 * FileBasename = TestButton.ts
 * FileBasenameNoExtension = TestButton
 * URL = db://assets/TestButton.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('TestButton')
export class TestButton extends Component {
    // 声明 Player 属性
    @property({ type: Node })
    private lb1 = null;

    @property({ type: Node })
    private lb2 = null;
    // cc.Node btn;
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    // start () {
    //     // [3]
    //   // console.log(this.btn);
    // }

    // update (deltaTime: number) {
    //     // [4]
    // }

    onClick(){
      // console.log("click？");
      // console.log(this);
      // console.log(this.btn);
      // this.btn.x = 50,
      // this.btn.active = false;
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
