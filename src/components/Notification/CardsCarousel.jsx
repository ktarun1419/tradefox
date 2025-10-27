import React, { useEffect, useRef, useState } from "react";
import "./CardsCarousel.scss";
import NotificationCard from "./Cards/NotificationCard";
import FundCard from "./Cards/FundCard";
import ClockCard from "./Cards/ClockCard";

const CardCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  const cards = [
    { key: "n1", node: <NotificationCard /> },
    { key: "f1", node: <FundCard /> },
    { key: "c1", node: <ClockCard /> },
    { key: "n2", node: <NotificationCard /> },
    { key: "f2", node: <FundCard /> },
    { key: "c2", node: <ClockCard /> },
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let scrollPosition = 0;
    const speed = 0.5;
    
    const animate = () => {
      if (!isPaused) {
        scrollPosition += speed;
        
        
        const cardWidth = 13 * 16 + 0.75 * 16; 
        const totalWidth = cardWidth * 3;
    
        if (scrollPosition >= totalWidth) {
          scrollPosition = 0;
        }
        
        track.style.transform = `translateX(-${scrollPosition}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  return (
    <div className="carousel-wrapper">
      <div
        className="icon-cards"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Infinite conveyor carousel"
      >
        <div className="icon-cards__viewport">
          <div className="icon-cards__track" ref={trackRef}>
            {cards.map((item) => (
              <div className="icon-cards__item" key={item.key}>
                {item.node}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
