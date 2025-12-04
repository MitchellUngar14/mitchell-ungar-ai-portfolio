import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import jsPDF from 'jspdf';

interface ResumeModalProps {
  onClose: () => void;
  content: string;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ onClose, content }) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (resumeRef.current) {
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.html(resumeRef.current, {
        callback: function(doc) {
          doc.save('resume.pdf');
        },
        html2canvas: {
          backgroundColor: '#111827',
        },
        autoPaging: 'text',
        margin: [10, 10, 10, 10],
        width: 190, // A4 width is 210mm, with 10mm margin on each side
        windowWidth: resumeRef.current.scrollWidth
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-full overflow-y-auto p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <div ref={resumeRef} className="prose prose-invert max-w-none p-4 bg-gray-900">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
