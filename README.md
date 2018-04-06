# AOI Visualization APP

## Purpose

Visualize data from an AOI process

## Configuration:
 Bevore first start the ip adress of the etcd store needs to be configured in dashboard/wwwroot/js/private/etcdlogic.js

## Archetype Usage

App uses archetype XX with origin XXX

Upstream set to XXX

## Branching model

Standalone branch = a branch that can be pulled as a submodule in order to serve the visualization app from another app, i.e. without server components


```
Feature_Branch	Master	Standalone
	|			 |			 |
	|			 |			 |
	|			 |		?	 |
	x   ---->    x   ---->   x
	|			 |	  		 | 
	
```

# Features

* ### Plot Librarys
	* Plot.ly
	* Highcharts

* ### Server Sent Events

* ### Web Workers

* ### AJAX Call

* ### Bootstrap / Bootstrap-Select

* ### Markdown Renderer

* ### GraphQL

    #### A query language for your API
    GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

    * Pros (+)
        - After setting up the right schema and data description it is really easy to make a querry to get custom JSON packages with selected attributes
        - Easy to implement graphical graphQl interace (GraphiQl) to debug querries and stuff
        - Many available libraries for a lot of different programming languages
    * Cons (-)
        - Bad documentation especially for creating the schema definitions
        - Third party docu sources needed to get things done
        - Schema definitions getting really complex (especially for complex data structures)
        - Name convention of Data Labels is really strict (needs a lot of adjustment for given Data (aoiTestStep201677183729977.json))
        - Meaningless error messages for faults in the querry caused by wrong schemas

```javascript
      //Sample Querry for Dummy Data:
      {
        aoi {
          OperatorName
        	PanelUID
        	Layer
        	PartNumber
        	ChangeIdx
        	WrongDefectCount
        	StartTime
        	StopTime
        	Duration
        	TestResult
        	OrderNo
        	DefectCount
        	BoardsPassedCount
        	BoardsFailedCount
          BoardsUnderTest {
            BrdNr {  // <-- 3827581 Zahlen nicht möglich als Name
              ComponentsUnderTest {
                C11 { // <-- 'C1-1' Sonderzeichen nicht möglich als Name
                  TestFeature {
                    XShift { // <-- C0603-MENI-901-X-Shift Sonderzeichen nicht möglich als Name
                      Value
                      Name
                      AnalysisMode
                      FeatureFlag
                      WindowNumber
                    }
                    YShift {
                      Value
                      Name
                      AnalysisMode
                      FeatureFlag
                      WindowNumber
                    }
                  }
                  Name
                  Type
                  Position
                }
              }
            }
          }
        }
      }           
```

### Known Bugs
  * SSE with dynamic Data Update is just working with Highcharts implementation (Not yet implemented for plotly)
