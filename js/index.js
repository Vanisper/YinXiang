// ;(function name(params) {
//   let yjDom = document.querySelector('.yj')
//     alert(yjDom)
// })()

// 页面包含图片等非文字媒体文件在内的所有元素都加载完成
window.onload = function () {
  listenInit()
}
function listenInit() {
  //   let albumDom = document.querySelector('.Album')
  //   let flimDom = document.querySelector('.PicFilm')
  //   let ebookDom = document.querySelector('.E-Book')

  //   albumDom.onclick = function () {
  //     flimDom.style.display = 'none'
  //     ebookDom.style.display = 'none'
  //   }
  let mainDom = document.getElementById('main')
  let mainChildren = mainDom.children
  let mainChildrenCount = mainDom.childElementCount
  let footerDom = document.getElementsByTagName('footer')[0]
  let logoBoxDom = document.getElementById('logo')
  let logoADom = document.querySelector('#logo a')
  let logoImgDom = document.querySelectorAll('#logo a img')
  let themeColor = [
    {
      backgroundColor: '#e74c3c',
      borderBottom: '2px #badc58 dashed',
    },
    {
      backgroundColor: '#9b59b6',
      borderBottom: '2px #95afc0 dashed',
    },
    {
      backgroundColor: '#319c16',
      borderBottom: '2px #ff7979 dashed',
    },
  ]
  document.querySelector('video').oncontextmenu = function () {
    return false
  }
  document.querySelector('video').onclick = function () {
    if (document.querySelector('video').paused) {
      document.querySelector('video').play()
    } else {
      document.querySelector('video').pause()
    }
  }
  for (let itemIndex in mainDom.children) {
    mainDom.children[itemIndex].onclick = function () {
      // 注销点击事件
      this.onclick = null
      // 滚动一下滚动条
      window.scrollTo({ top: 0, behavior: 'smooth' })
      /**
       * 添加自定义属性active 以标识
       * 给他的伪类添加监听事件
       */
      let time3 = setTimeout(() => {
        clearTimeout(time3)
        this.setAttribute('active', '')
        this.style.pointerEvents = 'none'
        this.onclick = () => {
          window.scrollTo({ top: 300, behavior: 'smooth' })
        }
      }, 1000)
      window.onscroll = function () {
        // window.onscroll = null
        //变量t是滚动条滚动时，距离顶部的距离
        let t = document.documentElement.scrollTop || document.body.scrollTop
        let ch = document.documentElement.clientHeight //可视区域高度
        let cw = document.documentElement.clientWidth //可视区域宽度
        if (t >= ch / 3) {
          this.removeAttribute('active')
        } else {
          this.setAttribute('active', '')
        }
      }.bind(this)

      // 隐藏footer
      footerDom.style.display = 'none'
      // 获取当前元素的当前尺寸、位置信息
      let thisRectInfos = this.getBoundingClientRect()
      // logo样式
      logoADom.style.marginLeft = 'auto'
      logoImgDom[0].style.height = '35px'
      logoImgDom[1].style.height = '35px'
      logoImgDom[0].parentElement.style.height = '35px'

      setTimeout(() => {
        // 遍历内部的元素
        for (let index = 0; index < mainChildrenCount; index++) {
          if (index != itemIndex) {
            // 将其他元素隐藏
            mainDom.children[index].style.opacity = 0
            mainDom.children[index].style.width = 0
            // （这里开启延迟可以有过渡效果，但是会有卡顿感受）
            // setTimeout(() => {
            mainDom.children[index].style.display = 'none'
            // }, 350)
          } else {
            document.body.style.backgroundColor =
              themeColor[itemIndex].backgroundColor
            logoBoxDom.style.borderBottom = themeColor[itemIndex].borderBottom
            // 将main前元素修改位置
            mainDom.style.height = 'calc(100vh - 35px - 10px * 2 - 2px)'
            mainDom.style.display = 'block'
            mainDom.style.width = '35vw'
            // 修改图片
            mainDom.style.margin = 0
            this.style.cursor = 'default'
            this.style.opacity = 0
            this.style.margin = '0 auto'
            this.style.position = 'relative'
            this.style.top = '50%'
            this.style.transform = 'translateY(-50%)'
            this.style.width = '100%'
            let time1 = setTimeout(() => {
              clearTimeout(time1)
              this.style.height = '100%'
              this.style.backgroundSize = 'contain'
              this.style.opacity = 1
            }, 1000)

            // 显示对应板块
            const targetCard = document.querySelector(
              `[data-page=${this.className}]`,
            )
            if (targetCard.classList.length == 1) {
              let time2 = setTimeout(() => {
                setTimeout(time2)
                targetCard.className += ' active'
              }, 200)
              // targetCard.parentElement.style.flexGrow = '1'
              targetCard.style.display = 'flex'
              targetCard.style.width = '65vw'
              // 添加监听事件
              let passiveSupported = false
              try {
                let options = Object.defineProperty({}, 'passive', {
                  get: function () {
                    passiveSupported = true
                  },
                })
                window.addEventListener('test', null, options)
              } catch (err) {}
              targetCard.addEventListener(
                'wheel',
                (event) => {
                  //event.preventDefault();
                  if (event['shiftKey'] == false) {
                    let delayed = setTimeout(() => {
                      clearTimeout(delayed)
                      var step = 500
                      if (event.deltaY < 0) {
                        targetCard.scrollLeft -= step
                      } else {
                        targetCard.scrollLeft += step
                      }
                    }, 10)
                  }
                },
                passiveSupported ? { passive: true } : false,
              )
            }
          }
        }
      }, 100)
    }
  }
}
