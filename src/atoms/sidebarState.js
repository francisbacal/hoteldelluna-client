import {atom, selector, DefaultValue} from 'recoil';

const toggleState = atom({
    key: 'toggleState',
    default: false
})

const showState = atom({
    key: 'showState',
    default: false
})

const toggleShow = selector({
    key: 'toggleShow',
    get: ({get}) => get(showState),
    set: ({set}, newValue) => {
        set(showState, newValue instanceof DefaultValue ? newValue : !newValue)
    }
})
export {toggleState, showState, toggleShow}