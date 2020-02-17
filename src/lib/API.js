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
      year: new (require('./Request/Drama/Year').default),
    }
    this.movie = {
      source: new (require('./Request/Movie/Source').default),
      type: new (require('./Request/Movie/Type').default),
      year: new (require('./Request/Movie/Year').default),
    }
    this.anime = {
      source: new (require('./Request/Anime/Source').default),
      type: new (require('./Request/Anime/Type').default),
      year: new (require('./Request/Anime/Year').default),
    }
    this.variety = {
      source: new (require('./Request/Variety/Source').default),
      type: new (require('./Request/Variety/Type').default),
      year: new (require('./Request/Variety/Year').default),
    }
    this.av_long = {
      type: new (require('./Request/AVLong/Type').default),
      year: new (require('./Request/AVLong/Year').default),
    }
    this.av_short = {
      type: new (require('./Request/AVShort/Type').default),
      year: new (require('./Request/AVShort/Year').default),
    }
    this.av_selfie = {
      type: new (require('./Request/AVSelfie/Type').default),
      year: new (require('./Request/AVSelfie/Year').default),
    }
    this.adult_photo = {
      type: new (require('./Request/AdultPhoto/Type').default),
      year: new (require('./Request/AdultPhoto/Year').default),
    }
    this.av = {
      type: new (require('./Request/AV/Type').default),
      year: new (require('./Request/AV/Year').default),
    }
    this.adult_comic = {
      type: new (require('./Request/AdultComic/Type').default),
      year: new (require('./Request/AdultComic/Year').default),
    }
    this.adult_literature = {
      type: new (require('./Request/AdultLiterature/Type').default),
      year: new (require('./Request/AdultLiterature/Year').default),
    }
    this.adult_story = {
      type: new (require('./Request/AdultStory/Type').default),
      year: new (require('./Request/AdultStory/Year').default),
    }
    this.history = {
      account: new (require('./Request/History/Account').default),
    }
    this.member = {
      manage: new (require('./Request/Member/Manage').default)
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
