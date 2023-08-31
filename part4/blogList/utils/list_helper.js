const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const sum = (acc, blog) => {
        return (acc+blog.likes)
    }
    return blogs.reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
    const helper = (best, nextBlog) => {
        if (best.likes <= nextBlog.likes) {
            return nextBlog
        } else {
            return best
        }
    }

    return blogs.reduce(helper, blogs[0])
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }