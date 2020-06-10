import {atom} from 'recoil'

const roomCheckState = atom ({
    key: "roomCheckState",
    default: {
        startDate: null,
        endDate: null,
        guests: 2,
        checkedRooms: {}
    }
})

const hasCheckedState = atom ({
    key: "hasCheckedRoom",
    default: false
})

export { roomCheckState, hasCheckedState }