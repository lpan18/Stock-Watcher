const config = require("config"),
  profile_url = config.company.profile.url;

module.exports = {
  profileURL: companySymbol => {
    return `${profile_url}/${companySymbol}`;
  }
};
