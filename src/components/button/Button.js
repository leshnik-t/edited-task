import './button.css';

const Button = ( props ) => {
    const {text, onClick, ...btnProps} = props;
    return (
        <div className="button-container">
            <button 
                className="btn"
                {...btnProps}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    )
}

export default Button;