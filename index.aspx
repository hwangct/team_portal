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
  </head>
  <body ng-app="sampleApp">
    <div class="contents">
      <nav>
        <div class="nav-wrapper white">
          <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons cyan-text accent-3">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li>
              <a class="grey-text text-darken-2" ui-sref="candidates">Candidates</a>
            </li>
            <li>
              <a class="grey-text text-darken-2" ui-sref="enoms">Enoms</a>
            </li>
          </ul>
          <ul class="side-nav" id="mobile-demo">
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

    <!-- Footer -->
    <footer class="page-footer">
      <!--div class="container">
        <div class="row">
          <div class="col l4 offset-l2 s12">
            <h5 class="white-text">Links</h5>
            <ul>
              <li>
                <a class="grey-text text-lighten-3" href="#!">Link 1</a>
              </li>
              <li>
                <a class="grey-text text-lighten-3" href="#!">Link 2</a>
              </li>
              <li>
                <a class="grey-text text-lighten-3" href="#!">Link 3</a>
              </li>
              <li>
                <a class="grey-text text-lighten-3" href="#!">Link 4</a>
              </li>
            </ul>
          </div>
        </div>
      </div>-->
      <div class="footer-copyright">
        <div class="container">
          Copyright 2016 S2 Analytical Solutions, LLC. All Rights Reserved
          <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
        </div>
      </div>
    </footer>
    <script src="/SiteAssets/team_portal/assets/libs/jquery.min.js"></script>
    <script src="/SiteAssets/team_portal/assets/libs/jquery.dataTables.min.js"></script>    
    <script src="/SiteAssets/team_portal/assets/libs/angular.min.js"></script>
    <script src="/SiteAssets/team_portal/assets/libs/angular-datatables.min.js"></script>
    <!-- Compiled and minified JavaScript -->
    <!-- <script src="/SiteAssets/team_portal/assets/libs/angular-route.min.js"></script> -->
    <script src="/SiteAssets/team_portal/assets/libs/bootstrap.min.js"></script>
    <script src="/SiteAssets/team_portal/assets/libs/angular-ui-router.min.js"></script>

    <!-- Angular Material via CDN -->
    <!--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-animate.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-aria.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-messages.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0-rc2/angular-material.min.js"></script> -->
    <script src="/SiteAssets/team_portal/assets/libs/angular-sanitize.js"></script>
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

  </body>
</html>