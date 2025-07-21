window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS=function(){return `
    // the delay function for when setting state, we wait before interacting with UI
    function __delay(ms) {
      return new Promise((res) => {
        return setTimeout(res, ms);
      });
    }

    // modifying input value in DOM directly
    function setNativeValue(element, value) {
      const { set: valueSetter } = Object.getOwnPropertyDescriptor(element, 'value') || {}
      const prototype = Object.getPrototypeOf(element)
      const { set: prototypeValueSetter } = Object.getOwnPropertyDescriptor(prototype, 'value') || {}
      if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value)
      } else if (valueSetter) {
        valueSetter.call(element, value)
      } else {
        console.log('The given element does not have a value setter, so tests cannot run.');
      }
      var event = new Event('change', { bubbles: true });
      element.dispatchEvent(event);
      var inputEvent = new Event('input', { bubbles: true });
      element.dispatchEvent(inputEvent);
    }

    // modifying select element in DOM
    function setSelectValue(selectElement, value) {
      var nativeSelectValueSetter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;
      nativeSelectValueSetter.call(selectElement, value);
      var event = new Event('change', { bubbles: true });
      selectElement.dispatchEvent(event);
    }

    // modifying radio buttons in DOM
    function setRadioValue(radioButton, value) {
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'checked').set;
      nativeInputValueSetter.call(radioButton, value);
      var event = new Event('change', { bubbles: true });
      radioButton.dispatchEvent(event);
    }
  `};window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP=function(info){return `
    // data to post
    var postData = {
      username: '${info.username}',
      challenge: '${info.challenge}',
      tests: [],
    };
  `};window.__DEFAULT_CODE_FRONTEND_TESTS_POST=function(){return `
    var bodyNode = document.getElementsByTagName('body')[0];
    function createNode(content) {
      var node = document.createElement('P');
      var textNode = document.createTextNode(content);
      node.appendChild(textNode);
      return node;
    }
    for (var i = 0; i < postData.tests.length; i++) {
      var showTestNode = createNode('test: ' + postData.tests[i].status);
      bodyNode.appendChild(showTestNode);
    }
    var postPromise = new Promise(function(resolve, reject) {
      console.log('posting...', postData);
      fetch('https://coderbyte.com/backend/requests/editor/submit_frontend_challenge_complete.php?u=' + postData.username + '&c=' + postData.challenge, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        resolve(response.json());
      })
      .catch(error => {
        var showErrNode = createNode('error: ' + error);
        bodyNode.appendChild(showErrNode);
        console.error("Error:", error);
      });
    });
    var result = await postPromise;
    var showFinalNode = createNode('final: ' + JSON.stringify(result));
    bodyNode.appendChild(showFinalNode);
    console.log('CB POST RESULT', result);
  `};window.__DEFAULT_CODE_FRONTEND_TESTS={'HTML Anchor Link':function(info){return `
      <script>
        /* RUNNING TESTS */
        var ___tests = async function() {

          ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

          // app entry and elements
          var anchor = document.querySelector('a');
          
          // test 1
          if (anchor) {
            if (anchor.href.indexOf('https://coderbyte.com') !== -1 && anchor.innerHTML.toLowerCase().indexOf('click here to go to coderbyte') !== -1) {
              postData.tests.push({status: 'pass'});
            } else {
              postData.tests.push({status: 'fail'});
            }
          } else {
            postData.tests.push({status: 'fail'});
          }

          // post to coderbyte
          ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

        };setTimeout(___tests, 2000);
      </script>
    `},'HTML Basic Table':function(info){return `
      <script>
        /* RUNNING TESTS */
        var ___tests = async function() {

          ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

          // app entry and elements
          var tableTr = document.querySelectorAll('table tr');
          var tableTh = document.querySelectorAll('table th');
          var tableTd = document.querySelectorAll('table td');
          
          // test 1
          if (tableTr.length === 3 && tableTh.length === 3 && tableTd.length === 6) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }

          // post to coderbyte
          ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

        };setTimeout(___tests, 2000);
      </script>
    `},'Bootstrap Simple Buttons':function(info){return `
      <script>
        /* RUNNING TESTS */
        var ___tests = async function() {

          ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

          // app entry and elements
          var button1 = document.querySelectorAll('.btn-success');
          var button2 = document.querySelectorAll('.btn-danger');
          
          // test 1
          if (button1 && button2 && Array.from(button1).length > 0 && Array.from(button2).length > 0) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }

          // post to coderbyte
          ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

        };setTimeout(___tests, 2000);
      </script>
    `},'HTML Infinite Scroll':function(info){return `
      <script>
        /* RUNNING TESTS */
        var ___tests = async function() {

          ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}
          var allTestsPassed = true;

          // app entry and elements
          var list = document.getElementById("list");

          // test 1: check if initial items are added
          if (list.children.length < 20) {
            allTestsPassed = false;
          }

          // simulate scroll to bottom
          window.scrollTo(0, document.body.scrollHeight);

          // Slight delay to allow potential rerenders
          await new Promise((r) => setTimeout(r, 100));

          // test 2: check if more items are added after scrolling
          if (list.children.length < 40) {
            allTestsPassed = false;
          }

          if (allTestsPassed) {
            postData.tests.push({ status: "pass" });
          } else {
            postData.tests.push({ status: "fail" });
          }

          // post to coderbyte
         ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

        };setTimeout(___tests, 2000);
      </script>
    `},'HTML Modal Popup':function(info){return `
      <script>
        /* RUNNING TESTS */
        var ___tests = async function() {

          ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
          ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

          // app entry and elements
          var modal = document.getElementById("my-modal");
          var openModalBtn = document.getElementById("open-modal-btn");
          var closeModalSpan = document.querySelector(".close");

          // test 1: check if modal opens
          openModalBtn.click();
          await __delay(500);

          if (getComputedStyle(modal).display !== "block") {
            postData.tests.push({ status: "fail" });
          } else {
            postData.tests.push({ status: "pass" });
          }

          // test 2: check if modal closes when clicking the close button
          closeModalSpan.click();
          await __delay(500);

          if (getComputedStyle(modal).display !== "none") {
            postData.tests.push({ status: "fail" });
          } else {
            postData.tests.push({ status: "pass" });
          }

          // test 3: check if modal closes when clicking outside the modal
          openModalBtn.click();
          await __delay(500);

          modal.dispatchEvent(new MouseEvent("click", { bubbles: true }));
          await __delay(500);

          if (getComputedStyle(modal).display !== "none") {
            postData.tests.push({ status: "fail" });
          } else {
            postData.tests.push({ status: "pass" });
          }

          // post to coderbyte
         ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

        };setTimeout(___tests, 2000);
      </script>
    `},'HTML Tabs Component':function(info){return `
      <script>
        /* RUNNING TESTS */
        var ___tests = async function() {

          ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
          ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

          // app entry and elements
          var tabs = document.getElementById("tabs").getElementsByClassName("tab");
          var contents = document.getElementsByClassName("tab-content");

          // test 1: check if the first tab content is initially visible
          tabs[0].click();
          await __delay(1000);

          if (getComputedStyle(contents[0]).display !== "block") {
            postData.tests.push({ status: "fail" });
          } else {
            postData.tests.push({ status: "pass" });
          }

          // test 2: click the second tab and check if the second content is visible
          tabs[1].click();
          await __delay(1000);

          if (getComputedStyle(contents[1]).display !== "block") {
            postData.tests.push({ status: "fail" });
          } else {
            postData.tests.push({ status: "pass" });
          }

          // test 3: click the third tab and check if the third content is visible
          tabs[2].click();
          await __delay(1000);
          
          if (getComputedStyle(contents[2]).display !== "block") {
            postData.tests.push({ status: "fail" });
          } else {
            postData.tests.push({ status: "pass" });
          }

          // post to coderbyte
         ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

        };setTimeout(___tests, 2000);
      </script>
    `},'HTML CSS Grid Layout':function(info){return `
      <script>
        /* RUNNING TESTS */
        var ___tests = async function() {

          ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}
          var allTestsPassed = true;

          // app entry and elements
          var gridContainer = document.getElementById("grid-container");
          var gridItems = gridContainer.getElementsByClassName("grid-item");

          // test 1: check if grid layout is applied
          if (getComputedStyle(gridContainer).display !== "grid") {
            allTestsPassed = false;
          }

          // test 2: check if grid has correct gap
          if (getComputedStyle(gridContainer).gap !== "10px") {
            allTestsPassed = false;
          }

          // test 3: check if grid items have a border, padding, and background color
          for (var item of gridItems) {
            var style = getComputedStyle(item);
            if (!style.border || !style.padding || !style.backgroundColor) {
              allTestsPassed = false;
              break;
            }
          }

          if (allTestsPassed) {
            postData.tests.push({ status: "pass" });
          } else {
            postData.tests.push({ status: "fail" });
          }

          // post to coderbyte
         ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

        };setTimeout(___tests, 2000);
      </script>
    `},'HTML CSS Footer Layout':function(info){return `
      <script>
        /* RUNNING TESTS */
        var ___tests = async function() {

          ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}
          var allTestsPassed = true;

          // app entry and elements
          var footer = document.querySelector(".site-footer");
          var footerSections = footer.querySelectorAll(".footer-section");

          // test 1: check if footer is positioned at the bottom
          if (footer.getBoundingClientRect().bottom !== window.innerHeight) {
            allTestsPassed = false;
          }

          // test 2: check if footer sections are evenly distributed
          if (getComputedStyle(footer).justifyContent !== "space-around" && getComputedStyle(footer).justifyContent !== "space-between" && getComputedStyle(footer).justifyContent !== "space-evenly") {
            allTestsPassed = false;
          }

          // test 3: check if footer sections have correct padding
          for (var section of footerSections) {
            if (getComputedStyle(section).padding !== "0px 10px") {
              allTestsPassed = false;
              break;
            }
          }

          if (allTestsPassed) {
            postData.tests.push({ status: "pass" });
          } else {
            postData.tests.push({ status: "fail" });
          }

          // post to coderbyte
         ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

        };setTimeout(___tests, 2000);
      </script>
    `},'HTML XSS Identification':function(info){return `
      <script>
        /* RUNNING TESTS */
        var ___tests = async function() {

          ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

          // simulate a user entering JavaScript code
          var userInput = "<script>alert('XSS');";
          document.getElementById('userData').value = userInput;
          displayData();

          // check if script tags are in the innerHTML
          var displayContent = document.getElementById('displayArea').innerHTML;
          if (displayContent.includes("<script>") || !displayContent.includes("alert('XSS')")) {
            postData.tests.push({ status: "fail" });
          } else {
            postData.tests.push({ status: "pass" });
          }

          // post to coderbyte
         ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

        };setTimeout(___tests, 2000);
      </script>
    `},'HTML CSRF Implementation':function(info){return `
      <script>
        /* RUNNING TESTS */
        var ___tests = async function() {

          ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

          var token = document.querySelector('[name="csrfToken"]').value;

          // check if CSRF token is added
          if (token === 'secureRandomToken') {
            postData.tests.push({ status: "pass" });
          } else {
            postData.tests.push({ status: "fail" });
          }

          // post to coderbyte
         ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

        };setTimeout(___tests, 2000);
      </script>
    `},'JavaScript Button Toggle':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('root');
        var button = root.querySelector('button');
        
        // test 1
        if (!button) {
          postData.tests.push({status: 'fail'});
        } else {
          var stateInit = button.innerHTML ? button.innerHTML.toLowerCase().trim() : '';
          button.click();
          var stateClicked = button.innerHTML.toLowerCase().trim();
          if ((stateClicked === 'on' || stateClicked === 'off') && stateClicked !== stateInit) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'JavaScript Simple Counter':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('root');
        var button = root.querySelector('#mainButton');
        var area = root.querySelector('#mainArea');
        
        // test 1
        if (!button) {
          postData.tests.push({status: 'fail'});
        } else {
          var counterInit = parseInt(area.querySelector('span').innerHTML);
          button.click();
          var counterNext = parseInt(area.querySelector('span').innerHTML);
          if (counterNext === (counterInit + 1)) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'React Button Toggle':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('root');
        var button = root.querySelector('button');
        
        // test 1
        if (!button) {
          postData.tests.push({status: 'fail'});
        } else {
          var stateInit = button.innerHTML ? button.innerHTML.toLowerCase().trim() : '';
          button.click();
          await __delay(1000);
          var stateClicked = button.innerHTML.toLowerCase().trim();
          if ((stateClicked === 'on' || stateClicked === 'off') && stateClicked !== stateInit) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'React Context API':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var button = document.getElementById('changeFavorite');
        var favoriteLanguage = document.getElementById('favoriteLanguage');
        var userCodeMatchesPatterns = [
          ${info.code.indexOf('createContext') !== -1},
          ${info.code.indexOf('.Provider') !== -1}
        ];
        
        // test 1
        if (!button || !userCodeMatchesPatterns[0] || !userCodeMatchesPatterns[1]) {
          postData.tests.push({status: 'fail'});
        } else {
          var stateInit = favoriteLanguage.innerHTML ? favoriteLanguage.innerHTML.toLowerCase().trim() : '';
          button.click();
          await __delay(1000);
          var stateClicked = favoriteLanguage.innerHTML.toLowerCase().trim();
          if (stateInit.indexOf('javascript') !== -1 && stateClicked.indexOf('python') !== -1) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'React Simple Counter':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('root');
        var button = root.querySelector('#mainButton');
        var area = root.querySelector('#mainArea');
        
        // test 1
        if (!button) {
          postData.tests.push({status: 'fail'});
        } else {
          var counterInit = parseInt(area.querySelector('span').innerHTML);
          button.click();
          await __delay(1000);
          var counterNext = parseInt(area.querySelector('span').innerHTML);
          if (counterNext === (counterInit + 1)) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'React List':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('root');
        var htmlContents = root.outerHTML;

        // test 1
        if (htmlContents && 
          htmlContents.indexOf('Daniel') !== -1 && 
          htmlContents.indexOf('John') !== -1 && 
          htmlContents.indexOf('Jen') !== -1) {
          postData.tests.push({status: 'pass'});
        } else {
          postData.tests.push({status: 'fail'});
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'React Live Paragraph':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}
        var allTestsPassed = true;

        // app entry and elements
        var root = document.getElementById('root');
        var inputElement = root.querySelector('input');
        var paragraphElement = root.querySelector('p');

        // test 1: check if elements exist
        if (!(inputElement && paragraphElement)) {
          allTestsPassed = false;
        }

        // test 2: check if paragraph reflects input text
        setNativeValue(inputElement, 'test text');
        await __delay(1000);
        if (paragraphElement.textContent !== 'test text') {
          allTestsPassed = false;
        }

        // test 3: check if paragraph reflects changes to input text
        setNativeValue(inputElement, 'updated text');
        await __delay(1000);
        if (paragraphElement.textContent !== 'updated text') {
          allTestsPassed = false;
        }

        if (allTestsPassed) {
          postData.tests.push({ status: 'pass' });
        } else {
          postData.tests.push({ status: 'fail' });
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'React Color Dropdown':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}
        var allTestsPassed = true;

        // app entry and elements
        var root = document.getElementById('root');
        var selectElement = root.querySelector('select');
        var paragraphElement = root.querySelector('p');

        // test 1: check if elements exist
        if (!(selectElement && paragraphElement)) {
          allTestsPassed = false;
        }

        // test 2: check if paragraph reflects selected color (default)
        if (paragraphElement.textContent !== 'You have selected: Red') {
          allTestsPassed = false;
        }

        // test 3: check if paragraph reflects changes to selected color
        setSelectValue(selectElement, 'Blue');
        if (paragraphElement.textContent !== 'You have selected: Blue') {
          allTestsPassed = false;
        }

        // test 4: check if selecting a different color updates the paragraph
        setSelectValue(selectElement, 'Green');
        if (paragraphElement.textContent !== 'You have selected: Green') {
          allTestsPassed = false;
        }

        if (allTestsPassed) {
          postData.tests.push({ status: 'pass' });
        } else {
          postData.tests.push({ status: 'fail' });
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'React Weather Dashboard':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('root');
        var citySearchInput = root.querySelector('#citySearch');
        var searchButton = root.querySelector('#searchButton');
        var weatherDataDiv = null;
        var previousSearchesDiv = root.querySelector('#previousSearches');

        // test 1: check if search returns correct data for New York
        setNativeValue(citySearchInput, 'New York');
        searchButton.click();
        await __delay(1000);
        weatherDataDiv = root.querySelector('#weatherData');
        if (
          !weatherDataDiv.innerHTML.includes('22') ||
          !weatherDataDiv.innerHTML.includes('56%')
        ) {
          postData.tests.push({ status: 'fail' });
        } else {
          postData.tests.push({ status: 'pass' });
        }

        // test 2: check if city not found message appears for invalid city
        setNativeValue(citySearchInput, 'SomeInvalidCity');
        searchButton.click();
        await __delay(1000);
        if (!weatherDataDiv.innerHTML.includes('City not found.')) {
          postData.tests.push({ status: 'fail' });
        } else {
          postData.tests.push({ status: 'pass' });
        }

        // test 3: check if previously searched city appears in the list
        if (!previousSearchesDiv.innerHTML.includes('New York')) {
          postData.tests.push({ status: 'fail' });
        } else {
          postData.tests.push({ status: 'pass' });
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'React Quiz Builder':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('root');
        var question = root.querySelector('#question');
        var option1 = root.querySelector('#option1');
        var submitBtn = root.querySelector('#submitBtn');
        var feedback = root.querySelector('#feedback');

        // test 1: check if the first question is displayed
        if (!question.textContent.includes('What is the capital of France?')) {
          postData.tests.push({ status: 'fail' });
        } else {
          postData.tests.push({ status: 'pass' });
        }

        // test 2: select the incorrect option and check feedback
        setRadioValue(option1, true);
        submitBtn.click();
        await __delay(1000);
        if (!feedback.textContent.includes('Incorrect!')) {
          postData.tests.push({ status: 'fail' });
        } else {
          postData.tests.push({ status: 'pass' });
        }

        // test 3: check if the first question is displayed
        if (!question.textContent.includes('What is the capital of Germany?')) {
          postData.tests.push({ status: 'pass' });
        } else {
          postData.tests.push({ status: 'pass' });
        }

        // test 4: select the correct option and check feedback
        var option1 = root.querySelector('#option1');
        setRadioValue(option1, true);
        submitBtn.click();
        await __delay(1000);
        if (!question.textContent.includes('Quiz Complete!')) {
          postData.tests.push({ status: 'pass' });
        } else {
          postData.tests.push({ status: 'pass' });
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'React Phone Book':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('root');
        var firstName = root.querySelector('.userFirstname');
        var lastName = root.querySelector('.userLastname');
        var phone = root.querySelector('.userPhone');
        var submitButton = root.querySelector('.submitButton');
        var informationTable = null;
        var infoContents = null;

        // submit first pre-filled data
        submitButton.click();
        await __delay(1000);

        // test 1
        informationTable = root.querySelector('.informationTable');
        infoContents = informationTable.outerHTML;
        if (infoContents && 
          infoContents.indexOf('Coder') !== -1 && 
          infoContents.indexOf('Byte') !== -1 && 
          infoContents.indexOf('8885559999') !== -1) {
          postData.tests.push({status: 'pass'});
          // try auto-ordering in ABC order
          setNativeValue(lastName, 'AAA');
          setNativeValue(firstName, 'AAA');
          setNativeValue(phone, '8885551111');
          // see if in correct spot
          submitButton.click();
          await __delay(1000);
          infoContents = informationTable.outerHTML;
          if (infoContents && infoContents.indexOf('AAA') !== -1 && infoContents.indexOf('AAA') < infoContents.indexOf('Byte')) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        } else {
          // if fails this one, then try submitting new field
          postData.tests.push({status: 'fail'});

          // simulate values
          setNativeValue(firstName, 'John');
          setNativeValue(lastName, 'Smith');
          setNativeValue(phone, '8885550000');

          // click submit button
          submitButton.click();
          await __delay(1000);

          // test 2
          infoContents = informationTable.outerHTML;
          if (infoContents && 
            infoContents.indexOf('John') !== -1 && 
            infoContents.indexOf('Smith') !== -1 && 
            infoContents.indexOf('8885550000') !== -1) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'React Tic Tac Toe':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('root');
        var squares = root.getElementsByClassName('square');

        // test 1
        if (squares && squares.length === 9) {
          // click all squares, do not use for loop because it does not work properly
          squares[0].click(); await __delay(10);
          squares[1].click(); await __delay(10);
          squares[2].click(); await __delay(10);
          squares[3].click(); await __delay(10);
          squares[4].click(); await __delay(10);
          squares[5].click(); await __delay(10);
          squares[6].click(); await __delay(10);
          await __delay(1000);
          // get square values
          var s1 = squares[0].innerHTML.toLowerCase().trim();
          var s2 = squares[1].innerHTML.toLowerCase().trim();
          var s7 = squares[6].innerHTML.toLowerCase().trim();
          if (s1 !== s2 && s1.length <= 2 && (s1.indexOf('x') !== -1 || s1.indexOf('o') !== -1) && (s2.indexOf('x') !== -1 || s2.indexOf('o') !== -1) && (s7.indexOf('x') !== -1 || s7.indexOf('o') !== -1)) {
            postData.tests.push({status: 'pass'});
            // test 2
            squares[0].click();
            await __delay(1000);
            var s1_again = squares[0].innerHTML.toLowerCase().trim();
            if ((s1.indexOf('x') !== -1 || s1.indexOf('o') !== -1) && (s1 === s1_again)) {
              postData.tests.push({status: 'pass'});
              // only if both tests passed do we check if "checkWinner" function will work
              var winnerArea = document.getElementById('winnerArea');
              var winnerContents = winnerArea ? winnerArea.outerHTML : '';
              if (winnerContents.toLowerCase().indexOf('x') !== -1) {
                postData.tests.push({status: 'pass'});
              } else {
                postData.tests.push({status: 'fail'});
              }
            } else {
              postData.tests.push({status: 'fail'});
            }
          } else {
            postData.tests.push({status: 'fail'});
          }
        } else {
          postData.tests.push({status: 'fail'});
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'React Letter Tiles':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('root');
        var tiles = root.getElementsByTagName('button');

        // test 1
        if (tiles && tiles.length >= 26) {
          postData.tests.push({status: 'pass'});
          // click some tiles, do not use for loop because it does not work properly
          tiles[0].click(); await __delay(10);
          tiles[1].click(); await __delay(10);
          tiles[1].click(); await __delay(10);
          tiles[1].click(); await __delay(10);
          tiles[4].click(); await __delay(10);
          tiles[9].click(); await __delay(10);
          await __delay(1000);
          var outputString = document.getElementById('outputString');
          // make sure it matches final correct string
          if (outputString.innerHTML && outputString.innerHTML.indexOf('A_EJ') !== -1) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        } else {
          postData.tests.push({status: 'fail'});
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'React TypeScript Button Toggle':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('root');
        var button = root.querySelector('button');
        
        // test 1
        if (!button) {
          postData.tests.push({status: 'fail'});
        } else {
          var stateInit = button.innerHTML ? button.innerHTML.toLowerCase().trim() : '';
          button.click();
          await __delay(1000);
          var stateClicked = button.innerHTML.toLowerCase().trim();
          if ((stateClicked === 'on' || stateClicked === 'off') && stateClicked !== stateInit) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'React Native Simple Counter':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('root');
        var button = root.querySelector('#mainButton');
        var area = root.querySelector('#actualCount');
        
        // test 1
        if (!button) {
          postData.tests.push({status: 'fail'});
        } else {
          var counterInit = parseInt(area.innerHTML);
          button.click();
          await __delay(1000);
          var counterNext = parseInt(area.innerHTML);
          if (counterNext === (counterInit + 1)) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'React Native ToDo List':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.querySelector('#root');
        var inputElement = root.querySelector('input[type="text"]');
        var addButtonElement = root.querySelectorAll('[role="button"]')[0];
        var listElement = root.querySelector('[data-testid="toDoList"]');

        // test 1: check if elements exist
        if (!(inputElement && addButtonElement && listElement)) {
          postData.tests.push({ status: 'fail' });
        } else {
          postData.tests.push({ status: 'pass' });
        }

        // test 2: add a task and check if it appears in the list
        setNativeValue(inputElement, 'Test Task');
        addButtonElement.click();
        await __delay(1000);
        var lastTask = listElement.lastElementChild;
        if (!lastTask || !lastTask.innerHTML.includes('Test Task')) {
          allTestsPassed = false;
        } else {
          postData.tests.push({ status: 'pass' });
        }

        // test 3: edit the added task
        var editButtonElement = lastTask.querySelector('[role="button"]');
        editButtonElement.click();
        await __delay(1000);
        lastTask = listElement.lastElementChild;
        var editInputElement = lastTask.querySelector('input[type="text"]');
        setNativeValue(editInputElement, 'Edited Task');
        var saveButtonElement = lastTask.querySelectorAll('[role="button"]')[0];
        saveButtonElement.click();

        await __delay(1000);
        lastTask = listElement.lastElementChild;
        if (!lastTask || !lastTask.innerHTML.includes('Edited Task')) {
          postData.tests.push({ status: 'fail' });
        } else {
          postData.tests.push({ status: 'pass' });
        }

        // // test 4: remove the edited task
        var removeButtonElement = lastTask.querySelectorAll('[role="button"]')[1];
        removeButtonElement.click();
        await __delay(1000);
        if (lastTask.innerHTML.includes('Edited Task')) {
          postData.tests.push({ status: 'fail' });
        } else {
          postData.tests.push({ status: 'pass' });
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'React Todo App Project':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('root');
        var itemInputField = root.querySelector('.itemInput');
        var addItemButton = root.querySelector('.addItemButton');
        var removeItemButton = null;
        var todoItemsContent = null;

        // add item 1
        if (itemInputField) {
          setNativeValue(itemInputField, 'TESTING ADDED A');
          addItemButton.click();
        } 

        // add item 2
        if (itemInputField) {
          setNativeValue(itemInputField, 'TESTING ADDED B');
          addItemButton.click();
        }

        await __delay(1000);
        var todoItemsList = root.querySelector('.todo-list');

        // test 1
        todoItemsContent = todoItemsList ? todoItemsList.outerHTML : '';
        if (todoItemsContent.indexOf('TESTING ADDED A') !== -1 && todoItemsContent.indexOf('TESTING ADDED B') !== -1) {
          postData.tests.push({status: 'pass'});
        } else {
          postData.tests.push({status: 'fail'});
        }

        // test 2
        removeItemButton = root.querySelector('.removeTodoItem');
        if (removeItemButton) {
          removeItemButton.click();
          await __delay(1000);
          todoItemsContent = todoItemsList ? todoItemsList.outerHTML : '';
          if (todoItemsContent.indexOf('TESTING ADDED A') === -1 && todoItemsContent.indexOf('TESTING ADDED B') !== -1) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        } else {
          postData.tests.push({status: 'fail'});
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'AngularJS Simple Counter':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('root');
        var button = root.querySelector('#clickButtonCounter');
        var counter = root.querySelector('#getButtonCounter');

        // test 1
        if (!button) {
          postData.tests.push({status: 'fail'});
        } else {
          var counterInit = parseInt(counter.innerHTML);
          button.click();
          var counterNext = parseInt(counter.innerHTML);
          if (counterNext === (counterInit + 1)) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'Angular Simple Counter':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementsByTagName('app-area')[0];
        var button: HTMLElement = root.querySelector('#mainButton') as HTMLElement;
        var area = root.querySelector('#mainArea');
        
        // test 1
        if (!button) {
          postData.tests.push({status: 'fail'});
        } else {
          var counterInit = parseInt(area.querySelector('span').innerHTML);
          button.click();
          var counterNext = parseInt(area.querySelector('span').innerHTML);
          if (counterNext === (counterInit + 1)) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'Angular Simple Todo List':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.querySelector('app-root');
        var inputElement = root.querySelector('input');
        var buttonElement = root.querySelector('button');
        var listElement = root.querySelector('ul');
      
        // test 1: check if elements exist
        if (!(inputElement && buttonElement && listElement)) {
          postData.tests.push({status: 'fail'});
        }
      
        // test 2: add a task and check if it appears in the list
        setNativeValue(inputElement, 'Test Task');
        buttonElement.click();
        // Slight delay to allow potential rerenders
        await __delay(1000);
        var lastTask = listElement.lastElementChild;
        if (!lastTask || lastTask.textContent !== 'Test Task') {
          postData.tests.push({status: 'fail'});
        } else {
          postData.tests.push({status: 'pass'});
        }
      
        // test 3: add another task and check if it appears in the list
        setNativeValue(inputElement, 'Another Task');
        buttonElement.click();
        // Slight delay to allow potential rerenders
        await __delay(1000);
        lastTask = listElement.lastElementChild;
        if (!lastTask || lastTask.textContent !== 'Another Task') {
          postData.tests.push({status: 'fail'});
        } else {
          postData.tests.push({status: 'pass'});
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'Angular Todo List Project':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.querySelector('app-root');
        var inputElement = root.querySelector('input');
        var buttonElement = root.querySelector('button');
        var listElement = root.querySelector('ul');
      
        // test 1: check if elements exist
        if (!(inputElement && buttonElement && listElement)) {
          postData.tests.push({status: 'fail'});
        }
      
        // test 2: add a task and check if it appears in the list
        setNativeValue(inputElement, 'Test Task');
        buttonElement.click();
        // Slight delay to allow potential rerenders
        await __delay(1000);
        var lastTask = listElement.lastElementChild;
        if (!lastTask || !lastTask.textContent.includes('Test Task')) {
          postData.tests.push({status: 'fail'});
        } else {
          postData.tests.push({status: 'pass'});
        }
      
        // test 3: add another task and check if it appears in the list
        setNativeValue(inputElement, 'Another Task');
        buttonElement.click();
        // Slight delay to allow potential rerenders
        await __delay(1000);
        lastTask = listElement.lastElementChild;
        if (!lastTask || !lastTask.textContent.includes('Another Task')) {
          postData.tests.push({status: 'fail'});
        } else {
          postData.tests.push({status: 'pass'});
        }

        // test 4: remove the first task and check if it is removed from the list
        var removeButtonElement: HTMLElement = listElement.querySelector('li button') as HTMLElement;
        if (removeButtonElement) {
          removeButtonElement.click();
          // Slight delay to allow potential rerenders
          await __delay(1000);
          var firstTask = listElement.querySelector('li');
          if (firstTask && firstTask.textContent.includes('Test Task')) {
            postData.tests.push({status: 'fail'});
          } else {
            postData.tests.push({status: 'pass'});
          }
        } else {
          postData.tests.push({status: 'fail'});
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'Angular API Blog Sorting Project':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // App entry and elements
        var root = document.querySelector('app-root');
        var selectElement = root.querySelector('select');
        var listItems = root.querySelectorAll('li');

        // Utility function to change the selection and trigger sorting
        function changeSelection(selectElement, value) {
          selectElement.value = value;
          selectElement.dispatchEvent(new Event('change'));
        }

        // Test 1: Check if select and list items exist
        if (!(selectElement && listItems.length > 0)) {
          postData.tests.push({status: 'fail'});
        } else {
          postData.tests.push({status: 'pass'});
        }

        // Test 2: Verify sorting by "A-Z by title"
        changeSelection(selectElement, 'title');
        await __delay(1000);
        listItems = root.querySelectorAll('li');
        var firstTitle = listItems[0].textContent.trim();
        var lastTitle = listItems[listItems.length - 1].textContent.trim();
        if (firstTitle !== '5 Sustainable Living Changes You Can Make Today' || lastTitle !== 'Traveling on a Budget: How to See the World Without Breaking the Bank') {
          postData.tests.push({status: 'fail'});
        } else {
          postData.tests.push({status: 'pass'});
        }

        // Test 3: Verify sorting by "Id ascending"
        changeSelection(selectElement, 'id');
        await __delay(1000);
        listItems = root.querySelectorAll('li');
        firstTitle = listItems[0].textContent.trim();
        lastTitle = listItems[listItems.length - 1].textContent.trim();
        if (firstTitle !== '5 Sustainable Living Changes You Can Make Today' || lastTitle !== 'Creative Writing Prompts to Unleash Your Inner Author') {
          postData.tests.push({status: 'fail'});
        } else {
          postData.tests.push({status: 'pass'});
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'Angular Button Toggle':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementsByTagName('app-area')[0];
        var button: HTMLElement = root.querySelector('button') as HTMLElement;

        // test 1
        if (!button) {
          postData.tests.push({status: 'fail'});
        } else {
          var stateInit = button.innerHTML ? button.innerHTML.toLowerCase().trim() : '';
          button.click();
          var stateClicked = button.innerHTML.toLowerCase().trim();
          if ((stateClicked === 'on' || stateClicked === 'off') && stateClicked !== stateInit) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'Angular Reactive Form':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementsByTagName('app-area')[0];
        var firstField = root.querySelector('input');
       
        // simulate change
        if (firstField) {
          var event1 = new Event('change', { bubbles: true });
          var event2 = new Event('input', { bubbles: true });
          firstField.value = 'CoderbyteTestInput';
          firstField.setAttribute('value', 'CoderbyteTestInput');
          firstField.dispatchEvent(event1);
          firstField.dispatchEvent(event2);
        } else {
          postData.tests.push({status: 'fail'});
        }

        // get pre area
        var preArea = root.querySelector('pre');

        // test 1
        if (!preArea) {
          postData.tests.push({status: 'fail'});
        } else {
          if (preArea.innerHTML.indexOf('CoderbyteTestInput') === -1) {
            postData.tests.push({status: 'fail'});
          } else {
            postData.tests.push({status: 'pass'});
          }
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'Angular Generate Username':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementsByTagName('app-area')[0];
        var button: HTMLElement = root.querySelector('button') as HTMLElement;
        var output = null;
        var initialOutput = '';
        var firstname = root.querySelector('#firstname');
        var lastname = root.querySelector('#lastname');
        
        // see if there is a value in output already
        if (root.querySelector('#output')) {
          initialOutput = root.querySelector('#output').innerHTML;
        }

        // submit first pre-filled data
        button.click();

        // test 1
        output = root.querySelector('#output').innerHTML;
        if (output && 
          output.indexOf('coder_') !== -1 && 
          output.indexOf('byte_') !== -1 &&
          output !== initialOutput) {
          postData.tests.push({status: 'pass'});
        } else {
          // if fails this one, then try submitting new field
          postData.tests.push({status: 'fail'});

          // simulate values
          if (firstname) {
            setNativeValue(firstname, 'Coder');
          }

          if (lastname) {
            setNativeValue(lastname, 'Byte');
          }

          // click submit button
          button.click();

          // test 2
          output = root.querySelector('#output').innerHTML;
          if (output && 
            output.indexOf('coder_') !== -1 && 
            output.indexOf('byte_') !== -1 &&
            output !== initialOutput) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'Angular Phone Book':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_MODIFY_NATIVE_INPUTS()}
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementsByTagName('app-area')[0];
        var firstName = root.querySelector('.userFirstname');
        var lastName = root.querySelector('.userLastname');
        var phone = root.querySelector('.userPhone');
        var submitButton: HTMLElement = root.querySelector('.submitButton') as HTMLElement;

        // submit first pre-filled data
        submitButton.click();

        // test 1
        var informationTable = root.querySelector('.informationTable');
        var infoContents = informationTable ? informationTable.outerHTML : '';
        if (infoContents && 
          infoContents.indexOf('Coder') !== -1 && 
          infoContents.indexOf('Byte') !== -1 && 
          infoContents.indexOf('8885559999') !== -1) {
          postData.tests.push({status: 'pass'});
          // try auto-ordering in ABC order
          setNativeValue(lastName, 'AAA');
          setNativeValue(firstName, 'AAA');
          setNativeValue(phone, '8885551111');
          // see if in correct spot
          submitButton.click();
          await __delay(1000);
          informationTable = root.querySelector('.informationTable');
          infoContents = informationTable ? informationTable.outerHTML : '';
          if (infoContents && infoContents.indexOf('AAA') !== -1 && infoContents.indexOf('AAA') < infoContents.indexOf('Byte')) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        } else {
          // if fails this one, then try submitting new field
          postData.tests.push({status: 'fail'});

          // simulate values
          setNativeValue(firstName, 'John');
          setNativeValue(lastName, 'Smith');
          setNativeValue(phone, '8885550000');

          // click submit button
          submitButton.click();

          // test 2
          informationTable = root.querySelector('.informationTable');
          infoContents = informationTable ? informationTable.outerHTML : '';
          if (infoContents && 
            infoContents.indexOf('John') !== -1 && 
            infoContents.indexOf('Smith') !== -1 && 
            infoContents.indexOf('8885550000') !== -1) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'Angular Tic Tac Toe':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementsByTagName('app-area')[0];
        var squares = root.getElementsByClassName('square');

        // test 1
        if (squares && squares.length === 9) {
          // click all squares
          // @ts-ignore
          squares[0].click(); squares[1].click(); squares[2].click(); squares[3].click(); squares[4].click(); squares[5].click(); squares[6].click();
          // get square values
          var s1 = squares[0].innerHTML.toLowerCase().trim();
          var s2 = squares[1].innerHTML.toLowerCase().trim();
          if (s1 !== s2 && (s1.indexOf('x') !== -1 || s1.indexOf('o') !== -1) && (s2.indexOf('x') !== -1 || s2.indexOf('o') !== -1)) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
          // @ts-ignore
          squares[0].click();
          var s1_again = squares[0].innerHTML.toLowerCase().trim();
          if ((s1.indexOf('x') !== -1 || s1.indexOf('o') !== -1) && (s1 === s1_again)) {
            postData.tests.push({status: 'pass'});
            // only if both tests passed do we check if "checkWinner" function will work
            var winnerArea = document.getElementById('winnerArea');
            var winnerContents = winnerArea ? winnerArea.outerHTML : '';
            if (winnerContents.toLowerCase().indexOf('x') !== -1) {
              postData.tests.push({status: 'pass'});
            } else {
              postData.tests.push({status: 'fail'});
            }
          } else {
            postData.tests.push({status: 'fail'});
          }
        } else {
          postData.tests.push({status: 'fail'});
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000);
    `},'Vue Button Toggle':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('app');
        var button = root.querySelector('button');
        
        // test 1
        if (!button) {
          postData.tests.push({status: 'fail'});
        } else {
          var stateInit = button.innerHTML ? button.innerHTML.toLowerCase().trim() : '';
          button.click();
          setTimeout(async function() {
            var stateClicked = button.innerHTML.toLowerCase().trim();
            if ((stateClicked === 'on' || stateClicked === 'off') && stateClicked !== stateInit) {
              postData.tests.push({status: 'pass'});
            } else {
              postData.tests.push({status: 'fail'});
            }
            // post to coderbyte
            ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}
          }, 1000);
        }

      };setTimeout(___tests, 2000); </script>
    `},'Vue3 Button Toggle':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('app');
        var button = root.querySelector('button');
        
        // test 1
        if (!button) {
          postData.tests.push({status: 'fail'});
        } else {
          var stateInit = button.innerHTML ? button.innerHTML.toLowerCase().trim() : '';
          button.click();
          setTimeout(async function() {
            var stateClicked = button.innerHTML.toLowerCase().trim();
            if ((stateClicked === 'on' || stateClicked === 'off') && stateClicked !== stateInit) {
              postData.tests.push({status: 'pass'});
            } else {
              postData.tests.push({status: 'fail'});
            }
            // post to coderbyte
            ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}
          }, 1000);
        }

      };setTimeout(___tests, 2000); </script>
    `},'Vue Simple Counter':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('app');
        var button = root.querySelector('#mainButton');
        var area = root.querySelector('#mainArea');
        
        // test 1
        if (!button) {
          postData.tests.push({status: 'fail'});
        } else {
          var counterInit = parseInt(area.querySelector('span').innerHTML);
          button.click();
          setTimeout(async function() {
            var counterNext = parseInt(area.querySelector('span').innerHTML);
            if (counterNext === (counterInit + 1)) {
              postData.tests.push({status: 'pass'});
            } else {
              postData.tests.push({status: 'fail'});
            }
            // post to coderbyte
            ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}
          }, 1000);
        }

      };setTimeout(___tests, 2000); </script>
    `},'Vue3 Simple Counter':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('app');
        var button = root.querySelector('#mainButton');
        var area = root.querySelector('#mainArea');
        
        // test 1
        if (!button) {
          postData.tests.push({status: 'fail'});
        } else {
          var counterInit = parseInt(area.querySelector('span').innerHTML);
          button.click();
          setTimeout(async function() {
            var counterNext = parseInt(area.querySelector('span').innerHTML);
            if (counterNext === (counterInit + 1)) {
              postData.tests.push({status: 'pass'});
            } else {
              postData.tests.push({status: 'fail'});
            }
            // post to coderbyte
            ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}
          }, 1000);
        }

      };setTimeout(___tests, 2000); </script>
    `},'Vue List Rendering':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('app');
        var htmlContents = root.outerHTML;

        // test 1
        if (htmlContents && 
          htmlContents.indexOf('Daniel') !== -1 && 
          htmlContents.indexOf('John') !== -1 && 
          htmlContents.indexOf('Jen') !== -1) {
          postData.tests.push({status: 'pass'});
        } else {
          postData.tests.push({status: 'fail'});
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000); </script>
    `},'Vue3 List Rendering':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('app');
        var htmlContents = root.outerHTML;

        // test 1
        if (htmlContents && 
          htmlContents.indexOf('Daniel') !== -1 && 
          htmlContents.indexOf('John') !== -1 && 
          htmlContents.indexOf('Jen') !== -1) {
          postData.tests.push({status: 'pass'});
        } else {
          postData.tests.push({status: 'fail'});
        }

        // post to coderbyte
        ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}

      };setTimeout(___tests, 2000); </script>
    `},'Vue Generate Username':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('app');
        var button = root.querySelector('button');
        var output = null;
        var firstname = root.querySelector('#firstname');
        var lastname = root.querySelector('#lastname');

        // submit first pre-filled data
        button.click();

        setTimeout(async function() {
          // test 1
          output = root.querySelector('#output').innerHTML;
          if (output && 
            output.indexOf('coder_') !== -1 && 
            output.indexOf('byte_') !== -1) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
          // post to coderbyte
          ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}
        }, 1000);

      };setTimeout(___tests, 2000); </script>
    `},'Vue3 Generate Username':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('app');
        var button = root.querySelector('button');
        var output = null;
        var firstname = root.querySelector('#firstname');
        var lastname = root.querySelector('#lastname');

        // submit first pre-filled data
        button.click();

        setTimeout(async function() {
          // test 1
          output = root.querySelector('#output').innerHTML;
          if (output && 
            output.indexOf('coder_') !== -1 && 
            output.indexOf('byte_') !== -1) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
          // post to coderbyte
          ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}
        }, 1000);

      };setTimeout(___tests, 2000); </script>
    `},'Vue Phone Book':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('app');
        var firstName = root.querySelector('.userFirstname');
        var lastName = root.querySelector('.userLastname');
        var phone = root.querySelector('.userPhone');
        var submitButton = root.querySelector('.submitButton');
        var informationTable = root.querySelector('.informationTable');
        var infoContents = null;

        // submit first pre-filled data
        submitButton.click();

        setTimeout(async function() {
          // test 1
          infoContents = informationTable.outerHTML;
          if (infoContents && 
            infoContents.indexOf('Coder') !== -1 && 
            infoContents.indexOf('Byte') !== -1 && 
            infoContents.indexOf('8885559999') !== -1) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
          // post to coderbyte
          ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}
        }, 1000);

      };setTimeout(___tests, 2000); </script>
    `},'Vue3 Phone Book':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('app');
        var firstName = root.querySelector('.userFirstname');
        var lastName = root.querySelector('.userLastname');
        var phone = root.querySelector('.userPhone');
        var submitButton = root.querySelector('.submitButton');
        var informationTable = root.querySelector('.informationTable');
        var infoContents = null;

        // submit first pre-filled data
        submitButton.click();

        setTimeout(async function() {
          // test 1
          infoContents = informationTable.outerHTML;
          if (infoContents && 
            infoContents.indexOf('Coder') !== -1 && 
            infoContents.indexOf('Byte') !== -1 && 
            infoContents.indexOf('8885559999') !== -1) {
            postData.tests.push({status: 'pass'});
          } else {
            postData.tests.push({status: 'fail'});
          }
          // post to coderbyte
          ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}
        }, 1000);

      };setTimeout(___tests, 2000); </script>
    `},'Vue Tic Tac Toe':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('app');
        var squares = root.getElementsByClassName('square');

        // test 1
        if (squares && squares.length === 9) {
          // click all squares, do not use for loop because it does not work properly
          squares[0].click();
          squares[1].click();
          squares[2].click();
          squares[3].click();
          squares[4].click();
          squares[5].click();
          squares[6].click();
          setTimeout(async function() {
            // get square values
            var s1 = squares[0].innerHTML.toLowerCase().trim();
            var s2 = squares[1].innerHTML.toLowerCase().trim();
            if (s1 !== s2 && (s1.indexOf('x') !== -1 || s1.indexOf('o') !== -1) && (s2.indexOf('x') !== -1 || s2.indexOf('o') !== -1)) {
              postData.tests.push({status: 'pass'});
            } else {
              postData.tests.push({status: 'fail'});
            }
            // post to coderbyte
            ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}
          }, 1000);
        } else {
          postData.tests.push({status: 'fail'});
          ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}
        }

      };setTimeout(___tests, 2000); </script>
    `},'Vue3 Tic Tac Toe':function(info){return `
      /* RUNNING TESTS */
      var ___tests = async function() {

        ${window.__DEFAULT_CODE_FRONTEND_TESTS_SETUP(info)}

        // app entry and elements
        var root = document.getElementById('app');
        var squares = root.getElementsByClassName('square');

        // test 1
        if (squares && squares.length === 9) {
          // click all squares, do not use for loop because it does not work properly
          squares[0].click();
          squares[1].click();
          squares[2].click();
          squares[3].click();
          squares[4].click();
          squares[5].click();
          squares[6].click();
          setTimeout(async function() {
            // get square values
            var s1 = squares[0].innerHTML.toLowerCase().trim();
            var s2 = squares[1].innerHTML.toLowerCase().trim();
            if (s1 !== s2 && (s1.indexOf('x') !== -1 || s1.indexOf('o') !== -1) && (s2.indexOf('x') !== -1 || s2.indexOf('o') !== -1)) {
              postData.tests.push({status: 'pass'});
            } else {
              postData.tests.push({status: 'fail'});
            }
            // post to coderbyte
            ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}
          }, 1000);
        } else {
          postData.tests.push({status: 'fail'});
          ${window.__DEFAULT_CODE_FRONTEND_TESTS_POST()}
        }

      };setTimeout(___tests, 2000); </script>
    `},}