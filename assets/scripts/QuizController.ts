
import { _decorator, Component, CCInteger, Label, Node } from 'cc';
import { QUIZ_TIME,QUIZ_TOTAL } from './Config';
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

    @property({ type: Node })
    private resultNode = null;

    @property({ type: CCInteger })
    private _time = 0;

    @property({})
    private _gameStartFlag = false;

    @property({ type: CCInteger })
    private _total = QUIZ_TOTAL;

    @property({ type: CCInteger })
    private _count = 0;

    @property({ type: CCInteger })
    private _score = 0;

    @property({ type: CCInteger })
    private _result = -1;

    start () {
      this.addAnswerListener()
    }

    //generate 3 wrong answers
    //exclude number below zero
    genAnswers (result:number) {
      let min = result - 5
      if(min < 0){
        min = 0
      }
      let max = min + 10
      let arr = []
      for(let i = min; i <= max; i++){
        if(i != result){
          arr.push(i)
        }
      }
      let head = 0
      let count = arr.length
      for(let i = 1; i <= 3; i++){
        let roll = random(head,count)
        let tmp = arr[roll]
        arr[roll] = arr[head]
        arr[head] = tmp
        head++
      }
      let answers = []
      answers[1] = arr[1]
      answers[2] = arr[2]
      answers[3] = arr[3]
      answers[4] = result
      //sort
      answers.sort((a, b) => a - b)
      return answers
    }

    genQuestion () {
      this._count++

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
      this._result = result
      let opChar = op == QuestionOperator.Minus ? " - " : " + "
      let str:string = `${a}${opChar}${b} = ?`
      this.lbQ.string = str

      let answers = this.genAnswers(result)
      this.setAnswers(answers)

      this._time = 0
      this._gameStartFlag = true
    }

    setAnswers(answers:Array<number>) {
      let asNode = this.node.getChildByName("Answers")
      let asList = asNode.children
      for (let i in asList) {
        let n = asList[i]
        let btn = n.getChildByName('btn')
        let lb = btn.getChildByName('text')
        lb = lb.getComponent("cc.Label")
        let as = answers[i]
        lb.string = as
        let script = btn.getComponent('AnswerBtn')
        script.setOption(as)

        let prog = n.getChildByName('prog')
        script = prog.getComponent("ProgressCircle");
        script.startCountDown(QUIZ_TIME)
      }
    }

    addAnswerListener () {
      let asNode = this.node.getChildByName("Answers")
      let asList = asNode.children
      for (let elem of asList) {
        let btn = elem.getChildByName('btn')
        btn.on('chose_answer', (option) => {
          this.onChose(option)
        });
      }
    }

    onChose (option) {
      let code = option == this._result ? 0 : 1
      if(code == 0){
        this._score++
      }
      this.node.active = false
      this.resultNode.active = true
      let script = this.resultNode.getComponent('ResultCheck')
      script.setResult(code,this._score,this._count,this._total)
    }

    startQuiz () {
      this._count = 0
      this._total = QUIZ_TOTAL
      this._score = 0

      this.genQuestion()
    }


    update (deltaTime: number) {
      if(this._gameStartFlag){
        this._time = this._time + deltaTime;
        if(this._time >= QUIZ_TIME){
          this._gameStartFlag = false
          let script = this.resultNode.getComponent('ResultCheck')
          script.setResult(2,this._score,this._count,this._total)
          this.node.active = false
          this.resultNode.active = true
        }
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
