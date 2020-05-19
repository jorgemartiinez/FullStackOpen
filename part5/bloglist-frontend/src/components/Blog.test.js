import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

let comp;
let mockLikes;

beforeEach(() => {
  const blog = {
    id: '123456gfs',
    title: 'Blog 1',
    author: 'Geralt of Rivia',
    url: 'fullstackopen.com',
    likes: 300,
    user: {
      id: '123',
      name: 'Idk',
    },
  };

  mockLikes = jest.fn();
  comp = render(<Blog blog={blog} handleAddLike={mockLikes} handleRemove={() => {}} userId="whatever" />);
  // comp.debug();
});

describe('single blog tests', () => {
  test('renders blog title and author only', () => {
    // shows title and author
    expect(comp.container).toHaveTextContent('Blog 1');
    expect(comp.container).toHaveTextContent('Geralt of Rivia');

    // doesn't show other stuff
    expect(comp.container).not.toHaveTextContent('fullstackopen.com');
    expect(comp.container).not.toHaveTextContent('300');
  });

  test('url and likes show when button is clicked', () => {
    // we click the button
    const button = comp.getByText('View');
    fireEvent.click(button);
    // comp.debug();

    // expecting to show the other properties
    expect(comp.container).toHaveTextContent('fullstackopen.com');
    expect(comp.container).toHaveTextContent('300');
  });

  test('like button is called twice', () => {
    // we click the to view all properties, like button included
    const viewBtn = comp.getByText('View');
    fireEvent.click(viewBtn);

    // we click like btn twice
    const likeBtn = comp.getByText('Like');
    fireEvent.click(likeBtn);
    fireEvent.click(likeBtn);
    expect(mockLikes.mock.calls).toHaveLength(2);
  });

});
