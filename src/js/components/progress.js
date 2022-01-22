// const cirlce = document.querySelector(".progress")

// const progressAtimation = () => {
//   let percentageProgress = Math.floor(98)

//   let radius = cirlce.getAttribute("r")
//   let circleLenght = 2 * Math.PI * radius
//   cirlce.setAttribute("stroke-dasharray", circleLenght)
//   cirlce.setAttribute("stroke-dashoffset", circleLenght - circleLenght * percentageProgress / 100)
// }

// progressAtimation()



const progressAtimation = () => {
  const cirlces = document.querySelectorAll(".facts-element__cirle")
  cirlces.forEach(el => {
    if (el.dataset.percentage == "true") {
      let progress = el.querySelector(".progress")
      let valueBlock = el.querySelector(".facts-element__value")
      let radius = progress.getAttribute("r")
      let circleLenght = 2 * Math.PI * radius
      let full = el.dataset.full
      let value = el.dataset.value
      let percentageProgress = Math.floor(value / full * 100)
      valueBlock.textContent = value
      progress.setAttribute("stroke-dasharray", circleLenght)
      progress.setAttribute("stroke-dashoffset", circleLenght - circleLenght * percentageProgress / 100)
    } else {
      let progress = el.querySelector(".progress")
      let value = el.querySelector(".facts-element__value")
      let radius = progress.getAttribute("r")
      let circleLenght = 2 * Math.PI * radius
      let percent = el.dataset.percent
      let percentageProgress = Math.floor(percent)
      value.textContent = percent + "%"
      progress.setAttribute("stroke-dasharray", circleLenght)
      progress.setAttribute("stroke-dashoffset", circleLenght - circleLenght * percentageProgress / 100)
    }
  })
}

progressAtimation()