import './form-input.css';

const FormInput = ( props ) => {
    const { id, label, label_htmlFor, onChange, onBlur, showError, errorMessage, ...inputProps} = props;
    
    return (
        <div className="form-input">
            <label htmlFor={label_htmlFor} className="hidden">{label}</label>
            <input 
                id={label_htmlFor}
                {...inputProps}
                onChange={onChange}
                onBlur={onBlur}
            />
            {showError &&
                <div className="error">{errorMessage}</div>
            }
        </div> 
    )
}

export default FormInput;