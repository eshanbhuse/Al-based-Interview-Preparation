import React, { useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = ({ setCurrentPage}) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext);
  
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if(!fullName)
        {
          setError("Please enter your name")
          return;
        }
        if(!validateEmail(email))
        {
          setError("Please enter a valid email")
          return;
        }
        if(!password)
        {
        setError("Please enter your password")
        return;
        }
        setError("");

        try{
      if(profilePic)
      {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });
      const {token} = response.data;

      if(token)
      {
        localStorage.setItem('token',token);
        updateUser(response.data);
        navigate('/dashboard');
      }

    } catch(error){
      if(error.response  && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }

  };

  return <div className='w-[90vw] md:w-[33vw] p-7     flex flex-col justify-center'>
    <h3 className='text-lg font-semibold text-black '> Create an Account</h3>
    <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering the details</p>

    <form onSubmit={handleSignUp}>

      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

      <div className='grid grid-cols-1 gap-2 md:grid-cols-1'>
      <Input value={fullName} onChange={({target}) => setFullName(target.value)} label="Full Name" type="text" placeholder="Enter your name" />
      <Input value={email} onChange={({target}) => setEmail(target.value)} label="Email Address" type="text" placeholder="Enter your email" />
      <Input value={password} onChange={({target}) => setPassword(target.value)} label="Password" type="password" placeholder="Min 8 characters" />
</div>
      {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
      <button type='submit' className='btn-primary'>Sign Up</button>
      <p className='text-[13px] text-slate-800 mt-3'>Already have an Account?{" "} 
        <button className='font-medium text-primary underline cursor-pointer' onClick={() => { setCurrentPage("login");
        }} 
        > Log In</button>
      </p>

    </form>
  </div>

}

export default SignUp