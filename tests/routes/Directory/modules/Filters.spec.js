import reducer, { defaultState, getRsql, getRsqlFragment, getComplexFilterLineRsqlFragment } from 'routes/Directory/modules/Filters';
import deepFreeze from 'deep-freeze';

describe('(Redux) filters', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(defaultState);
    })
  })
  describe('(getRsql) selector', () => {
    it('converts a boolean fragment', () => {
      const rsqlFragment = getRsqlFragment(
        {name: 'sample_access_fee', fieldType: 'BOOL'},
        {sample_access_fee: true}
      )
      expect(rsqlFragment).to.eql('sample_access_fee==true');
    })
    it('converts an mref fragment', () => {
      const rsqlFragment = getRsqlFragment(
        {name: 'materials', fieldType: 'CATEGORICAL_MREF'},
        {materials: [
          {
            operator : 'AND',
            value    : ['PLASMA', 'TISSUE_FROZEN']
          },
          'OR',
          {
            value : 'NAV'
          }
        ]}
      )
      expect(rsqlFragment).to.eql('');
    })

    it('converts a complex filter line', () => {
      const rsqlFragment =
        getComplexFilterLineRsqlFragment('materials', {
          operator : 'AND',
          value    : ['PLASMA', 'TISSUE_FROZEN']
        })
      expect(rsqlFragment).to.eql('materials==PLASMA;TISSUE_FROZEN')
    })

    it('converts a complex filter line with OR operator', () => {
      const rsqlFragment =
        getComplexFilterLineRsqlFragment('materials', 'OR')
      expect(rsqlFragment).to.eql(',')
    })

    it('converts a complex filter line with AND operator', () => {
      const rsqlFragment =
        getComplexFilterLineRsqlFragment('materials', 'AND')
      expect(rsqlFragment).to.eql(';')
    })

    it('converts a complex filter line with single value', () => {
      const rsqlFragment =
        getComplexFilterLineRsqlFragment('materials', {
          value : 'NAV'
        })
      expect(rsqlFragment).to.eql('materials==NAV')
    })
  })
})
