export const validateUsername = () => {
  return {
    filter: x => x.length > 5,
    errorMsg: 'Username must be at least 5 characters long'
  }
}

export const validateEmail = () => {
  return {
    filter: x => x.length > 5,
    errorMsg: 'Please provide a valid email address. ex: username@gmail.com'
  }
}

export const validatePassword = () => {
  return {
    filter: x => x.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    errorMsg: 'Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase'
  }
}