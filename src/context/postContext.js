import { createContext, useContext, useMemo, useState } from "react";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {

  const [postsInContext, setPostsInContext] = useState([]);

  const setInitialPosts = (posts) => {
    setPostsInContext(posts);
  }

  const deletePost = (id) => {
    setPostsInContext(postsInContext.filter(post => post.id !== id));
  }

  const updatePost = (post) => {
    setPostsInContext(postsInContext.map(p => p.id === post.id ? post : p));
  }

  const addPost = (post) => {
    setPostsInContext([post, ...postsInContext]);
  }

  const value = useMemo(
    () => ({
      postsInContext,
      setInitialPosts,
      deletePost,
      updatePost,
      addPost,
    }),
    [postsInContext]
  );

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  return useContext(PostsContext);
};