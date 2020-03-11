import React, { Component } from 'react';
import ApiAccess from '../apiaccess'

const apiAccess = new ApiAccess();

class EventList extends Component {

    constructor(props) {
        super(props)
        console.log('hi')
        this.state = {
            events: [],
            nextPageURL: '',
        }
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        let self = this;
        apiAccess.getEvents().then(function (result) {
            console.log(result)
            self.setState({ events: result, nextPageURL: result.nextLink })
        });
    }

    handleDelete(e, id) {
        let self = this;
        apiAccess.deleteEvent({id: id}).then(()=> {
            let newArr = self.state.events.filter(function(obj) {
                return obj.id !== id;
            });
            self.setState({events: newArr});
        });
    }

    nextPage() {
        let self = this;
        apiAccess.getEventByURL(this.state.nextPageURL).then((result) => {
            self.setState({events: result, nextPageURL: result.nextLink})
        });
    }

    render() {
        return (
            <div className="event-list">
                <table className="table">
                    <thead key="thead">
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Venue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.events && this.state.events.map(c =>
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.date}</td>
                                <td>{c.title}</td>
                                <td>{c.venue}</td>
                                <td><button className="btn" onClick={(e)=>  this.handleDelete(e,c.id) }> Delete</button>
                        <a  href={"/event/" + c.id}> Update</a></td>
                            </tr>)}
                    </tbody>
                </table>
                <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
            </div>
        )
    }

}
export default EventList;