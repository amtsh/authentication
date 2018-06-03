const Validator = (() => {

  const isUsernameValid = (username) => {
    const re = /^[a-zA-Z0-9]+$/
    return re.test(username) && username.length >= 4 && username.length <= 20
  }

  const isEmailValid = (email) => {
    const re = /(\w+)@(\w+)\.[a-zA-Z]/g
    return re.test(email) && email.length <= 50
  }

  const isPasswordValid = (password) => {
    return password.length >= 8 && password.length <= 20
  }

  return {
    validate_email: isEmailValid,
    validate_username: isUsernameValid,
    validate_password: isPasswordValid,
  }

})()

export default Validator