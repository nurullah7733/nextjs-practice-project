import NavBar from './NavBar';
import { Container } from 'react-bootstrap';
import Footer from './Footer';

function Layout({ children }) {
    return (
        <div>
            <NavBar />
            <Container>
                <main>{children}</main>
            </Container>
            <Footer />
        </div>
    );
}

export default Layout;
