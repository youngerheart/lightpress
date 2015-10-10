
var Sequelize = require('sequelize');
var sequelize = new Sequelize('lightpress', 'root', '', {
  host: '127.0.0.1',
  port: 3306,
  dialect : 'mysql'
});

var idObj = {
  type: Sequelize.INTEGER,
  autoIncrement: true,
  primaryKey: true,
  unique: true
};

var numObj = {
  type: Sequelize.INTEGER,
  defaultValue: 0
};

// definition

module.exports = {
  ArticleDB: sequelize.define('Article', {
    id: idObj,
    title: Sequelize.STRING,
    tags: Sequelize.STRING,
    category: Sequelize.STRING,
    createDate: Sequelize.DATE,
    modifyDate: Sequelize.DATE,
    visitor: numObj
  });

  ArticleTextDB: sequelize.define('ArticleText', {
    id: idObj,
    content: Sequelize.TEXT
  });

  TagDB: sequelize.define('Tag', {
    id: idObj,
    name: Sequelize.STRING,
    number: numObj
  });

  CategoryDB: sequelize.define('Category', {
    id: idObj,
    name: Sequelize.STRING,
    number: numObj
  });

  CommentDB: sequelize.define('Comment', {
    id: idObj,
    target: Sequelize.INTEGER,
    content: Sequelize.TEXT,
    zanNum: numObj
  });
};

// ArticleDB.sync().then(() => {

// });
