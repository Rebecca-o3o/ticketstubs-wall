export default function reducer(state = {}, action) {

    console.log("REDUX REDUCER - action.type:", action.type);

    if (action.type === 'LOAD_TICKET_STUBS') {
        console.log('REDUX - REDUCER - fn: loadTicketstubs');

        return Object.assign({}, state, {
            stubs: action.stubs
        });
    }


    return state;
}
