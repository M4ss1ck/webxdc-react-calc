var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// code from https://www.sitepoint.com/react-tutorial-build-calculator-app/

var btnValues = [["C", "+-", "%", "/"], [7, 8, 9, "X"], [4, 5, 6, "-"], [1, 2, 3, "+"], [0, ".", "="]];

var Calc = function Calc() {
  var _React$useState = React.useState({
    sign: "",
    num: 0,
    res: 0
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      calc = _React$useState2[0],
      setCalc = _React$useState2[1];

  var numClickHandler = function numClickHandler(e) {
    e.preventDefault();
    var value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc(Object.assign({}, calc, {
        num: calc.num === 0 && value === "0" ? "0" : removeSpaces(calc.num) % 1 === 0 ? toLocaleString(Number(removeSpaces(calc.num + value))) : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res
      }));
    }
  };

  var commaClickHandler = function commaClickHandler(e) {
    e.preventDefault();
    var value = e.target.innerHTML;

    setCalc(Object.assign({}, calc, {
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num
    }));
  };

  var signClickHandler = function signClickHandler(e) {
    e.preventDefault();
    var value = e.target.innerHTML;

    setCalc(Object.assign({}, calc, {
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0
    }));
  };

  var equalsClickHandler = function equalsClickHandler() {
    if (calc.sign && calc.num) {
      var math = function math(a, b, sign) {
        return sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : a / b;
      };

      setCalc(Object.assign({}, calc, {
        res: calc.num === "0" && calc.sign === "/" ? "Can't divide with 0" : toLocaleString(math(Number(removeSpaces(calc.res)), Number(removeSpaces(calc.num)), calc.sign)),
        sign: "",
        num: 0
      }));
    }
  };

  var invertClickHandler = function invertClickHandler() {
    setCalc(Object.assign({}, calc, {
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: ""
    }));
  };

  var percentClickHandler = function percentClickHandler() {
    var num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    var res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc(Object.assign({}, calc, {
      num: num /= Math.pow(100, 1),
      res: res /= Math.pow(100, 1),
      sign: ""
    }));
  };

  var resetClickHandler = function resetClickHandler() {
    setCalc(Object.assign({}, calc, {
      sign: "",
      num: 0,
      res: 0
    }));
  };

  var toLocaleString = function toLocaleString(num) {
    return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
  };

  var removeSpaces = function removeSpaces(num) {
    return num.toString().replace(/\s/g, "");
  };

  return React.createElement(
    "div",
    { className: "w-[90vw] h-[90vh] p-2 rounded-lg" },
    React.createElement(
      "div",
      { className: "p-2 h-[100px] rounded-lg flex items-center justify-end bg-[#4357692d] text-white font-bold mb-2 text-6xl" },
      calc.num ? calc.num : calc.res
    ),
    React.createElement(
      "div",
      { className: "w-full h-[calc(100%-110px)] grid grid-cols-4 grid-rows-5 gap-4" },
      btnValues.flat().map(function (btn, i) {
        return React.createElement(Button, {
          key: i,
          className: btn === "=" ? "equals" : "",
          value: btn,
          onClick: btn === "C" ? resetClickHandler : btn === "+-" ? invertClickHandler : btn === "%" ? percentClickHandler : btn === "=" ? equalsClickHandler : btn === "/" || btn === "X" || btn === "-" || btn === "+" ? signClickHandler : btn === "." ? commaClickHandler : numClickHandler
        });
      })
    )
  );
};

var Button = function Button(_ref) {
  var className = _ref.className,
      value = _ref.value,
      onClick = _ref.onClick;

  return React.createElement(
    "button",
    { className: className, onClick: onClick },
    value
  );
};

var domContainer = document.querySelector("#react-calc");
ReactDOM.render(React.createElement(Calc), domContainer);