import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from './Payment';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>;
      default:
        return [
          <li key={'Payment'}><Payment /></li>,
          <li key={'Credits'} style={{ margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
          <li key={'Logout'}><a href="/api/logout">Logout</a></li>
        ];
    }
  }

  render() {
    return(
      <nav className="container">
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >Emaily</Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

/*
const mapStateToProps = (state) => {
  return { auth: state.auth };
}
*/

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
