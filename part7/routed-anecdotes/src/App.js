import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch, useHistory } from 'react-router-dom';
const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <Link to={`anecdotes/${anecdote.id}`} key={anecdote.id}>
          <li>{anecdote.content}</li>
        </Link>
      ))}
    </ul>
  </div>
);

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <h3>Created by{anecdote.author}</h3>
      <p>has {anecdote.votes} votes</p>
      <p>For more info, see {anecdote.info}</p>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an incident. Occasionally humorous, anecdotes differ from jokes because
      their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, such as to characterize a
      person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of
      a short narrative. An anecdote is "a story with a point."
    </em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://courses.helsinki.fi/fi/tkt21009">Full Stack -websovelluskehitys</a>. See{' '}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
);

const CreateNew = ({ addNew }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content,
      author,
      info,
      votes: 0,
    });
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name="info" value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const Notification = ({ notification }) => {
  return notification ? <p>{notification}</p> : null;
};

const App = () => {
  const history = useHistory();

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ]);

  const [notification, setNotification] = useState('');
  const [home, setHome] = useState(null);

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`${anecdote.content} has been added!`);
    history.push('/');
    setTimeout(() => {
      setNotification('');
    }, 10000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useRouteMatch('/anecdotes/:id');
  console.log('match es', match);
  const anecdote = match ? anecdoteById(match.params.id) : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification notification={notification} />
      <Menu />
      <Route path="/" exact>
        <AnecdoteList anecdotes={anecdotes} />
      </Route>
      <Route path="/anecdotes/:id" exact>
        <Anecdote anecdote={anecdote} />
      </Route>
      <Route path="/about" exact>
        <About />
      </Route>
      <Route path="/create" exact>
        <CreateNew addNew={addNew} />
      </Route>
      <Footer />
    </div>
  );
};

export default App;