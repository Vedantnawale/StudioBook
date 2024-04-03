import React, { useState, useRef } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Button } from '@mui/material'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../firebase/setup'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const PhoneSignin = () => {

    const [phone, setPhone] = useState("")
    const [confirmation, setConfirmation] = useState(null)
    const [otp, setOtp] = useState(["", "", "", "", "", ""]) // Initialize with empty array for each digit
    const [verifyingCaptcha, setVerifyingCaptcha] = useState(false)
    const inputRefs = useRef([])
    const navigate = useNavigate()

    const sendOtp = async () => {

        try {
            const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})

            const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptcha)
            setConfirmation(confirmationResult)
            // Set verifyingCaptcha to true to hide the captcha button
            setVerifyingCaptcha(true)

        } catch (error) {
            console.log(error);
        }

    }

    const verifyOtp = async () => {
        if (!phone) {
            toast.error("Enter a mobile number")
            return; // Stop execution if phone number is not provided
        }
    
        // Validate OTP
        const enteredOtp = otp.join(""); // Join array elements into a string
        if (!enteredOtp) {
            toast.error("Enter OTP")
            return; // Stop execution if OTP is not provided
        }

        try {
            await confirmation.confirm(enteredOtp)
            toast.success("User logged in successfully")
            navigate("/signup")
        } catch (error) {
            console.log(error);
            toast.error("Invalid OTP")
        }
    }

    // Function to handle input for OTP
    const handleOtpChange = (index, value) => {
        if (value === "" || /^[0-9]$/.test(value)) { // Check if value is empty or a digit
            const newOtp = [...otp]; // Create a copy of the OTP array
            newOtp[index] = value;
            setOtp(newOtp);
            // Move focus to the next input field if value is not empty
            if (value && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
            // Move focus to the previous input field if backspace is pressed and the current input field is empty
            if (value === "" && inputRefs.current[index - 1]) {
                inputRefs.current[index - 1].focus();
            }
        }
    }

    return (
        <div className='flex flex-col justify-center items-center gap-4 h-[100vh]'>
            <h1 className='text-xl'>Welcome to the <span className=' text-red-600'>STUDIOBOOK</span></h1>
            <div className='flex flex-col justify-center items-center mt-5'>
                <PhoneInput
                    country={"in"}
                    value={phone}
                    onChange={(phone) => setPhone("+" + phone)}
                />
                <Button
                    onClick={sendOtp}
                    sx={{ marginTop: "20px" }}
                    className='border text-white rounded-lg bg-blue-600 py-2 px-4'
                    variant='contained'>
                    Send OTP</Button>

                {/* Render captcha button only if not verifying captcha */}
                {!verifyingCaptcha && <div style={{ marginTop: "10px" }} id='recaptcha'></div>}
            </div>
            <div className="otp-input">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        ref={(input) => (inputRefs.current[index] = input)} // Assign ref to each input field
                        onKeyDown={(e) => {
                            if (e.key === "Backspace" && index > 0 && !otp[index]) {
                                inputRefs.current[index - 1].focus();
                            }
                        }}
                        style={{
                            width: "40px",
                            height: "40px",
                            margin: "10px",
                            textAlign: "center",
                            fontSize: "18px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            outline: "none"
                        }}
                    />
                ))}
            </div>
            <Button
                onClick={verifyOtp}
                sx={{ marginTop: "10px", background: "green", color: "white" }}
                variant='contained'
            >Verify OTP</Button>
        </div>
    )
}

export default PhoneSignin
