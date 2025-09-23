
import React from 'react';
import ProfileInfoCard from '../Cards/ProfileInfoCard';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='h-16 bg-white border-b border-gray-200/50 backdrop-blur-[2px] sticky top-0 z-30'>
            <div className='container mx-auto flex items-center justify-between px-6 md:px-12 h-full'>
                {/* Left side */}
                <Link to="/dashboard" className='flex items-center h-full'>
                    <h2 className='text-lg md:text-xl font-medium text-black leading-5'>
                        Interview Prep AI
                    </h2>
                </Link>

                {/* Right side */}
                <ProfileInfoCard />
            </div>
        </div>
    );
};

export default Navbar;
