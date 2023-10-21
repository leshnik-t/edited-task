import './login-form.css';
import { useState, useContext } from 'react';
import { AuthUserContext, AuthUserDispatchContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import FormInput from '../formInput/FormInput';
import FormCheckbox from '../formCheckbox/FormCheckbox';
import Button from '../button/Button';
import { isValidEmail, isValidPassword} from '../../helpers/validationRules';
import { inputs, checkbox } from '../../configuration/loginFormConfig';


const LoginForm = () => {
    
    const username = useContext(AuthUserContext);
    const dispatch = useContext(AuthUserDispatchContext);

    const [values, setValues] = useState({
        username: JSON.parse(localStorage.getItem('userPreferences')) != null ? JSON.parse(localStorage.getItem('userPreferences'))['username'] : '',
        password: '',
        rememberme: (JSON.parse(localStorage.getItem('userPreferences')) != null && JSON.parse(localStorage.getItem('userPreferences'))['username']) ? true : false
    });

    const [validationErrors, setValidationErrors] = useState({
        username: false,
        password: false
    });

    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState(null);
    
    const onBlur = (e) => {
        switch(true) {
            case (e.target.name === 'username'): {
                 setValidationErrors({
                    ...validationErrors,
                    [e.target.name]: !isValidEmail(e.target.value)
                })
                break;
            }
            case (e.target.name === 'password'): {
                setValidationErrors({
                    ...validationErrors,
                    [e.target.name]: !isValidPassword(e.target.value)
                })
                break;
            }
            default:
                break;
        }
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

    const loginUser = async (username, password) => {
        return fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username, password})
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isValidEmailCurrentUsername = isValidEmail(values.username);
        const isValidPasswordCurrentPassword = isValidPassword(values.password);

        setValidationErrors({
            username: !isValidEmailCurrentUsername,
            password: !isValidPasswordCurrentPassword
        });

        if (isValidEmailCurrentUsername && isValidPasswordCurrentPassword) {
            
            setLoading(true);
            setAuthError(null);

            let response;
            try {
                response = await loginUser(
                    values.username,
                    values.password
                ); 
            } catch(error) {
                setAuthError('Something went wrong. Please, try again later');
                return;
            } finally {
                setLoading(false);
            }

            switch(true) {
                case (response.ok === true): {
                    dispatch({
                        type: 'login', 
                        payload: values.username
                    });
        
                    // if success login set localStorage()
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
                    break;
                }
                case (response.status === 401): {
                    setAuthError('Wrong username or password!')
                    break;
                }
                default:
                    break;
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
                            showError={validationErrors[input.name]}
                        />
                    ))}
                    <FormCheckbox
                        {...checkbox}
                        checked={values[checkbox.name]}
                        onChange={onChange}
                    />
                    <Button tabIndex="4" type="submit" text="Login Now"/>
                </form>
                {loading &&
                    <p className="message">Checking your username na password</p>
                }
                {authError &&
                    <p className="message error">{authError}</p>
                }
            </div>
        </div>
    )
}

export default LoginForm;