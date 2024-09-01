import React from "react";
import {useParams} from 'react-router-dom'
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from '../axios.js'
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, isAuthSelector } from "../redux/slices/auth.js";
import ReactMarkdown from 'react-markdown'


export const FullPost = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();
  const isAuth = useSelector(isAuthSelector)


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Получите токен из localStorage
        const headers = {
          'Authorization': `Bearer ${token}`, // Добавьте токен в заголовок
        };
        const userId = localStorage.getItem('userId'); // Получите userId из localStorage
        const viewedPostsKey = `viewedPosts_${userId}`;
        const viewedPosts = JSON.parse(localStorage.getItem(viewedPostsKey)) || [];
        const hasViewed = viewedPosts.includes(id);
        const url = `/posts/${id}?incrementViews=${!hasViewed && isAuth ? 'true' : 'false'}`;
        const res = await axios.get(url, { headers });

        setData(res.data);
        setLoading(false);
    
        if (!hasViewed && isAuth) {
          localStorage.setItem(viewedPostsKey, JSON.stringify([...viewedPosts, id]));
        }
      } catch (err) {
        console.error('Error fetching post:', err.response ? err.response.data : err.message);
        alert('Ошибка при получении статьи');
        setLoading(false);
      }
    };
    

    fetchData();
  }, [id, isAuth]);
  
  if(isLoading){
    return <Post isLoading = {isLoading} isFullPost></Post>
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl= { data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children ={data.text}></ReactMarkdown>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
