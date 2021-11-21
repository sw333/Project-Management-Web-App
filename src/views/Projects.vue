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
      <div class="container mt--300" style="width:1000px">
        <card class="border-0" shadow body-classes="py-5">
          <div class="container" style="width:fit-content">
            <card class="border-0" shadow body-classes="py-5">
              <div class="px-4">
                <div class="row justify-content-center">
                  <h4 style="padding:20px">
                    <span
                      class="text-primary text-uppercase"
                      style="padding-right:20px"
                    >Tasks / Deadlines</span>
                    <b-button style="font-size:15px" v-b-modal.taskModal>Add Task</b-button>
                  </h4>

                  <b-modal id="taskModal" ref="modal" title="Add New Task" @ok="submitTask">
                    <form ref="form">
                      <b-form-group label="Module">
                        <b-form-select v-model="selectedModule" class="mb-3">
                          <b-form-select-option value="All Modules">Select a Module</b-form-select-option>
                          <b-form-select-option
                            v-for="(items,module) in taskList"
                            v-bind:key="module"
                            :value="module"
                          >{{module}}</b-form-select-option>
                        </b-form-select>
                      </b-form-group>
                      <b-form-group label="Due Date">
                        <b-form-datepicker v-model="deadline" :min="new Date()" locale="en"></b-form-datepicker>
                      </b-form-group>
                      <b-form-group label="Task">
                        <b-form-input id="task-input" v-model="inputTask"></b-form-input>
                      </b-form-group>
                    </form>
                  </b-modal>

                  <div class="container">
                    <div class="row justify-content-center">
                      <div style="background-color:#7989E9;padding:10px;width:800px">
                        <select v-model="selectedModule">
                          <option>All Modules</option>
                          <option v-for="(items,module) in taskList" v-bind:key="module">{{module}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="row justify-content-center">
                      <table style="width:800px">
                        <tr v-for="(details,key) in displayTasks" v-bind:key="key">
                          <td
                            style="width:150px;font-size:15px"
                            class="timeline datebutton"
                          >{{fetchDate(Object.values(details)[0]["deadline"])}}</td>
                          <td class="taskbutton">
                            <i
                              v-on:click="toggleTask(Object.values(details)[0]['TaskID'])"
                              v-show="Object.values(details)[0]['completed']== false"
                              class="fa fa-circle-thin"
                              style="color:rgb(170, 169, 169);vertical-align: middle;padding-right:15px"
                            ></i>
                            <i
                              class="fa fa-check-circle"
                              style="color:rgb(129, 194, 129);vertical-align: middle;padding-right:15px"
                              v-show="Object.values(details)[0]['completed']"
                              v-on:click="toggleTask(Object.values(details)[0]['TaskID'])"
                            ></i>
                            <span
                              :class="{todoDone:Object.values(details)[0]['completed']}"
                              v-on:click="chooseTask( Object.keys(details)[0])"
                            >
                              <a
                                style="color:gray;padding-left:10px"
                                href="#delegation"
                              >{{ Object.keys(details)[0]}}</a>
                              <br />
                            </span>

                            <i
                              style="font-size: 14px;padding-left:38px"
                            >{{showDaysLeft(Object.values(details)[0]["deadline"])}}</i>
                          </td>
                          <td style="width:90px" class="taskbutton">
                            <i
                              class="fa fa-pencil-square-o"
                              aria-hidden="true"
                              style="font-size:15px"
                              v-b-modal.editModal
                              v-on:click="editTask(Object.values(details)[0],  Object.keys(details)[0])"
                            ></i>
                            <i
                              v-on:click="deleteTask(Object.values(details)[0]['TaskID'])"
                              class="fa fa-trash"
                              aria-hidden="true"
                              style="padding-left:40px;color:rgb(136, 43, 43)"
                            ></i>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </card>
            <!-- Task Edit Modal-->
            <b-modal id="editModal" ref="modal" title="Edit Task" @ok="submitEdit()">
              <form ref="form">
                <b-form-group label="Due Date">
                  <b-form-datepicker v-model="editDate" :min="new Date()" locale="en"></b-form-datepicker>
                </b-form-group>
                <b-form-group label="Task">
                  <b-form-input id="task-edit" v-model="editText"></b-form-input>
                </b-form-group>
              </form>
            </b-modal>
            <br />
            <!-- subtasks -->
            <div class="container" id="delegation">
              <card class="border-0" shadow body-classes="py-5">
                <div class="px-4">
                  <div class="row justify-content-center">
                    <h4>
                      <span
                        class="text-primary text-uppercase"
                        style="padding-right:20px"
                      >Delegate Sub-Tasks</span>
                      <b-button style="font-size:15px" v-b-modal.subTaskModal>Add Sub-Task</b-button>
                    </h4>

                    <span>
                      <b-modal
                        id="subTaskModal"
                        ref="modal"
                        title="Add New Sub-Task"
                        @ok="submitSubTask"
                      >
                        <form ref="form">
                          <b-form-group label="Module" style="width:fit-content">
                            <b-form-select v-model="selectedModule" class="mb-3">
                              <b-form-select-option value="All Modules">Select a Module</b-form-select-option>
                              <b-form-select-option
                                v-for="(items,module) in taskList"
                                v-bind:key="module"
                                :value="module"
                              >{{module}}</b-form-select-option>
                            </b-form-select>
                          </b-form-group>
                          <b-form-group
                            label="Task"
                            style="width:fit-content;padding-right:45px;float:left"
                          >
                            <b-form-select v-model="selectedTask" class="mb-3">
                              <b-form-select-option value="All Tasks">Select a Task</b-form-select-option>
                              <b-form-select-option
                                v-for="(details, task) in getTasks()"
                                v-bind:key="details.id"
                                :value="task"
                              >{{task}}</b-form-select-option>
                            </b-form-select>
                          </b-form-group>
                          <b-form-group
                            style="width:fit-content;float:center"
                            label="Member in Charge"
                          >
                            <b-form-select v-model="selectedMember" class="mb-3">
                              <b-form-select-option value="All Members">Select a Member</b-form-select-option>
                              <b-form-select-option
                                v-for="(member, key) in fetchMembers()"
                                v-bind:key="key"
                                :value="member"
                              >{{member}}</b-form-select-option>
                            </b-form-select>
                          </b-form-group>
                          <b-form-group label="Sub-Task Title" style="width:400px">
                            <b-form-input id="subTask-input" v-model="inputSubtask"></b-form-input>
                          </b-form-group>
                        </form>
                      </b-modal>
                    </span>
                    <div class="container" style="padding:20px">
                      <div class="row justify-content-center">
                        <select v-model="selectedMember">
                          <option>All Members</option>
                          <option v-for="members in fetchMembers()" v-bind:key="members">{{members}}</option>
                        </select>
                        <span style="padding-left:25px">
                          <select v-model="selectedTask">
                            <option>All Tasks</option>
                            <option
                              v-for="(details, task) in getTasks()"
                              v-bind:key="details.id"
                            >{{task}}</option>
                          </select>
                        </span>
                      </div>
                    </div>
                    <div>
                      <table style="width:800px">
                        <thead>
                          <tr>
                            <th>Member</th>
                            <th>Sub-Tasks</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(details, member) in fetchSubTasks()" v-bind:key="member">
                            <td style="width:100px">{{member}}</td>

                            <td>
                              <table style="width:700px">
                                <tr
                                  class="tab"
                                  v-for="(list, subtask) in details"
                                  v-bind:key="subtask"
                                >
                                  <td>
                                    <i
                                      v-on:click="toggleSubTask(list.subTaskID)"
                                      v-show="list.completed == false"
                                      class="fa fa-circle-thin"
                                      style="color:rgb(170, 169, 169);vertical-align: middle;padding-right:15px"
                                    ></i>
                                    <i
                                      class="fa fa-check-circle"
                                      style="color:rgb(129, 194, 129);vertical-align: middle;padding-right:15px"
                                      v-show="list.completed"
                                      v-on:click="toggleSubTask(list.subTaskID)"
                                    ></i>
                                    <span
                                      :class="{todoDone:list.completed}"
                                      v-on:click="chooseSubTask(subtask)"
                                    >
                                      <a
                                        style="color:gray;padding-left:10px"
                                        href="#comments"
                                      >{{subtask}}</a>
                                    </span>
                                  </td>
                                  <td style="width:90px" class="taskbutton">
                                    <i
                                      class="fa fa-pencil-square-o"
                                      aria-hidden="true"
                                      style="font-size:15px"
                                      v-b-modal.editSubModal
                                      v-on:click="editSubTask(details, subtask)"
                                    ></i>
                                    <i
                                      v-on:click="deleteSubTask(list.subTaskID)"
                                      class="fa fa-trash"
                                      aria-hidden="true"
                                      style="padding-left:40px;width:10px;color:rgb(136, 43, 43);font-size:16px"
                                    ></i>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </card>
            </div>
            <!-- Task Edit Modal-->
            <b-modal id="editSubModal" ref="modal" title="Edit Sub-Task" @ok="submitSubEdit()">
              <form ref="form">
                <b-form-group style="width:fit-content;float:center" label="Member in Charge">
                  <b-form-select v-model="editMember" class="mb-3">
                    <b-form-select-option value="All Members">Select a Member</b-form-select-option>
                    <b-form-select-option
                      v-for="(member, key) in fetchMembers()"
                      v-bind:key="key"
                      :value="member"
                    >{{member}}</b-form-select-option>
                  </b-form-select>
                </b-form-group>
                <b-form-group label="Sub-Task">
                  <b-form-input id="subtask-edit" v-model="editSubText"></b-form-input>
                </b-form-group>
              </form>
            </b-modal>
            <br />
            <!--Comments -->
            <div class="container">
              <card class="border-0" shadow body-classes="py-5">
                <div class="px-4">
                  <div class="container">
                    <div class="row justify-content-center">
                      <h4>
                        <span
                          class="text-primary text-uppercase"
                          style="padding-right:20px"
                        >Comments</span>
                        <b-button style="font-size:15px" v-b-modal.commentModal>Add Comment</b-button>
                      </h4>

                      <b-modal
                        id="commentModal"
                        ref="modal"
                        title="Add New Comment"
                        @ok="submitComment"
                      >
                        <form ref="form">
                          <b-form-group label="Sub-Task">
                            <b-form-select v-model="selectedSubtask" class="mb-3">
                              <b-form-select-option value="All Sub-Tasks">Select a Sub-Task</b-form-select-option>
                              <b-form-select-option
                                v-for="(details, subTask) in getSubTasks()"
                                v-bind:key="details.subTaskID"
                                :value="subTask"
                              >{{subTask}}</b-form-select-option>
                            </b-form-select>
                          </b-form-group>
                          <b-form-group label="Comment">
                            <b-form-input id="comment-input" v-model="inputComment"></b-form-input>
                          </b-form-group>
                        </form>
                      </b-modal>
                    </div>
                    <div class="row justify-content-center" style="padding:20px">
                      <select v-model="selectedSubtask">
                        <option>All Sub-Tasks</option>
                        <option
                          v-for="(details, subtask) in getSubTasks()"
                          v-bind:key="details.subTaskID"
                        >{{subtask}}</option>
                      </select>
                    </div>

                    <div class="row justify-content-center">
                      <table style="width:800px">
                        <thead>
                          <tr>
                            <th style>Sub-Task</th>
                            <th>Comments</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(list, subtask) in fetchComments()" v-bind:key="subtask">
                            <td style="width:200px">{{subtask}}</td>
                            <td>
                              <table style="width:600px">
                                <tr
                                  class="tab"
                                  v-for="commentid in Object.keys(list['comments'])  "
                                  v-bind:key="commentid"
                                >
                                  <td>{{list['comments'][commentid] }}</td>
                                  <td style="width:90px" class="taskbutton">
                                    <i
                                      v-on:click="deleteComment(commentid)"
                                      class="fa fa-trash"
                                      aria-hidden="true"
                                      style="padding-left:40px;color:rgb(136, 43, 43)"
                                    ></i>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </card>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</div>
</template>


<script>
import firebase from "firebase";
import "firebase/firestore";
import database from "../firebase.js";
export default {
  data() {
    return {
      hover: false,
      user: "",
      groups: {},
      taskList: {},
      subtaskID: "",
      editMember: "",
      taskID: "",
      editDate: "",
      editText: "",
      oldSubEdit: "",
      editSubText: "",
      //Inputting
      inputTask: "",
      inputSubtask: "",
      inputComment: "",
      deadline: new Date(),
      selectedMember: "All Members",
      selectedModule: "All Modules",
      selectedTask: "All Tasks",
      selectedSubtask: "All Sub-Tasks"
    };
  },
  components: {},
  computed: {
    displayTasks: function() {
      let myTasks = [];
      for (let module in this.filterByModule) {
        for (let task in this.taskList[module]) {
          myTasks.push({
            [task]: this.taskList[module][task]
          });
        }
      }
      myTasks = myTasks.sort((a, b) => {
        if (
          Object.values(b)[0]["completed"] &&
          !Object.values(a)[0]["completed"]
        ) {
          return -1;
        } else if (
          Object.values(a)[0]["completed"] &&
          !Object.values(b)[0]["completed"]
        ) {
          return 1;
        } else {
          if (
            Object.values(a)[0]["deadline"].toDate() <
            Object.values(b)[0]["deadline"].toDate()
          ) {
            return -1;
          } else {
            return 1;
          }
        }
      });
      return myTasks;
    },

    // Filter tasks by module selected
    filterByModule: function() {
      let filteredMods = [];
      for (let module in this.taskList) {
        if (
          this.selectedModule != "All Modules" &&
          !(this.selectedModule == module)
        ) {
          continue;
        }
        filteredMods[module] = this.taskList[module];
      }
      return filteredMods;
    }
  },

  methods: {
    getSubTasks: function() {
      let workload = this.fetchSubTasks();
      let subtasks = {};
      for (let member in workload) {
        for (let subTask in workload[member]) {
          subtasks[subTask] = workload[member][subTask];
        }
      }
      return subtasks;
    },
    chooseSubTask: function(subtask) {
      this.selectedSubtask = subtask;
    },
    chooseTask: function(task) {
      this.selectedTask = task;
      let currModule = "";
      database
        .collection("Modules")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            for (let group in doc.data()) {
              if (group != "noGroup") {
                let assignments = doc.data()[group]["Assignments"];
                for (let assignment in assignments) {
                  if (assignment == task) {
                    currModule = doc.id;
                  }
                }
              }
            }
          });
          this.selectedModule = currModule;
        });
    },
    isTaskComplete: function(taskID) {
      let completed = false;
      database
        .collection("Modules")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            for (let group in doc.data()) {
              if (group != "noGroup") {
                let assignments = doc.data()[group]["Assignments"];
                for (let assignment in assignments) {
                  if (assignments[assignment]["TaskID"] == taskID) {
                    completed = !assignments[assignment]["completed"];
                  }
                }
              }
            }
          });

          return completed;
        });
    },
    toggleSubTask: function(subID) {
      database
        .collection("Modules")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            for (let group in doc.data()) {
              if (group != "noGroup") {
                let assignments = doc.data()[group]["Assignments"];
                for (let assignment in assignments) {
                  let subtasks = assignments[assignment]["subTasks"];
                  for (let subtask in subtasks) {
                    if (subtasks[subtask]["subTaskID"] == subID) {
                      database
                        .collection("Modules")
                        .doc(doc.id)
                        .update({
                          [group +
                          ".Assignments." +
                          assignment +
                          ".subTasks." +
                          subtask +
                          ".completed"]: !subtasks[subtask]["completed"]
                        });
                    }
                  }
                }
              }
            }
          });
        });
    },
    toggleTask: function(taskID) {
      database
        .collection("Modules")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            for (let group in doc.data()) {
              if (group != "noGroup") {
                let assignments = doc.data()[group]["Assignments"];
                for (let assignment in assignments) {
                  if (assignments[assignment]["TaskID"] == taskID) {
                    database
                      .collection("Modules")
                      .doc(doc.id)
                      .update({
                        [group +
                        ".Assignments." +
                        assignment +
                        ".completed"]: !assignments[assignment]["completed"]
                      });
                  }
                }
              }
            }
          });
        });
    },
    deleteComment: function(commentID) {
      let id = commentID;
      database
        .collection("Modules")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            for (let group in doc.data()) {
              if (group != "noGroup") {
                let assignments = doc.data()[group]["Assignments"];
                for (let assignment in assignments) {
                  let subtasks = assignments[assignment]["subTasks"];
                  for (let subtask in subtasks) {
                    for (let comment in subtasks[subtask]["comments"]) {
                      if (comment == id) {
                        database
                          .collection("Modules")
                          .doc(doc.id)
                          .update({
                            [group +
                            ".Assignments." +
                            assignment +
                            ".subTasks." +
                            subtask +
                            ".comments." +
                            id]: firebase.firestore.FieldValue.delete()
                          });
                      }
                    }
                  }
                }
              }
            }
          });
        });
    },
    deleteSubTask: function(subTaskID) {
      let id = subTaskID;
      database
        .collection("Modules")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            for (let group in doc.data()) {
              if (group != "noGroup") {
                let assignments = doc.data()[group]["Assignments"];
                for (let assignment in assignments) {
                  let subtasks = assignments[assignment]["subTasks"];
                  for (let subtask in subtasks) {
                    if (subtasks[subtask]["subTaskID"] == id) {
                      database
                        .collection("Modules")
                        .doc(doc.id)
                        .update({
                          [group +
                          ".Assignments." +
                          assignment +
                          ".subTasks." +
                          subtask]: firebase.firestore.FieldValue.delete()
                        });
                    }
                  }
                }
              }
            }
          });
        });
    },
    deleteTask: function(taskID) {
      database
        .collection("Modules")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            for (let group in doc.data()) {
              if (group != "noGroup") {
                let assignments = doc.data()[group]["Assignments"];
                for (let assignment in assignments) {
                  if (assignments[assignment]["TaskID"] == taskID) {
                    database
                      .collection("Modules")
                      .doc(doc.id)
                      .update({
                        [group +
                        ".Assignments." +
                        assignment]: firebase.firestore.FieldValue.delete()
                      });
                  }
                }
              }
            }
          });
        });
    },
    submitSubEdit: function() {
      let newSub = this.editSubText;
      let member = this.editMember;
      let id = this.subtaskID;
      if (newSub == "") {
        alert("Please enter the sub-task title");
      } else if (member == "All Members") {
        alert("Please choose the member in charge");
      } else {
        database
          .collection("Modules")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              for (let group in doc.data()) {
                if (group != "noGroup") {
                  let assignments = doc.data()[group]["Assignments"];
                  for (let assignment in assignments) {
                    let subtasks = assignments[assignment]["subTasks"];
                    for (let subtask in subtasks) {
                      if (subtasks[subtask]["subTaskID"] == id) {
                        database
                          .collection("Modules")
                          .doc(doc.id)
                          .update({
                            [group +
                            ".Assignments." +
                            assignment +
                            ".subTasks." +
                            subtask]: firebase.firestore.FieldValue.delete(),
                            [group +
                            ".Assignments." +
                            assignment +
                            ".subTasks." +
                            newSub]: subtasks[subtask],

                            [group +
                            ".Assignments." +
                            assignment +
                            ".subTasks." +
                            newSub +
                            ".member"]: member
                          });
                      }
                    }
                  }
                }
              }
            });
          });
        this.selectedSubtask = newSub;
      }
    },
    submitEdit: function() {
      let newTask = this.editText;
      let dueDate = new Date(this.editDate);
      let id = this.taskID;

      if (newTask == "") {
        alert("Please enter the task name");
      } else {
        database
          .collection("Modules")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              for (let group in doc.data()) {
                if (group != "NoGroup") {
                  let assignments = doc.data()[group]["Assignments"];
                  for (let assignment in assignments) {
                    let copy = assignments[assignment];
                    if (assignments[assignment]["TaskID"] == id) {
                      database
                        .collection("Modules")
                        .doc(doc.id)
                        .update({
                          [group +
                          ".Assignments." +
                          assignment]: firebase.firestore.FieldValue.delete(),
                          [group + ".Assignments." + newTask]: copy,

                          [group +
                          ".Assignments." +
                          newTask +
                          ".deadline"]: new firebase.firestore.Timestamp(
                            dueDate.getTime() / 1000,
                            0
                          )
                        });
                      this.selectedTask = newTask;
                    }
                  }
                }
              }
            });
          });
      }
    },
    editSubTask: function(details, subtask) {
      this.editSubText = subtask;
      this.editMember = details[subtask]["member"];
      this.subtaskID = details[subtask]["subTaskID"];
    },
    editTask: function(details, task) {
      this.editText = task;
      this.editDate = details["deadline"].toDate();
      this.taskID = details["TaskID"];
    },
    showDaysLeft: function(timestamp) {
      let date = timestamp.toDate();
      let diff = Math.ceil((date - new Date()) / (86400 * 1000));
      if (diff >= 0) {
        return "Due in " + diff + " days";
      } else {
        return "Due " + Math.abs(diff) + " days ago";
      }
    },
    fetchDate: function(timestamp) {
      let months = {
        "0": "Jan",
        "1": "Feb",
        "2": "Mar",
        "3": "Apr",
        "4": "May",
        "5": "Jun",
        "6": "Jul",
        "7": "Aug",
        "8": "Sep",
        "9": "Oct",
        "10": "Nov",
        "11": "Dec"
      };
      let date = timestamp.toDate();

      return (
        date.getDate() +
        "-" +
        months[date.getMonth()] +
        "-" +
        date.getFullYear()
      );
    },
    getTasks: function() {
      let myTasks = {};
      for (let module in this.filterByModule) {
        for (let task in this.taskList[module]) {
          myTasks[task] = {
            id: this.taskList[module][task]["TaskID"],
            date: this.taskList[module][task]["deadline"],
            completed: this.taskList[module][task]["completed"]
          };
        }
      }
      return myTasks;
    },
    submitComment: function() {
      let currSub = this.selectedSubtask;
      let currTask = "";
      let currModule = "";
      let currComment = this.inputComment;
      let commentID = this.generatePushID();

      if (currSub == "All Sub-Tasks") {
        alert("Please choose the relevant sub-task");
      } else {
        // find current task
        for (let module in this.taskList) {
          let assignments = this.taskList[module];
          for (let assignment in assignments) {
            let subtasks = assignments[assignment]["subTasks"];
            for (let subtask in subtasks) {
              if (subtask == this.selectedSubtask) {
                currModule = module;
                currTask = assignment;
              }
            }
          }
        }
        let group = this.groups["groupName"][currModule];
        database
          .collection("Modules")
          .doc(currModule)
          .update({
            [group +
            ".Assignments." +
            currTask +
            ".subTasks." +
            currSub +
            ".comments." +
            commentID]: currComment
          });

        this.inputComment = "";
      }
    },
    submitSubTask: function() {
      let currModule = this.selectedModule;
      let currTask = this.selectedTask;
      let newSubTask = this.inputSubtask;
      let currMember = this.selectedMember;
      let group = this.groups["groupName"][currModule];
      if (this.selectedModule == "") {
        alert("Please choose the relevant module");
      } else if (this.selectedTask == "") {
        alert("Please choose the relevant task");
      } else if (this.inputSubtask == "") {
        alert("Please enter the sub-task title");
      } else {
        database
          .collection("Modules")
          .doc(currModule)
          .update({
            [group + ".Assignments." + currTask + ".subTasks." + newSubTask]: {
              member: currMember,
              subTaskID: this.generatePushID(),
              completed: false,
              date: new Date(),
              comments: {}
            }
          });
        this.inputSubtask = "";
      }
    },
    submitTask: function() {
      let currModule = this.selectedModule;
      let newTask = this.inputTask;
      let dueDate = this.deadline;
      let group = this.groups["groupName"][currModule];

      if (this.selectedModule == "All Modules") {
        alert("Please choose the relevant module");
      } else if (this.inputTask == "") {
        alert("Please enter the task name");
      } else {
        database
          .collection("Modules")
          .doc(currModule)
          .update({
            [group + ".Assignments." + newTask]: {
              subTasks: {},
              TaskID: this.generatePushID(),
              completed: false,
              deadline: new firebase.firestore.Timestamp(
                dueDate.getTime() / 1000,
                0
              )
            }
          });
      }

      /* {
                    projList[groups]["Assignments"]["new Assignment"] = "temp";

                    database
                      .collection("Modules")
                      .doc(module.id)
                      .set(projList);
                  } */

      /* if (groups == "GroupTest") {
                    database
                      .collection("Modules")
                      .doc(module.id)
                      .update({
                        "Group 1": module.data()["GroupTest"],
                        GroupTest: firebase.firestore.FieldValue.delete()
                      });

                  }*/

      this.deadline = new Date();

      this.inputTask = "";
    },
    fetchComments: function() {
      let workload = this.fetchSubTasks();
      let comments = {};
      for (let member in workload) {
        for (let subTask in workload[member]) {
          if (
            this.selectedSubtask != "All Sub-Tasks" &&
            this.selectedSubtask != subTask
          ) {
            continue;
          }
          comments[subTask] = workload[member][subTask];
        }
      }
      return comments;
    },
    fetchSubTasks: function() {
      let subTasks = {};
      for (let module in this.filterByModule) {
        for (let task in this.taskList[module]) {
          if (this.selectedTask != "All Tasks" && this.selectedTask != task) {
            continue;
          }
          let list = this.taskList[module][task]["subTasks"];
          for (let subtask in list) {
            if (
              this.selectedMember != "All Members" &&
              this.selectedMember != list[subtask].member
            ) {
              continue;
            }
            let currMember = list[subtask].member;
            if (!(currMember in subTasks)) {
              subTasks[currMember] = {};
            }
            subTasks[currMember][subtask] = list[subtask];
          }
        }
      }

      return subTasks;
    },
    fetchMembers: function() {
      let members = [];
      for (let module in this.groups["members"]) {
        if (
          this.selectedModule != "All Modules" &&
          this.selectedModule != module
        ) {
          continue;
        }
        for (let member of this.groups["members"][module]) {
          if (members.includes(member)) {
            continue;
          }
          members.push(member);
        }
      }
      return members;
    },

    fetchTasks: function() {
      var user = firebase.auth().currentUser;
      var emailVerified = user.email;
      var tempName = "";

      database.collection("User Info").onSnapshot(users => {
        users.forEach(function(currUser) {
          if (currUser.id == emailVerified) {
            tempName = currUser.data()["Name"];
          }
        });
        let currUser = tempName;

        database.collection("Modules").onSnapshot(myModules => {
          let tasks = {};
          let myGroups = { members: {}, groupName: {} };
          myModules.forEach(function(module) {
            //console.log(Object.keys(module.data()));
            for (let groups of Object.keys(module.data())) {
              if (groups == "NoGroup") {
                //groups = group name
                continue;
              }

              if (!module.data()[groups]["Group Members"].includes(currUser)) {
                //filter to show only user's groups
                continue;
              }

              myGroups["members"][module.id] = module.data()[groups][
                "Group Members"
              ];
              myGroups["groupName"][module.id] = groups;

              tasks[module.id] = module.data()[groups]["Assignments"];
            }
          });

          this.taskList = tasks;
          this.groups = myGroups;
        });
      });
    },
    //* random id generator based on timestamp, referenced from https://gist.github.com/mikelehen/3596a30bd69384624c11*//
    generatePushID: function() {
      // Modeled after base64 web-safe chars, but ordered by ASCII.
      var PUSH_CHARS =
        "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";

      // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
      var lastPushTime = 0;

      // We generate 72-bits of randomness which get turned into 12 characters and appended to the
      // timestamp to prevent collisions with other clients.  We store the last characters we
      // generated because in the event of a collision, we'll use those same characters except
      // "incremented" by one.
      var lastRandChars = [];

      var now = new Date().getTime();
      var duplicateTime = now === lastPushTime;
      lastPushTime = now;

      var timeStampChars = new Array(8);
      for (var i = 7; i >= 0; i--) {
        timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
        // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
        now = Math.floor(now / 64);
      }
      if (now !== 0)
        throw new Error("We should have converted the entire timestamp.");

      var id = timeStampChars.join("");

      if (!duplicateTime) {
        for (i = 0; i < 12; i++) {
          lastRandChars[i] = Math.floor(Math.random() * 64);
        }
      } else {
        // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
        for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
          lastRandChars[i] = 0;
        }
        lastRandChars[i]++;
      }
      for (i = 0; i < 12; i++) {
        id += PUSH_CHARS.charAt(lastRandChars[i]);
      }
      if (id.length != 20) throw new Error("Length should be 20.");

      return id;
    }
  },
  created() {
    this.fetchTasks();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
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
  width: fit-content;
}

h1 {
  color: ivory;
}
h2 {
  text-align: center;
}
#itemsList {
  width: 100%;
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 5px;
  box-sizing: border-box;
}
img {
  width: 100px;
  height: 100px;
}
.container {
  max-width: 1300px;
}
a {
  font-family: "Poppins", sans-serif;
  color: #1a1a1a;
}

/* Remove margins and padding from the list */

/** line **/
.timeline:before {
  content: "";
  background-color: rgb(255, 2, 99);
  position: absolute;
  left: 125px;
  bottom: 0px;
  top: 0px;
  width: 4px;
}

/** circle **/
.timeline:after {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  right: -17px;
  background-color: white;
  border: 4px solid rgb(255, 2, 99);
  top: 20px;
  left: 119.5px;
  bottom: 20px;
  border-radius: 50%;
}
th {
  font-size: 20px;
  text-align: left;
  padding: 10px;
  color: #888;
}

td {
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  position: relative;
  padding: 5px 10px 5px 10px;
  width: 500px;
  font-size: 18px;
  transition: 0.2s;
}

ul.ba {
  list-style-type: none;
}

.taskbutton {
  padding: 10px;
  background: #f8f8ff;
  color: #555;
  text-align: left;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 0;
  list-style-type: none;
}

.todoDone {
  color: #c0c0c0;
  text-decoration: line-through;
}

.datebutton {
  width: 150px;
  background: #f8f8ff;
  font-size: 14px;
}
.tab {
  border: none;
  background-color: #f8f8ff;
  font-family: "Poppins", sans-serif;
  font-size: 24px;
}

.tab:hover {
  background-color: #e0ffff;
}
</style>
