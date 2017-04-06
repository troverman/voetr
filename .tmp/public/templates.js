angular.module('templates-app', ['about/index.tpl.html', 'account/index.tpl.html', 'bill/index.tpl.html', 'bills/index.tpl.html', 'committee/index.tpl.html', 'committee/templates/bills.tpl.html', 'committee/templates/committees.tpl.html', 'committee/templates/discussion.tpl.html', 'committee/templates/home.tpl.html', 'committee/templates/members.tpl.html', 'committee/templates/votes.tpl.html', 'committees/index.tpl.html', 'footer/index.tpl.html', 'home/index.tpl.html', 'home/templates/home.tpl.html', 'home/templates/intro.tpl.html', 'login/index.tpl.html', 'member/index.tpl.html', 'member/templates/activity.tpl.html', 'member/templates/bills.tpl.html', 'member/templates/committees.tpl.html', 'member/templates/constituents.tpl.html', 'member/templates/representatives.tpl.html', 'member/templates/votes.tpl.html', 'nav/index.tpl.html', 'register/index.tpl.html', 'search/index.tpl.html', 'vote/index.tpl.html', 'votes/index.tpl.html']);

angular.module("about/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("about/index.tpl.html",
    "<div class=\"imageContainer\">\n" +
    "	<video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\"></video>\n" +
    "	<div class=\"imageContainerDiv container\">  \n" +
    "		<h1>build empowerment, change consensus</h1>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div class=\"about-container\">\n" +
    "	<div id=\"section1\">\n" +
    "		<div class=\"container\">\n" +
    "			<h2>the voice of the internet</h2>\n" +
    "			<p>directly impact the political landscape</p>\n" +
    "			<img style=\"height:64px\" src=\"http://www.freeiconspng.com/uploads/vote-icon-19.png\"/>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div id=\"section2\">\n" +
    "		<div class=\"container\">\n" +
    "			<h4>direct your impact though input on policy</h4>\n" +
    "			<p>decision making influence in the power of your hands</p>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div id=\"section3\">\n" +
    "		<div class=\"container\">\n" +
    "			<h4>elect representatives and serve your constituents</h4>\n" +
    "	    	<p>with continual elections, select others to represent you at any time</p>\n" +
    "	    </div>\n" +
    "	</div>\n" +
    "	<div id=\"section4\">\n" +
    "		<div class=\"container\">\n" +
    "			<img style=\"height:64px;\" src=\"images/voetr_icon.png\"/>\n" +
    "			<h4>power to the people</h4>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("account/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("account/index.tpl.html",
    "<!--we need some hover css here... we have on click editing-->\n" +
    "<div style=\"height:25em;width: 100%;overflow: hidden;\" ngf-accept=\"'image/*'\" ngf-drop ngf-select=\"uploadCover($file)\" ng-model=\"file\" class=\"drop-box\" ngf-drag-over-class=\"dragover\" ngf-allow-dir=\"true\" href=\"#\">\n" +
    "	<img style=\"width:100%;min-height:35em;\" src=\"{{user.coverUrl}}\">\n" +
    "</div>\n" +
    "<div class=\"container\">\n" +
    "	<!--we need some hover css here... we have on click editing-->\n" +
    "	<a ngf-accept=\"'image/*'\" ngf-drop ngf-select=\"uploadAvatar($file)\" ng-model=\"file\" class=\"drop-box\" ngf-drag-over-class=\"dragover\" ngf-allow-dir=\"true\" href=\"#\"><img class=\"avatar\" src=\"{{user.avatarUrl}}\"/></a>\n" +
    "	<h3><a href=\"/member/{{currentUser.username}}\">{{user.username}}</a></h3>\n" +
    "	<md-divider></md-divider>\n" +
    "	<br><br>\n" +
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
    "			<md-input-container>\n" +
    "				<label class=\"modal-label\">Address</label>\n" +
    "				<input ng-model=\"user.address\" required name=\"Address\" type=\"text\">\n" +
    "			</md-input-container>\n" +
    "		</div>\n" +
    "		<button type=\"submit\" class=\"btn btn-primary\">Save</button>\n" +
    "	</form>\n" +
    "\n" +
    "	<br><br>\n" +
    "	<md-divider></md-divider>\n" +
    "\n" +
    "	<!--\n" +
    "	<h3>Update Avatar</h3>\n" +
    "	<div ngf-accept=\"'image/*'\" ngf-drop ngf-select=\"uploadAvatar($file)\" ng-model=\"file\" class=\"drop-box\" ngf-drag-over-class=\"dragover\" ngf-allow-dir=\"true\">\n" +
    "		<div>Drag photos or click here to upload.</div>\n" +
    "	</div>\n" +
    "	<p ng-show=\"avatarLoading\" style=\"text-align:center\"><i class=\"fa fa-spin fa-spinner\"></i>&nbsp;{{pp}}%</p>\n" +
    "	<div ng-show=\"avatarLoading\" class=\"progress\">\n" +
    "		<div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{avatarPercentage}}%;\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<h3>Update Cover</h3>\n" +
    "	<div ngf-accept=\"'image/*'\" ngf-drop ngf-select=\"uploadCover($file)\" ng-model=\"file\" class=\"drop-box\" ngf-drag-over-class=\"dragover\" ngf-allow-dir=\"true\">\n" +
    "		<div>Drag photos or click here to upload.</div>\n" +
    "	</div>\n" +
    "	<p ng-show=\"coverLoading\" style=\"text-align:center\"><i class=\"fa fa-spin fa-spinner\"></i>&nbsp;{{pp}}%</p>\n" +
    "	<div ng-show=\"coverLoading\" class=\"progress\">\n" +
    "		<div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{coverPercentage}}%;\"></div>\n" +
    "	</div>\n" +
    "	-->\n" +
    "\n" +
    "	<h3>Verified Account</h3>\n" +
    "	<md-divider></md-divider>\n" +
    "	<h4>government identification</h4>\n" +
    "	<div ngf-accept=\"'image/*'\" ngf-drop ngf-select=\"uploadIdentification($file)\" ng-model=\"file\" class=\"drop-box\" ngf-drag-over-class=\"dragover\" ngf-allow-dir=\"true\">\n" +
    "		<p>by providing official identification, government officials have more of an incentive to respond and your voice carries more weight.</p>\n" +
    "		<img ng-show=\"user.identificationUrl\" src=\"{{user.identificationUrl}}\">\n" +
    "	</div>\n" +
    "	<p ng-show=\"identificationLoading\" style=\"text-align:center\"><i class=\"fa fa-spin fa-spinner\"></i>&nbsp;{{pp}}%</p>\n" +
    "	<div ng-show=\"identificationLoading\" class=\"progress\">\n" +
    "		<div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{identificationPercentage}}%;\"></div>\n" +
    "	</div>\n" +
    "	<br>\n" +
    "	<md-input-container class=\"md-block\">\n" +
    "		<label class=\"modal-label\">Address</label>\n" +
    "		<input ng-model=\"user.address\" required name=\"address\" type=\"text\">\n" +
    "		<button type=\"submit\" class=\"btn btn-primary\">Save</button>\n" +
    "	</md-input-container>\n" +
    "	<!--<p>ssn</p>-->\n" +
    "\n" +
    "	<h3>Connected Accounts</h3>\n" +
    "	<md-divider></md-divider><br>\n" +
    "	<a href=\"{{user.socialAccounts.facebook.profileUrl}}\">\n" +
    "		<img style=\"height:64px;\" src=\"{{user.socialAccounts.facebook.profilePic}}\">\n" +
    "		<span>{{user.socialAccounts.facebook.displayName}}</span>\n" +
    "	</a>\n" +
    "	<a ng-show=\"!facebookPassport\" class=\"btn btn-primary\" href=\"/auth/facebook\">connect facebook</a>\n" +
    "	<a ng-show=\"facebookPassport\" class=\"btn btn-primary\" ng-click=\"removePassport('facebook')\">disconnect facebook</a>\n" +
    "\n" +
    "	<br><br>\n" +
    "	<a ng-show=\"!twitterPassport\"class=\"btn btn-primary\" href=\"/auth/twitter\">connect twitter</a>\n" +
    "	<a href=\"{{user.socialAccounts.twitter.profileUrl}}\">\n" +
    "		<img style=\"height:64px;\" src=\"{{user.socialAccounts.twitter.profilePic}}\">\n" +
    "		<span>{{user.socialAccounts.twitter.handle}}</span>\n" +
    "	</a>\n" +
    "	<a ng-show=\"!twitterPassport\"class=\"btn btn-primary\" href=\"/auth/twitter\">connect twitter</a>\n" +
    "	<a ng-show=\"twitterPassport\"class=\"btn btn-primary\" ng-click=\"removePassport('twitter')\">disconnect twitter</a>\n" +
    "\n" +
    "	<br><br>\n" +
    "	<a href=\"{{user.socialAccounts.google.profileUrl}}\">\n" +
    "		<img style=\"height:64px;\" src=\"{{user.socialAccounts.google.profilePic}}\">\n" +
    "		<span>{{user.socialAccounts.google.displayName}}</span>\n" +
    "	</a>\n" +
    "	<a ng-show=\"!googlePassport\"class=\"btn btn-primary\" href=\"/auth/google\">connect google</a>\n" +
    "	<a ng-show=\"googlePassport\"class=\"btn btn-primary\" ng-click=\"removePassport('google')\">disconnect google</a>\n" +
    "\n" +
    "	<br><br>\n" +
    "	<!--<a class=\"btn btn-primary\" href=\"/auth/btc\">connect btc wallet</a>-->\n" +
    "\n" +
    "\n" +
    "	<h3>Settings</h3>\n" +
    "	<md-divider></md-divider><br>\n" +
    "	<h4>email settings</h4>\n" +
    "	<a ng-show=\"localPassport.length==0\" class=\"btn btn-primary\" href=\"/auth/facebook\">connect email</a>\n" +
    "	<a ng-show=\"localPassport.length>0\" class=\"btn btn-primary\">reset password</a>\n" +
    "\n" +
    "	<h4>contact settings</h4>\n" +
    "	<p>send email</p>\n" +
    "	<p>send fax</p>\n" +
    "	<p>send letter</p>\n" +
    "	<!--<p>all activity, per vote.. on creation of bill, on profile comment</p>-->\n" +
    "\n" +
    "	<div style=\"height:100px;\"></div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
    "");
}]);

angular.module("bill/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("bill/index.tpl.html",
    "<div ui-view=\"bill\">\n" +
    "	<div class=\"billContainer container\" style=\"min-height:100vh\">\n" +
    "		<h3>0 - {{bill.title}}</h3>\n" +
    "		<md-subheader ng-bind=\"bill.createdAt | date:'MM/dd/yyyy h:mma'\" class=\"md-no-sticky\"></md-subheader><br>\n" +
    "		<div ng-repeat=\"committee in bill.committees\">\n" +
    "			<p><a href=\"committee/{{committee.urlTitle}}\">{{committee.title}}</a></p>\n" +
    "		</div>\n" +
    "		<div class=\"spacing-10\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<button class=\"col-xs-6 btn btn-default\" ng-click=\"createVote(1)\"><i class=\"fa fa-caret-up\"></i> {{vote.plusCount}}</button>\n" +
    "        	<button class=\"col-xs-6 btn btn-default\" ng-click=\"createVote(-1)\"><i class=\"fa fa-caret-down\"></i> {{vote.minusCount}}</button>\n" +
    "    	</div>\n" +
    "    	<div class=\"spacing-10\"></div>\n" +
    "		<uib-tabset>\n" +
    "			<uib-tab heading=\"Info\" active=\"active\">\n" +
    "				<div class=\"col-lg-4 col-sm-6\">\n" +
    "					<div class=\"member-card\">\n" +
    "						<div class=\"image\" style=\"background-image: url('{{bill.user.coverUrl}}')\">\n" +
    "							<img ng-src=\"{{bill.user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "						</div>\n" +
    "						<div class=\"info\">\n" +
    "						    <h2 class=\"name\"><a href=\"member/{{bill.user.username}}\">{{bill.user.username}}</a></h2>\n" +
    "						    <p>{{bill.user.title}}</p>\n" +
    "							<p>{{bill.user.state}}</p>\n" +
    "						</div>\n" +
    "						<div class=\"social\">\n" +
    "							<a ng-show=\"bill.user.socialAccounts.facebook.profileUrl\" href=\"{{bill.user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "							<a ng-show=\"bill.user.socialAccounts.twitter.profileUrl\" href=\"{{bill.user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "							<a ng-show=\"bill.user.socialAccounts.google.profileUrl\" href=\"{{bill.user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"col-sm-8\">\n" +
    "					<br>\n" +
    "					<p>{{bill.billContent.current_status_description}}</p>\n" +
    "					<p>{{bill.billContent.current_status_label}}</p>\n" +
    "					<div ng-show=\"bill.summary\">\n" +
    "						<h4>Summary</h4>\n" +
    "						<p style=\"color:rgb(100,100,100)\">{{bill.summary}}</p>\n" +
    "					</div>\n" +
    "					<div ng-bind-html=\"billContent\"></div>\n" +
    "				</div>\n" +
    "		    </uib-tab>\n" +
    "		    <uib-tab heading=\"Activity\">\n" +
    "		    	{{actions}}\n" +
    "		    </uib-tab>\n" +
    "			<uib-tab heading=\"Discussion\">\n" +
    "				<div class=\"profilePost\">\n" +
    "					<form role=\"form\">\n" +
    "						<md-input-container class=\"md-block\">\n" +
    "							<textarea ng-model=\"newPost.post\" md-maxlength=\"150\" rows=\"5\" md-select-on-focus aria-label=\"new post\"></textarea>\n" +
    "							<button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "						</md-input-container>\n" +
    "					</form>\n" +
    "		        </div>\n" +
    "		        <md-card ng-repeat=\"post in posts\">\n" +
    "		          <md-card-title>\n" +
    "		            <md-card-title-text>\n" +
    "			            <a href=\"member/{{post.user.username}}\">\n" +
    "			              <img style=\"max-width:64px\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "			              <h4>{{post.user.username}}</h4>\n" +
    "			            </a>\n" +
    "			            <p>{{post.post}}</p>\n" +
    "		            </md-card-title-text>\n" +
    "		          </md-card-title>\n" +
    "		        </md-card>\n" +
    "		    </uib-tab>\n" +
    "		    <uib-tab heading=\"Votes\">\n" +
    "	    		<div ng-show=\"currentUser\">\n" +
    "					<form role=\"form\">\n" +
    "						<md-input-container class=\"md-block\">\n" +
    "							<textarea ng-model=\"newVote.title\" md-maxlength=\"150\" rows=\"5\" md-select-on-focus aria-label=\"newVote\"></textarea>\n" +
    "							<button type=\"submit\" ng-click=\"\" class=\"btn btn-default\">Submit</button>\n" +
    "						</md-input-container>\n" +
    "					</form>\n" +
    "				</div>\n" +
    "			    <div class=\"voteContainer\" ng-show=\"votes.length!=0\">\n" +
    "					<md-card ng-repeat=\"vote in bill.votes\">\n" +
    "						<md-card-title>\n" +
    "							<h4>\n" +
    "				      			<button class=\"btn btn-default\" ng-click=\"createVote(1, vote)\"><i class=\"fa fa-caret-up\"></i> {{vote.plusCount}}</button>\n" +
    "				      			<button class=\"btn btn-default\" ng-click=\"createVote(-1, vote)\"><i class=\"fa fa-caret-down\"></i> {{vote.minusCount}}</button>\n" +
    "								<button class=\"btn btn-default\" ng-click=\"createVote(0, vote)\"><i class=\"fa fa-question\"></i> {{vote.otherCount}}</button>\n" +
    "				      			({{vote.voteCount}})\n" +
    "								<a href=\"/vote/{{vote.id}}\">{{vote.result}}: {{vote.title}}</a>\n" +
    "							</h4>\n" +
    "							<p>comment</p>\n" +
    "						</md-card-title>\n" +
    "					</md-card>\n" +
    "				</div>\n" +
    "		    </uib-tab>\n" +
    "			<uib-tab heading=\"Related\">\n" +
    "				<div ng-repeat=\"bill in bill.relatedBills\">\n" +
    "					<p><a href=\"bill/{{bill.urlTitle}}\">{{bill.title}}</a></p>\n" +
    "				</div>\n" +
    "		    </uib-tab>\n" +
    "		</uib-tabset>\n" +
    "		<div class=\"spacing-100\"></div>\n" +
    "	</div>\n" +
    "	<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("bills/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("bills/index.tpl.html",
    "<div class=\"imageContainerSmall\">\n" +
    "    <video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\"></video>\n" +
    "    <div class=\"imageContainerSmallDiv container\">  \n" +
    "        <h1 style=\"text-align:left\">bills</h1>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"dropdown sort-dropdown noselect\">\n" +
    "        <a class=\"dropdown-toggle noselect\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "            <h4 class=\"noselect\">Sort by {{sort}}<span class=\"caret\"></span></h4>\n" +
    "        </a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li><a class=\"sort-a\" ng-click=\"selectSort('createdAt DESC')\"><h5>Most Recent</h5></a></li>\n" +
    "            <hr class=\"sort-hr\">\n" +
    "            <li><a class=\"sort-a\" ng-click=\"selectSort('voteCount DESC')\"><h5>Highest Rated</h5></a></li>\n" +
    "            <hr class=\"sort-hr\">\n" +
    "            <li><a class=\"sort-a\" ng-click=\"selectSort('voteCount ASC')\"><h5>Lowest Rated</h5></a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <md-card ng-repeat=\"bill in bills\">\n" +
    "        <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "            <h4>\n" +
    "                {{bill.voteCount}}\n" +
    "                <button ng-class=\"{'upVoted': vote.class=='upVote'}\" class=\"btn btn-default upVote\" ng-click=\"createVote(1, vote)\"><i class=\"fa fa-caret-up\"></i>  {{vote.plusCount}}</button>\n" +
    "                <button ng-class=\"{'downVoted': vote.class=='downVote'}\" class=\"btn btn-default downVote\" ng-click=\"createVote(-1, vote)\"><i class=\"fa fa-caret-down\"></i>  {{vote.minusCount}}</button>\n" +
    "                <a href=\"/bill/{{bill.id}}/{{bill.title.replace(' ','-')}}\">{{bill.title}}</a>\n" +
    "            </h4>\n" +
    "            </md-card-title-text>\n" +
    "        </md-card-title>\n" +
    "    </md-card>\n" +
    "</div>\n" +
    "<md-divider></md-divider>\n" +
    "<div class=\"spacing-10\"></div>\n" +
    "<div ng-click=\"loadMore()\" style=\"text-align:center\">\n" +
    "    <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-caret-down\"></i></button>\n" +
    "</div>\n" +
    "<div class=\"spacing-50\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("committee/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committee/index.tpl.html",
    "<div ui-view=\"committeeHome\"></div>\n" +
    "<div ui-view=\"committeeBills\"></div>\n" +
    "<div ui-view=\"committeeCommittees\"></div>\n" +
    "<div ui-view=\"committeeDiscussion\"></div>\n" +
    "<div ui-view=\"committeeMembers\"></div>\n" +
    "<div ui-view=\"committeeVotes\"></div>\n" +
    "");
}]);

angular.module("committee/templates/bills.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committee/templates/bills.tpl.html",
    "<div id=\"sidebar-wrapper\">\n" +
    "  <ul class=\"sidebar-nav\">\n" +
    "    <br>\n" +
    "    <li><a style=\"font-weight:bold\" href=\"committee/{{committee.urlTitle}}\">{{committee.title}}</a></li>\n" +
    "    <hr>\n" +
    "    <li><a href=\"#\">bylaws</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/committees\">committees</a></li>\n" +
    "    <li style=\"color: #fff;background: #4b5359\"><a style=\"color: #2AB996\" href=\"committee/{{committee.urlTitle}}/bills\">bills</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/discussion\">discussion</a></li>\n" +
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
    "          <a href=\"/bill/{{bill._id}}/{{bill.title}}\">{{bill.title}}</a>\n" +
    "        </h4>\n" +
    "      </div>\n" +
    "      <div>\n" +
    "        <a href=\"/bill/{{bill._id}}/{{bill.title}}\">comment</a>\n" +
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

angular.module("committee/templates/committees.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committee/templates/committees.tpl.html",
    "<div id=\"sidebar-wrapper\">\n" +
    "  <ul class=\"sidebar-nav\">\n" +
    "    <br>\n" +
    "    <li><a style=\"font-weight:bold\" href=\"committee/{{committee.urlTitle}}\">{{committee.title}}</a></li>\n" +
    "    <hr>\n" +
    "    <li><a href=\"#\">bylaws</a></li>\n" +
    "    <li style=\"color: #fff;background: #4b5359\"><a style=\"color: #2AB996\" href=\"committee/{{committee.urlTitle}}/committees\">committees</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/bills\">bills</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/discussion\">discussion</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/members\">members</a></li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "<div id=\"main-container\">\n" +
    "  <div class=\"committee-title\">\n" +
    "    <a href=\"committee/{{committee.parent.urlTitle}}\">{{committee.parent.title}}</a>\n" +
    "    <h1>{{committee.title}}</h1>\n" +
    "  </div>\n" +
    "  <h1>committees</h1>\n" +
    "  <div ng-repeat=\"committee in committees\">\n" +
    "    <a href=\"committee/{{committee.urlTitle}}\">{{committee.title}}</a>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("committee/templates/discussion.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committee/templates/discussion.tpl.html",
    "<div id=\"sidebar-wrapper\">\n" +
    "  <ul class=\"sidebar-nav\">\n" +
    "    <br>\n" +
    "    <li><a style=\"font-weight:bold\" href=\"committee/{{committee.urlTitle}}\">{{committee.title}}</a></li>\n" +
    "    <hr>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/bills\">bills<i class=\"fa fa-pencil\"></i></a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/committees\">committees<i class=\"fa fa-pencil\"></i></a></li>\n" +
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
    "    <md-card ng-repeat=\"post in posts\">\n" +
    "      <md-card-title>\n" +
    "        <md-card-title-text>\n" +
    "        <a href=\"member/{{post.user.username}}\">\n" +
    "          <img style=\"max-width:64px\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "          <p>{{post.user.username}}</p>\n" +
    "        </a>\n" +
    "        <p>{{post.post}}</p>\n" +
    "        </md-card-title-text>\n" +
    "      </md-card-title>\n" +
    "    </md-card>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("committee/templates/home.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committee/templates/home.tpl.html",
    "<!--<div id=\"sidebar-wrapper\">\n" +
    "  <ul class=\"sidebar-nav\">\n" +
    "    <br>\n" +
    "    <li><a style=\"font-weight:bold\" href=\"committee/{{committee.urlTitle}}\">{{committee.title}}</a></li>\n" +
    "    <hr>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/bills\">bills</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/discussion\">discussion</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/members\">members</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/votes\">votes</a></li>\n" +
    "  </ul>\n" +
    "</div>-->\n" +
    "<!--\n" +
    "<div style=\"overflow:hidden;max-height:300px;\">\n" +
    "  <img style=\"width:100%;min-height:10em;\" src=\"images/congress1.jpg\">\n" +
    "</div>\n" +
    "-->\n" +
    "<div class=\"imageContainerSmall\">\n" +
    "  <video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\"></video>\n" +
    "  <div class=\"imageContainerSmallDiv container\">  \n" +
    "    <h1 style=\"text-align:left\">{{committee.title}}</h1>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div ng-show=\"currentUser\" class=\"container\">\n" +
    "  <br>\n" +
    "  <button ng-click=\"toggleEditCommittee()\" class=\"btn btn-default\">Edit</button>\n" +
    "  <br>\n" +
    "  <div style=\"margin-left:20%;margin-right:20%;\" ng-show=\"editCommitteeToggle\">edit committee form</div>\n" +
    "  <br>\n" +
    "</div>\n" +
    "<div class=\"container\">\n" +
    "  <uib-tabset>\n" +
    "    <uib-tab heading=\"Activity\" active=\"active\">\n" +
    "      <div class=\"container\" style=\"min-height:100vh\">\n" +
    "        <div class=\"profilePost\">\n" +
    "          <form role=\"form\">\n" +
    "            <md-input-container class=\"md-block\">\n" +
    "              <textarea ng-model=\"newPost.post\" md-maxlength=\"150\" rows=\"5\" md-select-on-focus aria-label=\"new post\"></textarea>\n" +
    "            </md-input-container>\n" +
    "            <button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "        <md-card ng-repeat=\"post in posts\">\n" +
    "          <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "            <a href=\"member/{{post.user.username}}\">\n" +
    "              <img style=\"max-width:64px\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "              <p>{{post.user.username}}</p>\n" +
    "            </a>\n" +
    "            <p>{{post.post}}</p>\n" +
    "            </md-card-title-text>\n" +
    "          </md-card-title>\n" +
    "        </md-card>\n" +
    "        <div class=\"billContainer\" ng-repeat=\"bill in bills | orderBy:'-voteCount'\">\n" +
    "          <div class=\"bill-item\">\n" +
    "            <div>\n" +
    "              <h4>\n" +
    "                {{bill.voteCount}}\n" +
    "                <button class=\"btn btn-default\" ng-click=\"createVote(1, bill)\"><i class=\"fa fa-caret-up\"></i></button>\n" +
    "                <button class=\"btn btn-default\" ng-click=\"createVote(-1, bill)\"><i class=\"fa fa-caret-down\"></i></button>\n" +
    "                <a href=\"bill/{{bill._id}}/{{bill.urlTitle}}\">{{bill.title}}</a>\n" +
    "              </h4>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "              <a href=\"bill/{{bill._id}}/{{bill.title}}\">{{bill.comments.length}} comments, {{bill.votes.length}} votes</a>\n" +
    "            </div>\n" +
    "            <br>\n" +
    "          </div>\n" +
    "          <md-divider ></md-divider>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </uib-tab>\n" +
    "    <uib-tab heading=\"{{bills.length}} Bills\">\n" +
    "      <div ng-show=\"currentUser\" class=\"container\">\n" +
    "        <button ng-click=\"toggleCreateBill()\" class=\"btn btn-default\">+ bill</button>\n" +
    "        <br>\n" +
    "        <div style=\"margin-left:20%;margin-right:20%;\" ng-show=\"createBillToggle\">\n" +
    "          <form class=\"committee-input\" role=\"form\" ng-submit=\"createBill(newBill)\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <input type=\"text\" placeholder= \"bill title\" ng-model=\"newBill.title\" class=\"form-control\">\n" +
    "              <input type=\"text\" placeholder= \"bill content\" ng-model=\"newBill.billContent\" class=\"form-control\">\n" +
    "            </div>\n" +
    "            <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"container bill-list-container\" style=\"min-height:100vh\">\n" +
    "        <div class=\"bill-container\" ng-repeat=\"bill in bills | orderBy:'-voteCount'\">\n" +
    "          <div class=\"bill-item\">\n" +
    "            <div>\n" +
    "              <h4>\n" +
    "                {{bill.voteCount}}\n" +
    "                <button class=\"btn btn-default\" ng-click=\"createVote(1, bill)\"><i class=\"fa fa-caret-up\"></i></button>\n" +
    "                <button class=\"btn btn-default\" ng-click=\"createVote(-1, bill)\"><i class=\"fa fa-caret-down\"></i></button>\n" +
    "                <a href=\"/bill/{{bill._id}}/{{bill.title}}\">{{bill.title}}</a>\n" +
    "              </h4>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "              <a href=\"/bill/{{bill._id}}/{{bill.title}}\">{{bill.comments.length}} comments, {{bill.votes.length}} votes</a>\n" +
    "            </div>\n" +
    "            <br>\n" +
    "          </div>\n" +
    "          <md-divider></md-divider>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </uib-tab>\n" +
    "    <uib-tab heading=\"Discussion\">\n" +
    "      <div class=\"container\" style=\"min-height:100vh\">\n" +
    "        <md-card ng-repeat=\"post in posts\">\n" +
    "          <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "            <a href=\"member/{{post.user.username}}\">\n" +
    "              <img style=\"max-width:64px\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "              <p>{{post.user.username}}</p>\n" +
    "            </a>\n" +
    "            <p>{{post.post}}</p>\n" +
    "            <p>like, comment</p>\n" +
    "            </md-card-title-text>\n" +
    "          </md-card-title>\n" +
    "        </md-card>\n" +
    "      </div>\n" +
    "    </uib-tab>\n" +
    "    <uib-tab heading=\"{{members.length}} Members\">\n" +
    "    <!--<uib-tab heading=\"Members\" ng-click=\"goToPath('members')\">-->\n" +
    "      <div class=\"container\" style=\"min-height:100vh\">\n" +
    "        <div class=\"col-lg-4 col-sm-6\" ng-repeat=\"member in members\">\n" +
    "          <div class=\"member-card\">\n" +
    "            <div class=\"image\" style=\"background-image: url('{{member.user.coverUrl}}')\">\n" +
    "              <img ng-src=\"{{member.user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "            </div>\n" +
    "            <div class=\"info\">\n" +
    "                <h2 class=\"name\"><a href=\"member/{{member.user.username}}\">{{member.user.username}}</a></h2>\n" +
    "                <p>{{member.user.title}}</p>\n" +
    "                <p>{{member.user.state}}</p>\n" +
    "            </div>\n" +
    "            <div class=\"social\">\n" +
    "              <a ng-show=\"member.user.socialAccounts.facebook.profileUrl\" href=\"{{member.user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "              <a ng-show=\"member.user.socialAccounts.twitter.profileUrl\" href=\"{{member.user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "              <a ng-show=\"member.user.socialAccounts.google.profileUrl\" href=\"{{member.user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div> \n" +
    "    </uib-tab>\n" +
    "    <uib-tab heading=\"Votes\">\n" +
    "      <div class=\"container\" style=\"min-height:100vh\">\n" +
    "      </div>\n" +
    "    </uib-tab>\n" +
    "  </uib-tabset>\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("committee/templates/members.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committee/templates/members.tpl.html",
    "<div id=\"sidebar-wrapper\">\n" +
    "  <ul class=\"sidebar-nav\">\n" +
    "    <br>\n" +
    "    <li><a style=\"font-weight:bold\" href=\"committee/{{committee.urlTitle}}\">{{committee.title}}</a></li>\n" +
    "    <hr>\n" +
    "    <!--<li><a href=\"#\">bylaws</a></li>-->\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/bills\">bills</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/committees\">committees</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/discussion\">discussion</a></li>\n" +
    "    <!--<li><a href=\"#\">elections</a></li>-->\n" +
    "    <li style=\"color: #fff;background: #4b5359\"><a style=\"color: #2AB996\" href=\"committee/{{committee.urlTitle}}/members\">members</a></li>\n" +
    "    <li><a href=\"committee/{{committee.urlTitle}}/votes\">votes</a></li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"main-container\">\n" +
    "  <h2>{{members.length}} members</h2>\n" +
    "  <md-divider ></md-divider>\n" +
    "  <div ng-show=\"currentUser\">\n" +
    "    <button class=\"btn btn-default\" ng-click=\"createMember()\">Join Committee</button>\n" +
    "  </div>\n" +
    "  <div class=\"container\">\n" +
    "    <div class=\"col-lg-4 col-sm-6\" ng-repeat=\"member in members\">\n" +
    "      <div style=\"margin:10px; box-shadow: 2px 2px 10px #999;\">\n" +
    "        <div class=\"image\" style=\"background-image: url('{{member.user.coverUrl}}')\">\n" +
    "          <img alt=\"\" style=\"position:absolute;left:0;right0;margin:0 auto;margin-top:4em\" class=\"avatar\" src=\"{{member.user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "        </div>\n" +
    "        <div class=\"info\">\n" +
    "          <h2 class=\"name\"><a href=\"member/{{member.user.username}}\">{{member.user.username}}</a></h2>\n" +
    "          <h3 class=\"position\" style=\"text-transform:capitalize\"><a href=\"member/{{member.user.username}}\">{{member.title}}</a></h3>\n" +
    "          <p>{{member.user.title}}</p>\n" +
    "          <!--<button class=\"btn btn-default\">follow</button>-->\n" +
    "        </div>\n" +
    "        <div class=\"social\">\n" +
    "          <a ng-show=\"member.user.socialAccounts.facebook.profileUrl\" href=\"{{member.user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "          <a ng-show=\"member.user.socialAccounts.twitter.profileUrl\" href=\"{{member.user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "          <a ng-show=\"member.user.socialAccounts.google.profileUrl\" href=\"{{member.user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>  \n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
    "");
}]);

angular.module("committee/templates/votes.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committee/templates/votes.tpl.html",
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

angular.module("committees/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committees/index.tpl.html",
    "<div class=\"imageContainerSmall\">\n" +
    "    <video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\"></video>\n" +
    "    <div class=\"imageContainerSmallDiv container\">  \n" +
    "        <h1 style=\"text-align:left\">committees</h1>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"dropdown sort-dropdown noselect\">\n" +
    "        <a class=\"dropdown-toggle noselect\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "            <h4 class=\"noselect\">Sort by {{sort}}<span class=\"caret\"></span></h4>\n" +
    "        </a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li><a class=\"sort-a\" ng-click=\"selectSort('createdAt DESC')\"><h5>Most Recent</h5></a></li>\n" +
    "            <hr class=\"sort-hr\">\n" +
    "            <li><a class=\"sort-a\" ng-click=\"selectSort('memberCount DESC')\"><h5>Most Popular</h5></a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div ng-show=\"currentUser\">\n" +
    "        <div style=\"margin-left:2%;margin-right:2%;\">\n" +
    "        <form class=\"committee-input\" role=\"form\" ng-submit=\"createCommittee(newCommittee)\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" placeholder= \"committee title\" ng-model=\"newCommittee.title\" class=\"form-control\" id=\"postTitle\">\n" +
    "                <input type=\"text\" placeholder= \"committee url\" ng-model=\"newCommittee.urlTitle\" class=\"form-control\" id=\"postTitle\">\n" +
    "                <input type=\"text\" placeholder= \"committee parent\" ng-model=\"newCommittee.parent\" class=\"form-control\" id=\"postTitle\">\n" +
    "            </div>\n" +
    "            <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n" +
    "        </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"committee-list-parent-container\" id=\"committeeScrolling\">\n" +
    "        <div class=\"committee-list-container\">\n" +
    "            <div class=\"committee-container\" ng-repeat=\"committee in committees\">\n" +
    "                <h2>\n" +
    "                    <a href=\"/committee/{{committee.urlTitle}}\">{{committee.title}}</a>\n" +
    "                </h2>\n" +
    "                <p><span style=\"color:grey\">{{committee.memberCount}} members</span></p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<md-divider></md-divider>\n" +
    "<div class=\"spacing-10\"></div>\n" +
    "<div ng-click=\"loadMore()\" style=\"text-align:center\">\n" +
    "    <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-caret-down\"></i></button>\n" +
    "</div>\n" +
    "<div class=\"spacing-50\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("footer/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("footer/index.tpl.html",
    "<div class=\"footer\" ng-controller=\"FooterCtrl\">\n" +
    "	<div class=\"container\">\n" +
    "		<div class=\"pull-left\">\n" +
    "			{{date | date:'yyyy'}} <a href=\"/\">voetr</a>\n" +
    "		</div>\n" +
    "		<div class=\"pull-right\">\n" +
    "			<a href=\"/about\">about</a>\n" +
    "			<a href=\"/search\">discover</a>\n" +
    "			<a href=\"/bills\">bills</a>\n" +
    "			<a href=\"/committees\">committees</a>\n" +
    "			<a href=\"/votes\">votes</a>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("home/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("home/index.tpl.html",
    "<!--if logged in-->\n" +
    "<div ng-show=\"currentUser\">\n" +
    "  <div class=\"spacing-25\"></div>\n" +
    "  <div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-4\">\n" +
    "        <img class=\"avatar\" style=\"margin-top:0em\" ng-src=\"{{currentUser.avatarUrl}}\"/>\n" +
    "        <h2><a href=\"/member/{{currentUser.username}}\"><b>{{currentUser.username}}</a></b></h2>\n" +
    "        <div class=\"spacing-5\"></div>\n" +
    "        <h5>Bills - {{committees.length}}</h5>\n" +
    "        <h5>Committees - {{committees.length}}</h5>\n" +
    "        <h5>Constituents - {{constituents.length}}</h5>\n" +
    "        <h5>Representatives - {{representatives.length}}</h5>\n" +
    "        <h5>Votes - {{votes.length}}</h5>\n" +
    "        <div class=\"spacing-25\"></div>\n" +
    "        <uib-tabset active=\"0\" vertical=\"true\">\n" +
    "          <uib-tab index=\"0\" heading=\"Activity\">\n" +
    "          </uib-tab>\n" +
    "          <uib-tab heading=\"Bills\">\n" +
    "          </uib-tab>\n" +
    "          <uib-tab heading=\"Posts\">\n" +
    "          </uib-tab>\n" +
    "          <uib-tab heading=\"Votes\">\n" +
    "          </uib-tab>\n" +
    "        </uib-tabset>\n" +
    "        <!--<p>activity</p>\n" +
    "        <p>reccomended votes</p>\n" +
    "        <p>message</p>-->\n" +
    "      </div>\n" +
    "      <div class=\"col-md-8\">\n" +
    "        <!--\n" +
    "        <div class=\"alert alert-success verificationNotice spacing-25\" ng-show=\"!currentUser.isVerified\">\n" +
    "          <h2>Become Verified!</h2>\n" +
    "          <hr>\n" +
    "          <div class=\"spacing-15\">\n" +
    "            <h4><b>Official ID</b></h4>\n" +
    "            <div class=\"spacing-10\"></div>\n" +
    "            <p>By providing official identification, government officials have more of an incentive to respond and your voice carries more weight.</p>\n" +
    "            <div class=\"spacing-10\"></div>\n" +
    "            <div ngf-accept=\"'image/*'\" ngf-drop ngf-select=\"uploadIdentification($file)\" ng-model=\"file\" class=\"drop-box\" ngf-drag-over-class=\"dragover\" ngf-allow-dir=\"true\">\n" +
    "              <img ng-show=\"user.identificationUrl\" ng-src=\"{{user.identificationUrl}}\">\n" +
    "              <div class=\"spacing-10\"></div>\n" +
    "              <button class=\"btn btn-default\"><i class=\"fa fa-upload\"></i> Upload</button>\n" +
    "            </div>\n" +
    "            <div class=\"spacing-25\"></div>\n" +
    "            <h4><b>Official Address</b></h4>\n" +
    "            <div class=\"spacing-10\"></div>\n" +
    "            <md-input-container class=\"md-block\">\n" +
    "              <textarea g-places-autocomplete ng-model=\"user.address\" rows=\"5\" md-select-on-focus aria-label=\"address\" placeholder=\"+ Add Location\"></textarea>\n" +
    "              <button type=\"submit\" class=\"btn btn-default\" ng-click=\"accountSave()\">Save</button>\n" +
    "            </md-input-container>\n" +
    "            <div class=\"spacing-10\"></div>\n" +
    "            <h4><b>Your Representatives</b></h4>\n" +
    "            <md-divider></md-divider>\n" +
    "            <div class=\"spacing-10\"></div>\n" +
    "            <button ng-hide=\"officialRepresentatives.length > 0 || gettingRepresentatives\" ng-click=\"getLatLng()\" class=\"btn btn-default btn-lg\"><i class=\"fa fa-map-marker\"></i> Find Your Reps</button>\n" +
    "            <i ng-show=\"gettingRepresentatives\" style=\"font-size:48px\" class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>\n" +
    "            <div class='md-padding' layout=\"row\" layout-align=\"center\" layout-wrap>\n" +
    "              <md-card flex=\"20\" ng-repeat=\"user in officialRepresentatives\">\n" +
    "                <a href=\"/member/{{user.username}}\">\n" +
    "                  <img ng-src=\"{{user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{user.username}}\">\n" +
    "                </a>\n" +
    "                <md-card-title class=\"text-center\" style=\"padding:15px 0\">\n" +
    "                  <md-card-title-text>\n" +
    "                    <a href=\"/member/{{user.username}}\">{{user.username}}</a>\n" +
    "                    <button class=\"btn btn-green\">select as representative</button>\n" +
    "                  </md-card-title-text>\n" +
    "                </md-card-title>\n" +
    "              </md-card>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        -->\n" +
    "\n" +
    "        <!--constituents, representatives, userVotes-->\n" +
    "      \n" +
    "        <div class=\"spacing-5\"></div>\n" +
    "        <div class=\"profilePost\">\n" +
    "          <form role=\"form\">\n" +
    "            <md-input-container class=\"md-block\">\n" +
    "              <textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"\"></textarea>\n" +
    "            </md-input-container>\n" +
    "            <!--connect legislators-->\n" +
    "          </form>\n" +
    "          <button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "        </div>\n" +
    "        <div class=\"spacing-5\"></div>\n" +
    "\n" +
    "        <md-card ng-repeat=\"post in posts\">\n" +
    "          <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "              <a href=\"/member/{{post.user.username}}\">\n" +
    "                <img style=\"max-width:64px\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "                <h3>{{post.user.username}}</h3>\n" +
    "              </a>\n" +
    "              <p>{{post.post}}</p>\n" +
    "            </md-card-title-text>\n" +
    "          </md-card-title>\n" +
    "          <md-card-title>\n" +
    "            <a>like</a> \n" +
    "            <a>reply</a>\n" +
    "          </md-card-title>\n" +
    "        </md-card>\n" +
    "\n" +
    "        <div class=\"spacing-15\"></div>\n" +
    "        <h3>trending votes</h3>\n" +
    "        <md-divider></md-divider>\n" +
    "        <div class=\"spacing-5\"></div>\n" +
    "        <md-card ng-repeat=\"vote in votes\">\n" +
    "          <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "              <h4><a href=\"/vote/{{vote.id}}\">{{vote.title}}</a></h4>\n" +
    "              <div class=\"margin-5\"></div>\n" +
    "              <h4>\n" +
    "                <b>+ {{vote.plusCount-vote.minusCount}}</b>\n" +
    "                <button ng-class=\"{'upVoted': class=='upVote'}\" class=\"btn btn-default upVote\" ng-click=\"createVote(1, vote)\">\n" +
    "                  <i class=\"fa fa-caret-up vBlue\"></i> <b>{{vote.plusCount}}</b>\n" +
    "                </button>\n" +
    "                <button ng-class=\"{'downVoted': class=='downVote'}\" class=\"btn btn-default downVote\" ng-click=\"createVote(-1, vote)\">\n" +
    "                  <i class=\"fa fa-caret-down red-color\"></i>  <b>{{vote.minusCount}}</b>\n" +
    "                </button>\n" +
    "                <br><br>\n" +
    "                <span class=\"subtitle\">({{vote.voteCount}} total votes)</span>\n" +
    "              </h4>\n" +
    "              <div class=\"margin-10\"></div>\n" +
    "              <a href=\"/bill/{{bill._id}}/{{bill.title}}\">{{vote.bill.title}}</a>\n" +
    "              <br><br>\n" +
    "            </md-card-title-text>\n" +
    "          </md-card-title>\n" +
    "        </md-card>\n" +
    "        <br><br>\n" +
    "        <div ng-click=\"loadMoreVotes()\" style=\"text-align:center\">\n" +
    "          <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-caret-down\"></i></button>\n" +
    "        </div>\n" +
    "        <div class=\"spacing-50\"></div>\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<!--/if logged in-->\n" +
    "\n" +
    "<!--if not logged in-->\n" +
    "<div ng-show=\"!currentUser\">\n" +
    "  <!--<div ng-include=\"'intro/index.tpl.html'\"></div>-->\n" +
    "  <div class=\"imageContainer\">\n" +
    "    <video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\"></video>\n" +
    "    <div class=\"imageContainerDiv container\">  \n" +
    "      <h1 style=\"text-align:center\">build empowerment, change consensus</h1>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div id=\"about\">\n" +
    "    <div id=\"information\">\n" +
    "      <div class=\"container\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <div class=\"spacing-100\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-6\">\n" +
    "          <i style=\"font-size:256px;\" class=\"fa fa-bullhorn\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-6\">\n" +
    "          <h1>be part of the movement</h1>\n" +
    "          <h4>direct your impact though input on policy</h4>\n" +
    "          <h4>create a coalition of representation</h4>\n" +
    "          <br><br>\n" +
    "          <a href=\"/about\" class=\"btn btn-default\">learn more</a>\n" +
    "          <!--reduce polarization-->\n" +
    "          <!--seeing past partisan politics-->\n" +
    "          <!--<p>directly impact the creation of policy</p>-->\n" +
    "          <!--<p>creating a coalition of representation</p>-->\n" +
    "        </div>\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <div class=\"spacing-100\"></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"register\">\n" +
    "      <div ng-include=\"'register/index.tpl.html'\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"bills\">\n" +
    "      <div class=\"container\">\n" +
    "        <h2><a href=\"/bills\">{{billCount}} bills</a></h2>\n" +
    "        <md-divider></md-divider><br>\n" +
    "        <md-card ng-repeat=\"bill in bills\">\n" +
    "          <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "              <h4>\n" +
    "                <button ng-class=\"{'upVoted': class=='upVote'}\" class=\"btn btn-default upVote\" ng-click=\"createVote(1, vote)\"><i class=\"fa fa-caret-up\"></i>  {{plusCount}}</button>\n" +
    "                <button ng-class=\"{'downVoted': class=='downVote'}\" class=\"btn btn-default downVote\" ng-click=\"createVote(-1, vote)\"><i class=\"fa fa-caret-down\"></i>  {{minusCount}}</button>\n" +
    "                <a href=\"/bill/{{bill.id}}/{{bill.title.replace(' ','-')}}\">{{bill.title}}</a>\n" +
    "              </h4>\n" +
    "            </md-card-title-text>\n" +
    "          </md-card-title>\n" +
    "        </md-card> \n" +
    "        <div ng-click=\"loadMoreBills()\" style=\"text-align:center\">\n" +
    "          <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-caret-down\"></i></button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"committees\">\n" +
    "      <div class=\"container\">\n" +
    "        <h2><a href=\"/committees\">{{committeeCount}} committees</a></h2>\n" +
    "        <md-divider></md-divider><br>\n" +
    "        <md-card ng-repeat=\"committee in committees\" class=\"col-sm-12\">\n" +
    "          <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "              <h4><a href=\"/committee/{{committee.urlTitle}}\"><span class=\"\">{{committee.title}}</span></a></h4>\n" +
    "            </md-card-title-text>\n" +
    "          </md-card-title>\n" +
    "        </md-card>\n" +
    "        <div ng-click=\"loadMoreCommittees()\" style=\"text-align:center\">\n" +
    "          <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-caret-down\"></i></button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"members\">\n" +
    "      <div class=\"container\">\n" +
    "        <h2>{{userCount}} members</h2>\n" +
    "        <md-divider></md-divider><br>\n" +
    "        <button ng-show=\"!gettingRepresentatives\" ng-click=\"getLatLng()\" class=\"btn btn-default\">find representatives</button><br>\n" +
    "        <i ng-show=\"gettingRepresentatives\" style=\"font-size:48px\" class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>\n" +
    "\n" +
    "        <div class=\"col-lg-4 col-sm-6\" ng-repeat=\"user in officialRepresentatives\">\n" +
    "          <div class=\"member-card\">\n" +
    "            <div class=\"image\" style=\"background-image: url('{{user.coverUrl}}')\">\n" +
    "              <img ng-src=\"{{user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "            </div>\n" +
    "            <div class=\"info\">\n" +
    "              <h2 class=\"name\"><a href=\"member/{{user.username}}\">{{user.username}}</a></h2>\n" +
    "              <h4 class=\"position\">{{user.title}}</h4>\n" +
    "              <p>{{user.state}}</p>\n" +
    "            </div>\n" +
    "            <div class=\"social\">\n" +
    "              <a ng-show=\"user.socialAccounts.facebook.profileUrl\" href=\"{{user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "              <a ng-show=\"user.socialAccounts.twitter.profileUrl\" href=\"{{user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "              <a ng-show=\"user.socialAccounts.google.profileUrl\" href=\"{{user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-lg-4 col-sm-6\" ng-repeat=\"user in users\">\n" +
    "          <div class=\"member-card\">\n" +
    "            <div class=\"image\" style=\"background-image: url('{{user.coverUrl}}')\">\n" +
    "              <img ng-src=\"{{user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "            </div>\n" +
    "            <div class=\"info\">\n" +
    "              <h2 class=\"name\"><a href=\"member/{{user.username}}\">{{user.username}}</a></h2>\n" +
    "              <h4 class=\"position\">{{user.title}}</h4>\n" +
    "              <p>{{user.state}}</p>\n" +
    "            </div>\n" +
    "            <div class=\"social\">\n" +
    "              <a ng-show=\"user.socialAccounts.facebook.profileUrl\" href=\"{{user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "              <a ng-show=\"user.socialAccounts.twitter.profileUrl\" href=\"{{user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "              <a ng-show=\"user.socialAccounts.google.profileUrl\" href=\"{{user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div ng-click=\"loadMoreMembers()\" style=\"text-align:center\">\n" +
    "          <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-caret-down\"></i></button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<!--/if not logged in-->\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("home/templates/home.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("home/templates/home.tpl.html",
    "<div class=\"spacing-25\"></div>\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <img class=\"avatar\" style=\"margin-top:0em\" ng-src=\"{{currentUser.avatarUrl}}\"/>\n" +
    "            <h2><a href=\"/member/{{currentUser.username}}\"><b>{{currentUser.username}}</a></b></h2>\n" +
    "            <div class=\"spacing-5\"></div>\n" +
    "            <h5>Bills - {{committees.length}}</h5>\n" +
    "            <h5>Committees - {{committees.length}}</h5>\n" +
    "            <h5>Constituents - {{constituents.length}}</h5>\n" +
    "            <h5>Representatives - {{representatives.length}}</h5>\n" +
    "            <h5>Votes - {{votes.length}}</h5>\n" +
    "            <div class=\"spacing-25\"></div>\n" +
    "            <uib-tabset active=\"0\" vertical=\"true\">\n" +
    "                <uib-tab index=\"0\" heading=\"Activity\">\n" +
    "                </uib-tab>\n" +
    "                <uib-tab heading=\"Bills\">\n" +
    "                </uib-tab>\n" +
    "                <uib-tab heading=\"Posts\">\n" +
    "                </uib-tab>\n" +
    "                <uib-tab heading=\"Votes\">\n" +
    "                </uib-tab>\n" +
    "            </uib-tabset>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-8\">      \n" +
    "            <div class=\"spacing-5\"></div>\n" +
    "            <div class=\"profilePost\">\n" +
    "                <form role=\"form\">\n" +
    "                    <md-input-container class=\"md-block\">\n" +
    "                        <textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"\"></textarea>\n" +
    "                    </md-input-container>\n" +
    "                </form>\n" +
    "                <button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "            </div>\n" +
    "            <div class=\"spacing-5\"></div>\n" +
    "\n" +
    "            <md-card ng-repeat=\"post in posts\">\n" +
    "                <md-card-title>\n" +
    "                    <md-card-title-text>\n" +
    "                    <a href=\"/member/{{post.user.username}}\">\n" +
    "                    <img style=\"max-width:64px\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "                    <h3>{{post.user.username}}</h3>\n" +
    "                    </a>\n" +
    "                    <p>{{post.post}}</p>\n" +
    "                    </md-card-title-text>\n" +
    "                </md-card-title>\n" +
    "                <md-card-title>\n" +
    "                    <a>like</a> \n" +
    "                    <a>reply</a>\n" +
    "                </md-card-title>\n" +
    "            </md-card>\n" +
    "\n" +
    "            <div class=\"spacing-15\"></div>\n" +
    "            <h3>trending votes</h3>\n" +
    "            <md-divider></md-divider>\n" +
    "            <div class=\"spacing-5\"></div>\n" +
    "            <md-card ng-repeat=\"vote in votes\">\n" +
    "                <md-card-title>\n" +
    "                    <md-card-title-text>\n" +
    "                        <h4><a href=\"/vote/{{vote.id}}\">{{vote.title}}</a></h4>\n" +
    "                        <div class=\"margin-5\"></div>\n" +
    "                        <h4>\n" +
    "                            <b>+ {{vote.plusCount-vote.minusCount}}</b>\n" +
    "                            <button ng-class=\"{'upVoted': class=='upVote'}\" class=\"btn btn-default upVote\" ng-click=\"createVote(1, vote)\">\n" +
    "                                <i class=\"fa fa-caret-up vBlue\"></i> <b>{{vote.plusCount}}</b>\n" +
    "                            </button>\n" +
    "                            <button ng-class=\"{'downVoted': class=='downVote'}\" class=\"btn btn-default downVote\" ng-click=\"createVote(-1, vote)\">\n" +
    "                                <i class=\"fa fa-caret-down red-color\"></i>  <b>{{vote.minusCount}}</b>\n" +
    "                            </button>\n" +
    "                            <br><br>\n" +
    "                            <span class=\"subtitle\">({{vote.voteCount}} total votes)</span>\n" +
    "                        </h4>\n" +
    "                        <div class=\"margin-10\"></div>\n" +
    "                        <a href=\"/bill/{{bill._id}}/{{bill.title}}\">{{vote.bill.title}}</a>\n" +
    "                        <br><br>\n" +
    "                    </md-card-title-text>\n" +
    "                </md-card-title>\n" +
    "            </md-card>\n" +
    "            <br><br>\n" +
    "            <div ng-click=\"loadMoreVotes()\" style=\"text-align:center\">\n" +
    "                <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-caret-down\"></i></button>\n" +
    "            </div>\n" +
    "            <div class=\"spacing-50\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("home/templates/intro.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("home/templates/intro.tpl.html",
    "<div class=\"imageContainer\">\n" +
    "    <video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\"></video>\n" +
    "    <div class=\"imageContainerDiv container\">  \n" +
    "        <h1 style=\"text-align:center\">build empowerment, change consensus</h1>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div id=\"about\">\n" +
    "    <div id=\"information\">\n" +
    "        <div class=\"container\">\n" +
    "            <div class=\"col-md-12\">\n" +
    "                <div class=\"spacing-100\"></div>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-6\">\n" +
    "                <i style=\"font-size:256px;\" class=\"fa fa-bullhorn\"></i>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-6\">\n" +
    "                <h1>be part of the movement</h1>\n" +
    "                <h4>direct your impact though input on policy</h4>\n" +
    "                <h4>create a coalition of representation</h4>\n" +
    "                <br><br>\n" +
    "                <a href=\"/about\" class=\"btn btn-default\">learn more</a>\n" +
    "                <!--reduce polarization-->\n" +
    "                <!--seeing past partisan politics-->\n" +
    "                <!--<p>directly impact the creation of policy</p>-->\n" +
    "                <!--<p>creating a coalition of representation</p>-->\n" +
    "            </div>\n" +
    "            <div class=\"col-md-12\">\n" +
    "                <div class=\"spacing-100\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"register\">\n" +
    "        <div ng-include=\"'register/index.tpl.html'\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"bills\">\n" +
    "        <div class=\"container\">\n" +
    "            <h2><a href=\"/bills\">{{billCount}} bills</a></h2>\n" +
    "            <md-divider></md-divider><br>\n" +
    "            <md-card ng-repeat=\"bill in bills\">\n" +
    "                <md-card-title>\n" +
    "                    <md-card-title-text>\n" +
    "                    <h4>\n" +
    "                        <button ng-class=\"{'upVoted': class=='upVote'}\" class=\"btn btn-default upVote\" ng-click=\"createVote(1, vote)\"><i class=\"fa fa-caret-up\"></i>  {{plusCount}}</button>\n" +
    "                        <button ng-class=\"{'downVoted': class=='downVote'}\" class=\"btn btn-default downVote\" ng-click=\"createVote(-1, vote)\"><i class=\"fa fa-caret-down\"></i>  {{minusCount}}</button>\n" +
    "                        <a href=\"/bill/{{bill.id}}/{{bill.title.replace(' ','-')}}\">{{bill.title}}</a>\n" +
    "                    </h4>\n" +
    "                    </md-card-title-text>\n" +
    "                </md-card-title>\n" +
    "            </md-card> \n" +
    "            <div ng-click=\"loadMoreBills()\" style=\"text-align:center\">\n" +
    "                <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-caret-down\"></i></button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"committees\">\n" +
    "        <div class=\"container\">\n" +
    "            <h2><a href=\"/committees\">{{committeeCount}} committees</a></h2>\n" +
    "            <md-divider></md-divider><br>\n" +
    "            <md-card ng-repeat=\"committee in committees\" class=\"col-sm-12\">\n" +
    "                <md-card-title>\n" +
    "                    <md-card-title-text>\n" +
    "                        <h4><a href=\"/committee/{{committee.urlTitle}}\"><span class=\"\">{{committee.title}}</span></a></h4>\n" +
    "                    </md-card-title-text>\n" +
    "                </md-card-title>\n" +
    "            </md-card>\n" +
    "            <div ng-click=\"loadMoreCommittees()\" style=\"text-align:center\">\n" +
    "                <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-caret-down\"></i></button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"members\">\n" +
    "        <div class=\"container\">\n" +
    "            <h2>{{userCount}} members</h2>\n" +
    "            <md-divider></md-divider><br>\n" +
    "            <button ng-show=\"!gettingRepresentatives\" ng-click=\"getLatLng()\" class=\"btn btn-default\">find representatives</button><br>\n" +
    "            <i ng-show=\"gettingRepresentatives\" style=\"font-size:48px\" class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>\n" +
    "\n" +
    "            <div class=\"col-lg-4 col-sm-6\" ng-repeat=\"user in officialRepresentatives\">\n" +
    "                <div class=\"member-card\">\n" +
    "                    <div class=\"image\" style=\"background-image: url('{{user.coverUrl}}')\">\n" +
    "                        <img ng-src=\"{{user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "                    </div>\n" +
    "                    <div class=\"info\">\n" +
    "                        <h2 class=\"name\"><a href=\"member/{{user.username}}\">{{user.username}}</a></h2>\n" +
    "                        <h4 class=\"position\">{{user.title}}</h4>\n" +
    "                        <p>{{user.state}}</p>\n" +
    "                    </div>\n" +
    "                    <div class=\"social\">\n" +
    "                        <a ng-show=\"user.socialAccounts.facebook.profileUrl\" href=\"{{user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "                        <a ng-show=\"user.socialAccounts.twitter.profileUrl\" href=\"{{user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "                        <a ng-show=\"user.socialAccounts.google.profileUrl\" href=\"{{user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-lg-4 col-sm-6\" ng-repeat=\"user in users\">\n" +
    "                <div class=\"member-card\">\n" +
    "                    <div class=\"image\" style=\"background-image: url('{{user.coverUrl}}')\">\n" +
    "                        <img ng-src=\"{{user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "                    </div>\n" +
    "                    <div class=\"info\">\n" +
    "                        <h2 class=\"name\"><a href=\"member/{{user.username}}\">{{user.username}}</a></h2>\n" +
    "                        <h4 class=\"position\">{{user.title}}</h4>\n" +
    "                        <p>{{user.state}}</p>\n" +
    "                    </div>\n" +
    "                    <div class=\"social\">\n" +
    "                        <a ng-show=\"user.socialAccounts.facebook.profileUrl\" href=\"{{user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "                        <a ng-show=\"user.socialAccounts.twitter.profileUrl\" href=\"{{user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "                        <a ng-show=\"user.socialAccounts.google.profileUrl\" href=\"{{user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div ng-click=\"loadMoreMembers()\" style=\"text-align:center\">\n" +
    "                <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-caret-down\"></i></button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("login/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("login/index.tpl.html",
    "<!--login-->\n" +
    "<!--<div class=\"login-form container\" style=\"min-height:100%;\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <h3>Login</h3>\n" +
    "            <md-divider></md-divider><br>\n" +
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
    "    <div class=\"row\">\n" +
    "        <div style=\"text-align:center\">\n" +
    "            <a href=\"#\">forgot password?</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div style=\"text-align:center\">\n" +
    "            <a href=\"/auth/facebook\">facebook</a>\n" +
    "            <a href=\"/auth/twitter\">twitter</a>\n" +
    "            <a href=\"/auth/google\">google</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div style=\"text-align:center\">\n" +
    "            <a href=\"/register\">register an account</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>-->\n" +
    "<!--<div ng-include=\"'footer/index.tpl.html'\"></div>-->\n" +
    "\n" +
    "<div class=\"log-background\">\n" +
    "    <div class=\"blkoverlay\"></div>\n" +
    "    <div class=\"log-form\">\n" +
    "        <h2><span class=\"inline-logo\"><i style=\"color:#2ab996\" class=\"fa fa-check\"></i>oetr</span> - login</h2>\n" +
    "        <form role=\"form\" action=\"/auth/local\" method=\"post\">\n" +
    "            <input name=\"identifier\" placeholder=\"email or username\" title=\"username\" type=\"text\"> \n" +
    "            <input name=\"password\" placeholder=\"password\" title=\"username\" type=\"password\"> \n" +
    "            <button style=\"width:100%\" class=\"btn btn-green\" type=\"submit\">Sign in</button> \n" +
    "        </form>\n" +
    "        <div style=\"text-align:center\">\n" +
    "            <a class=\"\" href=\"/register\">Sign up for voetr</a>\n" +
    "        </div>\n" +
    "        <br><md-divider></md-divider>\n" +
    "        <div style=\"text-align:center;padding:2em\">\n" +
    "            <a style=\"width:100%;margin:3px\" class=\"btn btn-block btn-social btn-facebook\" href=\"/auth/facebook\"><span class=\"fa fa-facebook\"></span> Facebook</a>\n" +
    "            <a style=\"width:100%;margin:3px\" class=\"btn btn-block btn-social btn-twitter\" href=\"/auth/twitter\"><span class=\"fa fa-twitter\"></span> Twitter</a>\n" +
    "            <a style=\"width:100%;margin:3px\" class=\"btn btn-block btn-social btn-google\" href=\"/auth/google\"><span class=\"fa fa-google\"></span> Google</a>\n" +
    "        </div> \n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("member/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/index.tpl.html",
    "<div ui-view=\"member\">\n" +
    "	<div class=\"profile-header\">\n" +
    "		<div class=\"member-cover\">\n" +
    "			<img ng-src=\"{{member.coverUrl}}\" err-src=\"/images/avatar.png\" />\n" +
    "		</div>\n" +
    "		<div class=\"container\">\n" +
    "			<div class=\"pull-left\">\n" +
    "				<img class=\"avatar\" ng-src=\"{{member.avatarUrl}}\"/>\n" +
    "			</div>\n" +
    "			<div class=\"pull-right member-tab-container\">\n" +
    "				<ul class=\"member-tabs\">\n" +
    "					<li>\n" +
    "						<a href=\"member/{{member.username}}\">Activity</a>\n" +
    "					</li>\n" +
    "					<!--<li>\n" +
    "						<a href=\"member/{{member.username}}/bills\">{{committeeCount}} Bills</a>\n" +
    "					</li>-->\n" +
    "					<li>\n" +
    "						<a href=\"member/{{member.username}}/committees\">{{committeeCount}} Committees</a>\n" +
    "					</li>\n" +
    "					<li>\n" +
    "						<a href=\"member/{{member.username}}/constituents\">{{constituentCount}} Constituents</a>\n" +
    "					</li>\n" +
    "					<li>\n" +
    "						<a href=\"member/{{member.username}}/representatives\">{{representativeCount}} Representatives</a>\n" +
    "					</li>\n" +
    "					<li>\n" +
    "						<a href=\"member/{{member.username}}/votes\">{{voteCount}} Votes</a>\n" +
    "					</li>\n" +
    "					<li ng-show=\"currentUser.id != member.id\">\n" +
    "						<a ng-show=\"!isFollowing\" class=\"btn btn-default\" ng-click=\"selectAsRepresentative()\">Elect</a>\n" +
    "						<a ng-show=\"isFollowing\" class=\"btn btn-default\" ng-click=\"selectAsRepresentative()\">Unelect</a>\n" +
    "					</li>\n" +
    "					<li ng-show=\"currentUser.id != member.id\">\n" +
    "						<a class=\"btn btn-default\" ng-click=\"\">Follow</a>\n" +
    "					</li>\n" +
    "					<li ng-show=\"currentUser.id == member.id\">\n" +
    "						<a class=\"btn btn-default\" href=\"account\">Edit Profile</a>\n" +
    "					</li>\n" +
    "				</ul>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<md-divider></md-divider>\n" +
    "		<div class=\"container\">\n" +
    "			<div class=\"pull-left\">\n" +
    "				<h2>{{member.firstName}} {{member.lastName}}</h2>\n" +
    "				<h5><span style=\"color:grey\">@{{member.username}}</span></h5>\n" +
    "				<h5 ng-show=\"member.title\"><span style=\"color:grey\">{{member.title}}</span></h5>\n" +
    "				<h5 ng-show=\"member.district\"><span style=\"color:grey\">District {{member.district}}</span></h5>\n" +
    "				<h5 ng-show=\"member.state\"><span style=\"color:grey\">{{member.state}}</span></h5>\n" +
    "			</div>\n" +
    "			<div class=\"pull-right\">\n" +
    "				<div class=\"spacing-10\"></div>\n" +
    "				<h5 ng-show=\"member.phone\"><span style=\"color:grey\"><i class=\"fa fa-phone\"></i> {{member.phone}}</span></h5>\n" +
    "				<h5 ng-show=\"showFax\"><span style=\"color:grey\"><i class=\"fa fa-fax\"></i> {{member.fax}}</span></h5>\n" +
    "				<a ng-show=\"member.socialAccounts.facebook.profileUrl\" href=\"{{member.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><span style=\"color:grey\"><i class=\"fa fa-facebook\"></i> Facebook</span></a>\n" +
    "				<a ng-show=\"member.socialAccounts.google.profileUrl\" href=\"{{member.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><span style=\"color:grey\"><i class=\"fa fa-google\"></i> Google</span></a>\n" +
    "				<a ng-show=\"member.socialAccounts.twitter.profileUrl\" href=\"{{member.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><span style=\"color:grey\"><i class=\"fa fa-twitter\"></i> Twitter</span></a>\n" +
    "			</div>\n" +
    "			<div class=\"spacing-10\"></div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"spacing-15\"></div>\n" +
    "	<md-divider></md-divider>\n" +
    "	<div class=\"spacing-15\"></div>\n" +
    "	<div class=\"profile-container\">\n" +
    "		<div ui-view=\"memberActivity\"></div>\n" +
    "		<div ui-view=\"memberBills\"></div>\n" +
    "		<div ui-view=\"memberCommittees\"></div>\n" +
    "		<div ui-view=\"memberConstituents\"></div>\n" +
    "		<div ui-view=\"memberRepresentatives\"></div>\n" +
    "		<div ui-view=\"memberVotes\"></div>\n" +
    "	</div>\n" +
    "	<div class=\"spacing-50\"></div>\n" +
    "	<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "</div>");
}]);

angular.module("member/templates/activity.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/templates/activity.tpl.html",
    "<div class=\"container\">\n" +
    "	<div class=\"profilePost\">\n" +
    "		<form role=\"form\">\n" +
    "			<md-input-container class=\"md-block\">\n" +
    "	        	<textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\"></textarea>\n" +
    "				<!--connect legislators-->\n" +
    "				<!--<p>send as a fax? - send as mail (verified), send email (always) - send video??</p>-->\n" +
    "			</md-input-container>\n" +
    "			<button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "		</form>\n" +
    "	</div>\n" +
    "	<div class=\"spacing-25\"></div>\n" +
    "	<md-card ng-repeat=\"post in posts\">\n" +
    "		<md-card-title>\n" +
    "			<md-card-title-text>\n" +
    "			<a href=\"member/{{post.user.username}}\">\n" +
    "				<img style=\"max-width:64px\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "				<h4>{{post.user.username}}</h4>\n" +
    "			</a>\n" +
    "			<div>{{post.post}}</div>\n" +
    "			<p>{{post.post}}</p>\n" +
    "			</md-card-title-text>\n" +
    "		</md-card-title>\n" +
    "	</md-card>\n" +
    "	<md-card ng-repeat=\"vote in votes\">\n" +
    "		<md-card-title>\n" +
    "			<a href=\"member/{{vote.user.username}}\">\n" +
    "				<img style=\"max-width:64px\" ng-src=\"{{vote.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{vote.user.username}}\">\n" +
    "				<h4>{{vote.user.username}}</h4>\n" +
    "			</a>\n" +
    "			<p>{{vote.voteString}} on behalf of {{constituents.length}} constitutent<span ng-show=\"constituents.length > 1\">s</span></p>\n" +
    "		</md-card-title>\n" +
    "		<md-card-title>\n" +
    "			<div style=\"float:right\">\n" +
    "				<a href=\"/vote/{{vote.vote.id}}\">{{vote.vote.title}}</a> for \n" +
    "				<a href=\"/bill/{{vote.bill.id}}/{{vote.bill.title}}\">{{vote.bill.title}}</a>\n" +
    "			</div>\n" +
    "		</md-card-title>\n" +
    "		<md-card-title>\n" +
    "			<a>like</a> \n" +
    "			<a>reply</a>\n" +
    "		</md-card-title>\n" +
    "	</md-card>\n" +
    "	<div class=\"spacing-10\"></div>\n" +
    "	<div ng-show=\"votes.legnth > 0 && votes.legnth != voteCount\" ng-click=\"loadMore()\" style=\"text-align:center\">\n" +
    "		<button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE</button>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("member/templates/bills.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/templates/bills.tpl.html",
    "<div class=\"container\">\n" +
    "    <md-card ng-repeat=\"bill in bills\">\n" +
    "    	{{bill.title}}\n" +
    "    </md-card>\n" +
    "</div>");
}]);

angular.module("member/templates/committees.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/templates/committees.tpl.html",
    "<div class=\"container\">\n" +
    "    <md-card ng-repeat=\"committee in committees\">\n" +
    "        <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "                <a href=\"/committee/{{committee.committee.urlTitle}}/\"><h3>{{committee.committee.title}}</h3></a>\n" +
    "                <h5>{{committee.title}}</h5>\n" +
    "            </md-card-title-text>\n" +
    "        <md-card-title>\n" +
    "    </md-card>\n" +
    "</div>");
}]);

angular.module("member/templates/constituents.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/templates/constituents.tpl.html",
    "<div class=\"container\">\n" +
    "	<div class=\"col-lg-4 col-sm-6\" ng-repeat=\"constituent in constituents\">\n" +
    "		<div style=\"margin:10px; box-shadow: 2px 2px 10px #999;overflow:hidden\">\n" +
    "			<div class=\"image\" style=\"background-image: url('{{constituent.constituent.coverUrl}}')\">\n" +
    "				<img alt=\"\" style=\"position:absolute;left:0;right0;margin:0 auto;margin-top:4em\" ng-src=\"{{constituent.constituent.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "			</div>\n" +
    "			<div class=\"info\">\n" +
    "				<h2 class=\"name\"><a href=\"member/{{constituent.constituent.username}}\">{{constituent.constituent.username}}</a></h2>\n" +
    "				<h3 class=\"position\"><a href=\"member/{{constituent.constituent.username}}\">{{constituent.constituent.title}}</a></h3>\n" +
    "				<p>{{constituent.constituent.state}}</p>\n" +
    "			</div>\n" +
    "			<div class=\"social\">\n" +
    "				<a ng-show=\"constituent.constituent.socialAccounts.facebook.profileUrl\" href=\"{{constituent.constituent.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "				<a ng-show=\"constituent.constituent.socialAccounts.twitter.profileUrl\" href=\"{{constituent.constituent.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "				<a ng-show=\"constituent.constituent.socialAccounts.google.profileUrl\" href=\"{{constituent.constituent.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("member/templates/representatives.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/templates/representatives.tpl.html",
    "<div class=\"container\">\n" +
    "	<div class=\"col-lg-4 col-sm-6\" ng-repeat=\"representative in representatives\">\n" +
    "		<div style=\"margin:10px; box-shadow: 2px 2px 10px #999;overflow:hidden\">\n" +
    "			<div class=\"image\" style=\"background-image: url('{{representative.representative.coverUrl}}')\">\n" +
    "				<img alt=\"\" style=\"position:absolute;left:0;right0;margin:0 auto;margin-top:4em\" ng-src=\"{{representative.representative.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "			</div>\n" +
    "			<div class=\"info\">\n" +
    "				<h2 class=\"name\"><a href=\"member/{{representative.representative.username}}\">{{representative.representative.username}}</a></h2>\n" +
    "				<h3 class=\"position\"><a href=\"member/{{representative.representative.username}}\">{{representative.representative.title}}</a></h3>\n" +
    "				<p>{{representative.representative.state}}</p>\n" +
    "			</div>\n" +
    "			<div class=\"social\">\n" +
    "				<a ng-show=\"representative.representative.socialAccounts.facebook.profileUrl\" href=\"{{representative.representative.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "				<a ng-show=\"representative.representative.socialAccounts.twitter.profileUrl\" href=\"{{representative.representative.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "				<a ng-show=\"representative.representative.socialAccounts.google.profileUrl\" href=\"{{representative.representative.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("member/templates/votes.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/templates/votes.tpl.html",
    "<div class=\"container\">\n" +
    "    <md-card ng-repeat=\"vote in votes\">\n" +
    "		<md-card-title>\n" +
    "			<md-card-title-text>\n" +
    "				<p style=\"white-space: nowrap\">{{vote.voteString}} on behalf of {{constituents.length}} constituents</p>\n" +
    "				<a href=\"/vote/{{vote.vote.id}}\">{{vote.vote.title}}</a>\n" +
    "				<a href=\"/bill/{{vote.bill.id}}/{{vote.bill.title}}\">{{vote.bill.title}}</a>\n" +
    "			</md-card-title-text>\n" +
    "		</md-card-title>\n" +
    "	</md-card>\n" +
    "	<div class=\"spacing-10\"></div>\n" +
    "	<div ng-show=\"votes.legnth > 0 && votes.legnth != voteCount\" ng-click=\"loadMore()\" style=\"text-align:center\">\n" +
    "		<button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-caret-down\"></i></button>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("nav/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("nav/index.tpl.html",
    "<style>\n" +
    "//.navbar-inverse{background-color:rgba(36,36,46,1);}\n" +
    ".navbar-inverse{background-color:rgba(255,255,255,1);border-color:#e1e1e1;}\n" +
    ".navbar-inverse .navbar-nav>li>a, .navbar-inverse .navbar-text{color:#424242}\n" +
    ".navbar-inverse .navbar-nav > li > a:focus{color:#424242}\n" +
    ".navbar-inverse .navbar-brand{color:#717171}\n" +
    ".navbar-inverse .navbar-brand:focus{color:#424242}\n" +
    ".navbar-inverse .navbar-toggle {border-color: #424242;}\n" +
    ".navbar-inverse .navbar-toggle .icon-bar{background-color:#424242;}\n" +
    ".navbar-inverse .navbar-toggle:hover .icon-bar{background-color:#fff;}\n" +
    "md-progress-linear .md-container {background-color: #e1e1e1!important;}\n" +
    "</style>\n" +
    "<div ng-controller=\"NavCtrl\" class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n" +
    "                <span class=\"sr-only\">Toggle navigation</span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "            </button>\n" +
    "            <a class=\"navbar-brand\" href=\"/\"><i style=\"color:#2ab996\" class=\"fa fa-check\"></i>oetr</a>\n" +
    "        </div>\n" +
    "        <div class=\"collapse navbar-collapse\">\n" +
    "            <ul class=\"nav navbar-nav\">\n" +
    "                <li ng-show=\"!currentUser\"><a href=\"/about\">about</a></li>\n" +
    "                <li><a href=\"/search\">discover</a></li>\n" +
    "                <form class=\"navbar-form pull-left\" role=\"search\" action=\"/search/\" onSubmit=\" location.href = 'search/' + document.getElementById('search-link').value; return false;\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <input ng-keyup=\"keyPress(searchValue)\" ng-model=\"searchValue\" id=\"search-link\" size=\"40\" type=\"text\" placeholder=\"\">\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </ul>\n" +
    "            <ul class=\"nav navbar-nav navbar-right\">\n" +
    "                <li class=\"dropdown\" ng-show=\"currentUser\">\n" +
    "                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "                        {{currentUser.username}} <span class=\"caret\"></span>\n" +
    "                    </a>\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                        <li>\n" +
    "                            <a href=\"/member/{{currentUser.username}}\">\n" +
    "                                <img style=\"max-height:32px\" src=\"{{currentUser.avatarUrl}}\"/>\n" +
    "                                {{currentUser.username}}\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li><a href=\"/account\">account</a></li>\n" +
    "                        <li role=\"separator\" class=\"divider\"></li>\n" +
    "                        <li><a href=\"/logout\">log out</a></li>\n" +
    "                    </ul>\n" +
    "                </li>\n" +
    "                <li ng-show=\"!currentUser\"><a href=\"/register\">register</a></li>\n" +
    "                <li ng-show=\"!currentUser\"><a href=\"/login\">login</a></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <md-progress-linear ng-if=\"stateIsLoading\" md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "</div>");
}]);

angular.module("register/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("register/index.tpl.html",
    "<!--register-->\n" +
    "<!--<div class=\"register-form container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <h3>Create an Account</h3>\n" +
    "            <md-divider></md-divider><br>\n" +
    "\n" +
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
    "    <md-divider></md-divider><br>\n" +
    "    <div class=\"row\">\n" +
    "        <div style=\"text-align:center\">\n" +
    "            <a href=\"/auth/facebook\">facebook</a>\n" +
    "            <a href=\"/auth/twitter\">twitter</a>\n" +
    "            <a href=\"/auth/google\">google</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div style=\"text-align:center\">\n" +
    "            <a href=\"/login\">already have an account?</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>-->\n" +
    "\n" +
    "<div class=\"log-background\">\n" +
    "    <div class=\"blkoverlay\"></div>\n" +
    "    <div class=\"log-form\">\n" +
    "        <h2><span class=\"inline-logo\"><i style=\"color:#2ab996\" class=\"fa fa-check\"></i>oetr</span> - register</h2>\n" +
    "        <form role=\"form\" action=\"/auth/local/register\" method=\"post\">\n" +
    "            <input name=\"email\" placeholder=\"email\" title=\"email\" type=\"email\"> \n" +
    "            <input name=\"username\" placeholder=\"username\" title=\"username\" type=\"text\"> \n" +
    "            <input name=\"password\" placeholder=\"password\" title=\"password\" type=\"password\"> \n" +
    "            <button style=\"width:100%\" class=\"btn btn-green\" type=\"submit\">Sign up for voetr</button>\n" +
    "        </form>\n" +
    "        <div style=\"text-align:center\">\n" +
    "            <a class=\"\" href=\"/login\">or Login</a>\n" +
    "        </div>\n" +
    "        <br><md-divider></md-divider>\n" +
    "        <div style=\"text-align:center;padding:2em\">\n" +
    "            <a style=\"width:100%;margin:3px\" class=\"btn btn-block btn-social btn-facebook\" href=\"/auth/facebook\"><span class=\"fa fa-facebook\"></span> Facebook</a>\n" +
    "            <a style=\"width:100%;margin:3px\" class=\"btn btn-block btn-social btn-twitter\" href=\"/auth/twitter\"><span class=\"fa fa-twitter\"></span> Twitter</a>\n" +
    "            <a style=\"width:100%;margin:3px\" class=\"btn btn-block btn-social btn-google\" href=\"/auth/google\"><span class=\"fa fa-google\"></span> Google</a>\n" +
    "        </div> \n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("search/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("search/index.tpl.html",
    "<div ui-view=\"search\">\n" +
    "	<div ng-show=\"!searchQuery\">\n" +
    "		<div class=\"imageContainerSmall\">\n" +
    "			<video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\"></video>\n" +
    "			<div class=\"imageContainerSmallDiv container\">  \n" +
    "				<h1 style=\"text-align:left\">discover</h1>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"container\">\n" +
    "			<div class=\"spacing-5\"></div>\n" +
    "	        <md-card>\n" +
    "				<md-card-title>\n" +
    "					<input style=\"width:100%\" ng-keyup=\"keyPress(searchValue)\" ng-model=\"searchValue\">\n" +
    "				</md-card-title>\n" +
    "			</md-card>\n" +
    "          	<div class=\"spacing-25\"></div>\n" +
    " 			<uib-tabset active=\"1\">\n" +
    " 			    <uib-tab index=\"1\" heading=\"Trending\">\n" +
    "					<md-card ng-repeat=\"vote in votes\">\n" +
    "						<md-card-title>\n" +
    "							<md-card-title-text>\n" +
    "								<h4><a href=\"/vote/{{vote.id}}\">{{vote.title}}</a></h4>\n" +
    "								<div class=\"margin-5\"></div>\n" +
    "								<h4>\n" +
    "									<b>+ {{vote.plusCount-vote.minusCount}}</b>\n" +
    "									<button ng-class=\"{'upVoted': class=='upVote'}\" class=\"btn btn-default upVote\" ng-click=\"createVote(1, vote)\">\n" +
    "										<i class=\"fa fa-caret-up vBlue\"></i> <b>{{vote.plusCount}}</b>\n" +
    "									</button>\n" +
    "									<button ng-class=\"{'downVoted': class=='downVote'}\" class=\"btn btn-default downVote\" ng-click=\"createVote(-1, vote)\">\n" +
    "										<i class=\"fa fa-caret-down red-color\"></i>  <b>{{vote.minusCount}}</b>\n" +
    "									</button>\n" +
    "									<br><br>\n" +
    "									<span class=\"subtitle\">({{vote.voteCount}} total votes)</span>\n" +
    "								</h4>\n" +
    "								<div class=\"margin-10\"></div>\n" +
    "								<a href=\"/bill/{{vote.bill.id}}/{{vote.bill.title}}\">{{vote.bill.title}}</a>\n" +
    "								<br><br>\n" +
    "							</md-card-title-text>\n" +
    "						</md-card-title>\n" +
    "					</md-card>\n" +
    "			        <br><br>\n" +
    "			        <div ng-click=\"loadMoreVotes()\" style=\"text-align:center\">\n" +
    "			        	<button class=\"btn btn-default col-xs-10 col-xs-offset-1\">more <i class=\"fa fa-caret-down\"></i></button>\n" +
    "			        </div>\n" +
    "    			</uib-tab>\n" +
    "				<uib-tab heading=\"Results\" ng-show=\"searchResults\">\n" +
    "					<div class='md-padding'>\n" +
    "			            <md-card ng-repeat=\"searchResult in searchResults\">\n" +
    "			              <md-card-title>\n" +
    "			                <md-card-title-text>\n" +
    "								<a href=\"{{searchResult.urlTitle}}\">{{searchResult}}</a>\n" +
    "							</md-card-title-text>\n" +
    "			              </md-card-title>\n" +
    "			            </md-card>\n" +
    "			        </div>\n" +
    "    			</uib-tab>\n" +
    "				<uib-tab heading=\"Bills\">\n" +
    "			    	<md-card ng-repeat=\"bill in bills\">\n" +
    "			        	<md-card-title>\n" +
    "			            	<md-card-title-text>\n" +
    "				            	<h4>\n" +
    "					                <button ng-class=\"{'upVoted': vote.class=='upVote'}\" class=\"btn btn-default upVote\" ng-click=\"createVote(1, vote)\"><i class=\"fa fa-caret-up\"></i>  {{vote.plusCount}}</button>\n" +
    "					                <button ng-class=\"{'downVoted': vote.class=='downVote'}\" class=\"btn btn-default downVote\" ng-click=\"createVote(-1, vote)\"><i class=\"fa fa-caret-down\"></i>  {{vote.minusCount}}</button>\n" +
    "					                <a href=\"/bill/{{bill._id}}/{{bill.title.replace(' ','-')}}\">{{bill.title}}</a>\n" +
    "				            	</h4>\n" +
    "			            	</md-card-title-text>\n" +
    "			            </md-card-title>\n" +
    "			        </md-card>\n" +
    "			        <div ng-click=\"loadMoreBills()\" style=\"text-align:center\">\n" +
    "			        	<button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE</button>\n" +
    "			        </div>\n" +
    "    			</uib-tab>\n" +
    "				<uib-tab heading=\"Committees\">\n" +
    "					<md-card ng-repeat=\"committee in committees\" class=\"col-sm-12\">\n" +
    "						<md-card-title>\n" +
    "							<md-card-title-text>\n" +
    "								<h4><a href=\"/committee/{{committee.urlTitle}}\"><span class=\"\">{{committee.title}}</span></a></h4>\n" +
    "							</md-card-title-text>\n" +
    "						</md-card-title>\n" +
    "					</md-card>\n" +
    "					<div ng-click=\"loadMoreCommittees()\" style=\"text-align:center\">\n" +
    "						<button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-caret-down\"></i></button>\n" +
    "					</div>\n" +
    "    			</uib-tab>\n" +
    "				<uib-tab heading=\"{{userCount}} Members\">\n" +
    "					<button ng-show=\"!gettingRepresentatives\" ng-click=\"getLatLng()\" class=\"btn btn-default\">find representatives</button><br><br>\n" +
    "			        <i ng-show=\"gettingRepresentatives\" style=\"font-size:48px\" class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>\n" +
    "					<div class=\"col-lg-4 col-sm-6\" ng-repeat=\"user in officialRepresentatives\">\n" +
    "						<div class=\"member-card\">\n" +
    "							<div class=\"image\" style=\"background-image: url('{{user.coverUrl}}')\">\n" +
    "								<img ng-src=\"{{user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "							</div>\n" +
    "							<div class=\"info\">\n" +
    "								<h2 class=\"name\"><a href=\"member/{{user.username}}\">{{user.username}}</a></h2>\n" +
    "								<h3 class=\"position\"><a href=\"member/{{user.username}}\">{{user.title}}</a></h3>\n" +
    "								<p>{{user.state}}</p>\n" +
    "							</div>\n" +
    "							<div class=\"social\">\n" +
    "								<a ng-show=\"user.socialAccounts.facebook.profileUrl\" href=\"{{user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "								<a ng-show=\"user.socialAccounts.twitter.profileUrl\" href=\"{{user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "								<a ng-show=\"user.socialAccounts.google.profileUrl\" href=\"{{user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"col-lg-4 col-sm-6\" ng-repeat=\"user in users\">\n" +
    "						<div class=\"member-card\">\n" +
    "							<div class=\"image\" style=\"background-image: url('{{user.coverUrl}}')\">\n" +
    "								<img ng-src=\"{{user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "							</div>\n" +
    "							<div class=\"info\">\n" +
    "								<h2 class=\"name\"><a href=\"member/{{user.username}}\">{{user.username}}</a></h2>\n" +
    "								<h3 class=\"position\"><a href=\"member/{{user.username}}\">{{user.title}}</a></h3>\n" +
    "								<p>{{user.state}}</p>\n" +
    "							</div>\n" +
    "							<div class=\"social\">\n" +
    "								<a ng-show=\"user.socialAccounts.facebook.profileUrl\" href=\"{{user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "								<a ng-show=\"user.socialAccounts.twitter.profileUrl\" href=\"{{user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "								<a ng-show=\"user.socialAccounts.google.profileUrl\" href=\"{{user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "    			</uib-tab>\n" +
    "    			<uib-tab heading=\"Votes\">\n" +
    "					<md-card ng-repeat=\"vote in votes\">\n" +
    "						<md-card-title>\n" +
    "							<md-card-title-text>\n" +
    "								<h4><a href=\"/vote/{{vote.id}}\">{{vote.title}}</a></h4>\n" +
    "								<div class=\"margin-5\"></div>\n" +
    "								<h4>\n" +
    "									<b>+ {{vote.plusCount-vote.minusCount}}</b>\n" +
    "									<button ng-class=\"{'upVoted': class=='upVote'}\" class=\"btn btn-default upVote\" ng-click=\"createVote(1, vote)\">\n" +
    "										<i class=\"fa fa-caret-up vBlue\"></i> <b>{{vote.plusCount}}</b>\n" +
    "									</button>\n" +
    "									<button ng-class=\"{'downVoted': class=='downVote'}\" class=\"btn btn-default downVote\" ng-click=\"createVote(-1, vote)\">\n" +
    "										<i class=\"fa fa-caret-down red-color\"></i>  <b>{{vote.minusCount}}</b>\n" +
    "									</button>\n" +
    "									<br><br>\n" +
    "									<span class=\"subtitle\">({{vote.voteCount}} total votes)</span>\n" +
    "								</h4>\n" +
    "								<div class=\"margin-10\"></div>\n" +
    "								<a href=\"/bill/{{vote.bill.id}}/{{vote.bill.title}}\">{{vote.bill.title}}</a>\n" +
    "								<br><br>\n" +
    "							</md-card-title-text>\n" +
    "						</md-card-title>\n" +
    "					</md-card>\n" +
    "			        <br><br>\n" +
    "			        <div ng-click=\"loadMoreVotes()\" style=\"text-align:center\">\n" +
    "			        	<button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-caret-down\"></i></button>\n" +
    "			        </div>\n" +
    "    			</uib-tab>\n" +
    "			</uib-tabset>\n" +
    "			<div class=\"spacing-50\"></div>\n" +
    "	    </div>\n" +
    "	</div>\n" +
    "	<div ng-show=\"searchQuery\">\n" +
    "		<div class=\"imageContainerSmall\">\n" +
    "			<video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\"></video>\n" +
    "			<div class=\"imageContainerSmallDiv container\">  \n" +
    "				<h1 style=\"text-align:left\">{{searchQuery}}</h1>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"container\">\n" +
    "			<uib-tabset>\n" +
    "				<uib-tab heading=\"Top\">\n" +
    "    			</uib-tab>\n" +
    " 			    <uib-tab heading=\"Bills\">\n" +
    "    			</uib-tab>\n" +
    "				<uib-tab heading=\"Committees\">\n" +
    "    			</uib-tab>\n" +
    "				<uib-tab heading=\"Discussion\">\n" +
    "    			</uib-tab>\n" +
    "				<uib-tab heading=\"Members\">\n" +
    "    			</uib-tab>\n" +
    "    			<uib-tab heading=\"Votes\">\n" +
    "    			</uib-tab>\n" +
    "			</uib-tabset>\n" +
    "			<div class=\"spacing-15\"></div>\n" +
    "			<div ng-repeat=\"searchResult in searchResults\">\n" +
    "				<div class=\"col-lg-4 col-sm-6\" ng-show=\"searchResult.username\">\n" +
    "					<div class=\"member-card\">\n" +
    "						<div class=\"image\" style=\"background-image: url('{{searchResult.coverUrl}}')\">\n" +
    "							<img ng-src=\"{{searchResult.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "						</div>\n" +
    "						<div class=\"info\">\n" +
    "							<h2 class=\"name\"><a href=\"member/{{searchResult.username}}\">{{searchResult.username}}</a></h2>\n" +
    "							<h4 class=\"position\"><a href=\"member/{{searchResult.username}}\">{{searchResult.title}}</a></h4>\n" +
    "							<p>{{searchResult.state}}</p>\n" +
    "						</div>\n" +
    "						<div class=\"social\">\n" +
    "							<a ng-show=\"searchResult.socialAccounts.facebook.profileUrl\" href=\"{{searchResult.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "							<a ng-show=\"searchResult.socialAccounts.twitter.profileUrl\" href=\"{{searchResult.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "							<a ng-show=\"searchResult.socialAccounts.google.profileUrl\" href=\"{{searchResult.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<md-card ng-show=\"searchResult.billContent\">\n" +
    "					<md-card-title>\n" +
    "						<md-card-title-text>\n" +
    "							<h4><a href=\"/bill/{{searchResult.id}}/{{searchResult.title}}\">{{searchResult.title}}</a></h4>\n" +
    "						</md-card-title-text>\n" +
    "					</md-card-title>\n" +
    "				</md-card>\n" +
    "				<md-card ng-show=\"!searchResult.billContent && !searchResult.username\">\n" +
    "					<md-card-title>\n" +
    "						<md-card-title-text>\n" +
    "							<h4><a href=\"/committee/{{searchResult.urlTitle}}\">{{searchResult.title}}</a></h4>\n" +
    "						</md-card-title-text>\n" +
    "					</md-card-title>\n" +
    "				</md-card>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"spacing-15\"></div>\n" +
    "	</div>\n" +
    "	<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("vote/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("vote/index.tpl.html",
    "<div ui-view=\"vote\">\n" +
    "	<div class=\"voteContainer container\">\n" +
    "		<h3>\n" +
    "			{{vote.voteCount}} ({{vote.plusCount-vote.minusCount}}) - \n" +
    "			<!--<button class=\"btn btn-default\" ng-click=\"createVote(1)\"><i class=\"fa fa-caret-up\"></i> {{vote.plusCount}}</button>\n" +
    "        	<button class=\"btn btn-default\" ng-click=\"createVote(-1)\"><i class=\"fa fa-caret-down\"></i> {{vote.minusCount}}</button>-->\n" +
    "			{{vote.title}}\n" +
    "		</h3>\n" +
    "		<h4><a href=\"bill/{{vote.bill.id}}/{{vote.bill.urlTitle}}\">{{vote.bill.title}}</a></h4>\n" +
    "		<md-divider></md-divider>\n" +
    "		<div class=\"row\">\n" +
    "			<button class=\"col-xs-6 btn btn-default\" ng-click=\"createVote(1)\"><i class=\"fa fa-caret-up\"></i> {{vote.plusCount}}</button>\n" +
    "        	<button class=\"col-xs-6 btn btn-default\" ng-click=\"createVote(-1)\"><i class=\"fa fa-caret-down\"></i> {{vote.minusCount}}</button>\n" +
    "    	</div>\n" +
    "    	<br>\n" +
    "		<uib-tabset>\n" +
    "			<uib-tab heading=\"Activity\" active=\"active\">\n" +
    "		    </uib-tab>\n" +
    "			<uib-tab heading=\"Discussion\">\n" +
    "				<div class=\"profilePost\">\n" +
    "					<form role=\"form\">\n" +
    "						<md-input-container class=\"md-block\">\n" +
    "							<textarea ng-model=\"newPost.post\" md-maxlength=\"150\" rows=\"5\" md-select-on-focus aria-label=\"new post\"></textarea>\n" +
    "						</md-input-container>\n" +
    "						<button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "					</form>\n" +
    "		        </div>\n" +
    "		        <md-card ng-repeat=\"post in posts\">\n" +
    "					<md-card-title>\n" +
    "					<md-card-title-text>\n" +
    "						<a href=\"member/{{post.user.username}}\">\n" +
    "							<img style=\"max-width:64px\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "							<p>{{post.user.username}}</p>\n" +
    "						</a>\n" +
    "						<p>{{post.post}}</p>\n" +
    "					</md-card-title-text>\n" +
    "					</md-card-title>\n" +
    "		        </md-card>\n" +
    "		    </uib-tab>\n" +
    "			<uib-tab heading=\"{{vote.plusCount}}  Yes\" active=\"active\">\n" +
    "				<div class=\"col-lg-4 col-sm-6\" ng-repeat=\"vote in yesVotes\">\n" +
    "					<div style=\"margin:10px; box-shadow: 2px 2px 10px #999;\">\n" +
    "						<div class=\"image\" style=\"background-image: url('{{vote.user.coverUrl}}')\">\n" +
    "							<img alt=\"\" style=\"position:absolute;left:0;right0;margin:0 auto;margin-top:4em\" class=\"avatar\" src=\"{{vote.user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "						</div>\n" +
    "						<div class=\"info\">\n" +
    "							<h2 class=\"name\"><a href=\"member/{{vote.user.username}}\">{{vote.user.username}}</a></h2>\n" +
    "							<h3 class=\"position\"><a href=\"member/{{vote.user.username}}\">{{vote.user.title}}</a></h3>\n" +
    "							<p>Yes</p>\n" +
    "						</div>\n" +
    "						<div class=\"social\">\n" +
    "							<a ng-show=\"vote.user.socialAccounts.facebook.profileUrl\" href=\"{{vote.user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "							<a ng-show=\"vote.user.socialAccounts.twitter.profileUrl\" href=\"{{vote.user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "							<a ng-show=\"vote.user.socialAccounts.google.profileUrl\" href=\"{{vote.user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "		    </uib-tab>\n" +
    "		    <uib-tab heading=\"{{vote.minusCount}}  No\">\n" +
    "				<div class=\"col-lg-4 col-sm-6\" ng-repeat=\"vote in noVotes\">\n" +
    "					<div style=\"margin:10px; box-shadow: 2px 2px 10px #999;\">\n" +
    "						<div class=\"image\" style=\"background-image: url('{{vote.user.coverUrl}}')\">\n" +
    "							<img alt=\"\" style=\"position:absolute;left:0;right0;margin:0 auto;margin-top:4em\" class=\"avatar\" src=\"{{vote.user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "						</div>\n" +
    "						<div class=\"info\">\n" +
    "							<h2 class=\"name\"><a href=\"member/{{vote.user.username}}\">{{vote.user.username}}</a></h2>\n" +
    "							<h3 class=\"position\"><a href=\"member/{{vote.user.username}}\">{{vote.user.title}}</a></h3>\n" +
    "							<p>No</p>\n" +
    "						</div>\n" +
    "						<div class=\"social\">\n" +
    "							<a ng-show=\"vote.user.socialAccounts.facebook.profileUrl\" href=\"{{vote.user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "							<a ng-show=\"vote.user.socialAccounts.twitter.profileUrl\" href=\"{{vote.user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "							<a ng-show=\"vote.user.socialAccounts.google.profileUrl\" href=\"{{vote.user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "		    </uib-tab>\n" +
    "		</uib-tabset>\n" +
    "	<div>\n" +
    "</div>");
}]);

angular.module("votes/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("votes/index.tpl.html",
    "<div class=\"imageContainerSmall\">\n" +
    "	<video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\"></video>\n" +
    "	<div class=\"imageContainerSmallDiv container\">  \n" +
    "		<h1 style=\"text-align:left\">votes</h1>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<md-list class=\"container\">\n" +
    "	<div class=\"dropdown sort-dropdown noselect\">\n" +
    "		<a class=\"dropdown-toggle noselect\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "			<h4 class=\"noselect\">Sort by {{sort}}<span class=\"caret\"></span></h4>\n" +
    "		</a>\n" +
    "		<ul class=\"dropdown-menu\">\n" +
    "			<li><a class=\"sort-a\" ng-click=\"selectSort('createdAt DESC')\"><h5>Most Recent</h5></a></li>\n" +
    "			<hr class=\"sort-hr\">\n" +
    "			<li><a class=\"sort-a\" ng-click=\"selectSort('voteCount DESC')\"><h5>Most Votes</h5></a></li>\n" +
    "			<hr class=\"sort-hr\">\n" +
    "			<li><a class=\"sort-a\" ng-click=\"selectSort('voteCount ASC')\"><h5>Lowest Votes</h5></a></li>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "	<md-list-item ng-repeat=\"vote in votes\">\n" +
    "		<div class=\"md-list-item-text\" layout=\"column\">\n" +
    "			<h3 style=\"font-size:25px\">\n" +
    "				{{vote.plusCount - vote.minusCount}} ({{vote.voteCount}})\n" +
    "      			<button class=\"btn btn-default\" ng-click=\"createVote(1, vote)\"><i class=\"fa fa-caret-up\"></i> {{vote.plusCount}}</button>\n" +
    "      			<button class=\"btn btn-default\" ng-click=\"createVote(-1, vote)\"><i class=\"fa fa-caret-down\"></i> {{vote.minusCount}}</button>\n" +
    "				<a href=\"/vote/{{vote.id}}\">{{vote.title}}</a>\n" +
    "			</h3>\n" +
    "			<h5><a href=\"/bill/{{vote.bill.id}}/{{vote.bill.urlTitle}}\">{{vote.bill.title}}</a></h5>\n" +
    "		</div>\n" +
    "	</md-list-item>\n" +
    "</md-list>\n" +
    "<md-divider></md-divider>\n" +
    "<div class=\"spacing-10\"></div>\n" +
    "<div ng-click=\"loadMore()\" style=\"text-align:center\">\n" +
    "	<button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-caret-down\"></i></button>\n" +
    "</div>\n" +
    "<div class=\"spacing-100\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);
