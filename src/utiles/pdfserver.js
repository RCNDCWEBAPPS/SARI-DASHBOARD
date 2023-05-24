import ReactPDF from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PDFcomp from '../components/pdf/create-template';
export default async function EXPORTPDF(minTime, maxTime, products) {
        const doc = <PDFcomp from={minTime} to={maxTime} data={products} />;
        const asPdf = pdf(); // {} is important, throws without an argument
        asPdf.updateContainer(doc);
        const blob = await asPdf.toBlob();
        saveAs(blob, 'document.pdf');
    // ReactPDF.render(<PDFcomp from={minTime} to={maxTime} data={products} />, `${__dirname}/report.pdf`);
}