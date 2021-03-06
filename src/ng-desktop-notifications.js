(function() {
 'use strict';
  angular.module('ngDesktopNotifications', []).factory('desktopNotification', function () {
    var self = {};

    notify.config({
      pageVisibility: false,
      autoClose: 5000
    });

    function dnLog(message) {
      console.log('ngDesktopNotification: ' + message);
    }

    function allParamsIsValid (title, body, imagePath) {
      var titleIsString = (typeof(title) === 'string'),
        bodyIsString = (typeof(body) === 'string'),
        imagePathIsString = (typeof(imagePath) === 'string'),
        paramsIsValid = (titleIsString && bodyIsString && imagePathIsString);

      if (!paramsIsValid) {
        dnLog('passed params invalid');
      }

      return paramsIsValid;
    }

    self.askForEnable = function(cb){
      if (notify.permissionLevel() === notify.PERMISSION_DEFAULT){
        notify.requestPermission(cb);
      };
    }

    self.isEnabled = function () {
      return notify.permissionLevel() === notify.PERMISSION_GRANTED;
    }

    self.notSpecified = function () {
      return notify.permissionLevel() === notify.PERMISSION_DEFAULT;
    }

    self.isBlocked = function () {
      return notify.permissionLevel() === notify.PERMISSION_DENIED;
    }

    self.pushNotify = function (title, body, imagePath, params) {
      if (notify.isSupported && self.isEnabled() && allParamsIsValid(title, body, imagePath)) {
        params.body = body;
        params.icon = imagePath;
        notify.createNotification(title, params);
      } else {
        self.askForEnable();
      }
    }


    return self;
  });
}).call(this);

