import env from 'src/../env'
import hosts from 'config/hosts'

export default class API
{
  constructor()
  {
    this.user = {
      passport: new (require('./Request/User/Passport').default),
      pilot: new (require('./Request/User/Pilot').default),
    }
    this.system = {
      manage: new (require('./Request/System/Manage').default),
      role: new (require('./Request/System/Role').default),
      site: new (require('./Request/System/Site').default),
    }
    this.website = {
      announce: new (require('./Request/Website/Announce').default),
      page: new (require('./Request/Website/Page').default),
      adslider: new (require('./Request/Website/ADSlider').default),
      qa: new (require('./Request/Website/QA').default),
    }
    this.drama = {
      source: new (require('./Request/Drama/Source').default),
      type: new (require('./Request/Drama/Type').default),
      lang: new (require('./Request/Drama/Lang').default),
      year: new (require('./Request/Drama/Year').default),
      area: new (require('./Request/Drama/Area').default),
      manage: new (require('./Request/Drama/Manage').default),
      episode: new (require('./Request/Drama/Episode').default),
      topic_ype: new (require('./Request/Drama/TopicType').default),
    }
    this.movie = {
      source: new (require('./Request/Movie/Source').default),
      type: new (require('./Request/Movie/Type').default),
      lang: new (require('./Request/Movie/Lang').default),
      year: new (require('./Request/Movie/Year').default),
      area: new (require('./Request/Movie/Area').default),
      topic_ype: new (require('./Request/Movie/TopicType').default),
    }
    this.anime = {
      source: new (require('./Request/Anime/Source').default),
      type: new (require('./Request/Anime/Type').default),
      lang: new (require('./Request/Anime/Lang').default),
      year: new (require('./Request/Anime/Year').default),
      area: new (require('./Request/Anime/Area').default),
      topic_ype: new (require('./Request/Anime/TopicType').default),
    }
    this.variety = {
      source: new (require('./Request/Variety/Source').default),
      type: new (require('./Request/Variety/Type').default),
      lang: new (require('./Request/Variety/Lang').default),
      year: new (require('./Request/Variety/Year').default),
      area: new (require('./Request/Variety/Area').default),
      topic_ype: new (require('./Request/Variety/TopicType').default),
    }
    this.av_long = {
      type: new (require('./Request/AVLong/Type').default),
      cup: new (require('./Request/AVLong/Cup').default),
      year: new (require('./Request/AVLong/Year').default),
      cup: new (require('./Request/AVLong/Cup').default),
      area: new (require('./Request/AVLong/Area').default),
      actress: new (require('./Request/AVLong/Actress').default),
      topic_ype: new (require('./Request/AVLong/TopicType').default),
    }
    this.av_short = {
      type: new (require('./Request/AVShort/Type').default),
      cup: new (require('./Request/AVShort/Cup').default),
      year: new (require('./Request/AVShort/Year').default),
      cup: new (require('./Request/AVShort/Cup').default),
      area: new (require('./Request/AVShort/Area').default),
      actress: new (require('./Request/AVShort/Actress').default),
      topic_ype: new (require('./Request/AVShort/TopicType').default),
    }
    this.av_selfie = {
      type: new (require('./Request/AVSelfie/Type').default),
      cup: new (require('./Request/AVSelfie/Cup').default),
      year: new (require('./Request/AVSelfie/Year').default),
      cup: new (require('./Request/AVSelfie/Cup').default),
      area: new (require('./Request/AVSelfie/Area').default),
      actress: new (require('./Request/AVSelfie/Actress').default),
      topic_ype: new (require('./Request/AVSelfie/TopicType').default),
    }
    this.adult_photo = {
      type: new (require('./Request/AdultPhoto/Type').default),
      cup: new (require('./Request/AdultPhoto/Cup').default),
      year: new (require('./Request/AdultPhoto/Year').default),
      cup: new (require('./Request/AdultPhoto/Cup').default),
      area: new (require('./Request/AdultPhoto/Area').default),
      actress: new (require('./Request/AdultPhoto/Actress').default),
      topic_ype: new (require('./Request/AdultPhoto/TopicType').default),
    }
    this.av = {
      type: new (require('./Request/AV/Type').default),
      cup: new (require('./Request/AV/Cup').default),
      year: new (require('./Request/AV/Year').default),
      cup: new (require('./Request/AV/Cup').default),
      area: new (require('./Request/AV/Area').default),
      actress: new (require('./Request/AV/Actress').default),
      topic_ype: new (require('./Request/AV/TopicType').default),
    }
    this.adult_comic = {
      type: new (require('./Request/AdultComic/Type').default),
      year: new (require('./Request/AdultComic/Year').default),
      area: new (require('./Request/AdultComic/Area').default),
      topic_ype: new (require('./Request/AdultComic/TopicType').default),
    }
    this.adult_literature = {
      type: new (require('./Request/AdultLiterature/Type').default),
      year: new (require('./Request/AdultLiterature/Year').default),
      area: new (require('./Request/AdultLiterature/Area').default),
      topic_ype: new (require('./Request/AdultLiterature/TopicType').default),
    }
    this.adult_story = {
      type: new (require('./Request/AdultStory/Type').default),
      year: new (require('./Request/AdultStory/Year').default),
      area: new (require('./Request/AdultStory/Area').default),
      topic_ype: new (require('./Request/AdultStory/TopicType').default),
    }
    this.history = {
      account: new (require('./Request/History/Account').default),
      member: new (require('./Request/History/Member').default),
    }
    this.member = {
      manage: new (require('./Request/Member/Manage').default),
    }
  }

  static get hosts()
  {
    return hosts
  }

  static get target()
  {
    let target = env.target
    const host = location.host.split('.').splice(1).join('.')
    if (!host) return target
    Object.keys(this.hosts).forEach(key =>
    {
      target = hosts[key].host === host
        ? key
        : target
    })
    return target
  }

  static get host()
  {

    return '//' + [this.hosts[this.target].prefix, this.hosts[this.target].host].join('.')
  }

  static async getPassport()
  {
    const res = await axios.create({baseURL: '/'}).get('/resource/config/passport.json')
    return res.data[this.target]
  }
}
