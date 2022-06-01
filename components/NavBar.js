import Link from 'next/link';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { UseStore } from '../client/context';
import styles from '../styles/NavBar.module.css';

function NavBar(props) {
    const [state, dispatch] = UseStore();
    console.log(state.user?.user?.name);
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Link href="/">
                            <a className={styles.nav_link}>News</a>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link href="/">
                                <a className={styles.nav_link}>Home</a>
                            </Link>
                            <Link href="/login">
                                <a className={styles.nav_link}>Login</a>
                            </Link>
                            <Link href="/sign-up">
                                <a className={styles.nav_link}>Sign Up</a>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;
