import { useState, useEffect } from "react";
import './App.css'

function App() {
  const [count,SetCount] = useState(0);
  const [turn, SetTurn] = useState("X")
  const [Winner, SetWinner] = useState(null)
  const [draw, SetDraw] = useState(Boolean)
  const [marks, SetMarks] = useState("")
  const getSquares = () => {
    return new Array(9).fill(true);
  }
  const play = (index:number) => {
    if (marks[index] || Winner || draw ){
      return;}
    
    SetMarks(prev => ({...prev, [index]:turn}))
    SetTurn(prev => prev === "O" ? "X": "O")
  }
  const getCellPlayer = (index:number) => {
    if (!marks[index]){
      return;
    }
    return marks[index];
  }
  const GetWinner = () => {
    const victoryLines = [
      [0,1,2], 
      [3,4,5],
      [6,7,8],
      [0,4,8],
      [2,4,6],
      [0,3,6],
      [1,4,7],
      [2,5,8],]
      for (const line of victoryLines){
        const [a,b,c] = line;
        if (marks[a] && marks [a] === marks[b] && marks [a] === marks[c] ){
          return marks[a];
        }

      }

    
  }

  useEffect(() => {
    const Winner = GetWinner()
    if (Winner){
      SetWinner(Winner)}
    else{
      if (Object.keys(marks).length === 9){
        SetDraw(true)
      }

    }
    },)

  const reset = () => {
    SetTurn(marks[0]==="O"?"X": "O");
    SetMarks({});
    SetWinner(null);
    SetDraw(null); 

  }
  return (
    <main>
       <div className = "container"> 
       {Winner && <h1 className="win">{Winner} GANHOU</h1>}
       {draw && <h1 className="empate"> Empate</h1>}
       {!Winner && !draw && <h1> É a vez de {turn} </h1>}
       {(Winner || draw )&& (<button className="again" onClick={reset}>JOGAR NOVAMENTE</button>)}
       <div className={`board ${(Winner || draw)? "Winner":null}`}>
        {getSquares().map((_,i) => (
          <div className={`cell ${getCellPlayer(i)}`} onClick={()=>play(i)}>
            {marks[i]} 
          </div>
        ))}</div>
       </div>
       </main>
  );
}

export default App;
