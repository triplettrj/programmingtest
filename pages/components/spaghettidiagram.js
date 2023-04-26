import React, { useEffect, useState, useRef } from "react"
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
  const chartRef = useRef(null)
  const [width, setWidth] = useState(null)
  const [height, setHeight] = useState(null)
  const [backgroundImage, setBackgroundImage] = useState('')
  const [cvsDataurl, setCsvDataurl] = useState('')

  useEffect(() => {
    if(data) {
      console.log('this is data inside if', data)
      console.log('this is datalogUrl on spag comp', data[0].datalogUrl)
      console.log('this is avatar url on spag comp', data[0].avatar_url)
      setBackgroundImage(`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${data[0].avatar_url}`)
      setCvsDataurl(`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${data[0].datalogUrl}`)
      console.log('this is backgroundImage', backgroundImage)
      console.log('this is cvsDataurl', cvsDataurl)
    }
  }, [data])
  


  useEffect(() => {
    fetch(cvsDataurl)
    //fetch("https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/avatars/1673426291910_2021_09_15__1352__marvelmind.csv")
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
            setCsvData(results.data)
          }
        })
      })
  }, [cvsDataurl])

//   const convertcvsData = (cvs) => {
//     let xData = [];
//     let yData = [];
//       const xColumn = 3; //4 and 5 if the csv file has just raw data (3 and 4 if first 2 rows are non data)
//       const yColumn = 4;
//       xData = cvs.map((d) => d[xColumn])
//       yData = cvs.map((d) => d[yColumn])
//     return xData.map((x, i) => ({ x, y: yData[i] }))
//   }

//   //START HERE TO CHECK IF FIRST ELEment of the array is a number then convertcvsData with 5 and 6 if not do covertvcsData with 4 and 5

//   function convertToArrayOfObjects(originalArray) {
//     return originalArray.map(function(obj) {
//         let newObj = Object.assign({}, obj["__parsed_extra"]);
//         return newObj;
//     });
// }

function convertArray(arrayOfArrays) {
  const keys = ["timestamp", "value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9", "value10", "value11", "value12", "value13", "value14", "value15", "value16"];
  const arrayOfObjects = arrayOfArrays.map((array) => {
      const object = {};
      array.forEach((value, index) => {
          if (keys[index]) {
              object[keys[index]] = value;
          }
      });
      return object;
  });
  const newArray = arrayOfObjects.map(object => ({x: object.value4, y: object.value5}));
  return newArray;
}

  useEffect(() => {
    if (csvData) {
      console.log('convertArray(cvsData)', convertArray(csvData))
      const newArr = convertArray(csvData)
      setDataSetSpag(newArr)
      console.log('this chartData', dataSetSpag)
    }
  }, [csvData])
  
  const chartData = {
    datasets: [
      {
        label: "",
        data: dataSetSpag,
        showLine: true,
        tension: 0.4,
        pointStyle: 'circle',
        pointRadius: 1,
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
        display: false, //remove the x axis display once the scalling is resolved 
        grid: {
          drawBorder: false,
          display: false
        }
      },
      y: {
        display: false, //remove the y axis display once the scalling is resolved
        grid: {
          drawBorder: false,
          display: false,
        },
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
    },
    responsive: false,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
        labels: {
            fontSize: 0
        }
      }
    },

  }

  const inlinestyle = {
    position: "absolute",
    left: `${backgroundimageX}px`,
    top: `${backgroundimageY}px`,
    zindex: -1,
  }

  const handleBackgroundimageClick = (e) => {
    setBackgroundimageX(e.nativeEvent.offsetX)
    setBackgroundimageY(e.nativeEvent.offsetY)
  }


  //finding the background image width and height to use as the scatter width and height
  useEffect(() => {
    const image = new Image()
    image.src = backgroundImage
    image.onload = () => {
      setWidth(image.width)
      setHeight(image.height)
    }
  }, [backgroundImage]);

  console.log('this is image width', width,' heght ', height)

  return (
    <div  >
      <style>{`canvas {
        background-image: url('${backgroundImage}')
        }`}
      </style>
      {data ? 
      <>
      <div onClick={handleBackgroundimageClick}>
        
        <Scatter
          ref={chartRef}
          data={chartData}
          options={chartOptions}
          style={{width: `${width}px`, height: `${height}px`}}
        />
        
        <div> 
          <div style={inlinestyle}>
            O  |
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