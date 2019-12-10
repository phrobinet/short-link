import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export class AddLink extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            url:'',
            error: '',
            isOpen: false
        }
    }
    onSubmit(e) {
        const {url} = this.state
        e.preventDefault();

        if(url){
            Meteor.call('llinks.insert', url, (err, res) => {
                if(!err){
                    this.handleModalClose();
                } else {
                    console.log(err.error);
                    this.setState({error: err.error})                  
                }
            })
            // Links.insert({url, userId: Meteor.userId()})
        }
    }
    onChange(e) {
        this.setState({
            url: e.target.value.trim()
        })
    }
    handleModalClose() {
        this.setState({isOpen: false, url: '', err: ''})
    }
    
    render() {
        return (
            <div>
                <button className="button" onClick={() => this.setState({isOpen: true})}>Add Link</button>
                <Modal 
                    isOpen={this.state.isOpen} 
                    ariaHideApp={false}
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                    contentLabel="Add Link"
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view__modal"
                >
                    <h1>Add Link</h1>
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form" >
                        <input 
                            type="text" 
                            ref="url" 
                            placeholder="URL" 
                            value={this.state.url}
                            onChange={this.onChange.bind(this)}
                        />
                        <button className="button">Add Link</button>
                    <p className="">{this.state.error ? this.state.error : undefined}</p>
                    <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)} >Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default AddLink;

