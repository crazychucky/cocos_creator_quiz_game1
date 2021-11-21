
import { _decorator, Component, ProgressBar, CCFloat,CCBoolean } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ProgressCircle')
export class ProgressCircle extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({ type: CCFloat })
    private _totalTime = 10;

    @property({ type: CCFloat })
    private _nowTime = 10;

    @property({ type: CCBoolean })
    private _startFlag = false;

    start () {
        // [3]
        this.node.on('start_count_down', (arg1) => {
            console.log(arg1)
            this._totalTime = arg1
            this._nowTime = arg1
            this._startFlag = true
        });
    }

    update (deltaTime: number) {
        if(this._startFlag){
            this._nowTime = this._nowTime - deltaTime
            if(this._nowTime < 0){
                this._nowTime = 0
            }
            let prog = this.getComponent("cc.ProgressBar")
            prog.Progress = this._nowTime/this._totalTime
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
