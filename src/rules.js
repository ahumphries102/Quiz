const rules = {
    password:[v => v?.length > 0|| 'Cannot be blank'],
    userName:[v => v?.length > 0|| 'Cannot be blank']
}
export default rules
