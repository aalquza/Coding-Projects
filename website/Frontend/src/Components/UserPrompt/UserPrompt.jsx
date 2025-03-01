// import React from 'react';
// import { twMerge } from 'tailwind-merge';
// import myImage from '../../assets/arrow icon.png';

// export default function UserPrompt({ className, children, showIcon = false, ...props }) { // Added showIcon prop
//   return (
//     <div className={twMerge("flex font-poppins text-tan text-[.75rem] md:text-[1rem] pl-3 pr-2 py-1.5 border-red-orange border-1 rounded-4xl w-full items-center cursor-text", className)}>
//       <div className="flex-grow">
//         {children}
//       </div>
//       {showIcon && ( // Conditionally render the button
//         <button className="ml-2 shrink-0 bg-transparent rounded-full hover:bg-white/20 active:bg-white/30 cursor-pointer" onClick={props.onClick}>
//           <img
//             className="object-contain h-[1.25rem] w-[1.25rem] md:h-[2rem] md:w-[2rem]"
//             src={myImage}
//             alt="Your Image Alt Text"
//           />
//         </button>
//       )}
//     </div>
//   );
// }
import React from 'react';
import { twMerge } from 'tailwind-merge';
import myImage from '../../assets/arrow icon.png';

export default function UserPrompt({ className, children, showIcon = false, value, onChange, ...props }) {
    return (
        <div className={twMerge("flex font-poppins text-tan text-[.75rem] md:text-[1rem] pl-3 pr-2 py-1.5 border-red-orange border-1 rounded-4xl w-full items-center cursor-text", className)}>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="flex-grow bg-transparent outline-none h-full"
                placeholder={children} // Use children as placeholder
            />
            {showIcon && (
                <button className="ml-2 shrink-0 bg-transparent rounded-full hover:bg-white/20 active:bg-white/30 cursor-pointer" onClick={props.onClick}>
                    <img className="object-contain h-[1.25rem] w-[1.25rem] md:h-[2rem] md:w-[2rem]" src={myImage} alt="Your Image Alt Text" />
                </button>
            )}
        </div>
    );
}