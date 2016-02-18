angular.module('templates-app', ['about/index.tpl.html', 'account/index.tpl.html', 'bill/index.tpl.html', 'committee/index.tpl.html', 'committees/index.tpl.html', 'header/index.tpl.html', 'home/index.tpl.html', 'intro/index.tpl.html', 'login/index.tpl.html', 'member/index.tpl.html', 'register/index.tpl.html', 'search/index.tpl.html']);

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
    "		<img src=\"/images/capitol.jpg\" alt=\"\">\n" +
    "		<div class=\"info\">\n" +
    "      <h3>Empowering the internet</h3>\n" +
    "      <h3>Seeing past partisan politics</h3>\n" +
    "      <p>vote and have your voice heard, come together with the collective power of the internet</p>\n" +
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

angular.module("account/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("account/index.tpl.html",
    "<h1>Account</h1>\n" +
    "<p><a href=\"/member/{{currentUser.username}}\">{{currentUser.username}}</a></p>\n" +
    "<p>{{currentUser.email}}</p>\n" +
    "<p>{{currentUser.first_name}}</p>");
}]);

angular.module("bill/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("bill/index.tpl.html",
    "<style>\n" +
    "\n" +
    "	.bill-container{\n" +
    "		padding:50px;\n" +
    "	}\n" +
    "\n" +
    "</style>\n" +
    "\n" +
    "<div ui-view=\"bill\">\n" +
    "	<div class=\"bill-container\">\n" +
    "\n" +
    "		<h2>{{bill.title}}</h2>\n" +
    "		<p>{{bill.createdAt}}</p>\n" +
    "		<p><a href=\"\">{{bill.committee}}</a></p>\n" +
    "\n" +
    "		<p class=\"lead\">{{bill.billContent}}</p>\n" +
    "\n" +
    "		{{bill.voteCount}}\n" +
    "		<button class=\"btn btn-default\" ng-click=\"createVote(1)\"><i class=\"fa fa-caret-up\"></i></button>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"createVote(-1)\"><i class=\"fa fa-caret-down\"></i></button>\n" +
    "\n" +
    "		<!--if logged in-->\n" +
    "		<div style=\"height:100px;\"></div>\n" +
    "		<div ng-show=\"currentUser\">\n" +
    "			<div>\n" +
    "			  <form class=\"blog-input\" role=\"form\" ng-submit=\"createComment(newComment)\">\n" +
    "			    <div class=\"form-group\">\n" +
    "			      <input type=\"text\" placeholder=\"comment...\" ng-model=\"newComment.comment\" class=\"form-control\" id=\"postTitle\">\n" +
    "			    </div>\n" +
    "			    <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n" +
    "			  </form>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<!--/if logged in-->\n" +
    "\n" +
    "		<div class=\"post-list-container\">\n" +
    "		  <br><br>\n" +
    "		  <div class=\"post-container\" ng-repeat=\"comment in comments | orderBy:'-createdAt'\">\n" +
    "		    <a href=\"/comment/{{comment.id}}\">{{comment.id}}</a>\n" +
    "		   	<a href=\"/member/{{comment.user.username}}\">{{comment.user.username}}</a>\n" +
    "\n" +
    "		    <p>{{comment.comment}}</p>\n" +
    "		  </div>\n" +
    "		  <br><br>\n" +
    "		</div>\n" +
    "		<div style=\"height:100px;\"></div>\n" +
    "\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("committee/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("committee/index.tpl.html",
    "<div ui-view=\"committee\">\n" +
    "  <div id=\"sidebar-wrapper\">\n" +
    "    <ul class=\"sidebar-nav\">\n" +
    "      <br>\n" +
    "      <li>\n" +
    "          <a href=\"/\">{{committee.title}}</a>\n" +
    "      </li>\n" +
    "      <hr>\n" +
    "      <li>\n" +
    "          <a href=\"#\">bylaws</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "          <a href=\"committee/{{committee.urlTitle}}/committees\">committees</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "          <a href=\"committee/{{committee.urlTitle}}/bills\">bills</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "          <a href=\"committee/{{committee.urlTitle}}/discussion\">discussion</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "          <a href=\"#\">elections</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "          <a href=\"committee/{{committee.urlTitle}}/polls\">polls</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "          <a href=\"committee/{{committee.urlTitle}}/members\">members</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <div id=\"main-container\">\n" +
    "    <h1>{{committee.title}}</h1>\n" +
    "\n" +
    "    <div ng-show=\"currentUser\">\n" +
    "      <br>\n" +
    "      <button class=\"btn btn-primary\">edit committee</button>\n" +
    "      <br>\n" +
    "      <br>\n" +
    "      <button class=\"btn btn-primary\">+ bill</button>\n" +
    "      <br>\n" +
    "      <div style=\"margin-left:20%;margin-right:20%;\">\n" +
    "        <form class=\"committee-input\" role=\"form\" ng-submit=\"createBill(newBill)\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <input type=\"text\" placeholder= \"bill title\" ng-model=\"newBill.title\" class=\"form-control\">\n" +
    "            <input type=\"text\" placeholder= \"bill content\" ng-model=\"newBill.billContent\" class=\"form-control\">\n" +
    "          </div>\n" +
    "          <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"bill-list-container\">\n" +
    "      <br><br>\n" +
    "      <div class=\"bill-container\" ng-repeat=\"bill in bills | orderBy:'-voteCount'\">\n" +
    "\n" +
    "        <div>\n" +
    "          <h3>\n" +
    "            {{bill.voteCount}}\n" +
    "            <button ng-click=\"createVote(1, bill)\">upvote</button>\n" +
    "            <button ng-click=\"createVote(-1, bill)\">downvote</button>\n" +
    "            <a href=\"/bill/{{bill.id}}/{{bill.title}}\">{{bill.title}}</a>\n" +
    "          </h3>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "          <a href=\"/bill/{{bill.id}}/{{bill.title}}\">comment</a>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "      <br><br>\n" +
    "    </div>\n" +
    "  </div>\n" +
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
    "        <input type=\"text\" placeholder= \"committee url\" ng-model=\"newCommittee.urlTitle\" class=\"form-control\" id=\"postTitle\">\n" +
    "        <input type=\"text\" placeholder= \"committee parent\" ng-model=\"newCommittee.parent\" class=\"form-control\" id=\"postTitle\">\n" +
    "      </div>\n" +
    "      <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<!--/if logged in-->\n" +
    "<!--<div class=\"product-list-container\" id=\"committeeScrolling\" style=\"height:50%;width:100%;overflow-y:auto;position:absolute\">\n" +
    "  <div class=\"committee-list-container\" infinite-scroll='loadMore()' infinite-scroll-container=\"'#committeeScrolling'\" infinite-scroll-distance='1' infinite-scroll-parent>-->\n" +
    "      <br><br>\n" +
    "      <div class=\"committee-container\" ng-repeat=\"committee in committees\">\n" +
    "        <h1 class=\"title\"><a href=\"/committee/{{committee.urlTitle}}\">{{committee.title}}</a></h1>\n" +
    "      </div>\n" +
    "      <br><br>\n" +
    "    </div>\n" +
    "  <!--</div>\n" +
    "</div>-->\n" +
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
    "\n" +
    "            <form class=\"navbar-form pull-left\" role=\"search\" action=\"/search/\" onSubmit=\" location.href = 'search/' + document.getElementById('search-link').value; return false;\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <input ng-keyup=\"keyPress(searchValue)\" ng-model=\"searchValue\" id=\"search-link\" size=\"40\" type=\"text\" placeholder=\"\">\n" +
    "              </div>\n" +
    "            </form>\n" +
    "\n" +
    "            <li ng-show=\"currentUser\"><a href=\"/account\">account</a></li>\n" +
    "            <li ng-show=\"currentUser\"><a href=\"/logout\">signout</a></li>\n" +
    "            <li ng-show=\"!currentUser\"><a href=\"/register\">register</a></li>\n" +
    "            <li ng-show=\"!currentUser\"><a href=\"/login\">login</a></li>\n" +
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
    "  <!--if logged in-->\n" +
    "  <div ng-show=\"currentUser\">\n" +
    "\n" +
    "    <div ng-repeat=\"vote in votes\">\n" +
    "      {{vote.vote}} | <a href=\"/bill/{{vote.bill.id}}/{{vote.bill.title}}{{\">{{vote.bill.title}}</a>\n" +
    "    </div>\n" +
    "    <div ng-repeat=\"post in posts\">\n" +
    "      <h4>{{post.title}}</h4>\n" +
    "      <button class=\"btn btn-default\" ng-mousedown='mouseDown(post.title)' ng-mouseup=\"mouseUp(post.title)\" ng-mouseleave='mouseUp(post.title)'>\n" +
    "        {{post.time}}\n" +
    "        <i class=\"fa fa-caret-up\"></i>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <!--/if logged in-->\n" +
    "\n" +
    "	<!--if not logged in-->\n" +
    "  <div ng-show=\"!currentUser\">\n" +
    "    <div ng-include=\"'intro/index.tpl.html'\"></div>\n" +
    "\n" +
    "    <div class=\"heading-container\">\n" +
    "        <div class=\"img-fill\">\n" +
    "            <img src=\"/images/crowd1.jpg\" alt=\"\">\n" +
    "            <div class=\"info\">\n" +
    "                <h3>Empowering the internet</h3>\n" +
    "                <p>vote and have your voice heard, come together with the collective power of the internet</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>  \n" +
    "\n" +
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
    "            enter your zipcode\n" +
    "        <div>\n" +
    "\n" +
    "        <div style=\"height:500px;background-color:#fff;text-align:center\">\n" +
    "            <h1>trending</h1>\n" +
    "            <div ng-repeat=\"committee in committees\">\n" +
    "              <a href=\"/committee/{{committee.urlTitle}}\">{{committee.title}}</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div style=\"height:500px;background-color:#fff;text-align:center\">\n" +
    "          <div ng-include=\"'register/index.tpl.html'\"></div>\n" +
    "        </div>\n" +
    "        <div style=\"height:500px;background-color:#f1f0ed;text-align:center\">\n" +
    "            <p>numbers and stats infographic</p>\n" +
    "            <p>local counties / self governing committees / total members / search / political info</p>\n" +
    "\n" +
    "            <p>{{users.length}} voetrs</p>\n" +
    "            <div ng-repeat=\"user in users\">\n" +
    "              <a href=\"/member/{{user.username}}\">{{user.username}}</a>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <!--/if not logged in-->\n" +
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
    "        <source src=\"/videos/washington.mp4\" type=\"video/webm\">\n" +
    "    </video>\n" +
    "    <!--<img src=\"/images/capitol.jpg\">-->\n" +
    "</div>");
}]);

angular.module("login/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/index.tpl.html",
    "<!--login-->\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-6\">\n" +
    "        <h3>Login</h3>\n" +
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
    "</div>");
}]);

angular.module("member/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("member/index.tpl.html",
    "<div ui-view=\"member\">\n" +
    "	<div class=\"content-profile-page\">\n" +
    "	  <div class=\"profile-user-page card\">\n" +
    "	    <div class=\"img-user-profile\">\n" +
    "	      <img class=\"profile-bgHome\" src=\"/images/crowd1.jpg\" />\n" +
    "	      <img class=\"avatar\" src=\"/images/trevor.jpg\"/>\n" +
    "	    </div>\n" +
    "	    <div class=\"user-profile-data\">\n" +
    "	      <h1>{{member.username}}</h1>\n" +
    "	      <button class=\"btn\">follow</button>\n" +
    "\n" +
    "	    </div>\n" +
    "	    <ul class=\"data-user\">\n" +
    "	      <li><a><strong>{{votes.length}}</strong><span>Votes</span></a></li>\n" +
    "	      <li><a><strong>{{followers.length}}</strong><span>Followers</span></a></li>\n" +
    "	      <li><a><strong>{{following.length}}</strong><span>Following</span></a></li>\n" +
    "	    </ul>\n" +
    "	  </div>\n" +
    "	</div>\n" +
    "	<div id=\"profile-activity\">\n" +
    "\n" +
    "		<div ng-repeat=\"vote in votes\">\n" +
    "			<p>{{member.username}} voted {{vote.vote}} on <a href=\"/bill/{{vote.bill.id}}/{{vote.bill.title}}\">{{vote.bill.title}}</a></p>\n" +
    "		</div>\n" +
    "		\n" +
    "	</div>\n" +
    "</div>");
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
    "<div ui-view=\"search\">\n" +
    "	<div>\n" +
    "		<div>\n" +
    "			<h1>{{searchQuery}}</h1>\n" +
    "		</div>\n" +
    "\n" +
    "		<!--<input ng-keyup=\"keyPress(searchValue)\" ng-model=\"searchValue\">\n" +
    "		<div ng-repeat=\"searchResult in searchResults\">\n" +
    "			<a href=\"/project/{{searchResult.urlTitle}}\">{{searchResult.title}}</a>\n" +
    "		</div>\n" +
    "		<div style=\"height:100px\"></div>-->\n" +
    "\n" +
    "\n" +
    "		<div ng-repeat=\"searchResult in searchResults\">\n" +
    "			<h2><a href=\"/committee/{{searchResult.urlTitle}}\">{{searchResult.title}}</a></h2>\n" +
    "		</div>\n" +
    "		<div ng-repeat=\"searchResult in searchResults\">\n" +
    "			<h2><a href=\"/member/{{searchResult.username}}\">{{searchResult.username}}</a></h2>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);
