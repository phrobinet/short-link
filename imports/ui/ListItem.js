import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Clipboard from 'clipboard';
import moment from 'moment';

export class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: 'copy'
        }
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on('success', () => {
            this.setState({text: "copied"});
            setTimeout(() => {
                this.setState({text: 'copy'})
            }, 3000);
        }).on('error', ()=> {
            alert('Unable to copy. Please manually copy the link')
        })
    }
    componentWillUnmount() {
        this.clipboard.destroy();
    }
    
    renderStat() {
        const visitMessage = this.props.visitedCount <= 1 ? 'visit' : 'visits';
        let visitedMessage =null;

        if (typeof this.props.lastVisitedAt === 'number') {
            visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`
        }
        return <p>{this.props.visitedCount} {visitMessage}  {visitedMessage} </p>
    }
    render() {
        return (
            <div>
                <h4>{this.props.url} </h4>
                <p>{this.props.shortUrl} </p>
                <p>{this.props.visible.toString()} </p>
                {this.renderStat()}
                <a className="button button--link button--pill" href={this.props.shortUrl} target="_blank">
                    Visit
                </a>
                <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl} >{this.state.text}</button>
                <button className="button button--pill" onClick={() => {
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
                    // Session.set('showVisible', false);
                }} >
                    {this.props.visible ? 'Hide': 'Unhide'}
                </button>
            </div>
        );
    }
}

export default ListItem;

// ListItem.PropTypes = {
//     _id: React.PropTypes.string.isRequired,
//     url: React.PropTypes.string.isRequired,
//     shortUrl: React.PropTypes.string.isRequired,
//     userId: React.PropTypes.string.isRequired,
//     visible: React.PropTypes.string.isRequired
// }
