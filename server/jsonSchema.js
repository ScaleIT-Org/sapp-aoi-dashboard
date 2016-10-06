const {
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLNonNull
} = require('graphql')


const BoardsUnderTestType = new GraphQLObjectType({
    name: 'BoardsUnderTest',
    fields: {
        3827581: {
            description: 'enter your description',
            type: new GraphQLNonNull(BoardsUnderTest3827581Type),
            // TODO: Implement resolver for 3827581
            resolve: () => null,
        }
    },
});


const BoardsUnderTest3827581Type = new GraphQLObjectType({
    name: '3827581',
    fields: {
        ComponentsUnderTest: {
            description: 'enter your description',
            type: new GraphQLNonNull(3827581 ComponentsUnderTestType),
            // TODO: Implement resolver for ComponentsUnderTest
            resolve: () => null,
        },
        TestResult: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLBoolean),
            // TODO: Implement resolver for TestResult
            resolve: () => null,
        },
        IsBadBoard: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLBoolean),
            // TODO: Implement resolver for IsBadBoard
            resolve: () => null,
        },
        BoardUID: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for BoardUID
            resolve: () => null,
        }
    },
});


const 3827581 ComponentsUnderTestType = new GraphQLObjectType({
    name: 'ComponentsUnderTest',
    fields: {
        C1 - 1: {
            description: 'enter your description',
            type: new GraphQLNonNull(ComponentsUnderTestC11Type),
            // TODO: Implement resolver for C1-1
            resolve: () => null,
        }
    },
});


const ComponentsUnderTestC11Type = new GraphQLObjectType({
    name: 'C1-1',
    fields: {
        TestFeature: {
            description: 'enter your description',
            type: new GraphQLNonNull(C1 - 1 TestFeatureType),
            // TODO: Implement resolver for TestFeature
            resolve: () => null,
        },
        Name: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for Name
            resolve: () => null,
        },
        Type: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for Type
            resolve: () => null,
        },
        Position: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for Position
            resolve: () => null,
        }
    },
});


const C1 - 1 TestFeatureType = new GraphQLObjectType({
    name: 'TestFeature',
    fields: {
        C0603 - MENI - 901 - X - Shift: {
            description: 'enter your description',
            type: new GraphQLNonNull(TestFeatureC0603MENI901XShiftType),
            // TODO: Implement resolver for C0603-MENI-901-X-Shift
            resolve: () => null,
        },
        C0603 - MENI - 901 - Y - Shift: {
            description: 'enter your description',
            type: new GraphQLNonNull(TestFeatureC0603MENI901YShiftType),
            // TODO: Implement resolver for C0603-MENI-901-Y-Shift
            resolve: () => null,
        }
    },
});


const TestFeatureC0603MENI901XShiftType = new GraphQLObjectType({
    name: 'C0603-MENI-901-X-Shift',
    fields: {
        Value: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for Value
            resolve: () => null,
        },
        Name: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for Name
            resolve: () => null,
        },
        AnalysisMode: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for AnalysisMode
            resolve: () => null,
        },
        FeatureFlag: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for FeatureFlag
            resolve: () => null,
        },
        WindowNumber: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for WindowNumber
            resolve: () => null,
        }
    },
});


const TestFeatureC0603MENI901YShiftType = new GraphQLObjectType({
    name: 'C0603-MENI-901-Y-Shift',
    fields: {
        Value: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for Value
            resolve: () => null,
        },
        Name: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for Name
            resolve: () => null,
        },
        AnalysisMode: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for AnalysisMode
            resolve: () => null,
        },
        FeatureFlag: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for FeatureFlag
            resolve: () => null,
        },
        WindowNumber: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString),
            // TODO: Implement resolver for WindowNumber
            resolve: () => null,
        }
    },
});


module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: () => ({
            OperatorName: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for OperatorName
                resolve: () => null,
            },
            PanelUID: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for PanelUID
                resolve: () => null,
            },
            Layer: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for Layer
                resolve: () => null,
            },
            PartNumber: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for PartNumber
                resolve: () => null,
            },
            ChangeIdx: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for ChangeIdx
                resolve: () => null,
            },
            WrongDefectCount: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLInt),
                // TODO: Implement resolver for WrongDefectCount
                resolve: () => null,
            },
            StartTime: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for StartTime
                resolve: () => null,
            },
            StopTime: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for StopTime
                resolve: () => null,
            },
            Duration: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLInt),
                // TODO: Implement resolver for Duration
                resolve: () => null,
            },
            TestResult: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLBoolean),
                // TODO: Implement resolver for TestResult
                resolve: () => null,
            },
            OrderNo: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLInt),
                // TODO: Implement resolver for OrderNo
                resolve: () => null,
            },
            DefectCount: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLInt),
                // TODO: Implement resolver for DefectCount
                resolve: () => null,
            },
            BoardsPassedCount: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLInt),
                // TODO: Implement resolver for BoardsPassedCount
                resolve: () => null,
            },
            BoardsFailedCount: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLInt),
                // TODO: Implement resolver for BoardsFailedCount
                resolve: () => null,
            },
            Value: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for Value
                resolve: () => null,
            },
            Name: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for Name
                resolve: () => null,
            },
            AnalysisMode: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for AnalysisMode
                resolve: () => null,
            },
            FeatureFlag: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for FeatureFlag
                resolve: () => null,
            },
            WindowNumber: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for WindowNumber
                resolve: () => null,
            },
            C0603 - MENI - 901 - X - Shift: {
                description: 'enter your description',
                type: new GraphQLNonNull(TestFeatureC0603MENI901XShiftType),
                // TODO: Implement resolver for C0603-MENI-901-X-Shift
                resolve: () => null,
            },
            Value: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for Value
                resolve: () => null,
            },
            Name: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for Name
                resolve: () => null,
            },
            AnalysisMode: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for AnalysisMode
                resolve: () => null,
            },
            FeatureFlag: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for FeatureFlag
                resolve: () => null,
            },
            WindowNumber: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for WindowNumber
                resolve: () => null,
            },
            C0603 - MENI - 901 - Y - Shift: {
                description: 'enter your description',
                type: new GraphQLNonNull(TestFeatureC0603MENI901YShiftType),
                // TODO: Implement resolver for C0603-MENI-901-Y-Shift
                resolve: () => null,
            },
            TestFeature: {
                description: 'enter your description',
                type: new GraphQLNonNull(C1 - 1 TestFeatureType),
                // TODO: Implement resolver for TestFeature
                resolve: () => null,
            },
            Name: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for Name
                resolve: () => null,
            },
            Type: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for Type
                resolve: () => null,
            },
            Position: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for Position
                resolve: () => null,
            },
            C1 - 1: {
                description: 'enter your description',
                type: new GraphQLNonNull(ComponentsUnderTestC11Type),
                // TODO: Implement resolver for C1-1
                resolve: () => null,
            },
            ComponentsUnderTest: {
                description: 'enter your description',
                type: new GraphQLNonNull(3827581 ComponentsUnderTestType),
                // TODO: Implement resolver for ComponentsUnderTest
                resolve: () => null,
            },
            TestResult: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLBoolean),
                // TODO: Implement resolver for TestResult
                resolve: () => null,
            },
            IsBadBoard: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLBoolean),
                // TODO: Implement resolver for IsBadBoard
                resolve: () => null,
            },
            BoardUID: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for BoardUID
                resolve: () => null,
            },
            3827581: {
                description: 'enter your description',
                type: new GraphQLNonNull(BoardsUnderTest3827581Type),
                // TODO: Implement resolver for 3827581
                resolve: () => null,
            },
            BoardsUnderTest: {
                description: 'enter your description',
                type: new GraphQLNonNull(BoardsUnderTestType),
                // TODO: Implement resolver for BoardsUnderTest
                resolve: () => null,
            }
        })
    })
})