const type = {
  // mutation
  setNodes: 'Node/setNodes',
  // getters
  menus: 'Node/menus',
  menu: 'Node/menu',
  canRead: 'Node/canRead',
  canCreate: 'Node/canCreate',
  canUpdate: 'Node/canUpdate',
  canDelete: 'Node/canDelete',
  canPermission: 'Node/canPermission',
}

export { type as NodeType }

import RouteConstants from 'constants/Route'
import MenuConstants from 'constants/Menu'

const findNode = (nodes, route) =>
{
  const MenuCode = RouteConstants[route.name]
  const code = MenuConstants[MenuCode]
  return _.find(nodes, {code})
}
const READ_SUFFIX = '_READ'
const CREATE_SUFFIX = '_CREATE'
const UPDATE_SUFFIX = '_UPDATE'
const DELETE_SUFFIX = '_DELETE'

export default {
  namespaced: true,
  state: {
    nodes: null,
  },
  mutations: {
    setNodes(state, context)
    {
      state.nodes = context
    },
  },
  getters: {
    menus: state => _.filter(state.nodes, {display: 'Y', enable: 'Y'}),
    menu: (state, getters) => code => _.find(getters.menus, {code}),
    canRead: (state, getters, rootState) =>
    {
      const res = findNode(state.nodes, rootState.route)
      return res
        ? _.some(res.nodes, {code: res.code + READ_SUFFIX})
        : false
    },
    canCreate: (state, getters, rootState) =>
    {
      const res = findNode(state.nodes, rootState.route)
      return res
        ? _.some(res.nodes, {code: res.code + CREATE_SUFFIX})
        : false
    },
    canUpdate: (state, getters, rootState) =>
    {
      const res = findNode(state.nodes, rootState.route)
      return res
        ? _.some(res.nodes, {code: res.code + UPDATE_SUFFIX})
        : false
    },
    canDelete: (state, getters, rootState) =>
    {
      const res = findNode(state.nodes, rootState.route)
      return res
        ? _.some(res.nodes, {code: res.code + DELETE_SUFFIX})
        : false
    },
    canPermission: (state, getters, rootState) =>
    {
      const res = findNode(state.nodes, rootState.route)
      return res
        ? _.some(res.nodes, {code: 'ROLE_PUBLIC_AUTHORIZATION'})
        : false
    },
  },
}
