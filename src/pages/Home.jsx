import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, fetchTags } from '../redux/slices/posts.js';
import {Link } from 'react-router-dom'
import { isAuthSelector } from '../redux/slices/auth.js';

export const Home = () => {
  const dispatch = useDispatch();
  const {posts, tags} = useSelector(state => state.posts);
  const userData = useSelector((state) => state.auth.data)
  const isAuth = useSelector(isAuthSelector)

  const isPostLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);
  

  console.log(posts)

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        
        <Tab label="Новые" />
        <Link to = "/popular">
        <Tab label="Популярные" />
        </Link>
        <Link to = "/myposts">
        <Tab label="Мои посты" />
        </Link>
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {( isPostLoading? [...Array(5)] : posts.items).map((obj, index) => 
          isPostLoading ? (
            <Post key={index} isLoading={true}></Post>
          ): (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
        <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
