import BaseRequest from 'lib/Request/BaseRequest'
import _config from './config'

export default class Request extends BaseRequest {
  get baseUrls () {
    return super.baseUrls.concat('/account/pilot')
  }

  constructor () {
    super()
    this.config = _config
  }

  async getProfile (data, options) {
    return await this.filterRequest('profile', data, options)
  }

  async doUpdate (data, options) {
    return await this.filterRequest('update', data, options)
  }

  async getNodes (data, options) {
    return await this.filterRequest('nodes', data, options)
  }
}
