<template>
    <div>
        <v-card>
            <v-card-title>{{ person.name }}</v-card-title>
            <router-link to='/routetest'>back</router-link>
            <br/>
            <router-link to='/users'>users</router-link>
            <br/>
            <router-link to='/'>Quiz</router-link>
        </v-card>
    </div>
</template>

<script>
export default {
    name:'characters',
    props:{
        id: String
    },
    data(){
        return({
            payload:'',
            person:''
        })
    },
    created(){
        console.log(this.id)
        this.fetcher()
    },
    methods:{
        async fetcher(){
            this.payload = await fetch(`https://swapi.co/api/people/${this.id}`)
            this.person = await this.payload.json()

        }
    }
}
</script>