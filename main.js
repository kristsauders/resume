            $.cookie("prod_auth_access_token", "ffdd6f6ab3589983a347f1385aed6351");
            $.cookie("prod_access_token", "441b6a6c38a433eb5f3a40e66f8874b0");
            api.init(null, null, null, function(data) {
                $(document).ready(function(){
                });
            }, function(error) {
                alert('There was an error initializing the ATT-JS plugin. Some features might not be available.');
            });
            // Attach JQuery.click() functions to buttons
            $(document).ready(function() {
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
                        $('#thankYouModal').reveal();
                        setTimeout(function() {
                            $('#thankYouModal').trigger('reveal:close');
                        }, 2000);
                    }, function(error) {
                        $('#textMeSubmit').removeClass("disabled loading");
                        $('<pre>' + syntaxHighlight(JSON.stringify(JSON.parse(error), null, '\t')) + '</pre>').dialog({
                            modal: true,
                            width: $(window).width() - 100,
                            height: $(window).height() - 100
                        });
                    });
                });
                $("#emailMe").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').trigger('reveal:close');
                    $('#emailMeModal').reveal();
                });
                $("#emailMeSubmit").click(function() {
                    $('#emailMeSubmit').addClass("disabled loading");
                    $.ajax({
                        url: '/resume/email',
                        type: 'post',
                        data: {
                            "address": 'kristsauders@gmail.com',
                            "subject": 'E-mail from ' + $('#emailMeAddress').val(),
                            "text": $('#emailMeMessage').val()
                        },
                        success: function(data) {
                            $('#emailMeSubmit').removeClass("disabled loading");
                            $('#emailMeModal').trigger('reveal:close');
                            $('#thankYouModal').reveal();
                            setTimeout(function() {
                                $('#thankYouModal').trigger('reveal:close');
                            }, 2000);
                        },
                        error: function(jqXHR, textStatus, error) {
                            alert(error);
                        }
                    });
                });
                $("#callMe").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').trigger('reveal:close');
                    $('#callMeModal').reveal();
                });
                $("#getText").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').trigger('reveal:close');
                    $('#getTextModal').reveal();
                });
                $("#getTextSubmit").click(function() {
                    $('#getTextSubmit').addClass("disabled loading");
                    api.mobo.att.send($('#getTextNumber').val().replace(/-/g, "").replace(/ /g, "").replace("tel:", "").replace("(","").replace(")","").replace("+1",""), 
                                            'You requested the contact details of Krists Auders. You are receiving this from my personal phone number: (858) 822-8604. \
My e-mail address is kristsauders@gmail.com. Thank you!', function(data) {
                        $('#getTextSubmit').removeClass("disabled loading");
                        $('#getTextModal').trigger('reveal:close');
                        $('#thankYouModal').reveal();
                        setTimeout(function() {
                            $('#thankYouModal').trigger('reveal:close');
                        }, 2000);
                    }, function(error) {
                        $('#getTextSubmit').removeClass("disabled loading");
                        alert(error);
                        $('<pre>' + syntaxHighlight(JSON.stringify(JSON.parse(error), null, '\t')) + '</pre>').dialog({
                            modal: true,
                            width: $(window).width() - 100,
                            height: $(window).height() - 100
                        });
                    });
                });
                $("#getEmail").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').trigger('reveal:close');
                    $('#getEmailModal').reveal();
                });
                $("#getEmailSubmit").click(function() {
                    $('#getEmailSubmit').addClass("disabled loading");
                    $.ajax({
                        url: '/resume/email',
                        type: 'post',
                        data: {
                            "address": $('#getEmailAddress').val(),
                            "subject": 'E-mail from Krists Auders ',
                            "text": '\
Hello, \n\
\n\
You requested to receive my contact information. This is an automated e-mail message from my personal\n\
e-mail address, so you can reply directly to this message. I am also providing my full information below.\n\
\n\
Krists Auders\n\
1818 E Madison St. Apt 414\n\
Seattle WA - 98122\n\
(858) 822-8604 (cell)\n\
kristsauders@gmail.com\n\
\n\
Thank you!\n\
Krists Auders'
                        },
                        success: function(data) {
                            $('#getEmailSubmit').removeClass("disabled loading");
                            $('#getEmailModal').trigger('reveal:close');
                            $('#thankYouModal').reveal();
                            setTimeout(function() {
                                $('#thankYouModal').trigger('reveal:close');
                            }, 2000);
                        },
                        error: function(jqXHR, textStatus, error) {
                            alert(error);
                        }
                    });
                });
                $("#getCall").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').trigger('reveal:close');
                    $('#getCallModal').reveal();
                });
                $(".useApi,#useApi").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').trigger('reveal:close');
                    $('#useApiModal').reveal();
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
                $('.getJson,#getJson').click(function() {
                    $('#main').hide();
                    $('#jsonResume').show();
                    $('#resumeNavbar').removeClass('active');
                    $('#apiNavbar').addClass('active');
                });
                $('#resumeNavbar,#homeNavbar').click(function() {
                    $('#jsonResume').hide();
                    $('#main').show();
                    $('#apiNavbar').removeClass('active');
                    $('#resumeNavbar').addClass('active');
                });
                $('#jsonResume').hide();
                // Function to find URLs and make them active links
                function activateURLs(url) {
                    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                    var exp2 = /(\(|\))/g;
                    if(window.location.toString().split('/').pop() != 'resume.html') {
                        return url.replace(exp,"<a target='__blank' href='$1'>$1</a>");
                    } else {
                        return url.replace(exp,"").replace(exp2, "");
                    }
                }
                // Function for buildling HTML resume from JSON data, called by the callback function that retrieves the data
                function buildHtmlResume(data) {
                    var r = $('#resume');
                    r.append('<br/>');
                    r.append('<p align="center"><strong>' + data.Name + '</strong><br/>' +
                                data.Address.split(',')[0] + '<br/>' + data.Address.split(',')[1] + '<br/>' + data.Phone + '<br/>' +
                                data.Email + '</p>');
                    r.append('<hr style="margin-left:5%;margin-right:5%;background-color:#BDBDBD; height:2px;width:90%;" />');
                    r.append('<h3 class="indent">SKILLS SUMMARY</h4>');
                    var skills = data['SKILLS SUMMARY'];
                    for(var section in skills) {
                        var skillsHtml = '';
                        skillsHtml += '<em class="indent">' + section + '</em><br/><div style="padding-left:3em;margin-left:5%;"><ul>';
                        for(var item in skills[section]) {
                            skillsHtml += '<li><span class="muted">' + item + ':</span> ' + skills[section][item] + '</li>';
                        }
                        skillsHtml += '</ul></div>';
                        skillsHtml = activateURLs(skillsHtml);
                        r.append(skillsHtml);
                    }
                    r.append('<h3 class="indent">PROFESSIONAL EXPERIENCE</h4>');
                    var pe = data['PROFESSIONAL EXPERIENCE'];
                    for(var section in pe) {
                        var peHtml = '';
                        r.append('<strong class="indent">' + pe[section].Title + '</strong><br/>');
                        r.append('<span class="muted indent">' + pe[section].Employer + '</span><br/>');
                        r.append('<span class="muted indent">' + pe[section].Dates + '</span><br/>');
                        peHtml += '<div style="padding-left:3em;margin-left:5%;width:70%;"><ul>';
                        var details = pe[section]['Details'];
                        for(var item in details) {
                            peHtml += '<li>' + details[item] + '</li>';
                        }
                        peHtml += '</ul></div>';
                        peHtml = activateURLs(peHtml);
                        r.append(peHtml);
                    }
                    r.append('<h3 class="indent">PERSONAL PROJECTS</h4>');
                    var pp = data['PERSONAL PROJECTS'];
                    for(var section in pp) {
                        var ppHtml = '';
                        r.append('<strong class="indent">' + activateURLs(pp[section].Title) + '</strong><br/>');
                        ppHtml += '<div style="padding-left:3em;margin-left:5%;width:70%;"><ul>';
                        var details = pp[section]['Details'];
                        for(var item in details) {
                            ppHtml += '<li>' + details[item] + '</li>';
                        }
                        ppHtml += '</ul></div>';
                        ppHtml = activateURLs(ppHtml);
                        r.append(ppHtml);
                    }
                    r.append('<h3 class="indent">EDUCATION</h4>');
                    var ed = data['EDUCATION'];
                    for(var section in ed) {
                        r.append('<strong class="indent">' + activateURLs(ed[section].School) + '</strong><br/>');
                        r.append('<span class="muted indent">' + activateURLs(ed[section].Subject) + '</span><br/>');
                        r.append('<span class="muted indent">' + ed[section].Dates + '</span><br/>');
                        r.append('<br/>');
                    }
                }
                if(window.location.toString().split('/').pop() != 'resume.html')
                    $('#curlExample').html(syntaxHighlight($('#curlExample').html()));
                // Function to retrieve resume JSON data
                function getResumeData() {
                    $.ajax({
                        url: '/resume.json',
                        type: 'get',
                        dataType: "json",
                        success: function(data) {
                            // Syntax highlight and load JSON data in JSON resume div
                            $('#jsonResumeContent').html(syntaxHighlight(JSON.stringify(data, null, '\t')));
                            // Then build the HTML resume from JSON
                            buildHtmlResume(data);
                        },
                        error: function(jqXHR, textStatus, error) {
                            alert(error);
                            alert(jqXHR.responseText);
                        }
                    });
                }
                getResumeData();
            });