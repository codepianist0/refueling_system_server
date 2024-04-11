function processDataGeneric(data) {
  const result = {};

  data.forEach(item => {
    Object.keys(item).forEach(key => {
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item[key]);
    });
  });

  return result;
}
module.exports = {
  processDataGeneric
}