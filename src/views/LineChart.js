import { Line } from 'vue-chartjs'
import database from '../firebase.js'
import firebase from "firebase";

export default {

  extends: Line,
  data: function () {
    return {
      taskList: "",
      groups: "",
      datacollection: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: []
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
      }
    }
  },

  methods: {
    getColor: function () {
      // let colors = ["#C9CBCF", "#9966FE", "#36A2EB", "#4BC0C0", "#FFC134", "#FF6383"];
      let colors = ["#fc1c03", "#fcba03", "#fcd303", "#2dfc03", "#0380fc", "#ce03fc", "#fc039d", "#fc0341"]
      let randomNumber = Math.round(Math.random() * 5);
      return colors[randomNumber];
    },

    fetchTasks: function () {
      var user = firebase.auth().currentUser;
      var emailVerified = user.email;
      var tempName = "";
      let time = {};

      database.collection("User Info").onSnapshot(users => {
        users.forEach(function (currUser) {
          if (currUser.id == emailVerified) {
            tempName = currUser.data()["Name"];
          }
        });
        let currUser = tempName;

        database.collection("Modules").onSnapshot(myModules => {
          let tasks = {};
          let myGroups = { members: {}, groupName: {} };
          myModules.forEach(function (module) {
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

          let selectedModule = "";
          let month = "";
          let num = "";
          for (let module in tasks) {
            selectedModule = module;
            let taskArray = [];
            for (let task in tasks[selectedModule]) {
              month = tasks[selectedModule][task]["deadline"].toDate().getMonth();
              if (tasks[selectedModule][task]["completed"] == true) {
                if (month in time) {
                  num = time[month];
                  time[month] = num + 1;
                } else {
                  time[month] = 1;
                }
              }
            }
            for (month in time) {
              taskArray[month] = time[month];
            }
            this.datacollection.datasets.push({ data: taskArray, label: selectedModule, borderColor: this.getColor(), fill: false })
          }
          this.renderChart(this.datacollection, this.options)
        });
      });
    }
  },
  created() {
    this.fetchTasks()
  }
}