const url = {
  auth: {
    login: "/api/v1/social/auth/login",
    register: "/api/v1/social/auth/register",
  },
  posts: {
    createPost: "/api/v1/social/posts?_author=true&_comments=true&_reactions=true",
    allPostsLimitFifty: "/api/v1/social/posts?_author=true&_comments=true&_reactions=true&limit=50",
    allPostsNextFifty: "/api/v1/social/posts?_author=true&_comments=true&_reactions=true&limit=50&offset=50",
    getPost: (id) => `/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`,
    getPostsByFollowing: `/api/v1/social/posts/following?_author=true&_comments=true&_reactions=true`,
    postsByAuthor: (author) => `/api/v1/social/profiles/${author}/posts?_author=true&_comments=true&_reactions=true`,
    reactToPost: (id, symbol) => `/api/v1/social/posts/${id}/react/${symbol}`,
    comment: (id) => `/api/v1/social/posts/${id}/comment`,
    deletePost: (id) => `/api/v1/social/posts/${id}`,
    editPost: (id) => `/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`,
  },
  profiles: {
    profiles: "/api/v1/social/profiles?limit=200",
    profile: (name) => `/api/v1/social/profiles/${name}`,
    UpdateProfileMedia: (name) => `/api/v1/social/profiles/${name}/media`,
    getFollowers: (name) => `/api/v1/social/profiles/${name}?_followers=true`,
    getFollowing: (name) => `/api/v1/social/profiles/${name}?_following=true`,
    getFollowers: (name) => `/api/v1/social/profiles/${name}?_following=true`,
    getFollowersAndFollowing: (name) => `/api/v1/social/profiles/${name}?_following=true&_followers=true`,
    follow: (name) => `/api/v1/social/profiles/${name}/follow`,
    unFollow: (name) => `/api/v1/social/profiles/${name}/unfollow`
  }
}

export default url;





