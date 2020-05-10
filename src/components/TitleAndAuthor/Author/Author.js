import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../../../store/actions';

import TextInput from "./../../TextInput/TextInput";

export class Author extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			author: this.props.project.author,
		};
	}

	componentDidUpdate() {
		if (this.props.project.author !== this.state.author) {
			this.setState({ author: this.props.project.author });
		}
	}

	save(author) {
		this.props.setAuthor(author);
		this.props.saveProject();
	}

	render() {
		return (
			<div id="Author" style={{
				display: "flex",
				flexDirection: "column",
				height: "30%",
				margin: "10px 0",
				fontSize: "24px",
				alignItems: "center",
				justifyContent: "center"
			}}>

				<TextInput
					id="AuthorInput"
					placeholder="Author..."
					html={this.state.author} // innerHTML of the editable div
					disabled={false} // use true to disable edition
					save={this.save.bind(this)}
				/>

			</div>
		);
	}
}

function mapStateToProps({ project }) {
	return {
		project
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setAuthor: author => dispatch(projectActions.setAuthor(author)),
		saveProject: () => dispatch(projectActions.save()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Author)
