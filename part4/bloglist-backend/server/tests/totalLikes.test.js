const { totalLikes, favoriteBlog } = require('../utils/list_helper');

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
];

describe('total likes tests', () => {
  test('return 0 with an empty list', () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const oneListBlog = [blogs[0]];
    const result = totalLikes(oneListBlog); // list with 1 item
    expect(result).toBe(oneListBlog[0].likes);
  });

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(blogs); // list with 1 item
    expect(result).toBe(24);
  });
});

describe('favorite blog tests', () => {
  test('return blog with most likes', () => {
    const result = favoriteBlog(blogs);
    const expectedBlog = blogs[2];
    expect(result).toEqual(expectedBlog);
  });
});

// TODO 2 ex