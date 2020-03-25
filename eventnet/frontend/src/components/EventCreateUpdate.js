import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import ApiAccess from '../apiaccess';
import DateTimePicker from 'react-datetime-picker';
import SearchBox from './SearchBox';

const apiAccess = new ApiAccess();

class EventCreateUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.artist_num = 0
        this.state = {
            toEventList: false,
            date: null,
            artists: this.getArtistSearchData(),
            venues: this.getVenueSearchData(),
            venue_starting_data: null,
            artists_starting_data: []
        }
        
    }

    onChange = date => this.setState({date: date})

    componentDidMount() {
        const {match: { params } } = this.props;
        if(params && params.id) {
            apiAccess.getEvent(params.id).then((c)=>{
                this.refs.title.value = c.title;
                this.refs.description.value = c.description;
                this.refs.price.value = c.price;
                this.refs.age_restriction.value = c.age_restriction;
                this.refs.date.value = new Date(c.date);
                let venue_starting_data = c.venue;
                let artists_starting_data = c.artists;
                this.setState({date: this.refs.date.value});

                this.artist_num = c.artists.length
                
                for (var a of artists_starting_data) {
                    apiAccess.getArtist(a).then((artist) => {
                        this.setState({artists_starting_data: this.state.artists_starting_data.concat({key: artist.id, value: artist.name})})
                        console.log(this.state.artists_starting_data)
                    });
                }
                apiAccess.getVenue(parseInt(venue_starting_data)).then((v) => {
                    this.setState({venue_starting_data: this.toKeyValue([v])});        
                })
            });

            
        }
    }

    toKeyValue(arr) {
        let elems = [];
        for (var elem of arr) {
            elems.push({key: elem['id'], value: elem['name']});
        }
        return elems;
    }

    getArtistSearchData() {
        let self = this
        apiAccess.getArtists().then(function (result) {
            self.setState({ artists: self.toKeyValue(result)})
        });
    }

    getVenueSearchData() {
        let self = this
        apiAccess.getVenues().then(function (result) {
            self.setState({ venues: self.toKeyValue(result)})
        
        });
    }

    handleCreate() {
        apiAccess.createEvent({
            "title" : this.refs.title.value,
            "description": this.refs.description.value,
            "price" : this.refs.price.value,
            "age_restriction" : this.refs.age_restriction.value,
            "date" : this.refs.date.value,
        }).then((result)=>{
            alert("Event created");
            this.setState(() => ({ toEventList: true }));
        }).catch((e)=> {
            console.log(e.response)
            alert('There was an error! Please recheck form.');
        });
    }

    handleUpdate(id){
        apiAccess.updateEvent({
            "id": id,
            "title": this.refs.title.value,
            "description": this.refs.description.value,
            "price" : this.refs.price.value,
            "age_restriction" : this.refs.age_restriction.value,
            "date" : this.refs.date.value,
        }).then((result)=>{
            alert("Event updated");
            this.setState(() => ({ toEventList: true }));
        }).catch((e)=>{
            console.log(e.response)
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

        if (this.state.toArtistList === true)
            return <Redirect to='/events' /> 
        
        let a = <div>loading...</div>
        let v = <div>loading...</div>
        

        /* artist search bar */
        if (this.state.artists && this.state.artists_starting_data.length >= this.artist_num) {
            a = <SearchBox placeholder="Search" data={this.state.artists} starting_data={this.state.artists_starting_data} max={50} input_ref="artists"/>
        }

        /* venue search bar */
        if (this.state.venues && this.state.venue_starting_data) {
            v = <SearchBox placeholder="Search" data={this.state.venues} starting_data={this.state.venue_starting_data} input_ref="venues"/>
        }
        
        return(
            <div className="container">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        Title:
                    </label>
                    <input className="form-control" type="text" ref="title" />

                    <label>
                        Date:
                    </label>
                    <DateTimePicker className="form-control" onChange={this.onChange} value={this.state.date} ref="date"/>

                    <label>
                        Venue:
                    </label>
                    {v}

                    <label>
                        Hosts:
                    </label>
                    <input className="form-control" type="text" />


                    <label>
                        Artists:
                    </label>
                    {a}
                    
                    <label>
                        Price:
                    </label>
                    <input className="form-control" type="number" min="0" onInput="{validity.valid||(value='');}" ref="price"/>

                    <label>
                        Age Restrictions:
                    </label>
                    <select className="form-control" ref="age_restriction">
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
            </div>
        );
    }

}

export default EventCreateUpdate;