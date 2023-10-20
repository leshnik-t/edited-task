import './login-form.css';
import { useState, useContext } from 'react';
import { AuthUserContext, AuthUserDispatchContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import FormInput from '../formInput/FormInput';
import FormCheckbox from '../formCheckbox/FormCheckbox';
import Button from '../button/Button';


const LoginForm = () => {
    
    const username = useContext(AuthUserContext);
    const dispatch = useContext(AuthUserDispatchContext);

    const [values, setValues] = useState({
        username: JSON.parse(localStorage.getItem('userPreferences')) != null ? JSON.parse(localStorage.getItem('userPreferences'))['username'] : '',
        password: '',
        rememberme: (JSON.parse(localStorage.getItem('userPreferences')) != null && JSON.parse(localStorage.getItem('userPreferences'))['username']) ? true : false
    });

    const [errors, setErrors] = useState({
        username: false,
        password: false
    })

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }
    
    const isValidPassword = (password) => {
        return /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{6,}$/.test(password);
    }
    
    const onBlur = (e) => {
        switch(true) {
            case (e.target.name === 'username'): {
                 setErrors({
                    ...errors,
                    [e.target.name]: !isValidEmail(e.target.value)
                })
                break;
            }
            case (e.target.name === 'password'): {
                setErrors({
                    ...errors,
                    [e.target.name]: !isValidPassword(e.target.value)
                })
                break;
            }
            default:
                break;
        }
    }

    const inputs = [
        {
            id: 'input-1',
            name: 'username',
            type: 'email',
            tabIndex: '1',
            placeholder: 'Username',
            label: 'Username',
            label_htmlFor: 'username',
            errorMessage: "Should be a valid email address",
            // required: true,
            autoFocus: true
        },
        {
            id: 'input-2',
            name: 'password',
            type: 'password',
            tabIndex: '2',
            placeholder: 'Password',
            label: 'Password',
            label_htmlFor: 'password',
            errorMessage: "Password should be minimum 6 characters and should include one digit and one letter",
            // required: true
        }
    ];

    const checkbox = {
        id: 'checkbox-1',
        name: 'rememberme',
        type: 'checkbox',
        tabIndex: '3',
        label: 'Remember me'
    }

    const onChange = (e) => {
        switch(true) {
            case (e.target.name === 'username'): 
            case (e.target.name === 'password'): {
                setValues({
                    ...values,
                    [e.target.name]: e.target.value
                });
                break;
            }
            case (e.target.name === 'rememberme'): {
                setValues({
                    ...values,
                    [e.target.name]: e.target.checked
                })
                break;
            }
            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("btn hitted");
        console.log("valid email", isValidEmail(values.username));
        console.log("valid password", isValidPassword(values.password));

        const isValidEmailCurrentUsername = isValidEmail(values.username);
        const isValidPasswordCurrentPassword = isValidPassword(values.password);

        setErrors({
            username: !isValidEmailCurrentUsername,
            password: !isValidPasswordCurrentPassword
        });

        if (isValidEmailCurrentUsername && isValidPasswordCurrentPassword) {
            console.log('make login');
            //dispatch login
            dispatch({
                type: 'login', 
                payload: values.username
            });

            // if success login setLocalStorageData()
            if (values.rememberme) {
                const data = {
                    username: values.username
                }
                localStorage.setItem('userPreferences', JSON.stringify(data));
            } else {
                const data = {
                    username: ''
                }
                localStorage.removeItem('userPreferences', JSON.stringify(data));
            }
        } 


    };
    
    return (
        <div className="login-form">
            {username &&  
                <Navigate to="/dashboard" />
            }
            <h1>Sign in to your account</h1>
            <div className="form">
                <form onSubmit={handleSubmit}>
                
                    {inputs.map((input) => (
                        <FormInput 
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                            onBlur={onBlur}
                            showError={errors[input.name]}
                        />
                    ))}
                    <FormCheckbox
                        {...checkbox}
                        checked={values[checkbox.name]}
                        onChange={onChange}
                    />
                    <Button tabIndex="4" type="submit" text="Login Now"/>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;