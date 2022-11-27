
const path = require('path');

const express = require('express');
const expressHandlebars = require('express-handlebars').engine;

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config.js');

const { routes } = require('../generated/server-routes');
const config = require('../config');
const extname = 'hbs';
const layoutsDir = path.join(__dirname, 'views');
const defaultLayout = 'layout';

const compiler = webpack(webpackConfig);
const app = express();
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./'));
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);

app.get('/', (req, res, next) => {
  app.set('views', layoutsDir);
  app.engine(extname, expressHandlebars({
    layoutsDir,
    extname,
    defaultLayout,
		helpers: {
			scripts() {
				return '';
			},
			styles() {
				return '';
			},
			title() {
				return config.appTitle;
			}
		}
  }));

  res.render('index');
});

routes.forEach((route) => {
	app.get(route.pattern, (req, res, next) => {
		app.set('views', path.join(config.modulesDir, route.moduleName));
		app.engine('hbs', expressHandlebars({
			layoutsDir,
			extname,
			defaultLayout,
      helpers: {
        scripts() {
          return route.clientIndex ? `<script type="text/javascript" src=${route.moduleName}-${route.clientIndex.replace('jsx', 'js')}></script>` : '';
        },
        styles() {
          return route.stylesIndex ? `<script type="text/javascript" src=${route.moduleName}-${route.stylesIndex.replace('less', 'js')}></script>` : '';
        },
        title() {
          return route.title || config.appTitle;
        }
      }
    }));
    route.action(req, res, next);
	});
});

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`);
});