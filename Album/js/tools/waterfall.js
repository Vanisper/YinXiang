// 模拟数据类
// class Mock {
//   static _imgObjArr = imgObjArr

//   // 获取图片数据
//   static async getCurrentImgObjPromise(index) {
//     if (index <= Mock._imgObjArr.length - 1) {
//       return Mock._imgObjArr[index]
//     }
//     return null
//   }
// }

// 瀑布流类
class WaterFull {
  constructor(imgObjArr) {
    this._currentIndex = 0
    this._waterfallBox = null
    this._wRowDomObjArr = []
    this._imgDomObjArr = []
    this._minWRowDomObj = null
    this._row = 0
    // onscroll 每次触底触发增加 1
    this._scrollNum = 1
    // 获取图像数据: 如果有传参即获取这个传参,否则获取mook的数据
    this._imgObjArr = imgObjArr
    // 图片路径
    this._imgUrl = `./images/${this._imgObjArr[0]['imgHost']}/`
  }

  // 页面加载完成触发
  onLoad() {
    this._waterfallBox = document.querySelector('.waterfall-box')
    this._setRow()
    this._showCards()
  }

  // 页面大小更改触发
  onResize() {
    this._setRow()
    this._showCards()
  }

  // 滚动条触底触发
  onScroll() {
    // 滚动条触发判断，-10是触底前 10px就触发，也为了避免parseInt可能导致数据不是那么精确，不触发的问题
    if (
      parseInt(
        document.documentElement.clientHeight +
          document.documentElement.scrollTop,
      ) >=
      parseInt(document.documentElement.scrollHeight) - 10
    ) {
      this._scrollNum++
      this._showCards()
    }
  }

  async getCurrentImgObjPromise(index) {
    if (index <= this._imgObjArr.length - 1) {
      return this._imgObjArr[index]
    }
    return null
  }

  // 渲染展示图片
  _showCards() {
    if (this._canDraw()) {
      if (!!this._imgDomObjArr[this._currentIndex]) {
        this._minWRowDomObj.dh += this._imgDomObjArr[
          this._currentIndex
        ].obj.height
        this._minWRowDomObj.dom.appendChild(
          this._imgDomObjArr[this._currentIndex].dom,
        )
        this._currentIndex++
        this._showCards()
        return
      }

      this.getCurrentImgObjPromise(this._currentIndex).then((imgObj) => {
        if (!imgObj) {
          return
        }
        this._imgDomObjArr.push(this._getImgDomObj(imgObj))
        this._minWRowDomObj.dh += imgObj.height
        this._minWRowDomObj.dom.appendChild(
          this._imgDomObjArr[this._currentIndex].dom,
        )
        this._currentIndex++
        this._showCards()
      })
    }
  }

  // 是否还需渲染 card
  _canDraw() {
    this._minWRowDomObj = this._wRowDomObjArr.reduce((accumulator, item) => {
      return accumulator.dh <= item.dh ? accumulator : item
    }, this._wRowDomObjArr[0])
    // 需要达到的高度 h , 才停止新的 card 渲染;
    // 屏幕的高度 * this._scrollNum, 每触发一次增加1屏幕高度的 card
    let h = parseInt(document.documentElement.clientHeight) * this._scrollNum
    if (parseInt(this._minWRowDomObj.dom.offsetHeight) < h) {
      return true
    }
    return false
  }

  // 设置列
  _setRow() {
    let newRow = this._getRow()
    if (this._row !== newRow) {
      this._waterfallBox.innerHTML = ''
      this._currentIndex = 0
      // 当重新设置列数时，可以初始化需渲染的高度或者不初始化
      this._scrollNum = 1
      this._row = newRow
      this._wRowDomObjArr = []
      for (let i = 0; i < this._row; i++) {
        this._wRowDomObjArr[i] = this._getWRowDomObj()
        this._wRowDomObjArr[i].height = 0
        this._waterfallBox.appendChild(this._wRowDomObjArr[i].dom)
      }
    }
  }

  // 获取列数
  _getRow() {
    const w = this._waterfallBox.offsetWidth
    if (w < 520) {
      return 1
    } else if (w < 1050) {
      return 2
    }
    return 3
  }

  // 返回 wRowDomObj
  _getWRowDomObj() {
    return {
      dom: this._getWFRowDom(),
      dh: 0,
    }
  }

  // 返回 imgDomObj
  _getImgDomObj(imgObj) {
    let h = parseInt(
      (imgObj.height / imgObj.width) * this._wRowDomObjArr[0].dom.offsetWidth,
    )
    imgObj.height = h
    return {
      dom: this._getCardDom(imgObj.imgUrl, imgObj.imgName, imgObj.imgDesc, h),
      obj: imgObj,
    }
  }

  // 获取新建的 waterfallRow 节点
  _getWFRowDom() {
    const wFRowDom = document.createElement('div')
    wFRowDom.classList.add('waterfall-row')
    return wFRowDom
  }

  // 获取新建的 card 节点
  _getCardDom(imgUrl, imgName, imgDesc, height) {
    const card = document.createElement('div')
    const aLink = document.createElement('a')
    const img = document.createElement('img')
    card.classList.add('card')
    card.style.height = `${height}px`
    aLink.href = imgUrl
    aLink.setAttribute('data-fancybox', this._imgObjArr[0].imgHost)
    aLink.setAttribute('data-caption', imgDesc == '' ? '文字描述' : imgDesc)
    img.src = imgUrl
    img.alt = ''
    let colorNumArr = []
    for (let i = 0; i < 3; i++) {
      colorNumArr.push(Math.floor(Math.random() * 255))
    }
    img.style.backgroundColor = `rgb(${colorNumArr[0]},${colorNumArr[1]},${colorNumArr[2]})`
    img.onload = () => {
      card.style.height = 'auto'
    }
    card.appendChild(aLink)
    aLink.appendChild(img)
    return card
  }
}
