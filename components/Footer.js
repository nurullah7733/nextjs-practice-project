import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { UseStore } from '../client/context';

function Footer() {
    return (
        <div className="pt-4">
            <Navbar bg="light" expand="lg">
                <Container>
                    <span style={{ margin: 'auto' }}>&copy; 2022</span>
                </Container>
            </Navbar>
        </div>
    );
}

export default Footer;
