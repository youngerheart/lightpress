// import RestError from '../services/resterror';
import Theme from '../models/theme';
// import {getQuery} from '../services/tools';

export default {
  async init(ctx, next) {
    var theme = await Theme.findOne({});
    if (theme) {
      ctx.__lg.theme = theme;
      return next();
    }
    theme = new Theme({
      name: 'demo',
      packName: 'demo',
      author: 'youngerheart',
      descption: 'default theme',
      sourceUrl: '',
      version: '1.0.0'
    });
    await theme.save();
    ctx.__lg.theme = theme;
    return next();
  }
};
