import {atom, selector} from 'recoil';
import {checkRooms} from './../api/checkRooms';
import moment from 'moment';

const roomCheckState = atom ({
    key: "roomCheckState",
    default: {
        startDate: moment(),
        endDate: moment().add(2, 'd'),
        guests: 2
    }
})

const hasCheckedState = atom ({
    key: "hasCheckedRoomState",
    default: false
})

const checkedRoomsState = selector({
    key: 'getCheckedRooms',
    get: async ({get}) => {
        let {startDate, endDate, guests} = get(roomCheckState)
        
        console.log('state end:',endDate)

        const response = await checkRooms(startDate, endDate, guests);

        return response
    }
})

export { roomCheckState, hasCheckedState, checkedRoomsState }