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
    }
    this.movie = {
      source: new (require('./Request/Movie/Source').default),
    }
    this.anime = {
      source: new (require('./Request/Anime/Source').default),
    }
    this.veriety = {
      source: new (require('./Request/Veriety/Source').default),
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
