import moment from 'moment';

export default {
  moment,
  getArticleType(query) {
    if (query.isDraft) return 'isDraft';
    else if (query.isRecycled) return 'isRecycled';
    else return 'isPublished';
  }
};
