import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Main } from './components/Main';
import { SignUp } from './components/SignUp'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/boards' component={Main} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/signup' component={SignUp} />
      </Layout>
    );
  }
}
