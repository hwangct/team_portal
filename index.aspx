<!DOCTYPE HTML>
<html lang="en">
  <head>
<meta name="WebPartPageExpansion" content="full" />
<title>App Demo in Angular</title>
    <!--Import materialize.css-->
		<link href="/SiteAssets/team_portal/assets/css/material-icons.css" rel="stylesheet">
    <link href="/SiteAssets/team_portal/assets/css/materialize.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/SiteAssets/team_portal/assets/css/bootstrap.css">
    <link rel="stylesheet" href="/SiteAssets/team_portal/assets/css/custom.css">
    <link rel="stylesheet" href="/SiteAssets/team_portal/assets/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="/SiteAssets/team_portal/assets/css/angular-datatables.css">
    <link rel="stylesheet" href="/SiteAssets/team_portal/assets/css/angular-material.min.css">
  	<link rel="stylesheet" href="/SiteAssets/team_portal/assets/css/progress-wizard.min.css">
  	<link rel="stylesheet" href="/SiteAssets/team_portal/assets/fonts/font-awesome/css/font-awesome.min.css">

  <body ng-app="sampleApp" ng-cloak>
  	<div class="loading-wrapper" style="display: none;">
      <div class="loading"></div>
    <div class="loading-text">Loading...</div>
    </div>
    <div class="contents">
      <nav>
        <div class="nav-wrapper white">
          <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons grey-text text-darken-2">menu</i></a>
          <a href="#"><img class="s2-logo" src="/SiteAssets/team_portal/assets/images/s2.png"></a>
          <ul class="right hide-on-med-and-down">
          	<li>
              <a class="grey-text text-darken-2" ui-sref="positions">Positions</a>
            </li>
            <li>
              <a class="grey-text text-darken-2" ui-sref="candidates">Candidates</a>
            </li>
            <li>
              <a class="grey-text text-darken-2" ui-sref="enoms">Enoms</a>
            </li>
          </ul>
          <ul class="side-nav" id="mobile-demo">
          	<li>
              <a class="grey-text text-darken-2" ui-sref="positions">Positions</a>
            </li>
            <li>
              <a class="grey-text text-darken-2" ui-sref="candidates">Candidates</a>
            </li>
            <li>
              <a class="grey-text text-darken-2" ui-sref="enoms">Enoms</a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="ui-view"></div>
      <div class="push"></div>
    </div>
<!-- Modal Test -->
      
		  
    <!-- Footer -->
    <footer class="page-footer"> 
      <div class="footer-copyright">
        <div class="container">
          Copyright 2016 S2 Analytical Solutions, LLC. All Rights Reserved
          <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
        </div>
      </div>
    </footer>
   	<script src="/SiteAssets/team_portal/assets/js/util.js"></script>
   	<script src="/SiteAssets/team_portal/assets/libs/lodash.js"></script>
    <script src="/SiteAssets/team_portal/assets/libs/moment.js"></script>
    <script src="/SiteAssets/team_portal/assets/libs/jquery.min.js"></script>
    <script src="/SiteAssets/team_portal/assets/libs/jquery.dataTables.min.js"></script>   
    <script src="/SiteAssets/team_portal/assets/libs/angular.js"></script>
   	<script src="/SiteAssets/team_portal/assets/libs/angular-datatables.min.js"></script>
    <script src="/SiteAssets/team_portal/assets/libs/bootstrap.min.js"></script>
    <script src="/SiteAssets/team_portal/assets/libs/angular-ui-router.min.js"></script>

    <!-- Angular Material via CDN -->
	  <script src="/SiteAssets/team_portal/assets/libs/angular-animate.min.js"></script>
	  <script src="/SiteAssets/team_portal/assets/libs/angular-aria.min.js"></script>
	  <script src="/SiteAssets/team_portal/assets/libs//angular-messages.min.js"></script>
	  <script src="/SiteAssets/team_portal/assets/libs/angular-material.min.js"></script>
		<script src="/SiteAssets/team_portal/assets/libs/angular-sanitize.js"></script>
<script src="/SiteAssets/team_portal/assets/libs/jquery.dataTables.columnFilter.js"></script>
<script src="/SiteAssets/team_portal/assets/libs/angular-datatables.columnfilter.min.js"></script>
    <!-- Angular routes services -->
		<script src="/SiteAssets/team_portal/app/app.module.js"></script>
    <script src="/SiteAssets/team_portal/app/app.routes.js"></script>
    <script src="/SiteAssets/team_portal/app/components/candidates/candidatesService.js"></script>
    <script src="/SiteAssets/team_portal/app/components/enoms/enomsService.js"></script>
    <script src="/SiteAssets/team_portal/app/components/taskOrders/taskOrdersService.js"></script>

<script src="/SiteAssets/team_portal/assets/libs/materialize.min.js"></script>
<script src="/SiteAssets/team_portal/assets/libs/magnific_popup.js"></script>

    <script>
    $(function() {
      $(".button-collapse").sideNav();
    });
    </script>
		<script language="javascript">
         
      </script>    
  </body>
</html>