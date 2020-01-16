import BaseRequest from 'lib/Request/BaseRequest'
import _config from './config'

export default class AccountManage extends BaseRequest
{
  get baseUrls()
  {
    return super.baseUrls.concat('bank_card/manage')
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

  async getOptions(data, options)
  {
    return await this.request('options', data, options)
  }

  async getCompany(data, options)
  {
    return await this.request('company', data, options)
  }

  async getCurrency(data, options)
  {
    return await this.request('currency', data, options)
  }

  async doCreate(data, options)
  {
    return await this.request('create', data, options)
  }

  async doUpdate(data, options)
  {
    return await this.request('update', data, options)
  }

  async doQuotaUpdate(data, options)
  {
    return await this.request('quotaUpdate', data, options)
  }

  async doDelete(data, options)
  {
    return await this.request('delete', data, options)
  }
}
