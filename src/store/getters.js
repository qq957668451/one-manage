const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes
}
export default getters
