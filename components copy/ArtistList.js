import React, { Component } from "react";
import { Table } from "reactstrap";
import NewArtistModal from "./NewArtistModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

class ArtistList extends Component {
    render() {
        const artists = this.props.artists;
        return (
            <Table dark>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {!artists || artists.length <= 0 ? (
                        <tr>
                            <td colSpan="6" align="center">
                                <b>Nothin' here yet</b>
                            </td>
                        </tr>
                    ) : (
                        artists.map(artist => (
                            <tr key={artist.id}>
                                <td>{artist.name}</td>
                                <td>{artist.description}</td>

                                <td align="center">
                                    <NewArtistModal
                                        create={false}
                                        artist={artist}
                                        resetState={this.props.resetState}
                                    />
                                    &nbsp; &nbsp;
                                    <ConfirmRemovalModal
                                        id={artist.id}
                                        resetState={this.props.resetState}
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        );
    }
}

export default ArtistList;