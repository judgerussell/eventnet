import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import ArtistList from "./ArtistList";
import NewArtistModal from "./NewArtistModal";

import axios from "axios";

import { ARTIST_URL } from "../constants";

class Home extends Component {
    state = {
        artists: []
    };

    componentDidMount() {
        this.resetState();
    };

    getArtists = () => {
        axios.get(ARTIST_URL).then(res => {
            this.setState({ artists : res.data });
        })
    };

    resetState = () => {
        this.getArtists();
    };

    render() {
        return (
            <Container style={{ marginTop: "20px"}}>
                <Row>
                    <Col>
                        <ArtistList
                            artists={this.state.artists}
                            resetState={this.resetState}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <NewArtistModal create={true} resetState={this.resetState}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;