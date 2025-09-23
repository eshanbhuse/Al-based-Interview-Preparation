
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser();
        navigate('/');
    };

    if (!user) return null;

    // Get initials from first and last name
    const nameParts = user.name ? user.name.trim().split(' ') : [];
    const initials = nameParts.length === 1
        ? nameParts[0].charAt(0).toUpperCase()
        : nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase();

    return (
        <div className='flex items-center'>
            {user.profileImageUrl?.trim() ? (
                <img
                    src={user.profileImageUrl}
                    alt={user.name || 'Profile'}
                    className='w-11 h-11 bg-gray-300 rounded-full mr-3 object-cover'
                />
            ) : (
                <div className='w-11 h-11 bg-gray-400 rounded-full mr-3 flex items-center justify-center text-white font-bold text-lg'>
                    {initials}
                </div>
            )}
            <div>
                <div className='text-[15px] font-bold text-black leading-3'>
                    {user.name || ""}
                </div>
                <button
                    className='text-amber-600 text-sm font-semibold cursor-pointer hover:underline'
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileInfoCard;
