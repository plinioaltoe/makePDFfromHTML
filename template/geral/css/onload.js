document.addEventListener('DOMContentLoaded', function() {
  renderMath()
  handleImageAtTable()
})

var renderMath = function() {
  renderMathInElement(document.body, {
    delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
  })
}

var handleImageAtTable = function() {
  var images = document.querySelectorAll('.table .image')
  images.forEach(image => {
    var node = document.createElement('DIV')
    node.innerHTML = '.'
    node.style.width = '0px'
    image.prepend(node)
  })
}
