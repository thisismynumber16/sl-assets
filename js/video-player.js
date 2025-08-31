jQuery(document).ready(function() {
    var vastTimeout = 10000;
    var _videoId = 'video';
    var _$video = jQuery('#' + _videoId);

    _$video.on('mouseover', function() {
        jQuery(this).css('cursor', 'auto');
    });

    /** On button click click. Close ad + play video if exists.*/
    jQuery("body").on("click", ".wps-player__happy-inside-btn-close", function() {
        var $happyInsidePlayer = jQuery(".wps-player__happy-inside");
        $happyInsidePlayer.hide(300);
        var $video = jQuery('#' + _videoId)[0];
        if (undefined !== $video) {
            $video.play();
        }
    });

    if (0 !== _$video.length) {
        setupFluidPlayer(_videoId, _$video);
    }

    /**
    * Setup fluidPlayer
    *
    * @param string videoId
    */
    function setupFluidPlayer(videoId, $video) {
        var ctplOptions = {
            primaryColor: "#5835FF",
            autoPlay: false,
            allowDownload: false,
            preRoll: "",
            midRoll: "",
            midRollTimer: "50"
        };

        /** Add basic fluidPlayer options dynamically.*/
        var fluidPlayerOptions = {
            layoutControls: {
                fillToContainer: true,
                primaryColor: ctplOptions.primaryColor,
                posterImage: $video.attr( 'poster' ),
                autoPlay: ctplOptions.autoPlay,
                playButtonShowing: true,
                playPauseAnimation: true,
                mute: false,
                keyboardControl: true,
                allowDownload: ctplOptions.allowDownload,
                allowTheatre: false,
                playbackRateEnabled: true,
                controlBar: {
                    autoHide: true,
                    autoHideTimeout: 3,
                    animated: true
                },
                playerInitCallback: ( function() {
                    jQuery( '.wps-player__happy-inside--start' ).show(300);
                })
            }
        };

        /** Add vast List options dynamically.*/
        var vastListArray = [];
        if (ctplOptions.preRoll) {
            vastListArray.push({
                "roll": "preRoll",
                "vastTag": ctplOptions.preRoll
            });
        }
        if (ctplOptions.midRoll && ctplOptions.midRollTimer) {
            vastListArray.push({
                "roll": "midRoll",
                "vastTag": ctplOptions.midRoll,
                "timer": ctplOptions.midRollTimer + '%'
            });
        }
        var inVast = false;
        if (vastListArray.length > 0) {
            fluidPlayerOptions.vastOptions = {
                vastTimeout: vastTimeout,
                adList: vastListArray
            };
        }
        
        /** FluidPlayer Init.*/
        var videoPlayer = fluidPlayer(videoId, fluidPlayerOptions);

        /** FluidPlayer On pause event.*/
        videoPlayer.on("pause", function() {
            if ( inVast ) {
                return;
            }
            $video.addClass('paused');
            $video.parents('.wps-player').addClass('paused').find(".wps-player__happy-inside--pause").show(300);
        });

        /** FluidPlayer On play event.*/
        videoPlayer.on("play", function() {
            $video.removeClass('paused');
            $video.parents('.wps-player').removeClass('paused').find(".wps-player__happy-inside--start").hide(300);
        });
        
        // Hide loader once player is initialized
        jQuery('.wps-iframe-loader').hide();
    }
});