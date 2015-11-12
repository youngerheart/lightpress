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
  },

  rewrite(schema) {
    schema.pre('save', function(next) {
      this.meta = {};
      if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
      } else {
        this.meta.updateAt = Date.now();
      }
      next();
    });
  }
};
