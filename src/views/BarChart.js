import { Bar } from 'vue-chartjs'
import database from '../firebase.js'
import firebase from "firebase"

export default {
  extends: Bar,
  data: function () {
    return {
      taskList: "",
      groups: "",
      datacollection: {
        labels: [],
        datasets: [{
          label: "Number of Tasks",
          data: [],
          backgroundColor: ["#F4F5F5", "#EBE0FF", "#DAECFC", "#DDF3F2", "#FFF3DA", "#FFE1E6"]
        }]
      },
      options: {
        scales: {
          xAxes: [{
            barPercentage: 0.4
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        //responsive: true,
        //maintainAspectRatio: false
      }
    }
  },

  methods: {
    getMonth: function (monthNumber) {
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
      let month = months[monthNumber];
      return month;
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

          let month = "";
          let num = "";
          for (let module in tasks) {
            for (let task in tasks[module]) {
              month = tasks[module][task]["deadline"].toDate().getMonth();
              if (month in time) {
                num = time[month];
                time[month] = num + 1;
              } else {
                time[month] = 1;
              }
            }
          }

          let monthsArray = [];
          for (month in time) {
            monthsArray.push([month, time[month]]);
            monthsArray.sort();
          }

          for (let item of monthsArray) {
            if (!this.datacollection.labels.includes(item[0])) {
              this.datacollection.labels.push(this.getMonth(item[0]));
              console.log(this.datacollection.labels)
              this.datacollection.datasets[0].data.push(item[1]);
            }
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


