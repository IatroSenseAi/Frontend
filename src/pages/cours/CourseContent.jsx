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
  const [pageDimensions, setPageDimensions] = useState({});

  const viewerRef = useRef(null);
  const scrollRef = useRef(null);
  const pageRefs = useRef({});
  const containerRef = useRef(null);

  const [visiblePages, setVisiblePages] = useState([1]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setVisiblePages([1, numPages >= 2 ? 2 : 1]);
  };

  const onPageLoadSuccess = (page) => {
    setPageDimensions((prev) => ({
      ...prev,
      [page.pageNumber]: {
        width: page.width,
        height: page.height,
      },
    }));
  };

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setContainerWidth(width);
        setMaxScale(width < 768 ? 4 : 3);
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

  // Progress calculation
  const progress = numPages ? Math.round((pageNumber / numPages) * 100) : 0;

  return (
    <div className="font-manrope">
      {/* Header */}
      <div className="flex items-center gap-1 mb-2 2xl:mx-6">
        <Link
          to={`/cours/${specialty}/${module}`}
          className="flex items-center text-secondary hover:underline"
        >
          <ArrowLeft className="w-4 h-4 2xl:w-8 2xl:h-8 mr-1" />
        </Link>
        <h2 className="text-sm md:text-base 2xl:text-3xl  text-secondary capitalize">
          {course.replace(/-/g, " ")}
        </h2>
      </div>

      {/* Progress bar */}
      <div className="mb-3 2xl:mx-6">
        <div className="flex justify-between text-xs font-medium text-secondary mb-1">
          <div className="flex items-center">
            <img
              src="/cours-active.svg"
              alt="cours"
              className="w-5 h-5 2xl:w-10 2xl:h-10 mr-1"
            />
            <span className="capitalize text-base font-bold 2xl:text-3xl">
              {course.replace(/-/g, " ")}
            </span>
          </div>
          <span className="text-base 2xl:text-2xl">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-primary h-1.5 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Viewer */}
      <div
        ref={viewerRef}
        className={`2xl:p-4 ${
          isFullscreen ? "fixed inset-0 bg-white z-50" : ""
        }`}
      >
        <div className="relative" ref={containerRef}>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="max-h-[50vh] md:max-h-[55vh] 2xl:max-h-[62vh] overflow-y-auto hide-scrollbar"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <Document
              file="/test.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex flex-col items-center"
              loading={
                <div className="text-center py-6 text-xs">Loading PDF...</div>
              }
            >
              {visiblePages.map((pg) => (
                <div
                  key={`page_wrapper_${pg}`}
                  ref={(el) => (pageRefs.current[pg] = el)}
                  className="flex justify-center mb-4 w-full" // Increased margin-bottom for better spacing
                  style={{
                    minHeight: pageDimensions[pg]
                      ? `${pageDimensions[pg].height * scale}px`
                      : "auto",
                  }}
                >
                  <div
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: "top center",
                    }}
                    className="max-w-full origin-top" // Added origin-top to ensure scaling from top
                  >
                    <Page
                      pageNumber={pg}
                      width={containerWidth}
                      className="h-auto"
                      loading={
                        <div className="text-center py-3 text-xs">
                          Loading page {pg}...
                        </div>
                      }
                      renderTextLayer={false}
                      onLoadSuccess={onPageLoadSuccess}
                    />
                  </div>
                </div>
              ))}
            </Document>
          </div>

          {/* Toolbar */}
          <div className="absolute -bottom-2 left-0 right-0 z-10 flex justify-center">
            <div
              className="flex items-center justify-between bg-gray-50 px-2 py-1 rounded-md border border-secondary text-[10px] md:text-xs font-medium text-gray-700 h-8 md:h-9 w-11/12 shadow-md"
              role="toolbar"
            >
              {/* Navigation */}
              <div className="flex items-center gap-1 pr-2 border-r border-secondary h-full">
                <button
                  onClick={() => goToPage(pageNumber - 1)}
                  disabled={pageNumber <= 1}
                  className="p-0.5 rounded text-secondary cursor-pointer hover:bg-gray-200 disabled:opacity-40"
                >
                  <ChevronUp className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                </button>
                <button
                  onClick={() => goToPage(pageNumber + 1)}
                  disabled={pageNumber >= (numPages || 1)}
                  className="p-0.5 rounded text-secondary cursor-pointer hover:bg-gray-200 disabled:opacity-40"
                >
                  <ChevronDown className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                </button>
              </div>

              {/* Center info */}
              <div className="flex items-center justify-between gap-2 flex-1 px-2 h-full border-r border-secondary">
                <a
                  href="/test.pdf"
                  download
                  className="p-0.5 rounded text-secondary hover:bg-gray-200 cursor-pointer"
                >
                  <Download className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                </a>
                <div>
                  P {pageNumber}/{numPages || "?"}
                </div>
                <input
                  type="text"
                  value={`${Math.round(scale * 100)} %`}
                  readOnly
                  className="w-12 text-center border border-secondary rounded bg-white text-[10px] md:text-xs"
                />
              </div>

              {/* Zoom + fullscreen */}
              <div className="flex items-center gap-1 px-2 h-full">
                <button
                  onClick={handleZoomOut}
                  disabled={scale <= 0.5}
                  className="p-0.5 rounded text-secondary hover:bg-gray-200 disabled:opacity-40 cursor-pointer"
                >
                  <ZoomOut className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                </button>
                <button
                  onClick={handleZoomIn}
                  disabled={scale >= maxScale}
                  className="p-0.5 rounded text-secondary  hover:bg-gray-200 disabled:opacity-40 cursor-pointer"
                >
                  <ZoomIn className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                </button>
              </div>
              <div className="border-l border-secondary pl-2">
                <button
                  onClick={toggleFullscreen}
                  className="p-0.5 rounded text-secondary hover:bg-gray-200 cursor-pointer"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                  ) : (
                    <Maximize2 className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons under viewer */}
      <div className="flex gap-2 justify-center my-4">
        <button className="flex items-center gap-2 px-8 py-1.5 text-[11px] md:text-sm  2xl:text-lg  font-manrope font-semibold bg-primary text-white rounded-full shadow hover:bg-secondary transition cursor-pointer">
          Générer flashcards
        </button>
        <button className="flex items-center gap-2 px-8 py-1.5 text-[11px] md:text-sm font-manrope font-semibold bg-accent text-primary rounded-full shadow hover:bg-secondary transition cursor-pointer 2xl:text-lg">
          Générer questions
        </button>
      </div>
    </div>
  );
}

export default CourseContent;
