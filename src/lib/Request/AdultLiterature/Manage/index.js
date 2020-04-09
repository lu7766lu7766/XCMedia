import BaseRequest from 'lib/Request/BaseRequest'
import _config from './config'

export default class Request extends BaseRequest {
  get baseUrls () {
    return super.baseUrls.concat('literature/manage')
  }

  constructor () {
    super()
    this.config = _config
  }

  async getList (data, options) {
    return await this.filterRequest('list', data, options)
  }

  async getTotal (data, options) {
    return await this.filterRequest('total', data, options)
  }

  async doCreate (data, options) {
    return await this.filterRequest('create', data, options)
  }

  async doUpdate (data, options) {
    return await this.filterRequest('update', data, options)
  }

  async doDelete (data, options) {
    return await this.filterRequest('delete', data, options)
  }

  async doUploadPic (data, options) {
    return await this.filterRequest('uploadPic', data, options)
  }

  async getAreas (data, options) {
    return await this.filterRequest('area', data, options)
  }

  async getYears (data, options) {
    return await this.filterRequest('year', data, options)
  }

  async getTypes (data, options) {
    return await this.filterRequest('type', data, options)
  }
}
