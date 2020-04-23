const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const result = blogs.map((blog) => blog.likes).reduce(reducer, 0);

  return result;
};

const favoriteBlog = (blogs) => {
   const favoriteBlog = blogs.reduce((blogA, blogB) => (blogA.likes > blogB.likes ? blogA : blogB));
   return favoriteBlog;
};


const authorWithMoreBlogs = (blogs) => {

    for(let i = 0; i)

    return;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorWithMoreBlogs
};
