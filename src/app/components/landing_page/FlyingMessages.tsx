"use client"

import { useEffect } from "react";
import gsap from "gsap";

export default function FlyingMessages() {
  useEffect(() => {
    const messages = gsap.utils.toArray<HTMLElement>(".message");


    const positions = [
      { x: 120,  y: 180 },
      { x: 350, y: 20 },
      { x: 40, y: 100 },
      { x: 280, y: 220 },
      { x: 320, y: 90 },
      { x: 350, y: 160 },
      { x: 50,  y: 220 },
      { x: 70,  y: 20 }, //shield
    ];

    messages.forEach((msg, i) => {
      gsap.set(msg, {
        x: positions[i].x,
        y: positions[i].y,
        scale: 1.3,
        
      });

      gsap.to(msg, {
        y: positions[i].y + 20,
        duration: gsap.utils.random(2, 4),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 2),
      });
    });
  }, []);

  return (
    <div className="relative w-130 h-full overflow-hidden ml-15">
      <img src="/images/landing_page/flying_messages/message_1.png" className="message absolute w-12 h-12 object-contain glow" />
      <img src="/images/landing_page/flying_messages/message_2.png" className="message absolute w-12 h-12 object-contain" />
      <img src="/images/landing_page/flying_messages/message_3.png" className="message absolute w-12 h-12 object-contain" />
      <img src="/images/landing_page/flying_messages/message_4.png" className="message absolute w-12 h-12 object-contain" />
      <img src="/images/landing_page/flying_messages/message_5.png" className="message absolute w-12 h-12 object-contain" />
      <img src="/images/landing_page/flying_messages/message_6.png" className="message absolute w-12 h-12 object-contain" />
      <img src="/images/landing_page/flying_messages/message_7.png" className="message absolute w-12 h-12 object-contain" />
      <img src="/images/landing_page/flying_messages/message_8.png" className="message absolute w-12 h-12 object-contain" />
    </div>
  );
}
