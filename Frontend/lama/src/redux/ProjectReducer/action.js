import axios from "axios"
import { FAILURE, GET_PROJECT_REQUEST, SUCCESS } from "./actionTypes"

export const getProjects =()=> (dispatch) => {
    dispatch({ type: GET_PROJECT_REQUEST })

    axios.get('https://cloudy-jade-shift.cyclic.app/projects')
        .then((res) => {
            console.log(res.data.projects)
            dispatch({ type: SUCCESS, payload: res.data.projects })
        }).catch(() => {
            console.log('failed')
            dispatch({ type: FAILURE })
    })
}