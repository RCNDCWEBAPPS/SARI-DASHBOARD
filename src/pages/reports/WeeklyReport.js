import React from 'react'
import { isSameWeek } from "date-fns";
import { useEffect, useState } from "react";
import ReportComponent from "./ReportComponents";
const WeeklyReports = ({ report, title = "Products" }) => {
  const data = [];
  const [reports, setReport] = useState([]);
  useEffect(() => {
    setReport(
      report.filter((r) => {
        return isSameWeek(new Date(r.createdAt), new Date());
      })
    );
  }, [report]);
  const weeks = ["Mon", "Tue ", "Wed", "Thu", "Fri", "Sat", "Sun"];
  weeks.map((day) => {
    data.push({
      date: day,
      value: reports.filter((report) => {
        return new Date(report.createdAt).toString().split(" ")[0] == day;
      }).length,
    });
  });

  return (
    <ReportComponent data={data} CustomTooltip={CustomTooltip} title={title} />
  );
};
function CustomTooltip({ active, payload, label, title }) {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{label}</h4>
        <p>
          {payload && payload[0].value} {title}
        </p>
      </div>
    );
  }
  return null;
}
export default WeeklyReports;
