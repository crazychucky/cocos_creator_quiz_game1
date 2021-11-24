
import { _decorator, Component, Label, CCInteger, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ResultCheck')
export class ResultCheck extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({ type: Label })
    private lb1 = null;

    @property({ type: Label })
    private lb2 = null;

    @property({ type: Label })
    private lb3 = null;

    @property({ type: Node })
    private continueNode = null;

    @property({ type: Node })
    private quizNode = null;

    @property({ type: Node })
    private titleNode = null;

    @property({ type: CCInteger })
    private _count = 0;

    @property({ type: CCInteger })
    private _total = 100;

    //@resultCode
    public setResult (resultCode: number,nowScore: number,count: number,total: number) {
      this._count = count
      this._total = total
      if(resultCode == 0){
        this.lb1.string = "Right!"
      }else if(resultCode == 1){
        this.lb1.string = "Wrong!"
      }else{
        this.lb1.string = "Timeout!"
      }
      if(resultCode == 0){
        if(count<total){
          this.lb2.string = "Score! now score:" + nowScore
        }else{
          this.lb2.string = "Quiz completed! the final score is:" + nowScore
        }
      }
      else{ 
        if(count<total){
          this.lb2.string = "now score:" + nowScore
        }else{
          this.lb2.string = "Quiz completed! the final score is:" + nowScore
        }
      }
      this.lb3.string = count + "/" + total
    }
    public onNext () {
      console.log("???????????")
      if(this._count<this._total){
        this.node.active = false
        let script = this.quizNode.getComponent('QuizController')
        script.genQuestion()
        this.quizNode.active = true
      }else{
        this.node.active = false
        this.titleNode.active = true
      }
    }

    //delay to enable click to continue
    public onEnable () {
      this.continueNode.active = false

      this.scheduleOnce(function() {
        this.continueNode.active = true
      }, 1);
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
