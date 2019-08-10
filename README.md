# <p align="center"> Tomodachi </p>
<p align="center">
  <img alt="UI GIF" src="https://i.imgur.com/iwWOtYs.gif"> 
    <a href="https://play.google.com/store/apps/details?id=com.speks.nazar" target="_blank"><img src="http://i.imgur.com/D5B4zOT.png" height="75"/></a>
</p>

</p>
<p align="center">For more refer to <a href="https://link.medium.com/Ka24DtaDQY" target="_blank">Medium Article, </a><a href="https://tomodachi977.herokuapp.com" target="_blank">Heroku, </a><a href="https://drive.google.com/file/d/1vKTbBZGRYNouZ9nkIeMz6yzbNjcXGBfR/view" target="_blank">Android APK </a></p>

> Alpha release

## About

This is a dummy application built using Node, React and Postgres with addition of React-Native to the system. The end-goal is to allow user to enter Contacts of their friend circle after Logging in with Facebook with basic features to edit and delete them.

## Table of content

- [About](#about)
- [Installation](#installation)
- [Contributing](#contributing)
- [Links and References](#references)
- [Author](#author)
- [Licensing](#licensing)

## Installation

**Clone the source locally:**

```
$ git clone https://github.com/aryaminus/tomodachi
$ cd tomodachi
```

**Install required node dependencies:**

```
$ yarn && cd client && yarn && cd ../react-native-app && yarn && cd ..
```

## React JS

**Open in development mode:**

```
$ yarn dev
```

**Open in development mode with prod build:**

```
$ NODE_ENV=production yarn dev:server
```

## React-Native

**Start react-native server:**

```
$ cd react-native-app
$ yarn start
```

**Development build of react-native:**

```
$ react-native run-android
$ react-native run-ios
```

## Contributing

1. Fork it (<https://github.com/aryaminus/tomodachi/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## References

- <a href="https://github.com/esausilva/example-create-react-app-express" target="_blank">Connecting React and Node concurrently</a>
- <a href="https://github.com/alien35/social-auth-example" target="_blank">Usage of Passport for Facebook Login after react callback</a>
- <a href="https://scotch.io/tutorials/authenticate-a-node-es6-api-with-json-web-tokens" target="_blank">Authenticate API with JWT</a>
- <a href="https://www.wlaurance.com/2018/09/how-to-install-postgresql-for-mac-for-node/" target="_blank">Setting up Postgresql for Mac</a>
- <a href="https://datazenit.com/heroku-data-explorer.html?tp=hde#/" target="_blank">Heroku Data Explorer</a>
- <a href="https://blog.hailstone.io/how-to-prevent-sql-injection-nodejs/" target="_blank">SQL Injection Protection</a>

## Author

<a href="https://github.com/aryaminus" target="_blank">©Sunim Acharya</a>

## Licensing

The code in this project is licensed under GNU GPLv3 license.
