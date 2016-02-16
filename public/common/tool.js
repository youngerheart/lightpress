const tool = {
  notEmpty(param) {
    for(let key in param) {
      if(!param[key]) delete param[key];
    }
    return param;
  },
  format(str) {
    return moment(str).format('YY-MM-DD HH:mm');
  }
};

module.exports = () => { return tool; };
