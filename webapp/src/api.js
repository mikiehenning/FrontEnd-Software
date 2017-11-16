const PropAPI = {
    set: function() {
        super(props);
        this.state = {
            username: props.username,
            error: props.error,
            info: props.info,
            password: ''
        }
    }
export default PropAPI