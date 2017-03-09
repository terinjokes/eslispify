# eslispify [![Travis-CI Status](https://img.shields.io/travis/terinjokes/eslispify/master.svg?label=Travis%20CI&style=flat-square)](https://travis-ci.org/terinjokes/eslispify)  [![](https://img.shields.io/npm/dm/eslispify.svg?style=flat-square)](https://www.npmjs.org/package/eslispify) [![](https://img.shields.io/npm/v/eslispify.svg?style=flat-square)](https://www.npmjs.org/package/eslispify) 

[![Greenkeeper badge](https://badges.greenkeeper.io/terinjokes/eslispify.svg)](https://greenkeeper.io/)

> browserify transform for [eslisp](https://www.npmjs.com/package/eslisp)

## Installation

Install package with npm and add it to your development dependencies:

`npm install --save-dev eslispify`

## Usage

* index.esl:

```lisp
; Only include given statement if `$DEBUG` environment variable is set
(macro debug
 (lambda (statement)
  (return (?: (. process env DEBUG)
              statement
              null))))

(var fib ; Fibonacci number sequence
   (lambda (x)
    (debug ((. console log) (+ "resolving number " x)))
    (switch x
     (0 (return 0))
     (1 (return 1))
     (default (return (+ (fib (- x 1)) (fib (- x 2))))))))
```

Then pass the transform when compiling your app:

```sh
$ browserify -t eslispify index.esl > index.js
```

## License
MIT
