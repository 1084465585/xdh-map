export default {
  name: 'droppable',
  bind(el, binding) {
    console.log(el, binding)
    let className = el.className
    let newClsName = `${className} droppable`
    el.className = newClsName

    el.addEventListener('dragenter', function () {
      console.log('entering')
    })
    el.addEventListener('dragover', function (e) {
      e.preventDefault()
    })
    el.addEventListener('drop', function () {
      console.log('drop')
    })
  }
}