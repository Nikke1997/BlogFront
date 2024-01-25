import PropTypes from 'prop-types'


const LoginForm = ({ handleLogin, username, handleUserNameChange, password, handlePasswordChange }) => {



  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    handleUserNameChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    handlePasswordChange: PropTypes.func.isRequired
  }

  return (
    <div className="loginform">
      <h2>Login</h2>
      <form  onSubmit={handleLogin}>
        <div>
          <label htmlFor="uname">Username: </label>
          <input
            type="text"
            value={username}
            name="Username"
            id='uname'
            onChange={handleUserNameChange}
          />
        </div>
        <br/>
        <div className="password">
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            value={password}
            name="Password"
            id='password'
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" id='login-button'>Login</button>

      </form>
    </div>
  )
}

export default LoginForm