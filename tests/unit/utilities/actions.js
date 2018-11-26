function findAction(store, type) {
  return store.getActions().find(action => action.type === type);
}

function getAction(store, type) {
  const action = findAction(store, type);
  if (action) return Promise.resolve(action);

  return new Promise((resolve) => {
    store.subscribe(() => {
      const foundAction = findAction(store, type);
      if (foundAction) resolve(foundAction);
    });
  });
}


export default getAction;
