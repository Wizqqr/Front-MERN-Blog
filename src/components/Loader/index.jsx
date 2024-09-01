// src/components/Loader.js
import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import '../Loader/loader.css'; // Подключаем стили

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Симуляция загрузки данных или выполнения других операций
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return null; // Загрузка завершена, не отображаем Loader
  }

  // Если загрузка еще не завершена, показываем загрузочный экран
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#fff"
    >
      <img src="https://projects.iq.harvard.edu/sites/projects.iq.harvard.edu/files/francisclooney/files/blog-icon.png?m=1524083417" alt="Site Logo" className="logo" />
      <Typography variant="h4" component="h1" gutterBottom>
        BlogKG
      </Typography>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loader;
