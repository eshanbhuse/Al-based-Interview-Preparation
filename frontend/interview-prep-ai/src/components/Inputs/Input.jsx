import React,{useState} from 'react'
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa"

const Input = ({
    label, type, placeholder, value, onChange
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
  return <div>
    <label className='text-[13px] text-slate-800'>{label}</label>
    <div className='input-box'>
        <input type={
            type == "password" ? (showPassword ? "text" : "password") : type} 
            placeholder={placeholder} 
            value={value} 
            onChange={(e) => onChange(e)}
            className='w-full bg-transparent outline-none'
        />
        {type === "password" && (
            <>
            { showPassword ? (
                <FaRegEye className='text-primary cursor-pointer' size={22} onClick={() =>toggleShowPassword() } />
            ) : (
                <FaRegEyeSlash className='text-primary cursor-pointer' size={22} onClick={() =>toggleShowPassword()}  />
        )
        }
        </>
        )}
    </div>
  </div>
}

export default Input