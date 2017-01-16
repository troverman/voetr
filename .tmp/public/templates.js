angular.module('templates-app', ['about/index.tpl.html', 'account/index.tpl.html', 'bill/index.tpl.html', 'bills/index.tpl.html', 'committee/bills.tpl.html', 'committee/committees.tpl.html', 'committee/discussion.tpl.html', 'committee/home.tpl.html', 'committee/index.tpl.html', 'committee/members.tpl.html', 'committee/votes.tpl.html', 'committees/index.tpl.html', 'footer/index.tpl.html', 'home/index.tpl.html', 'intro/index.tpl.html', 'login/index.tpl.html', 'member/index.tpl.html', 'nav/index.tpl.html', 'register/index.tpl.html', 'search/index.tpl.html', 'vote/index.tpl.html', 'votes/index.tpl.html']);

angular.module("about/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/index.tpl.html",
    "<div class=\"imageContainer\">\n" +
    "	<video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\"></video>\n" +
    "	<div class=\"imageContainerDiv\">  \n" +
    "		<h1>build empowerment, change consensus</h1>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<!--\n" +
    "<div class=\"heading-container\">\n" +
    "	<div class=\"img-fill\">\n" +
    "		<img src=\"/images/capitol.jpg\" alt=\"\">\n" +
    "		<div class=\"info\">\n" +
    "      	<h3>empowering the internet</h3>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "-->\n" +
    "<div class=\"about-container\">\n" +
    "	<div id=\"section1\">\n" +
    "		<h2>the voice of the internet</h2>\n" +
    "		<p>build empowerment, change consensus</p>\n" +
    "		<p>directly impact the political landscape</p>\n" +
    "		<img style=\"height:64px\" src=\"http://www.freeiconspng.com/uploads/vote-icon-19.png\"/>\n" +
    "	</div>\n" +
    "	<div id=\"section2\">\n" +
    "		<h4>direct your impact though real time input on policy</h4>\n" +
    "		<p>decision making influence in the power of your hands</p>\n" +
    "	</div>\n" +
    "	<div id=\"section3\">\n" +
    "		<h4>elect representatives and serve your constituents</h4>\n" +
    "	    <p>with continual open ballot elections, select others to represent you at any time</p>\n" +
    "	</div>\n" +
    "	<div id=\"section4\">\n" +
    "		<img style=\"height:64px;\" src=\"images/voetr_icon.png\"/>\n" +
    "		<h4>power to the people</h4>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
    "");
}]);

angular.module("account/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("account/index.tpl.html",
    "<div style=\"height:25em;width: 100%;overflow: hidden;\">\n" +
    "<img style=\"width:100%;min-height:35em;\" src=\"{{user.coverUrl}}\">\n" +
    "</div>\n" +
    "<div class=\"container\">\n" +
    "	<a href=\"/member/{{currentUser.username}}\"><img class=\"avatar\" src=\"{{user.avatarUrl}}\"/></a>\n" +
    "\n" +
    "	<h3><a href=\"/member/{{currentUser.username}}\">{{user.username}}</a></h3>\n" +
    "	<!--\n" +
    "	<p>{{user.email}}</p>\n" +
    "	<p>{{user.first_name}}</p>\n" +
    "	-->\n" +
    "\n" +
    "	<md-divider></md-divider>\n" +
    "	<br><br><br>\n" +
    "\n" +
    "	<form name=\"acountForm\" id=\"accountForm\" ng-submit=\"accountSave()\" >\n" +
    "		<div layout=\"column\" layout-align=\"center stretch\">\n" +
    "			<md-input-container>\n" +
    "				<label class=\"modal-label\">Username</label>\n" +
    "				<input ng-model=\"user.username\" required name=\"firstName\" type=\"text\">\n" +
    "			</md-input-container>\n" +
    "			<md-input-container>\n" +
    "				<label class=\"modal-label\">Email</label>\n" +
    "				<input ng-model=\"user.email\" required name=\"firstName\" type=\"text\">\n" +
    "			</md-input-container>\n" +
    "			<md-input-container>\n" +
    "				<label class=\"modal-label\">First Name</label>\n" +
    "				<input ng-model=\"user.firstName\" required name=\"firstName\" type=\"text\">\n" +
    "			</md-input-container>\n" +
    "			<md-input-container>\n" +
    "				<label class=\"modal-label\">Last Name</label>\n" +
    "				<input ng-model=\"user.lastName\" required name=\"lastName\" type=\"text\">\n" +
    "			</md-input-container>\n" +
    "			<!--<md-input-container>\n" +
    "				<label class=\"modal-label\">Address</label>\n" +
    "				<input ng-model=\"user.address\" required name=\"Address\" type=\"text\">\n" +
    "			</md-input-container>-->\n" +
    "		</div>\n" +
    "		<button type=\"submit\" class=\"btn btn-primary\">Save</button>\n" +
    "	</form>\n" +
    "\n" +
    "	<br><br><br>\n" +
    "	<md-divider></md-divider>\n" +
    "\n" +
    "	<h3>Update Avatar</h3>\n" +
    "	<div ngf-accept=\"'image/*'\" ngf-drop ngf-select=\"uploadAvatar($file)\" ng-model=\"file\" class=\"drop-box\" ngf-drag-over-class=\"dragover\" ngf-allow-dir=\"true\">\n" +
    "		<div>Drag photos or click here to upload.</div>\n" +
    "		<div ngf-no-file-drop>File Drag/Drop is not supported for this browser</div>  		\n" +
    "	</div>\n" +
    "	<p ng-show=\"avatarLoading\" style=\"text-align:center\"><i class=\"fa fa-spin fa-spinner\"></i>&nbsp;{{pp}}%</p>\n" +
    "	<div ng-show=\"avatarLoading\" class=\"progress\">\n" +
    "		<div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{avatarPercentage}}%;\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<h3>Update Cover</h3>\n" +
    "	<div ngf-accept=\"'image/*'\" ngf-drop ngf-select=\"uploadCover($file)\" ng-model=\"file\" class=\"drop-box\" ngf-drag-over-class=\"dragover\" ngf-allow-dir=\"true\">\n" +
    "		<div>Drag photos or click here to upload.</div>\n" +
    "		<div ngf-no-file-drop>File Drag/Drop is not supported for this browser</div>  \n" +
    "	</div>\n" +
    "	<p ng-show=\"coverLoading\" style=\"text-align:center\"><i class=\"fa fa-spin fa-spinner\"></i>&nbsp;{{pp}}%</p>\n" +
    "	<div ng-show=\"coverLoading\" class=\"progress\">\n" +
    "		<div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{coverPercentage}}%;\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<h3>Connected Accounts</h3>\n" +
    "	<md-divider></md-divider><br>\n" +
    "	<button class=\"btn btn-primary\" href=\"/auth/facebook\">connect facebook</button>\n" +
    "	<button class=\"btn btn-primary\" href=\"/auth/twitter\">connect twitter</button>\n" +
    "	<button class=\"btn btn-primary\" href=\"/auth/google\">connect google</button>\n" +
    "	<button class=\"btn btn-primary\" href=\"/auth/btc\">connect btc wallet</button>\n" +
    "	<br><br>\n" +
    "	<div ng-repeat=\"passport in user.passports\">\n" +
    "		{{passport.protocol}}\n" +
    "	</div>\n" +
    "\n" +
    "	<h3>settings</h3>\n" +
    "	<md-divider></md-divider><br>\n" +
    "	<p>email settings</p>\n" +
    "	<p>verified account</p>\n" +
    "	<h4>government identification</h4>\n" +
    "	<p>by providing official identification, government officials have more of an inventive to respond and your voice carries more weight.</p>\n" +
    "	<div ngf-accept=\"'image/*'\" ngf-drop ngf-select=\"uploadIdentification($file)\" ng-model=\"file\" class=\"drop-box\" ngf-drag-over-class=\"dragover\" ngf-allow-dir=\"true\">\n" +
    "		<div>Drag photos or click here to upload.</div>\n" +
    "		<div ngf-no-file-drop>File Drag/Drop is not supported for this browser</div><img ng-show=\"user.identificationUrl\" src=\"{{user.identificationUrl}}\">\n" +
    "  \n" +
    "	</div>\n" +
    "	<p ng-show=\"identificationLoading\" style=\"text-align:center\"><i class=\"fa fa-spin fa-spinner\"></i>&nbsp;{{pp}}%</p>\n" +
    "	<div ng-show=\"identificationLoading\" class=\"progress\">\n" +
    "		<div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{identificationPercentage}}%;\"></div>\n" +
    "	</div>\n" +
    "	<br>\n" +
    "\n" +
    "	<p>ssn</p>\n" +
    "\n" +
    "	<div style=\"height:100px;\"></div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
    "");
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
    "		<md-subheader ng-bind=\"bill.createdAt | date:'MM/dd/yyyy h:mma'\" class=\"md-no-sticky\"></md-subheader><br>\n" +
    "\n" +
    "		<!--<p><a href=\"\">{{bill.committee}}</a></p>-->\n" +
    "		<md-divider></md-divider>\n" +
    "		\n" +
    "		<div id=\"bill-content\">\n" +
    "			<br>\n" +
    "			<p class=\"lead\">{{bill.billContent.current_status_description}}</p>\n" +
    "			<p class=\"lead\">{{bill.billContent.current_status_label}}</p>\n" +
    "			<p class=\"lead\">{{bill.billContent.display_number}}</p>\n" +
    "			<!--<p class=\"lead\">{{bill.billContent.introduced_date}}</p>-->\n" +
    "			<!--<p class=\"lead\">{{bill.billContent.is_alive}}</p>-->\n" +
    "			<p class=\"lead\"><a href=\"{{bill.billContent.link}}\">Full Text Link</a></p>\n" +
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
    "      			<button class=\"btn btn-default\" ng-click=\"createVote(1, vote)\"><i class=\"fa fa-caret-up\"></i> {{vote.plusCount}}</button>\n" +
    "      			<button class=\"btn btn-default\" ng-click=\"createVote(-1, vote)\"><i class=\"fa fa-caret-down\"></i> {{vote.minusCount}}</button>\n" +
    "				<h4><a href=\"/vote/{{vote.id}}\">{{vote.title}}</a></h4>\n" +
    "				<p>{{vote.type}}</p>\n" +
    "				<p>{{vote.result}}</p>\n" +
    "				<p>{{vote.voteCount}}</p>\n" +
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
    "	  <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">LOAD MORE</button>\n" +
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
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
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
    "    <li><a href=\"committee/{{committee.urlTitle}}/bills\">bills<i class=\"fa fa-pencil\"></i></a></li>\n" +
    "    <li style=\"color: #fff;background: #4b5359\"><a style=\"color: #2AB996\" href=\"committee/{{committee.urlTitle}}/discussion\">discussion</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/members\">members</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/votes\">votes</a></li>\n" +
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
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
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
    "    <button ng-click=\"toggleEditCommittee()\" class=\"btn btn-primary\">edit committee</button>\n" +
    "    <br>\n" +
    "\n" +
    "    <div style=\"margin-left:20%;margin-right:20%;\" ng-show=\"editCommitteeToggle\">\n" +
    "      edit committee form\n" +
    "    </div>\n" +
    "\n" +
    "    <br>\n" +
    "    <button ng-click=\"toggleCreateBill()\" class=\"btn btn-primary\">+ bill</button>\n" +
    "    <br>\n" +
    "\n" +
    "    <div style=\"margin-left:20%;margin-right:20%;\" ng-show=\"createBillToggle\">\n" +
    "      <form class=\"committee-input\" role=\"form\" ng-submit=\"createBill(newBill)\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <input type=\"text\" placeholder= \"bill title\" ng-model=\"newBill.title\" class=\"form-control\">\n" +
    "          <input type=\"text\" placeholder= \"bill content\" ng-model=\"newBill.billContent\" class=\"form-control\">\n" +
    "        </div>\n" +
    "        <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "    \n" +
    "  </div>\n" +
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
    "<div ui-view=\"members\"></div>\n" +
    "<div ui-view=\"votes\"></div>\n" +
    "");
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
    "      <p>{{member}}</p>\n" +
    "      <button class=\"btn btn-primary\">select as representative</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
    "");
}]);

angular.module("committee/votes.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("committee/votes.tpl.html",
    "<div id=\"sidebar-wrapper\">\n" +
    "  <ul class=\"sidebar-nav\">\n" +
    "    <br>\n" +
    "    <li><a style=\"font-weight:bold\" href=\"committee/{{committee.urlTitle}}\">{{committee.title}}</a></li>\n" +
    "    <hr>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/bills\">bills</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/discussion\">discussion</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/members\">members</a></li>\n" +
    "    <li style=\"color: #fff;background: #4b5359\"><a style=\"color: #2AB996\" href=\"committee/{{committee.urlTitle}}/votes\">votes</a></li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "<div id=\"main-container\">\n" +
    "  <div class=\"committee-title\">\n" +
    "    <h1>{{committee.title}}</h1>\n" +
    "  </div>\n" +
    "  <md-divider ></md-divider>\n" +
    "  <h2>votes</h2>\n" +
    "  <md-divider ></md-divider>\n" +
    "  <div class=\"vote-list-container\">\n" +
    "    <div class=\"vote-container\" ng-repeat=\"vote in votes\">\n" +
    "      <div class=\"vote-item\">\n" +
    "\n" +
    "        <div>\n" +
    "          <br>\n" +
    "          <h4>\n" +
    "            {{vote.voteCount}}\n" +
    "            <button class=\"btn btn-default\" ng-click=\"createVote(1, bill)\"><i class=\"fa fa-caret-up\"></i></button>\n" +
    "            <button class=\"btn btn-default\" ng-click=\"createVote(-1, bill)\"><i class=\"fa fa-caret-down\"></i></button>\n" +
    "            <a href=\"/vote/{{vote.id}}\">{{vote.title}}</a>\n" +
    "          </h4>\n" +
    "          <h5>{{vote.bill.title}}</h5>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "          <a href=\"/vote/{{vote.id}}\">comment</a>\n" +
    "        </div>\n" +
    "        <md-divider></md-divider>\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
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
    "  <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">LOAD MORE</button>\n" +
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
    "	<a href=\"/votes\">votes</a>\n" +
    "</div>");
}]);

angular.module("home/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/index.tpl.html",
    "<style>\n" +
    "\n" +
    ".upVote:hover{\n" +
    "  color:white;\n" +
    "  background-color:#2ab996;\n" +
    "}\n" +
    ".downVote:hover{\n" +
    "  color:white;\n" +
    "  background-color:red;\n" +
    "}\n" +
    ".upVoted{\n" +
    "  color:white;\n" +
    "  background-color:#2ab996;\n" +
    "}\n" +
    ".downVoted{\n" +
    "  color:white;\n" +
    "  background-color:red;\n" +
    "}\n" +
    ".upVoted:focus{\n" +
    "  color:white;\n" +
    "  background-color:#2ab996;\n" +
    "}\n" +
    ".downVoted:focus{\n" +
    "  color:white;\n" +
    "  background-color:red;\n" +
    "}\n" +
    "\n" +
    "</style>\n" +
    "\n" +
    "<div id=\"wrapper\">\n" +
    "\n" +
    "  <!--if logged in-->\n" +
    "  <div ng-show=\"currentUser\">\n" +
    "    <div style=\"height:50px\"></div>\n" +
    "\n" +
    "    \n" +
    "\n" +
    "    <div class=\"container\">\n" +
    "      <div class=\"col-md-4\">\n" +
    "        <img class=\"avatar\" style=\"margin-top:0em\" src=\"{{currentUser.avatarUrl}}\"/>\n" +
    "        <h2><a href=\"/member/{{currentUser.username}}\">{{currentUser.username}}</a></h2>\n" +
    "        <p>representatives - {{representatives.length}}</p>\n" +
    "        <p>constituents - {{constituents.length}}</p>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-8\">\n" +
    "\n" +
    "        <div ng-show=\"!currentUser.isVerified\">\n" +
    "          <!--<h4>upload id</h4>\n" +
    "          <p>by providing official identification, government officials have more of an inventive to respond and your voice carries more weight.</p>-->\n" +
    "          <h4>enter location</h4>\n" +
    "          <h4>select representatives</h4>\n" +
    "          <h4>become verified</h4>\n" +
    "          <button ng-click=\"getLatLng()\" class=\"btn btn-default\">get representatives</button>\n" +
    "          <div ng-repeat=\"representative in officialRepresentatives\">\n" +
    "            <!--<img class=\"avatar\" style=\"margin-top:0em\" src=\"{{representative.avatarUrl}}\"/>-->\n" +
    "            <h4><a href=\"member/{{representative.username}}\">{{representative.username}}</a></h4>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <h3>recommended votes</h3>\n" +
    "        <div ng-repeat=\"vote in votes\">\n" +
    "          <h4>\n" +
    "            {{vote.voteCount}}\n" +
    "            <button ng-class=\"{'upVoted': vote.class=='upVote'}\" class=\"btn btn-default upVote\" ng-click=\"createVote(1, vote)\"><i class=\"fa fa-caret-up\"></i></button>\n" +
    "            <button ng-class=\"{'downVoted': vote.class=='downVote'}\" class=\"btn btn-default downVote\" ng-click=\"createVote(-1, vote)\"><i class=\"fa fa-caret-down\"></i></button>\n" +
    "            <a href=\"/vote/{{vote.id}}\">{{vote.title}}</a>\n" +
    "          </h4>\n" +
    "          <br><br>\n" +
    "        </div>\n" +
    "\n" +
    "        <h3>my constituents</h3>\n" +
    "        <div ng-repeat=\"constituent in constituents\">\n" +
    "          <img class=\"avatar\" style=\"margin-top:0em;\" src=\"{{constituent.constituent.avatarUrl}}\"/>\n" +
    "          <h4><a href=\"/member/{{constituent.constituent.username}}\">{{constituent.constituent.username}}</a></h4>\n" +
    "        </div>\n" +
    "\n" +
    "        <h3>my representatives</h3>\n" +
    "        <div ng-repeat=\"representative in representatives\">\n" +
    "          <img class=\"avatar\" style=\"margin-top:0em;\" src=\"{{representative.representative.avatarUrl}}\"/>\n" +
    "          <h4><a href=\"/member/{{representative.representative.username}}\">{{representative.representative.username}}</a></h4>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-repeat=\"vote in userVotes\">\n" +
    "          {{vote.vote}} | <a href=\"/bill/{{vote.bill.id}}/{{vote.bill.title}}\">{{vote.bill.title}}</a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div style=\"height:50px;\"></div>\n" +
    "  </div>\n" +
    "  <!--/if logged in-->\n" +
    "\n" +
    "	<!--if not logged in-->\n" +
    "  <div ng-show=\"!currentUser\">\n" +
    "    <div ng-include=\"'intro/index.tpl.html'\"></div>\n" +
    "\n" +
    "    <!--\n" +
    "    <div class=\"imageContainer\">\n" +
    "      <video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\"></video>\n" +
    "      <div class=\"imageContainerDiv\">  \n" +
    "        <h1>build empowerment, change consensus</h1>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    -->\n" +
    "\n" +
    "    <div id=\"about\">\n" +
    "      <div id=\"information\">\n" +
    "        <div class=\"container\">\n" +
    "          <i style=\"font-size:256px;\" class=\"fa fa-bullhorn\"></i>\n" +
    "          <hr>\n" +
    "          <h4>be part of the movement</h4>\n" +
    "          <p>create commmunity consensus</p>\n" +
    "          <!--<p>directly impact the political landscape, with input on policy your voice counts</p>-->\n" +
    "          <p>with direct input on policy your voice counts</p>\n" +
    "          <p>tell your reps how you feel about any piece of legislation</p>\n" +
    "          <p>continual open ballot elections - represent others at anytime</p>\n" +
    "\n" +
    "          <hr>\n" +
    "          <a href=\"/about\" class=\"btn btn-default\">learn more</a>\n" +
    "          <div style=\"height:100px;\"></div>\n" +
    "          <div style=\"height:100px;\"></div>\n" +
    "          <div style=\"height:100px;\"></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div id=\"register\">\n" +
    "        <div ng-include=\"'register/index.tpl.html'\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "      <div id=\"bills\">\n" +
    "        <div class=\"container\">\n" +
    "          \n" +
    "          <h2><a href=\"/bills\">{{billCount}} bills</a></h2><hr>\n" +
    "\n" +
    "          <div class=\"container\">\n" +
    "            <div class='md-padding' layout=\"row\" layout-align=\"center\" layout-wrap>\n" +
    "              <md-card flex=\"30\" ng-repeat=\"bill in bills\">\n" +
    "                <md-card-title>\n" +
    "                  <md-card-title-text>\n" +
    "                    <a href=\"/bill/{{bill.id}}/{{bill.title.replace(' ','-')}}\">\n" +
    "                      <span class=\"\">{{bill.title}}</span>\n" +
    "                    </a>\n" +
    "                  </md-card-title-text>\n" +
    "                </md-card-title>\n" +
    "              </md-card>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-click=\"loadMoreBills()\" style=\"text-align:center\">\n" +
    "            <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">more</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div id=\"committees\">\n" +
    "        <div class=\"container\">\n" +
    "\n" +
    "          <h2><a href=\"/committees\">{{committeeCount}} committees</a></h2><hr>\n" +
    "\n" +
    "          <div class=\"container\">\n" +
    "            <div class='md-padding' layout=\"row\" layout-align=\"center\" layout-wrap>\n" +
    "              <md-card flex=\"15\" ng-repeat=\"committee in committees\">\n" +
    "                <md-card-title>\n" +
    "                  <md-card-title-text>\n" +
    "                    <a href=\"/committee/{{committee.urlTitle}}\">\n" +
    "                      <span class=\"\">{{committee.title}}</span>\n" +
    "                    </a>\n" +
    "                  </md-card-title-text>\n" +
    "                </md-card-title>\n" +
    "              </md-card>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-click=\"loadMoreCommittees()\" style=\"text-align:center\">\n" +
    "            <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">more</button>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div id=\"members\">\n" +
    "        <div class=\"container\">\n" +
    "          <!--<p>local counties / search</p>-->\n" +
    "          <h2>{{userCount}} members</h2><hr>\n" +
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
    "\n" +
    "          <div ng-click=\"loadMoreMembers()\" style=\"text-align:center\">\n" +
    "            <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">more</button>\n" +
    "          </div>\n" +
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
    "<div class=\"intro-container intro\" style=\"max-height:700px\">\n" +
    "    <svg class=\"intro\" style=\"max-height:700px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1920 1080\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid slice\">\n" +
    "        <defs>\n" +
    "            <mask class=\"intro-mask\" id=\"intro-mask\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\">\n" +
    "                <rect class=\"intro-rect\" x=\"0\" y=\"0\" width=\"1920px\" height=\"1080px\"></rect>\n" +
    "                <text x=\"960\" y=\"40%\" class=\"medium-text desktop\">build empowerment, change consensus</text>\n" +
    "                <text x=\"960\" y=\"38%\" class=\"medium-text mobile\">build empowerment, change consensus</text>\n" +
    "                <text x=\"960\" y=\"45%\" class=\"small-text mantra\">with direct input on policy, direct your impact</text>\n" +
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
    "<div class=\"login-form container\" style=\"min-height:100%;\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
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
    "    <!--<div class=\"row\">\n" +
    "        <div style=\"text-align:center\">\n" +
    "            <a href=\"/auth/facebook\">facebook</a>\n" +
    "            <a href=\"/auth/twitter\">twitter</a>\n" +
    "            <a href=\"/auth/google\">google</a>\n" +
    "        </div>\n" +
    "    </div>-->\n" +
    "    <div class=\"row\">\n" +
    "        <div style=\"text-align:center\">\n" +
    "            <a href=\"/register\">register an account</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
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
    "	      	<img class=\"profile-bgHome\" src=\"{{member.coverUrl}}\" />\n" +
    "	      </div>\n" +
    "		  <ul class=\"data-user\">\n" +
    "			<li><a><strong>{{committees.length}}</strong><span>Committees</span></a></li>\n" +
    "			<li><a><strong>{{constituents.length || 0}}</strong><span>Constituents</span></a></li>\n" +
    "			<li><a><strong>{{representatives.length || 0}}</strong><span>Representatives</span></a></li>\n" +
    "			<li><a><strong>{{voteCount}}</strong><span>Votes</span></a></li>\n" +
    "			<!--<li><a><strong>{{followers.length}}</strong><span>Followers</span></a></li>\n" +
    "			<li><a><strong>{{following.length}}</strong><span>Following</span></a></li>-->\n" +
    "		  </ul>\n" +
    "		  <!--\n" +
    "		  <div class=\"container\">\n" +
    "			<ul class=\"nav nav-tabs\" style=\"margin-left:11em\">\n" +
    "				<li><a href=\"#\">Activity</a></li>\n" +
    "				<li><a href=\"#\">Committees</a></li>\n" +
    "				<li><a href=\"#\">Representing</a></li>\n" +
    "				<li><a href=\"#\">Followers</a></li>\n" +
    "				<li><a href=\"#\">Following</a></li>\n" +
    "				<li><a href=\"#\">Votes</a></li>\n" +
    "				<li><a href=\"#\">Follow</a></li>\n" +
    "				<li ng-show=\"currentUser.id == member.id\"><a href=\"#\">Edit Profile</a></li>\n" +
    "		  	</ul>\n" +
    "		  </div>\n" +
    "		  <md-divider></md-divider>\n" +
    "		  -->\n" +
    "	      <div class=\"container\">\n" +
    "	      	<img class=\"avatar\" src=\"{{member.avatarUrl}}\"/>\n" +
    "	  	  </div>\n" +
    "	    </div>\n" +
    "	    <div class=\"user-profile-data container\">\n" +
    "	      <h2>{{member.username}}</h2>\n" +
    "	      <!--<button class=\"btn btn-default\">follow</button><br>-->\n" +
    "	      <button class=\"btn btn-primary\" ng-click=\"selectAsRepresentative()\">select as a representative</button><br>\n" +
    "\n" +
    "	      <!--<button class=\"btn btn-primary\" ng-click=\"removeRepresentative()\">remove as a representative</button>-->\n" +
    "\n" +
    "	      <!--can have dif reps per committee-->\n" +
    "	      <!--represented by (list of reps with each committee)-->\n" +
    "	      <div ng-show=\"currentUser.id == member.id\">\n" +
    "			<button class=\"btn btn-primary\"><a href=\"/account\">settings</a></button>\n" +
    "		  </div>\n" +
    "	      <br><br>\n" +
    "	    </div>\n" +
    "	  </div>\n" +
    "	</div>\n" +
    "\n" +
    "	<uib-tabset class=\"container\">\n" +
    "		<uib-tab heading=\"Activity\" active=\"active\">\n" +
    "		</uib-tab>\n" +
    "		<uib-tab heading=\"Committees\">\n" +
    "		</uib-tab>\n" +
    "		<uib-tab heading=\"Constituents\">\n" +
    "			<md-card ng-repeat=\"constituent in constituents\">\n" +
    "				<md-card-title-text>\n" +
    "					<a href=\"/member/{{constituent.constituent.username}}/\">{{constituent.constituent.username}}</a>\n" +
    "				</md-card-title-text>\n" +
    "			</md-card>\n" +
    "		</uib-tab>\n" +
    "		<uib-tab heading=\"Representatives\">\n" +
    "			<md-card ng-repeat=\"representative in representatives\">\n" +
    "				<md-card-title-text>\n" +
    "					<a href=\"/member/{{representative.representative.username}}/\">{{representative.representative.username}}</a>\n" +
    "				</md-card-title-text>\n" +
    "			</md-card>\n" +
    "		</uib-tab>\n" +
    "		<!--<uib-tab heading=\"Followers\">\n" +
    "		</uib-tab>\n" +
    "		<uib-tab heading=\"Following\">\n" +
    "		</uib-tab>-->\n" +
    "		<uib-tab heading=\"Votes\">\n" +
    "			<md-card ng-repeat=\"vote in votes\">\n" +
    "				<md-card-title>\n" +
    "					<md-card-title-text>\n" +
    "						<p>{{vote.voteString}}</p> on behalf of {{constituents.length}} constituents about\n" +
    "						<a href=\"/vote/{{vote.vote.id}}\">{{vote.vote.title}}</a> for \n" +
    "						<a href=\"/bill/{{vote.bill.id}}/{{vote.bill.title}}\">{{vote.bill.title}}</a>\n" +
    "					</md-card-title-text>\n" +
    "				</md-card-title>\n" +
    "			</md-card>\n" +
    "		</uib-tab>\n" +
    "		<!--<uib-tab heading=\"Follow\">\n" +
    "		</uib-tab>-->\n" +
    "		<!--<uib-tab heading=\"Select as a representative\">\n" +
    "		</uib-tab>-->\n" +
    "		<uib-tab ng-click=\"goToAccount()\" ng-show=\"currentUser.id == member.id\" heading=\"Edit Profile\">\n" +
    "		</uib-tab>\n" +
    "	</uib-tabset>\n" +
    "	\n" +
    "	<div class=\"container\" id=\"profile-activity\">\n" +
    "		<br>\n" +
    "		<md-card ng-repeat=\"vote in votes\">\n" +
    "			<md-card-title>\n" +
    "				<md-card-title-text>\n" +
    "					<p>{{vote.voteString}}</p> on behalf of {{constituents.length}} constituents about\n" +
    "					<a href=\"/vote/{{vote.vote.id}}\">{{vote.vote.title}}</a> for \n" +
    "					<a href=\"/bill/{{vote.bill.id}}/{{vote.bill.title}}\">{{vote.bill.title}}</a>\n" +
    "				</md-card-title-text>\n" +
    "			</md-card-title>\n" +
    "			<!--\n" +
    "			<md-card-title-media>\n" +
    "				<div class=\"md-media-lg card-media\"><img class=\"avatar\" src=\"{{member.avatarUrl}}\"/></div>\n" +
    "			</md-card-title-media>\n" +
    "			-->\n" +
    "		</md-card>\n" +
    "		<br><br>	\n" +
    "		<div ng-show=\"votes.legnth > 0 && votes.legnth != voteCount\" ng-click=\"loadMore()\" style=\"text-align:center\">\n" +
    "		  <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">LOAD MORE</button>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div style=\"height:50px\"></div>\n" +
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
    "  <div class=\"container center\">\n" +
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
    "        <li ng-show=\"!currentUser\"><a href=\"/about\">about</a></li>\n" +
    "        <li><a href=\"/search\">discover</a></li>\n" +
    "\n" +
    "        <form class=\"navbar-form pull-left\" role=\"search\" action=\"/search/\" onSubmit=\" location.href = 'search/' + document.getElementById('search-link').value; return false;\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <input ng-keyup=\"keyPress(searchValue)\" ng-model=\"searchValue\" id=\"search-link\" size=\"40\" type=\"text\" placeholder=\"\">\n" +
    "          </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <!--<li ng-show=\"currentUser\"><a href=\"/account\">account</a></li>-->\n" +
    "        <li ng-show=\"currentUser\"><a href=\"/account\">{{currentUser.username}}</a></li>\n" +
    "\n" +
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
    "<div class=\"register-form container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
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
    "                <!--<div class=\"form-group\">\n" +
    "                    <label for=\"inputFirstName3\" class=\"col-sm-2 control-label\">First Name</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" class=\"form-control\" id=\"inputFirstName3\" name=\"firstName\" placeholder=\"First Name\" value=\"\">\n" +
    "                    </div>\n" +
    "                </div>-->\n" +
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
    "        </div>\n" +
    "    </div>\n" +
    "    <hr>\n" +
    "    <!--<div class=\"row\">\n" +
    "        <div style=\"text-align:center\">\n" +
    "            <a href=\"/auth/facebook\">facebook</a>\n" +
    "            <a href=\"/auth/twitter\">twitter</a>\n" +
    "            <a href=\"/auth/google\">google</a>\n" +
    "        </div>\n" +
    "    </div>-->\n" +
    "    <div class=\"row\">\n" +
    "        <div style=\"text-align:center\">\n" +
    "            <a href=\"/login\">already have an account?</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("search/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/index.tpl.html",
    "<div ui-view=\"search\">\n" +
    "	<div style=\"margin-left:10%;margin-right:10%;margin-top:5%\">\n" +
    "		<div ng-show=\"!searchQuery\">\n" +
    "			<h1>discover content</h1>\n" +
    "			<p>trending</p>\n" +
    "			<h4>committees</h4>\n" +
    "			<h4>members</h4>\n" +
    "			<h4>bills</h4>\n" +
    "			<h4>votes</h4>\n" +
    "			\n" +
    "		</div>\n" +
    "		<div ng-show=\"searchQuery\">\n" +
    "			<div>\n" +
    "				<h1>{{searchQuery}}</h1><hr style=\"width:100%\">\n" +
    "			</div>\n" +
    "\n" +
    "			<!--<input ng-keyup=\"keyPress(searchValue)\" ng-model=\"searchValue\">\n" +
    "			<div ng-repeat=\"searchResult in searchResults\">\n" +
    "				<a href=\"/project/{{searchResult.urlTitle}}\">{{searchResult.title}}</a>\n" +
    "			</div>\n" +
    "			<div style=\"height:100px\"></div>-->\n" +
    "\n" +
    "\n" +
    "			<div ng-repeat=\"searchResult in searchResults\">\n" +
    "				<h4 ng-show=\"searchResult.username\"><a href=\"/member/{{searchResult.username}}\">{{searchResult.username}}</a></h4>\n" +
    "				<h4 ng-show=\"searchResult.billContent\"><a href=\"/bill/{{searchResult.id}}/{{searchResult.title}}\">{{searchResult.title}}</a></h4>\n" +
    "				<h4 ng-show=\"!searchResult.billContent\"><a href=\"/committee/{{searchResult.urlTitle}}\">{{searchResult.title}}</a></h4>\n" +
    "			</div>\n" +
    "			<br>\n" +
    "			<!--<div ng-repeat=\"searchResult in searchResults\">\n" +
    "				<h4><a href=\"/member/{{searchResult.username}}\">{{searchResult.username}}</a></h4>\n" +
    "			</div>-->\n" +
    "		</div>\n" +
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
    "		<h3>{{vote.title}}</h3>\n" +
    "		<button class=\"btn btn-default\" ng-click=\"createVote(1)\"><i class=\"fa fa-caret-up\"></i></button>\n" +
    "        <button class=\"btn btn-default\" ng-click=\"createVote(-1)\"><i class=\"fa fa-caret-down\"></i></button>\n" +
    "		<h5><a href=\"bill/{{vote.bill.id}}/{{vote.bill.urlTitle}}\">{{vote.bill.title}}</a></h5>\n" +
    "		<md-divider></md-divider>\n" +
    "		<br><br>\n" +
    "		<div class=\"voteVoteContainer\">\n" +
    "			<div class=\"voteVote\" ng-repeat=\"vote in votes\">\n" +
    "				{{vote.voteCount}}\n" +
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
    "	  <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">LOAD MORE</button>\n" +
    "	</div>\n" +
    "</md-content>\n" +
    "\n" +
    "<div style=\"height:100px;\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);
