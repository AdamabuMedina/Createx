const portfolioTabsNav = document.querySelector(".portfolio-tabs-nav")
const portfolioTabsBtns = document.querySelectorAll(".portfolio-tabs-nav__btn")
const portfolioTabsItem = document.querySelectorAll(".portfolio-tabs__item")
const portfolioTabsItemVisible = document.querySelectorAll(".portfolio-tabs__item--visible")
const loadMore = document.querySelector(".portfolio-more")
const maxItems = 9

const isLoadMoreNeeded = (selector) => {
  if (selector.length <= maxItems) {
    loadMore.style.display = "none"
  } else {
    loadMore.style.display = "inline-flex"
  }
}

const hideMoreItems = (selector) => {
  if (selector.length > maxItems) {
    const arr = Array.from(selector)
    const hiddenItems = arr.slice(maxItems, selector.length)

    hiddenItems.forEach(el => {
      el.classList.remove("portfolio-tabs__item--visible")
      el.classList.remove("portfolio-tabs__item--visible-more")
    })
  }
}

portfolioTabsNav.addEventListener("click", (e) => {
  const target = e.target

  if (target.classList.contains("portfolio-tabs-nav__btn")) {

    const path = target.dataset.path

    portfolioTabsBtns.forEach(el => {
      el.classList.remove("portfolio-tabs-nav__btn--active")
    })

    target.classList.add("portfolio-tabs-nav__btn--active")


    portfolioTabsItem.forEach(el => {
      el.classList.remove("portfolio-tabs__item--visible")
      el.classList.remove("portfolio-tabs__item--visible-more")
    })


    document.querySelectorAll(`[data-target="${path}"]`).forEach(el => {
      el.closest(".portfolio-tabs__item").classList.add("portfolio-tabs__item--visible")
    })

    isLoadMoreNeeded(document.querySelectorAll(`[data-target="${path}"]`))
    hideMoreItems(document.querySelectorAll(".portfolio-tabs__item--visible"))

    if (path == "all") {
      portfolioTabsItem.forEach(el => {
        el.classList.add("portfolio-tabs__item--visible")
      })
      isLoadMoreNeeded(document.querySelectorAll(".portfolio-tabs__item--visible"))
      hideMoreItems(document.querySelectorAll(".portfolio-tabs__item--visible"))
    }
  }
})

hideMoreItems(portfolioTabsItem)
isLoadMoreNeeded(portfolioTabsItemVisible)

loadMore.addEventListener("click", (e) => {
  const visibleItems = document.querySelectorAll(".portfolio-tabs__item--visible")

  const path = document.querySelector(".portfolio-tabs-nav__btn--active").dataset.path

  if (path == "all") {
    portfolioTabsItem.forEach(el => {
      el.classList.add("portfolio-tabs__item--visible-more")
      loadMore.style.display = "none"
    })
  } else {
    document.querySelectorAll(`[data-target="${path}"]`).forEach(el => {
      el.closest(".portfolio-tabs__item").classList.add("portfolio-tabs__item--visible-more")
    })
    loadMore.style.display = "none"
  }
})