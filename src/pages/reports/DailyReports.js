import React from 'react'
import { isSameDay } from "date-fns";
import { useEffect, useState } from "react";
import ReportComponent from "./ReportComponents";
const DailyReports = ({ report, title = "Products" }) => {
  const data = [];
  const [reports, setReport] = useState([]);
  useEffect(() => {
    setReport(
      report.filter((r) => {
        return isSameDay(new Date(r.createdAt), new Date());
      })
    );
  }, [report]);

  for (let num = 0; num < 24; num++) {
    data.push({
      date: num,
      value: reports.filter((report) => {
        return new Date(report.createdAt).getHours() == num;
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
        <h4>{`${label}:00 - ${label}:59`}</h4>
        <p>
          {payload && payload[0].value} {title}
        </p>
      </div>
    );
  }
  return null;
}
export default DailyReports;
