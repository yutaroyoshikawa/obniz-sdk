class Methods {
  static socket: null | WebSocket
  static isConnected: boolean

  public helloWorld = () => {
    if (Methods.socket && Methods.isConnected) {
      Methods.socket.send(`
      [
        {
          "display": {
            "clear": true
          }
        },
        {
          "display": {
            "text": "hello world"
          }
        }
      ]
    `)
    } else {
      throw Error('Does not connecting yet.')
    }
  }
}

export default Methods
