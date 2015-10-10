module.exports = {
  list(send, res, routeParams, getParams) {
    res.status = 200;
    res.html = '<div>hello</div>';
    return send(res); // return text/html
  }
};