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
        
        let start = encodeURIComponent(moment(startDate).set({h:14}).format());
        let end = encodeURIComponent(moment(endDate).format());
        
        console.log(start, end)
        const response = await checkRooms(start, end, guests);

        if (response.error) {
            throw response.error;
        }
        return response
    }
})

export { roomCheckState, hasCheckedState, checkedRoomsState }