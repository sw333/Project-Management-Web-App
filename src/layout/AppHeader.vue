<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/dashboard">
        <img src="img/bestlogo.png" alt="logo" style="width:150px; height: 120px" />
      </router-link>

      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <router-link slot="brand" class="navbar-brand mr-lg-5" to="/dashboard">
            <img src="img/bestlogo.png" alt="logo" style="width:150px; height: 120px" />
          </router-link>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <router-link to="/dashboard" class="nav-link nav-link-inner--text">Dashboard</router-link>
        <router-link to="/projects" class="nav-link nav-link-inner--text">Manage Projects</router-link>
        <router-link
          to="/projmatestemp"
          class="nav-link nav-link-inner--text"
        >Project Groups</router-link>
        <router-link to="/forum" class="nav-link nav-link-inner--text">Forum</router-link>
        
      
      </ul>
      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item">
          <base-dropdown>
          <base-button slot="title" type="primary" class="dropdown-toggle">
           <i class="fa fa-user-circle"></i>
            {{currName}}
          </base-button>
          <router-link to="/profile" class="dropdown-item"> View Profile</router-link>
          <router-link to="/login" class="dropdown-item"> Log Out</router-link>
        </base-dropdown>
        </li>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import firebase from "firebase";
import database from "../firebase.js";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },
  data() {
    return {
      currName: ""
    };
  },
  methods: {
    fetchData: function() {
      var user = firebase.auth().currentUser;
      console.log(user);
      //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      var emailVerified = user.email;
      var tempName;
      database.collection("User Info").onSnapshot(user => {
        user.forEach(function(currUser) {
          if (currUser.id == emailVerified) {
            tempName = currUser.data()["Name"];
          }
        });
        this.currName = tempName;
      });
    }
  },
  created() {
    this.fetchData();
  },
  watch(){
    this.fetchData();
  },
  logout(){
    firebase.auth().signOut().then(function() {
     alert("Sign out successfully!")
})
  }
};
</script>
<style>
</style>
