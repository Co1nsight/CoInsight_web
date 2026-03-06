import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage'
import CoinDetailPage from './pages/CoinDetailPage';
import NewsDetailPage from './pages/NewsDetailPage';
import GamePage from './pages/GamePage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import SearchResultPage from './pages/SearchResultPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='/coindetail/:ticker' element={<CoinDetailPage />} />
        <Route path='/newsdetail' element={<NewsDetailPage />} />
        <Route path='/game' element={<GamePage />} />
        <Route path='/leaderboard' element={<LeaderBoardPage />} />
        <Route path='/search' element={<SearchResultPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

