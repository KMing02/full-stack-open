var _ = require('lodash')

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

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    const authorList = _.uniq(blogs.map(b => b.author))
    const max = {author: "", blogs: 0}
    authorCount = _.pick(_.countBy(blogs, 'author'), authorList)
    
    for (let [key, value] of Object.entries(authorCount)) {
        if (value > max.blogs) {
            max.author = key
            max.blogs = value
        }
    }
    return max
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    let likesCounts = blogs.reduce((likesCount, blog) => {
        likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes
        return likesCount
    }, {})
    let maxCount = Math.max(...Object.values(likesCounts))
    let mostLiked = Object.keys(likesCounts).filter(author => likesCounts[author] === maxCount)
    return {
        author: mostLiked[0],
        likes: maxCount
    }
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }