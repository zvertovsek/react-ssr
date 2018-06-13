import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ auth }) => {
    const athButton = auth ?
        (<a href="/api/logout">Logout</a>) :
        (<a href="/api/auth/google">Login</a>);

    return (
        <div>
            <Link to="/">Logo</Link>
            <nav>
                <Link to="/users">Users</Link>
                <Link to="/admins">Admins</Link>
                {athButton}
            </nav>
        </div>
    );
};

function mapStateToProps({ auth }) {
    return { auth };
} 

export default connect(mapStateToProps)(Header);