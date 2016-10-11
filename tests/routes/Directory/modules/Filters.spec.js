import reducer, {defaultState, getRsql, getRsqlFragment} from 'routes/Directory/modules/Filters'

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
        {sample_accessFee: true}
      )
      console.log('result', rsqlFragment)
      expect(rsqlFragment).to.eql('sample_access_fee==true');
    })
    it('converts an mref fragment', () => {

    })
    it('converts a complex query', () => {

    })
  })
})
