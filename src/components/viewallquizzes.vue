<template>
    <div>
        
    </div>
</template>

<script>
export default {
    name:'allquizzes',
    data() {
        return {
            
        }
    },
    mounted(){
        this.getAllQuizzes()
    },
    methods: {
        async getAllQuizzes() {
            let request = await this.$root.fetchData('POST', "/viewquiz", {
                username: this.$store.state.username
            })
            this.allQuizzes = request
        }
    }
}
</script>