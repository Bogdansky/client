import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Main } from './components/Main';
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { Error } from './components/Error'

export default class App extends Component {
  static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            userId: 0
        };
        this.setUserId = this.setUserId.bind(this);
    }

    setUserId(userId) {
        this.setState({ userId });
    }

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/boards' component={Main} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/signup' component={SignUp} />
            <Route path='/signin' component={SignIn} />
            <Route path='/error' component={Error} />
      </Layout>
    );
  }
}
