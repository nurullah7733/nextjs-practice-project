import { Form, Button, Card } from 'react-bootstrap';
import { getSession, signIn } from 'next-auth/client';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { UseStore } from '../client/context';
import { authConstans } from '../client/context/constans';

function Login(props) {
    const [loginData, setLoginData] = useState({});
    const [loginError, setLoginError] = useState({});
    const router = useRouter();
    const [state, dispatch] = UseStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { errors, isValid } = validate();
        const session = await getSession();

        dispatch({ type: authConstans.LOGIN_REQUEST });

        if (isValid) {
            setLoginError({});
            const result = await signIn('credentials', {
                ...loginData,
                redirect: false,
            });
            if (!result.error) {
                dispatch({
                    type: authConstans.LOGIN_SUCCESS,
                    payload: session,
                });

                router.replace('/');
                toast.success('Successfully Logged In');
            } else {
                dispatch({
                    type: authConstans.LOGIN_FAILD,
                    payload: result.error,
                });
            }
        } else {
            setLoginError(errors);
        }
    };

    const validate = () => {
        const errors = {};
        if (!loginData.email) {
            errors.email = 'Eamil is Required';
        }
        if (!loginData.password) {
            errors.password = 'Password is Required';
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0,
        };
    };
    return (
        <div className="col-md-4 mt-4 offset-md-3 ">
            <Card className="p-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>

                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={loginData.email || ''}
                            onChange={handleChange}
                        />
                        {loginError.email ? (
                            <div style={{ color: 'red' }}>
                                {loginError.email}
                            </div>
                        ) : (
                            ''
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>

                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={loginData.password || ''}
                            onChange={handleChange}
                        />
                        {loginError.password ? (
                            <div style={{ color: 'red' }}>
                                {loginError.password}
                            </div>
                        ) : (
                            ''
                        )}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                <ToastContainer position="top-center" />
            </Card>
        </div>
    );
}

export default Login;
