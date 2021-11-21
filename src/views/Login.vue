<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-muted text-center mb-3">
                <small>Sign In to Manage Your Project Now!</small>
              </div>
            </template>
            <br />

            <template>
              <form role="form">
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                  v-model="email"
                ></base-input>
                <base-input
                  alternative
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="password"
                ></base-input>

                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="login">Sign In</base-button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <!-- <div class="col-6" style="padding-left:50px;"> -->
              <base-button style="margin-left:20px;" href="#" class="text-left" @click="direct">
                <small>Register</small>
              </base-button>
            
              <base-button style="margin-left:130px;" href="#" class="text-light" @click="resetpassword">
                <small>Forgot password?</small>
              </base-button>
            <!-- </div>  -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import firebase from "firebase";
import router from "../router";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      var flag = true;
      var email = this.email;
      var password = this.password;
      console.log(email);
      firebase.auth().signInWithEmailAndPassword(email, password)
      //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        // .then(function() {
        //   console.log(email);
        //   firebase.auth().signInWithEmailAndPassword(email, password)
          
        // })
        .catch(function(error) {
          console.log(error);
          alert("Invalid account or password!");
          flag = false;
        })
        .then(function() {
          if (flag) {
            alert("Signed in Successfully!");
          }
        })
        .then(function() {
          if (flag) {
            router.push({ name: "profile" });
          }
        });
    },
    resetpassword: function() {
      var auth = firebase.auth();
      var emailAddress = this.email;
      if (this.email == "") {
        alert("Please key in your email!");
      } else {
        auth
          .sendPasswordResetEmail(emailAddress)
          .then(
            alert(
              "Email of resetting password has been sent. Please check your email!"
            )
          );
      }
    },
    direct: function() {
      router.push({ name: "register" });
    }
  }
};
</script>
<style>
</style>
