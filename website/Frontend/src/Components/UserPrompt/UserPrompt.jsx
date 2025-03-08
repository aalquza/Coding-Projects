
import React from 'react';
import { twMerge } from 'tailwind-merge';
import myImage from '../../assets/arrow icon.png';

export default function UserPrompt({ className, children, showIcon = false, value, onChange, onClick, ...props }) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (showIcon && onClick) {
                onClick(e);
            }
        }
    };

    return (
        <div className={twMerge("flex font-poppins text-tan text-[0.75rem] md:text-[1rem] pl-4 pr-2 py-1.5 border-red-orange border-1 rounded-4xl w-full items-center cursor-text", className)}>
            <textarea
                value={value}
                onChange={onChange}
                className="flex-grow h-full w-full bg-transparent outline-none resize-none overflow-hidden leading-normal p-0 text-start"
                placeholder={children}
                rows={1}
                onKeyDown={handleKeyDown}
            />
            {showIcon && (
                <button
                    className="ml-2 shrink-0 bg-transparent rounded-full hover:bg-white/20 active:bg-white/30 cursor-pointer"
                    onClick={onClick}
                >
                    <img
                        className="object-contain h-[1.25rem] w-[1.25rem] md:h-[2rem] md:w-[2rem]"
                        src={myImage}
                        alt="Your Image Alt Text"
                    />
                </button>
            )}
        </div>
    );
}