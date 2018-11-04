import axios from 'axios';

export const getRoomMessages = (roomName) => {
    return (dispatch, getState)=> {

        let config = {
            headers: {
                authorization: getState().auth.uid,             
            }
        }
        
        axios.get(`http://localhost:5000/api/message/getRoomMessages?roomName=${roomName}`, config)
            .then((response) => dispatch({
                type: "GET_ROOM_MESSAGES",
                data: response.data
            })).catch((err) => console.log(err))
    }
}