const limit = "limit=100"

const url = {

    auth: {
        login: "/api/v1/social/auth/login",
        register: "/api/v1/social/auth/register",
    },

    posts: {
        createPost: "/api/v1/social/posts?_author=true&_comments=true&_reactions=true",

        allPostsWithAuthorAndReactions: "/api/v1/social/posts?_author=true&_comments=true&_reactions=true",

        getPost: (id) => {
            return `/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`
        },

        postsByAuthor: (author) => {
            return `/api/v1/social/profiles/${author}/posts?_author=true&_comments=true&_reactions=true`
        },

        reactToPost: (id, symbol) => {
            return `/api/v1/social/posts/${id}/react/${symbol}`
        },
        comment: (id) => {
            return `/api/v1/social/posts/${id}/comment`
        },

        deletePost: (id) => {
            return `/api/v1/social/posts/${id}`
        },

        editPost: (id) => {
            return `/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`
        }
    },

    profiles: {
        profiles: "/api/v1/social/profiles",

        profile: (name) => {
            return `/api/v1/social/profiles/${name}`
        },

        UpdateProfileMedia: (name) => {
            return `/api/v1/social/profiles/${name}/media`
        },

        getFollowers: (name) => {
            return `/api/v1/social/profiles/${name}?_followers=true`
        },

        getFollowing: (name) => {
            return `/api/v1/social/profiles/${name}?_following=true`
        },

        getFollowers: (name) => {
            return `/api/v1/social/profiles/${name}?_following=true`
        },

        getFollowersAndFollowing: (name) => {
            return `/api/v1/social/profiles/${name}?_following=true&_followers=true`
        },

        follow: (name) => {
            return `/api/v1/social/profiles/${name}/follow`
        },

        unFollow: (name) => {
            return `/api/v1/social/profiles/${name}/unfollow`
        }
    }
}

export default url;





