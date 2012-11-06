            api.init(null, null, null, function(data) {
                $(document).ready(function(){
                    $('#init').removeClass("disabled loading").text('Ready').addClass("btn-success");
                    $('.needs-oauth').removeClass("disabled loading");
                });
            }, function(error) {
                $('<pre>' + JSON.stringify(JSON.parse(error), null, '\t') + '</pre>').dialog({modal:true, width:$(window).width()-100, height:$(window).height()-100});
            });
            // Functions for using a private riak key/value data storage for persistence
            var riak = {
                get: function(key, callback, errorCallback) {
                    callback = callback || function(data) {
                        alert(JSON.stringify(data));
                    };
                    errorCallback = errorCallback || function(error) {
                        alert(error);
                    };
                    $.ajax({
                        url: 'http://riak.kristsauders.com/buckets/att-js/keys/' + key,
                        type: 'get',
                        success: function(data) {
                            callback(data);
                        },
                        error: function(jqXHR, textStatus, error) {
                            errorCallback(jqXHR.responseText);
                        }
                    });
                },
                save: function(key, value, callback, errorCallback) {
                    callback = callback || function(data) {};
                    errorCallback = errorCallback || function(error) {
                        alert(error);
                    };
                    $.ajax({
                        url: 'http://riak.kristsauders.com/buckets/att-js/keys/' + key,
                        type: 'post',
                        data: value,
                        success: function(data) {
                            callback(data);
                        },
                        error: function(jqXHR, textStatus, error) {
                            errorCallback(jqXHR.responseText);
                        }
                    });
                }
            };
            // Attach JQuery.click() functions to buttons
            $(document).ready(function() {
                $("#pdf").click(function() {
                    window.location = 'Krists_Auders_Resume.pdf';
                });
                $("#contactMe").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').reveal();
                });
                $("#textMe").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').trigger('reveal:close');
                    $('#textMeModal').reveal();
                });
                $("#textMeSubmit").click(function() {
                    $('#textMeSubmit').addClass("disabled loading");
                    api.sms.att.send('8588228604', $('#textMeMessage').val(), function(data) {
                        $('#textMeSubmit').removeClass("disabled loading");
                        $('#textMeModal').trigger('reveal:close');
                    }, function(error) {
                        $('#textMeSubmit').removeClass("disabled loading");
                        $('<pre>' + syntaxHighlight(JSON.stringify(JSON.parse(error), null, '\t')) + '</pre>').dialog({
                            modal: true,
                            width: $(window).width() - 100,
                            height: $(window).height() - 100
                        });
                    });
                });

                $(".authorize").click(function() {
                    //api.oauth.authorize("TL,DC,MOBO,MIM");
                    api.oauth.authorize("TL,MOBO,MIM");
                });
                $("#getLocation").click(function() {
                    $('#getLocation').addClass("disabled loading");
                    api.location.att.locate($('#requestedAccuracy').val(), $('#acceptableAccuracy').val(), $('#tolerance').val(), function(data) {
                        $('#getLocation').removeClass("disabled loading");
                        $('<pre>' + syntaxHighlight(JSON.stringify(data, null, '\t')) + '</pre>').dialog({
                            modal: true,
                            width: $(window).width() - 100,
                            height: $(window).height() - 100
                        });
                        if (data.RequestError.ServiceException.MessageId == 'SVC0002') api.oauth.authorize("TL,DC,MOBO,MIM");
                    }, function(error) {
                        $('#getLocation').removeClass("disabled loading");
                        $('<pre>' + syntaxHighlight(JSON.stringify(JSON.parse(error), null, '\t')) + '</pre>').dialog({
                            modal: true,
                            width: $(window).width() - 100,
                            height: $(window).height() - 100
                        });
                    });
                });
                $("#startSession").click(function() {
                    $('#startSession').addClass("disabled loading");
                    api.tropo.att.session({'number':$('#tropoNumber').val(), 'messageToSay':$('#tropoMessage').val()}, function(data) {
                        $('#startSession').removeClass("disabled loading");
                        $('#tropoId').val(api.tropo.att.Id);
                        $('<pre>' + syntaxHighlight(JSON.stringify(data, null, '\t')) + '</pre>').dialog({
                            modal: true,
                            width: $(window).width() - 100,
                            height: $(window).height() - 100
                        });
                    }, function(error) {
                        $('#startSession').removeClass("disabled loading");
                        $('<pre>' + syntaxHighlight(JSON.stringify(JSON.parse(error), null, '\t')) + '</pre>').dialog({
                            modal: true,
                            width: $(window).width() - 100,
                            height: $(window).height() - 100
                        });
                    });
                });
                $("#sendSignal").click(function() {
                    $('#sendSignal').addClass("disabled loading");
                    api.tropo.att.signal($('#tropoId').val(), $('#tropoSignal').val(), function(data) {
                        $('#sendSignal').removeClass("disabled loading");
                        $('<pre>' + syntaxHighlight(JSON.stringify(data, null, '\t')) + '</pre>').dialog({
                            modal: true,
                            width: $(window).width() - 100,
                            height: $(window).height() - 100
                        });
                    }, function(error) {
                        $('#sendSignal').removeClass("disabled loading");
                        $('<pre>' + syntaxHighlight(JSON.stringify(JSON.parse(error), null, '\t')) + '</pre>').dialog({
                            modal: true,
                            width: $(window).width() - 100,
                            height: $(window).height() - 100
                        });
                    });
                });
                $("#sendMoboMessage").click(function() {
                    $('#sendMoboMessage').addClass("disabled loading");
                    api.mobo.att.send($('#sendMoboNumber').val(), $('#sendMoboText').val(), function(data) {
                        $('#sendMoboMessage').removeClass("disabled loading");
                        //$('#moboId').val(api.mobo.att.Id);
                        $('<pre>' + syntaxHighlight(JSON.stringify(data, null, '\t')) + '</pre>').dialog({
                            modal: true,
                            width: $(window).width() - 100,
                            height: $(window).height() - 100
                        });
                        if (data.RequestError.ServiceException.MessageId == 'SVC0002') api.oauth.authorize("TL,DC,MOBO,MIM");
                    }, function(error) {
                        $('#sendMoboMessage').removeClass("disabled loading");
                        $('<pre>' + syntaxHighlight(JSON.stringify(JSON.parse(error), null, '\t')) + '</pre>').dialog({
                            modal: true,
                            width: $(window).width() - 100,
                            height: $(window).height() - 100
                        });
                    });
                });
                // clear input on focus
                var clearMePrevious = '';
                $('input').focus(function() {
                    if ($(this).val() == $(this).attr('title')) {
                        clearMePrevious = $(this).val();
                        $(this).val('');
                    }
                });
                // if field is empty afterward, add text again
                $('input').blur(function() {
                    if ($(this).val() == '') {
                        $(this).val(clearMePrevious);
                    }
                });
                $('textarea').focus(function() {
                    if ($(this).val() == $(this).attr('title')) {
                        clearMePrevious = $(this).val();
                        $(this).val('');
                    }
                });
                $('textarea').blur(function() {
                    if ($(this).val() == '') {
                        $(this).val(clearMePrevious);
                    }
                });
                // Event listeners for menu bar clicks
                $('#docsButton').click(function() {
                    $('#app').hide();
                    $('#docs').show();
                    $('#appButton').removeClass('active');
                    $('#docsButton').addClass('active');
                });
                $('#appButton').click(function() {
                    $('#docs').hide();
                    $('#app').show();
                    $('#docsButton').removeClass('active');
                    $('#appButton').addClass('active');
                });
                $('#docs').hide();
            });