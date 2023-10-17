import React, { useEffect, useState, useRef } from "react"
import { Scatter, getDatasetAtEvent } from "react-chartjs-2"
import Papa from 'papaparse'
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
      setBackgroundImage(`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${data[0].avatar_url}`)
      setCsvDataurl(`https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/${data[0].datalogUrl}`)
    }
  }, [data])
  
  useEffect(() => {
    fetch(cvsDataurl)
    .then(response => response.text())
      .then(csv => {
        Papa.parse(csv, {
          delimiter: "",	
          newline: "",	
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
          setCsvData(results.data)
          }
        })
      })
  }, [cvsDataurl])

function convertArray(arrayOfArrays) {
  const keys = ["timestamp", "value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9", "value10", "value11", "value12", "value13", "value14", "value15", "value16"]
  const arrayOfObjects = arrayOfArrays.map((array) => {
      const object = {}
      array.forEach((value, index) => {
          if (keys[index]) {
              object[keys[index]] = value
          }
      })
      return object
  })
  const newArray = arrayOfObjects.map(object => ({x: object.value4, y: object.value5}))
  return newArray
}

  useEffect(() => {
    if (csvData) {
      const newArr = convertArray(csvData)
      setDataSetSpag(newArr)
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
    ],
  }

  const chartOptions = {
    scales: {
      x: {
        display: false, 
        grid: {
          drawBorder: false,
          display: false
        }
      },
      y: {
        display: false, 
        grid: {
          drawBorder: false,
          display: false,
        },
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
  }, [backgroundImage])

  return (
    <div>
      <style>{`canvas {
        background-image: url('${backgroundImage}')
        }`}
      </style>
      {data ? 
      <>
        <div>
          <Scatter
            onClick={handleBackgroundimageClick}
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