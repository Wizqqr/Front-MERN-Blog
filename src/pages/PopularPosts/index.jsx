import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularPosts, fetchTags } from '../../redux/slices/posts';
import { Post } from '../../components/Post/index.jsx';
import { TagsBlock } from '../../components/TagsBlock.jsx';
import { CommentsBlock } from '../../components/CommentsBlock.jsx';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import { isAuthSelector } from '../../redux/slices/auth.js';

export const PopularPosts = () => {
  const dispatch = useDispatch();
  const { popularPosts, tags } = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);
  const isAuth = useSelector(isAuthSelector)

  const isPostLoading = popularPosts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';


  React.useEffect(() => {
      dispatch(fetchPopularPosts());
      dispatch(fetchTags());
  }, [dispatch]);

  return (
      <>
          <Tabs style={{ marginBottom: 15 }} value={1} aria-label="basic tabs example">
              <Link to="/">
              <Tab label="Новые" />
              </Link>
              <Tab label="Популярные" />
              <Link to = "/myposts">
              <Tab label="Мои посты" />
              </Link>
          </Tabs>
          <Grid container spacing={4}>
              <Grid xs={8} item>
                  {(isPostLoading ? [...Array(5)] : popularPosts.items).map((obj, index) => 
                      isPostLoading ? (
                          <Post key={index} isLoading={true} />
                      ) : (
                          <Post
                              key={obj._id}
                              id={obj._id}
                              title={obj.title}
                              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                              user={obj.user}
                              createdAt={obj.createdAt}
                              viewsCount={obj.viewsCount}
                              commentsCount={obj.commentsCount || 0}
                              tags={obj.tags}
                              isEditable={userData?._id === obj.user._id}
                          />
                      )
                  )}
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