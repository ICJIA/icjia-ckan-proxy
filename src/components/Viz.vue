<template>
  <div class="hello">
    <a :href="$route.query.url">{{$route.query.url}}</a>
    <center>
      <div id="vizContainer"></div>
    </center>

  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    mounted() {
      console.log(this.$route.query.url)
      let url = this.$route.query.url
      let containerDiv = document.getElementById("vizContainer"),
        //url = "http://public.tableau.com/views/RegionalSampleWorkbook/Storms",
        options = {
          hideTabs: true,
          onFirstInteractive: function () {
            console.log("Run this code when the viz has finished loading.");
          }
        };

      // Create a viz object and embed it in the container div.
      var viz = new tableau.Viz(containerDiv, url, options);
    },
    data() {
      return {

      }
    }
  }
</script>


</style>