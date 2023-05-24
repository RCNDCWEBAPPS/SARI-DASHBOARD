import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import PDFcomp from '../../components/pdf/create-template'
const Export = () => (
  <PDFViewer>
    <PDFcomp />
  </PDFViewer>
);


export const ExportPageCofig = {
  routes: [
    {
      path: "/export",
      exact: true,
      component: Export
    }
  ]
};

export default Export