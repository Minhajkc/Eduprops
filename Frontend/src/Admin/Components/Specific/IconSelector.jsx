// components/Common/IconSelector.js
import React, { useState } from 'react';
import { AcademicCapIcon, BookOpenIcon, BriefcaseIcon, CogIcon } from '@heroicons/react/24/outline';

const icons = [
    { name: 'AcademicCapIcon', component: <AcademicCapIcon className="h-6 w-6 text-blue-500" /> },
    { name: 'BookOpenIcon', component: <BookOpenIcon className="h-6 w-6 text-green-500" /> },
    { name: 'BriefcaseIcon', component: <BriefcaseIcon className="h-6 w-6 text-red-500" /> },
    { name: 'CogIcon', component: <CogIcon className="h-6 w-6 text-yellow-500" /> },
];

const IconSelector = ({ selectedIcon, onSelect }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {icons.map((icon) => (
                <div
                    key={icon.name}
                    onClick={() => onSelect(icon.name)}
                    className={`cursor-pointer p-2 ${selectedIcon === icon.name ? 'border-2 border-custom-cyan' : ''}`}
                >
                    {icon.component}
                </div>
            ))}
        </div>
    );
};

export default IconSelector;
