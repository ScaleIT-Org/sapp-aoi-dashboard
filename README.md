# AOI Visualization APP

## Purpose

Visualize data from an AOI process

## Archetype Usage

App uses archetype XX with origin XXX

Upstream set to XXX

## Branching model

Standalone branch = a branch that can be pulled as a submodule in order to serve the visualization app from another app, i.e. without server components

~~~~
```
Feature_Branch	Master	Standalone
	|			 |			 |
	|			 |			 |
	|			 |		?	 |
	x   ---->    x   ---->   x
	|			 |	  		 | 
	
```
~~~~

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
