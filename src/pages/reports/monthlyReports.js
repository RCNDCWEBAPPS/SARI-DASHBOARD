import React from 'react'
import { isSameMonth } from "date-fns";
import { useEffect, useState } from "react";
import ReportComponent from "./ReportComponents";
const MonthlyReports = ({ report, title = "Products" }) => {
  const data = [];
  const [reports, setReport] = useState([]);
  useEffect(() => {
    setReport(
      report.filter((r) => {
        return isSameMonth(new Date(r.createdAt), new Date());
      })
    );
  }, [report]);

  for (let day = 1; day <= 30; day++) {
    data.push({
      date: day,
      value: reports.filter((report) => {
        return new Date(report.createdAt).getDate() == day;
      }).length,
    });
  }
  return (
    <ReportComponent data={data} CustomTooltip={CustomTooltip} title={title} />
  );
};
function CustomTooltip({ active, payload, label, title }) {
  if (active) {
    return (
      <div className="tooltip">
        <h4>Day {label}</h4>
        <p>
          {payload && payload[0].value} {title}
        </p>
      </div>
    );
  }
  return null;
}
export default MonthlyReports;
