<template>
  <v-container fill-height>
      <v-card width="50%" class="mx-auto">
          <v-card-title>
              Signup
          </v-card-title>
          <v-form v-model="valid">
            <v-card-text>
                <v-text-field label="Enter a User Name" v-model="userName" :rules="rules.userName"/>
                <v-text-field label="Enter a Password" v-model="password" :type="visible?'':'password'"
                    :append-icon="visible?'mdi-eye':'mdi-eye-off'" @click:append="visible = !visible" :rules="rules.password"/>
                <p :style="{color:color}">{{responseMsg}}</p>
            </v-card-text>
            <v-card-actions>
                <v-btn :loading="submitted" color="primary" :disabled="!valid" @click="submit">Submit</v-btn>
            </v-card-actions>
          </v-form>
      </v-card>
  </v-container>
</template>

<script>
export default {
    name:'login',
    data:()=>({
        color:'',
        password:'',
        responseMsg:'',
        rules:{
            password:[v => v.length > 0 || 'Cannot be Blank'],
            userName:[v => v.length > 0 || 'Cannot be Blank'],
        },
        submitted:false,
        userName:'',
        valid:true,
        visible:false,
    }),
    methods:{
        async submit(){
            this.submitted = true
            let request = await fetch('/createUser', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {  
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    userName:this.userName,
                    password:this.password
                }) // body data type must match "Content-Type" header
            })
            
            let data = await request.json()
            this.$router.push({name:'login'}).catch(err=>err)
            if(request.ok){
                this.color = 'green'
                this.responseMsg = data.msg
            }else{
                this.color = 'red'
                this.responseMsg = data.err                
                this.submitted = false
            }
            this.submitted = false
            console.log(data)
        }
    }
}
</script>