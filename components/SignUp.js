import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { SignUpRequest } from '../client/request';

function SignUp(props) {
    const [userData, setUserData] = useState({});
    const [getErrors, setGetErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { errors, isValid } = validate();

        if (isValid) {
            try {
                await SignUpRequest(userData);
            } catch (error) {
                console.log(error);
            }
            setUserData({});
            setGetErrors({});
            console.log(userData);
        } else {
            setGetErrors({ ...getErrors, errors });
            console.log(getErrors.errors);
        }
    };

    const validate = () => {
        const errors = {};
        if (!userData.name) {
            errors.name = 'Please Provide a Name';
        }
        if (!userData.email) {
            errors.email = 'Email is Required';
        }
        if (!userData.password) {
            errors.password = 'Password is Required';
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0,
        };
    };

    return (
        <div className="col-md-4 mt-4 offset-md-3">
            <Card className="p-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            onChange={handleChange}
                            value={userData.name || ''}
                        />
                        <div style={{ color: 'red' }}>
                            {getErrors.errors ? getErrors.errors.name : ''}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>

                        <Form.Control
                            type="text"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                            value={userData.email || ''}
                        />
                        <div style={{ color: 'red' }}>
                            {getErrors.errors ? getErrors.errors.email : ''}
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={userData.password || ''}
                        />
                        <div style={{ color: 'red' }}>
                            {getErrors.errors ? getErrors.errors.password : ''}
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </Card>
        </div>
    );
}

export default SignUp;
