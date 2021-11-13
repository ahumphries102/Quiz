const rules = {
    length:[v => v?.length > 0|| 'Cannot be blank'],
    mustBeNumber:[ v => typeof 'number' || 'Must be number'],
    
}
export default rules
