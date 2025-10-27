import React, { useRef, useState } from "react";
import { Column, Stack } from "../Layout/Layout";
import "./Testimonials.scss";
import ThemedText from "../ThemedText/ThemedText";
import { ReactComponent as Logo } from "../../assets/svgs/Logo.svg";
import Card from "./Card";

const cards = [
    {
      name: "Jack F",
      title: "Ex Blackrock PM",
      content: "Love how Loch integrates portfolio\nanalytics and whale watching into\none unified app.",
    },
    {
      name: "Yash P",
      title: "Research, 3poch Crypto Hedge Fund",
      content: "I use Loch everyday now. I don't think\nI could analyze crypto whale trends\nmarkets without it. I'm addicted!",
    },
    {
      name: "Shiv S",
      title: "Co-Founder Magik Labs",
      content: "Managing my own portfolio is helpfuland well designed.\n What's really interestingis watching the whales though.\n No one else has made whale tracking so simple.",
    },
  ];

const Testimonials = () => {
  const rowRef = useRef(null);

  const [isDrag, setIsDrag] = useState(false);
  const pos = useRef({ startX: 0, scrollLeft: 0 });

  const onPointerDown = (e) => {
    if (!rowRef.current) return;
    rowRef.current.setPointerCapture(e.pointerId);
    setIsDrag(true);
    pos.current = {
      startX: e.clientX,
      scrollLeft: rowRef.current.scrollLeft,
    };
  };

  const onPointerMove = (e) => {
    if (!isDrag || !rowRef.current) return;
    const dx = e.clientX - pos.current.startX;
    rowRef.current.scrollLeft = pos.current.scrollLeft - dx;
  };

  const endDrag = (e) => {
    if (!rowRef.current) return;
    try {
      rowRef.current.releasePointerCapture(e.pointerId);
    } catch {}
    setIsDrag(false);
  };

  return (
    <Column className="testimonials" gap="md" align="flex-end">
      <Column className="testimonials_heading" align="flex-end">
        <ThemedText.h4>Testimonials</ThemedText.h4>
        <div className="line" />
      </Column>

      <Stack className="testimonials_content_wrapper" align="flex-end">
        <div className="logo_wrap">
          <Logo className="logo_svg" />
        </div>
        <div
          className={`cards_container ${isDrag ? "dragging" : ""}`}
          ref={rowRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
        >
          {cards.map((details) => (
            <Card details={details} />
          ))}
        </div>
      </Stack>
    </Column>
  );
};

export default Testimonials;
