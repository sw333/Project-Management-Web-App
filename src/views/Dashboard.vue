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
              <div id="main">
                <div id="chart">
                  <BarChart></BarChart>
                </div>
                <div id="chart">
                  <LineChart></LineChart>
                </div>
                <div id="chart">
                  <Doughnut></Doughnut>
                </div>
              </div>
            </card>
          </div>
    </section>
  </div>
</template>

<script>
</script>

<style scoped>
#main {
  content: "";
  display: table;
  clear: both;
  margin: auto;
}
#chart {
  height:350px;
  width:335px;
  border-style: solid;
  border-color: #c9cbcf;
  border-width: 1px;
  padding: 30px;
  float: left;
}
</style>