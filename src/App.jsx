import React, { useState } from 'react'
import SmallCoin from "./assets/Group 9 (1).png"
import Kottatanga from "./assets/Tanga.png"
import knopka from "./assets/knopka.png"

const App = () => {
  const [tanga, setTanga] = useState(0);
  const [earn, setEarn] = useState(1);

  const handleClick = () => {
    const newTanga = tanga + earn;

    // Увеличивать earn каждые 100 коинов
    if (Math.floor(newTanga / 100) > Math.floor(tanga / 100)) {
      setEarn(earn + 1);
    }

    setTanga(newTanga);
  };

  return (
    <div className=''>
      <h1 className='text-center font-bold text-[50px] my-[30px] text-shadow-2xl text-shadow-amber-700'>Hamster Kombat</h1>

      <ul className='flex items-center justify-center gap-[40px]'>
        {/* Earn per tap */}
        <li className='w-[200px] shadow shadow-amber-50 p-[20px] rounded-[10px] text-center flex flex-col items-center gap-[20px]'>
          <span className='text-[20px] font-[900]'>Earn per tap</span>
          <span className='flex items-center gap-[10px] text-[20px]'>
            <img src={SmallCoin} />
            +{earn}
          </span>
        </li>

        {/* Coins to level up — статичное */}
        <li className='w-[200px] shadow shadow-amber-50 p-[20px] rounded-[10px] text-center flex flex-col items-center gap-[20px]'>
          <span className='text-[19px] font-[900] text-[#6F72E2]'>Coins to level up</span>
          <span className='flex items-center gap-[10px] text-[20px]'>
            1 M
          </span>
        </li>

        {/* Profit per hour — статичное */}
        <li className='w-[200px] shadow shadow-amber-50 rounded-[10px] p-[20px] text-center flex flex-col items-center gap-[20px]'>
          <span className='text-[19px] font-[900] text-[#84CB69]'>Profit per hour</span>
          <span className='flex items-center gap-[10px] text-[20px]'>
            <img src={SmallCoin} />
            +0
          </span>
        </li>
      </ul>

      {/* Общая сумма */}
      <div className='flex items-center justify-center my-[60px] gap-[30px] mb-[7a0px]'>
        <img src={Kottatanga} />
        <span className='text-[40px] font-900'>{tanga}</span>
      </div>

      {/* Кнопка */}
      <button
        onClick={handleClick}
        className='bg-transparent flex justify-center items-center mx-auto outline-none rounded-full active:scale-[1.1] active:transition-all active:shadow-2xl active:shadow-amber-50'
      >
        <img src={knopka} />
      </button>
    </div>
  );
};

export default App;
