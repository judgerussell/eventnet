import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { ARTIST_URL } from "../constants";

class NewArtistForm extends React.Component {
    state = {
        id: 0,
        name: "",
        description: ""
    };

    componentDidMount() {
        if (this.props.artist) {
            const { id, name, description } = this.props.artist;
            this.setState({ id, name, description });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    createArtist = e => {
        e.preventDefault();
        axios.post(ARTIST_URL, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    editArtist = e => {
        e.preventDefault();
        axios.put(ARTIST_URL + this.state.id + "/", this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    render() {
        return (
            <Form onSubmit={this.props.artist ? this.editArtist : this.createArtist}>
                <FormGroup>
                    <Label for="name">Name:</Label>
                    <Input
                        type="text"
                        name="name"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.name)}
                    />
                </FormGroup>
                <FormGroup>
                    <label for="description">Description:</label>
                    <Input
                        type="textarea"
                        name="description"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.description)}
                    />
                </FormGroup>
                <Button>Send</Button>
            </Form>
        );
    }
}

export default NewArtistForm;