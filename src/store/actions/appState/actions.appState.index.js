import storage from 'electron-json-storage';

const fs = require('fs');

// ############## ACTION TYPES #################
export const SET_PATH = 'SET_PATH';
export const SET_ROUTE = 'SET_ROUTE';

// ############## ACTIONS #################
export const setPath = (path) => ({ type: SET_PATH, path });
export const setRoute = (route) => ({ type: SET_ROUTE, route });

export const load = (directoryPath) => {

	return (dispatch, getState) => {

		storage.get('storyteller', function (error, data) {

			if (error) throw error;

			console.log("load app state: " + data.path);

			if (data.path) {

				return fs.readFile(data.path + '/appState.json', (err, fileData) => {

					if (err) throw err;

					if (!fileData) {
						console.log("appState.json is empty");
						return;
					}

					var jsonData = JSON.parse(fileData);

					dispatch(setRoute(jsonData.route));
				});
			}
		});
	};
}

export const save = () => {

	console.log("saving app state...")

	return (dispatch, getState) => {

		let content = JSON.stringify(getState().appStateReducer);
		// console.log("content: " + content);

		storage.get('storyteller', function (error, data) {

			if (error) throw error;

			if (data.path) {

				fs.writeFile(data.path + "/appState.json", content, (err) => {

					if (err) throw error;

					else {
						console.log("Saved!");
					}
				})
			}
		});
	};
};
