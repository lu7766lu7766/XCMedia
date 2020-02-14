import BaseRequest from 'lib/Request/BaseRequest'
import _config from './config'

export default class Request extends BaseRequest
{
  get baseUrls()
  {
    return super.baseUrls.concat('layout/manage')
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

  async getBranchs(data, options)
  {
    return await this.request('branch', data, options)
  }

  async doCreate(data, options)
  {
    return await this.request('create', data, options)
  }

  async doUpdate(data, options)
  {
    return await this.request('update', data, options)
  }

  async doDelete(data, options)
  {
    return await this.request('delete', data, options)
  }

  async doUploadPic(data, options)
  {
    return await this.request('uploadPic', data, options)
  }

  async doDeletePic(data, options)
  {
    return await this.request('deketePic', data, options)
  }
}
