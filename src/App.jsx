import { useState } from 'react'
import './App.css'

function App() {
  const [hiddenGridItems, setHiddenGridItems] = useState([
    [3, 5, 7, 8],
    [0, 6, 2, 4],
    [4, 7, 9, 0],
  ]);

  
  const [selectItem, setSelectItem] = useState('');

  const [success, setSuccess] = useState(false);
  const [winCount, setWinCount] = useState(0);
  

  const [visibleGridItems, setVisibleGridItems] = useState(
    hiddenGridItems.map(row => row.map(() => false))
  )

  const handleItemClick = (rowIndex, colIndex) => {
    const updatedVisibleGridItems = hiddenGridItems.map((row, i) => 
    row.map((col, j) => i === rowIndex && j === colIndex)
    );
    setVisibleGridItems(updatedVisibleGridItems);
  }

  function createDynamicArray(rows, cols) {
    let arr = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push(Math.floor(Math.random() * 9)); // You can initialize with any value you want
      }
      arr.push(row);
    }
    return arr;
  }

  const handleShuffleCard = () => {
    handleItemClick(-1, -1);
    const newArr = createDynamicArray(3, 4);
    console.log(newArr);
    setHiddenGridItems(newArr);

    const msgDiv = document.querySelector('.message_div');
    msgDiv.textContent = 'Card has been re-shuffled...'

    setTimeout(() => { msgDiv.textContent = ''}, 2000);
  };

  return (
    <div className='main_div'>
      <div className='hero'>
      <h1>TIPI-TOE GAME</h1>
      <h2>Click on the Black boxes to reveal hidden numbers. You win for each matched pair.</h2>
      </div>
      
      <div className='win_div'>
        You have: {winCount} wins.
      </div>
      <div>
        <button type='button' className='shuffle_btn' 
          onClick={() => handleShuffleCard()}
        >Shuffle Grid</button>
      </div>

      <div className='card_div'>
      {hiddenGridItems.map((row, rowIndex) => (
        <div key={`${row}-${rowIndex}-${row}`} className='row'>
          {row.map((col, colIndex) => (
            <div key={`${col}-${colIndex}-${rowIndex}`} className='col'>
              <div key={`${col}-${row}`}
                className={ visibleGridItems[rowIndex][colIndex] ? 'item_visible' : 'item_invisible' } 
                onClick={() => {
                  handleItemClick(rowIndex, colIndex);
                  setSelectItem(col);
                  {selectItem === col ? (
                    handleItemClick(-1, -1),
                    //handleShowWinCards(),
                    setSuccess(true),
                    setWinCount(winCount +1),
                    handleShuffleCard()
                  ): setSuccess(false)}

                }}
              >
                {col}
              </div>
            </div>
          ))}
        </div>
      ))}  
      </div>
      <div className='message_div'>{success ? `Horray!!! You've successfully matched a pair of ${selectItem}'s` : ''}</div>

    </div>
  )
}

export default App
