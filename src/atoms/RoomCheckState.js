import {atom, selector} from 'recoil';
import {checkRooms} from './../api/checkRooms';
import moment from 'moment';

const roomCheckState = atom ({
    key: "roomCheckState",
    default: {
        startDate: moment(),
        endDate: moment().add(3, 'd'),
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

        const response = await checkRooms(startDate, endDate, guests);

        if (response.error) {
            return response
        }
        return response
    }
})

export { roomCheckState, hasCheckedState, checkedRoomsState }