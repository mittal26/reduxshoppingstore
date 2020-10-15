import React, { Component } from 'react';
import Items from './components/Items';
import NavBar from './components/navBar';
import Payments from './components/Payments';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';
import ItemDetails from './components/itemDetails';
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout from './components/logout';
import ProtectedRoute from './common/protectedRoute';
import profile from './components/profile';
import configureAppStore from './store/configureStore';
import { Provider } from "react-redux";


const store = configureAppStore();


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    //console.log("App-Mounted life cycle")
    return (
      <div>
        <Provider store={store}>
          <main role="main" className="flex-shrink-0">
            <div className="container">
              <NavBar />
              <ToastContainer />
              <Switch>
                <ProtectedRoute path="/items/:id" component={ItemDetails} />
                <Route path="/checkout/:id" component={Checkout} />
                <Route path="/items" render={(props) => <Items {...props} />} />
                <Route path="/payments" component={Payments} />
                <Route path="/profile" component={profile} />
                <Route path="/logout" component={Logout} />
                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={RegisterForm} />
                <Route path="/notfound" component={NotFound} />
                <Redirect exact from="/" to="/items" />
                <Redirect to="/notfound" />
              </Switch>
            </div>
          </main>
        </Provider>
      </div>
    );
  }
}

export default App;
