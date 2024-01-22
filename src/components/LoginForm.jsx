const LoginForm = ({ handleLogin, username, handleUserNameChange, password, handlePasswordChange}) => (
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
      <button type="submit">Login</button>

    </form>
    </div>
  )

export default LoginForm