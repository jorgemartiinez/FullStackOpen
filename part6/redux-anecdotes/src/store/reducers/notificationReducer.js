// * REDUCER
const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload.message;
    case 'HIDE':
      return '';
    default:
      return state;
  }
};

// * ACTIONS

const show = (message, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW',
      payload: { message },
    });
    setTimeout(() => {
      dispatch(hide());
    }, seconds * 1000);
  };
};

const hide = () => {
  return {
    type: 'HIDE',
    payload: {},
  };
};

export { show, hide, reducer };
