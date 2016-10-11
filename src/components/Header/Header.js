import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'
import Alerts from '../../containers/Alerts'

export const Header = () => (
  <div>
    <Alerts />
    <h1>BBMRI ERIC Directory</h1>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/directory' activeClassName={classes.activeRoute}>
      Directory
    </Link>
  </div>

)

export default Header
