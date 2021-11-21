<template>
  <div>
    <!-- Post Details Content Area -->
    <div>
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

      <section class="post-details-area">
        <!-- select module section-->

        <section class="section section-skew">
          <div class="container">
            <card shadow class="card-profile mt--300" no-body>
              <div class="px-4">
                <!-- Comment Area Start -->

                <section class="post-details-area">
                  <!-- select module section-->
                  <div style="text-align: center;">
                    <br />
                    <base-alert type="primary">
                      <h3 class="text-secondary">
                        Welcome to Forum
                        <br />
                        <h5>
                          <small>You can post anything here regarding the modules!</small>
                        </h5>
                      </h3>

                      <b-form-select v-model="selectedModule" class="mb-3">
                        <b-form-select-option value="All Modules">Select a Module</b-form-select-option>
                        <b-form-select-option
                          v-for="module in displaymodules()"
                          v-bind:key="module"
                          :value="module"
                        >{{module}}</b-form-select-option>
                      </b-form-select>

                      <base-button type="secondary" v-b-modal.newpostmodal>Make a new post</base-button>
                      <b-modal id="newpostmodal" ref="modal" title="Add a new post" @ok="addpost">
                        <form>
                          <div>
                            <textarea
                              id="postsection"
                              class="form-control"
                              type="text"
                              v-model="inputpost"
                              placeholder="post here!"
                              cols="20"
                              rows="10"
                            />
                          </div>
                        </form>
                      </b-modal>
                    </base-alert>
                  </div>

                  <div class="container" id="app">
                    <div style="position: relative">
                      <!-- <b-list-group> -->
                      <b-card>
                        <b-media
                          variant="primary"
                          class="single_comment_area"
                          v-for="post of displayposts()"
                          v-bind:key="post"
                        >
                          <template v-slot:aside>
                            <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
                          </template>
                          <div class="comment-content d-flex">
                            <div class="comment-meta">
                              <h5 class="mt-0">{{post.username}}</h5>
                              <a href="#" class="comment-date">{{fetchDate(post.date)}}</a>
                              <p>{{post.content}}</p>

                              <base-button
                                size="sm"
                                outline
                                type="primary"
                                v-b-modal.replypostmodal
                                v-on:click="updatepost(post.id)"
                              >Reply to this post</base-button>
                              <base-button
                                size="sm"
                                outline
                                type="warning"
                                class="like"
                                v-on:click="deletepost(post.id)"
                                v-show="post.email==currentuser"
                              >Delete</base-button>
                            </div>

                            <span>
                              <b-modal
                                id="replypostmodal"
                                ref="modal"
                                title="Add your comment"
                                @ok="addcomment(post.id)"
                              >
                                <b-form-input id="post.id" v-model="inputcomment"></b-form-input>
                              </b-modal>
                            </span>
                          </div>
                          <br />
                          <b-card v-show="displaycomments(post.id).length > 0" class="children">
                            <b-media
                              variant="secondary"
                              v-for="comment of displaycomments(post.id)"
                              v-bind:key="comment"
                            >
                              <div class="comment-content border-bottom my-2">
                                <!-- Comment Meta -->
                                <div class="comment-meta my-3">
                                  <h5>{{comment.username}}</h5>
                                  <a href="#" class="comment-date">{{fetchDate(comment.date)}}</a>
                                  <p>{{comment.content}}</p>
                                  <div class="d-flex align-items-center">
                                    <base-button
                                      size="sm"
                                      outline
                                      type="primary"
                                      v-b-modal.replycommentmodal
                                      v-on:click="updatepost(post.id)"
                                    >Reply to this comment</base-button>
                                    <base-button
                                      size="sm"
                                      outline
                                      type="warning"
                                      v-on:click="deletecomment(comment.id)"
                                      v-show="comment.email==currentuser"
                                    >Delete</base-button>
                                  </div>
                                </div>
                                <span>
                                  <b-modal
                                    id="replycommentmodal"
                                    ref="modal"
                                    title="Add your comment"
                                    @ok="addcomment(post.id)"
                                  >
                                    <b-form-input id="comment.id" v-model="inputcomment"></b-form-input>
                                  </b-modal>
                                </span>
                              </div>
                            </b-media>
                          </b-card>
                          <br />
                        </b-media>
                      </b-card>
                    </div>
                  </div>
                </section>
              </div>
            </card>
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
import { connect } from "tls";
import { constants } from "zlib";
export default {
  name: "home",
  data() {
    return {
      currentuser: "",
      username: "",
      selectedModule: "All Modules",
      //previouspost: 0,
      inputpost: "",
      showing: [],
      inputcomment: "",
      allmodules: [], //updated by getModules()
      //groupcounter:2, //whenever a new post is started, groupcounter increases by 1
      //idcounter: 4, //keep track of the latest comment id
      idcounters: {},
      allposts: {},
      allcomments: {},
      selectedpost: 0
    };
  },
  methods: {
    displaymodules: function() {
      return this.allmodules;
    },

    displayposts: function() {
      console.log(this.selectedModule);

      let postlist = [];
      for (let postid in this.allposts[this.selectedModule]) {
        //adding in the value of posts under this selected module to a list
        postlist.push(this.allposts[this.selectedModule][postid]);
      }

      //function to sort by time
      let sortingmethod = function(a, b) {
        //console.log(b.date - a.date);
        return b.date - a.date;
      };
      return postlist.sort(sortingmethod);
    },

    updatepost: function(post) {
      console.log(post);
      this.selectedpost = post;
    },

    displaycomments: function(post) {
      console.log("under displaycomments");
      //console.log(post);
      console.log(this.allcomments[post]);
      let commentlist = [];
      for (let commentid in this.allcomments[this.selectedModule][post]) {
        commentlist.push(
          this.allcomments[this.selectedModule][post][commentid]
        );
      }

      //function to sort by time
      let sortingmethod = function(a, b) {
        //console.log(b.date - a.date);
        return a.date - b.date;
      };
      return commentlist.sort(sortingmethod);
    },

    // to fetch all the necessary data from 2 collections user info and forums
    getModules: function() {
      let mods = [];
      var curruser = firebase.auth().currentUser;
      var emailverified = curruser.email;
      console.log(this.currentuser);
      var tempname = "";
      database.collection("User Info").onSnapshot(allusers => {
        console.log(1);
        allusers.forEach(function(user) {
          if (emailverified != user.id) {
            return;
          }
          if (emailverified == user.id) {
            tempname = user.data()["Name"];
            console.log(tempname);
            for (let mod in user.data()["Current Modules"]) {
              console.log(mod);
              if (!mods.includes(mod)) {
                mods.push(mod);
                console.log("Added");
              }
            }
          }
        });
        this.username = tempname;
        this.allmodules = mods;
        console.log(this.allmodules);
        this.currentuser = emailverified;
      });

      let allpostsinfunction = {};
      let allcominfuntion = {};
      let allcounters = {};
      //let currmod = this.allmodules;
      //console.log(this.selectedModule);
      database.collection("Forums").onSnapshot(allmodules => {
        allmodules.forEach(function(module) {
          // if(currmod=="All Modules"){
          //   return;
          // }
          if (!mods.includes(module.id)) {
            //if this module is not taken by curruser, skip this loop and go to the next module
            return;
          }
          //add idcounter for every mod
          allcounters[module.id] = module.data()["idcounter"];
          //else add all posts under this module id
          allpostsinfunction[module.id] = module.data()["posts"];
          //retrieve all comments here
          allcominfuntion[module.id] = {};
          for (let post in allpostsinfunction[module.id]) {
            let postid = post;
            let comforeachpost = {};

            for (let subpost in module.data()["comments"]) {
              if (module.data()["comments"][subpost]["replyto"] == postid) {
                // console.log("subpost is");
                // console.log(subpost);
                comforeachpost[subpost] = module.data()["comments"][subpost];
                //console.log(comforeachpost);
              }
            }
            // console.log("post id is");
            // console.log(postid);
            allcominfuntion[module.id][postid] = comforeachpost;
            // console.log(allcominfuntion);
          }
        });
        this.allposts = allpostsinfunction;
        this.allcomments = allcominfuntion;
        this.idcounters = allcounters;
      });
    },

    addpost: function() {
      let currmod = this.selectedModule;
      let input = this.inputpost;
      let curruser = this.currentuser;
      let usern = this.username;
      if (this.selectedModule == "All Modules") {
        alert("Please choose the relevant module");
      } else if (this.inputpost == "") {
        alert("Please enter your post");
      } else {
        this.idcounters[this.selectedModule]++;
        let count = this.idcounters[this.selectedModule];
        this.allposts[this.selectedModule][count] = {
          content: input,
          date: new Date(),
          email: curruser,
          username: usern,
          id: count
        };
        let posts = this.allposts[this.selectedModule];
        console.log(this.allposts[this.selectedModule]);
        database
          .collection("Forums")
          .doc(currmod)
          .update({
            posts,
            idcounter: count
          })
          .then(() => {
            console.log("addpost done");
          });
      }
      this.inputpost = "";
    },

    addcomment: function() {
      //work for both reply button under a post and reply button under a comment because input is always the post id
      let currmod = this.selectedModule;
      let input = this.inputcomment;
      let curruser = this.currentuser;
      let post = this.selectedpost;
      let usern = this.username;
      console.log("post id here");
      console.log(post);
      if (this.selectedModule == "All Modules") {
        //will never reach here
        alert("Please choose the relevant module");
      } else if (input == "") {
        alert("Please enter your comment");
      } else {
        this.idcounters[this.selectedModule]++;
        let count = this.idcounters[this.selectedModule];

        console.log(count);
        this.allcomments[this.selectedModule][post][count] = {
          content: input,
          date: new Date(),
          email: curruser,
          username: usern,
          replyto: post,
          id: count
        };
        let comments = {};
        for (let postkey in this.allcomments[this.selectedModule]) {
          for (let comkey in this.allcomments[this.selectedModule][postkey]) {
            comments[comkey] = this.allcomments[this.selectedModule][postkey][
              comkey
            ];
          }
        }
        console.log("dictionary of comments to be added");
        console.log(comments);
        //let comments = this.allcomments[this.selectedModule][post];
        database
          .collection("Forums")
          .doc(currmod)
          .update({
            comments,
            idcounter: count
          })
          .then(() => {
            console.log("addcomment done");
          });
      }
      this.inputcomment = "";
    },

    deletepost: function(post) {
      //input is a post id
      let currmod = this.selectedModule;
      //delete post from allposts first
      delete this.allposts[this.selectedModule][post];
      //update database
      let posts = this.allposts[this.selectedModule];
      //console.log(this.allposts[this.selectedModule]);
      database
        .collection("Forums")
        .doc(currmod)
        .update({
          posts
        })
        .then(() => {
          console.log("delete post under deletepost done");
        });

      //then delete all comments under this post
      delete this.allcomments[this.selectedModule][post];
      //update database
      let comments = {};
      for (let postkey in this.allcomments[this.selectedModule]) {
        for (let comkey in this.allcomments[this.selectedModule][postkey]) {
          comments[comkey] = this.allcomments[this.selectedModule][postkey][
            comkey
          ];
        }
      }
      console.log(comments);
      database
        .collection("Forums")
        .doc(currmod)
        .update({
          comments
        })
        .then(() => {
          console.log("delete comment under deletpost done");
        });

      // database.collection("Forums")
      //         .get()
      //         .then(snapshot =>{
      //           snapshot.forEach(doc=>{
      //             if(doc.id == currmod){
      //               console.log("deleting for mod code");
      //               console.log(currmod);
      //               for(let p in doc.data()["posts"]){
      //                 if(p["id"]==post){
      //                   database.collection("Forums")
      //                           .doc(doc.id)["posts"]
      //                           .update({
      //                             [post]: firebase.firestore.FieldValue.delete()
      //                           });
      //                 }
      //               };

      //               //deleting the comments under this post
      //               for(let c in doc.data()["comments"]){
      //                 if(c["replyto"]==post){
      //                   let comid = c["id"];
      //                   database.collection("Forums")
      //                           .doc(doc.id)["comments"]
      //                           .update({
      //                             [comid]: firebase.firestore.FieldValue.delete()
      //                           });
      //                 }
      //               }
      //             }
      //           })
      //         });
    },

    deletecomment: function(comment) {
      //this is only taking in commentid, need to loop through because we dont know the postid
      let currmod = this.selectedModule;
      for (let postid in this.allcomments[this.selectedModule]) {
        for (let comid in this.allcomments[this.selectedModule][postid]) {
          if (comment == comid) {
            delete this.allcomments[this.selectedModule][postid][comid];
            break;
          }
        }
      }
      console.log("after deletion:");
      let comments = {};
      for (let postkey in this.allcomments[this.selectedModule]) {
        for (let comkey in this.allcomments[this.selectedModule][postkey]) {
          comments[comkey] = this.allcomments[this.selectedModule][postkey][
            comkey
          ];
        }
      }
      console.log(comments);
      database
        .collection("Forums")
        .doc(currmod)
        .update({
          comments
        })
        .then(() => {
          console.log("deletecomment done");
        });
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
      // hours as 2 digits (hh)
      var hours = ("0" + date.getHours()).slice(-2);

      // minutes as 2 digits (mm)
      var minutes = ("0" + date.getMinutes()).slice(-2);

      // seconds as 2 digits (ss)
      var seconds = ("0" + date.getSeconds()).slice(-2);

      return (
        date.getDate() +
        "-" +
        months[date.getMonth()] +
        "-" +
        date.getFullYear() +
        "  " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    }
  },
  created() {
    console.log("created ");
    this.getModules();
  }
};
</script>

<style scoped>
.post-details-content {
  position: relative;
  z-index: 1;
}
.post-details-content .post-meta {
  position: relative;
  z-index: 1;
  margin-bottom: 15px;
}
.post-details-content .post-meta a {
  position: relative;
  z-index: 1;
  display: inline-block;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ed3974;
}
.post-details-content .post-meta a:last-child {
  margin-left: 20px;
}
.post-details-content .post-meta a:last-child::after {
  content: "/";
  position: absolute;
  top: 0;
  left: -15px;
  z-index: 1;
}
.post-details-content .post-meta a:hover,
.post-details-content .post-meta a:focus {
  color: #404040;
}
.post-details-content .post-title {
  font-size: 24px;
  margin-bottom: 15px;
  display: block;
}
@media only screen and (max-width: 767px) {
  .post-details-content .post-title {
    font-size: 20px;
  }
}
.post-details-content .post-meta-2 {
  position: relative;
  z-index: 1;
  margin-bottom: 15px;
}
.post-details-content .post-meta-2 a {
  font-size: 14px;
  color: #777777;
  margin-right: 20px;
}
.post-details-content .post-meta-2 a:last-child {
  margin-right: 0;
}
.post-details-content .post-meta-2 a:hover,
.post-details-content .post-meta-2 a:focus {
  color: #ed3974;
}
.post-details-content ul {
  position: relative;
  z-index: 1;
}
.post-details-content ul li {
  color: #777777;
  margin-bottom: 10px;
}
.post-details-content ul li i {
  margin-right: 5px;
}

.comment_area {
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 50px;
}
.comment_area .comment-content .comment-author {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 70px;
  flex: 0 0 70px;
  min-width: 70px;
  margin-right: 20px;
  height: 70px;
  border-radius: 50%;
}
.comment_area .comment-content .comment-author img {
  border-radius: 50%;
}
@media only screen and (max-width: 767px) {
  .comment_area .comment-content .comment-author {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 40px;
    flex: 0 0 40px;
    min-width: 40px;
    margin-right: 10px;
    height: 40px;
  }
}
.comment_area .comment-content .comment-meta {
  margin-bottom: 30px;
}
.comment_area .comment-content .comment-meta .comment-date {
  font-size: 12px;
  color: #777777;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
}
.comment_area .comment-content .comment-meta h6 {
  margin-bottom: 10px;
}
.comment_area .comment-content .comment-meta p {
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 2;
}
.comment_area .comment-content .comment-meta .like,
.comment_area .comment-content .comment-meta .reply {
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
  height: 30px;
  padding: 0 20px;
  border: 2px solid #ebebeb;
  border-radius: 15px;
  line-height: 26px;
  text-align: center;
  margin-right: 15px;
}
.comment_area .comment-content .comment-meta .like:last-child,
.comment_area .comment-content .comment-meta .reply:last-child {
  margin-right: 0;
}
.comment_area .comment-content .comment-meta .like:hover,
.comment_area .comment-content .comment-meta .reply:hover {
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
}
@media only screen and (max-width: 767px) {
  .comment_area .comment-content .comment-meta .like,
  .comment_area .comment-content .comment-meta .reply {
    margin-right: 5px;
  }
}
.comment_area .single_comment_area {
  margin-bottom: 30px;
}
.comment_area .single_comment_area:last-of-type {
  margin-bottom: 0;
}
.comment_area .children .single_comment_area {
  margin-left: 50px;
  margin-top: 30px;
}
@media only screen and (max-width: 767px) {
  .comment_area .children .single_comment_area {
    margin-left: 15px;
  }
}
</style>

