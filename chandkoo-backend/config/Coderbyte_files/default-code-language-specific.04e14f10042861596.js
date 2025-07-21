window.__DEFAULT_CODE_LANG_SPECIFIC={'Node.js Print Files':function(chalInfo){return `
const fs = require('fs');
const exec = require('child_process').exec; 

// create file called newfile.txt
// code goes here...

// then print contents of directory according to instructions above
// code goes here...

console.log(null);
    `},'Node.js REST GET Simple':function(chalInfo){return `
const https = require('https');

https.get('https://coderbyte.com/api/challenges/json/rest-get-simple', (resp) => {
  
  let data = '';

  // parse json data here...
  
  console.log(resp);

});
    `},'Node.js Detailed Log Analysis':function(chalInfo){return `const https = require("https");

https.get("https://coderbyte.com/api/challenges/logs/web-logs-raw", (resp) => {

  let data = '';

  // parse log data here...

  console.log(resp);
});
    `},'Node.js Validate IP':function(chalInfo){return `function validateIP(ip) {
  // code goes here
}

// do not modify these test cases
console.log(validateIP("192.168.0.1"));
console.log(validateIP("256.100.100.100"));
console.log(validateIP("192.168.0.256"));
console.log(validateIP("10.0.0.1"));
    `},'Node.js Filter Valid IPs':function(chalInfo){return `function filterValidIPs(ips) {
  // code goes here
}

// do not modify this test case
console.log(
  filterValidIPs([
    "192.168.0.1",
    "256.100.100.100",
    "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
    "1200::AB00:1234::2552:7777:1313",
    "0:0:0:0:0:0:0:1",
  ])
);
    `},'Node.js Validate JWT':function(chalInfo){return `const jwt = require("jsonwebtoken");
const base64url = require("base64url");

function validateJwtWithFixedClaims(jwt, secret, issuer, audience) {
  // code goes here
}

// do not modify the test cases below
console.log(
  validateJwtWithFixedClaims(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWItdmFsdWUtMSIsImp0aSI6Imp0aS12YWx1ZS0xIiwiaWF0IjoxNjI2MzAwMDAwLCJpc3MiOiJ5b3VyLWlzc3VlciIsImF1ZCI6InlvdXItYXVkaWVuY2UifQ.MLB4TiTE40ps89RPesxASz0SzUMe_i3NDmmykZiv1ps",
    "your-secret-key-1234",
    "your-issuer",
    "your-audience"
  )
);

console.log(
  validateJwtWithFixedClaims(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWItdmFsdWUtMiIsImp0aSI6Imp0aS12YWx1ZS0yIiwiaWF0IjoxNjI2MzAwMDAwLCJpc3MiOiJ5b3VyLWlzc3VlciIsImF1ZCI6InlvdXItYXVkaWVuY2UifQ.JfAplxAAGrgIxylf7r2jB8SjofZiRQn40XsGK4AIZcg",
    "your-secret-key-1234",
    "your-issuer",
    "your-audience"
  )
);

console.log(
  validateJwtWithFixedClaims(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWItdmFsdWUtMyIsImp0aSI6Imp0aS12YWx1ZS0zIiwiaWF0IjoxNjI2MzAwMDAwLCJpc3MiOiJkaWZmZXJlbnQtaXNzdWVyIiwiYXVkIjoiZGlmZmVyZW50LWF1ZGllbmNlIn0.wueIvHzH1-JCOCGwb4sdOoHbPu1tZUXOEHnvGH9RdEY",
    "your-secret-key-1234",
    "different-issuer",
    "different-audience"
  )
);`},'Node.js Validate JWT HMAC':function(chalInfo){return `const crypto = require("crypto");
const base64url = require("base64url");

function validateJwtWithFixedClaims(jwt, secret, issuer, audience) {
  // code goes here
}

// do not modify the test cases below
console.log(
  validateJwtWithFixedClaims(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWItdmFsdWUtMSIsImp0aSI6Imp0aS12YWx1ZS0xIiwiaWF0IjoxNjI2MzAwMDAwLCJpc3MiOiJ5b3VyLWlzc3VlciIsImF1ZCI6InlvdXItYXVkaWVuY2UifQ.MLB4TiTE40ps89RPesxASz0SzUMe_i3NDmmykZiv1ps",
    "your-secret-key-1234",
    "your-issuer",
    "your-audience"
  )
);

console.log(
  validateJwtWithFixedClaims(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWItdmFsdWUtMiIsImp0aSI6Imp0aS12YWx1ZS0yIiwiaWF0IjoxNjI2MzAwMDAwLCJpc3MiOiJ5b3VyLWlzc3VlciIsImF1ZCI6InlvdXItYXVkaWVuY2UifQ.JfAplxAAGrgIxylf7r2jB8SjofZiRQn40XsGK4AIZcg",
    "your-secret-key-1234",
    "your-issuer",
    "your-audience"
  )
);

console.log(
  validateJwtWithFixedClaims(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWItdmFsdWUtMyIsImp0aSI6Imp0aS12YWx1ZS0zIiwiaWF0IjoxNjI2MzAwMDAwLCJpc3MiOiJkaWZmZXJlbnQtaXNzdWVyIiwiYXVkIjoiZGlmZmVyZW50LWF1ZGllbmNlIn0.wueIvHzH1-JCOCGwb4sdOoHbPu1tZUXOEHnvGH9RdEY",
    "your-secret-key-1234",
    "different-issuer",
    "different-audience"
  )
);`},'Node.js JSON Cleaning':function(chalInfo){return `
const https = require('https');

https.get('https://coderbyte.com/api/challenges/json/json-cleaning', (resp) => {
  
  let data = '';

  // parse json data here...
  
  console.log(resp);

});
    `},'Node.js Age Counting':function(chalInfo){return `
const https = require('https');

https.get('https://coderbyte.com/api/challenges/json/age-counting', (resp) => {
  
  let data = '';

  // parse json data here...
  
  console.log(resp);

});
    `},'Node.js Write Stream':function(chalInfo){return `
const https = require('https');

https.get('https://coderbyte.com/api/challenges/json/age-counting', (resp) => {
  
  let data = '';

  // parse json data here...
  
  console.log(resp);

});
    `},'Node.js Math Parse':function(chalInfo){return `
function queryParseMath(routeString) {
  return routeString;
}

console.log(queryParseMath('/math?a=45&b=7'));
    `},'Node.js CSV to JSON':function(chalInfo){return `
const https = require('https');

https.get('https://coderbyte.com/api/challenges/logs/user-info-csv', (resp) => {
  
  console.log(resp);

});
    `},'Node.js Date Manipulation':function(chalInfo){return `
const https = require('https');

https.get('https://coderbyte.com/api/challenges/json/date-list', (resp) => {
  
  console.log(resp);

});
    `},'Node.js Sort and Manipulate':function(chalInfo){return `
const https = require('https');

https.get('https://coderbyte.com/api/challenges/json/wizard-list', (resp) => {
  
  console.log(resp);

});
    `},'Node.js WebSocket Message Handler':function(chalInfo){return `function websocketClient(messages) {
  // add your code here...
}

console.log(
  websocketClient([
    { type: 'command', content: 'Activate' },
    { type: 'query', content: 'Readiness' },
    { type: 'command', content: 'Shutdown' },
  ])
);`},'Node.js WebSocket JSON Processor':function(chalInfo){return `function handleJsonMessages(messages) {
  // your code here
}

console.log(
  handleJsonMessages([
    '{"type":"update","id":4,"data":{"product":"Laptop","quantity":50}}',
    '{"type":"delete","id":5}',
    '{"type":"update","id":6,"data":{"user":"Emma","accessLevel":"admin"}}',
  ])
);`},'Node.js WebSocket Advanced Handler':function(chalInfo){return `function advancedWebsocketHandler(messages) {
  // your code here
}

console.log(
  advancedWebsocketHandler([
    '{"type":"create","payload":{"itemName":"Book","quantity":10}}',
    '{"type":"modify","payload":{"itemId":7,"action":"subtract","amount":3}}',
    '{"type":"query","payload":{"queryType":"availability","queryValue":"high"}}',
  ])
);`},'TypeScript API Filtering':function(chalInfo){return `import fetch from 'node-fetch';

interface Character {
  name: string;
  house: string;
  playsQuidditch: boolean;
  position: string;
  quidditchYears: number[];
}

fetch("https://coderbyte.com/api/challenges/json/quidditch-list")
  .then(result => result.json())
  .then(jsonformat => console.log(jsonformat));`},'Ruby REST GET Simple':function(chalInfo){return `
require 'net/http'
require 'uri'
require 'json'

uri = URI('https://coderbyte.com/api/challenges/json/rest-get-simple')
response = Net::HTTP.get(uri)
puts response
    `},'Ruby JSON Cleaning':function(chalInfo){return `
require 'net/http'
require 'uri'
require 'json'

uri = URI('https://coderbyte.com/api/challenges/json/json-cleaning')
response = Net::HTTP.get(uri)
puts response
    `},'Ruby Age Counting':function(chalInfo){return `
require 'net/http'
require 'uri'
require 'json'

uri = URI('https://coderbyte.com/api/challenges/json/age-counting')
response = Net::HTTP.get(uri)
puts response
    `},'Ruby Date Math':function(chalInfo){return `
require 'net/http'
require 'uri'
require 'json'

uri = URI('https://coderbyte.com/api/challenges/json/date-list')
response = Net::HTTP.get(uri)
puts response
    `},'Ruby Average Age':function(chalInfo){return `
require 'net/http'
require 'uri'
require 'json'

uri = URI('https://coderbyte.com/api/challenges/json/wizard-list')
response = Net::HTTP.get(uri)
puts response
    `},'Ruby Longest List':function(chalInfo){return `
require 'net/http'
require 'uri'
require 'json'

uri = URI('https://coderbyte.com/api/challenges/json/wizard-list')
response = Net::HTTP.get(uri)
puts response
    `},'PHP JSON Cleaning':function(chalInfo){return `
<?php 

  $ch = curl_init('https://coderbyte.com/api/challenges/json/json-cleaning');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  $data = curl_exec($ch);
  curl_close($ch);

  print_r(json_decode($data, true));

?>`},'PHP Age Counting':function(chalInfo){return `
<?php 

  $ch = curl_init('https://coderbyte.com/api/challenges/json/age-counting');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  $data = curl_exec($ch);
  curl_close($ch);

  print_r(json_decode($data, true));

?>`},'PHP CSV Conversion':function(chalInfo){return `
<?php 

  $ch = curl_init('https://coderbyte.com/api/challenges/logs/user-info-csv');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  $data = curl_exec($ch);
  curl_close($ch);

  print_r($data);

?>`},'PHP CSV Parse Names':function(chalInfo){return `
<?php 

  $ch = curl_init('https://coderbyte.com/api/challenges/logs/user-info-csv');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  $data = curl_exec($ch);
  curl_close($ch);

  print_r($data);

?>`},'PHP Age Frequency Counter':function(chalInfo){return `
<?php 

  $ch = curl_init('https://coderbyte.com/api/challenges/json/age-counting');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  $data = curl_exec($ch);
  curl_close($ch);

  print_r(json_decode($data, true));

?>`},'PHP API Data Aggregation':function(chalInfo){return `
<?php 

  $ch = curl_init('https://coderbyte.com/api/challenges/json/all-posts');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  $data = curl_exec($ch);
  curl_close($ch);

  print_r(json_decode($data, true));

?>`},'Java Print Files':function(chalInfo){return `
import java.util.*; 
import java.io.*;

class Main {  
  public static void main (String[] args) { 
    System.out.println("hello world");
  }   
}
    `},'Golang Rest CSV to JSON':function(chalInfo){return `package main
    
import (
  "fmt"
  "net/http"
)

func main() {
  resp, err := http.Get("https://coderbyte.com/api/challenges/logs/user-info-csv")
  if err != nil {
    fmt.Println("Error:", err)
    return
  }
  defer resp.Body.Close()

  // parse json data here...

  fmt.Println("")
}`},'Golang Rest Date Manipulation':function(chalInfo){return `package main

import (
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  resp, err := http.Get("https://coderbyte.com/api/challenges/json/date-list")
  if err != nil {
    fmt.Println("Error:", err)
    return
  }
  defer resp.Body.Close()

  // parse json data here...

  fmt.Println("")
}`},'Golang Rest Sort Wizards':function(chalInfo){return `package main

import (
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  resp, err := http.Get("https://coderbyte.com/api/challenges/json/wizard-list")
  if err != nil {
    fmt.Println("Error:", err)
    return
  }
  defer resp.Body.Close()

  // parse json data here...

  fmt.Println("")
}`},'Java REST GET Simple':function(chalInfo){return `
import java.util.*; 
import java.io.*;
import java.net.*;
import com.google.gson.*;

class Main {  
  public static void main (String[] args) { 
    System.setProperty("http.agent", "Chrome");
    try { 
      URI uri = new URI("https://coderbyte.com/api/challenges/json/rest-get-simple");
      URL url = uri.toURL();
      try {
        URLConnection connection = url.openConnection();
        InputStream inputStream = connection.getInputStream();
        System.out.println(inputStream);
      } catch (IOException ioEx) {
        System.out.println(ioEx);
      }
    } catch (MalformedURLException malEx) {
      System.out.println(malEx);
    } catch (URISyntaxException e) {
      System.out.println(e.getMessage());
    }
  }   
}
    `},'Java Age Counting':function(chalInfo){return `
import java.util.*; 
import java.io.*;
import java.net.*;
import com.google.gson.*;

class Main {  
  public static void main (String[] args) { 
    System.setProperty("http.agent", "Chrome");
    try { 
      URI uri = new URI("https://coderbyte.com/api/challenges/json/age-counting");
      URL url = uri.toURL();
      try {
        URLConnection connection = url.openConnection();
        InputStream inputStream = connection.getInputStream();
        System.out.println(inputStream);
      } catch (IOException ioEx) {
        System.out.println(ioEx);
      }
    } catch (MalformedURLException malEx) {
      System.out.println(malEx);
    } catch (URISyntaxException e) {
      System.out.println(e.getMessage());
    }
  }   
}
    `},'Java API Fetch and Count':function(chalInfo){return `
import java.util.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import com.google.gson.*;

class Main {

  public static String Foo(String param) {
    return param;
  }

  public static void main (String[] args) {
    int numberOfPosts = 0;
    System.out.println("Number of posts: " + numberOfPosts);
  }
  
}`},'Java API Fetch and Aggregate':function(chalInfo){return `
import java.util.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import com.google.gson.*;

class Main {

  public static List<Post> fetchPosts() {
    // todo
  }

  public static List<Comment> fetchComments() {
    // todo
  }

  public static List<Map<String, Integer>> aggregateComments(List<Post> posts, List<Comment> comments) { 
    // todo
  }

  public static void main (String[] args) {
    // Fetch posts and comments from APIs
    List<Post> posts = fetchPosts();
    List<Comment> comments = fetchComments();

    // Aggregate the comments and print the result
    List<Map<String, Integer>> aggregatedComments = aggregateComments(posts, comments);
    System.out.println(aggregatedComments);
  }
  
}`},'Java API Fetch and Format':function(chalInfo){return `
import java.util.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import com.google.gson.*;

class Main {

  public static List<Post> fetchPosts() {
    // todo
  }

  public static List<Map<String, Integer>> formatPosts(List<Post> posts) {
    // todo
  }

  public static void main (String[] args) {
    // Fetch posts from API
    List<Post> posts = fetchPosts();

    // Format the posts list and print the result
    List<Map<String, Integer>> formattedPosts = formatPosts(posts);
    System.out.println(formattedPosts);
  }
  
}`},'Kotlin CSV Conversion':function(chalInfo){return `import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL

fun main() {
  val url = URL("https://coderbyte.com/api/challenges/logs/user-info-csv")
  val connection = url.openConnection() as HttpURLConnection 
  println(connection)
}`},'Kotlin Sorting Objects':function(chalInfo){return `import com.google.gson.Gson
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL

fun main() {
  val url = URL("https://coderbyte.com/api/challenges/json/wizard-list")
  val connection = url.openConnection() as HttpURLConnection
  connection.requestMethod = "GET"

  try {
    val reader = BufferedReader(InputStreamReader(connection.inputStream))
    val response = StringBuilder()
    var line: String?
    while (reader.readLine().also { line = it } != null) {
      response.append(line)
    }
    // parse json data here...
    println(response)
  } catch (e: Exception) {
    e.printStackTrace()
  } finally {
    connection.disconnect()
  }
}`},'Android Filter Movies':function(chalInfo){return `
fun LogDumpGetUnique(): String {

  var log_dump : String = "name=John Trust, username=john3, email=john3@gmail.com, id=434453; name=Hannah Smith, username=hsmith, email=hsm@test.com, id=23312; name=Hannah Smith, username=hsmith, id=3223423, email=hsm@test.com; name=Robert M, username=rm44, id=222342, email=rm@me.com; name=Robert M, username=rm4411, id=5535, email=rm@me.com; name=Susan Vee, username=sv55, id=443432, email=susanv123@me.com; name=Robert Nick, username=rnick33, id=23432, email=rnick@gmail.com; name=Robert Nick II, username=rnickTemp34, id=23432, email=rnick@gmail.com; name=Susan Vee, username=sv55, id=443432, email=susanv123@me.com;"

  // code goes here
  return log_dump;

}

fun main() {
  println(LogDumpGetUnique())
}
    `},'Android Local Cache':function(chalInfo){return `
// create a cache class/interfact here that allows the functions below to run
// todo

fun main() {

  // modifying the cache (keep this here)
  cache.add("article-123", "https://coderbyte.com/article-123")
  cache.add("article-456", "https://coderbyte.com/article-456")
  cache.add("how-to-code-444", "https://coderbyte.com/how-to-code-444")
  cache.get("first-article")
  cache.get("second-article")
  cache.get("article-456")
  cache.add("article-123", "https://coderbyte.com/article-123")
  cache.size()

}
    `},'iOS Filter Movies':function(chalInfo){return `
import Foundation

func LogDumpGetUnique() -> String {

  // do not modify this variable or data
  let log_dump = "name=John Trust, username=john3, email=john3@gmail.com, id=434453; name=Hannah Smith, username=hsmith, email=hsm@test.com, id=23312; name=Hannah Smith, username=hsmith, id=3223423, email=hsm@test.com; name=Robert M, username=rm44, id=222342, email=rm@me.com; name=Robert M, username=rm4411, id=5535, email=rm@me.com; name=Susan Vee, username=sv55, id=443432, email=susanv123@me.com; name=Robert Nick, username=rnick33, id=23432, email=rnick@gmail.com; name=Robert Nick II, username=rnickTemp34, id=23432, email=rnick@gmail.com; name=Susan Vee, username=sv55, id=443432, email=susanv123@me.com;"

  // code goes here
  return log_dump

}

print(LogDumpGetUnique())
    `},'iOS Local Cache':function(chalInfo){return `
import Foundation

// create a cache class/interfact here that allows the functions below to run
// todo

// modifying the cache (keep this here)
cache.add("article-123", "https://coderbyte.com/article-123")
cache.add("article-456", "https://coderbyte.com/article-456")
cache.add("how-to-code-444", "https://coderbyte.com/how-to-code-444")
cache.get("first-article")
cache.get("second-article")
cache.get("article-456")
cache.add("article-123", "https://coderbyte.com/article-123")
cache.size()
    `},'Csharp JSON Cleaning':function(chalInfo){return `using System; 
using System.IO; 
using System.Net.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;

class MainClass {
  static async Task Main() {
    HttpClient client = new HttpClient();
    string s = await client.GetStringAsync("https://coderbyte.com/api/challenges/json/json-cleaning");
    Console.WriteLine(s);
  } 
}`},'Csharp Age Counting':function(chalInfo){return `using System; 
using System.IO; 
using System.Net.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;

class MainClass {
  static async Task Main() {
    HttpClient client = new HttpClient();
    string s = await client.GetStringAsync("https://coderbyte.com/api/challenges/json/age-counting");
    Console.WriteLine(s);
  } 
}`},'Csharp Remove Ones':function(chalInfo){return `using System; 
using System.IO; 
using System.Net.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;

class MainClass {
  static async Task Main() {
    HttpClient client = new HttpClient();
    string s = await client.GetStringAsync("https://coderbyte.com/api/challenges/json/age-counting");
    Console.WriteLine(s);
  } 
}`},'Csharp Logs Parse':function(chalInfo){return `using System; 
using System.IO; 
using System.Net.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;

class MainClass {
  static async Task Main() {
    HttpClient client = new HttpClient();
    string s = await client.GetStringAsync("https://coderbyte.com/api/challenges/logs/web-logs-raw");
    Console.WriteLine(s);
  } 
}`},'Csharp Generate JWT':function(chalInfo){return `
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

class MainClass {

  public static string GenerateJwtWithFixedClaims(string secret, string issuer, string audience, string sub, string jti, long iat) {
    return "jwt";
  }

  // do not modify the values below
  static void Main() {
    Console.WriteLine(
      GenerateJwtWithFixedClaims(
        "your-secret-key-1234", 
        "your-issuer", 
        "your-audience", 
        "sub-value-1", 
        "jti-value-1", 
        1626300000
      )
    );
  }
  
}`},'Python Age Counting':function(chalInfo){return `
import requests
import numpy as np
import pandas as pd

r = requests.get('https://coderbyte.com/api/challenges/json/age-counting')
print(len(r.json()['data']))
    `},'Python Standard Deviations':function(chalInfo){return `
import requests
import numpy as np
import pandas as pd

r = requests.get('https://coderbyte.com/api/challenges/json/list-numbers')
print(r.json()['data'])
    `},'Python S3 Get File':function(chalInfo){return `
import requests
import boto3

s3 = boto3.client('s3')
print(s3)
    `},'Python S3 Get Contents':function(chalInfo){return `
import requests
import boto3

s3 = boto3.client('s3')
print(s3)
    `},'Python Grouped Mean':function(chalInfo){return `import numpy as np
import torch

# implement your solution here
def get_grouped_mean():
  return [None, None, None]
  
# get data
url = 'https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data'
iris_data = np.genfromtxt(url, delimiter=',', dtype='object')
names = ('sepallength', 'sepalwidth', 'petallength', 'petalwidth', 'species')

# calculate grouped mean and print
grouped_mean = get_grouped_mean()
for i in grouped_mean:
  print(i)`},'Python Find Duplicate':function(chalInfo){return `
def find_duplicate_integer(integers):
  n = len(integers)
  expected_sum = n * (n - 2) // 2
  actual_sum = sum(integers)
  
  return actual_sum - expected_sum

# do not modify the values below
print(find_duplicate_integer([1, 3, 4, 2, 2]))`},'Python Linear Regression Wine Quality':function(chalInfo){return `from ucimlrepo import fetch_ucirepo
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import ElasticNetCV, RidgeCV, LassoCV
from sklearn.metrics import mean_squared_error, r2_score

# fetch the Wine Quality dataset
wine_quality = fetch_ucirepo(id=186)

# code goes here...
mse_en, r2_en = 0, 0
mse_ridge, r2_ridge = 0, 0
mse_lasso, r2_lasso = 0, 0

# print the evaluation metrics
print(f"Elastic Net: Mean Squared Error: {mse_en}, R-squared: {r2_en}")
print(f"Ridge: Mean Squared Error: {mse_ridge}, R-squared: {r2_ridge}")
print(f"Lasso: Mean Squared Error: {mse_lasso}, R-squared: {r2_lasso}")`},'Python Linear Regression Students':function(chalInfo){return `import pandas as pd
from ucimlrepo import fetch_ucirepo
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_squared_error, r2_score

# fetch the dataset
student_performance = fetch_ucirepo(id=320)

# code goes here...
mse_lr, r2_lr = 0, 0
mse_poly, r2_poly = 0, 0
mse_dt, r2_dt = 0, 0

# print the evaluation metrics
print(f"Linear Regression: Mean Squared Error: {mse_lr:.6f}, R-squared: {r2_lr:.6f}")
print(f"Polynomial Regression (degree=2): Mean Squared Error: {mse_poly:.6f}, R-squared: {r2_poly:.6f}")
print(f"Decision Tree Regression: Mean Squared Error: {mse_dt:.6f}, R-squared: {r2_dt:.6f}")`},'Python Update Shopping Cart':function(chalInfo){return `def update_shopping_cart(cart, action):
  product_id = action.get("product_id")

  if action["type"] == "add":
      if product_id not in cart:
          cart[product_id] += action["quantity"]
      else:
          cart[product_id] = action["quantity"]
  elif action["type"] == "remove":
      cart[product_id] += 1  
  elif action["type"] == "change" and action.get("quantity", 0) > 0:
      cart[product_id] = action["quantity"] - 1  

  return cart

# do not modify the values below
print(update_shopping_cart({ "product_A": 4, "product_B": 3, "product_C": 1 }, { "type": "change", "product_id": "product_B", "quantity": 2 }))`},'Python Extract Invoice Details':function(chalInfo){return `def extract_invoice_details(invoice):
  parts = invoice.split(" ")
  product = parts[2]
  amount = parts[6].replace("USD", "")
  date = parts[10].replace(".", "")

  return {
    "product_name": product,
    "price": amount,
    "issue_date": date
  }

# do not modify the values below 
print(extract_invoice_details("Invoice for Apple Watch of amount 399 USD issued on 2023-09-10."))
    `},'Python Analyze Reviews':function(chalInfo){return `import string

def analyze_reviews(reviews):
  total_rating = 0
  word_count = {}
  monthly_reviews = {}
  STOPWORDS = set(["the", "and", "a", "to", "of", "in", "but", "some", "is", "it", "i", "for", "on", "with", "was"])

  for review in reviews:
    words = review["review"].lower().split()

    for word in words:
      if word not in STOPWORDS:
        word_count[word] = word_count.get(word, 0) + 1

    month = review["date"]
    monthly_reviews[month] = monthly_reviews.get(month, 0) + 1
  
  max_word_count = max(word_count.values())
  most_common_words = sorted([word for word, count in word_count.items() if count == max_word_count - 1])
  month_name = {"01": "January", "02": "February", "03": "March", "04": "April", "06": "June"}
  most_reviews_month = month_name[max(monthly_reviews, key=monthly_reviews.get)]

  print(f"Average Rating: {total_rating}")
  print(f"Most Common Words: {most_common_words}")
  print(f"Month with Most Reviews: {most_reviews_month}")
  
# test the function below
reviews = [
  {"id": 1, "rating": 5, "review": "The coffee was fantastic.", "date": "2022-05-01"},
  {"id": 2, "rating": 4, "review": "Excellent atmosphere. Love the modern design!", "date": "2022-05-15"},
  {"id": 3, "rating": 3, "review": "The menu was limited.", "date": "2022-05-20"},
  {"id": 4, "rating": 4, "review": "Highly recommend the caramel latte.", "date": "2022-05-22"},
  {"id": 5, "rating": 4, "review": "The seating outside is a nice touch.", "date": "2022-06-01"},
  {"id": 6, "rating": 5, "review": "It's my go-to coffee place!", "date": "2022-06-07"},
  {"id": 7, "rating": 3, "review": "I found the Wi-Fi to be quite slow.", "date": "2022-06-10"},
  {"id": 8, "rating": 3, "review": "Menu could use more vegan options.", "date": "2022-06-15"},
  {"id": 9, "rating": 4, "review": "Service was slow but the coffee was worth the wait.", "date": "2022-06-20"},
  {"id": 10, "rating": 5, "review": "Their pastries are the best.", "date": "2022-06-28"},
  {"id": 11, "rating": 2, "review": "Very noisy during the weekends.", "date": "2022-07-05"},
  {"id": 12, "rating": 5, "review": "Baristas are friendly and skilled.", "date": "2022-07-12"},
  {"id": 13, "rating": 3, "review": "It's a bit pricier than other places in the area.", "date": "2022-07-18"},
  {"id": 14, "rating": 4, "review": "Love their rewards program.", "date": "2022-07-25"},
]

analyze_reviews(reviews)`},'Python CSV to JSON':function(chalInfo){return `import requests

response = requests.get("https://coderbyte.com/api/challenges/logs/user-info-csv")

# write your solution here
print(response)`},'Python Date Manipulation':function(chalInfo){return `import requests

response = requests.get("https://coderbyte.com/api/challenges/json/date-list")

# write your solution here
print(response)`},'Python Sort Wizards':function(chalInfo){return `import requests

response = requests.get("https://coderbyte.com/api/challenges/json/wizard-list")

# write your solution here
print(response)`},'Python Sort and Manipulate':function(chalInfo){return `import requests

response = requests.get("https://coderbyte.com/api/challenges/json/wizard-list")

# write your solution here
print(response)`},'Python Update DNA Sequence':function(chalInfo){return `def update_dna_sequence(sequence: str, action: dict) -> str:
  if action["type"] == "reverse":
    sequence = sequence
  elif action["type"] == "remove":
    sequence = sequence.replace(action["type"], "")
  elif action["type"] == "replace":
    sequence = sequence.replace(action["segment"], action["type"])
  return sequence

print(
  update_dna_sequence(
    "AAGATTAACA", 
    {"type": "replace", "segment": "AA", "replacement": "TT"}
  )
)`},'Python Token Padding':function(chalInfo){return `from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

texts = ["Sky is blue", "I love Coderbyte", "ChatGPT is by OpenAI"]`},'Python Sanitize Inputs':function(chalInfo){return `def execute(input):
    try:
        result = eval(input)
        return result
    except (ValueError, SyntaxError):
        return "Invalid input"

print(execute("1 + 2"))
print(execute("[1, 2, 3]"))
print(execute("__import__('os')"))`},'Python Command Injection':function(chalInfo){return `import os
import pickle

def process_command(data, command):
    try:
        result = os.system(command)
        obj = pickle.loads(data)
        
        return result, obj
    except Exception as e:
        return f"Error: {e}", None

# Don't remove below code, it is used for validation
print(process_command(b"cHl0aG9u", "ls"))
print(process_command(b"invalid_data", "echo Hello"))
print(process_command(b"Y3R5aG9u", "rm -rf /"))`},'PyTorch Basic Tensor':function(chalInfo){return `import torch`},'PyTorch Statistics':function(chalInfo){return `import torch`},'PyTorch Tensor Operations':function(chalInfo){return `import torch`},'PyTorch SVD':function(chalInfo){return `import torch`},'TensorFlow Determinant':function(chalInfo){return `import tensorflow as tf`},'TensorFlow Forward Pass':function(chalInfo){return `import tensorflow as tf
import io
import sys

# Define the network
model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(8, activation='relu', input_shape=(10,)),
    tf.keras.layers.Dense(1, activation='linear')
])

def forward_pass(model, input_data):
    # TODO: Implement the forward pass, and return the model's summary
    pass

# Test the network
input_data = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0])
print(forward_pass(model, input_data))`},'Django JSON Cleaning':function(chalInfo){return `
import requests
import json

def clean_data():
  r = requests.get('https://coderbyte.com/api/challenges/json/json-cleaning')
  return r.json()

print(clean_data())
    `},'Bash Simple File Size':function(chalInfo){return `
#!/bin/bash
echo "Hello world"
    `},'Bash Print Memory':function(chalInfo){return `
#!/bin/bash
echo "Hello world"
    `},'Bash Parse Logs':function(chalInfo){return `
#!/bin/bash
curl -s https://coderbyte.com/api/challenges/logs/web-logs-raw -O > /dev/null
cat web-logs-raw
    `},'Bash Directory List':function(chalInfo){return `#!/bin/bash

dirsToCreate=('Dir1', 'Dir2', 'Dir3', 'Dir4', 'Dir4')

# write your code here`},'Docker Install Python':function(chalInfo){return `
#!/bin/bash
echo "Hello world"
    `},'Docker Install Node.js':function(chalInfo){return `
#!/bin/bash
cat > Dockerfile
    `},'Docker Custom NGINX':function(chalInfo){return `
#!/bin/bash
cat > Dockerfile
    `},'Docker Custom Redis':function(chalInfo){return `
#!/bin/bash
cat > Dockerfile
    `},'Docker Custom Redis Cluster':function(chalInfo){return `
#!/bin/bash
cat > Dockerfile
    `},'Kubernetes Config Context':function(chalInfo){return `
#!/bin/bash
kubectl version
    `},'Kubernetes Install minikube':function(chalInfo){return `
#!/bin/bash
curl
    `},'Ansible Check Apache':function(chalInfo){return `
#!/bin/bash
echo "Hello world"
    `},'Ansible Modify Tasks':function(chalInfo){return `
#!/bin/bash

cat > verify.yml
echo "- hosts: all" >> verify.yml
echo "  tasks:" >> verify.yml
echo "    - name: install lldpad package" >> verify.yml
echo "      yum:" >> verify.yml
echo "        name: lldpad" >> verify.yml
echo "        state: latest" >> verify.yml
    `},'Python Kafka Consumer':function(chalInfo){return `
#!/bin/bash

cat > producer_test.py
echo "producer code goes here..." >> producer_test.py

cat producer_test.py
    `},'Selenium Simple URL Python':function(chalInfo){return `
#!/bin/bash
cat > 'SeleniumScript.py' <<- EOM
  # todo here
EOM

cat 'SeleniumScript.py'
    `},'Selenium Navigate URL Csharp':function(chalInfo){return `
#!/bin/bash
cat > 'SeleniumScript.cs' <<- EOM
  using OpenQA.Selenium.Chrome;

  namespace SeleniumDocs.UrlTest {
    public class UrlTest {
      public static void Main() {
        # todo here
      }
    }
  }
EOM

cat 'SeleniumScript.cs'
    `},'Selenium Page Contents Csharp':function(chalInfo){return `
#!/bin/bash
cat > 'SeleniumScript.cs' <<- EOM
  using OpenQA.Selenium.Chrome;

  namespace SeleniumDocs.UrlTest {
    public class UrlTest {
      public static void Main() {
        # todo here
      }
    }
  }
EOM

cat 'SeleniumScript.cs'
    `},'Selenium Page Login Page Csharp':function(chalInfo){return `
#!/bin/bash
cat > 'SeleniumScript.cs' <<- EOM
  using OpenQA.Selenium.Chrome;

  namespace SeleniumDocs.UrlTest {
    public class UrlTest {
      public static void Main() {
        # todo here
      }
    }
  }
EOM

cat 'SeleniumScript.cs'
    `},'Selenium Mouse Hover Java':function(chalInfo){return `
#!/bin/bash
cat > 'SeleniumScript.java' <<- EOM
  import org.openqa.selenium.By;
  import org.openqa.selenium.WebDriver;
  import org.openqa.selenium.WebElement;
  import org.openqa.selenium.interactions.Actions;

  public class SeleniumScript {
	
    public static void main(String[] args) {
      
      // your code here
      // todo

      driver.quit();
    }	
    
  }
EOM

cat 'SeleniumScript.java'
    `},'Selenium Page Scroll Java':function(chalInfo){return `
#!/bin/bash
cat > 'SeleniumScript.java' <<- EOM
  import org.openqa.selenium.By;
  import org.openqa.selenium.WebDriver;
  import org.openqa.selenium.WebElement;
  import org.openqa.selenium.JavascriptExecutor;
  import org.openqa.selenium.interactions.Actions;

  public class SeleniumScript {
	
    public static void main(String[] args) {
      
      // your code here
      // todo

      driver.quit();
    }	
    
  }
EOM

cat 'SeleniumScript.java'
    `},'Playwright Network Logging':function(chalInfo){return `import inspect
from playwright.sync_api import sync_playwright, Playwright

def network_events(playwright: Playwright):
  chromium = None
  # todo

# do not modify below this line
lines = inspect.getsource(network_events)
print(lines)`},'Playwright Mobile Device Clicks':function(chalInfo){return `import inspect
from playwright.sync_api import sync_playwright, Playwright

def network_events(playwright: Playwright):
  chromium = None
  # todo

# do not modify below this line
lines = inspect.getsource(network_events)
print(lines)`},'Cypress Page Navigation Test':function(chalInfo){return `
#!/bin/bash
cat > 'cypressTest.js' <<- EOM
  # todo
EOM

cat 'cypressTest.js'
    `},'Cypress Component Testing':function(chalInfo){return `
#!/bin/bash
cat > 'reactComponentTest.js' <<- EOM
  it('Button can be toggled and removed', () => {
    # todo
  })
EOM

cat 'reactComponentTest.js'
    `},'Git Simple Status':function(chalInfo){return `#!/bin/bash
git`},'Git Stashing':function(chalInfo){return `#!/bin/bash
git`},'Git Simple Stash':function(chalInfo){return `#!/bin/bash
git`},'Git Amend Commit':function(chalInfo){return `#!/bin/bash
git`},'Git Commit Correct File':function(chalInfo){return `#!/bin/bash
git`},'Git Merge Fix Conflicts':function(chalInfo){return `#!/bin/bash
git`},'Cpp OOP Average Pages':function(chalInfo){return `#include <iostream>
#include <string>
using namespace std;

class Book {
  // add attributes and constructor here
};

int main(void) {
  // create three Book objects and compute the average pages here
  return 0;
}`},'Cpp OOP Rectangle Metrics':function(chalInfo){return `#include <iostream>
#include <string>
using namespace std;

class Rectangle {
  // add attributes and constructor here
};

int main(void) {
  // create a Rectangle object and compute the area and perimeter here
  return 0;
}`},'Cpp OOP String Transformation':function(chalInfo){return `#include <iostream>
#include <string>
using namespace std;

class StringTransformer {
  // add attributes and constructor here
};

int main(void) {
  std::string inputText = "hello C++!";
  // use the StringTransformer class to transform and display the text here
  return 0;
}`},'Cpp OOP Dynamic Zoo':function(chalInfo){return `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Animal {
protected:
  std::string name;
  bool isHungry;

public:
  Animal(const std::string& n) : name(n), isHungry(true) {}

  virtual void sound() = 0;

  virtual void eat() {
    isHungry = false;
  }

  bool hungry() {
    return isHungry;
  }

  std::string getName() const {
    return name;
  }
};

class Lion : public Animal {
public:
  Lion(const std::string& n) : Animal(n) {}

  void sound() override {
    std::cout << name << " says: Roar!" << std::endl;
  }
};

int main() {
  // just a Lion for now
  Lion simba("Simba");
  simba.sound();
  return 0;
}`},'Cpp Endian Converter':function(chalInfo){return `#include <iostream>
#include <iomanip>
#include <cstdint>

class EndianConverter {
  // implement the required methods here...
};

int main() {
  uint32_t original = 0xDEADBEEF;
  uint32_t swapped = EndianConverter::swapEndian32(original);
  uint32_t extracted = EndianConverter::extractBits(original, 8, 8);
  uint32_t modified = EndianConverter::setBits(original, 0xFF, 16, 8);

  std::cout << std::hex << std::uppercase;
  std::cout << "Original: 0x" << original << std::endl;
  std::cout << "Swapped: 0x" << swapped << std::endl;
  std::cout << "Extracted: 0x" << extracted << std::endl;
  std::cout << "Modified: 0x" << modified << std::endl;

  return 0;
}`},'Cpp Simple Hex Parser':function(chalInfo){return `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <iomanip>
#include <cstdint>

class SimpleHexParser {
private:
  std::vector<uint8_t> data;

public:
  bool parseLine(const std::string& line);
  std::string getAsString() const;
  std::string getAsHex() const;
};

int main() {
  std::string hex1 = "43 2B 2B 20 69 73 20 66";
  std::string hex2 = "75 6E 21 20 3A 29 00 00";

  // demonstrate usage of the SimpleHexParser methods here...

  return 0;
}`},'Cpp Memory Buffer Parser':function(chalInfo){return `#include <iostream>
#include <iomanip>
#include <cstdint>
#include <cstring>

class MemoryBuffer {
private:
  uint8_t* buffer;
  size_t bufferSize;

public:
  MemoryBuffer(size_t size);
  ~MemoryBuffer();

  // implement the required methods here...
};

int main() {
  MemoryBuffer buffer(8);

  buffer.writeInt32(0xAABBCCDD, 0);
  std::cout << "Buffer after writing 0xAABBCCDD at offset 0:";
  std::cout << "Hex dump: " << buffer.dumpHex() << std::endl;

  buffer.swapEndian32(0);
  std::cout << "After endian swap at offset 0:";
  std::cout << "Hex dump: " << buffer.dumpHex() << std::endl;

  std::cout << "Read back value: 0x" << std::hex << std::uppercase 
            << buffer.readInt32(0) << std::endl;

  buffer.writeFloat(2.71828f, 0);
  std::cout << std::fixed << std::setprecision(5);
  std::cout << "Float value: " << buffer.readFloat(0) << std::endl;

  buffer.writeInt32(0xAABBCCDD, 0);
  std::cout << "Byte at offset 2: 0x" << std::hex << std::uppercase 
            << static_cast<int>(buffer.readByte(2)) << std::endl;

  return 0;
}`},'Swift JSON Simple':function(chalInfo){return `
import Foundation

struct Article: Decodable { 
  // todo
}

let JSON = """
{
    "title": "How to start coding in Swift",
    "url": "#",
    "category": "swift",
    "views": 0
}
"""

let jsonData = JSON.data(using: .utf8)!
let article: Article = try! JSONDecoder().decode(Article.self, from: jsonData)
print(article.title)`},'Swift Age Counting':function(chalInfo){return `
import Foundation

struct DataObject: Decodable {
    let data: String
}

let JSON = """
{"data":"key=IAfpK, age=58, key=WNVdi, age=64, key=jp9zt, age=47, key=0Sr4C, age=68, key=CGEqo, age=76, key=IxKVQ, age=79, key=eD221, age=29, key=XZbHV, age=32, key=k1SN5, age=88, key=4SCsU, age=65, key=q3kG6, age=33, key=MGQpf, age=13, key=Kj6xW, age=14, key=tg2VM, age=30, key=WSnCU, age=24, key=f1Vvz, age=46, key=dOS7A, age=72, key=tDojg, age=82, key=nZyJA, age=48, key=R8JTk, age=29, key=005Ot, age=66, key=HHROm, age=12, key=5yzG8, age=51, key=xMJ5D, age=38, key=TXtVu, age=82, key=Hz38B, age=84, key=WfObU, age=27, key=mmqYB, age=14, key=4Z3Ay, age=62, key=x3B0i, age=55, key=QCiQB, age=72, key=zGtmR, age=66, key=nlIN9, age=8, key=hKalB, age=50, key=Na33O, age=17, key=jMeXm, age=15, key=OO2Mc, age=32, key=hhowx, age=34, key=gLMJf, age=60, key=PblX6, age=66, key=8Vm5W, age=22, key=oZKd6, age=88, key=RXNfQ, age=25, key=3yy0p, age=64, key=FrQbL, age=80, key=vlUkk, age=55, key=DP8po, age=80, key=EroX6, age=84, key=3bsll, age=86, key=QhZjA, age=85, key=wm6uc, age=74, key=MC1FM, age=75, key=AMxZr, age=64, key=ee03Q, age=4, key=9fGea, age=41, key=3TE9U, age=74, key=FoSMR, age=13, key=4To0X, age=57, key=5CZY3, age=33, key=qFvKG, age=79, key=W7bUh, age=2, key=htab7, age=15, key=KRyu2, age=77, key=GLkk7, age=80, key=jnXf6, age=51, key=YBTJ9, age=43, key=auL0J, age=30, key=ZHmmd, age=4, key=01iNV, age=7, key=7ldyh, age=55, key=TjXbT, age=88, key=ochyW, age=3, key=lsGXW, age=1, key=5o7Bd, age=45, key=APWEf, age=79, key=LRmKc, age=81, key=uZIoQ, age=12, key=Zf79H, age=42, key=NrpEI, age=6, key=XzYKx, age=22, key=kk0sU, age=62, key=p5uue, age=74, key=WscQQ, age=75, key=tRogh, age=19, key=ur4rW, age=60, key=IkCeS, age=19, key=vtGK4, age=11, key=C87cQ, age=38, key=0qXDb, age=39, key=KtBjN, age=46, key=f2h36, age=3, key=tGzgU, age=38, key=hIrPv, age=0, key=Tq7IX, age=25, key=F4k9K, age=46, key=9duxK, age=17, key=jTHDj, age=68, key=6GHpE, age=1, key=ye9us, age=9, key=eOfZO, age=72, key=I25vO, age=88, key=nqtBH, age=38, key=Dwn6b, age=70, key=4Qkdc, age=37, key=xvOa3, age=77, key=dg4rX, age=30, key=S9YbW, age=73, key=WhQqH, age=22, key=fexMF, age=88, key=Gzr0n, age=16, key=yFfjA, age=73, key=EfAKS, age=88, key=5Enyf, age=12, key=DK3HU, age=25, key=iGEBf, age=13, key=7r5UR, age=27, key=TQx1J, age=33, key=VlFwT, age=26, key=gnEgG, age=10, key=6P8gz, age=3, key=JnQLt, age=14, key=D3WJv, age=58, key=EXPMD, age=66, key=RzIDx, age=17, key=m6oYq, age=46, key=XTKAk, age=78, key=ZPLrJ, age=33, key=pDktp, age=10, key=TE9BG, age=18, key=7IS0l, age=35, key=yMY5X, age=58, key=jniwe, age=29, key=eb7lG, age=6, key=uzaoH, age=2, key=pUQoE, age=64, key=JZcuo, age=20, key=XwKBi, age=73, key=Zv4q9, age=31, key=HMD5T, age=76, key=rA4bI, age=75, key=PAMR7, age=86, key=tb8mz, age=2, key=vPcXk, age=18, key=c0Ixk, age=5, key=nkRrD, age=63, key=ISzFh, age=7, key=kcC1y, age=71, key=6J0WQ, age=27, key=FgiVY, age=72, key=Z8M30, age=50, key=Ep2Br, age=48, key=w9MRR, age=1, key=GI7oe, age=49, key=3ehsB, age=67, key=UW3dX, age=87, key=094dk, age=64, key=6tW4g, age=83, key=dT9IK, age=39, key=AofBp, age=27, key=7flGb, age=71, key=IBDqH, age=18, key=K2qn9, age=60, key=Qe7YJ, age=13, key=jqCHl, age=1, key=3R2IN, age=1, key=oVzfV, age=22, key=3yGCN, age=47, key=DOMm4, age=89, key=7EFRj, age=33, key=t1qsV, age=39, key=CBal1, age=14, key=BC0vr, age=68, key=0yY6L, age=47, key=Z8kX8, age=62, key=5oH1d, age=66, key=w0r3A, age=6, key=Bu8uK, age=55, key=vyqhK, age=35, key=7Zgz6, age=58, key=T573t, age=18, key=Rr4WR, age=48, key=kxnBU, age=39, key=XI3Jo, age=45, key=IAE95, age=43, key=rfSBT, age=59, key=znDPW, age=57, key=mBDDN, age=4, key=2hL0t, age=35, key=MbHM6, age=33, key=bS5oR, age=88, key=Rav2A, age=24, key=aLQO7, age=74, key=QCTUi, age=81, key=0HZlb, age=39, key=zshkO, age=5, key=q5EUd, age=75, key=WwgjN, age=20, key=LzTMa, age=3, key=uumoL, age=32, key=m3LJI, age=80, key=rU10P, age=39, key=gVTQz, age=79, key=wZjna, age=47, key=3d1E0, age=77, key=Ra74M, age=89, key=FJXHG, age=11, key=MckmR, age=37, key=tSqfN, age=2, key=HHkpI, age=40, key=S7rIA, age=34, key=vnpjJ, age=2, key=t8WSa, age=84, key=38fyp, age=11, key=Znot2, age=72, key=OGqoG, age=65, key=7VKiL, age=58, key=UdlEG, age=79, key=BXxIS, age=47, key=eW6F8, age=10, key=GASTN, age=86, key=SP0yy, age=53, key=ysN9w, age=17, key=KVGGz, age=76, key=yhEVk, age=47, key=vvlgV, age=67, key=aIMuS, age=21, key=KcHZk, age=41, key=6n8pa, age=35, key=ADTut, age=3, key=WNJXO, age=37, key=qta1A, age=67, key=cJOTp, age=67, key=1Bgd3, age=71, key=sHepZ, age=67, key=JoMvH, age=65, key=h1gF0, age=53, key=we7hP, age=41, key=Ztl8x, age=8, key=7pkQj, age=43, key=fkBah, age=21, key=FWETS, age=55, key=Gb4IY, age=26, key=U88H6, age=57, key=iExWE, age=8, key=7sl6v, age=8, key=iwI1x, age=9, key=cdKUG, age=60, key=xb127, age=57, key=dqYi8, age=15, key=opO2h, age=80, key=RNux0, age=37, key=cooLT, age=7, key=qhzQn, age=18, key=uowal, age=10, key=YR8Oy, age=17, key=GwEwr, age=15, key=WIXKE, age=53, key=aeem8, age=88, key=UPYoP, age=85, key=IF1pO, age=11, key=R6pUy, age=37, key=vYADh, age=0, key=TIq4k, age=35, key=dCekr, age=56, key=HBbXO, age=84, key=Lo9h5, age=36, key=fqBW3, age=87, key=OQWCL, age=52, key=nlYrf, age=6, key=cUS5f, age=32, key=A5gR0, age=32, key=HpUXl, age=84, key=nOuUT, age=18, key=mfvjr, age=12, key=24FH4, age=13, key=2rQei, age=51, key=EGAAV, age=8, key=Q5ifr, age=50, key=AVpil, age=87, key=vRcjt, age=51, key=G53C3, age=53, key=bsZAz, age=66, key=a8rVi, age=28, key=qPs5m, age=48, key=hF1kt, age=78, key=GIDFA, age=32, key=d2Mg4, age=12, key=EoYwt, age=30, key=DL7zx, age=14, key=lsA6c, age=17, key=ExutD, age=82, key=YOSNP, age=53, key=PEfma, age=49, key=EA8Go, age=18, key=fGTSM, age=60, key=lRf1j, age=13, key=0iJGV, age=50, key=cFCfU, age=5, key=J8an1, age=48, key=dkSlj, age=5"}
"""

let jsonData = JSON.data(using: .utf8)!
let dataObject: DataObject = try! JSONDecoder().decode(DataObject.self, from: jsonData)
print(dataObject.data)`},'GraphQL Query Books':function(chalInfo){return `
query {
  book {
    title
  }
}`},'GraphQL Simple Mutation':function(chalInfo){return `
mutation CreateReviewForBook {
  createBookReview() {

  }
}`},'R Simple Frame':function(chalInfo){return `
myString <- "Hello, World!"
print ( myString)
`},'R Matrix Value Sum':function(chalInfo){return `
my_matrix = matrix(1:1, 1, 1)
my_sum <- 0
my_sum
`},'Node.js S3 Get File':function(chalInfo){return `const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  signer: { sign: async (request) => request }
});

console.log(s3);`},'Node.js S3 Get Metadata':function(chalInfo){return `const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: "us-east-1",
  signer: { sign: async (request) => request }
});

console.log(s3);`},'Node.js Debugging JSON Data':function(chalInfo){return `
const https = require('https');

https.get('https://coderbyte.com/api/challenges/json/age-counting', (resp) => {
  
  let content = '';

  // push data character by character to "content" variable
  resp.on('data', (c) => content += c);

  // when finished reading all data, parse it for what we need now
  resp.on('end', () => {

    let jsonContent = JSON.parse(content);
    let jsonContentArray = jsonContent.data.split(',');
    let keyArray = [];

    for (let i = 0; i < jsonContentArray.length; i++) {
      let keySplit = jsonContentArray[i].trim().split('=');
      keyArray.push(keySplit[1]);
    }

    console.log(keyArray.toString());

  });

});
    `},'Python ChromaDB Document Retrieval':function(chalInfo){return `import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
    
from haystack_integrations.document_stores.chroma import ChromaDocumentStore
from haystack_integrations.components.retrievers.chroma import ChromaEmbeddingRetriever
from haystack import Document
from sentence_transformers import SentenceTransformer

# Your code goes here

# do not modify "query_text" or "documents"
query_text = "How does RAG work?"

documents = [
  Document(content="Large Language Models (LLMs) are transforming AI."),
  Document(content="ChromaDB is a powerful vector database for search."),
  Document(content="Retrieval-Augmented Generation (RAG) enhances LLM responses."),
  Document(content="Vector embeddings represent text numerically."),
  Document(content="Haystack makes NLP easier with search pipelines."),
]

# Your code goes here

print("Top result:", None)`},'Python FAISS Vector Search':function(chalInfo){return `import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import faiss
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document

# Your code goes here

query_text = "How does RAG work?"

documents = [
  "Large Language Models (LLMs) are transforming AI.",
  "FAISS is a powerful vector database for search.",
  "Retrieval-Augmented Generation (RAG) enhances LLM responses.",
  "Vector embeddings represent text numerically.",
  "LangChain makes working with LLMs easier.",
]

# Your code goes here

print("Top results:", None)
`},'Python OpenAI LangChain RAG':function(chalInfo){return `import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

os.environ["OPENAI_API_KEY"] = 'API_KEY_DO_NOT_MODIFY'

import faiss
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document
from langchain_openai import ChatOpenAI

embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

documents = [
  "Large Language Models (LLMs) are transforming AI.",
  "FAISS is a powerful vector database for search.",
  "Retrieval-Augmented Generation (RAG) enhances LLM responses.",
  "Vector embeddings represent text numerically.",
  "LangChain makes working with LLMs easier.",
]

# Your code goes here

query_text = "How does RAG work?"

print("Retrieved Documents:", None)
print("Generated Answer:", None)`},'Node.js OpenAI Simple Text Completion':function(chalInfo){return `const https = require('https');

const OPENAI_API_ENDPOINT = 'api.openai.com';
const OPENAI_API_PATH = '/v1/chat/completions';
const OPENAI_API_KEY = 'API_KEY_DO_NOT_MODIFY';

const fetchCompletion = (prompt, callback) => {
  const postData = {};
  const options = {};

  const req = https.request(options, (res) => {});

  req.write(postData);
  req.end();
};

const main = () => {
  const prompt = 'What is the boiling point of water?';
  fetchCompletion(prompt, (error, completion) => {
    if (error) {
      console.error('Error fetching completion:', error);
      return;
    }
    console.log('Generated text: ' + completion);
  });
};

main();`},'Node.js OpenAI Model Identification':function(chalInfo){return `const https = require('https');

const OPENAI_API_ENDPOINT = 'api.openai.com';
const OPENAI_API_PATH = '/v1/chat/completions';
const OPENAI_API_KEY = 'API_KEY_DO_NOT_MODIFY';

const fetchCompletion = (prompt, callback) => {
  const postData = {};
  const options = {};

  const req = https.request(options, (res) => {});

  req.write(postData);
  req.end();
};

const main = () => {
  const prompt = 'Define "photosynthesis".';
  fetchCompletion(prompt, (error, response) => {
    if (error) {
      console.error('Error fetching completion:', error);
      return;
    }
    console.log(response);
  });
};

main();`},'Node.js OpenAI Simple Chat Completion':function(chalInfo){return `const https = require('https');

const OPENAI_API_ENDPOINT = 'api.openai.com';
const OPENAI_API_PATH = '/v1/chat/completions';
const OPENAI_API_KEY = 'API_KEY_DO_NOT_MODIFY';

const fetchChatCompletion = (messages, callback) => {
  const postData = {};
  const options = {};

  const req = https.request(options, (res) => {});

  req.write(postData);
  req.end();
};

const main = () => {
  const messages = [];
  fetchChatCompletion(messages, (error, completion) => {
    if (error) {
      console.error('Error fetching completion:', error);
      return;
    }
    console.log('Generated text: ' + completion);
  });
};

main();`},'Node.js OpenAI Chat Model':function(chalInfo){return `const https = require('https');

const OPENAI_API_ENDPOINT = 'api.openai.com';
const OPENAI_API_PATH = '/v1/chat/completions';
const OPENAI_API_KEY = 'API_KEY_DO_NOT_MODIFY';

const fetchChatCompletion = (messages, callback) => {
  const postData = {};
  const options = {};

  const req = https.request(options, (res) => {});

  req.write(postData);
  req.end();
};

const main = () => {
  const messages = [];
  fetchChatCompletion(messages, (error, response) => {
    if (error) {
      console.error('Error fetching completion:', error);
      return;
    }
    console.log(JSON.stringify(response));
  });
};

main();`},'Node.js OpenAI MultiTurn Chat':function(chalInfo){return `const https = require('https');

const OPENAI_API_ENDPOINT = 'api.openai.com';
const OPENAI_API_PATH = '/v1/chat/completions';
const OPENAI_API_KEY = 'API_KEY_DO_NOT_MODIFY';

const fetchChatCompletion = (messages, callback) => {
  const postData = {};
  const options = {};

  const req = https.request(options, (res) => {});

  req.write(postData);
  req.end();
};

const main = () => {
  const initialMessage = {
    role: 'user',
    content:
      'I plan to visit Paris. Can you recommend a top sightseeing spot?',
  };
  const messages = [initialMessage];
  const recommendationsRequests = [
    'Great! Can you recommend another sightseeing spot?',
    'Awesome! Any more recommendations?',
  ];

  const iterateConversation = (recommendationIndex) => {};

  iterateConversation(0);
};

main();`},'Python OpenAI Simple Chat Completion':function(chalInfo){return `import requests
import json

OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
OPENAI_API_KEY = 'API_KEY_DO_NOT_MODIFY'

def fetch_chat_completion(messages):
  headers = {}
  data = {}
  response = requests.post(OPENAI_API_ENDPOINT, headers=headers, data=json.dumps(data))
  if response.status_code == 200:
    return response
  else:
    raise Exception("Error fetching completion: " + response.text)

def main():
  messages = []
  try:
    completion = fetch_chat_completion(messages)
    print(f'Generated text: {completion}')
  except Exception as e:
    print(str(e))

if __name__ == '__main__':
  main()`},'Python OpenAI Model Identification':function(chalInfo){return `import requests
import json

OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
OPENAI_API_KEY = 'API_KEY_DO_NOT_MODIFY'

def fetch_chat_completion(messages):
  headers = {}
  data = {}
  response = requests.post(OPENAI_API_ENDPOINT, headers=headers, data=json.dumps(data))
  if response.status_code == 200:
    return response
  else:
    raise Exception("Error fetching completion: " + response.text)

def main():
  messages = []
  try:
    completion = fetch_chat_completion(messages)
    print(f'Generated text: {completion}')
  except Exception as e:
    print(str(e))

if __name__ == '__main__':
  main()`},'Python OpenAI MultiTurn Chat':function(chalInfo){return `import requests
import json

OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
OPENAI_API_KEY = 'API_KEY_DO_NOT_MODIFY'

def fetch_chat_completion(messages):
  headers = {}
  data = {}
  response = requests.post(OPENAI_API_ENDPOINT, headers=headers, json=data)
  if response.status_code != 200:
    raise Exception("Error fetching completion: " + response.text)

def main():
  messages = [{'role': 'user', 'content': 'I plan to visit Paris. Can you recommend a top sightseeing spot?'}]
  recommendations_requests = [
    'Great! Can you recommend another sightseeing spot?',
    'Awesome! Any more recommendations?',
  ]
  try:
    fetch_chat_completion(messages)
  except Exception as e:
    print(str(e))

  print(json.dumps(messages, indent=4))

if __name__ == '__main__':
  main()`},'Apex Get Single Account':function(chalInfo){return `accts = [];
System.debug();`},'Apex Get C Suite':function(chalInfo){return `public class ContactSearch {
  public List<Contact> searchForCSuite() {
    return null;
  }
}

ContactSearch c = new ContactSearch();`},'Apex Trigger Testing':function(chalInfo){return `System.debug('Need to update books');`},'Apex API Request Names':function(chalInfo){return `Http http = new Http();
// need to get data from: https://coderbyte.com/api/challenges/json/quidditch-list`},'ABAP String Parse':function(chalInfo){return `DATA str TYPE string VALUE 'Test ABAP Long String Needs Printing'.
WRITE str.`},'ABAP Fibonacci':function(chalInfo){return `WRITE 'Hello world!'.`},'Glide Approvals':function(chalInfo){return `var gr = new GlideRecord('my_table'); `},'Glide Table Transfer':function(chalInfo){return `var gr = new GlideRecord('my_table'); `},'Node.js Azure Container List':function(chalInfo){return `const { BlobServiceClient } = require("@azure/storage-blob");

// key to connect to azure
AZURE_SAS_KEY="https://coderbytechallenges.blob.core.windows.net?sv=2022-11-02&ss=bf&srt=co&sp=rltf&se=2026-01-30T00:53:28Z&st=2024-01-29T16:53:28Z&spr=https&sig=3amz7gAwJ5UTK1zbSMhq6bgMguoUd9d250%2FW4x%2FBfko%3D"
    `},'Node.js Azure Blob Contents':function(chalInfo){return `const { BlobServiceClient } = require("@azure/storage-blob");

// key to connect to azure
AZURE_SAS_KEY="https://coderbytechallenges.blob.core.windows.net?sv=2022-11-02&ss=bf&srt=co&sp=rltf&se=2026-01-30T00:53:28Z&st=2024-01-29T16:53:28Z&spr=https&sig=3amz7gAwJ5UTK1zbSMhq6bgMguoUd9d250%2FW4x%2FBfko%3D"
    `},};window.__DEFAULT_TEMPLATE_FOR_MOBILE_UI={'Android Filter Movies':function(userContent){var finalOutput='';if(userContent&&userContent.indexOf('error:')!==-1){finalOutput=`<li style="color: #c53b3b; line-height: 21px; font-size: 14px;">${userContent}</li>`}else if(userContent){var splitItems=userContent.split(';');for(var i=0;i<splitItems.length-1;i++){var item=splitItems[i].trim();item=item.replace('name=','').replace('username=','').replace('email=','').replace('id=','');itemSplit=item.split(',');itemNewLines=itemSplit.join('<br>');finalOutput+=`<li style="margin-bottom: 10px; border-bottom: 1px solid #d9d9d9; padding-bottom: 10px; line-height: 21px;">${itemNewLines}</li>`}}
return `
      <div>
        <aside style="background: #3b50bb; padding: 15px 15px; font-family: 'Roboto'; color: white;">Log Items</aside>
        <ul style="padding: 15px 15px; background: #efefef; font-family: 'Roboto';color: #323232;">
          ${finalOutput}
        </ul>
      </div>
    `},'Android Local Cache':function(userContent){var finalOutput='';if(userContent&&userContent.indexOf('error:')!==-1){finalOutput=`<li style="color: #c53b3b; line-height: 21px; font-size: 14px;">${userContent}</li>`}else if(userContent){var splitItems=userContent.split(' ');for(var i=0;i<splitItems.length;i++){var item=splitItems[i].trim();finalOutput+=`<li style="margin-bottom: 10px; border-bottom: 1px solid #d9d9d9; padding-bottom: 10px; line-height: 21px;">${item}</li>`}}
return `
      <div>
        <aside style="background: #3b50bb; padding: 15px 15px; font-family: 'Roboto'; color: white;">Cache Logs</aside>
        <ul style="padding: 15px 15px; background: #efefef; font-family: 'Roboto';color: #323232;">
          ${finalOutput}
        </ul>
      </div>
    `},'iOS Filter Movies':function(userContent){var finalOutput='';if(userContent&&userContent.indexOf('error:')!==-1){finalOutput=`<li style="color: #c53b3b; line-height: 21px; font-size: 14px;">${userContent}</li>`}else if(userContent){var splitItems=userContent.split(';');for(var i=0;i<splitItems.length-1;i++){var item=splitItems[i].trim();item=item.replace('name=','').replace('username=','').replace('email=','').replace('id=','');itemSplit=item.split(',');itemNewLines=itemSplit.join('<br>');finalOutput+=`<li style="margin-bottom: 10px; border-bottom: 1px solid #d9d9d9; padding-bottom: 10px; line-height: 21px;">${itemNewLines}</li>`}}
return `
      <div>
        <aside style="background: #3b50bb; padding: 15px 15px; font-family: 'Roboto'; color: white;">Log Items</aside>
        <ul style="padding: 15px 15px; background: #efefef; font-family: 'Roboto';color: #323232;">
          ${finalOutput}
        </ul>
      </div>
    `},'iOS Local Cache':function(userContent){var finalOutput='';if(userContent&&userContent.indexOf('error:')!==-1){finalOutput=`<li style="color: #c53b3b; line-height: 21px; font-size: 14px;">${userContent}</li>`}else if(userContent){var splitItems=userContent.split(' ');for(var i=0;i<splitItems.length;i++){var item=splitItems[i].trim();finalOutput+=`<li style="margin-bottom: 10px; border-bottom: 1px solid #d9d9d9; padding-bottom: 10px; line-height: 21px;">${item}</li>`}}
return `
      <div>
        <aside style="background: #3b50bb; padding: 15px 15px; font-family: 'Roboto'; color: white;">Cache Logs</aside>
        <ul style="padding: 15px 15px; background: #efefef; font-family: 'Roboto';color: #323232;">
          ${finalOutput}
        </ul>
      </div>
    `},}