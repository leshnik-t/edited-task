export const inputs = [
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

export const checkbox = 
    {
        id: 'checkbox-1',
        name: 'rememberme',
        type: 'checkbox',
        tabIndex: '3',
        label: 'Remember me'
    }
