import React from 'react'
import PropTypes from 'prop-types'

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <div className='signin'>
              <form action="https://localhost:3000/Users/Signin" method="post">
                <input type="text" name="username"/>
                <input type="text" name="userPassword" type="password"/>
              </form>
            </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
    );
  }
}

export default Login

