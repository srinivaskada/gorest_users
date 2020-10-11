import React from 'react'
import PropTypes from 'prop-types'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
const LoginByGoogle = ({ onSuccess }) => {
  const signup = (res) => {
    const socialLoginPayload = {
      providedBy: 'google',
      token: res.tokenObj.id_token,
    }
    axios.post('http://localhost:8000/api/auth/social-login', socialLoginPayload).then((result) => {
      onSuccess(result.data.token, result.data.userDetails)
    })
  }
  const responseGoogle = (response) => {
    console.log(response)
    if (Object.getOwnPropertyDescriptor(response, 'error')) {
      return
    }
    var res = response.profileObj
    console.log(res)
    signup(response)
  }
  return (
    <div width='100%'>
      <GoogleLogin
        wi
        clientId='1091835832800-0dodt6oob19lk2tso8lgk5ccv9j8su4g.apps.googleusercontent.com'
        scope={[
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/user.phonenumbers.read',
        ].join(' ')}
        buttonText='Login with Google'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  )
}

LoginByGoogle.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}

export default LoginByGoogle
