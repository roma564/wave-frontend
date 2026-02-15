"use client"

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function InteractiveSpace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);


    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
      if (containerRef.current) {
        gsap.fromTo(
          [img1Ref.current, img2Ref.current],
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, []);


  useEffect(() => {

    if (img1Ref.current) {
      gsap.set(img1Ref.current, {
        rotateY: -25,
        rotateX: 0,
      });
    }
    if (img2Ref.current) {
      gsap.set(img2Ref.current, {
        rotateY: -25,
        rotateX: 0,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2; // від -1 до 1
      const yNorm = (e.clientY / innerHeight - 0.5) * 2;

      if (containerRef.current) {
        // базове значення + динаміка від мишки
        const newPerspective = 1000 + xNorm * 400 + yNorm * 400;

        gsap.to(containerRef.current, {
          perspective: newPerspective,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div id="interactive-space" className="flex flex-col xl:flex-row container items-center justify-between w-full bg-[#030712] p-10 mt-20 mb-30">
      <div className="flex flex-col max-w-sm text-white">
        <h1 className="text-5xl font-bold">Interactive Space</h1>
        <p className="mt-6 text-gray-400">
          Розділяй свій простір
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-[30rem] h-[20rem] flex items-center justify-center mt-10 xl:mt-0"
        style={{ perspective: "1000px" }}
      >
        <img
          ref={img1Ref}
          src="/images/landing_page/pic1.jpg"
          alt="First"
          className="absolute w-full h-full object-cover rounded-lg shadow-lg will-change-transform z-10"
        />
        <img
          ref={img2Ref}
          src="/images/landing_page/pic2.jpg"
          alt="Second"
          className="absolute w-full h-full object-cover rounded-lg shadow-lg will-change-transform z-20  ml-20 mt-20"
        />
      </div>
    </div>
  );
}
