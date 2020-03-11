import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";

import axios from "axios";

import { ARTIST_URL } from "../constants";


class ConfirmRemovalModal extends Component {
    state = {
        modal: false
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    deleteArtist = (id) => {
        axios.delete(ARTIST_URL + id).then(() => {
            this.props.resetState();
            this.toggle();
          });       
    };

    render() {
        return (
            <Fragment>
                <Button color="danger" onClick={() => this.toggle()}>
                    Remove
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Do you really want to delete this artist?
                    </ModalHeader>
                    
                    <ModalFooter>
                        <Button type="button" onClick={() => this.toggle()}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            color="primary"
                            onClick={() => this.deleteArtist(this.props.id)}
                        >    
                            Yes
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

export default ConfirmRemovalModal;