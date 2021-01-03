import React, { useRef, useEffect } from "react";
import gsap from "gsap";
//import styles
import "./index.scss";
const Loader = () => {
  const wrapper1 = useRef(null);
  const wrapper2 = useRef(null);
  useEffect(() => {
    const circle1 = wrapper1.current;
    const circle2 = wrapper2.current;
    //const circle1 = circles.getElementById('circle1')
    const tl1 = gsap.timeline({ defaults: { ease: "linear" } });
    const tl2 = gsap.timeline({ defaults: { ease: "linear" } });
    tl1.fromTo(circle1, { rotate: 0 }, { rotate: 360, duration: 1 }).repeat(-1);
    tl2
      .fromTo(circle2, { rotate: 0 }, { rotate: 360, duration: 0.5 })
      .repeat(-1);
  });

  return (
    <div className="loaderWrapper">
      <div id="circle1" ref={wrapper1}>
        <div id="circle2" ref={wrapper2}></div>
      </div>
    </div>
  );
};

export default Loader;
