import React, { useState, useEffect } from 'react';
import './MonthYearStyle.css';

function MonthYearDropdown({ onFind }) {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Fetch months and years from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/months-years')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Extract unique months and years
  const months = [...new Set(data.map((item) => item.month))];
  const years = [...new Set(data.map((item) => item.year))];

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  function handleFind(){
    // send the selected month and year to the parent component
    onFind(selectedMonth,selectedYear);

  };

  return (
    <div className="mainDropDownContainer">
    <div className="dropdown-container">
      <label htmlFor="month" className="label">Month:</label>
      <select
        id="month"
        value={selectedMonth}
        onChange={handleMonthChange}
        className="select"
      >
        <option value="">--Select Month--</option>
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>

    <div className="dropdown-container">
      <label htmlFor="year" className="label">Year:</label>
      <select
        id="year"
        value={selectedYear}
        onChange={handleYearChange}
        className="select"
      >
        <option value="">--Select Year--</option>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
    <button className='findButton' onClick={handleFind}>Find</button>
  </div>

  );
}

export default MonthYearDropdown;
