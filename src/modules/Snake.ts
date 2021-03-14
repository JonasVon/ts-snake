export default class Snake{
  //蛇头
  head: HTMLElement
  //蛇
  body: HTMLCollection
  //蛇容器
  element: HTMLElement
  
  constructor() {
    this.element = document.getElementById("snake")!
    this.head = document.querySelector("#snake >div")!
    this.body = this.element.getElementsByTagName("div")
  }
  
  get X(){
    return this.head.offsetLeft
  }
  
  set X(x){
    if(this.X === x) return
    if(x < 0 || x > 290){
      throw new Error("game over")
    }
    if(this.body[1] && (this.body[1] as HTMLElement).offsetLeft === x){
      if(x > this.X){
        x = this.X - 10
      }else{
        x = this.X + 10
      }
    }
    this.moveBody()
    this.head.style.left = `${x}px`
    this.checkHead()
  }
  
  get Y(){
    return this.head.offsetTop
  }
  
  set Y(y){
    if(this.Y === y) return
    if(y < 0 || y > 290){
      throw new Error("game over")
    }
    if(this.body[1] && (this.body[1] as HTMLElement).offsetTop === y){
      if(y > this.Y){
        y = this.Y - 10
      }else{
        y = this.Y + 10
      }
    }
    this.moveBody()
    this.head.style.top = `${y}px`
    this.checkHead()
  }
  
  addBody(){
    this.element.insertAdjacentHTML("beforeend", "<div></div>")
  }
  
  moveBody(){
    for(let i = this.body.length - 1; i > 0; i--){
      let x = (this.body[i - 1] as HTMLElement).offsetLeft;
      let y =(this.body[i - 1] as HTMLElement).offsetTop;
      (this.body[i] as HTMLElement).style.left = `${x}px`;
      (this.body[i] as HTMLElement).style.top = `${y}px`;
    }
  }
  
  checkHead(){
    for(let i = 1; i < this.body.length; i++){
      let bd = (this.body[i] as HTMLElement)
      if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
        throw new Error("game over")
      }
    }
  }
}