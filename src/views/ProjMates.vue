<template>
<div id="app">
  <head>
    <title>Project Mates</title>
  </head>
  <link
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
    rel="stylesheet"
  />
  <table>
    <tr>
      <!-- <th>
          <img src='../assets/bestlogo.jpg' style="height:100px; position:absolute; top:0; left:0">
      </th>-->
      <!-- <th style="position:absolute; top:25px; right:0">
          <ul style="list-style-type:none; margin:0; padding:0; overflow:hidden" id='header'>
            <li><a href='#home'>Home</a></li>
            <li><a href='#forum'>My Projects</a></li>
            <li><a href='#forum'>Find Group Mates</a></li>
            <li><a href='#forum'>Forum</a></li>
            <li @mouseover="hover = true"><a><i class="fa fa-user"></i>{{currName}}</a></li>
          </ul>
      </th>-->
      <!-- <div v-if='hover' style="position:absolute; right:10px; top: 60px;">
          <ul style="list-style-type:none; text-align: left" @mouseleave="hover = false" id='userinfo'>
            <li><a href='#'>Alerts</a></li>
            <li><a href='#'>Profile</a></li>
            <li><a href='#'>Log Out</a></li>
          </ul>
      </div>-->
    </tr>
  </table>
  <br />
  <br />
  <br />
  <!-- <div style="border-width:1px; border-style:solid; height:100px; display:block; background-size: 100% 100%;">   
    Hello
  </div>-->
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
    </section>Hello
    <a>
      <i class="fa fa-user"></i>
      {{currName}}
    </a>
    <table>
      <tr>
        <td style="padding-left: 500px; padding-right: 0px;">
          <label for="modules">
            <h1>You are viewing</h1>
          </label>
        </td>
        <td style="padding-left: 20px;">
          <select id="modules" v-model="module" style="width:auto" @change="updateGroups();">
            <option value disabled>Please select a module</option>
            <option v-for="(value, mod) in modules" v-bind:key="mod">{{mod}}</option>
          </select>
        </td>
      </tr>
    </table>
    <div>
      <div
        style="left: 5%; position:absolute; border-color: grey; border-radius: 2px; border-width: thin; padding: 20px 20px 20px 20px;
        box-shadow: 1px 0.5px 1px 2.5px grey;"
      >
        <h5>Looking for:</h5>
        <ul style="text-align: justify; list-style-type:none">
          <li>
            <a
              href="#"
              v-on:click="currPage = 'Students not in any group';updateGroups()"
              style="text-decoration:none"
            >
              <span>
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>Students without Group
              </span>
            </a>
          </li>
          <br />
          <li>
            <a
              href="#"
              v-on:click="currPage = 'Formed Project Groups';updateGroups()"
              style="text-decoration:none"
            >
              <span>
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>Formed Project Groups
              </span>
            </a>
          </li>
          <br />
          <li>
            <a
              href="#"
              v-on:click="currPage = 'Form a new group';updateGroups()"
              style="text-decoration:none"
            >
              <span>
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>New Group
              </span>
            </a>
          </li>
          <br />
          <li>
            <a
              href="#"
              v-on:click="currPage = 'Join Existing Groups';updateGroups()"
              style="text-decoration:none"
            >
              <span>
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>Existing Groups
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div
        style="position: absolute; right: 5%; text-align: left; border-color: grey; border-radius: 2px; border-width: thin; padding: 20px 20px 20px 20px;
        box-shadow: 1px 0.5px 1px 2.5px grey;"
      >
        <div v-show="currPage== 'Students not in any group'" style="padding-right: 120px;">
          <h1>Students with No Group:</h1>
          <div v-show="module=='BT3103'">
            <ol>
              <div v-for="(value, mod) in modules" v-bind:key="mod">
                <div v-if="mod == module">
                  <li v-for='person in modules[mod]["NoGroup"]' v-bind:key="person">
                    {{person}}
                    <a href="https://www.google.com" target="_blank">Profile</a>
                  </li>
                </div>
              </div>
            </ol>
          </div>
          <div v-show="module=='IS3103'">
            <ol>
              <div v-for="(value, mod) in modules" v-bind:key="mod.id">
                <div v-if="mod == module">
                  <li v-for='person in modules[mod]["NoGroup"]' v-bind:key="person">
                    {{person}}
                    <a href="https://www.google.com" target="_blank">Profile</a>
                  </li>
                </div>
              </div>
            </ol>
          </div>
        </div>
        <div v-show="currPage== 'Formed Project Groups'" style="padding-right: 120px;">
          <h1 style="text-align: left">Formed Project Groups:</h1>
          <div v-if="module=='BT3103'">
            <ul>
              <div v-for="(value, mod) in modules" v-bind:key="mod">
                <div v-if="mod == module">
                  <div v-for="(group, groupName) in modules[mod]" v-bind:key="group">
                    <div
                      v-if="group['Group Members'] != null && group['MaxSize'] == group['Group Members'].length"
                    >
                      <li style="text-align: left; list-style: none;">
                        <div
                          class="group"
                          style="border-radius: 25px;border: 2px solid #73AD21; padding: 10px;"
                        >
                          <h4>{{groupName}} ({{group["Group Members"].length}}/{{group["Group Members"].length}})</h4>
                          <ul style="list-style-type: none">
                            <div class="group-content">
                              <li v-for="person in group['Group Members']" v-bind:key="person">
                                {{person}}
                                <a href="https://www.google.com" target="_blank">Profile</a>
                              </li>
                            </div>
                          </ul>
                        </div>
                      </li>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
          <div v-if="module=='IS3103'">
            <ul>
              <div v-for="(value, mod) in modules" v-bind:key="mod">
                <div v-if="mod == module">
                  <div v-for="(group, groupName) in modules[mod]" v-bind:key="group">
                    <div
                      v-if="group['Group Members'] != null && group['MaxSize'] == group['Group Members'].length"
                    >
                      <li style="text-align: left; list-style: none;">
                        <div
                          class="group"
                          style="border-radius: 25px;border: 2px solid #73AD21; padding: 10px;"
                        >
                          <h4>{{groupName}} ({{group["Group Members"].length}}/{{group["Group Members"].length}})</h4>
                          <ul style="list-style-type: none">
                            <div class="group-content">
                              <li v-for="person in group['Group Members']" v-bind:key="person">
                                {{person}}
                                <a href="https://www.google.com" target="_blank">Profile</a>
                              </li>
                            </div>
                          </ul>
                        </div>
                      </li>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div v-show="currPage== 'Form a new group'">
          <h1>Form a new group:</h1>
          <div class="modal-content" style="width: 600px; overflow: auto; margin-bottom: 0px;">
            <div>
              <label style="vertical-align: middle;">
                <h6>Group Name:</h6>
              </label>
              <textarea v-model="newGroup.groupName" style="resize: none;" rows="1"></textarea>
              <button style="vertical-align: top;" v-on:click="checkAvailable()">Check Availability</button>
              <br />
              <div class="good" v-if="good!=''" style="color: green">{{good}}</div>
              <div class="bad" v-if="bad!=''" style="color: red">{{bad}}</div>
            </div>
            <br />
            <h6>Size of group:</h6>
            <input type="number" v-model="newGroup.size" @change="addMember()" />
            <br />
            <br />
            <div style="text-align: left; font-size: 20px">
              <h6>Add your peers who are without a group:</h6>
              <select v-model="friend">
                <option disabled selected value>Select a peer</option>
                <option v-for="fren in noGroup" v-bind:key="fren">{{fren}}</option>
              </select>
              <button v-on:click="addFriend()">Add</button>
              <br />
              <br />
              <h6>Remove your peers in your group:</h6>
              <select v-model="friend">
                <option disabled selected value>Select a peer</option>
                <option v-for="fren in newGroup.currGroup.slice(1)" v-bind:key="fren">{{fren}}</option>
              </select>
              <button v-on:click="removeFriend()">Remove</button>
            </div>

            <br />
            <div>Group as of now: {{newGroup.currGroup.join(', ')}}</div>
            <br />
            <div v-if="newGroup.size - newGroup.currGroup.length > 1">
              You need
              {{newGroup.size - newGroup.currGroup.length}}
              more group mates.
            </div>
            <div v-if="newGroup.size - newGroup.currGroup.length <= 1">
              You need
              {{newGroup.size - newGroup.currGroup.length}} more group mate.
            </div>
            <br />
            <br />
            <div style="text-align: left; font-size: 20px">
              <h6>I want to look for:</h6>
            </div>
            <div>
              <h6>Add a new skill:</h6>
              <textarea rows="1" v-model.lazy="skill" style="resize: none;"></textarea>

              <button v-on:click="checkSkill()" style="vertical-align: top;">Add</button>
              <br />
              <div
                v-if="hasNewSkill && newGroup.newSkill.length > 0 && skill != ''"
                id="add"
              >{{skill}} has been added!</div>
              <div
                v-if="!hasNewSkill && newGroup.newSkill.length > 0 && skill != ''"
              >{{skill}} has already been added!</div>
            </div>
            <br />
            <label>
              <h6>Select Team Member</h6>
            </label>
            <select v-model="newGroup.currMember" v-on:change="checkCurr()">
              <option v-for="(value, index) in newGroup.skills" v-bind:key="index+1">{{index + 1}}</option>
            </select>

            <br />
            <div>
              <div
                v-for="(value, index) in newGroup.memberStatus"
                v-show="value=='true'"
                v-bind:key="value"
              >
                <p style="text-align: left">Team Member {{index + 1}}</p>
                <div id="memberlist">
                  Desired Skills:
                  <br />
                  <input
                    type="checkbox"
                    id="skill1"
                    name="skill1"
                    value="Java"
                    @change="addRemoveSkills(index)"
                    v-model="newGroup.skills[index]"
                  />
                  <label for="skill1">Java</label>
                  <br />
                  <input
                    type="checkbox"
                    id="skill2"
                    name="skill2"
                    value="Python"
                    @change="addRemoveSkills(index)"
                    v-model="newGroup.skills[index]"
                  />
                  <label for="skill2">Python</label>
                  <br />
                  <input
                    type="checkbox"
                    id="skill3"
                    name="skill3"
                    value="HTML"
                    @change="addRemoveSkills(index)"
                    v-model="newGroup.skills[index]"
                  />
                  <label for="skill3">HTML</label>
                  <br />
                  <div v-for="curr in newGroup.newSkill" v-bind:key="curr">
                    <input
                      type="checkbox"
                      v-bind:value="curr"
                      @change="addRemoveSkills(index)"
                      v-model="newGroup.skills[index]"
                    />
                    <label>{{curr}}</label>
                    <button
                      v-on:click="newGroup.newSkill.splice(newGroup.newSkill.indexOf(skill), 1); newGroup.skills[index].splice(newGroup.skills[index].indexOf(skill), 1); 
                            addRemoveSkills(index)"
                    >Remove</button>
                    <br />
                  </div>
                  <div v-if="loadMore">
                    Year:
                    <br />
                    <input
                      type="checkbox"
                      id="skill4"
                      name="skill4"
                      value="Year 1"
                      @change="addRemoveSkills(index)"
                      v-model="newGroup.skills[index]"
                    />
                    <label for="skill4">Year 1</label>
                    <br />
                    <input
                      type="checkbox"
                      id="skill5"
                      name="skill5"
                      value="Year 2"
                      @change="addRemoveSkills(index)"
                      v-model="newGroup.skills[index]"
                    />
                    <label for="skill5">Year 2</label>
                    <br />
                    <input
                      type="checkbox"
                      id="skill6"
                      name="skill6"
                      value="Year 3"
                      @change="addRemoveSkills(index)"
                      v-model="newGroup.skills[index]"
                    />
                    <label for="skill6">Year 3</label>
                    <br />
                    <input
                      type="checkbox"
                      id="skill7"
                      name="skill7"
                      value="Year 4"
                      @change="addRemoveSkills(index)"
                      v-model="newGroup.skills[index]"
                    />
                    <label for="skill7">Year 4</label>
                    <br />Major:
                    <br />
                    <input
                      type="checkbox"
                      id="skill8"
                      name="skill8"
                      value="Business Analytics"
                      @change="addRemoveSkills(index)"
                      v-model="newGroup.skills[index]"
                    />
                    <label for="skill8">Business Analytics</label>
                    <br />
                    <input
                      type="checkbox"
                      id="skill9"
                      name="skill9"
                      value="Computer Science"
                      @change="addRemoveSkills(index)"
                      v-model="newGroup.skills[index]"
                    />
                    <label for="skill9">Computer Science</label>
                    <br />
                    <input
                      type="checkbox"
                      id="skill10"
                      name="skill10"
                      value="Information Systems"
                      @change="addRemoveSkills(index)"
                      v-model="newGroup.skills[index]"
                    />
                    <label for="skill10">Information Systems</label>
                    <br />
                    <input
                      type="checkbox"
                      id="skill11"
                      name="skill11"
                      value="Information Security"
                      @change="addRemoveSkills(index)"
                      v-model="newGroup.skills[index]"
                    />
                    <label for="skill11">Information Security</label>
                    <br />
                    <input
                      type="checkbox"
                      id="skill12"
                      name="skill12"
                      value="Computer Engineering"
                      @change="addRemoveSkills(index)"
                      v-model="newGroup.skills[index]"
                    />
                    <label for="skill12">Computer Engineering</label>
                    <br />
                  </div>
                  <button v-on:click="loadMore=!loadMore; changeText()">{{loadText}}</button>

                  <p>You have selected:</p>
                  <p>{{newGroup.members[index]}}</p>
                  <h6>Any comments for your group?</h6>
                  <textarea v-model.lazy="newGroup.comment" rows="1" style="resize: none;"></textarea>
                  <br />
                  <br />
                  <button v-on:click="addGroup()">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="currPage == 'Join Existing Groups'" style="padding-right: 200px;">
          <h1 style="text-align: left">Join Existing Groups:</h1>

          <table>
            <tr>
              <td>
                <div
                  style="text-align: left"
                  v-for="(team, teamName) of currGroups"
                  v-bind:key="teamName"
                >
                  <ul style="list-style-type:none">
                    <li class="removebullet">
                      <div class="group" style="text-align:center">
                        <div
                          style="border-radius: 25px;border: 2px solid #73AD21; padding: 10px;list-style:none;"
                        >
                          <h4>{{teamName}} ({{team['Group Members'].length}}/{{team.MaxSize}})</h4>
                        </div>
                        <ul>
                          <div class="group-content">
                            <li v-for="member in team['Group Members']" v-bind:key="member">
                              {{member}}
                              <a href="https://www.google.com" target="_blank">Profile</a>
                            </li>
                            <br />
                            Team Comment: {{team['Comment']}}
                            <br />
                            <div
                              style="border-radius: 25px;border: 2px solid #73AD21; padding: 10px; text-align:center"
                            >Team Composition:</div>
                            <table>
                              <td
                                v-for="(value, mem) in team['Vacancies']"
                                v-bind:key="mem"
                                style="padding-right:10px"
                              >
                                <tr
                                  v-for="(value, person) in team['Vacancies'][mem]"
                                  v-bind:key="person"
                                >
                                  <br />
                                  {{person}}
                                  <i
                                    class="fa fa-user"
                                    style="font-size:24px; color:green"
                                    v-show="!team['Vacancies'][mem][person]['FilledOrNot']"
                                  ></i>
                                  <i
                                    class="fa fa-user"
                                    style="font-size:24px; color:red"
                                    v-show="team['Vacancies'][mem][person]['FilledOrNot']"
                                  ></i>
                                  <br />
                                  <div v-show="!team['Vacancies'][mem][person]['FilledOrNot']">
                                    Skills Required:
                                    <ul>
                                      <li
                                        v-for="skill in team['Vacancies'][mem][person]['Skills Required']"
                                        v-bind:key="skill"
                                      >
                                        {{skill}}
                                        <i
                                          class="fa fa-check"
                                          style="font-size:24px;color:green"
                                          v-show="my_skills.indexOf(skill) > -1"
                                        ></i>
                                        <i
                                          class="fa fa-times"
                                          style="font-size:24px;color:red"
                                          v-show="my_skills.indexOf(skill) == -1"
                                        ></i>
                                      </li>
                                    </ul>
                                    <br />
                                    <div class="mb4 f6 fw6 dark-gray">Compatibility</div>
                                    <div
                                      class="vue-simple-progress"
                                      style="background: rgb(238, 238, 238);"
                                    >
                                      <div
                                        class="vue-simple-progress-bar"
                                        v-bind:style="{width: my_compatibility[teamName][person] + '%'}"
                                        style="background: rgb(33, 150, 243); height: 3px; transition: all 0.5s ease 0s;"
                                      ></div>
                                    </div>
                                    <div
                                      class="vue-simple-progress-text"
                                      style="color: rgb(34, 34, 34); font-size: 13px; text-align: center; padding-top: 4px;"
                                    >{{my_compatibility[teamName][person] + '%'}}</div>
                                    <br />
                                    <button
                                      v-show="my_compatibility[teamName][person] == 100"
                                      v-on:click="join(teamName, person)"
                                    >Click to join now</button>
                                  </div>
                                  <button
                                    v-show="team['Group Members'].indexOf(currName) > -1 && my_compatibility[teamName][person] == 100"
                                    v-on:click="leave(teamName, person); updateGroups()"
                                  >Leave</button>
                                </tr>
                              </td>
                            </table>
                          </div>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>

                <div
                  style="text-align: left"
                  v-for="(team, teamName) of newGroups"
                  v-bind:key="teamName"
                >
                  <ul style="list-style-type:none">
                    <li class="removebullet">
                      <div class="group" style="text-align:center">
                        <div
                          style="border-radius: 25px;border: 2px solid #73AD21; padding: 10px;list-style:none;"
                        >
                          <h4>{{teamName}} ({{team['Group Members'].length}}/{{team.MaxSize}})</h4>
                        </div>
                        <ul>
                          <div class="group-content">
                            <div v-if="team['Group Members'].length > 1">
                              You
                              <a href="https://www.google.com" target="_blank">Profile</a>
                            </div>
                            <li v-for="member in team['Group Members']" v-bind:key="member">
                              {{member}}
                              <a href="https://www.google.com" target="_blank">Profile</a>
                            </li>
                            <br />
                            Team Comment: {{team['Comment']}}
                            <br />
                            <div
                              style="border-radius: 25px;border: 2px solid #73AD21; padding: 10px; text-align:center"
                            >Team Composition:</div>
                            <table>
                              <td
                                v-for="(value, mem) in team['Vacancies']"
                                v-bind:key="mem"
                                style="padding-right:10px"
                              >
                                <tr
                                  v-for="(value, person) in team['Vacancies'][mem]"
                                  v-bind:key="person"
                                >
                                  <br />
                                  {{person}}
                                  <i
                                    class="fa fa-user"
                                    style="font-size:24px; color:green"
                                    v-show="!team['Vacancies'][mem][person]['FilledOrNot']"
                                  ></i>
                                  <i
                                    class="fa fa-user"
                                    style="font-size:24px; color:red"
                                    v-show="team['Vacancies'][mem][person]['FilledOrNot']"
                                  ></i>
                                  <br />
                                  <div v-show="!team['Vacancies'][mem][person]['FilledOrNot']">
                                    Skills Required:
                                    <ul>
                                      <li
                                        v-for="skill in team['Vacancies'][mem][person]['Skills Required']"
                                        v-bind:key="skill"
                                      >{{skill}}</li>
                                    </ul>
                                  </div>
                                </tr>
                              </td>
                            </table>
                            <br />
                          </div>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
import database from "../firebase.js";
export default {
  name: "App",
  data() {
    return {
      userInfo: [],
      modules: {},
      hover: false,
      module: "",
      good: "",
      bad: "",
      loadMore: false,
      loadText: "Load More",
      my_skills: [],
      currName: "",
      skill: "",
      hasNewSkill: false,
      currSkill: "",
      taken: [],
      friend: "",
      noGroup: [],
      newGroupFormed: {},
      newGroup: {
        module: "",
        groupName: "",
        size: 2,
        currGroup: ["You"],
        newSkill: [],
        comment: "",
        compatibility: [],
        memberStatus: ["true"],
        members: ["None"],
        skills: [[]],
        currMember: 1,
        skills1: [],
        skills2: [],
        skills3: [],
        Assignments: {}
      },
      newGroups: {},
      currGroups: {},
      my_compatibility: {},
      currPage: "Students not in any group"
    };
  },
  methods: {
    checkAvailable: function() {
      let temp = {};
      // Get all the items from DB
      database.collection("Modules").onSnapshot(myModules => {
        myModules.forEach(function(module) {
          temp[module.id] = module.data();
        });
        this.modules = temp;
      });
      this.taken = [];
      for (var mod in this.modules) {
        for (var groupName in this.modules[mod]) {
          this.taken.push(groupName);
        }
      }
      var el = this.newGroup.groupName;
      if (el.length == 0) {
        this.bad = "Group name must contain at least 1 character.";
        this.good = "";
      } else if (el == "NoGroup" || el == "show" || el == "id") {
        this.bad = "This group name is not allowed. Please choose another one.";
        this.good = "";
      } else if (this.taken.indexOf(el) >= 0) {
        this.bad = "This group name is taken. Please choose another one.";
        this.good = "";
      } else {
        this.good = "This group name is available";
        this.bad = "";
      }
    },

    changeText: function() {
      if (this.loadText == "Load More") {
        this.loadText = "Load Less";
      } else {
        this.loadText = "Load More";
      }
    },

    addFriend: function() {
      if (this.newGroup.currGroup.indexOf("" + this.friend) > -1) {
        alert("You have already added this name.");
      } else if (this.friend == "") {
        alert("Please select 1 friend to add.");
      } else {
        this.newGroup.currGroup.push(this.friend);
        this.newGroup.skills.pop();
      }
      this.friend = "";
    },

    removeFriend: function() {
      if (this.friend == "") {
        alert("Please select 1 friend to remove.");
      } else if (this.newGroup.currGroup.indexOf("" + this.friend) == -1) {
        alert(
          "You have entered the name of your group mate incorrectly. Please try again."
        );
      } else {
        this.newGroup.currGroup.splice(
          this.newGroup.currGroup.indexOf("" + this.friend),
          1
        );
        this.newGroup.skills.push([]);
      }
      this.friend = "";
    },

    addRemoveSkills: function(index) {
      if (this.newGroup.skills[index].length > 0) {
        this.newGroup.members[index] = this.newGroup.skills[index].join(", ");
      } else {
        this.newGroup.members[index] = "None";
      }
    },

    checkSkill: function() {
      if (this.skill == "") {
        alert("Please enter at least 1 character.");
      } else if (this.newGroup.newSkill.indexOf(this.skill) == -1) {
        this.hasNewSkill = true;
        this.newGroup.newSkill.push(this.skill);
      } else {
        this.hasNewSkill = false;
      }
    },

    addGroup: function() {
      if (this.newGroup.groupName == "") {
        alert("Please fill in a group name.");
      } else if (this.newGroup.comment.length == 0) {
        alert("Please write a comment for your group.");
      } else if (this.newGroup.size < 1) {
        alert("Please enter a valid group size.");
      } else if (this.newGroup.size == 1) {
        alert("Group size should be at least 2");
      } else if (this.newGroupFormed[this.module]) {
        alert("You have already created a group for this module.");
      } else {
        for (var i = 0; i < this.newGroup.skills.length; i++) {
          if (this.newGroup.skills[i].length == 0) {
            alert("Please choose at least 1 option for team mate " + (i + 1));
            return;
          }
        }
        alert(
          "Your group has been sucessfully created! Click the Join Existing Groups tab to see your group."
        );
        var newGroupFormat = {};
        this.newGroup["currGroup"][0] = this.currName;
        newGroupFormat[this.newGroup.groupName] = {
          "Group Members": this.newGroup["currGroup"],
          MaxSize: this.newGroup["size"],
          Vacancies: {},
          Comment: this.newGroup.comment
        };
        var counter = 1;
        for (i = 0; i < this.newGroup["members"].length; i++) {
          if (Number.isInteger((counter - 1) / 2)) {
            newGroupFormat[this.newGroup.groupName]["Vacancies"][
              "Vacancies " + Math.floor((counter - 1) / 2)
            ] = {};
          }
          newGroupFormat[this.newGroup.groupName]["Vacancies"][
            "Vacancies " + Math.floor((counter - 1) / 2)
          ]["Group Member " + counter] = {};
          newGroupFormat[this.newGroup.groupName]["Vacancies"][
            "Vacancies " + Math.floor((counter - 1) / 2)
          ]["Group Member " + counter]["FilledOrNot"] = false;
          if (this.newGroup["members"][i].indexOf(",") > -1) {
            newGroupFormat[this.newGroup.groupName]["Vacancies"][
              "Vacancies " + Math.floor((counter - 1) / 2)
            ]["Group Member " + counter]["Skills Required"] = this.newGroup[
              "members"
            ][i].split(",");
          } else {
            newGroupFormat[this.newGroup.groupName]["Vacancies"][
              "Vacancies " + Math.floor((counter - 1) / 2)
            ]["Group Member " + counter]["Skills Required"] = [
              this.newGroup["members"][i]
            ];
          }
          counter += 1;
        }
        for (i = 0; i < this.newGroup["currGroup"].length; i++) {
          if (Number.isInteger((counter - 1) / 2)) {
            newGroupFormat[this.newGroup.groupName]["Vacancies"][
              "Vacancies " + Math.floor((counter - 1) / 2)
            ] = {};
          }
          newGroupFormat[this.newGroup.groupName]["Vacancies"][
            "Vacancies " + Math.floor((counter - 1) / 2)
          ]["Group Member " + counter] = {};
          newGroupFormat[this.newGroup.groupName]["Vacancies"][
            "Vacancies " + Math.floor((counter - 1) / 2)
          ]["Group Member " + counter]["FilledOrNot"] = true;
          counter += 1;
        }
        this.newGroupFormed[this.module] = true;
        this.newGroups[this.newGroup.groupName] = this.newGroup;
        // newGroupFormat['Group Members'][0] = this.currName;
        // console.log(newGroupFormat)
        database
          .collection("Modules")
          .doc(this.module)
          .set(newGroupFormat, { merge: true });
        this.newGroup = {
          module: "",
          groupName: "",
          size: 2,
          currGroup: ["You"],
          newSkill: [],
          comment: "",
          compatibility: [],
          memberStatus: ["true"],
          members: ["None"],
          skills: [[]],
          currMember: 1,
          skills1: [],
          skills2: [],
          skills3: []
        };
      }
    },

    // addGroup: function() {
    //   if(this.newGroup.groupName == '') {
    //     alert("Please fill in a group name.");
    //   } else if(this.newGroup.comment.length == 0) {
    //     alert("Please write a comment for your group.");
    //   } else if(this.newGroup.size < 1) {
    //     alert("Please enter a valid group size.");
    //   } else if(this.newGroup.size == 1) {
    //     alert("Group size should be at least 2");
    //   } else if (this.newGroupFormed[this.module]) {
    //     alert("You have already created a group for this module.");
    //   }else {
    //     for(var i = 0; i < this.newGroup.skills.length; i++) {
    //       if(this.newGroup.skills[i].length == 0) {
    //         alert("Please choose at least 1 option for team mate " + (i + 1));
    //         return;
    //       }
    //     }
    //     alert("Your group has been sucessfully created! Click the Join Existing Groups tab to see your group.");
    //     var newGroupFormat = {};
    //     this.newGroup['currGroup'][0] = this.currName;
    //     console.log(this.newGroup['currGroup']);
    //     newGroupFormat[this.newGroup.groupName] = {'Group Members':this.newGroup['currGroup'], 'MaxSize': this.newGroup['size'], 'Vacancies':{}, 'Comment':this.newGroup.comment};
    //     var counter = 1;
    //     for(i = 0; i < this.newGroup['members'].length; i++) {
    //       if(Number.isInteger((counter - 1) / 2)) {
    //         newGroupFormat[this.newGroup.groupName]['Vacancies']['Vacancies ' + Math.floor((counter - 1) / 2)] = {};
    //       }
    //       newGroupFormat[this.newGroup.groupName]['Vacancies']['Vacancies ' + Math.floor((counter - 1) / 2)]['Group Member ' + counter] = {};
    //       newGroupFormat[this.newGroup.groupName]['Vacancies']['Vacancies ' + Math.floor((counter - 1) / 2)]['Group Member ' + counter]['FilledOrNot'] = false;
    //       if(this.newGroup['members'][i].indexOf(',') > -1) {
    //         newGroupFormat[this.newGroup.groupName]['Vacancies']['Vacancies ' + Math.floor((counter - 1) / 2)]['Group Member ' + counter]['Skills Required'] = this.newGroup['members'][i].split(",");
    //       } else {
    //         newGroupFormat[this.newGroup.groupName]['Vacancies']['Vacancies ' + Math.floor((counter - 1) / 2)]['Group Member ' + counter]['Skills Required'] = [this.newGroup['members'][i]];
    //       }
    //       counter += 1;
    //     }
    //     for(i = 0; i < this.newGroup['currGroup'].length; i++) {
    //       if(Number.isInteger((counter - 1) / 2)) {
    //         newGroupFormat[this.newGroup.groupName]['Vacancies']['Vacancies ' + Math.floor((counter - 1) / 2)] = {};
    //       }
    //       newGroupFormat[this.newGroup.groupName]['Vacancies']['Vacancies ' + Math.floor((counter - 1) / 2)]['Group Member ' + counter] = {};
    //       newGroupFormat[this.newGroup.groupName]['Vacancies']['Vacancies ' + Math.floor((counter - 1) / 2)]['Group Member ' + counter]['FilledOrNot'] = true;
    //       counter += 1
    //     }
    //     this.newGroupFormed[this.module] = true;
    //     //this.newGroup.currGroup[0] = this.currName;
    //     //console.log(this.newGroup.currGroup);
    //     //newGroupFormat['Group Members'][0] = this.currName;
    //     this.newGroupFormed[this.module] = true;
    //     this.newGroups[this.newGroup.groupName] = this.newGroup;
    //     database.collection('Modules').doc(this.module).set(newGroupFormat, {merge: true});
    //     this.newGroup = {module: '', groupName:'', size:2, currGroup:[this.currName], newSkill: [], comment:'', compatibility:[],
    //     memberStatus:['true'], members:['None'], skills:[[]], currMember:1, skills1:[], skills2:[], skills3:[], Assignments: {}};
    //   }
    // },
    addMember: function() {
      var add = this.newGroup.size - this.newGroup.currGroup.length;
      this.newGroup.memberStatus = ["true"];
      this.newGroup.skills = [[]];
      for (var i = 1; i < add; i++) {
        this.newGroup.memberStatus.push("false");
        this.newGroup.skills.push([]);
      }
    },
    checkCurr: function() {
      var index = this.newGroup.currMember - 1;
      this.newGroup.memberStatus[index] = "true";
      for (var i = 0; i < this.newGroup.memberStatus.length; i++) {
        if (i != index) {
          this.newGroup.memberStatus[i] = "false";
        }
      }
    },
    join: function(teamName, person) {
      var temp = {};
      for (var mod in this.modules) {
        if (this.module == mod) {
          for (var group in this.modules[mod]) {
            if (group == teamName) {
              temp[teamName] = this.modules[mod][group];
              break;
            }
          }
        }
      }
      temp[teamName]["Group Members"].push(this.currName);
      for (var index in temp[teamName]["Vacancies"]) {
        for (var mem in temp[teamName]["Vacancies"][index]) {
          if (
            "FilledOrNot" in temp[teamName]["Vacancies"][index][mem] &&
            mem == person
          ) {
            temp[teamName]["Vacancies"][index][mem]["FilledOrNot"] = true;
            break;
          }
        }
      }
      database
        .collection("Modules")
        .doc(this.module)
        .set(temp, { merge: true });
    },
    leave: function(teamName, person) {
      var temp = {};
      for (var mod in this.modules) {
        if (this.module == mod) {
          for (var group in this.modules[mod]) {
            if (group == teamName) {
              temp[teamName] = this.modules[mod][group];
              break;
            }
          }
        }
      }
      temp[teamName]["Group Members"].pop();
      for (var index in temp[teamName]["Vacancies"]) {
        for (var mem in temp[teamName]["Vacancies"][index]) {
          if (
            "FilledOrNot" in temp[teamName]["Vacancies"][index][mem] &&
            mem == person
          ) {
            temp[teamName]["Vacancies"][index][mem]["FilledOrNot"] = false;
            break;
          }
        }
      }
      database
        .collection("Modules")
        .doc(this.module)
        .set(temp, { merge: true });
    },
    fetchData: function() {
      let temp = {};
      //Get all the items from DB
      let userMods = [];

      let temp1 = [];
      let tempName = "";
      var user = firebase.auth().currentUser;
      var emailVerified = user.email;
      database.collection("User Info").onSnapshot(user => {
        user.forEach(function(currUser) {
          if (currUser.id == emailVerified) {
            temp1 = currUser.data()["Skills"];
            tempName = currUser.data()["Name"];
            for (var mod in currUser.data()) {
              userMods.push(mod);
            }
          }
        });
        this.currName = tempName;
        this.my_skills = temp1;
      });

      database.collection("Modules").onSnapshot(myModules => {
        myModules.forEach(function(module) {
          if (userMods.index(module.id) > -1) {
            temp[module.id] = module.data();
          }
        });
        this.modules = temp;
      });
    },
    updateGroups: function() {
      this.newGroups = {};
      for (let mod in this.modules) {
        if (this.module == mod) {
          this.noGroup = this.modules[mod]["NoGroup"];
          for (var group in this.modules[mod]) {
            if (
              "Group Members" in this.modules[mod][group] &&
              this.modules[mod][group]["Group Members"].indexOf(this.currName) >
                -1
            ) {
              this.newGroups[group] = this.modules[mod][group];
            }
          }
        }
      }
      this.currGroups = {};
      for (let mod in this.modules) {
        if (this.module == mod) {
          for (group in this.modules[mod]) {
            if (
              "Vacancies" in this.modules[mod][group] &&
              this.modules[mod][group]["Group Members"].indexOf(
                this.currName
              ) == -1
            ) {
              this.currGroups[group] = this.modules[mod][group];
              this.my_compatibility[group] = {};
              for (var vacancy in this.modules[mod][group]["Vacancies"]) {
                for (var member in this.modules[mod][group]["Vacancies"][
                  vacancy
                ]) {
                  if (
                    !this.modules[mod][group]["Vacancies"][vacancy][member][
                      "FilledOrNot"
                    ]
                  ) {
                    var tot = 0;
                    var match = 0;
                    for (
                      var i = 0;
                      i <
                      this.modules[mod][group]["Vacancies"][vacancy][member][
                        "Skills Required"
                      ].length;
                      i++
                    ) {
                      tot += 1;
                      if (
                        this.my_skills.indexOf(
                          this.modules[mod][group]["Vacancies"][vacancy][
                            member
                          ]["Skills Required"][i]
                        ) > -1
                      ) {
                        match += 1;
                      }
                    }
                    var compat = parseFloat((match / tot) * 100 + "").toFixed(
                      2
                    );
                    this.my_compatibility[group][member] = compat;
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#header li a {
  display: block;
  color: black;
  text-align: center;
  padding: 16px;
  text-decoration: none;
}

#header li {
  float: left;
}

#header li a:hover {
  background-color: darksalmon;
}

#userinfo li {
  padding-top: 10px;
  background-color: #f1f1f1;
  width: 60px;
  padding-right: 50px;
}

#userinfo li a {
  text-decoration: none;
  color: black;
}

#userinfo li a:hover {
  background-color: darkgray;
}

body {
  height: 100%;
}

#modules {
  width: 100px;
  height: 30px;
}

#studentlist {
  text-align: left;
}

#memberlist {
  width: 500px;
  text-align: left;
}

.button {
  text-align: center;
  border-radius: 25px;
  border: 2px solid gray;
  background-color: white;
  color: black;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.hidden {
  display: none;
  overflow: hidden;
  text-align: center;
  border-radius: 25px;
  border: 2px solid gray;
  background-color: white;
  color: black;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.group {
  display: inline-block;
}

.group:hover .group-content {
  display: block;
  position: absolute;
}

.group-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  width: auto;
  height: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  text-align: left;
}

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>
