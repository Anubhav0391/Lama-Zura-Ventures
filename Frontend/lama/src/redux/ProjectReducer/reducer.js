import { GET_PROJECT_REQUEST,SUCCESS,FAILURE} from "./actionTypes"

const initialState={    
    isLoading:false,
    isError:false,
    projects:[],
}

export const reducer=(state=initialState,{type,payload})=>{
    switch(type){
        case GET_PROJECT_REQUEST:
            return {...state,isLoading:true}
        case FAILURE:
            return {...state,isLoading:false,isError:true}     
        case SUCCESS:
            return {...state,isLoading:false,projects:payload}
        default:
            return state;
    }
}