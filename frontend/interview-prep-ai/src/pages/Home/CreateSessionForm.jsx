import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateSessionForm = () => {
     const [formData, setFormData] = useState({
        role: "",
        topicsToFocus: "",
        experience: "",
        description: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleChange = (key, value) => {
        setFormData((prevData) =>({
            ...prevData,
            [key]: value,
        }));
    };
    const handleCreateSession = async (e) => {
        e.preventDefault()
        const {role, topicsToFocus, experience} = formData;
        if(!role || !topicsToFocus || !experience ){
            setError("Please fill all the fields");
            return;
        }
        setError("");
        setIsLoading(true);
        try{
            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                {
                    role,experience,topicsToFocus,numberOfQuestions: 10,
                }
            );
            const generatedQuestions = aiResponse.data;
            const response = await axiosInstance.post(
                API_PATHS.SESSION.CREATE,
                {
                    ...formData,
                    questions: generatedQuestions,
                }
            );
            if(response.data?.session?.id){
                navigate(`/interview-prep/${response.data?.session?._id}`);
            }
                }
        catch(error){
            if(error.response && error.response.data.message){
                setError(error.response.data.message);
            } else {
                setError("Failed to create session. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
        
    }

  return <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center'>
    <h3 className='text-lg font-semibold text-black'>
        Start a New Interview Prep Session
    </h3>
    <p className='text-xs text-slate-700 mt-[5px] mb-3'>
        Fill out the form below to create a new interview prep session.
    </p>
    <form className='flex flex-col gap-3' onSubmit={handleCreateSession}>
        <Input
        value = {formData.role}
        onChange = {({target}) => handleChange("role", target.value)}
        label = "Role"
        placeholder= "e.g. Software Engineer, Backend Developer"
        type = "text"
        />
        <Input
        value = {formData.experience}
        onChange = {({target}) => handleChange("experience", target.value)}
        label = "Years of Experience"
        placeholder= "e.g. 1 year, 3 years"
        type = "number"
        />
        <Input
        value = {formData.topicsToFocus}
        onChange = {({target}) => handleChange("topicsToFocus", target.value)}
        label = "Topics to Focus On"
        placeholder= "Comma Separated, e.g. Data Structures, System Design"
        type = "text"
        />
        <Input
        value = {formData.description}
        onChange = {({target}) => handleChange("description", target.value)}
        label = "Description"
        placeholder= "Briefly describe your interview prep goals"
        type = "text"
        />
        {error && 
            <p className='text-red-500 text-xs pb-2.5'>
                {error}
                </p>
        }
        <button className='btn-primary w-full mt-2' type='submit' disabled={isLoading}>
            {isLoading && <SpinnerLoader />} Create Session
        </button>
    </form>
  </div>
}

export default CreateSessionForm