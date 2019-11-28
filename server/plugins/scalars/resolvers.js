const Kind = require('graphql/language').Kind;

const parseLiteral = (ast) => {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;

    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);

    case Kind.OBJECT: {
      const value = Object.create(null);
      ast.fields.forEach((field) => {
        value[field.name.value] = parseLiteral(field.value);
      });
      return value;
    }

    case Kind.LIST:
      return ast.values.map(parseLiteral);

    default:
      return null;
  }
};

module.exports = {

  name: "JSON",

  description: "Generic JavaScript object",

  // gets invoked when serializing the result to send it back to a client
  serialize: (value) => {
    return value;
  },

  // gets invoked to parse client input that was passed through
  parseValue: (value) => {
    return value;
  },

  // gets invoked to parse client input that was passed inline in the query
  parseLiteral: parseLiteral

};
