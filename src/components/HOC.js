import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group'


export default (ComposedComponent) => {
    return (props) => {
        return(
            <ComposedComponent {...props}>
                {console.log(props)}
                { ({match}) => (
                    <CSSTransition
                        in={match != null}
                        timeout={1200}
                        classNames='views'
                        onEntering={console.log('enter')}
                        unmountOnExit
                    >
                        {props.children}
                    </CSSTransition>
                )}
            </ComposedComponent>
        )
    };
};