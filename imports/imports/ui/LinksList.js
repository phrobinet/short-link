import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Links } from '../api/links';
import { Tracker } from 'meteor/tracker';
import FlipMove from 'react-flip-move';

import ListItem from './ListItem';

export class LinksList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }

    componentDidMount() {
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('sknil');
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch()
            this.setState({links })        
        })
    }
    componentWillUnmount() {
        this.linksTracker.stop()
    }
    renderLinksListItems() {
        if (this.state.links.length === 0) {
            return <div className="item"><p className="item__status-message">No Links Found</p></div>
        }

    }
    
    render() {
        return (
            <div>
                <div>
                    {this.renderLinksListItems()}
                    <FlipMove leaveAnimation="accordionVertical" maintainContainerHeight="true">
                        {
                        this.state.links.map(link => {
                            const shortUrl = Meteor.absoluteUrl(link._id);                            
                            return <ListItem key={link._id} shortUrl={shortUrl}  {...link} />
                        })
                        }
                    </FlipMove>
                </div>
            </div>
        );
    }
}

export default LinksList;
