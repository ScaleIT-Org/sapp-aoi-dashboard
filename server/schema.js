var graphql = require ('graphql');
var path = require('path');
var fs = require('fs');

var testJsonSchemaPath = path.join(__dirname,'../data/aoiTestSchema.json');
var jsonSchemadata = JSON.parse(fs.readFileSync(testJsonSchemaPath, 'utf8'));

// Here is some dummy data to make this piece of code simpler.
// It will be changeable after introducing mutation.
var TODOs = [
  {
    "id": 1446412739542,
    "title": "Read emails",
    "completed": false
  },
  {
    "id": 1446412740883,
    "title": "Buy orange",
    "completed": true
  }
];

var parsedData = [
{"BoardsUnderTest": {
    "XXX": {
      "ComponentsUnderTest": {
        "C11": {
          "TestFeature": {
            "bla": 123,
            "blabla": 234 
          },
          "TestFeature": {
            "bla": 3,
            "blabla": 4 
          },
          "Name": "C1-1",
          "Type": "C0603",
          "Position": "1"
        }
      },
      "TestResult": true,
      "IsBadBoard": false,
      "BoardUID": "3827581"
    }
  }
}
];


var queryType = new graphql.GraphQLObjectType({
  name: 'root',
  fields: function () {
    return {
      aoi: {
        type: new graphql.GraphQLList(BoardsUnderTest),
        resolve: function () {
          return parsedData;
        }
      }
    }
  }
});

var BoardsUnderTest = new graphql.GraphQLObjectType({
  name: 'Boards',
  fields: function () {
    return {
      'BoardsUnderTest': {
        type: new graphql.GraphQLNonNull(XXX),
      }
    }
  }
});

var XXX = new graphql.GraphQLObjectType({
  name: 'XXX',
  fields: function () {
    return {
      'XXX': {
        type: new graphql.GraphQLNonNull(ComponentsUnderTest),
      }
    }
  }
});

var ComponentsUnderTest = new graphql.GraphQLObjectType({
  name: 'ComponentsUnderTest',
  fields: function () {
    return {
      'ComponentsUnderTest': {
        type: new graphql.GraphQLNonNull(component),
      }
    }
  }
});

var component = new graphql.GraphQLObjectType({
  name: 'component',
  fields: function () {
    return {
      'C11': {
        type: new graphql.GraphQLList(TFType),

      }
    }
  }
});


const TestFeatureType = new graphql.GraphQLObjectType({
  name: 'TestFeatureType',
  fields: {
    bla: {
      type: graphql.GraphQLString
    },
    blabla: {
      type: graphql.GraphQLString
    }
  }
});

const TFType = new graphql.GraphQLObjectType({
  name: 'TFType',
  fields: {
    TestFeature: {
      type: new graphql.GraphQLList(TestFeatureType),

    }
  }
});


var TestFeature = new graphql.GraphQLObjectType({
  name: 'TestFeature',
  fields: function () {
    return {
      'TestFeature': {
        type: graphql.GraphQLString,
      }
    }
  }
});



module.exports = new graphql.GraphQLSchema({
  query: queryType
});
