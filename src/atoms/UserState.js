import {atom} from 'recoil';

const userState = atom({
    key: 'userState',
    default: {
        _id: null,
        firstname: null,
        lastname: null,
        email: null
    }
})

const userLoginState = atom({
    key: 'userLoginState',
    default: {
        email: null,
        password: null
    }
})
const loginResponseState = atom({
    key: 'loginErrorState',
    default: {
        error: null,
        success: false,
    }
})


export {userState, userLoginState, loginResponseState}