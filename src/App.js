// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from "@mui/material/Container";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, PopularPosts, MyPosts } from "./pages";
import Loader from './components/Loader'; // Импортируем Loader
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, isAuthSelector } from './redux/slices/auth';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      dispatch(fetchAuthMe());
    }
    // Завершаем загрузку после выполнения всех необходимых операций
    const timer = setTimeout(() => setLoading(false), 2500); // Можно использовать реальную логику завершения загрузки
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/popular' element={<PopularPosts />} />
          <Route path='/myposts' element={<MyPosts />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
