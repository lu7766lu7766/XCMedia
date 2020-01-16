import BaseRequest from 'lib/Request/BaseRequest'
import _config from './config'

export default class CompanyExchange extends BaseRequest
{
  get baseUrls()
  {
    return super.baseUrls.concat('/company_exchange/manage')
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

  async doUpdate(data, options)
  {
    return await this.request('update', data, options)
  }
}
