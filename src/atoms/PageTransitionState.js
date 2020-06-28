import {atom} from 'recoil';

const pageTransitionState = atom({
    key: 'pageTransitionState',
    default: {
        initial: null
    }
})

export { pageTransitionState }