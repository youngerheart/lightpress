module.exports = {
  main(send, res, routeParams, getParams) {
    res.status = 200;
    res.html = '<div></div>';
    return send(res); // return text/html
  }
};
