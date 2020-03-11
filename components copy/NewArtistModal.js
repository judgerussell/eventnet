import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewArtistForm from "./NewArtistForm";

class NewArtistModal extends Component {
    state = {
        modal: false
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    render() {
        const create = this.props.create;

        let title = "Editing Artist";
        let button = <Button onClick={this.toggle}>Edit</Button>
        if(create) {
            title = "Creating New Artist";

            button = (
                <Button
                    color="primary"
                    className="float-right"
                    onClick={this.toggle}
                    style={{ minWidth: "200px"}}
                >
                    Create New
                </Button>
            );
        }

        return (
            <Fragment>
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

                    <ModalBody>
                        <NewArtistForm
                            resetState={this.props.resetState}
                            toggle={this.toggle}
                            artist={this.props.artist}
                        />
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

export default NewArtistModal;