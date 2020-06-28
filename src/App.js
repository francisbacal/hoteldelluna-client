import React from 'react';
import {withRouter, Router, Route, Switch} from 'react-router-dom';
import './scss/style.scss'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Book from './components/Book';
import Login from './components/Login';
import DashboardAdmin from './components/DashboardAdmin';
import DashboardCustomer from './components/DashboardCustomer';
import PrivateRoute from './components/PrivateRoute';
import {loginResponseState, userState} from './atoms/UserState';
import { useRecoilState, useRecoilValue } from 'recoil';
import history from './components/history';
import Register from './components/Register'
import Unauthorized from './components/errorPages/Unauthorized';
import Page404 from './components/errorPages/Page404';
import NotFound from './components/errorPages/NotFound';
import BookingTransaction from './components/helpers/BookingTransaction';
import { TransitionGroup, CSSTransition, Transition } from "react-transition-group";
import gsap from 'gsap'



function App(props) {
    const [loginResponse, setLoginResponse] = useRecoilState(loginResponseState);
    const user = useRecoilValue(userState);
    const locationKey = props.location.pathname
    const currentKey = props.location.pathname.split('/')[1] || '/';

    const onLeave = node => {
        gsap.to(node.children[2], {
            duration: 0.2,
            css: {opacity: 0},
            ease: 'power.inOut'
        })
        gsap.to([
            node.children[0].firstElementChild, 
            node.children[1].firstElementChild,
            node.children[0].lastElementChild,
            node.children[1].lastElementChild
            ], {
            duration: 0.8,
            scaleY: 1,
            transformOrigin: 'right top',
            ease: 'power3.inOut',
            stagger: {
                amount: 0.1
            }
        })
    }

    const onEnter = node => {
        gsap.to(node.children[2], {
            duration: 0.1,
            css: {opacity: 0},
            ease: 'power.inOut'
        })
    }
    const onEntered = node => {
        gsap.to(node.children[2], {
            duration: 0.3,
            css: {opacity: 1},
            ease: 'power.inOut'
        })
        gsap.from([
            node.children[0].firstElementChild, 
            node.children[1].firstElementChild,
            node.children[0].lastElementChild,
            node.children[1].lastElementChild
            ], {
            duration: 0.8,
            scaleY: 1,
            transformOrigin: 'right top',
            ease: 'power3.inOut',
            stagger: {
                amount: 0.2
            },
            delay: 0.8
        })
    }
  
    return (
            <div className="App">
                <Navbar />
                <TransitionGroup>
                    <Transition 
                        unmountOnExit={true}
                        mountOnEnter={true}
                        key={currentKey} 
                        timeout={{
                            appear: 1000,
                            enter: 800,
                            exit: 800
                        }}
                        classNames='views'
                        onEnter={onEnter}
                        onEntered={onEntered}
                        onExit={onLeave}
                        addEndListener={ (node, done) => {
                            node.addEventListener('transitionend', done, false)
                        }}
                    >
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/transaction' component={BookingTransaction} />
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/unauthorized' component={Unauthorized} />
                            <Route path='/book' component={Book} />
                            <PrivateRoute path="/dashboard" isLoggedIn={loginResponse.isLoggedIn} component={user.role==='Admin' ? DashboardAdmin : DashboardCustomer} />
                            {/* <Route path="/dashboard" component={DashboardAdmin} /> */}
                            <Route path="/404" component={Page404} />
                            <Route component={NotFound} />
                        </Switch>
                    </Transition>
                </TransitionGroup>
            </div>
    );
}

export default withRouter(App);
