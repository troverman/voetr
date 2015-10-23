angular.module('templates-app', ['about/index.tpl.html', 'committee/index.tpl.html', 'committees/index.tpl.html', 'header/index.tpl.html', 'home/index.tpl.html', 'intro/index.tpl.html', 'login/index.tpl.html', 'member/index.tpl.html', 'register/index.tpl.html', 'search/index.tpl.html']);

angular.module("about/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/index.tpl.html",
    "<style>\n" +
    "\n" +
    ".about-container{\n" +
    "	margin-left:15%;\n" +
    "	margin-right:15%;\n" +
    "	margin-top:5%;\n" +
    "}\n" +
    "\n" +
    ".img-fill {\n" +
    "  width: 100%;\n" +
    "  display: block;\n" +
    "  overflow: hidden;\n" +
    "  position: relative;\n" +
    "  text-align: center\n" +
    "}\n" +
    "\n" +
    ".img-fill img {\n" +
    "  height: 100%;\n" +
    "  min-width: 100%;\n" +
    "  position: relative;\n" +
    "  display: inline-block;\n" +
    "  max-width: none\n" +
    "}\n" +
    "\n" +
    ".heading-container{\n" +
    "  position:relative;\n" +
    "}\n" +
    "\n" +
    ".heading-container .img-fill {\n" +
    "  height: 100vh;\n" +
    "  background:#000;\n" +
    "}\n" +
    "\n" +
    ".heading-container .img-fill:before {\n" +
    "  content: '';\n" +
    "  display: block;\n" +
    "  width:100%;\n" +
    "  height:100%;\n" +
    "  top:0px;\n" +
    "  left:0px;\n" +
    "  z-index:2;\n" +
    "  background:rgba(0,0,0,.50);\n" +
    "  position: absolute;\n" +
    "}\n" +
    "\n" +
    ".heading-container .img-fill img{\n" +
    "	-webkit-filter: blur(3px);\n" +
    "}\n" +
    "\n" +
    ".heading-container .img-fill .info {\n" +
    "  position: absolute;\n" +
    "  top: 0px;\n" +
    "  left: 0px;\n" +
    "  width: 100%;\n" +
    "  z-index:3;\n" +
    "  top:30%;\n" +
    "  padding:0 20px;\n" +
    "}\n" +
    "\n" +
    ".heading-container .img-fill h3{\n" +
    "  font-family:Jura;\n" +
    "  color:#FFF;\n" +
    "  margin:auto;\n" +
    "  white-space:nowrap;\n" +
    "  //text-align:center;\n" +
    "  text-overflow:ellipsis;\n" +
    "  overflow:hidden;\n" +
    "}\n" +
    "\n" +
    ".heading-container .img-fill p{\n" +
    "  max-width:650px;\n" +
    "  //margin:auto;\n" +
    "  margin-top:15px;\n" +
    "  font-family:Jura;\n" +
    "  color:#FFF;\n" +
    "  text-align:justify;\n" +
    "  overflow:hidden;\n" +
    "}\n" +
    "\n" +
    "</style>\n" +
    "<div class=\"heading-container\">\n" +
    "	<div class=\"img-fill\">\n" +
    "		<img src=\"/images/congress.jpg\" alt=\"\">\n" +
    "		<div class=\"info\">\n" +
    "			<h3>Empowering the internet</h3>\n" +
    "			<p>vote and have your voice heard, come together with the collective power of the internet</p>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>  \n" +
    "<div class=\"heading-container\">\n" +
    "	<div class=\"img-fill\">\n" +
    "		<img src=\"/images/capitol.jpg\" alt=\"\">\n" +
    "		<div class=\"info\">\n" +
    "			<h3>Seeing past partisan politics</h3>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>   \n" +
    "<div class=\"heading-container\">\n" +
    "	<div class=\"img-fill\">\n" +
    "		<img src=\"/images/crowd1.jpg\" alt=\"\">\n" +
    "		<div class=\"info\">\n" +
    "			<h3>Elect, Vote, Create</h3>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>  \n" +
    "<div class=\"heading-container\">\n" +
    "	<div class=\"img-fill\">\n" +
    "		<img src=\"/images/crowd.jpg\" alt=\"\">\n" +
    "		<div class=\"info\">\n" +
    "			<h3>Direct Democracy</h3>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>  \n" +
    "\n" +
    "<div class=\"about-container\">\n" +
    "	<div>\n" +
    "		<h2>the voice of the internet</h2>\n" +
    "		<p>direct input on policy</p>\n" +
    "		<!-- my voice is filtered though 'representatives' that have a skewed agenda - money -->\n" +
    "\n" +
    "		<p>real time voting</p>\n" +
    "		<p>bylaw generation</p>\n" +
    "		<p>a political social network\n" +
    "		<p>have your voice be heard through collective decision making</p>\n" +
    "\n" +
    "		<p>we believe in a free and open internet</p>\n" +
    "		<p>we believe in direct democracy</p>\n" +
    "		<!-- mandatory voting -->\n" +
    "	\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div style=\"height:300px;\"></div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("committee/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("committee/index.tpl.html",
    "<style>\n" +
    "#main-container{margin-left:250px;padding-left:15px;}\n" +
    "#sidebar-wrapper {\n" +
    "    z-index: 1000;\n" +
    "    position: fixed;\n" +
    "    left: 250px;\n" +
    "    width: 0;\n" +
    "    height: 100%;\n" +
    "    margin-left: -250px;\n" +
    "    overflow-y: auto;\n" +
    "    background: #34393d;\n" +
    "    -webkit-transition: all 0.5s ease;\n" +
    "    -moz-transition: all 0.5s ease;\n" +
    "    -o-transition: all 0.5s ease;\n" +
    "    transition: all 0.5s ease;\n" +
    "}\n" +
    "\n" +
    "/* Sidebar Styles */\n" +
    ".sidebar-nav {\n" +
    "    position: absolute;\n" +
    "    top: 0;\n" +
    "    width: 250px;\n" +
    "    margin: 0;\n" +
    "    padding: 0;\n" +
    "    list-style: none;\n" +
    "}\n" +
    "\n" +
    ".sidebar-nav li {\n" +
    "    text-indent: 20px;\n" +
    "    line-height: 40px;\n" +
    "}\n" +
    "\n" +
    ".sidebar-nav li a {\n" +
    "    display: block;\n" +
    "    text-decoration: none;\n" +
    "    color: #999;\n" +
    "}\n" +
    "\n" +
    ".sidebar-nav li a:hover {\n" +
    "    text-decoration: none;\n" +
    "    color: #fff;\n" +
    "    background: #4b5359;\n" +
    "    //background: rgba(255,255,255,0.2);\n" +
    "}\n" +
    "\n" +
    ".sidebar-nav li a:active,\n" +
    ".sidebar-nav li a:focus {\n" +
    "    text-decoration: none;\n" +
    "}\n" +
    "\n" +
    ".sidebar-nav > .sidebar-brand {\n" +
    "    height: 65px;\n" +
    "    font-size: 18px;\n" +
    "    line-height: 60px;\n" +
    "}\n" +
    "\n" +
    ".sidebar-nav > .sidebar-brand a {\n" +
    "    color: #999999;\n" +
    "}\n" +
    "\n" +
    ".sidebar-nav > .sidebar-brand a:hover {\n" +
    "    color: #fff;\n" +
    "    background: none;\n" +
    "}\n" +
    "\n" +
    "@media(min-width:768px) {\n" +
    "\n" +
    "    #wrapper.toggled {\n" +
    "        padding-left: 0;\n" +
    "    }\n" +
    "\n" +
    "    #sidebar-wrapper {\n" +
    "        width: 250px;\n" +
    "    }\n" +
    "\n" +
    "    #wrapper.toggled #sidebar-wrapper {\n" +
    "        width: 0;\n" +
    "    }\n" +
    "\n" +
    "    #page-content-wrapper {\n" +
    "        padding: 20px;\n" +
    "        position: relative;\n" +
    "    }\n" +
    "\n" +
    "    #wrapper.toggled #page-content-wrapper {\n" +
    "        position: relative;\n" +
    "        margin-right: 0;\n" +
    "    }\n" +
    "}\n" +
    "</style>\n" +
    "\n" +
    "<div id=\"sidebar-wrapper\">\n" +
    "  <ul class=\"sidebar-nav\">\n" +
    "    <br>\n" +
    "    <li>\n" +
    "        <a href=\"/\">committee</a>\n" +
    "    </li>\n" +
    "    <hr>\n" +
    "    <li>\n" +
    "        <a href=\"#\">bylaws</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "        <a href=\"#\">committees</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "        <a href=\"#\">bills</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "        <a href=\"#\">discussion</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "        <a href=\"#\">elections</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "        <a href=\"#\">polls</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "        <a href=\"#\">members</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"main-container\">\n" +
    "  <h1>{{committee}}</h1>\n" +
    "  <div ng-repeat=\"bill in bills1\">\n" +
    "    <a href=\"{{bill.url}}\">{{bill.description}}</a>\n" +
    "  </div>\n" +
    "\n" +
    "  <br>\n" +
    "  <a>edit committee</a>\n" +
    "  <br>\n" +
    "  <a>delete committee</a>\n" +
    "  submit bill\n" +
    "  <br>\n" +
    "\n" +
    "  <div ng-show=\"currentUser\">\n" +
    "    <div style=\"margin-left:20%;margin-right:20%;\">\n" +
    "      <form class=\"committee-input\" role=\"form\" ng-submit=\"createBill(newBill)\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <input type=\"text\" placeholder= \"bill title\" ng-model=\"newBill.title\" class=\"form-control\">\n" +
    "          <input type=\"text\" placeholder= \"bill content\" ng-model=\"newBill.bill_content\" class=\"form-control\">\n" +
    "        </div>\n" +
    "        <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"bill-list-container\">\n" +
    "    <br><br>\n" +
    "    <div class=\"bill-container\" ng-repeat=\"bill in bills | orderBy:'-createdAt'\">\n" +
    "      <h1 class=\"title\"><a href=\"/committee/{{committee.url_title}}\">{{bill.title}}</a></h1>\n" +
    "      <i ng-click=\"changeVote(vote, 'up')\" class=\"fa fa-arrow-circle-up fa-2x\" ng-class=\"{true:'up', false:''}[vote=='up']\"></i>\n" +
    "      <br>\n" +
    "      <i ng-click=\"changeVote(vote, 'down')\" class=\"fa fa-arrow-circle-down fa-2x\"  ng-class=\"{true:'down', false:''}[vote=='down']\"></i>\n" +
    "      <br>Vote: {{vote}}\n" +
    "\n" +
    "    </div>\n" +
    "    <br><br>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("committees/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("committees/index.tpl.html",
    "<!--if logged in-->\n" +
    "<div ng-show=\"currentUser\">\n" +
    "  <div style=\"margin-left:20%;margin-right:20%;\">\n" +
    "    <form class=\"committee-input\" role=\"form\" ng-submit=\"createCommittee(newCommittee)\">\n" +
    "      <div class=\"form-group\">\n" +
    "        <input type=\"text\" placeholder= \"committee title\" ng-model=\"newCommittee.title\" class=\"form-control\" id=\"postTitle\">\n" +
    "        <input type=\"text\" placeholder= \"committee url\" ng-model=\"newCommittee.url_title\" class=\"form-control\" id=\"postTitle\">\n" +
    "        <input type=\"text\" placeholder= \"committee parent\" ng-model=\"newCommittee.parent\" class=\"form-control\" id=\"postTitle\">\n" +
    "      </div>\n" +
    "      <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<!--/if logged in-->\n" +
    "\n" +
    "<div class=\"committee-list-container\">\n" +
    "  <br><br>\n" +
    "  <div class=\"committee-container\" ng-repeat=\"committee in committees | orderBy:'-createdAt'\">\n" +
    "    <h1 class=\"title\"><a href=\"/committee/{{committee.url_title}}\">{{committee.title}}</a></h1>\n" +
    "  </div>\n" +
    "  <br><br>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div style=\"height:100px;\"></div>");
}]);

angular.module("header/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header/index.tpl.html",
    "<style>\n" +
    "\n" +
    ".navbar-inverse{background-color:rgba(36,36,46,1);}\n" +
    "\n" +
    "</style>\n" +
    "\n" +
    "<div ng-controller=\"HeaderCtrl\">\n" +
    "    <div class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n" +
    "      <div class=\"container\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "          <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n" +
    "            <span class=\"sr-only\">Toggle navigation</span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "          </button>\n" +
    "          <a class=\"navbar-brand\" href=\"/\"><i style=\"color:#fff\" class=\"fa fa-check\"></i>oetr</a>\n" +
    "        </div>\n" +
    "        <div class=\"collapse navbar-collapse\">\n" +
    "          <ul class=\"nav navbar-nav\">\n" +
    "            <li><a href=\"/about\">about</a></li>\n" +
    "            <li><a href=\"/committees\">committees</a></li>\n" +
    "            <li><a href=\"/search\">search</a></li>\n" +
    "            <li><a href=\"/register\">register</a></li>\n" +
    "            <li><a href=\"/login\">login</a></li>\n" +
    "          </ul>\n" +
    "        </div><!--/.nav-collapse -->\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("home/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/index.tpl.html",
    "<div class=\"surface-container-home\">\n" +
    "\n" +
    "    <!--if logged in-->\n" +
    "    <!--/if logged in-->\n" +
    "\n" +
    "	<!--if not logged in-->\n" +
    "    <style>\n" +
    "        .img-fill {\n" +
    "          width: 100%;\n" +
    "          display: block;\n" +
    "          overflow: hidden;\n" +
    "          position: relative;\n" +
    "          text-align: center\n" +
    "        }\n" +
    "\n" +
    "        .img-fill img {\n" +
    "          height: 100%;\n" +
    "          min-width: 100%;\n" +
    "          position: relative;\n" +
    "          display: inline-block;\n" +
    "          max-width: none\n" +
    "        }\n" +
    "\n" +
    "        .heading-container{\n" +
    "          position:relative;\n" +
    "        }\n" +
    "\n" +
    "        .heading-container .img-fill {\n" +
    "          height: 100vh;\n" +
    "          background:#000;\n" +
    "        }\n" +
    "\n" +
    "        .heading-container .img-fill:before {\n" +
    "          content: '';\n" +
    "          display: block;\n" +
    "          width:100%;\n" +
    "          height:100%;\n" +
    "          top:0px;\n" +
    "          left:0px;\n" +
    "          z-index:2;\n" +
    "          background:rgba(0,0,0,.50);\n" +
    "          position: absolute;\n" +
    "        }\n" +
    "\n" +
    "        .heading-container .img-fill img{\n" +
    "            -webkit-filter: blur(3px);\n" +
    "        }\n" +
    "\n" +
    "        .heading-container .img-fill .info {\n" +
    "          position: absolute;\n" +
    "          top: 0px;\n" +
    "          left: 0px;\n" +
    "          width: 100%;\n" +
    "          z-index:3;\n" +
    "          top:30%;\n" +
    "          padding:0 20px;\n" +
    "        }\n" +
    "\n" +
    "        .heading-container .img-fill h3{\n" +
    "          font-family:Jura;\n" +
    "          color:#FFF;\n" +
    "          margin:auto;\n" +
    "          white-space:nowrap;\n" +
    "          //text-align:center;\n" +
    "          text-overflow:ellipsis;\n" +
    "          overflow:hidden;\n" +
    "        }\n" +
    "\n" +
    "        .heading-container .img-fill p{\n" +
    "          max-width:650px;\n" +
    "          //margin:auto;\n" +
    "          margin-top:15px;\n" +
    "          font-family:Jura;\n" +
    "          color:#FFF;\n" +
    "          text-align:justify;\n" +
    "          overflow:hidden;\n" +
    "        }\n" +
    "\n" +
    "    </style>\n" +
    "    <div ng-include=\"'intro/index.tpl.html'\"></div>\n" +
    "    <div class=\"heading-container\">\n" +
    "        <div class=\"img-fill\">\n" +
    "            <img src=\"/images/congress.jpg\" alt=\"\">\n" +
    "            <div class=\"info\">\n" +
    "                <h3>Empowering the internet</h3>\n" +
    "                <p>vote and have your voice heard, come together with the collective power of the internet</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>  \n" +
    "    <div id=\"home-content\">\n" +
    "\n" +
    "        <div style=\"height:500px;background-color:#f1f0ed;text-align:center\">\n" +
    "            <i style=\"font-size:256px;\" class=\"fa fa-bullhorn\"></i>\n" +
    "            <p>the internet's voice</p>\n" +
    "            <p>a decision making cloud</p>\n" +
    "            <p>be part of the movement</p>\n" +
    "            <p>bylaw creation, crowd-sourced government</p>\n" +
    "        </div>\n" +
    "\n" +
    "        <div>\n" +
    "            <img src=\"/images/crowd1.jpg\"/>\n" +
    "            enter your zipcode\n" +
    "        <div>\n" +
    "\n" +
    "        <div style=\"height:500px;background-color:#fff;text-align:center\">\n" +
    "            <h1>trending</h1>\n" +
    "            <div>\n" +
    "                <a href=\"/committee/united-states\">united states</a>\n" +
    "                <a href=\"/committee/tennessee\">tennessee</a>\n" +
    "                <a href=\"/committee/republican\">Republican National Committee</a>\n" +
    "                <a href=\"/committee/democratic\">Democratic National Committee</a>\n" +
    "                <a href=\"/committee/united-states/member/troverman\">troverman</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div style=\"height:500px;background-color:#f1f0ed;text-align:center\">\n" +
    "            <p>numbers and stats infographic</p>\n" +
    "            <p>local counties / self governing committees / total members / search / political info</p>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <!--/if not logged in-->\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("intro/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("intro/index.tpl.html",
    "<div class=\"intro-container\">\n" +
    "    <!--<svg class=\"intro\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1920 1080\" width=\"1920px\" height=\"1080px\" preserveAspectRatio=\"xMidYMid slice\">\n" +
    "        <defs>\n" +
    "            <mask class=\"intro-mask\" id=\"intro-mask\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\">\n" +
    "                <rect class=\"intro-rect\" x=\"0\" y=\"0\" width=\"1920px\" height=\"1080px\"></rect>\n" +
    "                <text x=\"960\" y=\"46%\" class=\"medium-text desktop\">empowering the internet</text>\n" +
    "                <text x=\"960\" y=\"44%\" class=\"medium-text mobile\">empowering change</text>\n" +
    "                <text x=\"960\" y=\"51%\" class=\"small-text mantra\">seeing past partian politics</text>\n" +
    "                <text x=\"960\" y=\"67.5%\" class=\"small-text learn-more\">learn more</text>\n" +
    "                <a href=\"#about\" du-smooth-scroll>\n" +
    "                    <svg class=\"tri-before\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"883px\" y=\"68%\" width=\"150px\" height=\"150px\" viewBox=\"0 0 723 626\" enable-background=\"new 0 0 723 626\" xml:space=\"preserve\">\n" +
    "                        <g>\n" +
    "                          <path fill=\"#232322\" d=\"M0,0h723v1.58c-3.72,4.37-5.58,9.96-8.89,14.62C596.69,219.439,479.44,422.79,361.96,626h-0.6\n" +
    "                            C243.45,421.77,125.54,217.55,7.63,13.32C5.09,9.061,2.85,4.62,0,0.55V0z\"></path>\n" +
    "                          <path fill=\"#FFFFFF\" d=\"M86.57,48.002c183.289,0.01,366.569-0.02,549.859,0.02c-40.779,70.681-81.6,141.33-122.39,212.01\n" +
    "                            c-7.36,12.841-14.91,25.58-22.11,38.521l-0.229-0.01c-86.79-0.09-173.59-0.06-260.38-0.011h-0.211\n" +
    "                            c-20.239-35.569-40.899-70.899-61.289-106.379C142.061,144.111,114.359,96.031,86.57,48.002z\"></path>\n" +
    "                          <path fill=\"#21B795\" d=\"M231.311,298.599c86.79-0.049,173.59-0.079,260.38,0.011c-19.42,34.3-39.36,68.31-59,102.479\n" +
    "                            c-23.71,41.091-47.44,82.16-71.15,123.25c-20.92-36.039-41.68-72.17-62.55-108.229C276.48,376.909,253.65,337.89,231.311,298.599z\"></path>\n" +
    "                        </g>\n" +
    "                    </svg>\n" +
    "                </a>\n" +
    "            </mask>\n" +
    "        </defs>\n" +
    "        <rect class=\"intro-rect\" x=\"0\" y=\"0\" width=\"1920px\" height=\"1080px\"></rect>\n" +
    "        <a href=\"#about\" class=\"hvr-bob\" du-smooth-scroll>\n" +
    "            <svg class=\"tri-after\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"883px\" y=\"68%\" width=\"150px\" height=\"150px\" viewBox=\"0 0 723 626\" enable-background=\"new 0 0 723 626\" xml:space=\"preserve\">\n" +
    "                <g>\n" +
    "                  <path fill=\"#232322\" d=\"M0,0h723v1.58c-3.72,4.37-5.58,9.96-8.89,14.62C596.69,219.439,479.44,422.79,361.96,626h-0.6\n" +
    "                    C243.45,421.77,125.54,217.55,7.63,13.32C5.09,9.061,2.85,4.62,0,0.55V0z\"></path>\n" +
    "                  <path fill=\"#FFFFFF\" d=\"M86.57,48.002c183.289,0.01,366.569-0.02,549.859,0.02c-40.779,70.681-81.6,141.33-122.39,212.01\n" +
    "                    c-7.36,12.841-14.91,25.58-22.11,38.521l-0.229-0.01c-86.79-0.09-173.59-0.06-260.38-0.011h-0.211\n" +
    "                    c-20.239-35.569-40.899-70.899-61.289-106.379C142.061,144.111,114.359,96.031,86.57,48.002z\"></path>\n" +
    "                  <path fill=\"#21B795\" d=\"M231.311,298.599c86.79-0.049,173.59-0.079,260.38,0.011c-19.42,34.3-39.36,68.31-59,102.479\n" +
    "                    c-23.71,41.091-47.44,82.16-71.15,123.25c-20.92-36.039-41.68-72.17-62.55-108.229C276.48,376.909,253.65,337.89,231.311,298.599z\"></path>\n" +
    "                </g>\n" +
    "            </svg>\n" +
    "        </a>\n" +
    "    </svg>-->\n" +
    "\n" +
    "    <video id=\"video\" autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\">\n" +
    "        <source src=\"/videos/voting.mp4\" type=\"video/webm\">\n" +
    "    </video>\n" +
    "    <!--<img src=\"/images/capitol.jpg\">-->\n" +
    "</div>");
}]);

angular.module("login/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/index.tpl.html",
    "<!--login-->\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-6\">\n" +
    "        <h3>Please Login</h3>\n" +
    "        <form class=\"form-horizontal\" role=\"form\" action=\"/auth/local\" method=\"post\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputUsername3\" class=\"col-sm-2 control-label\">Username</label>\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"inputUsername3\" name=\"identifier\" placeholder=\"Username\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputPassword3\" class=\"col-sm-2 control-label\">Password</label>\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <input type=\"password\" class=\"form-control\" id=\"inputPassword3\" name=\"password\" placeholder=\"Password\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "                    <button type=\"submit\" class=\"btn btn-default\">Sign in</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<a href=\"/register\">register?</a>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("member/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("member/index.tpl.html",
    "<style>\n" +
    "	@import url(http://fonts.googleapis.com/css?family=Quicksand:300,400|Lato:400,300|Coda|Open+Sans);\n" +
    "\n" +
    "	.content-profile-page {\n" +
    "	  margin: 1em auto;\n" +
    "	  width: 44.23em;\n" +
    "	}\n" +
    "\n" +
    "	.card {\n" +
    "	  background: #fff;\n" +
    "	  border-radius: 0.3rem;\n" +
    "	  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);\n" +
    "	  border: .1em solid rgba(0, 0, 0, 0.2);\n" +
    "	  margin-bottom: 1em;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .img-user-profile {\n" +
    "	  margin: 0 auto;\n" +
    "	  text-align: center;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .img-user-profile .profile-bgHome {\n" +
    "	  border-bottom: .2em solid #f5f5f5;\n" +
    "	  width: 44.23em;\n" +
    "	  height: 16em;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .img-user-profile .avatar {\n" +
    "	  margin: 0 auto;\n" +
    "	  background: #fff;\n" +
    "	  width: 7em;\n" +
    "	  height: 7em;\n" +
    "	  padding: 0.25em;\n" +
    "	  border-radius: .4em;\n" +
    "	  margin-top: -10em;\n" +
    "	  box-shadow: 0 0 .1em rgba(0, 0, 0, 0.35);\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .user-profile-data,\n" +
    "	.profile-user-page .description-profile {\n" +
    "	  text-align: center;\n" +
    "	  padding: 0 1.5em;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .user-profile-data h1 {\n" +
    "	  font-family: \"Lato\", sans-serif;\n" +
    "	  margin-top: 0.35em;\n" +
    "	  color: #292f33;\n" +
    "	  margin-bottom: 0;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .user-profile-data p {\n" +
    "	  font-family: \"Lato\", sans-serif;\n" +
    "	  color: #8899a6;\n" +
    "	  font-size: 1.1em;\n" +
    "	  margin-top: 0;\n" +
    "	  margin-bottom: 0.5em;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .description-profile {\n" +
    "	  color: #75787b;\n" +
    "	  font-size: 0.98em;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .data-user {\n" +
    "	  font-family: \"Quicksand\", sans-serif;\n" +
    "	  margin-bottom: 0;\n" +
    "	  cursor: pointer;\n" +
    "	  padding: 0;\n" +
    "	  list-style: none;\n" +
    "	  display: table;\n" +
    "	  width: 100.15%;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .data-user li {\n" +
    "	  margin: 0;\n" +
    "	  padding: 0;\n" +
    "	  width: 33.33334%;\n" +
    "	  display: table-cell;\n" +
    "	  text-align: center;\n" +
    "	  border-left: 0.1em solid transparent;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .data-user li:first-child {\n" +
    "	  border-left: 0;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .data-user li:first-child a {\n" +
    "	  border-bottom-left-radius: 0.3rem;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .data-user li:last-child a {\n" +
    "	  border-bottom-right-radius: 0.3rem;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .data-user li a,\n" +
    "	.profile-user-page .data-user li strong {\n" +
    "	  display: block;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .data-user li a {\n" +
    "	  background-color: #f7f7f7;\n" +
    "	  border-top: 1px solid rgba(242, 242, 242, 0.5);\n" +
    "	  border-bottom: .2em solid #f7f7f7;\n" +
    "	  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(255, 255, 255, 0.4);\n" +
    "	  padding: .93em 0;\n" +
    "	  color: #46494c;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .data-user li a strong,\n" +
    "	.profile-user-page .data-user li a span {\n" +
    "	  font-weight: 600;\n" +
    "	  line-height: 1;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .data-user li a strong {\n" +
    "	  font-size: 2em;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .data-user li a span {\n" +
    "	  color: #717a7e;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .data-user li a:hover {\n" +
    "	  background: rgba(0, 0, 0, 0.05);\n" +
    "	  border-bottom: .2em solid #3498db;\n" +
    "	  color: #3498db;\n" +
    "	}\n" +
    "\n" +
    "	.profile-user-page .data-user li a:hover span {\n" +
    "	  color: #3498db;\n" +
    "	}\n" +
    "\n" +
    "	footer h4 {\n" +
    "	  display: block;\n" +
    "	  text-align: center;\n" +
    "	  clear: both;\n" +
    "	  font-family: \"Coda\", sans-serif;\n" +
    "	  color: #566965;\n" +
    "	  line-height: 6;\n" +
    "	  font-size: 1em;\n" +
    "	}\n" +
    "	#profile-activity{text-align:center;}\n" +
    "</style>\n" +
    "\n" +
    "\n" +
    "<div class=\"content-profile-page\">\n" +
    "  <div class=\"profile-user-page card\">\n" +
    "    <div class=\"img-user-profile\">\n" +
    "      <img class=\"profile-bgHome\" src=\"/images/crowd1.jpg\" />\n" +
    "      <img class=\"avatar\" src=\"/images/trevor.jpg\"/>\n" +
    "    </div>\n" +
    "    <div class=\"user-profile-data\">\n" +
    "      <h1>Trevor Overman</h1>\n" +
    "    </div>\n" +
    "    <ul class=\"data-user\">\n" +
    "   	  <li><a><strong>888</strong><span>Committees</span></a></li>\n" +
    "      <li><a><strong>888</strong><span>Votes</span></a></li>\n" +
    "      <li><a><strong>888</strong><span>Posts</span></a></li>\n" +
    "      <!--<li><a><strong>888</strong><span>Bills</span></a></li>-->\n" +
    "      <li><a><strong>888</strong><span>Followers</span></a></li>\n" +
    "      <li><a><strong>888</strong><span>Following</span></a></li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"profile-activity\">\n" +
    "	<p>Trevor voted Yes on <a>hr-888</a> - <a>united states senate</a></p>\n" +
    "	<p>Trevor voted Yes on <a>hr-888</a> - <a>united states senate</a></p>\n" +
    "	<p>Trevor voted Yes on <a>hr-888</a> - <a>united states senate</a></p>\n" +
    "	<p>Trevor voted Yes on <a>hr-888</a> - <a>united states senate</a></p>\n" +
    "	<p>Trevor voted Yes on <a>hr-888</a> - <a>united states senate</a></p>\n" +
    "	<p>Trevor voted Yes on <a>hr-888</a> - <a>united states senate</a></p>\n" +
    "	<p>Trevor voted Yes on <a>hr-888</a> - <a>united states senate</a></p>\n" +
    "	<p>Trevor submitted <a>hr-888</a> to the <a>united states senate</a></p>\n" +
    "	<p>Trevor suggested an edit to <a>hr-888</a> - <a>united states senate</a></p>\n" +
    "\n" +
    "\n" +
    "	<p>activity</p>\n" +
    "	<p>activity</p>\n" +
    "	<p>activity</p>\n" +
    "	<p>activity</p>\n" +
    "	<p>activity</p>\n" +
    "	<p>activity</p>\n" +
    "	<p>activity</p>\n" +
    "	<p>activity</p>\n" +
    "	<p>activity</p>\n" +
    "	<p>activity</p>\n" +
    "	<p>activity</p>\n" +
    "	<p>activity</p>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("register/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("register/index.tpl.html",
    "<!--register-->\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-6\">\n" +
    "        <h3>Create an Account</h3>\n" +
    "        <form class=\"form-horizontal\" role=\"form\" action=\"/auth/local/register\" method=\"post\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputUsername3\" class=\"col-sm-2 control-label\">Username</label>\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"inputUsername3\" name=\"username\" placeholder=\"Username\" value=\"\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputPassword3\" class=\"col-sm-2 control-label\">Password</label>\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <input type=\"password\" class=\"form-control\" id=\"inputPassword3\" name=\"password\" placeholder=\"Password\" value=\"\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputEmail3\" class=\"col-sm-2 control-label\">Email</label>\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <input type=\"email\" class=\"form-control\" id=\"inputEmail3\" name=\"email\" placeholder=\"Email\" value=\"\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"inputFirstName3\" class=\"col-sm-2 control-label\">First Name</label>\n" +
    "                <div class=\"col-sm-10\">\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"inputFirstName3\" name=\"first_name\" placeholder=\"First Name\" value=\"\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "                    <button type=\"submit\" class=\"btn btn-default\">Sign in</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<a href=\"/login\">already have an account?</a>");
}]);

angular.module("search/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/index.tpl.html",
    "<div class=\"surface-container home-pad\">\n" +
    "\n" +
    "\n" +
    "	<div>\n" +
    "		<p>search result</p>\n" +
    "	\n" +
    "	</div>\n" +
    "\n" +
    "</div>");
}]);
