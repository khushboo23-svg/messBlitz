import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function Char({ feedbacks }) {
  const [currentPage, setCurrentPage] = useState(0);
  const timeLabels = ['Morning', 'Noon', 'Evening', 'Dinner'];

  const generateChartData = (feedback, index) => {
    return {
      labels: ['0', '1', '2', '3', '4'],
      datasets: [
        {
          label: `Ratings for ${timeLabels[index]}`,
          data: feedback,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // Force step size to 1 and only integer values
          stepSize: 1,
          callback: function(value) {
            if (value % 1 === 0) {
              return value;
            }
          }
        }
      }
    }
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, feedbacks.length - 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%' }}>
        <div style={{ width: '100%', height: '100%', backgroundColor: 'rgb(19, 10, 86)' }}>
          <Bar data={generateChartData(feedbacks[currentPage], currentPage)} options={chartOptions} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10%' }}>
        <button onClick={goToPreviousPage} disabled={currentPage === 0} style={{ margin: '2px', backgroundColor: 'rgb(19, 10, 86)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          <ArrowLeftIcon />
        </button>
        <span style={{ fontSize: '16px' }}> Page {currentPage + 1} of {feedbacks.length} </span>
        <button onClick={goToNextPage} disabled={currentPage === feedbacks.length - 1} style={{ margin: '2px', backgroundColor: 'rgb(19, 10, 86)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

export default Char;
