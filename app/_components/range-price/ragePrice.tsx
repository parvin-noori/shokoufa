// "use client";
// import { useRef, useState } from "react";
// import RangeSlider from "react-range-slider-input";

// import "react-range-slider-input/dist/style.css";

// const MIN = 90000;
// const MAX = 5000000;

// export default function PriceRangeFilter() {
//   const [value, setValue] = useState([30, 60]);
//   const ref = useRef();


//   return (
//     <RangeSlider ref={ref} value={value} onInput={setValue} className="bg-rose-500"/>

//     // <div className="px-2 py-4">
//     //   <Range
//     //     step={10000}
//     //     min={MIN}
//     //     max={MAX}
//     //     values={values}
//     //     onChange={(newValues) => setValues(newValues)}
//     //     renderTrack={({ props, children }) => (
//     //       <div
//     //         {...props}
//     //         className="h-1.5 w-full rounded-full relative"
//     //         style={{
//     //           ...props.style,
//     //           background: getTrackBackground({
//     //             values,
//     //             colors: ["#e5e7eb", "#f43f5e", "#e5e7eb"],
//     //             min: MIN,
//     //             max: MAX,
//     //           }),
//     //         }}
//     //       >
//     //         {children}
//     //       </div>
//     //     )}
//     //     renderThumb={({ props }) => (
//     //       <div
//     //         {...props}
//     //         key={props.key}
//     //         className="w-5 h-5 rounded-full bg-white border-2 border-rose-500 shadow-md cursor-pointer focus:outline-none"
//     //       />
//     //     )}
//     //   />
//     //   <div className="flex items-center justify-between gap-x-3 mt-6">
//     //     <input
//     //       type="text"
//     //       readOnly
//     //       value={values[0].toLocaleString("fa-IR")}
//     //       className="w-full text-center text-sm text-gray-600 border border-gray-200 rounded-lg py-2 bg-gray-50"
//     //     />
//     //     <span className="text-gray-400">تا</span>
//     //     <input
//     //       type="text"
//     //       readOnly
//     //       value={values[1].toLocaleString("fa-IR")}
//     //       className="w-full text-center text-sm text-gray-600 border border-gray-200 rounded-lg py-2 bg-gray-50"
//     //     />
//     //   </div>
//     // </div>
//   );
// }
