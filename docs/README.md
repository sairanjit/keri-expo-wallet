# keri-expo-wallet

Steps

1. Add `react-native-libsodium` to the project

```bash
pnpm add react-native-libsodium
```

2. update `app.json` with `react-native-libsodium` plugin

```json
{
  "expo": {
    "plugins": [["react-native-libsodium", {}]]
  }
}
```

3. Add `signify-ts` to the project

```bash
pnpm add signify-ts

or

pnpm add signify-ts@github:sairanjit/signify-ts#bb6d50c01f87d862fab6254e90adf445cdb923fc
```

4. Add `shim.js` to the project

5. Add `globals.js` to the project

```js
global.TextEncoder = require("text-encoding").TextEncoder
```

6. Add `package.json` scripts

```json
{
  "scripts": {
    "postinstall": "npx rn-nodeify --install crypto,process,stream,events,module,util --hack"
  }
}
```

7.
