# Conqueso - JavaScript Client #
Client library in JavaScript for consuming properties set in the Conqueso server.

### Usage

```javascript
var conqueso = new Conqueso('https://127.0.0.1');
conqueso.getProperties('global').then(function(properties){
    var propertyValueA = properties.getProperty('property.name.a');
        propertyValueB = properties.getProperty('property.name.b', defaultValue);
}
```

### Building / Contributing

The JavaScript Conqueso Client is built via grunt.  The default grunt command will automatically run the test suite.
Tests are BDD, built on top of the Mocha/Chai/Chai-as-promised framework.

https://mochajs.org/

http://chaijs.com/

https://github.com/domenic/chai-as-promised/

#### Install node

https://nodejs.org/en/download/

#### Install Grunt
```
sudo npm install -g grunt-cli
```

#### Install NPM dependencies
```
npm install
```

#### Build and test
```
grunt
```
