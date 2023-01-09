import React, { useEffect, useState } from "react"
import { Scatter, getDatasetAtEvent } from "react-chartjs-2"
import Papa from 'papaparse';
import { Chart } from "chart.js/auto"
import { scatter } from 'chart.js'

function Spaghettidiagram({data}) {
  const [csvData, setCsvData] = useState([])
  const [dataSetSpag, setDataSetSpag] = useState([])
  const [clickedPoint, setClickedPoint] = useState(null)
  const [backgroundimageX, setBackgroundimageX] = useState(null)
  const [backgroundimageY, setBackgroundimageY] = useState(null)

  useEffect(() => {
    fetch('https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/avatars/1667958550823_Johanna%20(1)%20-%20Copy.csv')
      .then(response => response.text())
      .then(csv => {
        Papa.parse(csv, {
          delimiter: "",	// auto-detect
          newline: "",	// auto-detect
          quoteChar: '"',
          escapeChar: '"',
          header: false,
          transformHeader: undefined,
          dynamicTyping: false,
          preview: 0,
          encoding: "",
          worker: false,
          comments: false,
          step: undefined,
          complete: undefined,
          error: undefined,
          download: false,
          downloadRequestHeaders: undefined,
          downloadRequestBody: undefined,
          skipEmptyLines: false,
          chunk: undefined,
          chunkSize: undefined,
          fastMode: undefined,
          beforeFirstChunk: undefined,
          withCredentials: undefined,
          transform: undefined,
          delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
          complete: results => {
            // Convert the parsed data to JSON and store it in state
            setCsvData(results.data);
          }
        })
      })
  }, [])

  const convertcvsData = (cvs) => {
    let xData = [];
    let yData = [];
      const xColumn = 4;
      const yColumn = 5;
      xData = cvs.map((d) => d[xColumn])
      yData = cvs.map((d) => d[yColumn])
    return xData.map((x, i) => ({ x, y: yData[i] }))
  }
  
  useEffect(() => {
    if (csvData) {
      setDataSetSpag(convertcvsData(csvData))
      console.log('this chartData', dataSetSpag)
    }
  }, [csvData])
  
  console.log('this chartData', dataSetSpag)
  
  const chartData = {
    datasets: [
      {
        label: "",
        data: dataSetSpag,
        showLine: true,
        tension: 0.4,
        pointStyle: 'circle',
        pointRadius: 5,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointHoverBorderWidth: 0,
      },
      //stopping point option 1: click on scatter and add new data set
      {
        label: '',
        data: [clickedPoint],
        showLine: false,
        pointStyle: 'circle',
        pointRadius: 10,
        pointBackgroundColor: 'rgba(255, 159, 64, 1)',
        pointHoverBorderWidth: 0,
      },
    ],
  }
  
  const chartOptions = {
    scales: {
      x: {
        //display: false, //remove the x axis display once the scalling is resolved 
        grid: {
          drawBorder: false,
          display: false
        }
      },
      y: {
        //display: false, //remove the y axis display once the scalling is resolved
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          // other tick options...
          max: 200, // set the maximum value to 657
        }
      }
    },
    onClick: function(evt, element) {
      console.log('this the evt', evt)
      //console.log(getDatasetAtEvent(chartRef.current, evt))
      //console.log('this the element', element)
        //console.log('this the element', element[0].element.$context.parsed)
      
      
  
    },
    point: {
      events: {
        click: function(event) {
          // Get the x and y values of the clicked point

        }
      }
    }
    
  }

  //stopping point option 2: click on div container
  const inlinestyle = {
    position: "relative",
    //left: `${backgroundimageX}px`,
    //top: `${backgroundimageY}px`,
    zindex: -1,
  }

  const handleBackgroundimageClick = (e) => {
    setBackgroundimageX(e.nativeEvent.offsetX)
    setBackgroundimageY(e.nativeEvent.offsetY)
  }

  if(data){
    console.log('this is datalogUrl on spag comp', data[0].datalogUrl)
    console.log('this is avatar url on spag comp', data[0].avatar_url)
  }

  return (
    <div  >
      {data ? 
      <>
      <div>
        <Scatter
          data={chartData}
          options={chartOptions}
          //onClick={handleClick}
          style={{backgroundImage: `url(https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${data[0].avatar_url}`,}}
        />
        <div  onClick={handleBackgroundimageClick}> 
          <div style={inlinestyle}>
            o   
          <input type="text" placeholder='Title' />
          <input type="text" placeholder='Duration' />
          <button type={"submit"}>Submit</button>
          </div>  
        </div>
      </div>
      

      </>
      : ""}
    </div>
      

  )
}

export default Spaghettidiagram