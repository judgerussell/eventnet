import React, { Component } from 'react';
import ApiAccess from '../apiaccess'

const apiAccess = new ApiAccess();

class ArtistList extends Component {

    constructor(props) {
        super(props)
        console.log('hi')
        this.state = {
            artists: [],
            nextPageURL: '',
        }
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        let self = this;
        apiAccess.getArtists().then(function (result) {
            console.log(result)
            self.setState({ artists: result, nextPageURL: result.nextLink })
        });
    }

    handleDelete(e, id) {
        let self = this;
        apiAccess.deleteArtist({id: id}).then(()=> {
            let newArr = self.state.artists.filter(function(obj) {
                return obj.id !== id;
            });
            self.setState({artists: newArr});
        });
    }

    nextPage() {
        let self = this;
        apiAccess.getEventByURL(this.state.nextPageURL).then((result) => {
            self.setState({artists: result, nextPageURL: result.nextLink})
        });
    }

    render() {
        return (
            <div className="artist-list">
                <table className="table">
                    <thead key="thead">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.artists && this.state.artists.map(c =>
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.description}</td>
                                <td><button className="btn" onClick={(e)=>  this.handleDelete(e,c.id) }> Delete</button>
                        <a  href={"/artist/" + c.id}> Update</a></td>
                            </tr>)}
                    </tbody>
                </table>
                <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
            </div>
        )
    }

}
export default ArtistList;