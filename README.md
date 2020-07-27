# nextjs-boilerplate

## Stack

- Firebase Authentication
- react-firebase-hooks
- Graphql Codegen
- react-apollo hooks
- vercel function

Auth on client and validate it on server.(on Graphql)

## Setup

- Create your firebase project
- Get your firebase settings and put `src/config/firebaseConfig.json`
- Activate your auth provider [Firebase Authentication](https://firebase.google.com/docs/auth?hl=ja)
- Create admin config and put `src/config/firebaseAdminConfig.json`
  - Firebase Console => Settings => ServiceAccount => Generate key
  - https://firebase.google.com/docs/admin/setup

## Develop

```bash
yarn install
yarn codegen # gen code
yarn vdev # run as `vercel dev` to pass vercel.json rewrites

# graphql playground
# open http://localhost:3000/api/graphql
```

## LICENSE

MIT
