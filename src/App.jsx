import React, { useState, useEffect } from 'react';
import SmallCoin from "./assets/Group 9 (1).png";
import Kottatanga from "./assets/Tanga.png";
import knopka from "./assets/knopka.png";

const MAX_BOOST = 6500;
const BOOST_DURATION = 30; // seconds
const BOOST_FILL_SPEED = 50; // per second

const App = () => {
  const [tanga, setTanga] = useState(() => Number(localStorage.getItem('tanga')) || 0);
  const [earn, setEarn] = useState(() => Number(localStorage.getItem('earn')) || 1);
  const [level, setLevel] = useState(() => Number(localStorage.getItem('level')) || 1);
  const [profit, setProfit] = useState(() => Number(localStorage.getItem('profit')) || 0);

  const [boostProgress, setBoostProgress] = useState(() => Number(localStorage.getItem('boostProgress')) || MAX_BOOST);
  const [isBoostActive, setIsBoostActive] = useState(false);
  const [boostTimeLeft, setBoostTimeLeft] = useState(0);
  const [boostMultiplier, setBoostMultiplier] = useState(1);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tanga', tanga);
    localStorage.setItem('earn', earn);
    localStorage.setItem('level', level);
    localStorage.setItem('profit', profit);
    localStorage.setItem('boostProgress', boostProgress);
  }, [tanga, earn, level, profit, boostProgress]);

  // Profit auto increase every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTanga(prev => prev + profit / 3600);
    }, 1000);
    return () => clearInterval(interval);
  }, [profit]);

  // Boost progress filling over time
  useEffect(() => {
    const interval = setInterval(() => {
      setBoostProgress(prev => {
        if (isBoostActive) return prev;
        return Math.min(MAX_BOOST, prev + BOOST_FILL_SPEED);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isBoostActive]);

  // Boost timer countdown
  useEffect(() => {
    if (isBoostActive && boostTimeLeft > 0) {
      const timer = setInterval(() => {
        setBoostTimeLeft((prev) => {
          if (prev <= 1) {
            setIsBoostActive(false);
            setBoostMultiplier(1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isBoostActive, boostTimeLeft]);

  const handleClick = () => {
    const earned = earn * boostMultiplier;
    const newTanga = tanga + earned;

    if (Math.floor(newTanga / 100) > Math.floor(tanga / 100)) {
      setLevel(prev => prev + 1);
      setEarn(prev => prev + 1);
    }
    setTanga(newTanga);
  };

  const activateBoost = () => {
    if (boostProgress >= MAX_BOOST && !isBoostActive) {
      setIsBoostActive(true);
      setBoostMultiplier(2);
      setBoostTimeLeft(BOOST_DURATION);
      setBoostProgress(0);
    }
  };

  return (
    <div className="relative px-4">
      <h1 className="text-center font-bold text-[50px] my-[30px] text-amber-700 drop-shadow">Hamster Kombat</h1>

      <ul className="flex items-center justify-center gap-[40px] flex-wrap">
        <li className="w-[200px] shadow p-[20px] rounded-[10px] text-center flex flex-col items-center gap-[20px]">
          <span className="text-[20px] font-[900]">Earn per tap</span>
          <span className="flex items-center gap-[10px] text-[20px]">
            <img src={SmallCoin} /> +{earn}
          </span>
        </li>

        <li className="w-[200px] shadow p-[20px] rounded-[10px] text-center flex flex-col items-center gap-[20px]">
          <span className="text-[19px] font-[900] text-yellow-400">Level</span>
          <span className="text-[24px] font-bold">{level}</span>
        </li>

        <li className="w-[200px] shadow p-[20px] rounded-[10px] text-center flex flex-col items-center gap-[20px]">
          <span className="text-[19px] font-[900] text-[#6F72E2]">Coins to level up</span>
          <span className="text-[20px]">{level * 100} M</span>
        </li>

        <li className="w-[200px] shadow p-[20px] rounded-[10px] text-center flex flex-col items-center gap-[10px]">
          <span className="text-[19px] font-[900] text-[#84CB69]">Profit per hour</span>
          <span className="flex flex-col items-center text-[20px]">
            <span className="flex items-center gap-[10px]">
              <img src={SmallCoin} /> +{profit} / hour
            </span>
            <span className="text-[14px] text-gray-500">(+{(profit / 3600).toFixed(2)} / sec)</span>
          </span>
        </li>
      </ul>

      <div className="flex items-center justify-center my-[40px] gap-[30px]">
        <img src={Kottatanga} />
        <span className="text-[40px] font-bold">{Math.floor(tanga)}</span>
      </div>

      {/* Boost Bar */}
      <div className="w-[300px] mx-auto mb-6 cursor-pointer" onClick={activateBoost}>
        <div className="h-[20px] w-full bg-gray-300 rounded-full overflow-hidden">
          {isBoostActive ? (
            <div
              className="h-full bg-green-500 boost-bar-animation"
              style={{ animationDuration: `${BOOST_DURATION}s` }}
            ></div>
          ) : (
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${(boostProgress / MAX_BOOST) * 100}%` }}
            ></div>
          )}
        </div>
        <p className="text-center text-sm mt-1">
          {isBoostActive ? `BOOST ACTIVE: ${boostTimeLeft}s` : boostProgress >= MAX_BOOST ? 'Click to activate BOOST!' : 'Filling Boost...'}
        </p>
      </div>

      <button
        onClick={handleClick}
        className="bg-transparent flex justify-center items-center mx-auto outline-none rounded-full active:scale-110 transition-all shadow-md"
      >
        <img src={knopka} />
      </button>

      <style>{`
        .boost-bar-animation {
          animation-name: deplete-bar;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-iteration-count: 1;
        }

        @keyframes deplete-bar {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
