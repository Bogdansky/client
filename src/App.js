import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Library from './components/Library';
import { Counter } from './components/Counter';
import { Main } from './components/Main';
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { Error } from './components/Error'

export default class App extends Component {
  static displayName = App.name;

    constructor(props) {
        super(props);

    }

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/boards' component={Main} />
            <Route path='/counter' component={Counter} />
            <Route path='/signup' component={SignUp} />
            <Route path='/signin' component={SignIn} />
            <Route path='/error' component={Error} />
            <Route path='/library' component={Library} />
      </Layout>
    );
  }
}
