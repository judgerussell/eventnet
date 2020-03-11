import React, { Component } from 'react';
import ApiAccess from '../apiaccess';

const apiAccess = new ApiAccess();

class ArtistCreateUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {match: { params } } = this.props;
        if(params && params.id) {
            apiAccess.getArtist(params.id).then((c)=>{
                this.refs.name.value = c.name;
                this.refs.description.value = c.description;
            });
        }
    }

    handleCreate() {
        apiAccess.createArtist({
            "name" : this.refs.name.value,
            "description": this.refs.description.value
        }).then((result)=>{
            alert("Artist created")
        }).catch((e)=> {
            console.log(e.response)
            alert('There was an error! Please recheck form.');
        });
    }

    handleUpdate(id){
        apiAccess.updateArtist({
            "id": id,
            "name": this.refs.name.value,
            "description": this.refs.description.value
        }).then((result)=>{
            alert("Artist updated");
        }).catch(()=>{
            alert('There was an error! Please recheck form.');
        });
    }

    handleSubmit(event) {
        const {match: { params } } = this.props;
        if(params && params.id){
            this.handleUpdate(params.id);
        } else {
            this.handleCreate();
        }
        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        Name:
                    </label>
                    <input className="form-control" type="text" ref="name" />

                    <label>
                        Description:
                    </label>
                    <textarea className="form-control" ref="description" />

                    <input className="btn btn-primary" type="submit" value="Submit"/>
                </div>
            </form>
        );
    }

}

export default ArtistCreateUpdate;