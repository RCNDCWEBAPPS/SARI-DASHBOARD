import React from 'react'
import { isSameYear } from "date-fns";
import { useEffect, useState } from "react";
import ReportComponent from "./ReportComponents";
const YearlyReports = ({ report, title = "Products" }) => {
  const data = [];
  const [reports, setReport] = useState([]);
  useEffect(() => {
    setReport(
      report.filter((r) => {
        return isSameYear(new Date(r.createdAt), new Date());
      })
    );
  }, [report]);

  const Months = [
    "Jan",
    "Feb ",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  Months.map((month) => {
    data.push({
      date: month,
      value: reports.filter((report) => {
        return new Date(report.createdAt).toString().split(" ")[1] == month;
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
export default YearlyReports;
