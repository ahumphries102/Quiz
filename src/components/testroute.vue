<template>
    <div>
        <v-card>
            
            <router-link v-for="(route, ind) in routes" :key="ind" :to="`/routetest/${ind+1}`"> Character {{ind+1}}</router-link>
        </v-card>
    </div>
</template>

<script>
export default {
    name:'routerTest',
    data(){
        return({
            routes:[0,1,2,3,4,5,6,7]
        })
    }
}
</script>