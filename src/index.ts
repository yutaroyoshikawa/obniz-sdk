import Methods from './methods'

class ObnizSdk extends Methods {
  static socket: null | WebSocket
  static isConnected: boolean
  private host: string
  private id: string

  constructor(id: string) {
    super()
    this.host = 'wss://obniz.io'
    ObnizSdk.socket = null
    ObnizSdk.isConnected = false
    this.id = id
  }

  get isConnecting(): boolean {
    return ObnizSdk.isConnected
  }

  private initialConnect = () =>
    new Promise((resolve, reject) => {
      ObnizSdk.socket = new WebSocket(`${this.host}/obniz/${this.id}/ws/1`)
      try {
        ObnizSdk.socket.onmessage = event =>
          JSON.parse(event.data).map((data: any) => {
            if (data.ws && data.ws.redirect && ObnizSdk.socket) {
              this.host = data.ws.redirect
              ObnizSdk.socket.onmessage = null
              ObnizSdk.socket.close()
              resolve()
            }
            reject('Initial connect')
          })
      } catch (e) {
        reject(e)
      }
    })

  private reconnect = () =>
    new Promise((resolve, reject) => {
      ObnizSdk.socket = new WebSocket(`${this.host}/obniz/${this.id}/ws/1`)
      try {
        ObnizSdk.socket.onmessage = event =>
          JSON.parse(event.data).map((data: any) => {
            if (data.ws && data.ws.ready) {
              resolve()
            }
            reject('Initial reconnect')
          })
      } catch (e) {
        reject(e)
      }
    })

  public connect = async () => {
    try {
      await this.initialConnect()
      await this.reconnect()
      ObnizSdk.isConnected = true
    } catch (e) {
      throw Error(e)
    }
  }

  public disConnect = () =>
    new Promise((resolve, reject) => {
      if (ObnizSdk.socket) {
        try {
          ObnizSdk.socket.onmessage = null
          ObnizSdk.socket.close()
          ObnizSdk.socket = null
          ObnizSdk.isConnected = false
          resolve()
        } catch (e) {
          reject(e)
        }
      } else {
        reject('Does not connecting yet.')
      }
    })
}

export default ObnizSdk
