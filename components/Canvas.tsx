import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

interface CanvasProps {
    slide: any;
    updateSlideContent: (content: any) => void;
  }
  
  const Canvas: React.FC<CanvasProps> = ({ slide, updateSlideContent }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  
    useEffect(() => {
      if (canvasRef.current) {
        fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
          width: 800,
          height: 600,
        });
      }
  
      return () => {
        fabricCanvasRef.current?.dispose();
      };
    }, []);
  
    useEffect(() => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.clear();
        if (slide.content) {
          fabricCanvasRef.current.loadFromJSON(slide.content);
        }
      }
    }, [slide]);
  
    const saveContent = () => {
      if (fabricCanvasRef.current) {
        const content = fabricCanvasRef.current.toJSON();
        updateSlideContent(content);
      }
    };
  
    const addRectangle = () => {
      if (fabricCanvasRef.current) {
        const rect = new fabric.Rect({
          left: 100,
          top: 100,
          fill: 'red',
          width: 60,
          height: 70,
        });
        fabricCanvasRef.current.add(rect);
        saveContent();
      }
    };
  
    const addCircle = () => {
      if (fabricCanvasRef.current) {
        const circle = new fabric.Circle({
          left: 200,
          top: 200,
          fill: 'green',
          radius: 50,
        });
        fabricCanvasRef.current.add(circle);
        saveContent();
      }
    };
  
    return (
      <div>
        <div className="toolbar">
          <button onClick={addRectangle}>Add Rectangle</button>
          <button onClick={addCircle}>Add Circle</button>
        </div>
        <canvas ref={canvasRef} />
      </div>
    );
  };
  
  export default Canvas;