import { projectActions } from './../../actions'
import { initialState } from './../../models/projectModel'

const projectReducer = (state = initialState, action) => {

    switch (action.type) {

		case projectActions.SET_TITLE:
			return Object.assign({}, state, {
				title: action.title
			});

		case projectActions.SET_ABSTRACT:
			return Object.assign({}, state, {
				abstract: action.abstract
			});

		case projectActions.SET_DEDICATION:
			return Object.assign({}, state, {
				dedication: action.dedication
			});

		case projectActions.ADD_PART:
			return Object.assign({}, state, {
				parts: [
					...state.parts,
					{
						id: getNewID(state.parts),
						position: state.parts.length + 1,
						name: action.partName
					}
				]
			});

		case projectActions.REMOVE_PART:

			// console.log("REMOVE_PART: " + action.partID)

			let filtered_parts = state.parts.filter(part => part.id != action.partID);

			// console.log("filtered_parts: " + JSON.stringify(filtered_parts))

			for (let i = 0; i < filtered_parts.length; i++) {
				filtered_parts[i].position = i + 1;
			}

			return Object.assign({}, state, {
				parts: filtered_parts
			});

    default:
        return state;
  }
};

export default projectReducer;

function getNewID(array_of_objects_in_state) {

    let max_id = array_of_objects_in_state.reduce(function (prev, current) { return (prev.id > current.id) ? prev.id : current.id }, 0)
    return max_id + 1;
}
