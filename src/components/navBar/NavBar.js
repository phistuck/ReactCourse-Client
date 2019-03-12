import React, { Component } from 'react';
import logo from '../../assets/images/logo.jpg';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
    <header className="header">        
        <nav>
            <ul className="nav-items">
                <li className="li-nav-item"><Link to="/" className="nav-item-link"><span>ראשי</span></Link></li>
                <li className="li-nav-item"><Link to="/configuration" className="nav-item-link" ><span>הגדרות</span></Link></li>
                <li className="li-nav-item"><Link to="/highscore"><span>לוח תוצאות</span></Link></li>
            </ul>
        </nav>
        <h2 className="header-title">משחק הזיכרון</h2>
        <img className="header-logo" src={logo} alt='Logo'/>
	</header>
    );
  }
}

export default NavBar;
