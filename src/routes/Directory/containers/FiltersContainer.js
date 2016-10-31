import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Filters from '../components/Filters'
import {actions} from '../modules/Filters'
import { getRsql, getHumanReadable, getAttributes } from '../modules/Directory'

const propTypes = {};

const mapStateToProps = (state) => ({
  ...state.Directory.filters,
  rsql: state.Directory && getRsql(state.Directory),
  humanReadable: state.Directory && getHumanReadable(state.Directory),
  attributes :  state.Directory && getAttributes(state.Directory)
})

Filters.propTypes = propTypes;
export default connect(
  mapStateToProps,
  actions
)(Filters);
