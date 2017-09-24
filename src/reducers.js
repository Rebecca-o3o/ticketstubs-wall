export default function reducer(state = {}, action) {


    if (action.type == 'LOAD_TICKET_STUBS') {
        console.log('REDUX - REDUCER - fn: loadTicketstubs');

        state = Object.assign({}, state, {
            stub: action.loadTicketstubs
        });
    }


    return state;
}
