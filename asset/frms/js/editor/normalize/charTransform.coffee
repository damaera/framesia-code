setCaret = require '../helper/setCaret.coffee'

{ $ } = require '../helper/selector.coffee'

prevText = ''

module.exports = () ->

  selection = window.getSelection()


  { anchorNode , anchorOffset } = selection

  textContent = anchorNode.textContent
  biRegex = /^(B|I|STRONG|EM|A|SPAN)$/
  rpl = (regex, newText, func) ->
    if biRegex.test anchorNode.parentNode
      anchorNode = anchorNode.parentNode
      if biRegex.test anchorNode.parentNode
        anchorNode = anchorNode.parentNode
        if biRegex.test anchorNode.parentNode
          anchorNode = anchorNode.parentNode
          if biRegex.test anchorNode.parentNode
            anchorNode = anchorNode.parentNode
    if anchorNode.parentNode?.nodeName is 'PRE'
      return
    else if regex.test textContent
      tmp = document.createElement 'DIV'
      if newText is 'sups'
        [text] = (textContent.match regex)
        normalText = '+-=()0123456789AaÆᴂɐɑɒBbcɕDdðEeƎəɛɜɜfGgɡɣhHɦIiɪɨᵻɩjJʝɟKklLʟᶅɭMmɱNnɴɲɳŋOoɔᴖᴗɵȢPpɸrRɹɻʁsʂʃTtƫUuᴜᴝʉɥɯɰʊvVʋʌwWxyzʐʑʒꝯᴥβγδθφχнნʕⵡ'
        supsText = '⁺⁻⁼⁽⁾⁰¹²³⁴⁵⁶⁷⁸⁹ᴬᵃᴭᵆᵄᵅᶛᴮᵇᶜᶝᴰᵈᶞᴱᵉᴲᵊᵋᶟᵌᶠᴳᵍᶢˠʰᴴʱᴵⁱᶦᶤᶧᶥʲᴶᶨᶡᴷᵏˡᴸᶫᶪᶩᴹᵐᶬᴺⁿᶰᶮᶯᵑᴼᵒᵓᵔᵕᶱᴽᴾᵖᶲʳᴿʴʵʶˢᶳᶴᵀᵗᶵᵁᵘᶸᵙᶶᶣᵚᶭᶷᵛⱽᶹᶺʷᵂˣʸᶻᶼᶽᶾꝰᵜᵝᵞᵟᶿᵠᵡᵸჼˤⵯ'
        if prevText is text
          [s1, sups] = (text.split '^')
          newSups = ''
          for s in sups
            newSups += supsText[normalText.indexOf s]
          tmp.innerHTML = textContent.replace regex, (s1 + newSups + '&#8202;&#8202;')
          $text = tmp.firstChild
          anchorNode.parentNode.replaceChild $text, anchorNode
          setCaret $text, anchorOffset
        prevText = text
      else if newText is 'subs'
        [text] = (textContent.match regex)
        normalText = '+-=()0123456789aeəhijklmnoprstuvxβγρφχ'
        subsText = '₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₔₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ'
        if prevText is text
          [s1, subs] = (text.split '~')
          newSubs = ''
          for s in subs
            newSubs += subsText[normalText.indexOf s]
          tmp.innerHTML = textContent.replace regex, (s1 + newSubs + '&#8202;&#8202;')
          $text = tmp.firstChild
          anchorNode.parentNode.replaceChild $text, anchorNode
          setCaret $text, anchorOffset
        prevText = text
      else
        textContent = textContent.replace regex, newText
        tmp.innerHTML = textContent
        $text = tmp.firstChild
        anchorNode.parentNode.replaceChild $text, anchorNode
        setCaret $text, anchorOffset

  # rpl /\s{2,}/g, '&nbsp;'

  rpl /\.\.\./g, '&#8202;&hellip;&#8202;'
  rpl /\-\-/g, '&#8202;&mdash;&#8202;'
  rpl /1\/2/g, '&#8202;&#8202;&frac12;'
  rpl /1\/4/g, '&#8202;&#8202;&frac14;'
  rpl /3\/4/g, '&#8202;&#8202;&frac34;'


  rpl /(\d|½|¼|¾)"/g, '$1&Prime;'
  rpl /(\d|½|¼|¾)'/g, '$1&prime;'

  rpl /(\d+)-(\d+)/g, '$1&ndash;$2'

  # exponential, superscript
  rpl /(\w+)\^([0123456789AaÆᴂɐɑɒBbcɕDdðEeƎəɛɜɜfGgɡɣhHɦIiɪɨᵻɩjJʝɟKklLʟᶅɭMmɱNnɴɲɳŋOoɔᴖᴗɵȢPpɸrRɹɻʁsʂʃTtƫUuᴜᴝʉɥɯɰʊvVʋʌwWxyzʐʑʒꝯᴥβγδθφχнნʕⵡ+=()-]+)/g, 'sups'

  # subscript
  rpl /(\w+)\~([0123456789aeəhijklmnoprstuvxβγρφχ+=()-]+)/g, 'subs'



  # beginning quote
  rpl /"(\w)/g, '&ldquo;$1'
  rpl /(\S)"/g, '$1&rdquo;'
  rpl /'(\w)/g, '&lsquo;$1'
  rpl /(\S)'/g, '$1&rsquo;'
  rpl /(\w)‘(\w)/g, '$1&rsquo;$2'
