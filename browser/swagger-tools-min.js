!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),(o.SwaggerTools||(o.SwaggerTools={})).specs=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(e){"use strict";var r="undefined"!=typeof window?window._:"undefined"!=typeof e?e._:null,n="undefined"!=typeof window?window.async:"undefined"!=typeof e?e.async:null,i=require("./helpers"),o="undefined"!=typeof window?window.JsonRefs:"undefined"!=typeof e?e.JsonRefs:null,t="undefined"!=typeof window?window.SparkMD5:"undefined"!=typeof e?e.SparkMD5:null,s="undefined"!=typeof window?window.traverse:"undefined"!=typeof e?e.traverse:null,a=require("./validators"),c={},u=function _(e,i,t){var s=r.reduce(o.findRefs(i),function(e,r,n){return o.isRemotePointer(n)&&e.push(r.split("#")[0]),e},[]),a=function(r,n){o.resolveRefs({$ref:r},function(r,i){return r?n(r):void _(e,i,function(e,r){n(e,r)})})};s.length>0?n.map(s,a,function(n,i){return n?t(n):(r.each(i,function(r,n){e.setRemoteReference(s[n],r)}),void t())}):t()},d=function(e,r,n,i){i.push({code:e,message:r,path:n})},f=function(e,n,t,s,a){var c=!0,u=i.getSwaggerVersion(e.resolved),f=r.isArray(n)?n:o.pathFromPointer(n),p=r.isArray(n)?o.pathToPointer(n):n,h=r.isArray(t)?t:o.pathFromPointer(t),l=r.isArray(t)?o.pathToPointer(t):t,g=e.definitions[p],m=f[0],w="securityDefinitions"===m?"SECURITY_DEFINITION":m.substring(0,m.length-1).toUpperCase(),v="1.2"===u?f[f.length-1]:p,b="securityDefinitions"===m?"Security definition":w.charAt(0)+w.substring(1).toLowerCase();return["authorizations","securityDefinitions"].indexOf(f[0])>-1&&"scopes"===f[2]&&(w+="_SCOPE",b+=" scope"),r.isUndefined(g)?(a||d("UNRESOLVABLE_"+w,b+" could not be resolved: "+v,h,s.errors),c=!1):(r.isUndefined(g.references)&&(g.references=[]),g.references.push(l)),c},p=function C(e,n){var i,t,a="Composed "+("1.2"===e.swaggerVersion?o.pathFromPointer(n).pop():n),c=e.definitions[n],u=s(e.original),d=s(e.resolved);return c?(t=r.cloneDeep(u.get(o.pathFromPointer(n))),i=r.cloneDeep(d.get(o.pathFromPointer(n))),"1.2"===e.swaggerVersion&&(c.lineage.length>0&&(i.allOf=[],r.each(c.lineage,function(r){i.allOf.push(C(e,r))})),delete i.subTypes,r.each(i.properties,function(n,i){var a=t.properties[i];r.each(["maximum","minimum"],function(e){r.isString(n[e])&&(n[e]=parseFloat(n[e]))}),r.each(o.findRefs(a),function(r,i){var t="#/models/"+r,a=e.definitions[t],c=o.pathFromPointer(i);a.lineage.length>0?s(n).set(c.slice(0,c.length-1),C(e,t)):(s(n).set(c.slice(0,c.length-1).concat("title"),"Composed "+r),s(n).set(c.slice(0,c.length-1).concat("type"),"object"))})})),i=s(i).map(function(e){"id"===this.key&&r.isString(e)&&this.remove()}),i.title=a,i.type="object",i):void 0},h=function(e,r,n,i,o){d("UNUSED_"+r,n+" is defined but is not used: "+e,i,o)},l=function(e){return e?e.errors.length+e.warnings.length+r.reduce(e.apiDeclarations,function(e,r){return r&&(e+=r.errors.length+r.warnings.length),e},0)>0?e:void 0:e},g=function(e){var n=t.hash(JSON.stringify(e)),o=c[n]||r.find(c,function(e){return e.resolvedId===n});return o||(o=c[n]={definitions:{},original:e,resolved:void 0,swaggerVersion:i.getSwaggerVersion(e)}),o},m=function(e,r){var n=new Error("The Swagger document is invalid and model composition is not possible");n.errors=e.errors,n.warnings=e.warnings,r(n)},w=function(e){var n=[],i=[];return r.each(e.split("/"),function(e){"{"===e.charAt(0)&&(n.push(e.substring(1).split("}")[0]),e="{"+(n.length-1)+"}"),i.push(e)}),{path:i.join("/"),args:n}},v=function(e,n,i,o,t,s){!r.isUndefined(e)&&e.indexOf(n)>-1&&d("DUPLICATE_"+i,o+" already defined: "+n,t,s)},b=function(e,r,n,i,o){try{a.validateSchemaConstraints(e.swaggerVersion,r,n,void 0)}catch(t){o||d(t.code,t.message,t.path,i.errors)}},E=function(e,n){var i=e.swaggerVersion,t=function(r){var n=o.pathToPointer(r),i=e.definitions[n];return i||(i=e.definitions[n]={references:[]},["definitions","models"].indexOf(o.pathFromPointer(n)[0])>-1&&(i.cyclical=!1,i.lineage=void 0,i.parents=[])),i},a=function(e){return"1.2"===i?o.pathFromPointer(e).pop():e},c=function h(n,i,o){var t=e.definitions[i||n];t&&r.each(t.parents,function(e){o.push(e),n!==e&&h(n,e,o)})},u="1.2"===i?"authorizations":"securityDefinitions",p="1.2"===i?"models":"definitions";switch(r.each(e.resolved[u],function(e,o){var s=[u,o];("1.2"!==i||e.type)&&(t(s),r.reduce(e.scopes,function(e,r,o){var a="1.2"===i?r.scope:o,c=s.concat(["scopes",o.toString()]),u=t(s.concat(["scopes",a]));return u.scopePath=c,v(e,a,"AUTHORIZATION_SCOPE_DEFINITION","Authorization scope definition","1.2"===i?c.concat("scope"):c,n.warnings),e.push(a),e},[]))}),r.each(e.resolved[p],function(s,a){var c=[p,a],u=t(c);if("1.2"===i&&a!==s.id&&d("MODEL_ID_MISMATCH","Model id does not match id in models object: "+s.id,c.concat("id"),n.errors),r.isUndefined(u.lineage))switch(i){case"1.2":r.each(s.subTypes,function(r,i){var s=["models",r],a=o.pathToPointer(s),u=e.definitions[a],d=c.concat(["subTypes",i.toString()]);!u&&e.resolved[p][r]&&(u=t(s)),f(e,s,d,n)&&u.parents.push(o.pathToPointer(c))});break;default:r.each(e.original[p][a].allOf,function(i,s){var a,d,p=c.concat(["allOf",s.toString()]);r.isUndefined(i.$ref)||o.isRemotePointer(i.$ref)?d=c.concat(["allOf",s.toString()]):(a=t(o.pathFromPointer(i.$ref)),d=o.pathFromPointer(i.$ref)),u.parents.push(o.pathToPointer(d)),a&&f(e,d,p,n)})}}),i){case"2.0":r.each(e.resolved.parameters,function(r,i){var o=["parameters",i];t(o),b(e,r,o,n)}),r.each(e.resolved.responses,function(r,i){var o=["responses",i];t(o),b(e,r,o,n)})}r.each(e.definitions,function(t,u){var f,p,h,l=o.pathFromPointer(u),g=s(e.original).get(l),m=l[0],w=m.substring(0,m.length-1).toUpperCase(),v=w.charAt(0)+w.substring(1).toLowerCase();-1!==["definitions","models"].indexOf(m)&&(f=[],p=[],h=t.lineage,r.isUndefined(h)&&(h=[],c(u,void 0,h),h.reverse(),t.lineage=r.cloneDeep(h),t.cyclical=h.length>1&&h[0]===u),t.parents.length>1&&"1.2"===i&&d("MULTIPLE_"+w+"_INHERITANCE","Child "+w.toLowerCase()+" is sub type of multiple models: "+r.map(t.parents,function(e){return a(e)}).join(" && "),l,n.errors),t.cyclical&&d("CYCLICAL_"+w+"_INHERITANCE",v+" has a circular inheritance: "+r.map(h,function(e){return a(e)}).join(" -> ")+" -> "+a(u),l.concat("1.2"===i?"subTypes":"allOf"),n.errors),r.each(h.slice(t.cyclical?1:0),function(n){var i=s(e.resolved).get(o.pathFromPointer(n));r.each(Object.keys(i.properties),function(e){-1===p.indexOf(e)&&p.push(e)})}),b(e,g,l,n),r.each(g.properties,function(i,o){var t=l.concat(["properties",o]);r.isUndefined(i)||(b(e,i,t,n),p.indexOf(o)>-1?d("CHILD_"+w+"_REDECLARES_PROPERTY","Child "+w.toLowerCase()+" declares property already declared by ancestor: "+o,t,n.errors):f.push(o))}),r.each(g.required||[],function(e,r){-1===p.indexOf(e)&&-1===f.indexOf(e)&&d("MISSING_REQUIRED_MODEL_PROPERTY","Model requires property but it is not defined: "+e,l.concat(["required",r.toString()]),n.errors)}))}),r.each(o.findRefs(e.original),function(r,i){"1.2"===e.swaggerVersion&&(r="#/models/"+r),o.isRemotePointer(r)||f(e,r,i,n)})},j=function(e,n,i,o,t,s){r.isUndefined(e)||-1!==e.indexOf(n)||d("UNRESOLVABLE_"+i,o+" could not be resolved: "+n,t,s)},y=function(e,n,i,o){var t="1.2"===e.swaggerVersion?"AUTHORIZATION":"SECURITY_DEFINITION",s="AUTHORIZATION"===t?"Authorization":"Security definition";"1.2"===e.swaggerVersion?r.reduce(n,function(n,a,c){var u="#/authorizations/"+c,d=i.concat([c]);return f(e,u,d,o)&&r.reduce(a,function(r,n,i){var a=d.concat(i.toString(),"scope"),c=u+"/scopes/"+n.scope;return v(r,n.scope,t+"_SCOPE_REFERENCE",s+" scope reference",a,o.warnings),f(e,c,a,o),r.concat(n.scope)},[]),n.concat(c)},[]):r.reduce(n,function(n,a,c){return r.each(a,function(a,u){var d="#/securityDefinitions/"+u,p=i.concat(c.toString(),u);v(n,u,t+"_REFERENCE",s+" reference",p,o.warnings),n.push(u),f(e,d,p,o)&&r.each(a,function(r,n){f(e,d+"/scopes/"+r,p.concat(n.toString()),o)})}),n},[])},O=function(e,n){var a,c=g(e),u=i.getSwaggerVersion(e);c.resolved?n():("1.2"===u&&(e=r.cloneDeep(e),a=s(e),r.each(o.findRefs(e),function(e,r){a.set(o.pathFromPointer(r),"#/models/"+e)})),o.resolveRefs(e,function(e,r){return e?n(e):(c.resolved=r,c.resolvedId=t.hash(JSON.stringify(r)),void n())}))},P=function(e,n,o,t){var s=r.isString(n)?e.validators[n]:i.createJsonValidator(),c=function(){try{a.validateAgainstSchema(n,o,s)}catch(e){return e.failedValidation?t(void 0,e.results):t(e)}O(o,function(e){return t(e)})};u(s,o,function(e){return e?t(e):void c()})},T=function(e,n){r.each(e.definitions,function(r,i){var t=o.pathFromPointer(i),s=t[0].substring(0,t[0].length-1),a="1.2"===e.swaggerVersion?t[t.length-1]:i,c="securityDefinition"===s?"SECURITY_DEFINITION":s.toUpperCase(),u="securityDefinition"===s?"Security definition":s.charAt(0).toUpperCase()+s.substring(1);0===r.references.length&&(r.scopePath&&(c+="_SCOPE",u+=" scope",t=r.scopePath),h(a,c,u,t,n.warnings))})},R=function(e,n,i,o,t,s){var a=[];r.reduce(o,function(e,o,c){var u=t.concat(["parameters",c.toString()]);if(!r.isUndefined(o))return v(e,o.name,"PARAMETER","Parameter",u.concat("name"),s.errors),("path"===o.paramType||"path"===o.in)&&(-1===i.args.indexOf(o.name)&&d("UNRESOLVABLE_API_PATH_PARAMETER","API path parameter could not be resolved: "+o.name,u.concat("name"),s.errors),a.push(o.name)),b(n,o,u,s,o.skipErrors),e.concat(o.name)},[]),r.each(r.difference(i.args,a),function(e){d("MISSING_API_PATH_PARAMETER","API requires path parameter but it is not defined: "+e,"1.2"===n.swaggerVersion?t.slice(0,2).concat("path"):t,s.errors)})},S=function(e,n,i,o){var t=[],s=g(n),a=[],c={errors:[],warnings:[],apiDeclarations:[]};a=r.reduce(n.apis,function(e,r,n){return v(e,r.path,"RESOURCE_PATH","Resource path",["apis",n.toString(),"path"],c.errors),e.push(r.path),e},[]),E(s,c),t=r.reduce(i,function(n,i,o){var u=c.apiDeclarations[o]={errors:[],warnings:[]},p=g(i);return v(n,i.resourcePath,"RESOURCE_PATH","Resource path",["resourcePath"],u.errors),-1===t.indexOf(i.resourcePath)&&(j(a,i.resourcePath,"RESOURCE_PATH","Resource path",["resourcePath"],u.errors),n.push(i.resourcePath)),E(p,u),r.reduce(i.apis,function(n,i,o){var t=["apis",o.toString()],a=w(i.path);return n.indexOf(a.path)>-1?d("DUPLICATE_API_PATH","API path (or equivalent) already defined: "+i.path,t.concat("path"),u.errors):n.push(a.path),r.reduce(i.operations,function(n,i,o){var c=t.concat(["operations",o.toString()]);return v(n,i.method,"OPERATION_METHOD","Operation method",c.concat("method"),u.errors),n.push(i.method),-1===e.primitives.indexOf(i.type)&&"1.2"===e.version&&f(p,"#/models/"+i.type,c.concat("type"),u),y(s,i.authorizations,c.concat("authorizations"),u),b(p,i,c,u),R(e,p,a,i.parameters,c,u),r.reduce(i.responseMessages,function(e,r,n){var i=c.concat(["responseMessages",n.toString()]);return v(e,r.code,"RESPONSE_MESSAGE_CODE","Response message code",i.concat(["code"]),u.errors),r.responseModel&&f(p,"#/models/"+r.responseModel,i.concat("responseModel"),u),e.concat(r.code)},[]),n},[]),n},[]),T(p,u),n},[]),T(s,c),r.each(r.difference(a,t),function(e){var r=a.indexOf(e);h(n.apis[r].path,"RESOURCE_PATH","Resource path",["apis",r.toString(),"path"],c.errors)}),o(void 0,c)},U=function(e,n,i){var o=g(n),t={errors:[],warnings:[]};E(o,t),y(o,n.security,["security"],t),r.reduce(o.resolved.paths,function(n,i,s){var a=["paths",s],c=w(s);return n.indexOf(c.path)>-1&&d("DUPLICATE_API_PATH","API path (or equivalent) already defined: "+s,a,t.errors),R(e,o,c,i.parameters,a,t),r.each(i,function(n,s){var u=[],d=a.concat(s),f=[];"parameters"!==s&&(y(o,n.security,d.concat("security"),t),r.each(n.parameters,function(e){u.push(e),f.push(e.name+":"+e.in)}),r.each(i.parameters,function(e){var n=r.cloneDeep(e);n.skipErrors=!0,-1===f.indexOf(e.name+":"+e.in)&&u.push(n)}),R(e,o,c,u,d,t),r.each(n.responses,function(e,r){b(o,e,d.concat("responses",r),t)}))}),n.concat(c.path)},[]),T(o,t),i(void 0,t)},A=function(e,r,n,i){var o=function(e,r){i(e,l(r))};"1.2"===e.version?S(e,r,n,o):U(e,r,o)},I=function(e,i,o,t){P(e,"1.2"===e.version?"resourceListing.json":"schema.json",i,function(i,s){return i?t(i):void(s||"1.2"!==e.version?t(void 0,s):(s={errors:[],warnings:[],apiDeclarations:[]},n.map(o,function(r,n){P(e,"apiDeclaration.json",r,n)},function(e,n){return e?t(e):(r.each(n,function(e,r){s.apiDeclarations[r]=e}),void t(void 0,s))})))})},D=function(e){var n=function(e,n){return r.reduce(n,function(e,r,n){return e[n]=i.createJsonValidator(r),e}.bind(this),{})},o=function(e){var n=r.cloneDeep(this.schemas[e]);return n.id=e,n}.bind(this),t=["string","number","boolean","integer","array"];switch(e){case"1.2":this.docsUrl="https://github.com/swagger-api/swagger-spec/blob/master/versions/1.2.md",this.primitives=r.union(t,["void","File"]),this.schemasUrl="https://github.com/swagger-api/swagger-spec/tree/master/schemas/v1.2",this.schemas={"apiDeclaration.json":require("../schemas/1.2/apiDeclaration.json"),"authorizationObject.json":require("../schemas/1.2/authorizationObject.json"),"dataType.json":require("../schemas/1.2/dataType.json"),"dataTypeBase.json":require("../schemas/1.2/dataTypeBase.json"),"infoObject.json":require("../schemas/1.2/infoObject.json"),"modelsObject.json":require("../schemas/1.2/modelsObject.json"),"oauth2GrantType.json":require("../schemas/1.2/oauth2GrantType.json"),"operationObject.json":require("../schemas/1.2/operationObject.json"),"parameterObject.json":require("../schemas/1.2/parameterObject.json"),"resourceListing.json":require("../schemas/1.2/resourceListing.json"),"resourceObject.json":require("../schemas/1.2/resourceObject.json")},this.validators=n(this,{"apiDeclaration.json":r.map(["dataTypeBase.json","modelsObject.json","oauth2GrantType.json","authorizationObject.json","parameterObject.json","operationObject.json","apiDeclaration.json"],o),"resourceListing.json":r.map(["resourceObject.json","infoObject.json","oauth2GrantType.json","authorizationObject.json","resourceListing.json"],o)});break;case"2.0":this.docsUrl="https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md",this.primitives=r.union(t,["file"]),this.schemasUrl="https://github.com/swagger-api/swagger-spec/tree/master/schemas/v2.0",this.schemas={"schema.json":require("../schemas/2.0/schema.json")},this.validators=n(this,{"schema.json":[o("schema.json")]});break;default:throw new Error(e+" is an unsupported Swagger specification version")}this.version=e};D.prototype.validate=function(e,n,i){switch(this.version){case"1.2":if(r.isUndefined(e))throw new Error("resourceListing is required");if(!r.isPlainObject(e))throw new TypeError("resourceListing must be an object");if(r.isUndefined(n))throw new Error("apiDeclarations is required");if(!r.isArray(n))throw new TypeError("apiDeclarations must be an array");break;case"2.0":if(r.isUndefined(e))throw new Error("swaggerObject is required");if(!r.isPlainObject(e))throw new TypeError("swaggerObject must be an object")}if("2.0"===this.version&&(i=arguments[1]),r.isUndefined(i))throw new Error("callback is required");if(!r.isFunction(i))throw new TypeError("callback must be a function");"2.0"===this.version&&(n=[]),I(this,e,n,function(r,o){r||l(o)?i(r,o):A(this,e,n,i)}.bind(this))},D.prototype.composeSchema=function(e,n,o){var t=i.getSwaggerVersion(e),s=function(r,i){var t;return r?o(r):l(i)?m(i,o):(t=g(e),i={errors:[],warnings:[]},E(t,i),t.definitions[n]?l(i)?m(i,o):void o(void 0,p(t,n)):o())};switch(this.version){case"1.2":if(r.isUndefined(e))throw new Error("apiDeclaration is required");if(!r.isPlainObject(e))throw new TypeError("apiDeclaration must be an object");if(r.isUndefined(n))throw new Error("modelId is required");break;case"2.0":if(r.isUndefined(e))throw new Error("swaggerObject is required");if(!r.isPlainObject(e))throw new TypeError("swaggerObject must be an object");if(r.isUndefined(n))throw new Error("modelRef is required")}if(r.isUndefined(o))throw new Error("callback is required");if(!r.isFunction(o))throw new TypeError("callback must be a function");if("#"!==n.charAt(0)){if("1.2"!==this.version)throw new Error("modelRef must be a JSON Pointer");n="#/models/"+n}P(this,"1.2"===t?"apiDeclaration.json":"schema.json",e,s)},D.prototype.validateModel=function(e,n,i,o){switch(this.version){case"1.2":if(r.isUndefined(e))throw new Error("apiDeclaration is required");if(!r.isPlainObject(e))throw new TypeError("apiDeclaration must be an object");if(r.isUndefined(n))throw new Error("modelId is required");break;case"2.0":if(r.isUndefined(e))throw new Error("swaggerObject is required");if(!r.isPlainObject(e))throw new TypeError("swaggerObject must be an object");if(r.isUndefined(n))throw new Error("modelRef is required")}if(r.isUndefined(i))throw new Error("data is required");if(r.isUndefined(o))throw new Error("callback is required");if(!r.isFunction(o))throw new TypeError("callback must be a function");this.composeSchema(e,n,function(e,r){return e?o(e):void P(this,r,i,o)}.bind(this))},D.prototype.resolve=function(e,n,i){var t,a;if(r.isUndefined(e))throw new Error("document is required");if(!r.isPlainObject(e))throw new TypeError("document must be an object");if(i=arguments[1],r.isUndefined(i))throw new Error("callback is required");if(!r.isFunction(i))throw new TypeError("callback must be a function");t=g(e),t.resolved?i(void 0,t.resolved):(a="1.2"===t.swaggerVersion?r.find(["basePath","consumes","models","produces","resourcePath"],function(n){return!r.isUndefined(e[n])})?"apiDeclaration.json":"resourceListing.json":"schema.json",P(this,a,e,function(e,a){return e?i(e):l(a)?m(a,i):r.isUndefined(n)?i(void 0,t.resolved):i(void 0,s(t.resolved).get(o.pathFromPointer(n)))}))},module.exports.v1=module.exports.v1_2=new D("1.2"),module.exports.v2=module.exports.v2_0=new D("2.0")}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});
},{"../schemas/1.2/apiDeclaration.json":5,"../schemas/1.2/authorizationObject.json":6,"../schemas/1.2/dataType.json":7,"../schemas/1.2/dataTypeBase.json":8,"../schemas/1.2/infoObject.json":9,"../schemas/1.2/modelsObject.json":10,"../schemas/1.2/oauth2GrantType.json":11,"../schemas/1.2/operationObject.json":12,"../schemas/1.2/parameterObject.json":13,"../schemas/1.2/resourceListing.json":14,"../schemas/1.2/resourceObject.json":15,"../schemas/2.0/schema.json":16,"./helpers":2,"./validators":3}],2:[function(require,module,exports){
(function(e,r){"use strict";var n="undefined"!=typeof window?window._:"undefined"!=typeof r?r._:null,o="undefined"!=typeof window?window.JsonRefs:"undefined"!=typeof r?r.JsonRefs:null,t="undefined"!=typeof window?window.ZSchema:"undefined"!=typeof r?r.ZSchema:null,i=require("../schemas/json-schema-draft-04.json"),a="http://json-schema.org/draft-04/schema",s={};module.exports.createJsonValidator=function(e){var r,s=new t({reportPathAsArray:!0});if(s.setRemoteReference(a,i),n.each(["byte","double","float","int32","int64","mime-type","uri-template"],function(e){t.registerFormat(e,function(){return!0})}),n.isArray(e)&&(r=s.compileSchema(e),r===!1))throw console.error("JSON Schema file"+(e.length>1?"s are":" is")+" invalid:"),n.each(s.getLastErrors(),function(e){console.error("  "+(n.isArray(e.path)?o.pathToPointer(e.path):e.path)+": "+e.message)}),new Error("Unable to create validator due to invalid JSON Schema");return s},module.exports.getSpec=function(e){var r=s[e];if(n.isUndefined(r))switch(e){case"1.2":r=require("../lib/specs").v1_2;break;case"2.0":r=require("../lib/specs").v2_0}return r},module.exports.getSwaggerVersion=function(e){return n.isPlainObject(e)?e.swaggerVersion||e.swagger:void 0};var c=module.exports.toJsonPointer=function(e){return"#/"+e.map(function(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}).join("/")};module.exports.printValidationResults=function(r,o,t,i,a,s){var l=function(e,r){return 1===r?e:e+"s"},u=function(e,r,o){console.error(e),console.error(),n.each(r,function(e){console.error(new Array(o+1).join(" ")+c(e.path)+": "+e.message)}),console.error()},d=0,f=0;console.error(),i.errors.length>0&&(d+=i.errors.length,u("API Errors:",i.errors,2)),i.warnings.length>0&&(f+=i.warnings.length,u("API Warnings:",i.warnings,2)),i.apiDeclarations&&i.apiDeclarations.forEach(function(e,r){if(e){var n=t[r].resourcePath||r;e.errors.length>0&&(d+=e.errors.length,u("  API Declaration ("+n+") Errors:",e.errors,4)),e.warnings.length>0&&(f+=e.warnings.length,u("  API Declaration ("+n+") Warnings:",e.warnings,4))}}),a&&console.error(d>0?d+" "+l("error",d)+" and "+f+" "+l("warning",f):"Validation succeeded but with "+f+" "+l("warning",f)),d>0&&s&&e.exit(1)}}).call(this,require("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});
},{"../lib/specs":undefined,"../schemas/json-schema-draft-04.json":17,"_process":4}],3:[function(require,module,exports){
(function(e){"use strict";var t="undefined"!=typeof window?window._:"undefined"!=typeof e?e._:null,n=require("./helpers"),i=/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/,a=/^([0-9]{2}):([0-9]{2}):([0-9]{2})(.[0-9]+)?(z|([+-][0-9]{2}:[0-9]{2}))$/,r=function(e){var n,a,r;return t.isString(e)||(e=e.toString()),a=i.exec(e),null===a?!1:(n=a[3],r=a[2],"01">r||r>"12"||"01">n||n>"31"?!1:!0)},o=function(e){var n,i,o,s,d,l,u;return t.isString(e)||(e=e.toString()),l=e.toLowerCase().split("t"),i=l[0],o=l.length>1?l[1]:void 0,r(i)?(s=a.exec(o),null===s?!1:(n=s[1],d=s[2],u=s[3],n>"23"||d>"59"||u>"59"?!1:!0)):!1},s=function(e,t){var n=new Error(t);throw n.code=e,n.failedValidation=!0,n};module.exports.validateAgainstSchema=function(e,i,a){var r=function(e){delete e.params,e.inner&&t.each(e.inner,function(e){r(e)})};t.isUndefined(a)&&(a=n.createJsonValidator([e]));var o=a.validate(i,e);if(!o)try{s("SCHEMA_VALIDATION_FAILED","Failed schema validation")}catch(d){throw d.results={errors:t.map(a.getLastErrors(),function(e){return r(e),e}),warnings:[]},d}};var d=module.exports.validateArrayType=function(e){"array"===e.type&&t.isUndefined(e.items)&&s("OBJECT_MISSING_REQUIRED_PROPERTY","Missing required property: items")};module.exports.validateContentType=function(e,n,i){var a=i.headers["content-type"]||"application/octet-stream",r=t.union(n,e);if(a=a.split(";")[0],r.length>0&&-1!==["POST","PUT"].indexOf(i.method)&&-1===r.indexOf(a))throw new Error("Invalid content type ("+a+").  These are valid: "+r.join(", "))};var l=module.exports.validateEnum=function(e,n){t.isUndefined(n)||t.isUndefined(e)||-1!==n.indexOf(e)||s("ENUM_MISMATCH","Not an allowable value ("+n.join(", ")+"): "+e)},u=module.exports.validateMaximum=function(e,n,i,a){var r,o,d=a===!0?"MAXIMUM_EXCLUSIVE":"MAXIMUM";t.isUndefined(a)&&(a=!1),"integer"===i?o=parseInt(e,10):"number"===i&&(o=parseFloat(e)),t.isUndefined(n)||(r=parseFloat(n),a&&o>=r?s(d,"Greater than or equal to the configured maximum ("+n+"): "+e):o>r&&s(d,"Greater than the configured maximum ("+n+"): "+e))},m=module.exports.validateMaxItems=function(e,n){!t.isUndefined(n)&&e.length>n&&s("ARRAY_LENGTH_LONG","Array is too long ("+e.length+"), maximum "+n)},f=module.exports.validateMaxLength=function(e,n){!t.isUndefined(n)&&e.length>n&&s("MAX_LENGTH","String is too long ("+e.length+" chars), maximum "+n)},c=module.exports.validateMaxProperties=function(e,n){var i=t.isPlainObject(e)?Object.keys(e).length:0;!t.isUndefined(n)&&i>n&&s("MAX_PROPERTIES","Number of properties is too many ("+i+" properties), maximum "+n)},p=module.exports.validateMinimum=function(e,n,i,a){var r,o,d=a===!0?"MINIMUM_EXCLUSIVE":"MINIMUM";t.isUndefined(a)&&(a=!1),"integer"===i?o=parseInt(e,10):"number"===i&&(o=parseFloat(e)),t.isUndefined(n)||(r=parseFloat(n),a&&r>=o?s(d,"Less than or equal to the configured minimum ("+n+"): "+e):r>o&&s(d,"Less than the configured minimum ("+n+"): "+e))},h=module.exports.validateMinItems=function(e,n){!t.isUndefined(n)&&e.length<n&&s("ARRAY_LENGTH_SHORT","Array is too short ("+e.length+"), minimum "+n)},v=module.exports.validateMinLength=function(e,n){!t.isUndefined(n)&&e.length<n&&s("MIN_LENGTH","String is too short ("+e.length+" chars), minimum "+n)},x=module.exports.validateMinProperties=function(e,n){var i=t.isPlainObject(e)?Object.keys(e).length:0;!t.isUndefined(n)&&n>i&&s("MIN_PROPERTIES","Number of properties is too few ("+i+" properties), minimum "+n)},g=module.exports.validateMultipleOf=function(e,n){t.isUndefined(n)||e%n===0||s("MULTIPLE_OF","Not a multiple of "+n)},U=module.exports.validatePattern=function(e,n){!t.isUndefined(n)&&t.isNull(e.match(new RegExp(n)))&&s("PATTERN","Does not match required pattern: "+n)};module.exports.validateRequiredness=function(e,n){!t.isUndefined(n)&&n===!0&&t.isUndefined(e)&&s("REQUIRED","Is required")};var I=module.exports.validateTypeAndFormat=function M(e,n,i,a){var d=!0;if(t.isArray(e))t.each(e,function(e,t){M(e,n,i,!0)||s("INVALID_TYPE","Value at index "+t+" is not a valid "+n+": "+e)});else switch(n){case"boolean":d=t.isBoolean(e)||-1!==["false","true"].indexOf(e);break;case"integer":d=!t.isNaN(parseInt(e,10));break;case"number":d=!t.isNaN(parseFloat(e));break;case"string":if(!t.isUndefined(i))switch(i){case"date":d=r(e);break;case"date-time":d=o(e)}}return a?d:void(d||s("INVALID_TYPE","Not a valid "+(t.isUndefined(i)?"":i+" ")+n+": "+e))},y=module.exports.validateUniqueItems=function(e,n){t.isUndefined(n)||t.uniq(e).length===e.length||s("ARRAY_UNIQUE","Does not allow duplicate values: "+e.join(", "))};module.exports.validateSchemaConstraints=function(e,n,i,a){var r=function s(e){var t=e;return t.schema&&(i=i.concat(["schema"]),t=s(t.schema)),t};n=r(n);try{if("array"===n.type&&d(n),t.isUndefined(a)&&(a="1.2"===e?n.defaultValue:n.default,i=i.concat(["1.2"===e?"defaultValue":"default"])),t.isUndefined(a))return;"array"===n.type?t.isUndefined(n.items)?I(a,n.type,n.format):I(a,"array"===n.type?n.items.type:n.type,"array"===n.type&&n.items.format?n.items.format:n.format):I(a,n.type,n.format),l(a,n.enum),u(a,n.maximum,n.type,n.exclusiveMaximum),m(a,n.maxItems),f(a,n.maxLength),c(a,n.maxProperties),p(a,n.minimum,n.type,n.exclusiveMinimum),h(a,n.minItems),v(a,n.minLength),x(a,n.minProperties),g(a,n.multipleOf),U(a,n.pattern),y(a,n.uniqueItems)}catch(o){throw o.path=i,o}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});
},{"./helpers":2}],4:[function(require,module,exports){
function noop(){}var process=module.exports={};process.nextTick=function(){var o="undefined"!=typeof window&&window.setImmediate,e="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(o)return function(o){return window.setImmediate(o)};if(e){var s=[];return window.addEventListener("message",function(o){var e=o.source;if((e===window||null===e)&&"process-tick"===o.data&&(o.stopPropagation(),s.length>0)){var n=s.shift();n()}},!0),function(o){s.push(o),window.postMessage("process-tick","*")}}return function(o){setTimeout(o,0)}}(),process.title="browser",process.browser=!0,process.env={},process.argv=[],process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(){throw new Error("process.chdir is not supported")};
},{}],5:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/apiDeclaration.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "required": [ "swaggerVersion", "basePath", "apis" ],
    "properties": {
        "swaggerVersion": { "enum": [ "1.2" ] },
        "apiVersion": { "type": "string" },
        "basePath": {
            "type": "string",
            "format": "uri",
            "pattern": "^https?://"
        },
        "resourcePath": {
            "type": "string",
            "format": "uri",
            "pattern": "^/"
        },
        "apis": {
            "type": "array",
            "items": { "$ref": "#/definitions/apiObject" }
        },
        "models": {
            "type": "object",
            "additionalProperties": {
                "$ref": "modelsObject.json#"
            }
        },
        "produces": { "$ref": "#/definitions/mimeTypeArray" },
        "consumes": { "$ref": "#/definitions/mimeTypeArray" },
        "authorizations": { "$ref": "authorizationObject.json#" }
    },
    "additionalProperties": false,
    "definitions": {
        "apiObject": {
            "type": "object",
            "required": [ "path", "operations" ],
            "properties": {
                "path": {
                    "type": "string",
                    "format": "uri-template",
                    "pattern": "^/"
                },
                "description": { "type": "string" },
                "operations": {
                    "type": "array",
                    "items": { "$ref": "operationObject.json#" }
                }
            },
            "additionalProperties": false
        },
        "mimeTypeArray": {
            "type": "array",
            "items": {
                "type": "string",
                "format": "mime-type"
            },
            "uniqueItems": true
        }
    }
}

},{}],6:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/authorizationObject.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "additionalProperties": {
        "oneOf": [
            {
                "$ref": "#/definitions/basicAuth"
            },
            {
                "$ref": "#/definitions/apiKey"
            },
            {
                "$ref": "#/definitions/oauth2"
            }
        ]
    },
    "definitions": {
        "basicAuth": {
            "required": [ "type" ],
            "properties": {
                "type": { "enum": [ "basicAuth" ] }
            },
            "additionalProperties": false
        },
        "apiKey": {
            "required": [ "type", "passAs", "keyname" ],
            "properties": {
                "type": { "enum": [ "apiKey" ] },
                "passAs": { "enum": [ "header", "query" ] },
                "keyname": { "type": "string" }
            },
            "additionalProperties": false
        },
        "oauth2": {
            "type": "object",
            "required": [ "type", "grantTypes" ],
            "properties": {
                "type": { "enum": [ "oauth2" ] },
                "scopes": {
                    "type": "array",
                    "items": { "$ref": "#/definitions/oauth2Scope" }
                },
                "grantTypes": { "$ref": "oauth2GrantType.json#" }
            },
            "additionalProperties": false
        },
        "oauth2Scope": {
            "type": "object",
            "required": [ "scope" ],
            "properties": {
                "scope": { "type": "string" },
                "description": { "type": "string" }
            },
            "additionalProperties": false
        }
    }
}


},{}],7:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/dataType.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "Data type as described by the specification (version 1.2)",
    "type": "object",
    "oneOf": [
        { "$ref": "#/definitions/refType" },
        { "$ref": "#/definitions/voidType" },
        { "$ref": "#/definitions/primitiveType" },
        { "$ref": "#/definitions/modelType" },
        { "$ref": "#/definitions/arrayType" }
    ],
    "definitions": {
        "refType": {
            "required": [ "$ref" ],
            "properties": {
                "$ref": { "type": "string" }
            },
            "additionalProperties": false
        },
        "voidType": {
            "enum": [ { "type": "void" } ]
        },
        "modelType": {
            "required": [ "type" ],
            "properties": {
                "type": {
                    "type": "string",
                    "not": {
                        "enum": [ "boolean", "integer", "number", "string", "array" ]
                    }
                }
            },
            "additionalProperties": false
        },
        "primitiveType": {
            "required": [ "type" ],
            "properties": {
                "type": {
                    "enum": [ "boolean", "integer", "number", "string" ]
                },
                "format": { "type": "string" },
                "defaultValue": {
                    "not": { "type": [ "array", "object", "null" ] }
                },
                "enum": {
                    "type": "array",
                    "items": { "type": "string" },
                    "minItems": 1,
                    "uniqueItems": true
                },
                "minimum": { "type": "string" },
                "maximum": { "type": "string" }
            },
            "additionalProperties": false,
            "dependencies": {
                "format": {
                    "oneOf": [
                        {
                            "properties": {
                                "type": { "enum": [ "integer" ] },
                                "format": { "enum": [ "int32", "int64" ] }
                            }
                        },
                        {
                            "properties": {
                                "type": { "enum": [ "number" ] },
                                "format": { "enum": [ "float", "double" ] }
                            }
                        },
                        {
                            "properties": {
                                "type": { "enum": [ "string" ] },
                                "format": {
                                    "enum": [ "byte", "date", "date-time" ]
                                }
                            }
                        }
                    ]
                },
                "enum": {
                    "properties": {
                        "type": { "enum": [ "string" ] }
                    }
                },
                "minimum": {
                    "properties": {
                        "type": { "enum": [ "integer", "number" ] }
                    }
                },
                "maximum": {
                    "properties": {
                        "type": { "enum": [ "integer", "number" ] }
                    }
                }
            }
        },
        "arrayType": {
            "required": [ "type", "items" ],
            "properties": {
                "type": { "enum": [ "array" ] },
                "items": {
                    "type": "array",
                    "items": { "$ref": "#/definitions/itemsObject" }
                },
                "uniqueItems": { "type": "boolean" }
            },
            "additionalProperties": false
        },
        "itemsObject": {
            "oneOf": [
                {
                    "$ref": "#/definitions/refType"
                },
                {
                    "allOf": [
                        {
                            "$ref": "#/definitions/primitiveType"
                        },
                        {
                            "properties": {
                                "type": {},
                                "format": {}
                            },
                            "additionalProperties": false
                        }
                    ]
                }
            ]
        }
    }
}
},{}],8:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/dataTypeBase.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "Data type fields (section 4.3.3)",
    "type": "object",
    "oneOf": [
        { "required": [ "type" ] },
        { "required": [ "$ref" ] }
    ],
    "properties": {
        "type": { "type": "string" },
        "$ref": { "type": "string" },
        "format": { "type": "string" },
        "defaultValue": {
            "not": { "type": [ "array", "object", "null" ] }
        },
        "enum": {
            "type": "array",
            "items": { "type": "string" },
            "uniqueItems": true,
            "minItems": 1
        },
        "minimum": { "type": "string" },
        "maximum": { "type": "string" },
        "items": { "$ref": "#/definitions/itemsObject" },
        "uniqueItems": { "type": "boolean" }
    },
    "dependencies": {
        "format": {
            "oneOf": [
                {
                    "properties": {
                        "type": { "enum": [ "integer" ] },
                        "format": { "enum": [ "int32", "int64" ] }
                    }
                },
                {
                    "properties": {
                        "type": { "enum": [ "number" ] },
                        "format": { "enum": [ "float", "double" ] }
                    }
                },
                {
                    "properties": {
                        "type": { "enum": [ "string" ] },
                        "format": {
                            "enum": [ "byte", "date", "date-time" ]
                        }
                    }
                }
            ]
        }
    },
    "definitions": {
        "itemsObject": {
            "oneOf": [
                {
                    "type": "object",
                    "required": [ "$ref" ],
                    "properties": {
                        "$ref": { "type": "string" }
                    },
                    "additionalProperties": false
                },
                {
                    "allOf": [
                        { "$ref": "#" },
                        {
                            "required": [ "type" ],
                            "properties": {
                                "type": {},
                                "format": {}
                            },
                            "additionalProperties": false
                        }
                    ]
                }
            ]
        }
    }
}

},{}],9:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/infoObject.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "info object (section 5.1.3)",
    "type": "object",
    "required": [ "title", "description" ],
    "properties": {
        "title": { "type": "string" },
        "description": { "type": "string" },
        "termsOfServiceUrl": { "type": "string", "format": "uri" },
        "contact": { "type": "string", "format": "email" },
        "license": { "type": "string" },
        "licenseUrl": { "type": "string", "format": "uri" }
    },
    "additionalProperties": false
}
},{}],10:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/modelsObject.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "required": [ "id", "properties" ],
    "properties": {
        "id": { "type": "string" },
        "description": { "type": "string" },
        "properties": {
            "type": "object",
            "additionalProperties": { "$ref": "#/definitions/propertyObject" }
        },
        "subTypes": {
            "type": "array",
            "items": { "type": "string" },
            "uniqueItems": true
        },
        "discriminator": { "type": "string" }
    },
    "dependencies": {
        "subTypes": [ "discriminator" ]
    },
    "definitions": {
        "propertyObject": {
            "allOf": [
                {
                    "not": { "$ref": "#" }
                },
                {
                    "$ref": "dataTypeBase.json#"
                }
            ]
        }
    }
}


},{}],11:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/oauth2GrantType.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "minProperties": 1,
    "properties": {
        "implicit": { "$ref": "#/definitions/implicit" },
        "authorization_code": { "$ref": "#/definitions/authorizationCode" }
    },
    "definitions": {
        "implicit": {
            "type": "object",
            "required": [ "loginEndpoint" ],
            "properties": {
                "loginEndpoint": { "$ref": "#/definitions/loginEndpoint" },
                "tokenName": { "type": "string" }
            },
            "additionalProperties": false
        },
        "authorizationCode": {
            "type": "object",
            "required": [ "tokenEndpoint", "tokenRequestEndpoint" ],
            "properties": {
                "tokenEndpoint": { "$ref": "#/definitions/tokenEndpoint" },
                "tokenRequestEndpoint": { "$ref": "#/definitions/tokenRequestEndpoint" }
            },
            "additionalProperties": false
        },
        "loginEndpoint": {
            "type": "object",
            "required": [ "url" ],
            "properties": {
                "url": { "type": "string", "format": "uri" }
            },
            "additionalProperties": false
        },
        "tokenEndpoint": {
            "type": "object",
            "required": [ "url" ],
            "properties": {
                "url": { "type": "string", "format": "uri" },
                "tokenName": { "type": "string" }
            },
            "additionalProperties": false
        },
        "tokenRequestEndpoint": {
            "type": "object",
            "required": [ "url" ],
            "properties": {
                "url": { "type": "string", "format": "uri" },
                "clientIdName": { "type": "string" },
                "clientSecretName": { "type": "string" }
            },
            "additionalProperties": false
        }
    }
}
},{}],12:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/operationObject.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "allOf": [
        { "$ref": "dataTypeBase.json#" },
        {
            "required": [ "method", "nickname", "parameters" ],
            "properties": {
                "method": { "enum": [ "GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS" ] },
                "summary": { "type": "string", "maxLength": 120 },
                "notes": { "type": "string" },
                "nickname": {
                    "type": "string",
                    "pattern": "^[a-zA-Z0-9_]+$"
                },
                "authorizations": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "array",
                        "items": {
                            "$ref": "authorizationObject.json#/definitions/oauth2Scope"
                        }
                    }
                },
                "parameters": {
                    "type": "array",
                    "items": { "$ref": "parameterObject.json#" }
                },
                "responseMessages": {
                    "type": "array",
                    "items": { "$ref": "#/definitions/responseMessageObject"}
                },
                "produces": { "$ref": "#/definitions/mimeTypeArray" },
                "consumes": { "$ref": "#/definitions/mimeTypeArray" },
                "deprecated": { "enum": [ "true", "false" ] }
            }
        }
    ],
    "definitions": {
        "responseMessageObject": {
            "type": "object",
            "required": [ "code", "message" ],
            "properties": {
                "code": { "$ref": "#/definitions/rfc2616section10" },
                "message": { "type": "string" },
                "responseModel": { "type": "string" }
            }
        },
        "rfc2616section10": {
            "type": "integer",
            "minimum": 100,
            "maximum": 600,
            "exclusiveMaximum": true
        },
        "mimeTypeArray": {
            "type": "array",
            "items": {
                "type": "string",
                "format": "mime-type"
            },
            "uniqueItems": true
        }
    }
}

},{}],13:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/parameterObject.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "allOf": [
        { "$ref": "dataTypeBase.json#" },
        {
            "required": [ "paramType", "name" ],
            "properties": {
                "paramType": {
                    "enum": [ "path", "query", "body", "header", "form" ]
                },
                "name": { "type": "string" },
                "description": { "type": "string" },
                "required": { "type": "boolean" },
                "allowMultiple": { "type": "boolean" }
            }
        },
        {
            "description": "type File requires special paramType and consumes",
            "oneOf": [
                {
                    "properties": {
                        "type": { "not": { "enum": [ "File" ] } }
                    }
                },
                {
                    "properties": {
                        "type": { "enum": [ "File" ] },
                        "paramType": { "enum": [ "form" ] },
                        "consumes": { "enum": [ "multipart/form-data" ] }
                    }
                }
            ]
        }
    ]
}

},{}],14:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/resourceListing.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "required": [ "swaggerVersion", "apis" ],
    "properties": {
        "swaggerVersion": { "enum": [ "1.2" ] },
        "apis": {
            "type": "array",
            "items": { "$ref": "resourceObject.json#" }
        },
        "apiVersion": { "type": "string" },
        "info": { "$ref": "infoObject.json#" },
        "authorizations": { "$ref": "authorizationObject.json#" }
    }
}

},{}],15:[function(require,module,exports){
module.exports={
    "id": "http://wordnik.github.io/schemas/v1.2/resourceObject.json#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "required": [ "path" ],
    "properties": {
        "path": { "type": "string", "format": "uri" },
        "description": { "type": "string" }
    },
    "additionalProperties": false
}
},{}],16:[function(require,module,exports){
module.exports={
  "title": "A JSON Schema for Swagger 2.0 API.",
  "id": "http://swagger.io/v2/schema.json#",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "required": [
    "swagger",
    "info",
    "paths"
  ],
  "additionalProperties": false,
  "patternProperties": {
    "^x-": {
      "$ref": "#/definitions/vendorExtension"
    }
  },
  "properties": {
    "swagger": {
      "type": "string",
      "enum": [
        "2.0"
      ],
      "description": "The Swagger version of this document."
    },
    "info": {
      "$ref": "#/definitions/info"
    },
    "host": {
      "type": "string",
      "format": "uri",
      "pattern": "^[^{}/ :\\\\]+(?::\\d+)?$",
      "description": "The fully qualified URI to the host of the API."
    },
    "basePath": {
      "type": "string",
      "pattern": "^/",
      "description": "The base path to the API. Example: '/api'."
    },
    "schemes": {
      "$ref": "#/definitions/schemesList"
    },
    "consumes": {
      "description": "A list of MIME types accepted by the API.",
      "$ref": "#/definitions/mediaTypeList"
    },
    "produces": {
      "description": "A list of MIME types the API can produce.",
      "$ref": "#/definitions/mediaTypeList"
    },
    "paths": {
      "$ref": "#/definitions/paths"
    },
    "definitions": {
      "$ref": "#/definitions/definitions"
    },
    "parameters": {
      "$ref": "#/definitions/parameterDefinitions"
    },
    "responses": {
      "$ref": "#/definitions/responseDefinitions"
    },
    "security": {
      "$ref": "#/definitions/security"
    },
    "securityDefinitions": {
      "$ref": "#/definitions/securityDefinitions"
    },
    "tags": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/tag"
      },
      "uniqueItems": true
    },
    "externalDocs": {
      "$ref": "#/definitions/externalDocs"
    }
  },
  "definitions": {
    "info": {
      "type": "object",
      "description": "General information about the API.",
      "required": [
        "version",
        "title"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "title": {
          "type": "string",
          "description": "A unique and precise title of the API."
        },
        "version": {
          "type": "string",
          "description": "A semantic version number of the API."
        },
        "description": {
          "type": "string",
          "description": "A longer description of the API. Should be different from the title.  Github-flavored markdown is allowed."
        },
        "termsOfService": {
          "type": "string",
          "description": "The terms of service for the API."
        },
        "contact": {
          "$ref": "#/definitions/contact"
        },
        "license": {
          "$ref": "#/definitions/license"
        }
      }
    },
    "contact": {
      "type": "object",
      "description": "Contact information for the owners of the API.",
      "additionalProperties": false,
      "properties": {
        "name": {
          "type": "string",
          "description": "The identifying name of the contact person/organization."
        },
        "url": {
          "type": "string",
          "description": "The URL pointing to the contact information.",
          "format": "uri"
        },
        "email": {
          "type": "string",
          "description": "The email address of the contact person/organization.",
          "format": "email"
        }
      }
    },
    "license": {
      "type": "object",
      "required": [
        "name"
      ],
      "additionalProperties": false,
      "properties": {
        "name": {
          "type": "string",
          "description": "The name of the license type. It's encouraged to use an OSI compatible license."
        },
        "url": {
          "type": "string",
          "description": "The URL pointing to the license.",
          "format": "uri"
        }
      }
    },
    "paths": {
      "type": "object",
      "description": "Relative paths to the individual endpoints. They must be relative to the 'basePath'.",
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        },
        "^/": {
          "$ref": "#/definitions/pathItem"
        }
      },
      "additionalProperties": false
    },
    "definitions": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/schema"
      },
      "description": "One or more JSON objects describing the schemas being consumed and produced by the API."
    },
    "parameterDefinitions": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/parameter"
      },
      "description": "One or more JSON representations for parameters"
    },
    "responseDefinitions": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/response"
      },
      "description": "One or more JSON representations for parameters"
    },
    "externalDocs": {
      "type": "object",
      "additionalProperties": false,
      "description": "information about external documentation",
      "required": [
        "url"
      ],
      "properties": {
        "description": {
          "type": "string"
        },
        "url": {
          "type": "string",
          "format": "uri"
        }
      }
    },
    "examples": {
      "type": "object",
      "patternProperties": {
        "^[a-z0-9-]+/[a-z0-9\\-+]+$": {}
      },
      "additionalProperties": false
    },
    "mimeType": {
      "type": "string",
      "pattern": "^[\\sa-z0-9\\-+;\\.=\\/]+$",
      "description": "The MIME type of the HTTP message."
    },
    "operation": {
      "type": "object",
      "required": [
        "responses"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "tags": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "uniqueItems": true
        },
        "summary": {
          "type": "string",
          "description": "A brief summary of the operation."
        },
        "description": {
          "type": "string",
          "description": "A longer description of the operation, github-flavored markdown is allowed."
        },
        "externalDocs": {
          "$ref": "#/definitions/externalDocs"
        },
        "operationId": {
          "type": "string",
          "description": "A friendly name of the operation"
        },
        "produces": {
          "description": "A list of MIME types the API can produce.",
          "$ref": "#/definitions/mediaTypeList"
        },
        "consumes": {
          "description": "A list of MIME types the API can consume.",
          "$ref": "#/definitions/mediaTypeList"
        },
        "parameters": {
          "$ref": "#/definitions/parametersList"
        },
        "responses": {
          "$ref": "#/definitions/responses"
        },
        "schemes": {
          "$ref": "#/definitions/schemesList"
        },
        "deprecated": {
          "type": "boolean",
          "default": false
        },
        "security": {
          "$ref": "#/definitions/security"
        }
      }
    },
    "pathItem": {
      "type": "object",
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "$ref": {
          "type": "string"
        },
        "get": {
          "$ref": "#/definitions/operation"
        },
        "put": {
          "$ref": "#/definitions/operation"
        },
        "post": {
          "$ref": "#/definitions/operation"
        },
        "delete": {
          "$ref": "#/definitions/operation"
        },
        "options": {
          "$ref": "#/definitions/operation"
        },
        "head": {
          "$ref": "#/definitions/operation"
        },
        "patch": {
          "$ref": "#/definitions/operation"
        },
        "parameters": {
          "$ref": "#/definitions/parametersList"
        }
      }
    },
    "responses": {
      "type": "object",
      "description": "Response objects names can either be any valid HTTP status code or 'default'.",
      "minProperties": 1,
      "additionalProperties": false,
      "patternProperties": {
        "^([0-9]{3})$|^(default)$": {
          "$ref": "#/definitions/responseValue"
        },
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "not": {
        "type": "object",
        "additionalProperties": false,
        "patternProperties": {
          "^x-": {
            "$ref": "#/definitions/vendorExtension"
          }
        }
      }
    },
    "responseValue": {
      "oneOf": [
        {
          "$ref": "#/definitions/response"
        },
        {
          "$ref": "#/definitions/jsonReference"
        }
      ]
    },
    "response": {
      "type": "object",
      "required": [
        "description"
      ],
      "properties": {
        "description": {
          "type": "string"
        },
        "schema": {
          "$ref": "#/definitions/schema"
        },
        "headers": {
          "$ref": "#/definitions/headers"
        },
        "examples": {
          "$ref": "#/definitions/examples"
        }
      },
      "additionalProperties": false
    },
    "headers": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/header"
      }
    },
    "header": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "type"
      ],
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "string",
            "number",
            "integer",
            "boolean",
            "array"
          ]
        },
        "format": {
          "type": "string"
        },
        "items": {
          "$ref": "#/definitions/primitivesItems"
        },
        "collectionFormat": {
          "$ref": "#/definitions/collectionFormat"
        },
        "default": {
          "$ref": "#/definitions/default"
        },
        "maximum": {
          "$ref": "#/definitions/maximum"
        },
        "exclusiveMaximum": {
          "$ref": "#/definitions/exclusiveMaximum"
        },
        "minimum": {
          "$ref": "#/definitions/minimum"
        },
        "exclusiveMinimum": {
          "$ref": "#/definitions/exclusiveMinimum"
        },
        "maxLength": {
          "$ref": "#/definitions/maxLength"
        },
        "minLength": {
          "$ref": "#/definitions/minLength"
        },
        "pattern": {
          "$ref": "#/definitions/pattern"
        },
        "maxItems": {
          "$ref": "#/definitions/maxItems"
        },
        "minItems": {
          "$ref": "#/definitions/minItems"
        },
        "uniqueItems": {
          "$ref": "#/definitions/uniqueItems"
        },
        "enum": {
          "$ref": "#/definitions/enum"
        },
        "multipleOf": {
          "$ref": "#/definitions/multipleOf"
        },
        "description": {
          "type": "string"
        }
      }
    },
    "vendorExtension": {
      "description": "Any property starting with x- is valid.",
      "additionalProperties": true,
      "additionalItems": true
    },
    "bodyParameter": {
      "type": "object",
      "required": [
        "name",
        "in",
        "schema"
      ],
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "description": {
          "type": "string",
          "description": "A brief description of the parameter. This could contain examples of use.  Github-flavored markdown is allowed."
        },
        "name": {
          "type": "string",
          "description": "The name of the parameter."
        },
        "in": {
          "type": "string",
          "description": "Determines the location of the parameter.",
          "enum": [
            "body"
          ]
        },
        "required": {
          "type": "boolean",
          "description": "Determines whether or not this parameter is required or optional.",
          "default": false
        },
        "schema": {
          "$ref": "#/definitions/schema"
        }
      },
      "additionalProperties": false
    },
    "headerParameterSubSchema": {
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "required": {
          "type": "boolean",
          "description": "Determines whether or not this parameter is required or optional.",
          "default": false
        },
        "in": {
          "type": "string",
          "description": "Determines the location of the parameter.",
          "enum": [
            "header"
          ]
        },
        "description": {
          "type": "string",
          "description": "A brief description of the parameter. This could contain examples of use.  Github-flavored markdown is allowed."
        },
        "name": {
          "type": "string",
          "description": "The name of the parameter."
        },
        "type": {
          "type": "string",
          "enum": [
            "string",
            "number",
            "boolean",
            "integer",
            "array"
          ]
        },
        "format": {
          "type": "string"
        },
        "items": {
          "$ref": "#/definitions/primitivesItems"
        },
        "collectionFormat": {
          "$ref": "#/definitions/collectionFormat"
        },
        "default": {
          "$ref": "#/definitions/default"
        },
        "maximum": {
          "$ref": "#/definitions/maximum"
        },
        "exclusiveMaximum": {
          "$ref": "#/definitions/exclusiveMaximum"
        },
        "minimum": {
          "$ref": "#/definitions/minimum"
        },
        "exclusiveMinimum": {
          "$ref": "#/definitions/exclusiveMinimum"
        },
        "maxLength": {
          "$ref": "#/definitions/maxLength"
        },
        "minLength": {
          "$ref": "#/definitions/minLength"
        },
        "pattern": {
          "$ref": "#/definitions/pattern"
        },
        "maxItems": {
          "$ref": "#/definitions/maxItems"
        },
        "minItems": {
          "$ref": "#/definitions/minItems"
        },
        "uniqueItems": {
          "$ref": "#/definitions/uniqueItems"
        },
        "enum": {
          "$ref": "#/definitions/enum"
        },
        "multipleOf": {
          "$ref": "#/definitions/multipleOf"
        }
      }
    },
    "queryParameterSubSchema": {
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "required": {
          "type": "boolean",
          "description": "Determines whether or not this parameter is required or optional.",
          "default": false
        },
        "in": {
          "type": "string",
          "description": "Determines the location of the parameter.",
          "enum": [
            "query"
          ]
        },
        "description": {
          "type": "string",
          "description": "A brief description of the parameter. This could contain examples of use.  Github-flavored markdown is allowed."
        },
        "name": {
          "type": "string",
          "description": "The name of the parameter."
        },
        "type": {
          "type": "string",
          "enum": [
            "string",
            "number",
            "boolean",
            "integer",
            "array"
          ]
        },
        "format": {
          "type": "string"
        },
        "items": {
          "$ref": "#/definitions/primitivesItems"
        },
        "collectionFormat": {
          "$ref": "#/definitions/collectionFormatWithMulti"
        },
        "default": {
          "$ref": "#/definitions/default"
        },
        "maximum": {
          "$ref": "#/definitions/maximum"
        },
        "exclusiveMaximum": {
          "$ref": "#/definitions/exclusiveMaximum"
        },
        "minimum": {
          "$ref": "#/definitions/minimum"
        },
        "exclusiveMinimum": {
          "$ref": "#/definitions/exclusiveMinimum"
        },
        "maxLength": {
          "$ref": "#/definitions/maxLength"
        },
        "minLength": {
          "$ref": "#/definitions/minLength"
        },
        "pattern": {
          "$ref": "#/definitions/pattern"
        },
        "maxItems": {
          "$ref": "#/definitions/maxItems"
        },
        "minItems": {
          "$ref": "#/definitions/minItems"
        },
        "uniqueItems": {
          "$ref": "#/definitions/uniqueItems"
        },
        "enum": {
          "$ref": "#/definitions/enum"
        },
        "multipleOf": {
          "$ref": "#/definitions/multipleOf"
        }
      }
    },
    "formDataParameterSubSchema": {
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "required": {
          "type": "boolean",
          "description": "Determines whether or not this parameter is required or optional.",
          "default": false
        },
        "in": {
          "type": "string",
          "description": "Determines the location of the parameter.",
          "enum": [
            "formData"
          ]
        },
        "description": {
          "type": "string",
          "description": "A brief description of the parameter. This could contain examples of use.  Github-flavored markdown is allowed."
        },
        "name": {
          "type": "string",
          "description": "The name of the parameter."
        },
        "type": {
          "type": "string",
          "enum": [
            "string",
            "number",
            "boolean",
            "integer",
            "array",
            "file"
          ]
        },
        "format": {
          "type": "string"
        },
        "items": {
          "$ref": "#/definitions/primitivesItems"
        },
        "collectionFormat": {
          "$ref": "#/definitions/collectionFormatWithMulti"
        },
        "default": {
          "$ref": "#/definitions/default"
        },
        "maximum": {
          "$ref": "#/definitions/maximum"
        },
        "exclusiveMaximum": {
          "$ref": "#/definitions/exclusiveMaximum"
        },
        "minimum": {
          "$ref": "#/definitions/minimum"
        },
        "exclusiveMinimum": {
          "$ref": "#/definitions/exclusiveMinimum"
        },
        "maxLength": {
          "$ref": "#/definitions/maxLength"
        },
        "minLength": {
          "$ref": "#/definitions/minLength"
        },
        "pattern": {
          "$ref": "#/definitions/pattern"
        },
        "maxItems": {
          "$ref": "#/definitions/maxItems"
        },
        "minItems": {
          "$ref": "#/definitions/minItems"
        },
        "uniqueItems": {
          "$ref": "#/definitions/uniqueItems"
        },
        "enum": {
          "$ref": "#/definitions/enum"
        },
        "multipleOf": {
          "$ref": "#/definitions/multipleOf"
        }
      }
    },
    "pathParameterSubSchema": {
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "required": {
          "type": "boolean",
          "enum": [
            true
          ],
          "description": "Determines whether or not this parameter is required or optional."
        },
        "in": {
          "type": "string",
          "description": "Determines the location of the parameter.",
          "enum": [
            "path"
          ]
        },
        "description": {
          "type": "string",
          "description": "A brief description of the parameter. This could contain examples of use.  Github-flavored markdown is allowed."
        },
        "name": {
          "type": "string",
          "description": "The name of the parameter."
        },
        "type": {
          "type": "string",
          "enum": [
            "string",
            "number",
            "boolean",
            "integer",
            "array"
          ]
        },
        "format": {
          "type": "string"
        },
        "items": {
          "$ref": "#/definitions/primitivesItems"
        },
        "collectionFormat": {
          "$ref": "#/definitions/collectionFormat"
        },
        "default": {
          "$ref": "#/definitions/default"
        },
        "maximum": {
          "$ref": "#/definitions/maximum"
        },
        "exclusiveMaximum": {
          "$ref": "#/definitions/exclusiveMaximum"
        },
        "minimum": {
          "$ref": "#/definitions/minimum"
        },
        "exclusiveMinimum": {
          "$ref": "#/definitions/exclusiveMinimum"
        },
        "maxLength": {
          "$ref": "#/definitions/maxLength"
        },
        "minLength": {
          "$ref": "#/definitions/minLength"
        },
        "pattern": {
          "$ref": "#/definitions/pattern"
        },
        "maxItems": {
          "$ref": "#/definitions/maxItems"
        },
        "minItems": {
          "$ref": "#/definitions/minItems"
        },
        "uniqueItems": {
          "$ref": "#/definitions/uniqueItems"
        },
        "enum": {
          "$ref": "#/definitions/enum"
        },
        "multipleOf": {
          "$ref": "#/definitions/multipleOf"
        }
      }
    },
    "nonBodyParameter": {
      "type": "object",
      "required": [
        "name",
        "in",
        "type"
      ],
      "oneOf": [
        {
          "$ref": "#/definitions/headerParameterSubSchema"
        },
        {
          "$ref": "#/definitions/formDataParameterSubSchema"
        },
        {
          "$ref": "#/definitions/queryParameterSubSchema"
        },
        {
          "$ref": "#/definitions/pathParameterSubSchema"
        }
      ]
    },
    "parameter": {
      "oneOf": [
        {
          "$ref": "#/definitions/bodyParameter"
        },
        {
          "$ref": "#/definitions/nonBodyParameter"
        }
      ]
    },
    "schema": {
      "type": "object",
      "description": "A deterministic version of a JSON Schema object.",
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "$ref": {
          "type": "string"
        },
        "format": {
          "type": "string"
        },
        "title": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/title"
        },
        "description": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/description"
        },
        "default": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/default"
        },
        "multipleOf": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/multipleOf"
        },
        "maximum": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/maximum"
        },
        "exclusiveMaximum": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/exclusiveMaximum"
        },
        "minimum": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/minimum"
        },
        "exclusiveMinimum": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/exclusiveMinimum"
        },
        "maxLength": {
          "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveInteger"
        },
        "minLength": {
          "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"
        },
        "pattern": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/pattern"
        },
        "maxItems": {
          "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveInteger"
        },
        "minItems": {
          "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"
        },
        "uniqueItems": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/uniqueItems"
        },
        "maxProperties": {
          "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveInteger"
        },
        "minProperties": {
          "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"
        },
        "required": {
          "$ref": "http://json-schema.org/draft-04/schema#/definitions/stringArray"
        },
        "enum": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/enum"
        },
        "type": {
          "$ref": "http://json-schema.org/draft-04/schema#/properties/type"
        },
        "items": {
          "anyOf": [
            {
              "$ref": "#/definitions/schema"
            },
            {
              "type": "array",
              "minItems": 1,
              "items": {
                "$ref": "#/definitions/schema"
              }
            }
          ],
          "default": {}
        },
        "allOf": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/schema"
          }
        },
        "properties": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/definitions/schema"
          },
          "default": {}
        },
        "discriminator": {
          "type": "string"
        },
        "readOnly": {
          "type": "boolean",
          "default": false
        },
        "xml": {
          "$ref": "#/definitions/xml"
        },
        "externalDocs": {
          "$ref": "#/definitions/externalDocs"
        },
        "example": {}
      }
    },
    "primitivesItems": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "string",
            "number",
            "integer",
            "boolean",
            "array"
          ]
        },
        "format": {
          "type": "string"
        },
        "items": {
          "$ref": "#/definitions/primitivesItems"
        },
        "collectionFormat": {
          "$ref": "#/definitions/collectionFormat"
        },
        "default": {
          "$ref": "#/definitions/default"
        },
        "maximum": {
          "$ref": "#/definitions/maximum"
        },
        "exclusiveMaximum": {
          "$ref": "#/definitions/exclusiveMaximum"
        },
        "minimum": {
          "$ref": "#/definitions/minimum"
        },
        "exclusiveMinimum": {
          "$ref": "#/definitions/exclusiveMinimum"
        },
        "maxLength": {
          "$ref": "#/definitions/maxLength"
        },
        "minLength": {
          "$ref": "#/definitions/minLength"
        },
        "pattern": {
          "$ref": "#/definitions/pattern"
        },
        "maxItems": {
          "$ref": "#/definitions/maxItems"
        },
        "minItems": {
          "$ref": "#/definitions/minItems"
        },
        "uniqueItems": {
          "$ref": "#/definitions/uniqueItems"
        },
        "enum": {
          "$ref": "#/definitions/enum"
        },
        "multipleOf": {
          "$ref": "#/definitions/multipleOf"
        }
      }
    },
    "security": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/securityRequirement"
      },
      "uniqueItems": true
    },
    "securityRequirement": {
      "type": "object",
      "additionalProperties": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "uniqueItems": true
      }
    },
    "xml": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "name": {
          "type": "string"
        },
        "namespace": {
          "type": "string"
        },
        "prefix": {
          "type": "string"
        },
        "attribute": {
          "type": "boolean",
          "default": false
        },
        "wrapped": {
          "type": "boolean",
          "default": false
        }
      }
    },
    "tag": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "externalDocs": {
          "$ref": "#/definitions/externalDocs"
        }
      },
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      }
    },
    "securityDefinitions": {
      "type": "object",
      "additionalProperties": {
        "oneOf": [
          {
            "$ref": "#/definitions/basicAuthenticationSecurity"
          },
          {
            "$ref": "#/definitions/apiKeySecurity"
          },
          {
            "$ref": "#/definitions/oauth2ImplicitSecurity"
          },
          {
            "$ref": "#/definitions/oauth2PasswordSecurity"
          },
          {
            "$ref": "#/definitions/oauth2ApplicationSecurity"
          },
          {
            "$ref": "#/definitions/oauth2AccessCodeSecurity"
          }
        ]
      }
    },
    "basicAuthenticationSecurity": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "type"
      ],
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "basic"
          ]
        },
        "description": {
          "type": "string"
        }
      },
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      }
    },
    "apiKeySecurity": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "type",
        "name",
        "in"
      ],
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "apiKey"
          ]
        },
        "name": {
          "type": "string"
        },
        "in": {
          "type": "string",
          "enum": [
            "header",
            "query"
          ]
        },
        "description": {
          "type": "string"
        }
      },
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      }
    },
    "oauth2ImplicitSecurity": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "type",
        "flow",
        "authorizationUrl"
      ],
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "oauth2"
          ]
        },
        "flow": {
          "type": "string",
          "enum": [
            "implicit"
          ]
        },
        "scopes": {
          "$ref": "#/definitions/oauth2Scopes"
        },
        "authorizationUrl": {
          "type": "string",
          "format": "uri"
        },
        "description": {
          "type": "string"
        }
      },
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      }
    },
    "oauth2PasswordSecurity": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "type",
        "flow",
        "tokenUrl"
      ],
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "oauth2"
          ]
        },
        "flow": {
          "type": "string",
          "enum": [
            "password"
          ]
        },
        "scopes": {
          "$ref": "#/definitions/oauth2Scopes"
        },
        "tokenUrl": {
          "type": "string",
          "format": "uri"
        },
        "description": {
          "type": "string"
        }
      },
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      }
    },
    "oauth2ApplicationSecurity": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "type",
        "flow",
        "tokenUrl"
      ],
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "oauth2"
          ]
        },
        "flow": {
          "type": "string",
          "enum": [
            "application"
          ]
        },
        "scopes": {
          "$ref": "#/definitions/oauth2Scopes"
        },
        "tokenUrl": {
          "type": "string",
          "format": "uri"
        },
        "description": {
          "type": "string"
        }
      },
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      }
    },
    "oauth2AccessCodeSecurity": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "type",
        "flow",
        "authorizationUrl",
        "tokenUrl"
      ],
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "oauth2"
          ]
        },
        "flow": {
          "type": "string",
          "enum": [
            "accessCode"
          ]
        },
        "scopes": {
          "$ref": "#/definitions/oauth2Scopes"
        },
        "authorizationUrl": {
          "type": "string",
          "format": "uri"
        },
        "tokenUrl": {
          "type": "string",
          "format": "uri"
        },
        "description": {
          "type": "string"
        }
      },
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      }
    },
    "oauth2Scopes": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    },
    "mediaTypeList": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/mimeType"
      },
      "uniqueItems": true
    },
    "parametersList": {
      "type": "array",
      "description": "The parameters needed to send a valid API call.",
      "minItems": 1,
      "additionalItems": false,
      "items": {
        "oneOf": [
          {
            "$ref": "#/definitions/parameter"
          },
          {
            "$ref": "#/definitions/jsonReference"
          }
        ]
      },
      "uniqueItems": true
    },
    "schemesList": {
      "type": "array",
      "description": "The transfer protocol of the API.",
      "items": {
        "type": "string",
        "enum": [
          "http",
          "https",
          "ws",
          "wss"
        ]
      },
      "uniqueItems": true
    },
    "collectionFormat": {
      "type": "string",
      "enum": [
        "csv",
        "ssv",
        "tsv",
        "pipes"
      ],
      "default": "csv"
    },
    "collectionFormatWithMulti": {
      "type": "string",
      "enum": [
        "csv",
        "ssv",
        "tsv",
        "pipes",
        "multi"
      ],
      "default": "csv"
    },
    "title": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/title"
    },
    "description": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/description"
    },
    "default": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/default"
    },
    "multipleOf": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/multipleOf"
    },
    "maximum": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/maximum"
    },
    "exclusiveMaximum": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/exclusiveMaximum"
    },
    "minimum": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/minimum"
    },
    "exclusiveMinimum": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/exclusiveMinimum"
    },
    "maxLength": {
      "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveInteger"
    },
    "minLength": {
      "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"
    },
    "pattern": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/pattern"
    },
    "maxItems": {
      "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveInteger"
    },
    "minItems": {
      "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"
    },
    "uniqueItems": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/uniqueItems"
    },
    "enum": {
      "$ref": "http://json-schema.org/draft-04/schema#/properties/enum"
    },
    "jsonReference": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "$ref": {
          "type": "string"
        }
      }
    }
  }
}

},{}],17:[function(require,module,exports){
module.exports={
    "id": "http://json-schema.org/draft-04/schema#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "Core schema meta-schema",
    "definitions": {
        "schemaArray": {
            "type": "array",
            "minItems": 1,
            "items": { "$ref": "#" }
        },
        "positiveInteger": {
            "type": "integer",
            "minimum": 0
        },
        "positiveIntegerDefault0": {
            "allOf": [ { "$ref": "#/definitions/positiveInteger" }, { "default": 0 } ]
        },
        "simpleTypes": {
            "enum": [ "array", "boolean", "integer", "null", "number", "object", "string" ]
        },
        "stringArray": {
            "type": "array",
            "items": { "type": "string" },
            "minItems": 1,
            "uniqueItems": true
        }
    },
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "format": "uri"
        },
        "$schema": {
            "type": "string",
            "format": "uri"
        },
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "default": {},
        "multipleOf": {
            "type": "number",
            "minimum": 0,
            "exclusiveMinimum": true
        },
        "maximum": {
            "type": "number"
        },
        "exclusiveMaximum": {
            "type": "boolean",
            "default": false
        },
        "minimum": {
            "type": "number"
        },
        "exclusiveMinimum": {
            "type": "boolean",
            "default": false
        },
        "maxLength": { "$ref": "#/definitions/positiveInteger" },
        "minLength": { "$ref": "#/definitions/positiveIntegerDefault0" },
        "pattern": {
            "type": "string",
            "format": "regex"
        },
        "additionalItems": {
            "anyOf": [
                { "type": "boolean" },
                { "$ref": "#" }
            ],
            "default": {}
        },
        "items": {
            "anyOf": [
                { "$ref": "#" },
                { "$ref": "#/definitions/schemaArray" }
            ],
            "default": {}
        },
        "maxItems": { "$ref": "#/definitions/positiveInteger" },
        "minItems": { "$ref": "#/definitions/positiveIntegerDefault0" },
        "uniqueItems": {
            "type": "boolean",
            "default": false
        },
        "maxProperties": { "$ref": "#/definitions/positiveInteger" },
        "minProperties": { "$ref": "#/definitions/positiveIntegerDefault0" },
        "required": { "$ref": "#/definitions/stringArray" },
        "additionalProperties": {
            "anyOf": [
                { "type": "boolean" },
                { "$ref": "#" }
            ],
            "default": {}
        },
        "definitions": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "properties": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "patternProperties": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "dependencies": {
            "type": "object",
            "additionalProperties": {
                "anyOf": [
                    { "$ref": "#" },
                    { "$ref": "#/definitions/stringArray" }
                ]
            }
        },
        "enum": {
            "type": "array",
            "minItems": 1,
            "uniqueItems": true
        },
        "type": {
            "anyOf": [
                { "$ref": "#/definitions/simpleTypes" },
                {
                    "type": "array",
                    "items": { "$ref": "#/definitions/simpleTypes" },
                    "minItems": 1,
                    "uniqueItems": true
                }
            ]
        },
        "allOf": { "$ref": "#/definitions/schemaArray" },
        "anyOf": { "$ref": "#/definitions/schemaArray" },
        "oneOf": { "$ref": "#/definitions/schemaArray" },
        "not": { "$ref": "#" }
    },
    "dependencies": {
        "exclusiveMaximum": [ "maximum" ],
        "exclusiveMinimum": [ "minimum" ]
    },
    "default": {}
}

},{}]},{},[1])(1)
});