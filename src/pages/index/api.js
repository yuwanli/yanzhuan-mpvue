import {ajax} from 'src/utils/ajax'

export const getIndexList = (hideLoading) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'good/recommend',
      method: 'POST',
      query: {
        page: 1,
        num: 10
      },
      hideLoading
    }).then(res => {
      resolve(res)
    })
  })
}
