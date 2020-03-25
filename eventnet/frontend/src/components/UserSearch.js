import React, { Component } from 'react';
import ApiAccess from '../apiaccess'
import Search from 'react-search'

const apiAccess = new ApiAccess();

class UserSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        let self = this;
        apiAccess.getArtists().then(function (result) {
            console.log(result)
            result.map((i) => i.value = i.name)
            self.setState({ users: result})
        });
    }

    render() {
        
        let self = this;
        return (
            <div>
                <Search
                    items={self.state.users}
                    multiple={true}
                    max={100}
                />
            </div>
        )
    }
}

export default UserSearch;