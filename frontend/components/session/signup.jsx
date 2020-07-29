import React from "react";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.currentUser;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        // debugger
        e.preventDefault();
        // debugger;
        this.props.createNewUser(this.state)
            .then(() => this.props.history.push('/dashboard'));
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value })
        }
    }

    render() {
        return (
        <div className='signup-left'>
            <div>Robinhood Logo</div>
            <div>marketing statement</div>
            <form className="signup-form">
                <label>
                    <input
                    type="text"
                    placeholder={"First Name"}
                    value={this.state.firstName}
                    onChange={this.update('firstName')}
                    />
                </label>
                <label>
                    <input
                    type="text"
                    placeholder={"Last Name"}
                    value={this.state.lastName}
                    onChange={this.update('lastName')}
                    />
                </label>
                <label>
                    <input
                    type="text"
                    placeholder={"Email"}
                    value={this.state.email}
                    onChange={this.update('email')}
                    />
                </label>
                
                <label>
                    <input
                    type="password"
                    placeholder={"Password (min. 10 characters)"}
                    value={this.state.password}
                    onChange={this.update('password')}
                    />
                </label>
                
                <button onClick={this.handleSubmit}>Continue</button>
            </form>
        </div>
        )
    }

}

export default Signup;