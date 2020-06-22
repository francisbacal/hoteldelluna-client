import {atom} from 'recoil';


const menuState = atom({
    key: 'menuState',
    default: {
        initial: false,
        clicked: null,
        menuName: "Menu"
    }
})

const disabledState = atom({
    key: 'disabledState',
    default: false
})

export { menuState, disabledState }