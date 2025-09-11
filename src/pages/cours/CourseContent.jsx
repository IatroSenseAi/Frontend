"use client";

import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  ZoomOut,
  Download,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function CourseContent() {
  const { specialty, module, course } = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const viewerRef = useRef(null); // fullscreen container
  const scrollRef = useRef(null); // scrollable container
  const pageRefs = useRef({}); // refs for each page wrapper

  const [visiblePages, setVisiblePages] = useState([1]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setVisiblePages([1, numPages >= 2 ? 2 : 1]);
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await viewerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Detect current page on scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;

    // Lazy load near bottom
    if (numPages && scrollTop + clientHeight >= scrollHeight - 150) {
      setVisiblePages((prev) => {
        const maxPage = Math.max(...prev);
        if (maxPage < numPages) {
          return [...new Set([...prev, maxPage + 1])].sort((a, b) => a - b);
        }
        return prev;
      });
    }

    // Lazy load near top
    if (scrollTop <= 50 && numPages) {
      setVisiblePages((prev) => {
        const minPage = Math.min(...prev);
        if (minPage > 1) {
          return [...new Set([minPage - 1, ...prev])].sort((a, b) => a - b);
        }
        return prev;
      });
    }

    // Determine current visible page
    let current = pageNumber;
    let minDiff = Infinity;
    Object.entries(pageRefs.current).forEach(([pg, el]) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        const diff = Math.abs(
          rect.top - scrollRef.current.getBoundingClientRect().top
        );
        if (diff < minDiff) {
          minDiff = diff;
          current = parseInt(pg, 10);
        }
      }
    });
    if (current !== pageNumber) setPageNumber(current);
  };

  // Scroll to specific page
  const goToPage = (p) => {
    if (!numPages) return;
    const page = Math.min(Math.max(1, p), numPages);
    setPageNumber(page);
    const el = pageRefs.current[page];
    if (el && scrollRef.current) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Link
          to={`/cours/${specialty}/${module}`}
          className="flex items-center text-secondary hover:underline"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
        </Link>
        <h2 className="text-xl font-semibold text-secondary capitalize">
          {course.replace(/-/g, " ")}
        </h2>
      </div>

      {/* Viewer */}
      <div
        ref={viewerRef}
        className={`bg-white rounded-2xl shadow-lg p-4 ${
          isFullscreen ? "fixed inset-0 z-50" : ""
        }`}
      >
        {/* Toolbar */}
        <div
          className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md border text-sm font-medium text-gray-700 h-12"
          role="toolbar"
        >
          {/* Navigation */}
          <div className="flex items-center gap-2 pr-3 border-r self-stretch">
            <button
              onClick={() => goToPage(pageNumber - 1)}
              disabled={pageNumber <= 1}
              className="p-1 rounded hover:bg-gray-200 disabled:opacity-40"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => goToPage(pageNumber + 1)}
              disabled={pageNumber >= (numPages || 1)}
              className="p-1 rounded hover:bg-gray-200 disabled:opacity-40"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Center info */}
          <div className="flex items-center justify-center gap-4 flex-1 px-2">
            <a
              href="/test.pdf"
              download
              className="p-1 rounded hover:bg-gray-200"
            >
              <Download className="w-4 h-4" />
            </a>
            <div>
              Page <span className="font-medium">{pageNumber}</span> of{" "}
              {numPages || "?"}
            </div>
            <input
              type="text"
              value={`${Math.round(scale * 100)} %`}
              readOnly
              className="w-16 text-center border rounded-md bg-white text-sm"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 border-l pl-3 self-stretch">
            <button
              onClick={() => setScale((s) => Math.max(s - 0.1, 0.5))}
              className="p-1 rounded hover:bg-gray-200"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScale((s) => Math.min(s + 0.1, 3))}
              className="p-1 rounded hover:bg-gray-200"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-1 rounded hover:bg-gray-200"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* PDF Area */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="border rounded-xl bg-gray-100 p-4 max-h-[75vh] overflow-y-auto mt-3"
        >
          <Document
            file="/test.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex flex-col items-center gap-6"
          >
            {visiblePages.map((pg) => (
              <div
                key={`page_wrapper_${pg}`}
                ref={(el) => (pageRefs.current[pg] = el)}
                className={`w-full flex justify-center ${
                  pg === pageNumber ? "ring-2 ring-blue-400 rounded-md p-1" : ""
                }`}
              >
                <Page
                  pageNumber={pg}
                  scale={scale}
                  className="shadow-lg rounded-md bg-white"
                />
              </div>
            ))}
          </Document>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 justify-end">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition font-medium">
            Générer flashcards
          </button>
          <button className="bg-blue-100 text-blue-800 px-5 py-2 rounded-xl shadow hover:bg-blue-200 transition font-medium">
            Générer questions
          </button>
        </div>
      </div>
    </>
  );
}

export default CourseContent;
