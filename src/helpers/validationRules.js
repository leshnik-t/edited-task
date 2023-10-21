export const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
}

export const isValidPassword = (password) => {
    return /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{6,}$/.test(password);
}