import axios from 'axios'

// --- FAKE DATABASE ---
const allFakePosts = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  type: i % 4 === 0 ? 'Recruit' : 'Normal',
  user: {
    name: `User Name ${i + 1}`,
    title: 'UX Designer @ Devn Technology',
    timestamp: `2${(i % 6) + 1} Nov at 12:24 PM`,
    avatar: `https://placehold.co/48x48/EFEFEF/AAAAAA?text=U${i + 1}`,
  },
  content: `Đây là nội dung của bài đăng thứ ${
    i + 1
  }. Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
  media: i % 3 === 0 ? `https://placehold.co/600x250/F0F2F5/CCCCCC?text=Image+${i + 1}` : null,
  stats: {
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 50),
    applies: i % 4 === 0 ? Math.floor(Math.random() * 50) : null,
  },
}))
// --- END FAKE DATABASE ---

const apiClient = axios.create({
  baseURL: 'https://api.yourdomain.com/v1',
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const createPostApi = async (postData) => {
  console.log('Creating post with data:', postData)
  const newPost = {
    id: Math.random(),
    type: postData.type,
    user: {
      name: 'Ne Lam',
      title: 'You',
      timestamp: 'Just now',
      avatar: 'https://placehold.co/48x48/EFEFEF/AAAAAA?text=NL',
    },
    content: postData.content,
    stats: { likes: 0, comments: 0, applies: postData.type === 'Recruit' ? 0 : null },
  }
  return new Promise((resolve) => setTimeout(() => resolve(newPost), 500))
}

export const getPostsApi = async (page = 1, limit = 5) => {
  console.log(`Fetching posts for page: ${page}`)
  const totalPosts = allFakePosts.length
  const totalPages = Math.ceil(totalPosts / limit)
  const startIndex = (page - 1) * limit
  const paginatedPosts = allFakePosts.slice(startIndex, startIndex + limit)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ posts: paginatedPosts, totalPages: totalPages })
    }, 800)
  })
}
