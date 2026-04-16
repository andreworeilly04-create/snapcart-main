import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { auth, db, registerUser, loginUser } from "../Firebase";
import './Login.css';


const Login = ({ setIsLoggedIn, setCart, setUser }) => {

    const navigate = useNavigate();

    const [showRegister, setShowRegister] = useState(false);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [firstName, setFirstName] = useState("");

    const [lastName, setLastName] = useState("");



    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {

        const resultlogin = await loginUser(email, password);
        if (resultlogin.success && resultlogin.user) {
            toast.success("Logged in successfully!");
            localStorage.setItem("user", JSON.stringify(resultlogin.user));
            setIsLoggedIn(true);
            setUser(resultlogin.user);
            navigate("/");
        } else {
            toast.error(resultlogin.error || "Something went wrong");
        }
    } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again")
    }
};


    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const result = await registerUser(email, password, firstName, lastName);
        if (result.success) {
            toast.success("Account created successfully!");
            setIsLoggedIn(true);
            setUser(result.user);
            navigate("/")
        } else {
            toast.error(result.error || "Something went wrong");
        }
    };

    return (
        <>
            <section id="login_or_register">
                <div className="login__container">
                    <h3 className="login__title">Login or Create Account</h3>
                </div>
                <form onSubmit={handleLoginSubmit} className="login__field">
                    <h3 className="login__title">Login</h3>
                    <input className="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                    <input className="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                    <button className="login__btn">Login</button>
                </form>
                <div className="forgot_or_register--container">
                    <p className="forgot_password">Forgot Password</p>
                    <p onClick={() => setShowRegister(true)} className="register_account">Create account</p>
                </div>
                <form onSubmit={handleRegisterSubmit} className={`register__field ${showRegister ? 'active' : ''}`}>
                    <h3 className="register__title">Create Account</h3>
                    <input className="first_name" type="text" value={firstName} placeholder="Enter your First Name" required onChange={(e) => setFirstName(e.target.value)} />
                    <input className="last_name" type="text" value={lastName} placeholder="Enter your Last Name" required onChange={(e) => setLastName(e.target.value)} />
                    <input className="create_email" value={email} type="email" placeholder="Enter your new email" onChange={(e) => setEmail(e.target.value)} />
                    <input className="create_password" value={password} type="password" placeholder="Create new password" onChange={(e) => setPassword(e.target.value)} />
                    <input className="confirm_password" value={password} type="password" placeholder="Confirm Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="register__btn">Register</button>
                    <p onClick={() => setShowRegister(false)} className="already_created"><b>Already have an account ?</b>Login</p>
                </form>
            </section>
        </>
    );
};

export default Login;