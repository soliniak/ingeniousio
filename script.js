const menuBtn = document.querySelector(".toggle__menu"),
      mainMenu = document.querySelector(".main__menu"),
      container = document.querySelector(".container"),
      body = document.querySelector("body"),
      closeMenuBtn = document.querySelector(".close__menu"),
      overlay = document.querySelector(".overlay")

const closeMenu = () => {
      mainMenu.style.transform = "translateX(-100%)"
      mainMenu.setAttribute("aria-hidden", true)
      menuBtn.setAttribute("aria-label", "Open menu")
      menuBtn.setAttribute("aria-expanded", false)
      closeMenuBtn.setAttribute("aria-hidden", true)
      container.style.maxHeight = ""
      container.style.overflow = ""
      overlay.style.display = "none"
}

menuBtn.addEventListener("click", () => {
      if (menuBtn.getAttribute("aria-label") == "Open menu") {
            mainMenu.style.transform = "translateX(0)"
            mainMenu.setAttribute("aria-hidden", false)
            menuBtn.setAttribute("aria-label", "Close menu")
            menuBtn.setAttribute("aria-expanded", true)
            container.style.maxHeight = mainMenu.offsetHeight + "px"
            container.style.overflow = "hidden"
            closeMenuBtn.setAttribute("aria-hidden", false)
            overlay.style.display = "block"
      } else {
            closeMenu()
      }
})

closeMenuBtn.addEventListener("click", () => {
      closeMenu()
})

overlay.addEventListener("click", () => {
      closeMenu()
      overlay.style.display = "none"
})

const select = document.querySelector(".select__active"),
      optionsList = document.querySelector(".options__list"),
      options = document.querySelectorAll(".option"),
      optionLabels = document.querySelectorAll(".option__label"),
      arrow = document.querySelector(".arrow")

const closeSelect = () => {
      select.setAttribute("aria-label", "Open select list")
      select.setAttribute("aria-expanded", false)
      optionsList.style.height = 0
      optionsList.setAttribute("aria-hidden", true)
      optionLabels.forEach(optionLabel => {
            optionLabel.tabIndex = -1
      })
      arrow.style.transform = "rotate(0)"
}

const openSelect = () => {
      select.setAttribute("aria-label", "Close select list")
      select.setAttribute("aria-expanded", true)
      optionsList.style.height = options[0].offsetHeight * options.length + "px"
      optionsList.setAttribute("aria-hidden", false)
      optionLabels.forEach(optionLabel => {
            optionLabel.tabIndex = 0
      })
      arrow.style.transform = "rotate(180deg)"
}

select.addEventListener("click", () => {
      if (select.getAttribute("aria-label") == "Open select list") {
            openSelect()
      } else {
            closeSelect()
      }
})

optionLabels[optionLabels.length - 1].addEventListener("focusout", () => {
      closeSelect()
})

select.addEventListener("keypress", e => {
      if (select.getAttribute("aria-label") == "Open select list" && (e.keyCode === 13 || e.keyCode === 32)) {
            openSelect()
      } else {
            closeSelect()
      }
})

document.addEventListener('click', e => {
      if (select.getAttribute("aria-expanded") === "true" && e.target !== select) {
            closeSelect()
      }
}, true);

const closeSelectAndFocus = () => {
      closeSelect()
      select.focus()
}

options.forEach(option => {
      option.addEventListener("click", e => {
            select.querySelector(".placeholder").innerText = e.target.value
            closeSelectAndFocus()
      })
      option.addEventListener("keypress", e => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                  select.querySelector(".placeholder").innerText = e.target.innerText
                  closeSelectAndFocus()
            }
      })
})

const checkboxes = document.querySelectorAll(".checkbox__container")

checkboxes.forEach(checkbox => {
      checkbox.addEventListener("keypress", e => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                  if (e.target.querySelector(".actual__checkbox").checked == false) {
                        e.target.querySelector(".actual__checkbox").checked = true
                  } else {
                        e.target.querySelector(".actual__checkbox").checked = false
                  }
            }
      })
})

const tabs = document.querySelectorAll(".tab"),
      tables = document.querySelectorAll(".table__container")

tabs.forEach(tab => {
      tab.addEventListener("click", e => {
            tabs.forEach(tab => {
                  tab.classList.remove("tab--active")
            })
            tab.classList.add("tab--active")

            tables.forEach(table => {
                  table.style.transform = "translateY(100%)"
            })
            tables[e.target.dataset.table].style.transform = "translateY(0)"
      })
})

const btnSearch = document.querySelector(".btn__search"),
      searchInput = document.querySelector(".search__input")

let intViewportWidth = window.innerWidth

if (intViewportWidth >= 1300) {
      btnSearch.disabled = true
}

window.addEventListener('resize', () => {
      if (intViewportWidth >= 1300) {
            btnSearch.disabled = true
      } else {
            btnSearch.disabled = false
            searchInput.style.width = "200px"
            searchInput.style.padding = "0 16px"
      }
});

btnSearch.addEventListener("click", () => {
      searchInput.style.width = "200px"
      searchInput.style.padding = "0 16px"
      let idleTimer = setTimeout(() => {
            searchInput.style.width = "0"
            searchInput.style.padding = "0"
      }, 8000)
      searchInput.addEventListener("input", () => {
            clearTimeout(idleTimer)
            idleTimer = setTimeout(() => {
                  searchInput.style.width = "0"
                  searchInput.style.padding = "0"
            }, 8000)
      })
})