const initialState = {
    pokeLoaded: [],
    pokeBase: [],
    pokeDetails: {},
    pokeBrought: [],
    types:[],
    typesSent:[],
    disable: false
  };

function rootReducer(state=initialState, action){
    if (action.type === 'GET_POKEMON'){
        return{
            ...state,
            pokeLoaded: action.payload
        };
    }
    if (action.type === 'BRING_POKEMON'){
        return{
            ...state,
            pokeBrought: action.payload
        }
    }
    if (action.type === 'GET_POKEMON_DETAIL'){
        return{
            ...state,
            pokeDetail: action.payload
        };
    }
    if (action.type === "ADD_POKEMON_BASE") {
        return {
            ...state,
            justAdded: state.justAdded.concat(action.payload)
            }
    }
    if (action.type === 'GET_TYPES'){
        return{
            ...state,
            types: action.payload
        }
    }
    if (action.type === 'ADD_TYPE_SENT'){
        return{
            ...state,
            typesSent: state.typesSent.concat(action.payload)
        }
    }
    if (action.type === "REMOVE_TYPE_SENT") {
        return {
            ...state,
            typesSent: state.typesSent.filter((type)=>type!==action.payload)
        };
    }
    if (action.type === "CHANGE_DISABLE") {
        return {
            ...state,
            disable: action.payload
        };
    }
    if (action.type === "GET_COUNT") {
        return {
            ...state,
            count: action.payload
        };
    }
    return state;
}
export default rootReducer;