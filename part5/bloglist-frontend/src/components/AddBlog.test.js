import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import AddBlog from './AddBlog';

describe('add blog tests', () => {
  test('test new blog form', () => {
    const createBlog = jest.fn();

    const component = render(<AddBlog handleAddBlog={createBlog} />);

    const form = component.container.querySelector('#addBlog');
    const authorInput = component.container.querySelector('#author');
    const titleInput = component.container.querySelector('#title');
    const urlInput = component.container.querySelector('#url');

    fireEvent.change(authorInput, { target: { value: 'Jorge' } });
    fireEvent.change(titleInput, { target: { value: 'Blog 1' } });
    fireEvent.change(urlInput, { target: { value: 'dontknow.com' } });

    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);

  });
});
