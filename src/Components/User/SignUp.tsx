import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { TextField, Button } from '@material-ui/core';
import MessageSnackbar from '../Reusable/MessageSnackbar';

class SignUp extends React.Component<any, {
    user_id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    password_confirm: string,
    messageSnackbarString: string,
    isSnackbarOpen: boolean,
    status: number,
    isSuccessfullySignedUp: boolean,
}>{
    constructor(props: any) {
        super(props);
        this.state = {
            user_id: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirm: "",
            messageSnackbarString: "",
            isSnackbarOpen: false,
            status: 0,
            isSuccessfullySignedUp: false,
        }
    }

    componentDidMount = () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
    }

    handleOnChange = (e: any, label: any) => {
        if(label === 'user_id') {
            this.setState({
                user_id: e.currentTarget.value
            })
        }
        if(label === 'first_name') {
            this.setState({
                first_name: e.currentTarget.value
            })
        }
        if(label === 'last_name') {
            this.setState({
                last_name: e.currentTarget.value
            })
        }
        if(label === 'email') {
            this.setState({
                email: e.currentTarget.value
            })
        }
        if(label === 'password') {
            this.setState({
                password: e.currentTarget.value
            })
        }
        if(label === 'password_confirm') {
            this.setState({
                password_confirm: e.currentTarget.value
            })
        }
    }

    signUpNewUser = () => {
        let { user_id, first_name, last_name, email, password, password_confirm } = this.state;
        let url = ('http://localhost:5032/api/signUpNewUser');
        let data = {
            'user_id': user_id,
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'password': password,
            'password_confirm': password_confirm
        };
        console.log(data)
        const options: any = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url,
          };
        axios(options)
            .then(res => {
                if(res.status === 200) {
                    this.setState({
                        messageSnackbarString: 'Congratulations! Your are successfully registered. Moving to Log in page...',
                        isSnackbarOpen: true,
                        status: res.status,
                        isSuccessfullySignedUp: true,
                    })
                }
            })
            .catch((err) => {
                if(err.response.status === 500) {
                    this.setState({
                        messageSnackbarString: err.response.data,
                        isSnackbarOpen: true,
                        status: err.response.status
                    })
                }
            })
    }

    closeMessage = () => {
        this.setState({
            isSnackbarOpen: false
        }, () => {
            if(this.state.isSuccessfullySignedUp) {
                this.props.history.push('/login');
            }
        })
    }

    render() {
        return (
            <div className="signUpBody container">
                <div className="signUpContainer">
                    <div className="containerTitle">
                        <div>Create an account</div>
                    </div>
                    <div>
                        <label className='mb-2 signUpLabel'>User ID</label>
                        <div>
                            <TextField
                                id="user_id_input"
                                variant="outlined"
                                onChange={(e) => {this.handleOnChange(e, 'user_id')}}
                                required
                                className="col-12"
                            />
                        </div>
                    </div>
                    <div className="row d-flex flex-wrap">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <label className='mb-2 signUpLabel'>First Name</label>
                            <div>
                                <TextField
                                    id="first_name_input"
                                    variant="outlined"
                                    onChange={(e) => {this.handleOnChange(e, 'first_name')}}
                                    required
                                    style={{width: '100%'}}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <label className='mb-2 signUpLabel'>Last Name</label>
                            <div>
                                <TextField
                                    id="last_name_input"
                                    variant="outlined"
                                    onChange={(e) => {this.handleOnChange(e, 'last_name')}}
                                    required
                                    style={{width: '100%'}}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className='mb-2 signUpLabel'>Email</label>
                        <div>
                            <TextField
                                id="email_input"
                                variant="outlined"
                                onChange={(e) => {this.handleOnChange(e, 'email')}}
                                required
                                className="col-12"
                            />
                        </div>
                    </div>
                    <div>
                        <label className='mb-2 signUpLabel'>Password</label>
                        <div>
                            <TextField
                                id="password_input"
                                variant="outlined"
                                onChange={(e) => {this.handleOnChange(e, 'password')}}
                                required
                                className="col-12"
                                type="password"
                            />
                        </div>
                    </div>
                    <div>
                        <label className='mb-2 signUpLabel'>Confirm Password</label>
                        <div>
                            <TextField
                                id="password_confirm_input"
                                variant="outlined"
                                onChange={(e) => {this.handleOnChange(e, 'password_confirm')}}
                                required
                                className="col-12"
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <Button className="signUpButton" style={{fontSize: '16px', fontWeight: 'bold' }} variant="outlined" onClick={this.signUpNewUser}>Sign Up</Button>
                    </div>
                    <h5 className="signUpHorizontalLine"><span>Or</span></h5>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <h5 onClick={() => {this.props.history.push('/login')}} style={{cursor: 'pointer', marginTop: '10px'}}>Sign in instead</h5>
                    </div>
                </div>
                <MessageSnackbar
                    isOpen={this.state.isSnackbarOpen}
                    message={this.state.messageSnackbarString}
                    messageStatus={this.state.status}
                    closeMessage={this.closeMessage}
                />
            </div>
        )
    }
}

export default SignUp;