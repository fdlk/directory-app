import EntitySelectBoxContainer from 'containers/EntitySelectBoxContainer'
import React, { Component, PropTypes } from 'react'

// ------------------------------------
// Presentation components
// ------------------------------------
const propTypes = {
  selectedMaterialTypes : PropTypes.array,
  getQuery              : PropTypes.func,
  selectMaterialType    : PropTypes.func
}

class MaterialTypesSelection extends Component {
  static getOption (item) {
    return item
  }

  render () {
    const { getQuery, selectedMaterialTypes } = this.props
    return (
      <div>
        <EntitySelectBoxContainer
          entityName='eu_bbmri_eric_material_types'
          getQuery={getQuery}
          labelKey='label'
          valueKey='id'
          attrs='id,label,description'
          getOption={MaterialTypesSelection.getOption}
          multi
          simpleValue={false}
          value={[{ id : 'id', label : 'label' }]}
          {...this.props} />
      </div>
    )
  }
}

MaterialTypesSelection.propTypes = propTypes

export default MaterialTypesSelection
