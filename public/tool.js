const tool = {
  notEmpty(param) {
    for(let key in param) {
      if(!param[key]) delete param[key];
    }
    return param;
  }
};

module.exports = tool;
