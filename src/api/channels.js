import request from '@/utils/require.js'

export const getAllChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/channels'
  })
}
export const getAddChannels = channel => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

export const getDeleteChannels = channelId => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
