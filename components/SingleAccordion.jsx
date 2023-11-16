import React from 'react';

const SingleAccordion = (props) => {
    return (
        <div className="border rounded-md mb-4">
            <button
                className="w-full p-4 text-left bg-white rounded-lg border shadow-[0_8px_30px_rgb(0,0,0,0.12)]  
                           hover:bg-red-100 transition duration-300"
                onClick={props.toggleAccordion}
            >
                {props.title}
                <span className={`float-right transform ${props.isOpen ?
                    'rotate-180' : 'rotate-0'}  
                                 transition-transform duration-300`}>
                    &#9660;
                </span>
            </button>
            {props.isOpen && (
                <div className="p-4 bg-white">
                    {props.data}
                </div>
            )}
        </div>
    )
}

export default SingleAccordion;