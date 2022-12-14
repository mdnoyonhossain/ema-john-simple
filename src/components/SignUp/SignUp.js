import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './SignUp.css';

const SignUp = () => {
    const [error, setError] = useState(null);
    const {createUser} = useContext(AuthContext);

    const handleSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);

        if (password.length < 6) {
            setError("Password Should be 6 characters or more");
            return;
        }

        if (password !== confirm) {
            setError("Your Password did not Match");
            return;
        }

        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            form.reset();
        })
        .catch(error => {
            console.error(error);
        })

    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder='Email' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder='Password' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" placeholder='Password' required />
                </div>
                <div className='form-control'>
                    <p className='text-error'><small>{error}</small></p>
                    <input type="submit" value="Sign Up" />
                    <p><small>Already have an account? <Link to="/login" style={{ color: 'orange', textDecoration: 'none' }}>Login</Link></small></p>
                </div>
            </form>
            <button className='google-btn'>Contine with Google</button>
        </div>
    );
};

export default SignUp;