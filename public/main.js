            $.cookie("prod_auth_access_token", "c4b16f69ba5617e99a685c158ff0dedc");
            $.cookie("prod_access_token", "c4b16f69ba5617e99a685c158ff0dedc");
            api.init("2766e6c0911dfe29a199b21cbb87098e", "86159dea55f69e65", "SMS", function(data) {
                $(document).ready(function(){
                        console.log('Initialized ATT-JS, received data:');
                        console.log(data);
                });
            }, function(error) {
                console.log('There was an error initializing the ATT-JS plugin. Some features might not be available.');
                console.log(error);
            });
            // Attach JQuery.click() functions to buttons
            $(document).ready(function() {
                $("#contactMe").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').reveal();
                });
                $("#textMe").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').trigger('reveal:close-first');
                    $('#textMeModal').reveal();
                });
                $("#textMeSubmit").click(function() {
                    $('#textMeSubmit').addClass("disabled loading");
                    api.sms.att.send('8588228604', 'Message from ' + $('#textMeNumber').val() + ': ' + $('#textMeMessage').val(), function(data) {
                        $('#textMeSubmit').removeClass("disabled loading");
                        $('#textMeModal').trigger('reveal:close-first');
                        $('#thankYouModal').reveal();
                        setTimeout(function() {
                            $('#thankYouModal').trigger('reveal:close');
                        }, 2000);
                    }, function(error) {
                        $('#textMeSubmit').removeClass("disabled loading");
                        alert('There was an error sending the message.');
                    });
                });
                $("#emailMe").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').trigger('reveal:close-first');
                    $('#emailMeModal').reveal();
                });
                $("#emailMeSubmit").click(function() {
                    $('#emailMeSubmit').addClass("disabled loading");
                    $.ajax({
                        url: '/email',
                        type: 'post',
                        data: {
                            "address": 'kristsauders@gmail.com',
                            "subject": 'E-mail from ' + $('#emailMeAddress').val(),
                            "text": $('#emailMeMessage').val()
                        },
                        success: function(data) {
                            $('#emailMeSubmit').removeClass("disabled loading");
                            $('#emailMeModal').trigger('reveal:close-first');
                            $('#thankYouModal').reveal();
                            setTimeout(function() {
                                $('#thankYouModal').trigger('reveal:close');
                            }, 2000);
                        },
                        error: function(jqXHR, textStatus, error) {
                            alert('There was an error sending the message.');
                        }
                    });
                });
                $("#callMe").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').trigger('reveal:close-first');
                    $('#callMeModal').reveal();
                });
                $("#callMeSubmit").click(function() {
                    $('#callMeSubmit').addClass("disabled loading");
                    api.tropo.att.session({
                        'number': '8588228604', 
                        'messageToSay':'This message is from ' + $('#callMeNumber').val() + '. ' + 
                        'This message is from ' + $('#callMeNumber').val() + '. ' + 
                        $('#callMeMessage').val()}, 
                    function(data) {
                        $('#callMeSubmit').removeClass("disabled loading");
                        $('#callMeModal').trigger('reveal:close-first');
                        $('#thankYouModal').reveal();
                        setTimeout(function() {
                            $('#thankYouModal').trigger('reveal:close');
                        }, 2000);
                    }, function(error) {
                        $('#callMeSubmit').removeClass("disabled loading");
                        $('#callMeModal').trigger('reveal:close');
                        alert('There was an error making the call.');
                    });
                });
                $("#getText").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').trigger('reveal:close-first');
                    $('#getTextModal').reveal();
                });
                $("#getTextSubmit").click(function() {
                    $('#getTextSubmit').addClass("disabled loading");
                    api.mobo.att.send($('#getTextNumber').val().replace(/-/g, "").replace(/ /g, "").replace("tel:", "").replace("(","").replace(")","").replace("+1",""), 
                                            'You requested the contact details of Krists Auders. You are receiving this from my personal phone number: (858) 822-8604. \
My e-mail address is kristsauders@gmail.com. Thank you!', function(data) {
                        $('#getTextSubmit').removeClass("disabled loading");
                        $('#getTextModal').trigger('reveal:close-first');
                        $('#thankYouModal').reveal();
                        setTimeout(function() {
                            $('#thankYouModal').trigger('reveal:close');
                        }, 2000);
                    }, function(error) {
                        $('#getTextSubmit').removeClass("disabled loading");
                        alert('There was an error sending the message.');
                    });
                });
                $("#getEmail").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').trigger('reveal:close-first');
                    $('#getEmailModal').reveal();
                });
                $("#getEmailSubmit").click(function() {
                    $('#getEmailSubmit').addClass("disabled loading");
                    $.ajax({
                        url: '/email',
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
120 Westlake Ave N Apt 1024\n\
Seattle WA - 98109\n\
(858) 822-8604 (cell)\n\
kristsauders@gmail.com\n\
Website: http://kristsauders.com\n\
LinkedIn: http://www.linkedin.com/pub/krists-auders/42/310/680\n\
\n\
Thank you!\n\
Krists Auders'
                        },
                        success: function(data) {
                            $('#getEmailSubmit').removeClass("disabled loading");
                            $('#getEmailModal').trigger('reveal:close-first');
                            $('#thankYouModal').reveal();
                            setTimeout(function() {
                                $('#thankYouModal').trigger('reveal:close');
                            }, 2000);
                        },
                        error: function(jqXHR, textStatus, error) {
                            alert('There was an error sending the message.');
                        }
                    });
                });
                $("#getCall").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').trigger('reveal:close-first');
                    $('#getCallModal').reveal();
                });
                $("#getCallSubmit").click(function() {
                    $('#getCallSubmit').addClass("disabled loading");
                    api.tropo.att.session({'number':$('#getCallNumber').val(), 'messageToSay': 'Hello, this is Krists Auders and you requested to receive my contact information in a phone call. You can call or text me at 8 5 8, 8 2 2, 8 6 0 4. Again, thats 8 5 8, 8 2 2, 8 6 0 4. If you wish to e mail me, you can do that at k.r.i.s.t.s.a.u.d.e.r.s.@g.mail dot com.'}, function(data) {
                        $('#getCallSubmit').removeClass("disabled loading");
                        $('#getCallModal').trigger('reveal:close-first');
                        $('#thankYouModal').reveal();
                        setTimeout(function() {
                            $('#thankYouModal').trigger('reveal:close');
                        }, 2000);
                    }, function(error) {
                        $('#getCallSubmit').removeClass("disabled loading");
                        $('#getCallModal').trigger('reveal:close');
                        alert('There was an error making the call.');
                    });
                });
                $(".useApi,#useApi").click(function(e) {
                    e.preventDefault();
                    $('#contactMeModal').trigger('reveal:close-first');
                    $('#useApiModal').reveal();
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
                // Function for buildling HTML resume from JSON data, called by the callback function when the JSON data is retrieved on page load
                function buildHtmlResume(data) {
                    var r = $('#resume');
                    r.append('<br/>');
                    r.append('<p align="center"><strong>' + data.Name + '</strong><br/>' +
                                data.Address.split(',')[0] + '<br/>' + data.Address.split(',')[1] + '<br/>' + data.Phone + '<br/>' +
                                data.Email + '<br/>' + activateURLs('(' + data.LinkedIn + ')') + '</p>');
                    r.append('<hr style="margin-left:5%;margin-right:5%;background-color:#BDBDBD; height:2px;width:90%;" />');
                    r.append('<h3 class="indent">OBJECTIVE</h4>');
                    r.append('<div style="padding-left:3em;margin-left:5%;padding-right:6em;margin-right:10%;"><em class="half-muted">' + data['OBJECTIVE'] + '</em></div><br/>');
                    r.append('<h3 class="indent">SKILLS SUMMARY</h4>');
                    var skills = data['SKILLS SUMMARY'];
                    for(var section in skills) {
                        var skillsHtml = '';
                        skillsHtml += '<em class="indent">' + section + '</em><br/><div style="padding-left:3em;margin-left:5%;"><ul>';
                        for(var item in skills[section]) {
                            skillsHtml += '<li><span class="half-muted">' + item + ':</span> ' + skills[section][item] + '</li>';
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
                        r.append('<span class="half-muted indent">' + pe[section].Employer + '</span><br/>');
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
                        r.append('<strong class="indent half-muted">' + activateURLs(pp[section].Title) + '</strong><br/>');
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
                        r.append('<span class="half-muted indent">' + activateURLs(ed[section].Subject) + '</span><br/>');
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
