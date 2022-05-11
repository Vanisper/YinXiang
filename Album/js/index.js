import getUrlParam from './tools/getUrlParam.js'
import axios from './tools/axios.js'
const createApp = Vue.createApp
const computed = Vue.computed
const onMounted = Vue.onMounted
const ref = Vue.ref

const app = createApp({
  template: '#template',
  setup() {
    document.body.style.backgroundColor = 'rgb(231, 76, 60)'
    const queryList = [
      {
        type: 'yw',
        name: '印物',
        covers: './img/kinds/yw/cover/cover.json',
        images: './img/kinds/yw/content/content.json',
        bgm: './bgm/fenlie.mp3',
        desc:
          '每到开学，提着大包小包的人群就像海水一样，来自各地，汇入校园。五颜六色的包和行李，把空阔的湖南工业大学校门填得密密麻麻。<br />在返校或是报到的每一个人的包里都装着他们提前准备好的物品————通知书、充电宝、旅行枕、电脑、漫画、玩偶、专辑......<br />成千上万各异的物品，塞满了成千上万奇妙的包。<br />大家充满了个性化与神秘感的包里，都会装些什么呢？印物栏目准备了九个来自“包"材学院的包，来翻翻看吧！',
      },
      {
        type: 'ysh',
        name: '印生活',
        covers: './img/kinds/ysh/cover/cover.json',
        images: './img/kinds/ysh/content/content.json',
        bgm: './bgm/dwd.mp3',
        desc:
          '世界上只有一种真正的英雄主义，那就是看清生活的真相之后，依然热爱生活。',
      },
      {
        type: 'yj',
        name: '印景',
        covers: './img/kinds/yj/cover/cover.json',
        images: './img/kinds/yj/content/content.json',
        bgm: './bgm/willow.mp3',
        desc: 'Beauty of Nature',
      },
      {
        type: 'yp',
        name: '印品',
        covers: './img/kinds/yp/cover/cover.json',
        images: './img/kinds/yp/content/content.json',
        bgm: './bgm/jealousy,jealousy.mp3',
        desc:
          '在印刷中，印品指的是印刷的各种产品，是使用印刷技术生产的各种成品的总称。<br />在印像里，印品则是指拍摄得很满意的一些作品。<br />在这个栏目里，所有作品都由编者拍摄，是我们在大三这个年龄，从外至内用镜头看到的最真实的生活，我们对摄影、对这个五彩斑斓的世界最真切的感受与认识。',
      },
      {
        type: 'yr',
        name: '印人',
        covers: './img/kinds/yr/cover/cover.json',
        images: './img/kinds/yr/content/content.json',
        bgm: './bgm/oblivion.mp3',
        desc:
          '印像是大家包里的奇妙小物品，是生活中的温暖点滴，是身边的美好风景，是我们自己拍摄出的一幅幅作品，但印像最重要的还是我们以及身边的人。无论是高年级还是低年级；无论是老师、同学还是身边最亲近的朋友们，都应该是印像最值得记录的内容，因为正是有这些人在，印刷系这个名称才充满了活力<br />经历了身外之物之景，到自身内的喜好想法的旅途，印像得到落脚点最终还是决定回到了身外的一个个印刷人上。因为当时我们身处在这个系的大整体里时，内与外也都变得差别不大了。无论是身外之物，还是自身的思想，都变成我们对大学的印像。',
      },
    ]
    const pageDesc = ref('')
    const sUrl = window.location.href
    let type = ref(getUrlParam(sUrl, 'type'))
    let coversUrl = ref('')
    let imagesUrl = ref('')
    let covers = ref([])
    let images = ref([])
    let music = ref('')
    queryList.forEach((item, index) => {
      if (item.type == type.value) {
        type.value = item.name
        document.title += ' | ' + type.value
        coversUrl.value = item.covers
        imagesUrl.value = item.images
        pageDesc.value = item.desc
        music.value = item.bgm
      }
    })

    axios(coversUrl.value).then(({ data }) => {
      covers.value = data
    })
    axios(imagesUrl.value).then(({ data }) => {
      images.value = data
      window.imgObjArr = images.value
    })
    let isPlay = ref(false)
    let currentTime = ref(0)
    let currentProgress = ref(0)
    const onTimeupdate = ({ target }) => {
      currentTime.value = target.currentTime
      currentProgress.value = (100 * currentTime.value) / target.duration
    }
    const onPlay = () => {
      console.log('play')
    }
    const onPause = () => {
      console.log('pause')
    }
    return {
      type,
      images,
      covers,
      pageDesc,
      music,
      isPlay,
      currentProgress,
      onTimeupdate,
      onPlay,
      onPause,
      playMusic() {
        isPlay.value = !isPlay.value
        if (document.querySelector('#audio').paused) {
          document.querySelector('#audio').play()
        } else {
          document.querySelector('#audio').pause()
        }
      },
    }
  },
})

app.mount('#app')
