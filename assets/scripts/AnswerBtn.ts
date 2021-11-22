
import { _decorator, Component, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnswerBtn')
export class AnswerBtn extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({ type: CCInteger })
    private _option = 123


    // setOption (n: number) {
    //     this._option = n
    // }
    onChose () {
        console.log(this._option)
        // this.node.emit('chose_answer', this._option);
        // let EventCustom = Event.EventCustom
        // console.log(Event)
        // let e = new EventCustom('chose_answer', true)
        // console.log(e)
        // this.node.dispatchEvent( e )
        // [3]
    }
    start () {
        console.log("????:" + this._option)
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
