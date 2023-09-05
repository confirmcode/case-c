import React, { useState, useEffect } from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import ArticlePage from './article/ArticlePage';
import ArticleItem from './article/ArticleItem';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <nav>
            <NavLink to="/">Главная</NavLink>
          </nav>
        <Routes>
          <Route path="/" element={<ArticlePage />} />
          <Route path="/article/:id" element={<ArticleItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
