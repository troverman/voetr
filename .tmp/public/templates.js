angular.module('templates-app', ['about/index.tpl.html', 'committee/index.tpl.html', 'committees/index.tpl.html', 'home/index.tpl.html', 'intro/index.tpl.html', 'member/index.tpl.html', 'sidebar/index.tpl.html']);

angular.module("about/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/index.tpl.html",
    "<div class=\"surface-container home-pad\">\n" +
    "\n" +
    "\n" +
    "	<div>\n" +
    "		<p>real time voting</p>\n" +
    "		<p>bylaw generation</p>\n" +
    "		<p>view all politicians</p>\n" +
    "		<p>political social network\n" +
    "		<p>have your voice be heard</p>\n" +
    "		<p>collective decision making</p>\n" +
    "\n" +
    "		<p>we believe in a free and open internet</p>\n" +
    "		<p>we believe in direct democracy</p>\n" +
    "	\n" +
    "	</div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("committee/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("committee/index.tpl.html",
    "<h1>{{committee}}</h1>\n" +
    "\n" +
    "<p>committee heirarchy</p>\n" +
    "<p>bylaws</p>\n" +
    "<p>submitted bills</p>\n" +
    "<p>polls</p>\n" +
    "\n" +
    "\n" +
    "<br><br><br>\n" +
    "\n" +
    "<a>edit committee</a>\n" +
    "\n" +
    "<br><br><br>\n" +
    "\n" +
    "<a>delete committee</a>\n" +
    "\n" +
    "\n" +
    "\n" +
    "submit bill\n" +
    "<br><br><br>\n" +
    "<div ng-show=\"currentUser\">\n" +
    "\n" +
    "  <div style=\"margin-left:20%;margin-right:20%;\">\n" +
    "    <form class=\"committee-input\" role=\"form\" ng-submit=\"createBill(newBill)\">\n" +
    "      <div class=\"form-group\">\n" +
    "        <input type=\"text\" placeholder= \"bill title\" ng-model=\"newBill.title\" class=\"form-control\">\n" +
    "        <input type=\"text\" placeholder= \"bill content\" ng-model=\"newBill.bill_content\" class=\"form-control\">\n" +
    "      </div>\n" +
    "      <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"bill-list-container\">\n" +
    "  <br><br>\n" +
    "  <div class=\"bill-container\" ng-repeat=\"bill in bills | orderBy:'-createdAt'\">\n" +
    "    <h1 class=\"title\"><a href=\"/committee/{{committee.url_title}}\">{{bill.title}}</a></h1>\n" +
    "    <i ng-click=\"changeVote(vote, 'up')\" class=\"fa fa-arrow-circle-up fa-2x\" ng-class=\"{true:'up', false:''}[vote=='up']\"></i>\n" +
    "    <br>\n" +
    "    <i ng-click=\"changeVote(vote, 'down')\" class=\"fa fa-arrow-circle-down fa-2x\"  ng-class=\"{true:'down', false:''}[vote=='down']\"></i>\n" +
    "    <br>Vote: {{vote}}\n" +
    "\n" +
    "  </div>\n" +
    "  <br><br>\n" +
    "</div>");
}]);

angular.module("committees/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("committees/index.tpl.html",
    "<!--if logged in-->\n" +
    "<div style=\"height:100px;\"></div>\n" +
    "<div ng-show=\"currentUser\">\n" +
    "\n" +
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
    "\n" +
    "</div>\n" +
    "<!--/if logged in-->\n" +
    "\n" +
    "<div class=\"committee-list-container\">\n" +
    "  <br><br>\n" +
    "  <div class=\"committee-container\" ng-repeat=\"committee in committees | orderBy:'-createdAt'\">\n" +
    "    <h1 class=\"title\"><a href=\"/committee/{{committee.url_title}}\">{{committee.title}}</a></h1>\n" +
    "\n" +
    "    <i ng-click=\"changeVote(vote, 'up')\" class=\"fa fa-arrow-circle-up fa-2x\" ng-class=\"{true:'up', false:''}[vote=='up']\"></i>\n" +
    "    <br>\n" +
    "    <i ng-click=\"changeVote(vote, 'down')\" class=\"fa fa-arrow-circle-down fa-2x\"  ng-class=\"{true:'down', false:''}[vote=='down']\"></i>\n" +
    "    <br>Vote: {{vote}}\n" +
    "\n" +
    "  </div>\n" +
    "  <br><br>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div style=\"height:100px;\"></div>");
}]);

angular.module("home/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/index.tpl.html",
    "<div class=\"surface-container-home\">\n" +
    "\n" +
    "	<!--if not logged in-->\n" +
    "    <div ng-include=\"'intro/index.tpl.html'\"></div>\n" +
    "    <div id=\"home-content\">\n" +
    "\n" +
    "        <div>\n" +
    "    	   <img src=\"/images/crowd.jpg\"/>\n" +
    "        </div>\n" +
    "\n" +
    "        <div style=\"height:500px;background-color:rgb(170,245,223)\"></div>\n" +
    "\n" +
    "\n" +
    "    	<img src=\"/images/crowd1.jpg\"/>\n" +
    "\n" +
    "    	<p>the internet's voice</p>\n" +
    "    	<p>popular voice, bylaw creation</p>\n" +
    "    	<p>crowd-sourced government</p>\n" +
    "\n" +
    "        <br><br>\n" +
    "\n" +
    "        <p>numbers and stats infographic</p>\n" +
    "        <p>local counties / self governing committees / total members / search / political info</p>\n" +
    "\n" +
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
    "    <!--<video id=\"video\" autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\">\n" +
    "        <source src=\"/videos/washington.mp4\" type=\"video/webm\">\n" +
    "    </video>-->\n" +
    "    <img src=\"/images/capitol.jpg\">\n" +
    "</div>");
}]);

angular.module("member/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("member/index.tpl.html",
    "<h1>member name</h1>\n" +
    "\n" +
    "\n" +
    "<img style=\"height:260px;\" src=\"/images/obama.jpg\"/>\n" +
    "\n" +
    "<div>\n" +
    "	following\n" +
    "</div>\n" +
    "\n" +
    "<div>\n" +
    "	followers\n" +
    "</div>\n" +
    "\n" +
    "<div>\n" +
    "	committees\n" +
    "</div>\n" +
    "\n" +
    "<div>\n" +
    "	activity list\n" +
    "</div>\n" +
    "\n" +
    "<div>\n" +
    "	votes\n" +
    "</div>\n" +
    "\n" +
    "<div>\n" +
    "	posts\n" +
    "</div>");
}]);

angular.module("sidebar/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sidebar/index.tpl.html",
    "<div ng-controller=\"SidebarCtrl\">\n" +
    "    <div class=\"page-nav-zone\">\n" +
    "        <div class=\"flex-item-top\"></div>\n" +
    "        <div class=\"item-container\">\n" +
    "            <a href=\"/\">\n" +
    "                <div class=\"list-item\">\n" +
    "                    <div class=\"nav-small-list\">\n" +
    "                        <!--<img style=\"max-width: 50%;\" src=\"/images/tri.png\"/>-->\n" +
    "                        <div class=\"nav-small-list\"><i style=\"color:#fff\" class=\"fa fa-check\"></i></div>\n" +
    "\n" +
    "                    </div>\n" +
    "                    <div class=\"nav-large-list\">voetr</div>\n" +
    "                </div>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"item-container\">\n" +
    "            <a href=\"/about/\">\n" +
    "                <div class=\"list-item\">\n" +
    "                    <div class=\"nav-small-list\"><i class=\"fa fa-info\"></i></div>\n" +
    "                    <div class=\"nav-large-list\">about</div>\n" +
    "                </div>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"item-container\">\n" +
    "            <a href=\"/committees/\">\n" +
    "                <div class=\"list-item\">\n" +
    "                    <div class=\"nav-small-list\"><i class=\"fa fa-users\"></i></div>\n" +
    "                    <div class=\"nav-large-list\">committees</div>\n" +
    "                </div>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"item-container\">\n" +
    "            <a href=\"/register/\">\n" +
    "                <div class=\"list-item\">\n" +
    "                    <div class=\"nav-small-list\"><i class=\"fa fa-hand-peace-o\"></i></div>\n" +
    "                    <div class=\"nav-large-list\">register</div>\n" +
    "                </div>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"flex-item-bottom\"></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
