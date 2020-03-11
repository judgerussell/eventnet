import React, { Component } from 'react';
import ApiAccess from '../apiaccess';
import DateTimePicker from 'react-datetime-picker'

const apiAccess = new ApiAccess();

class EventCreateUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {match: { params } } = this.props;
        if(params && params.id) {
            apiAccess.getEvent(params.id).then((c)=>{
                this.refs.title.value = c.title;
                this.refs.description.value = c.description;
                this.refs.price.value = c.price
                this.refs.age_restriction.value = c.age_restriction
                this.refs.date.value = c.date
            });
        }
    }

    handleCreate() {
        apiAccess.createEvent({
            "title" : this.refs.title.value,
            "description": this.refs.description.value
        }).then((result)=>{
            alert("Event created")
        }).catch((e)=> {
            console.log(e.response)
            alert('There was an error! Please recheck form.');
        });
    }

    handleUpdate(id){
        apiAccess.updateEvent({
            "id": id,
            "title": this.refs.title.value,
            "description": this.refs.description.value
        }).then((result)=>{
            alert("Event updated");
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
                        Title:
                    </label>
                    <input className="form-control" type="text" ref="title" />

                    <label>
                        Date:
                    </label>
                    <DateTimePicker onChange="{this.onChange}" ref="date"/>

                    <label>
                        Venue:
                    </label>

                    <label>
                        Hosts:
                    </label>

                    <label>
                        Artists:
                    </label>
                    
                    <label>
                        Price:
                    </label>
                    <input className="formControl" type="number" min="0" oninput="{validity.valid||(value='');}" ref="price"/>

                    <label>
                        Age Restrictions:
                    </label>
                    <select ref="age_restriction">
                        <option>All ages</option>
                        <option>16+</option>
                        <option>18+</option>
                        <option>21+</option>
                    </select>

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

export default EventCreateUpdate;