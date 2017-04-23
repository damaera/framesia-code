{ p } = require '../helper/elementList.coffee'

setCaret = require '../helper/setCaret.coffee'

# request = require 'superagent'


module.exports = () ->
  selection = window.getSelection()
  { anchorNode } = selection
  $beginParent = selection.anchorNode.parentNode

  embedText = $beginParent.textContent

  setEmbed = (html) ->
    tmp = document.createElement 'P'
    tmp.innerHTML = html
    $p = p()
    $p.innerHTML = '<br>'
    if embedText is ''
      $beginParent.parentNode.replaceChild $p, $beginParent
      $p.parentNode.insertBefore tmp.firstChild, $p
      setCaret $p, 0
    else
      $beginParent.innerHTML = '<br>'
      $beginParent.parentNode.insertBefore tmp.firstChild, $beginParent
      setCaret $beginParent, 0

  if $beginParent.nodeName is 'P'
    if /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)$/.test embedText
      setEmbed """<div class="embed" data-href="#{embedText}"><a
        href="#{embedText}"
        class="b-graf--embed embedly-card"
        data-card-controls=0
        data-card-chrome=0
        data-card-width="100%"
      /></div>"""


    # ytRegex = /^https?:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/

    # scRegex = /^https?:\/\/(www\.)?soundcloud\.com\/([0-9a-z_-]+)\/([0-9a-z-]+)/

    # twitRegex = /^https?:\/\/(www\.)?twitter\.com\/([A-Za-z0-9_]+)\/status\/([0-9]+)/

    # fbPostRegex = /^https?:\/\/(www\.)?facebook\.com\/([A-Za-z0-9\.]+)\/posts\/([0-9]+)/
    # fbVideoRegex = /^https?:\/\/(www\.)?facebook\.com\/([A-Za-z0-9\.]+)\/videos\/([0-9]+)/

    # gformRegex = /^https?:\/\/docs\.google\.com\/forms\/d\/([0-9a-zA-Z-_]+)/
    # gdocRegex = /^https?:\/\/docs\.google\.com\/document\/d\/([0-9a-zA-Z-_]+)/
    # gsheetRegex = /^https?:\/\/docs\.google\.com\/spreadsheets\/d\/([0-9a-zA-Z-_]+)/
    # gslideRegex = /^https?:\/\/docs\.google\.com\/presentation\/d\/([0-9a-zA-Z-_]+)/

    # gmapRegex = /^<iframe src=("|“)https?:\/\/(www\.)?google\.com\/maps\/embed\?([A-Za-z0-9=!\.\%\+\-]+)(.*)<\/iframe>$/

    # if ytRegex.test embedText
    #   [ text, w, ytId ] = ytRegex.exec embedText
    #   ytEmbed = "<iframe class='b-graf b-graf--frame--yt' contentEditable='false' width='100%' src='https://www.youtube.com/embed/#{ytId}' frameborder='0' data-frame-id='#{ytId}' data-origin='youtube'></iframe>"
    #   setEmbed ytEmbed

    # else if scRegex.test embedText
    #   [ text, w, scArtist, scSong ] = scRegex.exec embedText
    #   scEmbed = "<iframe class='b-graf b-graf--frame--sc'  contentEditable='false' width='100%' height='166' scrolling='no' frameborder='no' data-frame-id='#{scArtist}/#{scSong}' data-origin='soundcloud' src='https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/#{scArtist}/#{scSong}&amp;color=F2635E&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false'></iframe>"
    #   setEmbed scEmbed

    # else if twitRegex.test embedText
    #   [ text, w, twitUser, twitId ] = twitRegex.exec embedText
    #   twitEmbed = "<iframe class='b-graf b-graf--frame--twit' contentEditable='false' border=0 frameborder=0 data-frame-id='#{twitId}' data-origin='twitter' src='/e/twitter?id=#{twitId}' width='100%' onload='resizeIframe(this)'></iframe>"
    #   setEmbed twitEmbed

    # else if fbPostRegex.test embedText
    #   [ text, w, fbUser, postId ] = fbPostRegex.exec embedText
    #   fbPostEmbed = "<iframe class='b-graf b-graf--frame--fb-post' contentEditable='false' border=0 frameborder=0 data-frame-id='#{fbUser}/#{postId}' data-origin='facebook-post' src='/e/fb-post?user=#{fbUser}+id=#{postId}' width='100%' onload='resizeIframe(this)'></iframe>"
    #   setEmbed fbPostEmbed

    # else if fbVideoRegex.test embedText
    #   [ text, w, fbUser, videoId ] = fbVideoRegex.exec embedText
    #   fbVideEmbed = "<iframe class='b-graf b-graf--frame--fb-post' contentEditable='false' border=0 frameborder=0 data-frame-id='#{fbUser}/#{videoId}' data-origin='facebook-video' src='/e/fb-video?user=#{fbUser}+id=#{videoId}' width='640' height='360'></iframe>"
    #   setEmbed fbVideEmbed

    # else if gmapRegex.test embedText
    #   [ text, punc, w, gmapData ] = gmapRegex.exec embedText
    #   gmapEmbed = "<iframe class='b-graf b-graf--frame--gmap' contentEditable='false' data-src='#{gmapData}' data-frame-id='#{gmapData}' data-origin='google-map' src='https://www.google.com/maps/embed?#{gmapData}' width='100%' height='450' frameborder=0 style='border:0;' allowfullscreen></iframe>"
    #   setEmbed gmapEmbed

    # else if gsheetRegex.test embedText
    #   [ text, sheetId ] = gsheetRegex.exec embedText
    #   gsheetEmbed = "<iframe class='b-graf b-graf--frame--gsheet' contentEditable='false' data-frame-id='#{sheetId}' data-origin='google-sheet' src='https://docs.google.com/spreadsheets/d/#{sheetId}/pubhtml?widget=true&amp;headers=false' width='100%' height='450' frameborder=0 marginheight=0 marginwidth=0></iframe>"
    #   setEmbed gsheetEmbed

    # else if gslideRegex.test embedText
    #   [ text, slideId ] = gslideRegex.exec embedText
    #   gslideEmbed = "<iframe class='b-graf b-graf--frame--gslide' contentEditable='false' data-frame-id='#{slideId}' data-origin='google-slide' src='https://docs.google.com/presentation/d/#{slideId}/embed?start=false&loop=false' allowfullscreen='true' mozallowfullscreen='true' webkitallowfullscreen='true' width='100%' height='389' frameborder=0 marginheight=0 marginwidth=0></iframe>"
    #   setEmbed gslideEmbed

    # else if gdocRegex.test embedText
    #   [ text, docId ] = gdocRegex.exec embedText
    #   console.log docId
    #   gdocEmbed = "<iframe class='b-graf b-graf--frame--gdoc' contentEditable='false' data-frame-id='#{docId}' data-origin='google-doc' src='https://docs.google.com/document/d/#{docId}/pub?embedded=true' width='100%' height='450' frameborder=0 marginheight=0 marginwidth=0></iframe>"
    #   setEmbed gdocEmbed

    # else if gformRegex.test embedText
    #   [ text, formId ] = gformRegex.exec embedText
    #   gformEmbed = "<iframe class='b-graf b-graf--frame--gform' contentEditable='false' data-frame-id='#{formId}' data-origin='google-form' src='https://docs.google.com/forms/d/#{formId}/viewform?embedded=true' width='100%' height='450' frameborder=0 marginheight=0 marginwidth=0></iframe>"
    #   setEmbed gformEmbed

      