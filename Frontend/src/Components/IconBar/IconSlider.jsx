import React, { useEffect, useState, forwardRef } from "react";
import IconBar from "./IconBar";
import iconLists from "../../utils/iconNameOrder";
import { motion, useMotionValue, animate } from "framer-motion";
import useMeasure from "react-use-measure";

const MovingBar = motion(IconBar);

const IconSlider = forwardRef((props, forwardedRef) => {
  const [measureRef, { width }] = useMeasure(); // Renaming to avoid conflict
  const [initialWidth, setInitialWidth] = useState(null);

  const xTranslation1 = useMotionValue(0);
  const xTranslation2 = useMotionValue(0);
  const xTranslation3 = useMotionValue(0);

  useEffect(() => {
    if (width > 0 && initialWidth === null) {
      setInitialWidth(width); // Store width only once
    }
  }, [width, initialWidth]); // Run only once when width is first set

  useEffect(() => {
    if (!initialWidth) return; // Ensure width is set before animating

    const animateBar = (xTranslation, width, duration) => {
      const controls = animate(xTranslation, [0, -width], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
      return () => controls.stop();
    };

    const cleanup1 = animateBar(xTranslation1, initialWidth, 35);
    const cleanup2 = animateBar(xTranslation2, initialWidth, 75);
    const cleanup3 = animateBar(xTranslation3, initialWidth, 55);

    return () => {
      cleanup1();
      cleanup2();
      cleanup3();
    };
  }, [initialWidth]); // Only depends on `initialWidth`, never re-runs on hover

  return (
    <div ref={forwardedRef} className="flex flex-col overflow-hidden w-[100vw] p-5">
      <div className="flex flex-grow-0 flex-shrink-0">
        <MovingBar ref={measureRef} style={{ x: xTranslation1 }} IconList={iconLists.list1} />
        <MovingBar style={{ x: xTranslation1 }} IconList={iconLists.list1} />
      </div>

      <div className="flex">
        <MovingBar style={{ x: xTranslation2 }} IconList={iconLists.list2} />
        <MovingBar style={{ x: xTranslation2 }} IconList={iconLists.list2} />
      </div>
      <div className="flex">
        <MovingBar style={{ x: xTranslation3 }} IconList={iconLists.list3} />
        <MovingBar style={{ x: xTranslation3 }} IconList={iconLists.list3} />
      </div>
    </div>
  );
});

export default IconSlider;
