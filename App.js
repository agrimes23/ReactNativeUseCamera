"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var HomeScreen_1 = require("./src/screens/HomeScreen");
// Resources used:
// // https://github.com/react-native-image-picker/react-native-image-picker#the-response-object
// //  
function App() {
    return (<react_native_1.SafeAreaView>
      <react_native_1.ScrollView>
      
      <HomeScreen_1.default />

      </react_native_1.ScrollView>
    </react_native_1.SafeAreaView>);
}
exports.default = App;
