const floatToPercent = value => {
  if (Number.isNaN(Number.parseFloat(value))) {
    return null;
  }

  return Math.round(value * 10000) / 100;
};

module.exports = {
  floatToPercent: floatToPercent
};

