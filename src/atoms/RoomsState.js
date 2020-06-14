import {atom, selector} from 'recoil';
import {getRoomTypes, deleteRoomType, getRooms, deleteRoom} from '../api/rooms';


/*==========================
| ROOM TYPES
|===========================*/

const refreshState = atom({
    key: 'refreshState',
    default: null
})

const typeToAddState = atom({
    key: 'typeToAddState',
    default: [
        {
            name: null,
            price: null,
            description: null,
            images: [
                {name: null}
            ]
        }
    ]
})

const typeToUpdateState = atom({
    key: 'updatedType',
    default: {}
})


const allRoomsTypesState = selector({
    key: 'allRoomTypesState',
    get: async ({get}) => {

        let state = get(refreshState)
        let response;

        if (state === null) {
            response = await getRoomTypes()
        } else if (state.delete) {
            let deleteResponse = await deleteRoomType(state.delete);

            if (deleteResponse.error) {
                response = deleteResponse
            } else {
                response = await getRoomTypes();
            }
        } else if (state.refresh) {

            response = await getRoomTypes()

        } else {

            response = await getRoomTypes()
        }

        return response
        
    }
})

/*==========================
| ROOMS
|===========================*/

const refreshRoomState = atom({
    key: 'refreshRoomState',
    default: null
})

const allRoomsState = selector({
    key: 'allRoomsState',
    get: async ({get}) => {

        let state = get(refreshRoomState)
        let response;

        if (state === null) {

            response = await getRooms()

        } else if (state.delete) {

            let deleteResponse = await deleteRoom(state.delete);

            if (deleteResponse.error) {
                response = deleteResponse
            } else {
                response = await getRooms();
            }
            
        } else if (state.refresh) {

            response = await getRooms()

        } else {

            response = await getRooms()
        }

        return response
        
    }

})

const roomToAddState = atom({
    key: 'roomToAddState',
    default:
        {
            name: null,
            roomType: null,
            maxguests: 2
        }
})

export {
        allRoomsTypesState, 
        refreshState, 
        typeToAddState, 
        typeToUpdateState, 
        refreshRoomState, 
        allRoomsState,
        roomToAddState
    }