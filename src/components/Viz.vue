<template>
  <div class="hello">
    <!-- <a :href="$route.query.url">{{$route.query.url}}</a> -->
    <center>
      <div id="vizContainer"></div>
    </center>

  </div>
</template>

<script>
  function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
      hostname = url.split('/')[2];
    }
    else {
      hostname = url.split('/')[0];
    }
    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
    return hostname;
  }
  export default {
    name: 'HelloWorld',

    mounted() {
      console.log(this.$route.query.url)
      let url = this.$route.query.url
      let hostname = extractHostname(url)
      let arr = hostname.split('.')
      if (arr.length > 2) {
        //remove subdomnain
        arr.shift();
      }
      let domain = arr.join('.')
      // let whitelist = this.whitelist
      this.whitelist.forEach(h => {
        if (h === domain) this.isAllowed = true
      });

      (this.isAllowed) ? console.log(`${domain} is allowed.`) : console.log(`${domain} is not allowed.`)
      let containerDiv = document.getElementById("vizContainer")
      if (this.isAllowed) {
        //url = "http://public.tableau.com/views/RegionalSampleWorkbook/Storms",
        let options = {
          hideTabs: true,
          onFirstInteractive: function () {
            console.log("Run this code when the viz has finished loading.");
          }
        };

        // Create a viz object and embed it in the container div.
        var viz = new tableau.Viz(containerDiv, url, options);
      } else {
        containerDiv.innerHTML = `<div class="alert"><h1 class="error">Proxy Error:</h1>
        <h2>invalid domain: ${domain}</h2></div>`
      }
    },
    data() {
      return {
        whitelist: ['tableau.com', 'icjia.cloud', 'icjia.org', 'icjia.state.il.us'],
        isAllowed: false
      }
    }
  }
</script>

<style>
  .alert {

    padding: 15px;
    display: inline-block;
  }

  .error {
    color: red
  }
</style>