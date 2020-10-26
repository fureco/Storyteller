import * as chapterActions from './chapter.actions.index.js'
import { getNewID } from '../utils'
import { initialState } from './chapter.model.js'
import chapterReducer from './chapter.reducer.index.js'

const chapters = (state = [], action) => {

	switch (action.type) {

		case chapterActions.ADD:
			state = state.slice();
			state.push(action.chapter);
			return state;

		case chapterActions.CREATE:
			state = state.slice();
			state.push(Object.assign(initialState, action.chapter, { id: getNewID(state), position: state.length }));
			return state;

		case chapterActions.SET_CHAPTERS:
			state = action.chapters;
			return state;

		case chapterActions.SET_TITLE:
			state[state.indexOf(action.chapter)] = chapterReducer(action.chapter, action);
			return state;

		case chapterActions.SET_DELETED_AT:
			state[state.indexOf(action.chapter)] = chapterReducer(action.chapter, action);
			return state;

		default:
			return state;
	}
};

export default chapters;
