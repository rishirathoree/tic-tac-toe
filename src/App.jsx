import React, { useLayoutEffect, useRef, useState } from 'react'
import 'boxicons/css/boxicons.min.css';
import { gsap } from 'gsap';
const App = () => {
  
  const mate = useRef()
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.mates', {
        // scale:'0.3',
        translateY:'-400px',
        opacity:0,
        duration:1,
        ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
      });
    }, mate.current);
    console.log(mate.current)
    return () => ctx.revert(); // cleanup
    
  }, []); 

  const squareBoxes = Array(9).fill(null)
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  const [firstPlayerDices,setFirstPlayerDices] = useState([])
  const [secondPlayerDices,setSecondPlayerDices] = useState([])
  const [winner,setWinner] = useState(null)
  const [turn,setTurn] = useState('first')
  const handleSelected = (idx) => {
    if(winner === null){
      if (turn === 'first') {
        setFirstPlayerDices(prev => [...prev, idx]);
        handleWinnerChecker([...firstPlayerDices, idx],turn);
      } else {
        setSecondPlayerDices(prev => [...prev, idx]);
        handleWinnerChecker([...secondPlayerDices, idx],turn);
      }
      setTurn(turn === 'first' ? 'second' : 'first');
    }
  };
  

  const handleWinnerChecker = (player,turn) => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      console.log(a)
      if (player.includes(a) && player.includes(b) && player.includes(c)) {
        setWinner(turn)
        return;
      }
    }
  };
  
  return (
    <>
    <div ref={mate} className='h-screen bg-white flex flex-col items-center justify-center'>
        <div className='grid grid-cols-3 lg:w-1/4 gap-2 md:w-1/4 sm:w-full h-1/2'>
        {squareBoxes.map((item,idx)=>{
          return(
            <div onClick={()=>{handleSelected(idx)}} className={`mates w-24 h-24 flex items-center justify-center hover:scale-105 duration-500 rounded-lg box-shadow border-[1px] border-black/5`}>
            <i className={`font-bold text-black text-2xl bx bx-lg ${firstPlayerDices && firstPlayerDices.includes(idx) ? 'bx-x text-red-500' : null} ${secondPlayerDices && secondPlayerDices.includes(idx) ? 'bx-radio-circle text-blue-500' : null}`} />
            </div>
          )
        })}
        </div>
        <div className={`absolute w-full overflow-hidden h-screen bg-black/5 text-center flex items-center justify-center ${winner ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <p className={`absolute text-[10rem] ${winner ? 'visible scale-75 opacity-50' : 'invisible scale-125 opacity-100'} font-semibold text-sm duration-500 first-letter:capitalize`}>{winner} Won!!</p>
        </div>

        <div className={`absolute w-full overflow-hidden h-screen bg-black/5 text-center flex items-center justify-center ${winner === null && firstPlayerDices.length > 4 ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <p className={`absolute text-[10rem] ${winner === null && firstPlayerDices.length > 4 ? 'visible scale-75 opacity-50' : 'invisible scale-125 opacity-100'} font-semibold text-sm duration-500 first-letter:capitalize`}> Draw!!</p>
        </div>
      </div>
    </>
  )
}

export default App
