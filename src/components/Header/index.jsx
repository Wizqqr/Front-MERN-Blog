import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, fetchAuthMe, fetchRegister, isAuthSelector, logout } from '../../redux/slices/auth';
import { UserInfo } from '../../components/UserInfo/index.jsx'; // Убедитесь, что путь корректный
import styles from './Header.module.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);

  const userData = useSelector((state) => state.auth.data);
  const userAvatar = userData?.avatarUrl ? `http://localhost:4444${userData.avatarUrl}` : '/noavatar.png';
  const userName = userData?.fullName;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>NEWS KG</div>
          </Link>
          <div className={styles.buttons} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isAuth ? (
              <>
                <UserInfo
                  additionalText="Hello!"
                  imageUrl={userAvatar}
                  fullName={userName}
                />
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={handleLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
