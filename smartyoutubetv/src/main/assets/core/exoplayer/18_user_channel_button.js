console.log("Scripts::Running core script user_channel_button.js");

function UserChannelButton(selector) {
    this.TAG = "UserChannelButton";
    this.selector = selector;

    this.getChecked = function() {
        Log.d(this.TAG, "getChecked " + this.selector);
        return false;
    };

    this.setChecked = function(doChecked) {
        Log.d(this.TAG, "setChecked " + this.selector + " " + doChecked);

        if (doChecked) {
            var $this = this;

            var el = this.findToggle();

            if (!el) {
                Log.d(this.TAG, "Oops, channel button not found... return to the player");
                ExoUtils.sendAction(ExoUtils.ACTION_CLOSE_SUGGESTIONS);
                return;
            }

            EventUtils.triggerEnter(el);

            EventUtils.addListenerOnce(YouTubeSelectors.PLAYER_EVENTS_RECEIVER, YouTubeEvents.COMPONENT_FOCUS_EVENT, function() {
                Log.d($this.TAG, "User has closed the channel... return to the player");
                ExoUtils.sendAction(ExoUtils.ACTION_CLOSE_SUGGESTIONS);
            });
        }
    };

    this.decorator.apply(this);
}

UserChannelButton.prototype = new ExoButton();