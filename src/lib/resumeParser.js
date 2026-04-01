import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = workerSrc;

export const extractTextFromPdfFile = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);

  const loadingTask = getDocument({ data });
  const pdf = await loadingTask.promise;

  const pageTexts = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();

    const lines = textContent.items
      .map(item => item.str || '')
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (lines) {
      pageTexts.push(lines);
    }
  }

  return pageTexts.join('\n\n').trim();
};