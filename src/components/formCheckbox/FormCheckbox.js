import './form-checkbox.css';

const FormCheckbox = ( props ) => {
    const { id, label, onChange, ...checkboxProps} = props;
    return (
        <div className="form-checkbox">
            <label>
                <input  
                    {...checkboxProps}
                    onChange={onChange}
                />
                {label}
            </label> 
        </div>
    )
}

export default FormCheckbox;