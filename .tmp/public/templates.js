angular.module('templates-app', ['about/index.tpl.html', 'account/index.tpl.html', 'bill/index.tpl.html', 'bills/index.tpl.html', 'committee/bills.tpl.html', 'committee/committees.tpl.html', 'committee/discussion.tpl.html', 'committee/home.tpl.html', 'committee/index.tpl.html', 'committee/members.tpl.html', 'committees/index.tpl.html', 'footer/index.tpl.html', 'home/index.tpl.html', 'intro/index.tpl.html', 'login/index.tpl.html', 'member/index.tpl.html', 'nav/index.tpl.html', 'register/index.tpl.html', 'search/index.tpl.html', 'vote/index.tpl.html', 'votes/index.tpl.html']);

angular.module("about/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/index.tpl.html",
    "<div class=\"heading-container\">\n" +
    "	<div class=\"img-fill\">\n" +
    "		<img src=\"/images/capitol.jpg\" alt=\"\">\n" +
    "		<div class=\"info\">\n" +
    "      	<h3>Empowering the internet</h3>\n" +
    "      	<!--<h3>Seeing past partisan politics</h3>-->\n" +
    "      	<p>vote and have your voice heard, come together with the collective power of the internet</p>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div class=\"about-container\">\n" +
    "	<div id=\"section1\">\n" +
    "		<h2>the voice of the internet</h2>\n" +
    "		<p>a political network</p>\n" +
    "	</div>\n" +
    "	<div id=\"section2\">\n" +
    "		<p>real time voting</p>\n" +
    "		<!--<p>bylaw generation</p>-->\n" +
    "		<p>direct input on policy</p>\n" +
    "		<p>decision making influence</p>\n" +
    "	</div>\n" +
    "	<div id=\"section3\">\n" +
    "	    <p>select others to represent you at any time</p>\n" +
    "	    <p>continual open ballot elections</p>\n" +
    "	</div>\n" +
    "	<div id=\"section4\">\n" +
    "		<p>we believe in direct democracy</p>\n" +
    "		<!--we believe in fostering engaged communities...-->\n" +
    "		<img style=\"height:64px;\" src=\"images/voetr_icon.png\"/>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
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
    "		padding-top:35px;\n" +
    "	}\n" +
    "	.bill-content{\n" +
    "		padding:20px;\n" +
    "		border:1px solid grey;\n" +
    "	}\n" +
    "\n" +
    "</style>\n" +
    "\n" +
    "<div ui-view=\"bill\">\n" +
    "	<div class=\"bill-container\">\n" +
    "		<h3>{{bill.title}}</h3>\n" +
    "		<md-subheader class=\"md-no-sticky\">{{bill.createdAt}}</md-subheader>\n" +
    "		<!--<p><a href=\"\">{{bill.committee}}</a></p>-->\n" +
    "		<md-divider></md-divider>\n" +
    "		<!--\n" +
    "		<button class=\"btn btn-default\" ng-click=\"createVote(1)\"><i class=\"fa fa-caret-up\"></i></button>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"createVote(-1)\"><i class=\"fa fa-caret-down\"></i></button>\n" +
    "		-->\n" +
    "		<!--\n" +
    "		{{bill.voteCount}}\n" +
    "		<div ng-repeat=\"vote in votes\">\n" +
    "			{{vote.vote}}<a href=\"/member/{{vote.user.username}}\">{{vote.user.username}}</a>\n" +
    "		</div>\n" +
    "		-->\n" +
    "\n" +
    "		<div id=\"bill-content\">\n" +
    "			<br>\n" +
    "			<p class=\"lead\">{{bill.billContent.current_status_description}}</p>\n" +
    "			<p class=\"lead\">{{bill.billContent.current_status_label}}</p>\n" +
    "			<p class=\"lead\">{{bill.billContent.display_number}}</p>\n" +
    "			<!--<p class=\"lead\">{{bill.billContent.introduced_date}}</p>-->\n" +
    "			<!--<p class=\"lead\">{{bill.billContent.is_alive}}</p>-->\n" +
    "			<p class=\"lead\"><a href=\"{{bill.billContent.link}}\">link</a></p>\n" +
    "			<!--<p class=\"lead\">{{bill.billContent.major_actions}}</p>-->\n" +
    "			<!--<p class=\"lead\">{{bill.billContent.sponsor}}</p>-->\n" +
    "			<!--<p class=\"lead\">{{bill.billContent.titles}}</p>-->\n" +
    "			<md-divider></md-divider>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"voteContainer\" ng-show=\"votes.length!=0\">\n" +
    "			<h3>votes</h3>\n" +
    "			<md-divider></md-divider>\n" +
    "			<div ng-repeat=\"vote in votes\">\n" +
    "				<h4><a href=\"/vote/{{vote.id}}\">{{vote.title}}</a></h4>\n" +
    "				<p>{{vote.type}}</p>\n" +
    "				<p>{{vote.result}}</p>\n" +
    "				<p>{{vote.plusCount}} - {{vote.minusCount}} - {{vote.otherCount}}</p>\n" +
    "				<md-divider></md-divider>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"commentsContainer\" ng-show=\"comments.length!=0\">\n" +
    "			<h3>comments</h3>\n" +
    "			<md-divider></md-divider>\n" +
    "			<!--if logged in-->\n" +
    "			<div ng-show=\"currentUser\">\n" +
    "				<form class=\"blog-input\" role=\"form\" ng-submit=\"createComment(newComment)\">\n" +
    "					<div class=\"form-group\">\n" +
    "						<input type=\"text\" placeholder=\"comment...\" ng-model=\"newComment.comment\" class=\"form-control\" id=\"postTitle\">\n" +
    "					</div>\n" +
    "					<button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n" +
    "				</form>\n" +
    "				<md-divider></md-divider>\n" +
    "			</div>\n" +
    "			<!--/if logged in-->\n" +
    "			<div class=\"commentContainer\" ng-repeat=\"comment in comments | orderBy:'-createdAt'\">\n" +
    "				<a href=\"/comment/{{comment.id}}\">link</a>\n" +
    "				<a href=\"/member/{{comment.user.username}}\">\n" +
    "					<img src=\"{{comment.user.avatarUrl}}\">\n" +
    "					<p>{{comment.user.username}}</p>\n" +
    "				</a>\n" +
    "				<p>{{comment.comment}}</p>\n" +
    "				<md-divider></md-divider>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div style=\"height:100px;\"></div>\n" +
    "\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("bills/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("bills/index.tpl.html",
    "<md-content>\n" +
    "	<md-list>\n" +
    "		<md-subheader class=\"md-no-sticky\">bills</md-subheader>\n" +
    "		<md-divider></md-divider>\n" +
    "		<md-list-item ng-repeat=\"bill in bills\">\n" +
    "			<div class=\"md-list-item-text\" layout=\"column\">\n" +
    "				<h4 class=\"committees title\">\n" +
    "					{{bill.voteCount}}\n" +
    "          			<button class=\"btn btn-default\" ng-click=\"createVote(1, bill)\"><i class=\"fa fa-caret-up\"></i></button>\n" +
    "          			<button class=\"btn btn-default\" ng-click=\"createVote(-1, bill)\"><i class=\"fa fa-caret-down\"></i></button>\n" +
    "					<a href=\"/bill/{{bill.id}}/{{bill.title}}\">{{bill.title}}</a>\n" +
    "				</h4>\n" +
    "			</div>\n" +
    "		</md-list-item>\n" +
    "	</md-list>\n" +
    "	<md-divider ></md-divider>\n" +
    "	<br><br>\n" +
    "	<div ng-click=\"loadMore()\" style=\"text-align:center\">\n" +
    "	  <button class=\"btn btn-default\">LOAD MORE</button>\n" +
    "	</div>\n" +
    "</md-content>\n" +
    "\n" +
    "<div style=\"height:100px;\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("committee/bills.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("committee/bills.tpl.html",
    "<div id=\"sidebar-wrapper\">\n" +
    "  <ul class=\"sidebar-nav\">\n" +
    "    <br>\n" +
    "    <li><a style=\"font-weight:bold\" href=\"committee/{{committee.urlTitle}}\">{{committee.title}}</a></li>\n" +
    "    <hr>\n" +
    "    <!--<li><a href=\"committee/{{committee.urlTitle}}\">bylaws</a></li>-->\n" +
    "    <!--<li><a href=\"committee/{{committee.urlTitle}}/committees\">committees</a></li>-->\n" +
    "    <li style=\"color: #fff;background: #4b5359\"><a style=\"color: #2AB996\" href=\"committee/{{committee.urlTitle}}/bills\">bills</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}\">discussion</a></li>\n" +
    "    <!--<li><a href=\"committee/{{committee.urlTitle}}\">polls</a></li>-->\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/members\">members</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/votes\">votes</a></li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "<div id=\"main-container\">\n" +
    "  <div class=\"committee-title\">\n" +
    "    <h1>{{committee.title}}</h1>\n" +
    "  </div>\n" +
    "  <md-divider ></md-divider>\n" +
    "  <h2>bills</h2>\n" +
    "  <md-divider ></md-divider>\n" +
    "  <div class=\"bill-list-container\">\n" +
    "  <div class=\"bill-container\" ng-repeat=\"bill in bills | orderBy:'-voteCount'\">\n" +
    "    <div class=\"bill-item\">\n" +
    "      <div>\n" +
    "        <h4>\n" +
    "          {{bill.voteCount}}\n" +
    "          <button class=\"btn btn-default\" ng-click=\"createVote(1, bill)\"><i class=\"fa fa-caret-up\"></i></button>\n" +
    "          <button class=\"btn btn-default\" ng-click=\"createVote(-1, bill)\"><i class=\"fa fa-caret-down\"></i></button>\n" +
    "          <a href=\"/bill/{{bill.id}}/{{bill.title}}\">{{bill.title}}</a>\n" +
    "        </h4>\n" +
    "      </div>\n" +
    "      <div>\n" +
    "        <a href=\"/bill/{{bill.id}}/{{bill.title}}\">comment</a>\n" +
    "      </div>\n" +
    "      <br>\n" +
    "    </div>\n" +
    "    <md-divider ></md-divider>\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("committee/committees.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("committee/committees.tpl.html",
    "<div id=\"sidebar-wrapper\">\n" +
    "  <ul class=\"sidebar-nav\">\n" +
    "    <br>\n" +
    "    <li><a style=\"font-weight:bold\" href=\"committee/{{committee.urlTitle}}\">{{committee.title}}</a></li>\n" +
    "    <hr>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}\">bylaws</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/committees\">committees</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/bills\">bills</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}\">discussion</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}\">polls</a></li>\n" +
    "    <li style=\"color: #fff;background: #4b5359\"><a style=\"color: #2AB996\" href=\"committee/{{committee.urlTitle}}/members\">members</a></li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "<div id=\"main-container\">\n" +
    "  <div class=\"committee-title\">\n" +
    "    <h1>{{committee.title}}</h1>\n" +
    "  </div>\n" +
    "  <h1>committees</h1>\n" +
    "</div>\n" +
    "");
}]);

angular.module("committee/discussion.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("committee/discussion.tpl.html",
    "<div id=\"sidebar-wrapper\">\n" +
    "  <ul class=\"sidebar-nav\">\n" +
    "    <br>\n" +
    "    <li><a style=\"font-weight:bold\" href=\"committee/{{committee.urlTitle}}\">{{committee.title}}</a></li>\n" +
    "    <hr>\n" +
    "    <!--<li><a href=\"committee/{{committee.urlTitle}}\">bylaws</a></li>-->\n" +
    "    <!--<li><a href=\"committee/{{committee.urlTitle}}/committees\">committees</a></li>-->\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/bills\">bills<i class=\"fa fa-pencil\"></i></a></li>\n" +
    "    <li style=\"color: #fff;background: #4b5359\"><a style=\"color: #2AB996\" href=\"committee/{{committee.urlTitle}}/discussion\">discussion</a></li>\n" +
    "    <!--<li><a href=\"committee/{{committee.urlTitle}}\">polls</a></li>-->\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/members\">members</a></li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "<div id=\"main-container\">\n" +
    " <div class=\"committee-title\">\n" +
    "    <h1>{{committee.title}}</h1>\n" +
    "  </div>\n" +
    "  <md-divider ></md-divider>\n" +
    "  <h2>discussion</h2>\n" +
    "  <md-divider ></md-divider>\n" +
    "  <div class=\"committeeDiscussionContainer\">\n" +
    "    <div class=\"committeeDiscussion\" ng-repeat=\"discussion in posts\">\n" +
    "      <a href=\"/discussion/{{discussion}}\">\n" +
    "        <h4>{{discussion}}</h4>\n" +
    "        <md-divider ></md-divider>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("committee/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("committee/home.tpl.html",
    "<div id=\"sidebar-wrapper\">\n" +
    "  <ul class=\"sidebar-nav\">\n" +
    "    <br>\n" +
    "    <li><a style=\"font-weight:bold\" href=\"committee/{{committee.urlTitle}}\">{{committee.title}}</a></li>\n" +
    "    <hr>\n" +
    "    <!--<li><a href=\"committee/{{committee.urlTitle}}\">bylaws</a></li>-->\n" +
    "    <!--<li><a href=\"committee/{{committee.urlTitle}}/committees\">committees</a></li>-->\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/bills\">bills</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/discussion\">discussion</a></li>\n" +
    "    <!--<li><a href=\"committee/{{committee.urlTitle}}\">polls</a></li>-->\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/members\">members</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/votes\">votes</a></li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "<div id=\"main-container\">\n" +
    "  <div class=\"committee-title\">\n" +
    "    <h1>{{committee.title}}</h1>\n" +
    "  </div>\n" +
    "  <md-divider ></md-divider>\n" +
    "  <div ng-show=\"currentUser\">\n" +
    "    <br>\n" +
    "    <button class=\"btn btn-primary\">edit committee</button>\n" +
    "    <br>\n" +
    "    <br>\n" +
    "    <button class=\"btn btn-primary\">+ bill</button>\n" +
    "    <br>\n" +
    "    <div style=\"margin-left:20%;margin-right:20%;\">\n" +
    "      <form class=\"committee-input\" role=\"form\" ng-submit=\"createBill(newBill)\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <input type=\"text\" placeholder= \"bill title\" ng-model=\"newBill.title\" class=\"form-control\">\n" +
    "          <input type=\"text\" placeholder= \"bill content\" ng-model=\"newBill.billContent\" class=\"form-control\">\n" +
    "        </div>\n" +
    "        <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"bill-list-container\">\n" +
    "    <div class=\"bill-container\" ng-repeat=\"bill in bills | orderBy:'-voteCount'\">\n" +
    "      <div class=\"bill-item\">\n" +
    "        <div>\n" +
    "          <h4>\n" +
    "            {{bill.voteCount}}\n" +
    "            <button class=\"btn btn-default\" ng-click=\"createVote(1, bill)\"><i class=\"fa fa-caret-up\"></i></button>\n" +
    "            <button class=\"btn btn-default\" ng-click=\"createVote(-1, bill)\"><i class=\"fa fa-caret-down\"></i></button>\n" +
    "            <a href=\"/bill/{{bill.id}}/{{bill.title}}\">{{bill.title}}</a>\n" +
    "          </h4>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "          <a href=\"/bill/{{bill.id}}/{{bill.title}}\">{{bill.comments.length}} comments, {{bill.votes.length}} votes</a>\n" +
    "        </div>\n" +
    "        <br>\n" +
    "      </div>\n" +
    "      <md-divider ></md-divider>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>");
}]);

angular.module("committee/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("committee/index.tpl.html",
    "<div ui-view=\"home\"></div>\n" +
    "<div ui-view=\"bills\"></div>\n" +
    "<div ui-view=\"discussion\"></div>\n" +
    "<div ui-view=\"members\"></div>");
}]);

angular.module("committee/members.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("committee/members.tpl.html",
    "<div id=\"sidebar-wrapper\">\n" +
    "  <ul class=\"sidebar-nav\">\n" +
    "    <br>\n" +
    "    <li><a style=\"font-weight:bold\" href=\"committee/{{committee.urlTitle}}\">{{committee.title}}</a></li>\n" +
    "    <hr>\n" +
    "    <!--<li><a href=\"committee/{{committee.urlTitle}}\">bylaws</a></li>-->\n" +
    "    <!--<li><a href=\"committee/{{committee.urlTitle}}/committees\">committees</a></li>-->\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/bills\">bills</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}\">discussion</a></li>\n" +
    "    <!--<li><a href=\"committee/{{committee.urlTitle}}\">polls</a></li>-->\n" +
    "    <li style=\"color: #fff;background: #4b5359\"><a style=\"color: #2AB996\" href=\"committee/{{committee.urlTitle}}/members\">members</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/votes\">votes</a></li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "<div id=\"main-container\">\n" +
    "  <div class=\"committee-title\">\n" +
    "    <h1>{{committee.title}}</h1>\n" +
    "  </div>\n" +
    "  <md-divider ></md-divider>\n" +
    "  <h2>members</h2>\n" +
    "  <md-divider ></md-divider>\n" +
    "  <div class=\"committeeMembersContainer\">\n" +
    "    <div class=\"committeeMember\" ng-repeat=\"member in members\">\n" +
    "      <a href=\"/member/{{member.username}}\">\n" +
    "        <img src=\"{{member.avatarUrl}}\" style=\"height:64px;\">\n" +
    "        <h4>{{member.username}}</h4>\n" +
    "      </a>\n" +
    "      <p>representing x</p>\n" +
    "      <button class=\"btn btn-primary\">select as representative</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("committees/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("committees/index.tpl.html",
    "<!--if logged in-->\n" +
    "<md-subheader class=\"md-no-sticky\">committees</md-subheader>\n" +
    "<md-divider ></md-divider>\n" +
    "<md-subheader class=\"md-no-sticky\">filter</md-subheader>\n" +
    "<md-divider ></md-divider>\n" +
    "<div>\n" +
    "  <style type=\"text/css\">\n" +
    "      .angular-google-map-container { height: 250px; box-shadow: 0 0 10px rgba(0,0,0,0.5); }\n" +
    "  </style>\n" +
    "  <div itemscope itemtype=\"Map\" class=\"map-outter bottom-contact\">\n" +
    "      <div class=\"gmap-container\" id=\"gmap\">\n" +
    "          <ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\" options=\"options\">\n" +
    "          </ui-gmap-google-map>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div ng-show=\"currentUser\">\n" +
    "  <div style=\"margin-left:2%;margin-right:2%;\">\n" +
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
    "<div class=\"committee-list-parent-container\" id=\"committeeScrolling\">\n" +
    "  <div class=\"committee-list-container\">\n" +
    "      <div class=\"committee-container\" ng-repeat=\"committee in committees\">\n" +
    "        <h4 class=\"committees title\"><a href=\"/committee/{{committee.urlTitle}}\">{{committee.title}}</a></h4>\n" +
    "        <p>x members</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<md-divider ></md-divider>\n" +
    "<br><br>\n" +
    "<div ng-click=\"loadMore()\" style=\"text-align:center\">\n" +
    "  <button class=\"btn btn-default\">LOAD MORE</button>\n" +
    "</div>\n" +
    "\n" +
    "<div style=\"height:100px;\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("footer/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("footer/index.tpl.html",
    "<div class=\"footer\" ng-controller=\"FooterCtrl\">\n" +
    "	{{date | date:'yyyy'}} <a href=\"/\">voetr</a>\n" +
    "	<a href=\"/about\">about</a>\n" +
    "	<a href=\"/bills\">bills</a>\n" +
    "	<a href=\"/committees\">committees</a>\n" +
    "	<a href=\"#\">votes</a>\n" +
    "</div>");
}]);

angular.module("home/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/index.tpl.html",
    "<div id=\"wrapper\">\n" +
    "\n" +
    "  <!--if logged in-->\n" +
    "  <div ng-show=\"currentUser\">\n" +
    "    <div ng-repeat=\"vote in votes\">\n" +
    "      {{vote.vote}} | <a href=\"/bill/{{vote.bill.id}}/{{vote.bill.title}}\">{{vote.bill.title}}</a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <!--/if logged in-->\n" +
    "\n" +
    "	<!--if not logged in-->\n" +
    "  <div ng-show=\"!currentUser\">\n" +
    "    <div ng-include=\"'intro/index.tpl.html'\"></div>\n" +
    "    <div id=\"about\">\n" +
    "\n" +
    "      <div id=\"information\">\n" +
    "        <i style=\"font-size:256px;\" class=\"fa fa-bullhorn\"></i>\n" +
    "        <hr>\n" +
    "        <h4>be part of the movement</h4>\n" +
    "        <!--\n" +
    "        <p>seeing past partisan politics</p>\n" +
    "        <p>crowd-sourced government</p>\n" +
    "        -->\n" +
    "        <!--decision making influnce-->\n" +
    "        <!--<p>you have to choose,</p>-->\n" +
    "        <p>with direct input on policy your voice counts</p>\n" +
    "        <p>continual open ballot elections - represent others at anytime</p>\n" +
    "\n" +
    "        <!--<p>as grandular as it goes, voice your opinion on what matters, law</p>-->\n" +
    "        <hr>\n" +
    "        <a href=\"/about\" class=\"btn btn-default\">learn more</a>\n" +
    "        <div style=\"height:100px;\"></div>\n" +
    "        <div style=\"height:100px;\"></div>\n" +
    "        <div style=\"height:100px;\"></div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div id=\"register\">\n" +
    "        <div ng-include=\"'register/index.tpl.html'\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "      <div id=\"bills\">\n" +
    "        <h2><a href=\"/bills\">bills</a></h2><hr>\n" +
    "        <h4>{{billCount}}</h4>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <div class='md-padding' layout=\"row\" layout-align=\"center\" layout-wrap>\n" +
    "            <md-card flex=\"30\" ng-repeat=\"bill in bills\">\n" +
    "              <md-card-title>\n" +
    "                <md-card-title-text>\n" +
    "                  <a href=\"/bill/{{bill.id}}/{{bill.title.replace(' ','-')}}\">\n" +
    "                    <span class=\"\">{{bill.title}}</span>\n" +
    "                  </a>\n" +
    "                </md-card-title-text>\n" +
    "              </md-card-title>\n" +
    "              <!--\n" +
    "              <md-card-actions layout=\"row\" layout-align=\"center\">\n" +
    "                <md-button>upvote</md-button>\n" +
    "                <md-button>downvote</md-button>\n" +
    "              </md-card-actions>\n" +
    "              -->\n" +
    "            </md-card>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-click=\"loadMoreBills()\" style=\"text-align:center\">\n" +
    "          <button class=\"btn btn-default\">more</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div id=\"committees\">\n" +
    "        <h2><a href=\"/committees\">committees</a></h2><hr>\n" +
    "        <h4>{{committeeCount}}</h4>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <div class='md-padding' layout=\"row\" layout-align=\"center\" layout-wrap>\n" +
    "            <md-card flex=\"15\" ng-repeat=\"committee in committees\">\n" +
    "              <md-card-title>\n" +
    "                <md-card-title-text>\n" +
    "                  <a href=\"/committee/{{committee.urlTitle}}\">\n" +
    "                    <span class=\"\">{{committee.title}}</span>\n" +
    "                  </a>\n" +
    "                </md-card-title-text>\n" +
    "              </md-card-title>\n" +
    "            </md-card>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-click=\"loadMoreCommittees()\" style=\"text-align:center\">\n" +
    "          <button class=\"btn btn-default\">more</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div id=\"members\">\n" +
    "        <!--<p>local counties / search</p>-->\n" +
    "        <h4>{{userCount}} members</h4><hr>\n" +
    "        <div class=\"container\">\n" +
    "          <div class='md-padding' layout=\"row\" layout-align=\"center\" layout-wrap>\n" +
    "            <md-card flex=\"20\" ng-repeat=\"user in users\">\n" +
    "              <a href=\"/member/{{user.username}}\">\n" +
    "                <img ng-src=\"{{user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{user.username}}\">\n" +
    "              </a>\n" +
    "              <md-card-title>\n" +
    "                <md-card-title-text>\n" +
    "                  <a href=\"/member/{{user.username}}\">\n" +
    "                    <span class=\"\">{{user.username}}</span>\n" +
    "                  </a>\n" +
    "                </md-card-title-text>\n" +
    "              </md-card-title>\n" +
    "            </md-card>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-click=\"loadMoreMembers()\" style=\"text-align:center\">\n" +
    "          <button class=\"btn btn-default\">more</button>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <!--/if not logged in-->\n" +
    "  <div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "</div>");
}]);

angular.module("intro/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("intro/index.tpl.html",
    "<div class=\"intro-container intro\">\n" +
    "    <svg class=\"intro\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1920 1080\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid slice\">\n" +
    "        <defs>\n" +
    "            <mask class=\"intro-mask\" id=\"intro-mask\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\">\n" +
    "                <rect class=\"intro-rect\" x=\"0\" y=\"0\" width=\"1920px\" height=\"1080px\"></rect>\n" +
    "                <text x=\"960\" y=\"46%\" class=\"medium-text desktop\">build empowerment, change consensus</text>\n" +
    "                <text x=\"960\" y=\"44%\" class=\"medium-text mobile\">empowering change</text>\n" +
    "                <text x=\"960\" y=\"51%\" class=\"small-text mantra\">direct input on policy, be the voice of the internet</text>\n" +
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
    "        <rect class=\"intro-rect\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\"></rect>\n" +
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
    "    </svg> \n" +
    "\n" +
    "    <video id=\"video\" autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\">\n" +
    "        <source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/webm\">\n" +
    "    </video>\n" +
    "</div>\n" +
    "");
}]);

angular.module("login/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/index.tpl.html",
    "<!--login-->\n" +
    "<div class=\"login-form\" style=\"text-align:center;min-height:100%;\">\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-6 col-md-offset-3\">\n" +
    "            <h3>Login</h3><hr>\n" +
    "            <form class=\"form-horizontal\" role=\"form\" action=\"/auth/local\" method=\"post\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputUsername3\" class=\"col-sm-2 control-label\">Username</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" class=\"form-control\" id=\"inputUsername3\" name=\"identifier\" placeholder=\"Username\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputPassword3\" class=\"col-sm-2 control-label\">Password</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"password\" class=\"form-control\" id=\"inputPassword3\" name=\"password\" placeholder=\"Password\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-offset-1 col-sm-10\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-default\">Sign in</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <hr>\n" +
    "    <a href=\"/register\">register an account</a>\n" +
    "</div>\n" +
    "<!--<div ng-include=\"'footer/index.tpl.html'\"></div>-->\n" +
    "");
}]);

angular.module("member/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("member/index.tpl.html",
    "<div ui-view=\"member\">\n" +
    "	<div class=\"content-profile-page\">\n" +
    "	  <div class=\"profile-user-page card\">\n" +
    "	    <div class=\"img-user-profile\">\n" +
    "	      <div style=\"height:25em;width: 100%;overflow: hidden;\">\n" +
    "	      	<img class=\"profile-bgHome\" src=\"/images/capitol.jpg\" />\n" +
    "	      </div>\n" +
    "	      <img class=\"avatar\" src=\"{{member.avatarUrl}}\"/>\n" +
    "	    </div>\n" +
    "	    <div class=\"user-profile-data\">\n" +
    "	      <h3>{{member.username}}</h3>\n" +
    "	      <button class=\"btn btn-default\">follow</button><br>\n" +
    "	      <button class=\"btn btn-primary\">select as a representative</button><br>\n" +
    "	      <br><br>\n" +
    "	      <!--can have dif reps per committee-->\n" +
    "	      <!--represented by (list of reps with each committee)-->\n" +
    "	      <!--committee member list have a select button?-->\n" +
    "	    </div>\n" +
    "	    <ul class=\"data-user\">\n" +
    "	    	<li><a><strong>{{votes.length}}</strong><span>Committees</span></a></li>\n" +
    "	   		<li><a><strong>{{following.length}}</strong><span>Representing</span></a></li>\n" +
    "	    	<li><a><strong>{{votes.length}}</strong><span>Votes</span></a></li>\n" +
    "	    	<li><a><strong>{{followers.length}}</strong><span>Followers</span></a></li>\n" +
    "	    	<li><a><strong>{{following.length}}</strong><span>Following</span></a></li>\n" +
    "	    </ul>\n" +
    "	  </div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div id=\"profile-activity\">\n" +
    "\n" +
    "\n" +
    "		<h1>Activity</h1><hr>\n" +
    "		<md-card ng-repeat=\"vote in votes\">\n" +
    "			<md-card-title>\n" +
    "				<md-card-title-text>\n" +
    "					<p>{{member.username}} voted {{vote.voteString}}</p>\n" +
    "					<a href=\"/bill/{{vote.bill.id}}/{{vote.bill.title}}\">{{vote.bill.title}}</a>\n" +
    "				</md-card-title-text>\n" +
    "				<md-card-title-media>\n" +
    "					<div class=\"md-media-lg card-media\"><img class=\"avatar\" src=\"{{member.avatarUrl}}\"/></div>\n" +
    "				</md-card-title-media>\n" +
    "			</md-card-title>\n" +
    "		</md-card>		\n" +
    "		  \n" +
    "	</div>\n" +
    "	<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("nav/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("nav/index.tpl.html",
    "<style>\n" +
    ".navbar-inverse{background-color:rgba(36,36,46,1);}\n" +
    "</style>\n" +
    "\n" +
    "<div ng-controller=\"NavCtrl\" class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n" +
    "  <div class=\"container\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "      <a class=\"navbar-brand\" href=\"/\"><i style=\"color:#2ab996\" class=\"fa fa-check\"></i>oetr</a>\n" +
    "    </div>\n" +
    "    <div class=\"collapse navbar-collapse\">\n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <li><a href=\"/about\">about</a></li>\n" +
    "        <li><a href=\"/committees\">committees</a></li>\n" +
    "        <li><a href=\"/search\">search</a></li>\n" +
    "\n" +
    "        <form class=\"navbar-form pull-left\" role=\"search\" action=\"/search/\" onSubmit=\" location.href = 'search/' + document.getElementById('search-link').value; return false;\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <input ng-keyup=\"keyPress(searchValue)\" ng-model=\"searchValue\" id=\"search-link\" size=\"40\" type=\"text\" placeholder=\"\">\n" +
    "          </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <li ng-show=\"currentUser\"><a href=\"/account\">account</a></li>\n" +
    "        <li ng-show=\"currentUser\"><a href=\"/logout\">signout</a></li>\n" +
    "        <li ng-show=\"!currentUser\"><a href=\"/register\">register</a></li>\n" +
    "        <li ng-show=\"!currentUser\"><a href=\"/login\">login</a></li>\n" +
    "      </ul>\n" +
    "    </div><!--/.nav-collapse -->\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("register/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("register/index.tpl.html",
    "<!--register-->\n" +
    "<div class=\"register-form\" style=\"text-align:center\">\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-6 col-md-offset-3\">\n" +
    "            <h3>Create an Account</h3><hr>\n" +
    "            <form class=\"form-horizontal\" role=\"form\" action=\"/auth/local/register\" method=\"post\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputUsername3\" class=\"col-sm-2 control-label\">Username</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" class=\"form-control\" id=\"inputUsername3\" name=\"username\" placeholder=\"Username\" value=\"\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputEmail3\" class=\"col-sm-2 control-label\">Email</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"email\" class=\"form-control\" id=\"inputEmail3\" name=\"email\" placeholder=\"Email\" value=\"\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputFirstName3\" class=\"col-sm-2 control-label\">First Name</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" class=\"form-control\" id=\"inputFirstName3\" name=\"first_name\" placeholder=\"First Name\" value=\"\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"inputPassword3\" class=\"col-sm-2 control-label\">Password</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"password\" class=\"form-control\" id=\"inputPassword3\" name=\"password\" placeholder=\"Password\" value=\"\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" style=\"\">\n" +
    "                    <div class=\"col-sm-offset-1 col-sm-10\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-default\">Sign in</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "\n" +
    "            <!--\n" +
    "            <p>facebook</p>\n" +
    "            <p>google</p>\n" +
    "            <p>twitter</p>\n" +
    "            -->\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <hr>\n" +
    "    <a href=\"/login\">already have an account?</a>\n" +
    "\n" +
    "</div>");
}]);

angular.module("search/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/index.tpl.html",
    "<div ui-view=\"search\">\n" +
    "	<div style=\"margin-left:10%;margin-right:10%;margin-top:5%\">\n" +
    "		<div>\n" +
    "			<h1>{{searchQuery}}</h1><hr style=\"width:100%\">\n" +
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
    "			<h4 ng-show=\"searchResult.username\"><a href=\"/member/{{searchResult.username}}\">{{searchResult.username}}</a></h4>\n" +
    "			<h4 ng-show=\"searchResult.billContent\"><a href=\"/bill/{{searchResult.id}}/{{searchResult.title}}\">{{searchResult.title}}</a></h4>\n" +
    "			<h4 ng-show=\"!searchResult.billContent\"><a href=\"/committee/{{searchResult.urlTitle}}\">{{searchResult.title}}</a></h4>\n" +
    "		</div>\n" +
    "		<br>\n" +
    "		<!--<div ng-repeat=\"searchResult in searchResults\">\n" +
    "			<h4><a href=\"/member/{{searchResult.username}}\">{{searchResult.username}}</a></h4>\n" +
    "		</div>-->\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("vote/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("vote/index.tpl.html",
    "<style>\n" +
    "	.voteContainer{padding:50px;}\n" +
    "</style>\n" +
    "<div ui-view=\"vote\">\n" +
    "\n" +
    "	<div class=\"voteContainer\">\n" +
    "		<a href=\"bill/{{vote.bill.id}}/{{vote.bill.urlTitle}}\">{{vote.bill.title}}</a>\n" +
    "		<h3>{{vote.title}}</h3>\n" +
    "		<md-divider></md-divider>\n" +
    "		<div class=\"voteVoteContainer\">\n" +
    "			<div class=\"voteVote\" ng-repeat=\"vote in votes\">\n" +
    "				<a href=\"/member/{{vote.user.username}}\">\n" +
    "					<img src=\"{{vote.user.avatarUrl}}\" style=\"height:64px;\">\n" +
    "					{{vote.user.username}}\n" +
    "				</a>\n" +
    "				<h4>{{vote.voteString}}</h4>\n" +
    "				<md-divider></md-divider>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	<div>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("votes/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("votes/index.tpl.html",
    "<md-content>\n" +
    "	<md-list>\n" +
    "		<md-subheader class=\"md-no-sticky\">votes</md-subheader>\n" +
    "		<md-divider></md-divider>\n" +
    "		<md-list-item ng-repeat=\"vote in votes\">\n" +
    "			<div class=\"md-list-item-text\" layout=\"column\">\n" +
    "				<h3 class=\"committees title\" style=\"font-size:25px\">\n" +
    "					{{vote.voteCount}}\n" +
    "          			<button class=\"btn btn-default\" ng-click=\"createVote(1, vote)\"><i class=\"fa fa-caret-up\"></i></button>\n" +
    "          			<button class=\"btn btn-default\" ng-click=\"createVote(-1, vote)\"><i class=\"fa fa-caret-down\"></i></button>\n" +
    "					<a href=\"/vote/{{vote.id}}\">{{vote.title}}</a>\n" +
    "				</h3>\n" +
    "			</div>\n" +
    "		</md-list-item>\n" +
    "	</md-list>\n" +
    "	<md-divider ></md-divider>\n" +
    "	<br><br>\n" +
    "	<div ng-click=\"loadMore()\" style=\"text-align:center\">\n" +
    "	  <button class=\"btn btn-default\">LOAD MORE</button>\n" +
    "	</div>\n" +
    "</md-content>\n" +
    "\n" +
    "<div style=\"height:100px;\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);
