import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Components/Header'
import Join from './Components/Join'
import Login from './Components/Login'
import Main from './Components/Main'
import MyInfo from './Components/MyInfo'
import BookRegister from './Components/BookRegister'
import BookUpdate from './Components/BookUpdate'
import BookSearch from './Components/BookSearch'

class App extends Component {

  state = {
    userId: "",
    userPassword: "",
    userManagement: -1,
  }

  session = (data) => {
    this.setState({
      userId: data.tb_user_id,
      userPassword: data.tb_user_password,
      userManagement: data.tb_user_management
    })
  }

  logout = () => {
    this.setState({
      userId: "",
      userPassword: "",
      userManagement: -1,
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Header {...this.state} logout={this.logout}></Header>
        <Route exact path="/" render={(props) => <Main {...this.state} {...props}></Main>} />
        <Route path="/join" render={(props) => <Join {...this.state} {...props}></Join>} />
        <Route path="/login" render={(props) => <Login {...this.state} {...props} session={this.session}></Login>} />
        <Route path="/myInfo" render={(props) => <MyInfo {...this.state} {...props}></MyInfo>} />
        <Route path="/bookRegister" render={(props) => <BookRegister {...this.state} {...props}></BookRegister>} />
        <Route path="/bookUpdate" render={(props) => <BookUpdate {...this.state} {...props}></BookUpdate>} />
        <Route path="/bookSearch/:searchName" render={(props) => <BookSearch {...this.state} {...props}></BookSearch>} />
      </BrowserRouter>
    );
  }
}

export default App;