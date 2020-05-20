// * REDUCER
const reducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.payload.dataToFilter;
    default:
      return state;
  }
};

// * ACTIONS

const filter = (dataToFilter) => {
  return {
    type: 'FILTER',
    payload: {
      dataToFilter,
    },
  };
};

export { filter, reducer };
