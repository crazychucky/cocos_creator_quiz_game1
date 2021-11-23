
import { _decorator, Component, CCInteger, Label } from 'cc';
const { ccclass, property } = _decorator;


function random(lower, upper) {
  return Math.floor(Math.random() * (upper - lower)) + lower
}

enum QuestionOperator {
  Add,
  Minus,
}

@ccclass('QuizController')
export class QuizController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property({ type: Label })
    private lbQ = null

    @property({ type: CCInteger })
    private _time = 0;

    @property({})
    private _gameStartFlag = false;

    @property({ type: CCInteger })
    private _total = 10;

    @property({ type: CCInteger })
    private _count = 0;

    @property({ type: CCInteger })
    private _score = 0;

    start () {
      this.addAnswerListener()
    }

    initQuiz () {
      this._count = 0
      this._total = 10
      this._score = 0
    }

    //generate 3 wrong answers
    //exclude number below zero
    genAnswers (result:number) {

    }

    genQuestion () {
      let a:number = random(1,10)
      let b:number = random(1,10)
      let op = Math.random() > 0.5 ? QuestionOperator.Add : QuestionOperator.Minus
      let result:number = 0
      if(op == QuestionOperator.Minus){
        if(a < b ){
          let tmp = a
          a = b
          b = tmp
        }
        result = a - b
      }else{
        result = a + b
      }
      let opChar = op == QuestionOperator.Minus ? " - " : " + "
      let str:string = `${a}${opChar}${b} = ?`
      console.log(str)
      this.lbQ.string = str

    }

    addAnswerListener () {
      let asNode = this.node.getChildByName("Answers")
      let asList = asNode.children
      for (let elem of asList) {
        let btn = elem.getChildByName('btn')
        btn.on('chose_answer', (option) => {
              console.log(option)
          });
      }
    }

    startQuiz () {
      this._time = 0
      this._gameStartFlag = true
      this.genQuestion()
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
