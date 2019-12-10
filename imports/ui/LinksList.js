import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Links } from '../api/links';
import { Tracker } from 'meteor/tracker';

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
        if(this.state.links && this.state.links.length >0 ){
            return this.state.links.map(link => {
                const shortUrl = Meteor.absoluteUrl(link._id);
                
                return <ListItem key={link._id} shortUrl={shortUrl}  {...link} />
            })
        } else {
            return <p>Your list is empty</p>
        }

    }
    
    render() {
        return (
            <div>
                <div>
                    {this.renderLinksListItems()}
                </div>
            </div>
        );
    }
}

export default LinksList;
