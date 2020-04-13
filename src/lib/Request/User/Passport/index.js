import BaseRequest from 'lib/Request/BaseRequest'
import _config from './config'

export default class Request extends BaseRequest {
  get baseUrls () {
    return super.baseUrls.concat('/passport')
  }

  constructor () {
    super()
    this.config = _config
  }

  async doLogin (data, options) {
    return await this.filterRequest('login', data, options)
  }

  async doGenerate (data, options) {
    return await this.filterRequest('generate', data, options)
  }
}
