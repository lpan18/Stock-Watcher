const helper = require('../helper');

module.exports = {

  name: "Percent",

  description: "Convert a float ratio into percent with 2 significant digits",

  serialize: (value) => {
    return helper.floatToPercent(value);
  }
};
