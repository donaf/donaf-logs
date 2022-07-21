const TokenKey = ''

const getToken = () => {
  return localStorage.getItem(TokenKey)
}

export { getToken }
