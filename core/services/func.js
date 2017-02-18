import moment from 'moment';
import {tplObj} from './args';

export default {
  moment,
  getArticleType(query) {
    if (query.isDraft) return 'isDraft';
    else if (query.isRecycled) return 'isRecycled';
    else return 'isPublished';
  },
  getTpl(moduleName) {
    return tplObj[moduleName] || moduleName;
  },
  getSearchStr(query, newQuery) {
    var arr = [];
    query = Object.assign(query, newQuery);
    for (var key in query) {
      arr.push(`${key}=${query[key]}`);
    }
    return '?' + arr.join('&');
  }
};
