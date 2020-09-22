// 封装本地存储
// 取数据
export const getItem = name => {
  const data = localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
// 存数据
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(name, value)
}
// 删数据
export const removeItem = name => {
  localStorage.removeItem(name)
}
