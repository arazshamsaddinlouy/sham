window.__DEFAULT_COLLAB_CODE={'SQL':'-- To use your own tables, you can upload a .sql file\n-- in your dashboard under `Customization` in the navigation\n\nSELECT * FROM cb_interviewsample LIMIT 3','PostgreSQL':'-- To use your own tables, you can upload a .sql file\n-- in your dashboard under `Customization` in the navigation\n\nSELECT * FROM cb_interviewsample LIMIT 3','SQLSERVER':'-- To use your own tables, you can upload a .sql file\n-- in your dashboard under `Customization` in the navigation\n\nSELECT * FROM cb_interviewsample_sql_server','Apex':'System.debug(\'Hello world!\');','Bash':'echo "Hello World!"','Plaintext':'Hello world, this is plaintext.','JavaScript':'function foo(param) {\n  return param;\n}\n\nconsole.log(foo(2+2));','Python':'def foo(param):\n  return param\n\nprint foo(2+2)','Python3':'def foo(param):\n  return param\n\nprint(foo(2+2))','Ruby':'def foo(param)\n  return param\nend\n\nputs foo(2+2)','PHP':'<'+'?php\n\nfunction foo($param) {\n  return $param;\n}\n\necho foo(2+2);\n\n?>','Java':'import java.util.*;\nimport java.io.*;\n\nclass Main {\n\n  public static String Foo(String param) {\n    return param;\n  }\n\n  public static void main (String[] args) {\n    System.out.print(Foo("hello"));\n  }\n\n}','Swift':'func foo(_ param: String) -> String {\n  return param\n}\n\nprint(foo("hello"));','Go':'package main\nimport "fmt"\n\nfunc foo(param int) int {\n  return param\n}\n\nfunc main() {\n  fmt.Println(foo(2+2))\n}','Cpp':'#include <iostream>\nusing namespace std;\n\nint foo(int param) {\n  return param;\n}\n\nint main() {\n  cout << foo(2+2);\n  return 0;\n}','Csharp':'using System;\n\nclass MainClass {\n\n  public static int foo(int param) {\n    return param;\n  }\n\n  static void Main() {\n    Console.WriteLine(foo(2+2));\n  }\n\n}','C':'#include <stdio.h>\n\nvoid foo(int num) {\n  printf("%d", num);\n}\n\nint main(void) {\n  foo(2+2);\n  return 0;\n}','Clojure':'(println "Hello World!")','Kotlin':'fun main() {\n  println("Hello World!")\n}','Elixir':'IO.puts 2 + 2','Dart':'void main() {\n  print(2 + 2);\n}','TypeScript':'function foo(param) {\n  return param;\n}\n\nconsole.log(foo(2+2));','Scala':'object Main {\n\n  def main(args: Array[String]) {\n\n    println("Hello world!");\n\n  }\n\n}','R':'print("Hello World!")','Verilog':`module hello;
  initial
    begin
      $display("Hello, World");
      $finish ;
    end
endmodule`,'Rust':'fn main() {\n  println!("Hello World!");\n}','HTML':`<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <title>Editor code</title>
  </head>
  <body>
    <h1></h1>
  </body>
</html>

<script>
  $(document).ready(function () {
    $('h1').text('My title here!');
  });
</script>`,'React':`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);`,'ReactNative':`import { AppRegistry } from "react-native";
import App from "./App";
AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});`,'Angular':`// @ts-ignore
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area',
  template: '<button>ON</button>',
  styles: []
})

export class MainAppComponent implements OnInit {
  // code goes here
  ngOnInit() { 
    
  }
}`,'Vue.js':`<template>
  <div id="app">
    <button>ON</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      items: null
    };
  }
};
</script>`,'Vue3':`<script>
export default {
  props: {
    todo: Object
  }
}
</script>

<template>
  <li>{{ todo.text }}</li>
</template>`,'Webpack':`import $ from 'jquery';
import _ from 'lodash';

const rootApp = document.getElementById("root");
rootApp.innerHTML = 'Hello world!';`,'Svelte':`<script>
  export let name;
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial" target="_blank">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>`,'Flutter':`import 'package:flutter/material.dart';

void main() {
   runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const MyHomePage(title: 'Flutter App'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Button was pressed this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineLarge,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}`,'Django':`#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()`,'Express':`const express = require('express');
const app = require('./src/app.js');

const server = express();
const port = process.env.PORT || 80;
const basePath = process.env.BASE_PATH || '/';

server.use(basePath, app);

/* 
  How to start application
  run \`node index.js\` in the terminal on the right once it loads
*/
server.listen(port, () => {
  console.log('Server listening on port ' + port);
})`,'Laravel':`<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 2000 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).`,'dotNet':`using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddHealthChecks();

// builder.Services.ConfigureHttpJsonOptions(options =>
// {
//     options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
// });

var app = builder.Build();
app.MapHealthChecks("/healthz");

// Set base path for coderbyte backends environment
string pathBase = Environment.GetEnvironmentVariable("BASE_PATH") ?? "/";
app.UsePathBase(pathBase);

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

CancellationTokenSource cancellation = new();
app.Lifetime.ApplicationStopping.Register( () =>
{
    cancellation.Cancel();
});

app.MapGet("/Environment", () =>
{
    return new EnvironmentInfo();
});

// This API demonstrates how to use task cancellation
// to support graceful container shutdown via SIGTERM.
// The method itself is an example and not useful.
app.MapGet("/Delay/{value}", async (int value) =>
{
    try
    {
        await Task.Delay(value, cancellation.Token);
    }
    catch(TaskCanceledException)
    {
    }
    
    return new Operation(value);
});

app.Run();

[JsonSerializable(typeof(EnvironmentInfo))]
[JsonSerializable(typeof(Operation))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{
}

public record struct Operation(int Delay);`,'MongoDB/Node':`const express = require('express')
const app = require('./src/app.js');

const server = express();
const port = process.env.PORT || 80;
const basePath = process.env.BASE_PATH || '/';

const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost/TestDB';
MongoClient.connect(mongoUrl, (err, db) => {
  console.log(err, db);
});

server.use(basePath, app);

server.listen(port, () => {
  console.log('Server listening on port ' + port);
})
`,'RoR':`# This file is used by Rack-based servers to start the application.

require_relative "config/environment"

map ENV["BASE_PATH"] do
  run Rails.application
end

run Rails.application
Rails.application.load_server
`,'Spring':`plugins {
  id 'java'
  id 'org.springframework.boot' version '3.0.1'
  id 'io.spring.dependency-management' version '1.1.0'
}

group = 'com.coderbyte'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
  mavenCentral()
}

dependencies {
  implementation 'org.springframework.boot:spring-boot-starter-web'
  developmentOnly 'org.springframework.boot:spring-boot-devtools'
  testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

tasks.named('test') {
  useJUnitPlatform()
}
`,'Next.js':`/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.BASE_PATH || ''
}

module.exports = nextConfig
  `,'Jupyter':`# Jupyter Notebook is starting...`,'MochaSample-JavaScript':`var calculator = {
  add: function(a, b) {
    return a + b;
  }
};

module.exports = calculator;
  `,'MochaSample-TypeScript':`const calculator = {
  add: function(a, b) {
    return a + b;
  }
};

module.exports = calculator;`,'pytestSample-Python3':`def add(a, b):
  return a + b

def test_answer():
  assert add(3, 2) == 5
`,'PlaywrightSample-TypeScript':`const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});`,'NotebookGrading-Jupyter':`# Jupyter Notebook is starting...`,'NotebookGrading-internal-file':`# This is an internal file that will be hidden from candidates but is required
# to auto-grade solutions provided for custom Jupyter Notebook challenges
# Note: do not rename this file
import pickle
import sys

# read and parse data here
def read_data(expected_output_file, submitted_output_file):
  return ["data", "data"]

# your custom scoring function
def scoring(expected_data, submitted_data):
  if (expected_data == submitted_data):
    return 10
  else:
    return 0

# parse data either from URL or local file
expected_data, submitted_data = read_data(None, None)

# output must be in this exact format in final_score.txt: FINAL_SCORE = <0-10>
final_output = "FINAL_SCORE = " + str(scoring(expected_data, submitted_data))

# write output to file
# Note: do not modify the path of this file
f = open("work/final_score.txt", "w")
f.write(final_output)
f.close()
`,'ReactJestTests-React':`import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
`,'AngularKarmaTests-Angular':`// @ts-ignore
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area',
  template: '<button>ON</button>',
  styles: []
})

export class MainAppComponent implements OnInit {
  // code goes here
  ngOnInit() { 
    
  }
}`,'VueTests-Vue3':`<template>
  <div id="app">
    <p>Welcome to Your Vue.js App</p>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>`,'PHPUnit-PHP':`<?php

declare(strict_types=1);

use PHPUnit\\Framework\\TestCase;

final class MainTest extends TestCase {
  public function testExpectFooActualFoo(): void {
    $this->expectOutputString('foo');
    print 'foo';
  }
  public function testExpectBarActualBaz(): void {
    $this->expectOutputString('hello');
    print 'world';
  }
}

?>
`,'JUnit-Java':`import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;

public class Main {
  public static void main(String[] args) {

    // run tests and count passing/failing
    Result result = JUnitCore.runClasses(TestJunit.class);
    int testsRun = result.getRunCount();
    int testsFailed = result.getFailureCount();

    // optional: print failures
    for (Failure failure: result.getFailures()) {
      System.out.println(failure.toString());
    }

    // REQUIRED
    // these lines are required in order for our system to assign a grade based on the unit tests
    System.out.println("__JUNIT__ TESTS RUN COUNT: " + testsRun);
    System.out.println("__JUNIT__ TESTS FAILURE COUNT: " + testsFailed);
    System.out.println("__JUNIT__ ALL TESTS PASSING: " + result.wasSuccessful());

  }
}`,'JUnit-Kotlin':`import org.junit.runner.JUnitCore
import org.junit.runner.Result
import org.junit.runner.notification.Failure
import java.util.*
import java.io.*

import org.testing.TestJunit

fun main() {
  // run tests and count passing/failing
  val result = JUnitCore.runClasses(TestJunit::class.java)
  val testsRun = result.getRunCount()
  val testsFailed = result.getFailureCount()

  // optional: print failures
  for (failure in result.getFailures()) {
    println(failure.toString())
  }

  // REQUIRED
  // these lines are required in order for our system to assign a grade based on the unit tests
  println("__JUNIT__ TESTS RUN COUNT: " + testsRun)
  println("__JUNIT__ TESTS FAILURE COUNT: " + testsFailed)
  println("__JUNIT__ ALL TESTS PASSING: " + result.wasSuccessful())
}`,'Catch2-Cpp':`// Main.cpp is required to have these headers here
#define CATCH_CONFIG_MAIN
#include "catch.hpp"

unsigned int Factorial( unsigned int number ) {
  return number <= 1 ? number : Factorial(number-1) * number;
}

TEST_CASE( "Factorials are computed", "[factorial]" ) {
  //REQUIRE( Factorial(0) == 1 );
  REQUIRE( Factorial(1) == 1 );
  REQUIRE( Factorial(2) == 2 );
  REQUIRE( Factorial(3) == 6 );
  REQUIRE( Factorial(10) == 3628800 );
}`,'dotnetTesting-Csharp':`using System;
using Xunit;

public class MainClass {

  [Fact]
  public void PassingTest() {
    Assert.Equal(4, 2 + 2);
  }

  static void Main() {
    Console.WriteLine("Running tests...");
  }

}`,'goTesting-Go':`package main
import "testing"

func Test1(t *testing.T) {
  num := 1
  if num != 1 {
    t.Errorf("Should equal 1", num)
  }
}

func Test2(t *testing.T) {
  num := 2
  if num != 1 {
    t.Errorf("Should equal 1", num)
  }
}

func main() {
  // list the tests you want to run below
  // more info on how this runs: https://pkg.go.dev/testing#Main
  testing.Main(
    nil,
    []testing.InternalTest{
      {"Test 1", Test1},
      {"Test 2", Test2},
    },
    nil, nil,
  )
}`,'cargoTesting-Rust':`pub fn add(a: i32, b: i32) -> i32 {
  a + b
}

#[allow(dead_code)]
fn bad_add(a: i32, b: i32) -> i32 {
  a - b
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_add() {
    assert_eq!(add(1, 2), 3);
  }

  #[test]
  fn test_bad_add() {
    assert_eq!(bad_add(1, 2), 3);
  }
}

fn main() {
  println!("Hello World!");
}`,'minitest-Ruby':`require 'minitest/autorun'

class MagicBallTest < Minitest::Test
  def test_ask_returns_an_answer
    magic_ball = MagicBall.new
    assert magic_ball.ask("Testing") != nil
  end
end

class MagicBall
  def ask question
    "Whatever"
  end
end`,};window.__DEFAULT_COLLAB_FILETREE={'Csharp':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'Main.cs',main:'true',selected:'true',__initContent:`using System;\n\nclass MainClass {\n\n  public static int foo(int param) {\n    return param;\n  }\n\n  static void Main() {\n    Console.WriteLine(foo(2+2));\n  }\n\n}`},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'Main.csproj',main:'true',__initContent:`<Project Sdk="Microsoft.NET.Sdk"> 
  <PropertyGroup> 
    <OutputType>Exe</OutputType> 
    <TargetFramework>netcoreapp7.0</TargetFramework> 
    <StartupObject>MainClass</StartupObject> 
  </PropertyGroup> 
  <ItemGroup> 
    <PackageReference Include="Microsoft.IdentityModel.Tokens" Version="6.30.0" /> 
    <PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="6.30.0" /> 
    <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
    <PackageReference Include="System.Numerics.Vectors" Version="4.5.0" />
    <PackageReference Include="System.Collections" Version="4.3.0" />
  </ItemGroup> 
</Project>`},],'Go':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.go',main:'true',selected:'true',__initContent:`package main\nimport "fmt"\n\nfunc foo(param int) int {\n  return param\n}\n\nfunc main() {\n  fmt.Println(foo(2+2))\n}`},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'go.mod',main:'true',__initContent:`go 1.21.1\n\nmodule local`},],'Dart':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.dart',main:'true',selected:'true',__initContent:`void main() {\n  print(2 + 2);\n}`},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'pubspec.yaml',main:'true',__initContent:`name: CoderbyteDartProject\nenvironment:\n  sdk: ^2.15.0`},],'React':[{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'src',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'index.html',__initContent:`<!DOCTYPE html>
<html>
  <head>
    <title>React App</title>
    <meta charset="UTF-8" />
    <link type="text/css" rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'App.tsx',__initContent:`import React from 'react';
          
function App() {
  return (
    <div id="mainArea">
      Hello world!
    </div>
  )
};

export default App;`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'index.tsx',selected:'true',__initContent:`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);`,}]},{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'build',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'style.css',__initContent:`/* todo */`,}]},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'README.md',main:'true',__initContent:`# React TypeScript project`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'package.json',main:'true',__initContent:`{
  "name": "react",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "test": "jest"
  },
  "dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.14.14",
    "@mui/lab": "^5.0.0-alpha.149",
    "@mui/material": "^5.14.14",
    "@mui/styles": "^5.14.14",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^14.4.3",
    "@types/jest": "^29.4.0",
    "axios": "^1.4.0",
    "babel-jest": "^29.4.3",
    "babel-preset-react-app": "^10.0.1",
    "jest": "^29.4.2",
    "jest-environment-jsdom": "^29.4.2",
    "material-table": "^2.0.5",
    "prop-types": "^15.7.2",
    "react": "^18.2.0",
    "react-app-polyfill": "^3.0.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "semantic-ui-react": "^2.1.4",
    "ts-jest": "^29.0.5",
    "@kitware/vtk.js": "^29.1.2"
  },
  "devDependencies": {
    "@babel/core": "^7.20.12",
    "@babel/plugin-proposal-class-properties": "^7.18.6",
    "@babel/plugin-syntax-dynamic-import": "^7.8.3",
    "@babel/polyfill": "^7.12.1",
    "@babel/preset-env": "^7.20.2",
    "@babel/preset-react": "^7.18.6",
    "@babel/preset-typescript": "^7.18.6",
    "@types/node": "^18.13.0",
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.10",
    "babel-loader": "^9.1.2",
    "css-loader": "^6.7.3",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.3.2",
    "style-loader": "^3.2.1",
    "typescript": "^4.9.5"
  },
  "jest": {
    "roots": [
      "<rootDir>/__tests__"
    ],
    "collectCoverageFrom": [
      "__tests__/**/*.{js,jsx,ts,tsx}",
      "!__tests__/**/*.d.ts"
    ],
    "setupFiles": [
      "react-app-polyfill/jsdom"
    ],
    "setupFilesAfterEnv": [
      "<rootDir>/setupTests.ts"
    ],
    "testMatch": [
      "<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    "testEnvironment": "jsdom",
    "transform": {
      "^.+\\\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/config/babelTransform.js"
    },
    "transformIgnorePatterns": [
      "[/\\\\\\\\]node_modules[/\\\\\\\\].+\\\\.(js|jsx|mjs|cjs|ts|tsx)$",
      "^.+\\\\.module\\\\.(css|sass|scss)$"
    ],
    "modulePaths": [],
    "moduleNameMapper": {
      "^react-native$": "react-native-web",
      "^.+\\\\.module\\\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    "moduleFileExtensions": [
      "web.js",
      "js",
      "web.ts",
      "ts",
      "web.tsx",
      "tsx",
      "json",
      "web.jsx",
      "jsx",
      "node"
    ],
    "resetMocks": true
  }
}`,}],'ReactNative':[{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'src',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'App.js',main:'true',__initContent:`import React, { useState } from "react";
import { Text, View } from "react-native";

const SimpleCounter = () => {
  return (
    <View>
      <Text>button count: <span id="actualCount">0</span></Text>
      <button id="mainButton">Increase</button>
    </View>
  );
};

export default SimpleCounter;`},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'index.html',main:'true',__initContent:`<!DOCTYPE html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#000000">
  <style>
    html, body {
      height: 100%;
    }
    body {
      overflow: hidden;
    }
    #root {
      display: flex;
      height: 100%;
    }
  </style>
</head>
<body>
  <div id="root"></div>
</body>
</html>`},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'index.tsx',selected:'true',main:'true',__initContent:`import { AppRegistry } from "react-native";
import App from "./App";
AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});`},]},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'README.md',main:'true',__initContent:`# React Native project`,}],'Vue.js':[{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'public',main:'true',closed:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'index.html',__initContent:`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <link type="text/css" rel="stylesheet" href="style.css" />
      <title>Vue App</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
  </html>`},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'style.css',__initContent:`/* todo */`}]},{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'src',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'App.vue',selected:'true',__initContent:`<template>
  <div id="app">
    <button>ON</button>
  </div>
</template>

<script>
  export default {
  name: "App",
  data() {
    return {
      items: null
    };
  }
  };
</script>`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.js',__initContent:`import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')`,}]},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'README.md',main:'true',__initContent:`# Vue project`,}],'Vue3':[{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'public',main:'true',closed:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'index.html',__initContent:`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <link type="text/css" rel="stylesheet" href="style.css" />
      <title>Vue App</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
  </html>`},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'style.css',__initContent:`/* todo */`}]},{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'src',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'App.vue',__initContent:`<script>
import TodoItem from './TodoItem.vue'

export default {
  components: {
    TodoItem
  },
  data() {
    return {
      groceryList: [
        { id: 0, text: 'Milk' },
        { id: 1, text: 'Bread' },
      ]
    }
  }
}
</script>

<template>
  <ol>
    <TodoItem
      v-for="item in groceryList"
      :todo="item"
      :key="item.id"
    ></TodoItem>
  </ol>
</template>`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'TodoItem.vue',selected:'true',__initContent:`<script>
export default {
  props: {
    todo: Object
  }
}
</script>

<template>
  <li>{{ todo.text }}</li>
</template>`,}]},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'README.md',main:'true',__initContent:`# Vue project`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'package.json',main:'true',__initContent:`{
  "name": "vue3",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "test": "vitest"
  },
  "dependencies": {
    "@vue/cli-plugin-babel": "^5.0.8",
    "@vue/cli-service": "^5.0.8",
    "@vuelidate/core": "^2.0.3",
    "@vuelidate/validators": "^2.0.4",
    "axios": "^1.4.0",
    "vue": "^3.3.4",
    "vue-template-compiler": "^2.7.14"
  },
  "devDependencies": {
    "vitest": "^3.0.5",
    "@babel/core":"^7.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ],
  "vue": {
    "publicPath": "./",
    "configureWebpack": {
      "watchOptions": {
        "poll": 1000
      }
    }
  }
}`,}],'Angular':[{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'src',main:'true',contents:[{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'app',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'app-area.component.ts',selected:'true',__initContent:`// @ts-ignore
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area',
  template: '<button>ON</button>',
  styles: []
})

export class MainAppComponent implements OnInit {
  // code goes here
  ngOnInit() { 
    
  }
}`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'app.module.ts',__initContent:`// @ts-nocheck
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainAppComponent } from './app-area.component';

@Component({
  selector: 'app-root',
  template: '' + '<app-area></app-area>',
  styles: []
})
class AppComponent {}

@NgModule({
  declarations: [
    AppComponent,
    MainAppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }`,}]},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'style.css',__initContent:`/* You can add global styles to this file, and also import other style files */`,}]},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'index.html',main:'true',__initContent:`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Angular App</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link type="text/css" rel="stylesheet" href="style.css" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'README.md',main:'true',__initContent:`# Angular project`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'package.json',main:'true',__initContent:`{
  "name": "sandbox",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^17.3.4",
    "@angular/cdk": "17.3.4",
    "@angular/common": "^17.3.4",
    "@angular/compiler": "^17.3.4",
    "@angular/core": "^17.3.4",
    "@angular/forms": "^17.3.4",
    "@angular/material": "17.3.4",
    "@angular/platform-browser": "^17.3.4",
    "@angular/platform-browser-dynamic": "^17.3.4",
    "@angular/router": "^17.3.4",
    "@ngrx/effects": "17.2.0",
    "@ngrx/router-store": "17.2.0",
    "@ngrx/store": "17.2.0",
    "@ngrx/store-devtools": "17.2.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.14.4"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^17.3.4",
    "@angular/cli": "^17.3.4",
    "@angular/compiler-cli": "^17.3.4",
    "@types/jasmine": "~4.3.0",
    "jasmine-core": "~4.6.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.4.5"
  }
}`,}],'HTML':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'index.html',main:'true',selected:'true',__initContent:`<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <title>Editor code</title>
  </head>
  <body>
    <h1></h1>
  </body>
</html>

<script>
  $(document).ready(function () {
    $('h1').text('My title here!');
  });
</script>`},],'Flutter':[{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'lib',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.dart',main:'true',selected:'true',__initContent:`import 'package:flutter/material.dart';

void main() {
    runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const MyHomePage(title: 'Flutter App'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Button was pressed this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineLarge,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}`,},]},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'README.md',main:'true',__initContent:`# Flutter project`,}],'Webpack':[{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'src',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'index.html',main:'true',__initContent:`<!DOCTYPE html>
<html>
  <head>
    <title>Webpack App</title>
    <meta charset="UTF-8" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'index.js',selected:'true',main:'true',__initContent:`import $ from 'jquery';
import _ from 'lodash';

const rootApp = document.getElementById("root");
rootApp.innerHTML = 'Hello world!';`}]},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'README.md',main:'true',__initContent:`# Webpack project`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'package.json',main:'true',__initContent:`{
  "name": "sandbox",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@kitware/vtk.js": "^29.1.2",
    "jquery": "^3.6.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "html-webpack-plugin": "^5.3.2"
  }
}`,}],'Svelte':[{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'src',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'App.svelte',selected:'true',main:'true',__initContent:`<script>
  export let name;
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial" target="_blank">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.js',main:'true',__initContent:`import './global.css';
import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
});

export default app;`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'global.css',__initContent:`html, body {
  position: relative;
  width: 100%;
  height: 100%;
}

body {
  color: #333;
  margin: 0;
  padding: 8px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}

a {
  color: rgb(0,100,200);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:visited {
  color: rgb(0,80,160);
}

label {
  display: block;
}

input, button, select, textarea {
  font-family: inherit;
  font-size: inherit;
  -webkit-padding: 0.4em 0;
  padding: 0.4em;
  margin: 0 0 0.5em 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 2px;
}

input:disabled {
  color: #ccc;
}

button {
  color: #333;
  background-color: #f4f4f4;
  outline: none;
}

button:disabled {
  color: #999;
}

button:not(:disabled):active {
  background-color: #ddd;
}

button:focus {
  border-color: #666;
}`,},]},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'README.md',main:'true',__initContent:`# Svelte project`,}],'MochaSample-JavaScript':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.js',main:'true',__initContent:`var Mocha = require('mocha');
var mocha = new Mocha({});

// a 'coderbyte-tests' folder is required for unit tests to properly run on our platform
mocha.addFile('coderbyte-tests/test.js');

mocha.run()
  .on('test', function(test) {
    console.log('Test started: ' + test.title);
  })
  .on('test end', function(test) {
    console.log('Test complete: ' + test.title);
  })
  .on('pass', function(test) {
    console.log('Test passed');
  })
  .on('fail', function(test, err) {
    console.log('Test fail');
  })
  .on('end', function() {
    console.log('All done');
  });`},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'calculator.js',selected:'true',__initContent:`var calculator = {
  add: function(a, b) {
    return a + b;
  }
};

module.exports = calculator;`},{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'coderbyte-tests',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'test.js',__initContent:`const chai = require('chai');
const expect = chai.expect;

const calculator = require('../calculator');

describe('Calculator', () => {
  describe('Addition', () => {
    it('should sum two numbers', () => {
      expect(calculator.add(2, 2)).to.equal(4)
      expect(calculator.add(50, 30)).to.equal(80)
    })
  })
  describe('Subtraction', () => {
    it('should subtract two numbers', () => {
      expect(calculator.subtract(2, 2)).to.equal(0)
      expect(calculator.subtract(50, 1)).to.equal(49)
    })
  })
});`,}]},],'MochaSample-TypeScript':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.ts',main:'true',__initContent:`const Mocha = require('mocha');
const mocha = new Mocha({});

// a 'coderbyte-tests' folder is required for unit tests to properly run on our platform
mocha.addFile('coderbyte-tests/test.ts');

mocha.run()
  .on('test', function(test) {
    console.log('Test started: ' + test.title);
  })
  .on('test end', function(test) {
    console.log('Test complete: ' + test.title);
  })
  .on('pass', function(test) {
    console.log('Test passed');
  })
  .on('fail', function(test, err) {
    console.log('Test fail');
  })
  .on('end', function() {
    console.log('All done');
  });`},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'calculator.ts',selected:'true',__initContent:`const calculator = {
  add: function(a, b) {
    return a + b;
  }
};

module.exports = calculator;`},{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'coderbyte-tests',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'test.ts',__initContent:`const chai = require('chai');
const expect = chai.expect;

const calculator = require('../calculator');

describe('Calculator', () => {
  describe('Addition', () => {
    it('should sum two numbers', () => {
      expect(calculator.add(2, 2)).to.equal(4)
      expect(calculator.add(50, 30)).to.equal(80)
    })
  })
  describe('Subtraction', () => {
    it('should subtract two numbers', () => {
      expect(calculator.subtract(2, 2)).to.equal(0)
      expect(calculator.subtract(50, 1)).to.equal(49)
    })
  })
});`,}]},],'PlaywrightSample-TypeScript':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.ts',main:'true',__initContent:`const { spawn } = require('child_process');
const process = spawn('npx', ['playwright', 'test'], { stdio: 'inherit' });

process.on('close', (code) => {
  console.log('Playwright tests finished with exit code ' + code);
});`},{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'tests',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'example.spec.ts',selected:'true',__initContent:`const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});`,}]},],'pytestSample-Python3':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.py',main:'true',__initContent:`import pytest

# do not modify this function call
retcode = pytest.main(['--tb=no'])`},{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'coderbyte-tests',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main_test.py',selected:'true',__initContent:`def add(a, b):
  return a + b

def test_answer():
  assert add(3, 2) == 5`,}]},],'NotebookGrading-Jupyter':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'jupyter_start.py',__initContent:`# Jupyter Notebook is starting...`},],'ReactJestTests-React':[{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'__tests__',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'App.test.tsx',__initContent:`import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './../src/App';

it('Renders hello', () => {
  render(<App />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});`,},]},{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'src',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'index.html',__initContent:`<!DOCTYPE html>
<html>
  <head>
    <title>React App</title>
    <meta charset="UTF-8" />
    <link type="text/css" rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'index.tsx',selected:'true',__initContent:`import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'App.tsx',__initContent:`import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="mainArea">
        Hello
      </div>
    );
  }
}`,}]},{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'build',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'style.css',__initContent:`/* todo */`,}]},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'README.md',main:'true',__initContent:`# React TypeScript project`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'package.json',main:'true',__initContent:`{
  "name": "react",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "test": "jest"
  },
  "dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.14.14",
    "@mui/lab": "^5.0.0-alpha.149",
    "@mui/material": "^5.14.14",
    "@mui/styles": "^5.14.14",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^14.4.3",
    "@types/jest": "^29.4.0",
    "axios": "^1.4.0",
    "babel-jest": "^29.4.3",
    "babel-preset-react-app": "^10.0.1",
    "jest": "^29.4.2",
    "jest-environment-jsdom": "^29.4.2",
    "material-table": "^2.0.5",
    "prop-types": "^15.7.2",
    "react": "^18.2.0",
    "react-app-polyfill": "^3.0.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "semantic-ui-react": "^2.1.4",
    "ts-jest": "^29.0.5",
    "@kitware/vtk.js": "^29.1.2"
  },
  "devDependencies": {
    "@babel/core": "^7.20.12",
    "@babel/plugin-proposal-class-properties": "^7.18.6",
    "@babel/plugin-syntax-dynamic-import": "^7.8.3",
    "@babel/polyfill": "^7.12.1",
    "@babel/preset-env": "^7.20.2",
    "@babel/preset-react": "^7.18.6",
    "@babel/preset-typescript": "^7.18.6",
    "@types/node": "^18.13.0",
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.10",
    "babel-loader": "^9.1.2",
    "css-loader": "^6.7.3",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.3.2",
    "style-loader": "^3.2.1",
    "typescript": "^4.9.5"
  },
  "jest": {
    "roots": [
      "<rootDir>/__tests__"
    ],
    "collectCoverageFrom": [
      "__tests__/**/*.{js,jsx,ts,tsx}",
      "!__tests__/**/*.d.ts"
    ],
    "setupFiles": [
      "react-app-polyfill/jsdom"
    ],
    "setupFilesAfterEnv": [
      "<rootDir>/setupTests.ts"
    ],
    "testMatch": [
      "<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    "testEnvironment": "jsdom",
    "transform": {
      "^.+\\\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/config/babelTransform.js"
    },
    "transformIgnorePatterns": [
      "[/\\\\\\\\]node_modules[/\\\\\\\\].+\\\\.(js|jsx|mjs|cjs|ts|tsx)$",
      "^.+\\\\.module\\\\.(css|sass|scss)$"
    ],
    "modulePaths": [],
    "moduleNameMapper": {
      "^react-native$": "react-native-web",
      "^.+\\\\.module\\\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    "moduleFileExtensions": [
      "web.js",
      "js",
      "web.ts",
      "ts",
      "web.tsx",
      "tsx",
      "json",
      "web.jsx",
      "jsx",
      "node"
    ],
    "resetMocks": true
  }
}`,}],'AngularKarmaTests-Angular':[{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'src',main:'true',contents:[{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'app',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'app-area.component.ts',selected:'true',__initContent:`// @ts-ignore
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area',
  template: '<button>ON</button>',
  styles: []
})

export class MainAppComponent implements OnInit {
  // code goes here
  ngOnInit() { 
    
  }
}`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'app.module.ts',__initContent:`// @ts-nocheck
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainAppComponent } from './app-area.component';

@Component({
  selector: 'app-root',
  template: '' + '<app-area></app-area>',
  styles: []
})
class AppComponent {}

@NgModule({
  declarations: [
    AppComponent,
    MainAppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'app.component.spec.ts',main:'true',__initContent:`import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});`,}]},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'style.css',__initContent:`/* You can add global styles to this file, and also import other style files */`,}]},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'index.html',__initContent:`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Angular App</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link type="text/css" rel="stylesheet" href="style.css" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>`,},],'VueTests-Vue3':[{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'public',main:'true',closed:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'index.html',__initContent:`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <link type="text/css" rel="stylesheet" href="style.css" />
      <title>Vue App</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
  </html>`},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'style.css',__initContent:`/* todo */`}]},{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'src',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.js',__initContent:`import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app');`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.test.js',__initContent:`import { expect, test } from 'vitest'

test('sample test', () => {
  expect(true).toBe(true)
})`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'App.vue',selected:'true',__initContent:`<template>
  <div id="app">
    <p>Welcome to Your Vue.js App</p>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>`,},]}],'PHPUnit-PHP':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.php',main:'true',__initContent:`<?php

// do not modify this
$output = shell_exec('phpunit coderbyte-tests');
echo $output;

?>`,},{type:'dir',id:'d_'+Math.random().toString().substr(2,5),name:'coderbyte-tests',main:'true',contents:[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'MainTest.php',selected:'true',__initContent:`<?php

declare(strict_types=1);

use PHPUnit\\Framework\\TestCase;

final class MainTest extends TestCase {
  public function testExpectFooActualFoo(): void {
    $this->expectOutputString('foo');
    print 'foo';
  }
  public function testExpectBarActualBaz(): void {
    $this->expectOutputString('hello');
    print 'world';
  }
}

?>`,},]},],'JUnit-Java':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'Main.java',main:'true',selected:'true',__initContent:`import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;

public class Main {
  public static void main(String[] args) {

    // run tests and count passing/failing
    Result result = JUnitCore.runClasses(TestJunit.class);
    int testsRun = result.getRunCount();
    int testsFailed = result.getFailureCount();

    // optional: print failures
    for (Failure failure: result.getFailures()) {
      System.out.println(failure.toString());
    }

    // REQUIRED
    // these lines are required in order for our system to assign a grade based on the unit tests
    System.out.println("__JUNIT__ TESTS RUN COUNT: " + testsRun);
    System.out.println("__JUNIT__ TESTS FAILURE COUNT: " + testsFailed);
    System.out.println("__JUNIT__ ALL TESTS PASSING: " + result.wasSuccessful());

  }
}`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'TestJunit.java',__initContent:`import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class TestJunit {
  @Test
  public void testAdd() {
    assertEquals(2 + 2, 5);
  }
  @Test
  public void testSubtract() {
    assertEquals(4 - 2, 2);
  }
}`,},],'JUnit-Kotlin':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.kt',main:'true',selected:'true',__initContent:`import org.junit.runner.JUnitCore
import org.junit.runner.Result
import org.junit.runner.notification.Failure
import java.util.*
import java.io.*

import org.testing.TestJunit

fun main() {
  // run tests and count passing/failing
  val result = JUnitCore.runClasses(TestJunit::class.java)
  val testsRun = result.getRunCount()
  val testsFailed = result.getFailureCount()

  // optional: print failures
  for (failure in result.getFailures()) {
    println(failure.toString())
  }

  // REQUIRED
  // these lines are required in order for our system to assign a grade based on the unit tests
  println("__JUNIT__ TESTS RUN COUNT: " + testsRun)
  println("__JUNIT__ TESTS FAILURE COUNT: " + testsFailed)
  println("__JUNIT__ ALL TESTS PASSING: " + result.wasSuccessful())
}`,},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'TestJunit.kt',__initContent:`package org.testing

import org.junit.Test
import org.junit.Assert.assertEquals

class TestJunit {
  @Test
  fun testAdd() {
    assertEquals(2 + 2, 5);
  }
  @Test
  fun testSubtract() {
    assertEquals(4 - 2, 2);
  }
}`,},],'Catch2-Cpp':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'Main.cpp',selected:'true',main:'true',__initContent:`// Main.cpp is required to have these headers here
#define CATCH_CONFIG_MAIN
#include "catch.hpp"

unsigned int Factorial( unsigned int number ) {
  return number <= 1 ? number : Factorial(number-1) * number;
}

TEST_CASE( "Factorials are computed", "[factorial]" ) {
  //REQUIRE( Factorial(0) == 1 );
  REQUIRE( Factorial(1) == 1 );
  REQUIRE( Factorial(2) == 2 );
  REQUIRE( Factorial(3) == 6 );
  REQUIRE( Factorial(10) == 3628800 );
}`,},],'dotnetTesting-Csharp':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'Main.cs',main:'true',selected:'true',__initContent:`using System;
using Xunit;

public class MainClass {

  [Fact]
  public void PassingTest() {
    Assert.Equal(4, 2 + 2);
  }

  static void Main() {
    Console.WriteLine("Running tests...");
  }

}`},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'Main.csproj',main:'true',__initContent:`<Project Sdk="Microsoft.NET.Sdk"> 
  <PropertyGroup> 
    <OutputType>Exe</OutputType> 
    <TargetFramework>netcoreapp7.0</TargetFramework> 
    <StartupObject>MainClass</StartupObject> 
  </PropertyGroup> 
  <ItemGroup> 
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.9.0" />
    <PackageReference Include="xunit" Version="2.7.0" />
    <PackageReference Include="xunit.runner.visualstudio" Version="2.5.7" />
    <PackageReference Include="Microsoft.IdentityModel.Tokens" Version="6.30.0" /> 
    <PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="6.30.0" /> 
    <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
    <PackageReference Include="System.Numerics.Vectors" Version="4.5.0" />
    <PackageReference Include="System.Collections" Version="4.3.0" />
  </ItemGroup> 
</Project>`},],'goTesting-Go':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.go',main:'true',selected:'true',__initContent:`package main
import "testing"

func Test1(t *testing.T) {
  num := 1
  if num != 1 {
    t.Errorf("Should equal 1", num)
  }
}

func Test2(t *testing.T) {
  num := 2
  if num != 1 {
    t.Errorf("Should equal 1", num)
  }
}

func main() {
  // list the tests you want to run below
  // more info on how this runs: https://pkg.go.dev/testing#Main
  testing.Main(
    nil,
    []testing.InternalTest{
      {"Test 1", Test1},
      {"Test 2", Test2},
    },
    nil, nil,
  )
}`},],'cargoTesting-Rust':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.rs',main:'true',selected:'true',__initContent:`pub fn add(a: i32, b: i32) -> i32 {
  a + b
}

#[allow(dead_code)]
fn bad_add(a: i32, b: i32) -> i32 {
  a - b
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_add() {
    assert_eq!(add(1, 2), 3);
  }

  #[test]
  fn test_bad_add() {
    assert_eq!(bad_add(1, 2), 3);
  }
}

fn main() {
  println!("Hello World!");
}`},{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'Cargo.toml',main:'true',__initContent:`[[bin]]
name = "main"
path = "main.rs"

[package]
name = "main"
version = "0.1.0"
edition = "2021"

[dependencies]`},],'minitest-Ruby':[{type:'file',id:'f_'+Math.random().toString().substr(2,5),name:'main.rb',main:'true',selected:'true',__initContent:`require 'minitest/autorun'

class MagicBallTest < Minitest::Test
  def test_ask_returns_an_answer
    magic_ball = MagicBall.new
    assert magic_ball.ask("Testing") != nil
  end
end

class MagicBall
  def ask question
    "Whatever"
  end
end`},],};window.__DEFAULT_COLLAB_DATABASE_ADAPTER_SNIPPETS={'JavaScript':{'MySQL':function(dbObject){return `const mysql = require('mysql2');
  
var connection = mysql.createConnection({
  host: '${dbObject.host}',
  user: '${dbObject.user}',
  password: '${dbObject.password}',
  database: 'main',
});

connection.query('SHOW tables', (err, rows) => {
  if (err) console.log(err);
  else console.log(rows); 
});

connection.end();`},'MSSQL':function(dbObject){var udbHostUrlrl=dbObject.url.replace('jdbc:sqlserver://','Server=').replace(':1433',',1433');udbHostUrlrl=udbHostUrlrl.replace(';user',';User Id').replace(';password',';Password');udbHostUrlrl=udbHostUrlrl+';Encrypt=false';return `const sql = require('mssql');
  
sql.connect('${udbHostUrlrl}', err => {
  new sql.Request().query('SELECT sobjects.name FROM sysobjects sobjects', (e, result) => {
    console.log(result);
    sql.close();
  });
});`},'PostgreSQL':function(dbObject){return `const { Client } = require('pg');

const client = new Client({
  user: '${dbObject.user}',
  password: '${dbObject.password}',
  host: '${dbObject.host}',
  database: '${dbObject.dbName}',
});

client.connect().then(() => {
  console.log('Connected to database');
  client.end().then(() => {
    console.log('Connection to database closed');
  }).catch((err) => {
    console.error('Error closing connection', err);
  });
}).catch((err) => {
  console.error('Error connecting', err);
});`},},'TypeScript':{'MySQL':function(dbObject){return `const mysql = require('mysql2');
  
var connection = mysql.createConnection({
  host: '${dbObject.host}',
  user: '${dbObject.user}',
  password: '${dbObject.password}',
  database: 'main',
});

connection.query('SHOW tables', (err, rows) => {
  if (err) console.log(err);
  else console.log(rows); 
});

connection.end();`},'MSSQL':function(dbObject){var udbHostUrlrl=dbObject.url.replace('jdbc:sqlserver://','Server=').replace(':1433',',1433');udbHostUrlrl=udbHostUrlrl.replace(';user',';User Id').replace(';password',';Password');udbHostUrlrl=udbHostUrlrl+';Encrypt=false';return `const sql = require('mssql');
  
sql.connect('${udbHostUrlrl}', err => {
  new sql.Request().query('SELECT sobjects.name FROM sysobjects sobjects', (e, result) => {
    console.log(result);
    sql.close();
  });
});`},'PostgreSQL':function(dbObject){return `const { Client } = require('pg');

const client = new Client({
  user: '${dbObject.user}',
  password: '${dbObject.password}',
  host: '${dbObject.host}',
  database: '${dbObject.dbName}',
});

client.connect().then(() => {
  console.log('Connected to database');
  client.end().then(() => {
    console.log('Connection to database closed');
  }).catch((err) => {
    console.error('Error closing connection', err);
  });
}).catch((err) => {
  console.error('Error connecting', err);
});`},},'Express':{'MySQL':function(dbObject){return `const mysql = require('mysql2');
  
var connection = mysql.createConnection({
  host: '${dbObject.host}',
  user: '${dbObject.user}',
  password: '${dbObject.password}',
  database: 'main',
});

connection.query('SHOW tables', (err, rows) => {
  if (err) console.log(err);
  else console.log(rows); 
});

connection.end();`},'PostgreSQL':function(dbObject){return `const { Client } = require('pg');

const client = new Client({
  user: '${dbObject.user}',
  password: '${dbObject.password}',
  host: '${dbObject.host}',
  database: '${dbObject.dbName}',
});

client.connect().then(() => {
  console.log('Connected to database');
  client.end().then(() => {
    console.log('Connection to database closed');
  }).catch((err) => {
    console.error('Error closing connection', err);
  });
}).catch((err) => {
  console.error('Error connecting', err);
});`},},'Next.js':{'MySQL':function(dbObject){return `const mysql = require('mysql2');
  
var connection = mysql.createConnection({
  host: '${dbObject.host}',
  user: '${dbObject.user}',
  password: '${dbObject.password}',
  database: 'main',
});

connection.query('SHOW tables', (err, rows) => {
  if (err) console.log(err);
  else console.log(rows); 
});

connection.end();`},'PostgreSQL':function(dbObject){return `const { Client } = require('pg');

const client = new Client({
  user: '${dbObject.user}',
  password: '${dbObject.password}',
  host: '${dbObject.host}',
  database: '${dbObject.dbName}',
});

client.connect().then(() => {
  console.log('Connected to database');
  client.end().then(() => {
    console.log('Connection to database closed');
  }).catch((err) => {
    console.error('Error closing connection', err);
  });
}).catch((err) => {
  console.error('Error connecting', err);
});`},},'Python3':{'MySQL':function(dbObject){return `import mysql.connector
  
mydb = mysql.connector.connect(
  host = "${dbObject.host}",
  user = "${dbObject.user}",
  password = "${dbObject.password}",
  database = "main"
)

mycursor = mydb.cursor()
mycursor.execute("SHOW tables")

for x in mycursor.fetchall():
  print(x)`},'PostgreSQL':function(dbObject){return `import psycopg2

connection = psycopg2.connect(
  database="${dbObject.dbName}", 
  user="${dbObject.user}", 
  password="${dbObject.password}", 
  host="${dbObject.host}"
)

cursor = connection.cursor()
print(cursor)`},},'PHP':{'MySQL':function(dbObject){return `$conn = mysqli_connect('${dbObject.host}', '${dbObject.user}', '${dbObject.password}', 'main');
if (!$conn) die("Connection failed: " . mysqli_connect_error());
print_r($conn);

// run query
$sql = "SHOW tables";
$result = $conn->query($sql);

// output data of each row
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    print_r($row);
  }
}

$conn->close();`},},'Django':{'MySQL':function(dbObject){return `import mysql.connector
  
mydb = mysql.connector.connect(
  host = "${dbObject.host}",
  user = "${dbObject.user}",
  password = "${dbObject.password}",
  database = "main"
)

mycursor = mydb.cursor()
mycursor.execute("SHOW tables")

for x in mycursor.fetchall():
  print(x)`},},'Csharp':{'MySQL':function(dbObject){return `using System;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
// include <PackageReference Include="MySql.Data" Version="8.1.0" /> in Main.csproj

class MainClass {

  static void Main() {

    string connStr = "server=${dbObject.host};user=${dbObject.user};password=${dbObject.password}";
    MySqlConnection conn = new MySqlConnection(connStr);
    try {
      conn.Open();
      Console.WriteLine("Connected to MySQL");
    } catch (Exception ex) {
      Console.WriteLine(ex.ToString());
    }
    conn.Close();
    
  }

}`},'MSSQL':function(dbObject){return `using System;
using Microsoft.Data.SqlClient;
// include <PackageReference Include="System.Data.SqlClient" Version="4.8.6" /> in Main.csproj

class MainClass {
  static void Main() {
    try { 
      SqlConnectionStringBuilder db = new SqlConnectionStringBuilder();
      db.DataSource = "${dbObject.host}"; 
      db.UserID = "${dbObject.user}";            
      db.Password = "${dbObject.password}";     
      db.Encrypt = false;

      using (SqlConnection connection = new SqlConnection(db.ConnectionString)) {
        connection.Open();       
        String sql = "SELECT name, collation_name FROM sys.databases";
        using (SqlCommand command = new SqlCommand(sql, connection)) {
          using (SqlDataReader reader = command.ExecuteReader()) {
            while (reader.Read()) {
              Console.WriteLine("{0} {1}", reader.GetString(0), reader.GetString(1));
            }
          }
        }                    
      }
    } catch (SqlException e) {
      Console.WriteLine(e.ToString());
    }
  }
}`},},'Java':{'MySQL':function(dbObject){return `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

class Main {

  public static void main (String[] args) {  

    String URL = "jdbc:mysql://${dbObject.host}:${dbObject.port}/main";
    String USER = "${dbObject.user}";
    String PASSWORD = "${dbObject.password}";

    try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      System.out.println(DriverManager.getConnection(URL, USER, PASSWORD));
    } catch (ClassNotFoundException | SQLException e) {
      e.printStackTrace();
      throw new RuntimeException("Failed to connect to the MySQL database.");
    }

  }

}`},'MSSQL':function(dbObject){return `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import com.microsoft.sqlserver.jdbc.SQLServerDriver;

class Main {

  public static void main (String[] args) {  

    String URL = "jdbc:sqlserver://${dbObject.host}:${dbObject.port};user=${dbObject.user};password=${dbObject.password};encrypt=false;";

    try {
      Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
      System.out.println(DriverManager.getConnection(URL));
    } catch (ClassNotFoundException | SQLException e) {
      e.printStackTrace();
      throw new RuntimeException("Failed to connect to the MSSQL database.");
    }

  }

}`},},'dotNet':{'MySQL':function(dbObject){return `using System;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
// include <PackageReference Include="MySql.Data" Version="8.1.0" /> in Main.csproj

class MainClass {

  static void Main() {

    string connStr = "server=${dbObject.host};user=${dbObject.user};password=${dbObject.password}";
    MySqlConnection conn = new MySqlConnection(connStr);
    try {
      conn.Open();
      Console.WriteLine("Connected to MySQL");
    } catch (Exception ex) {
      Console.WriteLine(ex.ToString());
    }
    conn.Close();
    
  }

}`},'MSSQL':function(dbObject){return `using System;
using Microsoft.Data.SqlClient;
// include <PackageReference Include="System.Data.SqlClient" Version="4.8.6" /> in Main.csproj

class MainClass {
  static void Main() {
    try { 
      SqlConnectionStringBuilder db = new SqlConnectionStringBuilder();
      db.DataSource = "${dbObject.host}"; 
      db.UserID = "${dbObject.user}";            
      db.Password = "${dbObject.password}";     
      db.Encrypt = false;

      using (SqlConnection connection = new SqlConnection(db.ConnectionString)) {
        connection.Open();       
        String sql = "SELECT name, collation_name FROM sys.databases";
        using (SqlCommand command = new SqlCommand(sql, connection)) {
          using (SqlDataReader reader = command.ExecuteReader()) {
            while (reader.Read()) {
              Console.WriteLine("{0} {1}", reader.GetString(0), reader.GetString(1));
            }
          }
        }                    
      }
    } catch (SqlException e) {
      Console.WriteLine(e.ToString());
    }
  }
}`},},}