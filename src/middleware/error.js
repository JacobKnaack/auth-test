'use strict';

function _handleStatus(err) {
  if (err.toLowerCase().includes('access denied')) {
    return 403
  } else if (err.toLowerCase().includes('not found')) {
    return 400;
  }

  return 500;
}

module.exports = (err, req, res, next) => {
  console.error('__SERVER_ERROR__', err);
  let error = { error: err.message || err };
  res.statusCode = _handleStatus(err);
  res.statusMessage = err.statusMessage || 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};
