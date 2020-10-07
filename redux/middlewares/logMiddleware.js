const logMiddleware = (store) => (next) => (action) => {
  console.log('## Current action: ', action);
  next(action);
};

export default logMiddleware;
