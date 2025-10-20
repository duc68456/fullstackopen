const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const blogsLikes = blogs.map(blog => blog.likes)

  const reducer = (sum, item) => {
    return sum + item
  }

  return blogsLikes.length === 0
  ? 0
  : blogsLikes.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
  const reducer = (numberOfBlogs, blog) => {
    const authorAndBlogs = numberOfBlogs.find(nob => nob.author === blog.author)
    if (authorAndBlogs) {
      numberOfBlogs.map(nob => nob.author !== authorAndBlogs.author ? nob : {
        author: nob.author,
        number: nob.blogs++
      })
      // authorAndBlogs.blogs++
    } else {
      numberOfBlogs = numberOfBlogs.concat({
        author: blog.author,
        blogs: 1
      })
    }
    return numberOfBlogs
  }

  let numberOfBlogs = blogs.reduce(reducer, [])

  const getMostBlogs = (a, b) => {
    return b.blogs > a.blogs ? b : a
  }

  return numberOfBlogs.reduce(getMostBlogs)
}

const mostLikes = (blogs) => {
  const reducer = (numberOfLikes, blog) => {
    const authorAndLikes = numberOfLikes.find(nol => nol.author === blog.author)
    if (authorAndLikes) {
      numberOfLikes = numberOfLikes.map(nol => nol.author !== authorAndLikes.author ? nol : {
        author: nol.author,
        likes: nol.likes + blog.likes
      })
    } else {
      numberOfLikes = numberOfLikes.concat({
        author: blog.author,
        likes: blog.likes
      })
    }
    return numberOfLikes
  }

  let authorAndLikes = blogs.reduce(reducer, [])

  console.log('author and likes: ',authorAndLikes)

  const mostLikes = (a, b) => {
    return b.likes > a.likes ? b : a
  }

  return authorAndLikes.reduce(mostLikes)
}

module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
  mostLikes
}