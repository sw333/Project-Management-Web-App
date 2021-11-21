import { Doughnut } from 'vue-chartjs'
import database from '../firebase.js'
import firebase from "firebase"

export default {
    extends: Doughnut,
    data: function () {
        return {
            taskList: "",
            groups: "",
            datacollection: {
                labels: [],
                datasets: []
                //  light ["#F4F5F5","#EBE0FF", "#DAECFC", "#DDF3F2", "#FFF3DA", "#FFE1E6"]
                //  dark ["#C9CBCF", "#9966FE", "#36A2EB", "#4BC0C0", "#FFC134", "#FF6383"]
            },
            options: {
                cutoutPercentage: 50,
                // responsive: true,
                // maintainAspectRatio: false
            }
        }
    },
    methods: {
        fetchTasks: function () {
            var user = firebase.auth().currentUser;
            var emailVerified = user.email;
            var tempName = "";

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
                    let member = "";
                    let num = "";
                    let length = 0;
                    let previous = 0;
                    for (let module in tasks) {
                        selectedModule = module;
                        let taskArray = [];
                        let membercontribution = {};
                        for (let task in tasks[module]) {
                            for (let assignment in tasks[module][task]) {
                                if (assignment == "subTasks") {
                                    for (let subTask in tasks[module][task][assignment]) {
                                        member = tasks[module][task][assignment][subTask]["member"];
                                        if (member in membercontribution) {
                                            num = membercontribution[member];
                                            membercontribution[member] = num + 1;
                                        } else {
                                            membercontribution[member] = 1;
                                        }
                                    }
                                }
                            }
                        }
                        for (member in membercontribution) {
                            this.datacollection.labels.push(member);
                        }
                        for (var i = length; i < (Object.keys(membercontribution).length + length); i++) {
                            taskArray[i] = membercontribution[member];
                        }
                        previous = Object.keys(taskArray).length;
                        length = length + previous;
                        this.datacollection.datasets.push({ data: taskArray, label: selectedModule, backgroundColor: ["#DAECFC", "#DDF3F2", "#F4F5F5", "#EBE0FF", "#FFF3DA", "#FFE1E6"] });
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


