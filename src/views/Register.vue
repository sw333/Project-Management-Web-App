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
              <div class="text-center text-muted mb-4">
                <small>Sign Up an Account to Manage Your Project!</small>
              </div>
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
                <base-checkbox>
                  <span>
                    I agree with the
                    <a href="#">Privacy Policy</a>
                  </span>
                </base-checkbox>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="signup">Create account</base-button>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import firebase from "firebase";
import router from "../router";

export default {
  name: "signup",
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    signup: function() {
      //Save item to database
      var flag = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          // Handle Errors here.
          alert("Invalid account!(empty account entered or account already registered)");
          flag = false;
          // ...
        })
        .then(function() {
          if (flag) {
            alert("You have created an account");
          }
        })

        .then(function() {
          if (flag) {
            router.push({ name: "form" });
          }
        });
    }
  }
};
</script>
<style>
</style>

