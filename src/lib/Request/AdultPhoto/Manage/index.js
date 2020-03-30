import BaseRequest from 'lib/Request/BaseRequest'
import _config from './config'

export default class Request extends BaseRequest
{
  get baseUrls()
  {
    return super.baseUrls.concat('manage/photograph')
  }

  constructor()
  {
    super()
    this.config = _config
  }

  async getList(data, options)
  {
    return await this.request('list', data, options)
  }

  async getTotal(data, options)
  {
    return await this.request('total', data, options)
  }

  async doCreate(data, options)
  {
    return await this.request('create', data, options)
  }

  async doUpdate(data, options)
  {
    return await this.request('update', data, options)
  }

  async getInfo(data, options)
  {
    return await this.request('info', data, options)
  }

  async doDelete(data, options)
  {
    return await this.request('delete', data, options)
  }

  async getAreas(data, options) {
    return await this.request('area', data, options)
  }

  async getYears(data, options) {
    return await this.request('year', data, options)
  }

  async getTypes(data, options) {
    return await this.request('type', data, options)
  }

  async getActress(data, options) {
    return await this.request('actress', data, options)
  }

  async getCups(data, options) {
    return await this.request('cup', data, options)
  }

  async getStatus(data, options) {
    return await this.request('status', data, options)
  }
}
