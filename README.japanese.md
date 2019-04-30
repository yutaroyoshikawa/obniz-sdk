# obniz-sdk [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Actions Status](https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/badge/yutaroyoshikawa/obniz-sdk)](https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/results/yutaroyoshikawa/obniz-sdk)

obniz-sdkはES6やTypeScriptでのobniz操作を可能にするSDKです。これは非公式パッケージであり、公式のobnizのsdkとは一切関係ありません。

## はじめる - ***obniz.connect()***

obniz-sdkを使ってobnizに接続するには下記のようにします。

```TypeScript
import ObnizSDK from 'obniz-sdk'

const obniz = new ObnizSDK('0000-0000')

obniz
  .connect()
  .then(() => console.log('connected'))
  .catch(e => console.log(e))
```

インスタンスを生成するときの引数に任意のobniz idを入力してください。

## 接続解除 - ***obniz.disconnect()***

obniz-sdkを使って接続されたobnizを切断するには下記のようにします。

```TypeScript
import ObnizSDK from 'obniz-sdk'

const obniz = new ObnizSDK('0000-0000')

obniz
  .connect()
  .then(() => {
    obniz
      .disconnect()
      .then(() => console.log('disconnected'))
      .catch(e => console.log(e))
  })
  .catch(e => console.log(e))
```

または

```TypeScript
import ObnizSDK from 'obniz-sdk'

const obniz = new ObnizSDK('0000-0000')

const init = async () => {
  await obniz.connect()
  await obniz.disconnected()
}

init()
  .then(() => console.log('disconnected'))
  .catch(e => console.log(e))
```

## 接続状態確認 - ***obniz.isConnecting***

任意のobnizとの接続状態を確認するには下記のようにします。

```TypeScript
import ObnizSDK from 'obniz-sdk'

const obniz = new ObnizSDK('0000-0000')

const init = async () => {
  console.log(obniz.isConnecting.toString()) /* false */
  await obniz.connect()
}

init()
  .then(() => console.log(obniz.isConnecting.toString()) /* true */
  .catch(e => console.log(e))
```