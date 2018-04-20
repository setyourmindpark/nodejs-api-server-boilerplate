const escape              = require('mysql').escape;

exports.pagingPre = () => {
  return 'SELECT AAA.* FROM (';
}

exports.pagingPost = (model) => {
  return `) AAA LIMIT ${escape(model.startRow)}, ${model.endRow}`;
}
