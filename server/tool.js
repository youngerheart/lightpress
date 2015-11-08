module.exports = {

  // 给表增加静态字段
  statics(schema) {
    schema.statics = {
      fetch(find, select, func) {
        return this.find(find || {}).select(select || '').sort('meta.updateAt').exec(func);
      },

      findById(id) {
        return this.findOne({_id: id}).exec();
      },

      updateWithDate(select, params, func) {
        if(!params.meta)params.meta = {};
        params.meta.updateAt = Date.now();
        return this.update(select, params).exec(func);
      }
    };
  }
};