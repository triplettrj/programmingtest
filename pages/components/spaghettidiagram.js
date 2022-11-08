import React, { useEffect } from "react"
import { Scatter } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"


function Spaghettidiagram({datalog}) {

  const solution = (datalog, ary = [], i = 0) => {
    if(i === datalog.length) return ary
    ary.push({x: datalog[i][5], y: datalog[i][6]}) 
    return solution(datalog, ary, i = i + 1)
  }

  const dataSetSpag = solution(datalog)
  
  const chartData = {
      datasets: [
      {
        label: "",
        data: dataSetSpag,
        showLine: true,
        tension: 0.4,
      }
      ]
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
    <div width="5"><Scatter data={chartData} options={chartOptions} onClick={(event => console.log(event))}/></div>
  )
}

export default Spaghettidiagram;