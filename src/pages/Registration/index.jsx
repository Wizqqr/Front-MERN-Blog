import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import axios from '../../axios.js';
import styles from './Login.module.scss';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, isAuthSelector } from "../../redux/slices/auth";
import DeleteIcon from '@mui/icons-material/Delete'; // импортируем иконку удаления
import Typography from '@mui/material/Typography';
import {useForm} from 'react-hook-form'

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const navigate = useNavigate();
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, setError, formState: {errors, isValid} } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange',
  })
  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      if (!file) {
        alert('Выберите файл для загрузки');
        return;
      }
      formData.append('image', file);

      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      const data = {
        fullName,
        email,
        password,
        imageUrl,
      };

      await axios.post('/auth/register', data)
      dispatch(fetchRegister(data))
      console.log(imageUrl)
      navigate('/login'); // перенаправление после успешной регистрации
    } catch (err) {
      alert('Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  if (window.localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
<div className={styles.avatarContainer} style={{ textAlign: 'center', marginBottom: '16px', position: 'relative' }}>
  <Avatar
    sx={{ width: 100, height: 100, margin: '0 auto 10px' }}
    src={imageUrl ? `http://localhost:4444${imageUrl}` : undefined}
    onClick={() => inputFileRef.current.click()}
  />
  <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
  {imageUrl && (
    <Button
      variant="contained"
      size='small'
      color="error"
      onClick={onClickRemoveImage}
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        transform: 'translate(-360%, 250%)', // корректируем положение кнопки
        minWidth: 'auto', // чтобы кнопка была квадратной
        padding: '4px', // уменьшаем размер кнопки
        borderRadius: '50%',
      }}
    >
      <DeleteIcon fontSize="small" />
    </Button>
  )}
</div>
<form onSubmit={handleSubmit(onSubmit)}>
        <TextField
                className={styles.field}
          variant="standard"
          label="Полное имя"
          value={fullName}
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите имя' })}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
        />
        <TextField
                className={styles.field}
          variant="standard"
          label="Email"
          value={email}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Укажите почту' })}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
                className={styles.field}
          variant="standard"
          label="Пароль"
          value={password}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Укажите пароль' })}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <div className={styles.buttons}>
          <Button type="submit" size="large" variant="contained" disabled={!isValid}>
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
          <a href="/">
            <Button size="large">Отмена</Button>
          </a>
        </div>
      </form>

    </Paper>
  );
};
