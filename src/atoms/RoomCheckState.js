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
        let response;
        let {startDate, endDate, guests} = get(roomCheckState)
        const checkin = moment(startDate, "MM-DD-YYYY").set({hour:14,minute:0,second:0,millisecond:0});
        const today = moment()

        if (today.isAfter(checkin)) {
            startDate = checkin.add(1, 'day');
            response = await checkRooms(startDate, endDate, guests);
        } else {
            response = await checkRooms(startDate, endDate, guests);
        }


        return response
    }
})

export { roomCheckState, hasCheckedState, checkedRoomsState }