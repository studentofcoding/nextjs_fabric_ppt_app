"use client"

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Canvas = dynamic(() => import('../components/Canvas'), { ssr: false });

export default function Home() {
  const [slides, setSlides] = useState([{}]); // Initial slide
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const addSlide = () => {
    setSlides([...slides, {}]);
    setCurrentSlideIndex(slides.length);
  };

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const updateSlideContent = (content: any) => {
    const updatedSlides = slides.map((slide, index) =>
      index === currentSlideIndex ? { ...slide, content } : slide
    );
    setSlides(updatedSlides);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Presentation App</h1>
      <Canvas slide={slides[currentSlideIndex]} updateSlideContent={updateSlideContent} />
      <div className="mt-8">
        <button onClick={prevSlide} disabled={currentSlideIndex === 0} className="mr-4">
          Previous
        </button>
        <button onClick={nextSlide} disabled={currentSlideIndex === slides.length - 1} className="mr-4">
          Next
        </button>
        <button onClick={addSlide}>
          Add Slide
        </button>
      </div>
    </main>
  );
}