import Obniz from '../src/index'

describe('Obniz', () => {
  describe('connecting', () => {
    test('disconnect', () => {
      const obniz = new Obniz('0000-0000')
      obniz
        .connect()
        .then(() => {
          console.log(obniz.isConnecting.toString())
          expect(obniz.isConnecting).toBe(true)
          obniz
            .disConnect()
            .then(() => expect(obniz.isConnecting).toBe(false))
            .catch(e => {
              throw Error(e)
            })
        })
        .catch(e => {
          throw Error(e)
        })
    })
  })
})
