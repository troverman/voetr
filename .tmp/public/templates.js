angular.module('templates-app', ['about/index.tpl.html', 'account/index.tpl.html', 'bill/index.tpl.html', 'bills/index.tpl.html', 'committee/index.tpl.html', 'committee/templates/activity.tpl.html', 'committee/templates/bills.tpl.html', 'committee/templates/committees.tpl.html', 'committee/templates/discussion.tpl.html', 'committee/templates/members.tpl.html', 'committee/templates/votes.tpl.html', 'committees/index.tpl.html', 'footer/index.tpl.html', 'home/index.tpl.html', 'home/templates/feed.tpl.html', 'home/templates/intro.tpl.html', 'login/index.tpl.html', 'member/index.tpl.html', 'member/templates/activity.tpl.html', 'member/templates/bills.tpl.html', 'member/templates/committees.tpl.html', 'member/templates/constituents.tpl.html', 'member/templates/edit.tpl.html', 'member/templates/representatives.tpl.html', 'member/templates/votes.tpl.html', 'members/index.tpl.html', 'nav/index.tpl.html', 'post/index.tpl.html', 'post/post.tpl.html', 'register/index.tpl.html', 'search/index.tpl.html', 'vote/index.tpl.html', 'votes/index.tpl.html']);

angular.module("about/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("about/index.tpl.html",
    "<style>\n" +
    "#section3{\n" +
    "	color:white;\n" +
    "	background-color: #2ab996;\n" +
    "}\n" +
    "</style>\n" +
    "<div class=\"imageContainer\">\n" +
    "	<video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\" playsinline></video>\n" +
    "	<div class=\"imageContainerDiv container\">  \n" +
    "		<!--<h1>build empowerment, change consensus</h1>-->\n" +
    "		<h1>build empowerment, create impact</h1>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div class=\"about-container\">\n" +
    "	<div id=\"section1\">\n" +
    "		<div class=\"container\">\n" +
    "			<h2>directly impact the political landscape</h2>\n" +
    "			<br>\n" +
    "			<h4>build empowerment by creating constituent coalitions</h4>\n" +
    "			<h4>change consensus though direct input on policy decisions</h4>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div id=\"section2\">\n" +
    "		<div class=\"container\">\n" +
    "			<div class=\"row verticalRow\">\n" +
    "				<div class=\"col-sm-5\">\n" +
    "					<img src=\"images/voetr-about.png\" style=\"max-width:100%\">\n" +
    "		    	</div>\n" +
    "				<div class=\"col-sm-6 col-sm-offset-1\" style=\"\">\n" +
    "					<h3>direct your impact though input on policy</h3>\n" +
    "					<h4>decision making influence in the power of your hands</h4>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div id=\"section3\">\n" +
    "		<div class=\"container\">\n" +
    "			<div class=\"row verticalRow\">\n" +
    "				<div class=\"col-sm-8\">\n" +
    "					<h3>create constituent coalitions</h3>\n" +
    "					<h4>elect representatives and serve your constituents</h4>\n" +
    "					<h4>unite together and be heard</h4>\n" +
    "					<!--<p>come togther and be heard</p>-->\n" +
    "			    	<!--<p>with continual elections, select others to represent you at any time</p>-->\n" +
    "		    	</div>\n" +
    "		    	<div class=\"col-sm-4\">\n" +
    "					<img src=\"images/voetr-about4.png\" style=\"max-width:100%\">\n" +
    "		    	</div>\n" +
    "	    	</div>\n" +
    "	    </div>\n" +
    "	</div>\n" +
    "	<div id=\"section4\">\n" +
    "		<div class=\"container\" style=\"text-align:left\">\n" +
    "			<div class=\"row verticalRow\">\n" +
    "				<div class=\"col-sm-8\">\n" +
    "					<h3>power to the people</h3>\n" +
    "					<img style=\"height:64px;\" src=\"images/voetr_icon.png\"/>\n" +
    "				</div>\n" +
    "				<div class=\"col-sm-4\">\n" +
    "					<img src=\"images/voetr-about3.png\" style=\"max-width:100%\">\n" +
    "		    	</div>\n" +
    "	    	</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>");
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
    "		<button type=\"submit\" class=\"btn btn-default\">Save</button>\n" +
    "	</form>\n" +
    "\n" +
    "	<br><br>\n" +
    "	<md-divider></md-divider>\n" +
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
    "		<button type=\"submit\" class=\"btn btn-default\">Save</button>\n" +
    "	</md-input-container>\n" +
    "\n" +
    "	<h3>Connected Accounts</h3>\n" +
    "	<md-divider></md-divider><br>\n" +
    "	<a href=\"{{user.socialAccounts.facebook.profileUrl}}\">\n" +
    "		<img style=\"height:64px;\" src=\"{{user.socialAccounts.facebook.profilePic}}\">\n" +
    "		<span>{{user.socialAccounts.facebook.displayName}}</span>\n" +
    "	</a>\n" +
    "	<a ng-show=\"!facebookPassport\" class=\"btn btn-default\" href=\"/auth/facebook\">connect facebook</a>\n" +
    "	<a ng-show=\"facebookPassport\" class=\"btn btn-default\" ng-click=\"removePassport('facebook')\">disconnect facebook</a>\n" +
    "\n" +
    "	<br><br>\n" +
    "	<a href=\"{{user.socialAccounts.twitter.profileUrl}}\">\n" +
    "		<img style=\"height:64px;\" src=\"{{user.socialAccounts.twitter.profilePic}}\">\n" +
    "		<span>{{user.socialAccounts.twitter.handle}}</span>\n" +
    "	</a>\n" +
    "	<a ng-show=\"!twitterPassport\"class=\"btn btn-default\" href=\"/auth/twitter\">connect twitter</a>\n" +
    "	<a ng-show=\"twitterPassport\"class=\"btn btn-default\" ng-click=\"removePassport('twitter')\">disconnect twitter</a>\n" +
    "\n" +
    "	<br><br>\n" +
    "	<a href=\"{{user.socialAccounts.google.profileUrl}}\">\n" +
    "		<img style=\"height:64px;\" src=\"{{user.socialAccounts.google.profilePic}}\">\n" +
    "		<span>{{user.socialAccounts.google.displayName}}</span>\n" +
    "	</a>\n" +
    "	<a ng-show=\"!googlePassport\"class=\"btn btn-default\" href=\"/auth/google\">connect google</a>\n" +
    "	<a ng-show=\"googlePassport\"class=\"btn btn-default\" ng-click=\"removePassport('google')\">disconnect google</a>\n" +
    "\n" +
    "	<br><br>\n" +
    "	<!--<a class=\"btn btn-default\" href=\"/auth/btc\">connect btc wallet</a>-->\n" +
    "\n" +
    "	<h3>Settings</h3>\n" +
    "	<md-divider></md-divider><br>\n" +
    "	<h4>email settings</h4>\n" +
    "	<a ng-show=\"localPassport.length==0\" class=\"btn btn-default\" href=\"/auth/facebook\">connect email</a>\n" +
    "	<a ng-show=\"localPassport.length>0\" class=\"btn btn-default\">reset password</a>\n" +
    "\n" +
    "	<h4>contact settings</h4>\n" +
    "	<p>send email</p>\n" +
    "	<p>send fax</p>\n" +
    "	<p>send letter</p>\n" +
    "	<!--<p>all activity, per vote.. on creation of bill, on profile comment</p>-->\n" +
    "\n" +
    "	<div class=\"spacing-50\"></div>\n" +
    "\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>");
}]);

angular.module("bill/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("bill/index.tpl.html",
    "<div ui-view=\"bill\">\n" +
    "	<div class=\"container\">\n" +
    "		<div class=\"spacing-10\"></div>\n" +
    "		<h4>{{bill.title}}</h4>\n" +
    "		<div ng-repeat=\"committeeBill in committees\">\n" +
    "			<p><a href=\"committee/{{committeeBill.committee.urlTitle}}\" class=\"grey\">{{committeeBill.committee.title}}</a></p>\n" +
    "		</div>\n" +
    "		<md-subheader ng-bind=\"bill.createdAt | date:'MM/dd/yyyy h:mma'\" class=\"md-no-sticky\"></md-subheader><br>\n" +
    "		<!--<div class=\"row\">\n" +
    "			<button class=\"col-xs-6 btn btn-default upVote\" ng-click=\"createVote(1)\"><i class=\"fa fa-caret-up\"></i> {{vote.plusCount}}</button>\n" +
    "        	<button class=\"col-xs-6 btn btn-default downVote\" ng-click=\"createVote(-1)\"><i class=\"fa fa-caret-down\"></i> {{vote.minusCount}}</button>\n" +
    "    	</div>\n" +
    "    	<div class=\"spacing-10\"></div>-->\n" +
    "		<uib-tabset>\n" +
    "			<uib-tab heading=\"Info\" active=\"active\">\n" +
    "			    <div class=\"spacing-10\"></div>\n" +
    "				<div class=\"col-lg-4 col-sm-6\">\n" +
    "					<div class=\"member-card\">\n" +
    "						<div class=\"image\" style=\"background-image: url('{{bill.user.coverUrl}}')\">\n" +
    "							<a href=\"member/{{bill.user.username}}\"><img ng-src=\"{{bill.user.avatarUrl}}\" err-src=\"/images/avatar.png\"></a>\n" +
    "						</div>\n" +
    "						<div class=\"info\">\n" +
    "                        	<h4 class=\"name\"><a href=\"member/{{bill.user.username}}\">{{bill.user.username}}</a></h4>\n" +
    "                			<h5 class=\"position\">{{bill.user.title || 'voetr member'}}</h5>\n" +
    "							<p>{{bill.user.state}}</p>\n" +
    "						</div>\n" +
    "						<div class=\"social\">\n" +
    "							<a ng-show=\"bill.user.socialAccounts.facebook.profileUrl\" href=\"{{bill.user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook facebook-icon\"></i></a>\n" +
    "							<a ng-show=\"bill.user.socialAccounts.twitter.profileUrl\" href=\"{{bill.user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter twitter-icon\"></i></a>\n" +
    "							<a ng-show=\"bill.user.socialAccounts.google.profileUrl\" href=\"{{bill.user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google google-icon\"></i></a>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<h5 ng-show=\"false\"><a href=\"#\">and 8 cosponsors</a></h5>\n" +
    "					<h4 ng-show=\"bill.congressGovUrl\"><a href=\"{{bill.congressGovUrl}}\">congress.gov link</a></h4>\n" +
    "				</div>\n" +
    "				<div class=\"col-sm-8\">\n" +
    "					<p>{{bill.billContent.current_status_description}}</p>\n" +
    "					<p>{{bill.billContent.current_status_label}}</p>\n" +
    "					<div ng-show=\"bill.summary\">\n" +
    "						<h4>Summary</h4>\n" +
    "						<p style=\"color:rgb(100,100,100)\">{{bill.summary}}</p>\n" +
    "					</div>\n" +
    "					<div ng-bind-html=\"billContent\"></div>\n" +
    "					<h4 ng-show=\"!billContent\">Bill Text not currently available</h4>\n" +
    "				</div>\n" +
    "		    </uib-tab>\n" +
    "		    <uib-tab heading=\"Activity\">\n" +
    "\n" +
    "		    	{{actions}}\n" +
    "				<div ng-show=\"!currentUser\" class=\"profilePost\">\n" +
    "					<form role=\"form\">\n" +
    "						<md-input-container class=\"md-block\">\n" +
    "							<textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\"></textarea>\n" +
    "						</md-input-container>\n" +
    "						<button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "					</form>\n" +
    "		        </div>\n" +
    "\n" +
    "				<!--<div ng-show=\"!currentUser\" class=\"profilePost\">\n" +
    "			        <form role=\"form\">\n" +
    "			            <md-input-container class=\"md-block\">\n" +
    "			                <textarea ng-model=\"newPost.post\" md-maxlength=\"150\" rows=\"5\" md-select-on-focus aria-label=\"new post\"></textarea>\n" +
    "			            </md-input-container>\n" +
    "			            <button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "			        </form>\n" +
    "			    </div>-->\n" +
    "\n" +
    "			    <md-card ng-show=\"currentUser\">\n" +
    "			        <div class=\"card-container\">\n" +
    "			            <div class=\"post-controller-container\">\n" +
    "			                <a href=\"/member/{{currentUser.username}}\">\n" +
    "			                    <img class=\"post-img\" ng-src=\"{{currentUser.avatarUrl}}\" class=\"md-card-image\" alt=\"{{currentUser.username}}\">\n" +
    "			                    <h4 class=\"post-name\">{{currentUser.username}}</h4>\n" +
    "			                </a>\n" +
    "			            </div>\n" +
    "			            <div style=\"margin-left:61px;\">\n" +
    "			                <form role=\"form\">\n" +
    "			                    <md-input-container class=\"md-block\">\n" +
    "			                        <textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"what's happening\"></textarea>\n" +
    "			                    </md-input-container>\n" +
    "			                    <button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default pull-right\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "			                </form>\n" +
    "			            </div>\n" +
    "			        </div>\n" +
    "			    </md-card>\n" +
    "\n" +
    "\n" +
    "		        <md-card ng-repeat=\"post in posts\">\n" +
    "		        	<div class=\"card-container\">\n" +
    "\n" +
    "						<div class=\"post-controller-container\">\n" +
    "	                        <a href=\"/member/{{post.user.username}}\">\n" +
    "	                            <img class=\"post-img\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "	                            <h4 class=\"post-name\">{{post.user.username}}</h4>\n" +
    "	                        </a>\n" +
    "	                        <div class=\"pull-right\">\n" +
    "	                            <span class=\"grey\" am-time-ago=\"post.updatedAt\"></span>\n" +
    "	                            <div style=\"display:inline\" uib-dropdown is-open=\"status.isopen\">\n" +
    "	                                <a uib-dropdown-toggle ng-disabled=\"disabled\" href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a> \n" +
    "	                                <ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "	                                    <li role=\"menuitem\"><a href=\"#\">Share</a></li>\n" +
    "	                                    <li role=\"menuitem\"><a href=\"#\">Delete</a></li>\n" +
    "	                                </ul>\n" +
    "	                            </div>\n" +
    "	                        </div>\n" +
    "	                    </div>\n" +
    "\n" +
    "	                    <div class=\"post-container\">\n" +
    "	                        <p>{{post.post}}</p>\n" +
    "	                    </div>\n" +
    "\n" +
    "	                    <div class=\"post-action-container\">\n" +
    "	                        <div class=\"pull-left\">\n" +
    "	                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "	                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "	                            <a href=\"#\" class=\"grey\" ng-click=\"reply(post)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "	                        </div>\n" +
    "	                        <div class=\"pull-right\">\n" +
    "	                            <a href=\"post/{{post.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "	                        </div>\n" +
    "	                    </div>\n" +
    "\n" +
    "					</div>\n" +
    "		        </md-card>\n" +
    "\n" +
    "\n" +
    "		    </uib-tab>\n" +
    "			<uib-tab heading=\"Discussion\">\n" +
    "				<div ng-show=\"!currentUser\" class=\"profilePost\">\n" +
    "					<form role=\"form\">\n" +
    "						<md-input-container class=\"md-block\">\n" +
    "							<textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\"></textarea>\n" +
    "						</md-input-container>\n" +
    "						<button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "					</form>\n" +
    "		        </div>\n" +
    "\n" +
    "				<!--<div ng-show=\"!currentUser\" class=\"profilePost\">\n" +
    "			        <form role=\"form\">\n" +
    "			            <md-input-container class=\"md-block\">\n" +
    "			                <textarea ng-model=\"newPost.post\" md-maxlength=\"150\" rows=\"5\" md-select-on-focus aria-label=\"new post\"></textarea>\n" +
    "			            </md-input-container>\n" +
    "			            <button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "			        </form>\n" +
    "			    </div>-->\n" +
    "\n" +
    "			    <md-card ng-show=\"currentUser\">\n" +
    "			        <div class=\"card-container\">\n" +
    "			            <div class=\"post-controller-container\">\n" +
    "			                <a href=\"/member/{{currentUser.username}}\">\n" +
    "			                    <img class=\"post-img\" ng-src=\"{{currentUser.avatarUrl}}\" class=\"md-card-image\" alt=\"{{currentUser.username}}\">\n" +
    "			                    <h4 class=\"post-name\">{{currentUser.username}}</h4>\n" +
    "			                </a>\n" +
    "			            </div>\n" +
    "			            <div style=\"margin-left:61px;\">\n" +
    "			                <form role=\"form\">\n" +
    "			                    <md-input-container class=\"md-block\">\n" +
    "			                        <textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"what's happening\"></textarea>\n" +
    "			                    </md-input-container>\n" +
    "			                    <button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default pull-right\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "			                </form>\n" +
    "			            </div>\n" +
    "			        </div>\n" +
    "			    </md-card>\n" +
    "\n" +
    "\n" +
    "		        <md-card ng-repeat=\"post in posts\">\n" +
    "\n" +
    "			        <div class=\"card-container\">\n" +
    "				        <div class=\"post-controller-container\">\n" +
    "	                        <a href=\"/member/{{post.user.username}}\">\n" +
    "	                            <img class=\"post-img\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "	                            <h4 class=\"post-name\">{{post.user.username}}</h4>\n" +
    "	                        </a>\n" +
    "	                        <div class=\"pull-right\">\n" +
    "	                            <span class=\"grey\" am-time-ago=\"post.updatedAt\"></span>\n" +
    "	                            <div style=\"display:inline\" uib-dropdown is-open=\"status.isopen\">\n" +
    "	                                <a uib-dropdown-toggle ng-disabled=\"disabled\" href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a> \n" +
    "	                                <ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "	                                    <li role=\"menuitem\"><a href=\"#\">Share</a></li>\n" +
    "	                                    <li role=\"menuitem\"><a href=\"#\">Delete</a></li>\n" +
    "	                                </ul>\n" +
    "	                            </div>\n" +
    "	                        </div>\n" +
    "	                    </div>\n" +
    "\n" +
    "	                    <div class=\"post-container\">\n" +
    "	                        <p>{{post.post}}</p>\n" +
    "	                    </div>\n" +
    "\n" +
    "	                    <div class=\"post-action-container\">\n" +
    "	                        <div class=\"pull-left\">\n" +
    "	                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "	                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "	                            <a href=\"#\" class=\"grey\" ng-click=\"reply(post)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "	                        </div>\n" +
    "	                        <div class=\"pull-right\">\n" +
    "	                            <a href=\"post/{{post.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "	                        </div>\n" +
    "	                    </div>\n" +
    "                	</div>\n" +
    "\n" +
    "		        </md-card>\n" +
    "		    </uib-tab>\n" +
    "		    <uib-tab heading=\"Votes\" ng-show=\"votes.length > 0\">\n" +
    "	    		<!--<div ng-show=\"currentUser\">\n" +
    "					<form role=\"form\">\n" +
    "						<md-input-container class=\"md-block\">\n" +
    "							<textarea ng-model=\"newVote.title\" rows=\"5\" md-select-on-focus aria-label=\"newVote\"></textarea>\n" +
    "						</md-input-container>\n" +
    "						<button type=\"submit\" ng-click=\"\" class=\"btn btn-default\">Submit</button>\n" +
    "					</form>\n" +
    "				</div>-->\n" +
    "				<div class=\"voteContainer\" ng-show=\"votes.length==0\">\n" +
    "					<h2>no votes yet</h2>\n" +
    "				</div>\n" +
    "			    <div class=\"voteContainer\" ng-show=\"votes.length!=0\">\n" +
    "					<md-card ng-repeat=\"vote in bill.votes\">\n" +
    "				        <div style=\"padding:16px 16px 16px\">\n" +
    "							<h4><a href=\"/vote/{{vote.id}}\">{{vote.result}}: {{vote.title}}</a></h4>\n" +
    "							<div class=\"spacing-10\"></div>\n" +
    "							<button ng-class=\"{'upVoted': class=='upVote'}\" class=\"btn btn-default upVote col-sm-6\" ng-click=\"createVote(1, vote)\">\n" +
    "								<i class=\"fa fa-caret-up vBlue\"></i> <b>{{vote.plusCount}}</b>\n" +
    "							</button>\n" +
    "							<button ng-class=\"{'downVoted': class=='downVote'}\" class=\"btn btn-default downVote col-sm-6\" ng-click=\"createVote(-1, vote)\">\n" +
    "								<i class=\"fa fa-caret-down red-color\"></i>  <b>{{vote.minusCount}}</b>\n" +
    "							</button>\n" +
    "						</div>\n" +
    "					</md-card>\n" +
    "				</div>\n" +
    "		    </uib-tab>\n" +
    "			<uib-tab heading=\"Related\" ng-show=\"bill.relatedBills > 0\">\n" +
    "				<div ng-repeat=\"bill in bill.relatedBills\">\n" +
    "					<p><a href=\"bill/{{bill.urlTitle}}\">{{bill.title}}</a></p>\n" +
    "				</div>\n" +
    "		    </uib-tab>\n" +
    "		</uib-tabset>\n" +
    "	</div>\n" +
    "	<div class=\"spacing-15\"></div>\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>");
}]);

angular.module("bills/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("bills/index.tpl.html",
    "<div class=\"imageContainerSmall\">\n" +
    "    <video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\" playsinline></video>\n" +
    "    <div class=\"imageContainerSmallDiv container\">  \n" +
    "        <h1 style=\"text-align:left\">bills</h1>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"spacing-10\"></div>\n" +
    "    <div class=\"dropdown sort-dropdown noselect\">\n" +
    "        <a class=\"dropdown-toggle noselect\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "            <h4 class=\"noselect\">{{sortText[sort]}}<span class=\"caret\"></span></h4>\n" +
    "        </a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li><a class=\"sort-a\" ng-click=\"selectSort('trendingScore DESC')\"><h5>Trending</h5></a></li>\n" +
    "            <hr class=\"sort-hr\">\n" +
    "            <li><a class=\"sort-a\" ng-click=\"selectSort('createdAt DESC')\"><h5>Most Recent</h5></a></li>\n" +
    "            <hr class=\"sort-hr\">\n" +
    "            <li><a class=\"sort-a\" ng-click=\"selectSort('voteCount DESC')\"><h5>Most Voted</h5></a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div class=\"spacing-10\"></div>\n" +
    "    <md-card ng-repeat=\"bill in bills\">\n" +
    "        <div class=\"card-container\">\n" +
    "            <h4><a href=\"/bill/{{bill.id}}/{{bill.title.replace(' ','-')}}\">{{bill.title}}</a></h4>\n" +
    "            <div class=\"post-action-container\">\n" +
    "                <div class=\"pull-left\">\n" +
    "                    <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "                    <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "                    <a href=\"#\" class=\"grey\" ng-click=\"reply(result)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </md-card>\n" +
    "</div>\n" +
    "<div class=\"spacing-25\"></div>\n" +
    "<md-divider></md-divider>\n" +
    "<div class=\"spacing-25\"></div>\n" +
    "<div ng-click=\"loadMore()\" class=\"container\" style=\"text-align:center\">\n" +
    "    <button style=\"width:100%\" class=\"btn btn-default\">MORE <i class=\"fa fa-angle-down\"></i></button>\n" +
    "</div>\n" +
    "<div class=\"spacing-25\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>");
}]);

angular.module("committee/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committee/index.tpl.html",
    "<div class=\"imageContainerSmall\">\n" +
    "    <video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\" playsinline></video>\n" +
    "    <div class=\"imageContainerSmallDiv container\">  \n" +
    "        <h1 style=\"text-align:left\">{{committee.title}}</h1>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"member-tab-container container\">\n" +
    "	<ul style=\"padding:0px;\" class=\"member-tabs\">\n" +
    "		<li><a href=\"/committee/{{committee.urlTitle}}\">Activity</a></li>\n" +
    "		<li><a href=\"/committee/{{committee.urlTitle}}/bills\">{{committee.billCount}} Bills</a></li>\n" +
    "		<li><a href=\"/committee/{{committee.urlTitle}}/committees\">Committees</a></li>\n" +
    "		<li><a href=\"/committee/{{committee.urlTitle}}/discussion\">Discussion</a></li>\n" +
    "		<li><a href=\"/committee/{{committee.urlTitle}}/members\">{{committee.memberCount}} Member<span ng-show=\"committee.memberCount!=1\">s</span></a></li>\n" +
    "		<li><a href=\"/committee/{{committee.urlTitle}}/votes\">{{committee.voteCount}} Votes</a></li>\n" +
    "		<!--<li ng-show=\"currentUser\">\n" +
    "			<a class=\"btn btn-default\" ng-click=\"toggleEditCommittee()\">Edit</a>\n" +
    "		</li>-->\n" +
    "		<li ng-show=\"currentUser\">\n" +
    "			<a class=\"btn btn-default\" ng-click=\"createMember()\">Join</a>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</div>\n" +
    "<md-divider></md-divider>\n" +
    "<div class=\"container\" ng-show=\"editCommitteeToggle\"><p>edit committee form</p></div>\n" +
    "<div class=\"committee-container container\">\n" +
    "	<div class=\"spacing-10\"></div>\n" +
    "	<div ui-view=\"committeeActivity\"></div>\n" +
    "	<div ui-view=\"committeeBills\"></div>\n" +
    "	<div ui-view=\"committeeCommittees\"></div>\n" +
    "	<div ui-view=\"committeeDiscussion\"></div>\n" +
    "	<div ui-view=\"committeeMembers\"></div>\n" +
    "	<div ui-view=\"committeeVotes\"></div>\n" +
    "</div>\n" +
    "<div class=\"spacing-25\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>");
}]);

angular.module("committee/templates/activity.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committee/templates/activity.tpl.html",
    "<div class=\"container\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div ng-show=\"!currentUser\" class=\"profilePost\">\n" +
    "        <form role=\"form\">\n" +
    "            <md-input-container class=\"md-block\">\n" +
    "                <textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\"></textarea>\n" +
    "            </md-input-container>\n" +
    "            <button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "\n" +
    "    <md-card ng-show=\"currentUser\">\n" +
    "        <div class=\"card-container\">\n" +
    "            <div class=\"post-controller-container\">\n" +
    "                <a href=\"/member/{{user.username}}\">\n" +
    "                    <img class=\"post-img\" ng-src=\"{{user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{user.username}}\">\n" +
    "                    <h4 class=\"post-name\">{{user.username}}</h4>\n" +
    "                </a>\n" +
    "            </div>\n" +
    "            <div style=\"margin-left:61px;\">\n" +
    "                <form role=\"form\">\n" +
    "                    <md-input-container class=\"md-block\">\n" +
    "                        <textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"what's happening\"></textarea>\n" +
    "                    </md-input-container>\n" +
    "                    <button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default pull-right\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </md-card>\n" +
    "\n" +
    "\n" +
    "    <md-card ng-repeat=\"post in posts\">\n" +
    "        <div class=\"card-container\">\n" +
    "\n" +
    "            <div>\n" +
    "                <a href=\"/member/{{post.user.username}}\">\n" +
    "                    <img class=\"post-img\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "                    <h4 class=\"post-name\">{{post.user.username}}</h4>\n" +
    "                </a>\n" +
    "                <div class=\"pull-right\">\n" +
    "                    <span class=\"grey\" am-time-ago=\"post.updatedAt\"></span>\n" +
    "                    <div style=\"display:inline\" uib-dropdown is-open=\"status.isopen\">\n" +
    "                        <a uib-dropdown-toggle ng-disabled=\"disabled\" href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a> \n" +
    "                        <ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "                            <li role=\"menuitem\"><a href=\"#\">Share</a></li>\n" +
    "                            <li role=\"menuitem\"><a href=\"#\">Delete</a></li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"post-container\">\n" +
    "                <p>{{post.post}}</p>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"post-action-container\">\n" +
    "                <div class=\"pull-left\">\n" +
    "                    <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "                    <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "                    <a href=\"#\" class=\"grey\" ng-click=\"reply(post)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "                </div>\n" +
    "                <div class=\"pull-right\">\n" +
    "                    <a href=\"post/{{post.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "             <!--\n" +
    "            <div class=\"profilePost\">\n" +
    "                <form role=\"form\">\n" +
    "                    <md-input-container class=\"md-block\">\n" +
    "                        <textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"\"></textarea>\n" +
    "                    </md-input-container>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "            -->\n" +
    "\n" +
    "        </div>\n" +
    "    </md-card>\n" +
    "    <md-card ng-repeat=\"committeeBill in bills\">\n" +
    "        <div class=\"card-container\">\n" +
    "            <div>\n" +
    "                <h4>\n" +
    "                    <!--{{bill.voteCount}}\n" +
    "                    <button class=\"btn btn-default\" ng-click=\"createVote(1, bill)\"><i class=\"fa fa-caret-up\"></i></button>\n" +
    "                    <button class=\"btn btn-default\" ng-click=\"createVote(-1, bill)\"><i class=\"fa fa-caret-down\"></i></button>-->\n" +
    "                    <a href=\"/bill/{{committeeBill.bill.id}}/{{committeeBill.bill.title}}\">{{committeeBill.bill.title}}</a>\n" +
    "                    <br>\n" +
    "                    <a href=\"committee/{{committeeBill.committee.urlTitle}}\">{{committeeBill.committee.title}}</a>\n" +
    "                </h4>\n" +
    "\n" +
    "                <div>\n" +
    "                    <div class=\"pull-left\">\n" +
    "                        <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "                        <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "                        <a href=\"bill/{{committeeBill.bill.id}}/{{committeeBill.bill.title}}\" class=\"grey\" ng-click=\"reply(post)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "                    </div>\n" +
    "                    <div class=\"pull-right\">\n" +
    "                        <a href=\"bill/{{committeeBill.bill.id}}/{{committeeBill.bill.title}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <!--<div>\n" +
    "                <a href=\"/bill/{{bill._id}}/{{bill.title}}\">{{bill.posts.length}} posts, {{bill.votes.length}} votes</a>\n" +
    "            </div>-->\n" +
    "        </div>\n" +
    "    </md-card>\n" +
    "</div>\n" +
    "");
}]);

angular.module("committee/templates/bills.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committee/templates/bills.tpl.html",
    "<div ng-show=\"currentUser\" class=\"container\">\n" +
    "    <button ng-click=\"toggleCreateBill()\" class=\"btn btn-default\">+ bill</button>\n" +
    "    <div style=\"margin-left:20%;margin-right:20%;\" ng-show=\"createBillToggle\">\n" +
    "        <form class=\"committee-input\" role=\"form\" ng-submit=\"createBill(newBill)\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" placeholder= \"bill title\" ng-model=\"newBill.title\" class=\"form-control\">\n" +
    "                <input type=\"text\" placeholder= \"bill content\" ng-model=\"newBill.billContent\" class=\"form-control\">\n" +
    "            </div>\n" +
    "            <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"container\">\n" +
    "    <md-card ng-repeat=\"committeeBill in bills\">\n" +
    "        <div class=\"card-container\">\n" +
    "            <div>\n" +
    "                <h4>\n" +
    "                    <a href=\"bill/{{committeeBill.bill.id}}/{{committeeBill.bill.title}}\">{{committeeBill.bill.title}}</a>\n" +
    "                    <br>\n" +
    "                    <a href=\"committee/{{committeeBill.committee.urlTitle}}\">{{committeeBill.committee.title}}</a>\n" +
    "                </h4>\n" +
    "                <div>\n" +
    "                    <div class=\"pull-left\">\n" +
    "                        <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "                        <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "                        <a href=\"bill/{{committeeBill.bill.id}}/{{committeeBill.bill.title}}\" class=\"grey\" ng-click=\"reply(post)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "                    </div>\n" +
    "                    <div class=\"pull-right\">\n" +
    "                        <a href=\"bill/{{committeeBill.bill.id}}/{{committeeBill.bill.title}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </md-card>\n" +
    "</div>\n" +
    "");
}]);

angular.module("committee/templates/committees.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committee/templates/committees.tpl.html",
    "<div class=\"container\">\n" +
    "    <div class=\"committee-title\">\n" +
    "        <h2><a href=\"committee/{{committee.parent.urlTitle}}\">{{committee.parent.title}}</a></h2>\n" +
    "    </div>\n" +
    "     <md-card ng-repeat=\"committee in committees\">\n" +
    "        <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "                <a href=\"/committee/{{committee.urlTitle}}/\"><h3>{{committee.title}}</h3></a>\n" +
    "                <h5>{{committee.memberCount}} members</h5>\n" +
    "            </md-card-title-text>\n" +
    "        <md-card-title>\n" +
    "    </md-card>\n" +
    "</div>");
}]);

angular.module("committee/templates/discussion.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committee/templates/discussion.tpl.html",
    "<div class=\"container\">\n" +
    "\n" +
    "\n" +
    "    <div ng-show=\"!currentUser\" class=\"profilePost\">\n" +
    "        <form role=\"form\">\n" +
    "            <md-input-container class=\"md-block\">\n" +
    "                <textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\"></textarea>\n" +
    "            </md-input-container>\n" +
    "            <button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "\n" +
    "    <md-card ng-show=\"currentUser\">\n" +
    "        <div class=\"card-container\">\n" +
    "            <div class=\"post-controller-container\">\n" +
    "                <a href=\"/member/{{user.username}}\">\n" +
    "                    <img class=\"post-img\" ng-src=\"{{user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{user.username}}\">\n" +
    "                    <h4 class=\"post-name\">{{user.username}}</h4>\n" +
    "                </a>\n" +
    "            </div>\n" +
    "            <div style=\"margin-left:61px;\">\n" +
    "                <form role=\"form\">\n" +
    "                    <md-input-container class=\"md-block\">\n" +
    "                        <textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"what's happening\"></textarea>\n" +
    "                    </md-input-container>\n" +
    "                    <button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default pull-right\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </md-card>\n" +
    "\n" +
    "\n" +
    "    <md-card ng-repeat=\"post in posts\">\n" +
    "        <div style=\"padding:16px 16px 16px\">\n" +
    "\n" +
    "            <div>\n" +
    "                <a href=\"/member/{{post.user.username}}\">\n" +
    "                    <img class=\"post-img\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "                    <h4 class=\"post-name\">{{post.user.username}}</h4>\n" +
    "                </a>\n" +
    "                <div class=\"pull-right\">\n" +
    "                    <span class=\"grey\" am-time-ago=\"post.updatedAt\"></span>\n" +
    "                    <div style=\"display:inline\" uib-dropdown is-open=\"status.isopen\">\n" +
    "                        <a uib-dropdown-toggle ng-disabled=\"disabled\" href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a> \n" +
    "                        <ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "                            <li role=\"menuitem\"><a href=\"#\">Share</a></li>\n" +
    "                            <li role=\"menuitem\"><a href=\"#\">Delete</a></li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"post-container\">\n" +
    "                <p>{{post.post}}</p>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"post-action-container\">\n" +
    "                <div class=\"pull-left\">\n" +
    "                    <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "                    <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "                    <a href=\"post/{{post.id}}\" class=\"grey\" ng-click=\"reply(post)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "                </div>\n" +
    "                <div class=\"pull-right\">\n" +
    "                    <a href=\"post/{{post.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "             <!--\n" +
    "            <div class=\"profilePost\">\n" +
    "                <form role=\"form\">\n" +
    "                    <md-input-container class=\"md-block\">\n" +
    "                        <textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"\"></textarea>\n" +
    "                    </md-input-container>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "            -->\n" +
    "\n" +
    "        </div>\n" +
    "    </md-card>\n" +
    "</div>");
}]);

angular.module("committee/templates/members.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committee/templates/members.tpl.html",
    "<div class=\"container\">\n" +
    "    <div class=\"col-lg-4 col-sm-6\" ng-repeat=\"member in members\">\n" +
    "        <div class=\"member-card\">\n" +
    "            <div class=\"image\" style=\"background-image: url('{{member.user.coverUrl}}')\">\n" +
    "                <img ng-src=\"{{member.user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "            </div>\n" +
    "            <div class=\"info\">\n" +
    "                <h4 class=\"name\"><a href=\"member/{{member.user.username}}\">{{member.user.username}}</a></h4>\n" +
    "                <p>{{member.title}}</p>\n" +
    "                <p>{{member.user.state}}</p>\n" +
    "                <!--{{member.constituentCount}}-->\n" +
    "            </div>\n" +
    "            <div class=\"social\">\n" +
    "                <a ng-show=\"member.user.socialAccounts.facebook.profileUrl\" href=\"{{member.user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook facebook-icon\"></i></a>\n" +
    "                <a ng-show=\"member.user.socialAccounts.twitter.profileUrl\" href=\"{{member.user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter twitter-icon\"></i></a>\n" +
    "                <a ng-show=\"member.user.socialAccounts.google.profileUrl\" href=\"{{member.user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google google-icon\"></i></a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <button ng-show=\"members.length != memberCount\" ng-click=\"loadMore()\" class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-caret-down\"></i></button>\n" +
    "</div>");
}]);

angular.module("committee/templates/votes.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committee/templates/votes.tpl.html",
    "<div class=\"container\">\n" +
    "</div>");
}]);

angular.module("committees/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("committees/index.tpl.html",
    "<div class=\"imageContainerSmall\">\n" +
    "    <video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\" playsinline></video>\n" +
    "    <div class=\"imageContainerSmallDiv container\">  \n" +
    "        <h1 style=\"text-align:left\">committees</h1>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"spacing-10\"></div>\n" +
    "    <div class=\"dropdown sort-dropdown noselect\">\n" +
    "        <a class=\"dropdown-toggle noselect\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "            <h4 class=\"noselect\">{{sortText[sort]}}<span class=\"caret\"></span></h4>\n" +
    "        </a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li><a class=\"sort-a\" ng-click=\"selectSort('trendingScore DESC')\"><h5>Trending</h5></a></li>\n" +
    "            <hr class=\"sort-hr\">\n" +
    "            <li><a class=\"sort-a\" ng-click=\"selectSort('memberCount DESC')\"><h5>Member Count</h5></a></li>\n" +
    "            <hr class=\"sort-hr\">\n" +
    "            <li><a class=\"sort-a\" ng-click=\"selectSort('createdAt DESC')\"><h5>Date Created</h5></a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div class=\"spacing-10\"></div>\n" +
    "    <div ng-show=\"currentUser\">\n" +
    "        <form role=\"form\">\n" +
    "            <md-input-container class=\"md-block\">\n" +
    "                <input ng-model=\"newCommittee.title\" type=\"text\" placeholder= \"committee title\">\n" +
    "            </md-input-container>\n" +
    "            <!--<md-input-container class=\"md-block\">\n" +
    "                <input ng-model=\"newCommittee.parent\" type=\"text\" placeholder= \"committee parent\">\n" +
    "            </md-input-container>-->\n" +
    "            <button ng-click=\"createCommittee()\" type=\"submit\" class=\"btn btn-default\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <md-card ng-repeat=\"committee in committees\">\n" +
    "        <div class=\"card-container\">\n" +
    "            <h3><a href=\"/committee/{{committee.urlTitle}}\">{{committee.title}}</a></h3>\n" +
    "            <p><span style=\"color:grey\">{{committee.memberCount}} members</span></p>\n" +
    "        </div>\n" +
    "    </md-card>\n" +
    "</div>\n" +
    "<div class=\"spacing-25\"></div>\n" +
    "<md-divider></md-divider>\n" +
    "<div class=\"spacing-25\"></div>\n" +
    "<div ng-click=\"loadMore()\" class=\"container\" style=\"text-align:center\">\n" +
    "    <button style=\"width:100%\" class=\"btn btn-default\">MORE <i class=\"fa fa-angle-down\"></i></button>\n" +
    "</div>\n" +
    "<div class=\"spacing-25\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>");
}]);

angular.module("footer/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("footer/index.tpl.html",
    "<style>\n" +
    "	.footer-left {text-align: left;padding:10px;}\n" +
    "	.footer-right {text-align: right;padding:10px}\n" +
    "	@media (max-width: 767px) {\n" +
    "	    .footer-left {\n" +
    "	        text-align: center;\n" +
    "	    }\n" +
    "	    .footer-right{\n" +
    "	        text-align: center;\n" +
    "	    }\n" +
    "	}\n" +
    "</style>\n" +
    "<div class=\"footer\" ng-controller=\"FooterCtrl\">\n" +
    "	<div class=\"container\">\n" +
    "		<div class=\"footer-left col-md-6 col-sm-6  col-xs-12\">\n" +
    "			{{date | date:'yyyy'}} <a href=\"/\">voetr</a>\n" +
    "		</div>\n" +
    "		<div class=\"footer-right col-md-6 col-sm-6 col-xs-12\">\n" +
    "			<a href=\"/about\">about</a>\n" +
    "			<a href=\"/search\">discover</a>\n" +
    "			<a href=\"/bills\">bills</a>\n" +
    "			<a href=\"/committees\">committees</a>\n" +
    "			<!--<a href=\"/members\">members</a>-->\n" +
    "			<a href=\"/votes\">votes</a>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("home/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("home/index.tpl.html",
    "<div ui-view=\"homeIntro\"></div>\n" +
    "<div ui-view=\"homeFeed\"></div> \n" +
    "");
}]);

angular.module("home/templates/feed.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("home/templates/feed.tpl.html",
    "<div class=\"spacing-15\"></div>\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4\">\n" +
    "\n" +
    "\n" +
    "            <div class=\"member-card\">\n" +
    "                <div class=\"image\" style=\"background-image: url('{{user.coverUrl}}')\">\n" +
    "                    <a href=\"member/{{user.username}}\"><img style=\"top:5%\" ng-src=\"{{user.avatarUrl}}\" err-src=\"/images/avatar.png\"></a>\n" +
    "                </div>\n" +
    "                <div class=\"info\" style=\"height:100%\">\n" +
    "                    <h4 class=\"name\"><a href=\"member/{{user.username}}\">{{user.username}}</a></h2>\n" +
    "                    <div class=\"spacing-10\"></div>\n" +
    "                    <h5><a href=\"member/{{user.username}}/committees\">{{user.committeeCount}} Committees</a></h5>\n" +
    "                    <h5><a href=\"member/{{user.username}}/constituents\">{{user.constituentCount}} Constituents</a></h5>\n" +
    "                    <!--<h5><a href=\"member/{{user.username}}/representatives\">Representatives - {{user.representativeCount}}</a></h5>-->\n" +
    "                    <h5><a href=\"member/{{user.username}}/votes\">{{user.voteCount}} Votes</a></h5>\n" +
    "                </div>\n" +
    "                <div class=\"social\">\n" +
    "                    <a ng-show=\"user.socialAccounts.facebook.profileUrl\" href=\"{{user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook facebook-icon\"></i></a>\n" +
    "                    <a ng-show=\"user.socialAccounts.twitter.profileUrl\" href=\"{{user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter twitter-icon\"></i></a>\n" +
    "                    <a ng-show=\"user.socialAccounts.google.profileUrl\" href=\"{{user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google google-icon\"></i></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"spacing-15\"></div>\n" +
    "\n" +
    "            \n" +
    "        </div>\n" +
    "        <div class=\"col-md-8\">      \n" +
    "\n" +
    "            <md-card>\n" +
    "                <div class=\"card-container\">\n" +
    "                    <div class=\"post-controller-container\">\n" +
    "                        <a href=\"/member/{{user.username}}\">\n" +
    "                            <img class=\"post-img\" ng-src=\"{{user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{user.username}}\">\n" +
    "                            <h4 class=\"post-name\">{{user.username}}</h4>\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                    <div style=\"margin-left:61px;\">\n" +
    "                        <form role=\"form\">\n" +
    "                            <md-input-container class=\"md-block\">\n" +
    "                                <textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"what's happening\"></textarea>\n" +
    "                            </md-input-container>\n" +
    "                            <button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default pull-right\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "                        </form>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </md-card>\n" +
    "\n" +
    "            <div class=\"spacing-10\"></div>\n" +
    "\n" +
    "            <md-card ng-repeat=\"post in posts\">\n" +
    "                <div class=\"card-container\">\n" +
    "\n" +
    "                    <div class=\"post-controller-container\">\n" +
    "                        <a href=\"/member/{{post.user.username}}\">\n" +
    "                            <img class=\"post-img\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "                            <h4 class=\"post-name\">\n" +
    "                                {{post.user.username}}\n" +
    "                            </h4>\n" +
    "                        </a>\n" +
    "\n" +
    "\n" +
    "                        <!--\n" +
    "                        <a ng-show=\"post.bill\" href=\"bill/{{post.bill.id}}/1\"><h4>{{post.bill.title}}</h4></a>\n" +
    "                        <a ng-show=\"post.committee\" href=\"committee/{{post.committee.urlTitle}}\"><h4>{{post.committee.title}}</h4></a>\n" +
    "                        <a ng-show=\"post.profile && post.profile.id != post.user.id\" href=\"member/{{post.profile.username}}\"><h4>{{post.profile.username}}</h4></a>\n" +
    "                        -->\n" +
    "\n" +
    "                        \n" +
    "                        <a ng-show=\"post.vote\" href=\"vote/{{post.vote.id}}\"><h4>{{post.vote.title}}</h4></a>\n" +
    "                        <div class=\"pull-right\">\n" +
    "                            <span class=\"grey\" am-time-ago=\"post.updatedAt\"></span>\n" +
    "                            <div style=\"display:inline\" uib-dropdown is-open=\"status.isopen\">\n" +
    "                                <a uib-dropdown-toggle ng-disabled=\"disabled\" href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a> \n" +
    "                                <ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "                                    <li role=\"menuitem\"><a href=\"#\">Share</a></li>\n" +
    "                                    <li role=\"menuitem\"><a href=\"#\">Delete</a></li>\n" +
    "                                </ul>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"post-container\">\n" +
    "                        <a ng-show=\"post.bill\" href=\"bill/{{post.bill.id}}/1\"><h4>{{post.bill.title}}</h4></a>\n" +
    "                        <a ng-show=\"post.committee\" href=\"committee/{{post.committee.urlTitle}}\"><h4>{{post.committee.title}}</h4></a>\n" +
    "                        <a ng-show=\"post.profile && post.profile.id != post.user.id\" href=\"member/{{post.profile.username}}\"><h4>{{post.profile.username}}</h4></a>\n" +
    "                        <p>{{post.post}}</p>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"post-action-container\">\n" +
    "                        <div class=\"pull-left\">\n" +
    "                            <a href=\"#\" ng-click=\"likePost(post)\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> {{post.plusCount}} like </a> \n" +
    "                            <a href=\"#\" ng-click=\"dislikePost(post)\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> {{post.minusCount}} dislike </a> \n" +
    "                            <a href=\"#\" class=\"grey\" ng-click=\"reply(post)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "                            <a href=\"#\" class=\"grey\"><i class=\"fa fa-share\"></i> share </a>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"pull-right\">\n" +
    "                            <a href=\"post/{{post.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div style=\"margin-left:61px;\" ng-show=\"post.showReply\">\n" +
    "                        <form role=\"form\">\n" +
    "                            <md-input-container class=\"md-block\">\n" +
    "                                <textarea ng-model=\"post.newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"\"></textarea>\n" +
    "                            </md-input-container>\n" +
    "                            <button ng-click=\"createPost(post)\" type=\"submit\" class=\"btn btn-default\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "                        </form>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "            </md-card>\n" +
    "\n" +
    "\n" +
    "            <div class=\"spacing-15\"></div>\n" +
    "            <h3>trending votes</h3>\n" +
    "            <md-divider></md-divider>\n" +
    "            <div class=\"spacing-5\"></div>\n" +
    "            <md-card ng-repeat=\"vote in votes\">\n" +
    "                <div class=\"card-container\">\n" +
    "                    <h4><a href=\"/vote/{{vote.id}}\">{{vote.title}}</a></h4>\n" +
    "                    <div class=\"spacing-10\"></div>\n" +
    "                    <a href=\"/bill/{{vote.bill.id}}/{{vote.bill.title}}\">{{vote.bill.title}}</a>\n" +
    "                    <div class=\"spacing-10\"></div>\n" +
    "                    <button ng-class=\"{'upVoted': class=='upVote'}\" class=\"btn btn-default upVote col-xs-6\" ng-click=\"createVote(1, vote)\">\n" +
    "                        <i class=\"fa fa-caret-up vBlue\"></i> <b>{{vote.plusCount}}</b>\n" +
    "                    </button>\n" +
    "                    <button ng-class=\"{'downVoted': class=='downVote'}\" class=\"btn btn-default downVote col-xs-6\" ng-click=\"createVote(-1, vote)\">\n" +
    "                        <i class=\"fa fa-caret-down red-color\"></i>  <b>{{vote.minusCount}}</b>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </md-card>\n" +
    "            <div class=\"spacing-10\"></div>\n" +
    "            <div ng-click=\"loadMoreVotes()\" style=\"text-align:center\">\n" +
    "                <button class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-angle-down\"></i></button>\n" +
    "            </div>\n" +
    "            <div class=\"spacing-50\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>");
}]);

angular.module("home/templates/intro.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("home/templates/intro.tpl.html",
    "<div class=\"imageContainer\">\n" +
    "    <video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\" playsinline></video>\n" +
    "    <div class=\"imageContainerDiv container\">  \n" +
    "        <h1 style=\"\">build empowerment, change consensus</h1>\n" +
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
    "                <!--<h4>create coalitions of representation</h4>-->\n" +
    "                <h4>create constituent coalitions</h4>\n" +
    "                <br><br>\n" +
    "                <a style=\"width:100%\" href=\"/about\" class=\"btn btn-default\">learn more</a>\n" +
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
    "                        <!--<button ng-class=\"{'upVoted': class=='upVote'}\" class=\"btn btn-default upVote\" ng-click=\"createVote(1, vote)\"><i class=\"fa fa-caret-up\"></i>  {{plusCount}}</button>\n" +
    "                        <button ng-class=\"{'downVoted': class=='downVote'}\" class=\"btn btn-default downVote\" ng-click=\"createVote(-1, vote)\"><i class=\"fa fa-caret-down\"></i>  {{minusCount}}</button>-->\n" +
    "                        <a href=\"/bill/{{bill.id}}/{{bill.title.replace(' ','-')}}\">{{bill.title}}</a>\n" +
    "                    </h4>\n" +
    "                    </md-card-title-text>\n" +
    "                </md-card-title>\n" +
    "            </md-card> \n" +
    "            <div ng-click=\"loadMoreBills()\" style=\"text-align:center\">\n" +
    "                <button style=\"margin-top:25px;\" class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-angle-down\"></i></button>\n" +
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
    "                <button style=\"margin-top:25px;\" class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-angle-down\"></i></button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"members\">\n" +
    "        <div class=\"container\">\n" +
    "            <h2><a href=\"/members\">{{userCount}} members</a></h2>\n" +
    "            <md-divider></md-divider><br>\n" +
    "            <button ng-show=\"!gettingRepresentatives\" ng-click=\"getLatLng()\" class=\"btn btn-default\">find representatives</button><br>\n" +
    "            <div class=\"col-lg-4 col-sm-6\" ng-repeat=\"user in officialRepresentatives\">\n" +
    "                <div class=\"member-card\">\n" +
    "                    <div class=\"image\" style=\"background-image: url('{{user.coverUrl}}')\">\n" +
    "                        <a href=\"member/{{user.username}}\"><img ng-src=\"{{user.avatarUrl}}\" err-src=\"/images/avatar.png\"></a>\n" +
    "                    </div>\n" +
    "                    <div class=\"info\">\n" +
    "                        <h4 class=\"name\"><a href=\"member/{{user.username}}\">{{user.username}}</a></h4>\n" +
    "                        <h5 class=\"position\">{{user.title || 'voetr member'}}</h5>\n" +
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
    "                        <a href=\"member/{{user.username}}\"><img ng-src=\"{{user.avatarUrl}}\" err-src=\"/images/avatar.png\"></a>\n" +
    "                    </div>\n" +
    "                    <div class=\"info\">\n" +
    "                        <h4 class=\"name\"><a href=\"member/{{user.username}}\">{{user.username}}</a></h4>\n" +
    "                        <h5 class=\"position\">{{user.title}}</h5>\n" +
    "                        <p>{{user.state}}</p>\n" +
    "                    </div>\n" +
    "                    <div class=\"social\">\n" +
    "                        <a ng-show=\"user.socialAccounts.facebook.profileUrl\" href=\"{{user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook facebook-icon\"></i></a>\n" +
    "                        <a ng-show=\"user.socialAccounts.twitter.profileUrl\" href=\"{{user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter twitter-icon\"></i></a>\n" +
    "                        <a ng-show=\"user.socialAccounts.google.profileUrl\" href=\"{{user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google google-icon\"></i></a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div ng-click=\"loadMoreMembers()\" style=\"text-align:center\">\n" +
    "                <button style=\"margin-top:25px;\" class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-angle-down\"></i></button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "");
}]);

angular.module("login/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("login/index.tpl.html",
    "<div class=\"log-background\">\n" +
    "    <!--<div class=\"blkoverlay\"></div>-->\n" +
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
    "<div ng-include=\"'footer/index.tpl.html'\"></div>");
}]);

angular.module("member/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/index.tpl.html",
    "<div ui-view=\"member\">\n" +
    "	<div class=\"profile-header\">\n" +
    "		<div class=\"member-cover\">\n" +
    "			<img ng-src=\"{{member.coverUrl}}\" err-src=\"/images/avatar.png\"/>\n" +
    "			<div class=\"\"></div>\n" +
    "		</div>\n" +
    "		<div class=\"container\">\n" +
    "			<div class=\"pull-left\">\n" +
    "				<div style=\"\">\n" +
    "					<img class=\"avatar\" ng-src=\"{{member.avatarUrl}}\"/>\n" +
    "					<div class=\"\"></div>\n" +
    "				</div>\n" +
    "\n" +
    "				<!--<a class=\"btn btn-default\" style=\"position:absolute;le\" href=\"account\" ng-show=\"true\">Save</a>\n" +
    "			  	<span id=\"overlay_text\" style=\"position: relative; top: -10px; z-index: 3;\">OVERLAY</span>-->\n" +
    "\n" +
    "			</div>\n" +
    "			<div class=\"pull-right member-tab-container\">\n" +
    "				<ul class=\"member-tabs\">\n" +
    "					<li><a href=\"member/{{member.username}}\">Activity</a></li>\n" +
    "					<li ng-show=\"false\"><a href=\"member/{{member.username}}/bills\">{{member.billCount}} Bill<span ng-show=\"member.billCount!=1\">s</span></a></li>\n" +
    "					<li><a href=\"member/{{member.username}}/committees\">{{member.committeeCount}} Committee<span ng-show=\"member.committeeCount!=1\">s</span></a></li>\n" +
    "					<li><a href=\"member/{{member.username}}/constituents\">{{member.constituentCount}} Constituent<span ng-show=\"member.constituentCount!=1\">s</span></a></li>\n" +
    "					<!--<li><a href=\"member/{{member.username}}/posts\">{{postCount}} Post<span ng-show=\"voteCount>=!1\">s</span></a></li>-->\n" +
    "					<li><a href=\"member/{{member.username}}/representatives\">{{member.representativeCount}} Representative<span ng-show=\"member.representativeCount!=1\">s</span></a></li>\n" +
    "					<li><a href=\"member/{{member.username}}/votes\">{{member.voteCount}} Vote<span ng-show=\"member.voteCount!=1\">s</span></a></li>\n" +
    "					<li ng-show=\"currentUser.id != member.id\">\n" +
    "						<a ng-show=\"!isFollowing\" class=\"btn btn-default\" ng-click=\"selectAsRepresentative()\">Elect</a>\n" +
    "						<a ng-show=\"isFollowing\" class=\"btn btn-default\" ng-click=\"removeRepresentative()\">Unelect</a>\n" +
    "					</li>\n" +
    "					<!--<li ng-show=\"currentUser.id != member.id\">\n" +
    "						<a class=\"btn btn-default\" ng-click=\"\">Follow</a>\n" +
    "					</li>-->\n" +
    "					<li ng-show=\"currentUser.id == member.id\">\n" +
    "						<!--<a class=\"btn btn-default\" href=\"\"member/{{member.username}}/edit\">Edit Profile</a>-->\n" +
    "						<a class=\"btn btn-default\" href=\"member/{{member.username}}/edit\">Edit Profile</a>\n" +
    "						<a class=\"btn btn-default\" href=\"account\" ng-show=\"false\">Save</a>\n" +
    "					</li>\n" +
    "				</ul>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<md-divider></md-divider>\n" +
    "		<div class=\"container\">\n" +
    "			<div class=\"pull-left\">\n" +
    "				<h2>{{member.firstName}} {{member.lastName}} <i ng-show=\"member.identificationUrl\" class=\"fa fa-check\"></i></h2>\n" +
    "				<h5><span class=\"grey\">@{{member.username}}</span></h5>\n" +
    "				<h5 ng-show=\"member.title\"><span class=\"grey\">{{member.title}}</span></h5>\n" +
    "				<h5 ng-show=\"member.district\"><span class=\"grey\">District {{member.district}}</span></h5>\n" +
    "				<h5 ng-show=\"member.state\"><span class=\"grey\">{{member.state}}</span></h5>\n" +
    "			</div>\n" +
    "			<div class=\"pull-right\">\n" +
    "				<div class=\"spacing-10\"></div>\n" +
    "				<h5 ng-show=\"member.phone\"><a ng-repeat=\"phone in member.phone.split(',')\" style=\"color:grey;padding:5px\" href=\"tel:{{phone}}\" ng-show=\"phone.length>0\"><i class=\"fa fa-phone\"></i> {{phone}}</a></h5>\n" +
    "				<h5 ng-show=\"member.fax\">\n" +
    "					<a ng-repeat=\"fax in member.fax.split(',')\" style=\"color:grey;padding:5px\" href=\"https://www.fax2dc.com\" ng-show=\"phone.length>0\"><i class=\"fa fa-fax\"></i> {{fax}}</a>\n" +
    "				</h5>\n" +
    "				<a ng-show=\"member.socialAccounts.facebook.profileUrl\" href=\"{{member.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><span class=\"grey facebook-icon\"><i class=\"fa fa-facebook\"></i> Facebook</span></a>\n" +
    "				<a ng-show=\"member.socialAccounts.twitter.profileUrl\" href=\"{{member.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><span class=\"grey twitter-icon\"><i class=\"fa fa-twitter\"></i> Twitter</span></a>\n" +
    "				<a ng-show=\"member.socialAccounts.google.profileUrl\" href=\"{{member.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><span class=\"grey google-icon\"><i class=\"fa fa-google\"></i> Google</span></a>\n" +
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
    "		<div ui-view=\"memberEdit\"></div>\n" +
    "		<div ui-view=\"memberRepresentatives\"></div>\n" +
    "		<div ui-view=\"memberVotes\"></div>\n" +
    "	</div>\n" +
    "	<div class=\"spacing-25\"></div>	\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>");
}]);

angular.module("member/templates/activity.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/templates/activity.tpl.html",
    "<div class=\"container\">\n" +
    "\n" +
    "\n" +
    "    <!--<p>send as a fax? - send as mail (verified), send email (always) - send video??</p>-->\n" +
    "	<div ng-show=\"!currentUser\" class=\"profilePost\">\n" +
    "		<form role=\"form\">\n" +
    "			<md-input-container class=\"md-block\">\n" +
    "	        	<textarea ng-model=\"newPost.post\" placeholder=\"what's up?\" rows=\"5\" md-select-on-focus aria-label=\"new post\"></textarea>\n" +
    "			</md-input-container>\n" +
    "			<button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "		</form>\n" +
    "	</div>\n" +
    "\n" +
    "    <md-card ng-show=\"currentUser\">\n" +
    "        <div class=\"card-container\">\n" +
    "            <div class=\"post-controller-container\">\n" +
    "                <a href=\"/member/{{user.username}}\">\n" +
    "                    <img class=\"post-img\" ng-src=\"{{user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{user.username}}\">\n" +
    "                    <h4 class=\"post-name\">{{user.username}}</h4>\n" +
    "                </a>\n" +
    "            </div>\n" +
    "            <div style=\"margin-left:61px;\">\n" +
    "                <form role=\"form\">\n" +
    "                    <md-input-container class=\"md-block\">\n" +
    "                        <textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"what's happening\"></textarea>\n" +
    "                    </md-input-container>\n" +
    "                    <div ng-show=\"false\">\n" +
    "                        <button ng-click=\"\" type=\"submit\" class=\"btn btn-default\"><i class=\"fa fa-envelope\"></i> email</button>\n" +
    "                        <button ng-click=\"\" type=\"submit\" class=\"btn btn-default\"><i class=\"fa fa-fax\"></i> fax</button>\n" +
    "                        <!--need to be verified to send a physical letter-->\n" +
    "                        <button ng-click=\"\" type=\"submit\" class=\"btn btn-default\"><i class=\"fa fa-picture-o\"></i> letter</button>\n" +
    "                    </div>\n" +
    "                    <button ng-click=\"\" type=\"submit\" class=\"btn btn-default pull-right\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </md-card>\n" +
    "\n" +
    "\n" +
    "	<div class=\"spacing-25\"></div>\n" +
    "	<!--gotta make this unified with universally styled cards-->\n" +
    "\n" +
    "\n" +
    "    <md-card ng-repeat=\"result in results\">\n" +
    "\n" +
    "        <div ng-show=\"result.model=='vote'\" class=\"card-container\">\n" +
    "            <div>\n" +
    "                <a href=\"/member/{{result.user.username}}\">\n" +
    "                    <img class=\"post-img\" ng-src=\"{{result.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{result.user.username}}\">\n" +
    "                    <h4 class=\"post-name\">{{result.user.username}}</h4>\n" +
    "                </a>\n" +
    "                <div class=\"pull-right\">\n" +
    "                    <span class=\"grey\" am-time-ago=\"result.updatedAt\"></span>\n" +
    "                    <div style=\"display:inline\" uib-dropdown is-open=\"status.isopen\">\n" +
    "                        <a uib-dropdown-toggle ng-disabled=\"disabled\" href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a> \n" +
    "                        <ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "                            <li role=\"menuitem\"><a href=\"#\">Share</a></li>\n" +
    "                            <li role=\"menuitem\"><a href=\"#\">Delete</a></li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"post-container\">\n" +
    "                <h4>{{result.voteString}}<span ng-show=\"member.constituentCount>0\"> for <a href=\"member/{{member.username}}/constituents\">{{member.constituentCount}} constituent<span ng-show=\"member.constituentCount!=1\">s</span></a></span></h4>\n" +
    "                <div class=\"clearfix\"></div>\n" +
    "                <a href=\"/vote/{{result.vote.id}}\"><h4>{{result.vote.title}}</h4></a>\n" +
    "                <div class=\"spacing-10\"></div>\n" +
    "                <a href=\"/bill/{{result.bill.id}}/{{result.bill.title}}\">{{result.bill.title}}</a>\n" +
    "                <div class=\"spacing-10\"></div>\n" +
    "                <button ng-class=\"{'upVoted': result.voteString=='Yes' || result.voteString=='Yea'}\" class=\"btn btn-default upVote col-xs-6\" ng-click=\"createVote(1, vote)\"><i class=\"fa fa-angle-up\"></i>  {{result.vote.plusCount}}</button>\n" +
    "                <button ng-class=\"{'downVoted': result.voteString=='No' || result.voteString=='Nay'}\" class=\"btn btn-default downVote col-xs-6\" ng-click=\"createVote(-1, vote)\"><i class=\"fa fa-angle-down\"></i>  {{result.vote.minusCount}}</button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"spacing-15\"></div>\n" +
    "            <div class=\"post-action-container\">\n" +
    "                <div class=\"pull-left\">\n" +
    "                    <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "                    <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "                    <a href=\"#\" class=\"grey\" ng-click=\"reply(result)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "                </div>\n" +
    "                <div class=\"pull-right\">\n" +
    "                    <a href=\"votevote/{{result.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div style=\"margin-left:61px;\" ng-show=\"vote.showReply\">\n" +
    "                <form role=\"form\">\n" +
    "                    <md-input-container class=\"md-block\">\n" +
    "                        <textarea ng-model=\"result.newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"\"></textarea>\n" +
    "                    </md-input-container>\n" +
    "                    <button ng-click=\"createPost(result)\" type=\"submit\" class=\"btn btn-default\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-show=\"result.model=='post'\" class=\"card-container\">\n" +
    "\n" +
    "            <div>\n" +
    "                <a href=\"/member/{{result.user.username}}\">\n" +
    "                    <img class=\"post-img\" ng-src=\"{{result.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{result.user.username}}\">\n" +
    "                    <h4 class=\"post-name\">{{result.user.username}}</h4>\n" +
    "                </a>\n" +
    "                <div class=\"pull-right\">\n" +
    "                    <span class=\"grey\" am-time-ago=\"result.updatedAt\"></span>\n" +
    "                    <div style=\"display:inline\" uib-dropdown is-open=\"status.isopen\">\n" +
    "                        <a uib-dropdown-toggle ng-disabled=\"disabled\" href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a> \n" +
    "                        <ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "                            <li role=\"menuitem\"><a href=\"#\">Share</a></li>\n" +
    "                            <li role=\"menuitem\"><a href=\"#\">Delete</a></li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"post-container\">\n" +
    "                <div ng-show=\"result.profile.id != result.user.id && result.profile.id != member.id\">\n" +
    "                    <a ng-show=\"result.bill\" href=\"bill/{{result.bill.id}}/1\"><h4>{{result.bill.title}}</h4></a>\n" +
    "                    <a ng-show=\"result.committee\" href=\"committee/{{result.committee.urlTitle}}\"><h4>{{result.committee.title}}</h4></a>\n" +
    "                    <a ng-show=\"result.profile.id != member.id\" href=\"member/{{result.profile.username}}\"><h4>{{result.profile.username}}</h4></a>\n" +
    "                    <a ng-show=\"result.vote\" href=\"vote/{{result.vote.id}}\"><h4>{{result.vote.title}}</h4></a>\n" +
    "                </div>\n" +
    "                <p>{{result.post}}</p>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"post-action-container\">\n" +
    "                <div class=\"pull-left\">\n" +
    "                    <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "                    <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "                    <a href=\"#\" class=\"grey\" ng-click=\"reply(result)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "                </div>\n" +
    "                <div class=\"pull-right\">\n" +
    "                    <a href=\"post/{{result.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div style=\"margin-left:61px;\" ng-show=\"result.showReply\">\n" +
    "                <form role=\"form\">\n" +
    "                    <md-input-container class=\"md-block\">\n" +
    "                        <textarea ng-model=\"result.newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"\"></textarea>\n" +
    "                    </md-input-container>\n" +
    "                    <button ng-click=\"createPost(result)\" type=\"submit\" class=\"btn btn-default\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </md-card>\n" +
    "\n" +
    "\n" +
    "	<div class=\"spacing-10\"></div>\n" +
    "    <button ng-show=\"newResults.length != 0 && results.length > 25\" ng-click=\"loadMore()\" class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-angle-down\"></i></button>\n" +
    "</div>");
}]);

angular.module("member/templates/bills.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/templates/bills.tpl.html",
    "<div class=\"container\">\n" +
    "	<h3 ng-show=\"bills.length == 0\">{{member.username}} has not submitted any bills</h3>\n" +
    "    <md-card ng-repeat=\"bill in bills\">\n" +
    "    	{{bill.title}}\n" +
    "    </md-card>\n" +
    "    <div class=\"spacing-10\"></div>\n" +
    "	<button ng-show=\"bills.length != billCount\" ng-click=\"loadMore()\" class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-angle-down\"></i></button>\n" +
    "</div>");
}]);

angular.module("member/templates/committees.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/templates/committees.tpl.html",
    "<div class=\"container\">\n" +
    "    <h3 ng-show=\"committees.length == 0\">nothing to see here!</h3>\n" +
    "    <md-card ng-repeat=\"committee in committees\">\n" +
    "        <md-card-title>\n" +
    "            <md-card-title-text>\n" +
    "                <a href=\"/committee/{{committee.committee.urlTitle}}/\"><h3>{{committee.committee.title}}</h3></a>\n" +
    "                <h5>{{committee.title}}</h5>\n" +
    "            </md-card-title-text>\n" +
    "        <md-card-title>\n" +
    "    </md-card>\n" +
    "    <div class=\"spacing-10\"></div>\n" +
    "	<button ng-show=\"committees.length != committeeCount\" ng-click=\"loadMore()\" class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-angle-down\"></i></button>\n" +
    "</div>");
}]);

angular.module("member/templates/constituents.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/templates/constituents.tpl.html",
    "<div class=\"container\">\n" +
    "	<h3 ng-show=\"constituents.length == 0\">{{member.username}} does not yet have any constituents</h3>\n" +
    "	<div class=\"col-lg-4 col-sm-6\" ng-repeat=\"constituent in constituents\">\n" +
    "		<div style=\"margin:10px; box-shadow: 2px 2px 10px #999;overflow:hidden\">\n" +
    "			<div class=\"image\" style=\"background-image: url('{{constituent.constituent.coverUrl}}')\">\n" +
    "				<img alt=\"\" ng-src=\"{{constituent.constituent.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "			</div>\n" +
    "			<div class=\"info\">\n" +
    "				<h4 class=\"name\"><a href=\"member/{{constituent.constituent.username}}\">{{constituent.constituent.username}}</a></h4>\n" +
    "				<h5 class=\"position\"><a href=\"member/{{constituent.constituent.username}}\">{{constituent.constituent.title}}</a></h5>\n" +
    "				<p>{{constituent.constituent.state}}</p>\n" +
    "			</div>\n" +
    "			<div class=\"social\">\n" +
    "				<a ng-show=\"constituent.constituent.socialAccounts.facebook.profileUrl\" href=\"{{constituent.constituent.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "				<a ng-show=\"constituent.constituent.socialAccounts.twitter.profileUrl\" href=\"{{constituent.constituent.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "				<a ng-show=\"constituent.constituent.socialAccounts.google.profileUrl\" href=\"{{constituent.constituent.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"spacing-10\"></div>\n" +
    "	<button ng-show=\"constituents.length != constituentCount\" ng-click=\"loadMore()\" class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-angle-down\"></i></button>\n" +
    "</div>");
}]);

angular.module("member/templates/edit.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/templates/edit.tpl.html",
    "<div class=\"container\">\n" +
    "		\n" +
    "	<form name=\"acountForm\" id=\"accountForm\" ng-submit=\"accountSave()\" >\n" +
    "		<div layout=\"column\" layout-align=\"center stretch\">\n" +
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
    "		<button type=\"submit\" class=\"btn btn-default\">Save</button>\n" +
    "	</form>\n" +
    "\n" +
    "	<div class=\"spacing-25\"></div>	\n" +
    "\n" +
    "	<h3>Verification</h3>\n" +
    "	<md-divider></md-divider>\n" +
    "\n" +
    "	<h4>1. Full Name</h4>\n" +
    "	<div>\n" +
    "		<md-input-container>\n" +
    "			<label class=\"modal-label\">First Name</label>\n" +
    "			<input ng-model=\"user.firstName\" required name=\"firstName\" type=\"text\">\n" +
    "		</md-input-container>\n" +
    "		<md-input-container>\n" +
    "			<label class=\"modal-label\">Last Name</label>\n" +
    "			<input ng-model=\"user.lastName\" required name=\"lastName\" type=\"text\">\n" +
    "		</md-input-container>\n" +
    "	</div>\n" +
    "\n" +
    "	<h4>2. Social Media Accounts</h4>\n" +
    "	<div>\n" +
    "		<a ng-show=\"facebookPassport\" href=\"{{user.socialAccounts.facebook.profileUrl}}\">\n" +
    "			<img style=\"height:64px;\" src=\"{{user.socialAccounts.facebook.profilePic}}\">\n" +
    "			<span>{{user.socialAccounts.facebook.displayName}}</span>\n" +
    "		</a>\n" +
    "		<a ng-show=\"!facebookPassport\" class=\"btn btn-default\" href=\"/auth/facebook\">connect facebook</a>\n" +
    "		<a ng-show=\"facebookPassport\" class=\"btn btn-default\" ng-click=\"removePassport('facebook')\">disconnect facebook</a>\n" +
    "\n" +
    "		<br><br>\n" +
    "		<a ng-show=\"twitterPassport\" href=\"{{user.socialAccounts.twitter.profileUrl}}\">\n" +
    "			<img style=\"height:64px;\" src=\"{{user.socialAccounts.twitter.profilePic}}\">\n" +
    "			<span>{{user.socialAccounts.twitter.handle}}</span>\n" +
    "		</a>\n" +
    "		<a ng-show=\"!twitterPassport\" class=\"btn btn-default\" href=\"/auth/twitter\">connect twitter</a>\n" +
    "		<a ng-show=\"twitterPassport\" class=\"btn btn-default\" ng-click=\"removePassport('twitter')\">disconnect twitter</a>\n" +
    "\n" +
    "		<br><br>\n" +
    "		<a ng-show=\"googlePassport\" href=\"{{user.socialAccounts.google.profileUrl}}\">\n" +
    "			<img style=\"height:64px;\" src=\"{{user.socialAccounts.google.profilePic}}\">\n" +
    "			<span>{{user.socialAccounts.google.displayName}}</span>\n" +
    "		</a>\n" +
    "		<a ng-show=\"!googlePassport\" class=\"btn btn-default\" href=\"/auth/google\">connect google</a>\n" +
    "		<a ng-show=\"googlePassport\" class=\"btn btn-default\" ng-click=\"removePassport('google')\">disconnect google</a>\n" +
    "	</div>\n" +
    "	<br><br>\n" +
    "\n" +
    "	<h4>3. Address</h4>\n" +
    "	<div>\n" +
    "		<md-input-container class=\"md-block\">\n" +
    "			<input ng-model=\"user.address\" required name=\"address\" type=\"text\">\n" +
    "			<button type=\"submit\" class=\"btn btn-default\">Save</button>\n" +
    "		</md-input-container>\n" +
    "	</div>\n" +
    "	<br>\n" +
    "\n" +
    "	<h4>4. Identification</h4>\n" +
    "	<div>\n" +
    "		<p>by providing official identification, government officials have more of an incentive to respond and your voice carries more weight.</p>\n" +
    "		<div ngf-accept=\"'image/*'\" ngf-drop ngf-select=\"uploadIdentification($file)\" ng-model=\"file\" class=\"drop-box\" ngf-drag-over-class=\"dragover\" ngf-allow-dir=\"true\">\n" +
    "			<img ng-show=\"user.identificationUrl\" src=\"{{user.identificationUrl}}\">\n" +
    "		</div>\n" +
    "		<p ng-show=\"identificationLoading\" style=\"text-align:center\"><i class=\"fa fa-spin fa-spinner\"></i>&nbsp;{{pp}}%</p>\n" +
    "		<div ng-show=\"identificationLoading\" class=\"progress\">\n" +
    "			<div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{identificationPercentage}}%;\"></div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<!--\n" +
    "	<div class=\"spacing-25\"></div>	\n" +
    "\n" +
    "	<h3>Connected Accounts</h3>\n" +
    "	<md-divider></md-divider><br>\n" +
    "	<a href=\"{{user.socialAccounts.facebook.profileUrl}}\">\n" +
    "		<img style=\"height:64px;\" src=\"{{user.socialAccounts.facebook.profilePic}}\">\n" +
    "		<span>{{user.socialAccounts.facebook.displayName}}</span>\n" +
    "	</a>\n" +
    "	<a ng-show=\"!facebookPassport\" class=\"btn btn-default\" href=\"/auth/facebook\">connect facebook</a>\n" +
    "	<a ng-show=\"facebookPassport\" class=\"btn btn-default\" ng-click=\"removePassport('facebook')\">disconnect facebook</a>\n" +
    "\n" +
    "	<br><br>\n" +
    "	<a href=\"{{user.socialAccounts.twitter.profileUrl}}\">\n" +
    "		<img style=\"height:64px;\" src=\"{{user.socialAccounts.twitter.profilePic}}\">\n" +
    "		<span>{{user.socialAccounts.twitter.handle}}</span>\n" +
    "	</a>\n" +
    "	<a ng-show=\"!twitterPassport\" class=\"btn btn-default\" href=\"/auth/twitter\">connect twitter</a>\n" +
    "	<a ng-show=\"twitterPassport\" class=\"btn btn-default\" ng-click=\"removePassport('twitter')\">disconnect twitter</a>\n" +
    "\n" +
    "	<br><br>\n" +
    "	<a href=\"{{user.socialAccounts.google.profileUrl}}\">\n" +
    "		<img style=\"height:64px;\" src=\"{{user.socialAccounts.google.profilePic}}\">\n" +
    "		<span>{{user.socialAccounts.google.displayName}}</span>\n" +
    "	</a>\n" +
    "	<a ng-show=\"!googlePassport\" class=\"btn btn-default\" href=\"/auth/google\">connect google</a>\n" +
    "	<a ng-show=\"googlePassport\" class=\"btn btn-default\" ng-click=\"removePassport('google')\">disconnect google</a>\n" +
    "	-->\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("member/templates/representatives.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/templates/representatives.tpl.html",
    "<div class=\"container\">\n" +
    "	<h3 ng-show=\"representatives.length == 0\">{{member.username}} is not currently represented</h3>\n" +
    "	<div class=\"col-lg-4 col-sm-6\" ng-repeat=\"representative in representatives\">\n" +
    "		<div style=\"margin:10px; box-shadow: 2px 2px 10px #999;overflow:hidden\">\n" +
    "			<div class=\"image\" style=\"background-image: url('{{representative.representative.coverUrl}}')\">\n" +
    "				<img alt=\"\" ng-src=\"{{representative.representative.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "			</div>\n" +
    "			<div class=\"info\">\n" +
    "				<h4 class=\"name\"><a href=\"member/{{representative.representative.username}}\">{{representative.representative.username}}</a></h4>\n" +
    "				<h5 class=\"position\"><a href=\"member/{{representative.representative.username}}\">{{representative.representative.title}}</a></h5>\n" +
    "				<p>{{representative.representative.state}}</p>\n" +
    "			</div>\n" +
    "			<div class=\"social\">\n" +
    "				<a ng-show=\"representative.representative.socialAccounts.facebook.profileUrl\" href=\"{{representative.representative.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "				<a ng-show=\"representative.representative.socialAccounts.twitter.profileUrl\" href=\"{{representative.representative.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "				<a ng-show=\"representative.representative.socialAccounts.google.profileUrl\" href=\"{{representative.representative.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google\"></i></a>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"spacing-10\"></div>\n" +
    "	<button ng-show=\"representatives.length != representativeCount\" ng-click=\"loadMore()\" class=\"btn btn-default col-xs-10 col-xs-offset-1\">MORE <i class=\"fa fa-angle-down\"></i></button>\n" +
    "</div>");
}]);

angular.module("member/templates/votes.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("member/templates/votes.tpl.html",
    "<div class=\"container\">\n" +
    "    <h3 ng-show=\"votes.length == 0\">{{member.username}} has not yet voted</h3>\n" +
    "    <md-card ng-repeat=\"vote in votes\">\n" +
    "\n" +
    "    	<div class=\"card-container\">\n" +
    "    		<!--account for users moving their votes- associated VoteVoteUser Model... hm-->\n" +
    "    		<!--prob should be users that diverge??-->\n" +
    "    		<!--one vote, 500k VoteVoteUser entries = bleh-->\n" +
    "    		<div class=\"pull-left\"><h4>{{vote.voteString}}<span ng-show=\"member.constituentCount>0\"> for <a href=\"member/{{member.username}}/constituents\">{{member.constituentCount}} constituent<span ng-show=\"member.constituentCount!=1\">s</span></a></span></h4></div>\n" +
    "    		<div class=\"pull-right\">\n" +
    "                <span style=\"color:grey\" am-time-ago=\"vote.updatedAt\"></span>\n" +
    "                <a href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a> \n" +
    "            </div>\n" +
    "			<div class=\"clearfix\"></div>\n" +
    "    		<a href=\"/vote/{{vote.vote.id}}\"><h4>{{vote.vote.title}}</h4></a>\n" +
    "			<div class=\"spacing-10\"></div>\n" +
    "			<a href=\"/bill/{{result.bill.id}}/{{result.bill.title}}\">{{vote.bill.title}}</a>\n" +
    "			<div class=\"spacing-10\"></div>\n" +
    "            <button ng-class=\"{'upVoted': vote.voteString=='Yes' || vote.voteString=='Yea'}\" class=\"btn btn-default upVote col-xs-6\" ng-click=\"createVote(1, vote)\"><i class=\"fa fa-angle-up\"></i>  {{vote.vote.plusCount}}</button>\n" +
    "            <button ng-class=\"{'downVoted': vote.voteString=='No' || vote.voteString=='Nay'}\" class=\"btn btn-default downVote col-xs-6\" ng-click=\"createVote(-1, vote)\"><i class=\"fa fa-angle-down\"></i>  {{vote.vote.minusCount}}</button>\n" +
    "    	</div>\n" +
    "\n" +
    "	</md-card>\n" +
    "</div>\n" +
    "<div class=\"spacing-25\"></div>\n" +
    "<div ng-show=\"votes.length != voteCount\" >\n" +
    "	<md-divider></md-divider>\n" +
    "	<div class=\"spacing-25\"></div>\n" +
    "	<div ng-click=\"loadMore()\" class=\"container\" style=\"text-align:center\">\n" +
    "	    <button style=\"width:100%\" class=\"btn btn-default\">MORE <i class=\"fa fa-angle-down\"></i></button>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("members/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("members/index.tpl.html",
    "<div class=\"imageContainerSmall\">\n" +
    "	<video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\" playsinline></video>\n" +
    "	<div class=\"imageContainerSmallDiv container\">  \n" +
    "		<h1 style=\"text-align:left\">members</h1>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<md-list class=\"container\">\n" +
    "    <div class=\"spacing-10\"></div>\n" +
    "	<div class=\"dropdown sort-dropdown noselect\">\n" +
    "		<a class=\"dropdown-toggle noselect\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "            <h4 class=\"noselect\">{{sortText[sort]}}<span class=\"caret\"></span></h4>\n" +
    "		</a>\n" +
    "		<ul class=\"dropdown-menu\">\n" +
    "			<li><a class=\"sort-a\" ng-click=\"selectSort('trendingScore DESC')\"><h5>Trending</h5></a></li>\n" +
    "			<hr class=\"sort-hr\">\n" +
    "			<li><a class=\"sort-a\" ng-click=\"selectSort('createdAt DESC')\"><h5>Most Recent</h5></a></li>\n" +
    "			<hr class=\"sort-hr\">\n" +
    "			<li><a class=\"sort-a\" ng-click=\"selectSort('voteCount DESC')\"><h5>Most Votes</h5></a></li>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "	<div class=\"spacing-10\"></div>\n" +
    "\n" +
    "    <!--<md-card>\n" +
    "		<md-card-title>\n" +
    "			<input style=\"width:100%\" ng-keyup=\"keyPress(searchValue)\" ng-model=\"searchValue\">\n" +
    "		</md-card-title>\n" +
    "	</md-card>-->\n" +
    "\n" +
    "	<button ng-click=\"getLatLng()\" class=\"btn btn-default\">find representatives</button>\n" +
    "	<div class=\"spacing-10\"></div>\n" +
    "    <div class=\"col-lg-4 col-sm-6\" ng-repeat=\"user in officialRepresentatives\">\n" +
    "        <div class=\"member-card\">\n" +
    "            <div class=\"image\" style=\"background-image: url('{{user.coverUrl}}')\">\n" +
    "                <a href=\"member/{{user.username}}\"><img ng-src=\"{{user.avatarUrl}}\" err-src=\"/images/avatar.png\"></a>\n" +
    "            </div>\n" +
    "            <div class=\"info\">\n" +
    "                <h4 class=\"name\"><a href=\"member/{{user.username}}\">{{user.username}}</a></h4>\n" +
    "                <h5 class=\"position\">{{user.title || 'voetr member'}}</h5>\n" +
    "                <p>{{user.state}}</p>\n" +
    "            </div>\n" +
    "            <div class=\"social\">\n" +
    "                <a ng-show=\"user.socialAccounts.facebook.profileUrl\" href=\"{{user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook facebook-icon\"></i></a>\n" +
    "                <a ng-show=\"user.socialAccounts.twitter.profileUrl\" href=\"{{user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter twitter-icon\"></i></a>\n" +
    "                <a ng-show=\"user.socialAccounts.google.profileUrl\" href=\"{{user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google google-icon\"></i></a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "	<div class=\"col-lg-4 col-sm-6\" ng-repeat=\"user in users\">\n" +
    "        <div class=\"member-card\">\n" +
    "            <div class=\"image\" style=\"background-image: url('{{user.coverUrl}}')\">\n" +
    "                <a href=\"member/{{user.username}}\"><img ng-src=\"{{user.avatarUrl}}\" err-src=\"/images/avatar.png\"></a>\n" +
    "            </div>\n" +
    "            <div class=\"info\">\n" +
    "                <h4 class=\"name\"><a href=\"member/{{user.username}}\">{{user.username}}</a></h4>\n" +
    "                <h5 class=\"position\">{{user.title}}</h5>\n" +
    "                <p>{{user.state}}</p>\n" +
    "                <a href=\"member/{{user.username}}/constituents\"><p>{{user.constituentCount}} constituents</p></a>\n" +
    "            </div>\n" +
    "            <div class=\"social\">\n" +
    "                <a ng-show=\"user.socialAccounts.facebook.profileUrl\" href=\"{{user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook facebook-icon\"></i></a>\n" +
    "                <a ng-show=\"user.socialAccounts.twitter.profileUrl\" href=\"{{user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter twitter-icon\"></i></a>\n" +
    "                <a ng-show=\"user.socialAccounts.google.profileUrl\" href=\"{{user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google google-icon\"></i></a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</md-list>\n" +
    "<div class=\"spacing-25\"></div>\n" +
    "<md-divider></md-divider>\n" +
    "<div class=\"spacing-25\"></div>\n" +
    "<div ng-click=\"loadMore()\" class=\"container\" style=\"text-align:center\">\n" +
    "    <button style=\"width:100%\" class=\"btn btn-default\">MORE <i class=\"fa fa-angle-down\"></i></button>\n" +
    "</div>\n" +
    "<div class=\"spacing-25\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>");
}]);

angular.module("nav/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("nav/index.tpl.html",
    "<style>\n" +
    "    .nav{font-family: sans-serif;font-size:18px;}\n" +
    "    .navbar-brand{font-family: sans-serif;font-size:18px;}\n" +
    "    .navbar-inverse{background-color:rgba(255,255,255,1);border-color:#e1e1e1;}\n" +
    "    .navbar-inverse .navbar-nav > li >a, .navbar-inverse .navbar-text{color:#424242}\n" +
    "    .navbar-inverse .navbar-nav > li > a:focus{color:#424242}\n" +
    "    .navbar-inverse .navbar-brand{color:#424242}\n" +
    "    .navbar-inverse .navbar-brand:focus{color:#424242}\n" +
    "    .navbar-inverse .navbar-toggle {border-color: white;}\n" +
    "    .navbar-inverse .navbar-toggle .icon-bar{background-color:#424242;}\n" +
    "    .navbar-inverse .navbar-toggle:hover .icon-bar{background-color:#fff;}\n" +
    "    .navbar-inverse .navbar-nav > .open > a, .navbar-inverse .navbar-nav>.open>a:focus, .navbar-inverse .navbar-nav>.open>a:hover {color:#717171; background-color:#e1e1e1;}\n" +
    "    md-progress-linear .md-container {background-color: #e1e1e1!important;}\n" +
    "    .container > .navbar-header, .container-fluid > .navbar-header, .container > .navbar-collapse, .container-fluid > .navbar-collapse{margin-right:0px!important;margin-left:0px!important}\n" +
    "</style>\n" +
    "<div ng-controller=\"NavCtrl\" class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\" style=\"margin-right:0px;padding:9px 15px\">\n" +
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
    "                    <div class=\"form-group\" style=\"font-size:20px\">\n" +
    "                        <input ng-keyup=\"keyPress(searchValue)\" ng-model=\"searchValue\" id=\"search-link\" size=\"40\" type=\"text\" placeholder=\"\">\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </ul>\n" +
    "            <ul class=\"nav navbar-nav navbar-right\">\n" +
    "                <li class=\"dropdown\" ng-show=\"currentUser\">\n" +
    "                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "                        {{currentUser.username}} <span class=\"fa fa-angle-down\"></span>\n" +
    "                    </a>\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                        <li>\n" +
    "                            <a href=\"/member/{{currentUser.username}}\">\n" +
    "                                <img style=\"height:32px;width:32px;border-radius:3px\" src=\"{{currentUser.avatarUrl}}\"/> {{currentUser.username}}\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li><a href=\"/account\">account</a></li>\n" +
    "                        <li><a href=\"#\">0 notifications</a></li>\n" +
    "                        <li><a href=\"#\">settings</a></li>\n" +
    "\n" +
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

angular.module("post/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("post/index.tpl.html",
    "<div class=\"container\">\n" +
    "    <md-card style=\"margin-top:5%;margin-bottom:5%\">\n" +
    "        <div class=\"card-container\">\n" +
    "\n" +
    "            <div class=\"post-controller-container\">\n" +
    "                <a href=\"/member/{{post.user.username}}\">\n" +
    "                    <img class=\"post-img\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "                    <h4 class=\"post-name\">{{post.user.username}}</h4>\n" +
    "                </a>\n" +
    "                <div class=\"pull-right\">\n" +
    "                    <span class=\"grey\" am-time-ago=\"post.updatedAt\"></span>\n" +
    "                    <!--<div style=\"display:inline\" uib-dropdown is-open=\"status.isopen\">\n" +
    "                        <a uib-dropdown-toggle ng-disabled=\"disabled\" href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a> \n" +
    "                        <ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "                            <li role=\"menuitem\"><a href=\"#\">Share</a></li>\n" +
    "                            <li role=\"menuitem\"><a href=\"#\">Delete</a></li>\n" +
    "                        </ul>\n" +
    "                    </div>-->\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"post-container\">\n" +
    "                <div ng-show=\"post.profile.id != post.user.id\">\n" +
    "                    <div class=\"spacing-5\"></div>\n" +
    "                    <a ng-show=\"post.bill\" href=\"bill/{{post.bill.id}}/1\"><h4>{{post.bill.title}}</h4></a>\n" +
    "                    <a ng-show=\"post.committee\" href=\"committee/{{post.committee.urlTitle}}\"><h4>{{post.committee.title}}</h4></a>\n" +
    "                    <a ng-show=\"post.profile\" href=\"member/{{post.profile.username}}\"><h4>{{post.profile.username}}</h4></a>\n" +
    "                    <a ng-show=\"post.vote\" href=\"vote/{{post.vote.id}}\"><h4>{{post.vote.title}}</h4></a>\n" +
    "                    <div class=\"spacing-5\"></div>\n" +
    "                </div>\n" +
    "                <p>{{post.post}}</p>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"post-action-container\">\n" +
    "                <div class=\"pull-left\">\n" +
    "                    <a href=\"#\" ng-click=\"createReaction(post, 'like')\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> {{post.plusCount}} like </a> \n" +
    "                    <a href=\"#\" ng-click=\"createReaction(post, 'dislike')\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> {{post.minusCount}} dislike </a> \n" +
    "                    <a href=\"#\" class=\"grey\" ng-click=\"reply(post)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "                </div>\n" +
    "                <div class=\"pull-right\">\n" +
    "                    <a href=\"post/{{post.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div style=\"margin-left:61px;\" ng-hide=\"post.showReply\">\n" +
    "                <form role=\"form\">\n" +
    "                    <md-input-container class=\"md-block\">\n" +
    "                        <textarea ng-model=\"post.newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"\"></textarea>\n" +
    "                    </md-input-container>\n" +
    "                    <button ng-click=\"createPost(post)\" type=\"submit\" class=\"btn btn-default\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--\n" +
    "            <md-card>\n" +
    "            <div style=\"margin-left:61px;\" ng-hide=\"post.showReply\">\n" +
    "                <a href=\"/member/{{post.user.username}}\">\n" +
    "                    <img class=\"post-img\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "                    <h4 class=\"post-name\">{{post.user.username}}</h4>\n" +
    "                </a>\n" +
    "                <textarea ng-model=\"post.newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"write a comment...\"></textarea>\n" +
    "                <button ng-click=\"createPost(post)\" type=\"submit\" class=\"btn btn-default\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "            </div>\n" +
    "            </md-card>\n" +
    "            -->\n" +
    "\n" +
    "\n" +
    "            <md-card ng-repeat=\"post in postChildren\">\n" +
    "\n" +
    "                <div class=\"card-container\">\n" +
    "\n" +
    "                    <div class=\"post-controller-container\">\n" +
    "                        <a href=\"/member/{{post.user.username}}\">\n" +
    "                            <img class=\"post-img\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "                            <h4 class=\"post-name\">{{post.user.username}}</h4>\n" +
    "                        </a>\n" +
    "                        <div class=\"pull-right\">\n" +
    "                            <span class=\"grey\" am-time-ago=\"post.updatedAt\"></span>\n" +
    "                            <a href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"post-container\">\n" +
    "                        <div ng-show=\"post.profile.id != post.user.id\">\n" +
    "                            <div class=\"spacing-5\"></div>\n" +
    "                            <a ng-show=\"post.bill\" href=\"bill/{{post.bill.id}}/1\"><h4>{{post.bill.title}}</h4></a>\n" +
    "                            <a ng-show=\"post.committee\" href=\"committee/{{post.committee.urlTitle}}\"><h4>{{post.committee.title}}</h4></a>\n" +
    "                            <a ng-show=\"post.profile\" href=\"member/{{post.profile.username}}\"><h4>{{post.profile.username}}</h4></a>\n" +
    "                            <a ng-show=\"post.vote\" href=\"vote/{{post.vote.id}}\"><h4>{{post.vote.title}}</h4></a>\n" +
    "                            <div class=\"spacing-5\"></div>\n" +
    "                        </div>\n" +
    "                        <p>{{post.post}}</p>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"post-action-container\">\n" +
    "                        <div class=\"pull-left\">\n" +
    "                            <a href=\"#\" ng-click=\"createReaction(post, 'like')\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "                            <a href=\"#\" ng-click=\"createReaction(post, 'dislike')\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "                            <a href=\"#\" class=\"grey\" ng-click=\"reply(post)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "                        </div>\n" +
    "                        <div class=\"pull-right\">\n" +
    "                            <a href=\"post/{{post.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "\n" +
    "                    <br><br>\n" +
    "                     <!--\n" +
    "                     <div style=\"margin-left:61px;\" ng-hide=\"post.showReply\">\n" +
    "                        <form role=\"form\">\n" +
    "                            <md-input-container class=\"md-block\">\n" +
    "                                <textarea ng-model=\"post.newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"\"></textarea>\n" +
    "                            </md-input-container>\n" +
    "                            <button ng-click=\"createPost(post)\" type=\"submit\" class=\"btn btn-default\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "                        </form>\n" +
    "                    </div>\n" +
    "                    -->\n" +
    "\n" +
    "\n" +
    "                    <!-- NEST THIS RECURSIVLY??-->\n" +
    "                    <!--<md-card ng-repeat=\"post in post.children\">\n" +
    "                        <div class=\"card-container\">\n" +
    "                            <div class=\"post-controller-container\">\n" +
    "                                <a href=\"/member/{{post.user.username}}\">\n" +
    "                                    <img class=\"post-img\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "                                    <h4 class=\"post-name\">{{post.user.username}}</h4>\n" +
    "                                </a>\n" +
    "                                <div class=\"pull-right\">\n" +
    "                                    <span class=\"grey\" am-time-ago=\"post.updatedAt\"></span>\n" +
    "                                    <a href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"post-container\">\n" +
    "                                <div ng-show=\"post.profile.id != post.user.id\">\n" +
    "                                    <div class=\"spacing-5\"></div>\n" +
    "                                    <a ng-show=\"post.bill\" href=\"bill/{{post.bill.id}}/1\"><h4>{{post.bill.title}}</h4></a>\n" +
    "                                    <a ng-show=\"post.committee\" href=\"committee/{{post.committee.urlTitle}}\"><h4>{{post.committee.title}}</h4></a>\n" +
    "                                    <a ng-show=\"post.profile\" href=\"member/{{post.profile.username}}\"><h4>{{post.profile.username}}</h4></a>\n" +
    "                                    <a ng-show=\"post.vote\" href=\"vote/{{post.vote.id}}\"><h4>{{post.vote.title}}</h4></a>\n" +
    "                                    <div class=\"spacing-5\"></div>\n" +
    "                                </div>\n" +
    "                                <p>{{post.post}}</p>\n" +
    "                            </div>\n" +
    "                            <div class=\"post-action-container\">\n" +
    "                                <div class=\"pull-left\">\n" +
    "                                    <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "                                    <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "                                    <a href=\"#\" class=\"grey\" ng-click=\"reply(post)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "                                </div>\n" +
    "                                <div class=\"pull-right\">\n" +
    "                                    <a href=\"post/{{post.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </md-card>-->\n" +
    "\n" +
    "                    <div ng-include=\"'post/post.tpl.html'\" ng-repeat=\"post in post.children\"></div>\n" +
    "\n" +
    "                </div>\n" +
    "            </md-card>\n" +
    "\n" +
    "        </div>\n" +
    "    </md-card>\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>");
}]);

angular.module("post/post.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("post/post.tpl.html",
    "<md-card>\n" +
    "    <div class=\"card-container\">\n" +
    "        <div class=\"post-controller-container\">\n" +
    "            <a href=\"/member/{{post.user.username}}\">\n" +
    "                <img class=\"post-img\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "                <h4 class=\"post-name\">{{post.user.username}}</h4>\n" +
    "            </a>\n" +
    "            <div class=\"pull-right\">\n" +
    "                <span class=\"grey\" am-time-ago=\"post.updatedAt\"></span>\n" +
    "                <a href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"post-container\">\n" +
    "            <div ng-show=\"post.profile.id != post.user.id\">\n" +
    "                <div class=\"spacing-5\"></div>\n" +
    "                <a ng-show=\"post.bill\" href=\"bill/{{post.bill.id}}/1\"><h4>{{post.bill.title}}</h4></a>\n" +
    "                <a ng-show=\"post.committee\" href=\"committee/{{post.committee.urlTitle}}\"><h4>{{post.committee.title}}</h4></a>\n" +
    "                <a ng-show=\"post.profile\" href=\"member/{{post.profile.username}}\"><h4>{{post.profile.username}}</h4></a>\n" +
    "                <a ng-show=\"post.vote\" href=\"vote/{{post.vote.id}}\"><h4>{{post.vote.title}}</h4></a>\n" +
    "                <div class=\"spacing-5\"></div>\n" +
    "            </div>\n" +
    "            <p>{{post.post}}</p>\n" +
    "        </div>\n" +
    "        <div class=\"post-action-container\">\n" +
    "            <div class=\"pull-left\">\n" +
    "                <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "                <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "                <a href=\"#\" class=\"grey\" ng-click=\"reply(post)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "            </div>\n" +
    "            <div class=\"pull-right\">\n" +
    "                <a href=\"post/{{post.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <br><br>\n" +
    "        <div ng-include=\"'post/post.tpl.html'\" ng-repeat=\"post in post.children\"></div>\n" +
    "    </div>\n" +
    "</md-card>\n" +
    "");
}]);

angular.module("register/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("register/index.tpl.html",
    "<div class=\"log-background\">\n" +
    "    <!--<div class=\"blkoverlay\"></div>-->\n" +
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
    "<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "\n" +
    "\n" +
    "<!--\n" +
    "<div class=\"row\" style=\"text-align:center;margin-top:20px\">\n" +
    "    <div class=\"col-xs-4\"><a style=\"width:100%;\" class=\"btn btn-block btn-social btn-facebook\" href=\"/auth/facebook\"><span class=\"fa fa-facebook\"></span> Facebook</a></div>\n" +
    "    <div class=\"col-xs-4\"><a style=\"width:100%;\" class=\"btn btn-block btn-social btn-twitter\" href=\"/auth/twitter\"><span class=\"fa fa-twitter\"></span> Twitter</a></div>\n" +
    "    <div class=\"col-xs-4\"><a style=\"width:100%\" class=\"btn btn-block btn-social btn-google\" href=\"/auth/google\"><span class=\"fa fa-google\"></span> Google</a></div>\n" +
    "</div>\n" +
    "-->");
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
    "\n" +
    "					<md-card ng-repeat=\"result in searchResults\">\n" +
    "\n" +
    "						<div ng-show=\"result.model=='vote'\" class=\"card-container\">\n" +
    "							<a href=\"/vote/{{result.id}}\"><h4 style=\"display: inline-block;position: relative\">{{result.title}}</h4></a>\n" +
    "							<div class=\"pull-right\">\n" +
    "								<span style=\"color:grey\" am-time-ago=\"result.updatedAt\"></span>\n" +
    "							</div>\n" +
    "\n" +
    "							<div class=\"spacing-10\"></div>\n" +
    "							<a href=\"/bill/{{result.bill.id}}/{{result.bill.title}}\">{{result.bill.title}}</a>\n" +
    "							<div class=\"spacing-10\"></div>\n" +
    "							<!--<button ng-class=\"{'upVoted': class=='upVote'}\" class=\"btn btn-default upVote col-sm-6\" ng-click=\"createVote(1, result)\">\n" +
    "								<i class=\"fa fa-caret-up vBlue\"></i> <b>{{result.plusCount}}</b>\n" +
    "							</button>\n" +
    "							<button ng-class=\"{'downVoted': class=='downVote'}\" class=\"btn btn-default downVote col-sm-6\" ng-click=\"createVote(-1, result)\">\n" +
    "								<i class=\"fa fa-caret-down red-color\"></i>  <b>{{result.minusCount}}</b>\n" +
    "							</button>-->\n" +
    "						</div>\n" +
    "\n" +
    "				        <div ng-show=\"result.model=='post'\" class=\"card-container\">\n" +
    "							<div class=\"post-controller-container\">\n" +
    "		                        <a href=\"/member/{{result.user.username}}\">\n" +
    "		                            <img class=\"post-img\" ng-src=\"{{result.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{result.user.username}}\">\n" +
    "		                            <h4 class=\"post-name\">{{result.user.username}}</h4>\n" +
    "		                        </a>\n" +
    "		                        <div class=\"pull-right\">\n" +
    "		                            <span style=\"color:grey\" am-time-ago=\"result.updatedAt\"></span>\n" +
    "		                            <div style=\"display:inline\" uib-dropdown is-open=\"status.isopen\">\n" +
    "		                                <a uib-dropdown-toggle ng-disabled=\"disabled\" href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a> \n" +
    "		                                <ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "		                                    <li role=\"menuitem\"><a href=\"#\">Share</a></li>\n" +
    "		                                    <li role=\"menuitem\"><a href=\"#\">Delete</a></li>\n" +
    "		                                </ul>\n" +
    "		                            </div>\n" +
    "		                        </div>\n" +
    "		                    </div>\n" +
    "\n" +
    "		                    <div class=\"post-container\">\n" +
    "		                        <div ng-show=\"result.profile.id != result.user.id\">\n" +
    "		                            <div class=\"spacing-5\"></div>\n" +
    "		                            <a ng-show=\"result.bill\" href=\"bill/{{result.bill.id}}/1\"><h4>{{result.bill.title}}</h4></a>\n" +
    "		                            <a ng-show=\"result.committee\" href=\"committee/{{result.committee.urlTitle}}\"><h4>{{result.committee.title}}</h4></a>\n" +
    "		                            <a ng-show=\"result.profile\" href=\"member/{{result.profile.username}}\"><h4>{{result.profile.username}}</h4></a>\n" +
    "		                            <a ng-show=\"result.vote\" href=\"vote/{{result.vote.id}}\"><h4>{{result.vote.title}}</h4></a>\n" +
    "		                            <div class=\"spacing-5\"></div>\n" +
    "		                        </div>\n" +
    "		                        <p>{{result.post}}</p>\n" +
    "		                    </div>\n" +
    "\n" +
    "		                    <div class=\"post-action-container\">\n" +
    "		                        <div class=\"pull-left\">\n" +
    "		                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "		                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "		                            <a href=\"#\" class=\"grey\" ng-click=\"reply(result)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "		                        </div>\n" +
    "		                        <div class=\"pull-right\">\n" +
    "		                            <a href=\"post/{{result.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "		                        </div>\n" +
    "		                    </div>\n" +
    "\n" +
    "						</div>\n" +
    "					</md-card>\n" +
    "\n" +
    "    			</uib-tab>\n" +
    "				<uib-tab heading=\"Results\" ng-show=\"searchResults\">\n" +
    "\n" +
    "\n" +
    "					<div ng-repeat=\"result in searchResults\">\n" +
    "						<md-card ng-show=\"result.model=='vote'\">\n" +
    "							<div class=\"card-container\">\n" +
    "								<a href=\"/vote/{{result.id}}\"><h4 style=\"display: inline-block;position: relative\">{{result.title}}</h4></a>\n" +
    "								<div class=\"pull-right\">\n" +
    "									<span style=\"color:grey\" am-time-ago=\"result.updatedAt\"></span>\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"spacing-10\"></div>\n" +
    "								<a href=\"/bill/{{result.bill.id}}/{{result.bill.title}}\">{{result.bill.title}}</a>\n" +
    "								<div class=\"spacing-10\"></div>\n" +
    "								<button ng-class=\"{'upVoted': class=='upVote'}\" class=\"btn btn-default upVote col-sm-6\" ng-click=\"createVote(1, result)\">\n" +
    "									<i class=\"fa fa-caret-up vBlue\"></i> <b>{{result.plusCount}}</b>\n" +
    "								</button>\n" +
    "								<button ng-class=\"{'downVoted': class=='downVote'}\" class=\"btn btn-default downVote col-sm-6\" ng-click=\"createVote(-1, result)\">\n" +
    "									<i class=\"fa fa-caret-down red-color\"></i>  <b>{{result.minusCount}}</b>\n" +
    "								</button>\n" +
    "							</div>\n" +
    "						</md-card>\n" +
    "\n" +
    "						<md-card ng-show=\"result.model=='post'\">\n" +
    "					        <div class=\"card-container\">\n" +
    "								<div class=\"post-controller-container\">\n" +
    "			                        <a href=\"/member/{{result.user.username}}\">\n" +
    "			                            <img class=\"post-img\" ng-src=\"{{result.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{result.user.username}}\">\n" +
    "			                            <h4 class=\"post-name\">{{result.user.username}}</h4>\n" +
    "			                        </a>\n" +
    "			                        <div class=\"pull-right\">\n" +
    "			                            <span style=\"color:grey\" am-time-ago=\"result.updatedAt\"></span>\n" +
    "			                            <div style=\"display:inline\" uib-dropdown is-open=\"status.isopen\">\n" +
    "			                                <a uib-dropdown-toggle ng-disabled=\"disabled\" href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a> \n" +
    "			                                <ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "			                                    <li role=\"menuitem\"><a href=\"#\">Share</a></li>\n" +
    "			                                    <li role=\"menuitem\"><a href=\"#\">Delete</a></li>\n" +
    "			                                </ul>\n" +
    "			                            </div>\n" +
    "			                        </div>\n" +
    "			                    </div>\n" +
    "\n" +
    "			                    <div class=\"post-container\">\n" +
    "			                        <div ng-show=\"result.profile.id != result.user.id\">\n" +
    "			                            <div class=\"spacing-5\"></div>\n" +
    "			                            <a ng-show=\"result.bill\" href=\"bill/{{result.bill.id}}/1\"><h4>{{result.bill.title}}</h4></a>\n" +
    "			                            <a ng-show=\"result.committee\" href=\"committee/{{result.committee.urlTitle}}\"><h4>{{result.committee.title}}</h4></a>\n" +
    "			                            <a ng-show=\"result.profile\" href=\"member/{{result.profile.username}}\"><h4>{{result.profile.username}}</h4></a>\n" +
    "			                            <a ng-show=\"result.vote\" href=\"vote/{{result.vote.id}}\"><h4>{{result.vote.title}}</h4></a>\n" +
    "			                            <div class=\"spacing-5\"></div>\n" +
    "			                        </div>\n" +
    "			                        <p>{{post.post}}</p>\n" +
    "			                    </div>\n" +
    "\n" +
    "			                    <div class=\"post-action-container\">\n" +
    "			                        <div class=\"pull-left\">\n" +
    "			                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "			                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "			                            <a href=\"#\" class=\"grey\" ng-click=\"reply(result)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "			                        </div>\n" +
    "			                        <div class=\"pull-right\">\n" +
    "			                            <a href=\"post/{{result.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "			                        </div>\n" +
    "			                    </div>\n" +
    "							</div>\n" +
    "						</md-card>\n" +
    "\n" +
    "						<md-card ng-show=\"result.model=='bill'\">\n" +
    "							<div class=\"card-container\">\n" +
    "				            	<h4><a href=\"/bill/{{bill._id}}/{{bill.title.replace(' ','-')}}\">{{result.title}}</a></h4>\n" +
    "\n" +
    "				            	<div class=\"post-action-container\">\n" +
    "			                        <div class=\"pull-left\">\n" +
    "			                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "			                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "			                            <a href=\"#\" class=\"grey\" ng-click=\"reply(result)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "			                        </div>\n" +
    "			                    </div>\n" +
    "\n" +
    "\n" +
    "								<!--<div class=\"spacing-10\"></div>\n" +
    "				            	<button ng-class=\"{'upVoted': vote.class=='upVote'}\" class=\"btn btn-default upVote col-sm-6\" ng-click=\"createVote(1, vote)\"><i class=\"fa fa-caret-up\"></i>  {{result.plusCount}}</button>\n" +
    "					            <button ng-class=\"{'downVoted': vote.class=='downVote'}\" class=\"btn btn-default downVote col-sm-6\" ng-click=\"createVote(-1, vote)\"><i class=\"fa fa-caret-down\"></i>  {{result.minusCount}}</button>-->\n" +
    "					        </div>\n" +
    "						</md-card>\n" +
    "\n" +
    "						<md-card ng-show=\"result.model=='committee'\">\n" +
    "							<div class=\"card-container\">\n" +
    "								<div class=\"card-container\">\n" +
    "					            	<h3><a href=\"/committee/{{result.urlTitle}}\">{{result.title}}</a></h3>\n" +
    "            						<p><span style=\"color:grey\">{{result.memberCount}} members</span></p>\n" +
    "						        </div>\n" +
    "					        </div>\n" +
    "						</md-card>\n" +
    "\n" +
    "					    <div ng-show=\"result.model=='user'\" class=\"col-lg-4 col-sm-6\">\n" +
    "							<div class=\"member-card\">\n" +
    "								<div class=\"image\" style=\"background-image: url('{{result.coverUrl}}')\">\n" +
    "									<img ng-src=\"{{result.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "								</div>\n" +
    "								<div class=\"info\">\n" +
    "									<h4 class=\"name\"><a href=\"member/{{result.username}}\">{{result.username}}</a></h4>\n" +
    "									<h5 class=\"position\"><a href=\"memberresultuser.username}}\">{{result.title}}</a></h5>\n" +
    "									<p>{{result.state}}</p>\n" +
    "								</div>\n" +
    "								<div class=\"social\">\n" +
    "									<a ng-show=\"result.socialAccounts.facebook.profileUrl\" href=\"{{result.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook facebook-icon\"></i></a>\n" +
    "									<a ng-show=\"result.socialAccounts.twitter.profileUrl\" href=\"{{result.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter twitter-icon\"></i></a>\n" +
    "									<a ng-show=\"result.socialAccounts.google.profileUrl\" href=\"{{result.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google google-icon\"></i></a>\n" +
    "								</div>\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "					\n" +
    "    			</uib-tab>\n" +
    "				<uib-tab heading=\"Bills\">\n" +
    "			    	<md-card ng-repeat=\"bill in bills\">\n" +
    "						<div class=\"card-container\">\n" +
    "			            	<h4><a href=\"/bill/{{bill.id}}/{{bill.title.replace(' ','-')}}\">{{bill.title}}</a></h4>\n" +
    "\n" +
    "							<div class=\"post-action-container\">\n" +
    "		                        <div class=\"pull-left\">\n" +
    "		                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "		                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "		                            <a href=\"#\" class=\"grey\" ng-click=\"reply(result)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "		                        </div>\n" +
    "		                    </div>\n" +
    "\n" +
    "							<!--<div class=\"spacing-10\"></div>\n" +
    "			            	<button ng-class=\"{'upVoted': vote.class=='upVote'}\" class=\"btn btn-default upVote col-sm-6\" ng-click=\"createVote(1, vote)\"><i class=\"fa fa-caret-up\"></i>  {{vote.plusCount}}</button>\n" +
    "				            <button ng-class=\"{'downVoted': vote.class=='downVote'}\" class=\"btn btn-default downVote col-sm-6\" ng-click=\"createVote(-1, vote)\"><i class=\"fa fa-caret-down\"></i>  {{vote.minusCount}}</button>-->\n" +
    "				        </div>\n" +
    "			        </md-card>\n" +
    "    			</uib-tab>\n" +
    "				<uib-tab heading=\"Committees\">\n" +
    "					<md-card ng-repeat=\"committee in committees\">\n" +
    "				        <div class=\"card-container\">\n" +
    "				            <h3><a href=\"/committee/{{committee.urlTitle}}\">{{committee.title}}</a></h3>\n" +
    "				            <p><span style=\"color:grey\">{{committee.memberCount}} members</span></p>\n" +
    "				        </div>\n" +
    "				    </md-card>\n" +
    "    			</uib-tab>\n" +
    "				<uib-tab heading=\"{{userCount}} Members\">\n" +
    "					<div class=\"spacing-5\"></div>\n" +
    "					<button ng-show=\"!gettingRepresentatives\" ng-click=\"getLatLng()\" class=\"btn btn-default\">find representatives</button><br><br>\n" +
    "			        <i ng-show=\"gettingRepresentatives\" style=\"font-size:48px\" class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>\n" +
    "					<div class=\"col-lg-4 col-sm-6\" ng-repeat=\"user in officialRepresentatives\">\n" +
    "						<div class=\"member-card\">\n" +
    "							<div class=\"image\" style=\"background-image: url('{{user.coverUrl}}')\">\n" +
    "								<img ng-src=\"{{user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "							</div>\n" +
    "							<div class=\"info\">\n" +
    "								<h4 class=\"name\"><a href=\"member/{{user.username}}\">{{user.username}}</a></h4>\n" +
    "								<h5 class=\"position\"><a href=\"member/{{user.username}}\">{{user.title}}</a></h5>\n" +
    "								<p>{{user.state}}</p>\n" +
    "							</div>\n" +
    "							<div class=\"social\">\n" +
    "								<a ng-show=\"user.socialAccounts.facebook.profileUrl\" href=\"{{user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook facebook-icon\"></i></a>\n" +
    "								<a ng-show=\"user.socialAccounts.twitter.profileUrl\" href=\"{{user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter twitter-icon\"></i></a>\n" +
    "								<a ng-show=\"user.socialAccounts.google.profileUrl\" href=\"{{user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google google-icon\"></i></a>\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"col-lg-4 col-sm-6\" ng-repeat=\"user in users\">\n" +
    "						<div class=\"member-card\">\n" +
    "							<div class=\"image\" style=\"background-image: url('{{user.coverUrl}}')\">\n" +
    "								<img ng-src=\"{{user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "							</div>\n" +
    "							<div class=\"info\">\n" +
    "								<h4 class=\"name\"><a href=\"member/{{user.username}}\">{{user.username}}</a></h4>\n" +
    "								<h5 class=\"position\"><a href=\"member/{{user.username}}\">{{user.title}}</a></h5>\n" +
    "								<p>{{user.state}}</p>\n" +
    "							</div>\n" +
    "							<div class=\"social\">\n" +
    "								<a ng-show=\"user.socialAccounts.facebook.profileUrl\" href=\"{{user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook facebook-icon\"></i></a>\n" +
    "								<a ng-show=\"user.socialAccounts.twitter.profileUrl\" href=\"{{user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter twitter-icon\"></i></a>\n" +
    "								<a ng-show=\"user.socialAccounts.google.profileUrl\" href=\"{{user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google google-icon\"></i></a>\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "    			</uib-tab>\n" +
    "    			<uib-tab heading=\"Votes\">\n" +
    "					<md-card ng-repeat=\"vote in votes\">\n" +
    "				        <div style=\"padding:16px 16px 16px\">\n" +
    "							<h4><a href=\"/vote/{{vote.id}}\">{{vote.title}}</a></h4>\n" +
    "							<div class=\"spacing-10\"></div>\n" +
    "							<a href=\"/bill/{{vote.bill.id}}/{{vote.bill.title}}\">{{vote.bill.title}}</a>\n" +
    "							<div class=\"spacing-10\"></div>\n" +
    "							<button ng-class=\"{'upVoted': class=='upVote'}\" class=\"btn btn-default upVote col-sm-6\" ng-click=\"createVote(1, vote)\">\n" +
    "								<i class=\"fa fa-caret-up vBlue\"></i> <b>{{vote.plusCount}}</b>\n" +
    "							</button>\n" +
    "							<button ng-class=\"{'downVoted': class=='downVote'}\" class=\"btn btn-default downVote col-sm-6\" ng-click=\"createVote(-1, vote)\">\n" +
    "								<i class=\"fa fa-caret-down red-color\"></i>  <b>{{vote.minusCount}}</b>\n" +
    "							</button>\n" +
    "						</div>\n" +
    "					</md-card>\n" +
    "    			</uib-tab>\n" +
    "			</uib-tabset>\n" +
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
    "\n" +
    "\n" +
    "			<!--\n" +
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
    "			-->\n" +
    "\n" +
    "\n" +
    "			<div class=\"spacing-15\"></div>\n" +
    "\n" +
    "			<div ng-repeat=\"result in searchResults\">\n" +
    "				<md-card ng-show=\"result.model=='vote'\">\n" +
    "					<div class=\"card-container\">\n" +
    "						<a href=\"/vote/{{result.id}}\"><h4 style=\"display: inline-block;position: relative\">{{result.title}}</h4></a>\n" +
    "						<div class=\"pull-right\">\n" +
    "							<span style=\"color:grey\" am-time-ago=\"result.updatedAt\"></span>\n" +
    "						</div>\n" +
    "\n" +
    "						<div class=\"spacing-10\"></div>\n" +
    "						<a href=\"/bill/{{result.bill.id}}/{{result.bill.title}}\">{{result.bill.title}}</a>\n" +
    "						<div class=\"spacing-10\"></div>\n" +
    "						<button ng-class=\"{'upVoted': class=='upVote'}\" class=\"btn btn-default upVote col-sm-6\" ng-click=\"createVote(1, result)\">\n" +
    "							<i class=\"fa fa-caret-up vBlue\"></i> <b>{{result.plusCount}}</b>\n" +
    "						</button>\n" +
    "						<button ng-class=\"{'downVoted': class=='downVote'}\" class=\"btn btn-default downVote col-sm-6\" ng-click=\"createVote(-1, result)\">\n" +
    "							<i class=\"fa fa-caret-down red-color\"></i>  <b>{{result.minusCount}}</b>\n" +
    "						</button>\n" +
    "					</div>\n" +
    "				</md-card>\n" +
    "\n" +
    "				<md-card ng-show=\"result.model=='post'\">\n" +
    "			        <div class=\"card-container\">\n" +
    "						<div class=\"post-controller-container\">\n" +
    "	                        <a href=\"/member/{{result.user.username}}\">\n" +
    "	                            <img class=\"post-img\" ng-src=\"{{result.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{result.user.username}}\">\n" +
    "	                            <h4 class=\"post-name\">{{result.user.username}}</h4>\n" +
    "	                        </a>\n" +
    "	                        <div class=\"pull-right\">\n" +
    "	                            <span style=\"color:grey\" am-time-ago=\"result.updatedAt\"></span>\n" +
    "	                            <div style=\"display:inline\" uib-dropdown is-open=\"status.isopen\">\n" +
    "	                                <a uib-dropdown-toggle ng-disabled=\"disabled\" href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a> \n" +
    "	                                <ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "	                                    <li role=\"menuitem\"><a href=\"#\">Share</a></li>\n" +
    "	                                    <li role=\"menuitem\"><a href=\"#\">Delete</a></li>\n" +
    "	                                </ul>\n" +
    "	                            </div>\n" +
    "	                        </div>\n" +
    "	                    </div>\n" +
    "\n" +
    "	                    <div class=\"post-container\">\n" +
    "	                        <div ng-show=\"result.profile.id != result.user.id\">\n" +
    "	                            <div class=\"spacing-5\"></div>\n" +
    "	                            <a ng-show=\"result.bill\" href=\"bill/{{result.bill.id}}/1\"><h4>{{result.bill.title}}</h4></a>\n" +
    "	                            <a ng-show=\"result.committee\" href=\"committee/{{result.committee.urlTitle}}\"><h4>{{result.committee.title}}</h4></a>\n" +
    "	                            <a ng-show=\"result.profile\" href=\"member/{{result.profile.username}}\"><h4>{{result.profile.username}}</h4></a>\n" +
    "	                            <a ng-show=\"result.vote\" href=\"vote/{{result.vote.id}}\"><h4>{{result.vote.title}}</h4></a>\n" +
    "	                            <div class=\"spacing-5\"></div>\n" +
    "	                        </div>\n" +
    "	                        <p>{{post.post}}</p>\n" +
    "	                    </div>\n" +
    "\n" +
    "	                    <div class=\"post-action-container\">\n" +
    "	                        <div class=\"pull-left\">\n" +
    "	                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "	                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "	                            <a href=\"#\" class=\"grey\" ng-click=\"reply(result)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "	                        </div>\n" +
    "	                        <div class=\"pull-right\">\n" +
    "	                            <a href=\"post/{{result.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "	                        </div>\n" +
    "	                    </div>\n" +
    "					</div>\n" +
    "				</md-card>\n" +
    "\n" +
    "				<md-card ng-show=\"result.model=='bill'\">\n" +
    "					<div class=\"card-container\">\n" +
    "		            	<h4><a href=\"/bill/{{result.id}}/{{result.title.replace(' ','-')}}\">{{result.title}}</a></h4>\n" +
    "						<div class=\"spacing-10\"></div>\n" +
    "		            	<button ng-class=\"{'upVoted': vote.class=='upVote'}\" class=\"btn btn-default upVote col-sm-6\" ng-click=\"createVote(1, vote)\"><i class=\"fa fa-caret-up\"></i>  {{result.plusCount}}</button>\n" +
    "			            <button ng-class=\"{'downVoted': vote.class=='downVote'}\" class=\"btn btn-default downVote col-sm-6\" ng-click=\"createVote(-1, vote)\"><i class=\"fa fa-caret-down\"></i>  {{result.minusCount}}</button>\n" +
    "			        </div>\n" +
    "				</md-card>\n" +
    "\n" +
    "				<md-card ng-show=\"result.model=='committee'\">\n" +
    "					<div class=\"card-container\">\n" +
    "						<div class=\"card-container\">\n" +
    "			            	<h3><a href=\"/committee/{{result.urlTitle}}\">{{result.title}}</a></h3>\n" +
    "    						<p><span style=\"color:grey\">{{result.memberCount}} members</span></p>\n" +
    "				        </div>\n" +
    "			        </div>\n" +
    "				</md-card>\n" +
    "\n" +
    "			    <div ng-show=\"result.model=='user'\" class=\"col-lg-4 col-sm-6\">\n" +
    "					<div class=\"member-card\">\n" +
    "						<div class=\"image\" style=\"background-image: url('{{result.coverUrl}}')\">\n" +
    "							<img ng-src=\"{{result.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "						</div>\n" +
    "						<div class=\"info\">\n" +
    "							<h4 class=\"name\"><a href=\"member/{{result.username}}\">{{result.username}}</a></h4>\n" +
    "							<h5 class=\"position\"><a href=\"memberresultuser.username}}\">{{result.title}}</a></h5>\n" +
    "							<p>{{result.state}}</p>\n" +
    "						</div>\n" +
    "						<div class=\"social\">\n" +
    "							<a ng-show=\"result.socialAccounts.facebook.profileUrl\" href=\"{{result.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook facebook-icon\"></i></a>\n" +
    "							<a ng-show=\"result.socialAccounts.twitter.profileUrl\" href=\"{{result.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter twitter-icon\"></i></a>\n" +
    "							<a ng-show=\"result.socialAccounts.google.profileUrl\" href=\"{{result.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google google-icon\"></i></a>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"spacing-15\"></div>\n" +
    "	<md-divider></md-divider>\n" +
    "	<div class=\"spacing-25\"></div>\n" +
    "	<div ng-click=\"loadMore()\" class=\"container\" style=\"text-align:center\">\n" +
    "	    <button style=\"width:100%\" class=\"btn btn-default\">MORE <i class=\"fa fa-angle-down\"></i></button>\n" +
    "	</div>\n" +
    "	<div class=\"spacing-25\"></div>\n" +
    "	<div ng-include=\"'footer/index.tpl.html'\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("vote/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("vote/index.tpl.html",
    "<div ui-view=\"vote\">\n" +
    "	<div class=\"voteContainer container\">\n" +
    "		<div class=\"spacing-5\"></div>\n" +
    "		<h3>{{vote.title}}</h3>\n" +
    "		<h5><a href=\"bill/{{vote.bill.id}}/{{vote.bill.urlTitle}}\">{{vote.bill.title}}</a></h5>\n" +
    "		<div class=\"spacing-10\"></div>\n" +
    "		<div class=\"row\">\n" +
    "			<button class=\"col-xs-6 btn btn-default upVote\" ng-click=\"createVote(1)\"><i class=\"fa fa-caret-up\"></i> {{vote.plusCount}}</button>\n" +
    "        	<button class=\"col-xs-6 btn btn-default downVote\" ng-click=\"createVote(-1)\"><i class=\"fa fa-caret-down\"></i> {{vote.minusCount}}</button>\n" +
    "    	</div>\n" +
    "    	<br>\n" +
    "		<uib-tabset>\n" +
    "			<uib-tab heading=\"Activity\" active=\"active\">\n" +
    "				<div class=\"spacing-10\"></div>\n" +
    "\n" +
    "\n" +
    "				<div ng-show=\"!currentUser\" class=\"profilePost\">\n" +
    "					<form role=\"form\">\n" +
    "						<md-input-container class=\"md-block\">\n" +
    "							<textarea placeholder=\"What's up?\" ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\"></textarea>\n" +
    "						</md-input-container>\n" +
    "						<button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "					</form>\n" +
    "		        </div>\n" +
    "\n" +
    "			    <md-card ng-show=\"currentUser\">\n" +
    "			        <div class=\"card-container\">\n" +
    "			            <div class=\"post-controller-container\">\n" +
    "			                <a href=\"/member/{{currentUser.username}}\">\n" +
    "			                    <img class=\"post-img\" ng-src=\"{{currentUser.avatarUrl}}\" class=\"md-card-image\" alt=\"{{currentUser.username}}\">\n" +
    "			                    <h4 class=\"post-name\">{{currentUser.username}}</h4>\n" +
    "			                </a>\n" +
    "			            </div>\n" +
    "			            <div style=\"margin-left:61px;\">\n" +
    "			                <form role=\"form\">\n" +
    "			                    <md-input-container class=\"md-block\">\n" +
    "			                        <textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"what's happening\"></textarea>\n" +
    "			                    </md-input-container>\n" +
    "			                    <button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default pull-right\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "			                </form>\n" +
    "			            </div>\n" +
    "			        </div>\n" +
    "			    </md-card>\n" +
    "\n" +
    "				<!--\n" +
    "				<md-card ng-repeat=\"result in results\">\n" +
    "					{{result}}\n" +
    "			    </md-card>\n" +
    "				-->\n" +
    "\n" +
    "		        <md-card ng-repeat=\"post in posts\">\n" +
    "					<div class=\"card-container\">\n" +
    "\n" +
    "						<div class=\"post-controller-container\">\n" +
    "	                        <a href=\"/member/{{post.user.username}}\">\n" +
    "	                            <img class=\"post-img\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "	                            <h4 class=\"post-name\">{{post.user.username}}</h4>\n" +
    "	                        </a>\n" +
    "	                        <div class=\"pull-right\">\n" +
    "	                            <span class=\"grey\" am-time-ago=\"post.updatedAt\"></span>\n" +
    "	                            <div style=\"display:inline\" uib-dropdown is-open=\"status.isopen\">\n" +
    "	                                <a uib-dropdown-toggle ng-disabled=\"disabled\" href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a> \n" +
    "	                                <ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "	                                    <li role=\"menuitem\"><a href=\"#\">Share</a></li>\n" +
    "	                                    <li role=\"menuitem\"><a href=\"#\">Delete</a></li>\n" +
    "	                                </ul>\n" +
    "	                            </div>\n" +
    "	                        </div>\n" +
    "	                    </div>\n" +
    "\n" +
    "	                    <div class=\"post-container\">\n" +
    "	                        <p>{{post.post}}</p>\n" +
    "	                    </div>\n" +
    "\n" +
    "	                    <div class=\"post-action-container\">\n" +
    "	                        <div class=\"pull-left\">\n" +
    "	                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "	                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "	                            <a href=\"#\" class=\"grey\" ng-click=\"reply(post)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "	                        </div>\n" +
    "	                        <div class=\"pull-right\">\n" +
    "	                            <a href=\"post/{{post.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "	                        </div>\n" +
    "	                    </div>\n" +
    "\n" +
    "					</div>\n" +
    "		        </md-card>\n" +
    "\n" +
    "		    </uib-tab>\n" +
    "			<uib-tab heading=\"Discussion\">\n" +
    "				<div class=\"spacing-10\"></div>\n" +
    "\n" +
    "\n" +
    "				<div ng-show=\"!currentUser\" class=\"profilePost\">\n" +
    "					<form role=\"form\">\n" +
    "						<md-input-container class=\"md-block\">\n" +
    "							<textarea placeholder=\"What's up?\" ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\"></textarea>\n" +
    "						</md-input-container>\n" +
    "						<button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "					</form>\n" +
    "		        </div>\n" +
    "\n" +
    "			    <md-card ng-show=\"currentUser\">\n" +
    "			        <div class=\"card-container\">\n" +
    "			            <div class=\"post-controller-container\">\n" +
    "			                <a href=\"/member/{{user.username}}\">\n" +
    "			                    <img class=\"post-img\" ng-src=\"{{user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{user.username}}\">\n" +
    "			                    <h4 class=\"post-name\">{{user.username}}</h4>\n" +
    "			                </a>\n" +
    "			            </div>\n" +
    "			            <div style=\"margin-left:61px;\">\n" +
    "			                <form role=\"form\">\n" +
    "			                    <md-input-container class=\"md-block\">\n" +
    "			                        <textarea ng-model=\"newPost.post\" rows=\"5\" md-select-on-focus aria-label=\"new post\" placeholder=\"what's happening\"></textarea>\n" +
    "			                    </md-input-container>\n" +
    "			                    <button ng-click=\"createPost()\" type=\"submit\" class=\"btn btn-default pull-right\"><i class=\"fa fa-paper-plane\"></i> Submit</button>\n" +
    "			                </form>\n" +
    "			            </div>\n" +
    "			        </div>\n" +
    "			    </md-card>\n" +
    "\n" +
    "\n" +
    "\n" +
    "		        <md-card ng-repeat=\"post in posts\">\n" +
    "					<div class=\"card-container\">\n" +
    "\n" +
    "						<div class=\"post-controller-container\">\n" +
    "	                        <a href=\"/member/{{post.user.username}}\">\n" +
    "	                            <img class=\"post-img\" ng-src=\"{{post.user.avatarUrl}}\" class=\"md-card-image\" alt=\"{{post.user.username}}\">\n" +
    "	                            <h4 class=\"post-name\">{{post.user.username}}</h4>\n" +
    "	                        </a>\n" +
    "	                        <div class=\"pull-right\">\n" +
    "	                            <span class=\"grey\" am-time-ago=\"post.updatedAt\"></span>\n" +
    "	                            <div style=\"display:inline\" uib-dropdown is-open=\"status.isopen\">\n" +
    "	                                <a uib-dropdown-toggle ng-disabled=\"disabled\" href=\"#\" ng-click=\"\"><i class=\"fa fa-angle-down grey\"></i></a> \n" +
    "	                                <ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "	                                    <li role=\"menuitem\"><a href=\"#\">Share</a></li>\n" +
    "	                                    <li role=\"menuitem\"><a href=\"#\">Delete</a></li>\n" +
    "	                                </ul>\n" +
    "	                            </div>\n" +
    "	                        </div>\n" +
    "	                    </div>\n" +
    "\n" +
    "	                    <div class=\"post-container\">\n" +
    "	                        <p>{{post.post}}</p>\n" +
    "	                    </div>\n" +
    "\n" +
    "	                    <div class=\"post-action-container\">\n" +
    "	                        <div class=\"pull-left\">\n" +
    "	                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-up\"></i> 0 like </a> \n" +
    "	                            <a href=\"#\" ng-click=\"\" class=\"grey\"><i class=\"fa fa-angle-down\"></i> 0 dislike </a> \n" +
    "	                            <a href=\"#\" class=\"grey\" ng-click=\"reply(post)\"><i class=\"fa fa-reply\"></i> reply </a>\n" +
    "	                        </div>\n" +
    "	                        <div class=\"pull-right\">\n" +
    "	                            <a href=\"post/{{post.id}}\"><i class=\"fa fa-link grey\"></i></a>\n" +
    "	                        </div>\n" +
    "	                    </div>\n" +
    "\n" +
    "					</div>\n" +
    "		        </md-card>\n" +
    "		    </uib-tab>\n" +
    "			<uib-tab heading=\"{{vote.plusCount}}  Yes\" active=\"active\">\n" +
    "				<div class=\"spacing-10\"></div>\n" +
    "				<div class=\"col-lg-4 col-sm-6\" ng-repeat=\"vote in yesVotes\">\n" +
    "	                <div class=\"member-card\">\n" +
    "	                    <div class=\"image\" style=\"background-image: url('{{vote.user.coverUrl}}')\">\n" +
    "	                        <img ng-src=\"{{vote.user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "	                    </div>\n" +
    "	                    <div class=\"info\">\n" +
    "	                        <h4 class=\"name\"><a href=\"member/{{vote.user.username}}\">{{vote.user.username}}</a></h4>\n" +
    "	                        <h5 class=\"position\">{{vote.user.title}}</h5>\n" +
    "	                        <p ng-show=\"vote.user.constituentCount > 0\">\n" +
    "	                        	Yes for <a ng-show=\"vote.user.constituentCount > 0\" href=\"member/{{vote.user.username}}/constituents\">{{vote.user.constituentCount}} constituent<span ng-show=\"vote.user.constituentCount!=1\">s</span></a>\n" +
    "	                        </p>\n" +
    "	                        <p>{{vote.user.state}}</p>\n" +
    "	                    </div>\n" +
    "	                    <div class=\"social\">\n" +
    "	                        <a ng-show=\"vote.user.socialAccounts.facebook.profileUrl\" href=\"{{vote.user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook facebook-icon\"></i></a>\n" +
    "	                        <a ng-show=\"vote.user.socialAccounts.twitter.profileUrl\" href=\"{{vote.user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter twitter-icon\"></i></a>\n" +
    "	                        <a ng-show=\"vote.user.socialAccounts.google.profileUrl\" href=\"{{vote.user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google google-icon\"></i></a>\n" +
    "	                    </div>\n" +
    "	                </div>\n" +
    "	            </div>\n" +
    "		    </uib-tab>\n" +
    "		    <uib-tab heading=\"{{vote.minusCount}}  No\">\n" +
    "		    	<div class=\"spacing-10\"></div>\n" +
    "				<div class=\"col-lg-4 col-sm-6\" ng-repeat=\"vote in noVotes\">\n" +
    "	                <div class=\"member-card\">\n" +
    "	                    <div class=\"image\" style=\"background-image: url('{{vote.user.coverUrl}}')\">\n" +
    "	                        <img ng-src=\"{{vote.user.avatarUrl}}\" err-src=\"/images/avatar.png\">\n" +
    "	                    </div>\n" +
    "	                    <div class=\"info\">\n" +
    "	                        <h4 class=\"name\"><a href=\"member/{{vote.user.username}}\">{{vote.user.username}}</a></h4>\n" +
    "	                        <h5 class=\"position\">{{vote.user.title}}</h5>\n" +
    "	                        <p ng-show=\"vote.user.constituentCount > 0\">\n" +
    "	                        	No for <a href=\"member/{{vote.user.username}}/constituents\">{{vote.user.constituentCount}} constituent<span ng-show=\"vote.user.constituentCount!=1\">s</span></a>\n" +
    "	                        </p>\n" +
    "	                        <p>{{vote.user.state}}</p>\n" +
    "	                    </div>\n" +
    "	                    <div class=\"social\">\n" +
    "	                        <a ng-show=\"vote.user.socialAccounts.facebook.profileUrl\" href=\"{{vote.user.socialAccounts.facebook.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-facebook facebook-icon\"></i></a>\n" +
    "	                        <a ng-show=\"vote.user.socialAccounts.twitter.profileUrl\" href=\"{{vote.user.socialAccounts.twitter.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-twitter twitter-icon\"></i></a>\n" +
    "	                        <a ng-show=\"vote.user.socialAccounts.google.profileUrl\" href=\"{{vote.user.socialAccounts.google.profileUrl}}\"  target=\"_blank\"><i class=\"fa fa-google google-icon\"></i></a>\n" +
    "	                    </div>\n" +
    "	                </div>\n" +
    "	            </div>\n" +
    "		    </uib-tab>\n" +
    "		</uib-tabset>\n" +
    "	<div>\n" +
    "</div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>");
}]);

angular.module("votes/index.tpl.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("votes/index.tpl.html",
    "<div class=\"imageContainerSmall\">\n" +
    "	<video class='flexible' autoplay=\"autoplay\" muted=\"muted\" preload=\"auto\" loop=\"loop\"><source src=\"https://s3-us-west-2.amazonaws.com/voetr/washington.mp4\" type=\"video/mp4\" playsinline></video>\n" +
    "	<div class=\"imageContainerSmallDiv container\">  \n" +
    "		<h1 style=\"text-align:left\">votes</h1>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"spacing-10\"></div>\n" +
    "	<div class=\"dropdown sort-dropdown noselect\">\n" +
    "		<a class=\"dropdown-toggle noselect\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "            <h4 class=\"noselect\">{{sortText[sort]}}<span class=\"caret\"></span></h4>\n" +
    "		</a>\n" +
    "		<ul class=\"dropdown-menu\">\n" +
    "			<li><a class=\"sort-a\" ng-click=\"selectSort('trendingScore DESC')\"><h5>Trending</h5></a></li>\n" +
    "			<hr class=\"sort-hr\">\n" +
    "			<li><a class=\"sort-a\" ng-click=\"selectSort('createdAt DESC')\"><h5>Most Recent</h5></a></li>\n" +
    "			<hr class=\"sort-hr\">\n" +
    "			<li><a class=\"sort-a\" ng-click=\"selectSort('voteCount DESC')\"><h5>Most Votes</h5></a></li>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "	<div class=\"spacing-10\"></div>\n" +
    "	<md-card ng-repeat=\"vote in votes\">\n" +
    "        <div style=\"padding:16px 16px 16px\">\n" +
    "			<h4><a href=\"/vote/{{vote.id}}\">{{vote.title}}</a></h4>\n" +
    "			<div class=\"spacing-10\"></div>\n" +
    "			<a href=\"/bill/{{vote.bill.id}}/{{vote.bill.title}}\">{{vote.bill.title}}</a>\n" +
    "			<div class=\"spacing-10\"></div>\n" +
    "			<button ng-class=\"{'upVoted': class=='upVote'}\" class=\"btn btn-default upVote col-xs-6\" ng-click=\"createVote(1, vote)\">\n" +
    "				<i class=\"fa fa-caret-up vBlue\"></i> <b>{{vote.plusCount}}</b>\n" +
    "			</button>\n" +
    "			<button ng-class=\"{'downVoted': class=='downVote'}\" class=\"btn btn-default downVote col-xs-6\" ng-click=\"createVote(-1, vote)\">\n" +
    "				<i class=\"fa fa-caret-down red-color\"></i>  <b>{{vote.minusCount}}</b>\n" +
    "			</button>\n" +
    "		</div>\n" +
    "	</md-card>\n" +
    "</div>\n" +
    "<div class=\"spacing-25\"></div>\n" +
    "<md-divider></md-divider>\n" +
    "<div class=\"spacing-25\"></div>\n" +
    "<div ng-click=\"loadMore()\" class=\"container\" style=\"text-align:center\">\n" +
    "    <button style=\"width:100%\" class=\"btn btn-default\">MORE <i class=\"fa fa-angle-down\"></i></button>\n" +
    "</div>\n" +
    "<div class=\"spacing-25\"></div>\n" +
    "<div ng-include=\"'footer/index.tpl.html'\"></div>");
}]);
