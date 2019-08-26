import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { createProjectAction, openProjectAction, closeProjectAction } from "../../reducers/projectReducer";

import {
    Alignment,
    Button,
    Icon,
    Navbar,
    NavbarGroup,
    NavbarDivider,
    Position,
    Tab, 
    Tabs,
    Tooltip,
} from '@blueprintjs/core';

import { remote } from 'electron';
const { dialog } = require('electron').remote;

class TopNavBar extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
        selectedTabId: 'script',
        };
    }

    setSelectedMainArea(selectedTabId){
        this.props.setSelectedMainArea(selectedTabId) 
    }

    handleTabChange(navbarTabId){
        this.setState({ selectedTabId: navbarTabId });
        this.setSelectedMainArea(navbarTabId);
    } 

    render() {
        return (
            <Navbar>
          
                <NavbarGroup align={Alignment.LEFT}>
            
                <Tooltip content="Close project" position={Position.BOTTOM}>
                    <Button 
                        minimal={true}
                        icon="disable"
                        onClick={ () => {this.props.closeProject()} }
                    />
                </Tooltip>
                <Tooltip content="Open project" position={Position.BOTTOM}>
                    <Button 
                        minimal={true}
                        icon="folder-open"
                        onClick={() => {
                        var result = dialog.showOpenDialog({ properties: ['openDirectory']});
                        if(result) {
                            this.props.openProject(result[0])
                        } 
                    }}/>
                </Tooltip>
                <Tooltip content="Create new project" position={Position.BOTTOM}>
                    <Button 
                        minimal={true}
                        icon="folder-new"
                        onClick={() => {
                        var result = dialog.showOpenDialog({ properties: ['openDirectory']});
                        if(result) {
                            this.props.createProject(result[0])
                        } 
                    }}/>
                </Tooltip>
                <Tooltip content="Save" position={Position.BOTTOM}>
                    <Button 
                        minimal={true}
                        icon="floppy-disk"
                    />
                </Tooltip>
            
                <NavbarDivider />

                { this.props.project.path &&
                    <Tabs id="TopNav" onChange={this.handleTabChange.bind(this)} selectedTabId={this.state.selectedTabId} animate="true">
                        <Tab id="script">
                        <Link to="/"><Icon icon="draw" /> Script</Link>
                        </Tab>
                        <Tab id="characters">
                        <Link to="/characters"><Icon icon="people" /> Characters</Link>
                        </Tab>
                        <Tab id="locations">
                        <Link to="/locations"><Icon icon="map-marker" /> Locations</Link>
                        </Tab>
                        <Tab id="timeline">
                        <Link to="/timeline"><Icon icon="time" /> Timeline</Link>
                        </Tab>
                    </Tabs>
                }

                </NavbarGroup>

                <NavbarGroup align={Alignment.RIGHT}>
                    <Tooltip content="Quit Storyteller" position={Position.BOTTOM}>
                    <Button
                        minimal={true}
                        icon="small-cross"
                        onClick={() => remote.app.quit()}
                    />
                    </Tooltip>
                </NavbarGroup>

            </Navbar>
        );
    }
}

function mapStateToProps ({ projectReducer }) {
    return {
        project: projectReducer,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        openProject: (filePath) => dispatch(openProjectAction(filePath)),
        createProject: (filePath) => dispatch(createProjectAction(filePath)),
        closeProject: () => dispatch(closeProjectAction()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TopNavBar)