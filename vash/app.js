var express = require('express'),
    path = require('path'),
    os = require('os'),
    logger = require('morgan'),
    errorHandler = require('errorhandler'),
    markdownServe = require('markdown-serve');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'vash');
app.use(logger('dev'));
app.use(express.static(path.resolve(__dirname, '../common/public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
    app.set('host', 'http://localhost');
}

app.use(markdownServe.middleware({ 
    rootDirectory: path.resolve(__dirname, '../common/data'),
    view: 'markdown'
}));

app.listen(app.get('port'), function(){
    var h = (app.get('host') || os.hostname() || 'unknown') + ':' + app.get('port');
    console.log('Express server listening at ' + h);
});
