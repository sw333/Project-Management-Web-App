<template>
<div>
  <head>
    <title>Projects List</title>
  </head>
  <link
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
    rel="stylesheet"
  />

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
      <div class="container" style="width:1000px">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <section class="section mt--300 section-components">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col col-lg-2">
              <base-button 
                type="primary"
                v-bind:key="value" 
                v-bind:class="{active: showactive(mod)}"
                v-for="(mod, value) in currentmods"
                v-on:click="updateGroups(mod)"

              >{{mod}}</base-button>
            </div>
            <div class="col">
              <div class="mt--100 col-lg-12">
                <!-- Menu -->
                <tabs fill class="flex-column flex-md-row">
                  <card shadow>
                    <tab-pane title="Students without Group" v-on:click = "updateGroups(module)">
                      <base-button type="secondary" v-on:click="updateGroups(module)">Refresh</base-button>

                      <div v-for="(value, mod) in modules" v-bind:key="mod">
                        <div v-if="mod == module">
                          <li v-for="person in noGroup" v-bind:key="person">
                            {{person}}
                          </li>
                        </div>
                      </div>
                    </tab-pane>

                    <tab-pane title="Form a New Group" v-on:click = "updateGroups(module)">
                      <div class="modal-content" style="width: 600px; overflow: auto; margin-bottom: 0px;">
                        <div>
                          <label style="vertical-align: middle;"><h6>Group Name:</h6></label>
                          <textarea v-model='newGroup.groupName' style="resize: none;" rows="1"></textarea>
                          <button style="vertical-align: top;" v-on:click="checkAvailable()">Check Availability</button>
                          <br>
                          <div class='good' v-if="good!=''" style="color: green">{{good}}</div>
                          <div class='bad' v-if="bad!=''" style="color: red">{{bad}}</div>
                        </div>
                        <br>
                        <h6>Size of group:</h6><input type=number v-model='newGroup.size' @change='addMember()'>
                        <br>
                        <br>
                        <div style="text-align: left; font-size: 20px">
                          <h6>Add your peers who are without a group:</h6>
                          <select v-model = 'friend'>
                            <option disabled selected value>Select a peer</option>
                            <option v-for='fren in noGroup' v-bind:key=fren>{{fren}}</option>
                          </select>
                          <button v-on:click='addFriend()'>Add</button>
                          <br>
                          <br>
                          <h6>Remove your peers in your group:</h6>
                          <select v-model = 'friend'>
                            <option disabled selected value>Select a peer</option>
                            <option v-for='fren in newGroup.currGroup.slice(1)' v-bind:key=fren>{{fren}}</option>
                          </select>
                          <button v-on:click='removeFriend()'>Remove</button>
                        </div>
                
                        <br>
                        <div>Group as of now: {{newGroup.currGroup.join(', ')}}</div>
                        <br>
                        <div v-if='newGroup.size - newGroup.currGroup.length > 1'>You need
                          {{newGroup.size - newGroup.currGroup.length}}
                          more group mates.</div>
                        <div v-if='newGroup.size - newGroup.currGroup.length <= 1'>You need
                          {{newGroup.size - newGroup.currGroup.length}} more group mate.</div>
                        <br>
                        <br>
                        
                        <div v-show ='newGroup.size - newGroup.currGroup.length >= 1'>
                          <div style="text-align: left; font-size: 20px">
                          <h6>I want to look for:</h6>
                        </div>
                        <div>
                          <h6>Add a new skill:</h6>
                          <textarea rows="1" v-model.lazy='skill' style="resize: none;"></textarea>
                          
                          <button v-on:click='checkSkill()' style="vertical-align: top;">Add</button>
                          <br>
                          <div v-if='hasNewSkill && newGroup.newSkill.length > 0 && skill != ""' id='add'>{{skill}} has been added!
                          </div>
                          <div v-if='!hasNewSkill && newGroup.newSkill.length > 0 && skill != ""'>{{skill}} has already been added!
                          </div>
                        </div>
                        <br>
                        <label><h6>Select Team Member</h6></label>
                        <select v-model='newGroup.currMember' v-on:change='checkCurr()'>
                          <option v-for='(value, index) in newGroup.skills' v-bind:key=index+1>{{index + 1}}</option>
                        </select>
                
                        <br>
                          <div v-for='(value, index) in newGroup.memberStatus' v-show='value=="true"' v-bind:key = value>
                            
                        <p style="text-align: left">
                              Team Member {{index + 1}}
                            </p>
                            <div id='memberlist'>
                              Desired Skills:
                              <br>
                              <input type="checkbox" id="skill1" name="skill1" value="Java" @change='addRemoveSkills(index)'
                                v-model='newGroup.skills[index]'>
                              <label for="skill1">Java</label><br>
                              <input type="checkbox" id="skill2" name="skill2" value="Python" @change='addRemoveSkills(index)'
                                v-model='newGroup.skills[index]'>
                              <label for="skill2">Python</label><br>
                              <input type="checkbox" id="skill3" name="skill3" value="HTML" @change='addRemoveSkills(index)'
                                v-model='newGroup.skills[index]'>
                              <label for="skill3">HTML</label><br>
                              <div v-for='curr in newGroup.newSkill' v-bind:key = curr>
                                <input type="checkbox" v-bind:value=curr @change='addRemoveSkills(index)'
                                  v-model='newGroup.skills[index]'>
                                <label>{{curr}}</label>
                                <button v-on:click='newGroup.newSkill.splice(newGroup.newSkill.indexOf(skill), 1); newGroup.skills[index].splice(newGroup.skills[index].indexOf(skill), 1); 
                                      addRemoveSkills(index)'>Remove</button><br>
                              </div>
                              <div v-if='loadMore'>
                                Year:
                                <br>
                                <input type="checkbox" id="skill4" name="skill4" value="Year 1" @change='addRemoveSkills(index)'
                                  v-model='newGroup.skills[index]'>
                                <label for="skill4">Year 1</label><br>
                                <input type="checkbox" id="skill5" name="skill5" value="Year 2" @change='addRemoveSkills(index)'
                                  v-model='newGroup.skills[index]'>
                                <label for="skill5">Year 2</label><br>
                                <input type="checkbox" id="skill6" name="skill6" value="Year 3" @change='addRemoveSkills(index)'
                                  v-model='newGroup.skills[index]'>
                                <label for="skill6">Year 3</label><br>
                                <input type="checkbox" id="skill7" name="skill7" value="Year 4" @change='addRemoveSkills(index)'
                                  v-model='newGroup.skills[index]'>
                                <label for="skill7">Year 4</label><br>
                                Major:
                                <br>
                                <input type="checkbox" id="skill8" name="skill8" value="Business Analytics"
                                  @change='addRemoveSkills(index)' v-model='newGroup.skills[index]'>
                                <label for="skill8">Business Analytics</label><br>
                                <input type="checkbox" id="skill9" name="skill9" value="Computer Science"
                                  @change='addRemoveSkills(index)' v-model='newGroup.skills[index]'>
                                <label for="skill9">Computer Science</label><br>
                                <input type="checkbox" id="skill10" name="skill10" value="Information Systems"
                                  @change='addRemoveSkills(index)' v-model='newGroup.skills[index]'>
                                <label for="skill10">Information Systems</label><br>
                                <input type="checkbox" id="skill11" name="skill11" value="Information Security"
                                  @change='addRemoveSkills(index)' v-model='newGroup.skills[index]'>
                                <label for="skill11">Information Security</label><br>
                                <input type="checkbox" id="skill12" name="skill12" value="Computer Engineering"
                                  @change='addRemoveSkills(index)' v-model='newGroup.skills[index]'>
                                <label for="skill12">Computer Engineering</label><br>
                              </div>
                              <button v-on:click='loadMore=!loadMore; changeText()'>{{loadText}}</button>
                
                              <p>You have selected:</p>
                              <p>{{newGroup.members[index]}}</p>
                            </div>
                          </div>
                            <div>

                             
                
                          </div>
                        
                        </div>

                         <h6>Any comments for your group?</h6><textarea v-model.lazy='newGroup.comment' rows="1" style="resize: none;"></textarea>
                              <br>
                              <br>
                              <button v-on:click='addGroup()'>Submit</button>
                        
                      </div>
                    </tab-pane>

                    <tab-pane title="Formed Project Groups" v-on:click = "updateGroups(module)">
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
                                  <h4>{{groupName}} ({{group['Group Members'].length}}/{{group['Group Members'].length}})</h4>
                                  <ul style="list-style-type: none">
                                    <div class="group-content">
                                      <li
                                        v-for="person in group['Group Members']"
                                        v-bind:key="person"
                                      >
                                        {{person}}
                                        
                                      </li>
                                    </div>
                                  </ul>
                                </div>
                              </li>
                            </div>
                          </div>
                        </div>
                      </div>
                    </tab-pane>
                    <tab-pane title="Existing Groups" v-on:click = "updateGroups(module)">
                      <div
                        style="text-align: left"
                        v-for="(team, teamName) of currGroups"
                        v-bind:key="teamName"
                      >
                        <ul style="list-style-type:none">
                          <li class="removebullet">

                            <div v-if="team['Group Members'] != null && team['MaxSize'] > team['Group Members'].length">
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
                                        <div
                                          v-show="!team['Vacancies'][mem][person]['FilledOrNot']"
                                        >
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
                                          v-on:click="leave(teamName, person); updateGroups(module)"
                                        >Leave</button>
                                      </tr>
                                    </td>
                                  </table>
                                </div>
                              </ul>
                            </div>
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
                            <div v-if="team['Group Members'] != null && team['MaxSize'] > team['Group Members'].length">
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
                                        <div
                                          v-show="!team['Vacancies'][mem][person]['FilledOrNot']"
                                        >
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
                            </div>
                          </li>
                        </ul>
                      </div>
                    </tab-pane>
                  </card>
                </tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</div>
</template>
<script>
import firebase from "firebase";
import "firebase/firestore";
import database from "../firebase.js";
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
export default {
  name: "App",
  components: {
    Tabs,
    TabPane
  },
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
      newGroup:{module: '', groupName:'', size:0, currGroup:['You'], newSkill: [], comment:'', compatibility:[], 
      memberStatus:['true'], members:['None'], skills:[[]], currMember:1, skills1:[], skills2:[], skills3:[]},
      newGroups: {},
      currGroups: {},
      my_compatibility: {},
      currPage: "Students not in any group",
      currentmods:[],
      myToggle: false,
      isActive:{}
    };
  },
  methods: {
    checkAvailable: function() {
      let temp = {};
      //Get all the items from DB
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
        
        var newGroupFormat = {};
        //console.log("currGroup");
        //console.log(this.newGroup["currGroup"]);
        this.newGroup['currGroup'][0] = this.currName;
        var size = parseInt(this.newGroup.size);
        console.log(this.newGroup.size);
        newGroupFormat[this.newGroup.groupName] = {
          "Group Members": this.newGroup["currGroup"],
          MaxSize: size,
          Vacancies: {},
          Comment: this.newGroup.comment
        };
        // console.log(newGroupFormat.MaxSize);
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
        this.newGroups[this.newGroup.groupName] = newGroupFormat[this.newGroup.groupName];
        var noofpplleft = this.newGroup.size - newGroupFormat[this.newGroup.groupName]['Group Members'].length;
        console.log(this.newGroup.size);
        console.log(newGroupFormat[this.newGroup.groupName]['Group Members']);
        console.log(noofpplleft);
        if(noofpplleft==0){
          alert("Your group has been successfully created! Check Formed Project Group!");
        }
        else{
        alert(
            "Your group has been sucessfully created! Click the Join Existing Groups tab to see your group."
          );
        }
        // console.log(newGroupFormat);
        console.log(this.newGroups);
        database
          .collection("Modules")
          .doc(this.module)
          .set(newGroupFormat, { merge: true });
        this.newGroup = {
          module: "",
          groupName: "",
          size: 2,
          currGroup: [this.currName],
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
      //   var noofpplleft = newGroupFormat.MaxSize - newGroupFormat['Group Members'].length;
      // console.log(noofpplleft);
      // if(noofpplleft==0){
      //   alert("Your group has been successfully created! Check Formed Project Group!");
      // }
      // else{
      // alert(
      //     "Your group has been sucessfully created! Click the Join Existing Groups tab to see your group."
      //   );
      // }
      }
      this.fetchData();
      this.updateGroups(this.module);
    },
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
      //Get all the items from DB
      this.modules = {};
      let temp = {};
      database.collection("Modules").onSnapshot(myModules => {
        myModules.forEach(function(module) {
          temp[module.id] = module.data();
        });
        this.modules = temp;
      });

      let temp1 = [];
      let tempName = "";
      var user = firebase.auth().currentUser;
      var emailVerified = user.email; //user.email;
      var userMods=[];
      database.collection("User Info").onSnapshot(user => {
        user.forEach(function(currUser) {
          if (currUser.id == emailVerified) {
            temp1 = currUser.data()["Skills"];
            tempName = currUser.data()["Name"];
            for(var mod in currUser.data()['Current Modules']) {
              if(!userMods.includes(mod)){
                //console.log(mod);
                userMods.push(mod);
              }
          }
          // console.log(userMods);
          }
          });
          var temp3 = {};
        this.currName = tempName;
        this.my_skills = temp1;
        this.currentmods = userMods;
        database.collection("Modules").onSnapshot(myModules => {
        myModules.forEach(function(mod) {
          if(userMods.includes(mod.id)) {
            var tempdictionary = mod.data();
            // console.log(temp3);
            temp3[mod.id] = tempdictionary;
            // console.log(temp3);
          }
        })
        this.modules = temp3;
      });
      });
      
    },
    showactive: function(mod){
      return this.isActive[mod];
    },
    updateGroups: function(mod) {
      // console.log(this.module);
      // console.log(this.modules);
      this.isActive[mod] = true;
      var indexrange = this.currentmods.length;
      var i;
      for(i = 0; i < indexrange; i++){
        if(this.currentmods[i]!=mod){
          this.isActive[this.currentmods[i]] = false;
        }
      }
      this.newGroups = {};
      this.module = mod;

      for (let mod in this.modules) {
        if (this.module == mod) {
          //this.noGroup = this.modules[mod]["NoGroup"];
          this.noGroup = [];
          for(var ppl in this.modules[mod]["NoGroup"]) {
            if(this.modules[mod]["NoGroup"][ppl] != this.currName) {
              this.noGroup.push(this.modules[mod]["NoGroup"][ppl]);
            }
          }
          console.log(this.noGroup); //correct

          for (var group in this.modules[mod]) {
            console.log(group);
            //console.log(this.modules[mod][group]);
            if (
              "Group Members" in this.modules[mod][group] && //nogroup will not go in here
              this.modules[mod][group]["Group Members"].indexOf(this.currName) > -1
            ) {
              console.log(this.modules[mod][group]);
              this.newGroups[group] = this.modules[mod][group];
            }
          }
          console.log(this.newGroups); //newGroups is a dictionary which contains new groups formed 
          for(var group in this.newGroups) {
            console.log(group);
            console.log("second for loop");
            for(var ppl in this.newGroups[group]["Group Members"]) {
              let idx = this.noGroup.indexOf(this.newGroups[group]["Group Members"][ppl]); 
              console.log(this.newGroups[group]["Group Members"][ppl]);
              // console.log(ppl + " " + idx);
              if(idx > -1) {
                this.noGroup.splice(idx, 1);
                // console.log(this.newGroups[group]["Group Members"][ppl]);
                // console.log(this.noGroup);
                this.modules[mod]["NoGroup"].splice(this.modules[mod]["NoGroup"].indexOf(ppl), 1);
              }
            }
          }
          let NoGroup = this.noGroup;
          //console.log(this.modules[mod]["NoGroup"]);
          console.log(this.noGroup);
                database
                  .collection("Modules")
                  .doc(mod)
                  .update({
                    NoGroup
                  });
        }
      }

      this.currGroups = {};
      for (let mod in this.modules) {
        if (this.module == mod) {
          for (group in this.modules[mod]) {
            if (
              "Vacancies" in this.modules[mod][group] &&
              this.modules[mod][group]["Group Members"].indexOf(this.currName) == -1
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
                    if(this.modules[mod][group]["Vacancies"][vacancy][
                            member
                          ]["Skills Required"][0] == "None") {
                      compat = 100;
                    }
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
<style>
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
  bottom: 50%;
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

