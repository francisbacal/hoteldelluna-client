import {atom, selector} from 'recoil';
import {getRoomTypes, deleteRoomType, getRoomType} from '../api/rooms';


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

export {allRoomsTypesState, refreshState, typeToAddState, typeToUpdateState}