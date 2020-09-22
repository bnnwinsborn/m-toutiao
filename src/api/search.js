import request from '@/utils/require'

// 请求频道数据
export const getOptions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
