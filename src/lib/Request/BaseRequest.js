import { iBaseRequest } from 'jactools'
import SuccessCodes from 'constants/SuccessCodes'
import ErrorCodes from 'constants/ErrorCodes'
import ErrorMessages from 'constants/ErrorMessages'
import router from 'src/router'
import store from 'src/store'
import API from 'lib/API'
import Vue from 'vue'

export default class BaseRequest extends iBaseRequest
{
  get host()
  {
    return API.host
  }

  get header()
  {
    const access = store.state.Login.access
    return access
      ? {
        Authorization: access.token_type + ' ' + access.access_token,
      }
      : {}
  }

  constructor()
  {
    super({
      SuccessCodes,
      ErrorCodes,
    })
  }

  errorHandle(res, errorMessages)
  {
    const msg = errorMessages.join('\n')
    if (res.status === 401)
    {
      router.replace('login')
    }
    else
    {
      if (res.data.code.indexOf('00001-5') > -1)
      {
        Vue.prototype.$alert.danger(_.map(res.data.data.msg, msg =>
          ErrorMessages[msg]
            ? ErrorMessages[msg]
            : msg,
        ).join('\n'))
      }
      else
      {
        Vue.prototype.$alert.danger(msg
          ? msg
          : '操作失败')
      }
      Vue.prototype.$modal.hide()
    }
    throw {message: msg, ...res}
  }
}