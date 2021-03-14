export default class ScorePanel{
  score = 0
  level = 1
  private scoreElement: HTMLElement
  private levelElement: HTMLElement
  
  maxLevel: number
  scoreStep: number
  
  
  constructor(maxLevel: number = 10, scoreStep: number = 10) {
    this.scoreElement = document.getElementById("score")!
    this.levelElement = document.getElementById("level")!
    this.maxLevel = maxLevel
    this.scoreStep = scoreStep
  }
  
  addScore(){
    this.scoreElement.innerHTML = `${++this.score}`
    if(!(this.score % this.scoreStep)) this.addLevel()
  }
  
  addLevel(){
    if(this.level < this.maxLevel)
      this.levelElement.innerHTML = `${++this.level}`
  }
}