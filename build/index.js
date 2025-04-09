/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/react-chatbot-kit/build/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-chatbot-kit/build/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(()=>{"use strict";var e={n:t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},d:(t,r)=>{for(var a in r)e.o(r,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:r[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Chatbot:()=>B,createChatBotMessage:()=>i,createClientMessage:()=>u,createCustomMessage:()=>l,default:()=>H,useChatbot:()=>T});const r=__webpack_require__(/*! react */ "react");var a=e.n(r);const n=__webpack_require__(/*! react-conditionally-render */ "./node_modules/react-conditionally-render/dist/index.js");var o=e.n(n),s=function(){return s=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},s.apply(this,arguments)},c=function(e,t){return{message:e,type:t,id:Math.round(Date.now()*Math.random())}},i=function(e,t){return s(s(s({},c(e,"bot")),t),{loading:!0})},l=function(e,t,r){return s(s({},c(e,t)),r)},u=function(e,t){return s(s({},c(e,"user")),t)},m=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(e)return e.apply(void 0,t)};function g(){return g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},g.apply(this,arguments)}const d=({styles:e={},...t})=>a().createElement("svg",g({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},t),a().createElement("path",{d:"M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"})),f=function(e){var t=e.message,r=e.customComponents;return a().createElement("div",{className:"react-chatbot-kit-user-chat-message-container"},a().createElement(o(),{condition:!!r.userChatMessage,show:m(r.userChatMessage,{message:t}),elseShow:a().createElement("div",{className:"react-chatbot-kit-user-chat-message"},t,a().createElement("div",{className:"react-chatbot-kit-user-chat-message-arrow"}))}),a().createElement(o(),{condition:!!r.userAvatar,show:m(r.userAvatar),elseShow:a().createElement("div",{className:"react-chatbot-kit-user-avatar"},a().createElement("div",{className:"react-chatbot-kit-user-avatar-container"},a().createElement(d,{className:"react-chatbot-kit-user-avatar-icon"})))}))},h=function(){return a().createElement("div",{className:"react-chatbot-kit-chat-bot-avatar"},a().createElement("div",{className:"react-chatbot-kit-chat-bot-avatar-container"},a().createElement("p",{className:"react-chatbot-kit-chat-bot-avatar-letter"},"B")))},p=function(){return a().createElement("div",{className:"chatbot-loader-container"},a().createElement("svg",{id:"dots",width:"50px",height:"21px",viewBox:"0 0 132 58",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},a().createElement("g",{stroke:"none",fill:"none"},a().createElement("g",{id:"chatbot-loader",fill:"#fff"},a().createElement("circle",{id:"chatbot-loader-dot1",cx:"25",cy:"30",r:"13"}),a().createElement("circle",{id:"chatbot-loader-dot2",cx:"65",cy:"30",r:"13"}),a().createElement("circle",{id:"chatbot-loader-dot3",cx:"105",cy:"30",r:"13"})))))};var v=function(){return v=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},v.apply(this,arguments)};const y=function(e){var t=e.message,n=e.withAvatar,s=void 0===n||n,c=e.loading,i=e.messages,l=e.customComponents,u=e.setState,g=e.customStyles,d=e.delay,f=e.id,y=(0,r.useState)(!1),b=y[0],w=y[1];(0,r.useEffect)((function(){var e;return function(t,r){var a=750;d&&(a+=d),e=setTimeout((function(){var e=function(e,t,r){if(r||2===arguments.length)for(var a,n=0,o=t.length;n<o;n++)!a&&n in t||(a||(a=Array.prototype.slice.call(t,0,n)),a[n]=t[n]);return e.concat(a||Array.prototype.slice.call(t))}([],t,!0).find((function(e){return e.id===f}));e&&(e.loading=!1,e.delay=void 0,r((function(t){var r=t.messages,a=r.findIndex((function(e){return e.id===f}));return r[a]=e,v(v({},t),{messages:r})})))}),a)}(i,u),function(){clearTimeout(e)}}),[d,f]),(0,r.useEffect)((function(){d?setTimeout((function(){return w(!0)}),d):w(!0)}),[d]);var E={backgroundColor:""},P={borderRightColor:""};return g&&(E.backgroundColor=g.backgroundColor,P.borderRightColor=g.backgroundColor),a().createElement(o(),{condition:b,show:a().createElement("div",{className:"react-chatbot-kit-chat-bot-message-container"},a().createElement(o(),{condition:s,show:a().createElement(o(),{condition:!!(null==l?void 0:l.botAvatar),show:m(null==l?void 0:l.botAvatar),elseShow:a().createElement(h,null)})}),a().createElement(o(),{condition:!!(null==l?void 0:l.botChatMessage),show:m(null==l?void 0:l.botChatMessage,{message:t,loader:a().createElement(p,null)}),elseShow:a().createElement("div",{className:"react-chatbot-kit-chat-bot-message",style:E},a().createElement(o(),{condition:c,show:a().createElement(p,null),elseShow:a().createElement("span",null,t)}),a().createElement(o(),{condition:s,show:a().createElement("div",{className:"react-chatbot-kit-chat-bot-message-arrow",style:P})}))}))})};function b(){return b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},b.apply(this,arguments)}const w=({styles:e={},...t})=>a().createElement("svg",b({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},t),a().createElement("path",{d:"M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"}));var E=function(){return E=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},E.apply(this,arguments)},P=function(e,t,r){if(r||2===arguments.length)for(var a,n=0,o=t.length;n<o;n++)!a&&n in t||(a||(a=Array.prototype.slice.call(t,0,n)),a[n]=t[n]);return e.concat(a||Array.prototype.slice.call(t))};const S=function(e){var t=e.state,n=e.setState,s=e.widgetRegistry,i=e.messageParser,l=e.parse,u=e.customComponents,m=e.actionProvider,g=e.botName,d=e.customStyles,h=e.headerText,p=e.customMessages,v=e.placeholderText,b=e.validator,S=e.disableScrollToBottom,O=e.messageHistory,k=e.actions,M=e.messageContainerRef,C=t.messages,N=(0,r.useState)(""),x=N[0],j=N[1],T=function(){setTimeout((function(){var e;M.current&&(M.current.scrollTop=null===(e=null==M?void 0:M.current)||void 0===e?void 0:e.scrollHeight)}),50)};(0,r.useEffect)((function(){S||T()}));var A=function(){n((function(e){return E(E({},e),{messages:P(P([],e.messages,!0),[c(x,"user")],!1)})})),T(),j("")},B={backgroundColor:""};d&&d.chatButton&&(B.backgroundColor=d.chatButton.backgroundColor);var H="Conversation with "+g;h&&(H=h);var I="Write your message here";return v&&(I=v),a().createElement("div",{className:"react-chatbot-kit-chat-container"},a().createElement("div",{className:"react-chatbot-kit-chat-inner-container"},a().createElement(o(),{condition:!!u.header,show:u.header&&u.header(m),elseShow:a().createElement("div",{className:"react-chatbot-kit-chat-header"},H)}),a().createElement("div",{className:"react-chatbot-kit-chat-message-container",ref:M},a().createElement(o(),{condition:"string"==typeof O&&Boolean(O),show:a().createElement("div",{dangerouslySetInnerHTML:{__html:O}})}),C.map((function(e,r){return"bot"===e.type?a().createElement(a().Fragment,{key:e.id},function(e,r){var c;c=e.withAvatar?e.withAvatar:function(e,t){if(0===t)return!0;var r=e[t-1];return!("bot"===r.type&&!r.widget)}(C,r);var i=E(E({},e),{setState:n,state:t,customComponents:u,widgetRegistry:s,messages:C,actions:k});if(e.widget){var l=s.getWidget(i.widget,E(E({},t),{scrollIntoView:T,payload:e.payload,actions:k}));return a().createElement(a().Fragment,null,a().createElement(y,E({customStyles:d.botMessageBox,withAvatar:c},i,{key:e.id})),a().createElement(o(),{condition:!i.loading,show:l||null}))}return a().createElement(y,E({customStyles:d.botMessageBox,key:e.id,withAvatar:c},i,{customComponents:u,messages:C,setState:n}))}(e,r)):"user"===e.type?a().createElement(a().Fragment,{key:e.id},function(e){var r=s.getWidget(e.widget,E(E({},t),{scrollIntoView:T,payload:e.payload,actions:k}));return a().createElement(a().Fragment,null,a().createElement(f,{message:e.message,key:e.id,customComponents:u}),r||null)}(e)):function(e,t){return!!t[e.type]}(e,p)?a().createElement(a().Fragment,{key:e.id},function(e){var r=p[e.type],o={setState:n,state:t,scrollIntoView:T,actionProvider:m,payload:e.payload,actions:k};if(e.widget){var c=s.getWidget(e.widget,E(E({},t),{scrollIntoView:T,payload:e.payload,actions:k}));return a().createElement(a().Fragment,null,r(o),c||null)}return r(o)}(e)):void 0})),a().createElement("div",{style:{paddingBottom:"15px"}})),a().createElement("div",{className:"react-chatbot-kit-chat-input-container"},a().createElement("form",{className:"react-chatbot-kit-chat-input-form",onSubmit:function(e){if(e.preventDefault(),b&&"function"==typeof b){if(b(x)){if(A(),l)return l(x);i.parse(x)}}else{if(A(),l)return l(x);i.parse(x)}}},a().createElement("input",{className:"react-chatbot-kit-chat-input",placeholder:I,value:x,onChange:function(e){return j(e.target.value)}}),a().createElement("button",{className:"react-chatbot-kit-chat-btn-send",style:B},a().createElement(w,{className:"react-chatbot-kit-chat-btn-send-icon"}))))))},O=function(e){var t=e.message;return a().createElement("div",{className:"react-chatbot-kit-error"},a().createElement("h1",{className:"react-chatbot-kit-error-header"},"Ooops. Something is missing."),a().createElement("div",{className:"react-chatbot-kit-error-container"},a().createElement(y,{message:t,withAvatar:!0,loading:!1,id:1,customStyles:{backgroundColor:""},messages:[]})),a().createElement("a",{href:"https://fredrikoseberg.github.io/react-chatbot-kit-docs/",rel:"noopener norefferer",target:"_blank",className:"react-chatbot-kit-error-docs"},"View the docs"))};var k=function(e){return e.widgets?e.widgets:[]},M=function(e){try{new e}catch(e){return!1}return!0},C=function(){return C=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},C.apply(this,arguments)};const N=function(e,t){var r=this;this.addWidget=function(e,t){var a=e.widgetName,n=e.widgetFunc,o=e.mapStateToProps,s=e.props;r[a]={widget:n,props:s,mapStateToProps:o,parentProps:C({},t)}},this.getWidget=function(e,t){var a=r[e];if(a){var n,o=C(C(C(C({scrollIntoView:t.scrollIntoView},a.parentProps),"object"==typeof(n=a.props)?n:{}),r.mapStateToProps(a.mapStateToProps,t)),{setState:r.setState,actionProvider:r.actionProvider||t.actions,actions:t.actions,state:t,payload:t.payload});return a.widget(o)||null}},this.mapStateToProps=function(e,t){if(e)return e.reduce((function(e,r){return e[r]=t[r],e}),{})},this.setState=e,this.actionProvider=t};var x=function(){return x=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},x.apply(this,arguments)},j=function(e,t,r){if(r||2===arguments.length)for(var a,n=0,o=t.length;n<o;n++)!a&&n in t||(a||(a=Array.prototype.slice.call(t,0,n)),a[n]=t[n]);return e.concat(a||Array.prototype.slice.call(t))};const T=function(e){var t=e.config,n=e.actionProvider,o=e.messageParser,s=e.messageHistory,c=e.runInitialMessagesWithHistory,m=e.saveMessages,g=function(e,t){var r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(r[a[n]]=e[a[n]])}return r}(e,["config","actionProvider","messageParser","messageHistory","runInitialMessagesWithHistory","saveMessages"]),d="",f="";if(!t||!n||!o)return{configurationError:d="I think you forgot to feed me some props. Did you remember to pass a config, a messageparser and an actionprovider?"};var h=function(e,t){var r=[];return e.initialMessages||r.push("Config must contain property 'initialMessages', and it expects it to be an array of chatbotmessages."),r}(t);if(h.length)return{invalidPropsError:f=h.reduce((function(e,t){return e+t}),"")};var p=function(e){return e.state?e.state:{}}(t);s&&Array.isArray(s)?t.initialMessages=j([],s,!0):"string"==typeof s&&Boolean(s)&&(c||(t.initialMessages=[]));var v,y,b,w=a().useState(x({messages:j([],t.initialMessages,!0)},p)),E=w[0],P=w[1],S=a().useRef(E.messages),O=a().useRef(),C=a().useRef();(0,r.useEffect)((function(){S.current=E.messages})),(0,r.useEffect)((function(){s&&Array.isArray(s)&&P((function(e){return x(x({},e),{messages:s})}))}),[]),(0,r.useEffect)((function(){var e=C.current;return function(){if(m&&"function"==typeof m){var t=e.innerHTML.toString();m(S.current,t)}}}),[]),(0,r.useEffect)((function(){O.current=E}),[E]);var T=n,A=o;return M(T)&&M(A)?(v=new n(i,P,u,O.current,l,g),y=new N(P,v),b=new o(v,O.current),k(t).forEach((function(e){return null==y?void 0:y.addWidget(e,g)}))):(v=n,b=o,y=new N(P,null),k(t).forEach((function(e){return null==y?void 0:y.addWidget(e,g)}))),{widgetRegistry:y,actionProv:v,messagePars:b,configurationError:d,invalidPropsError:f,state:E,setState:P,messageContainerRef:C,ActionProvider:T,MessageParser:A}};var A=function(){return A=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},A.apply(this,arguments)};const B=function(e){var t=e.actionProvider,r=e.messageParser,n=e.config,o=e.headerText,s=e.placeholderText,c=e.saveMessages,l=e.messageHistory,u=e.runInitialMessagesWithHistory,m=e.disableScrollToBottom,g=e.validator,d=function(e,t){var r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(r[a[n]]=e[a[n]])}return r}(e,["actionProvider","messageParser","config","headerText","placeholderText","saveMessages","messageHistory","runInitialMessagesWithHistory","disableScrollToBottom","validator"]),f=T(A({config:n,actionProvider:t,messageParser:r,messageHistory:l,saveMessages:c,runInitialMessagesWithHistory:u},d)),h=f.configurationError,p=f.invalidPropsError,v=f.ActionProvider,y=f.MessageParser,b=f.widgetRegistry,w=f.messageContainerRef,E=f.actionProv,P=f.messagePars,k=f.state,C=f.setState;if(h)return a().createElement(O,{message:h});if(p.length)return a().createElement(O,{message:p});var N=function(e){return e.customStyles?e.customStyles:{}}(n),x=function(e){return e.customComponents?e.customComponents:{}}(n),j=function(e){return e.botName?e.botName:"Bot"}(n),B=function(e){return e.customMessages?e.customMessages:{}}(n);return M(v)&&M(y)?a().createElement(S,{state:k,setState:C,widgetRegistry:b,actionProvider:E,messageParser:P,customMessages:B,customComponents:A({},x),botName:j,customStyles:A({},N),headerText:o,placeholderText:s,validator:g,messageHistory:l,disableScrollToBottom:m,messageContainerRef:w}):a().createElement(v,{state:k,setState:C,createChatBotMessage:i},a().createElement(y,null,a().createElement(S,{state:k,setState:C,widgetRegistry:b,actionProvider:v,messageParser:y,customMessages:B,customComponents:A({},x),botName:j,customStyles:A({},N),headerText:o,placeholderText:s,validator:g,messageHistory:l,disableScrollToBottom:m,messageContainerRef:w})))},H=B;module.exports=t})();

/***/ }),

/***/ "./node_modules/react-chatbot-kit/build/main.css":
/*!*******************************************************!*\
  !*** ./node_modules/react-chatbot-kit/build/main.css ***!
  \*******************************************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nModuleNotFoundError: Module not found: Error: Can't resolve '/Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/css-loader/dist/cjs.js' in '/Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/react-chatbot-kit/build'\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/webpack/lib/Compilation.js:2230:28\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/webpack/lib/NormalModuleFactory.js:928:13\n    at eval (eval at create (/Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:10:1)\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/webpack/lib/NormalModuleFactory.js:338:22\n    at eval (eval at create (/Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:9:1)\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/webpack/lib/NormalModuleFactory.js:520:22\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/webpack/lib/NormalModuleFactory.js:155:10\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/webpack/lib/NormalModuleFactory.js:750:23\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/neo-async/async.js:2830:7\n    at done (/Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/neo-async/async.js:2925:13)\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/webpack/lib/NormalModuleFactory.js:1197:23\n    at finishWithoutResolve (/Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/enhanced-resolve/lib/Resolver.js:567:11)\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/enhanced-resolve/lib/Resolver.js:656:15\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/enhanced-resolve/lib/Resolver.js:718:5\n    at eval (eval at create (/Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:16:1)\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/enhanced-resolve/lib/Resolver.js:718:5\n    at eval (eval at create (/Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:27:1)\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/enhanced-resolve/lib/DescriptionFilePlugin.js:89:43\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/enhanced-resolve/lib/Resolver.js:718:5\n    at eval (eval at create (/Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/enhanced-resolve/lib/Resolver.js:718:5\n    at eval (eval at create (/Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/enhanced-resolve/lib/Resolver.js:718:5\n    at eval (eval at create (/Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:16:1)\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/enhanced-resolve/lib/Resolver.js:718:5\n    at eval (eval at create (/Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:27:1)\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/enhanced-resolve/lib/DescriptionFilePlugin.js:89:43\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/enhanced-resolve/lib/Resolver.js:718:5\n    at eval (eval at create (/Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:16:1)\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/enhanced-resolve/lib/Resolver.js:718:5\n    at eval (eval at create (/Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at /Users/moe/Sites/cursor-ai-wp/wp-content/plugins/easy-ai-chat-embed/node_modules/enhanced-resolve/lib/DirectoryExistsPlugin.js:41:15\n    at process.processTicksAndRejections (node:internal/process/task_queues:89:21)");

/***/ }),

/***/ "./node_modules/react-conditionally-render/dist/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-conditionally-render/dist/index.js ***!
  \***************************************************************/
/***/ ((module) => {

(()=>{"use strict";var e={d:(o,r)=>{for(var n in r)e.o(r,n)&&!e.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:r[n]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o),e.d(o,{default:()=>r});const r=function(e){var o=e.condition,r=e.show,n=e.elseShow,t=function(e){return"function"==typeof e},u=function(e){return e()||(console.warn("Nothing was returned from your render function. Please make sure you are returning a valid React element."),null)};return o?t(r)?u(r):r:!o&&n?t(n)?u(n):n:null};module.exports=o})();

/***/ }),

/***/ "./src/block/block.json":
/*!******************************!*\
  !*** ./src/block/block.json ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"easy-ai-chat-embed/chat-embed","version":"0.1.0","title":"AI Chat Embed","category":"widgets","icon":"format-chat","description":"Embeds an AI-powered chat interface (ChatGPT, Claude, Gemini).","keywords":["chat","ai","chatbot","gpt","claude","gemini"],"supports":{"html":false},"attributes":{"selectedModel":{"type":"string","default":""},"initialPrompt":{"type":"string","default":""},"instanceId":{"type":"string"},"chatbotName":{"type":"string","default":""}},"textdomain":"easy-ai-chat-embed","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./index.css"}');

/***/ }),

/***/ "./src/block/edit.js":
/*!***************************!*\
  !*** ./src/block/edit.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module './editor.scss'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */
 // We might add editor-specific styles later

// Define the available models

const modelOptions = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a Model', 'easy-ai-chat-embed'),
  value: ''
}, {
  label: 'ChatGPT 4.0',
  value: 'gpt-4o-mini'
}, {
  label: 'Claude Sonnet 3.7',
  value: 'claude-3-7-sonnet-20250219'
}, {
  label: 'Google Gemini',
  value: 'gemini-2.0-flash-lite'
}];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 * @param {string}   props.clientId      Unique ID for the block instance.
 * @return {Element} Element to render.
 */
function Edit({
  attributes,
  setAttributes,
  clientId
}) {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)();
  const {
    selectedModel,
    initialPrompt,
    chatbotName,
    instanceId
  } = attributes;

  // Ensure a unique instance ID is set for each block
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (!instanceId) {
      // Use clientId as a fallback if uuid generation fails or isn't available easily
      // A truly persistent ID might require a different approach if clientId changes often.
      // For now, relying on clientId and the attribute should suffice for initial setup.
      setAttributes({
        instanceId: `eace-${clientId}`
      });
    }
  }, [clientId, instanceId, setAttributes]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    ...blockProps,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('AI Model Settings', 'easy-ai-chat-embed'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select AI Model', 'easy-ai-chat-embed'),
          value: selectedModel,
          options: modelOptions,
          onChange: newModel => setAttributes({
            selectedModel: newModel
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Initial System Prompt', 'easy-ai-chat-embed'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Optional text prepended to every user prompt to guide the AI.', 'easy-ai-chat-embed'),
          value: initialPrompt,
          onChange: newPrompt => setAttributes({
            initialPrompt: newPrompt
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Chatbot Name', 'easy-ai-chat-embed'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Optional name for this specific chat instance. Leave blank to use the default.', 'easy-ai-chat-embed'),
          value: chatbotName,
          onChange: newName => setAttributes({
            chatbotName: newName
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('AI Chat Embed Placeholder - Configure in sidebar.', 'easy-ai-chat-embed')
    })]
  });
}

/***/ }),

/***/ "./src/block/index.js":
/*!****************************!*\
  !*** ./src/block/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/block/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "./src/block/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/block/block.json");
Object(function webpackMissingModule() { var e = new Error("Cannot find module './style.scss'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './editor.scss'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */






/**
 * Register the block
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/block/save.js":
/*!***************************!*\
  !*** ./src/block/save.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies
 */



/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @return {Element} Element to render.
 */

function save({
  attributes
}) {
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save();
  const {
    selectedModel,
    initialPrompt,
    instanceId
  } = attributes;

  // Combine blockProps className with our specific instance class
  const divClass = `${blockProps.className ? blockProps.className + ' ' : ''}easy-ai-chat-embed-instance`;

  // We render a simple div container. The actual chat interface
  // will be mounted client-side by a separate script that finds this div.
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    ...blockProps,
    className: divClass,
    "data-selected-model": selectedModel,
    "data-initial-prompt": initialPrompt,
    "data-instance-id": instanceId,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("noscript", {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Please enable JavaScript to use the AI Chat.', 'easy-ai-chat-embed')
    })
  });
}

/***/ }),

/***/ "./src/chatbot/ActionProvider.js":
/*!***************************************!*\
  !*** ./src/chatbot/ActionProvider.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_chatbot_kit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-chatbot-kit */ "./node_modules/react-chatbot-kit/build/index.js");
/* harmony import */ var react_chatbot_kit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_chatbot_kit__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */
const {
  __
} = wp.i18n;

/**
 * External dependencies
 */

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  // Handle user messages and API calls
  handleUserMessage = async userMessage => {
    // Get instance data from global object
    const instances = window.easyAiChatInstances || {};
    const instanceKeys = Object.keys(instances);
    if (instanceKeys.length === 0) {
      console.error('No chat instances found in global storage');
      const errorMessage = this.createChatBotMessage("I'm sorry, but there was an error processing your request. No configuration found.");
      this.addMessageToState(errorMessage);
      return;
    }

    // Use the first instance (this is a simplification - ideally would match the current instance)
    const instance = instances[instanceKeys[0]];
    const {
      instanceId,
      selectedModel,
      initialPrompt,
      ajaxUrl,
      nonce
    } = instance;

    // Add a loading message
    const loadingMessage = this.createChatBotMessage('Thinking...');
    this.addMessageToState(loadingMessage);

    // Prepare AJAX request
    const requestData = {
      action: 'easy_ai_chat_embed_send_message',
      _ajax_nonce: nonce,
      message: userMessage,
      instanceId: instanceId,
      selectedModel: selectedModel,
      initialPrompt: initialPrompt,
      // We're not passing conversation history here for simplicity
      // This can be added back if needed
      conversationHistory: '[]'
    };
    try {
      const response = await fetch(ajaxUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(requestData).toString()
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();

      // Remove loading message
      this.removeLastMessage();

      // Display response or error message
      if (result.success && result.data.message) {
        const botResponse = this.createChatBotMessage(result.data.message);
        this.addMessageToState(botResponse);
      } else {
        const errorMessage = result.data?.message || 'Sorry, I could not process your request.';
        const botError = this.createChatBotMessage(__('[Error]', 'easy-ai-chat-embed') + ' ' + errorMessage);
        this.addMessageToState(botError);
      }
    } catch (error) {
      console.error('Error calling backend API:', error);
      this.removeLastMessage();
      const botError = this.createChatBotMessage(__('[Error] Sorry, something went wrong while contacting the AI. Please try again later.', 'easy-ai-chat-embed'));
      this.addMessageToState(botError);
    }
  };

  // Helper to add messages to state
  addMessageToState = message => {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }));
  };

  // Helper to remove the last message
  removeLastMessage = () => {
    this.setState(prevState => ({
      ...prevState,
      messages: prevState.messages.slice(0, -1)
    }));
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActionProvider);

/***/ }),

/***/ "./src/chatbot/MessageParser.js":
/*!**************************************!*\
  !*** ./src/chatbot/MessageParser.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// src/chatbot/MessageParser.js
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }
  parse(message) {
    // console.log( 'User message:', message ); // Log user input
    // console.log( 'Current state:', this.state ); // Log state for debugging

    // Simple implementation: pass every non-empty message to the action provider
    if (message.trim() !== '') {
      this.actionProvider.handleUserMessage(message);
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MessageParser);

/***/ }),

/***/ "./src/chatbot/config.js":
/*!*******************************!*\
  !*** ./src/chatbot/config.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_chatbot_kit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-chatbot-kit */ "./node_modules/react-chatbot-kit/build/index.js");
/* harmony import */ var react_chatbot_kit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_chatbot_kit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */

const {
  __
} = wp.i18n;

// const botName = 'AIChatBot'; // No longer needed as a fixed constant here

// Basic config for the chatbot
const configFn = (instanceId, initialPrompt, selectedModel, chatbotName, ajaxUrl, nonce, initialState, isBlock, isShortcode, isElementor) => ({
  botName: chatbotName,
  // Use the passed chatbotName
  lang: 'en',
  initialMessages: [(0,react_chatbot_kit__WEBPACK_IMPORTED_MODULE_0__.createChatBotMessage)(`Hello! I am ${chatbotName}. How can I help you today? (Using ${selectedModel})` // Use dynamic chatbot name
  )
  // You could add the initialPrompt as a system message here if desired,
  // but typically it's handled server-side before sending to the AI API.
  ],
  state: {
    instanceId: instanceId,
    // Store instance ID for API calls
    initialPrompt: initialPrompt,
    // Store initial prompt
    selectedModel: selectedModel,
    ajaxUrl: ajaxUrl,
    // Add ajaxUrl to state
    nonce: nonce,
    // Add nonce to state
    isBlock: isBlock,
    // Add isBlock flag
    isShortcode: isShortcode,
    // Add isShortcode flag
    isElementor: isElementor,
    // Add isElementor flag
    chatbotName: chatbotName,
    // Store chatbotName in state too
    ...initialState // Merge the rest of the initial state
  },
  // Add custom header component
  customComponents: {
    header: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "react-chatbot-kit-chat-header",
      children: ["Conversation with ", chatbotName]
    })
  },
  // Define custom components or widgets here if needed later
  // widgets: [],
  customStyles: {
    // Optional: Adjust basic styling
    // botMessageBox: {
    //   backgroundColor: '#376B7E',
    // },
    // chatButton: {
    //   backgroundColor: '#5ccc9d',
    // },
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (configFn);

/***/ }),

/***/ "./src/frontend.js":
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_chatbot_kit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-chatbot-kit */ "./node_modules/react-chatbot-kit/build/index.js");
/* harmony import */ var react_chatbot_kit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_chatbot_kit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_chatbot_kit_build_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-chatbot-kit/build/main.css */ "./node_modules/react-chatbot-kit/build/main.css");
/* harmony import */ var _chatbot_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chatbot/config */ "./src/chatbot/config.js");
/* harmony import */ var _chatbot_MessageParser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chatbot/MessageParser */ "./src/chatbot/MessageParser.js");
/* harmony import */ var _chatbot_ActionProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chatbot/ActionProvider */ "./src/chatbot/ActionProvider.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module './frontend.scss'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/**
 * WordPress dependencies
 */
const {
  __
} = wp.i18n;
const domReady = wp.domReady;
const {
  createRoot,
  render
} = wp.element;

/**
 * External dependencies 
 * Import manually to avoid ES module issues
 */



/**
 * Internal dependencies
 */



 // For custom frontend styles

// Create global storage for chatbot instances
window.easyAiChatInstances = window.easyAiChatInstances || {};

/**
 * Find all chat embed containers and mount the chatbot component.
 */
domReady(() => {
  const chatContainers = document.querySelectorAll('.easy-ai-chat-embed-instance' // Target all instances by the common class
  );

  // Check if React 18's createRoot is available (WP 6.2+)
  const useCreateRoot = typeof createRoot === 'function';

  // Get global data (should be available if script was enqueued)
  const globalData = window.easyAiChatEmbedGlobalData;
  if (!globalData) {
    console.error('Easy AI Chat Embed: Global data object (easyAiChatEmbedGlobalData) not found. Assets might not have been enqueued correctly.');
    // Optionally, update container innerHTML to show an error
    chatContainers.forEach(container => {
      if (!container.innerHTML.includes('noscript')) {
        // Avoid overwriting noscript tag if JS is disabled
        container.innerHTML = '<p>Error: Chatbot global data missing.</p>';
      }
    });
    return; // Stop execution if global data is missing
  }
  chatContainers.forEach(container => {
    // Get all instance-specific data directly from data attributes
    const instanceId = container.dataset.instanceId;
    const selectedModel = container.dataset.selectedModel;
    const initialPrompt = container.dataset.initialPrompt;
    const chatbotName = container.dataset.chatbotName || 'AIChatBot'; // Default if somehow missing
    const isBlock = container.dataset.isBlock === 'true';
    const isShortcode = container.dataset.isShortcode === 'true';
    const isElementor = container.dataset.isElementor === 'true';

    // Use global data for ajaxUrl and nonce
    const ajaxUrl = globalData.ajaxUrl;
    const nonce = globalData.nonce;

    // Basic validation (ensure we have necessary data)
    if (!instanceId || !selectedModel || !ajaxUrl || !nonce || !chatbotName) {
      console.error('Easy AI Chat Embed: Missing required data for instance.', container, {
        instanceId,
        selectedModel,
        chatbotName,
        ajaxUrl,
        nonce
      });
      // Update container HTML only if it doesn't already contain the noscript message
      if (!container.querySelector('noscript')) {
        container.innerHTML = '<p>Error: Chatbot configuration missing or incomplete.</p>';
      }
      return; // Skip this container
    }

    // Store essential data in global window object
    window.easyAiChatInstances[instanceId] = {
      ajaxUrl,
      nonce,
      instanceId,
      selectedModel,
      initialPrompt,
      chatbotName // Store chatbot name
    };

    // Build state object
    const initialState = {
      messages: [],
      instanceId: instanceId,
      selectedModel: selectedModel,
      initialPrompt: initialPrompt,
      chatbotName: chatbotName // Add chatbot name to state
    };
    try {
      // Get configuration with instance details, ajax info, initial state, and type flag
      // Pass chatbotName instead of botName directly if config expects it
      const botConfig = (0,_chatbot_config__WEBPACK_IMPORTED_MODULE_2__["default"])(instanceId, initialPrompt, selectedModel, chatbotName, ajaxUrl, nonce, initialState, isBlock, isShortcode, isElementor);

      // Log the ActionProvider before passing it
      console.log('Typeof ActionProvider:', typeof _chatbot_ActionProvider__WEBPACK_IMPORTED_MODULE_4__["default"]);
      console.log('ActionProvider value:', _chatbot_ActionProvider__WEBPACK_IMPORTED_MODULE_4__["default"]);

      // Setup chatbot props - pass CLASSES/constructors directly, not instances or factory functions
      const chatbotProps = {
        config: botConfig,
        messageParser: _chatbot_MessageParser__WEBPACK_IMPORTED_MODULE_3__["default"],
        actionProvider: _chatbot_ActionProvider__WEBPACK_IMPORTED_MODULE_4__["default"]
      };

      // Clear the noscript message / placeholder content
      const noscriptElement = container.querySelector('noscript');
      if (noscriptElement) {
        noscriptElement.remove();
      }
      // Clear any other potential placeholder text
      container.innerHTML = '';

      // Create a wrapper div to target
      const chatElement = wp.element.createElement('div', {
        className: 'easy-ai-chat-widget-container'
      },
      // Outer wrapper for potential styling
      wp.element.createElement(react_chatbot_kit__WEBPACK_IMPORTED_MODULE_0__.Chatbot, chatbotProps));
      if (useCreateRoot) {
        const root = createRoot(container);
        root.render(chatElement);
      } else {
        render(chatElement, container);
      }
    } catch (error) {
      console.error('Error initializing chatbot:', error);
      container.innerHTML = '<p>Error initializing chat interface. See console for details.</p>';
    }
  });
});

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _frontend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./frontend */ "./src/frontend.js");
/* harmony import */ var _block_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block/index */ "./src/block/index.js");
/**
 * Main frontend entry point
 * This serves as the main entry point, importing all needed functionality
 */



// Also export any functions that might be needed externally
})();

/******/ })()
;
//# sourceMappingURL=index.js.map