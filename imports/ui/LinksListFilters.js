// import React from 'react';
// import { Session } from 'meteor/session';

// const LinksListFilters = () => {
//     return (
//         <div>
//             <label><input type="checkbox" onChange={(e) => {
//                 // e.target.checked ? Session.set('showVisible', false) : Session.set('showVisible', true);
//                 Session.set('showVisible', !e.target.checked)
//             }} />show hidden links</label>
//         </div>
//     );
// }

// export default LinksListFilters;

import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export class LinksListFilters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showVisible: true,
            check: true
        }
    }

    componentDidMount() {
        this.checkedTracker = Tracker.autorun(() => {
            if (Session.equals('showVisible', false)) {
                this.setState({check: false})
            } else {
                this.setState({check: true})
            }
        })
        /*
        this.checkedTracker = Tracker.autorun(() => {
            this.setState({
                showVisible: Session.get('showVisible')
            })
        })
        */
    }
 
    componentWillUnmount() {
        this.checkedTracker.stop()
    }
    
    
    render() {
        return (
            <div>
            <label><input type="checkbox" checked={!this.state.check} onChange={(e) => {
                // e.target.checked ? Session.set('showVisible', false) : Session.set('showVisible', true);
                Session.set('showVisible', !e.target.checked)
            }} />show hidden links</label>
        </div>
        );
    }
}

export default LinksListFilters;
