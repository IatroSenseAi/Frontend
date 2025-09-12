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
  const [containerWidth, setContainerWidth] = useState(0);
  const [maxScale, setMaxScale] = useState(3);

  const viewerRef = useRef(null);
  const scrollRef = useRef(null);
  const pageRefs = useRef({});
  const containerRef = useRef(null);

  const [visiblePages, setVisiblePages] = useState([1]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setVisiblePages([1, numPages >= 2 ? 2 : 1]);
  };

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setContainerWidth(width);
        setMaxScale(width < 768 ? 4 : 3); // mobile allows more zoom
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => {
      window.removeEventListener("resize", updateContainerWidth);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await viewerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const ensurePageVisible = (pageNum) => {
    setVisiblePages((prev) => {
      if (!prev.includes(pageNum)) {
        return [...prev, pageNum].sort((a, b) => a - b);
      }
      return prev;
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;

    if (numPages && scrollTop + clientHeight >= scrollHeight - 150) {
      setVisiblePages((prev) => {
        const maxPage = Math.max(...prev);
        if (maxPage < numPages) {
          return [...new Set([...prev, maxPage + 1])].sort((a, b) => a - b);
        }
        return prev;
      });
    }

    if (scrollTop <= 50 && numPages) {
      setVisiblePages((prev) => {
        const minPage = Math.min(...prev);
        if (minPage > 1) {
          return [...new Set([minPage - 1, ...prev])].sort((a, b) => a - b);
        }
        return prev;
      });
    }

    // detect current page
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

  const goToPage = (p) => {
    if (!numPages) return;
    const page = Math.min(Math.max(1, p), numPages);
    setPageNumber(page);
    ensurePageVisible(page);

    setTimeout(() => {
      const el = pageRefs.current[page];
      if (el && scrollRef.current) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);
  };

  const handleZoomIn = () => {
    setScale((s) => Math.min(s + 0.1, maxScale));
  };

  const handleZoomOut = () => {
    setScale((s) => Math.max(s - 0.1, 0.5));
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

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
        className={`p-4 ${isFullscreen ? "fixed inset-0  bg-white" : ""}`}
      >
        <div className="relative " ref={containerRef}>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="max-h-[70vh]  overflow-y-auto hide-scrollbar"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <Document
              file="/test.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex flex-col items-center"
              loading={<div className="text-center py-10">Loading PDF...</div>}
            >
              {visiblePages.map((pg) => (
                <div
                  key={`page_wrapper_${pg}`}
                  ref={(el) => (pageRefs.current[pg] = el)}
                  className="flex justify-center mb-4 w-full"
                >
                  <div
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: "top center",
                    }}
                    className="max-w-full"
                  >
                    <Page
                      pageNumber={pg}
                      width={containerWidth}
                      className="h-auto"
                      loading={
                        <div className="text-center py-5">
                          Loading page {pg}...
                        </div>
                      }
                      renderTextLayer={false}
                    />
                  </div>
                </div>
              ))}
            </Document>
          </div>

          {/* Toolbar */}
          <div className="absolute -bottom-4 left-0 right-0 z-10 flex justify-center">
            <div
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md border border-secondary text-sm font-medium text-gray-700 h-12 w-11/12 shadow-md"
              role="toolbar"
            >
              {/* Navigation */}
              <div className="flex items-center gap-2 pr-3 border-r border-secondary h-full">
                <button
                  onClick={() => goToPage(pageNumber - 1)}
                  disabled={pageNumber <= 1}
                  className="p-1 rounded text-secondary cursor-pointer hover:bg-gray-200 disabled:opacity-40"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => goToPage(pageNumber + 1)}
                  disabled={pageNumber >= (numPages || 1)}
                  className="p-1 rounded text-secondary cursor-pointer hover:bg-gray-200 disabled:opacity-40"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Center info */}
              <div className="flex items-center justify-between gap-4 flex-1 px-3 h-full border-r border-secondary">
                <a
                  href="/test.pdf"
                  download
                  className="p-1 rounded text-secondary hover:bg-gray-200 cursor-pointer" 
                >
                  <Download className="w-4 h-4" />
                </a>
                <div className="text-toolbar">
                  Page <span className="font-medium ">{pageNumber}</span> of{" "}
                  {numPages || "?"}
                </div>
                <input
                  type="text"
                  value={`${Math.round(scale * 100)} %`}
                  readOnly
                  className="w-16 text-center border border-secondary text-toolbar rounded-md bg-white text-sm"
                />
              </div>

              {/* Zoom + fullscreen */}
              <div className="flex items-center gap-2 px-3 h-full">
                <button
                  onClick={handleZoomOut}
                  disabled={scale <= 0.5}
                  className="p-1 rounded text-secondary hover:bg-gray-200 disabled:opacity-40 cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleZoomIn}
                  disabled={scale >= maxScale}
                  className="p-1 rounded text-secondary  hover:bg-gray-200 disabled:opacity-40 cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
              <div className="border-l border-secondary pl-3">
                <button
                  onClick={toggleFullscreen}
                  className="p-1 rounded text-secondary hover:bg-gray-200 cursor-pointer"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons under viewer */}
      <div className="flex gap-3 mt-6 justify-end">
        <button className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition font-medium">
          Générer flashcards
        </button>
        <button className="bg-blue-100 text-blue-800 px-5 py-2 rounded-xl shadow hover:bg-blue-200 transition font-medium">
          Générer questions
        </button>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
    </>
  );
}

export default CourseContent;
