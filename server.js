/**
 * This file provided by Facebook is for non-commercial testing and evaluation purposes only.
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/cyberbullying_data.json', function(req, res) {
  fs.readFile('data/cyberbullying_data.json', function(err, data) {
    console.log(data);
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/results.json', function(req, res) {
  fs.readFile('data/results.json', function(err, data) {
    var data = JSON.parse(data);
    var answer = req.body;
    var ind = data[answer.num];
    console.log(answer.question1)
    if(answer.question1 == 1)
      ind.yes1 = ind.yes1 + 1;
    else 
      ind.no1 = ind.no1 + 1;

    if(answer.question2 == 1 )
      ind.yes2 = ind.yes2 + 1;
    else 
      ind.no2 = ind.no2 + 1;

    fs.writeFile('data/results.json',  JSON.stringify(data), function(err) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-cache');
      res.send(JSON.stringify(data))
    });
  });
});

var server = app.listen(process.env.PORT || 3000, function() {

    var host = server.address().address
    var port = server.address().port

    console.log('App listening at http://%s:%s', host, port)
})
