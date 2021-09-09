const rules = {
    length:[v => v?.length > 0|| 'Cannot be blank'],
    mustBeNumber:[ v => v.length || 'Must be number'],
    
}
export default rules
