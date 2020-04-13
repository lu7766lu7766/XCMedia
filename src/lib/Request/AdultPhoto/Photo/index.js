import BaseRequest from 'lib/Request/BaseRequest'
import _config from './config'

export default class Request extends BaseRequest {
  get baseUrls () {
    return super.baseUrls.concat('manage/photograph/photo')
  }

  constructor () {
    super()
    this.config = _config
  }

  async getList (data, options) {
    return await this.filterRequest('list', data, options)
  }

  async doCreate (data, options) {
    return await this.filterRequest('create', data, options)
  }

  async doDelete (data, options) {
    return await this.filterRequest('delete', data, options)
  }
}
