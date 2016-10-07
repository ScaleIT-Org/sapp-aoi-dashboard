var graphql = require ('graphql');


var dummyData = 
{ "OperatorName": "",
  "PanelUID": "382758",
  "Layer": "B",
  "PartNumber": "2060817",
  "ChangeIdx": "",
  "WrongDefectCount": 0,
  "StartTime": "2016-06-08T10:33:50",
  "StopTime": "2016-06-08T10:34:11",
  "Duration": 17,
  "TestResult": false,
  "OrderNo": 0,
  "DefectCount": 1,
  "BoardsPassedCount": 0,
  "BoardsFailedCount": 0,
  "BoardsUnderTest": {
    "BrdNr": {
      "ComponentsUnderTest": {
        "C11": {
          "TestFeature": {
            "XShift": {
              "Value": "-17",
              "Name": "C0603-MENI-901-X-Shift",
              "AnalysisMode": "MENI",
              "FeatureFlag": "0",
              "WindowNumber": "901"
            },
            "YShift": {
              "Value": "67",
              "Name": "C0603-MENI-901-Y-Shift",
              "AnalysisMode": "MENI",
              "FeatureFlag": "0",
              "WindowNumber": "901"
            }
          },
          "Name": "C1-1",
          "Type": "C0603",
          "Position": "1"
        }
        }
      },
      "TestResult": true,
      "IsBadBoard": false,
      "BoardUID": "3827581"
    }
}
;


var queryType = new graphql.GraphQLObjectType({
  name: 'root',
  fields: function () {
    return {
      aoi: {
        type: new graphql.GraphQLNonNull(BoardsUnderTest),
        resolve: function () {
          return dummyData;
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
        type: new graphql.GraphQLNonNull(BrdNr),
      },
      "OperatorName":  {
        type: graphql.GraphQLString,
      },
      "PanelUID":  {
        type: graphql.GraphQLString,
      },
      "Layer":  {
        type: graphql.GraphQLString,
      },
      "PartNumber":  {
        type: graphql.GraphQLString,
      },
      "ChangeIdx":  {
        type: graphql.GraphQLString,
      },
      "WrongDefectCount":  {
        type: graphql.GraphQLString,
      },
      "StartTime":  {
        type: graphql.GraphQLString,
      },
      "StopTime":  {
        type: graphql.GraphQLString,
      },
      "Duration":  {
        type: graphql.GraphQLString,
      },
      "TestResult":  {
        type: graphql.GraphQLString,
      },
      "OrderNo":  {
        type: graphql.GraphQLString,
      },
      "DefectCount":  {
        type: graphql.GraphQLString,
      },
      "BoardsPassedCount":  {
        type: graphql.GraphQLString,
      },
      "BoardsFailedCount":  {
        type: graphql.GraphQLString,
      },
    }
  }
});

var BrdNr = new graphql.GraphQLObjectType({
  name: 'BrdNr',
  fields: function () {
    return {
      'BrdNr': {
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
        type: new graphql.GraphQLNonNull(TestFeature),
      }
    }
  }
});


var TestFeature = new graphql.GraphQLObjectType({
  name: 'TestFeature',
  fields: function () {
    return {
      'TestFeature': {
        type: new graphql.GraphQLNonNull(shift),
      },
      'Name': {
        type: graphql.GraphQLString,
      },
      'Type': {
        type: graphql.GraphQLString,
      },
      'Position': {
        type: graphql.GraphQLString,
      },
    }
  }
});

var shift = new graphql.GraphQLObjectType({
  name: 'shift',
  fields: function () {
    return {
      'XShift': {
        type: new graphql.GraphQLNonNull(Xshift),
      },
      'YShift': {
        type: new graphql.GraphQLNonNull(Yshift),
      }
    }
  }
});
var Xshift = new graphql.GraphQLObjectType({
  name: 'Xshift',
  fields: function () {
    return {
      "Value":  {
        type: graphql.GraphQLString,
      },
      "Name":  {
        type: graphql.GraphQLString,
      },
      "AnalysisMode":  {
        type: graphql.GraphQLString,
      },
      "FeatureFlag":  {
        type: graphql.GraphQLString,
      },
      "WindowNumber":  {
        type: graphql.GraphQLString,
      }
    }
  }
});
var Yshift = new graphql.GraphQLObjectType({
  name: 'Yshift',
  fields: function () {
    return {
      "Value":  {
        type: graphql.GraphQLString,
      },
      "Name":  {
        type: graphql.GraphQLString,
      },
      "AnalysisMode":  {
        type: graphql.GraphQLString,
      },
      "FeatureFlag":  {
        type: graphql.GraphQLString,
      },
      "WindowNumber":  {
        type: graphql.GraphQLString,
      }
    }
  }
});



module.exports = new graphql.GraphQLSchema({
  query: queryType
});
