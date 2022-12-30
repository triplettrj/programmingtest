import React, { useEffect, useState } from "react"
import { Scatter } from "react-chartjs-2"
import { Chart } from "chart.js/auto"
import { scatter } from 'chart.js'

function Spaghettidiagram({datalog}) {

  const solution = (datalog, ary = [], i = 0) => {
    if(i === datalog.length) return ary
    ary.push({x: datalog[i][5], y: datalog[i][6]}) 
    return solution(datalog, ary, i = i + 1)
  }

  const dataSetSpag = solution(datalog)

  const [clickedPoint, setClickedPoint] = useState(null);

  const handleClick = (event, points) => {
    //console.log(`x: ${points[0]._model.x}, y: ${points[0]._model.y}`)
    //console.log(points)
    //setClickedPoint(points[0]);
  };
  
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
          display: false
        }
      }
    },
  }
  
  return (
    <div width="5">
      <Scatter
        data={chartData}
        options={chartOptions}
        onClick={handleClick}
      />
    </div>
  )
}

export default Spaghettidiagram