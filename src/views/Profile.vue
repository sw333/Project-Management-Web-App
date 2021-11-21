<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="section section-skew">
      <div class="container">
        <card shadow class="card-profile mt--300" no-body>
          <div class="px-4">
            <div class="row justify-content-left">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img v-lazy="'img/theme/team-4-800x800.jpg'" class="rounded-circle" />
                  </a>
                </div>
              </div>

              <div class="col col-lg-auto order-lg-4">
                <div class="text-left mt-4" v-for="(value, user) in userInfo" :key="user">
                  <h3 class="text-left">
                    {{value.Name}}
                    <base-button
                      type="secondary"
                      size="sm"
                      icon="fa fa-pencil"
                      v-b-modal.profileModal
                      v-on:click="getProfile"
                    ></base-button>
                  </h3>
                  <b-modal
                    id="profileModal"
                    ref="modal"
                    title="Edit Personal Information"
                    @ok="editProfile"
                  >
                    <form ref="form">
                      <b-form-group label="Name">
                        <b-form-input id="project-module" v-model="editName"></b-form-input>
                      </b-form-group>
                      <b-form-group label="Mobile Number">
                        <b-form-input id="project-module-name" v-model="editMobile"></b-form-input>
                      </b-form-group>
                      <b-form-group label="Faculty">
                        <b-form-input id="project-module-name" v-model="editFaculty"></b-form-input>
                      </b-form-group>
                      <b-form-group label="Major">
                        <b-form-input id="project-module-name" v-model="editMajor"></b-form-input>
                      </b-form-group>
                      <b-form-group label="Self Introduction">
                        <b-form-input id="project-module-name" v-model="editIntro"></b-form-input>
                      </b-form-group>
                    </form>
                  </b-modal>
                  {{user}} · {{value['Mobile Number']}}
                  <p>{{value.Faculty}} - {{value.Major}}</p>
                </div>
              </div>
            </div>

            <div class="row justify-content-left">
              <div class="col-lg-3 order-lg-2"></div>

              <div class="col col-lg-auto order-lg-4">
                <div class="text-left mt-2" v-for="(value, user) in userInfo" :key="user">
                  <h5 class="text-left">{{value.Intro}}</h5>
                </div>
              </div>
            </div>

            <div
              class="mt-2 py-4 border-top text-center"
              v-for="(value, user) in userInfo"
              :key="user"
            >
              <div class="container">
                <div class="row">
                  <div class="col col-lg-6">
                    <div class="row">
                      <h4>
                        <strong>
                          Skills
                          <slot></slot>
                        </strong>

                        <base-button
                          type="secondary"
                          size="sm"
                          icon="fa fa-pencil"
                          v-b-modal.skillsModal
                        ></base-button>

                        <br />
                      </h4>

                      <b-modal id="skillsModal" ref="modal" title="Edit Skills">
                        <li
                          size="sm"
                          type="secondary"
                          v-for="(value,item) in value['Skills']"
                          :key="item"
                        >
                          {{value}}
                          <span style="float:right;">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <i
                              v-on:click="deleteSkill(value)"
                              class="fa fa-trash"
                              aria-hidden="true"
                              style="padding-left:10px;color:rgb(136, 43, 43);font-size:16px"
                            ></i>
                          </span>
                        </li>
                        <br />
                        <form ref="form">
                          <b-form-group label="Add New Skill">
                            <b-form-input id="skill-input" v-model="inputSkill"></b-form-input>
                          </b-form-group>
                        </form>
                        <base-button type="success" size="sm" v-on:click="submitSkill">Add</base-button>
                      </b-modal>
                    </div>

                    <div class="row">
                      <base-button
                        size="sm"
                        type="primary"
                        v-for="(value,item) in value['Skills']"
                        :key="item"
                      >{{value}}</base-button>
                    </div>
                  </div>
                  <div class="col col-lg-6">
                    <div class="row">
                      <h4>
                        <strong>
                          Interests
                          <slot></slot>
                        </strong>
                        <base-button
                          type="secondary"
                          size="sm"
                          icon="fa fa-pencil"
                          v-b-modal.interestModal
                        ></base-button>

                        <br />
                      </h4>
                      <b-modal id="interestModal" ref="modal" title="Edit Interests">
                        <li
                          size="sm"
                          type="secondary"
                          v-for="(value,item) in value['Interests']"
                          :key="item"
                        >
                          {{value}}
                          <span style="float:right;">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <i
                              v-on:click="deleteInterest(value)"
                              class="fa fa-trash"
                              aria-hidden="true"
                              style="padding-left:10px;color:rgb(136, 43, 43);font-size:16px"
                            ></i>
                          </span>
                        </li>
                        <br />
                        <form ref="form">
                          <b-form-group label="Add New Interest">
                            <b-form-input id="interest-input" v-model="inputInterest"></b-form-input>
                          </b-form-group>
                        </form>
                        <base-button type="success" size="sm" v-on:click="submitInterest">Add</base-button>
                      </b-modal>
                    </div>

                    <div class="row">
                      <base-button
                        size="sm"
                        type="primary"
                        v-for="(value,item) in value['Interests']"
                        :key="item"
                      >{{value}}</base-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="mt-2 py-4 border-top text-center"
              v-for="(value, user) in userInfo"
              :key="user"
            >
              <div class="container">
                <div class="row">
                  <div class="col col-lg-6">
                    <div class="row">
                      <h4>
                        <strong>
                          Modules Taken
                          <slot></slot>
                        </strong>
                        <base-button
                          type="secondary"
                          size="sm"
                          icon="fa fa-plus"
                          v-b-modal.pastModModal
                        ></base-button>

                        <br />
                      </h4>
                      <b-modal
                        id="pastModModal"
                        ref="modal"
                        title="Add New Past Module"
                        @ok="submitPastMod"
                      >
                        <form ref="form">
                          <b-form-group label="Module Code">
                            <b-form-input id="project-module" v-model.lazy="inputPastModCode"></b-form-input>
                          </b-form-group>

                          <b-form-group label="Module Grade">
                            <b-form-input id="project-module-name" v-model="inputPastModGrade"></b-form-input>
                          </b-form-group>
                        </form>
                      </b-modal>
                    </div>

                    <div class="row">
                      <ul class="list-unstyled">
                        <li v-for="(value, item) in value['Past Modules']" :key="item">
                          <h5 style="text-align:left;">
                            {{item}}&nbsp;
                            <small
                              class="text-muted !text-right"
                            >Grade: &nbsp;{{ value.Grade }}</small>
                            <span style="float:right;">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <i
                                class="fa fa-pencil-square-o"
                                aria-hidden="true"
                                style="font-size:15px"
                                v-b-modal.editPastModModal
                                v-on:click="getPastModule(item, value)"
                              ></i>
                              <i
                                v-on:click="deletePastModule(item)"
                                class="fa fa-trash"
                                aria-hidden="true"
                                style="padding-left:10px;color:rgb(136, 43, 43);font-size:16px"
                              ></i>
                            </span>
                            <p>
                              <small class="text-muted">{{ value['Module Name']}}</small>
                            </p>
                          </h5>
                        </li>
                      </ul>
                      <b-modal
                        id="editPastModModal"
                        ref="modal"
                        title="Edit Past Module"
                        @ok="editPastModule"
                      >
                        <form ref="form">
                          <b-form-group label="Module Code">
                            <b-form-input
                              disabled="True"
                              id="project-module"
                              v-model="editPastModCode"
                            ></b-form-input>
                          </b-form-group>
                          <b-form-group label="Module Name">
                            <b-form-input
                              disabled="True"
                              id="project-module-name"
                              v-model="editPastModName"
                            ></b-form-input>
                          </b-form-group>
                          <b-form-group label="Module Grade">
                            <b-form-input id="project-module-name" v-model="editPastModGrade"></b-form-input>
                          </b-form-group>
                        </form>
                      </b-modal>
                    </div>
                  </div>

                  <div class="col col-lg-6">
                    <div class="row">
                      <h4>
                        <strong>Current Modules&nbsp;</strong>
                        <base-button
                          type="secondary"
                          size="sm"
                          icon="fa fa-plus"
                          v-b-modal.currModModal
                        ></base-button>

                        <br />
                      </h4>
                      <b-modal
                        id="currModModal"
                        ref="modal"
                        title="Add New Current Module"
                        @ok="submitCurrMod"
                      >
                        <form ref="form">
                          <b-form-group label="Module Code">
                            <b-form-input id="project-module" v-model="inputCurrModCode"></b-form-input>
                          </b-form-group>
                        </form>
                      </b-modal>
                      <br />
                      <ul class="list-unstyled">
                        <li v-for="(value, item) in value['Current Modules']" :key="item">
                          <h5 class="text-left">
                            {{item}}
                            <span style="float:right;">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <i
                                v-on:click="deleteCurrModule(item)"
                                class="fa fa-trash"
                                aria-hidden="true"
                                style="padding-left:10px;color:rgb(136, 43, 43);font-size:16px"
                              ></i>
                            </span>
                            <p>
                              <small class="text-muted">{{ value}}</small>
                            </p>
                          </h5>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="mt-3 py-4 border-top text-center"
              v-for="(value, user) in userInfo"
              :key="user"
            >
              <div class="container">
                <div class="row">
                  <div class="col col-lg-6">
                    <div class="row">
                      <h4>
                        <strong>Past Projects&nbsp;</strong>
                        <base-button
                          type="secondary"
                          size="sm"
                          icon="fa fa-plus"
                          v-b-modal.projectModal
                        ></base-button>

                        <br />
                      </h4>
                      <b-modal
                        id="projectModal"
                        ref="modal"
                        title="Add New Project"
                        @ok="submitProject"
                      >
                        <form ref="form">
                          <b-form-group label="Module Code">
                            <b-form-input id="project-module" v-model="inputProjMod"></b-form-input>
                          </b-form-group>
                          <b-form-group label="Project Name">
                            <b-form-input id="project-name" v-model="inputProjName"></b-form-input>
                          </b-form-group>
                          <b-form-group label="Project Description">
                            <b-form-input id="project-desc" v-model="inputProjDesc"></b-form-input>
                          </b-form-group>
                          <b-form-group label="Team Members">
                            <ul>
                              <li v-for="(member, index) in teamMembers" :key="index">
                                {{member}}
                                <i
                                  @click="deleteMember(member)"
                                  class="fa fa-trash"
                                  aria-hidden="true"
                                  style="padding-left:10px;color:rgb(136, 43, 43);font-size:16px"
                                ></i>
                              </li>
                            </ul>

                            <b-form-input id="project-name" v-model="newTeamMember"></b-form-input>
                            <br />
                            <base-button
                              type="success"
                              size="sm"
                              icon="fa fa-plus"
                              v-on:click="addTeamMember"
                            >Add Team Member</base-button>
                          </b-form-group>
                        </form>
                      </b-modal>
                    </div>

                    <div class="row">
                      <ul class="list-unstyled">
                        <li v-for="(value, item) in value['Past Projects']" :key="item">
                          <h5 class="text-left">
                            {{item}}
                            <span style="float:right;">
                              <i
                                class="fa fa-pencil-square-o"
                                aria-hidden="true"
                                style="font-size:15px"
                                v-b-modal.editProjectModal
                                v-on:click="getProject(item,value)"
                              ></i>
                              <i
                                v-on:click="deleteProject(item)"
                                class="fa fa-trash"
                                aria-hidden="true"
                                style="padding-left:10px;color:rgb(136, 43, 43);font-size:16px"
                              ></i>
                            </span>
                            <br />
                            <small
                              class="text-muted"
                            >{{ value['Module Name'] }} - {{ value['Project Name'] }}</small>
                            <br />
                            <ul>
                              <li>
                                <small>
                                  Team Members:
                                  <span
                                    class="text-muted"
                                    v-for="a in value['Team Members']"
                                    :key="a"
                                  >
                                    {{a}}
                                    <slot></slot>
                                  </span>
                                </small>
                              </li>
                              <li>
                                <small>
                                  Project Description:
                                  <span
                                    class="text-muted"
                                  >{{ value['Description'] }}</span>
                                </small>
                              </li>
                            </ul>
                          </h5>
                        </li>
                      </ul>
                      <b-modal
                        id="editProjectModal"
                        ref="modal"
                        title="Edit Project"
                        @ok="editProject"
                      >
                        <form ref="form">
                          <b-form-group label="Module Code">
                            <b-form-input disabled="True" id="project-module" v-model="editProjMod"></b-form-input>
                          </b-form-group>
                          <b-form-group label="Project Name">
                            <b-form-input id="project-name" v-model="editProjName"></b-form-input>
                          </b-form-group>
                          <b-form-group label="Project Description">
                            <b-form-input id="project-desc" v-model="editProjDesc"></b-form-input>
                          </b-form-group>
                          <b-form-group label="Team Members">
                            <ul>
                              <li v-for="(member, index) in editTeamMembers" :key="index">
                                {{member}}
                                <i
                                  @click="editdeleteMember(member)"
                                  class="fa fa-trash"
                                  aria-hidden="true"
                                  style="padding-left:10px;color:rgb(136, 43, 43);font-size:16px"
                                ></i>
                              </li>
                            </ul>

                            <b-form-input id="project-name" v-model="newTeamMember"></b-form-input>
                            <br />
                            <base-button
                              type="success"
                              size="sm"
                              icon="fa fa-plus"
                              v-on:click="editaddTeamMember"
                            >Add Team Member</base-button>
                          </b-form-group>
                        </form>
                      </b-modal>
                    </div>
                  </div>

                  <div class="col col-lg-6">
                    <div class="row">
                      <h4>
                        <strong>Awards&nbsp;</strong>
                        <base-button
                          type="secondary"
                          size="sm"
                          icon="fa fa-plus"
                          v-b-modal.awardModal
                        ></base-button>

                        <br />
                      </h4>
                      <b-modal id="awardModal" ref="modal" title="Add New Award" @ok="submitAward">
                        <form ref="form">
                          <b-form-group label="Award">
                            <b-form-input id="award-input" v-model="inputAward"></b-form-input>
                          </b-form-group>
                          <b-form-group label="Description">
                            <b-form-input id="award-description" v-model="inputAwardDescription"></b-form-input>
                          </b-form-group>
                        </form>
                      </b-modal>
                    </div>
                    <div class="row">
                      <br />
                      <ul class="list text-left">
                        <li v-for="(value,item) in value['Awards']" :key="item">
                          {{item}} -
                          <span class="text-muted">{{value}}</span>
                          <span style="float:right;">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <i
                              class="fa fa-pencil-square-o"
                              aria-hidden="true"
                              style="font-size:15px"
                              v-b-modal.editAward
                              v-on:click="getAward(item, value)"
                            ></i>
                            <i
                              v-on:click="deleteAward(item)"
                              class="fa fa-trash"
                              aria-hidden="true"
                              style="padding-left:10px;color:rgb(136, 43, 43);font-size:16px"
                            ></i>
                          </span>
                        </li>
                      </ul>
                      <b-modal id="editAward" ref="modal" title="Edit Award" @ok="editNewAward">
                        <form ref="form">
                          <b-form-group label="Award">
                            <b-form-input id="award-input" v-model="editAward"></b-form-input>
                          </b-form-group>
                          <b-form-group label="Description">
                            <b-form-input id="award-description" v-model="editAwardDescription"></b-form-input>
                          </b-form-group>
                        </form>
                      </b-modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import database from "../firebase.js";
import firebase from "firebase";
import Modal from "../components/Modal.vue";
export default {
  name: "App",
  components: Modal,
  data() {
    return {
      allMods: {},
      userInfo: {},
      userName: "Victor Cheong",
      inputSkill: "",
      inputInterest: "",
      currID: "vcjw97@gmail.com",
      inputAward: "",
      inputAwardDescription: "",
      editAward: "",
      editAwardDescription: "",
      editAwardCopy: "",
      editAwardDescriptionCopy: "",
      inputProjDesc: "",
      inputProjMod: "",
      inputProjModName: "",
      inputProjName: "",
      teamMembers: [],
      editProjDesc: "",
      editProjMod: "",
      editProjModName: "",
      editProjName: "",
      editTeamMembers: [],
      newTeamMember: "",
      inputCurrModCode: "",
      inputCurrModName: "",
      inputPastModCode: "",
      inputPastModGrade: "",
      inputPastModName: "",
      editPastModCode: "",
      editPastModGrade: "",
      editPastModName: "",
      editName: "",
      editIntro: "",
      editFaculty: "",
      editMajor: "",
      editMobile: "",
      editAwardName: ""
    };
  },

  methods: {
    fetchData: function() {
      let temp = {};
      let mods = {};
      var user = firebase.auth().currentUser;
      var emailVerified = user.email;
      var name = "";
      //Get all the items from DB
      database.collection("User Info").onSnapshot(currentUser => {
        currentUser.forEach(function(user) {
         
          if (user.id == emailVerified) {
            temp[user.id] = user.data();
            name = user.data().Name;
          }
        });
        this.userInfo = temp;
      
        this.currID = emailVerified;
        this.userName = name;
  
      });

      database.collection("Modules").onSnapshot(modu => {
        modu.forEach(function(mod) {
          mods[mod.id] = mod.data()
        });
        this.allMods = mods;
     
  
      });
    },
    getProject: function(item, value) {
      this.editProjMod = item;
      this.editProjDesc = value["Description"];
      this.editProjModName = value["Module Name"];
      this.editProjName = value["Project Name"];
      this.editTeamMembers = value["Team Members"];
    },
    editProject: function() {
      let mod = this.editProjMod;
      let projdesc = this.editProjDesc;
      let modname = this.editProjModName;
      let projname = this.editProjName;
      let team = this.editTeamMembers;
      let currUser = this.currID;
      database
        .collection("User Info")
        .doc(currUser)
        .update({
          ["Past Projects." + mod + ".Description"]: projdesc,
          ["Past Projects." + mod + ".Module Name"]: modname,
          ["Past Projects." + mod + ".Project Name"]: projname,
          ["Past Projects." + mod + ".Team Members"]: team
        });
    },
    addTeamMember: function() {
      this.teamMembers.push(this.newTeamMember);
      this.newTeamMember = "";
    },
    editaddTeamMember: function() {
      this.editTeamMembers.push(this.newTeamMember);
      this.newTeamMember = "";
    },
    deleteMember: function(member) {
      this.teamMembers.splice(this.teamMembers.indexOf(member), 1);
    },
    editdeleteMember: function(member) {
      this.editTeamMembers.splice(this.editTeamMembers.indexOf(member), 1);
    },
    getProfile: function() {
      let name = this.userInfo[this.currID]["Name"];
      let mobile = this.userInfo[this.currID]["Mobile Number"];
      let faculty = this.userInfo[this.currID]["Faculty"];
      let major = this.userInfo[this.currID]["Major"];
      let intro = this.userInfo[this.currID]["Intro"];
      this.editName = name;
      this.editMobile = mobile;
      this.editFaculty = faculty;
      this.editMajor = major;
      this.editIntro = intro;
    },
    editProfile: function() {
      let name = this.editName;
      let mobile = this.editMobile;
      let faculty = this.editFaculty;
      let major = this.editMajor;
      let intro = this.editIntro;
      let currUser = this.currID;
      database
        .collection("User Info")
        .doc(currUser)
        .update({
          Name: name,
          "Mobile Number": mobile,
          Faculty: faculty,
          Major: major,
          Intro: intro
        });
    },
    getPastModule: function(item, value) {
      this.editPastModCode = item;
      this.editPastModGrade = value.Grade;
      this.editPastModName = value["Module Name"];
    },
    editPastModule: function() {
      let editPModCode = this.editPastModCode;
      let editPModGrade = this.editPastModGrade;
      let currUser = this.currID;
      database
        .collection("User Info")
        .doc(currUser)
        .update({
          ["Past Modules." + editPModCode + ".Grade"]: editPModGrade
        });
    },
    deleteSkill: function(value) {
      let currUser = this.currID;
      database
        .collection("User Info")
        .doc(currUser)
        .update({
          Skills: firebase.firestore.FieldValue.arrayRemove(value)
        });
    },
    deleteInterest: function(value) {
      let currUser = this.currID;
      database
        .collection("User Info")
        .doc(currUser)
        .update({
          Interests: firebase.firestore.FieldValue.arrayRemove(value)
        });
    },
    submitSkill: function() {
      let newSkill = this.inputSkill;
      let currUser = this.currID;
      if (this.inputSkill == "") {
        alert("Please enter a skill");
      } else {
        database
          .collection("User Info")
          .doc(currUser)
          .update({
            Skills: firebase.firestore.FieldValue.arrayUnion(newSkill)
          });
        this.inputSkill = "";
      }
    },
    submitInterest: function() {
      let newInterest = this.inputInterest;
      let currUser = this.currID;
      if (this.inputInterest == "") {
        alert("Please enter an interest");
      } else {
        database
          .collection("User Info")
          .doc(currUser)
          .update({
            Interests: firebase.firestore.FieldValue.arrayUnion(newInterest)
          });
        this.inputInterest = "";
      }
    },
    submitAward: function() {
      let newAward = this.inputAward;
      let newAwardDesc = this.inputAwardDescription;
      let currUser = this.currID;
      if (this.inputAward == "") {
        alert("Please enter an award");
      } else if (this.inputAwardDesc == "") {
        alert("Please enter description");
      } else {
        database
          .collection("User Info")
          .doc(currUser)
          .update({
            ["Awards." + newAward]: newAwardDesc
          });
        this.inputAward = "";
        this.inputAwardDescription = "";
      }
    },
    submitProject: function() {
      if (this.inputProjMod == "") {
        alert("Please enter module code");
      } else if (this.inputProjName == "") {
        alert("Please enter project name");
      } else if (this.inputProjDesc == "") {
        alert("Please enter project description");
      } else if (this.teamMembers.length == 0) {
        alert("Please enter team members");
      } else {
        axios
          .get(
            "https://api.nusmods.com/v2/2019-2020/modules/" +
              this.inputProjMod +
              ".json"
          )
          .then(response => {
            this.inputProjModName = response.data.title;
            let newProjMod = this.inputProjMod;
            let newProjName = this.inputProjName;
            let newProjDesc = this.inputProjDesc;
            let newProjModName = this.inputProjModName;
            let newProjMembers = this.teamMembers;
            let currUser = this.currID;
            database
              .collection("User Info")
              .doc(currUser)
              .update({
                ["Past Projects." + newProjMod + ".Description"]: newProjDesc,
                ["Past Projects." +
                newProjMod +
                ".Module Name"]: newProjModName,
                ["Past Projects." + newProjMod + ".Project Name"]: newProjName,
                ["Past Projects." +
                newProjMod +
                ".Team Members"]: newProjMembers
              });
            this.inputProjMod = "";
            this.inputProjName = "";
            this.inputProjDesc = "";
            this.inputProjModName = "";
            this.teamMembers = [];
          })
          .catch(error => {
            alert("Please enter the correct module code in upper case");
          });
      }
    },
    submitCurrMod: function() {
      if (this.inputCurrModCode == "") {
        alert("Please enter module code");
      } else {
        axios
          .get(
            "https://api.nusmods.com/v2/2019-2020/modules/" +
              this.inputCurrModCode +
              ".json"
          )
          .then(response => {
       
            this.inputCurrModName = response.data.title;
            let newCurrModCode = this.inputCurrModCode;
    
            let newCurrModName = this.inputCurrModName;
            let currUser = this.currID;
            database
              .collection("User Info")
              .doc(currUser)
              .update({
                ["Current Modules." + newCurrModCode]: newCurrModName
              });
            let name = this.userName;
            var docRef = database.collection("Modules").doc(newCurrModCode);
            docRef
              .get()
              .then(function(doc) {
                if (doc.exists) {
                  database
                    .collection("Modules")
                    .doc(newCurrModCode)
                    .update({
                      ["NoGroup"]: firebase.firestore.FieldValue.arrayUnion(
                        name
                      )
                    });
                  console.log("new person added");
                } else {
                  database
                    .collection("Modules")
                    .doc(newCurrModCode)
                    .set({
                      ["NoGroup"]: firebase.firestore.FieldValue.arrayUnion(
                        name
                      )
                    });
                  console.log("new module added");
                }
              })
              .catch(function(error) {
                console.log("Error getting document:", error);
              });

            var docRef2 = database.collection("Forums").doc(newCurrModCode);
            docRef2
              .get()
              .then(function(doc) {
                if (!doc.exists) {
                  database
                    .collection("Forums")
                    .doc(newCurrModCode)
                    .set({
                      ["idcounter"]: 0,
                      ["comments"]: {},
                      ["posts"]: {}
                    });
                }
              })
              .catch(function(error) {
                console.log("Error getting document:", error);
              });

            this.inputCurrModCode = "";
          })
          .catch(error => {
            alert("Please enter the correct module code in upper case");
          });
      }
    },

    submitPastMod: function() {
      if (this.inputPastModCode == "") {
        alert("Please enter module code");
      } else if (this.inputPastModGrade == "") {
        alert("Please enter module grade");
      } else {
        axios
          .get(
            "https://api.nusmods.com/v2/2019-2020/modules/" +
              this.inputPastModCode +
              ".json"
          )
          .then(response => {
            this.inputPastModName = response.data.title;
            let newPastModCode = this.inputPastModCode;
            let newPastModGrade = this.inputPastModGrade;
            let newPastModName = this.inputPastModName;
            let currUser = this.currID;
            database
              .collection("User Info")
              .doc(currUser)
              .update({
                ["Past Modules." + newPastModCode + ".Grade"]: newPastModGrade,
                ["Past Modules." +
                newPastModCode +
                ".Module Name"]: newPastModName
              });
            this.inputPastModCode = "";
            this.inputPastModGrade = "";
          })
          .catch(error => {
            alert("Please enter the correct module code in upper case");
          });
      }
    },

    deleteCurrModule: function(ModCode) {
      let currUser = this.currID;
      let allmods = this.allMods;
      let name = this.userName;
      let newgrp = [];
      let grpname = "";
     
      database
        .collection("User Info")
        .doc(currUser)
        .update({
          ["Current Modules." + ModCode]: firebase.firestore.FieldValue.delete()
        });
    
      let allm = allmods[ModCode];
     
      Object.keys(allm).forEach(function(k) {
        if (k != "NoGroup") {
          if (allm[k]["Group Members"].includes(name)) {
    
            grpname = k;
            for (var na in allm[k]["Group Members"]) {
              if (allm[k]["Group Members"][na] != name) {
                newgrp.push(allm[k]["Group Members"][na]);
                
              }
            }
        
          }

        }
      
      });
      database
        .collection("Modules")
        .doc(ModCode)
        .update({
          [grpname + ".Group Members"]: newgrp
          
        });
      
    },

    deletePastModule: function(ModCode) {
      let currUser = this.currID;
      database
        .collection("User Info")
        .doc(currUser)
        .update({
          ["Past Modules." + ModCode]: firebase.firestore.FieldValue.delete()
        });
    },
    deleteProject: function(ModCode) {
      let currUser = this.currID;
      database
        .collection("User Info")
        .doc(currUser)
        .update({
          ["Past Projects." + ModCode]: firebase.firestore.FieldValue.delete()
        });
    },
    deleteAward: function(award) {
      let currUser = this.currID;
      database
        .collection("User Info")
        .doc(currUser)
        .update({
          ["Awards." + award]: firebase.firestore.FieldValue.delete()
        });
    },
    editNewAward: function() {
      let award = this.editAwardCopy;
      let awardNew = this.editAward;
      let descNew = this.editAwardDescription;
      let currUser = this.currID;
      database
        .collection("User Info")
        .doc(currUser)
        .update({
          ["Awards." + award]: firebase.firestore.FieldValue.delete(),
          ["Awards." + awardNew]: descNew
        });
    },
    getAward: function(item, value) {
      this.editAward = item;
      this.editAwardDescription = value;
      this.editAwardCopy = item;
      this.editAwardDescriptionCopy = value;
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
<style>
</style>
