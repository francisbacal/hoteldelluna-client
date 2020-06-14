import {atom, selector} from 'recoil';
import {getRoomTypes, deleteRoomType} from '../api/rooms';



const toBeDeletedTypeState = atom({
    key: 'toBeDeletedTypeState',
    default: null
})


const allRoomsTypesState = selector({
    key: 'allRoomTypesState',
    get: async ({get}) => {

        let deleteID = get(toBeDeletedTypeState)
        let response;

        if (deleteID === null) {
            response = await getRoomTypes()
        } else {
            let deleteResponse = await deleteRoomType(deleteID);

            if (deleteResponse.error) {
                response = deleteResponse
            } else {
                response = await getRoomTypes();
            }
        }
        
        return response
    }
})

export {allRoomsTypesState, toBeDeletedTypeState}