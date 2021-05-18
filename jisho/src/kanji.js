/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function(global, factory) {

    if (typeof module === "object" && typeof module.exports === "object") {
        // For CommonJS and CommonJS-like environments where a proper window is present,
        // execute the factory and get jQuery
        // For environments that do not inherently posses a window with a document
        // (such as Node.js), expose a jQuery-making factory as module.exports
        // This accentuates the need for the creation of a real window
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

    // Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {

    // Can't do this because several apps including ASP.NET trace
    // the stack via arguments.caller.callee and Firefox dies if
    // you try to trace through "use strict" call chains. (#13335)
    // Support: Firefox 18+
    //

    var deletedIds = [];

    var slice = deletedIds.slice;

    var concat = deletedIds.concat;

    var push = deletedIds.push;

    var indexOf = deletedIds.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var support = {};



    var
        version = "1.11.1",

        // Define a local copy of jQuery
        jQuery = function(selector, context) {
            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init(selector, context);
        },

        // Support: Android<4.1, IE<9
        // Make sure we trim BOM and NBSP
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,

        // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function(all, letter) {
            return letter.toUpperCase();
        };

    jQuery.fn = jQuery.prototype = {
        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,

        // Start with an empty selector
        selector: "",

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function() {
            return slice.call(this);
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function(num) {
            return num != null ?

                // Return just the one element from the set
                (num < 0 ? this[num + this.length] : this[num]) :

                // Return all the elements in a clean array
                slice.call(this);
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function(elems) {

            // Build a new jQuery matched element set
            var ret = jQuery.merge(this.constructor(), elems);

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;
            ret.context = this.context;

            // Return the newly-formed element set
            return ret;
        },

        // Execute a callback for every element in the matched set.
        // (You can seed the arguments with an array of args, but this is
        // only used internally.)
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },

        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },

        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },

        first: function() {
            return this.eq(0);
        },

        last: function() {
            return this.eq(-1);
        },

        eq: function(i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },

        end: function() {
            return this.prevObject || this.constructor(null);
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    };

    jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = jQuery.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend({
        // Unique for each copy of jQuery on the page
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function(msg) {
            throw new Error(msg);
        },

        noop: function() {},

        // See test/unit/core.js for details concerning isFunction.
        // Since version 1.3, DOM methods and functions like alert
        // aren't supported. They return false on IE (#2968).
        isFunction: function(obj) {
            return jQuery.type(obj) === "function";
        },

        isArray: Array.isArray || function(obj) {
            return jQuery.type(obj) === "array";
        },

        isWindow: function(obj) {
            /* jshint eqeqeq: false */
            return obj != null && obj == obj.window;
        },

        isNumeric: function(obj) {
            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0;
        },

        isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },

        isPlainObject: function(obj) {
            var key;

            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }

            try {
                // Not own constructor property must be Object
                if (obj.constructor &&
                    !hasOwn.call(obj, "constructor") &&
                    !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                // IE8,9 Will throw exceptions on certain host objects #9897
                return false;
            }

            // Support: IE<9
            // Handle iteration over inherited properties before own properties.
            if (support.ownLast) {
                for (key in obj) {
                    return hasOwn.call(obj, key);
                }
            }

            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            for (key in obj) {}

            return key === undefined || hasOwn.call(obj, key);
        },

        type: function(obj) {
            if (obj == null) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[toString.call(obj)] || "object" :
                typeof obj;
        },

        // Evaluates a script in a global context
        // Workarounds based on findings by Jim Driscoll
        // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
        globalEval: function(data) {
            if (data && jQuery.trim(data)) {
                // We use execScript on Internet Explorer
                // We use an anonymous function so that context is window
                // rather than jQuery in Firefox
                (window.execScript || function(data) {
                    window["eval"].call(window, data);
                })(data);
            }
        },

        // Convert dashed to camelCase; used by the css and data modules
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },

        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        // args is for internal usage only
        each: function(obj, callback, args) {
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike(obj);

            if (args) {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            break;
                        }
                    }
                }

                // A special, fast, case for the most common use of each
            } else {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                }
            }

            return obj;
        },

        // Support: Android<4.1, IE<9
        trim: function(text) {
            return text == null ?
                "" :
                (text + "").replace(rtrim, "");
        },

        // results is for internal usage only
        makeArray: function(arr, results) {
            var ret = results || [];

            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    jQuery.merge(ret,
                        typeof arr === "string" ? [arr] : arr
                    );
                } else {
                    push.call(ret, arr);
                }
            }

            return ret;
        },

        inArray: function(elem, arr, i) {
            var len;

            if (arr) {
                if (indexOf) {
                    return indexOf.call(arr, elem, i);
                }

                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

                for (; i < len; i++) {
                    // Skip accessing in sparse arrays
                    if (i in arr && arr[i] === elem) {
                        return i;
                    }
                }
            }

            return -1;
        },

        merge: function(first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;

            while (j < len) {
                first[i++] = second[j++];
            }

            // Support: IE<9
            // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
            if (len !== len) {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }

            first.length = i;

            return first;
        },

        grep: function(elems, callback, invert) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }

            return matches;
        },

        // arg is for internal usage only
        map: function(elems, callback, arg) {
            var value,
                i = 0,
                length = elems.length,
                isArray = isArraylike(elems),
                ret = [];

            // Go through the array, translating each of the items to their new values
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }

                // Go through every key on the object,
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }
            }

            // Flatten any nested arrays
            return concat.apply([], ret);
        },

        // A global GUID counter for objects
        guid: 1,

        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function(fn, context) {
            var args, proxy, tmp;

            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }

            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }

            // Simulated bind
            args = slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

            return proxy;
        },

        now: function() {
            return +(new Date());
        },

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    });

    // Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });

    function isArraylike(obj) {
        var length = obj.length,
            type = jQuery.type(obj);

        if (type === "function" || jQuery.isWindow(obj)) {
            return false;
        }

        if (obj.nodeType === 1 && length) {
            return true;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    }
    var Sizzle =
        /*!
         * Sizzle CSS Selector Engine v1.10.19
         * http://sizzlejs.com/
         *
         * Copyright 2013 jQuery Foundation, Inc. and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2014-04-18
         */
        (function(window) {

            var i,
                support,
                Expr,
                getText,
                isXML,
                tokenize,
                compile,
                select,
                outermostContext,
                sortInput,
                hasDuplicate,

                // Local document vars
                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,

                // Instance-specific data
                expando = "sizzle" + -(new Date()),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function(a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                    }
                    return 0;
                },

                // General-purpose constants
                strundefined = typeof undefined,
                MAX_NEGATIVE = 1 << 31,

                // Instance methods
                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
                // Use a stripped-down indexOf if we can't use a native one
                indexOf = arr.indexOf || function(elem) {
                    var i = 0,
                        len = this.length;
                    for (; i < len; i++) {
                        if (this[i] === elem) {
                            return i;
                        }
                    }
                    return -1;
                },

                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

                // Regular expressions

                // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
                whitespace = "[\\x20\\t\\r\\n\\f]",
                // http://www.w3.org/TR/css3-syntax/#characters
                characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

                // Loosely modeled on CSS identifier characters
                // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
                // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
                identifier = characterEncoding.replace("w", "w#"),

                // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
                attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
                // Operator (capture 2)
                "*([*^$|!~]?=)" + whitespace +
                // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
                "*\\]",

                pseudos = ":(" + characterEncoding + ")(?:\\((" +
                // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                // 1. quoted (capture 3; capture 4 or capture 5)
                "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                // 2. simple (capture 6)
                "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                // 3. anything else (capture 2)
                ".*" +
                ")\\)|)",

                // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

                rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),

                rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),

                rpseudo = new RegExp(pseudos),
                ridentifier = new RegExp("^" + identifier + "$"),

                matchExpr = {
                    "ID": new RegExp("^#(" + characterEncoding + ")"),
                    "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
                    "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                    "ATTR": new RegExp("^" + attributes),
                    "PSEUDO": new RegExp("^" + pseudos),
                    "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                        "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                        "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                    "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                    // For use in libraries implementing .is()
                    // We use this for POS matching in `select`
                    "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                },

                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,

                rnative = /^[^{]+\{\s*\[native \w/,

                // Easily-parseable/retrievable ID or TAG or CLASS selectors
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                rsibling = /[+~]/,
                rescape = /'|\\/g,

                // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
                funescape = function(_, escaped, escapedWhitespace) {
                    var high = "0x" + escaped - 0x10000;
                    // NaN means non-codepoint
                    // Support: Firefox<24
                    // Workaround erroneous numeric interpretation of +"0x"
                    return high !== high || escapedWhitespace ?
                        escaped :
                        high < 0 ?
                        // BMP codepoint
                        String.fromCharCode(high + 0x10000) :
                        // Supplemental Plane codepoint (surrogate pair)
                        String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
                };

            // Optimize for push.apply( _, NodeList )
            try {
                push.apply(
                    (arr = slice.call(preferredDoc.childNodes)),
                    preferredDoc.childNodes
                );
                // Support: Android<4.0
                // Detect silently failing push.apply
                arr[preferredDoc.childNodes.length].nodeType;
            } catch (e) {
                push = {
                    apply: arr.length ?

                        // Leverage slice if possible
                        function(target, els) {
                            push_native.apply(target, slice.call(els));
                        } :

                        // Support: IE<9
                        // Otherwise append directly
                        function(target, els) {
                            var j = target.length,
                                i = 0;
                            // Can't trust NodeList.length
                            while ((target[j++] = els[i++])) {}
                            target.length = j - 1;
                        }
                };
            }

            function Sizzle(selector, context, results, seed) {
                var match, elem, m, nodeType,
                    // QSA vars
                    i, groups, old, nid, newContext, newSelector;

                if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                    setDocument(context);
                }

                context = context || document;
                results = results || [];

                if (!selector || typeof selector !== "string") {
                    return results;
                }

                if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
                    return [];
                }

                if (documentIsHTML && !seed) {

                    // Shortcuts
                    if ((match = rquickExpr.exec(selector))) {
                        // Speed-up: Sizzle("#ID")
                        if ((m = match[1])) {
                            if (nodeType === 9) {
                                elem = context.getElementById(m);
                                // Check parentNode to catch when Blackberry 4.6 returns
                                // nodes that are no longer in the document (jQuery #6963)
                                if (elem && elem.parentNode) {
                                    // Handle the case where IE, Opera, and Webkit return items
                                    // by name instead of ID
                                    if (elem.id === m) {
                                        results.push(elem);
                                        return results;
                                    }
                                } else {
                                    return results;
                                }
                            } else {
                                // Context is not a document
                                if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
                                    contains(context, elem) && elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            }

                            // Speed-up: Sizzle("TAG")
                        } else if (match[2]) {
                            push.apply(results, context.getElementsByTagName(selector));
                            return results;

                            // Speed-up: Sizzle(".CLASS")
                        } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                            push.apply(results, context.getElementsByClassName(m));
                            return results;
                        }
                    }

                    // QSA path
                    if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                        nid = old = expando;
                        newContext = context;
                        newSelector = nodeType === 9 && selector;

                        // qSA works strangely on Element-rooted queries
                        // We can work around this by specifying an extra ID on the root
                        // and working up from there (Thanks to Andrew Dupont for the technique)
                        // IE 8 doesn't work on object elements
                        if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                            groups = tokenize(selector);

                            if ((old = context.getAttribute("id"))) {
                                nid = old.replace(rescape, "\\$&");
                            } else {
                                context.setAttribute("id", nid);
                            }
                            nid = "[id='" + nid + "'] ";

                            i = groups.length;
                            while (i--) {
                                groups[i] = nid + toSelector(groups[i]);
                            }
                            newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                            newSelector = groups.join(",");
                        }

                        if (newSelector) {
                            try {
                                push.apply(results,
                                    newContext.querySelectorAll(newSelector)
                                );
                                return results;
                            } catch (qsaError) {} finally {
                                if (!old) {
                                    context.removeAttribute("id");
                                }
                            }
                        }
                    }
                }

                // All others
                return select(selector.replace(rtrim, "$1"), context, results, seed);
            }

            /**
             * Create key-value caches of limited size
             * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
             *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
             *	deleting the oldest entry
             */
            function createCache() {
                var keys = [];

                function cache(key, value) {
                    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                    if (keys.push(key + " ") > Expr.cacheLength) {
                        // Only keep the most recent entries
                        delete cache[keys.shift()];
                    }
                    return (cache[key + " "] = value);
                }
                return cache;
            }

            /**
             * Mark a function for special use by Sizzle
             * @param {Function} fn The function to mark
             */
            function markFunction(fn) {
                fn[expando] = true;
                return fn;
            }

            /**
             * Support testing using an element
             * @param {Function} fn Passed the created div and expects a boolean result
             */
            function assert(fn) {
                var div = document.createElement("div");

                try {
                    return !!fn(div);
                } catch (e) {
                    return false;
                } finally {
                    // Remove from its parent by default
                    if (div.parentNode) {
                        div.parentNode.removeChild(div);
                    }
                    // release memory in IE
                    div = null;
                }
            }

            /**
             * Adds the same handler for all of the specified attrs
             * @param {String} attrs Pipe-separated list of attributes
             * @param {Function} handler The method that will be applied
             */
            function addHandle(attrs, handler) {
                var arr = attrs.split("|"),
                    i = attrs.length;

                while (i--) {
                    Expr.attrHandle[arr[i]] = handler;
                }
            }

            /**
             * Checks document order of two siblings
             * @param {Element} a
             * @param {Element} b
             * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
             */
            function siblingCheck(a, b) {
                var cur = b && a,
                    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                    (~b.sourceIndex || MAX_NEGATIVE) -
                    (~a.sourceIndex || MAX_NEGATIVE);

                // Use IE sourceIndex if available on both nodes
                if (diff) {
                    return diff;
                }

                // Check if b follows a
                if (cur) {
                    while ((cur = cur.nextSibling)) {
                        if (cur === b) {
                            return -1;
                        }
                    }
                }

                return a ? 1 : -1;
            }

            /**
             * Returns a function to use in pseudos for input types
             * @param {String} type
             */
            function createInputPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for buttons
             * @param {String} type
             */
            function createButtonPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for positionals
             * @param {Function} fn
             */
            function createPositionalPseudo(fn) {
                return markFunction(function(argument) {
                    argument = +argument;
                    return markFunction(function(seed, matches) {
                        var j,
                            matchIndexes = fn([], seed.length, argument),
                            i = matchIndexes.length;

                        // Match elements found at the specified indexes
                        while (i--) {
                            if (seed[(j = matchIndexes[i])]) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }

            /**
             * Checks a node for validity as a Sizzle context
             * @param {Element|Object=} context
             * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
             */
            function testContext(context) {
                return context && typeof context.getElementsByTagName !== strundefined && context;
            }

            // Expose support vars for convenience
            support = Sizzle.support = {};

            /**
             * Detects XML nodes
             * @param {Element|Object} elem An element or a document
             * @returns {Boolean} True iff elem is a non-HTML XML node
             */
            isXML = Sizzle.isXML = function(elem) {
                // documentElement is verified for cases where it doesn't yet exist
                // (such as loading iframes in IE - #4833)
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            };

            /**
             * Sets document-related variables once based on the current document
             * @param {Element|Object} [doc] An element or document object to use to set the document
             * @returns {Object} Returns the current document
             */
            setDocument = Sizzle.setDocument = function(node) {
                var hasCompare,
                    doc = node ? node.ownerDocument || node : preferredDoc,
                    parent = doc.defaultView;

                // If no document and documentElement is available, return
                if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                    return document;
                }

                // Set our document
                document = doc;
                docElem = doc.documentElement;

                // Support tests
                documentIsHTML = !isXML(doc);

                // Support: IE>8
                // If iframe document is assigned to "document" variable and if iframe has been reloaded,
                // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
                // IE6-8 do not support the defaultView property so parent will be undefined
                if (parent && parent !== parent.top) {
                    // IE11 does not have attachEvent, so all must suffer
                    if (parent.addEventListener) {
                        parent.addEventListener("unload", function() {
                            setDocument();
                        }, false);
                    } else if (parent.attachEvent) {
                        parent.attachEvent("onunload", function() {
                            setDocument();
                        });
                    }
                }

                /* Attributes
                ---------------------------------------------------------------------- */

                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
                support.attributes = assert(function(div) {
                    div.className = "i";
                    return !div.getAttribute("className");
                });

                /* getElement(s)By*
                ---------------------------------------------------------------------- */

                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function(div) {
                    div.appendChild(doc.createComment(""));
                    return !div.getElementsByTagName("*").length;
                });

                // Check if getElementsByClassName can be trusted
                support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(div) {
                    div.innerHTML = "<div class='a'></div><div class='a i'></div>";

                    // Support: Safari<4
                    // Catch class over-caching
                    div.firstChild.className = "i";
                    // Support: Opera<10
                    // Catch gEBCN failure to find non-leading classes
                    return div.getElementsByClassName("i").length === 2;
                });

                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function(div) {
                    docElem.appendChild(div).id = expando;
                    return !doc.getElementsByName || !doc.getElementsByName(expando).length;
                });

                // ID find and filter
                if (support.getById) {
                    Expr.find["ID"] = function(id, context) {
                        if (typeof context.getElementById !== strundefined && documentIsHTML) {
                            var m = context.getElementById(id);
                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document #6963
                            return m && m.parentNode ? [m] : [];
                        }
                    };
                    Expr.filter["ID"] = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                } else {
                    // Support: IE6/7
                    // getElementById is not reliable as a find shortcut
                    delete Expr.find["ID"];

                    Expr.filter["ID"] = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };
                }

                // Tag
                Expr.find["TAG"] = support.getElementsByTagName ?
                    function(tag, context) {
                        if (typeof context.getElementsByTagName !== strundefined) {
                            return context.getElementsByTagName(tag);
                        }
                    } :
                    function(tag, context) {
                        var elem,
                            tmp = [],
                            i = 0,
                            results = context.getElementsByTagName(tag);

                        // Filter out possible comments
                        if (tag === "*") {
                            while ((elem = results[i++])) {
                                if (elem.nodeType === 1) {
                                    tmp.push(elem);
                                }
                            }

                            return tmp;
                        }
                        return results;
                    };

                // Class
                Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
                    if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) {
                        return context.getElementsByClassName(className);
                    }
                };

                /* QSA/matchesSelector
                ---------------------------------------------------------------------- */

                // QSA and matchesSelector support

                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];

                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See http://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];

                if ((support.qsa = rnative.test(doc.querySelectorAll))) {
                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    assert(function(div) {
                        // Select is set to empty string on purpose
                        // This is to test IE's treatment of not explicitly
                        // setting a boolean content attribute,
                        // since its presence should be enough
                        // http://bugs.jquery.com/ticket/12359
                        div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

                        // Support: IE8, Opera 11-12.16
                        // Nothing should be selected when empty strings follow ^= or $= or *=
                        // The test attribute must be unknown in Opera but "safe" for WinRT
                        // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                        if (div.querySelectorAll("[msallowclip^='']").length) {
                            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                        }

                        // Support: IE8
                        // Boolean attributes and "value" are not treated correctly
                        if (!div.querySelectorAll("[selected]").length) {
                            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                        }

                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here and will not see later tests
                        if (!div.querySelectorAll(":checked").length) {
                            rbuggyQSA.push(":checked");
                        }
                    });

                    assert(function(div) {
                        // Support: Windows 8 Native Apps
                        // The type and name attributes are restricted during .innerHTML assignment
                        var input = doc.createElement("input");
                        input.setAttribute("type", "hidden");
                        div.appendChild(input).setAttribute("name", "D");

                        // Support: IE8
                        // Enforce case-sensitivity of name attribute
                        if (div.querySelectorAll("[name=d]").length) {
                            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                        }

                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here and will not see later tests
                        if (!div.querySelectorAll(":enabled").length) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }

                        // Opera 10-11 does not throw on post-comma invalid pseudos
                        div.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:");
                    });
                }

                if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
                        docElem.webkitMatchesSelector ||
                        docElem.mozMatchesSelector ||
                        docElem.oMatchesSelector ||
                        docElem.msMatchesSelector)))) {

                    assert(function(div) {
                        // Check to see if it's possible to do matchesSelector
                        // on a disconnected node (IE 9)
                        support.disconnectedMatch = matches.call(div, "div");

                        // This should fail with an exception
                        // Gecko does not error, returns false instead
                        matches.call(div, "[s!='']:x");
                        rbuggyMatches.push("!=", pseudos);
                    });
                }

                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

                /* Contains
                ---------------------------------------------------------------------- */
                hasCompare = rnative.test(docElem.compareDocumentPosition);

                // Element contains another
                // Purposefully does not implement inclusive descendent
                // As in, an element does not contain itself
                contains = hasCompare || rnative.test(docElem.contains) ?
                    function(a, b) {
                        var adown = a.nodeType === 9 ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !!(bup && bup.nodeType === 1 && (
                            adown.contains ?
                            adown.contains(bup) :
                            a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
                        ));
                    } :
                    function(a, b) {
                        if (b) {
                            while ((b = b.parentNode)) {
                                if (b === a) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };

                /* Sorting
                ---------------------------------------------------------------------- */

                // Document order sorting
                sortOrder = hasCompare ?
                    function(a, b) {

                        // Flag for duplicate removal
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }

                        // Sort on method existence if only one input has compareDocumentPosition
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if (compare) {
                            return compare;
                        }

                        // Calculate position if both inputs belong to the same document
                        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ?
                            a.compareDocumentPosition(b) :

                            // Otherwise we know they are disconnected
                            1;

                        // Disconnected nodes
                        if (compare & 1 ||
                            (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

                            // Choose the first element that is related to our preferred document
                            if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                                return -1;
                            }
                            if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                                return 1;
                            }

                            // Maintain original order
                            return sortInput ?
                                (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) :
                                0;
                        }

                        return compare & 4 ? -1 : 1;
                    } :
                    function(a, b) {
                        // Exit early if the nodes are identical
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }

                        var cur,
                            i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [a],
                            bp = [b];

                        // Parentless nodes are either documents or disconnected
                        if (!aup || !bup) {
                            return a === doc ? -1 :
                                b === doc ? 1 :
                                aup ? -1 :
                                bup ? 1 :
                                sortInput ?
                                (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) :
                                0;

                            // If the nodes are siblings, we can do a quick check
                        } else if (aup === bup) {
                            return siblingCheck(a, b);
                        }

                        // Otherwise we need full lists of their ancestors for comparison
                        cur = a;
                        while ((cur = cur.parentNode)) {
                            ap.unshift(cur);
                        }
                        cur = b;
                        while ((cur = cur.parentNode)) {
                            bp.unshift(cur);
                        }

                        // Walk down the tree looking for a discrepancy
                        while (ap[i] === bp[i]) {
                            i++;
                        }

                        return i ?
                            // Do a sibling check if the nodes have a common ancestor
                            siblingCheck(ap[i], bp[i]) :

                            // Otherwise nodes in our document sort first
                            ap[i] === preferredDoc ? -1 :
                            bp[i] === preferredDoc ? 1 :
                            0;
                    };

                return doc;
            };

            Sizzle.matches = function(expr, elements) {
                return Sizzle(expr, null, null, elements);
            };

            Sizzle.matchesSelector = function(elem, expr) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem);
                }

                // Make sure that attribute selectors are quoted
                expr = expr.replace(rattributeQuotes, "='$1']");

                if (support.matchesSelector && documentIsHTML &&
                    (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
                    (!rbuggyQSA || !rbuggyQSA.test(expr))) {

                    try {
                        var ret = matches.call(elem, expr);

                        // IE 9's matchesSelector returns false on disconnected nodes
                        if (ret || support.disconnectedMatch ||
                            // As well, disconnected nodes are said to be in a document
                            // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11) {
                            return ret;
                        }
                    } catch (e) {}
                }

                return Sizzle(expr, document, null, [elem]).length > 0;
            };

            Sizzle.contains = function(context, elem) {
                // Set document vars if needed
                if ((context.ownerDocument || context) !== document) {
                    setDocument(context);
                }
                return contains(context, elem);
            };

            Sizzle.attr = function(elem, name) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem);
                }

                var fn = Expr.attrHandle[name.toLowerCase()],
                    // Don't get fooled by Object.prototype properties (jQuery #13807)
                    val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
                    fn(elem, name, !documentIsHTML) :
                    undefined;

                return val !== undefined ?
                    val :
                    support.attributes || !documentIsHTML ?
                    elem.getAttribute(name) :
                    (val = elem.getAttributeNode(name)) && val.specified ?
                    val.value :
                    null;
            };

            Sizzle.error = function(msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg);
            };

            /**
             * Document sorting and removing duplicates
             * @param {ArrayLike} results
             */
            Sizzle.uniqueSort = function(results) {
                var elem,
                    duplicates = [],
                    j = 0,
                    i = 0;

                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice(0);
                results.sort(sortOrder);

                if (hasDuplicate) {
                    while ((elem = results[i++])) {
                        if (elem === results[i]) {
                            j = duplicates.push(i);
                        }
                    }
                    while (j--) {
                        results.splice(duplicates[j], 1);
                    }
                }

                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;

                return results;
            };

            /**
             * Utility function for retrieving the text value of an array of DOM nodes
             * @param {Array|Element} elem
             */
            getText = Sizzle.getText = function(elem) {
                var node,
                    ret = "",
                    i = 0,
                    nodeType = elem.nodeType;

                if (!nodeType) {
                    // If no nodeType, this is expected to be an array
                    while ((node = elem[i++])) {
                        // Do not traverse comment nodes
                        ret += getText(node);
                    }
                } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (jQuery #11153)
                    if (typeof elem.textContent === "string") {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem);
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes

                return ret;
            };

            Expr = Sizzle.selectors = {

                // Can be adjusted by the user
                cacheLength: 50,

                createPseudo: markFunction,

                match: matchExpr,

                attrHandle: {},

                find: {},

                relative: {
                    ">": { dir: "parentNode", first: true },
                    " ": { dir: "parentNode" },
                    "+": { dir: "previousSibling", first: true },
                    "~": { dir: "previousSibling" }
                },

                preFilter: {
                    "ATTR": function(match) {
                        match[1] = match[1].replace(runescape, funescape);

                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

                        if (match[2] === "~=") {
                            match[3] = " " + match[3] + " ";
                        }

                        return match.slice(0, 4);
                    },

                    "CHILD": function(match) {
                        /* matches from matchExpr["CHILD"]
                        	1 type (only|nth|...)
                        	2 what (child|of-type)
                        	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                        	4 xn-component of xn+y argument ([+-]?\d*n|)
                        	5 sign of xn-component
                        	6 x of xn-component
                        	7 sign of y-component
                        	8 y of y-component
                        */
                        match[1] = match[1].toLowerCase();

                        if (match[1].slice(0, 3) === "nth") {
                            // nth-* requires argument
                            if (!match[3]) {
                                Sizzle.error(match[0]);
                            }

                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                            match[5] = +((match[7] + match[8]) || match[3] === "odd");

                            // other types prohibit arguments
                        } else if (match[3]) {
                            Sizzle.error(match[0]);
                        }

                        return match;
                    },

                    "PSEUDO": function(match) {
                        var excess,
                            unquoted = !match[6] && match[2];

                        if (matchExpr["CHILD"].test(match[0])) {
                            return null;
                        }

                        // Accept quoted arguments as-is
                        if (match[3]) {
                            match[2] = match[4] || match[5] || "";

                            // Strip excess characters from unquoted arguments
                        } else if (unquoted && rpseudo.test(unquoted) &&
                            // Get excess from tokenize (recursively)
                            (excess = tokenize(unquoted, true)) &&
                            // advance to the next closing parenthesis
                            (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

                            // excess is a negative index
                            match[0] = match[0].slice(0, excess);
                            match[2] = unquoted.slice(0, excess);
                        }

                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice(0, 3);
                    }
                },

                filter: {

                    "TAG": function(nodeNameSelector) {
                        var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                        return nodeNameSelector === "*" ?
                            function() { return true; } :
                            function(elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                    },

                    "CLASS": function(className) {
                        var pattern = classCache[className + " "];

                        return pattern ||
                            (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
                            classCache(className, function(elem) {
                                return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
                            });
                    },

                    "ATTR": function(name, operator, check) {
                        return function(elem) {
                            var result = Sizzle.attr(elem, name);

                            if (result == null) {
                                return operator === "!=";
                            }
                            if (!operator) {
                                return true;
                            }

                            result += "";

                            return operator === "=" ? result === check :
                                operator === "!=" ? result !== check :
                                operator === "^=" ? check && result.indexOf(check) === 0 :
                                operator === "*=" ? check && result.indexOf(check) > -1 :
                                operator === "$=" ? check && result.slice(-check.length) === check :
                                operator === "~=" ? (" " + result + " ").indexOf(check) > -1 :
                                operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                                false;
                        };
                    },

                    "CHILD": function(type, what, argument, first, last) {
                        var simple = type.slice(0, 3) !== "nth",
                            forward = type.slice(-4) !== "last",
                            ofType = what === "of-type";

                        return first === 1 && last === 0 ?

                            // Shortcut for :nth-*(n)
                            function(elem) {
                                return !!elem.parentNode;
                            } :

                            function(elem, context, xml) {
                                var cache, outerCache, node, diff, nodeIndex, start,
                                    dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType;

                                if (parent) {

                                    // :(first|last|only)-(child|of-type)
                                    if (simple) {
                                        while (dir) {
                                            node = elem;
                                            while ((node = node[dir])) {
                                                if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                                    return false;
                                                }
                                            }
                                            // Reverse direction for :only-* (if we haven't yet done so)
                                            start = dir = type === "only" && !start && "nextSibling";
                                        }
                                        return true;
                                    }

                                    start = [forward ? parent.firstChild : parent.lastChild];

                                    // non-xml :nth-child(...) stores cache data on `parent`
                                    if (forward && useCache) {
                                        // Seek `elem` from a previously-cached index
                                        outerCache = parent[expando] || (parent[expando] = {});
                                        cache = outerCache[type] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = cache[0] === dirruns && cache[2];
                                        node = nodeIndex && parent.childNodes[nodeIndex];

                                        while ((node = ++nodeIndex && node && node[dir] ||

                                                // Fallback to seeking `elem` from the start
                                                (diff = nodeIndex = 0) || start.pop())) {

                                            // When found, cache indexes on `parent` and break
                                            if (node.nodeType === 1 && ++diff && node === elem) {
                                                outerCache[type] = [dirruns, nodeIndex, diff];
                                                break;
                                            }
                                        }

                                        // Use previously-cached element index if available
                                    } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                                        diff = cache[1];

                                        // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                    } else {
                                        // Use the same loop as above to seek `elem` from the start
                                        while ((node = ++nodeIndex && node && node[dir] ||
                                                (diff = nodeIndex = 0) || start.pop())) {

                                            if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                                // Cache the index of each encountered element
                                                if (useCache) {
                                                    (node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
                                                }

                                                if (node === elem) {
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                    // Incorporate the offset, then check against cycle size
                                    diff -= last;
                                    return diff === first || (diff % first === 0 && diff / first >= 0);
                                }
                            };
                    },

                    "PSEUDO": function(pseudo, argument) {
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args,
                            fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                            Sizzle.error("unsupported pseudo: " + pseudo);

                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        if (fn[expando]) {
                            return fn(argument);
                        }

                        // But maintain support for old signatures
                        if (fn.length > 1) {
                            args = [pseudo, pseudo, "", argument];
                            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                                markFunction(function(seed, matches) {
                                    var idx,
                                        matched = fn(seed, argument),
                                        i = matched.length;
                                    while (i--) {
                                        idx = indexOf.call(seed, matched[i]);
                                        seed[idx] = !(matches[idx] = matched[i]);
                                    }
                                }) :
                                function(elem) {
                                    return fn(elem, 0, args);
                                };
                        }

                        return fn;
                    }
                },

                pseudos: {
                    // Potentially complex pseudos
                    "not": markFunction(function(selector) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [],
                            results = [],
                            matcher = compile(selector.replace(rtrim, "$1"));

                        return matcher[expando] ?
                            markFunction(function(seed, matches, context, xml) {
                                var elem,
                                    unmatched = matcher(seed, null, xml, []),
                                    i = seed.length;

                                // Match elements unmatched by `matcher`
                                while (i--) {
                                    if ((elem = unmatched[i])) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) :
                            function(elem, context, xml) {
                                input[0] = elem;
                                matcher(input, null, xml, results);
                                return !results.pop();
                            };
                    }),

                    "has": markFunction(function(selector) {
                        return function(elem) {
                            return Sizzle(selector, elem).length > 0;
                        };
                    }),

                    "contains": markFunction(function(text) {
                        return function(elem) {
                            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                        };
                    }),

                    // "Whether an element is represented by a :lang() selector
                    // is based solely on the element's language value
                    // being equal to the identifier C,
                    // or beginning with the identifier C immediately followed by "-".
                    // The matching of C against the element's language value is performed case-insensitively.
                    // The identifier C does not have to be a valid language name."
                    // http://www.w3.org/TR/selectors/#lang-pseudo
                    "lang": markFunction(function(lang) {
                        // lang value must be a valid identifier
                        if (!ridentifier.test(lang || "")) {
                            Sizzle.error("unsupported lang: " + lang);
                        }
                        lang = lang.replace(runescape, funescape).toLowerCase();
                        return function(elem) {
                            var elemLang;
                            do {
                                if ((elemLang = documentIsHTML ?
                                        elem.lang :
                                        elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                                }
                            } while ((elem = elem.parentNode) && elem.nodeType === 1);
                            return false;
                        };
                    }),

                    // Miscellaneous
                    "target": function(elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id;
                    },

                    "root": function(elem) {
                        return elem === docElem;
                    },

                    "focus": function(elem) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },

                    // Boolean properties
                    "enabled": function(elem) {
                        return elem.disabled === false;
                    },

                    "disabled": function(elem) {
                        return elem.disabled === true;
                    },

                    "checked": function(elem) {
                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                    },

                    "selected": function(elem) {
                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if (elem.parentNode) {
                            elem.parentNode.selectedIndex;
                        }

                        return elem.selected === true;
                    },

                    // Contents
                    "empty": function(elem) {
                        // http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                        //   but not by others (comment: 8; processing instruction: 7; etc.)
                        // nodeType < 6 works because attributes (2) do not appear as children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            if (elem.nodeType < 6) {
                                return false;
                            }
                        }
                        return true;
                    },

                    "parent": function(elem) {
                        return !Expr.pseudos["empty"](elem);
                    },

                    // Element/input types
                    "header": function(elem) {
                        return rheader.test(elem.nodeName);
                    },

                    "input": function(elem) {
                        return rinputs.test(elem.nodeName);
                    },

                    "button": function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },

                    "text": function(elem) {
                        var attr;
                        return elem.nodeName.toLowerCase() === "input" &&
                            elem.type === "text" &&

                            // Support: IE<8
                            // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                            ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                    },

                    // Position-in-collection
                    "first": createPositionalPseudo(function() {
                        return [0];
                    }),

                    "last": createPositionalPseudo(function(matchIndexes, length) {
                        return [length - 1];
                    }),

                    "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
                        return [argument < 0 ? argument + length : argument];
                    }),

                    "even": createPositionalPseudo(function(matchIndexes, length) {
                        var i = 0;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "odd": createPositionalPseudo(function(matchIndexes, length) {
                        var i = 1;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; --i >= 0;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; ++i < length;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    })
                }
            };

            Expr.pseudos["nth"] = Expr.pseudos["eq"];

            // Add button/input type pseudos
            for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
                Expr.pseudos[i] = createInputPseudo(i);
            }
            for (i in { submit: true, reset: true }) {
                Expr.pseudos[i] = createButtonPseudo(i);
            }

            // Easy API for creating new setFilters
            function setFilters() {}
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();

            tokenize = Sizzle.tokenize = function(selector, parseOnly) {
                var matched, match, tokens, type,
                    soFar, groups, preFilters,
                    cached = tokenCache[selector + " "];

                if (cached) {
                    return parseOnly ? 0 : cached.slice(0);
                }

                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;

                while (soFar) {

                    // Comma and first run
                    if (!matched || (match = rcomma.exec(soFar))) {
                        if (match) {
                            // Don't consume trailing commas as valid
                            soFar = soFar.slice(match[0].length) || soFar;
                        }
                        groups.push((tokens = []));
                    }

                    matched = false;

                    // Combinators
                    if ((match = rcombinators.exec(soFar))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            // Cast descendant combinators to space
                            type: match[0].replace(rtrim, " ")
                        });
                        soFar = soFar.slice(matched.length);
                    }

                    // Filters
                    for (type in Expr.filter) {
                        if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                                (match = preFilters[type](match)))) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice(matched.length);
                        }
                    }

                    if (!matched) {
                        break;
                    }
                }

                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly ?
                    soFar.length :
                    soFar ?
                    Sizzle.error(selector) :
                    // Cache the tokens
                    tokenCache(selector, groups).slice(0);
            };

            function toSelector(tokens) {
                var i = 0,
                    len = tokens.length,
                    selector = "";
                for (; i < len; i++) {
                    selector += tokens[i].value;
                }
                return selector;
            }

            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir,
                    checkNonElements = base && dir === "parentNode",
                    doneName = done++;

                return combinator.first ?
                    // Check against closest ancestor/preceding element
                    function(elem, context, xml) {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                return matcher(elem, context, xml);
                            }
                        }
                    } :

                    // Check against all ancestor/preceding elements
                    function(elem, context, xml) {
                        var oldCache, outerCache,
                            newCache = [dirruns, doneName];

                        // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
                        if (xml) {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    if (matcher(elem, context, xml)) {
                                        return true;
                                    }
                                }
                            }
                        } else {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    outerCache = elem[expando] || (elem[expando] = {});
                                    if ((oldCache = outerCache[dir]) &&
                                        oldCache[0] === dirruns && oldCache[1] === doneName) {

                                        // Assign to newCache so results back-propagate to previous elements
                                        return (newCache[2] = oldCache[2]);
                                    } else {
                                        // Reuse newcache so results back-propagate to previous elements
                                        outerCache[dir] = newCache;

                                        // A match means we're done; a fail means we have to keep checking
                                        if ((newCache[2] = matcher(elem, context, xml))) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    };
            }

            function elementMatcher(matchers) {
                return matchers.length > 1 ?
                    function(elem, context, xml) {
                        var i = matchers.length;
                        while (i--) {
                            if (!matchers[i](elem, context, xml)) {
                                return false;
                            }
                        }
                        return true;
                    } :
                    matchers[0];
            }

            function multipleContexts(selector, contexts, results) {
                var i = 0,
                    len = contexts.length;
                for (; i < len; i++) {
                    Sizzle(selector, contexts[i], results);
                }
                return results;
            }

            function condense(unmatched, map, filter, context, xml) {
                var elem,
                    newUnmatched = [],
                    i = 0,
                    len = unmatched.length,
                    mapped = map != null;

                for (; i < len; i++) {
                    if ((elem = unmatched[i])) {
                        if (!filter || filter(elem, context, xml)) {
                            newUnmatched.push(elem);
                            if (mapped) {
                                map.push(i);
                            }
                        }
                    }
                }

                return newUnmatched;
            }

            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                if (postFilter && !postFilter[expando]) {
                    postFilter = setMatcher(postFilter);
                }
                if (postFinder && !postFinder[expando]) {
                    postFinder = setMatcher(postFinder, postSelector);
                }
                return markFunction(function(seed, results, context, xml) {
                    var temp, i, elem,
                        preMap = [],
                        postMap = [],
                        preexisting = results.length,

                        // Get initial elements from seed or context
                        elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

                        // Prefilter to get matcher input, preserving a map for seed-results synchronization
                        matcherIn = preFilter && (seed || !selector) ?
                        condense(elems, preMap, preFilter, context, xml) :
                        elems,

                        matcherOut = matcher ?
                        // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                        postFinder || (seed ? preFilter : preexisting || postFilter) ?

                        // ...intermediate processing is necessary
                        [] :

                        // ...otherwise use results directly
                        results :
                        matcherIn;

                    // Find primary matches
                    if (matcher) {
                        matcher(matcherIn, matcherOut, context, xml);
                    }

                    // Apply postFilter
                    if (postFilter) {
                        temp = condense(matcherOut, postMap);
                        postFilter(temp, [], context, xml);

                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while (i--) {
                            if ((elem = temp[i])) {
                                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                            }
                        }
                    }

                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {
                                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                temp = [];
                                i = matcherOut.length;
                                while (i--) {
                                    if ((elem = matcherOut[i])) {
                                        // Restore matcherIn since elem is not yet a final match
                                        temp.push((matcherIn[i] = elem));
                                    }
                                }
                                postFinder(null, (matcherOut = []), temp, xml);
                            }

                            // Move matched elements from seed to results to keep them synchronized
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i]) &&
                                    (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {

                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }

                        // Add elements to results, through postFinder if defined
                    } else {
                        matcherOut = condense(
                            matcherOut === results ?
                            matcherOut.splice(preexisting, matcherOut.length) :
                            matcherOut
                        );
                        if (postFinder) {
                            postFinder(null, results, matcherOut, xml);
                        } else {
                            push.apply(results, matcherOut);
                        }
                    }
                });
            }

            function matcherFromTokens(tokens) {
                var checkContext, matcher, j,
                    len = tokens.length,
                    leadingRelative = Expr.relative[tokens[0].type],
                    implicitRelative = leadingRelative || Expr.relative[" "],
                    i = leadingRelative ? 1 : 0,

                    // The foundational matcher ensures that elements are reachable from top-level context(s)
                    matchContext = addCombinator(function(elem) {
                        return elem === checkContext;
                    }, implicitRelative, true),
                    matchAnyContext = addCombinator(function(elem) {
                        return indexOf.call(checkContext, elem) > -1;
                    }, implicitRelative, true),
                    matchers = [function(elem, context, xml) {
                        return (!leadingRelative && (xml || context !== outermostContext)) || (
                            (checkContext = context).nodeType ?
                            matchContext(elem, context, xml) :
                            matchAnyContext(elem, context, xml));
                    }];

                for (; i < len; i++) {
                    if ((matcher = Expr.relative[tokens[i].type])) {
                        matchers = [addCombinator(elementMatcher(matchers), matcher)];
                    } else {
                        matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

                        // Return special upon seeing a positional matcher
                        if (matcher[expando]) {
                            // Find the next relative operator (if any) for proper handling
                            j = ++i;
                            for (; j < len; j++) {
                                if (Expr.relative[tokens[j].type]) {
                                    break;
                                }
                            }
                            return setMatcher(
                                i > 1 && elementMatcher(matchers),
                                i > 1 && toSelector(
                                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                    tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })
                                ).replace(rtrim, "$1"),
                                matcher,
                                i < j && matcherFromTokens(tokens.slice(i, j)),
                                j < len && matcherFromTokens((tokens = tokens.slice(j))),
                                j < len && toSelector(tokens)
                            );
                        }
                        matchers.push(matcher);
                    }
                }

                return elementMatcher(matchers);
            }

            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function(seed, context, xml, results, outermost) {
                        var elem, j, matcher,
                            matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            setMatched = [],
                            contextBackup = outermostContext,
                            // We must always have either seed elements or outermost context
                            elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                            // Use integer dirruns iff this is the outermost matcher
                            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                            len = elems.length;

                        if (outermost) {
                            outermostContext = context !== document && context;
                        }

                        // Add elements passing elementMatchers directly to results
                        // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
                        // Support: IE<9, Safari
                        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                        for (; i !== len && (elem = elems[i]) != null; i++) {
                            if (byElement && elem) {
                                j = 0;
                                while ((matcher = elementMatchers[j++])) {
                                    if (matcher(elem, context, xml)) {
                                        results.push(elem);
                                        break;
                                    }
                                }
                                if (outermost) {
                                    dirruns = dirrunsUnique;
                                }
                            }

                            // Track unmatched elements for set filters
                            if (bySet) {
                                // They will have gone through all possible matchers
                                if ((elem = !matcher && elem)) {
                                    matchedCount--;
                                }

                                // Lengthen the array for every element, matched or not
                                if (seed) {
                                    unmatched.push(elem);
                                }
                            }
                        }

                        // Apply set filters to unmatched elements
                        matchedCount += i;
                        if (bySet && i !== matchedCount) {
                            j = 0;
                            while ((matcher = setMatchers[j++])) {
                                matcher(unmatched, setMatched, context, xml);
                            }

                            if (seed) {
                                // Reintegrate element matches to eliminate the need for sorting
                                if (matchedCount > 0) {
                                    while (i--) {
                                        if (!(unmatched[i] || setMatched[i])) {
                                            setMatched[i] = pop.call(results);
                                        }
                                    }
                                }

                                // Discard index placeholder values to get only actual matches
                                setMatched = condense(setMatched);
                            }

                            // Add matches to results
                            push.apply(results, setMatched);

                            // Seedless set matches succeeding multiple successful matchers stipulate sorting
                            if (outermost && !seed && setMatched.length > 0 &&
                                (matchedCount + setMatchers.length) > 1) {

                                Sizzle.uniqueSort(results);
                            }
                        }

                        // Override manipulation of globals by nested matchers
                        if (outermost) {
                            dirruns = dirrunsUnique;
                            outermostContext = contextBackup;
                        }

                        return unmatched;
                    };

                return bySet ?
                    markFunction(superMatcher) :
                    superMatcher;
            }

            compile = Sizzle.compile = function(selector, match /* Internal Use Only */ ) {
                var i,
                    setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[selector + " "];

                if (!cached) {
                    // Generate a function of recursive functions that can be used to check each element
                    if (!match) {
                        match = tokenize(selector);
                    }
                    i = match.length;
                    while (i--) {
                        cached = matcherFromTokens(match[i]);
                        if (cached[expando]) {
                            setMatchers.push(cached);
                        } else {
                            elementMatchers.push(cached);
                        }
                    }

                    // Cache the compiled function
                    cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

                    // Save selector and tokenization
                    cached.selector = selector;
                }
                return cached;
            };

            /**
             * A low-level selection function that works with Sizzle's compiled
             *  selector functions
             * @param {String|Function} selector A selector or a pre-compiled
             *  selector function built with Sizzle.compile
             * @param {Element} context
             * @param {Array} [results]
             * @param {Array} [seed] A set of elements to match against
             */
            select = Sizzle.select = function(selector, context, results, seed) {
                var i, tokens, token, type, find,
                    compiled = typeof selector === "function" && selector,
                    match = !seed && tokenize((selector = compiled.selector || selector));

                results = results || [];

                // Try to minimize operations if there is no seed and only one group
                if (match.length === 1) {

                    // Take a shortcut and set the context if the root selector is an ID
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                        support.getById && context.nodeType === 9 && documentIsHTML &&
                        Expr.relative[tokens[1].type]) {

                        context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                        if (!context) {
                            return results;

                            // Precompiled matchers will still verify ancestry, so step up a level
                        } else if (compiled) {
                            context = context.parentNode;
                        }

                        selector = selector.slice(tokens.shift().value.length);
                    }

                    // Fetch a seed set for right-to-left matching
                    i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                    while (i--) {
                        token = tokens[i];

                        // Abort if we hit a combinator
                        if (Expr.relative[(type = token.type)]) {
                            break;
                        }
                        if ((find = Expr.find[type])) {
                            // Search, expanding context for leading sibling combinators
                            if ((seed = find(
                                    token.matches[0].replace(runescape, funescape),
                                    rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                                ))) {

                                // If seed is empty or no tokens remain, we can return early
                                tokens.splice(i, 1);
                                selector = seed.length && toSelector(tokens);
                                if (!selector) {
                                    push.apply(results, seed);
                                    return results;
                                }

                                break;
                            }
                        }
                    }
                }

                // Compile and execute a filtering function if one is not provided
                // Provide `match` to avoid retokenization if we modified the selector above
                (compiled || compile(selector, match))(
                    seed,
                    context, !documentIsHTML,
                    results,
                    rsibling.test(selector) && testContext(context.parentNode) || context
                );
                return results;
            };

            // One-time assignments

            // Sort stability
            support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

            // Support: Chrome<14
            // Always assume duplicates if they aren't passed to the comparison function
            support.detectDuplicates = !!hasDuplicate;

            // Initialize against the default document
            setDocument();

            // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
            // Detached nodes confoundingly follow *each other*
            support.sortDetached = assert(function(div1) {
                // Should return 1, but returns 4 (following)
                return div1.compareDocumentPosition(document.createElement("div")) & 1;
            });

            // Support: IE<8
            // Prevent attribute/property "interpolation"
            // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
            if (!assert(function(div) {
                    div.innerHTML = "<a href='#'></a>";
                    return div.firstChild.getAttribute("href") === "#";
                })) {
                addHandle("type|href|height|width", function(elem, name, isXML) {
                    if (!isXML) {
                        return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                    }
                });
            }

            // Support: IE<9
            // Use defaultValue in place of getAttribute("value")
            if (!support.attributes || !assert(function(div) {
                    div.innerHTML = "<input/>";
                    div.firstChild.setAttribute("value", "");
                    return div.firstChild.getAttribute("value") === "";
                })) {
                addHandle("value", function(elem, name, isXML) {
                    if (!isXML && elem.nodeName.toLowerCase() === "input") {
                        return elem.defaultValue;
                    }
                });
            }

            // Support: IE<9
            // Use getAttributeNode to fetch booleans when getAttribute lies
            if (!assert(function(div) {
                    return div.getAttribute("disabled") == null;
                })) {
                addHandle(booleans, function(elem, name, isXML) {
                    var val;
                    if (!isXML) {
                        return elem[name] === true ? name.toLowerCase() :
                            (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null;
                    }
                });
            }

            return Sizzle;

        })(window);



    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;



    var rneedsContext = jQuery.expr.match.needsContext;

    var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



    var risSimple = /^.[^:#\[\.,]*$/;

    // Implement the identical functionality for filter and not
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                /* jshint -W018 */
                return !!qualifier.call(elem, i, elem) !== not;
            });

        }

        if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem) {
                return (elem === qualifier) !== not;
            });

        }

        if (typeof qualifier === "string") {
            if (risSimple.test(qualifier)) {
                return jQuery.filter(qualifier, elements, not);
            }

            qualifier = jQuery.filter(qualifier, elements);
        }

        return jQuery.grep(elements, function(elem) {
            return (jQuery.inArray(elem, qualifier) >= 0) !== not;
        });
    }

    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];

        if (not) {
            expr = ":not(" + expr + ")";
        }

        return elems.length === 1 && elem.nodeType === 1 ?
            jQuery.find.matchesSelector(elem, expr) ? [elem] : [] :
            jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
                return elem.nodeType === 1;
            }));
    };

    jQuery.fn.extend({
        find: function(selector) {
            var i,
                ret = [],
                self = this,
                len = self.length;

            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }

            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }

            // Needed because $( selector, context ) becomes $( context ).find( selector )
            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        is: function(selector) {
            return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test(selector) ?
                jQuery(selector) :
                selector || [],
                false
            ).length;
        }
    });


    // Initialize a jQuery object


    // A central reference to the root jQuery(document)
    var rootjQuery,

        // Use the correct document accordingly with window argument (sandbox)
        document = window.document,

        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        // Strict HTML recognition (#11290: must start with <)
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

        init = jQuery.fn.init = function(selector, context) {
            var match, elem;

            // HANDLE: $(""), $(null), $(undefined), $(false)
            if (!selector) {
                return this;
            }

            // Handle HTML strings
            if (typeof selector === "string") {
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [null, selector, null];

                } else {
                    match = rquickExpr.exec(selector);
                }

                // Match html or make sure no context is specified for #id
                if (match && (match[1] || !context)) {

                    // HANDLE: $(html) -> $(array)
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;

                        // scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge(this, jQuery.parseHTML(
                            match[1],
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ));

                        // HANDLE: $(html, props)
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                // Properties of context are called as methods if possible
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match]);

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                    } else {
                        elem = document.getElementById(match[2]);

                        // Check parentNode to catch when Blackberry 4.6 returns
                        // nodes that are no longer in the document #6963
                        if (elem && elem.parentNode) {
                            // Handle the case where IE and Opera return items
                            // by name instead of ID
                            if (elem.id !== match[2]) {
                                return rootjQuery.find(selector);
                            }

                            // Otherwise, we inject the element directly into the jQuery object
                            this.length = 1;
                            this[0] = elem;
                        }

                        this.context = document;
                        this.selector = selector;
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if (!context || context.jquery) {
                    return (context || rootjQuery).find(selector);

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor(context).find(selector);
                }

                // HANDLE: $(DOMElement)
            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                // Shortcut for document ready
            } else if (jQuery.isFunction(selector)) {
                return typeof rootjQuery.ready !== "undefined" ?
                    rootjQuery.ready(selector) :
                    // Execute immediately if ready is not present
                    selector(jQuery);
            }

            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }

            return jQuery.makeArray(selector, this);
        };

    // Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

    // Initialize central reference
    rootjQuery = jQuery(document);


    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
        // methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };

    jQuery.extend({
        dir: function(elem, dir, until) {
            var matched = [],
                cur = elem[dir];

            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur);
                }
                cur = cur[dir];
            }
            return matched;
        },

        sibling: function(n, elem) {
            var r = [];

            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }

            return r;
        }
    });

    jQuery.fn.extend({
        has: function(target) {
            var i,
                targets = jQuery(target, this),
                len = targets.length;

            return this.filter(function() {
                for (i = 0; i < len; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },

        closest: function(selectors, context) {
            var cur,
                i = 0,
                l = this.length,
                matched = [],
                pos = rneedsContext.test(selectors) || typeof selectors !== "string" ?
                jQuery(selectors, context || this.context) :
                0;

            for (; i < l; i++) {
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                    // Always skip document fragments
                    if (cur.nodeType < 11 && (pos ?
                            pos.index(cur) > -1 :

                            // Don't pass non-elements to Sizzle
                            cur.nodeType === 1 &&
                            jQuery.find.matchesSelector(cur, selectors))) {

                        matched.push(cur);
                        break;
                    }
                }
            }

            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },

        // Determine the position of an element within
        // the matched set of elements
        index: function(elem) {

            // No argument, return index in parent
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
            }

            // index in selector
            if (typeof elem === "string") {
                return jQuery.inArray(this[0], jQuery(elem));
            }

            // Locate the position of the desired element
            return jQuery.inArray(
                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem, this);
        },

        add: function(selector, context) {
            return this.pushStack(
                jQuery.unique(
                    jQuery.merge(this.get(), jQuery(selector, context))
                )
            );
        },

        addBack: function(selector) {
            return this.add(selector == null ?
                this.prevObject : this.prevObject.filter(selector)
            );
        }
    });

    function sibling(cur, dir) {
        do {
            cur = cur[dir];
        } while (cur && cur.nodeType !== 1);

        return cur;
    }

    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ?
                elem.contentDocument || elem.contentWindow.document :
                jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);

            if (name.slice(-5) !== "Until") {
                selector = until;
            }

            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret);
            }

            if (this.length > 1) {
                // Remove duplicates
                if (!guaranteedUnique[name]) {
                    ret = jQuery.unique(ret);
                }

                // Reverse order for parents* and prev-derivatives
                if (rparentsprev.test(name)) {
                    ret = ret.reverse();
                }
            }

            return this.pushStack(ret);
        };
    });
    var rnotwhite = (/\S+/g);



    // String to Object options format cache
    var optionsCache = {};

    // Convert String-formatted options into Object-formatted ones and store in cache
    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = true;
        });
        return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function(options) {

        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
            (optionsCache[options] || createOptions(options)) :
            jQuery.extend({}, options);

        var // Flag to know if list is currently firing
            firing,
            // Last fire value (for non-forgettable lists)
            memory,
            // Flag to know if list was already fired
            fired,
            // End of the loop when firing
            firingLength,
            // Index of currently firing callback (modified by remove if needed)
            firingIndex,
            // First callback to fire (used internally by add and fireWith)
            firingStart,
            // Actual callback list
            list = [],
            // Stack of fire calls for repeatable lists
            stack = !options.once && [],
            // Fire callbacks
            fire = function(data) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for (; list && firingIndex < firingLength; firingIndex++) {
                    if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                        memory = false; // To prevent further calls using add
                        break;
                    }
                }
                firing = false;
                if (list) {
                    if (stack) {
                        if (stack.length) {
                            fire(stack.shift());
                        }
                    } else if (memory) {
                        list = [];
                    } else {
                        self.disable();
                    }
                }
            },
            // Actual Callbacks object
            self = {
                // Add a callback or a collection of callbacks to the list
                add: function() {
                    if (list) {
                        // First, we save the current length
                        var start = list.length;
                        (function add(args) {
                            jQuery.each(args, function(_, arg) {
                                var type = jQuery.type(arg);
                                if (type === "function") {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (arg && arg.length && type !== "string") {
                                    // Inspect recursively
                                    add(arg);
                                }
                            });
                        })(arguments);
                        // Do we need to add the callbacks to the
                        // current firing batch?
                        if (firing) {
                            firingLength = list.length;
                            // With memory, if we're not firing then
                            // we should call right away
                        } else if (memory) {
                            firingStart = start;
                            fire(memory);
                        }
                    }
                    return this;
                },
                // Remove a callback from the list
                remove: function() {
                    if (list) {
                        jQuery.each(arguments, function(_, arg) {
                            var index;
                            while ((index = jQuery.inArray(arg, list, index)) > -1) {
                                list.splice(index, 1);
                                // Handle firing indexes
                                if (firing) {
                                    if (index <= firingLength) {
                                        firingLength--;
                                    }
                                    if (index <= firingIndex) {
                                        firingIndex--;
                                    }
                                }
                            }
                        });
                    }
                    return this;
                },
                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function(fn) {
                    return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
                },
                // Remove all callbacks from the list
                empty: function() {
                    list = [];
                    firingLength = 0;
                    return this;
                },
                // Have the list do nothing anymore
                disable: function() {
                    list = stack = memory = undefined;
                    return this;
                },
                // Is it disabled?
                disabled: function() {
                    return !list;
                },
                // Lock the list in its current state
                lock: function() {
                    stack = undefined;
                    if (!memory) {
                        self.disable();
                    }
                    return this;
                },
                // Is it locked?
                locked: function() {
                    return !stack;
                },
                // Call all callbacks with the given context and arguments
                fireWith: function(context, args) {
                    if (list && (!fired || stack)) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        if (firing) {
                            stack.push(args);
                        } else {
                            fire(args);
                        }
                    }
                    return this;
                },
                // Call all the callbacks with the given arguments
                fire: function() {
                    self.fireWith(this, arguments);
                    return this;
                },
                // To know if the callbacks have already been called at least once
                fired: function() {
                    return !!fired;
                }
            };

        return self;
    };


    jQuery.extend({

        Deferred: function(func) {
            var tuples = [
                    // action, add listener, listener list, final state
                    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", jQuery.Callbacks("memory")]
                ],
                state = "pending",
                promise = {
                    state: function() {
                        return state;
                    },
                    always: function() {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    then: function( /* fnDone, fnFail, fnProgress */ ) {
                        var fns = arguments;
                        return jQuery.Deferred(function(newDefer) {
                            jQuery.each(tuples, function(i, tuple) {
                                var fn = jQuery.isFunction(fns[i]) && fns[i];
                                // deferred[ done | fail | progress ] for forwarding actions to newDefer
                                deferred[tuple[1]](function() {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise()
                                            .done(newDefer.resolve)
                                            .fail(newDefer.reject)
                                            .progress(newDefer.notify);
                                    } else {
                                        newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function(obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                },
                deferred = {};

            // Keep pipe for back-compat
            promise.pipe = promise.then;

            // Add list-specific methods
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2],
                    stateString = tuple[3];

                // promise[ done | fail | progress ] = list.add
                promise[tuple[1]] = list.add;

                // Handle state
                if (stateString) {
                    list.add(function() {
                        // state = [ resolved | rejected ]
                        state = stateString;

                        // [ reject_list | resolve_list ].disable; progress_list.lock
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                }

                // deferred[ resolve | reject | notify ]
                deferred[tuple[0]] = function() {
                    deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                    return this;
                };
                deferred[tuple[0] + "With"] = list.fireWith;
            });

            // Make the deferred a promise
            promise.promise(deferred);

            // Call given func if any
            if (func) {
                func.call(deferred, deferred);
            }

            // All done!
            return deferred;
        },

        // Deferred helper
        when: function(subordinate /* , ..., subordinateN */ ) {
            var i = 0,
                resolveValues = slice.call(arguments),
                length = resolveValues.length,

                // the count of uncompleted subordinates
                remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,

                // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
                deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

                // Update function for both resolve and progress values
                updateFunc = function(i, contexts, values) {
                    return function(value) {
                        contexts[i] = this;
                        values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (values === progressValues) {
                            deferred.notifyWith(contexts, values);

                        } else if (!(--remaining)) {
                            deferred.resolveWith(contexts, values);
                        }
                    };
                },

                progressValues, progressContexts, resolveContexts;

            // add listeners to Deferred subordinates; treat others as resolved
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise()
                            .done(updateFunc(i, resolveContexts, resolveValues))
                            .fail(deferred.reject)
                            .progress(updateFunc(i, progressContexts, progressValues));
                    } else {
                        --remaining;
                    }
                }
            }

            // if we're not waiting on anything, resolve the master
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }

            return deferred.promise();
        }
    });


    // The deferred used on DOM ready
    var readyList;

    jQuery.fn.ready = function(fn) {
        // Add the callback
        jQuery.ready.promise().done(fn);

        return this;
    };

    jQuery.extend({
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,

        // Hold (or release) the ready event
        holdReady: function(hold) {
            if (hold) {
                jQuery.readyWait++;
            } else {
                jQuery.ready(true);
            }
        },

        // Handle when the DOM is ready
        ready: function(wait) {

            // Abort if there are pending holds or we're already ready
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }

            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if (!document.body) {
                return setTimeout(jQuery.ready);
            }

            // Remember that the DOM is ready
            jQuery.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith(document, [jQuery]);

            // Trigger any bound ready events
            if (jQuery.fn.triggerHandler) {
                jQuery(document).triggerHandler("ready");
                jQuery(document).off("ready");
            }
        }
    });

    /**
     * Clean-up method for dom ready events
     */
    function detach() {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed, false);
            window.removeEventListener("load", completed, false);

        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    }

    /**
     * The ready event handler and self cleanup method
     */
    function completed() {
        // readyState === "complete" is good enough for us to call the dom ready in oldIE
        if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
            detach();
            jQuery.ready();
        }
    }

    jQuery.ready.promise = function(obj) {
        if (!readyList) {

            readyList = jQuery.Deferred();

            // Catch cases where $(document).ready() is called after the browser event has already occurred.
            // we once tried to use readyState "interactive" here, but it caused issues like the one
            // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
            if (document.readyState === "complete") {
                // Handle it asynchronously to allow scripts the opportunity to delay ready
                setTimeout(jQuery.ready);

                // Standards-based browsers support DOMContentLoaded
            } else if (document.addEventListener) {
                // Use the handy event callback
                document.addEventListener("DOMContentLoaded", completed, false);

                // A fallback to window.onload, that will always work
                window.addEventListener("load", completed, false);

                // If IE event model is used
            } else {
                // Ensure firing before onload, maybe late but safe also for iframes
                document.attachEvent("onreadystatechange", completed);

                // A fallback to window.onload, that will always work
                window.attachEvent("onload", completed);

                // If IE and not a frame
                // continually check to see if the document is ready
                var top = false;

                try {
                    top = window.frameElement == null && document.documentElement;
                } catch (e) {}

                if (top && top.doScroll) {
                    (function doScrollCheck() {
                        if (!jQuery.isReady) {

                            try {
                                // Use the trick by Diego Perini
                                // http://javascript.nwbox.com/IEContentLoaded/
                                top.doScroll("left");
                            } catch (e) {
                                return setTimeout(doScrollCheck, 50);
                            }

                            // detach all dom ready events
                            detach();

                            // and execute any waiting functions
                            jQuery.ready();
                        }
                    })();
                }
            }
        }
        return readyList.promise(obj);
    };


    var strundefined = typeof undefined;



    // Support: IE<9
    // Iteration over object's inherited properties before its own
    var i;
    for (i in jQuery(support)) {
        break;
    }
    support.ownLast = i !== "0";

    // Note: most support tests are defined in their respective modules.
    // false until the test is run
    support.inlineBlockNeedsLayout = false;

    // Execute ASAP in case we need to set body.style.zoom
    jQuery(function() {
        // Minified: var a,b,c,d
        var val, div, body, container;

        body = document.getElementsByTagName("body")[0];
        if (!body || !body.style) {
            // Return for frameset docs that don't have a body
            return;
        }

        // Setup
        div = document.createElement("div");
        container = document.createElement("div");
        container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
        body.appendChild(container).appendChild(div);

        if (typeof div.style.zoom !== strundefined) {
            // Support: IE<8
            // Check if natively block-level elements act like inline-block
            // elements when setting their display to 'inline' and giving
            // them layout
            div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

            support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
            if (val) {
                // Prevent IE 6 from affecting layout for positioned elements #11048
                // Prevent IE from shrinking the body in IE 7 mode #12869
                // Support: IE<8
                body.style.zoom = 1;
            }
        }

        body.removeChild(container);
    });




    (function() {
        var div = document.createElement("div");

        // Execute the test only if not already executed in another module.
        if (support.deleteExpando == null) {
            // Support: IE<9
            support.deleteExpando = true;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = false;
            }
        }

        // Null elements to avoid leaks in IE.
        div = null;
    })();


    /**
     * Determines whether an object can have data
     */
    jQuery.acceptData = function(elem) {
        var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()],
            nodeType = +elem.nodeType || 1;

        // Do not set data on non-element DOM nodes because it will not be cleared (#8335).
        return nodeType !== 1 && nodeType !== 9 ?
            false :

            // Nodes accept data unless otherwise specified; rejection can be conditional
            !noData || noData !== true && elem.getAttribute("classid") === noData;
    };


    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /([A-Z])/g;

    function dataAttr(elem, key, data) {
        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if (data === undefined && elem.nodeType === 1) {

            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();

            data = elem.getAttribute(name);

            if (typeof data === "string") {
                try {
                    data = data === "true" ? true :
                        data === "false" ? false :
                        data === "null" ? null :
                        // Only convert to a number if it doesn't change the string
                        +data + "" === data ? +data :
                        rbrace.test(data) ? jQuery.parseJSON(data) :
                        data;
                } catch (e) {}

                // Make sure we set the data so it isn't changed later
                jQuery.data(elem, key, data);

            } else {
                data = undefined;
            }
        }

        return data;
    }

    // checks a cache object for emptiness
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {

            // if the public data object is empty, the private is still empty
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue;
            }
            if (name !== "toJSON") {
                return false;
            }
        }

        return true;
    }

    function internalData(elem, name, data, pvt /* Internal Use Only */ ) {
        if (!jQuery.acceptData(elem)) {
            return;
        }

        var ret, thisCache,
            internalKey = jQuery.expando,

            // We have to handle DOM nodes and JS objects differently because IE6-7
            // can't GC object references properly across the DOM-JS boundary
            isNode = elem.nodeType,

            // Only DOM nodes need the global jQuery cache; JS object data is
            // attached directly to the object so GC can occur automatically
            cache = isNode ? jQuery.cache : elem,

            // Only defining an ID for JS objects if its cache already exists allows
            // the code to shortcut on the same path as a DOM node with no cache
            id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;

        // Avoid doing any more work than we need to when trying to get data on an
        // object that has no data at all
        if ((!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string") {
            return;
        }

        if (!id) {
            // Only DOM nodes need a new unique ID for each element since their data
            // ends up in the global cache
            if (isNode) {
                id = elem[internalKey] = deletedIds.pop() || jQuery.guid++;
            } else {
                id = internalKey;
            }
        }

        if (!cache[id]) {
            // Avoid exposing jQuery metadata on plain JS objects when the object
            // is serialized using JSON.stringify
            cache[id] = isNode ? {} : { toJSON: jQuery.noop };
        }

        // An object can be passed to jQuery.data instead of a key/value pair; this gets
        // shallow copied over onto the existing cache
        if (typeof name === "object" || typeof name === "function") {
            if (pvt) {
                cache[id] = jQuery.extend(cache[id], name);
            } else {
                cache[id].data = jQuery.extend(cache[id].data, name);
            }
        }

        thisCache = cache[id];

        // jQuery data() is stored in a separate object inside the object's internal data
        // cache in order to avoid key collisions between internal data and user-defined
        // data.
        if (!pvt) {
            if (!thisCache.data) {
                thisCache.data = {};
            }

            thisCache = thisCache.data;
        }

        if (data !== undefined) {
            thisCache[jQuery.camelCase(name)] = data;
        }

        // Check for both converted-to-camel and non-converted data property names
        // If a data property was specified
        if (typeof name === "string") {

            // First Try to find as-is property data
            ret = thisCache[name];

            // Test for null|undefined property data
            if (ret == null) {

                // Try to find the camelCased property
                ret = thisCache[jQuery.camelCase(name)];
            }
        } else {
            ret = thisCache;
        }

        return ret;
    }

    function internalRemoveData(elem, name, pvt) {
        if (!jQuery.acceptData(elem)) {
            return;
        }

        var thisCache, i,
            isNode = elem.nodeType,

            // See jQuery.data for more information
            cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[jQuery.expando] : jQuery.expando;

        // If there is already no cache entry for this object, there is no
        // purpose in continuing
        if (!cache[id]) {
            return;
        }

        if (name) {

            thisCache = pvt ? cache[id] : cache[id].data;

            if (thisCache) {

                // Support array or space separated string names for data keys
                if (!jQuery.isArray(name)) {

                    // try the string as a key before any manipulation
                    if (name in thisCache) {
                        name = [name];
                    } else {

                        // split the camel cased version by spaces unless a key with the spaces exists
                        name = jQuery.camelCase(name);
                        if (name in thisCache) {
                            name = [name];
                        } else {
                            name = name.split(" ");
                        }
                    }
                } else {
                    // If "name" is an array of keys...
                    // When data is initially created, via ("key", "val") signature,
                    // keys will be converted to camelCase.
                    // Since there is no way to tell _how_ a key was added, remove
                    // both plain key and camelCase key. #12786
                    // This will only penalize the array argument path.
                    name = name.concat(jQuery.map(name, jQuery.camelCase));
                }

                i = name.length;
                while (i--) {
                    delete thisCache[name[i]];
                }

                // If there is no data left in the cache, we want to continue
                // and let the cache object itself get destroyed
                if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
                    return;
                }
            }
        }

        // See jQuery.data for more information
        if (!pvt) {
            delete cache[id].data;

            // Don't destroy the parent cache unless the internal data object
            // had been the only thing left in it
            if (!isEmptyDataObject(cache[id])) {
                return;
            }
        }

        // Destroy the cache
        if (isNode) {
            jQuery.cleanData([elem], true);

            // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
            /* jshint eqeqeq: false */
        } else if (support.deleteExpando || cache != cache.window) {
            /* jshint eqeqeq: true */
            delete cache[id];

            // When all else fails, null
        } else {
            cache[id] = null;
        }
    }

    jQuery.extend({
        cache: {},

        // The following elements (space-suffixed to avoid Object.prototype collisions)
        // throw uncatchable exceptions if you attempt to set expando properties
        noData: {
            "applet ": true,
            "embed ": true,
            // ...but Flash objects (which have this classid) *can* handle expandos
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },

        hasData: function(elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem);
        },

        data: function(elem, name, data) {
            return internalData(elem, name, data);
        },

        removeData: function(elem, name) {
            return internalRemoveData(elem, name);
        },

        // For internal use only.
        _data: function(elem, name, data) {
            return internalData(elem, name, data, true);
        },

        _removeData: function(elem, name) {
            return internalRemoveData(elem, name, true);
        }
    });

    jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data,
                elem = this[0],
                attrs = elem && elem.attributes;

            // Special expections of .data basically thwart jQuery.access,
            // so implement the relevant behavior ourselves

            // Gets all values
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);

                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        i = attrs.length;
                        while (i--) {

                            // Support: IE11+
                            // The attrs elements can be null (#14894)
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = jQuery.camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true);
                    }
                }

                return data;
            }

            // Sets multiple values
            if (typeof key === "object") {
                return this.each(function() {
                    jQuery.data(this, key);
                });
            }

            return arguments.length > 1 ?

                // Sets one value
                this.each(function() {
                    jQuery.data(this, key, value);
                }) :

                // Gets one value
                // Try to fetch any internally stored data first
                elem ? dataAttr(elem, key, jQuery.data(elem, key)) : undefined;
        },

        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }
    });


    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;

            if (elem) {
                type = (type || "fx") + "queue";
                queue = jQuery._data(elem, type);

                // Speed up dequeue by getting out quickly if this is just a lookup
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = jQuery._data(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },

        dequeue: function(elem, type) {
            type = type || "fx";

            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function() {
                    jQuery.dequeue(elem, type);
                };

            // If the fx queue is dequeued, always remove the progress sentinel
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }

            if (fn) {

                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if (type === "fx") {
                    queue.unshift("inprogress");
                }

                // clear up the last queue stop function
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }

            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },

        // not intended for public consumption - generates a queueHooks object, or returns the current one
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData(elem, type + "queue");
                    jQuery._removeData(elem, key);
                })
            });
        }
    });

    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;

            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }

            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }

            return data === undefined ?
                this :
                this.each(function() {
                    var queue = jQuery.queue(this, type, data);

                    // ensure a hooks for this queue
                    jQuery._queueHooks(this, type);

                    if (type === "fx" && queue[0] !== "inprogress") {
                        jQuery.dequeue(this, type);
                    }
                });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function(type, obj) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if (!(--count)) {
                        defer.resolveWith(elements, [elements]);
                    }
                };

            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while (i--) {
                tmp = jQuery._data(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

    var cssExpand = ["Top", "Right", "Bottom", "Left"];

    var isHidden = function(elem, el) {
        // isHidden might be called from jQuery#filter function;
        // in that case, element will be second argument
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
    };



    // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0,
            length = elems.length,
            bulk = key == null;

        // Sets many values
        if (jQuery.type(key) === "object") {
            chainable = true;
            for (i in key) {
                jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
            }

            // Sets one value
        } else if (value !== undefined) {
            chainable = true;

            if (!jQuery.isFunction(value)) {
                raw = true;
            }

            if (bulk) {
                // Bulk operations run against the entire set
                if (raw) {
                    fn.call(elems, value);
                    fn = null;

                    // ...except when executing function values
                } else {
                    bulk = fn;
                    fn = function(elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }

            if (fn) {
                for (; i < length; i++) {
                    fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                }
            }
        }

        return chainable ?
            elems :

            // Gets
            bulk ?
            fn.call(elems) :
            length ? fn(elems[0], key) : emptyGet;
    };
    var rcheckableType = (/^(?:checkbox|radio)$/i);



    (function() {
        // Minified: var a,b,c
        var input = document.createElement("input"),
            div = document.createElement("div"),
            fragment = document.createDocumentFragment();

        // Setup
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

        // IE strips leading whitespace when .innerHTML is used
        support.leadingWhitespace = div.firstChild.nodeType === 3;

        // Make sure that tbody elements aren't automatically inserted
        // IE will insert them into empty tables
        support.tbody = !div.getElementsByTagName("tbody").length;

        // Make sure that link elements get serialized correctly by innerHTML
        // This requires a wrapper element in IE
        support.htmlSerialize = !!div.getElementsByTagName("link").length;

        // Makes sure cloning an html5 element does not cause problems
        // Where outerHTML is undefined, this still works
        support.html5Clone =
            document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";

        // Check if a disconnected checkbox will retain its checked
        // value of true after appended to the DOM (IE6/7)
        input.type = "checkbox";
        input.checked = true;
        fragment.appendChild(input);
        support.appendChecked = input.checked;

        // Make sure textarea (and checkbox) defaultValue is properly cloned
        // Support: IE6-IE11+
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;

        // #11217 - WebKit loses check when the name is after the checked attribute
        fragment.appendChild(div);
        div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

        // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
        // old WebKit doesn't clone checked state correctly in fragments
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

        // Support: IE<9
        // Opera does not clone events (and typeof div.attachEvent === undefined).
        // IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
        support.noCloneEvent = true;
        if (div.attachEvent) {
            div.attachEvent("onclick", function() {
                support.noCloneEvent = false;
            });

            div.cloneNode(true).click();
        }

        // Execute the test only if not already executed in another module.
        if (support.deleteExpando == null) {
            // Support: IE<9
            support.deleteExpando = true;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = false;
            }
        }
    })();


    (function() {
        var i, eventName,
            div = document.createElement("div");

        // Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
        for (i in { submit: true, change: true, focusin: true }) {
            eventName = "on" + i;

            if (!(support[i + "Bubbles"] = eventName in window)) {
                // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
                div.setAttribute(eventName, "t");
                support[i + "Bubbles"] = div.attributes[eventName].expando === false;
            }
        }

        // Null elements to avoid leaks in IE.
        div = null;
    })();


    var rformElems = /^(?:input|select|textarea)$/i,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }

    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {

        global: {},

        add: function(elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn,
                special, eventHandle, handleObj,
                handlers, type, namespaces, origType,
                elemData = jQuery._data(elem);

            // Don't attach events to noData or text/comment nodes (but allow plain objects)
            if (!elemData) {
                return;
            }

            // Caller can pass in an object of custom data in lieu of the handler
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }

            // Make sure that the handler has a unique ID, used to find/remove it later
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }

            // Init the element's event structure and main handler, if this is the first
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function(e) {
                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
                        jQuery.event.dispatch.apply(eventHandle.elem, arguments) :
                        undefined;
                };
                // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
                eventHandle.elem = elem;
            }

            // Handle multiple events separated by a space
            types = (types || "").match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();

                // There *must* be a type, no attaching namespace-only handlers
                if (!type) {
                    continue;
                }

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[type] || {};

                // If selector defined, determine special event api type, otherwise given type
                type = (selector ? special.delegateType : special.bindType) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[type] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);

                // Init the event handler queue if we're the first
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;

                    // Only use addEventListener/attachEvent if the special events handler returns false
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        // Bind the global event handler to the element
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);

                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle);
                        }
                    }
                }

                if (special.add) {
                    special.add.call(elem, handleObj);

                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }

                // Add to the element's handler list, delegates in front
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[type] = true;
            }

            // Nullify elem to prevent memory leaks in IE
            elem = null;
        },

        // Detach an event or set of events from an element
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp,
                origCount, t, events,
                special, handlers, type,
                namespaces, origType,
                elemData = jQuery.hasData(elem) && jQuery._data(elem);

            if (!elemData || !(events = elemData.events)) {
                return;
            }

            // Once for each type.namespace in types; type may be omitted
            types = (types || "").match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();

                // Unbind all events (on this namespace, if provided) for the element
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }

                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

                // Remove matching events
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];

                    if ((mappedTypes || origType === handleObj.origType) &&
                        (!handler || handler.guid === handleObj.guid) &&
                        (!tmp || tmp.test(handleObj.namespace)) &&
                        (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);

                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if (origCount && !handlers.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }

                    delete events[type];
                }
            }

            // Remove the expando if it's no longer used
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;

                // removeData also checks for emptiness and clears the expando if empty
                // so use it instead of delete
                jQuery._removeData(elem, "events");
            }
        },

        trigger: function(event, data, elem, onlyHandlers) {
            var handle, ontype, cur,
                bubbleType, special, tmp, i,
                eventPath = [elem || document],
                type = hasOwn.call(event, "type") ? event.type : event,
                namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

            cur = tmp = elem = elem || document;

            // Don't do events on text and comment nodes
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }

            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }

            if (type.indexOf(".") >= 0) {
                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;

            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event = event[jQuery.expando] ?
                event :
                new jQuery.Event(type, typeof event === "object" && event);

            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ?
                new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
                null;

            // Clean up the event in case it is being reused
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }

            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data == null ? [event] :
                jQuery.makeArray(data, [event]);

            // Allow special events to draw outside the lines
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }

            // Determine event propagation path in advance, per W3C events spec (#9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }

            // Fire handlers on the event path
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

                event.type = i > 1 ?
                    bubbleType :
                    special.bindType || type;

                // jQuery handler
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }

                // Native handler
                handle = ontype && cur[ontype];
                if (handle && handle.apply && jQuery.acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;

            // If nobody prevented the default action, do it now
            if (!onlyHandlers && !event.isDefaultPrevented()) {

                if ((!special._default || special._default.apply(eventPath.pop(), data) === false) &&
                    jQuery.acceptData(elem)) {

                    // Call a native DOM method on the target with the same name name as the event.
                    // Can't use an .isFunction() check here because IE6/7 fails that test.
                    // Don't do default actions on window, that's where global variables be (#6170)
                    if (ontype && elem[type] && !jQuery.isWindow(elem)) {

                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp = elem[ontype];

                        if (tmp) {
                            elem[ontype] = null;
                        }

                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;
                        try {
                            elem[type]();
                        } catch (e) {
                            // IE<9 dies on focus/blur to hidden element (#1486,#12518)
                            // only reproducible on winXP IE8 native, not IE9 in IE8 mode
                        }
                        jQuery.event.triggered = undefined;

                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }

            return event.result;
        },

        dispatch: function(event) {

            // Make a writable jQuery.Event from the native event object
            event = jQuery.event.fix(event);

            var i, ret, handleObj, matched, j,
                handlerQueue = [],
                args = slice.call(arguments),
                handlers = (jQuery._data(this, "events") || {})[event.type] || [],
                special = jQuery.event.special[event.type] || {};

            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[0] = event;
            event.delegateTarget = this;

            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }

            // Determine handlers
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);

            // Run delegates first; they may want to stop propagation beneath us
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;

                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

                    // Triggered event must either 1) have no namespace, or
                    // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
                    if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {

                        event.handleObj = handleObj;
                        event.data = handleObj.data;

                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler)
                            .apply(matched.elem, args);

                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }

            // Call the postDispatch hook for the mapped type
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }

            return event.result;
        },

        handlers: function(event, handlers) {
            var sel, handleObj, matches, i,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;

            // Find delegate handlers
            // Black-hole SVG <use> instance trees (#13180)
            // Avoid non-left-click bubbling in Firefox (#3861)
            if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {

                /* jshint eqeqeq: false */
                for (; cur != this; cur = cur.parentNode || this) {
                    /* jshint eqeqeq: true */

                    // Don't check non-elements (#13208)
                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                    if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];

                            // Don't conflict with Object.prototype properties (#13203)
                            sel = handleObj.selector + " ";

                            if (matches[sel] === undefined) {
                                matches[sel] = handleObj.needsContext ?
                                    jQuery(sel, this).index(cur) >= 0 :
                                    jQuery.find(sel, this, null, [cur]).length;
                            }
                            if (matches[sel]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({ elem: cur, handlers: matches });
                        }
                    }
                }
            }

            // Add the remaining (directly-bound) handlers
            if (delegateCount < handlers.length) {
                handlerQueue.push({ elem: this, handlers: handlers.slice(delegateCount) });
            }

            return handlerQueue;
        },

        fix: function(event) {
            if (event[jQuery.expando]) {
                return event;
            }

            // Create a writable copy of the event object and normalize some properties
            var i, prop, copy,
                type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[type];

            if (!fixHook) {
                this.fixHooks[type] = fixHook =
                    rmouseEvent.test(type) ? this.mouseHooks :
                    rkeyEvent.test(type) ? this.keyHooks : {};
            }
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

            event = new jQuery.Event(originalEvent);

            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop];
            }

            // Support: IE<9
            // Fix target property (#1925)
            if (!event.target) {
                event.target = originalEvent.srcElement || document;
            }

            // Support: Chrome 23+, Safari?
            // Target should not be a text node (#504, #13143)
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }

            // Support: IE<9
            // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
            event.metaKey = !!event.metaKey;

            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },

        // Includes some event props shared by KeyEvent and MouseEvent
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

        fixHooks: {},

        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {

                // Add which for key events
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }

                return event;
            }
        },

        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var body, eventDoc, doc,
                    button = original.button,
                    fromElement = original.fromElement;

                // Calculate pageX/Y if missing and clientX/Y available
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;

                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                }

                // Add relatedTarget, if necessary
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                }

                // Add which for click: 1 === left; 2 === middle; 3 === right
                // Note: button is not normalized, so don't use it
                if (!event.which && button !== undefined) {
                    event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
                }

                return event;
            }
        },

        special: {
            load: {
                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            focus: {
                // Fire native event if possible so blur/focus sequence is correct
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) {
                        try {
                            this.focus();
                            return false;
                        } catch (e) {
                            // Support: IE<9
                            // If we error on focus to hidden element (#1486, #12518),
                            // let .trigger() run the handlers
                        }
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                // For checkbox, fire native event so checked state will be right
                trigger: function() {
                    if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                        this.click();
                        return false;
                    }
                },

                // For cross-browser consistency, don't fire native .click() on links
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },

            beforeunload: {
                postDispatch: function(event) {

                    // Support: Firefox 20+
                    // Firefox doesn't alert if the returnValue field is not set.
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        },

        simulate: function(type, elem, event, bubble) {
            // Piggyback on a donor event to simulate a different one.
            // Fake originalEvent to avoid donor's stopPropagation, but if the
            // simulated event prevents default then we do the same on the donor.
            var e = jQuery.extend(
                new jQuery.Event(),
                event, {
                    type: type,
                    isSimulated: true,
                    originalEvent: {}
                }
            );
            if (bubble) {
                jQuery.event.trigger(e, null, elem);
            } else {
                jQuery.event.dispatch.call(elem, e);
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        }
    };

    jQuery.removeEvent = document.removeEventListener ?
        function(elem, type, handle) {
            if (elem.removeEventListener) {
                elem.removeEventListener(type, handle, false);
            }
        } :
        function(elem, type, handle) {
            var name = "on" + type;

            if (elem.detachEvent) {

                // #8545, #7054, preventing memory leaks for custom events in IE6-8
                // detachEvent needed property on element, by name of that event, to properly expose it to GC
                if (typeof elem[name] === strundefined) {
                    elem[name] = null;
                }

                elem.detachEvent(name, handle);
            }
        };

    jQuery.Event = function(src, props) {
        // Allow instantiation without the 'new' keyword
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }

        // Event object
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented ||
                src.defaultPrevented === undefined &&
                // Support: IE < 9, Android < 4.0
                src.returnValue === false ?
                returnTrue :
                returnFalse;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if (props) {
            jQuery.extend(this, props);
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || jQuery.now();

        // Mark it as fixed
        this[jQuery.expando] = true;
    };

    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,

        preventDefault: function() {
            var e = this.originalEvent;

            this.isDefaultPrevented = returnTrue;
            if (!e) {
                return;
            }

            // If preventDefault exists, run it on the original event
            if (e.preventDefault) {
                e.preventDefault();

                // Support: IE
                // Otherwise set the returnValue property of the original event to false
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;

            this.isPropagationStopped = returnTrue;
            if (!e) {
                return;
            }
            // If stopPropagation exists, run it on the original event
            if (e.stopPropagation) {
                e.stopPropagation();
            }

            // Support: IE
            // Set the cancelBubble property of the original event to true
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;

            this.isImmediatePropagationStopped = returnTrue;

            if (e && e.stopImmediatePropagation) {
                e.stopImmediatePropagation();
            }

            this.stopPropagation();
        }
    };

    // Create mouseenter/leave events using mouseover/out and event-time checks
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,

            handle: function(event) {
                var ret,
                    target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;

                // For mousenter/leave call the handler if related is outside the target.
                // NB: No relatedTarget if the mouse left/entered the browser window
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });

    // IE submit delegation
    if (!support.submitBubbles) {

        jQuery.event.special.submit = {
            setup: function() {
                // Only need this for delegated form submit events
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }

                // Lazy-add a submit handler when a descendant form may potentially be submitted
                jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                    // Node name check avoids a VML-related crash in IE (#9807)
                    var elem = e.target,
                        form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                    if (form && !jQuery._data(form, "submitBubbles")) {
                        jQuery.event.add(form, "submit._submit", function(event) {
                            event._submit_bubble = true;
                        });
                        jQuery._data(form, "submitBubbles", true);
                    }
                });
                // return undefined since we don't need an event listener
            },

            postDispatch: function(event) {
                // If form was submitted by the user, bubble the event up the tree
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event, true);
                    }
                }
            },

            teardown: function() {
                // Only need this for delegated form submit events
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }

                // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
                jQuery.event.remove(this, "._submit");
            }
        };
    }

    // IE change delegation and checkbox/radio fix
    if (!support.changeBubbles) {

        jQuery.event.special.change = {

            setup: function() {

                if (rformElems.test(this.nodeName)) {
                    // IE doesn't fire change on a check/radio until blur; trigger it on click
                    // after a propertychange. Eat the blur-change in special.change.handle.
                    // This still fires onchange a second time for check/radio after blur.
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change", function(event) {
                            if (event.originalEvent.propertyName === "checked") {
                                this._just_changed = true;
                            }
                        });
                        jQuery.event.add(this, "click._change", function(event) {
                            if (this._just_changed && !event.isTrigger) {
                                this._just_changed = false;
                            }
                            // Allow triggered, simulated change events (#11500)
                            jQuery.event.simulate("change", this, event, true);
                        });
                    }
                    return false;
                }
                // Delegated event; lazy-add a change handler on descendant inputs
                jQuery.event.add(this, "beforeactivate._change", function(e) {
                    var elem = e.target;

                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
                        jQuery.event.add(elem, "change._change", function(event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate("change", this.parentNode, event, true);
                            }
                        });
                        jQuery._data(elem, "changeBubbles", true);
                    }
                });
            },

            handle: function(event) {
                var elem = event.target;

                // Swallow native change events from checkbox/radio, we already triggered them above
                if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
                    return event.handleObj.handler.apply(this, arguments);
                }
            },

            teardown: function() {
                jQuery.event.remove(this, "._change");

                return !rformElems.test(this.nodeName);
            }
        };
    }

    // Create "bubbling" focus and blur events
    if (!support.focusinBubbles) {
        jQuery.each({ focus: "focusin", blur: "focusout" }, function(orig, fix) {

            // Attach a single capturing handler on the document while someone wants focusin/focusout
            var handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
            };

            jQuery.event.special[fix] = {
                setup: function() {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data(doc, fix);

                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    jQuery._data(doc, fix, (attaches || 0) + 1);
                },
                teardown: function() {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data(doc, fix) - 1;

                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        jQuery._removeData(doc, fix);
                    } else {
                        jQuery._data(doc, fix, attaches);
                    }
                }
            };
        });
    }

    jQuery.fn.extend({

        on: function(types, selector, data, fn, /*INTERNAL*/ one) {
            var type, origFn;

            // Types can be a map of types/handlers
            if (typeof types === "object") {
                // ( types-Object, selector, data )
                if (typeof selector !== "string") {
                    // ( types-Object, data )
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one);
                }
                return this;
            }

            if (data == null && fn == null) {
                // ( types, fn )
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    // ( types, selector, fn )
                    fn = data;
                    data = undefined;
                } else {
                    // ( types, data, fn )
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            } else if (!fn) {
                return this;
            }

            if (one === 1) {
                origFn = fn;
                fn = function(event) {
                    // Can use an empty set, since event contains the info
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                // Use same guid so caller can remove using origFn
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(
                    handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                    handleObj.selector,
                    handleObj.handler
                );
                return this;
            }
            if (typeof types === "object") {
                // ( types-object [, selector] )
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },

        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });


    function createSafeFragment(document) {
        var list = nodeNames.split("|"),
            safeFrag = document.createDocumentFragment();

        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(
                    list.pop()
                );
            }
        }
        return safeFrag;
    }

    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
        "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

        // We have to close these tags to support XHTML (#13200)
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

            // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
            // unless wrapped in a div with non-breaking characters in front of it.
            _default: support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        safeFragment = createSafeFragment(document),
        fragmentDiv = safeFragment.appendChild(document.createElement("div"));

    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;

    function getAll(context, tag) {
        var elems, elem,
            i = 0,
            found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag || "*") :
            typeof context.querySelectorAll !== strundefined ? context.querySelectorAll(tag || "*") :
            undefined;

        if (!found) {
            for (found = [], elems = context.childNodes || context;
                (elem = elems[i]) != null; i++) {
                if (!tag || jQuery.nodeName(elem, tag)) {
                    found.push(elem);
                } else {
                    jQuery.merge(found, getAll(elem, tag));
                }
            }
        }

        return tag === undefined || tag && jQuery.nodeName(context, tag) ?
            jQuery.merge([context], found) :
            found;
    }

    // Used in buildFragment, fixes the defaultChecked property
    function fixDefaultChecked(elem) {
        if (rcheckableType.test(elem.type)) {
            elem.defaultChecked = elem.checked;
        }
    }

    // Support: IE<8
    // Manipulating tables requires a tbody
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") &&
            jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ?

            elem.getElementsByTagName("tbody")[0] ||
            elem.appendChild(elem.ownerDocument.createElement("tbody")) :
            elem;
    }

    // Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript(elem) {
        elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
        return elem;
    }

    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) {
            elem.type = match[1];
        } else {
            elem.removeAttribute("type");
        }
        return elem;
    }

    // Mark scripts as having already been evaluated
    function setGlobalEval(elems, refElements) {
        var elem,
            i = 0;
        for (;
            (elem = elems[i]) != null; i++) {
            jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
        }
    }

    function cloneCopyEvent(src, dest) {

        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return;
        }

        var type, i, l,
            oldData = jQuery._data(src),
            curData = jQuery._data(dest, oldData),
            events = oldData.events;

        if (events) {
            delete curData.handle;
            curData.events = {};

            for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i]);
                }
            }
        }

        // make the cloned public data object a copy from the original
        if (curData.data) {
            curData.data = jQuery.extend({}, curData.data);
        }
    }

    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;

        // We do not need to do anything for non-Elements
        if (dest.nodeType !== 1) {
            return;
        }

        nodeName = dest.nodeName.toLowerCase();

        // IE6-8 copies events bound via attachEvent when using cloneNode.
        if (!support.noCloneEvent && dest[jQuery.expando]) {
            data = jQuery._data(dest);

            for (e in data.events) {
                jQuery.removeEvent(dest, e, data.handle);
            }

            // Event data gets referenced instead of copied if the expando gets copied too
            dest.removeAttribute(jQuery.expando);
        }

        // IE blanks contents when cloning scripts, and tries to evaluate newly-set text
        if (nodeName === "script" && dest.text !== src.text) {
            disableScript(dest).text = src.text;
            restoreScript(dest);

            // IE6-10 improperly clones children of object elements using classid.
            // IE10 throws NoModificationAllowedError if parent is null, #12132.
        } else if (nodeName === "object") {
            if (dest.parentNode) {
                dest.outerHTML = src.outerHTML;
            }

            // This path appears unavoidable for IE9. When cloning an object
            // element in IE9, the outerHTML strategy above is not sufficient.
            // If the src has innerHTML and the destination does not,
            // copy the src.innerHTML into the dest.innerHTML. #10324
            if (support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
                dest.innerHTML = src.innerHTML;
            }

        } else if (nodeName === "input" && rcheckableType.test(src.type)) {
            // IE6-8 fails to persist the checked state of a cloned checkbox
            // or radio button. Worse, IE6-7 fail to give the cloned element
            // a checked appearance if the defaultChecked value isn't also set

            dest.defaultChecked = dest.checked = src.checked;

            // IE6-7 get confused and end up setting the value of a cloned
            // checkbox/radio button to an empty string instead of "on"
            if (dest.value !== src.value) {
                dest.value = src.value;
            }

            // IE6-8 fails to return the selected option to the default selected
            // state when cloning options
        } else if (nodeName === "option") {
            dest.defaultSelected = dest.selected = src.defaultSelected;

            // IE6-8 fails to set the defaultValue to the correct value when
            // cloning other types of input fields
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
    }

    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements,
                inPage = jQuery.contains(elem.ownerDocument, elem);

            if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
                clone = elem.cloneNode(true);

                // IE<=8 does not properly clone detached, unknown element nodes
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
            }

            if ((!support.noCloneEvent || !support.noCloneChecked) &&
                (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

                // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
                destElements = getAll(clone);
                srcElements = getAll(elem);

                // Fix all IE cloning issues
                for (i = 0;
                    (node = srcElements[i]) != null; ++i) {
                    // Ensure that the destination node is not null; Fixes #9587
                    if (destElements[i]) {
                        fixCloneNodeIssues(node, destElements[i]);
                    }
                }
            }

            // Copy the events from the original to the clone
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);

                    for (i = 0;
                        (node = srcElements[i]) != null; i++) {
                        cloneCopyEvent(node, destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }

            // Preserve script evaluation history
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }

            destElements = srcElements = node = null;

            // Return the cloned set
            return clone;
        },

        buildFragment: function(elems, context, scripts, selection) {
            var j, elem, contains,
                tmp, tag, tbody, wrap,
                l = elems.length,

                // Ensure a safe fragment
                safe = createSafeFragment(context),

                nodes = [],
                i = 0;

            for (; i < l; i++) {
                elem = elems[i];

                if (elem || elem === 0) {

                    // Add nodes directly
                    if (jQuery.type(elem) === "object") {
                        jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

                        // Convert non-html into a text node
                    } else if (!rhtml.test(elem)) {
                        nodes.push(context.createTextNode(elem));

                        // Convert html into DOM nodes
                    } else {
                        tmp = tmp || safe.appendChild(context.createElement("div"));

                        // Deserialize a standard representation
                        tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;

                        tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];

                        // Descend through wrappers to the right content
                        j = wrap[0];
                        while (j--) {
                            tmp = tmp.lastChild;
                        }

                        // Manually add leading whitespace removed by IE
                        if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                            nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
                        }

                        // Remove IE's autoinserted <tbody> from table fragments
                        if (!support.tbody) {

                            // String was a <table>, *may* have spurious <tbody>
                            elem = tag === "table" && !rtbody.test(elem) ?
                                tmp.firstChild :

                                // String was a bare <thead> or <tfoot>
                                wrap[1] === "<table>" && !rtbody.test(elem) ?
                                tmp :
                                0;

                            j = elem && elem.childNodes.length;
                            while (j--) {
                                if (jQuery.nodeName((tbody = elem.childNodes[j]), "tbody") && !tbody.childNodes.length) {
                                    elem.removeChild(tbody);
                                }
                            }
                        }

                        jQuery.merge(nodes, tmp.childNodes);

                        // Fix #12392 for WebKit and IE > 9
                        tmp.textContent = "";

                        // Fix #12392 for oldIE
                        while (tmp.firstChild) {
                            tmp.removeChild(tmp.firstChild);
                        }

                        // Remember the top-level container for proper cleanup
                        tmp = safe.lastChild;
                    }
                }
            }

            // Fix #11356: Clear elements from fragment
            if (tmp) {
                safe.removeChild(tmp);
            }

            // Reset defaultChecked for any radios and checkboxes
            // about to be appended to the DOM in IE 6/7 (#8060)
            if (!support.appendChecked) {
                jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
            }

            i = 0;
            while ((elem = nodes[i++])) {

                // #4087 - If origin and destination elements are the same, and this is
                // that element, do not do anything
                if (selection && jQuery.inArray(elem, selection) !== -1) {
                    continue;
                }

                contains = jQuery.contains(elem.ownerDocument, elem);

                // Append to fragment
                tmp = getAll(safe.appendChild(elem), "script");

                // Preserve script evaluation history
                if (contains) {
                    setGlobalEval(tmp);
                }

                // Capture executables
                if (scripts) {
                    j = 0;
                    while ((elem = tmp[j++])) {
                        if (rscriptType.test(elem.type || "")) {
                            scripts.push(elem);
                        }
                    }
                }
            }

            tmp = null;

            return safe;
        },

        cleanData: function(elems, /* internal */ acceptData) {
            var elem, type, id, data,
                i = 0,
                internalKey = jQuery.expando,
                cache = jQuery.cache,
                deleteExpando = support.deleteExpando,
                special = jQuery.event.special;

            for (;
                (elem = elems[i]) != null; i++) {
                if (acceptData || jQuery.acceptData(elem)) {

                    id = elem[internalKey];
                    data = id && cache[id];

                    if (data) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);

                                    // This is a shortcut to avoid jQuery.event.remove's overhead
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }

                        // Remove cache only if it was not already removed by jQuery.event.remove
                        if (cache[id]) {

                            delete cache[id];

                            // IE does not allow us to delete expando properties from nodes,
                            // nor does it have a removeAttribute function on Document nodes;
                            // we must handle all of these cases
                            if (deleteExpando) {
                                delete elem[internalKey];

                            } else if (typeof elem.removeAttribute !== strundefined) {
                                elem.removeAttribute(internalKey);

                            } else {
                                elem[internalKey] = null;
                            }

                            deletedIds.push(id);
                        }
                    }
                }
            }
        }
    });

    jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return value === undefined ?
                    jQuery.text(this) :
                    this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },

        append: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },

        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },

        before: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },

        after: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },

        remove: function(selector, keepData /* Internal Use Only */ ) {
            var elem,
                elems = selector ? jQuery.filter(selector, this) : this,
                i = 0;

            for (;
                (elem = elems[i]) != null; i++) {

                if (!keepData && elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem));
                }

                if (elem.parentNode) {
                    if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
                        setGlobalEval(getAll(elem, "script"));
                    }
                    elem.parentNode.removeChild(elem);
                }
            }

            return this;
        },

        empty: function() {
            var elem,
                i = 0;

            for (;
                (elem = this[i]) != null; i++) {
                // Remove element nodes and prevent memory leaks
                if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                }

                // Remove any remaining nodes
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }

                // If this is a select, ensure that it displays empty (#12336)
                // Support: IE<9
                if (elem.options && jQuery.nodeName(elem, "select")) {
                    elem.options.length = 0;
                }
            }

            return this;
        },

        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },

        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {},
                    i = 0,
                    l = this.length;

                if (value === undefined) {
                    return elem.nodeType === 1 ?
                        elem.innerHTML.replace(rinlinejQuery, "") :
                        undefined;
                }

                // See if we can take a shortcut and just use innerHTML
                if (typeof value === "string" && !rnoInnerhtml.test(value) &&
                    (support.htmlSerialize || !rnoshimcache.test(value)) &&
                    (support.leadingWhitespace || !rleadingWhitespace.test(value)) &&
                    !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

                    value = value.replace(rxhtmlTag, "<$1></$2>");

                    try {
                        for (; i < l; i++) {
                            // Remove element nodes and prevent memory leaks
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }

                        elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                    } catch (e) {}
                }

                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },

        replaceWith: function() {
            var arg = arguments[0];

            // Make the changes, replacing each context element with the new content
            this.domManip(arguments, function(elem) {
                arg = this.parentNode;

                jQuery.cleanData(getAll(this));

                if (arg) {
                    arg.replaceChild(elem, this);
                }
            });

            // Force removal if there was no new content (e.g., from empty arguments)
            return arg && (arg.length || arg.nodeType) ? this : this.remove();
        },

        detach: function(selector) {
            return this.remove(selector, true);
        },

        domManip: function(args, callback) {

            // Flatten any nested arrays
            args = concat.apply([], args);

            var first, node, hasScripts,
                scripts, doc, fragment,
                i = 0,
                l = this.length,
                set = this,
                iNoClone = l - 1,
                value = args[0],
                isFunction = jQuery.isFunction(value);

            // We can't cloneNode fragments that contain checked, in WebKit
            if (isFunction ||
                (l > 1 && typeof value === "string" &&
                    !support.checkClone && rchecked.test(value))) {
                return this.each(function(index) {
                    var self = set.eq(index);
                    if (isFunction) {
                        args[0] = value.call(this, index, self.html());
                    }
                    self.domManip(args, callback);
                });
            }

            if (l) {
                fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
                first = fragment.firstChild;

                if (fragment.childNodes.length === 1) {
                    fragment = first;
                }

                if (first) {
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;

                    // Use the original fragment for the last item instead of the first because it can end up
                    // being emptied incorrectly in certain situations (#8070).
                    for (; i < l; i++) {
                        node = fragment;

                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);

                            // Keep references to cloned scripts for later restoration
                            if (hasScripts) {
                                jQuery.merge(scripts, getAll(node, "script"));
                            }
                        }

                        callback.call(this[i], node, i);
                    }

                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;

                        // Reenable scripts
                        jQuery.map(scripts, restoreScript);

                        // Evaluate executable scripts on first document insertion
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") &&
                                !jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) {

                                if (node.src) {
                                    // Optional AJAX dependency, but won't run scripts if not present
                                    if (jQuery._evalUrl) {
                                        jQuery._evalUrl(node.src);
                                    }
                                } else {
                                    jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""));
                                }
                            }
                        }
                    }

                    // Fix #11809: Avoid leaking memory
                    fragment = first = null;
                }
            }

            return this;
        }
    });

    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems,
                i = 0,
                ret = [],
                insert = jQuery(selector),
                last = insert.length - 1;

            for (; i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);

                // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
                push.apply(ret, elems.get());
            }

            return this.pushStack(ret);
        };
    });


    var iframe,
        elemdisplay = {};

    /**
     * Retrieve the actual display of a element
     * @param {String} name nodeName of the element
     * @param {Object} doc Document object
     */
    // Called only from within defaultDisplay
    function actualDisplay(name, doc) {
        var style,
            elem = jQuery(doc.createElement(name)).appendTo(doc.body),

            // getDefaultComputedStyle might be reliably used only on attached element
            display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ?

            // Use of this method is a temporary fix (more like optmization) until something better comes along,
            // since it was removed from specification and supported only in FF
            style.display : jQuery.css(elem[0], "display");

        // We don't have any data stored on the element,
        // so use "detach" method as fast way to get rid of the element
        elem.detach();

        return display;
    }

    /**
     * Try to determine the default display value of an element
     * @param {String} nodeName
     */
    function defaultDisplay(nodeName) {
        var doc = document,
            display = elemdisplay[nodeName];

        if (!display) {
            display = actualDisplay(nodeName, doc);

            // If the simple way fails, read from inside an iframe
            if (display === "none" || !display) {

                // Use the already-created iframe if possible
                iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);

                // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
                doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;

                // Support: IE
                doc.write();
                doc.close();

                display = actualDisplay(nodeName, doc);
                iframe.detach();
            }

            // Store the correct default display
            elemdisplay[nodeName] = display;
        }

        return display;
    }


    (function() {
        var shrinkWrapBlocksVal;

        support.shrinkWrapBlocks = function() {
            if (shrinkWrapBlocksVal != null) {
                return shrinkWrapBlocksVal;
            }

            // Will be changed later if needed.
            shrinkWrapBlocksVal = false;

            // Minified: var b,c,d
            var div, body, container;

            body = document.getElementsByTagName("body")[0];
            if (!body || !body.style) {
                // Test fired too early or in an unsupported environment, exit.
                return;
            }

            // Setup
            div = document.createElement("div");
            container = document.createElement("div");
            container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            body.appendChild(container).appendChild(div);

            // Support: IE6
            // Check if elements with layout shrink-wrap their children
            if (typeof div.style.zoom !== strundefined) {
                // Reset CSS: box-sizing; display; margin; border
                div.style.cssText =
                    // Support: Firefox<29, Android 2.3
                    // Vendor-prefix box-sizing
                    "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
                    "box-sizing:content-box;display:block;margin:0;border:0;" +
                    "padding:1px;width:1px;zoom:1";
                div.appendChild(document.createElement("div")).style.width = "5px";
                shrinkWrapBlocksVal = div.offsetWidth !== 3;
            }

            body.removeChild(container);

            return shrinkWrapBlocksVal;
        };

    })();
    var rmargin = (/^margin/);

    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");



    var getStyles, curCSS,
        rposition = /^(top|right|bottom|left)$/;

    if (window.getComputedStyle) {
        getStyles = function(elem) {
            return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
        };

        curCSS = function(elem, name, computed) {
            var width, minWidth, maxWidth, ret,
                style = elem.style;

            computed = computed || getStyles(elem);

            // getPropertyValue is only needed for .css('filter') in IE9, see #12537
            ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;

            if (computed) {

                if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                    ret = jQuery.style(elem, name);
                }

                // A tribute to the "awesome hack by Dean Edwards"
                // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
                // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
                // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
                if (rnumnonpx.test(ret) && rmargin.test(name)) {

                    // Remember the original values
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;

                    // Put in the new values to get a computed value out
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;

                    // Revert the changed values
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }

            // Support: IE
            // IE returns zIndex value as an integer.
            return ret === undefined ?
                ret :
                ret + "";
        };
    } else if (document.documentElement.currentStyle) {
        getStyles = function(elem) {
            return elem.currentStyle;
        };

        curCSS = function(elem, name, computed) {
            var left, rs, rsLeft, ret,
                style = elem.style;

            computed = computed || getStyles(elem);
            ret = computed ? computed[name] : undefined;

            // Avoid setting ret to empty string here
            // so we don't default to auto
            if (ret == null && style && style[name]) {
                ret = style[name];
            }

            // From the awesome hack by Dean Edwards
            // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

            // If we're not dealing with a regular pixel number
            // but a number that has a weird ending, we need to convert it to pixels
            // but not position css attributes, as those are proportional to the parent element instead
            // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
            if (rnumnonpx.test(ret) && !rposition.test(name)) {

                // Remember the original values
                left = style.left;
                rs = elem.runtimeStyle;
                rsLeft = rs && rs.left;

                // Put in the new values to get a computed value out
                if (rsLeft) {
                    rs.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";

                // Revert the changed values
                style.left = left;
                if (rsLeft) {
                    rs.left = rsLeft;
                }
            }

            // Support: IE
            // IE returns zIndex value as an integer.
            return ret === undefined ?
                ret :
                ret + "" || "auto";
        };
    }




    function addGetHookIf(conditionFn, hookFn) {
        // Define the hook, we'll check on the first run if it's really needed.
        return {
            get: function() {
                var condition = conditionFn();

                if (condition == null) {
                    // The test was not ready at this point; screw the hook this time
                    // but check again when needed next time.
                    return;
                }

                if (condition) {
                    // Hook not needed (or it's not possible to use it due to missing dependency),
                    // remove it.
                    // Since there are no other hooks for marginRight, remove the whole object.
                    delete this.get;
                    return;
                }

                // Hook needed; redefine it so that the support test is not executed again.

                return (this.get = hookFn).apply(this, arguments);
            }
        };
    }


    (function() {
        // Minified: var b,c,d,e,f,g, h,i
        var div, style, a, pixelPositionVal, boxSizingReliableVal,
            reliableHiddenOffsetsVal, reliableMarginRightVal;

        // Setup
        div = document.createElement("div");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName("a")[0];
        style = a && a.style;

        // Finish early in limited (non-browser) environments
        if (!style) {
            return;
        }

        style.cssText = "float:left;opacity:.5";

        // Support: IE<9
        // Make sure that element opacity exists (as opposed to filter)
        support.opacity = style.opacity === "0.5";

        // Verify style float existence
        // (IE uses styleFloat instead of cssFloat)
        support.cssFloat = !!style.cssFloat;

        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";

        // Support: Firefox<29, Android 2.3
        // Vendor-prefix box-sizing
        support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
            style.WebkitBoxSizing === "";

        jQuery.extend(support, {
            reliableHiddenOffsets: function() {
                if (reliableHiddenOffsetsVal == null) {
                    computeStyleTests();
                }
                return reliableHiddenOffsetsVal;
            },

            boxSizingReliable: function() {
                if (boxSizingReliableVal == null) {
                    computeStyleTests();
                }
                return boxSizingReliableVal;
            },

            pixelPosition: function() {
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return pixelPositionVal;
            },

            // Support: Android 2.3
            reliableMarginRight: function() {
                if (reliableMarginRightVal == null) {
                    computeStyleTests();
                }
                return reliableMarginRightVal;
            }
        });

        function computeStyleTests() {
            // Minified: var b,c,d,j
            var div, body, container, contents;

            body = document.getElementsByTagName("body")[0];
            if (!body || !body.style) {
                // Test fired too early or in an unsupported environment, exit.
                return;
            }

            // Setup
            div = document.createElement("div");
            container = document.createElement("div");
            container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            body.appendChild(container).appendChild(div);

            div.style.cssText =
                // Support: Firefox<29, Android 2.3
                // Vendor-prefix box-sizing
                "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
                "box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
                "border:1px;padding:1px;width:4px;position:absolute";

            // Support: IE<9
            // Assume reasonable values in the absence of getComputedStyle
            pixelPositionVal = boxSizingReliableVal = false;
            reliableMarginRightVal = true;

            // Check for getComputedStyle so that this code is not run in IE<9.
            if (window.getComputedStyle) {
                pixelPositionVal = (window.getComputedStyle(div, null) || {}).top !== "1%";
                boxSizingReliableVal =
                    (window.getComputedStyle(div, null) || { width: "4px" }).width === "4px";

                // Support: Android 2.3
                // Div with explicit width and no margin-right incorrectly
                // gets computed margin-right based on width of container (#3333)
                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                contents = div.appendChild(document.createElement("div"));

                // Reset CSS: box-sizing; display; margin; border; padding
                contents.style.cssText = div.style.cssText =
                    // Support: Firefox<29, Android 2.3
                    // Vendor-prefix box-sizing
                    "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
                    "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                contents.style.marginRight = contents.style.width = "0";
                div.style.width = "1px";

                reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents, null) || {}).marginRight);
            }

            // Support: IE8
            // Check if table cells still have offsetWidth/Height when they are set
            // to display:none and there are still other visible table cells in a
            // table row; if so, offsetWidth/Height are not reliable for use when
            // determining if an element has been hidden directly using
            // display:none (it is still safe to use offsets if a parent element is
            // hidden; don safety goggles and see bug #4512 for more information).
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            contents = div.getElementsByTagName("td");
            contents[0].style.cssText = "margin:0;border:0;padding:0;display:none";
            reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
            if (reliableHiddenOffsetsVal) {
                contents[0].style.display = "";
                contents[1].style.display = "none";
                reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
            }

            body.removeChild(container);
        }

    })();


    // A method for quickly swapping in/out CSS properties to get correct calculations.
    jQuery.swap = function(elem, options, callback, args) {
        var ret, name,
            old = {};

        // Remember the old values, and insert the new ones
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }

        ret = callback.apply(elem, args || []);

        // Revert the old values
        for (name in options) {
            elem.style[name] = old[name];
        }

        return ret;
    };


    var
        ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity\s*=\s*([^)]*)/,

        // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
        // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
        rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),

        cssShow = { position: "absolute", visibility: "hidden", display: "block" },
        cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        },

        cssPrefixes = ["Webkit", "O", "Moz", "ms"];


    // return a css property mapped to a potentially vendor prefixed property
    function vendorPropName(style, name) {

        // shortcut for names that are not vendor prefixed
        if (name in style) {
            return name;
        }

        // check for vendor prefixed names
        var capName = name.charAt(0).toUpperCase() + name.slice(1),
            origName = name,
            i = cssPrefixes.length;

        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) {
                return name;
            }
        }

        return origName;
    }

    function showHide(elements, show) {
        var display, elem, hidden,
            values = [],
            index = 0,
            length = elements.length;

        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }

            values[index] = jQuery._data(elem, "olddisplay");
            display = elem.style.display;
            if (show) {
                // Reset the inline display of this element to learn if it is
                // being hidden by cascaded rules or not
                if (!values[index] && display === "none") {
                    elem.style.display = "";
                }

                // Set elements which have been overridden with display: none
                // in a stylesheet to whatever the default browser style is
                // for such an element
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
                }
            } else {
                hidden = isHidden(elem);

                if (display && display !== "none" || !hidden) {
                    jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
                }
            }
        }

        // Set the display of most of the elements in a second loop
        // to avoid the constant reflow
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[index] || "" : "none";
            }
        }

        return elements;
    }

    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ?
            // Guard against undefined "subtract", e.g., when used as in cssHooks
            Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") :
            value;
    }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i = extra === (isBorderBox ? "border" : "content") ?
            // If we already have the right measurement, avoid augmentation
            4 :
            // Otherwise initialize for horizontal or vertical properties
            name === "width" ? 1 : 0,

            val = 0;

        for (; i < 4; i += 2) {
            // both box models exclude margin, so add it if we want it
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true, styles);
            }

            if (isBorderBox) {
                // border-box includes padding, so remove it if we want content
                if (extra === "content") {
                    val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                }

                // at this point, extra isn't border nor margin, so remove border
                if (extra !== "margin") {
                    val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            } else {
                // at this point, extra isn't content, so add padding
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

                // at this point, extra isn't content nor padding, so add border
                if (extra !== "padding") {
                    val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            }
        }

        return val;
    }

    function getWidthOrHeight(elem, name, extra) {

        // Start with offset property, which is equivalent to the border-box value
        var valueIsBorderBox = true,
            val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            styles = getStyles(elem),
            isBorderBox = support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box";

        // some non-html elements return undefined for offsetWidth, so check for null/undefined
        // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
        // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
        if (val <= 0 || val == null) {
            // Fall back to computed then uncomputed css if necessary
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) {
                val = elem.style[name];
            }

            // Computed unit is not pixels. Stop here and return.
            if (rnumnonpx.test(val)) {
                return val;
            }

            // we need the check for style in case a browser which returns unreliable values
            // for getComputedStyle silently falls back to the reliable elem.style
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

            // Normalize "", auto, and prepare for extra
            val = parseFloat(val) || 0;
        }

        // use the active box-sizing model to add/subtract irrelevant styles
        return (val +
            augmentWidthOrHeight(
                elem,
                name,
                extra || (isBorderBox ? "border" : "content"),
                valueIsBorderBox,
                styles
            )
        ) + "px";
    }

    jQuery.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        // We should always get a number back from opacity
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },

        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },

        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {
            // normalize float css property
            "float": support.cssFloat ? "cssFloat" : "styleFloat"
        },

        // Get and set the style property on a DOM Node
        style: function(elem, name, value, extra) {
            // Don't set styles on text and comment nodes
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }

            // Make sure that we're working with the right name
            var ret, type, hooks,
                origName = jQuery.camelCase(name),
                style = elem.style;

            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));

            // gets hook for the prefixed version
            // followed by the unprefixed version
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

            // Check if we're setting a value
            if (value !== undefined) {
                type = typeof value;

                // convert relative number strings (+= or -=) to relative numbers. #7345
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                    // Fixes bug #9237
                    type = "number";
                }

                // Make sure that null and NaN values aren't set. See: #7116
                if (value == null || value !== value) {
                    return;
                }

                // If a number was passed in, add 'px' to the (except for certain CSS properties)
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px";
                }

                // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
                // but it would mean to define eight (for every problematic property) identical functions
                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit";
                }

                // If a hook was provided, use that value, otherwise just set the specified value
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

                    // Support: IE
                    // Swallow errors from 'invalid' CSS values (#5509)
                    try {
                        style[name] = value;
                    } catch (e) {}
                }

            } else {
                // If a hook was provided get the non-computed value from there
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }

                // Otherwise just get the value from the style object
                return style[name];
            }
        },

        css: function(elem, name, extra, styles) {
            var num, val, hooks,
                origName = jQuery.camelCase(name);

            // Make sure that we're working with the right name
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));

            // gets hook for the prefixed version
            // followed by the unprefixed version
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

            // If a hook was provided get the computed value from there
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }

            // Otherwise, if a way to get the computed value exists, use that
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }

            //convert "normal" to computed value
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }

            // Return, converting to number if forced or a qualifier was provided and val looks numeric
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
            }
            return val;
        }
    });

    jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) {
                    // certain elements can have dimension info if we invisibly show them
                    // however, it must have a current display style that would benefit from this
                    return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ?
                        jQuery.swap(elem, cssShow, function() {
                            return getWidthOrHeight(elem, name, extra);
                        }) :
                        getWidthOrHeight(elem, name, extra);
                }
            },

            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ?
                    augmentWidthOrHeight(
                        elem,
                        name,
                        extra,
                        support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
                        styles
                    ) : 0
                );
            }
        };
    });

    if (!support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function(elem, computed) {
                // IE uses filters for opacity
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ?
                    (0.01 * parseFloat(RegExp.$1)) + "" :
                    computed ? "1" : "";
            },

            set: function(elem, value) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
                    filter = currentStyle && currentStyle.filter || style.filter || "";

                // IE has trouble with opacity if it does not have layout
                // Force it by setting the zoom level
                style.zoom = 1;

                // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
                // if value === "", then remove inline opacity #12685
                if ((value >= 1 || value === "") &&
                    jQuery.trim(filter.replace(ralpha, "")) === "" &&
                    style.removeAttribute) {

                    // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
                    // if "filter:" is present at all, clearType is disabled, we want to avoid this
                    // style.removeAttribute is IE Only, but so apparently is this code path...
                    style.removeAttribute("filter");

                    // if there is no filter style applied in a css rule or unset inline opacity, we are done
                    if (value === "" || currentStyle && !currentStyle.filter) {
                        return;
                    }
                }

                // otherwise, set new filter values
                style.filter = ralpha.test(filter) ?
                    filter.replace(ralpha, opacity) :
                    filter + " " + opacity;
            }
        };
    }

    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight,
        function(elem, computed) {
            if (computed) {
                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                // Work around by temporarily setting element display to inline-block
                return jQuery.swap(elem, { "display": "inline-block" },
                    curCSS, [elem, "marginRight"]);
            }
        }
    );

    // These hooks are used by animate to expand properties
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i = 0,
                    expanded = {},

                    // assumes a single number if not a string
                    parts = typeof value === "string" ? value.split(" ") : [value];

                for (; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] =
                        parts[i] || parts[i - 2] || parts[0];
                }

                return expanded;
            }
        };

        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });

    jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len,
                    map = {},
                    i = 0;

                if (jQuery.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;

                    for (; i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }

                    return map;
                }

                return value !== undefined ?
                    jQuery.style(elem, name, value) :
                    jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, true);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            if (typeof state === "boolean") {
                return state ? this.show() : this.hide();
            }

            return this.each(function() {
                if (isHidden(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });


    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;

    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];

            return hooks && hooks.get ?
                hooks.get(this) :
                Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased,
                hooks = Tween.propHooks[this.prop];

            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](
                    percent, this.options.duration * percent, 0, 1, this.options.duration
                );
            } else {
                this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;

            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }

            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };

    Tween.prototype.init.prototype = Tween.prototype;

    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;

                if (tween.elem[tween.prop] != null &&
                    (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                    return tween.elem[tween.prop];
                }

                // passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails
                // so, simple values such as "10px" are parsed to Float.
                // complex values such as "rotate(1rad)" are returned as is.
                result = jQuery.css(tween.elem, tween.prop, "");
                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === "auto" ? 0 : result;
            },
            set: function(tween) {
                // use step hook for back compat - use cssHook if its there - use .style if its
                // available and use plain properties where available
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };

    // Support: IE <=9
    // Panic based approach to setting things on disconnected nodes

    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };

    jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        }
    };

    jQuery.fx = Tween.prototype.init;

    // Back Compat <1.8 extension point
    jQuery.fx.step = {};




    var
        fxNow, timerId,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
        rrun = /queueHooks$/,
        animationPrefilters = [defaultPrefilter],
        tweeners = {
            "*": [function(prop, value) {
                var tween = this.createTween(prop, value),
                    target = tween.cur(),
                    parts = rfxnum.exec(value),
                    unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),

                    // Starting value computation is required for potential unit mismatches
                    start = (jQuery.cssNumber[prop] || unit !== "px" && +target) &&
                    rfxnum.exec(jQuery.css(tween.elem, prop)),
                    scale = 1,
                    maxIterations = 20;

                if (start && start[3] !== unit) {
                    // Trust units reported by jQuery.css
                    unit = unit || start[3];

                    // Make sure we update the tween properties later on
                    parts = parts || [];

                    // Iteratively approximate from a nonzero starting point
                    start = +target || 1;

                    do {
                        // If previous iteration zeroed out, double until we get *something*
                        // Use a string for doubling factor so we don't accidentally see scale as unchanged below
                        scale = scale || ".5";

                        // Adjust and apply
                        start = start / scale;
                        jQuery.style(tween.elem, prop, start + unit);

                        // Update scale, tolerating zero or NaN from tween.cur()
                        // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
                    } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
                }

                // Update tween properties
                if (parts) {
                    start = tween.start = +start || +target || 0;
                    tween.unit = unit;
                    // If a +=/-= token was provided, we're doing a relative animation
                    tween.end = parts[1] ?
                        start + (parts[1] + 1) * parts[2] :
                        +parts[2];
                }

                return tween;
            }]
        };

    // Animations created synchronously will run synchronously
    function createFxNow() {
        setTimeout(function() {
            fxNow = undefined;
        });
        return (fxNow = jQuery.now());
    }

    // Generate parameters to create a standard animation
    function genFx(type, includeWidth) {
        var which,
            attrs = { height: type },
            i = 0;

        // if we include width, step value is 1 to do all cssExpand values,
        // if we don't include width, step value is 2 to skip over Left and Right
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }

        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }

        return attrs;
    }

    function createTween(value, prop, animation) {
        var tween,
            collection = (tweeners[prop] || []).concat(tweeners["*"]),
            index = 0,
            length = collection.length;
        for (; index < length; index++) {
            if ((tween = collection[index].call(animation, prop, value))) {

                // we're done with this property
                return tween;
            }
        }
    }

    function defaultPrefilter(elem, props, opts) {
        /* jshint validthis: true */
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
            anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHidden(elem),
            dataShow = jQuery._data(elem, "fxshow");

        // handle queue: false promises
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;

            anim.always(function() {
                // doing this makes sure that the complete handler will be called
                // before this completes
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }

        // height/width overflow pass
        if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
            // Make sure that nothing sneaks out
            // Record all 3 overflow attributes because IE does not
            // change the overflow attribute when overflowX and
            // overflowY are set to the same value
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];

            // Set display property to inline-block for height/width
            // animations on inline elements that are having width/height animated
            display = jQuery.css(elem, "display");

            // Test default display if display is currently "none"
            checkDisplay = display === "none" ?
                jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;

            if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {

                // inline-level elements accept inline-block;
                // block-level elements need to be inline with layout
                if (!support.inlineBlockNeedsLayout || defaultDisplay(elem.nodeName) === "inline") {
                    style.display = "inline-block";
                } else {
                    style.zoom = 1;
                }
            }
        }

        if (opts.overflow) {
            style.overflow = "hidden";
            if (!support.shrinkWrapBlocks()) {
                anim.always(function() {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2];
                });
            }
        }

        // show/hide pass
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.exec(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {

                    // If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                        hidden = true;
                    } else {
                        continue;
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);

                // Any non-fx value stops us from restoring the original display value
            } else {
                display = undefined;
            }
        }

        if (!jQuery.isEmptyObject(orig)) {
            if (dataShow) {
                if ("hidden" in dataShow) {
                    hidden = dataShow.hidden;
                }
            } else {
                dataShow = jQuery._data(elem, "fxshow", {});
            }

            // store state if its toggle - enables .stop().toggle() to "reverse"
            if (toggle) {
                dataShow.hidden = !hidden;
            }
            if (hidden) {
                jQuery(elem).show();
            } else {
                anim.done(function() {
                    jQuery(elem).hide();
                });
            }
            anim.done(function() {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop]);
                }
            });
            for (prop in orig) {
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }

            // If this is a noop like .hide().hide(), restore an overwritten display value
        } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
            style.display = display;
        }
    }

    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;

        // camelCase, specialEasing and expand cssHook pass
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }

            if (index !== name) {
                props[name] = value;
                delete props[index];
            }

            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];

                // not quite $.extend, this wont overwrite keys already present.
                // also - reusing 'index' from above because we have the correct "name"
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            } else {
                specialEasing[name] = easing;
            }
        }
    }

    function Animation(elem, properties, options) {
        var result,
            stopped,
            index = 0,
            length = animationPrefilters.length,
            deferred = jQuery.Deferred().always(function() {
                // don't match elem in the :animated selector
                delete tick.elem;
            }),
            tick = function() {
                if (stopped) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                    // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;

                for (; index < length; index++) {
                    animation.tweens[index].run(percent);
                }

                deferred.notifyWith(elem, [animation, percent, remaining]);

                if (percent < 1 && length) {
                    return remaining;
                } else {
                    deferred.resolveWith(elem, [animation]);
                    return false;
                }
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, { specialEasing: {} }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function(prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end,
                        animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function(gotoEnd) {
                    var index = 0,
                        // if we are going to the end, we want to run all the tweens
                        // otherwise we skip this part
                        length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) {
                        return this;
                    }
                    stopped = true;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1);
                    }

                    // resolve when we played the last frame
                    // otherwise, reject
                    if (gotoEnd) {
                        deferred.resolveWith(elem, [animation, gotoEnd]);
                    } else {
                        deferred.rejectWith(elem, [animation, gotoEnd]);
                    }
                    return this;
                }
            }),
            props = animation.props;

        propFilter(props, animation.opts.specialEasing);

        for (; index < length; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                return result;
            }
        }

        jQuery.map(props, createTween, animation);

        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }

        jQuery.fx.timer(
            jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            })
        );

        // attach callbacks from options
        return animation.progress(animation.opts.progress)
            .done(animation.opts.done, animation.opts.complete)
            .fail(animation.opts.fail)
            .always(animation.opts.always);
    }

    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = ["*"];
            } else {
                props = props.split(" ");
            }

            var prop,
                index = 0,
                length = props.length;

            for (; index < length; index++) {
                prop = props[index];
                tweeners[prop] = tweeners[prop] || [];
                tweeners[prop].unshift(callback);
            }
        },

        prefilter: function(callback, prepend) {
            if (prepend) {
                animationPrefilters.unshift(callback);
            } else {
                animationPrefilters.push(callback);
            }
        }
    });

    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing ||
                jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };

        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
            opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

        // normalize opt.queue - true/undefined/null -> "fx"
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }

        // Queueing
        opt.old = opt.complete;

        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this);
            }

            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };

        return opt;
    };

    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {

            // show any hidden elements after setting opacity to 0
            return this.filter(isHidden).css("opacity", 0).show()

            // animate to the value specified
            .end().animate({ opacity: to }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop),
                optall = jQuery.speed(speed, easing, callback),
                doAnimation = function() {
                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation(this, jQuery.extend({}, prop), optall);

                    // Empty animations, or finishing resolves immediately
                    if (empty || jQuery._data(this, "finish")) {
                        anim.stop(true);
                    }
                };
            doAnimation.finish = doAnimation;

            return empty || optall.queue === false ?
                this.each(doAnimation) :
                this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };

            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }

            return this.each(function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = jQuery._data(this);

                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }

                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }

                // start the next in the queue if the last step wasn't forced
                // timers currently will call their complete callbacks, which will dequeue
                // but only if they were gotoEnd
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        },
        finish: function(type) {
            if (type !== false) {
                type = type || "fx";
            }
            return this.each(function() {
                var index,
                    data = jQuery._data(this),
                    queue = data[type + "queue"],
                    hooks = data[type + "queueHooks"],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;

                // enable finishing flag on private data
                data.finish = true;

                // empty the queue first
                jQuery.queue(this, type, []);

                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true);
                }

                // look for any active animations, and finish them
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                }

                // look for any animations in the old queue and finish them
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this);
                    }
                }

                // turn off finishing flag
                delete data.finish;
            });
        }
    });

    jQuery.each(["toggle", "show", "hide"], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ?
                cssFn.apply(this, arguments) :
                this.animate(genFx(name, true), speed, easing, callback);
        };
    });

    // Generate shortcuts for custom animations
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });

    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer,
            timers = jQuery.timers,
            i = 0;

        fxNow = jQuery.now();

        for (; i < timers.length; i++) {
            timer = timers[i];
            // Checks the timer has not already been removed
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }

        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };

    jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer);
        if (timer()) {
            jQuery.fx.start();
        } else {
            jQuery.timers.pop();
        }
    };

    jQuery.fx.interval = 13;

    jQuery.fx.start = function() {
        if (!timerId) {
            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
        }
    };

    jQuery.fx.stop = function() {
        clearInterval(timerId);
        timerId = null;
    };

    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        // Default speed
        _default: 400
    };


    // Based off of the plugin by Clint Helfers, with permission.
    // http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function(time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";

        return this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout);
            };
        });
    };


    (function() {
        // Minified: var a,b,c,d,e
        var input, div, select, a, opt;

        // Setup
        div = document.createElement("div");
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName("a")[0];

        // First batch of tests.
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[0];

        a.style.cssText = "top:1px";

        // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
        support.getSetAttribute = div.className !== "t";

        // Get the style information from getAttribute
        // (IE uses .cssText instead)
        support.style = /top/.test(a.getAttribute("style"));

        // Make sure that URLs aren't manipulated
        // (IE normalizes it by default)
        support.hrefNormalized = a.getAttribute("href") === "/a";

        // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
        support.checkOn = !!input.value;

        // Make sure that a selected-by-default option has a working selected property.
        // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
        support.optSelected = opt.selected;

        // Tests for enctype support on a form (#6743)
        support.enctype = !!document.createElement("form").enctype;

        // Make sure that the options inside disabled selects aren't marked as disabled
        // (WebKit marks them as disabled)
        select.disabled = true;
        support.optDisabled = !opt.disabled;

        // Support: IE8 only
        // Check if we can trust getAttribute("value")
        input = document.createElement("input");
        input.setAttribute("value", "");
        support.input = input.getAttribute("value") === "";

        // Check if an input maintains its value after becoming a radio
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";
    })();


    var rreturn = /\r/g;

    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction,
                elem = this[0];

            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret;
                    }

                    ret = elem.value;

                    return typeof ret === "string" ?
                        // handle most common string cases
                        ret.replace(rreturn, "") :
                        // handle cases where value is null/undef or number
                        ret == null ? "" : ret;
                }

                return;
            }

            isFunction = jQuery.isFunction(value);

            return this.each(function(i) {
                var val;

                if (this.nodeType !== 1) {
                    return;
                }

                if (isFunction) {
                    val = value.call(this, i, jQuery(this).val());
                } else {
                    val = value;
                }

                // Treat null/undefined as ""; convert numbers to string
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function(value) {
                        return value == null ? "" : value + "";
                    });
                }

                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

                // If set returns undefined, fall back to normal setting
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });

    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return val != null ?
                        val :
                        // Support: IE10-11+
                        // option.text throws exceptions (#14686, #14858)
                        jQuery.trim(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    var value, option,
                        options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one" || index < 0,
                        values = one ? null : [],
                        max = one ? index + 1 : options.length,
                        i = index < 0 ?
                        max :
                        one ? index : 0;

                    // Loop through all the selected options
                    for (; i < max; i++) {
                        option = options[i];

                        // oldIE doesn't update selected after form reset (#2551)
                        if ((option.selected || i === index) &&
                            // Don't return options that are disabled or in a disabled optgroup
                            (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
                            (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {

                            // Get the specific value for the option
                            value = jQuery(option).val();

                            // We don't need an array for one selects
                            if (one) {
                                return value;
                            }

                            // Multi-Selects return an array
                            values.push(value);
                        }
                    }

                    return values;
                },

                set: function(elem, value) {
                    var optionSet, option,
                        options = elem.options,
                        values = jQuery.makeArray(value),
                        i = options.length;

                    while (i--) {
                        option = options[i];

                        if (jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0) {

                            // Support: IE6
                            // When new option element is added to select box we need to
                            // force reflow of newly added node in order to workaround delay
                            // of initialization properties
                            try {
                                option.selected = optionSet = true;

                            } catch (_) {

                                // Will be executed only in IE6
                                option.scrollHeight;
                            }

                        } else {
                            option.selected = false;
                        }
                    }

                    // Force browsers to behave consistently when non-matching value is set
                    if (!optionSet) {
                        elem.selectedIndex = -1;
                    }

                    return options;
                }
            }
        }
    });

    // Radios and checkboxes getter/setter
    jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (jQuery.isArray(value)) {
                    return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function(elem) {
                // Support: Webkit
                // "" is returned instead of "on" if a value isn't specified
                return elem.getAttribute("value") === null ? "on" : elem.value;
            };
        }
    });




    var nodeHook, boolHook,
        attrHandle = jQuery.expr.attrHandle,
        ruseDefault = /^(?:checked|selected)$/i,
        getSetAttribute = support.getSetAttribute,
        getSetInput = support.input;

    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },

        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    });

    jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret,
                nType = elem.nodeType;

            // don't get/set attributes on text, comment and attribute nodes
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            // Fallback to prop when attributes are not supported
            if (typeof elem.getAttribute === strundefined) {
                return jQuery.prop(elem, name, value);
            }

            // All attributes are lowercase
            // Grab necessary hook if one is defined
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] ||
                    (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
            }

            if (value !== undefined) {

                if (value === null) {
                    jQuery.removeAttr(elem, name);

                } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;

                } else {
                    elem.setAttribute(name, value + "");
                    return value;
                }

            } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;

            } else {
                ret = jQuery.find.attr(elem, name);

                // Non-existent attributes return null, we normalize to undefined
                return ret == null ?
                    undefined :
                    ret;
            }
        },

        removeAttr: function(elem, value) {
            var name, propName,
                i = 0,
                attrNames = value && value.match(rnotwhite);

            if (attrNames && elem.nodeType === 1) {
                while ((name = attrNames[i++])) {
                    propName = jQuery.propFix[name] || name;

                    // Boolean attributes get special treatment (#10870)
                    if (jQuery.expr.match.bool.test(name)) {
                        // Set corresponding property to false
                        if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                            elem[propName] = false;
                            // Support: IE<9
                            // Also clear defaultChecked/defaultSelected (if appropriate)
                        } else {
                            elem[jQuery.camelCase("default-" + name)] =
                                elem[propName] = false;
                        }

                        // See #9699 for explanation of this approach (setting first, then removal)
                    } else {
                        jQuery.attr(elem, name, "");
                    }

                    elem.removeAttribute(getSetAttribute ? name : propName);
                }
            }
        },

        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        // Setting the type on a radio button after the value resets the value in IE6-9
                        // Reset value to default in case type is set after value during creation
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        }
    });

    // Hook for boolean attributes
    boolHook = {
        set: function(elem, value, name) {
            if (value === false) {
                // Remove boolean attributes when set to false
                jQuery.removeAttr(elem, name);
            } else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                // IE<8 needs the *property* name
                elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);

                // Use defaultChecked and defaultSelected for oldIE
            } else {
                elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
            }

            return name;
        }
    };

    // Retrieve booleans specially
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {

        var getter = attrHandle[name] || jQuery.find.attr;

        attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ?
            function(elem, name, isXML) {
                var ret, handle;
                if (!isXML) {
                    // Avoid an infinite loop by temporarily removing this function from the getter
                    handle = attrHandle[name];
                    attrHandle[name] = ret;
                    ret = getter(elem, name, isXML) != null ?
                        name.toLowerCase() :
                        null;
                    attrHandle[name] = handle;
                }
                return ret;
            } :
            function(elem, name, isXML) {
                if (!isXML) {
                    return elem[jQuery.camelCase("default-" + name)] ?
                        name.toLowerCase() :
                        null;
                }
            };
    });

    // fix oldIE attroperties
    if (!getSetInput || !getSetAttribute) {
        jQuery.attrHooks.value = {
            set: function(elem, value, name) {
                if (jQuery.nodeName(elem, "input")) {
                    // Does not return so that setAttribute is also used
                    elem.defaultValue = value;
                } else {
                    // Use nodeHook if defined (#1954); otherwise setAttribute is fine
                    return nodeHook && nodeHook.set(elem, value, name);
                }
            }
        };
    }

    // IE6/7 do not support getting/setting some attributes with get/setAttribute
    if (!getSetAttribute) {

        // Use this for any attribute in IE6/7
        // This fixes almost every IE6/7 issue
        nodeHook = {
            set: function(elem, value, name) {
                // Set the existing or create a new attribute node
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    elem.setAttributeNode(
                        (ret = elem.ownerDocument.createAttribute(name))
                    );
                }

                ret.value = value += "";

                // Break association with cloned elements by also using setAttribute (#9646)
                if (name === "value" || value === elem.getAttribute(name)) {
                    return value;
                }
            }
        };

        // Some attributes are constructed with empty-string values when not defined
        attrHandle.id = attrHandle.name = attrHandle.coords =
            function(elem, name, isXML) {
                var ret;
                if (!isXML) {
                    return (ret = elem.getAttributeNode(name)) && ret.value !== "" ?
                        ret.value :
                        null;
                }
            };

        // Fixing value retrieval on a button requires this module
        jQuery.valHooks.button = {
            get: function(elem, name) {
                var ret = elem.getAttributeNode(name);
                if (ret && ret.specified) {
                    return ret.value;
                }
            },
            set: nodeHook.set
        };

        // Set contenteditable to false on removals(#10429)
        // Setting to empty string throws an error as an invalid value
        jQuery.attrHooks.contenteditable = {
            set: function(elem, value, name) {
                nodeHook.set(elem, value === "" ? false : value, name);
            }
        };

        // Set width and height to auto instead of 0 on empty string( Bug #8150 )
        // This is for removals
        jQuery.each(["width", "height"], function(i, name) {
            jQuery.attrHooks[name] = {
                set: function(elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value;
                    }
                }
            };
        });
    }

    if (!support.style) {
        jQuery.attrHooks.style = {
            get: function(elem) {
                // Return undefined in the case of empty string
                // Note: IE uppercases css property names, but if we were to .toLowerCase()
                // .cssText, that would destroy case senstitivity in URL's, like in "background"
                return elem.style.cssText || undefined;
            },
            set: function(elem, value) {
                return (elem.style.cssText = value + "");
            }
        };
    }




    var rfocusable = /^(?:input|select|textarea|button|object)$/i,
        rclickable = /^(?:a|area)$/i;

    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },

        removeProp: function(name) {
            name = jQuery.propFix[name] || name;
            return this.each(function() {
                // try/catch handles cases where IE balks (such as removing a property on window)
                try {
                    this[name] = undefined;
                    delete this[name];
                } catch (e) {}
            });
        }
    });

    jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },

        prop: function(elem, name, value) {
            var ret, hooks, notxml,
                nType = elem.nodeType;

            // don't get/set properties on text, comment and attribute nodes
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);

            if (notxml) {
                // Fix name and attach hooks
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }

            if (value !== undefined) {
                return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ?
                    ret :
                    (elem[name] = value);

            } else {
                return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ?
                    ret :
                    elem[name];
            }
        },

        propHooks: {
            tabIndex: {
                get: function(elem) {
                    // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                    // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    // Use proper attribute retrieval(#12072)
                    var tabindex = jQuery.find.attr(elem, "tabindex");

                    return tabindex ?
                        parseInt(tabindex, 10) :
                        rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ?
                        0 :
                        -1;
                }
            }
        }
    });

    // Some attributes require a special call on IE
    // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if (!support.hrefNormalized) {
        // href/src property should get the full normalized URL (#10299/#12915)
        jQuery.each(["href", "src"], function(i, name) {
            jQuery.propHooks[name] = {
                get: function(elem) {
                    return elem.getAttribute(name, 4);
                }
            };
        });
    }

    // Support: Safari, IE9+
    // mis-reports the default selected property of an option
    // Accessing the parent's selectedIndex property fixes it
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function(elem) {
                var parent = elem.parentNode;

                if (parent) {
                    parent.selectedIndex;

                    // Make sure that it also works with optgroups, see #5701
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
                return null;
            }
        };
    }

    jQuery.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
    ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });

    // IE6/7 call enctype encoding
    if (!support.enctype) {
        jQuery.propFix.enctype = "encoding";
    }




    var rclass = /[\t\r\n\f]/g;

    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue,
                i = 0,
                len = this.length,
                proceed = typeof value === "string" && value;

            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className));
                });
            }

            if (proceed) {
                // The disjunction here is for better compressibility (see removeClass)
                classes = (value || "").match(rnotwhite) || [];

                for (; i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ?
                        (" " + elem.className + " ").replace(rclass, " ") :
                        " "
                    );

                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " ";
                            }
                        }

                        // only assign if different to avoid unneeded rendering.
                        finalValue = jQuery.trim(cur);
                        if (elem.className !== finalValue) {
                            elem.className = finalValue;
                        }
                    }
                }
            }

            return this;
        },

        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue,
                i = 0,
                len = this.length,
                proceed = arguments.length === 0 || typeof value === "string" && value;

            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || "").match(rnotwhite) || [];

                for (; i < len; i++) {
                    elem = this[i];
                    // This expression is here for better compressibility (see addClass)
                    cur = elem.nodeType === 1 && (elem.className ?
                        (" " + elem.className + " ").replace(rclass, " ") :
                        ""
                    );

                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            // Remove *all* instances
                            while (cur.indexOf(" " + clazz + " ") >= 0) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }

                        // only assign if different to avoid unneeded rendering.
                        finalValue = value ? jQuery.trim(cur) : "";
                        if (elem.className !== finalValue) {
                            elem.className = finalValue;
                        }
                    }
                }
            }

            return this;
        },

        toggleClass: function(value, stateVal) {
            var type = typeof value;

            if (typeof stateVal === "boolean" && type === "string") {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }

            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                });
            }

            return this.each(function() {
                if (type === "string") {
                    // toggle individual class names
                    var className,
                        i = 0,
                        self = jQuery(this),
                        classNames = value.match(rnotwhite) || [];

                    while ((className = classNames[i++])) {
                        // check each className given, space separated list
                        if (self.hasClass(className)) {
                            self.removeClass(className);
                        } else {
                            self.addClass(className);
                        }
                    }

                    // Toggle whole class name
                } else if (type === strundefined || type === "boolean") {
                    if (this.className) {
                        // store className if set
                        jQuery._data(this, "__className__", this.className);
                    }

                    // If the element has a class name or if we're passed "false",
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
                }
            });
        },

        hasClass: function(selector) {
            var className = " " + selector + " ",
                i = 0,
                l = this.length;
            for (; i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                    return true;
                }
            }

            return false;
        }
    });




    // Return jQuery for attributes-only inclusion


    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {

        // Handle event binding
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ?
                this.on(name, null, data, fn) :
                this.trigger(name);
        };
    });

    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },

        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },

        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            // ( namespace ) or ( selector, types [, fn] )
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });


    var nonce = jQuery.now();

    var rquery = (/\?/);



    var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

    jQuery.parseJSON = function(data) {
        // Attempt to parse using the native JSON parser first
        if (window.JSON && window.JSON.parse) {
            // Support: Android 2.3
            // Workaround failure to string-cast null input
            return window.JSON.parse(data + "");
        }

        var requireNonComma,
            depth = null,
            str = jQuery.trim(data + "");

        // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
        // after removing valid tokens
        return str && !jQuery.trim(str.replace(rvalidtokens, function(token, comma, open, close) {

                // Force termination if we see a misplaced comma
                if (requireNonComma && comma) {
                    depth = 0;
                }

                // Perform no more replacements after returning to outermost depth
                if (depth === 0) {
                    return token;
                }

                // Commas must not follow "[", "{", or ","
                requireNonComma = open || comma;

                // Determine new depth
                // array/object open ("[" or "{"): depth += true - false (increment)
                // array/object close ("]" or "}"): depth += false - true (decrement)
                // other cases ("," or primitive): depth += true - true (numeric cast)
                depth += !close - !open;

                // Remove this token
                return "";
            })) ?
            (Function("return " + str))() :
            jQuery.error("Invalid JSON: " + data);
    };


    // Cross-browser xml parsing
    jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || typeof data !== "string") {
            return null;
        }
        try {
            if (window.DOMParser) { // Standard
                tmp = new DOMParser();
                xml = tmp.parseFromString(data, "text/xml");
            } else { // IE
                xml = new ActiveXObject("Microsoft.XMLDOM");
                xml.async = "false";
                xml.loadXML(data);
            }
        } catch (e) {
            xml = undefined;
        }
        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    };


    var
    // Document location
        ajaxLocParts,
        ajaxLocation,

        rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
        // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

        /* Prefilters
         * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
         * 2) These are called:
         *    - BEFORE asking for a transport
         *    - AFTER param serialization (s.data is a string if s.processData is true)
         * 3) key is the dataType
         * 4) the catchall symbol "*" can be used
         * 5) execution will start with transport dataType and THEN continue down to "*" if needed
         */
        prefilters = {},

        /* Transports bindings
         * 1) key is the dataType
         * 2) the catchall symbol "*" can be used
         * 3) selection will start with transport dataType and THEN go to "*" if needed
         */
        transports = {},

        // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = "*/".concat("*");

    // #8138, IE may throw an exception when accessing
    // a field from window.location if document.domain has been set
    try {
        ajaxLocation = location.href;
    } catch (e) {
        // Use the href attribute of an A element
        // since IE will modify it given document.location
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }

    // Segment location into parts
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports(structure) {

        // dataTypeExpression is optional and defaults to "*"
        return function(dataTypeExpression, func) {

            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }

            var dataType,
                i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

            if (jQuery.isFunction(func)) {
                // For each dataType in the dataTypeExpression
                while ((dataType = dataTypes[i++])) {
                    // Prepend if requested
                    if (dataType.charAt(0) === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);

                        // Otherwise append
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        };
    }

    // Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

        var inspected = {},
            seekingTransport = (structure === transports);

        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }

        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }

    // A special extend for ajax options
    // that takes "flat" options (not to be deep extended)
    // Fixes #9887
    function ajaxExtend(target, src) {
        var deep, key,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};

        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }

        return target;
    }

    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses(s, jqXHR, responses) {
        var firstDataType, ct, finalDataType, type,
            contents = s.contents,
            dataTypes = s.dataTypes;

        // Remove auto dataType and get content-type in the process
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }

        // Check if we're dealing with a known content-type
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }

        // Check to see if we have a response for the expected dataType
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {
            // Try convertible dataTypes
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }

        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }

    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev,
            converters = {},
            // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();

        // Create converters map with lowercased keys
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }

        current = dataTypes.shift();

        // Convert to each sequential dataType
        while (current) {

            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }

            // Apply the dataFilter if provided
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }

            prev = current;
            current = dataTypes.shift();

            if (current) {

                // There's only work to do if current dataType is non-auto
                if (current === "*") {

                    current = prev;

                    // Convert response if prev dataType is non-auto and differs from current
                } else if (prev !== "*" && prev !== current) {

                    // Seek a direct converter
                    conv = converters[prev + " " + current] || converters["* " + current];

                    // If none found, seek a pair
                    if (!conv) {
                        for (conv2 in converters) {

                            // If conv2 outputs current
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {

                                // If prev can be converted to accepted input
                                conv = converters[prev + " " + tmp[0]] ||
                                    converters["* " + tmp[0]];
                                if (conv) {
                                    // Condense equivalence converters
                                    if (conv === true) {
                                        conv = converters[conv2];

                                        // Otherwise, insert the intermediate dataType
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    // Apply converter (if not an equivalence)
                    if (conv !== true) {

                        // Unless errors are allowed to bubble, catch and return them
                        if (conv && s["throws"]) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
                            }
                        }
                    }
                }
            }
        }

        return { state: "success", data: response };
    }

    jQuery.extend({

        // Counter for holding the number of active queries
        active: 0,

        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},

        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            /*
            timeout: 0,
            data: null,
            dataType: null,
            username: null,
            password: null,
            cache: null,
            throws: false,
            traditional: false,
            headers: {},
            */

            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },

            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },

            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },

            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {

                // Convert anything to text
                "* text": String,

                // Text to html (true = no transformation)
                "text html": true,

                // Evaluate text as a json expression
                "text json": jQuery.parseJSON,

                // Parse text as xml
                "text xml": jQuery.parseXML
            },

            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },

        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function(target, settings) {
            return settings ?

                // Building a settings object
                ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

                // Extending ajaxSettings
                ajaxExtend(jQuery.ajaxSettings, target);
        },

        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),

        // Main method
        ajax: function(url, options) {

            // If url is an object, simulate pre-1.5 signature
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }

            // Force options to be an object
            options = options || {};

            var // Cross-domain detection vars
                parts,
                // Loop variable
                i,
                // URL without anti-cache param
                cacheURL,
                // Response headers as string
                responseHeadersString,
                // timeout handle
                timeoutTimer,

                // To know if global events are to be dispatched
                fireGlobals,

                transport,
                // Response headers
                responseHeaders,
                // Create the final options object
                s = jQuery.ajaxSetup({}, options),
                // Callbacks context
                callbackContext = s.context || s,
                // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ?
                jQuery(callbackContext) :
                jQuery.event,
                // Deferreds
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
                // Status-dependent callbacks
                statusCode = s.statusCode || {},
                // Headers (they are sent all at once)
                requestHeaders = {},
                requestHeadersNames = {},
                // The jqXHR state
                state = 0,
                // Default abort message
                strAbort = "canceled",
                // Fake xhr
                jqXHR = {
                    readyState: 0,

                    // Builds headers hashtable if needed
                    getResponseHeader: function(key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match == null ? null : match;
                    },

                    // Raw string
                    getAllResponseHeaders: function() {
                        return state === 2 ? responseHeadersString : null;
                    },

                    // Caches the header
                    setRequestHeader: function(name, value) {
                        var lname = name.toLowerCase();
                        if (!state) {
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },

                    // Overrides response content-type header
                    overrideMimeType: function(type) {
                        if (!state) {
                            s.mimeType = type;
                        }
                        return this;
                    },

                    // Status-dependent callbacks
                    statusCode: function(map) {
                        var code;
                        if (map) {
                            if (state < 2) {
                                for (code in map) {
                                    // Lazy-add the new callback in a way that preserves old ones
                                    statusCode[code] = [statusCode[code], map[code]];
                                }
                            } else {
                                // Execute the appropriate callbacks
                                jqXHR.always(map[jqXHR.status]);
                            }
                        }
                        return this;
                    },

                    // Cancel the request
                    abort: function(statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText);
                        }
                        done(0, finalText);
                        return this;
                    }
                };

            // Attach deferreds
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;

            // Remove hash character (#7531: and string promotion)
            // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");

            // Alias method option to type as per ticket #12004
            s.type = options.method || options.type || s.method || s.type;

            // Extract dataTypes list
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

            // A cross-domain request is in order when we have a protocol:host:port mismatch
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts &&
                    (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] ||
                        (parts[3] || (parts[1] === "http:" ? "80" : "443")) !==
                        (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))
                );
            }

            // Convert data if not already a string
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }

            // Apply prefilters
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

            // If request was aborted inside a prefilter, stop there
            if (state === 2) {
                return jqXHR;
            }

            // We can fire global events as of now if asked to
            fireGlobals = s.global;

            // Watch for a new set of requests
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }

            // Uppercase the type
            s.type = s.type.toUpperCase();

            // Determine if request has content
            s.hasContent = !rnoContent.test(s.type);

            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            cacheURL = s.url;

            // More options handling for requests with no content
            if (!s.hasContent) {

                // If data is available, append data to url
                if (s.data) {
                    cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }

                // Add anti-cache in url if needed
                if (s.cache === false) {
                    s.url = rts.test(cacheURL) ?

                        // If there is already a '_' parameter, set its value
                        cacheURL.replace(rts, "$1_=" + nonce++) :

                        // Otherwise add one to the end
                        cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
                }
            }

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }

            // Set the correct header, if data is being sent
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }

            // Set the Accepts header for the server, depending on the dataType
            jqXHR.setRequestHeader(
                "Accept",
                s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
                s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
                s.accepts["*"]
            );

            // Check for headers option
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }

            // Allow custom headers/mimetypes and early abort
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                // Abort if not done already and return
                return jqXHR.abort();
            }

            // aborting is no longer a cancellation
            strAbort = "abort";

            // Install callbacks on deferreds
            for (i in { success: 1, error: 1, complete: 1 }) {
                jqXHR[i](s[i]);
            }

            // Get transport
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

            // If no transport, we auto-abort
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;

                // Send global event
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }
                // Timeout
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }

                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    // Propagate exception as error if not done
                    if (state < 2) {
                        done(-1, e);
                        // Simply rethrow otherwise
                    } else {
                        throw e;
                    }
                }
            }

            // Callback for when everything is done
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified,
                    statusText = nativeStatusText;

                // Called once
                if (state === 2) {
                    return;
                }

                // State is "done" now
                state = 2;

                // Clear timeout if it exists
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || "";

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Determine if successful
                isSuccess = status >= 200 && status < 300 || status === 304;

                // Get response data
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }

                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert(s, response, jqXHR, isSuccess);

                // If successful, handle type chaining
                if (isSuccess) {

                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }

                    // if no content
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent";

                        // if not modified
                    } else if (status === 304) {
                        statusText = "notmodified";

                        // If we have data, let's convert it
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    // We extract error from statusText
                    // then normalize statusText and status for non-aborts
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";

                // Success/Error
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }

                // Status-dependent callbacks
                jqXHR.statusCode(statusCode);
                statusCode = undefined;

                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
                }

                // Complete
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    // Handle the global AJAX counter
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }

            return jqXHR;
        },

        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },

        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });

    jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            // shift arguments if data argument was omitted
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });

    // Attach a bunch of functions for handling common AJAX events
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    });


    jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: false,
            global: false,
            "throws": true
        });
    };


    jQuery.fn.extend({
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }

            if (this[0]) {
                // The elements to wrap the target around
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }

                wrap.map(function() {
                    var elem = this;

                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }

                    return elem;
                }).append(this);
            }

            return this;
        },

        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }

            return this.each(function() {
                var self = jQuery(this),
                    contents = self.contents();

                if (contents.length) {
                    contents.wrapAll(html);

                } else {
                    self.append(html);
                }
            });
        },

        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);

            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },

        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        }
    });


    jQuery.expr.filters.hidden = function(elem) {
        // Support: Opera <= 12.12
        // Opera reports offsetWidths and offsetHeights less than zero on some elements
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
            (!support.reliableHiddenOffsets() &&
                ((elem.style && elem.style.display) || jQuery.css(elem, "display")) === "none");
    };

    jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };




    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams(prefix, obj, traditional, add) {
        var name;

        if (jQuery.isArray(obj)) {
            // Serialize array item.
            jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {
                    // Treat each array item as a scalar.
                    add(prefix, v);

                } else {
                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
                }
            });

        } else if (!traditional && jQuery.type(obj) === "object") {
            // Serialize object item.
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }

        } else {
            // Serialize scalar item.
            add(prefix, obj);
        }
    }

    // Serialize an array of form elements or a set of
    // key/values into a query string
    jQuery.param = function(a, traditional) {
        var prefix,
            s = [],
            add = function(key, value) {
                // If value is a function, invoke it and return its value
                value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };

        // Set traditional to true for jQuery <= 1.3.2 behavior.
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }

        // If an array was passed in, assume that it is an array of form elements.
        if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
            // Serialize the form elements
            jQuery.each(a, function() {
                add(this.name, this.value);
            });

        } else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }

        // Return the resulting serialization
        return s.join("&").replace(r20, "+");
    };

    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                    // Can add propHook for "elements" to filter or add form elements
                    var elements = jQuery.prop(this, "elements");
                    return elements ? jQuery.makeArray(elements) : this;
                })
                .filter(function() {
                    var type = this.type;
                    // Use .is(":disabled") so that fieldset[disabled] works
                    return this.name && !jQuery(this).is(":disabled") &&
                        rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
                        (this.checked || !rcheckableType.test(type));
                })
                .map(function(i, elem) {
                    var val = jQuery(this).val();

                    return val == null ?
                        null :
                        jQuery.isArray(val) ?
                        jQuery.map(val, function(val) {
                            return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                        }) : { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                }).get();
        }
    });


    // Create the request object
    // (This is still attached to ajaxSettings for backward compatibility)
    jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
        // Support: IE6+
        function() {

            // XHR cannot access local files, always use ActiveX for that case
            return !this.isLocal &&

                // Support: IE7-8
                // oldIE XHR does not support non-RFC2616 methods (#13240)
                // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
                // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
                // Although this check for six methods instead of eight
                // since IE also does not support "trace" and "connect"
                /^(get|post|head|put|delete|options)$/i.test(this.type) &&

                createStandardXHR() || createActiveXHR();
        } :
        // For all other browsers, use the standard XMLHttpRequest object
        createStandardXHR;

    var xhrId = 0,
        xhrCallbacks = {},
        xhrSupported = jQuery.ajaxSettings.xhr();

    // Support: IE<10
    // Open requests must be manually aborted on unload (#5280)
    if (window.ActiveXObject) {
        jQuery(window).on("unload", function() {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key](undefined, true);
            }
        });
    }

    // Determine support properties
    support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
    xhrSupported = support.ajax = !!xhrSupported;

    // Create transport if the browser can provide an xhr
    if (xhrSupported) {

        jQuery.ajaxTransport(function(options) {
            // Cross domain only allowed if supported through XMLHttpRequest
            if (!options.crossDomain || support.cors) {

                var callback;

                return {
                    send: function(headers, complete) {
                        var i,
                            xhr = options.xhr(),
                            id = ++xhrId;

                        // Open the socket
                        xhr.open(options.type, options.url, options.async, options.username, options.password);

                        // Apply custom fields if provided
                        if (options.xhrFields) {
                            for (i in options.xhrFields) {
                                xhr[i] = options.xhrFields[i];
                            }
                        }

                        // Override mime type if needed
                        if (options.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(options.mimeType);
                        }

                        // X-Requested-With header
                        // For cross-domain requests, seeing as conditions for a preflight are
                        // akin to a jigsaw puzzle, we simply never set it to be sure.
                        // (it can always be set on a per-request basis or even using ajaxSetup)
                        // For same-domain requests, won't change header if already provided.
                        if (!options.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }

                        // Set headers
                        for (i in headers) {
                            // Support: IE<9
                            // IE's ActiveXObject throws a 'Type Mismatch' exception when setting
                            // request header to a null-value.
                            //
                            // To keep consistent with other XHR implementations, cast the value
                            // to string and ignore `undefined`.
                            if (headers[i] !== undefined) {
                                xhr.setRequestHeader(i, headers[i] + "");
                            }
                        }

                        // Do send the request
                        // This may raise an exception which is actually
                        // handled in jQuery.ajax (so no try/catch here)
                        xhr.send((options.hasContent && options.data) || null);

                        // Listener
                        callback = function(_, isAbort) {
                            var status, statusText, responses;

                            // Was never called and is aborted or complete
                            if (callback && (isAbort || xhr.readyState === 4)) {
                                // Clean up
                                delete xhrCallbacks[id];
                                callback = undefined;
                                xhr.onreadystatechange = jQuery.noop;

                                // Abort manually if needed
                                if (isAbort) {
                                    if (xhr.readyState !== 4) {
                                        xhr.abort();
                                    }
                                } else {
                                    responses = {};
                                    status = xhr.status;

                                    // Support: IE<10
                                    // Accessing binary-data responseText throws an exception
                                    // (#11426)
                                    if (typeof xhr.responseText === "string") {
                                        responses.text = xhr.responseText;
                                    }

                                    // Firefox throws an exception when accessing
                                    // statusText for faulty cross-domain requests
                                    try {
                                        statusText = xhr.statusText;
                                    } catch (e) {
                                        // We normalize with Webkit giving an empty statusText
                                        statusText = "";
                                    }

                                    // Filter status for non standard behaviors

                                    // If the request is local and we have data: assume a success
                                    // (success with no data won't get notified, that's the best we
                                    // can do given current implementations)
                                    if (!status && options.isLocal && !options.crossDomain) {
                                        status = responses.text ? 200 : 404;
                                        // IE - #1450: sometimes returns 1223 when it should be 204
                                    } else if (status === 1223) {
                                        status = 204;
                                    }
                                }
                            }

                            // Call complete if needed
                            if (responses) {
                                complete(status, statusText, responses, xhr.getAllResponseHeaders());
                            }
                        };

                        if (!options.async) {
                            // if we're in sync mode we fire the callback
                            callback();
                        } else if (xhr.readyState === 4) {
                            // (IE6 & IE7) if it's in cache and has been
                            // retrieved directly we need to fire the callback
                            setTimeout(callback);
                        } else {
                            // Add to the list of active xhr callbacks
                            xhr.onreadystatechange = xhrCallbacks[id] = callback;
                        }
                    },

                    abort: function() {
                        if (callback) {
                            callback(undefined, true);
                        }
                    }
                };
            }
        });
    }

    // Functions to create xhrs
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }




    // Install script dataType
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });

    // Handle cache's special case and global
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false;
        }
    });

    // Bind script tag hack transport
    jQuery.ajaxTransport("script", function(s) {

        // This transport only deals with cross domain requests
        if (s.crossDomain) {

            var script,
                head = document.head || jQuery("head")[0] || document.documentElement;

            return {

                send: function(_, callback) {

                    script = document.createElement("script");

                    script.async = true;

                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset;
                    }

                    script.src = s.url;

                    // Attach handlers for all browsers
                    script.onload = script.onreadystatechange = function(_, isAbort) {

                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {

                            // Handle memory leak in IE
                            script.onload = script.onreadystatechange = null;

                            // Remove the script
                            if (script.parentNode) {
                                script.parentNode.removeChild(script);
                            }

                            // Dereference the script
                            script = null;

                            // Callback if not abort
                            if (!isAbort) {
                                callback(200, "success");
                            }
                        }
                    };

                    // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
                    // Use native DOM manipulation to avoid our domManip AJAX trickery
                    head.insertBefore(script, head.firstChild);
                },

                abort: function() {
                    if (script) {
                        script.onload(undefined, true);
                    }
                }
            };
        }
    });




    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;

    // Default jsonp settings
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
            this[callback] = true;
            return callback;
        }
    });

    // Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {

        var callbackName, overwritten, responseContainer,
            jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
                "url" :
                typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data"
            );

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if (jsonProp || s.dataTypes[0] === "jsonp") {

            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ?
                s.jsonpCallback() :
                s.jsonpCallback;

            // Insert callback into url or form data
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }

            // Use data converter to retrieve json after script execution
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };

            // force json dataType
            s.dataTypes[0] = "json";

            // Install callback
            overwritten = window[callbackName];
            window[callbackName] = function() {
                responseContainer = arguments;
            };

            // Clean-up function (fires after converters)
            jqXHR.always(function() {
                // Restore preexisting value
                window[callbackName] = overwritten;

                // Save back as free
                if (s[callbackName]) {
                    // make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // save the callback name for future use
                    oldCallbacks.push(callbackName);
                }

                // Call if it was a function and we have a response
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }

                responseContainer = overwritten = undefined;
            });

            // Delegate to script
            return "script";
        }
    });




    // data: string of html
    // context (optional): If specified, the fragment will be created in this context, defaults to document
    // keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || typeof data !== "string") {
            return null;
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }
        context = context || document;

        var parsed = rsingleTag.exec(data),
            scripts = !keepScripts && [];

        // Single tag
        if (parsed) {
            return [context.createElement(parsed[1])];
        }

        parsed = jQuery.buildFragment([data], context, scripts);

        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }

        return jQuery.merge([], parsed.childNodes);
    };


    // Keep a copy of the old load method
    var _load = jQuery.fn.load;

    /**
     * Load a url into a page
     */
    jQuery.fn.load = function(url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments);
        }

        var selector, response, type,
            self = this,
            off = url.indexOf(" ");

        if (off >= 0) {
            selector = jQuery.trim(url.slice(off, url.length));
            url = url.slice(0, off);
        }

        // If it's a function
        if (jQuery.isFunction(params)) {

            // We assume that it's the callback
            callback = params;
            params = undefined;

            // Otherwise, build a param string
        } else if (params && typeof params === "object") {
            type = "POST";
        }

        // If we have elements to modify, make the request
        if (self.length > 0) {
            jQuery.ajax({
                url: url,

                // if "type" variable is undefined, then "GET" method will be used
                type: type,
                dataType: "html",
                data: params
            }).done(function(responseText) {

                // Save response for use in complete callback
                response = arguments;

                self.html(selector ?

                    // If a selector was specified, locate the right elements in a dummy div
                    // Exclude scripts to avoid IE 'Permission Denied' errors
                    jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

                    // Otherwise use the full result
                    responseText);

            }).complete(callback && function(jqXHR, status) {
                self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
            });
        }

        return this;
    };




    jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };





    var docElem = window.document.documentElement;

    /**
     * Gets a window from an element
     */
    function getWindow(elem) {
        return jQuery.isWindow(elem) ?
            elem :
            elem.nodeType === 9 ?
            elem.defaultView || elem.parentWindow :
            false;
    }

    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
                position = jQuery.css(elem, "position"),
                curElem = jQuery(elem),
                props = {};

            // set position first, in-case top/left are set even on static elem
            if (position === "static") {
                elem.style.position = "relative";
            }

            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") &&
                jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;

            // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }

            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }

            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }

            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };

    jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) {
                return options === undefined ?
                    this :
                    this.each(function(i) {
                        jQuery.offset.setOffset(this, options, i);
                    });
            }

            var docElem, win,
                box = { top: 0, left: 0 },
                elem = this[0],
                doc = elem && elem.ownerDocument;

            if (!doc) {
                return;
            }

            docElem = doc.documentElement;

            // Make sure it's not a disconnected DOM node
            if (!jQuery.contains(docElem, elem)) {
                return box;
            }

            // If we don't have gBCR, just use 0,0 rather than error
            // BlackBerry 5, iOS 3 (original iPhone)
            if (typeof elem.getBoundingClientRect !== strundefined) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow(doc);
            return {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            };
        },

        position: function() {
            if (!this[0]) {
                return;
            }

            var offsetParent, offset,
                parentOffset = { top: 0, left: 0 },
                elem = this[0];

            // fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
            if (jQuery.css(elem, "position") === "fixed") {
                // we assume that getBoundingClientRect is available when computed position is fixed
                offset = elem.getBoundingClientRect();
            } else {
                // Get *real* offsetParent
                offsetParent = this.offsetParent();

                // Get correct offsets
                offset = this.offset();
                if (!jQuery.nodeName(offsetParent[0], "html")) {
                    parentOffset = offsetParent.offset();
                }

                // Add offsetParent borders
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
            }

            // Subtract parent offsets and element margins
            // note: when an element has margin: auto the offsetLeft and marginLeft
            // are the same in Safari causing offset.left to incorrectly be 0
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },

        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || docElem;

                while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || docElem;
            });
        }
    });

    // Create scrollLeft and scrollTop methods
    jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop) {
        var top = /Y/.test(prop);

        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);

                if (val === undefined) {
                    return win ? (prop in win) ? win[prop] :
                        win.document.documentElement[method] :
                        elem[method];
                }

                if (win) {
                    win.scrollTo(!top ? val : jQuery(win).scrollLeft(),
                        top ? val : jQuery(win).scrollTop()
                    );

                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length, null);
        };
    });

    // Add the top/left cssHooks using jQuery.fn.position
    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
    // getComputedStyle returns percent when specified for top/left/bottom/right
    // rather than make the css module depend on the offset module, we just check for it here
    jQuery.each(["top", "left"], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
            function(elem, computed) {
                if (computed) {
                    computed = curCSS(elem, prop);
                    // if curCSS returns percentage, fallback to offset
                    return rnumnonpx.test(computed) ?
                        jQuery(elem).position()[prop] + "px" :
                        computed;
                }
            }
        );
    });


    // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each({ Height: "height", Width: "width" }, function(name, type) {
        jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function(defaultExtra, funcName) {
            // margin is only for outerHeight, outerWidth
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

                return access(this, function(elem, type, value) {
                    var doc;

                    if (jQuery.isWindow(elem)) {
                        // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
                        // isn't a whole lot we can do. See pull request at this URL for discussion:
                        // https://github.com/jquery/jquery/pull/764
                        return elem.document.documentElement["client" + name];
                    }

                    // Get document width or height
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;

                        // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
                        // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
                        return Math.max(
                            elem.body["scroll" + name], doc["scroll" + name],
                            elem.body["offset" + name], doc["offset" + name],
                            doc["client" + name]
                        );
                    }

                    return value === undefined ?
                        // Get width or height on the element, requesting but not forcing parseFloat
                        jQuery.css(elem, type, extra) :

                        // Set width or height on the element
                        jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    });


    // The number of elements contained in the matched element set
    jQuery.fn.size = function() {
        return this.length;
    };

    jQuery.fn.andSelf = jQuery.fn.addBack;




    // Register as a named AMD module, since jQuery can be concatenated with other
    // files that may use define, but not via a proper concatenation script that
    // understands anonymous AMD modules. A named AMD is safest and most robust
    // way to register. Lowercase jquery is used because AMD module names are
    // derived from file names, and jQuery is normally delivered in a lowercase
    // file name. Do this after creating the global so that if an AMD module wants
    // to call noConflict to hide this version of jQuery, it will work.

    // Note that for maximum portability, libraries that are not jQuery should
    // declare themselves as anonymous modules, and avoid setting a global if an
    // AMD loader is present. jQuery is a special case. For more information, see
    // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

    if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
            return jQuery;
        });
    }




    var
    // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

        // Map over the $ in case of overwrite
        _$ = window.$;

    jQuery.noConflict = function(deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }

        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };

    // Expose jQuery and $ identifiers, even in
    // AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
    // and CommonJS for browser emulators (#13566)
    if (typeof noGlobal === strundefined) {
        window.jQuery = window.$ = jQuery;
    }




    return jQuery;

}));
(function($, undefined) {

    /**
     * Unobtrusive scripting adapter for jQuery
     * https://github.com/rails/jquery-ujs
     *
     * Requires jQuery 1.8.0 or later.
     *
     * Released under the MIT license
     *
     */

    // Cut down on the number of issues from people inadvertently including jquery_ujs twice
    // by detecting and raising an error when it happens.
    if ($.rails !== undefined) {
        $.error('jquery-ujs has already been loaded!');
    }

    // Shorthand to make it a little easier to call public rails functions from within rails.js
    var rails;
    var $document = $(document);

    $.rails = rails = {
        // Link elements bound by jquery-ujs
        linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

        // Button elements bound by jquery-ujs
        buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

        // Select elements bound by jquery-ujs
        inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

        // Form elements bound by jquery-ujs
        formSubmitSelector: 'form',

        // Form input elements bound by jquery-ujs
        formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

        // Form input elements disabled during form submission
        disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

        // Form input elements re-enabled after form submission
        enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

        // Form required input elements
        requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

        // Form file input elements
        fileInputSelector: 'input[type=file]',

        // Link onClick disable selector with possible reenable after remote submission
        linkDisableSelector: 'a[data-disable-with], a[data-disable]',

        // Button onClick disable selector with possible reenable after remote submission
        buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

        // Make sure that every Ajax request sends the CSRF token
        CSRFProtection: function(xhr) {
            var token = $('meta[name="csrf-token"]').attr('content');
            if (token) xhr.setRequestHeader('X-CSRF-Token', token);
        },

        // making sure that all forms have actual up-to-date token(cached forms contain old one)
        refreshCSRFTokens: function() {
            var csrfToken = $('meta[name=csrf-token]').attr('content');
            var csrfParam = $('meta[name=csrf-param]').attr('content');
            $('form input[name="' + csrfParam + '"]').val(csrfToken);
        },

        // Triggers an event on an element and returns false if the event result is false
        fire: function(obj, name, data) {
            var event = $.Event(name);
            obj.trigger(event, data);
            return event.result !== false;
        },

        // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
        confirm: function(message) {
            return confirm(message);
        },

        // Default ajax function, may be overridden with custom function in $.rails.ajax
        ajax: function(options) {
            return $.ajax(options);
        },

        // Default way to get an element's href. May be overridden at $.rails.href.
        href: function(element) {
            return element[0].href;
        },

        // Submits "remote" forms and links with ajax
        handleRemote: function(element) {
            var method, url, data, withCredentials, dataType, options;

            if (rails.fire(element, 'ajax:before')) {
                withCredentials = element.data('with-credentials') || null;
                dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

                if (element.is('form')) {
                    method = element.attr('method');
                    url = element.attr('action');
                    data = element.serializeArray();
                    // memoized value from clicked submit button
                    var button = element.data('ujs:submit-button');
                    if (button) {
                        data.push(button);
                        element.data('ujs:submit-button', null);
                    }
                } else if (element.is(rails.inputChangeSelector)) {
                    method = element.data('method');
                    url = element.data('url');
                    data = element.serialize();
                    if (element.data('params')) data = data + "&" + element.data('params');
                } else if (element.is(rails.buttonClickSelector)) {
                    method = element.data('method') || 'get';
                    url = element.data('url');
                    data = element.serialize();
                    if (element.data('params')) data = data + "&" + element.data('params');
                } else {
                    method = element.data('method');
                    url = rails.href(element);
                    data = element.data('params') || null;
                }

                options = {
                    type: method || 'GET',
                    data: data,
                    dataType: dataType,
                    // stopping the "ajax:beforeSend" event will cancel the ajax request
                    beforeSend: function(xhr, settings) {
                        if (settings.dataType === undefined) {
                            xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
                        }
                        if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
                            element.trigger('ajax:send', xhr);
                        } else {
                            return false;
                        }
                    },
                    success: function(data, status, xhr) {
                        element.trigger('ajax:success', [data, status, xhr]);
                    },
                    complete: function(xhr, status) {
                        element.trigger('ajax:complete', [xhr, status]);
                    },
                    error: function(xhr, status, error) {
                        element.trigger('ajax:error', [xhr, status, error]);
                    },
                    crossDomain: rails.isCrossDomain(url)
                };

                // There is no withCredentials for IE6-8 when
                // "Enable native XMLHTTP support" is disabled
                if (withCredentials) {
                    options.xhrFields = {
                        withCredentials: withCredentials
                    };
                }

                // Only pass url to `ajax` options if not blank
                if (url) { options.url = url; }

                return rails.ajax(options);
            } else {
                return false;
            }
        },

        // Determines if the request is a cross domain request.
        isCrossDomain: function(url) {
            var originAnchor = document.createElement("a");
            originAnchor.href = location.href;
            var urlAnchor = document.createElement("a");

            try {
                urlAnchor.href = url;
                // This is a workaround to a IE bug.
                urlAnchor.href = urlAnchor.href;

                // Make sure that the browser parses the URL and that the protocols and hosts match.
                return !urlAnchor.protocol || !urlAnchor.host ||
                    (originAnchor.protocol + "//" + originAnchor.host !==
                        urlAnchor.protocol + "//" + urlAnchor.host);
            } catch (e) {
                // If there is an error parsing the URL, assume it is crossDomain.
                return true;
            }
        },

        // Handles "data-method" on links such as:
        // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
        handleMethod: function(link) {
            var href = rails.href(link),
                method = link.data('method'),
                target = link.attr('target'),
                csrfToken = $('meta[name=csrf-token]').attr('content'),
                csrfParam = $('meta[name=csrf-param]').attr('content'),
                form = $('<form method="post" action="' + href + '"></form>'),
                metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

            if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
                metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
            }

            if (target) { form.attr('target', target); }

            form.hide().append(metadataInput).appendTo('body');
            form.submit();
        },

        // Helper function that returns form elements that match the specified CSS selector
        // If form is actually a "form" element this will return associated elements outside the from that have
        // the html form attribute set
        formElements: function(form, selector) {
            return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
        },

        /* Disables form elements:
          - Caches element value in 'ujs:enable-with' data store
          - Replaces element text with value of 'data-disable-with' attribute
          - Sets disabled property to true
        */
        disableFormElements: function(form) {
            rails.formElements(form, rails.disableSelector).each(function() {
                rails.disableFormElement($(this));
            });
        },

        disableFormElement: function(element) {
            var method, replacement;

            method = element.is('button') ? 'html' : 'val';
            replacement = element.data('disable-with');

            element.data('ujs:enable-with', element[method]());
            if (replacement !== undefined) {
                element[method](replacement);
            }

            element.prop('disabled', true);
        },

        /* Re-enables disabled form elements:
          - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
          - Sets disabled property to false
        */
        enableFormElements: function(form) {
            rails.formElements(form, rails.enableSelector).each(function() {
                rails.enableFormElement($(this));
            });
        },

        enableFormElement: function(element) {
            var method = element.is('button') ? 'html' : 'val';
            if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
            element.prop('disabled', false);
        },

        /* For 'data-confirm' attribute:
           - Fires `confirm` event
           - Shows the confirmation dialog
           - Fires the `confirm:complete` event

           Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
           Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
           Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
           return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
        */
        allowAction: function(element) {
            var message = element.data('confirm'),
                answer = false,
                callback;
            if (!message) { return true; }

            if (rails.fire(element, 'confirm')) {
                answer = rails.confirm(message);
                callback = rails.fire(element, 'confirm:complete', [answer]);
            }
            return answer && callback;
        },

        // Helper function which checks for blank inputs in a form that match the specified CSS selector
        blankInputs: function(form, specifiedSelector, nonBlank) {
            var inputs = $(),
                input, valueToCheck,
                selector = specifiedSelector || 'input,textarea',
                allInputs = form.find(selector);

            allInputs.each(function() {
                input = $(this);
                valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
                // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
                if (!valueToCheck === !nonBlank) {

                    // Don't count unchecked required radio if other radio with same name is checked
                    if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
                        return true; // Skip to next input
                    }

                    inputs = inputs.add(input);
                }
            });
            return inputs.length ? inputs : false;
        },

        // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
        nonBlankInputs: function(form, specifiedSelector) {
            return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
        },

        // Helper function, needed to provide consistent behavior in IE
        stopEverything: function(e) {
            $(e.target).trigger('ujs:everythingStopped');
            e.stopImmediatePropagation();
            return false;
        },

        //  replace element's html with the 'data-disable-with' after storing original html
        //  and prevent clicking on it
        disableElement: function(element) {
            var replacement = element.data('disable-with');

            element.data('ujs:enable-with', element.html()); // store enabled state
            if (replacement !== undefined) {
                element.html(replacement);
            }

            element.bind('click.railsDisable', function(e) { // prevent further clicking
                return rails.stopEverything(e);
            });
        },

        // restore element to its original state which was disabled by 'disableElement' above
        enableElement: function(element) {
            if (element.data('ujs:enable-with') !== undefined) {
                element.html(element.data('ujs:enable-with')); // set to old enabled state
                element.removeData('ujs:enable-with'); // clean up cache
            }
            element.unbind('click.railsDisable'); // enable element
        }
    };

    if (rails.fire($document, 'rails:attachBindings')) {

        $.ajaxPrefilter(function(options, originalOptions, xhr) { if (!options.crossDomain) { rails.CSRFProtection(xhr); } });

        $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
            rails.enableElement($(this));
        });

        $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
            rails.enableFormElement($(this));
        });

        $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
            var link = $(this),
                method = link.data('method'),
                data = link.data('params'),
                metaClick = e.metaKey || e.ctrlKey;
            if (!rails.allowAction(link)) return rails.stopEverything(e);

            if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

            if (link.data('remote') !== undefined) {
                if (metaClick && (!method || method === 'GET') && !data) { return true; }

                var handleRemote = rails.handleRemote(link);
                // response from rails.handleRemote() will either be false or a deferred object promise.
                if (handleRemote === false) {
                    rails.enableElement(link);
                } else {
                    handleRemote.error(function() { rails.enableElement(link); });
                }
                return false;

            } else if (link.data('method')) {
                rails.handleMethod(link);
                return false;
            }
        });

        $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
            var button = $(this);

            if (!rails.allowAction(button)) return rails.stopEverything(e);

            if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

            var handleRemote = rails.handleRemote(button);
            // response from rails.handleRemote() will either be false or a deferred object promise.
            if (handleRemote === false) {
                rails.enableFormElement(button);
            } else {
                handleRemote.error(function() { rails.enableFormElement(button); });
            }
            return false;
        });

        $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
            var link = $(this);
            if (!rails.allowAction(link)) return rails.stopEverything(e);

            rails.handleRemote(link);
            return false;
        });

        $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
            var form = $(this),
                remote = form.data('remote') !== undefined,
                blankRequiredInputs,
                nonBlankFileInputs;

            if (!rails.allowAction(form)) return rails.stopEverything(e);

            // skip other logic when required values are missing or file upload is present
            if (form.attr('novalidate') == undefined) {
                blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
                if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
                    return rails.stopEverything(e);
                }
            }

            if (remote) {
                nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
                if (nonBlankFileInputs) {
                    // slight timeout so that the submit button gets properly serialized
                    // (make it easy for event handler to serialize form without disabled values)
                    setTimeout(function() { rails.disableFormElements(form); }, 13);
                    var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

                    // re-enable form elements if event bindings return false (canceling normal form submission)
                    if (!aborted) { setTimeout(function() { rails.enableFormElements(form); }, 13); }

                    return aborted;
                }

                rails.handleRemote(form);
                return false;

            } else {
                // slight timeout so that the submit button gets properly serialized
                setTimeout(function() { rails.disableFormElements(form); }, 13);
            }
        });

        $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
            var button = $(this);

            if (!rails.allowAction(button)) return rails.stopEverything(event);

            // register the pressed submit button
            var name = button.attr('name'),
                data = name ? { name: name, value: button.val() } : null;

            button.closest('form').data('ujs:submit-button', data);
        });

        $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
            if (this == event.target) rails.disableFormElements($(this));
        });

        $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
            if (this == event.target) rails.enableFormElements($(this));
        });

        $(function() {
            rails.refreshCSRFTokens();
        });
    }

})(jQuery);
/*
 *  Sugar Library v1.4.0
 *
 *  Freely distributable and licensed under the MIT-style license.
 *  Copyright (c) 2013 Andrew Plummer
 *  http://sugarjs.com/
 *
 * ---------------------------- */

(function() {
    function aa(a) { return function() { return a } }
    var l = Object,
        p = Array,
        q = RegExp,
        r = Date,
        s = String,
        t = Number,
        u = Math,
        ba = "undefined" !== typeof global ? global : this,
        v = l.prototype.toString,
        da = l.prototype.hasOwnProperty,
        ea = l.defineProperty && l.defineProperties,
        fa = "function" === typeof q(),
        ga = !("0" in new s("a")),
        ia = {},
        ja = /^\[object Date|Array|String|Number|RegExp|Boolean|Arguments\]$/,
        w = "Boolean Number String Array Date RegExp Function".split(" "),
        la = ka("boolean", w[0]),
        x = ka("number", w[1]),
        y = ka("string", w[2]),
        A = ma(w[3]),
        C = ma(w[4]),
        D = ma(w[5]),
        F = ma(w[6]);

    function ma(a) { var b = "Array" === a && p.isArray || function(b, d) { return (d || v.call(b)) === "[object " + a + "]" }; return ia[a] = b }

    function ka(a, b) {
        function c(c) { return G(c) ? v.call(c) === "[object " + b + "]" : typeof c === a }
        return ia[b] = c
    }

    function na(a) { a.SugarMethods || (oa(a, "SugarMethods", {}), H(a, !1, !0, { extend: function(b, c, d) { H(a, !1 !== d, c, b) }, sugarRestore: function() { return pa(this, a, arguments, function(a, c, d) { oa(a, c, d.method) }) }, sugarRevert: function() { return pa(this, a, arguments, function(a, c, d) { d.existed ? oa(a, c, d.original) : delete a[c] }) } })) }

    function H(a, b, c, d) {
        var e = b ? a.prototype : a;
        na(a);
        I(d, function(d, f) {
            var h = e[d],
                m = J(e, d);
            F(c) && h && (f = qa(h, f, c));
            !1 === c && h || oa(e, d, f);
            a.SugarMethods[d] = { method: f, existed: m, original: h, instance: b }
        })
    }

    function K(a, b, c, d, e) {
        var g = {};
        d = y(d) ? d.split(",") : d;
        d.forEach(function(a, b) { e(g, a, b) });
        H(a, b, c, g)
    }

    function pa(a, b, c, d) {
        var e = 0 === c.length,
            g = L(c),
            f = !1;
        I(b.SugarMethods, function(b, c) { if (e || -1 !== g.indexOf(b)) f = !0, d(c.instance ? a.prototype : a, b, c) });
        return f
    }

    function qa(a, b, c) { return function(d) { return c.apply(this, arguments) ? b.apply(this, arguments) : a.apply(this, arguments) } }

    function oa(a, b, c) { ea ? l.defineProperty(a, b, { value: c, configurable: !0, enumerable: !1, writable: !0 }) : a[b] = c }

    function L(a, b, c) {
        var d = [];
        c = c || 0;
        var e;
        for (e = a.length; c < e; c++) d.push(a[c]), b && b.call(a, a[c], c);
        return d
    }

    function sa(a, b, c) {
        var d = a[c || 0];
        A(d) && (a = d, c = 0);
        L(a, b, c)
    }

    function ta(a) { if (!a || !a.call) throw new TypeError("Callback is not callable"); }

    function M(a) { return void 0 !== a }

    function N(a) { return void 0 === a }

    function J(a, b) { return !!a && da.call(a, b) }

    function G(a) { return !!a && ("object" === typeof a || fa && D(a)) }

    function ua(a) { var b = typeof a; return null == a || "string" === b || "number" === b || "boolean" === b }

    function va(a, b) { b = b || v.call(a); try { if (a && a.constructor && !J(a, "constructor") && !J(a.constructor.prototype, "isPrototypeOf")) return !1 } catch (c) { return !1 } return !!a && "[object Object]" === b && "hasOwnProperty" in a }

    function I(a, b) {
        for (var c in a)
            if (J(a, c) && !1 === b.call(a, c, a[c], a)) break
    }

    function wa(a, b) { for (var c = 0; c < a; c++) b(c) }

    function xa(a, b) { I(b, function(c) { a[c] = b[c] }); return a }

    function ya(a) {
        ua(a) && (a = l(a));
        if (ga && y(a))
            for (var b = a, c = 0, d; d = b.charAt(c);) b[c++] = d;
        return a
    }

    function O(a) { xa(this, ya(a)) }
    O.prototype.constructor = l;
    var P = u.abs,
        za = u.pow,
        Aa = u.ceil,
        Q = u.floor,
        R = u.round,
        Ca = u.min,
        S = u.max;

    function Da(a, b, c) {
        var d = za(10, P(b || 0));
        c = c || R;
        0 > b && (d = 1 / d);
        return c(a * d) / d
    }
    var Ea = 48,
        Fa = 57,
        Ga = 65296,
        Ha = 65305,
        Ia = ".",
        Ja = "",
        Ka = {},
        La;

    function Ma() { return "\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u2028\u2029\u3000\ufeff" }

    function Na(a, b) {
        var c = "";
        for (a = a.toString(); 0 < b;)
            if (b & 1 && (c += a), b >>= 1) a += a;
        return c
    }

    function Oa(a, b) {
        var c, d;
        c = a.replace(La, function(a) {
            a = Ka[a];
            a === Ia && (d = !0);
            return a
        });
        return d ? parseFloat(c) : parseInt(c, b || 10)
    }

    function T(a, b, c, d) {
        d = P(a).toString(d || 10);
        d = Na("0", b - d.replace(/\.\d+/, "").length) + d;
        if (c || 0 > a) d = (0 > a ? "-" : "+") + d;
        return d
    }

    function Pa(a) {
        if (11 <= a && 13 >= a) return "th";
        switch (a % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th"
        }
    }

    function Qa(a, b) {
        function c(a, c) { if (a || -1 < b.indexOf(c)) d += c }
        var d = "";
        b = b || "";
        c(a.multiline, "m");
        c(a.ignoreCase, "i");
        c(a.global, "g");
        c(a.u, "y");
        return d
    }

    function Ra(a) { y(a) || (a = s(a)); return a.replace(/([\\/\'*+?|()\[\]{}.^$])/g, "\\$1") }

    function U(a, b) { return a["get" + (a._utc ? "UTC" : "") + b]() }

    function Sa(a, b, c) { return a["set" + (a._utc && "ISOWeek" != b ? "UTC" : "") + b](c) }

    function Ta(a, b) {
        var c = typeof a,
            d, e, g, f, h, m, n;
        if ("string" === c) return a;
        g = v.call(a);
        d = va(a, g);
        e = A(a, g);
        if (null != a && d || e) {
            b || (b = []);
            if (1 < b.length)
                for (m = b.length; m--;)
                    if (b[m] === a) return "CYC";
            b.push(a);
            d = a.valueOf() + s(a.constructor);
            f = e ? a : l.keys(a).sort();
            m = 0;
            for (n = f.length; m < n; m++) h = e ? m : f[m], d += h + Ta(a[h], b);
            b.pop()
        } else d = -Infinity === 1 / a ? "-0" : s(a && a.valueOf ? a.valueOf() : a);
        return c + g + d
    }

    function Ua(a, b) { return a === b ? 0 !== a || 1 / a === 1 / b : Va(a) && Va(b) ? Ta(a) === Ta(b) : !1 }

    function Va(a) { var b = v.call(a); return ja.test(b) || va(a, b) }

    function Wa(a, b, c) {
        var d, e = a.length,
            g = b.length,
            f = !1 !== b[g - 1];
        if (!(g > (f ? 1 : 2))) return Xa(a, e, b[0], f, c);
        d = [];
        L(b, function(b) {
            if (la(b)) return !1;
            d.push(Xa(a, e, b, f, c))
        });
        return d
    }

    function Xa(a, b, c, d, e) { d && (c %= b, 0 > c && (c = b + c)); return e ? a.charAt(c) : a[c] }

    function Ya(a, b) { K(b, !0, !1, a, function(a, b) { a[b + ("equal" === b ? "s" : "")] = function() { return l[b].apply(null, [this].concat(L(arguments))) } }) }
    na(l);
    I(w, function(a, b) { na(ba[b]) });
    var Za, $a;
    for ($a = 0; 9 >= $a; $a++) Za = s.fromCharCode($a + Ga), Ja += Za, Ka[Za] = s.fromCharCode($a + Ea);
    Ka[","] = "";
    Ka["\uff0e"] = Ia;
    Ka[Ia] = Ia;
    La = q("[" + Ja + "\uff0e," + Ia + "]", "g");
    "use strict";
    H(l, !1, !1, {
        keys: function(a) {
            var b = [];
            if (!G(a) && !D(a) && !F(a)) throw new TypeError("Object required");
            I(a, function(a) { b.push(a) });
            return b
        }
    });

    function ab(a, b, c, d) {
        var e = a.length,
            g = -1 == d,
            f = g ? e - 1 : 0;
        c = isNaN(c) ? f : parseInt(c >> 0);
        0 > c && (c = e + c);
        if (!g && 0 > c || g && c >= e) c = f;
        for (; g && 0 <= c || !g && c < e;) {
            if (a[c] === b) return c;
            c += d
        }
        return -1
    }

    function bb(a, b, c, d) {
        var e = a.length,
            g = 0,
            f = M(c);
        ta(b);
        if (0 != e || f) f || (c = a[d ? e - 1 : g], g++);
        else throw new TypeError("Reduce called on empty array with no initial value");
        for (; g < e;) f = d ? e - g - 1 : g, f in a && (c = b(c, a[f], f, a)), g++;
        return c
    }

    function cb(a) { if (0 === a.length) throw new TypeError("First argument must be defined"); }
    H(p, !1, !1, { isArray: function(a) { return A(a) } });
    H(p, !0, !1, {
        every: function(a, b) {
            var c = this.length,
                d = 0;
            for (cb(arguments); d < c;) {
                if (d in this && !a.call(b, this[d], d, this)) return !1;
                d++
            }
            return !0
        },
        some: function(a, b) {
            var c = this.length,
                d = 0;
            for (cb(arguments); d < c;) {
                if (d in this && a.call(b, this[d], d, this)) return !0;
                d++
            }
            return !1
        },
        map: function(a, b) {
            b = arguments[1];
            var c = this.length,
                d = 0,
                e = Array(c);
            for (cb(arguments); d < c;) d in this && (e[d] = a.call(b, this[d], d, this)), d++;
            return e
        },
        filter: function(a) {
            var b = arguments[1],
                c = this.length,
                d = 0,
                e = [];
            for (cb(arguments); d < c;) d in
                this && a.call(b, this[d], d, this) && e.push(this[d]), d++;
            return e
        },
        indexOf: function(a, b) { return y(this) ? this.indexOf(a, b) : ab(this, a, b, 1) },
        lastIndexOf: function(a, b) { return y(this) ? this.lastIndexOf(a, b) : ab(this, a, b, -1) },
        forEach: function(a, b) {
            var c = this.length,
                d = 0;
            for (ta(a); d < c;) d in this && a.call(b, this[d], d, this), d++
        },
        reduce: function(a, b) { return bb(this, a, b) },
        reduceRight: function(a, b) { return bb(this, a, b, !0) }
    });
    H(Function, !0, !1, {
        bind: function(a) {
            var b = this,
                c = L(arguments, null, 1),
                d;
            if (!F(this)) throw new TypeError("Function.prototype.bind called on a non-function");
            d = function() { return b.apply(b.prototype && this instanceof b ? this : a, c.concat(L(arguments))) };
            d.prototype = this.prototype;
            return d
        }
    });
    H(r, !1, !1, { now: function() { return (new r).getTime() } });
    (function() {
        var a = Ma().match(/^\s+$/);
        try { s.prototype.trim.call([1]) } catch (b) { a = !1 }
        H(s, !0, !a, { trim: function() { return this.toString().trimLeft().trimRight() }, trimLeft: function() { return this.replace(q("^[" + Ma() + "]+"), "") }, trimRight: function() { return this.replace(q("[" + Ma() + "]+$"), "") } })
    })();
    (function() {
        var a = new r(r.UTC(1999, 11, 31)),
            a = a.toISOString && "1999-12-31T00:00:00.000Z" === a.toISOString();
        K(r, !0, !a, "toISOString,toJSON", function(a, c) { a[c] = function() { return T(this.getUTCFullYear(), 4) + "-" + T(this.getUTCMonth() + 1, 2) + "-" + T(this.getUTCDate(), 2) + "T" + T(this.getUTCHours(), 2) + ":" + T(this.getUTCMinutes(), 2) + ":" + T(this.getUTCSeconds(), 2) + "." + T(this.getUTCMilliseconds(), 3) + "Z" } })
    })();
    "use strict";

    function db(a) { a = q(a); return function(b) { return a.test(b) } }

    function eb(a) { var b = a.getTime(); return function(a) { return !(!a || !a.getTime) && a.getTime() === b } }

    function fb(a) { return function(b, c, d) { return b === a || a.call(this, b, c, d) } }

    function gb(a) { return function(b, c, d) { return b === a || a.call(d, c, b, d) } }

    function hb(a, b) {
        var c = {};
        return function(d, e, g) {
            var f;
            if (!G(d)) return !1;
            for (f in a)
                if (c[f] = c[f] || ib(a[f], b), !1 === c[f].call(g, d[f], e, g)) return !1;
            return !0
        }
    }

    function jb(a) { return function(b) { return b === a || Ua(b, a) } }

    function ib(a, b) { if (!ua(a)) { if (D(a)) return db(a); if (C(a)) return eb(a); if (F(a)) return b ? gb(a) : fb(a); if (va(a)) return hb(a, b) } return jb(a) }

    function kb(a, b, c, d) { return b ? b.apply ? b.apply(c, d || []) : F(a[b]) ? a[b].call(a) : a[b] : a }

    function V(a, b, c, d) {
        var e = +a.length;
        0 > c && (c = a.length + c);
        c = isNaN(c) ? 0 : c;
        for (!0 === d && (e += c); c < e;) {
            d = c % a.length;
            if (!(d in a)) { lb(a, b, c); break }
            if (!1 === b.call(a, a[d], d, a)) break;
            c++
        }
    }

    function lb(a, b, c) {
        var d = [],
            e;
        for (e in a) e in a && (e >>> 0 == e && 4294967295 != e) && e >= c && d.push(parseInt(e));
        d.sort().each(function(c) { return b.call(a, a[c], c, a) })
    }

    function mb(a, b, c, d, e, g) {
        var f, h, m;
        0 < a.length && (m = ib(b), V(a, function(b, c) { if (m.call(g, b, c, a)) return f = b, h = c, !1 }, c, d));
        return e ? h : f
    }

    function nb(a, b) {
        var c = [],
            d = {},
            e;
        V(a, function(g, f) {
            e = b ? kb(g, b, a, [g, f, a]) : g;
            ob(d, e) || c.push(g)
        });
        return c
    }

    function pb(a, b, c) {
        var d = [],
            e = {};
        b.each(function(a) { ob(e, a) });
        a.each(function(a) {
            var b = Ta(a),
                h = !Va(a);
            if (qb(e, b, a, h) !== c) {
                var m = 0;
                if (h)
                    for (b = e[b]; m < b.length;) b[m] === a ? b.splice(m, 1) : m += 1;
                else delete e[b];
                d.push(a)
            }
        });
        return d
    }

    function rb(a, b, c) {
        b = b || Infinity;
        c = c || 0;
        var d = [];
        V(a, function(a) { A(a) && c < b ? d = d.concat(rb(a, b, c + 1)) : d.push(a) });
        return d
    }

    function sb(a) {
        var b = [];
        L(a, function(a) { b = b.concat(a) });
        return b
    }

    function qb(a, b, c, d) {
        var e = b in a;
        d && (a[b] || (a[b] = []), e = -1 !== a[b].indexOf(c));
        return e
    }

    function ob(a, b) {
        var c = Ta(b),
            d = !Va(b),
            e = qb(a, c, b, d);
        d ? a[c].push(b) : a[c] = b;
        return e
    }

    function tb(a, b, c, d) {
        var e, g, f, h = [],
            m = "max" === c,
            n = "min" === c,
            z = p.isArray(a);
        for (e in a)
            if (a.hasOwnProperty(e)) {
                c = a[e];
                f = kb(c, b, a, z ? [c, parseInt(e), a] : []);
                if (N(f)) throw new TypeError("Cannot compare with undefined");
                if (f === g) h.push(c);
                else if (N(g) || m && f > g || n && f < g) h = [c], g = f
            }
        z || (h = rb(h, 1));
        return d ? h : h[0]
    }

    function ub(a, b) {
        var c, d, e, g, f = 0,
            h = 0;
        c = p[xb];
        d = p[yb];
        var m = p[zb],
            n = p[Ab],
            z = p[Bb];
        a = Cb(a, c, d);
        b = Cb(b, c, d);
        do c = a.charAt(f), e = m[c] || c, c = b.charAt(f), g = m[c] || c, c = e ? n.indexOf(e) : null, d = g ? n.indexOf(g) : null, -1 === c || -1 === d ? (c = a.charCodeAt(f) || null, d = b.charCodeAt(f) || null, z && ((c >= Ea && c <= Fa || c >= Ga && c <= Ha) && (d >= Ea && d <= Fa || d >= Ga && d <= Ha)) && (c = Oa(a.slice(f)), d = Oa(b.slice(f)))) : (e = e !== a.charAt(f), g = g !== b.charAt(f), e !== g && 0 === h && (h = e - g)), f += 1; while (null != c && null != d && c === d);
        return c === d ? h : c - d
    }

    function Cb(a, b, c) {
        y(a) || (a = s(a));
        c && (a = a.toLowerCase());
        b && (a = a.replace(b, ""));
        return a
    }
    var Ab = "AlphanumericSortOrder",
        xb = "AlphanumericSortIgnore",
        yb = "AlphanumericSortIgnoreCase",
        zb = "AlphanumericSortEquivalents",
        Bb = "AlphanumericSortNatural";
    H(p, !1, !0, {
        create: function() {
            var a = [];
            L(arguments, function(b) {
                if (!ua(b) && "length" in b && ("[object Arguments]" === v.call(b) || b.callee) || !ua(b) && "length" in b && !y(b) && !va(b)) b = p.prototype.slice.call(b, 0);
                a = a.concat(b)
            });
            return a
        }
    });
    H(p, !0, !1, {
        find: function(a, b) { ta(a); return mb(this, a, 0, !1, !1, b) },
        findIndex: function(a, b) {
            var c;
            ta(a);
            c = mb(this, a, 0, !1, !0, b);
            return N(c) ? -1 : c
        }
    });
    H(p, !0, !0, {
        findFrom: function(a, b, c) { return mb(this, a, b, c) },
        findIndexFrom: function(a, b, c) { b = mb(this, a, b, c, !0); return N(b) ? -1 : b },
        findAll: function(a, b, c) {
            var d = [],
                e;
            0 < this.length && (e = ib(a), V(this, function(a, b, c) { e(a, b, c) && d.push(a) }, b, c));
            return d
        },
        count: function(a) { return N(a) ? this.length : this.findAll(a).length },
        removeAt: function(a, b) {
            if (N(a)) return this;
            N(b) && (b = a);
            this.splice(a, b - a + 1);
            return this
        },
        include: function(a, b) { return this.clone().add(a, b) },
        exclude: function() {
            return p.prototype.remove.apply(this.clone(),
                arguments)
        },
        clone: function() { return xa([], this) },
        unique: function(a) { return nb(this, a) },
        flatten: function(a) { return rb(this, a) },
        union: function() { return nb(this.concat(sb(arguments))) },
        intersect: function() { return pb(this, sb(arguments), !1) },
        subtract: function(a) { return pb(this, sb(arguments), !0) },
        at: function() { return Wa(this, arguments) },
        first: function(a) {
            if (N(a)) return this[0];
            0 > a && (a = 0);
            return this.slice(0, a)
        },
        last: function(a) { return N(a) ? this[this.length - 1] : this.slice(0 > this.length - a ? 0 : this.length - a) },
        from: function(a) { return this.slice(a) },
        to: function(a) { N(a) && (a = this.length); return this.slice(0, a) },
        min: function(a, b) { return tb(this, a, "min", b) },
        max: function(a, b) { return tb(this, a, "max", b) },
        least: function(a, b) { return tb(this.groupBy.apply(this, [a]), "length", "min", b) },
        most: function(a, b) { return tb(this.groupBy.apply(this, [a]), "length", "max", b) },
        sum: function(a) { a = a ? this.map(a) : this; return 0 < a.length ? a.reduce(function(a, c) { return a + c }) : 0 },
        average: function(a) {
            a = a ? this.map(a) : this;
            return 0 < a.length ? a.sum() /
                a.length : 0
        },
        inGroups: function(a, b) {
            var c = 1 < arguments.length,
                d = this,
                e = [],
                g = Aa(this.length / a);
            wa(a, function(a) {
                a *= g;
                var h = d.slice(a, a + g);
                c && h.length < g && wa(g - h.length, function() { h = h.add(b) });
                e.push(h)
            });
            return e
        },
        inGroupsOf: function(a, b) {
            var c = [],
                d = this.length,
                e = this,
                g;
            if (0 === d || 0 === a) return e;
            N(a) && (a = 1);
            N(b) && (b = null);
            wa(Aa(d / a), function(d) {
                for (g = e.slice(a * d, a * d + a); g.length < a;) g.push(b);
                c.push(g)
            });
            return c
        },
        isEmpty: function() { return 0 == this.compact().length },
        sortBy: function(a, b) {
            var c = this.clone();
            c.sort(function(d, e) {
                var g, f;
                g = kb(d, a, c, [d]);
                f = kb(e, a, c, [e]);
                return (y(g) && y(f) ? ub(g, f) : g < f ? -1 : g > f ? 1 : 0) * (b ? -1 : 1)
            });
            return c
        },
        randomize: function() { for (var a = this.concat(), b = a.length, c, d; b;) c = u.random() * b | 0, d = a[--b], a[b] = a[c], a[c] = d; return a },
        zip: function() { var a = L(arguments); return this.map(function(b, c) { return [b].concat(a.map(function(a) { return c in a ? a[c] : null })) }) },
        sample: function(a) { var b = this.randomize(); return 0 < arguments.length ? b.slice(0, a) : b[0] },
        each: function(a, b, c) { V(this, a, b, c); return this },
        add: function(a, b) {
            if (!x(t(b)) || isNaN(b)) b = this.length;
            p.prototype.splice.apply(this, [b, 0].concat(a));
            return this
        },
        remove: function() {
            var a = this;
            L(arguments, function(b) { var c = 0; for (b = ib(b); c < a.length;) b(a[c], c, a) ? a.splice(c, 1) : c++ });
            return a
        },
        compact: function(a) {
            var b = [];
            V(this, function(c) { A(c) ? b.push(c.compact()) : a && c ? b.push(c) : a || (null == c || c.valueOf() !== c.valueOf()) || b.push(c) });
            return b
        },
        groupBy: function(a, b) {
            var c = this,
                d = {},
                e;
            V(c, function(b, f) {
                e = kb(b, a, c, [b, f, c]);
                d[e] || (d[e] = []);
                d[e].push(b)
            });
            b && I(d, b);
            return d
        },
        none: function() { return !this.any.apply(this, arguments) }
    });
    H(p, !0, !0, { all: p.prototype.every, any: p.prototype.some, insert: p.prototype.add });

    function Db(a, b) {
        K(l, !1, !0, a, function(a, d) {
            a[d] = function(a, c, f) {
                var h = l.keys(ya(a)),
                    m;
                b || (m = ib(c, !0));
                f = p.prototype[d].call(h, function(d) { var f = a[d]; return b ? kb(f, c, a, [d, f, a]) : m(f, d, a) }, f);
                A(f) && (f = f.reduce(function(b, c) { b[c] = a[c]; return b }, {}));
                return f
            }
        });
        Ya(a, O)
    }
    H(l, !1, !0, {
        map: function(a, b) {
            var c = {},
                d, e;
            for (d in a) J(a, d) && (e = a[d], c[d] = kb(e, b, a, [d, e, a]));
            return c
        },
        reduce: function(a) { var b = l.keys(ya(a)).map(function(b) { return a[b] }); return b.reduce.apply(b, L(arguments, null, 1)) },
        each: function(a, b) {
            ta(b);
            I(a, b);
            return a
        },
        size: function(a) { return l.keys(ya(a)).length }
    });
    var Eb = "any all none count find findAll isEmpty".split(" "),
        Fb = "sum average min max least most".split(" "),
        Gb = ["map", "reduce", "size"],
        Hb = Eb.concat(Fb).concat(Gb);
    (function() {
        function a() { var a = arguments; return 0 < a.length && !F(a[0]) }
        var b = p.prototype.map;
        K(p, !0, a, "every,all,some,filter,any,none,find,findIndex", function(a, b) {
            var e = p.prototype[b];
            a[b] = function(a) { var b = ib(a); return e.call(this, function(a, c) { return b(a, c, this) }) }
        });
        H(p, !0, a, { map: function(a) { return b.call(this, function(b, e) { return kb(b, a, this, [b, e, this]) }) } })
    })();
    (function() {
        p[Ab] = "A\u00c1\u00c0\u00c2\u00c3\u0104BC\u0106\u010c\u00c7D\u010e\u00d0E\u00c9\u00c8\u011a\u00ca\u00cb\u0118FG\u011eH\u0131I\u00cd\u00cc\u0130\u00ce\u00cfJKL\u0141MN\u0143\u0147\u00d1O\u00d3\u00d2\u00d4PQR\u0158S\u015a\u0160\u015eT\u0164U\u00da\u00d9\u016e\u00db\u00dcVWXY\u00ddZ\u0179\u017b\u017d\u00de\u00c6\u0152\u00d8\u00d5\u00c5\u00c4\u00d6".split("").map(function(a) { return a + a.toLowerCase() }).join("");
        var a = {};
        V("A\u00c1\u00c0\u00c2\u00c3\u00c4 C\u00c7 E\u00c9\u00c8\u00ca\u00cb I\u00cd\u00cc\u0130\u00ce\u00cf O\u00d3\u00d2\u00d4\u00d5\u00d6 S\u00df U\u00da\u00d9\u00db\u00dc".split(" "),
            function(b) {
                var c = b.charAt(0);
                V(b.slice(1).split(""), function(b) {
                    a[b] = c;
                    a[b.toLowerCase()] = c.toLowerCase()
                })
            });
        p[Bb] = !0;
        p[yb] = !0;
        p[zb] = a
    })();
    Db(Eb);
    Db(Fb, !0);
    Ya(Gb, O);
    p.AlphanumericSort = ub;
    "use strict";
    var W, Ib, Jb = "ampm hour minute second ampm utc offset_sign offset_hours offset_minutes ampm".split(" "),
        Kb = "({t})?\\s*(\\d{1,2}(?:[,.]\\d+)?)(?:{h}([0-5]\\d(?:[,.]\\d+)?)?{m}(?::?([0-5]\\d(?:[,.]\\d+)?){s})?\\s*(?:({t})|(Z)|(?:([+-])(\\d{2,2})(?::?(\\d{2,2}))?)?)?|\\s*({t}))",
        Lb = {},
        Mb, Nb, Ob, Pb = [],
        Qb = {},
        X = {
            yyyy: function(a) { return U(a, "FullYear") },
            yy: function(a) { return U(a, "FullYear") % 100 },
            ord: function(a) { a = U(a, "Date"); return a + Pa(a) },
            tz: function(a) { return a.getUTCOffset() },
            isotz: function(a) { return a.getUTCOffset(!0) },
            Z: function(a) { return a.getUTCOffset() },
            ZZ: function(a) { return a.getUTCOffset().replace(/(\d{2})$/, ":$1") }
        },
        Rb = [{ name: "year", method: "FullYear", k: !0, b: function(a) { return 864E5 * (365 + (a ? a.isLeapYear() ? 1 : 0 : 0.25)) } }, {
            name: "month",
            error: 0.919,
            method: "Month",
            k: !0,
            b: function(a, b) {
                var c = 30.4375,
                    d;
                a && (d = a.daysInMonth(), b <= d.days() && (c = d));
                return 864E5 * c
            }
        }, { name: "week", method: "ISOWeek", b: aa(6048E5) }, { name: "day", error: 0.958, method: "Date", k: !0, b: aa(864E5) }, { name: "hour", method: "Hours", b: aa(36E5) }, {
            name: "minute",
            method: "Minutes",
            b: aa(6E4)
        }, { name: "second", method: "Seconds", b: aa(1E3) }, { name: "millisecond", method: "Milliseconds", b: aa(1) }],
        Sb = {};

    function Tb(a) {
        xa(this, a);
        this.g = Pb.concat()
    }
    Tb.prototype = {
        getMonth: function(a) { return x(a) ? a - 1 : this.months.indexOf(a) % 12 },
        getWeekday: function(a) { return this.weekdays.indexOf(a) % 7 },
        addFormat: function(a, b, c, d, e) {
            var g = c || [],
                f = this,
                h;
            a = a.replace(/\s+/g, "[,. ]*");
            a = a.replace(/\{([^,]+?)\}/g, function(a, b) {
                var d, e, h, B = b.match(/\?$/);
                h = b.match(/^(\d+)\??$/);
                var k = b.match(/(\d)(?:-(\d))?/),
                    E = b.replace(/[^a-z]+$/, "");
                h ? d = f.tokens[h[1]] : f[E] ? d = f[E] : f[E + "s"] && (d = f[E + "s"], k && (e = [], d.forEach(function(a, b) {
                    var c = b % (f.units ? 8 : d.length);
                    c >= k[1] && c <= (k[2] ||
                        k[1]) && e.push(a)
                }), d = e), d = Ub(d));
                h ? h = "(?:" + d + ")" : (c || g.push(E), h = "(" + d + ")");
                B && (h += "?");
                return h
            });
            b ? (b = Vb(f, e), e = ["t", "[\\s\\u3000]"].concat(f.timeMarker), h = a.match(/\\d\{\d,\d\}\)+\??$/), Wb(f, "(?:" + b + ")[,\\s\\u3000]+?" + a, Jb.concat(g), d), Wb(f, a + "(?:[,\\s]*(?:" + e.join("|") + (h ? "+" : "*") + ")" + b + ")?", g.concat(Jb), d)) : Wb(f, a, g, d)
        }
    };

    function Xb(a, b, c) {
        var d, e, g = b[0],
            f = b[1],
            h = b[2];
        b = a[c] || a.relative;
        if (F(b)) return b.call(a, g, f, h, c);
        e = a.units[8 * (a.plural && 1 < g ? 1 : 0) + f] || a.units[f];
        a.capitalizeUnit && (e = Yb(e));
        d = a.modifiers.filter(function(a) { return "sign" == a.name && a.value == (0 < h ? 1 : -1) })[0];
        return b.replace(/\{(.*?)\}/g, function(a, b) {
            switch (b) {
                case "num":
                    return g;
                case "unit":
                    return e;
                case "sign":
                    return d.src
            }
        })
    }

    function Zb(a, b) { b = b || a.code; return "en" === b || "en-US" === b ? !0 : a.variant }

    function $b(a, b) { return b.replace(q(a.num, "g"), function(b) { return ac(a, b) || "" }) }

    function ac(a, b) { var c; return x(b) ? b : b && -1 !== (c = a.numbers.indexOf(b)) ? (c + 1) % 10 : 1 }

    function Y(a, b) {
        var c;
        y(a) || (a = "");
        c = Sb[a] || Sb[a.slice(0, 2)];
        if (!1 === b && !c) throw new TypeError("Invalid locale.");
        return c || Ib
    }

    function bc(a, b) {
        function c(a) {
            var b = h[a];
            y(b) ? h[a] = b.split(",") : b || (h[a] = [])
        }

        function d(a, b) {
            a = a.split("+").map(function(a) { return a.replace(/(.+):(.+)$/, function(a, b, c) { return c.split("|").map(function(a) { return b + a }).join("|") }) }).join("|");
            a.split("|").forEach(b)
        }

        function e(a, b, c) {
            var e = [];
            h[a].forEach(function(a, f) {
                b && (a += "+" + a.slice(0, 3));
                d(a, function(a, b) { e[b * c + f] = a.toLowerCase() })
            });
            h[a] = e
        }

        function g(a, b, c) {
            a = "\\d{" + a + "," + b + "}";
            c && (a += "|(?:" + Ub(h.numbers) + ")+");
            return a
        }

        function f(a, b) {
            h[a] =
                h[a] || b
        }
        var h, m;
        h = new Tb(b);
        c("modifiers");
        "months weekdays units numbers articles tokens timeMarker ampm timeSuffixes dateParse timeParse".split(" ").forEach(c);
        m = !h.monthSuffix;
        e("months", m, 12);
        e("weekdays", m, 7);
        e("units", !1, 8);
        e("numbers", !1, 10);
        f("code", a);
        f("date", g(1, 2, h.digitDate));
        f("year", "'\\d{2}|" + g(4, 4));
        f("num", function() {
            var a = ["-?\\d+"].concat(h.articles);
            h.numbers && (a = a.concat(h.numbers));
            return Ub(a)
        }());
        (function() {
            var a = [];
            h.i = {};
            h.modifiers.push({ name: "day", src: "yesterday", value: -1 });
            h.modifiers.push({ name: "day", src: "today", value: 0 });
            h.modifiers.push({ name: "day", src: "tomorrow", value: 1 });
            h.modifiers.forEach(function(b) {
                var c = b.name;
                d(b.src, function(d) {
                    var e = h[c];
                    h.i[d] = b;
                    a.push({ name: c, src: d, value: b.value });
                    h[c] = e ? e + "|" + d : d
                })
            });
            h.day += "|" + Ub(h.weekdays);
            h.modifiers = a
        })();
        h.monthSuffix && (h.month = g(1, 2), h.months = "1 2 3 4 5 6 7 8 9 10 11 12".split(" ").map(function(a) { return a + h.monthSuffix }));
        h.full_month = g(1, 2) + "|" + Ub(h.months);
        0 < h.timeSuffixes.length && h.addFormat(Vb(h), !1, Jb);
        h.addFormat("{day}", !0);
        h.addFormat("{month}" + (h.monthSuffix || ""));
        h.addFormat("{year}" + (h.yearSuffix || ""));
        h.timeParse.forEach(function(a) { h.addFormat(a, !0) });
        h.dateParse.forEach(function(a) { h.addFormat(a) });
        return Sb[a] = h
    }

    function Wb(a, b, c, d) { a.g.unshift({ r: d, locale: a, q: q("^" + b + "$", "i"), to: c }) }

    function Yb(a) { return a.slice(0, 1).toUpperCase() + a.slice(1) }

    function Ub(a) { return a.filter(function(a) { return !!a }).join("|") }

    function cc() { var a = r.SugarNewDate; return a ? a() : new r }

    function dc(a, b) {
        var c;
        if (G(a[0])) return a;
        if (x(a[0]) && !x(a[1])) return [a[0]];
        if (y(a[0]) && b) return [ec(a[0]), a[1]];
        c = {};
        Nb.forEach(function(b, e) { c[b.name] = a[e] });
        return [c]
    }

    function ec(a) { var b, c = {}; if (a = a.match(/^(\d+)?\s?(\w+?)s?$/i)) N(b) && (b = parseInt(a[1]) || 1), c[a[2].toLowerCase()] = b; return c }

    function fc(a, b, c) {
        var d;
        N(c) && (c = Ob.length);
        for (b = b || 0; b < c && (d = Ob[b], !1 !== a(d.name, d, b)); b++);
    }

    function gc(a, b) {
        var c = {},
            d, e;
        b.forEach(function(b, f) {
            d = a[f + 1];
            N(d) || "" === d || ("year" === b && (c.t = d.replace(/'/, "")), e = parseFloat(d.replace(/'/, "").replace(/,/, ".")), c[b] = isNaN(e) ? d.toLowerCase() : e)
        });
        return c
    }

    function hc(a) { a = a.trim().replace(/^just (?=now)|\.+$/i, ""); return ic(a) }

    function ic(a) {
        return a.replace(Mb, function(a, c, d) {
            var e = 0,
                g = 1,
                f, h;
            if (c) return a;
            d.split("").reverse().forEach(function(a) {
                a = Lb[a];
                var b = 9 < a;
                b ? (f && (e += g), g *= a / (h || 1), h = a) : (!1 === f && (g *= 10), e += g * a);
                f = b
            });
            f && (e += g);
            return e
        })
    }

    function jc(a, b, c, d) {
        function e(a) { vb.push(a) }

        function g() { vb.forEach(function(a) { a.call() }) }

        function f() {
            var a = n.getWeekday();
            n.setWeekday(7 * (k.num - 1) + (a > Ba ? Ba + 7 : Ba))
        }

        function h() {
            var a = B.i[k.edge];
            fc(function(a) { if (M(k[a])) return E = a, !1 }, 4);
            if ("year" === E) k.e = "month";
            else if ("month" === E || "week" === E) k.e = "day";
            n[(0 > a.value ? "endOf" : "beginningOf") + Yb(E)](); - 2 === a.value && n.reset()
        }

        function m() {
            var a;
            fc(function(b, c, d) {
                "day" === b && (b = "date");
                if (M(k[b])) {
                    if (d >= wb) return n.setTime(NaN), !1;
                    a = a || {};
                    a[b] = k[b];
                    delete k[b]
                }
            });
            a && e(function() { n.set(a, !0) })
        }
        var n, z, ha, vb, B, k, E, wb, Ba, ra, ca;
        n = cc();
        vb = [];
        n.utc(d);
        C(a) ? n.utc(a.isUTC()).setTime(a.getTime()) : x(a) ? n.setTime(a) : G(a) ? (n.set(a, !0), k = a) : y(a) && (ha = Y(b), a = hc(a), ha && I(ha.o ? [ha.o].concat(ha.g) : ha.g, function(c, d) {
            var g = a.match(d.q);
            if (g) {
                B = d.locale;
                k = gc(g, d.to);
                B.o = d;
                k.utc && n.utc();
                if (k.timestamp) return k = k.timestamp, !1;
                d.r && (!y(k.month) && (y(k.date) || Zb(ha, b))) && (ca = k.month, k.month = k.date, k.date = ca);
                k.year && 2 === k.t.length && (k.year = 100 * R(U(cc(), "FullYear") /
                    100) - 100 * R(k.year / 100) + k.year);
                k.month && (k.month = B.getMonth(k.month), k.shift && !k.unit && (k.unit = B.units[7]));
                k.weekday && k.date ? delete k.weekday : k.weekday && (k.weekday = B.getWeekday(k.weekday), k.shift && !k.unit && (k.unit = B.units[5]));
                k.day && (ca = B.i[k.day]) ? (k.day = ca.value, n.reset(), z = !0) : k.day && -1 < (Ba = B.getWeekday(k.day)) && (delete k.day, k.num && k.month ? (e(f), k.day = 1) : k.weekday = Ba);
                k.date && !x(k.date) && (k.date = $b(B, k.date));
                k.ampm && k.ampm === B.ampm[1] && 12 > k.hour ? k.hour += 12 : k.ampm === B.ampm[0] && 12 === k.hour &&
                    (k.hour = 0);
                if ("offset_hours" in k || "offset_minutes" in k) n.utc(), k.offset_minutes = k.offset_minutes || 0, k.offset_minutes += 60 * k.offset_hours, "-" === k.offset_sign && (k.offset_minutes *= -1), k.minute -= k.offset_minutes;
                k.unit && (z = !0, ra = ac(B, k.num), wb = B.units.indexOf(k.unit) % 8, E = W.units[wb], m(), k.shift && (ra *= (ca = B.i[k.shift]) ? ca.value : 0), k.sign && (ca = B.i[k.sign]) && (ra *= ca.value), M(k.weekday) && (n.set({ weekday: k.weekday }, !0), delete k.weekday), k[E] = (k[E] || 0) + ra);
                k.edge && e(h);
                "-" === k.year_sign && (k.year *= -1);
                fc(function(a,
                    b, c) {
                    b = k[a];
                    var d = b % 1;
                    d && (k[Ob[c - 1].name] = R(d * ("second" === a ? 1E3 : 60)), k[a] = Q(b))
                }, 1, 4);
                return !1
            }
        }), k ? z ? n.advance(k) : (n._utc && n.reset(), kc(n, k, !0, !1, c)) : ("now" !== a && (n = new r(a)), d && n.addMinutes(-n.getTimezoneOffset())), g(), n.utc(!1));
        return { c: n, set: k }
    }

    function lc(a) {
        var b, c = P(a),
            d = c,
            e = 0;
        fc(function(a, f, h) {
            b = Q(Da(c / f.b(), 1));
            1 <= b && (d = b, e = h)
        }, 1);
        return [d, e, a]
    }

    function mc(a) { var b = lc(a.millisecondsFromNow()); if (6 === b[1] || 5 === b[1] && 4 === b[0] && a.daysFromNow() >= cc().daysInMonth()) b[0] = P(a.monthsFromNow()), b[1] = 6; return b }

    function nc(a, b, c) {
        function d(a, c) { var d = U(a, "Month"); return Y(c).months[d + 12 * b] }
        Z(a, d, c);
        Z(Yb(a), d, c, 1)
    }

    function Z(a, b, c, d) {
        X[a] = function(a, g) {
            var f = b(a, g);
            c && (f = f.slice(0, c));
            d && (f = f.slice(0, d).toUpperCase() + f.slice(d));
            return f
        }
    }

    function oc(a, b, c) {
        X[a] = b;
        X[a + a] = function(a, c) { return T(b(a, c), 2) };
        c && (X[a + a + a] = function(a, c) { return T(b(a, c), 3) }, X[a + a + a + a] = function(a, c) { return T(b(a, c), 4) })
    }

    function pc(a) {
        var b = a.match(/(\{\w+\})|[^{}]+/g);
        Qb[a] = b.map(function(a) { a.replace(/\{(\w+)\}/, function(b, e) { a = X[e] || e; return e }); return a })
    }

    function qc(a, b, c, d) {
        var e;
        if (!a.isValid()) return "Invalid Date";
        Date[b] ? b = Date[b] : F(b) && (e = mc(a), b = b.apply(a, e.concat(Y(d))));
        if (!b && c) return e = e || mc(a), 0 === e[1] && (e[1] = 1, e[0] = 1), a = Y(d), Xb(a, e, 0 < e[2] ? "future" : "past");
        b = b || "long";
        if ("short" === b || "long" === b || "full" === b) b = Y(d)[b];
        Qb[b] || pc(b);
        var g, f;
        e = "";
        b = Qb[b];
        g = 0;
        for (c = b.length; g < c; g++) f = b[g], e += F(f) ? f(a, d) : f;
        return e
    }

    function rc(a, b, c, d, e) {
        var g, f, h, m = 0,
            n = 0,
            z = 0;
        g = jc(b, c, null, e);
        0 < d && (n = z = d, f = !0);
        if (!g.c.isValid()) return !1;
        if (g.set && g.set.e) {
            Rb.forEach(function(b) { b.name === g.set.e && (m = b.b(g.c, a - g.c) - 1) });
            b = Yb(g.set.e);
            if (g.set.edge || g.set.shift) g.c["beginningOf" + b]();
            "month" === g.set.e && (h = g.c.clone()["endOf" + b]().getTime());
            !f && (g.set.sign && "millisecond" != g.set.e) && (n = 50, z = -50)
        }
        f = a.getTime();
        b = g.c.getTime();
        h = sc(a, b, h || b + m);
        return f >= b - n && f <= h + z
    }

    function sc(a, b, c) {
        b = new r(b);
        a = (new r(c)).utc(a.isUTC());
        23 !== U(a, "Hours") && (b = b.getTimezoneOffset(), a = a.getTimezoneOffset(), b !== a && (c += (a - b).minutes()));
        return c
    }

    function kc(a, b, c, d, e) {
        function g(a) { return M(b[a]) ? b[a] : b[a + "s"] }

        function f(a) { return M(g(a)) }
        var h;
        if (x(b) && d) b = { milliseconds: b };
        else if (x(b)) return a.setTime(b), a;
        M(b.date) && (b.day = b.date);
        fc(function(d, e, g) { var m = "day" === d; if (f(d) || m && f("weekday")) return b.e = d, h = +g, !1;!c || ("week" === d || m && f("week")) || Sa(a, e.method, m ? 1 : 0) });
        Rb.forEach(function(c) {
            var e = c.name;
            c = c.method;
            var h;
            h = g(e);
            N(h) || (d ? ("week" === e && (h = (b.day || 0) + 7 * h, c = "Date"), h = h * d + U(a, c)) : "month" === e && f("day") && Sa(a, "Date", 15), Sa(a, c, h),
                d && "month" === e && (e = h, 0 > e && (e = e % 12 + 12), e % 12 != U(a, "Month") && Sa(a, "Date", 0)))
        });
        d || (f("day") || !f("weekday")) || a.setWeekday(g("weekday"));
        var m;
        a: {
            switch (e) {
                case -1:
                    m = a > cc();
                    break a;
                case 1:
                    m = a < cc();
                    break a
            }
            m = void 0
        }
        m && fc(function(b, c) { if ((c.k || "week" === b && f("weekday")) && !(f(b) || "day" === b && f("weekday"))) return a[c.j](e), !1 }, h + 1);
        return a
    }

    function Vb(a, b) {
        var c = Kb,
            d = { h: 0, m: 1, s: 2 },
            e;
        a = a || W;
        return c.replace(/{([a-z])}/g, function(c, f) {
            var h = [],
                m = "h" === f,
                n = m && !b;
            if ("t" === f) return a.ampm.join("|");
            m && h.push(":");
            (e = a.timeSuffixes[d[f]]) && h.push(e + "\\s*");
            return 0 === h.length ? "" : "(?:" + h.join("|") + ")" + (n ? "" : "?")
        })
    }

    function tc(a, b, c) {
        var d, e;
        x(a[1]) ? d = dc(a)[0] : (d = a[0], e = a[1]);
        return jc(d, e, b, c).c
    }
    H(r, !1, !0, {
        create: function() { return tc(arguments) },
        past: function() { return tc(arguments, -1) },
        future: function() { return tc(arguments, 1) },
        addLocale: function(a, b) { return bc(a, b) },
        setLocale: function(a) {
            var b = Y(a, !1);
            Ib = b;
            a && a != b.code && (b.code = a);
            return b
        },
        getLocale: function(a) { return a ? Y(a, !1) : Ib },
        addFormat: function(a, b, c) { Wb(Y(c), a, b) }
    });
    H(r, !0, !0, {
        set: function() { var a = dc(arguments); return kc(this, a[0], a[1]) },
        setWeekday: function(a) { if (!N(a)) return Sa(this, "Date", U(this, "Date") + a - U(this, "Day")) },
        setISOWeek: function(a) { var b = U(this, "Day") || 7; if (!N(a)) return this.set({ month: 0, date: 4 }), this.set({ weekday: 1 }), 1 < a && this.addWeeks(a - 1), 1 !== b && this.advance({ days: b - 1 }), this.getTime() },
        getISOWeek: function() {
            var a;
            a = this.clone();
            var b = U(a, "Day") || 7;
            a.addDays(4 - b).reset();
            return 1 + Q(a.daysSince(a.clone().beginningOfYear()) / 7)
        },
        beginningOfISOWeek: function() {
            var a =
                this.getDay();
            0 === a ? a = -6 : 1 !== a && (a = 1);
            this.setWeekday(a);
            return this.reset()
        },
        endOfISOWeek: function() { 0 !== this.getDay() && this.setWeekday(7); return this.endOfDay() },
        getUTCOffset: function(a) {
            var b = this._utc ? 0 : this.getTimezoneOffset(),
                c = !0 === a ? ":" : "";
            return !b && a ? "Z" : T(Q(-b / 60), 2, !0) + c + T(P(b % 60), 2)
        },
        utc: function(a) { oa(this, "_utc", !0 === a || 0 === arguments.length); return this },
        isUTC: function() { return !!this._utc || 0 === this.getTimezoneOffset() },
        advance: function() {
            var a = dc(arguments, !0);
            return kc(this, a[0], a[1],
                1)
        },
        rewind: function() { var a = dc(arguments, !0); return kc(this, a[0], a[1], -1) },
        isValid: function() { return !isNaN(this.getTime()) },
        isAfter: function(a, b) { return this.getTime() > r.create(a).getTime() - (b || 0) },
        isBefore: function(a, b) { return this.getTime() < r.create(a).getTime() + (b || 0) },
        isBetween: function(a, b, c) {
            var d = this.getTime();
            a = r.create(a).getTime();
            var e = r.create(b).getTime();
            b = Ca(a, e);
            a = S(a, e);
            c = c || 0;
            return b - c < d && a + c > d
        },
        isLeapYear: function() { var a = U(this, "FullYear"); return 0 === a % 4 && 0 !== a % 100 || 0 === a % 400 },
        daysInMonth: function() { return 32 - U(new r(U(this, "FullYear"), U(this, "Month"), 32), "Date") },
        format: function(a, b) { return qc(this, a, !1, b) },
        relative: function(a, b) { y(a) && (b = a, a = null); return qc(this, a, !0, b) },
        is: function(a, b, c) {
            var d, e;
            if (this.isValid()) {
                if (y(a)) switch (a = a.trim().toLowerCase(), e = this.clone().utc(c), !0) {
                    case "future" === a:
                        return this.getTime() > cc().getTime();
                    case "past" === a:
                        return this.getTime() < cc().getTime();
                    case "weekday" === a:
                        return 0 < U(e, "Day") && 6 > U(e, "Day");
                    case "weekend" === a:
                        return 0 ===
                            U(e, "Day") || 6 === U(e, "Day");
                    case -1 < (d = W.weekdays.indexOf(a) % 7):
                        return U(e, "Day") === d;
                    case -1 < (d = W.months.indexOf(a) % 12):
                        return U(e, "Month") === d
                }
                return rc(this, a, null, b, c)
            }
        },
        reset: function(a) {
            var b = {},
                c;
            a = a || "hours";
            "date" === a && (a = "days");
            c = Rb.some(function(b) { return a === b.name || a === b.name + "s" });
            b[a] = a.match(/^days?/) ? 1 : 0;
            return c ? this.set(b, !0) : this
        },
        clone: function() {
            var a = new r(this.getTime());
            a.utc(!!this._utc);
            return a
        }
    });
    H(r, !0, !0, { iso: function() { return this.toISOString() }, getWeekday: r.prototype.getDay, getUTCWeekday: r.prototype.getUTCDay });

    function uc(a, b) {
        function c() { return R(this * b) }

        function d() { return tc(arguments)[a.j](this) }

        function e() { return tc(arguments)[a.j](-this) }
        var g = a.name,
            f = {};
        f[g] = c;
        f[g + "s"] = c;
        f[g + "Before"] = e;
        f[g + "sBefore"] = e;
        f[g + "Ago"] = e;
        f[g + "sAgo"] = e;
        f[g + "After"] = d;
        f[g + "sAfter"] = d;
        f[g + "FromNow"] = d;
        f[g + "sFromNow"] = d;
        t.extend(f)
    }
    H(t, !0, !0, { duration: function(a) { a = Y(a); return Xb(a, lc(this), "duration") } });
    W = Ib = r.addLocale("en", {
        plural: !0,
        timeMarker: "at",
        ampm: "am,pm",
        months: "January,February,March,April,May,June,July,August,September,October,November,December",
        weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
        units: "millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s",
        numbers: "one,two,three,four,five,six,seven,eight,nine,ten",
        articles: "a,an,the",
        tokens: "the,st|nd|rd|th,of",
        "short": "{Month} {d}, {yyyy}",
        "long": "{Month} {d}, {yyyy} {h}:{mm}{tt}",
        full: "{Weekday} {Month} {d}, {yyyy} {h}:{mm}:{ss}{tt}",
        past: "{num} {unit} {sign}",
        future: "{num} {unit} {sign}",
        duration: "{num} {unit}",
        modifiers: [{ name: "sign", src: "ago|before", value: -1 }, { name: "sign", src: "from now|after|from|in|later", value: 1 }, { name: "edge", src: "last day", value: -2 }, { name: "edge", src: "end", value: -1 }, { name: "edge", src: "first day|beginning", value: 1 }, { name: "shift", src: "last", value: -1 }, { name: "shift", src: "the|this", value: 0 }, { name: "shift", src: "next", value: 1 }],
        dateParse: ["{month} {year}", "{shift} {unit=5-7}", "{0?} {date}{1}", "{0?} {edge} of {shift?} {unit=4-7?}{month?}{year?}"],
        timeParse: "{num} {unit} {sign};{sign} {num} {unit};{0} {num}{1} {day} of {month} {year?};{weekday?} {month} {date}{1?} {year?};{date} {month} {year};{date} {month};{shift} {weekday};{shift} week {weekday};{weekday} {2?} {shift} week;{num} {unit=4-5} {sign} {day};{0?} {date}{1} of {month};{0?}{month?} {date?}{1?} of {shift} {unit=6-7}".split(";")
    });
    Ob = Rb.concat().reverse();
    Nb = Rb.concat();
    Nb.splice(2, 1);
    K(r, !0, !0, Rb, function(a, b, c) {
        function d(a) {
            a /= f;
            var c = a % 1,
                d = b.error || 0.999;
            c && P(c % 1) > d && (a = R(a));
            return 0 > a ? Aa(a) : Q(a)
        }
        var e = b.name,
            g = Yb(e),
            f = b.b(),
            h, m;
        b.j = "add" + g + "s";
        h = function(a, b) { return d(this.getTime() - r.create(a, b).getTime()) };
        m = function(a, b) { return d(r.create(a, b).getTime() - this.getTime()) };
        a[e + "sAgo"] = m;
        a[e + "sUntil"] = m;
        a[e + "sSince"] = h;
        a[e + "sFromNow"] = h;
        a[b.j] = function(a, b) {
            var c = {};
            c[e] = a;
            return this.advance(c, b)
        };
        uc(b, f);
        3 > c && ["Last", "This", "Next"].forEach(function(b) {
            a["is" + b + g] = function() {
                return rc(this,
                    b + " " + e, "en")
            }
        });
        4 > c && (a["beginningOf" + g] = function() {
            var a = {};
            switch (e) {
                case "year":
                    a.year = U(this, "FullYear");
                    break;
                case "month":
                    a.month = U(this, "Month");
                    break;
                case "day":
                    a.day = U(this, "Date");
                    break;
                case "week":
                    a.weekday = 0
            }
            return this.set(a, !0)
        }, a["endOf" + g] = function() {
            var a = { hours: 23, minutes: 59, seconds: 59, milliseconds: 999 };
            switch (e) {
                case "year":
                    a.month = 11;
                    a.day = 31;
                    break;
                case "month":
                    a.day = this.daysInMonth();
                    break;
                case "week":
                    a.weekday = 6
            }
            return this.set(a, !0)
        })
    });
    W.addFormat("([+-])?(\\d{4,4})[-.]?{full_month}[-.]?(\\d{1,2})?", !0, ["year_sign", "year", "month", "date"], !1, !0);
    W.addFormat("(\\d{1,2})[-.\\/]{full_month}(?:[-.\\/](\\d{2,4}))?", !0, ["date", "month", "year"], !0);
    W.addFormat("{full_month}[-.](\\d{4,4})", !1, ["month", "year"]);
    W.addFormat("\\/Date\\((\\d+(?:[+-]\\d{4,4})?)\\)\\/", !1, ["timestamp"]);
    W.addFormat(Vb(W), !1, Jb);
    Pb = W.g.slice(0, 7).reverse();
    W.g = W.g.slice(7).concat(Pb);
    oc("f", function(a) { return U(a, "Milliseconds") }, !0);
    oc("s", function(a) { return U(a, "Seconds") });
    oc("m", function(a) { return U(a, "Minutes") });
    oc("h", function(a) { return U(a, "Hours") % 12 || 12 });
    oc("H", function(a) { return U(a, "Hours") });
    oc("d", function(a) { return U(a, "Date") });
    oc("M", function(a) { return U(a, "Month") + 1 });
    (function() {
        function a(a, c) { var d = U(a, "Hours"); return Y(c).ampm[Q(d / 12)] || "" }
        Z("t", a, 1);
        Z("tt", a);
        Z("T", a, 1, 1);
        Z("TT", a, null, 2)
    })();
    (function() {
        function a(a, c) { var d = U(a, "Day"); return Y(c).weekdays[d] }
        Z("dow", a, 3);
        Z("Dow", a, 3, 1);
        Z("weekday", a);
        Z("Weekday", a, null, 1)
    })();
    nc("mon", 0, 3);
    nc("month", 0);
    nc("month2", 1);
    nc("month3", 2);
    X.ms = X.f;
    X.milliseconds = X.f;
    X.seconds = X.s;
    X.minutes = X.m;
    X.hours = X.h;
    X["24hr"] = X.H;
    X["12hr"] = X.h;
    X.date = X.d;
    X.day = X.d;
    X.year = X.yyyy;
    K(r, !0, !0, "short,long,full", function(a, b) { a[b] = function(a) { return qc(this, b, !1, a) } });
    "\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07".split("").forEach(function(a, b) {
        9 < b && (b = za(10, b - 9));
        Lb[a] = b
    });
    xa(Lb, Ka);
    Mb = q("([\u671f\u9031\u5468])?([\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07" + Ja + "]+)(?!\u6628)", "g");
    (function() {
        var a = W.weekdays.slice(0, 7),
            b = W.months.slice(0, 12);
        K(r, !0, !0, "today yesterday tomorrow weekday weekend future past".split(" ").concat(a).concat(b), function(a, b) { a["is" + Yb(b)] = function(a) { return this.is(b, 0, a) } })
    })();
    r.utc || (r.utc = { create: function() { return tc(arguments, 0, !0) }, past: function() { return tc(arguments, -1, !0) }, future: function() { return tc(arguments, 1, !0) } });
    H(r, !1, !0, { RFC1123: "{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {tz}", RFC1036: "{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {tz}", ISO8601_DATE: "{yyyy}-{MM}-{dd}", ISO8601_DATETIME: "{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{fff}{isotz}" });
    "use strict";

    function Range(a, b) {
        this.start = vc(a);
        this.end = vc(b)
    }

    function vc(a) { return C(a) ? new r(a.getTime()) : null == a ? a : C(a) ? a.getTime() : a.valueOf() }

    function wc(a) { a = null == a ? a : C(a) ? a.getTime() : a.valueOf(); return !!a || 0 === a }

    function xc(a, b) {
        var c, d, e, g;
        if (x(b)) return new r(a.getTime() + b);
        c = b[0];
        d = b[1];
        e = U(a, d);
        g = new r(a.getTime());
        Sa(g, d, e + c);
        return g
    }

    function yc(a, b) { return s.fromCharCode(a.charCodeAt(0) + b) }

    function zc(a, b) { return a + b }
    Range.prototype.toString = function() { return this.isValid() ? this.start + ".." + this.end : "Invalid Range" };
    H(Range, !0, !0, {
        isValid: function() { return wc(this.start) && wc(this.end) && typeof this.start === typeof this.end },
        span: function() { return this.isValid() ? P((y(this.end) ? this.end.charCodeAt(0) : this.end) - (y(this.start) ? this.start.charCodeAt(0) : this.start)) + 1 : NaN },
        contains: function(a) { return null == a ? !1 : a.start && a.end ? a.start >= this.start && a.start <= this.end && a.end >= this.start && a.end <= this.end : a >= this.start && a <= this.end },
        every: function(a, b) {
            var c, d = this.start,
                e = this.end,
                g = e < d,
                f = d,
                h = 0,
                m = [];
            F(a) && (b = a, a = null);
            a =
                a || 1;
            x(d) ? c = zc : y(d) ? c = yc : C(d) && (c = a, x(c) ? a = c : (d = c.toLowerCase().match(/^(\d+)?\s?(\w+?)s?$/i), c = parseInt(d[1]) || 1, d = d[2].slice(0, 1).toUpperCase() + d[2].slice(1), d.match(/hour|minute|second/i) ? d += "s" : "Year" === d ? d = "FullYear" : "Day" === d && (d = "Date"), a = [c, d]), c = xc);
            for (g && 0 < a && (a *= -1); g ? f >= e : f <= e;) m.push(f), b && b(f, h), f = c(f, a), h++;
            return m
        },
        union: function(a) { return new Range(this.start < a.start ? this.start : a.start, this.end > a.end ? this.end : a.end) },
        intersect: function(a) {
            return a.start > this.end || a.end < this.start ?
                new Range(NaN, NaN) : new Range(this.start > a.start ? this.start : a.start, this.end < a.end ? this.end : a.end)
        },
        clone: function() { return new Range(this.start, this.end) },
        clamp: function(a) {
            var b = this.start,
                c = this.end,
                d = c < b ? c : b,
                b = b > c ? b : c;
            return vc(a < d ? d : a > b ? b : a)
        }
    });
    [t, s, r].forEach(function(a) { H(a, !1, !0, { range: function(b, c) { a.create && (b = a.create(b), c = a.create(c)); return new Range(b, c) } }) });
    H(t, !0, !0, { upto: function(a, b, c) { return t.range(this, a).every(c, b) }, clamp: function(a, b) { return (new Range(a, b)).clamp(this) }, cap: function(a) { return this.clamp(void 0, a) } });
    H(t, !0, !0, { downto: t.prototype.upto });
    H(p, !1, function(a) { return a instanceof Range }, { create: function(a) { return a.every() } });
    "use strict";

    function Ac(a, b, c, d, e) { Infinity !== b && (a.timers || (a.timers = []), x(b) || (b = 1), a.n = !1, a.timers.push(setTimeout(function() { a.n || c.apply(d, e || []) }, b))) }
    H(Function, !0, !0, {
        lazy: function(a, b, c) {
            function d() {
                g.length < c - (f && b ? 1 : 0) && g.push([this, arguments]);
                f || (f = !0, b ? h() : Ac(d, m, h));
                return z
            }
            var e = this,
                g = [],
                f = !1,
                h, m, n, z;
            a = a || 1;
            c = c || Infinity;
            m = Aa(a);
            n = R(m / a) || 1;
            h = function() {
                var a = g.length,
                    b;
                if (0 != a) {
                    for (b = S(a - n, 0); a > b;) z = Function.prototype.apply.apply(e, g.shift()), a--;
                    Ac(d, m, function() {
                        f = !1;
                        h()
                    })
                }
            };
            return d
        },
        throttle: function(a) { return this.lazy(a, !0, 1) },
        debounce: function(a) {
            function b() {
                b.cancel();
                Ac(b, a, c, this, arguments)
            }
            var c = this;
            return b
        },
        delay: function(a) {
            var b =
                L(arguments, null, 1);
            Ac(this, a, this, this, b);
            return this
        },
        every: function(a) {
            function b() {
                c.apply(c, d);
                Ac(c, a, b)
            }
            var c = this,
                d = arguments,
                d = 1 < d.length ? L(d, null, 1) : [];
            Ac(c, a, b);
            return c
        },
        cancel: function() {
            var a = this.timers,
                b;
            if (A(a))
                for (; b = a.shift();) clearTimeout(b);
            this.n = !0;
            return this
        },
        after: function(a) {
            var b = this,
                c = 0,
                d = [];
            if (!x(a)) a = 1;
            else if (0 === a) return b.call(), b;
            return function() {
                var e;
                d.push(L(arguments));
                c++;
                if (c == a) return e = b.call(this, d), c = 0, d = [], e
            }
        },
        once: function() {
            return this.throttle(Infinity, !0)
        },
        fill: function() {
            var a = this,
                b = L(arguments);
            return function() {
                var c = L(arguments);
                b.forEach(function(a, b) {
                    (null != a || b >= c.length) && c.splice(b, 0, a)
                });
                return a.apply(this, c)
            }
        }
    });
    "use strict";

    function Bc(a, b, c, d, e, g) {
        var f = a.toFixed(20),
            h = f.search(/\./),
            f = f.search(/[1-9]/),
            h = h - f;
        0 < h && (h -= 1);
        e = S(Ca(Q(h / 3), !1 === e ? c.length : e), -d);
        d = c.charAt(e + d - 1); - 9 > h && (e = -3, b = P(h) - 9, d = c.slice(0, 1));
        c = g ? za(2, 10 * e) : za(10, 3 * e);
        return Da(a / c, b || 0).format() + d.trim()
    }
    H(t, !1, !0, {
        random: function(a, b) {
            var c, d;
            1 == arguments.length && (b = a, a = 0);
            c = Ca(a || 0, N(b) ? 1 : b);
            d = S(a || 0, N(b) ? 1 : b) + 1;
            return Q(u.random() * (d - c) + c)
        }
    });
    H(t, !0, !0, {
        log: function(a) { return u.log(this) / (a ? u.log(a) : 1) },
        abbr: function(a) { return Bc(this, a, "kmbt", 0, 4) },
        metric: function(a, b) { return Bc(this, a, "n\u03bcm kMGTPE", 4, N(b) ? 1 : b) },
        bytes: function(a, b) { return Bc(this, a, "kMGTPE", 0, N(b) ? 4 : b, !0) + "B" },
        isInteger: function() { return 0 == this % 1 },
        isOdd: function() { return !isNaN(this) && !this.isMultipleOf(2) },
        isEven: function() { return this.isMultipleOf(2) },
        isMultipleOf: function(a) { return 0 === this % a },
        format: function(a, b, c) {
            var d, e, g, f = "";
            N(b) && (b = ",");
            N(c) && (c = ".");
            d =
                (x(a) ? Da(this, a || 0).toFixed(S(a, 0)) : this.toString()).replace(/^-/, "").split(".");
            e = d[0];
            g = d[1];
            for (d = e.length; 0 < d; d -= 3) d < e.length && (f = b + f), f = e.slice(S(0, d - 3), d) + f;
            g && (f += c + Na("0", (a || 0) - g.length) + g);
            return (0 > this ? "-" : "") + f
        },
        hex: function(a) { return this.pad(a || 1, !1, 16) },
        times: function(a) {
            if (a)
                for (var b = 0; b < this; b++) a.call(this, b);
            return this.toNumber()
        },
        chr: function() { return s.fromCharCode(this) },
        pad: function(a, b, c) { return T(this, a, b, c) },
        ordinalize: function() {
            var a = P(this),
                a = parseInt(a.toString().slice(-2));
            return this + Pa(a)
        },
        toNumber: function() { return parseFloat(this, 10) }
    });
    (function() {
        function a(a) { return function(c) { return c ? Da(this, c, a) : a(this) } }
        H(t, !0, !0, { ceil: a(Aa), round: a(R), floor: a(Q) });
        K(t, !0, !0, "abs,pow,sin,asin,cos,acos,tan,atan,exp,pow,sqrt", function(a, c) { a[c] = function(a, b) { return u[c](this, a, b) } })
    })();
    "use strict";
    var Cc = ["isObject", "isNaN"],
        Dc = "keys values select reject each merge clone equal watch tap has toQueryString".split(" ");

    function Ec(a, b, c, d) {
        var e, g, f;
        (g = b.match(/^(.+?)(\[.*\])$/)) ? (f = g[1], b = g[2].replace(/^\[|\]$/g, "").split("]["), b.forEach(function(b) {
            e = !b || b.match(/^\d+$/);
            !f && A(a) && (f = a.length);
            J(a, f) || (a[f] = e ? [] : {});
            a = a[f];
            f = b
        }), !f && e && (f = a.length.toString()), Ec(a, f, c, d)) : a[b] = d && "true" === c ? !0 : d && "false" === c ? !1 : c
    }

    function Fc(a, b) {
        var c;
        return A(b) || G(b) && b.toString === v ? (c = [], I(b, function(b, e) {
            a && (b = a + "[" + b + "]");
            c.push(Fc(b, e))
        }), c.join("&")) : a ? Gc(a) + "=" + (C(b) ? b.getTime() : Gc(b)) : ""
    }

    function Gc(a) { return a || !1 === a || 0 === a ? encodeURIComponent(a).replace(/%20/g, "+") : "" }

    function Hc(a, b, c) {
        var d, e = a instanceof O ? new O : {};
        I(a, function(a, f) {
            d = !1;
            sa(b, function(b) {
                (D(b) ? b.test(a) : G(b) ? J(b, a) : a === s(b)) && (d = !0)
            }, 1);
            d === c && (e[a] = f)
        });
        return e
    }
    H(l, !1, !0, {
        watch: function(a, b, c) {
            if (ea) {
                var d = a[b];
                l.defineProperty(a, b, { enumerable: !0, configurable: !0, get: function() { return d }, set: function(e) { d = c.call(a, b, d, e) } })
            }
        }
    });
    H(l, !1, function() { return 1 < arguments.length }, {
        keys: function(a, b) {
            var c = l.keys(a);
            c.forEach(function(c) { b.call(a, c, a[c]) });
            return c
        }
    });
    H(l, !1, !0, {
        isObject: function(a) { return va(a) },
        isNaN: function(a) { return x(a) && a.valueOf() !== a.valueOf() },
        equal: function(a, b) { return Ua(a, b) },
        extended: function(a) { return new O(a) },
        merge: function(a, b, c, d) {
            var e, g, f;
            if (a && "string" !== typeof b)
                for (e in b)
                    if (J(b, e) && a) {
                        g = b[e];
                        f = c && G(g);
                        if (M(a[e])) {
                            if (!1 === d && !f) continue;
                            F(d) && (g = d.call(b, e, a[e], b[e]))
                        }
                        if (f)
                            if (C(g)) g = new r(g.getTime());
                            else if (D(g)) g = new q(g.source, Qa(g));
                        else {
                            a[e] || (a[e] = p.isArray(g) ? [] : {});
                            l.merge(a[e], b[e], c, d);
                            continue
                        }
                        a[e] = g
                    }
            return a
        },
        values: function(a, b) {
            var c = [];
            I(a, function(d, e) {
                c.push(e);
                b && b.call(a, e)
            });
            return c
        },
        clone: function(a, b) {
            var c;
            if (!G(a)) return a;
            c = v.call(a);
            if (C(a, c) && a.clone) return a.clone();
            if (C(a, c) || D(a, c)) return new a.constructor(a);
            if (a instanceof O) c = new O;
            else if (A(a, c)) c = [];
            else if (va(a, c)) c = {};
            else throw new TypeError("Clone must be a basic data type.");
            return l.merge(c, a, b)
        },
        fromQueryString: function(a, b) {
            var c = l.extended();
            a = a && a.toString ? a.toString() : "";
            a.replace(/^.*?\?/, "").split("&").forEach(function(a) {
                a =
                    a.split("=");
                2 === a.length && Ec(c, a[0], decodeURIComponent(a[1]), b)
            });
            return c
        },
        toQueryString: function(a, b) { return Fc(b, a) },
        tap: function(a, b) {
            var c = b;
            F(b) || (c = function() { if (b) a[b]() });
            c.call(a, a);
            return a
        },
        has: function(a, b) { return J(a, b) },
        select: function(a) { return Hc(a, arguments, !0) },
        reject: function(a) { return Hc(a, arguments, !1) }
    });
    K(l, !1, !0, w, function(a, b) {
        var c = "is" + b;
        Cc.push(c);
        a[c] = ia[b]
    });
    H(l, !1, function() { return 0 === arguments.length }, {
        extend: function() {
            var a = Cc.concat(Dc);
            "undefined" !== typeof Hb && (a = a.concat(Hb));
            Ya(a, l)
        }
    });
    Ya(Dc, O);
    "use strict";
    H(q, !1, !0, { escape: function(a) { return Ra(a) } });
    H(q, !0, !0, { getFlags: function() { return Qa(this) }, setFlags: function(a) { return q(this.source, a) }, addFlag: function(a) { return this.setFlags(Qa(this, a)) }, removeFlag: function(a) { return this.setFlags(Qa(this).replace(a, "")) } });
    "use strict";

    function Ic(a) { a = +a; if (0 > a || Infinity === a) throw new RangeError("Invalid number"); return a }

    function Jc(a, b) { return Na(M(b) ? b : " ", a) }

    function Kc(a, b, c, d, e) {
        var g;
        if (a.length <= b) return a.toString();
        d = N(d) ? "..." : d;
        switch (c) {
            case "left":
                return a = e ? Lc(a, b, !0) : a.slice(a.length - b), d + a;
            case "middle":
                return c = Aa(b / 2), g = Q(b / 2), b = e ? Lc(a, c) : a.slice(0, c), a = e ? Lc(a, g, !0) : a.slice(a.length - g), b + d + a;
            default:
                return b = e ? Lc(a, b) : a.slice(0, b), b + d
        }
    }

    function Lc(a, b, c) {
        if (c) return Lc(a.reverse(), b).reverse();
        c = q("(?=[" + Ma() + "])");
        var d = 0;
        return a.split(c).filter(function(a) { d += a.length; return d <= b }).join("")
    }

    function Mc(a, b, c) { y(b) && (b = a.indexOf(b), -1 === b && (b = c ? a.length : 0)); return b }
    var Nc, Oc;
    H(s, !0, !1, { repeat: function(a) { a = Ic(a); return Na(this, a) } });
    H(s, !0, function(a) { return D(a) || 2 < arguments.length }, {
        startsWith: function(a) {
            var b = arguments,
                c = b[1],
                b = b[2],
                d = this;
            c && (d = d.slice(c));
            N(b) && (b = !0);
            c = D(a) ? a.source.replace("^", "") : Ra(a);
            return q("^" + c, b ? "" : "i").test(d)
        },
        endsWith: function(a) {
            var b = arguments,
                c = b[1],
                b = b[2],
                d = this;
            M(c) && (d = d.slice(0, c));
            N(b) && (b = !0);
            c = D(a) ? a.source.replace("$", "") : Ra(a);
            return q(c + "$", b ? "" : "i").test(d)
        }
    });
    H(s, !0, !0, {
        escapeRegExp: function() { return Ra(this) },
        escapeURL: function(a) { return a ? encodeURIComponent(this) : encodeURI(this) },
        unescapeURL: function(a) { return a ? decodeURI(this) : decodeURIComponent(this) },
        escapeHTML: function() { return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2f;") },
        unescapeHTML: function() {
            return this.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#x2f;/g,
                "/").replace(/&amp;/g, "&")
        },
        encodeBase64: function() { return Nc(unescape(encodeURIComponent(this))) },
        decodeBase64: function() { return decodeURIComponent(escape(Oc(this))) },
        each: function(a, b) {
            var c, d, e;
            F(a) ? (b = a, a = /[\s\S]/g) : a ? y(a) ? a = q(Ra(a), "gi") : D(a) && (a = q(a.source, Qa(a, "g"))) : a = /[\s\S]/g;
            c = this.match(a) || [];
            if (b)
                for (d = 0, e = c.length; d < e; d++) c[d] = b.call(this, c[d], d, c) || c[d];
            return c
        },
        shift: function(a) {
            var b = "";
            a = a || 0;
            this.codes(function(c) { b += s.fromCharCode(c + a) });
            return b
        },
        codes: function(a) {
            var b = [],
                c, d;
            c = 0;
            for (d = this.length; c < d; c++) {
                var e = this.charCodeAt(c);
                b.push(e);
                a && a.call(this, e, c)
            }
            return b
        },
        chars: function(a) { return this.each(a) },
        words: function(a) { return this.trim().each(/\S+/g, a) },
        lines: function(a) { return this.trim().each(/^.*$/gm, a) },
        paragraphs: function(a) { var b = this.trim().split(/[\r\n]{2,}/); return b = b.map(function(b) { if (a) var d = a.call(b); return d ? d : b }) },
        isBlank: function() { return 0 === this.trim().length },
        has: function(a) { return -1 !== this.search(D(a) ? a : Ra(a)) },
        add: function(a, b) {
            b = N(b) ?
                this.length : b;
            return this.slice(0, b) + a + this.slice(b)
        },
        remove: function(a) { return this.replace(a, "") },
        reverse: function() { return this.split("").reverse().join("") },
        compact: function() { return this.trim().replace(/([\r\n\s\u3000])+/g, function(a, b) { return "\u3000" === b ? b : " " }) },
        at: function() { return Wa(this, arguments, !0) },
        from: function(a) { return this.slice(Mc(this, a, !0)) },
        to: function(a) { N(a) && (a = this.length); return this.slice(0, Mc(this, a)) },
        dasherize: function() { return this.underscore().replace(/_/g, "-") },
        underscore: function() {
            return this.replace(/[-\s]+/g,
                "_").replace(s.Inflector && s.Inflector.acronymRegExp, function(a, b) { return (0 < b ? "_" : "") + a.toLowerCase() }).replace(/([A-Z\d]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").toLowerCase()
        },
        camelize: function(a) {
            return this.underscore().replace(/(^|_)([^_]+)/g, function(b, c, d, e) {
                b = (b = s.Inflector) && b.acronyms[d];
                b = y(b) ? b : void 0;
                e = !1 !== a || 0 < e;
                return b ? e ? b : b.toLowerCase() : e ? d.capitalize() : d
            })
        },
        spacify: function() { return this.underscore().replace(/_/g, " ") },
        stripTags: function() {
            var a = this;
            sa(0 < arguments.length ?
                arguments : [""],
                function(b) { a = a.replace(q("</?" + Ra(b) + "[^<>]*>", "gi"), "") });
            return a
        },
        removeTags: function() {
            var a = this;
            sa(0 < arguments.length ? arguments : ["\\S+"], function(b) {
                b = q("<(" + b + ")[^<>]*(?:\\/>|>.*?<\\/\\1>)", "gi");
                a = a.replace(b, "")
            });
            return a
        },
        truncate: function(a, b, c) { return Kc(this, a, b, c) },
        truncateOnWord: function(a, b, c) { return Kc(this, a, b, c, !0) },
        pad: function(a, b) {
            var c, d;
            a = Ic(a);
            c = S(0, a - this.length) / 2;
            d = Q(c);
            c = Aa(c);
            return Jc(d, b) + this + Jc(c, b)
        },
        padLeft: function(a, b) {
            a = Ic(a);
            return Jc(S(0, a -
                this.length), b) + this
        },
        padRight: function(a, b) { a = Ic(a); return this + Jc(S(0, a - this.length), b) },
        first: function(a) { N(a) && (a = 1); return this.substr(0, a) },
        last: function(a) { N(a) && (a = 1); return this.substr(0 > this.length - a ? 0 : this.length - a) },
        toNumber: function(a) { return Oa(this, a) },
        capitalize: function(a) {
            var b;
            return this.toLowerCase().replace(a ? /[^']/g : /^\S/, function(a) {
                var d = a.toUpperCase(),
                    e;
                e = b ? a : d;
                b = d !== a;
                return e
            })
        },
        assign: function() {
            var a = {};
            sa(arguments, function(b, c) { G(b) ? xa(a, b) : a[c + 1] = b });
            return this.replace(/\{([^{]+?)\}/g,
                function(b, c) { return J(a, c) ? a[c] : b })
        }
    });
    H(s, !0, !0, { insert: s.prototype.add });
    (function(a) {
        if (ba.btoa) Nc = ba.btoa, Oc = ba.atob;
        else {
            var b = /[^A-Za-z0-9\+\/\=]/g;
            Nc = function(b) {
                var d = "",
                    e, g, f, h, m, n, z = 0;
                do e = b.charCodeAt(z++), g = b.charCodeAt(z++), f = b.charCodeAt(z++), h = e >> 2, e = (e & 3) << 4 | g >> 4, m = (g & 15) << 2 | f >> 6, n = f & 63, isNaN(g) ? m = n = 64 : isNaN(f) && (n = 64), d = d + a.charAt(h) + a.charAt(e) + a.charAt(m) + a.charAt(n); while (z < b.length);
                return d
            };
            Oc = function(c) {
                var d = "",
                    e, g, f, h, m, n = 0;
                if (c.match(b)) throw Error("String contains invalid base64 characters");
                c = c.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                do e = a.indexOf(c.charAt(n++)),
                    g = a.indexOf(c.charAt(n++)), h = a.indexOf(c.charAt(n++)), m = a.indexOf(c.charAt(n++)), e = e << 2 | g >> 4, g = (g & 15) << 4 | h >> 2, f = (h & 3) << 6 | m, d += s.fromCharCode(e), 64 != h && (d += s.fromCharCode(g)), 64 != m && (d += s.fromCharCode(f)); while (n < c.length);
                return d
            }
        }
    })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
})();
/*
 * jQuery simple-color plugin
 * @requires jQuery v1.4.2 or later
 *
 * See http://recursive-design.com/projects/jquery-simple-color/
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version: 1.0.1 (201108151520)
 */

(function($) {
    /**
     * simpleColor() provides a mechanism for displaying simple color-pickers.
     *
     * If an options Object is provided, the following attributes are supported:
     *
     *  defaultColor:       Default (initially selected) color.
     *                       default value: '#FFF'
     *
     *  border:             CSS border properties.
     *                       default value: '1px solid #000'
     *
     *  cellWidth:          Width of each individual color cell.
     *                       default value: 10
     *
     *  cellHeight:         Height of each individual color cell.
     *                       default value: 10
     *
     *  cellMargin:         Margin of each individual color cell.
     *                       default value: 1
     *
     *  boxWidth:           Width of the color display box.
     *                       default value: 115px
     *
     *  boxHeight:          Height of the color display box.
     *                       default value: 20px
     *
     *  columns:            Number of columns to display. Color order may look strange if this is altered.
     *                       default value: 16
     *
     *  insert:             The position to insert the color picker. 'before' or 'after'.
     *                       default value: 'after'
     *
     *  buttonClass:        A custom CSS class to add to the button, if you want to add some custom styling.
     *                       default value: ''
     *
     *  colors:             An array of colors to display, if you want to customize the default color set.
     *                       default value: default color set - see 'default_colors' below.
     *
     *  displayColorCode:   Display the color code (eg #333333) as text inside the button. true or false.
     *                       default value: false
     *
     *  colorCodeAlign:     Text alignment used to display the color code inside the button. Only used if 'displayColorCode' is true. 'left', 'center' or 'right'
     *                       default value: 'center'
     *
     *  colorCodeColor:     Text color of the color code inside the button. Only used if 'displayColorCode' is true.
     *                       default value: '#FFF'            
     */
    $.fn.simpleColor = function(options) {

        var default_colors = ['990033', 'ff3366', 'cc0033', 'ff0033', 'ff9999', 'cc3366', 'ffccff', 'cc6699',
            '993366', '660033', 'cc3399', 'ff99cc', 'ff66cc', 'ff99ff', 'ff6699', 'cc0066',
            'ff0066', 'ff3399', 'ff0099', 'ff33cc', 'ff00cc', 'ff66ff', 'ff33ff', 'ff00ff',
            'cc0099', '990066', 'cc66cc', 'cc33cc', 'cc99ff', 'cc66ff', 'cc33ff', '993399',
            'cc00cc', 'cc00ff', '9900cc', '990099', 'cc99cc', '996699', '663366', '660099',
            '9933cc', '660066', '9900ff', '9933ff', '9966cc', '330033', '663399', '6633cc',
            '6600cc', '9966ff', '330066', '6600ff', '6633ff', 'ccccff', '9999ff', '9999cc',
            '6666cc', '6666ff', '666699', '333366', '333399', '330099', '3300cc', '3300ff',
            '3333ff', '3333cc', '0066ff', '0033ff', '3366ff', '3366cc', '000066', '000033',
            '0000ff', '000099', '0033cc', '0000cc', '336699', '0066cc', '99ccff', '6699ff',
            '003366', '6699cc', '006699', '3399cc', '0099cc', '66ccff', '3399ff', '003399',
            '0099ff', '33ccff', '00ccff', '99ffff', '66ffff', '33ffff', '00ffff', '00cccc',
            '009999', '669999', '99cccc', 'ccffff', '33cccc', '66cccc', '339999', '336666',
            '006666', '003333', '00ffcc', '33ffcc', '33cc99', '00cc99', '66ffcc', '99ffcc',
            '00ff99', '339966', '006633', '336633', '669966', '66cc66', '99ff99', '66ff66',
            '339933', '99cc99', '66ff99', '33ff99', '33cc66', '00cc66', '66cc99', '009966',
            '009933', '33ff66', '00ff66', 'ccffcc', 'ccff99', '99ff66', '99ff33', '00ff33',
            '33ff33', '00cc33', '33cc33', '66ff33', '00ff00', '66cc33', '006600', '003300',
            '009900', '33ff00', '66ff00', '99ff00', '66cc00', '00cc00', '33cc00', '339900',
            '99cc66', '669933', '99cc33', '336600', '669900', '99cc00', 'ccff66', 'ccff33',
            'ccff00', '999900', 'cccc00', 'cccc33', '333300', '666600', '999933', 'cccc66',
            '666633', '999966', 'cccc99', 'ffffcc', 'ffff99', 'ffff66', 'ffff33', 'ffff00',
            'ffcc00', 'ffcc66', 'ffcc33', 'cc9933', '996600', 'cc9900', 'ff9900', 'cc6600',
            '993300', 'cc6633', '663300', 'ff9966', 'ff6633', 'ff9933', 'ff6600', 'cc3300',
            '996633', '330000', '663333', '996666', 'cc9999', '993333', 'cc6666', 'ffcccc',
            'ff3333', 'cc3333', 'ff6666', '660000', '990000', 'cc0000', 'ff0000', 'ff3300',
            'cc9966', 'ffcc99', 'ffffff', 'cccccc', '999999', '666666', '333333', '000000',
            '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000'
        ];

        // Option defaults
        options = $.extend({
            defaultColor: this.attr('defaultColor') || '#FFF',
            border: this.attr('border') || '1px solid #000',
            cellWidth: this.attr('cellWidth') || 10,
            cellHeight: this.attr('cellHeight') || 10,
            cellMargin: this.attr('cellMargin') || 1,
            boxWidth: this.attr('boxWidth') || '115px',
            boxHeight: this.attr('boxHeight') || '20px',
            columns: this.attr('columns') || 16,
            insert: this.attr('insert') || 'after',
            buttonClass: this.attr('buttonClass') || '',
            colors: this.attr('colors') || default_colors,
            displayColorCode: this.attr('displayColorCode') || false,
            colorCodeAlign: this.attr('colorCodeAlign') || 'center',
            colorCodeColor: this.attr('colorCodeColor') || '#FFF'

        }, options || {});

        // Hide the input
        this.hide();

        // Figure out the cell dimensions
        options.totalWidth = options.columns * (options.cellWidth + (2 * options.cellMargin));
        if ($.browser.msie) {
            options.totalWidth += 2;
        }

        options.totalHeight = Math.ceil(options.colors.length / options.columns) * (options.cellHeight + (2 * options.cellMargin));

        // Store these options so they'll be available to the other functions
        // TODO - must be a better way to do this, not sure what the 'official'
        // jQuery method is. Ideally i want to pass these as a parameter to the 
        // each() function but i'm not sure how
        $.simpleColorOptions = options;

        var input = this;


        function buildSelector(index) {

            var options = $.simpleColorOptions;

            // Create a container to hold everything
            var container = $("<div class='simpleColorContainer' />");

            // Create the color display box
            var default_color = (this.value && this.value != '') ? this.value : options.defaultColor;

            var display_box = $("<div class='simpleColorDisplay' />");
            display_box.css('backgroundColor', default_color);
            display_box.css('border', options.border);
            display_box.css('width', options.boxWidth);
            display_box.css('height', options.boxHeight);
            display_box.css('cursor', 'pointer');
            container.append(display_box);

            // If 'displayColorCode' is turned on, display the currently selected color code as text inside the button.
            if (options.displayColorCode) {
                display_box.text(this.value);
                display_box.css('color', options.colorCodeColor);
                display_box.css('textAlign', options.colorCodeAlign);
            }

            // Create the select button 
            var select_button = $("<input type='button' value='Select'" +
                " class='simpleColorSelectButton " + options.buttonClass + "'>");
            container.append(select_button);

            // Create the cancel button
            var cancel_button = $("<input type='button' value='Cancel'" +
                " class='simpleColorCancelButton " + options.buttonClass + "'>");

            container.append(cancel_button);
            cancel_button.hide();

            var select_callback = function(event) {
                event.data.select_button.hide();
                event.data.cancel_button.show();

                closeAllOpenSelectors();
                openSelectors = openSelectors.add(event.data.input);
                event.stopPropagation();

                // Use an existing chooser if there is one
                if (event.data.container.chooser) {
                    event.data.container.chooser.show();

                    // Build the chooser
                } else {

                    // Make a chooser div to hold the cells
                    var chooser = $("<div class='simpleColorChooser'/>");
                    chooser.css('border', options.border);
                    chooser.css('margin', '0px');
                    chooser.css('margin-top', '3px');
                    chooser.css('width', options.totalWidth + 'px');
                    chooser.css('height', options.totalHeight + 'px');

                    event.data.container.chooser = chooser;
                    event.data.container.append(chooser);

                    // Create the cells
                    for (var i = 0; i < options.colors.length; i++) {
                        var cell = $("<div class='simpleColorCell' id='" + options.colors[i] + "'/>");
                        cell.css('width', options.cellWidth + 'px');
                        cell.css('height', options.cellHeight + 'px');
                        cell.css('margin', options.cellMargin + 'px');
                        cell.css('cursor', 'pointer');
                        cell.css('lineHeight', options.cellHeight + 'px');
                        cell.css('fontSize', '1px');
                        cell.css('float', 'left');
                        cell.css('backgroundColor', '#' + options.colors[i]);
                        chooser.append(cell);

                        cell.bind('click', {
                                input: event.data.input,
                                chooser: chooser,
                                select_button: select_button,
                                cancel_button: cancel_button,
                                display_box: display_box
                            },
                            function(event) {
                                event.data.input.value = '#' + this.id;
                                $(event.data.input).change();
                                event.data.display_box.css('backgroundColor', '#' + this.id);
                                event.data.chooser.hide();
                                event.data.cancel_button.hide();
                                event.data.display_box.show();
                                event.data.select_button.show();

                                // If 'displayColorCode' is turned on, display the currently selected color code as text inside the button.
                                if (options.displayColorCode) {
                                    event.data.display_box.text('#' + this.id);
                                }
                            }
                        );
                    }
                }
            };

            var callback_params = {
                container: container,
                input: this,
                cancel_button: cancel_button,
                display_box: display_box,
                select_button: select_button
            };

            // Bind the select button to display the chooser.
            select_button.bind('click', callback_params, select_callback);

            // Also bind the display box button to display the chooser.
            display_box.bind('click', callback_params, select_callback);

            // Bind the cancel button to hide the chooser
            cancel_button.bind('click', {
                    container: container,
                    select_button: select_button,
                    display_box: display_box
                },
                function(event) {
                    $(this).hide();
                    event.data.container.find('.simpleColorChooser').hide();
                    event.data.display_box.show();
                    event.data.select_button.show();
                }
            );

            $(this).after(container);

        };

        this.each(buildSelector);

        return this;
    };

    var openSelectors = $();

    function closeAllOpenSelectors() {
        openSelectors.closeSelector();
        openSelectors = $();
    }
    $(document.body).click(closeAllOpenSelectors);

    /*
     * Close the given color selectors
     */
    $.fn.closeSelector = function() {
        this.each(function(index) {
            var container = $(this).parent().find('div.simpleColorContainer');
            container.find('.simpleColorCancelButton').hide();
            container.find('.simpleColorChooser').hide();
            container.find('.simpleColorDisplay').show();
            container.find('.simpleColorSelectButton').show();
        });

        return this;
    };

})(jQuery);
/*
 *
 * Copyright (c) 2010 C. F., Wong (<a href="http://cloudgen.w0ng.hk">Cloudgen Examplet Store</a>)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($, len, createRange, duplicate) {
    $.fn.caret = function(options, opt2) {
        var start, end, t = this[0];
        var is_ie = false; //(typeof this[0].createTextRange != 'undefined');
        if (typeof options === "object" && typeof options.start === "number" && typeof options.end === "number") {
            start = options.start;
            end = options.end;
        } else if (typeof options === "number" && typeof opt2 === "number") {
            start = options;
            end = opt2;
        } else if (typeof options === "string") {
            if ((start = t.value.indexOf(options)) > -1) end = start + options[len];
            else start = null;
        } else if (Object.prototype.toString.call(options) === "[object RegExp]") {
            var re = options.exec(t.value);
            if (re != null) {
                start = re.index;
                end = start + re[0][len];
            }
        }
        if (typeof start != "undefined") {
            if (is_ie) {
                var selRange = this[0].createTextRange();
                selRange.collapse(true);
                selRange.moveStart('character', start);
                selRange.moveEnd('character', end - start);
                selRange.select();
            } else {
                this[0].selectionStart = start;
                this[0].selectionEnd = end;
            }
            this[0].focus();
            return this
        } else {
            // Modification as suggested by ÐÐ½Ð´Ñ€ÐµÐ¹ Ð®Ñ‚ÐºÐ¸Ð½
            if (is_ie) {
                var selection = document.selection;
                if (this[0].tagName.toLowerCase() != "textarea") {
                    var val = this.val(),
                        range = selection[createRange]()[duplicate]();
                    range.moveEnd("character", val[len]);
                    var s = (range.text == "" ? val[len] : val.lastIndexOf(range.text));
                    range = selection[createRange]()[duplicate]();
                    range.moveStart("character", -val[len]);
                    var e = range.text[len];
                } else {
                    var range = selection[createRange](),
                        stored_range = range[duplicate]();
                    stored_range.moveToElementText(this[0]);
                    stored_range.setEndPoint('EndToEnd', range);
                    var s = stored_range.text[len] - range.text[len],
                        e = s + range.text[len]
                }
                // End of Modification
            } else {
                var s = t.selectionStart,
                    e = t.selectionEnd;
            }
            var te = t.value.substring(s, e);
            var caret = {
                start: s,
                end: e,
                text: te,
                replace: function(st) {
                    return t.value.substring(0, caret.start) + st + t.value.substring(caret.end, t.value[len])
                }
            }
            return caret;
        }
    }
})(jQuery, "length", "createRange", "duplicate");
// Requires Sugar.js

(function() {

    var params;

    Object.extend({
        getURLParam: function(key) {
            params = params || Object.fromQueryString(window.location.search);
            return params[key];
        }
    }, false);


})();
// Very simple namespacing module
// Gets or sets a global namespace
// Created by Andrew Plummer
// poke poke

(function(context) {

    Namespace = function setNamespace(str, assignment) {
        var assign = arguments.length === 2,
            spaces = str.split('.'),
            space = context,
            i = 0,
            next;
        while (i < spaces.length) {
            next = spaces[i];
            if (!(next in space)) {
                space[next] = {};
            }
            if (assign && i === spaces.length - 1) {
                space[next] = assignment;
            }
            space = space[next];
            i += 1;
        }
        return space;
    }

})(this);
(function($) {

    // Requires Modernizr

    var tooltip;
    var arrow;
    var arrowWidth;
    var arrowHeight;
    var content;
    var win;

    function getState(el, options) {
        var s = {};
        var elementHeight = el.outerHeight();
        var elementWidth = el.outerWidth();
        var offset = el.offset();
        s.height = tooltip.outerHeight(true);
        s.width = tooltip.outerWidth(true);
        s.offset = {};
        s.offset.top = offset.top;
        s.offset.left = offset.left;
        s.offset.right = s.offset.left + elementWidth;
        s.offset.bottom = s.offset.top + elementHeight;
        s.offset.hCenter = s.offset.left + Math.floor(elementWidth / 2);
        s.offset.vCenter = s.offset.top + Math.floor(elementHeight / 2);
        s.css = {};
        s.on = {};
        s.off = {};
        s.arrow = {};
        return s;
    }

    function checkBounds(s, direction, margin, slide) {
        var bound, alternate;
        margin = parseInt(margin);
        slide = parseInt(slide);
        switch (direction) {
            case 'top':
                bound = win.scrollTop();
                if (s.offset.top - s.height - margin - slide < bound) alternate = 'bottom';
                s.on.top = s.offset.top - s.height - margin;
                s.off.top = s.on.top + slide;
                s.css.top = s.on.top - slide;
                s.css.left = getCenter(s, true);
                break;
            case 'left':
                bound = win.scrollLeft();
                if (s.offset.left - s.width - margin - slide < bound) alternate = 'right';
                s.on.left = s.offset.left - s.width - margin;
                s.off.left = s.on.left + slide;
                s.css.top = getCenter(s, false);
                s.css.left = s.on.left - slide;
                break;
            case 'bottom':
                bound = win.scrollTop() + win.height();
                if (s.offset.bottom + s.height + margin + slide > bound) alternate = 'top';
                s.on.top = s.offset.bottom + margin;
                s.off.top = s.offset.bottom - slide + margin;
                s.css.top = s.on.top + slide;
                s.css.left = getCenter(s, true);
                break;
            case 'right':
                bound = win.scrollLeft() + win.width();
                if (s.offset.right + s.width + margin + slide > bound) alternate = 'left';
                s.on.left = s.offset.right + margin;
                s.off.left = s.on.left - slide;
                s.css.left = s.on.left + slide;
                s.css.top = getCenter(s, false);
                break;
        }
        if (alternate && !s.over) {
            s.over = true;
            checkBounds(s, alternate, margin, slide);
        } else {
            s.direction = direction;
            getArrowOffset(s, direction);
            checkSlide(s, direction);
        }
    }

    function checkSlide(s, dir) {
        var offset;
        if (dir == 'top' || dir == 'bottom') {
            offset = win.scrollLeft() - s.css.left + 5;
            if (offset > 0) {
                s.css.left += Math.abs(offset);
                s.arrow.left -= offset;
            }
            offset = (s.css.left + s.width) - (win.scrollLeft() + win.width()) + 5;
            if (offset > 0) {
                s.css.left -= Math.abs(offset);
                s.arrow.left += offset;
            }
        } else if (dir == 'left' || dir == 'right') {
            offset = win.scrollTop() - s.css.top + 5;
            if (offset > 0) {
                s.css.top += Math.abs(offset);
                s.arrow.top -= offset;
            }
            offset = (s.css.top + s.height) - (win.scrollTop() + win.height()) + 5;
            if (offset > 0) {
                s.css.top -= Math.abs(offset);
                s.arrow.top += offset;
            }
        }
    }

    function getArrowOffset(s, dir) {
        if (dir == 'left' || dir == 'right') {
            s.arrow.top = Math.floor((s.height / 2) - (arrowHeight / 2));
        } else {
            s.arrow.left = Math.floor((s.width / 2) - (arrowWidth / 2));
        }
        s.arrow[getInverseDirection(dir)] = -arrowHeight;
    }

    function getInverseDirection(dir) {
        switch (dir) {
            case 'top':
                return 'bottom';
            case 'bottom':
                return 'top';
            case 'left':
                return 'right';
            case 'right':
                return 'left';
        }
    }

    function getCenter(s, horizontal) {
        if (horizontal) {
            return s.offset.hCenter + (-s.width / 2);
        } else {
            return s.offset.vCenter + (-s.height / 2);
        }
    }

    function animateTooltip(s, options, el, fn) {
        var color = getDefault('color', options, el, 'black');
        var duration = getDefault('duration', options, el, 150);
        tooltip.attr('class', color + ' ' + s.direction);
        tooltip.stop(true, true).css(s.css);
        arrow.attr('style', '').css(s.arrow);
        tooltip.animate(s.on, {
            duration: duration,
            queue: false,
            complete: fn
        });
        tooltip.fadeIn(duration);
    }

    function animateTooltipOut(s, options, el, fn) {
        var duration = getDefault('duration', options, el, 100);
        tooltip.animate(s.off, {
            duration: duration,
            queue: false,
            complete: fn
        });
        tooltip.fadeOut(duration);
    }

    function unescapeHTML(html) {
        if (/&/.test(html)) {
            html = $('<p/>').html(html).text();
        }
        return html;
    }

    function setContent(el, title) {
        var html;
        try {
            var ref = $(document.body).find(title);
        } catch (e) {
            // May throw a malfolmed selector error
        }
        if (ref && ref.length > 0) {
            html = ref.html();
        } else {
            html = unescapeHTML(title);
        }
        content.html(html);
    }

    function getDefault(name, options, el, defaultValue) {
        return or(options[name], el.data('tooltip-' + name), defaultValue);
    }

    function or() {
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] !== undefined) {
                return arguments[i];
            }
        }
    }

    jQuery.fn.tooltip = function(options) {
        options = options || {};
        this.each(function() {
            var el = $(this);
            var title = el.attr('title');
            if (!title) return;
            var animating = false;
            var state;
            var timer;
            el.unbind('mouseenter').mouseenter(function() {
                var delay = getDefault('delay', options, el, 100);
                clearTimeout(timer);
                timer = setTimeout(function() {
                    var margin = getDefault('margin', options, el, 10);
                    var slide = getDefault('slide', options, el, 10);
                    var direction = getDefault('direction', options, el, 'top');
                    var t = el.attr('title');
                    if (t) {
                        title = t;
                    }
                    el.removeAttr('title');
                    setContent(el, options.html || title);
                    state = getState(el, options);
                    checkBounds(state, direction, margin, slide);
                    animateTooltip(state, options, el, function() {
                        animating = false;
                    });
                    animating = true;
                }, delay);
            });
            el.unbind('mouseleave').mouseleave(function() {
                clearTimeout(timer);
                if (!state) return;
                if (animating) {
                    tooltip.fadeOut(100, function() {
                        animating = false;
                    });
                } else {
                    animateTooltipOut(state, options, el, function() {
                        animating = false;
                    });
                }
                state = null;
                animating = true;
            });
        });
    };

    $(document).ready(function() {
        if (Modernizr.touch) {
            return;
        }
        tooltip = $('<div id="tooltip" />').appendTo(document.body).css('position', 'absolute').hide();
        arrow = $('<div class="arrow" />').appendTo(tooltip);
        content = $('<div class="content" />').appendTo(tooltip);
        win = $(window);
        arrowWidth = arrow.width();
        arrowHeight = arrow.height();
        $('[title]').tooltip();
    });

})(jQuery);
(function($) {

    $.fn.toggleButtons = setToggle;

    function setToggle() {
        this.each(function() {
            var group = $(this),
                hidden = $('#' + group.data('toggle'));
            group.on('click', 'button', function(event) {
                $('button', group).removeClass('btn-primary');
                $(this).addClass('btn-primary');
                hidden.val($(event.target).data('toggle-value')).trigger('change');
            });
        });
    }

    function initialize() {
        setToggle.apply($('[data-toggle]'));
    }

    $(document).ready(initialize)

})(jQuery);
/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */

;
(function(factory) {
    var registeredInModuleLoader = false;
    if (typeof define === 'function' && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
    }
    if (typeof exports === 'object') {
        module.exports = factory();
        registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function() {
            window.Cookies = OldCookies;
            return api;
        };
    }
}(function() {
    function extend() {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init(converter) {
        function api(key, value, attributes) {
            var result;
            if (typeof document === 'undefined') {
                return;
            }

            // Write

            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);

                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }

                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}

                if (!converter.write) {
                    value = encodeURIComponent(String(value))
                        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                } else {
                    value = converter.write(value, key);
                }

                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);

                return (document.cookie = [
                    key, '=', value,
                    attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    attributes.path ? '; path=' + attributes.path : '',
                    attributes.domain ? '; domain=' + attributes.domain : '',
                    attributes.secure ? '; secure' : ''
                ].join(''));
            }

            // Read

            if (!key) {
                result = {};
            }

            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling "get()"
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;

            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookie = parts.slice(1).join('=');

                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }

                try {
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = converter.read ?
                        converter.read(cookie, name) : converter(cookie, name) ||
                        cookie.replace(rdecode, decodeURIComponent);

                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }

                    if (key === name) {
                        result = cookie;
                        break;
                    }

                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {}
            }

            return result;
        }

        api.set = api;
        api.get = function(key) {
            return api.call(api, key);
        };
        api.getJSON = function() {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};

        api.remove = function(key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };

        api.withConverter = init;

        return api;
    }

    return init(function() {});
}));
// Snap.svg 0.3.0
// 
// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
// http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// 
// build: 2014-06-03
! function(a) {
    var b, c, d = "0.4.2",
        e = "hasOwnProperty",
        f = /[\.\/]/,
        g = /\s*,\s*/,
        h = "*",
        i = function(a, b) { return a - b },
        j = { n: {} },
        k = function() {
            for (var a = 0, b = this.length; b > a; a++)
                if ("undefined" != typeof this[a]) return this[a]
        },
        l = function() {
            for (var a = this.length; --a;)
                if ("undefined" != typeof this[a]) return this[a]
        },
        m = function(a, d) {
            a = String(a);
            var e, f = c,
                g = Array.prototype.slice.call(arguments, 2),
                h = m.listeners(a),
                j = 0,
                n = [],
                o = {},
                p = [],
                q = b;
            p.firstDefined = k, p.lastDefined = l, b = a, c = 0;
            for (var r = 0, s = h.length; s > r; r++) "zIndex" in h[r] && (n.push(h[r].zIndex), h[r].zIndex < 0 && (o[h[r].zIndex] = h[r]));
            for (n.sort(i); n[j] < 0;)
                if (e = o[n[j++]], p.push(e.apply(d, g)), c) return c = f, p;
            for (r = 0; s > r; r++)
                if (e = h[r], "zIndex" in e)
                    if (e.zIndex == n[j]) {
                        if (p.push(e.apply(d, g)), c) break;
                        do
                            if (j++, e = o[n[j]], e && p.push(e.apply(d, g)), c) break;
                        while (e)
                    } else o[e.zIndex] = e;
            else if (p.push(e.apply(d, g)), c) break;
            return c = f, b = q, p
        };
    m._events = j, m.listeners = function(a) {
        var b, c, d, e, g, i, k, l, m = a.split(f),
            n = j,
            o = [n],
            p = [];
        for (e = 0, g = m.length; g > e; e++) {
            for (l = [], i = 0, k = o.length; k > i; i++)
                for (n = o[i].n, c = [n[m[e]], n[h]], d = 2; d--;) b = c[d], b && (l.push(b), p = p.concat(b.f || []));
            o = l
        }
        return p
    }, m.on = function(a, b) {
        if (a = String(a), "function" != typeof b) return function() {};
        for (var c = a.split(g), d = 0, e = c.length; e > d; d++) ! function(a) {
            for (var c, d = a.split(f), e = j, g = 0, h = d.length; h > g; g++) e = e.n, e = e.hasOwnProperty(d[g]) && e[d[g]] || (e[d[g]] = { n: {} });
            for (e.f = e.f || [], g = 0, h = e.f.length; h > g; g++)
                if (e.f[g] == b) { c = !0; break }!c && e.f.push(b)
        }(c[d]);
        return function(a) {+a == +a && (b.zIndex = +a) }
    }, m.f = function(a) { var b = [].slice.call(arguments, 1); return function() { m.apply(null, [a, null].concat(b).concat([].slice.call(arguments, 0))) } }, m.stop = function() { c = 1 }, m.nt = function(a) { return a ? new RegExp("(?:\\.|\\/|^)" + a + "(?:\\.|\\/|$)").test(b) : b }, m.nts = function() { return b.split(f) }, m.off = m.unbind = function(a, b) {
        if (!a) return void(m._events = j = { n: {} });
        var c = a.split(g);
        if (c.length > 1)
            for (var d = 0, i = c.length; i > d; d++) m.off(c[d], b);
        else {
            c = a.split(f);
            var k, l, n, d, i, o, p, q = [j];
            for (d = 0, i = c.length; i > d; d++)
                for (o = 0; o < q.length; o += n.length - 2) {
                    if (n = [o, 1], k = q[o].n, c[d] != h) k[c[d]] && n.push(k[c[d]]);
                    else
                        for (l in k) k[e](l) && n.push(k[l]);
                    q.splice.apply(q, n)
                }
            for (d = 0, i = q.length; i > d; d++)
                for (k = q[d]; k.n;) {
                    if (b) {
                        if (k.f) {
                            for (o = 0, p = k.f.length; p > o; o++)
                                if (k.f[o] == b) { k.f.splice(o, 1); break }!k.f.length && delete k.f
                        }
                        for (l in k.n)
                            if (k.n[e](l) && k.n[l].f) {
                                var r = k.n[l].f;
                                for (o = 0, p = r.length; p > o; o++)
                                    if (r[o] == b) { r.splice(o, 1); break }!r.length && delete k.n[l].f
                            }
                    } else { delete k.f; for (l in k.n) k.n[e](l) && k.n[l].f && delete k.n[l].f }
                    k = k.n
                }
        }
    }, m.once = function(a, b) { var c = function() { return m.unbind(a, c), b.apply(this, arguments) }; return m.on(a, c) }, m.version = d, m.toString = function() { return "You are running Eve " + d }, "undefined" != typeof module && module.exports ? module.exports = m : "function" == typeof define && define.amd ? define("eve", [], function() { return m }) : a.eve = m
}(this),
function(a, b) { "function" == typeof define && define.amd ? define(["eve"], function(c) { return b(a, c) }) : b(a, a.eve) }(this, function(a, b) {
    var c = function(b) {
            var c = {},
                d = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function(a) { setTimeout(a, 16) },
                e = Array.isArray || function(a) { return a instanceof Array || "[object Array]" == Object.prototype.toString.call(a) },
                f = 0,
                g = "M" + (+new Date).toString(36),
                h = function() { return g + (f++).toString(36) },
                i = Date.now || function() { return +new Date },
                j = function(a) {
                    var b = this;
                    if (null == a) return b.s;
                    var c = b.s - a;
                    b.b += b.dur * c, b.B += b.dur * c, b.s = a
                },
                k = function(a) { var b = this; return null == a ? b.spd : void(b.spd = a) },
                l = function(a) { var b = this; return null == a ? b.dur : (b.s = b.s * a / b.dur, void(b.dur = a)) },
                m = function() {
                    var a = this;
                    delete c[a.id], a.update(), b("mina.stop." + a.id, a)
                },
                n = function() {
                    var a = this;
                    a.pdif || (delete c[a.id], a.update(), a.pdif = a.get() - a.b)
                },
                o = function() {
                    var a = this;
                    a.pdif && (a.b = a.get() - a.pdif, delete a.pdif, c[a.id] = a)
                },
                p = function() {
                    var a, b = this;
                    if (e(b.start)) { a = []; for (var c = 0, d = b.start.length; d > c; c++) a[c] = +b.start[c] + (b.end[c] - b.start[c]) * b.easing(b.s) } else a = +b.start + (b.end - b.start) * b.easing(b.s);
                    b.set(a)
                },
                q = function() {
                    var a = 0;
                    for (var e in c)
                        if (c.hasOwnProperty(e)) {
                            var f = c[e],
                                g = f.get();
                            a++, f.s = (g - f.b) / (f.dur / f.spd), f.s >= 1 && (delete c[e], f.s = 1, a--, function(a) { setTimeout(function() { b("mina.finish." + a.id, a) }) }(f)), f.update()
                        }
                    a && d(q)
                },
                r = function(a, b, e, f, g, i, s) {
                    var t = { id: h(), start: a, end: b, b: e, s: 0, dur: f - e, spd: 1, get: g, set: i, easing: s || r.linear, status: j, speed: k, duration: l, stop: m, pause: n, resume: o, update: p };
                    c[t.id] = t;
                    var u, v = 0;
                    for (u in c)
                        if (c.hasOwnProperty(u) && (v++, 2 == v)) break;
                    return 1 == v && d(q), t
                };
            return r.time = i, r.getById = function(a) { return c[a] || null }, r.linear = function(a) { return a }, r.easeout = function(a) { return Math.pow(a, 1.7) }, r.easein = function(a) { return Math.pow(a, .48) }, r.easeinout = function(a) {
                if (1 == a) return 1;
                if (0 == a) return 0;
                var b = .48 - a / 1.04,
                    c = Math.sqrt(.1734 + b * b),
                    d = c - b,
                    e = Math.pow(Math.abs(d), 1 / 3) * (0 > d ? -1 : 1),
                    f = -c - b,
                    g = Math.pow(Math.abs(f), 1 / 3) * (0 > f ? -1 : 1),
                    h = e + g + .5;
                return 3 * (1 - h) * h * h + h * h * h
            }, r.backin = function(a) { if (1 == a) return 1; var b = 1.70158; return a * a * ((b + 1) * a - b) }, r.backout = function(a) {
                if (0 == a) return 0;
                a -= 1;
                var b = 1.70158;
                return a * a * ((b + 1) * a + b) + 1
            }, r.elastic = function(a) { return a == !!a ? a : Math.pow(2, -10 * a) * Math.sin(2 * (a - .075) * Math.PI / .3) + 1 }, r.bounce = function(a) {
                var b, c = 7.5625,
                    d = 2.75;
                return 1 / d > a ? b = c * a * a : 2 / d > a ? (a -= 1.5 / d, b = c * a * a + .75) : 2.5 / d > a ? (a -= 2.25 / d, b = c * a * a + .9375) : (a -= 2.625 / d, b = c * a * a + .984375), b
            }, a.mina = r, r
        }("undefined" == typeof b ? function() {} : b),
        d = function() {
            function d(a, b) { if (a) { if (a.tagName) return y(a); if (f(a, "array") && d.set) return d.set.apply(d, a); if (a instanceof u) return a; if (null == b) return a = z.doc.querySelector(a), y(a) } return a = null == a ? "100%" : a, b = null == b ? "100%" : b, new x(a, b) }

            function e(a, b) {
                if (b) {
                    if ("#text" == a && (a = z.doc.createTextNode(b.text || "")), "string" == typeof a && (a = e(a)), "string" == typeof b) return "xlink:" == b.substring(0, 6) ? a.getAttributeNS(W, b.substring(6)) : "xml:" == b.substring(0, 4) ? a.getAttributeNS(X, b.substring(4)) : a.getAttribute(b);
                    for (var c in b)
                        if (b[A](c)) {
                            var d = B(b[c]);
                            d ? "xlink:" == c.substring(0, 6) ? a.setAttributeNS(W, c.substring(6), d) : "xml:" == c.substring(0, 4) ? a.setAttributeNS(X, c.substring(4), d) : a.setAttribute(c, d) : a.removeAttribute(c)
                        }
                } else a = z.doc.createElementNS(X, a);
                return a
            }

            function f(a, b) { return b = B.prototype.toLowerCase.call(b), "finite" == b ? isFinite(a) : "array" == b && (a instanceof Array || Array.isArray && Array.isArray(a)) ? !0 : "null" == b && null === a || b == typeof a && null !== a || "object" == b && a === Object(a) || L.call(a).slice(8, -1).toLowerCase() == b }

            function h(a) { if ("function" == typeof a || Object(a) !== a) return a; var b = new a.constructor; for (var c in a) a[A](c) && (b[c] = h(a[c])); return b }

            function i(a, b) {
                for (var c = 0, d = a.length; d > c; c++)
                    if (a[c] === b) return a.push(a.splice(c, 1)[0])
            }

            function j(a, b, c) {
                function d() {
                    var e = Array.prototype.slice.call(arguments, 0),
                        f = e.join("â€"),
                        g = d.cache = d.cache || {},
                        h = d.count = d.count || [];
                    return g[A](f) ? (i(h, f), c ? c(g[f]) : g[f]) : (h.length >= 1e3 && delete g[h.shift()], h.push(f), g[f] = a.apply(b, e), c ? c(g[f]) : g[f])
                }
                return d
            }

            function k(a, b, c, d, e, f) {
                if (null == e) {
                    var g = a - c,
                        h = b - d;
                    return g || h ? (180 + 180 * E.atan2(-h, -g) / I + 360) % 360 : 0
                }
                return k(a, b, e, f) - k(c, d, e, f)
            }

            function l(a) { return a % 360 * I / 180 }

            function m(a) { return 180 * a / I % 360 }

            function n(a) { var b = []; return a = a.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function(a, c, d) { return d = d.split(/\s*,\s*|\s+/), "rotate" == c && 1 == d.length && d.push(0, 0), "scale" == c && (d.length > 2 ? d = d.slice(0, 2) : 2 == d.length && d.push(0, 0), 1 == d.length && d.push(d[0], 0, 0)), b.push("skewX" == c ? ["m", 1, 0, E.tan(l(d[0])), 1, 0, 0] : "skewY" == c ? ["m", 1, E.tan(l(d[0])), 0, 1, 0, 0] : [c.charAt(0)].concat(d)), a }), b }

            function o(a, b) {
                var c = eb(a),
                    e = new d.Matrix;
                if (c)
                    for (var f = 0, g = c.length; g > f; f++) {
                        var h, i, j, k, l, m = c[f],
                            n = m.length,
                            o = B(m[0]).toLowerCase(),
                            p = m[0] != o,
                            q = p ? e.invert() : 0;
                        "t" == o && 2 == n ? e.translate(m[1], 0) : "t" == o && 3 == n ? p ? (h = q.x(0, 0), i = q.y(0, 0), j = q.x(m[1], m[2]), k = q.y(m[1], m[2]), e.translate(j - h, k - i)) : e.translate(m[1], m[2]) : "r" == o ? 2 == n ? (l = l || b, e.rotate(m[1], l.x + l.width / 2, l.y + l.height / 2)) : 4 == n && (p ? (j = q.x(m[2], m[3]), k = q.y(m[2], m[3]), e.rotate(m[1], j, k)) : e.rotate(m[1], m[2], m[3])) : "s" == o ? 2 == n || 3 == n ? (l = l || b, e.scale(m[1], m[n - 1], l.x + l.width / 2, l.y + l.height / 2)) : 4 == n ? p ? (j = q.x(m[2], m[3]), k = q.y(m[2], m[3]), e.scale(m[1], m[1], j, k)) : e.scale(m[1], m[1], m[2], m[3]) : 5 == n && (p ? (j = q.x(m[3], m[4]), k = q.y(m[3], m[4]), e.scale(m[1], m[2], j, k)) : e.scale(m[1], m[2], m[3], m[4])) : "m" == o && 7 == n && e.add(m[1], m[2], m[3], m[4], m[5], m[6])
                    }
                return e
            }

            function p(a, b) {
                if (null == b) {
                    var c = !0;
                    if (b = a.node.getAttribute("linearGradient" == a.type || "radialGradient" == a.type ? "gradientTransform" : "pattern" == a.type ? "patternTransform" : "transform"), !b) return new d.Matrix;
                    b = n(b)
                } else b = d._.rgTransform.test(b) ? B(b).replace(/\.{3}|\u2026/g, a._.transform || J) : n(b), f(b, "array") && (b = d.path ? d.path.toString.call(b) : B(b)), a._.transform = b;
                var e = o(b, a.getBBox(1));
                return c ? e : void(a.matrix = e)
            }

            function q(a) {
                var b = a.node.ownerSVGElement && y(a.node.ownerSVGElement) || a.node.parentNode && y(a.node.parentNode) || d.select("svg") || d(0, 0),
                    c = b.select("defs"),
                    e = null == c ? !1 : c.node;
                return e || (e = w("defs", b.node).node), e
            }

            function r(a) { return a.node.ownerSVGElement && y(a.node.ownerSVGElement) || d.select("svg") }

            function s(a, b, c) {
                function d(a) {
                    if (null == a) return J;
                    if (a == +a) return a;
                    e(j, { width: a });
                    try { return j.getBBox().width } catch (b) { return 0 }
                }

                function f(a) {
                    if (null == a) return J;
                    if (a == +a) return a;
                    e(j, { height: a });
                    try { return j.getBBox().height } catch (b) { return 0 }
                }

                function g(d, e) { null == b ? i[d] = e(a.attr(d) || 0) : d == b && (i = e(null == c ? a.attr(d) || 0 : c)) }
                var h = r(a).node,
                    i = {},
                    j = h.querySelector(".svg---mgr");
                switch (j || (j = e("rect"), e(j, { x: -9e9, y: -9e9, width: 10, height: 10, "class": "svg---mgr", fill: "none" }), h.appendChild(j)), a.type) {
                    case "rect":
                        g("rx", d), g("ry", f);
                    case "image":
                        g("width", d), g("height", f);
                    case "text":
                        g("x", d), g("y", f);
                        break;
                    case "circle":
                        g("cx", d), g("cy", f), g("r", d);
                        break;
                    case "ellipse":
                        g("cx", d), g("cy", f), g("rx", d), g("ry", f);
                        break;
                    case "line":
                        g("x1", d), g("x2", d), g("y1", f), g("y2", f);
                        break;
                    case "marker":
                        g("refX", d), g("markerWidth", d), g("refY", f), g("markerHeight", f);
                        break;
                    case "radialGradient":
                        g("fx", d), g("fy", f);
                        break;
                    case "tspan":
                        g("dx", d), g("dy", f);
                        break;
                    default:
                        g(b, d)
                }
                return h.removeChild(j), i
            }

            function t(a) { f(a, "array") || (a = Array.prototype.slice.call(arguments, 0)); for (var b = 0, c = 0, d = this.node; this[b];) delete this[b++]; for (b = 0; b < a.length; b++) "set" == a[b].type ? a[b].forEach(function(a) { d.appendChild(a.node) }) : d.appendChild(a[b].node); var e = d.childNodes; for (b = 0; b < e.length; b++) this[c++] = y(e[b]); return this }

            function u(a) {
                if (a.snap in Y) return Y[a.snap];
                var b, c = this.id = V();
                try { b = a.ownerSVGElement } catch (d) {}
                if (this.node = a, b && (this.paper = new x(b)), this.type = a.tagName, this.anims = {}, this._ = { transform: [] }, a.snap = c, Y[c] = this, "g" == this.type && (this.add = t), this.type in { g: 1, mask: 1, pattern: 1 })
                    for (var e in x.prototype) x.prototype[A](e) && (this[e] = x.prototype[e])
            }

            function v(a) { this.node = a }

            function w(a, b) {
                var c = e(a);
                b.appendChild(c);
                var d = y(c);
                return d
            }

            function x(a, b) {
                var c, d, f, g = x.prototype;
                if (a && "svg" == a.tagName) {
                    if (a.snap in Y) return Y[a.snap];
                    var h = a.ownerDocument;
                    c = new u(a), d = a.getElementsByTagName("desc")[0], f = a.getElementsByTagName("defs")[0], d || (d = e("desc"), d.appendChild(h.createTextNode("Created with Snap")), c.node.appendChild(d)), f || (f = e("defs"), c.node.appendChild(f)), c.defs = f;
                    for (var i in g) g[A](i) && (c[i] = g[i]);
                    c.paper = c.root = c
                } else c = w("svg", z.doc.body), e(c.node, { height: b, version: 1.1, width: a, xmlns: X });
                return c
            }

            function y(a) { return a ? a instanceof u || a instanceof v ? a : a.tagName && "svg" == a.tagName.toLowerCase() ? new x(a) : a.tagName && "object" == a.tagName.toLowerCase() && "image/svg+xml" == a.type ? new x(a.contentDocument.getElementsByTagName("svg")[0]) : new u(a) : a }
            d.version = "0.3.0", d.toString = function() { return "Snap v" + this.version }, d._ = {};
            var z = { win: a, doc: a.document };
            d._.glob = z;
            var A = "hasOwnProperty",
                B = String,
                C = parseFloat,
                D = parseInt,
                E = Math,
                F = E.max,
                G = E.min,
                H = E.abs,
                I = (E.pow, E.PI),
                J = (E.round, ""),
                K = " ",
                L = Object.prototype.toString,
                M = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,
                N = "	\n\f\r Â áš€á Žâ€€â€â€‚â€ƒâ€„â€…â€†â€‡â€ˆâ€‰â€Šâ€¯âŸã€€\u2028\u2029",
                O = (d._.separator = new RegExp("[," + N + "]+"), new RegExp("[" + N + "]", "g"), new RegExp("[" + N + "]*,[" + N + "]*")),
                P = { hs: 1, rg: 1 },
                Q = new RegExp("([a-z])[" + N + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" + N + "]*,?[" + N + "]*)+)", "ig"),
                R = new RegExp("([rstm])[" + N + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" + N + "]*,?[" + N + "]*)+)", "ig"),
                S = new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[" + N + "]*,?[" + N + "]*", "ig"),
                T = 0,
                U = "S" + (+new Date).toString(36),
                V = function() { return U + (T++).toString(36) },
                W = "http://www.w3.org/1999/xlink",
                X = "http://www.w3.org/2000/svg",
                Y = {},
                Z = d.url = function(a) { return "url('#" + a + "')" };
            d._.$ = e, d._.id = V, d.format = function() {
                var a = /\{([^\}]+)\}/g,
                    b = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
                    c = function(a, c, d) { var e = d; return c.replace(b, function(a, b, c, d, f) { b = b || d, e && (b in e && (e = e[b]), "function" == typeof e && f && (e = e())) }), e = (null == e || e == d ? a : e) + "" };
                return function(b, d) { return B(b).replace(a, function(a, b) { return c(a, b, d) }) }
            }(), d._.clone = h, d._.cacher = j, d.rad = l, d.deg = m, d.angle = k, d.is = f, d.snapTo = function(a, b, c) {
                if (c = f(c, "finite") ? c : 10, f(a, "array")) {
                    for (var d = a.length; d--;)
                        if (H(a[d] - b) <= c) return a[d]
                } else { a = +a; var e = b % a; if (c > e) return b - e; if (e > a - c) return b - e + a }
                return b
            }, d.getRGB = j(function(a) { if (!a || (a = B(a)).indexOf("-") + 1) return { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: bb }; if ("none" == a) return { r: -1, g: -1, b: -1, hex: "none", toString: bb }; if (!(P[A](a.toLowerCase().substring(0, 2)) || "#" == a.charAt()) && (a = $(a)), !a) return { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: bb }; var b, c, e, g, h, i, j = a.match(M); return j ? (j[2] && (e = D(j[2].substring(5), 16), c = D(j[2].substring(3, 5), 16), b = D(j[2].substring(1, 3), 16)), j[3] && (e = D((h = j[3].charAt(3)) + h, 16), c = D((h = j[3].charAt(2)) + h, 16), b = D((h = j[3].charAt(1)) + h, 16)), j[4] && (i = j[4].split(O), b = C(i[0]), "%" == i[0].slice(-1) && (b *= 2.55), c = C(i[1]), "%" == i[1].slice(-1) && (c *= 2.55), e = C(i[2]), "%" == i[2].slice(-1) && (e *= 2.55), "rgba" == j[1].toLowerCase().slice(0, 4) && (g = C(i[3])), i[3] && "%" == i[3].slice(-1) && (g /= 100)), j[5] ? (i = j[5].split(O), b = C(i[0]), "%" == i[0].slice(-1) && (b /= 100), c = C(i[1]), "%" == i[1].slice(-1) && (c /= 100), e = C(i[2]), "%" == i[2].slice(-1) && (e /= 100), ("deg" == i[0].slice(-3) || "Â°" == i[0].slice(-1)) && (b /= 360), "hsba" == j[1].toLowerCase().slice(0, 4) && (g = C(i[3])), i[3] && "%" == i[3].slice(-1) && (g /= 100), d.hsb2rgb(b, c, e, g)) : j[6] ? (i = j[6].split(O), b = C(i[0]), "%" == i[0].slice(-1) && (b /= 100), c = C(i[1]), "%" == i[1].slice(-1) && (c /= 100), e = C(i[2]), "%" == i[2].slice(-1) && (e /= 100), ("deg" == i[0].slice(-3) || "Â°" == i[0].slice(-1)) && (b /= 360), "hsla" == j[1].toLowerCase().slice(0, 4) && (g = C(i[3])), i[3] && "%" == i[3].slice(-1) && (g /= 100), d.hsl2rgb(b, c, e, g)) : (b = G(E.round(b), 255), c = G(E.round(c), 255), e = G(E.round(e), 255), g = G(F(g, 0), 1), j = { r: b, g: c, b: e, toString: bb }, j.hex = "#" + (16777216 | e | c << 8 | b << 16).toString(16).slice(1), j.opacity = f(g, "finite") ? g : 1, j)) : { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: bb } }, d), d.hsb = j(function(a, b, c) { return d.hsb2rgb(a, b, c).hex }), d.hsl = j(function(a, b, c) { return d.hsl2rgb(a, b, c).hex }), d.rgb = j(function(a, b, c, d) { if (f(d, "finite")) { var e = E.round; return "rgba(" + [e(a), e(b), e(c), +d.toFixed(2)] + ")" } return "#" + (16777216 | c | b << 8 | a << 16).toString(16).slice(1) });
            var $ = function(a) {
                    var b = z.doc.getElementsByTagName("head")[0] || z.doc.getElementsByTagName("svg")[0],
                        c = "rgb(255, 0, 0)";
                    return ($ = j(function(a) {
                        if ("red" == a.toLowerCase()) return c;
                        b.style.color = c, b.style.color = a;
                        var d = z.doc.defaultView.getComputedStyle(b, J).getPropertyValue("color");
                        return d == c ? null : d
                    }))(a)
                },
                _ = function() { return "hsb(" + [this.h, this.s, this.b] + ")" },
                ab = function() { return "hsl(" + [this.h, this.s, this.l] + ")" },
                bb = function() { return 1 == this.opacity || null == this.opacity ? this.hex : "rgba(" + [this.r, this.g, this.b, this.opacity] + ")" },
                cb = function(a, b, c) {
                    if (null == b && f(a, "object") && "r" in a && "g" in a && "b" in a && (c = a.b, b = a.g, a = a.r), null == b && f(a, string)) {
                        var e = d.getRGB(a);
                        a = e.r, b = e.g, c = e.b
                    }
                    return (a > 1 || b > 1 || c > 1) && (a /= 255, b /= 255, c /= 255), [a, b, c]
                },
                db = function(a, b, c, e) { a = E.round(255 * a), b = E.round(255 * b), c = E.round(255 * c); var g = { r: a, g: b, b: c, opacity: f(e, "finite") ? e : 1, hex: d.rgb(a, b, c), toString: bb }; return f(e, "finite") && (g.opacity = e), g };
            d.color = function(a) { var b; return f(a, "object") && "h" in a && "s" in a && "b" in a ? (b = d.hsb2rgb(a), a.r = b.r, a.g = b.g, a.b = b.b, a.opacity = 1, a.hex = b.hex) : f(a, "object") && "h" in a && "s" in a && "l" in a ? (b = d.hsl2rgb(a), a.r = b.r, a.g = b.g, a.b = b.b, a.opacity = 1, a.hex = b.hex) : (f(a, "string") && (a = d.getRGB(a)), f(a, "object") && "r" in a && "g" in a && "b" in a && !("error" in a) ? (b = d.rgb2hsl(a), a.h = b.h, a.s = b.s, a.l = b.l, b = d.rgb2hsb(a), a.v = b.b) : (a = { hex: "none" }, a.r = a.g = a.b = a.h = a.s = a.v = a.l = -1, a.error = 1)), a.toString = bb, a }, d.hsb2rgb = function(a, b, c, d) { f(a, "object") && "h" in a && "s" in a && "b" in a && (c = a.b, b = a.s, a = a.h, d = a.o), a *= 360; var e, g, h, i, j; return a = a % 360 / 60, j = c * b, i = j * (1 - H(a % 2 - 1)), e = g = h = c - j, a = ~~a, e += [j, i, 0, 0, i, j][a], g += [i, j, j, i, 0, 0][a], h += [0, 0, i, j, j, i][a], db(e, g, h, d) }, d.hsl2rgb = function(a, b, c, d) { f(a, "object") && "h" in a && "s" in a && "l" in a && (c = a.l, b = a.s, a = a.h), (a > 1 || b > 1 || c > 1) && (a /= 360, b /= 100, c /= 100), a *= 360; var e, g, h, i, j; return a = a % 360 / 60, j = 2 * b * (.5 > c ? c : 1 - c), i = j * (1 - H(a % 2 - 1)), e = g = h = c - j / 2, a = ~~a, e += [j, i, 0, 0, i, j][a], g += [i, j, j, i, 0, 0][a], h += [0, 0, i, j, j, i][a], db(e, g, h, d) }, d.rgb2hsb = function(a, b, c) { c = cb(a, b, c), a = c[0], b = c[1], c = c[2]; var d, e, f, g; return f = F(a, b, c), g = f - G(a, b, c), d = 0 == g ? null : f == a ? (b - c) / g : f == b ? (c - a) / g + 2 : (a - b) / g + 4, d = (d + 360) % 6 * 60 / 360, e = 0 == g ? 0 : g / f, { h: d, s: e, b: f, toString: _ } }, d.rgb2hsl = function(a, b, c) { c = cb(a, b, c), a = c[0], b = c[1], c = c[2]; var d, e, f, g, h, i; return g = F(a, b, c), h = G(a, b, c), i = g - h, d = 0 == i ? null : g == a ? (b - c) / i : g == b ? (c - a) / i + 2 : (a - b) / i + 4, d = (d + 360) % 6 * 60 / 360, f = (g + h) / 2, e = 0 == i ? 0 : .5 > f ? i / (2 * f) : i / (2 - 2 * f), { h: d, s: e, l: f, toString: ab } }, d.parsePathString = function(a) {
                if (!a) return null;
                var b = d.path(a);
                if (b.arr) return d.path.clone(b.arr);
                var c = { a: 7, c: 6, o: 2, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, u: 3, z: 0 },
                    e = [];
                return f(a, "array") && f(a[0], "array") && (e = d.path.clone(a)), e.length || B(a).replace(Q, function(a, b, d) {
                    var f = [],
                        g = b.toLowerCase();
                    if (d.replace(S, function(a, b) { b && f.push(+b) }), "m" == g && f.length > 2 && (e.push([b].concat(f.splice(0, 2))), g = "l", b = "m" == b ? "l" : "L"), "o" == g && 1 == f.length && e.push([b, f[0]]), "r" == g) e.push([b].concat(f));
                    else
                        for (; f.length >= c[g] && (e.push([b].concat(f.splice(0, c[g]))), c[g]););
                }), e.toString = d.path.toString, b.arr = d.path.clone(e), e
            };
            var eb = d.parseTransformString = function(a) {
                if (!a) return null;
                var b = [];
                return f(a, "array") && f(a[0], "array") && (b = d.path.clone(a)), b.length || B(a).replace(R, function(a, c, d) {
                    {
                        var e = [];
                        c.toLowerCase()
                    }
                    d.replace(S, function(a, b) { b && e.push(+b) }), b.push([c].concat(e))
                }), b.toString = d.path.toString, b
            };
            d._.svgTransform2string = n, d._.rgTransform = new RegExp("^[a-z][" + N + "]*-?\\.?\\d", "i"), d._.transform2matrix = o, d._unit2px = s;
            z.doc.contains || z.doc.compareDocumentPosition ? function(a, b) {
                var c = 9 == a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a == d || !(!d || 1 != d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b)
                    for (; b;)
                        if (b = b.parentNode, b == a) return !0;
                return !1
            };
            d._.getSomeDefs = q, d._.getSomeSVG = r, d.select = function(a) { return y(z.doc.querySelector(a)) }, d.selectAll = function(a) { for (var b = z.doc.querySelectorAll(a), c = (d.set || Array)(), e = 0; e < b.length; e++) c.push(y(b[e])); return c }, setInterval(function() {
                    for (var a in Y)
                        if (Y[A](a)) {
                            var b = Y[a],
                                c = b.node;
                            ("svg" != b.type && !c.ownerSVGElement || "svg" == b.type && (!c.parentNode || "ownerSVGElement" in c.parentNode && !c.ownerSVGElement)) && delete Y[a]
                        }
                }, 1e4),
                function(a) {
                    function g(a) {
                        function b(a, b) {
                            var c = e(a.node, b);
                            c = c && c.match(g), c = c && c[2], c && "#" == c.charAt() && (c = c.substring(1), c && (i[c] = (i[c] || []).concat(function(c) {
                                var d = {};
                                d[b] = Z(c), e(a.node, d)
                            })))
                        }

                        function c(a) {
                            var b = e(a.node, "xlink:href");
                            b && "#" == b.charAt() && (b = b.substring(1), b && (i[b] = (i[b] || []).concat(function(b) { a.attr("xlink:href", "#" + b) })))
                        }
                        for (var d, f = a.selectAll("*"), g = /^\s*url\(("|'|)(.*)\1\)\s*$/, h = [], i = {}, j = 0, k = f.length; k > j; j++) {
                            d = f[j], b(d, "fill"), b(d, "stroke"), b(d, "filter"), b(d, "mask"), b(d, "clip-path"), c(d);
                            var l = e(d.node, "id");
                            l && (e(d.node, { id: d.id }), h.push({ old: l, id: d.id }))
                        }
                        for (j = 0, k = h.length; k > j; j++) {
                            var m = i[h[j].old];
                            if (m)
                                for (var n = 0, o = m.length; o > n; n++) m[n](h[j].id)
                        }
                    }

                    function h(a, b, c) { return function(d) { var e = d.slice(a, b); return 1 == e.length && (e = e[0]), c ? c(e) : e } }

                    function i(a) {
                        return function() {
                            var b = a ? "<" + this.type : "",
                                c = this.node.attributes,
                                d = this.node.childNodes;
                            if (a)
                                for (var e = 0, f = c.length; f > e; e++) b += " " + c[e].name + '="' + c[e].value.replace(/"/g, '\\"') + '"';
                            if (d.length) {
                                for (a && (b += ">"), e = 0, f = d.length; f > e; e++) 3 == d[e].nodeType ? b += d[e].nodeValue : 1 == d[e].nodeType && (b += y(d[e]).toString());
                                a && (b += "</" + this.type + ">")
                            } else a && (b += "/>");
                            return b
                        }
                    }
                    a.attr = function(a, c) {
                        {
                            var d = this;
                            d.node
                        }
                        if (!a) return d;
                        if (f(a, "string")) {
                            if (!(arguments.length > 1)) return b("snap.util.getattr." + a, d).firstDefined();
                            var e = {};
                            e[a] = c, a = e
                        }
                        for (var g in a) a[A](g) && b("snap.util.attr." + g, d, a[g]);
                        return d
                    }, a.getBBox = function(a) {
                        if (!d.Matrix || !d.path) return this.node.getBBox();
                        var b = this,
                            c = new d.Matrix;
                        if (b.removed) return d._.box();
                        for (;
                            "use" == b.type;)
                            if (a || (c = c.add(b.transform().localMatrix.translate(b.attr("x") || 0, b.attr("y") || 0))), b.original) b = b.original;
                            else {
                                var e = b.attr("xlink:href");
                                b = b.original = b.node.ownerDocument.getElementById(e.substring(e.indexOf("#") + 1))
                            }
                        var f = b._,
                            g = d.path.get[b.type] || d.path.get.deflt;
                        try { return a ? (f.bboxwt = g ? d.path.getBBox(b.realPath = g(b)) : d._.box(b.node.getBBox()), d._.box(f.bboxwt)) : (b.realPath = g(b), b.matrix = b.transform().localMatrix, f.bbox = d.path.getBBox(d.path.map(b.realPath, c.add(b.matrix))), d._.box(f.bbox)) } catch (h) { return d._.box() }
                    };
                    var j = function() { return this.string };
                    a.transform = function(a) {
                        var b = this._;
                        if (null == a) {
                            for (var c, f = this, g = new d.Matrix(this.node.getCTM()), h = p(this), i = [h], k = new d.Matrix, l = h.toTransformString(), m = B(h) == B(this.matrix) ? B(b.transform) : l;
                                "svg" != f.type && (f = f.parent());) i.push(p(f));
                            for (c = i.length; c--;) k.add(i[c]);
                            return { string: m, globalMatrix: g, totalMatrix: k, localMatrix: h, diffMatrix: g.clone().add(h.invert()), global: g.toTransformString(), total: k.toTransformString(), local: l, toString: j }
                        }
                        return a instanceof d.Matrix ? this.matrix = a : p(this, a), this.node && ("linearGradient" == this.type || "radialGradient" == this.type ? e(this.node, { gradientTransform: this.matrix }) : "pattern" == this.type ? e(this.node, { patternTransform: this.matrix }) : e(this.node, { transform: this.matrix })), this
                    }, a.parent = function() { return y(this.node.parentNode) }, a.append = a.add = function(a) {
                        if (a) {
                            if ("set" == a.type) { var b = this; return a.forEach(function(a) { b.add(a) }), this }
                            a = y(a), this.node.appendChild(a.node), a.paper = this.paper
                        }
                        return this
                    }, a.appendTo = function(a) { return a && (a = y(a), a.append(this)), this }, a.prepend = function(a) {
                        if (a) {
                            if ("set" == a.type) { var b, c = this; return a.forEach(function(a) { b ? b.after(a) : c.prepend(a), b = a }), this }
                            a = y(a);
                            var d = a.parent();
                            this.node.insertBefore(a.node, this.node.firstChild), this.add && this.add(), a.paper = this.paper, this.parent() && this.parent().add(), d && d.add()
                        }
                        return this
                    }, a.prependTo = function(a) { return a = y(a), a.prepend(this), this }, a.before = function(a) {
                        if ("set" == a.type) {
                            var b = this;
                            return a.forEach(function(a) {
                                var c = a.parent();
                                b.node.parentNode.insertBefore(a.node, b.node), c && c.add()
                            }), this.parent().add(), this
                        }
                        a = y(a);
                        var c = a.parent();
                        return this.node.parentNode.insertBefore(a.node, this.node), this.parent() && this.parent().add(), c && c.add(), a.paper = this.paper, this
                    }, a.after = function(a) { a = y(a); var b = a.parent(); return this.node.nextSibling ? this.node.parentNode.insertBefore(a.node, this.node.nextSibling) : this.node.parentNode.appendChild(a.node), this.parent() && this.parent().add(), b && b.add(), a.paper = this.paper, this }, a.insertBefore = function(a) { a = y(a); var b = this.parent(); return a.node.parentNode.insertBefore(this.node, a.node), this.paper = a.paper, b && b.add(), a.parent() && a.parent().add(), this }, a.insertAfter = function(a) { a = y(a); var b = this.parent(); return a.node.parentNode.insertBefore(this.node, a.node.nextSibling), this.paper = a.paper, b && b.add(), a.parent() && a.parent().add(), this }, a.remove = function() { var a = this.parent(); return this.node.parentNode && this.node.parentNode.removeChild(this.node), delete this.paper, this.removed = !0, a && a.add(), this }, a.select = function(a) { return y(this.node.querySelector(a)) }, a.selectAll = function(a) { for (var b = this.node.querySelectorAll(a), c = (d.set || Array)(), e = 0; e < b.length; e++) c.push(y(b[e])); return c }, a.asPX = function(a, b) { return null == b && (b = this.attr(a)), +s(this, a, b) }, a.use = function() { var a, b = this.node.id; return b || (b = this.id, e(this.node, { id: b })), a = "linearGradient" == this.type || "radialGradient" == this.type || "pattern" == this.type ? w(this.type, this.node.parentNode) : w("use", this.node.parentNode), e(a.node, { "xlink:href": "#" + b }), a.original = this, a };
                    var k = /\S+/g;
                    a.addClass = function(a) {
                        var b, c, d, e, f = (a || "").match(k) || [],
                            g = this.node,
                            h = g.className.baseVal,
                            i = h.match(k) || [];
                        if (f.length) {
                            for (b = 0; d = f[b++];) c = i.indexOf(d), ~c || i.push(d);
                            e = i.join(" "), h != e && (g.className.baseVal = e)
                        }
                        return this
                    }, a.removeClass = function(a) {
                        var b, c, d, e, f = (a || "").match(k) || [],
                            g = this.node,
                            h = g.className.baseVal,
                            i = h.match(k) || [];
                        if (i.length) {
                            for (b = 0; d = f[b++];) c = i.indexOf(d), ~c && i.splice(c, 1);
                            e = i.join(" "), h != e && (g.className.baseVal = e)
                        }
                        return this
                    }, a.hasClass = function(a) {
                        var b = this.node,
                            c = b.className.baseVal,
                            d = c.match(k) || [];
                        return !!~d.indexOf(a)
                    }, a.toggleClass = function(a, b) {
                        if (null != b) return b ? this.addClass(a) : this.removeClass(a);
                        var c, d, e, f, g = (a || "").match(k) || [],
                            h = this.node,
                            i = h.className.baseVal,
                            j = i.match(k) || [];
                        for (c = 0; e = g[c++];) d = j.indexOf(e), ~d ? j.splice(d, 1) : j.push(e);
                        return f = j.join(" "), i != f && (h.className.baseVal = f), this
                    }, a.clone = function() { var a = y(this.node.cloneNode(!0)); return e(a.node, "id") && e(a.node, { id: a.id }), g(a), a.insertAfter(this), a }, a.toDefs = function() { var a = q(this); return a.appendChild(this.node), this }, a.pattern = a.toPattern = function(a, b, c, d) { var g = w("pattern", q(this)); return null == a && (a = this.getBBox()), f(a, "object") && "x" in a && (b = a.y, c = a.width, d = a.height, a = a.x), e(g.node, { x: a, y: b, width: c, height: d, patternUnits: "userSpaceOnUse", id: g.id, viewBox: [a, b, c, d].join(" ") }), g.node.appendChild(this.node), g }, a.marker = function(a, b, c, d, g, h) { var i = w("marker", q(this)); return null == a && (a = this.getBBox()), f(a, "object") && "x" in a && (b = a.y, c = a.width, d = a.height, g = a.refX || a.cx, h = a.refY || a.cy, a = a.x), e(i.node, { viewBox: [a, b, c, d].join(K), markerWidth: c, markerHeight: d, orient: "auto", refX: g || 0, refY: h || 0, id: i.id }), i.node.appendChild(this.node), i };
                    var l = function(a, b, d, e) { "function" != typeof d || d.length || (e = d, d = c.linear), this.attr = a, this.dur = b, d && (this.easing = d), e && (this.callback = e) };
                    d._.Animation = l, d.animation = function(a, b, c, d) { return new l(a, b, c, d) }, a.inAnim = function() {
                        var a = this,
                            b = [];
                        for (var c in a.anims) a.anims[A](c) && ! function(a) { b.push({ anim: new l(a._attrs, a.dur, a.easing, a._callback), mina: a, curStatus: a.status(), status: function(b) { return a.status(b) }, stop: function() { a.stop() } }) }(a.anims[c]);
                        return b
                    }, d.animate = function(a, d, e, f, g, h) {
                        "function" != typeof g || g.length || (h = g, g = c.linear);
                        var i = c.time(),
                            j = c(a, d, i, i + f, c.time, e, g);
                        return h && b.once("mina.finish." + j.id, h), j
                    }, a.stop = function() { for (var a = this.inAnim(), b = 0, c = a.length; c > b; b++) a[b].stop(); return this }, a.animate = function(a, d, e, g) {
                        "function" != typeof e || e.length || (g = e, e = c.linear), a instanceof l && (g = a.callback, e = a.easing, d = e.dur, a = a.attr);
                        var i, j, k, m, n = [],
                            o = [],
                            p = {},
                            q = this;
                        for (var r in a)
                            if (a[A](r)) {
                                q.equal ? (m = q.equal(r, B(a[r])), i = m.from, j = m.to, k = m.f) : (i = +q.attr(r), j = +a[r]);
                                var s = f(i, "array") ? i.length : 1;
                                p[r] = h(n.length, n.length + s, k), n = n.concat(i), o = o.concat(j)
                            }
                        var t = c.time(),
                            u = c(n, o, t, t + d, c.time, function(a) {
                                var b = {};
                                for (var c in p) p[A](c) && (b[c] = p[c](a));
                                q.attr(b)
                            }, e);
                        return q.anims[u.id] = u, u._attrs = a, u._callback = g, b("snap.animcreated." + q.id, u), b.once("mina.finish." + u.id, function() { delete q.anims[u.id], g && g.call(q) }), b.once("mina.stop." + u.id, function() { delete q.anims[u.id] }), q
                    };
                    var m = {};
                    a.data = function(a, c) { var e = m[this.id] = m[this.id] || {}; if (0 == arguments.length) return b("snap.data.get." + this.id, this, e, null), e; if (1 == arguments.length) { if (d.is(a, "object")) { for (var f in a) a[A](f) && this.data(f, a[f]); return this } return b("snap.data.get." + this.id, this, e[a], a), e[a] } return e[a] = c, b("snap.data.set." + this.id, this, c, a), this }, a.removeData = function(a) { return null == a ? m[this.id] = {} : m[this.id] && delete m[this.id][a], this }, a.outerSVG = a.toString = i(1), a.innerSVG = i()
                }(u.prototype), d.parse = function(a) {
                    var b = z.doc.createDocumentFragment(),
                        c = !0,
                        d = z.doc.createElement("div");
                    if (a = B(a), a.match(/^\s*<\s*svg(?:\s|>)/) || (a = "<svg>" + a + "</svg>", c = !1), d.innerHTML = a, a = d.getElementsByTagName("svg")[0])
                        if (c) b = a;
                        else
                            for (; a.firstChild;) b.appendChild(a.firstChild);
                    return d.innerHTML = J, new v(b)
                }, v.prototype.select = u.prototype.select, v.prototype.selectAll = u.prototype.selectAll, d.fragment = function() {
                    for (var a = Array.prototype.slice.call(arguments, 0), b = z.doc.createDocumentFragment(), c = 0, e = a.length; e > c; c++) {
                        var f = a[c];
                        f.node && f.node.nodeType && b.appendChild(f.node), f.nodeType && b.appendChild(f), "string" == typeof f && b.appendChild(d.parse(f).node)
                    }
                    return new v(b)
                }, d._.make = w, d._.wrap = y, x.prototype.el = function(a, b) { var c = w(a, this.node); return b && c.attr(b), c }, b.on("snap.util.getattr", function() {
                    var a = b.nt();
                    a = a.substring(a.lastIndexOf(".") + 1);
                    var c = a.replace(/[A-Z]/g, function(a) { return "-" + a.toLowerCase() });
                    return fb[A](c) ? this.node.ownerDocument.defaultView.getComputedStyle(this.node, null).getPropertyValue(c) : e(this.node, a)
                });
            var fb = { "alignment-baseline": 0, "baseline-shift": 0, clip: 0, "clip-path": 0, "clip-rule": 0, color: 0, "color-interpolation": 0, "color-interpolation-filters": 0, "color-profile": 0, "color-rendering": 0, cursor: 0, direction: 0, display: 0, "dominant-baseline": 0, "enable-background": 0, fill: 0, "fill-opacity": 0, "fill-rule": 0, filter: 0, "flood-color": 0, "flood-opacity": 0, font: 0, "font-family": 0, "font-size": 0, "font-size-adjust": 0, "font-stretch": 0, "font-style": 0, "font-variant": 0, "font-weight": 0, "glyph-orientation-horizontal": 0, "glyph-orientation-vertical": 0, "image-rendering": 0, kerning: 0, "letter-spacing": 0, "lighting-color": 0, marker: 0, "marker-end": 0, "marker-mid": 0, "marker-start": 0, mask: 0, opacity: 0, overflow: 0, "pointer-events": 0, "shape-rendering": 0, "stop-color": 0, "stop-opacity": 0, stroke: 0, "stroke-dasharray": 0, "stroke-dashoffset": 0, "stroke-linecap": 0, "stroke-linejoin": 0, "stroke-miterlimit": 0, "stroke-opacity": 0, "stroke-width": 0, "text-anchor": 0, "text-decoration": 0, "text-rendering": 0, "unicode-bidi": 0, visibility: 0, "word-spacing": 0, "writing-mode": 0 };
            b.on("snap.util.attr", function(a) {
                    var c = b.nt(),
                        d = {};
                    c = c.substring(c.lastIndexOf(".") + 1), d[c] = a;
                    var f = c.replace(/-(\w)/gi, function(a, b) { return b.toUpperCase() }),
                        g = c.replace(/[A-Z]/g, function(a) { return "-" + a.toLowerCase() });
                    fb[A](g) ? this.node.style[f] = null == a ? J : a : e(this.node, d)
                }),
                function() {}(x.prototype), d.ajax = function(a, c, d, e) {
                    var g = new XMLHttpRequest,
                        h = V();
                    if (g) {
                        if (f(c, "function")) e = d, d = c, c = null;
                        else if (f(c, "object")) {
                            var i = [];
                            for (var j in c) c.hasOwnProperty(j) && i.push(encodeURIComponent(j) + "=" + encodeURIComponent(c[j]));
                            c = i.join("&")
                        }
                        return g.open(c ? "POST" : "GET", a, !0), c && (g.setRequestHeader("X-Requested-With", "XMLHttpRequest"), g.setRequestHeader("Content-type", "application/x-www-form-urlencoded")), d && (b.once("snap.ajax." + h + ".0", d), b.once("snap.ajax." + h + ".200", d), b.once("snap.ajax." + h + ".304", d)), g.onreadystatechange = function() { 4 == g.readyState && b("snap.ajax." + h + "." + g.status, e, g) }, 4 == g.readyState ? g : (g.send(c), g)
                    }
                }, d.load = function(a, b, c) {
                    d.ajax(a, function(a) {
                        var e = d.parse(a.responseText);
                        c ? b.call(c, e) : b(e)
                    })
                };
            var gb = function(a) {
                var b = a.getBoundingClientRect(),
                    c = a.ownerDocument,
                    d = c.body,
                    e = c.documentElement,
                    f = e.clientTop || d.clientTop || 0,
                    h = e.clientLeft || d.clientLeft || 0,
                    i = b.top + (g.win.pageYOffset || e.scrollTop || d.scrollTop) - f,
                    j = b.left + (g.win.pageXOffset || e.scrollLeft || d.scrollLeft) - h;
                return { y: i, x: j }
            };
            return d.getElementByPoint = function(a, b) {
                var c = this,
                    d = (c.canvas, z.doc.elementFromPoint(a, b));
                if (z.win.opera && "svg" == d.tagName) {
                    var e = gb(d),
                        f = d.createSVGRect();
                    f.x = a - e.x, f.y = b - e.y, f.width = f.height = 1;
                    var g = d.getIntersectionList(f, null);
                    g.length && (d = g[g.length - 1])
                }
                return d ? y(d) : null
            }, d.plugin = function(a) { a(d, u, x, z, v) }, z.win.Snap = d, d
        }();
    return d.plugin(function(a) {
        function b(a, b, d, e, f, g) { return null == b && "[object SVGMatrix]" == c.call(a) ? (this.a = a.a, this.b = a.b, this.c = a.c, this.d = a.d, this.e = a.e, void(this.f = a.f)) : void(null != a ? (this.a = +a, this.b = +b, this.c = +d, this.d = +e, this.e = +f, this.f = +g) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0)) }
        var c = Object.prototype.toString,
            d = String,
            e = Math,
            f = "";
        ! function(c) {
            function g(a) {
                return a[0] * a[0] + a[1] * a[1]
            }

            function h(a) {
                var b = e.sqrt(g(a));
                a[0] && (a[0] /= b), a[1] && (a[1] /= b)
            }
            c.add = function(a, c, d, e, f, g) {
                var h, i, j, k, l = [
                        [],
                        [],
                        []
                    ],
                    m = [
                        [this.a, this.c, this.e],
                        [this.b, this.d, this.f],
                        [0, 0, 1]
                    ],
                    n = [
                        [a, d, f],
                        [c, e, g],
                        [0, 0, 1]
                    ];
                for (a && a instanceof b && (n = [
                        [a.a, a.c, a.e],
                        [a.b, a.d, a.f],
                        [0, 0, 1]
                    ]), h = 0; 3 > h; h++)
                    for (i = 0; 3 > i; i++) {
                        for (k = 0, j = 0; 3 > j; j++) k += m[h][j] * n[j][i];
                        l[h][i] = k
                    }
                return this.a = l[0][0], this.b = l[1][0], this.c = l[0][1], this.d = l[1][1], this.e = l[0][2], this.f = l[1][2], this
            }, c.invert = function() {
                var a = this,
                    c = a.a * a.d - a.b * a.c;
                return new b(a.d / c, -a.b / c, -a.c / c, a.a / c, (a.c * a.f - a.d * a.e) / c, (a.b * a.e - a.a * a.f) / c)
            }, c.clone = function() { return new b(this.a, this.b, this.c, this.d, this.e, this.f) }, c.translate = function(a, b) { return this.add(1, 0, 0, 1, a, b) }, c.scale = function(a, b, c, d) { return null == b && (b = a), (c || d) && this.add(1, 0, 0, 1, c, d), this.add(a, 0, 0, b, 0, 0), (c || d) && this.add(1, 0, 0, 1, -c, -d), this }, c.rotate = function(b, c, d) {
                b = a.rad(b), c = c || 0, d = d || 0;
                var f = +e.cos(b).toFixed(9),
                    g = +e.sin(b).toFixed(9);
                return this.add(f, g, -g, f, c, d), this.add(1, 0, 0, 1, -c, -d)
            }, c.x = function(a, b) { return a * this.a + b * this.c + this.e }, c.y = function(a, b) { return a * this.b + b * this.d + this.f }, c.get = function(a) { return +this[d.fromCharCode(97 + a)].toFixed(4) }, c.toString = function() { return "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" }, c.offset = function() { return [this.e.toFixed(4), this.f.toFixed(4)] }, c.determinant = function() { return this.a * this.d - this.b * this.c }, c.split = function() {
                var b = {};
                b.dx = this.e, b.dy = this.f;
                var c = [
                    [this.a, this.c],
                    [this.b, this.d]
                ];
                b.scalex = e.sqrt(g(c[0])), h(c[0]), b.shear = c[0][0] * c[1][0] + c[0][1] * c[1][1], c[1] = [c[1][0] - c[0][0] * b.shear, c[1][1] - c[0][1] * b.shear], b.scaley = e.sqrt(g(c[1])), h(c[1]), b.shear /= b.scaley, this.determinant() < 0 && (b.scalex = -b.scalex);
                var d = -c[0][1],
                    f = c[1][1];
                return 0 > f ? (b.rotate = a.deg(e.acos(f)), 0 > d && (b.rotate = 360 - b.rotate)) : b.rotate = a.deg(e.asin(d)), b.isSimple = !(+b.shear.toFixed(9) || b.scalex.toFixed(9) != b.scaley.toFixed(9) && b.rotate), b.isSuperSimple = !+b.shear.toFixed(9) && b.scalex.toFixed(9) == b.scaley.toFixed(9) && !b.rotate, b.noRotation = !+b.shear.toFixed(9) && !b.rotate, b
            }, c.toTransformString = function(a) { var b = a || this.split(); return +b.shear.toFixed(9) ? "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)] : (b.scalex = +b.scalex.toFixed(4), b.scaley = +b.scaley.toFixed(4), b.rotate = +b.rotate.toFixed(4), (b.dx || b.dy ? "t" + [+b.dx.toFixed(4), +b.dy.toFixed(4)] : f) + (1 != b.scalex || 1 != b.scaley ? "s" + [b.scalex, b.scaley, 0, 0] : f) + (b.rotate ? "r" + [+b.rotate.toFixed(4), 0, 0] : f)) }
        }(b.prototype), a.Matrix = b, a.matrix = function(a, c, d, e, f, g) { return new b(a, c, d, e, f, g) }
    }), d.plugin(function(a, c, d, e, f) {
        function g(d) {
            return function(e) {
                if (b.stop(), e instanceof f && 1 == e.node.childNodes.length && ("radialGradient" == e.node.firstChild.tagName || "linearGradient" == e.node.firstChild.tagName || "pattern" == e.node.firstChild.tagName) && (e = e.node.firstChild, n(this).appendChild(e), e = l(e)), e instanceof c)
                    if ("radialGradient" == e.type || "linearGradient" == e.type || "pattern" == e.type) { e.node.id || p(e.node, { id: e.id }); var g = q(e.node.id) } else g = e.attr(d);
                else if (g = a.color(e), g.error) {
                    var h = a(n(this).ownerSVGElement).gradient(e);
                    h ? (h.node.id || p(h.node, { id: h.id }), g = q(h.node.id)) : g = e
                } else g = r(g);
                var i = {};
                i[d] = g, p(this.node, i), this.node.style[d] = t
            }
        }

        function h(a) { b.stop(), a == +a && (a += "px"), this.node.style.fontSize = a }

        function i(a) {
            for (var b = [], c = a.childNodes, d = 0, e = c.length; e > d; d++) {
                var f = c[d];
                3 == f.nodeType && b.push(f.nodeValue), "tspan" == f.tagName && b.push(1 == f.childNodes.length && 3 == f.firstChild.nodeType ? f.firstChild.nodeValue : i(f))
            }
            return b
        }

        function j() { return b.stop(), this.node.style.fontSize }
        var k = a._.make,
            l = a._.wrap,
            m = a.is,
            n = a._.getSomeDefs,
            o = /^url\(#?([^)]+)\)$/,
            p = a._.$,
            q = a.url,
            r = String,
            s = a._.separator,
            t = "";
        b.on("snap.util.attr.mask", function(a) {
                if (a instanceof c || a instanceof f) {
                    if (b.stop(), a instanceof f && 1 == a.node.childNodes.length && (a = a.node.firstChild, n(this).appendChild(a), a = l(a)), "mask" == a.type) var d = a;
                    else d = k("mask", n(this)), d.node.appendChild(a.node);
                    !d.node.id && p(d.node, { id: d.id }), p(this.node, { mask: q(d.id) })
                }
            }),
            function(a) { b.on("snap.util.attr.clip", a), b.on("snap.util.attr.clip-path", a), b.on("snap.util.attr.clipPath", a) }(function(a) {
                if (a instanceof c || a instanceof f) {
                    if (b.stop(), "clipPath" == a.type) var d = a;
                    else d = k("clipPath", n(this)), d.node.appendChild(a.node), !d.node.id && p(d.node, { id: d.id });
                    p(this.node, { "clip-path": q(d.id) })
                }
            }), b.on("snap.util.attr.fill", g("fill")), b.on("snap.util.attr.stroke", g("stroke"));
        var u = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
        b.on("snap.util.grad.parse", function(a) {
                a = r(a);
                var b = a.match(u);
                if (!b) return null;
                var c = b[1],
                    d = b[2],
                    e = b[3];
                return d = d.split(/\s*,\s*/).map(function(a) { return +a == a ? +a : a }), 1 == d.length && 0 == d[0] && (d = []), e = e.split("-"), e = e.map(function(a) { a = a.split(":"); var b = { color: a[0] }; return a[1] && (b.offset = parseFloat(a[1])), b }), { type: c, params: d, stops: e }
            }), b.on("snap.util.attr.d", function(c) { b.stop(), m(c, "array") && m(c[0], "array") && (c = a.path.toString.call(c)), c = r(c), c.match(/[ruo]/i) && (c = a.path.toAbsolute(c)), p(this.node, { d: c }) })(-1), b.on("snap.util.attr.#text", function(a) {
                b.stop(), a = r(a);
                for (var c = e.doc.createTextNode(a); this.node.firstChild;) this.node.removeChild(this.node.firstChild);
                this.node.appendChild(c)
            })(-1), b.on("snap.util.attr.path", function(a) { b.stop(), this.attr({ d: a }) })(-1), b.on("snap.util.attr.class", function(a) { b.stop(), this.node.className.baseVal = a })(-1), b.on("snap.util.attr.viewBox", function(a) {
                var c;
                c = m(a, "object") && "x" in a ? [a.x, a.y, a.width, a.height].join(" ") : m(a, "array") ? a.join(" ") : a, p(this.node, { viewBox: c }), b.stop()
            })(-1), b.on("snap.util.attr.transform", function(a) { this.transform(a), b.stop() })(-1), b.on("snap.util.attr.r", function(a) { "rect" == this.type && (b.stop(), p(this.node, { rx: a, ry: a })) })(-1), b.on("snap.util.attr.textpath", function(a) {
                if (b.stop(), "text" == this.type) {
                    var d, e, f;
                    if (!a && this.textPath) { for (e = this.textPath; e.node.firstChild;) this.node.appendChild(e.node.firstChild); return e.remove(), void delete this.textPath }
                    if (m(a, "string")) {
                        var g = n(this),
                            h = l(g.parentNode).path(a);
                        g.appendChild(h.node), d = h.id, h.attr({ id: d })
                    } else a = l(a), a instanceof c && (d = a.attr("id"), d || (d = a.id, a.attr({ id: d })));
                    if (d)
                        if (e = this.textPath, f = this.node, e) e.attr({ "xlink:href": "#" + d });
                        else {
                            for (e = p("textPath", { "xlink:href": "#" + d }); f.firstChild;) e.appendChild(f.firstChild);
                            f.appendChild(e), this.textPath = l(e)
                        }
                }
            })(-1), b.on("snap.util.attr.text", function(a) {
                if ("text" == this.type) {
                    for (var c = this.node, d = function(a) {
                            var b = p("tspan");
                            if (m(a, "array"))
                                for (var c = 0; c < a.length; c++) b.appendChild(d(a[c]));
                            else b.appendChild(e.doc.createTextNode(a));
                            return b.normalize && b.normalize(), b
                        }; c.firstChild;) c.removeChild(c.firstChild);
                    for (var f = d(a); f.firstChild;) c.appendChild(f.firstChild)
                }
                b.stop()
            })(-1), b.on("snap.util.attr.fontSize", h)(-1), b.on("snap.util.attr.font-size", h)(-1), b.on("snap.util.getattr.transform", function() { return b.stop(), this.transform() })(-1), b.on("snap.util.getattr.textpath", function() { return b.stop(), this.textPath })(-1),
            function() {
                function c(c) { return function() { b.stop(); var d = e.doc.defaultView.getComputedStyle(this.node, null).getPropertyValue("marker-" + c); return "none" == d ? d : a(e.doc.getElementById(d.match(o)[1])) } }

                function d(a) { return function(c) { b.stop(); var d = "marker" + a.charAt(0).toUpperCase() + a.substring(1); if ("" == c || !c) return void(this.node.style[d] = "none"); if ("marker" == c.type) { var e = c.node.id; return e || p(c.node, { id: c.id }), void(this.node.style[d] = q(e)) } } }
                b.on("snap.util.getattr.marker-end", c("end"))(-1), b.on("snap.util.getattr.markerEnd", c("end"))(-1), b.on("snap.util.getattr.marker-start", c("start"))(-1), b.on("snap.util.getattr.markerStart", c("start"))(-1), b.on("snap.util.getattr.marker-mid", c("mid"))(-1), b.on("snap.util.getattr.markerMid", c("mid"))(-1), b.on("snap.util.attr.marker-end", d("end"))(-1), b.on("snap.util.attr.markerEnd", d("end"))(-1), b.on("snap.util.attr.marker-start", d("start"))(-1), b.on("snap.util.attr.markerStart", d("start"))(-1), b.on("snap.util.attr.marker-mid", d("mid"))(-1), b.on("snap.util.attr.markerMid", d("mid"))(-1)
            }(), b.on("snap.util.getattr.r", function() { return "rect" == this.type && p(this.node, "rx") == p(this.node, "ry") ? (b.stop(), p(this.node, "rx")) : void 0 })(-1), b.on("snap.util.getattr.text", function() { if ("text" == this.type || "tspan" == this.type) { b.stop(); var a = i(this.node); return 1 == a.length ? a[0] : a } })(-1), b.on("snap.util.getattr.#text", function() { return this.node.textContent })(-1), b.on("snap.util.getattr.viewBox", function() { b.stop(); var c = p(this.node, "viewBox"); return c ? (c = c.split(s), a._.box(+c[0], +c[1], +c[2], +c[3])) : void 0 })(-1), b.on("snap.util.getattr.points", function() { var a = p(this.node, "points"); return b.stop(), a ? a.split(s) : void 0 })(-1), b.on("snap.util.getattr.path", function() { var a = p(this.node, "d"); return b.stop(), a })(-1), b.on("snap.util.getattr.class", function() { return this.node.className.baseVal })(-1), b.on("snap.util.getattr.fontSize", j)(-1), b.on("snap.util.getattr.font-size", j)(-1)
    }), d.plugin(function() {
        function a(a) { return a }

        function c(a) { return function(b) { return +b.toFixed(3) + a } }
        var d = { "+": function(a, b) { return a + b }, "-": function(a, b) { return a - b }, "/": function(a, b) { return a / b }, "*": function(a, b) { return a * b } },
            e = String,
            f = /[a-z]+$/i,
            g = /^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;
        b.on("snap.util.attr", function(a) {
            var c = e(a).match(g);
            if (c) {
                var h = b.nt(),
                    i = h.substring(h.lastIndexOf(".") + 1),
                    j = this.attr(i),
                    k = {};
                b.stop();
                var l = c[3] || "",
                    m = j.match(f),
                    n = d[c[1]];
                if (m && m == l ? a = n(parseFloat(j), +c[2]) : (j = this.asPX(i), a = n(this.asPX(i), this.asPX(i, c[2] + l))), isNaN(j) || isNaN(a)) return;
                k[i] = a, this.attr(k)
            }
        })(-10), b.on("snap.util.equal", function(h, i) {
            var j = e(this.attr(h) || ""),
                k = e(i).match(g);
            if (k) {
                b.stop();
                var l = k[3] || "",
                    m = j.match(f),
                    n = d[k[1]];
                return m && m == l ? { from: parseFloat(j), to: n(parseFloat(j), +k[2]), f: c(m) } : (j = this.asPX(h), { from: j, to: n(j, this.asPX(h, k[2] + l)), f: a })
            }
        })(-10)
    }), d.plugin(function(a, c, d, e) {
        var f = d.prototype,
            g = a.is;
        f.rect = function(a, b, c, d, e, f) { var h; return null == f && (f = e), g(a, "object") && "[object Object]" == a ? h = a : null != a && (h = { x: a, y: b, width: c, height: d }, null != e && (h.rx = e, h.ry = f)), this.el("rect", h) }, f.circle = function(a, b, c) { var d; return g(a, "object") && "[object Object]" == a ? d = a : null != a && (d = { cx: a, cy: b, r: c }), this.el("circle", d) };
        var h = function() {
            function a() { this.parentNode.removeChild(this) }
            return function(b, c) {
                var d = e.doc.createElement("img"),
                    f = e.doc.body;
                d.style.cssText = "position:absolute;left:-9999em;top:-9999em", d.onload = function() { c.call(d), d.onload = d.onerror = null, f.removeChild(d) }, d.onerror = a, f.appendChild(d), d.src = b
            }
        }();
        f.image = function(b, c, d, e, f) {
                var i = this.el("image");
                if (g(b, "object") && "src" in b) i.attr(b);
                else if (null != b) {
                    var j = { "xlink:href": b, preserveAspectRatio: "none" };
                    null != c && null != d && (j.x = c, j.y = d), null != e && null != f ? (j.width = e, j.height = f) : h(b, function() { a._.$(i.node, { width: this.offsetWidth, height: this.offsetHeight }) }), a._.$(i.node, j)
                }
                return i
            }, f.ellipse = function(a, b, c, d) { var e; return g(a, "object") && "[object Object]" == a ? e = a : null != a && (e = { cx: a, cy: b, rx: c, ry: d }), this.el("ellipse", e) }, f.path = function(a) { var b; return g(a, "object") && !g(a, "array") ? b = a : a && (b = { d: a }), this.el("path", b) }, f.group = f.g = function(a) { var b = this.el("g"); return 1 == arguments.length && a && !a.type ? b.attr(a) : arguments.length && b.add(Array.prototype.slice.call(arguments, 0)), b }, f.svg = function(a, b, c, d, e, f, h, i) { var j = {}; return g(a, "object") && null == b ? j = a : (null != a && (j.x = a), null != b && (j.y = b), null != c && (j.width = c), null != d && (j.height = d), null != e && null != f && null != h && null != i && (j.viewBox = [e, f, h, i])), this.el("svg", j) }, f.mask = function(a) { var b = this.el("mask"); return 1 == arguments.length && a && !a.type ? b.attr(a) : arguments.length && b.add(Array.prototype.slice.call(arguments, 0)), b }, f.ptrn = function(a, b, c, d, e, f, h, i) {
                if (g(a, "object")) var j = a;
                else arguments.length ? (j = {}, null != a && (j.x = a), null != b && (j.y = b), null != c && (j.width = c), null != d && (j.height = d), null != e && null != f && null != h && null != i && (j.viewBox = [e, f, h, i])) : j = { patternUnits: "userSpaceOnUse" };
                return this.el("pattern", j)
            }, f.use = function(a) {
                if (null != a) {
                    { make("use", this.node) }
                    return a instanceof c && (a.attr("id") || a.attr({ id: ID() }), a = a.attr("id")), this.el("use", { "xlink:href": a })
                }
                return c.prototype.use.call(this)
            }, f.text = function(a, b, c) { var d = {}; return g(a, "object") ? d = a : null != a && (d = { x: a, y: b, text: c || "" }), this.el("text", d) }, f.line = function(a, b, c, d) { var e = {}; return g(a, "object") ? e = a : null != a && (e = { x1: a, x2: c, y1: b, y2: d }), this.el("line", e) }, f.polyline = function(a) { arguments.length > 1 && (a = Array.prototype.slice.call(arguments, 0)); var b = {}; return g(a, "object") && !g(a, "array") ? b = a : null != a && (b = { points: a }), this.el("polyline", b) }, f.polygon = function(a) { arguments.length > 1 && (a = Array.prototype.slice.call(arguments, 0)); var b = {}; return g(a, "object") && !g(a, "array") ? b = a : null != a && (b = { points: a }), this.el("polygon", b) },
            function() {
                function c() { return this.selectAll("stop") }

                function d(b, c) {
                    var d = j("stop"),
                        e = { offset: +c + "%" };
                    return b = a.color(b), e["stop-color"] = b.hex, b.opacity < 1 && (e["stop-opacity"] = b.opacity), j(d, e), this.node.appendChild(d), this
                }

                function e() {
                    if ("linearGradient" == this.type) {
                        var b = j(this.node, "x1") || 0,
                            c = j(this.node, "x2") || 1,
                            d = j(this.node, "y1") || 0,
                            e = j(this.node, "y2") || 0;
                        return a._.box(b, d, math.abs(c - b), math.abs(e - d))
                    }
                    var f = this.node.cx || .5,
                        g = this.node.cy || .5,
                        h = this.node.r || 0;
                    return a._.box(f - h, g - h, 2 * h, 2 * h)
                }

                function g(a, c) {
                    function d(a, b) {
                        for (var c = (b - l) / (a - m), d = m; a > d; d++) g[d].offset = +(+l + c * (d - m)).toFixed(2);
                        m = a, l = b
                    }
                    var e, f = b("snap.util.grad.parse", null, c).firstDefined();
                    if (!f) return null;
                    f.params.unshift(a), e = "l" == f.type.toLowerCase() ? h.apply(0, f.params) : i.apply(0, f.params), f.type != f.type.toLowerCase() && j(e.node, { gradientUnits: "userSpaceOnUse" });
                    var g = f.stops,
                        k = g.length,
                        l = 0,
                        m = 0;
                    k--;
                    for (var n = 0; k > n; n++) "offset" in g[n] && d(n, g[n].offset);
                    for (g[k].offset = g[k].offset || 100, d(k, g[k].offset), n = 0; k >= n; n++) {
                        var o = g[n];
                        e.addStop(o.color, o.offset)
                    }
                    return e
                }

                function h(b, f, g, h, i) { var k = a._.make("linearGradient", b); return k.stops = c, k.addStop = d, k.getBBox = e, null != f && j(k.node, { x1: f, y1: g, x2: h, y2: i }), k }

                function i(b, f, g, h, i, k) { var l = a._.make("radialGradient", b); return l.stops = c, l.addStop = d, l.getBBox = e, null != f && j(l.node, { cx: f, cy: g, r: h }), null != i && null != k && j(l.node, { fx: i, fy: k }), l }
                var j = a._.$;
                f.gradient = function(a) { return g(this.defs, a) }, f.gradientLinear = function(a, b, c, d) { return h(this.defs, a, b, c, d) }, f.gradientRadial = function(a, b, c, d, e) { return i(this.defs, a, b, c, d, e) }, f.toString = function() {
                    var b, c = this.node.ownerDocument,
                        d = c.createDocumentFragment(),
                        e = c.createElement("div"),
                        f = this.node.cloneNode(!0);
                    return d.appendChild(e), e.appendChild(f), a._.$(f, { xmlns: "http://www.w3.org/2000/svg" }), b = e.innerHTML, d.removeChild(d.firstChild), b
                }, f.clear = function() { for (var a, b = this.node.firstChild; b;) a = b.nextSibling, "defs" != b.tagName ? b.parentNode.removeChild(b) : f.clear.call({ node: b }), b = a }
            }()
    }), d.plugin(function(a, b) {
        function c(a) { var b = c.ps = c.ps || {}; return b[a] ? b[a].sleep = 100 : b[a] = { sleep: 100 }, setTimeout(function() { for (var c in b) b[K](c) && c != a && (b[c].sleep--, !b[c].sleep && delete b[c]) }), b[a] }

        function d(a, b, c, d) { return null == a && (a = b = c = d = 0), null == b && (b = a.y, c = a.width, d = a.height, a = a.x), { x: a, y: b, width: c, w: c, height: d, h: d, x2: a + c, y2: b + d, cx: a + c / 2, cy: b + d / 2, r1: N.min(c, d) / 2, r2: N.max(c, d) / 2, r0: N.sqrt(c * c + d * d) / 2, path: w(a, b, c, d), vb: [a, b, c, d].join(" ") } }

        function e() { return this.join(",").replace(L, "$1") }

        function f(a) { var b = J(a); return b.toString = e, b }

        function g(a, b, c, d, e, f, g, h, j) { return null == j ? n(a, b, c, d, e, f, g, h) : i(a, b, c, d, e, f, g, h, o(a, b, c, d, e, f, g, h, j)) }

        function h(c, d) {
            function e(a) { return +(+a).toFixed(3) }
            return a._.cacher(function(a, f, h) {
                a instanceof b && (a = a.attr("d")), a = E(a);
                for (var j, k, l, m, n, o = "", p = {}, q = 0, r = 0, s = a.length; s > r; r++) {
                    if (l = a[r], "M" == l[0]) j = +l[1], k = +l[2];
                    else {
                        if (m = g(j, k, l[1], l[2], l[3], l[4], l[5], l[6]), q + m > f) {
                            if (d && !p.start) {
                                if (n = g(j, k, l[1], l[2], l[3], l[4], l[5], l[6], f - q), o += ["C" + e(n.start.x), e(n.start.y), e(n.m.x), e(n.m.y), e(n.x), e(n.y)], h) return o;
                                p.start = o, o = ["M" + e(n.x), e(n.y) + "C" + e(n.n.x), e(n.n.y), e(n.end.x), e(n.end.y), e(l[5]), e(l[6])].join(), q += m, j = +l[5], k = +l[6];
                                continue
                            }
                            if (!c && !d) return n = g(j, k, l[1], l[2], l[3], l[4], l[5], l[6], f - q)
                        }
                        q += m, j = +l[5], k = +l[6]
                    }
                    o += l.shift() + l
                }
                return p.end = o, n = c ? q : d ? p : i(j, k, l[0], l[1], l[2], l[3], l[4], l[5], 1)
            }, null, a._.clone)
        }

        function i(a, b, c, d, e, f, g, h, i) {
            var j = 1 - i,
                k = R(j, 3),
                l = R(j, 2),
                m = i * i,
                n = m * i,
                o = k * a + 3 * l * i * c + 3 * j * i * i * e + n * g,
                p = k * b + 3 * l * i * d + 3 * j * i * i * f + n * h,
                q = a + 2 * i * (c - a) + m * (e - 2 * c + a),
                r = b + 2 * i * (d - b) + m * (f - 2 * d + b),
                s = c + 2 * i * (e - c) + m * (g - 2 * e + c),
                t = d + 2 * i * (f - d) + m * (h - 2 * f + d),
                u = j * a + i * c,
                v = j * b + i * d,
                w = j * e + i * g,
                x = j * f + i * h,
                y = 90 - 180 * N.atan2(q - s, r - t) / O;
            return { x: o, y: p, m: { x: q, y: r }, n: { x: s, y: t }, start: { x: u, y: v }, end: { x: w, y: x }, alpha: y }
        }

        function j(b, c, e, f, g, h, i, j) { a.is(b, "array") || (b = [b, c, e, f, g, h, i, j]); var k = D.apply(null, b); return d(k.min.x, k.min.y, k.max.x - k.min.x, k.max.y - k.min.y) }

        function k(a, b, c) { return b >= a.x && b <= a.x + a.width && c >= a.y && c <= a.y + a.height }

        function l(a, b) { return a = d(a), b = d(b), k(b, a.x, a.y) || k(b, a.x2, a.y) || k(b, a.x, a.y2) || k(b, a.x2, a.y2) || k(a, b.x, b.y) || k(a, b.x2, b.y) || k(a, b.x, b.y2) || k(a, b.x2, b.y2) || (a.x < b.x2 && a.x > b.x || b.x < a.x2 && b.x > a.x) && (a.y < b.y2 && a.y > b.y || b.y < a.y2 && b.y > a.y) }

        function m(a, b, c, d, e) {
            var f = -3 * b + 9 * c - 9 * d + 3 * e,
                g = a * f + 6 * b - 12 * c + 6 * d;
            return a * g - 3 * b + 3 * c
        }

        function n(a, b, c, d, e, f, g, h, i) {
            null == i && (i = 1), i = i > 1 ? 1 : 0 > i ? 0 : i;
            for (var j = i / 2, k = 12, l = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], n = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], o = 0, p = 0; k > p; p++) {
                var q = j * l[p] + j,
                    r = m(q, a, c, e, g),
                    s = m(q, b, d, f, h),
                    t = r * r + s * s;
                o += n[p] * N.sqrt(t)
            }
            return j * o
        }

        function o(a, b, c, d, e, f, g, h, i) {
            if (!(0 > i || n(a, b, c, d, e, f, g, h) < i)) {
                var j, k = 1,
                    l = k / 2,
                    m = k - l,
                    o = .01;
                for (j = n(a, b, c, d, e, f, g, h, m); S(j - i) > o;) l /= 2, m += (i > j ? 1 : -1) * l, j = n(a, b, c, d, e, f, g, h, m);
                return m
            }
        }

        function p(a, b, c, d, e, f, g, h) {
            if (!(Q(a, c) < P(e, g) || P(a, c) > Q(e, g) || Q(b, d) < P(f, h) || P(b, d) > Q(f, h))) {
                var i = (a * d - b * c) * (e - g) - (a - c) * (e * h - f * g),
                    j = (a * d - b * c) * (f - h) - (b - d) * (e * h - f * g),
                    k = (a - c) * (f - h) - (b - d) * (e - g);
                if (k) {
                    var l = i / k,
                        m = j / k,
                        n = +l.toFixed(2),
                        o = +m.toFixed(2);
                    if (!(n < +P(a, c).toFixed(2) || n > +Q(a, c).toFixed(2) || n < +P(e, g).toFixed(2) || n > +Q(e, g).toFixed(2) || o < +P(b, d).toFixed(2) || o > +Q(b, d).toFixed(2) || o < +P(f, h).toFixed(2) || o > +Q(f, h).toFixed(2))) return { x: l, y: m }
                }
            }
        }

        function q(a, b, c) {
            var d = j(a),
                e = j(b);
            if (!l(d, e)) return c ? 0 : [];
            for (var f = n.apply(0, a), g = n.apply(0, b), h = ~~(f / 8), k = ~~(g / 8), m = [], o = [], q = {}, r = c ? 0 : [], s = 0; h + 1 > s; s++) {
                var t = i.apply(0, a.concat(s / h));
                m.push({ x: t.x, y: t.y, t: s / h })
            }
            for (s = 0; k + 1 > s; s++) t = i.apply(0, b.concat(s / k)), o.push({ x: t.x, y: t.y, t: s / k });
            for (s = 0; h > s; s++)
                for (var u = 0; k > u; u++) {
                    var v = m[s],
                        w = m[s + 1],
                        x = o[u],
                        y = o[u + 1],
                        z = S(w.x - v.x) < .001 ? "y" : "x",
                        A = S(y.x - x.x) < .001 ? "y" : "x",
                        B = p(v.x, v.y, w.x, w.y, x.x, x.y, y.x, y.y);
                    if (B) {
                        if (q[B.x.toFixed(4)] == B.y.toFixed(4)) continue;
                        q[B.x.toFixed(4)] = B.y.toFixed(4);
                        var C = v.t + S((B[z] - v[z]) / (w[z] - v[z])) * (w.t - v.t),
                            D = x.t + S((B[A] - x[A]) / (y[A] - x[A])) * (y.t - x.t);
                        C >= 0 && 1 >= C && D >= 0 && 1 >= D && (c ? r++ : r.push({ x: B.x, y: B.y, t1: C, t2: D }))
                    }
                }
            return r
        }

        function r(a, b) { return t(a, b) }

        function s(a, b) { return t(a, b, 1) }

        function t(a, b, c) {
            a = E(a), b = E(b);
            for (var d, e, f, g, h, i, j, k, l, m, n = c ? 0 : [], o = 0, p = a.length; p > o; o++) {
                var r = a[o];
                if ("M" == r[0]) d = h = r[1], e = i = r[2];
                else {
                    "C" == r[0] ? (l = [d, e].concat(r.slice(1)), d = l[6], e = l[7]) : (l = [d, e, d, e, h, i, h, i], d = h, e = i);
                    for (var s = 0, t = b.length; t > s; s++) {
                        var u = b[s];
                        if ("M" == u[0]) f = j = u[1], g = k = u[2];
                        else {
                            "C" == u[0] ? (m = [f, g].concat(u.slice(1)), f = m[6], g = m[7]) : (m = [f, g, f, g, j, k, j, k], f = j, g = k);
                            var v = q(l, m, c);
                            if (c) n += v;
                            else {
                                for (var w = 0, x = v.length; x > w; w++) v[w].segment1 = o, v[w].segment2 = s, v[w].bez1 = l, v[w].bez2 = m;
                                n = n.concat(v)
                            }
                        }
                    }
                }
            }
            return n
        }

        function u(a, b, c) {
            var d = v(a);
            return k(d, b, c) && t(a, [
                ["M", b, c],
                ["H", d.x2 + 10]
            ], 1) % 2 == 1
        }

        function v(a) {
            var b = c(a);
            if (b.bbox) return J(b.bbox);
            if (!a) return d();
            a = E(a);
            for (var e, f = 0, g = 0, h = [], i = [], j = 0, k = a.length; k > j; j++)
                if (e = a[j], "M" == e[0]) f = e[1], g = e[2], h.push(f), i.push(g);
                else {
                    var l = D(f, g, e[1], e[2], e[3], e[4], e[5], e[6]);
                    h = h.concat(l.min.x, l.max.x), i = i.concat(l.min.y, l.max.y), f = e[5], g = e[6]
                }
            var m = P.apply(0, h),
                n = P.apply(0, i),
                o = Q.apply(0, h),
                p = Q.apply(0, i),
                q = d(m, n, o - m, p - n);
            return b.bbox = J(q), q
        }

        function w(a, b, c, d, f) {
            if (f) return [
                ["M", +a + +f, b],
                ["l", c - 2 * f, 0],
                ["a", f, f, 0, 0, 1, f, f],
                ["l", 0, d - 2 * f],
                ["a", f, f, 0, 0, 1, -f, f],
                ["l", 2 * f - c, 0],
                ["a", f, f, 0, 0, 1, -f, -f],
                ["l", 0, 2 * f - d],
                ["a", f, f, 0, 0, 1, f, -f],
                ["z"]
            ];
            var g = [
                ["M", a, b],
                ["l", c, 0],
                ["l", 0, d],
                ["l", -c, 0],
                ["z"]
            ];
            return g.toString = e, g
        }

        function x(a, b, c, d, f) {
            if (null == f && null == d && (d = c), a = +a, b = +b, c = +c, d = +d, null != f) var g = Math.PI / 180,
                h = a + c * Math.cos(-d * g),
                i = a + c * Math.cos(-f * g),
                j = b + c * Math.sin(-d * g),
                k = b + c * Math.sin(-f * g),
                l = [
                    ["M", h, j],
                    ["A", c, c, 0, +(f - d > 180), 0, i, k]
                ];
            else l = [
                ["M", a, b],
                ["m", 0, -d],
                ["a", c, d, 0, 1, 1, 0, 2 * d],
                ["a", c, d, 0, 1, 1, 0, -2 * d],
                ["z"]
            ];
            return l.toString = e, l
        }

        function y(b) {
            var d = c(b),
                g = String.prototype.toLowerCase;
            if (d.rel) return f(d.rel);
            a.is(b, "array") && a.is(b && b[0], "array") || (b = a.parsePathString(b));
            var h = [],
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0;
            "M" == b[0][0] && (i = b[0][1], j = b[0][2], k = i, l = j, m++, h.push(["M", i, j]));
            for (var n = m, o = b.length; o > n; n++) {
                var p = h[n] = [],
                    q = b[n];
                if (q[0] != g.call(q[0])) switch (p[0] = g.call(q[0]), p[0]) {
                    case "a":
                        p[1] = q[1], p[2] = q[2], p[3] = q[3], p[4] = q[4], p[5] = q[5], p[6] = +(q[6] - i).toFixed(3), p[7] = +(q[7] - j).toFixed(3);
                        break;
                    case "v":
                        p[1] = +(q[1] - j).toFixed(3);
                        break;
                    case "m":
                        k = q[1], l = q[2];
                    default:
                        for (var r = 1, s = q.length; s > r; r++) p[r] = +(q[r] - (r % 2 ? i : j)).toFixed(3)
                } else { p = h[n] = [], "m" == q[0] && (k = q[1] + i, l = q[2] + j); for (var t = 0, u = q.length; u > t; t++) h[n][t] = q[t] }
                var v = h[n].length;
                switch (h[n][0]) {
                    case "z":
                        i = k, j = l;
                        break;
                    case "h":
                        i += +h[n][v - 1];
                        break;
                    case "v":
                        j += +h[n][v - 1];
                        break;
                    default:
                        i += +h[n][v - 2], j += +h[n][v - 1]
                }
            }
            return h.toString = e, d.rel = f(h), h
        }

        function z(b) {
            var d = c(b);
            if (d.abs) return f(d.abs);
            if (I(b, "array") && I(b && b[0], "array") || (b = a.parsePathString(b)), !b || !b.length) return [
                ["M", 0, 0]
            ];
            var g, h = [],
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0;
            "M" == b[0][0] && (i = +b[0][1], j = +b[0][2], k = i, l = j, m++, h[0] = ["M", i, j]);
            for (var n, o, p = 3 == b.length && "M" == b[0][0] && "R" == b[1][0].toUpperCase() && "Z" == b[2][0].toUpperCase(), q = m, r = b.length; r > q; q++) {
                if (h.push(n = []), o = b[q], g = o[0], g != g.toUpperCase()) switch (n[0] = g.toUpperCase(), n[0]) {
                        case "A":
                            n[1] = o[1], n[2] = o[2], n[3] = o[3], n[4] = o[4], n[5] = o[5], n[6] = +o[6] + i, n[7] = +o[7] + j;
                            break;
                        case "V":
                            n[1] = +o[1] + j;
                            break;
                        case "H":
                            n[1] = +o[1] + i;
                            break;
                        case "R":
                            for (var s = [i, j].concat(o.slice(1)), t = 2, u = s.length; u > t; t++) s[t] = +s[t] + i, s[++t] = +s[t] + j;
                            h.pop(), h = h.concat(G(s, p));
                            break;
                        case "O":
                            h.pop(), s = x(i, j, o[1], o[2]), s.push(s[0]), h = h.concat(s);
                            break;
                        case "U":
                            h.pop(), h = h.concat(x(i, j, o[1], o[2], o[3])), n = ["U"].concat(h[h.length - 1].slice(-2));
                            break;
                        case "M":
                            k = +o[1] + i, l = +o[2] + j;
                        default:
                            for (t = 1, u = o.length; u > t; t++) n[t] = +o[t] + (t % 2 ? i : j)
                    } else if ("R" == g) s = [i, j].concat(o.slice(1)), h.pop(), h = h.concat(G(s, p)), n = ["R"].concat(o.slice(-2));
                    else if ("O" == g) h.pop(), s = x(i, j, o[1], o[2]), s.push(s[0]), h = h.concat(s);
                else if ("U" == g) h.pop(), h = h.concat(x(i, j, o[1], o[2], o[3])), n = ["U"].concat(h[h.length - 1].slice(-2));
                else
                    for (var v = 0, w = o.length; w > v; v++) n[v] = o[v];
                if (g = g.toUpperCase(), "O" != g) switch (n[0]) {
                    case "Z":
                        i = +k, j = +l;
                        break;
                    case "H":
                        i = n[1];
                        break;
                    case "V":
                        j = n[1];
                        break;
                    case "M":
                        k = n[n.length - 2], l = n[n.length - 1];
                    default:
                        i = n[n.length - 2], j = n[n.length - 1]
                }
            }
            return h.toString = e, d.abs = f(h), h
        }

        function A(a, b, c, d) { return [a, b, c, d, c, d] }

        function B(a, b, c, d, e, f) {
            var g = 1 / 3,
                h = 2 / 3;
            return [g * a + h * c, g * b + h * d, g * e + h * c, g * f + h * d, e, f]
        }

        function C(b, c, d, e, f, g, h, i, j, k) {
            var l, m = 120 * O / 180,
                n = O / 180 * (+f || 0),
                o = [],
                p = a._.cacher(function(a, b, c) {
                    var d = a * N.cos(c) - b * N.sin(c),
                        e = a * N.sin(c) + b * N.cos(c);
                    return { x: d, y: e }
                });
            if (k) y = k[0], z = k[1], w = k[2], x = k[3];
            else {
                l = p(b, c, -n), b = l.x, c = l.y, l = p(i, j, -n), i = l.x, j = l.y;
                var q = (N.cos(O / 180 * f), N.sin(O / 180 * f), (b - i) / 2),
                    r = (c - j) / 2,
                    s = q * q / (d * d) + r * r / (e * e);
                s > 1 && (s = N.sqrt(s), d = s * d, e = s * e);
                var t = d * d,
                    u = e * e,
                    v = (g == h ? -1 : 1) * N.sqrt(S((t * u - t * r * r - u * q * q) / (t * r * r + u * q * q))),
                    w = v * d * r / e + (b + i) / 2,
                    x = v * -e * q / d + (c + j) / 2,
                    y = N.asin(((c - x) / e).toFixed(9)),
                    z = N.asin(((j - x) / e).toFixed(9));
                y = w > b ? O - y : y, z = w > i ? O - z : z, 0 > y && (y = 2 * O + y), 0 > z && (z = 2 * O + z), h && y > z && (y -= 2 * O), !h && z > y && (z -= 2 * O)
            }
            var A = z - y;
            if (S(A) > m) {
                var B = z,
                    D = i,
                    E = j;
                z = y + m * (h && z > y ? 1 : -1), i = w + d * N.cos(z), j = x + e * N.sin(z), o = C(i, j, d, e, f, 0, h, D, E, [z, B, w, x])
            }
            A = z - y;
            var F = N.cos(y),
                G = N.sin(y),
                H = N.cos(z),
                I = N.sin(z),
                J = N.tan(A / 4),
                K = 4 / 3 * d * J,
                L = 4 / 3 * e * J,
                M = [b, c],
                P = [b + K * G, c - L * F],
                Q = [i + K * I, j - L * H],
                R = [i, j];
            if (P[0] = 2 * M[0] - P[0], P[1] = 2 * M[1] - P[1], k) return [P, Q, R].concat(o);
            o = [P, Q, R].concat(o).join().split(",");
            for (var T = [], U = 0, V = o.length; V > U; U++) T[U] = U % 2 ? p(o[U - 1], o[U], n).y : p(o[U], o[U + 1], n).x;
            return T
        }

        function D(a, b, c, d, e, f, g, h) {
            for (var i, j, k, l, m, n, o, p, q = [], r = [
                    [],
                    []
                ], s = 0; 2 > s; ++s)
                if (0 == s ? (j = 6 * a - 12 * c + 6 * e, i = -3 * a + 9 * c - 9 * e + 3 * g, k = 3 * c - 3 * a) : (j = 6 * b - 12 * d + 6 * f, i = -3 * b + 9 * d - 9 * f + 3 * h, k = 3 * d - 3 * b), S(i) < 1e-12) {
                    if (S(j) < 1e-12) continue;
                    l = -k / j, l > 0 && 1 > l && q.push(l)
                } else o = j * j - 4 * k * i, p = N.sqrt(o), 0 > o || (m = (-j + p) / (2 * i), m > 0 && 1 > m && q.push(m), n = (-j - p) / (2 * i), n > 0 && 1 > n && q.push(n));
            for (var t, u = q.length, v = u; u--;) l = q[u], t = 1 - l, r[0][u] = t * t * t * a + 3 * t * t * l * c + 3 * t * l * l * e + l * l * l * g, r[1][u] = t * t * t * b + 3 * t * t * l * d + 3 * t * l * l * f + l * l * l * h;
            return r[0][v] = a, r[1][v] = b, r[0][v + 1] = g, r[1][v + 1] = h, r[0].length = r[1].length = v + 2, { min: { x: P.apply(0, r[0]), y: P.apply(0, r[1]) }, max: { x: Q.apply(0, r[0]), y: Q.apply(0, r[1]) } }
        }

        function E(a, b) {
            var d = !b && c(a);
            if (!b && d.curve) return f(d.curve);
            for (var e = z(a), g = b && z(b), h = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null }, i = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null }, j = (function(a, b, c) {
                    var d, e;
                    if (!a) return ["C", b.x, b.y, b.x, b.y, b.x, b.y];
                    switch (!(a[0] in { T: 1, Q: 1 }) && (b.qx = b.qy = null), a[0]) {
                        case "M":
                            b.X = a[1], b.Y = a[2];
                            break;
                        case "A":
                            a = ["C"].concat(C.apply(0, [b.x, b.y].concat(a.slice(1))));
                            break;
                        case "S":
                            "C" == c || "S" == c ? (d = 2 * b.x - b.bx, e = 2 * b.y - b.by) : (d = b.x, e = b.y), a = ["C", d, e].concat(a.slice(1));
                            break;
                        case "T":
                            "Q" == c || "T" == c ? (b.qx = 2 * b.x - b.qx, b.qy = 2 * b.y - b.qy) : (b.qx = b.x, b.qy = b.y), a = ["C"].concat(B(b.x, b.y, b.qx, b.qy, a[1], a[2]));
                            break;
                        case "Q":
                            b.qx = a[1], b.qy = a[2], a = ["C"].concat(B(b.x, b.y, a[1], a[2], a[3], a[4]));
                            break;
                        case "L":
                            a = ["C"].concat(A(b.x, b.y, a[1], a[2]));
                            break;
                        case "H":
                            a = ["C"].concat(A(b.x, b.y, a[1], b.y));
                            break;
                        case "V":
                            a = ["C"].concat(A(b.x, b.y, b.x, a[1]));
                            break;
                        case "Z":
                            a = ["C"].concat(A(b.x, b.y, b.X, b.Y))
                    }
                    return a
                }), k = function(a, b) {
                    if (a[b].length > 7) {
                        a[b].shift();
                        for (var c = a[b]; c.length;) m[b] = "A", g && (n[b] = "A"), a.splice(b++, 0, ["C"].concat(c.splice(0, 6)));
                        a.splice(b, 1), r = Q(e.length, g && g.length || 0)
                    }
                }, l = function(a, b, c, d, f) { a && b && "M" == a[f][0] && "M" != b[f][0] && (b.splice(f, 0, ["M", d.x, d.y]), c.bx = 0, c.by = 0, c.x = a[f][1], c.y = a[f][2], r = Q(e.length, g && g.length || 0)) }, m = [], n = [], o = "", p = "", q = 0, r = Q(e.length, g && g.length || 0); r > q; q++) {
                e[q] && (o = e[q][0]), "C" != o && (m[q] = o, q && (p = m[q - 1])), e[q] = j(e[q], h, p), "A" != m[q] && "C" == o && (m[q] = "C"), k(e, q), g && (g[q] && (o = g[q][0]), "C" != o && (n[q] = o, q && (p = n[q - 1])), g[q] = j(g[q], i, p), "A" != n[q] && "C" == o && (n[q] = "C"), k(g, q)), l(e, g, h, i, q), l(g, e, i, h, q);
                var s = e[q],
                    t = g && g[q],
                    u = s.length,
                    v = g && t.length;
                h.x = s[u - 2], h.y = s[u - 1], h.bx = M(s[u - 4]) || h.x, h.by = M(s[u - 3]) || h.y, i.bx = g && (M(t[v - 4]) || i.x), i.by = g && (M(t[v - 3]) || i.y), i.x = g && t[v - 2], i.y = g && t[v - 1]
            }
            return g || (d.curve = f(e)), g ? [e, g] : e
        }

        function F(a, b) {
            if (!b) return a;
            var c, d, e, f, g, h, i;
            for (a = E(a), e = 0, g = a.length; g > e; e++)
                for (i = a[e], f = 1, h = i.length; h > f; f += 2) c = b.x(i[f], i[f + 1]), d = b.y(i[f], i[f + 1]), i[f] = c, i[f + 1] = d;
            return a
        }

        function G(a, b) {
            for (var c = [], d = 0, e = a.length; e - 2 * !b > d; d += 2) {
                var f = [{ x: +a[d - 2], y: +a[d - 1] }, { x: +a[d], y: +a[d + 1] }, { x: +a[d + 2], y: +a[d + 3] }, { x: +a[d + 4], y: +a[d + 5] }];
                b ? d ? e - 4 == d ? f[3] = { x: +a[0], y: +a[1] } : e - 2 == d && (f[2] = { x: +a[0], y: +a[1] }, f[3] = { x: +a[2], y: +a[3] }) : f[0] = { x: +a[e - 2], y: +a[e - 1] } : e - 4 == d ? f[3] = f[2] : d || (f[0] = { x: +a[d], y: +a[d + 1] }), c.push(["C", (-f[0].x + 6 * f[1].x + f[2].x) / 6, (-f[0].y + 6 * f[1].y + f[2].y) / 6, (f[1].x + 6 * f[2].x - f[3].x) / 6, (f[1].y + 6 * f[2].y - f[3].y) / 6, f[2].x, f[2].y])
            }
            return c
        }
        var H = b.prototype,
            I = a.is,
            J = a._.clone,
            K = "hasOwnProperty",
            L = /,?([a-z]),?/gi,
            M = parseFloat,
            N = Math,
            O = N.PI,
            P = N.min,
            Q = N.max,
            R = N.pow,
            S = N.abs,
            T = h(1),
            U = h(),
            V = h(0, 1),
            W = a._unit2px,
            X = { path: function(a) { return a.attr("path") }, circle: function(a) { var b = W(a); return x(b.cx, b.cy, b.r) }, ellipse: function(a) { var b = W(a); return x(b.cx || 0, b.cy || 0, b.rx, b.ry) }, rect: function(a) { var b = W(a); return w(b.x || 0, b.y || 0, b.width, b.height, b.rx, b.ry) }, image: function(a) { var b = W(a); return w(b.x || 0, b.y || 0, b.width, b.height) }, line: function(a) { return "M" + [a.attr("x1") || 0, a.attr("y1") || 0, a.attr("x2"), a.attr("y2")] }, polyline: function(a) { return "M" + a.attr("points") }, polygon: function(a) { return "M" + a.attr("points") + "z" }, deflt: function(a) { var b = a.node.getBBox(); return w(b.x, b.y, b.width, b.height) } };
        a.path = c, a.path.getTotalLength = T, a.path.getPointAtLength = U, a.path.getSubpath = function(a, b, c) { if (this.getTotalLength(a) - c < 1e-6) return V(a, b).end; var d = V(a, c, 1); return b ? V(d, b).end : d }, H.getTotalLength = function() { return this.node.getTotalLength ? this.node.getTotalLength() : void 0 }, H.getPointAtLength = function(a) { return U(this.attr("d"), a) }, H.getSubpath = function(b, c) { return a.path.getSubpath(this.attr("d"), b, c) }, a._.box = d, a.path.findDotsAtSegment = i, a.path.bezierBBox = j, a.path.isPointInsideBBox = k, a.path.isBBoxIntersect = l, a.path.intersection = r, a.path.intersectionNumber = s, a.path.isPointInside = u, a.path.getBBox = v, a.path.get = X, a.path.toRelative = y, a.path.toAbsolute = z, a.path.toCubic = E, a.path.map = F, a.path.toString = e, a.path.clone = f
    }), d.plugin(function(a) {
        var d = Math.max,
            e = Math.min,
            f = function(a) {
                if (this.items = [], this.bindings = {}, this.length = 0, this.type = "set", a)
                    for (var b = 0, c = a.length; c > b; b++) a[b] && (this[this.items.length] = this.items[this.items.length] = a[b], this.length++)
            },
            g = f.prototype;
        g.push = function() { for (var a, b, c = 0, d = arguments.length; d > c; c++) a = arguments[c], a && (b = this.items.length, this[b] = this.items[b] = a, this.length++); return this }, g.pop = function() { return this.length && delete this[this.length--], this.items.pop() }, g.forEach = function(a, b) {
            for (var c = 0, d = this.items.length; d > c; c++)
                if (a.call(b, this.items[c], c) === !1) return this;
            return this
        }, g.animate = function(d, e, f, g) {
            "function" != typeof f || f.length || (g = f, f = c.linear), d instanceof a._.Animation && (g = d.callback, f = d.easing, e = f.dur, d = d.attr);
            var h = arguments;
            if (a.is(d, "array") && a.is(h[h.length - 1], "array")) var i = !0;
            var j, k = function() { j ? this.b = j : j = this.b },
                l = 0,
                m = g && function() { l++ == this.length && g.call(this) };
            return this.forEach(function(a, c) { b.once("snap.animcreated." + a.id, k), i ? h[c] && a.animate.apply(a, h[c]) : a.animate(d, e, f, m) })
        }, g.remove = function() { for (; this.length;) this.pop().remove(); return this }, g.bind = function(a, b, c) {
            var d = {};
            if ("function" == typeof b) this.bindings[a] = b;
            else {
                var e = c || a;
                this.bindings[a] = function(a) { d[e] = a, b.attr(d) }
            }
            return this
        }, g.attr = function(a) { var b = {}; for (var c in a) this.bindings[c] ? this.bindings[c](a[c]) : b[c] = a[c]; for (var d = 0, e = this.items.length; e > d; d++) this.items[d].attr(b); return this }, g.clear = function() { for (; this.length;) this.pop() }, g.splice = function(a, b) {
            a = 0 > a ? d(this.length + a, 0) : a, b = d(0, e(this.length - a, b));
            var c, g = [],
                h = [],
                i = [];
            for (c = 2; c < arguments.length; c++) i.push(arguments[c]);
            for (c = 0; b > c; c++) h.push(this[a + c]);
            for (; c < this.length - a; c++) g.push(this[a + c]);
            var j = i.length;
            for (c = 0; c < j + g.length; c++) this.items[a + c] = this[a + c] = j > c ? i[c] : g[c - j];
            for (c = this.items.length = this.length -= b - j; this[c];) delete this[c++];
            return new f(h)
        }, g.exclude = function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (this[b] == a) return this.splice(b, 1), !0;
            return !1
        }, g.insertAfter = function(a) { for (var b = this.items.length; b--;) this.items[b].insertAfter(a); return this }, g.getBBox = function() {
            for (var a = [], b = [], c = [], f = [], g = this.items.length; g--;)
                if (!this.items[g].removed) {
                    var h = this.items[g].getBBox();
                    a.push(h.x), b.push(h.y), c.push(h.x + h.width), f.push(h.y + h.height)
                }
            return a = e.apply(0, a), b = e.apply(0, b), c = d.apply(0, c), f = d.apply(0, f), { x: a, y: b, x2: c, y2: f, width: c - a, height: f - b, cx: a + (c - a) / 2, cy: b + (f - b) / 2 }
        }, g.clone = function(a) { a = new f; for (var b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].clone()); return a }, g.toString = function() { return "Snapâ€˜s set" }, g.type = "set", a.set = function() { var a = new f; return arguments.length && a.push.apply(a, Array.prototype.slice.call(arguments, 0)), a }
    }), d.plugin(function(a, c) {
        function d(a) {
            var b = a[0];
            switch (b.toLowerCase()) {
                case "t":
                    return [b, 0, 0];
                case "m":
                    return [b, 1, 0, 0, 1, 0, 0];
                case "r":
                    return 4 == a.length ? [b, 0, a[2], a[3]] : [b, 0];
                case "s":
                    return 5 == a.length ? [b, 1, 1, a[3], a[4]] : 3 == a.length ? [b, 1, 1] : [b, 1]
            }
        }

        function e(b, c, e) {
            c = m(c).replace(/\.{3}|\u2026/g, b), b = a.parseTransformString(b) || [], c = a.parseTransformString(c) || [];
            for (var f, g, h, k, l = Math.max(b.length, c.length), n = [], o = [], p = 0; l > p; p++) {
                if (h = b[p] || d(c[p]), k = c[p] || d(h), h[0] != k[0] || "r" == h[0].toLowerCase() && (h[2] != k[2] || h[3] != k[3]) || "s" == h[0].toLowerCase() && (h[3] != k[3] || h[4] != k[4])) {
                    b = a._.transform2matrix(b, e()), c = a._.transform2matrix(c, e()), n = [
                        ["m", b.a, b.b, b.c, b.d, b.e, b.f]
                    ], o = [
                        ["m", c.a, c.b, c.c, c.d, c.e, c.f]
                    ];
                    break
                }
                for (n[p] = [], o[p] = [], f = 0, g = Math.max(h.length, k.length); g > f; f++) f in h && (n[p][f] = h[f]), f in k && (o[p][f] = k[f])
            }
            return { from: j(n), to: j(o), f: i(n) }
        }

        function f(a) { return a }

        function g(a) { return function(b) { return +b.toFixed(3) + a } }

        function h(b) { return a.rgb(b[0], b[1], b[2]) }

        function i(a) {
            var b, c, d, e, f, g, h = 0,
                i = [];
            for (b = 0, c = a.length; c > b; b++) {
                for (f = "[", g = ['"' + a[b][0] + '"'], d = 1, e = a[b].length; e > d; d++) g[d] = "val[" + h++ + "]";
                f += g + "]", i[b] = f
            }
            return Function("val", "return Snap.path.toString.call([" + i + "])")
        }

        function j(a) {
            for (var b = [], c = 0, d = a.length; d > c; c++)
                for (var e = 1, f = a[c].length; f > e; e++) b.push(a[c][e]);
            return b
        }
        var k = {},
            l = /[a-z]+$/i,
            m = String;
        k.stroke = k.fill = "colour", c.prototype.equal = function(a, c) { return b("snap.util.equal", this, a, c).firstDefined() }, b.on("snap.util.equal", function(b, c) {
            var d, n, o = m(this.attr(b) || ""),
                p = this;
            if (o == +o && c == +c) return { from: +o, to: +c, f: f };
            if ("colour" == k[b]) return d = a.color(o), n = a.color(c), { from: [d.r, d.g, d.b, d.opacity], to: [n.r, n.g, n.b, n.opacity], f: h };
            if ("transform" == b || "gradientTransform" == b || "patternTransform" == b) return c instanceof a.Matrix && (c = c.toTransformString()), a._.rgTransform.test(c) || (c = a._.svgTransform2string(c)), e(o, c, function() { return p.getBBox(1) });
            if ("d" == b || "path" == b) return d = a.path.toCubic(o, c), { from: j(d[0]), to: j(d[1]), f: i(d[0]) };
            if ("points" == b) return d = m(o).split(a._.separator), n = m(c).split(a._.separator), { from: d, to: n, f: function(a) { return a } };
            aUnit = o.match(l);
            var q = m(c).match(l);
            return aUnit && aUnit == q ? { from: parseFloat(o), to: parseFloat(c), f: g(aUnit) } : { from: this.asPX(b), to: this.asPX(b, c), f: f }
        })
    }), d.plugin(function(a, c, d, e) {
        for (var f = c.prototype, g = "hasOwnProperty", h = ("createTouch" in e.doc), i = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchstart", "touchmove", "touchend", "touchcancel"], j = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }, k = (function(a, b) {
                var c = "y" == a ? "scrollTop" : "scrollLeft",
                    d = b && b.node ? b.node.ownerDocument : e.doc;
                return d[c in d.documentElement ? "documentElement" : "body"][c]
            }), l = function() { this.returnValue = !1 }, m = function() { return this.originalEvent.preventDefault() }, n = function() { this.cancelBubble = !0 }, o = function() { return this.originalEvent.stopPropagation() }, p = function() {
                return e.doc.addEventListener ? function(a, b, c, d) {
                    var e = h && j[b] ? j[b] : b,
                        f = function(e) {
                            var f = k("y", d),
                                i = k("x", d);
                            if (h && j[g](b))
                                for (var l = 0, n = e.targetTouches && e.targetTouches.length; n > l; l++)
                                    if (e.targetTouches[l].target == a || a.contains(e.targetTouches[l].target)) {
                                        var p = e;
                                        e = e.targetTouches[l], e.originalEvent = p, e.preventDefault = m, e.stopPropagation = o;
                                        break
                                    }
                            var q = e.clientX + i,
                                r = e.clientY + f;
                            return c.call(d, e, q, r)
                        };
                    return b !== e && a.addEventListener(b, f, !1), a.addEventListener(e, f, !1),
                        function() { return b !== e && a.removeEventListener(b, f, !1), a.removeEventListener(e, f, !1), !0 }
                } : e.doc.attachEvent ? function(a, b, c, d) {
                    var e = function(a) {
                        a = a || d.node.ownerDocument.window.event;
                        var b = k("y", d),
                            e = k("x", d),
                            f = a.clientX + e,
                            g = a.clientY + b;
                        return a.preventDefault = a.preventDefault || l, a.stopPropagation = a.stopPropagation || n, c.call(d, a, f, g)
                    };
                    a.attachEvent("on" + b, e);
                    var f = function() { return a.detachEvent("on" + b, e), !0 };
                    return f
                } : void 0
            }(), q = [], r = function(a) {
                for (var c, d = a.clientX, e = a.clientY, f = k("y"), g = k("x"), i = q.length; i--;) {
                    if (c = q[i], h) {
                        for (var j, l = a.touches && a.touches.length; l--;)
                            if (j = a.touches[l], j.identifier == c.el._drag.id || c.el.node.contains(j.target)) { d = j.clientX, e = j.clientY, (a.originalEvent ? a.originalEvent : a).preventDefault(); break }
                    } else a.preventDefault(); {
                        var m = c.el.node;
                        m.nextSibling, m.parentNode, m.style.display
                    }
                    d += g, e += f, b("snap.drag.move." + c.el.id, c.move_scope || c.el, d - c.el._drag.x, e - c.el._drag.y, d, e, a)
                }
            }, s = function(c) {
                a.unmousemove(r).unmouseup(s);
                for (var d, e = q.length; e--;) d = q[e], d.el._drag = {}, b("snap.drag.end." + d.el.id, d.end_scope || d.start_scope || d.move_scope || d.el, c);
                q = []
            }, t = i.length; t--;) ! function(b) {
            a[b] = f[b] = function(c, d) { return a.is(c, "function") && (this.events = this.events || [], this.events.push({ name: b, f: c, unbind: p(this.node || document, b, c, d || this) })), this }, a["un" + b] = f["un" + b] = function(a) {
                for (var c = this.events || [], d = c.length; d--;)
                    if (c[d].name == b && (c[d].f == a || !a)) return c[d].unbind(), c.splice(d, 1), !c.length && delete this.events, this;
                return this
            }
        }(i[t]);
        f.hover = function(a, b, c, d) { return this.mouseover(a, c).mouseout(b, d || c) }, f.unhover = function(a, b) { return this.unmouseover(a).unmouseout(b) };
        var u = [];
        f.drag = function(c, d, e, f, g, h) {
            function i(i, j, k) {
                (i.originalEvent || i).preventDefault(), this._drag.x = j, this._drag.y = k, this._drag.id = i.identifier, !q.length && a.mousemove(r).mouseup(s), q.push({ el: this, move_scope: f, start_scope: g, end_scope: h }), d && b.on("snap.drag.start." + this.id, d), c && b.on("snap.drag.move." + this.id, c), e && b.on("snap.drag.end." + this.id, e), b("snap.drag.start." + this.id, g || f || this, j, k, i)
            }
            if (!arguments.length) { var j; return this.drag(function(a, b) { this.attr({ transform: j + (j ? "T" : "t") + [a, b] }) }, function() { j = this.transform().local }) }
            return this._drag = {}, u.push({ el: this, start: i }), this.mousedown(i), this
        }, f.undrag = function() { for (var c = u.length; c--;) u[c].el == this && (this.unmousedown(u[c].start), u.splice(c, 1), b.unbind("snap.drag.*." + this.id)); return !u.length && a.unmousemove(r).unmouseup(s), this }
    }), d.plugin(function(a, c, d) {
        var e = (c.prototype, d.prototype),
            f = /^\s*url\((.+)\)/,
            g = String,
            h = a._.$;
        a.filter = {}, e.filter = function(b) {
            var d = this;
            "svg" != d.type && (d = d.paper);
            var e = a.parse(g(b)),
                f = a._.id(),
                i = (d.node.offsetWidth, d.node.offsetHeight, h("filter"));
            return h(i, { id: f, filterUnits: "userSpaceOnUse" }), i.appendChild(e.node), d.defs.appendChild(i), new c(i)
        }, b.on("snap.util.getattr.filter", function() { b.stop(); var c = h(this.node, "filter"); if (c) { var d = g(c).match(f); return d && a.select(d[1]) } }), b.on("snap.util.attr.filter", function(d) {
            if (d instanceof c && "filter" == d.type) {
                b.stop();
                var e = d.node.id;
                e || (h(d.node, { id: d.id }), e = d.id), h(this.node, { filter: a.url(e) })
            }
            d && "none" != d || (b.stop(), this.node.removeAttribute("filter"))
        }), a.filter.blur = function(b, c) { null == b && (b = 2); var d = null == c ? b : [b, c]; return a.format('<feGaussianBlur stdDeviation="{def}"/>', { def: d }) }, a.filter.blur.toString = function() { return this() }, a.filter.shadow = function(b, c, d, e, f) { return "string" == typeof d && (e = d, f = e, d = 4), "string" != typeof e && (f = e, e = "#000"), e = e || "#000", null == d && (d = 4), null == f && (f = 1), null == b && (b = 0, c = 2), null == c && (c = b), e = a.color(e), a.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>', { color: e, dx: b, dy: c, blur: d, opacity: f }) }, a.filter.shadow.toString = function() { return this() }, a.filter.grayscale = function(b) { return null == b && (b = 1), a.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>', { a: .2126 + .7874 * (1 - b), b: .7152 - .7152 * (1 - b), c: .0722 - .0722 * (1 - b), d: .2126 - .2126 * (1 - b), e: .7152 + .2848 * (1 - b), f: .0722 - .0722 * (1 - b), g: .2126 - .2126 * (1 - b), h: .0722 + .9278 * (1 - b) }) }, a.filter.grayscale.toString = function() { return this() }, a.filter.sepia = function(b) { return null == b && (b = 1), a.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>', { a: .393 + .607 * (1 - b), b: .769 - .769 * (1 - b), c: .189 - .189 * (1 - b), d: .349 - .349 * (1 - b), e: .686 + .314 * (1 - b), f: .168 - .168 * (1 - b), g: .272 - .272 * (1 - b), h: .534 - .534 * (1 - b), i: .131 + .869 * (1 - b) }) }, a.filter.sepia.toString = function() { return this() }, a.filter.saturate = function(b) { return null == b && (b = 1), a.format('<feColorMatrix type="saturate" values="{amount}"/>', { amount: 1 - b }) }, a.filter.saturate.toString = function() { return this() }, a.filter.hueRotate = function(b) { return b = b || 0, a.format('<feColorMatrix type="hueRotate" values="{angle}"/>', { angle: b }) }, a.filter.hueRotate.toString = function() { return this() }, a.filter.invert = function(b) { return null == b && (b = 1), a.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>', { amount: b, amount2: 1 - b }) }, a.filter.invert.toString = function() { return this() }, a.filter.brightness = function(b) { return null == b && (b = 1), a.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>', { amount: b }) }, a.filter.brightness.toString = function() { return this() }, a.filter.contrast = function(b) { return null == b && (b = 1), a.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>', { amount: b, amount2: .5 - b / 2 }) }, a.filter.contrast.toString = function() { return this() }
    }), d
});
/*! svg4everybody v1.0.0 | github.com/jonathantneal/svg4everybody */

(function(document, uses, requestAnimationFrame, CACHE, IE9TO11) {
    function embed(svg, g) {
        if (g) {
            var
                viewBox = g.getAttribute('viewBox'),
                fragment = document.createDocumentFragment(),
                clone = g.cloneNode(true);

            if (viewBox) {
                svg.setAttribute('viewBox', viewBox);
            }

            while (clone.childNodes.length) {
                fragment.appendChild(clone.childNodes[0]);
            }

            svg.appendChild(fragment);
        }
    }

    function onload() {
        var xhr = this,
            x = document.createElement('x'),
            s = xhr.s;

        x.innerHTML = xhr.responseText;

        xhr.onload = function() {
            s.splice(0).map(function(array) {
                embed(array[0], x.querySelector('#' + array[1].replace(/(\W)/g, '\\$1')));
            });
        };

        xhr.onload();
    }

    function onframe() {
        var use;

        while ((use = uses[0])) {
            var
                svg = use.parentNode,
                url = use.getAttribute('xlink:href').split('#'),
                url_root = url[0],
                url_hash = url[1];

            svg.removeChild(use);

            if (url_root.length) {
                var xhr = CACHE[url_root] = CACHE[url_root] || new XMLHttpRequest();

                if (!xhr.s) {
                    xhr.s = [];

                    xhr.open('GET', url_root);

                    xhr.onload = onload;

                    xhr.send();
                }

                xhr.s.push([svg, url_hash]);

                if (xhr.readyState === 4) {
                    xhr.onload();
                }

            } else {
                embed(svg, document.getElementById(url_hash));
            }
        }

        requestAnimationFrame(onframe);
    }

    if (IE9TO11) {
        onframe();
    }
})(
    document,
    document.getElementsByTagName('use'),
    window.requestAnimationFrame || window.setTimeout, {},
    /Trident\/[567]\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537
);
/*! mobile-detect - v1.3.2 - 2016-03-31
https://github.com/hgoebl/mobile-detect.js */
! function(a, b) {
    a(function() {
        "use strict";

        function a(a, b) { return null != a && null != b && a.toLowerCase() === b.toLowerCase() }

        function c(a, b) {
            var c, d, e = a.length;
            if (!e || !b) return !1;
            for (c = b.toLowerCase(), d = 0; e > d; ++d)
                if (c === a[d].toLowerCase()) return !0;
            return !1
        }

        function d(a) { for (var b in a) h.call(a, b) && (a[b] = new RegExp(a[b], "i")) }

        function e(a, b) { this.ua = a || "", this._cache = {}, this.maxPhoneWidth = b || 600 }
        var f = {};
        f.mobileDetectRules = { phones: { iPhone: "\\biPhone\\b|\\biPod\\b", BlackBerry: "BlackBerry|\\bBB10\\b|rim[0-9]+", HTC: "HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m", Nexus: "Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6", Dell: "Dell.*Streak|Dell.*Aero|Dell.*Venue|DELL.*Venue Pro|Dell Flash|Dell Smoke|Dell Mini 3iX|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b", Motorola: "Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b", Samsung: "Samsung|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205|SM-G9350", LG: "\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323)", Sony: "SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533", Asus: "Asus.*Galaxy|PadFone.*Mobile", Micromax: "Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b", Palm: "PalmSource|Palm", Vertu: "Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature", Pantech: "PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790", Fly: "IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250", Wiko: "KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM", iMobile: "i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)", SimValley: "\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b", Wolfgang: "AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q", Alcatel: "Alcatel", Nintendo: "Nintendo 3DS", Amoi: "Amoi", INQ: "INQ", GenericPhone: "Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser" }, tablets: { iPad: "iPad|iPad.*Mobile", NexusTablet: "Android.*Nexus[\\s]+(7|9|10)", SamsungTablet: "SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561", Kindle: "Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI)\\b", SurfaceTablet: "Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)", HPTablet: "HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10", AsusTablet: "^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K017 |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C", BlackBerryTablet: "PlayBook|RIM Tablet", HTCtablet: "HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410", MotorolaTablet: "xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617", NookTablet: "Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2", AcerTablet: "Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b", ToshibaTablet: "Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO", LGTablet: "\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b", FujitsuTablet: "Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b", PrestigioTablet: "PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002", LenovoTablet: "Lenovo TAB|Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)", DellTablet: "Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7", YarvikTablet: "Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b", MedionTablet: "Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB", ArnovaTablet: "AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2", IntensoTablet: "INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004", IRUTablet: "M702pro", MegafonTablet: "MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b", EbodaTablet: "E-Boda (Supreme|Impresspeed|Izzycomm|Essential)", AllViewTablet: "Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)", ArchosTablet: "\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b", AinolTablet: "NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark", SonyTablet: "Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP612|SOT31", PhilipsTablet: "\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b", CubeTablet: "Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT", CobyTablet: "MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010", MIDTablet: "M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10", MSITablet: "MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b", SMiTTablet: "Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)", RockChipTablet: "Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A", FlyTablet: "IQ310|Fly Vision", bqTablet: "Android.*(bq)?.*(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris E10)|Maxwell.*Lite|Maxwell.*Plus", HuaweiTablet: "MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim", NecTablet: "\\bN-06D|\\bN-08D", PantechTablet: "Pantech.*P4100", BronchoTablet: "Broncho.*(N701|N708|N802|a710)", VersusTablet: "TOUCHPAD.*[78910]|\\bTOUCHTAB\\b", ZyncTablet: "z1000|Z99 2G|z99|z930|z999|z990|z909|Z919|z900", PositivoTablet: "TB07STA|TB10STA|TB07FTA|TB10FTA", NabiTablet: "Android.*\\bNabi", KoboTablet: "Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build", DanewTablet: "DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b", TexetTablet: "NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE", PlaystationTablet: "Playstation.*(Portable|Vita)", TrekstorTablet: "ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab", PyleAudioTablet: "\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b", AdvanTablet: "Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ", DanyTechTablet: "Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1", GalapadTablet: "Android.*\\bG1\\b", MicromaxTablet: "Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b", KarbonnTablet: "Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b", AllFineTablet: "Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide", PROSCANTablet: "\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b", YONESTablet: "BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026", ChangJiaTablet: "TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503", GUTablet: "TX-A1301|TX-M9002|Q702|kf026", PointOfViewTablet: "TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10", OvermaxTablet: "OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)", HCLTablet: "HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync", DPSTablet: "DPS Dream 9|DPS Dual 7", VistureTablet: "V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10", CrestaTablet: "CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989", MediatekTablet: "\\bMT8125|MT8389|MT8135|MT8377\\b", ConcordeTablet: "Concorde([ ]+)?Tab|ConCorde ReadMan", GoCleverTablet: "GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042", ModecomTablet: "FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003", VoninoTablet: "\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b", ECSTablet: "V07OT2|TM105A|S10OT1|TR10CS1", StorexTablet: "eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab", VodafoneTablet: "SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7", EssentielBTablet: "Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2", RossMoorTablet: "RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711", iMobileTablet: "i-mobile i-note", TolinoTablet: "tolino tab [0-9.]+|tolino shine", AudioSonicTablet: "\\bC-22Q|T7-QC|T-17B|T-17P\\b", AMPETablet: "Android.* A78 ", SkkTablet: "Android.* (SKYPAD|PHOENIX|CYCLOPS)", TecnoTablet: "TECNO P9", JXDTablet: "Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b", iJoyTablet: "Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)", FX2Tablet: "FX2 PAD7|FX2 PAD10", XoroTablet: "KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151", ViewsonicTablet: "ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a", OdysTablet: "LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10", CaptivaTablet: "CAPTIVA PAD", IconbitTablet: "NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S", TeclastTablet: "T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi", OndaTablet: "\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+", JaytechTablet: "TPC-PA762", BlaupunktTablet: "Endeavour 800NG|Endeavour 1010", DigmaTablet: "\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b", EvolioTablet: "ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b", LavaTablet: "QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b", AocTablet: "MW0811|MW0812|MW0922|MTK8382", MpmanTablet: "MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010", CelkonTablet: "CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b", WolderTablet: "miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b", MiTablet: "\\bMI PAD\\b|\\bHM NOTE 1W\\b", NibiruTablet: "Nibiru M1|Nibiru Jupiter One", NexoTablet: "NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI", LeaderTablet: "TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100", UbislateTablet: "UbiSlate[\\s]?7C", PocketBookTablet: "Pocketbook", Hudl: "Hudl HT7S3|Hudl 2", TelstraTablet: "T-Hub2", GenericTablet: "Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bJolla\\b|\\bTP750\\b" }, oss: { AndroidOS: "Android", BlackBerryOS: "blackberry|\\bBB10\\b|rim tablet os", PalmOS: "PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino", SymbianOS: "Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b", WindowsMobileOS: "Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Window Mobile|Windows Phone [0-9.]+|WCE;", WindowsPhoneOS: "Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;", iOS: "\\biPhone.*Mobile|\\biPod|\\biPad", MeeGoOS: "MeeGo", MaemoOS: "Maemo", JavaOS: "J2ME/|\\bMIDP\\b|\\bCLDC\\b", webOS: "webOS|hpwOS", badaOS: "\\bBada\\b", BREWOS: "BREW" }, uas: { Chrome: "\\bCrMo\\b|CriOS|Android.*Chrome/[.0-9]* (Mobile)?", Dolfin: "\\bDolfin\\b", Opera: "Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR/[0-9.]+|Coast/[0-9.]+", Skyfire: "Skyfire", IE: "IEMobile|MSIEMobile", Firefox: "fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile", Bolt: "bolt", TeaShark: "teashark", Blazer: "Blazer", Safari: "Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari", Tizen: "Tizen", UCBrowser: "UC.*Browser|UCWEB", baiduboxapp: "baiduboxapp", baidubrowser: "baidubrowser", DiigoBrowser: "DiigoBrowser", Puffin: "Puffin", Mercury: "\\bMercury\\b", ObigoBrowser: "Obigo", NetFront: "NF-Browser", GenericBrowser: "NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger" }, props: { Mobile: "Mobile/[VER]", Build: "Build/[VER]", Version: "Version/[VER]", VendorID: "VendorID/[VER]", iPad: "iPad.*CPU[a-z ]+[VER]", iPhone: "iPhone.*CPU[a-z ]+[VER]", iPod: "iPod.*CPU[a-z ]+[VER]", Kindle: "Kindle/[VER]", Chrome: ["Chrome/[VER]", "CriOS/[VER]", "CrMo/[VER]"], Coast: ["Coast/[VER]"], Dolfin: "Dolfin/[VER]", Firefox: "Firefox/[VER]", Fennec: "Fennec/[VER]", IE: ["IEMobile/[VER];", "IEMobile [VER]", "MSIE [VER];", "Trident/[0-9.]+;.*rv:[VER]"], NetFront: "NetFront/[VER]", NokiaBrowser: "NokiaBrowser/[VER]", Opera: [" OPR/[VER]", "Opera Mini/[VER]", "Version/[VER]"], "Opera Mini": "Opera Mini/[VER]", "Opera Mobi": "Version/[VER]", "UC Browser": "UC Browser[VER]", MQQBrowser: "MQQBrowser/[VER]", MicroMessenger: "MicroMessenger/[VER]", baiduboxapp: "baiduboxapp/[VER]", baidubrowser: "baidubrowser/[VER]", Iron: "Iron/[VER]", Safari: ["Version/[VER]", "Safari/[VER]"], Skyfire: "Skyfire/[VER]", Tizen: "Tizen/[VER]", Webkit: "webkit[ /][VER]", Gecko: "Gecko/[VER]", Trident: "Trident/[VER]", Presto: "Presto/[VER]", iOS: " \\bi?OS\\b [VER][ ;]{1}", Android: "Android [VER]", BlackBerry: ["BlackBerry[\\w]+/[VER]", "BlackBerry.*Version/[VER]", "Version/[VER]"], BREW: "BREW [VER]", Java: "Java/[VER]", "Windows Phone OS": ["Windows Phone OS [VER]", "Windows Phone [VER]"], "Windows Phone": "Windows Phone [VER]", "Windows CE": "Windows CE/[VER]", "Windows NT": "Windows NT [VER]", Symbian: ["SymbianOS/[VER]", "Symbian/[VER]"], webOS: ["webOS/[VER]", "hpwOS/[VER];"] }, utils: { Bot: "Googlebot|facebookexternalhit|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom", MobileBot: "Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker/M1A1-R2D2", DesktopMode: "WPDesktop", TV: "SonyDTV|HbbTV", WebKit: "(webkit)[ /]([\\w.]+)", Console: "\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|PLAYSTATION|Xbox)\\b", Watch: "SM-V700" } }, f.detectMobileBrowsers = { fullPattern: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i, shortPattern: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i, tabletPattern: /android|ipad|playbook|silk/i };
        var g, h = Object.prototype.hasOwnProperty;
        return f.FALLBACK_PHONE = "UnknownPhone", f.FALLBACK_TABLET = "UnknownTablet", f.FALLBACK_MOBILE = "UnknownMobile", g = "isArray" in Array ? Array.isArray : function(a) { return "[object Array]" === Object.prototype.toString.call(a) },
            function() {
                var a, b, c, e, i, j, k = f.mobileDetectRules;
                for (a in k.props)
                    if (h.call(k.props, a)) {
                        for (b = k.props[a], g(b) || (b = [b]), i = b.length, e = 0; i > e; ++e) c = b[e], j = c.indexOf("[VER]"), j >= 0 && (c = c.substring(0, j) + "([\\w._\\+]+)" + c.substring(j + 5)), b[e] = new RegExp(c, "i");
                        k.props[a] = b
                    }
                d(k.oss), d(k.phones), d(k.tablets), d(k.uas), d(k.utils), k.oss0 = { WindowsPhoneOS: k.oss.WindowsPhoneOS, WindowsMobileOS: k.oss.WindowsMobileOS }
            }(),
            f.findMatch = function(a, b) {
                for (var c in a)
                    if (h.call(a, c) && a[c].test(b)) return c;
                return null
            }, f.findMatches = function(a, b) { var c = []; for (var d in a) h.call(a, d) && a[d].test(b) && c.push(d); return c }, f.getVersionStr = function(a, b) {
                var c, d, e, g, i = f.mobileDetectRules.props;
                if (h.call(i, a))
                    for (c = i[a], e = c.length, d = 0; e > d; ++d)
                        if (g = c[d].exec(b), null !== g) return g[1];
                return null
            }, f.getVersion = function(a, b) { var c = f.getVersionStr(a, b); return c ? f.prepareVersionNo(c) : NaN }, f.prepareVersionNo = function(a) { var b; return b = a.split(/[a-z._ \/\-]/i), 1 === b.length && (a = b[0]), b.length > 1 && (a = b[0] + ".", b.shift(), a += b.join("")), Number(a) }, f.isMobileFallback = function(a) { return f.detectMobileBrowsers.fullPattern.test(a) || f.detectMobileBrowsers.shortPattern.test(a.substr(0, 4)) }, f.isTabletFallback = function(a) { return f.detectMobileBrowsers.tabletPattern.test(a) }, f.prepareDetectionCache = function(a, c, d) { if (a.mobile === b) { var g, h, i; return (h = f.findMatch(f.mobileDetectRules.tablets, c)) ? (a.mobile = a.tablet = h, void(a.phone = null)) : (g = f.findMatch(f.mobileDetectRules.phones, c)) ? (a.mobile = a.phone = g, void(a.tablet = null)) : void(f.isMobileFallback(c) ? (i = e.isPhoneSized(d), i === b ? (a.mobile = f.FALLBACK_MOBILE, a.tablet = a.phone = null) : i ? (a.mobile = a.phone = f.FALLBACK_PHONE, a.tablet = null) : (a.mobile = a.tablet = f.FALLBACK_TABLET, a.phone = null)) : f.isTabletFallback(c) ? (a.mobile = a.tablet = f.FALLBACK_TABLET, a.phone = null) : a.mobile = a.tablet = a.phone = null) } }, f.mobileGrade = function(a) { var b = null !== a.mobile(); return a.os("iOS") && a.version("iPad") >= 4.3 || a.os("iOS") && a.version("iPhone") >= 3.1 || a.os("iOS") && a.version("iPod") >= 3.1 || a.version("Android") > 2.1 && a.is("Webkit") || a.version("Windows Phone OS") >= 7 || a.is("BlackBerry") && a.version("BlackBerry") >= 6 || a.match("Playbook.*Tablet") || a.version("webOS") >= 1.4 && a.match("Palm|Pre|Pixi") || a.match("hp.*TouchPad") || a.is("Firefox") && a.version("Firefox") >= 12 || a.is("Chrome") && a.is("AndroidOS") && a.version("Android") >= 4 || a.is("Skyfire") && a.version("Skyfire") >= 4.1 && a.is("AndroidOS") && a.version("Android") >= 2.3 || a.is("Opera") && a.version("Opera Mobi") > 11 && a.is("AndroidOS") || a.is("MeeGoOS") || a.is("Tizen") || a.is("Dolfin") && a.version("Bada") >= 2 || (a.is("UC Browser") || a.is("Dolfin")) && a.version("Android") >= 2.3 || a.match("Kindle Fire") || a.is("Kindle") && a.version("Kindle") >= 3 || a.is("AndroidOS") && a.is("NookTablet") || a.version("Chrome") >= 11 && !b || a.version("Safari") >= 5 && !b || a.version("Firefox") >= 4 && !b || a.version("MSIE") >= 7 && !b || a.version("Opera") >= 10 && !b ? "A" : a.os("iOS") && a.version("iPad") < 4.3 || a.os("iOS") && a.version("iPhone") < 3.1 || a.os("iOS") && a.version("iPod") < 3.1 || a.is("Blackberry") && a.version("BlackBerry") >= 5 && a.version("BlackBerry") < 6 || a.version("Opera Mini") >= 5 && a.version("Opera Mini") <= 6.5 && (a.version("Android") >= 2.3 || a.is("iOS")) || a.match("NokiaN8|NokiaC7|N97.*Series60|Symbian/3") || a.version("Opera Mobi") >= 11 && a.is("SymbianOS") ? "B" : (a.version("BlackBerry") < 5 || a.match("MSIEMobile|Windows CE.*Mobile") || a.version("Windows Mobile") <= 5.2, "C") }, f.detectOS = function(a) { return f.findMatch(f.mobileDetectRules.oss0, a) || f.findMatch(f.mobileDetectRules.oss, a) }, f.getDeviceSmallerSide = function() { return window.screen.width < window.screen.height ? window.screen.width : window.screen.height }, e.prototype = { constructor: e, mobile: function() { return f.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.mobile }, phone: function() { return f.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.phone }, tablet: function() { return f.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.tablet }, userAgent: function() { return this._cache.userAgent === b && (this._cache.userAgent = f.findMatch(f.mobileDetectRules.uas, this.ua)), this._cache.userAgent }, userAgents: function() { return this._cache.userAgents === b && (this._cache.userAgents = f.findMatches(f.mobileDetectRules.uas, this.ua)), this._cache.userAgents }, os: function() { return this._cache.os === b && (this._cache.os = f.detectOS(this.ua)), this._cache.os }, version: function(a) { return f.getVersion(a, this.ua) }, versionStr: function(a) { return f.getVersionStr(a, this.ua) }, is: function(b) { return c(this.userAgents(), b) || a(b, this.os()) || a(b, this.phone()) || a(b, this.tablet()) || c(f.findMatches(f.mobileDetectRules.utils, this.ua), b) }, match: function(a) { return a instanceof RegExp || (a = new RegExp(a, "i")), a.test(this.ua) }, isPhoneSized: function(a) { return e.isPhoneSized(a || this.maxPhoneWidth) }, mobileGrade: function() { return this._cache.grade === b && (this._cache.grade = f.mobileGrade(this)), this._cache.grade } }, "undefined" != typeof window && window.screen ? e.isPhoneSized = function(a) { return 0 > a ? b : f.getDeviceSmallerSide() <= a } : e.isPhoneSized = function() {}, e._impl = f, e
    })
}(function(a) { if ("undefined" != typeof module && module.exports) return function(a) { module.exports = a() }; if ("function" == typeof define && define.amd) return define; if ("undefined" != typeof window) return function(a) { window.MobileDetect = a() }; throw new Error("unknown environment") }());
/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2015, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */


(function($, window, document, undefined) {
    'use strict';

    var header_helpers = function(class_array) {
        var head = $('head');
        head.prepend($.map(class_array, function(class_name) {
            if (head.has('.' + class_name).length === 0) {
                return '<meta class="' + class_name + '" />';
            }
        }));
    };

    header_helpers([
        'foundation-mq-small',
        'foundation-mq-small-only',
        'foundation-mq-medium',
        'foundation-mq-medium-only',
        'foundation-mq-large',
        'foundation-mq-large-only',
        'foundation-mq-xlarge',
        'foundation-mq-xlarge-only',
        'foundation-mq-xxlarge',
        'foundation-data-attribute-namespace'
    ]);

    // Enable FastClick if present

    $(function() {
        if (typeof FastClick !== 'undefined') {
            // Don't attach to body if undefined
            if (typeof document.body !== 'undefined') {
                FastClick.attach(document.body);
            }
        }
    });

    // private Fast Selector wrapper,
    // returns jQuery object. Only use where
    // getElementById is not available.
    var S = function(selector, context) {
        if (typeof selector === 'string') {
            if (context) {
                var cont;
                if (context.jquery) {
                    cont = context[0];
                    if (!cont) {
                        return context;
                    }
                } else {
                    cont = context;
                }
                return $(cont.querySelectorAll(selector));
            }

            return $(document.querySelectorAll(selector));
        }

        return $(selector, context);
    };

    // Namespace functions.

    var attr_name = function(init) {
        var arr = [];
        if (!init) {
            arr.push('data');
        }
        if (this.namespace.length > 0) {
            arr.push(this.namespace);
        }
        arr.push(this.name);

        return arr.join('-');
    };

    var add_namespace = function(str) {
        var parts = str.split('-'),
            i = parts.length,
            arr = [];

        while (i--) {
            if (i !== 0) {
                arr.push(parts[i]);
            } else {
                if (this.namespace.length > 0) {
                    arr.push(this.namespace, parts[i]);
                } else {
                    arr.push(parts[i]);
                }
            }
        }

        return arr.reverse().join('-');
    };

    // Event binding and data-options updating.

    var bindings = function(method, options) {
        var self = this,
            bind = function() {
                var $this = S(this),
                    should_bind_events = !$this.data(self.attr_name(true) + '-init');
                $this.data(self.attr_name(true) + '-init', $.extend({}, self.settings, (options || method), self.data_options($this)));

                if (should_bind_events) {
                    self.events(this);
                }
            };

        if (S(this.scope).is('[' + this.attr_name() + ']')) {
            bind.call(this.scope);
        } else {
            S('[' + this.attr_name() + ']', this.scope).each(bind);
        }
        // # Patch to fix #5043 to move this *after* the if/else clause in order for Backbone and similar frameworks to have improved control over event binding and data-options updating.
        if (typeof method === 'string') {
            return this[method].call(this, options);
        }

    };

    var single_image_loaded = function(image, callback) {
        function loaded() {
            callback(image[0]);
        }

        function bindLoad() {
            this.one('load', loaded);

            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                var src = this.attr('src'),
                    param = src.match(/\?/) ? '&' : '?';

                param += 'random=' + (new Date()).getTime();
                this.attr('src', src + param);
            }
        }

        if (!image.attr('src')) {
            loaded();
            return;
        }

        if (image[0].complete || image[0].readyState === 4) {
            loaded();
        } else {
            bindLoad.call(image);
        }
    };

    /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

    window.matchMedia || (window.matchMedia = function() {
        "use strict";

        // For browsers that support matchMedium api such as IE 9 and webkit
        var styleMedia = (window.styleMedia || window.media);

        // For those that don't support matchMedium
        if (!styleMedia) {
            var style = document.createElement('style'),
                script = document.getElementsByTagName('script')[0],
                info = null;

            style.type = 'text/css';
            style.id = 'matchmediajs-test';

            script.parentNode.insertBefore(style, script);

            // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
            info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

            styleMedia = {
                matchMedium: function(media) {
                    var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                    // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                    if (style.styleSheet) {
                        style.styleSheet.cssText = text;
                    } else {
                        style.textContent = text;
                    }

                    // Test if media query is true or false
                    return info.width === '1px';
                }
            };
        }

        return function(media) {
            return {
                matches: styleMedia.matchMedium(media || 'all'),
                media: media || 'all'
            };
        };
    }());

    /*
     * jquery.requestAnimationFrame
     * https://github.com/gnarf37/jquery-requestAnimationFrame
     * Requires jQuery 1.8+
     *
     * Copyright (c) 2012 Corey Frang
     * Licensed under the MIT license.
     */

    (function(jQuery) {


        // requestAnimationFrame polyfill adapted from Erik MÃ¶ller
        // fixes from Paul Irish and Tino Zijdel
        // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

        var animating,
            lastTime = 0,
            vendors = ['webkit', 'moz'],
            requestAnimationFrame = window.requestAnimationFrame,
            cancelAnimationFrame = window.cancelAnimationFrame,
            jqueryFxAvailable = 'undefined' !== typeof jQuery.fx;

        for (; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
            requestAnimationFrame = window[vendors[lastTime] + 'RequestAnimationFrame'];
            cancelAnimationFrame = cancelAnimationFrame ||
                window[vendors[lastTime] + 'CancelAnimationFrame'] ||
                window[vendors[lastTime] + 'CancelRequestAnimationFrame'];
        }

        function raf() {
            if (animating) {
                requestAnimationFrame(raf);

                if (jqueryFxAvailable) {
                    jQuery.fx.tick();
                }
            }
        }

        if (requestAnimationFrame) {
            // use rAF
            window.requestAnimationFrame = requestAnimationFrame;
            window.cancelAnimationFrame = cancelAnimationFrame;

            if (jqueryFxAvailable) {
                jQuery.fx.timer = function(timer) {
                    if (timer() && jQuery.timers.push(timer) && !animating) {
                        animating = true;
                        raf();
                    }
                };

                jQuery.fx.stop = function() {
                    animating = false;
                };
            }
        } else {
            // polyfill
            window.requestAnimationFrame = function(callback) {
                var currTime = new Date().getTime(),
                    timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                    id = window.setTimeout(function() {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };

        }

    }($));

    function removeQuotes(string) {
        if (typeof string === 'string' || string instanceof String) {
            string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
        }

        return string;
    }

    function MediaQuery(selector) {
        this.selector = selector;
        this.query = '';
    }

    MediaQuery.prototype.toString = function() {
        return this.query || (this.query = S(this.selector).css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''));
    };

    window.Foundation = {
        name: 'Foundation',

        version: '5.5.3',

        media_queries: {
            'small': new MediaQuery('.foundation-mq-small'),
            'small-only': new MediaQuery('.foundation-mq-small-only'),
            'medium': new MediaQuery('.foundation-mq-medium'),
            'medium-only': new MediaQuery('.foundation-mq-medium-only'),
            'large': new MediaQuery('.foundation-mq-large'),
            'large-only': new MediaQuery('.foundation-mq-large-only'),
            'xlarge': new MediaQuery('.foundation-mq-xlarge'),
            'xlarge-only': new MediaQuery('.foundation-mq-xlarge-only'),
            'xxlarge': new MediaQuery('.foundation-mq-xxlarge')
        },

        stylesheet: $('<style></style>').appendTo('head')[0].sheet,

        global: {
            namespace: undefined
        },

        init: function(scope, libraries, method, options, response) {
            var args = [scope, method, options, response],
                responses = [];

            // check RTL
            this.rtl = /rtl/i.test(S('html').attr('dir'));

            // set foundation global scope
            this.scope = scope || this.scope;

            this.set_namespace();

            if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
                if (this.libs.hasOwnProperty(libraries)) {
                    responses.push(this.init_lib(libraries, args));
                }
            } else {
                for (var lib in this.libs) {
                    responses.push(this.init_lib(lib, libraries));
                }
            }

            S(window).load(function() {
                S(window)
                    .trigger('resize.fndtn.clearing')
                    .trigger('resize.fndtn.dropdown')
                    .trigger('resize.fndtn.equalizer')
                    .trigger('resize.fndtn.interchange')
                    .trigger('resize.fndtn.joyride')
                    .trigger('resize.fndtn.magellan')
                    .trigger('resize.fndtn.topbar')
                    .trigger('resize.fndtn.slider');
            });

            return scope;
        },

        init_lib: function(lib, args) {
            if (this.libs.hasOwnProperty(lib)) {
                this.patch(this.libs[lib]);

                if (args && args.hasOwnProperty(lib)) {
                    if (typeof this.libs[lib].settings !== 'undefined') {
                        $.extend(true, this.libs[lib].settings, args[lib]);
                    } else if (typeof this.libs[lib].defaults !== 'undefined') {
                        $.extend(true, this.libs[lib].defaults, args[lib]);
                    }
                    return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
                }

                args = args instanceof Array ? args : new Array(args);
                return this.libs[lib].init.apply(this.libs[lib], args);
            }

            return function() {};
        },

        patch: function(lib) {
            lib.scope = this.scope;
            lib.namespace = this.global.namespace;
            lib.rtl = this.rtl;
            lib['data_options'] = this.utils.data_options;
            lib['attr_name'] = attr_name;
            lib['add_namespace'] = add_namespace;
            lib['bindings'] = bindings;
            lib['S'] = this.utils.S;
        },

        inherit: function(scope, methods) {
            var methods_arr = methods.split(' '),
                i = methods_arr.length;

            while (i--) {
                if (this.utils.hasOwnProperty(methods_arr[i])) {
                    scope[methods_arr[i]] = this.utils[methods_arr[i]];
                }
            }
        },

        set_namespace: function() {

            // Description:
            //    Don't bother reading the namespace out of the meta tag
            //    if the namespace has been set globally in javascript
            //
            // Example:
            //    Foundation.global.namespace = 'my-namespace';
            // or make it an empty string:
            //    Foundation.global.namespace = '';
            //
            //

            // If the namespace has not been set (is undefined), try to read it out of the meta element.
            // Otherwise use the globally defined namespace, even if it's empty ('')
            var namespace = (this.global.namespace === undefined) ? $('.foundation-data-attribute-namespace').css('font-family') : this.global.namespace;

            // Finally, if the namsepace is either undefined or false, set it to an empty string.
            // Otherwise use the namespace value.
            this.global.namespace = (namespace === undefined || /false/i.test(namespace)) ? '' : namespace;
        },

        libs: {},

        // methods that can be inherited in libraries
        utils: {

            // Description:
            //    Fast Selector wrapper returns jQuery object. Only use where getElementById
            //    is not available.
            //
            // Arguments:
            //    Selector (String): CSS selector describing the element(s) to be
            //    returned as a jQuery object.
            //
            //    Scope (String): CSS selector describing the area to be searched. Default
            //    is document.
            //
            // Returns:
            //    Element (jQuery Object): jQuery object containing elements matching the
            //    selector within the scope.
            S: S,

            // Description:
            //    Executes a function a max of once every n milliseconds
            //
            // Arguments:
            //    Func (Function): Function to be throttled.
            //
            //    Delay (Integer): Function execution threshold in milliseconds.
            //
            // Returns:
            //    Lazy_function (Function): Function with throttling applied.
            throttle: function(func, delay) {
                var timer = null;

                return function() {
                    var context = this,
                        args = arguments;

                    if (timer == null) {
                        timer = setTimeout(function() {
                            func.apply(context, args);
                            timer = null;
                        }, delay);
                    }
                };
            },

            // Description:
            //    Executes a function when it stops being invoked for n seconds
            //    Modified version of _.debounce() http://underscorejs.org
            //
            // Arguments:
            //    Func (Function): Function to be debounced.
            //
            //    Delay (Integer): Function execution threshold in milliseconds.
            //
            //    Immediate (Bool): Whether the function should be called at the beginning
            //    of the delay instead of the end. Default is false.
            //
            // Returns:
            //    Lazy_function (Function): Function with debouncing applied.
            debounce: function(func, delay, immediate) {
                var timeout, result;
                return function() {
                    var context = this,
                        args = arguments;
                    var later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, delay);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },

            // Description:
            //    Parses data-options attribute
            //
            // Arguments:
            //    El (jQuery Object): Element to be parsed.
            //
            // Returns:
            //    Options (Javascript Object): Contents of the element's data-options
            //    attribute.
            data_options: function(el, data_attr_name) {
                data_attr_name = data_attr_name || 'options';
                var opts = {},
                    ii, p, opts_arr,
                    data_options = function(el) {
                        var namespace = Foundation.global.namespace;

                        if (namespace.length > 0) {
                            return el.data(namespace + '-' + data_attr_name);
                        }

                        return el.data(data_attr_name);
                    };

                var cached_options = data_options(el);

                if (typeof cached_options === 'object') {
                    return cached_options;
                }

                opts_arr = (cached_options || ':').split(';');
                ii = opts_arr.length;

                function isNumber(o) {
                    return !isNaN(o - 0) && o !== null && o !== '' && o !== false && o !== true;
                }

                function trim(str) {
                    if (typeof str === 'string') {
                        return $.trim(str);
                    }
                    return str;
                }

                while (ii--) {
                    p = opts_arr[ii].split(':');
                    p = [p[0], p.slice(1).join(':')];

                    if (/true/i.test(p[1])) {
                        p[1] = true;
                    }
                    if (/false/i.test(p[1])) {
                        p[1] = false;
                    }
                    if (isNumber(p[1])) {
                        if (p[1].indexOf('.') === -1) {
                            p[1] = parseInt(p[1], 10);
                        } else {
                            p[1] = parseFloat(p[1]);
                        }
                    }

                    if (p.length === 2 && p[0].length > 0) {
                        opts[trim(p[0])] = trim(p[1]);
                    }
                }

                return opts;
            },

            // Description:
            //    Adds JS-recognizable media queries
            //
            // Arguments:
            //    Media (String): Key string for the media query to be stored as in
            //    Foundation.media_queries
            //
            //    Class (String): Class name for the generated <meta> tag
            register_media: function(media, media_class) {
                if (Foundation.media_queries[media] === undefined) {
                    $('head').append('<meta class="' + media_class + '"/>');
                    Foundation.media_queries[media] = removeQuotes($('.' + media_class).css('font-family'));
                }
            },

            // Description:
            //    Add custom CSS within a JS-defined media query
            //
            // Arguments:
            //    Rule (String): CSS rule to be appended to the document.
            //
            //    Media (String): Optional media query string for the CSS rule to be
            //    nested under.
            add_custom_rule: function(rule, media) {
                if (media === undefined && Foundation.stylesheet) {
                    Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
                } else {
                    var query = Foundation.media_queries[media];

                    if (query !== undefined) {
                        Foundation.stylesheet.insertRule('@media ' +
                            Foundation.media_queries[media] + '{ ' + rule + ' }', Foundation.stylesheet.cssRules.length);
                    }
                }
            },

            // Description:
            //    Performs a callback function when an image is fully loaded
            //
            // Arguments:
            //    Image (jQuery Object): Image(s) to check if loaded.
            //
            //    Callback (Function): Function to execute when image is fully loaded.
            image_loaded: function(images, callback) {
                var self = this,
                    unloaded = images.length;

                function pictures_has_height(images) {
                    var pictures_number = images.length;

                    for (var i = pictures_number - 1; i >= 0; i--) {
                        if (images.attr('height') === undefined) {
                            return false;
                        };
                    };

                    return true;
                }

                if (unloaded === 0 || pictures_has_height(images)) {
                    callback(images);
                }

                images.each(function() {
                    single_image_loaded(self.S(this), function() {
                        unloaded -= 1;
                        if (unloaded === 0) {
                            callback(images);
                        }
                    });
                });
            },

            // Description:
            //    Returns a random, alphanumeric string
            //
            // Arguments:
            //    Length (Integer): Length of string to be generated. Defaults to random
            //    integer.
            //
            // Returns:
            //    Rand (String): Pseudo-random, alphanumeric string.
            random_str: function() {
                if (!this.fidx) {
                    this.fidx = 0;
                }
                this.prefix = this.prefix || [(this.name || 'F'), (+new Date).toString(36)].join('-');

                return this.prefix + (this.fidx++).toString(36);
            },

            // Description:
            //    Helper for window.matchMedia
            //
            // Arguments:
            //    mq (String): Media query
            //
            // Returns:
            //    (Boolean): Whether the media query passes or not
            match: function(mq) {
                return window.matchMedia(mq).matches;
            },

            // Description:
            //    Helpers for checking Foundation default media queries with JS
            //
            // Returns:
            //    (Boolean): Whether the media query passes or not

            is_small_up: function() {
                return this.match(Foundation.media_queries.small);
            },

            is_medium_up: function() {
                return this.match(Foundation.media_queries.medium);
            },

            is_large_up: function() {
                return this.match(Foundation.media_queries.large);
            },

            is_xlarge_up: function() {
                return this.match(Foundation.media_queries.xlarge);
            },

            is_xxlarge_up: function() {
                return this.match(Foundation.media_queries.xxlarge);
            },

            is_small_only: function() {
                return !this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
            },

            is_medium_only: function() {
                return this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
            },

            is_large_only: function() {
                return this.is_medium_up() && this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
            },

            is_xlarge_only: function() {
                return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && !this.is_xxlarge_up();
            },

            is_xxlarge_only: function() {
                return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && this.is_xxlarge_up();
            }
        }
    };

    $.fn.foundation = function() {
        var args = Array.prototype.slice.call(arguments, 0);

        return this.each(function() {
            Foundation.init.apply(Foundation, [this].concat(args));
            return this;
        });
    };

}(jQuery, window, window.document));;
(function($, window, document, undefined) {
    'use strict';

    var openModals = [];

    Foundation.libs.reveal = {
        name: 'reveal',

        version: '5.5.3',

        locked: false,

        settings: {
            animation: 'fadeAndPop',
            animation_speed: 250,
            close_on_background_click: true,
            close_on_esc: true,
            dismiss_modal_class: 'close-reveal-modal',
            multiple_opened: false,
            bg_class: 'reveal-modal-bg',
            root_element: 'body',
            open: function() {},
            opened: function() {},
            close: function() {},
            closed: function() {},
            on_ajax_error: $.noop,
            bg: $('.reveal-modal-bg'),
            css: {
                open: {
                    'opacity': 0,
                    'visibility': 'visible',
                    'display': 'block'
                },
                close: {
                    'opacity': 1,
                    'visibility': 'hidden',
                    'display': 'none'
                }
            }
        },

        init: function(scope, method, options) {
            $.extend(true, this.settings, method, options);
            this.bindings(method, options);
        },

        events: function(scope) {
            var self = this,
                S = self.S;

            S(this.scope)
                .off('.reveal')
                .on('click.fndtn.reveal', '[' + this.add_namespace('data-reveal-id') + ']:not([disabled])', function(e) {
                    e.preventDefault();

                    if (!self.locked) {
                        var element = S(this),
                            ajax = element.data(self.data_attr('reveal-ajax')),
                            replaceContentSel = element.data(self.data_attr('reveal-replace-content'));

                        self.locked = true;

                        if (typeof ajax === 'undefined') {
                            self.open.call(self, element);
                        } else {
                            var url = ajax === true ? element.attr('href') : ajax;
                            self.open.call(self, element, { url: url }, { replaceContentSel: replaceContentSel });
                        }
                    }
                });

            S(document)
                .on('click.fndtn.reveal', this.close_targets(), function(e) {
                    e.preventDefault();
                    if (!self.locked) {
                        var settings = S('[' + self.attr_name() + '].open').data(self.attr_name(true) + '-init') || self.settings,
                            bg_clicked = S(e.target)[0] === S('.' + settings.bg_class)[0];

                        if (bg_clicked) {
                            if (settings.close_on_background_click) {
                                e.stopPropagation();
                            } else {
                                return;
                            }
                        }

                        self.locked = true;
                        self.close.call(self, bg_clicked ? S('[' + self.attr_name() + '].open:not(.toback)') : S(this).closest('[' + self.attr_name() + ']'));
                    }
                });

            if (S('[' + self.attr_name() + ']', this.scope).length > 0) {
                S(this.scope)
                    // .off('.reveal')
                    .on('open.fndtn.reveal', this.settings.open)
                    .on('opened.fndtn.reveal', this.settings.opened)
                    .on('opened.fndtn.reveal', this.open_video)
                    .on('close.fndtn.reveal', this.settings.close)
                    .on('closed.fndtn.reveal', this.settings.closed)
                    .on('closed.fndtn.reveal', this.close_video);
            } else {
                S(this.scope)
                    // .off('.reveal')
                    .on('open.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.open)
                    .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.opened)
                    .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.open_video)
                    .on('close.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.close)
                    .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.closed)
                    .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.close_video);
            }

            return true;
        },

        // PATCH #3: turning on key up capture only when a reveal window is open
        key_up_on: function(scope) {
            var self = this;

            // PATCH #1: fixing multiple keyup event trigger from single key press
            self.S('body').off('keyup.fndtn.reveal').on('keyup.fndtn.reveal', function(event) {
                var open_modal = self.S('[' + self.attr_name() + '].open'),
                    settings = open_modal.data(self.attr_name(true) + '-init') || self.settings;
                // PATCH #2: making sure that the close event can be called only while unlocked,
                //           so that multiple keyup.fndtn.reveal events don't prevent clean closing of the reveal window.
                if (settings && event.which === 27 && settings.close_on_esc && !self.locked) { // 27 is the keycode for the Escape key
                    self.close.call(self, open_modal);
                }
            });

            return true;
        },

        // PATCH #3: turning on key up capture only when a reveal window is open
        key_up_off: function(scope) {
            this.S('body').off('keyup.fndtn.reveal');
            return true;
        },

        open: function(target, ajax_settings) {
            var self = this,
                modal;

            if (target) {
                if (typeof target.selector !== 'undefined') {
                    // Find the named node; only use the first one found, since the rest of the code assumes there's only one node
                    modal = self.S('#' + target.data(self.data_attr('reveal-id'))).first();
                } else {
                    modal = self.S(this.scope);

                    ajax_settings = target;
                }
            } else {
                modal = self.S(this.scope);
            }

            var settings = modal.data(self.attr_name(true) + '-init');
            settings = settings || this.settings;


            if (modal.hasClass('open') && target !== undefined && target.attr('data-reveal-id') == modal.attr('id')) {
                return self.close(modal);
            }

            if (!modal.hasClass('open')) {
                var open_modal = self.S('[' + self.attr_name() + '].open');

                if (typeof modal.data('css-top') === 'undefined') {
                    modal.data('css-top', parseInt(modal.css('top'), 10))
                        .data('offset', this.cache_offset(modal));
                }

                modal.attr('tabindex', '0').attr('aria-hidden', 'false');

                this.key_up_on(modal); // PATCH #3: turning on key up capture only when a reveal window is open

                // Prevent namespace event from triggering twice
                modal.on('open.fndtn.reveal', function(e) {
                    if (e.namespace !== 'fndtn.reveal') return;
                });

                modal.on('open.fndtn.reveal').trigger('open.fndtn.reveal');

                if (open_modal.length < 1) {
                    this.toggle_bg(modal, true);
                }

                if (typeof ajax_settings === 'string') {
                    ajax_settings = {
                        url: ajax_settings
                    };
                }

                var openModal = function() {
                    if (open_modal.length > 0) {
                        if (settings.multiple_opened) {
                            self.to_back(open_modal);
                        } else {
                            self.hide(open_modal, settings.css.close);
                        }
                    }

                    // bl: add the open_modal that isn't already in the background to the openModals array
                    if (settings.multiple_opened) {
                        openModals.push(modal);
                    }

                    self.show(modal, settings.css.open);
                };

                if (typeof ajax_settings === 'undefined' || !ajax_settings.url) {
                    openModal();
                } else {
                    var old_success = typeof ajax_settings.success !== 'undefined' ? ajax_settings.success : null;
                    $.extend(ajax_settings, {
                        success: function(data, textStatus, jqXHR) {
                            if ($.isFunction(old_success)) {
                                var result = old_success(data, textStatus, jqXHR);
                                if (typeof result == 'string') {
                                    data = result;
                                }
                            }

                            if (typeof options !== 'undefined' && typeof options.replaceContentSel !== 'undefined') {
                                modal.find(options.replaceContentSel).html(data);
                            } else {
                                modal.html(data);
                            }

                            self.S(modal).foundation('section', 'reflow');
                            self.S(modal).children().foundation();

                            openModal();
                        }
                    });

                    // check for if user initalized with error callback
                    if (settings.on_ajax_error !== $.noop) {
                        $.extend(ajax_settings, {
                            error: settings.on_ajax_error
                        });
                    }

                    $.ajax(ajax_settings);
                }
            }
            self.S(window).trigger('resize');
        },

        close: function(modal) {
            var modal = modal && modal.length ? modal : this.S(this.scope),
                open_modals = this.S('[' + this.attr_name() + '].open'),
                settings = modal.data(this.attr_name(true) + '-init') || this.settings,
                self = this;

            if (open_modals.length > 0) {

                modal.removeAttr('tabindex', '0').attr('aria-hidden', 'true');

                this.locked = true;
                this.key_up_off(modal); // PATCH #3: turning on key up capture only when a reveal window is open

                modal.trigger('close.fndtn.reveal');

                if ((settings.multiple_opened && open_modals.length === 1) || !settings.multiple_opened || modal.length > 1) {
                    self.toggle_bg(modal, false);
                    self.to_front(modal);
                }

                if (settings.multiple_opened) {
                    var isCurrent = modal.is(':not(.toback)');
                    self.hide(modal, settings.css.close, settings);
                    if (isCurrent) {
                        // remove the last modal since it is now closed
                        openModals.pop();
                    } else {
                        // if this isn't the current modal, then find it in the array and remove it
                        openModals = $.grep(openModals, function(elt) {
                            var isThis = elt[0] === modal[0];
                            if (isThis) {
                                // since it's not currently in the front, put it in the front now that it is hidden
                                // so that if it's re-opened, it won't be .toback
                                self.to_front(modal);
                            }
                            return !isThis;
                        });
                    }
                    // finally, show the next modal in the stack, if there is one
                    if (openModals.length > 0) {
                        self.to_front(openModals[openModals.length - 1]);
                    }
                } else {
                    self.hide(open_modals, settings.css.close, settings);
                }
            }
        },

        close_targets: function() {
            var base = '.' + this.settings.dismiss_modal_class;

            if (this.settings.close_on_background_click) {
                return base + ', .' + this.settings.bg_class;
            }

            return base;
        },

        toggle_bg: function(modal, state) {
            if (this.S('.' + this.settings.bg_class).length === 0) {
                this.settings.bg = $('<div />', { 'class': this.settings.bg_class })
                    .appendTo('body').hide();
            }

            var visible = this.settings.bg.filter(':visible').length > 0;
            if (state != visible) {
                if (state == undefined ? visible : !state) {
                    this.hide(this.settings.bg);
                } else {
                    this.show(this.settings.bg);
                }
            }
        },

        show: function(el, css) {
            // is modal
            if (css) {
                var settings = el.data(this.attr_name(true) + '-init') || this.settings,
                    root_element = settings.root_element,
                    context = this;

                if (el.parent(root_element).length === 0) {
                    var placeholder = el.wrap('<div style="display: none;" />').parent();

                    el.on('closed.fndtn.reveal.wrapped', function() {
                        el.detach().appendTo(placeholder);
                        el.unwrap().unbind('closed.fndtn.reveal.wrapped');
                    });

                    el.detach().appendTo(root_element);
                }

                var animData = getAnimationData(settings.animation);
                if (!animData.animate) {
                    this.locked = false;
                }
                if (animData.pop) {
                    css.top = $(window).scrollTop() - el.data('offset') + 'px';
                    var end_css = {
                        top: $(window).scrollTop() + el.data('css-top') + 'px',
                        opacity: 1
                    };

                    return setTimeout(function() {
                        return el
                            .css(css)
                            .animate(end_css, settings.animation_speed, 'linear', function() {
                                context.locked = false;
                                el.trigger('opened.fndtn.reveal');
                            })
                            .addClass('open');
                    }, settings.animation_speed / 2);
                }

                css.top = $(window).scrollTop() + el.data('css-top') + 'px';

                if (animData.fade) {
                    var end_css = { opacity: 1 };

                    return setTimeout(function() {
                        return el
                            .css(css)
                            .animate(end_css, settings.animation_speed, 'linear', function() {
                                context.locked = false;
                                el.trigger('opened.fndtn.reveal');
                            })
                            .addClass('open');
                    }, settings.animation_speed / 2);
                }

                return el.css(css).show().css({ opacity: 1 }).addClass('open').trigger('opened.fndtn.reveal');
            }

            var settings = this.settings;

            // should we animate the background?
            if (getAnimationData(settings.animation).fade) {
                return el.fadeIn(settings.animation_speed / 2);
            }

            this.locked = false;

            return el.show();
        },

        to_back: function(el) {
            el.addClass('toback');
        },

        to_front: function(el) {
            el.removeClass('toback');
        },

        hide: function(el, css) {
            // is modal
            if (css) {
                var settings = el.data(this.attr_name(true) + '-init'),
                    context = this;
                settings = settings || this.settings;

                var animData = getAnimationData(settings.animation);
                if (!animData.animate) {
                    this.locked = false;
                }
                if (animData.pop) {
                    var end_css = {
                        top: -$(window).scrollTop() - el.data('offset') + 'px',
                        opacity: 0
                    };

                    return setTimeout(function() {
                        return el
                            .animate(end_css, settings.animation_speed, 'linear', function() {
                                context.locked = false;
                                el.css(css).trigger('closed.fndtn.reveal');
                            })
                            .removeClass('open');
                    }, settings.animation_speed / 2);
                }

                if (animData.fade) {
                    var end_css = { opacity: 0 };

                    return setTimeout(function() {
                        return el
                            .animate(end_css, settings.animation_speed, 'linear', function() {
                                context.locked = false;
                                el.css(css).trigger('closed.fndtn.reveal');
                            })
                            .removeClass('open');
                    }, settings.animation_speed / 2);
                }

                return el.hide().css(css).removeClass('open').trigger('closed.fndtn.reveal');
            }

            var settings = this.settings;

            // should we animate the background?
            if (getAnimationData(settings.animation).fade) {
                return el.fadeOut(settings.animation_speed / 2);
            }

            return el.hide();
        },

        close_video: function(e) {
            var video = $('.flex-video', e.target),
                iframe = $('iframe', video);

            if (iframe.length > 0) {
                iframe.attr('data-src', iframe[0].src);
                iframe.attr('src', iframe.attr('src'));
                video.hide();
            }
        },

        open_video: function(e) {
            var video = $('.flex-video', e.target),
                iframe = video.find('iframe');

            if (iframe.length > 0) {
                var data_src = iframe.attr('data-src');
                if (typeof data_src === 'string') {
                    iframe[0].src = iframe.attr('data-src');
                } else {
                    var src = iframe[0].src;
                    iframe[0].src = undefined;
                    iframe[0].src = src;
                }
                video.show();
            }
        },

        data_attr: function(str) {
            if (this.namespace.length > 0) {
                return this.namespace + '-' + str;
            }

            return str;
        },

        cache_offset: function(modal) {
            var offset = modal.show().height() + parseInt(modal.css('top'), 10) + modal.scrollY;

            modal.hide();

            return offset;
        },

        off: function() {
            $(this.scope).off('.fndtn.reveal');
        },

        reflow: function() {}
    };

    /*
     * getAnimationData('popAndFade') // {animate: true,  pop: true,  fade: true}
     * getAnimationData('fade')       // {animate: true,  pop: false, fade: true}
     * getAnimationData('pop')        // {animate: true,  pop: true,  fade: false}
     * getAnimationData('foo')        // {animate: false, pop: false, fade: false}
     * getAnimationData(null)         // {animate: false, pop: false, fade: false}
     */
    function getAnimationData(str) {
        var fade = /fade/i.test(str);
        var pop = /pop/i.test(str);
        return {
            animate: fade || pop,
            pop: pop,
            fade: fade
        };
    }
}(jQuery, window, window.document));;
(function($, window, document, undefined) {
    'use strict';

    Foundation.libs.dropdown = {
        name: 'dropdown',

        version: '5.5.3',

        settings: {
            active_class: 'open',
            disabled_class: 'disabled',
            mega_class: 'mega',
            align: 'bottom',
            is_hover: false,
            hover_timeout: 150,
            opened: function() {},
            closed: function() {}
        },

        init: function(scope, method, options) {
            Foundation.inherit(this, 'throttle');

            $.extend(true, this.settings, method, options);
            this.bindings(method, options);
        },

        events: function(scope) {
            var self = this,
                S = self.S;

            S(this.scope)
                .off('.dropdown')
                .on('click.fndtn.dropdown', '[' + this.attr_name() + ']', function(e) {
                    var settings = S(this).data(self.attr_name(true) + '-init') || self.settings;
                    if (!settings.is_hover || Modernizr.touch) {
                        e.preventDefault();
                        if (S(this).parent('[data-reveal-id]').length) {
                            e.stopPropagation();
                        }
                        self.toggle($(this));
                    }
                })
                .on('mouseenter.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function(e) {
                    var $this = S(this),
                        dropdown,
                        target;

                    clearTimeout(self.timeout);

                    if ($this.data(self.data_attr())) {
                        dropdown = S('#' + $this.data(self.data_attr()));
                        target = $this;
                    } else {
                        dropdown = $this;
                        target = S('[' + self.attr_name() + '="' + dropdown.attr('id') + '"]');
                    }

                    var settings = target.data(self.attr_name(true) + '-init') || self.settings;

                    if (S(e.currentTarget).data(self.data_attr()) && settings.is_hover) {
                        self.closeall.call(self);
                    }

                    if (settings.is_hover) {
                        self.open.apply(self, [dropdown, target]);
                    }
                })
                .on('mouseleave.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function(e) {
                    var $this = S(this);
                    var settings;

                    if ($this.data(self.data_attr())) {
                        settings = $this.data(self.data_attr(true) + '-init') || self.settings;
                    } else {
                        var target = S('[' + self.attr_name() + '="' + S(this).attr('id') + '"]'),
                            settings = target.data(self.attr_name(true) + '-init') || self.settings;
                    }

                    self.timeout = setTimeout(function() {
                        if ($this.data(self.data_attr())) {
                            if (settings.is_hover) {
                                self.close.call(self, S('#' + $this.data(self.data_attr())));
                            }
                        } else {
                            if (settings.is_hover) {
                                self.close.call(self, $this);
                            }
                        }
                    }.bind(this), settings.hover_timeout);
                })
                .on('click.fndtn.dropdown', function(e) {
                    var parent = S(e.target).closest('[' + self.attr_name() + '-content]');
                    var links = parent.find('a');

                    if (links.length > 0 && parent.attr('aria-autoclose') !== 'false') {
                        self.close.call(self, S('[' + self.attr_name() + '-content]'));
                    }

                    if (e.target !== document && !$.contains(document.documentElement, e.target)) {
                        return;
                    }

                    if (S(e.target).closest('[' + self.attr_name() + ']').length > 0) {
                        return;
                    }

                    if (!(S(e.target).data('revealId')) &&
                        (parent.length > 0 && (S(e.target).is('[' + self.attr_name() + '-content]') ||
                            $.contains(parent.first()[0], e.target)))) {
                        e.stopPropagation();
                        return;
                    }

                    self.close.call(self, S('[' + self.attr_name() + '-content]'));
                })
                .on('opened.fndtn.dropdown', '[' + self.attr_name() + '-content]', function() {
                    self.settings.opened.call(this);
                })
                .on('closed.fndtn.dropdown', '[' + self.attr_name() + '-content]', function() {
                    self.settings.closed.call(this);
                });

            S(window)
                .off('.dropdown')
                .on('resize.fndtn.dropdown', self.throttle(function() {
                    self.resize.call(self);
                }, 50));

            this.resize();
        },

        close: function(dropdown) {
            var self = this;
            dropdown.each(function(idx) {
                var original_target = $('[' + self.attr_name() + '=' + dropdown[idx].id + ']') || $('aria-controls=' + dropdown[idx].id + ']');
                original_target.attr('aria-expanded', 'false');
                if (self.S(this).hasClass(self.settings.active_class)) {
                    self.S(this)
                        .css(Foundation.rtl ? 'right' : 'left', '-99999px')
                        .attr('aria-hidden', 'true')
                        .removeClass(self.settings.active_class)
                        .prev('[' + self.attr_name() + ']')
                        .removeClass(self.settings.active_class)
                        .removeData('target');

                    self.S(this).trigger('closed.fndtn.dropdown', [dropdown]);
                }
            });
            dropdown.removeClass('f-open-' + this.attr_name(true));
        },

        closeall: function() {
            var self = this;
            $.each(self.S('.f-open-' + this.attr_name(true)), function() {
                self.close.call(self, self.S(this));
            });
        },

        open: function(dropdown, target) {
            this
                .css(dropdown
                    .addClass(this.settings.active_class), target);
            dropdown.prev('[' + this.attr_name() + ']').addClass(this.settings.active_class);
            dropdown.data('target', target.get(0)).trigger('opened.fndtn.dropdown', [dropdown, target]);
            dropdown.attr('aria-hidden', 'false');
            target.attr('aria-expanded', 'true');
            dropdown.focus();
            dropdown.addClass('f-open-' + this.attr_name(true));
        },

        data_attr: function() {
            if (this.namespace.length > 0) {
                return this.namespace + '-' + this.name;
            }

            return this.name;
        },

        toggle: function(target) {
            if (target.hasClass(this.settings.disabled_class)) {
                return;
            }
            var dropdown = this.S('#' + target.data(this.data_attr()));
            if (dropdown.length === 0) {
                // No dropdown found, not continuing
                return;
            }

            this.close.call(this, this.S('[' + this.attr_name() + '-content]').not(dropdown));

            if (dropdown.hasClass(this.settings.active_class)) {
                this.close.call(this, dropdown);
                if (dropdown.data('target') !== target.get(0)) {
                    this.open.call(this, dropdown, target);
                }
            } else {
                this.open.call(this, dropdown, target);
            }
        },

        resize: function() {
            var dropdown = this.S('[' + this.attr_name() + '-content].open');
            var target = $(dropdown.data("target"));

            if (dropdown.length && target.length) {
                this.css(dropdown, target);
            }
        },

        css: function(dropdown, target) {
            var left_offset = Math.max((target.width() - dropdown.width()) / 2, 8),
                settings = target.data(this.attr_name(true) + '-init') || this.settings,
                parentOverflow = dropdown.parent().css('overflow-y') || dropdown.parent().css('overflow');

            this.clear_idx();



            if (this.small()) {
                var p = this.dirs.bottom.call(dropdown, target, settings);

                dropdown.attr('style', '').removeClass('drop-left drop-right drop-top').css({
                    position: 'absolute',
                    width: '95%',
                    'max-width': 'none',
                    top: p.top
                });

                dropdown.css(Foundation.rtl ? 'right' : 'left', left_offset);
            }
            // detect if dropdown is in an overflow container
            else if (parentOverflow !== 'visible') {
                var offset = target[0].offsetTop + target[0].offsetHeight;

                dropdown.attr('style', '').css({
                    position: 'absolute',
                    top: offset
                });

                dropdown.css(Foundation.rtl ? 'right' : 'left', left_offset);
            } else {

                this.style(dropdown, target, settings);
            }

            return dropdown;
        },

        style: function(dropdown, target, settings) {
            var css = $.extend({ position: 'absolute' },
                this.dirs[settings.align].call(dropdown, target, settings));

            dropdown.attr('style', '').css(css);
        },

        // return CSS property object
        // `this` is the dropdown
        dirs: {
            // Calculate target offset
            _base: function(t, s) {
                var o_p = this.offsetParent(),
                    o = o_p.offset(),
                    p = t.offset();

                p.top -= o.top;
                p.left -= o.left;

                //set some flags on the p object to pass along
                p.missRight = false;
                p.missTop = false;
                p.missLeft = false;
                p.leftRightFlag = false;

                //lets see if the panel will be off the screen
                //get the actual width of the page and store it
                var actualBodyWidth;
                var windowWidth = window.innerWidth;

                if (document.getElementsByClassName('row')[0]) {
                    actualBodyWidth = document.getElementsByClassName('row')[0].clientWidth;
                } else {
                    actualBodyWidth = windowWidth;
                }

                var actualMarginWidth = (windowWidth - actualBodyWidth) / 2;
                var actualBoundary = actualBodyWidth;

                if (!this.hasClass('mega') && !s.ignore_repositioning) {
                    var outerWidth = this.outerWidth();
                    var o_left = t.offset().left;

                    //miss top
                    if (t.offset().top <= this.outerHeight()) {
                        p.missTop = true;
                        actualBoundary = windowWidth - actualMarginWidth;
                        p.leftRightFlag = true;
                    }

                    //miss right
                    if (o_left + outerWidth > o_left + actualMarginWidth && o_left - actualMarginWidth > outerWidth) {
                        p.missRight = true;
                        p.missLeft = false;
                    }

                    //miss left
                    if (o_left - outerWidth <= 0) {
                        p.missLeft = true;
                        p.missRight = false;
                    }
                }

                return p;
            },

            top: function(t, s) {
                var self = Foundation.libs.dropdown,
                    p = self.dirs._base.call(this, t, s);

                this.addClass('drop-top');

                if (p.missTop == true) {
                    p.top = p.top + t.outerHeight() + this.outerHeight();
                    this.removeClass('drop-top');
                }

                if (p.missRight == true) {
                    p.left = p.left - this.outerWidth() + t.outerWidth();
                }

                if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
                    self.adjust_pip(this, t, s, p);
                }

                if (Foundation.rtl) {
                    return {
                        left: p.left - this.outerWidth() + t.outerWidth(),
                        top: p.top - this.outerHeight()
                    };
                }

                return { left: p.left, top: p.top - this.outerHeight() };
            },

            bottom: function(t, s) {
                var self = Foundation.libs.dropdown,
                    p = self.dirs._base.call(this, t, s);

                if (p.missRight == true) {
                    p.left = p.left - this.outerWidth() + t.outerWidth();
                }

                if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
                    self.adjust_pip(this, t, s, p);
                }

                if (self.rtl) {
                    return { left: p.left - this.outerWidth() + t.outerWidth(), top: p.top + t.outerHeight() };
                }

                return { left: p.left, top: p.top + t.outerHeight() };
            },

            left: function(t, s) {
                var p = Foundation.libs.dropdown.dirs._base.call(this, t, s);

                this.addClass('drop-left');

                if (p.missLeft == true) {
                    p.left = p.left + this.outerWidth();
                    p.top = p.top + t.outerHeight();
                    this.removeClass('drop-left');
                }

                return { left: p.left - this.outerWidth(), top: p.top };
            },

            right: function(t, s) {
                var p = Foundation.libs.dropdown.dirs._base.call(this, t, s);

                this.addClass('drop-right');

                if (p.missRight == true) {
                    p.left = p.left - this.outerWidth();
                    p.top = p.top + t.outerHeight();
                    this.removeClass('drop-right');
                } else {
                    p.triggeredRight = true;
                }

                var self = Foundation.libs.dropdown;

                if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
                    self.adjust_pip(this, t, s, p);
                }

                return { left: p.left + t.outerWidth(), top: p.top };
            }
        },

        // Insert rule to style psuedo elements
        adjust_pip: function(dropdown, target, settings, position) {
            var sheet = Foundation.stylesheet,
                pip_offset_base = 8;

            if (dropdown.hasClass(settings.mega_class)) {
                pip_offset_base = position.left + (target.outerWidth() / 2) - 8;
            } else if (this.small()) {
                pip_offset_base += position.left - 8;
            }

            this.rule_idx = sheet.cssRules.length;

            //default
            var sel_before = '.f-dropdown.open:before',
                sel_after = '.f-dropdown.open:after',
                css_before = 'left: ' + pip_offset_base + 'px;',
                css_after = 'left: ' + (pip_offset_base - 1) + 'px;';

            if (position.missRight == true) {
                pip_offset_base = dropdown.outerWidth() - 23;
                sel_before = '.f-dropdown.open:before',
                    sel_after = '.f-dropdown.open:after',
                    css_before = 'left: ' + pip_offset_base + 'px;',
                    css_after = 'left: ' + (pip_offset_base - 1) + 'px;';
            }

            //just a case where right is fired, but its not missing right
            if (position.triggeredRight == true) {
                sel_before = '.f-dropdown.open:before',
                    sel_after = '.f-dropdown.open:after',
                    css_before = 'left:-12px;',
                    css_after = 'left:-14px;';
            }

            if (sheet.insertRule) {
                sheet.insertRule([sel_before, '{', css_before, '}'].join(' '), this.rule_idx);
                sheet.insertRule([sel_after, '{', css_after, '}'].join(' '), this.rule_idx + 1);
            } else {
                sheet.addRule(sel_before, css_before, this.rule_idx);
                sheet.addRule(sel_after, css_after, this.rule_idx + 1);
            }
        },

        // Remove old dropdown rule index
        clear_idx: function() {
            var sheet = Foundation.stylesheet;

            if (typeof this.rule_idx !== 'undefined') {
                sheet.deleteRule(this.rule_idx);
                sheet.deleteRule(this.rule_idx);
                delete this.rule_idx;
            }
        },

        small: function() {
            return matchMedia(Foundation.media_queries.small).matches &&
                !matchMedia(Foundation.media_queries.medium).matches;
        },

        off: function() {
            this.S(this.scope).off('.fndtn.dropdown');
            this.S('html, body').off('.fndtn.dropdown');
            this.S(window).off('.fndtn.dropdown');
            this.S('[data-dropdown-content]').off('.fndtn.dropdown');
        },

        reflow: function() {}
    };
}(jQuery, window, window.document));;
(function($, window, document, undefined) {
    'use strict';

    Foundation.libs.tab = {
        name: 'tab',

        version: '5.5.3',

        settings: {
            active_class: 'active',
            callback: function() {},
            deep_linking: false,
            scroll_to_content: true,
            is_hover: false
        },

        default_tab_hashes: [],

        init: function(scope, method, options) {
            var self = this,
                S = this.S;

            // Store the default active tabs which will be referenced when the
            // location hash is absent, as in the case of navigating the tabs and
            // returning to the first viewing via the browser Back button.
            S('[' + this.attr_name() + '] > .active > a', this.scope).each(function() {
                self.default_tab_hashes.push(this.hash);
            });

            this.bindings(method, options);
            this.handle_location_hash_change();
        },

        events: function() {
            var self = this,
                S = this.S;

            var usual_tab_behavior = function(e, target) {
                var settings = S(target).closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');
                if (!settings.is_hover || Modernizr.touch) {
                    // if user did not pressed tab key, prevent default action
                    var keyCode = e.keyCode || e.which;
                    if (keyCode !== 9) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    self.toggle_active_tab(S(target).parent());

                }
            };

            S(this.scope)
                .off('.tab')
                // Key event: focus/tab key
                .on('keydown.fndtn.tab', '[' + this.attr_name() + '] > * > a', function(e) {
                    var keyCode = e.keyCode || e.which;
                    // if user pressed tab key
                    if (keyCode === 13 || keyCode === 32) { // enter or space
                        var el = this;
                        usual_tab_behavior(e, el);
                    }
                })
                // Click event: tab title
                .on('click.fndtn.tab', '[' + this.attr_name() + '] > * > a', function(e) {
                    var el = this;
                    usual_tab_behavior(e, el);
                })
                // Hover event: tab title
                .on('mouseenter.fndtn.tab', '[' + this.attr_name() + '] > * > a', function(e) {
                    var settings = S(this).closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');
                    if (settings.is_hover) {
                        self.toggle_active_tab(S(this).parent());
                    }
                });

            // Location hash change event
            S(window).on('hashchange.fndtn.tab', function(e) {
                e.preventDefault();
                self.handle_location_hash_change();
            });
        },

        handle_location_hash_change: function() {

            var self = this,
                S = this.S;

            S('[' + this.attr_name() + ']', this.scope).each(function() {
                var settings = S(this).data(self.attr_name(true) + '-init');
                if (settings.deep_linking) {
                    // Match the location hash to a label
                    var hash;
                    if (settings.scroll_to_content) {
                        hash = self.scope.location.hash;
                    } else {
                        // prefix the hash to prevent anchor scrolling
                        hash = self.scope.location.hash.replace('fndtn-', '');
                    }
                    if (hash != '') {
                        // Check whether the location hash references a tab content div or
                        // another element on the page (inside or outside the tab content div)
                        var hash_element = S(hash);
                        if (hash_element.hasClass('content') && hash_element.parent().hasClass('tabs-content')) {
                            // Tab content div
                            self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href=' + hash + ']').parent());
                        } else {
                            // Not the tab content div. If inside the tab content, find the
                            // containing tab and toggle it as active.
                            var hash_tab_container_id = hash_element.closest('.content').attr('id');
                            if (hash_tab_container_id != undefined) {
                                self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href=#' + hash_tab_container_id + ']').parent(), hash);
                            }
                        }
                    } else {
                        // Reference the default tab hashes which were initialized in the init function
                        for (var ind = 0; ind < self.default_tab_hashes.length; ind++) {
                            self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href=' + self.default_tab_hashes[ind] + ']').parent());
                        }
                    }
                }
            });
        },

        toggle_active_tab: function(tab, location_hash) {
            var self = this,
                S = self.S,
                tabs = tab.closest('[' + this.attr_name() + ']'),
                tab_link = tab.find('a'),
                anchor = tab.children('a').first(),
                target_hash = '#' + anchor.attr('href').split('#')[1],
                target = S(target_hash),
                siblings = tab.siblings(),
                settings = tabs.data(this.attr_name(true) + '-init'),
                interpret_keyup_action = function(e) {
                    // Light modification of Heydon Pickering's Practical ARIA Examples: http://heydonworks.com/practical_aria_examples/js/a11y.js

                    // define current, previous and next (possible) tabs

                    var $original = $(this);
                    var $prev = $(this).parents('li').prev().children('[role="tab"]');
                    var $next = $(this).parents('li').next().children('[role="tab"]');
                    var $target;

                    // find the direction (prev or next)

                    switch (e.keyCode) {
                        case 37:
                            $target = $prev;
                            break;
                        case 39:
                            $target = $next;
                            break;
                        default:
                            $target = false
                            break;
                    }

                    if ($target.length) {
                        $original.attr({
                            'tabindex': '-1',
                            'aria-selected': null
                        });
                        $target.attr({
                            'tabindex': '0',
                            'aria-selected': true
                        }).focus();
                    }

                    // Hide panels

                    $('[role="tabpanel"]')
                        .attr('aria-hidden', 'true');

                    // Show panel which corresponds to target

                    $('#' + $(document.activeElement).attr('href').substring(1))
                        .attr('aria-hidden', null);

                },
                go_to_hash = function(hash) {
                    // This function allows correct behaviour of the browser's back button when deep linking is enabled. Without it
                    // the user would get continually redirected to the default hash.
                    var default_hash = settings.scroll_to_content ? self.default_tab_hashes[0] : 'fndtn-' + self.default_tab_hashes[0].replace('#', '');

                    if (hash !== default_hash || window.location.hash) {
                        window.location.hash = hash;
                    }
                };

            // allow usage of data-tab-content attribute instead of href
            if (anchor.data('tab-content')) {
                target_hash = '#' + anchor.data('tab-content').split('#')[1];
                target = S(target_hash);
            }

            if (settings.deep_linking) {

                if (settings.scroll_to_content) {

                    // retain current hash to scroll to content
                    go_to_hash(location_hash || target_hash);

                    if (location_hash == undefined || location_hash == target_hash) {
                        tab.parent()[0].scrollIntoView();
                    } else {
                        S(target_hash)[0].scrollIntoView();
                    }
                } else {
                    // prefix the hashes so that the browser doesn't scroll down
                    if (location_hash != undefined) {
                        go_to_hash('fndtn-' + location_hash.replace('#', ''));
                    } else {
                        go_to_hash('fndtn-' + target_hash.replace('#', ''));
                    }
                }
            }

            // WARNING: The activation and deactivation of the tab content must
            // occur after the deep linking in order to properly refresh the browser
            // window (notably in Chrome).
            // Clean up multiple attr instances to done once
            tab.addClass(settings.active_class).triggerHandler('opened');
            tab_link.attr({ 'aria-selected': 'true', tabindex: 0 });
            siblings.removeClass(settings.active_class)
            siblings.find('a').attr({ 'aria-selected': 'false' /*,  tabindex : -1*/ });
            target.siblings().removeClass(settings.active_class).attr({ 'aria-hidden': 'true' /*,  tabindex : -1*/ });
            target.addClass(settings.active_class).attr('aria-hidden', 'false').removeAttr('tabindex');
            settings.callback(tab);
            target.triggerHandler('toggled', [target]);
            tabs.triggerHandler('toggled', [tab]);

            tab_link.off('keydown').on('keydown', interpret_keyup_action);
        },

        data_attr: function(str) {
            if (this.namespace.length > 0) {
                return this.namespace + '-' + str;
            }

            return str;
        },

        off: function() {},

        reflow: function() {}
    };
}(jQuery, window, window.document));
(function() {
    $(".relative_time").each(function() {
        var date, el;
        el = $(this);
        date = Date.create(el.attr('data-time'));
        return el.text(date.relative());
    });

    $(document).ready(function() {
        return $("#new_comment").on("ajax:success", function(e, data, status, xhr) {
            $("#discussion_replies").append(xhr.responseText);
            $("#discussion_replies .comment_wrapper:last-child .comment_body").css("outline-color", "#FFF3A5");
            $("#discussion_replies .comment_wrapper:last-child .relative_time").text('Just now');
            return $("#comment_text").val('');
        }).on("ajax:error", function(e, xhr, status, error) {
            return $("#new_comment_error").html("<p>" + xhr.responseText + "</p>");
        });
    });

}).call(this);
(function() {
    var Concept, ConceptAdmin;

    Concept = (function() {
        function Concept() {
            this.init_audio_links();
        }

        Concept.prototype.init_audio_links = function() {
            return $(document).on('click', '.concept_audio', function(e) {
                var el, id;
                e.preventDefault();
                id = $(this).attr('data-id');
                el = document.getElementById(id);
                if (el) {
                    return el.play();
                }
            });
        };

        return Concept;

    })();

    ConceptAdmin = (function() {
        function ConceptAdmin() {
            this.init_show_link();
        }

        ConceptAdmin.prototype.init_show_link = function() {
            return $(document).on('click', '.show_concept_admin', function(e) {
                var id;
                e.preventDefault();
                id = $(this).attr('data-id') + '_admin';
                return $('#' + id).toggle();
            });
        };

        return ConceptAdmin;

    })();

    $(document).ready(function() {
        new Concept;
        return new ConceptAdmin;
    });

}).call(this);
(function() {
    this.Filters = (function() {
        function Filters() {
            this.type_reg = /#(word|kanji|sentence)s?/g;
            this.pos_reg = /#(noun|verb|adjective|adverb|particle|counter)\b/g;
            this.level_reg = /#(common|jlpt-n1|jlpt-n2|jlpt-n3|jlpt-n4|jlpt-n5)\b/g;
            this.set_filters();
            this.set_links();
        }

        Filters.prototype.set_filters = function() {
            var has_level, has_pos, has_type, level, match, pos, query;
            $('.filter').removeClass('active');
            query = $('.keyword').val();
            has_type = false;
            while ((match = this.type_reg.exec(query)) !== null) {
                has_type = true;
                this.set_dropdown_text(match[1]);
                switch (match[1]) {
                    case "word":
                    case "words":
                        $('.filter[data-filter=words]').addClass('active');
                        break;
                    case "sentence":
                    case "sentences":
                        $('.filter[data-filter=sentences]').addClass('active');
                        break;
                    case "kanji":
                        $('.filter[data-filter=kanji]').addClass('active');
                }
            }
            has_pos = false;
            while ((match = this.pos_reg.exec(query)) !== null) {
                has_pos = true;
                pos = match[1];
                $(".filter[data-filter=" + pos + "]").addClass('active');
            }
            has_level = false;
            while ((match = this.level_reg.exec(query)) !== null) {
                has_level = true;
                level = match[1];
                $(".filter[data-filter=" + level + "]").addClass('active');
            }
            if (!has_type) {
                $('.filter[data-filter=type-all]').addClass('active');
            }
            if (!has_pos) {
                $('.filter[data-filter=pos-all]').addClass('active');
            }
            if (!has_level) {
                return $('.filter[data-filter=level-all]').addClass('active');
            }
        };

        Filters.prototype.set_dropdown_text = function(type) {
            switch (type) {
                case "word":
                case "words":
                    return $('#search_dropdown_text').text('Words');
                case "sentence":
                case "sentences":
                    return $('#search_dropdown_text').text('Sentences');
                case "kanji":
                    return $('#search_dropdown_text').text('Kanji');
                case "name":
                case "names":
                    return $('#search_dropdown_text').text('Names');
                default:
                    return $('#search_dropdown_text').text('All');
            }
        };

        Filters.prototype.set_links = function() {
            return $('.filter').bind('click', (function(_this) {
                return function(e) {
                    var el, group, query, tag, this_is_active;
                    el = $(e.target);
                    e.preventDefault();
                    query = $('.keyword').val();
                    tag = el.attr('data-filter');
                    group = el.parents('ul').attr('data-filter-group');
                    this_is_active = el.hasClass('active');
                    $("ul[data-filter-group=" + group + "] a").removeClass('active');
                    if (group === 'type') {
                        query = query.replace(/#(word|kanji|sentence|name)s?/, '');
                        if (tag === 'type-all') {
                            el.addClass('active');
                        } else {
                            if (!this_is_active || !/\#/.test(query)) {
                                el.addClass('active');
                                _this.set_dropdown_text(tag);
                                switch (tag) {
                                    case 'word':
                                    case 'words':
                                        query = query.add(" #words");
                                        break;
                                    case 'sentence':
                                    case 'sentences':
                                        query = query.add(" #sentences");
                                        break;
                                    case 'kanji':
                                        query = query.add(" #kanji");
                                        break;
                                    case 'name':
                                    case 'names':
                                        query = query.add(" #names");
                                }
                            }
                        }
                    }
                    if (group === 'pos') {
                        query = query.replace(/#(noun|verb|adjective|adverb|particle|counter)/, '');
                        if (tag === 'pos-all') {
                            el.addClass('active');
                        } else {
                            if (!this_is_active) {
                                el.addClass('active');
                                query = query.add(" #" + tag);
                            }
                        }
                    }
                    if (group === 'level') {
                        query = query.replace(/#(common|jlpt-n1|jlpt-n2|jlpt-n3|jlpt-n4|jlpt-n5)/, '');
                        if (tag === 'level-all') {
                            el.addClass('active');
                        } else {
                            if (!this_is_active) {
                                el.addClass('active');
                                query = query.add(" #" + tag);
                            }
                        }
                    }
                    if ($("ul[data-filter-group=" + group + "] .active").length === 0) {
                        $(".filter[data-filter=" + group + "-all]").addClass('active');
                    }
                    query = query.replace(/\s{2,}/g, ' ');
                    $('#keyword').val(query);
                    if (query.replace(/#\w+/, '').trim()) {
                        return $('#search').submit();
                    } else {
                        return $('#keyword').caret({
                            start: 0,
                            end: 0
                        }).focus();
                    }
                };
            })(this));
        };

        return Filters;

    })();

}).call(this);
(function() {
    var Adjective, Form, Godan, IAdjective, Ichidan, InflectionPattern, InflectionTable, Kuru, SuruDerivative, SuruOnly, Verb,
        __bind = function(fn, me) { return function() { return fn.apply(me, arguments); }; };

    Form = (function() {
        function Form(inflected, furigana) {
            this.inflected = inflected;
            this.furigana = furigana;
        }

        return Form;

    })();

    Verb = (function() {
        function Verb() {}

        return Verb;

    })();

    Adjective = (function() {
        function Adjective() {}

        return Adjective;

    })();

    IAdjective = (function() {
        function IAdjective(base) {
            this.base = base;
            this.part_of_speech = new Adjective;
        }

        IAdjective.prototype.jisho = function() {
            return new Form(this.base);
        };

        IAdjective.prototype.katta = function() {
            return new Form(this.stem() + 'ã‹ã£ãŸ');
        };

        IAdjective.prototype.kunai = function() {
            return new Form(this.stem() + 'ããªã„');
        };

        IAdjective.prototype.kunakatta = function() {
            return new Form(this.stem() + 'ããªã‹ã£ãŸ');
        };

        IAdjective.prototype.stem = function() {
            return this.base.replace(/ã„$/, '');
        };

        return IAdjective;

    })();

    Kuru = (function() {
        function Kuru(base) {
            this.base = base;
            this.part_of_speech = new Verb;
        }

        Kuru.prototype.jisho = function() {
            return new Form(this.base, 'ã');
        };

        Kuru.prototype.nai = function() {
            return new Form(this.mizenkei() + 'ãªã„', 'ã“');
        };

        Kuru.prototype.masu = function() {
            return new Form(this.renyokei() + 'ã¾ã™', 'ã');
        };

        Kuru.prototype.masen = function() {
            return new Form(this.renyokei() + 'ã¾ã›ã‚“', 'ã');
        };

        Kuru.prototype.ta = function() {
            return new Form(this.takei() + 'ãŸ', 'ã');
        };

        Kuru.prototype.nakatta = function() {
            return new Form(this.mizenkei() + 'ãªã‹ã£ãŸ', 'ã“');
        };

        Kuru.prototype.mashita = function() {
            return new Form(this.renyokei() + 'ã¾ã—ãŸ', 'ã');
        };

        Kuru.prototype.masendeshita = function() {
            return new Form(this.renyokei() + 'ã¾ã›ã‚“ã§ã—ãŸ', 'ã');
        };

        Kuru.prototype.te = function() {
            return new Form(this.takei() + 'ã¦', 'ã');
        };

        Kuru.prototype.nakute = function() {
            return new Form(this.mizenkei() + 'ãªãã¦', 'ã“');
        };

        Kuru.prototype.potential = function() {
            return new Form(this.mizenkei() + 'ã‚‰ã‚Œã‚‹', 'ã“');
        };

        Kuru.prototype.potential_negative = function() {
            return new Form(this.mizenkei() + 'ã‚‰ã‚Œãªã„', 'ã“');
        };

        Kuru.prototype.passive = function() {
            return new Form(this.mizenkei() + 'ã‚‰ã‚Œã‚‹', 'ã“');
        };

        Kuru.prototype.passive_negative = function() {
            return new Form(this.mizenkei() + 'ã‚‰ã‚Œãªã„', 'ã“');
        };

        Kuru.prototype.causative = function() {
            return new Form(this.mizenkei() + 'ã•ã›ã‚‹', 'ã“');
        };

        Kuru.prototype.causative_negative = function() {
            return new Form(this.mizenkei() + 'ã•ã›ãªã„', 'ã“');
        };

        Kuru.prototype.causative_passive = function() {
            return new Form(this.mizenkei() + 'ã•ã›ã‚‰ã‚Œã‚‹', 'ã“');
        };

        Kuru.prototype.causative_passive_negative = function() {
            return new Form(this.mizenkei() + 'ã•ã›ã‚‰ã‚Œãªã„', 'ã“');
        };

        Kuru.prototype.imperative = function() {
            return new Form(this.meireikei() + 'ã„', 'ã“');
        };

        Kuru.prototype.imperative_negative = function() {
            return new Form(this.base + 'ãª', 'ã');
        };

        Kuru.prototype.renyokei = function() {
            return this.base.replace(/ã‚‹$/, '');
        };

        Kuru.prototype.mizenkei = function() {
            return this.base.replace(/ã‚‹$/, '');
        };

        Kuru.prototype.meireikei = function() {
            return this.base.replace(/ã‚‹$/, '');
        };

        Kuru.prototype.takei = function() {
            return this.base.replace(/ã‚‹$/, '');
        };

        return Kuru;

    })();

    SuruOnly = (function() {
        function SuruOnly(base) {
            this.base = base;
            this.part_of_speech = new Verb;
        }

        SuruOnly.prototype.jisho = function() {
            return new Form(this.base + 'ã‚‹', 'ã™');
        };

        SuruOnly.prototype.nai = function() {
            return new Form(this.base + 'ãªã„', 'ã—');
        };

        SuruOnly.prototype.masu = function() {
            return new Form(this.base + 'ã¾ã™', 'ã—');
        };

        SuruOnly.prototype.masen = function() {
            return new Form(this.base + 'ã¾ã›ã‚“', 'ã—');
        };

        SuruOnly.prototype.ta = function() {
            return new Form(this.base + 'ãŸ', 'ã—');
        };

        SuruOnly.prototype.nakatta = function() {
            return new Form(this.base + 'ãªã‹ã£ãŸ', 'ã—');
        };

        SuruOnly.prototype.mashita = function() {
            return new Form(this.base + 'ã¾ã—ãŸ', 'ã—');
        };

        SuruOnly.prototype.masendeshita = function() {
            return new Form(this.base + 'ã¾ã›ã‚“ã§ã—ãŸ', 'ã—');
        };

        SuruOnly.prototype.te = function() {
            return new Form(this.base + 'ã¦', 'ã—');
        };

        SuruOnly.prototype.nakute = function() {
            return new Form(this.base + 'ãªãã¦', 'ã—');
        };

        SuruOnly.prototype.potential = function() {
            return new Form('ã§ãã‚‹');
        };

        SuruOnly.prototype.potential_negative = function() {
            return new Form('ã§ããªã„');
        };

        SuruOnly.prototype.passive = function() {
            return new Form(this.base + 'ã‚Œã‚‹', 'ã•');
        };

        SuruOnly.prototype.passive_negative = function() {
            return new Form(this.base + 'ã‚Œãªã„', 'ã•');
        };

        SuruOnly.prototype.causative = function() {
            return new Form(this.base + 'ã›ã‚‹', 'ã•');
        };

        SuruOnly.prototype.causative_negative = function() {
            return new Form(this.base + 'ã›ãªã„', 'ã•');
        };

        SuruOnly.prototype.causative_passive = function() {
            return new Form(this.base + 'ã›ã‚‰ã‚Œã‚‹', 'ã•');
        };

        SuruOnly.prototype.causative_passive_negative = function() {
            return new Form(this.base + 'ã›ã‚‰ã‚Œãªã„', 'ã•');
        };

        SuruOnly.prototype.imperative = function() {
            return new Form(this.base + 'ã‚', 'ã—');
        };

        SuruOnly.prototype.imperative_negative = function() {
            return new Form(this.base + 'ã‚‹ãª', 'ã™');
        };

        SuruOnly.prototype.renyokei = function() {
            return 'ã—';
        };

        SuruOnly.prototype.mizenkei = function() {
            return 'ã—';
        };

        SuruOnly.prototype.meireikei = function() {
            return 'ã—';
        };

        SuruOnly.prototype.takei = function() {
            return 'ã—';
        };

        return SuruOnly;

    })();

    SuruDerivative = (function() {
        function SuruDerivative(base, prefix) {
            this.base = base;
            this.prefix = prefix;
            this.part_of_speech = new Verb;
        }

        SuruDerivative.prototype.jisho = function() {
            return new Form(this.base + 'ã™ã‚‹');
        };

        SuruDerivative.prototype.nai = function() {
            return new Form(this.base + 'ã—ãªã„');
        };

        SuruDerivative.prototype.masu = function() {
            return new Form(this.base + 'ã—ã¾ã™');
        };

        SuruDerivative.prototype.masen = function() {
            return new Form(this.base + 'ã—ã¾ã›ã‚“');
        };

        SuruDerivative.prototype.ta = function() {
            return new Form(this.base + 'ã—ãŸ');
        };

        SuruDerivative.prototype.nakatta = function() {
            return new Form(this.base + 'ã—ãªã‹ã£ãŸ');
        };

        SuruDerivative.prototype.mashita = function() {
            return new Form(this.base + 'ã—ã¾ã—ãŸ');
        };

        SuruDerivative.prototype.masendeshita = function() {
            return new Form(this.base + 'ã—ã¾ã›ã‚“ã§ã—ãŸ');
        };

        SuruDerivative.prototype.te = function() {
            return new Form(this.base + 'ã—ã¦');
        };

        SuruDerivative.prototype.nakute = function() {
            return new Form(this.base + 'ã—ãªãã¦');
        };

        SuruDerivative.prototype.potential = function() {
            return new Form(this.prefix + 'ã§ãã‚‹');
        };

        SuruDerivative.prototype.potential_negative = function() {
            return new Form(this.prefix + 'ã§ããªã„');
        };

        SuruDerivative.prototype.passive = function() {
            return new Form(this.base + 'ã•ã‚Œã‚‹');
        };

        SuruDerivative.prototype.passive_negative = function() {
            return new Form(this.base + 'ã•ã‚Œãªã„');
        };

        SuruDerivative.prototype.causative = function() {
            return new Form(this.base + 'ã•ã›ã‚‹');
        };

        SuruDerivative.prototype.causative_negative = function() {
            return new Form(this.base + 'ã•ã›ãªã„');
        };

        SuruDerivative.prototype.causative_passive = function() {
            return new Form(this.base + 'ã•ã›ã‚‰ã‚Œã‚‹');
        };

        SuruDerivative.prototype.causative_passive_negative = function() {
            return new Form(this.base + 'ã•ã›ã‚‰ã‚Œãªã„');
        };

        SuruDerivative.prototype.imperative = function() {
            return new Form(this.base + 'ã—ã‚');
        };

        SuruDerivative.prototype.imperative_negative = function() {
            return new Form(this.base + 'ã™ã‚‹ãª');
        };

        SuruDerivative.prototype.renyokei = function() {
            return 'ã—';
        };

        SuruDerivative.prototype.mizenkei = function() {
            return 'ã—';
        };

        SuruDerivative.prototype.meireikei = function() {
            return 'ã—';
        };

        SuruDerivative.prototype.takei = function() {
            return 'ã—';
        };

        return SuruDerivative;

    })();

    Ichidan = (function() {
        function Ichidan(base) {
            this.base = base;
            this.part_of_speech = new Verb;
        }

        Ichidan.prototype.jisho = function() {
            return new Form(this.base);
        };

        Ichidan.prototype.nai = function() {
            return new Form(this.mizenkei() + 'ãªã„');
        };

        Ichidan.prototype.masu = function() {
            return new Form(this.renyokei() + 'ã¾ã™');
        };

        Ichidan.prototype.masen = function() {
            return new Form(this.renyokei() + 'ã¾ã›ã‚“');
        };

        Ichidan.prototype.ta = function() {
            return new Form(this.takei() + 'ãŸ');
        };

        Ichidan.prototype.nakatta = function() {
            return new Form(this.mizenkei() + 'ãªã‹ã£ãŸ');
        };

        Ichidan.prototype.mashita = function() {
            return new Form(this.renyokei() + 'ã¾ã—ãŸ');
        };

        Ichidan.prototype.masendeshita = function() {
            return new Form(this.renyokei() + 'ã¾ã›ã‚“ã§ã—ãŸ');
        };

        Ichidan.prototype.te = function() {
            return new Form(this.takei() + 'ã¦');
        };

        Ichidan.prototype.nakute = function() {
            return new Form(this.mizenkei() + 'ãªãã¦');
        };

        Ichidan.prototype.potential = function() {
            return new Form(this.mizenkei() + 'ã‚‰ã‚Œã‚‹');
        };

        Ichidan.prototype.potential_negative = function() {
            return new Form(this.mizenkei() + 'ã‚‰ã‚Œãªã„');
        };

        Ichidan.prototype.passive = function() {
            return new Form(this.mizenkei() + 'ã‚‰ã‚Œã‚‹');
        };

        Ichidan.prototype.passive_negative = function() {
            return new Form(this.mizenkei() + 'ã‚‰ã‚Œãªã„');
        };

        Ichidan.prototype.causative = function() {
            return new Form(this.mizenkei() + 'ã•ã›ã‚‹');
        };

        Ichidan.prototype.causative_negative = function() {
            return new Form(this.mizenkei() + 'ã•ã›ãªã„');
        };

        Ichidan.prototype.causative_passive = function() {
            return new Form(this.mizenkei() + 'ã•ã›ã‚‰ã‚Œã‚‹');
        };

        Ichidan.prototype.causative_passive_negative = function() {
            return new Form(this.mizenkei() + 'ã•ã›ã‚‰ã‚Œãªã„');
        };

        Ichidan.prototype.imperative = function() {
            return new Form(this.meireikei() + 'ã‚');
        };

        Ichidan.prototype.imperative_negative = function() {
            return new Form(this.base + 'ãª');
        };

        Ichidan.prototype.renyokei = function() {
            return this.base.replace(/ã‚‹$/, '');
        };

        Ichidan.prototype.mizenkei = function() {
            return this.base.replace(/ã‚‹$/, '');
        };

        Ichidan.prototype.meireikei = function() {
            return this.base.replace(/ã‚‹$/, '');
        };

        Ichidan.prototype.takei = function() {
            return this.base.replace(/ã‚‹$/, '');
        };

        return Ichidan;

    })();

    Godan = (function() {
        function Godan(base, type) {
            this.base = base;
            this.type = type;
            this.part_of_speech = new Verb;
            this.v5_patterns = {
                u: ['ã„', 'ã‚', 'ãˆ', 'ã£'],
                k: ['ã', 'ã‹', 'ã‘', 'ã„'],
                'k-s': ['ã', 'ã‹', 'ã‘', 'ã£'],
                g: ['ãŽ', 'ãŒ', 'ã’', 'ã„'],
                m: ['ã¿', 'ã¾', 'ã‚', 'ã‚“'],
                n: ['ã«', 'ãª', 'ã­', 'ã‚“'],
                r: ['ã‚Š', 'ã‚‰', 'ã‚Œ', 'ã£'],
                b: ['ã³', 'ã°', 'ã¹', 'ã‚“'],
                s: ['ã—', 'ã•', 'ã›', 'ã—'],
                t: ['ã¡', 'ãŸ', 'ã¦', 'ã£'],
                z: ['ã˜', 'ã–', 'ãœ', 'ã„']
            };
        }

        Godan.prototype.jisho = function() {
            return new Form(this.base);
        };

        Godan.prototype.nai = function() {
            return new Form(this.mizenkei() + 'ãªã„');
        };

        Godan.prototype.masu = function() {
            return new Form(this.renyokei() + 'ã¾ã™');
        };

        Godan.prototype.masen = function() {
            return new Form(this.renyokei() + 'ã¾ã›ã‚“');
        };

        Godan.prototype.ta = function() {
            var _ref;
            if ((_ref = this.type) === 'g' || _ref === 'm' || _ref === 'n' || _ref === 'b') {
                return new Form(this.takei() + 'ã ');
            } else {
                return new Form(this.takei() + 'ãŸ');
            }
        };

        Godan.prototype.nakatta = function() {
            return new Form(this.mizenkei() + 'ãªã‹ã£ãŸ');
        };

        Godan.prototype.mashita = function() {
            return new Form(this.renyokei() + 'ã¾ã—ãŸ');
        };

        Godan.prototype.masendeshita = function() {
            return new Form(this.renyokei() + 'ã¾ã›ã‚“ã§ã—ãŸ');
        };

        Godan.prototype.te = function() {
            var _ref;
            if ((_ref = this.type) === 'g' || _ref === 'm' || _ref === 'n' || _ref === 'b') {
                return new Form(this.takei() + 'ã§');
            } else {
                return new Form(this.takei() + 'ã¦');
            }
        };

        Godan.prototype.nakute = function() {
            return new Form(this.mizenkei() + 'ãªãã¦');
        };

        Godan.prototype.potential = function() {
            return new Form(this.meireikei() + 'ã‚‹');
        };

        Godan.prototype.potential_negative = function() {
            return new Form(this.meireikei() + 'ãªã„');
        };

        Godan.prototype.passive = function() {
            return new Form(this.mizenkei() + 'ã‚Œã‚‹');
        };

        Godan.prototype.passive_negative = function() {
            return new Form(this.mizenkei() + 'ã‚Œãªã„');
        };

        Godan.prototype.causative = function() {
            return new Form(this.mizenkei() + 'ã›ã‚‹');
        };

        Godan.prototype.causative_negative = function() {
            return new Form(this.mizenkei() + 'ã›ãªã„');
        };

        Godan.prototype.causative_passive = function() {
            return new Form(this.mizenkei() + 'ã›ã‚‰ã‚Œã‚‹');
        };

        Godan.prototype.causative_passive_negative = function() {
            return new Form(this.mizenkei() + 'ã›ã‚‰ã‚Œãªã„');
        };

        Godan.prototype.imperative = function() {
            return new Form(this.meireikei());
        };

        Godan.prototype.imperative_negative = function() {
            return new Form(this.base + 'ãª');
        };

        Godan.prototype.renyokei = function() {
            return this.base.replace(/.$/, this.v5_patterns[this.type][0]);
        };

        Godan.prototype.mizenkei = function() {
            return this.base.replace(/.$/, this.v5_patterns[this.type][1]);
        };

        Godan.prototype.meireikei = function() {
            return this.base.replace(/.$/, this.v5_patterns[this.type][2]);
        };

        Godan.prototype.takei = function() {
            return this.base.replace(/.$/, this.v5_patterns[this.type][3]);
        };

        return Godan;

    })();

    InflectionPattern = (function() {
        function InflectionPattern() {}

        InflectionPattern.determine = function(base, pos) {
            var klass, pattern;
            if ('v1' === pos) {
                pattern = new Ichidan(base);
            } else if (klass = pos.match(/^v5(.*)$/)) {
                pattern = new Godan(base, klass[1]);
            } else if ('vk' === pos) {
                pattern = new Kuru(base);
            } else if ('vs-i' === pos && ('ã™ã‚‹' === base || 'ç‚ºã‚‹' === base)) {
                pattern = new SuruOnly(base.replace(/ã‚‹$/, ''));
            } else if ('vs-i' === pos) {
                pattern = new SuruDerivative(base.replace(/ã™ã‚‹$/, ''), base.replace(/ã™ã‚‹$/, ''), '');
            } else if ('adj-i' === pos) {
                pattern = new IAdjective(base);
            }
            return pattern;
        };

        return InflectionPattern;

    })();

    InflectionTable = (function() {
        function InflectionTable() {
            this.show_inflection_table = __bind(this.show_inflection_table, this);
            $(document).on('click', '.show_inflection_table', (function(_this) {
                return function(e) {
                    e.preventDefault();
                    return _this.show_inflection_table(e.target);
                };
            })(this));
        }

        InflectionTable.prototype.show_inflection_table = function(target) {
            var caption, modal, pattern, pos, word;
            word = $(target).attr('data-word');
            pos = $(target).attr('data-pos');
            caption = $(target).attr('data-caption');
            pattern = InflectionPattern.determine(word, pos);
            modal = $('#inflection_modal');
            modal.find('.modal_content').empty().append((function(_this) {
                return function() {
                    var html;
                    html = "<table class=\"inflection_table\"> <thead> <caption>" + caption + "</caption> <tr> <td></td> <td><strong>Affirmative</strong></td> <td><strong>Negative</strong></td> </tr> </thead> <tbody>";
                    if (pattern.part_of_speech instanceof Verb) {
                        html = html + _this.row("Non-past", pattern.jisho(), pattern.nai()) + _this.row("Non-past, polite", pattern.masu(), pattern.masen()) + _this.row("Past", pattern.ta(), pattern.nakatta()) + _this.row("Past, polite", pattern.mashita(), pattern.masendeshita()) + _this.row("Te-form", pattern.te(), pattern.nakute()) + _this.row("Potential", pattern.potential(), pattern.potential_negative()) + _this.row("Passive", pattern.passive(), pattern.passive_negative()) + _this.row("Causative", pattern.causative(), pattern.causative_negative()) + _this.row("Causative Passive", pattern.causative_passive(), pattern.causative_passive_negative()) + _this.row("Imperative", pattern.imperative(), pattern.imperative_negative());
                    } else if (pattern.part_of_speech instanceof Adjective) {
                        html = html + _this.row("Non-past", pattern.jisho(), pattern.kunai()) + _this.row("Past", pattern.katta(), pattern.kunakatta());
                    }
                    html = html + '</tbody></table>';
                    return html;
                };
            })(this));
            return modal.foundation('reveal', 'open');
        };

        InflectionTable.prototype.row = function(description, positive, negative) {
            var html, negative_furigana, positive_furigana;
            positive_furigana = positive.furigana ? "<span class=\"furigana inflector-furigana\"><span>" + positive.furigana + "</span></span>" : "";
            negative_furigana = negative.furigana ? "<span class=\"furigana inflector-furigana\"><span>" + negative.furigana + "</span></span>" : "";
            html = "<tr> <td><strong>" + description + "</strong></td> <td class=\"japanese\" lang=\"ja\">" + positive_furigana + "<span class=\"text\">" + positive.inflected + "</span></td> <td class=\"japanese\" lang=\"ja\">" + negative_furigana + "<span class=\"text\">" + negative.inflected + "</span></td> </tr>";
            return html;
        };

        return InflectionTable;

    })();

    $(document).ready(function() {
        return new InflectionTable;
    });

}).call(this);
(function() {
    var __bind = function(fn, me) { return function() { return fn.apply(me, arguments); }; };

    this.SearchArea = (function() {
        var MOBILE_WIDTH, SCROLL_MARGIN;

        SCROLL_MARGIN = 15;

        MOBILE_WIDTH = 640;

        function SearchArea(name) {
            this.isMobile = __bind(this.isMobile, this);
            this.body = $(document.body);
            this.main = $('#search_main');
            this.area = $("#" + name + "_area");
            this.button = $("#" + name + "_button");
            this.name = name;
            this.button.click((function(_this) {
                return function() {
                    if (_this.active) {
                        return _this.deactivate();
                    } else {
                        return _this.activate();
                    }
                };
            })(this));
        }

        SearchArea.prototype.activate = function(silent) {
            if (!silent) {
                this.area.trigger('area_will_activate', [this]);
            }
            this.active = true;
            this.area.show();
            window.location.hash = this.name;
            this.scrollToSearch();
            this.body.addClass("search_area_active " + this.name + "_area_active");
            if (!silent) {
                return this.area.trigger('area_activated', [this]);
            }
        };

        SearchArea.prototype.deactivate = function(silent) {
            if (this.active && window.location.hash === ("#" + this.name) && history.pushState) {
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
            this.active = false;
            this.area.hide();
            this.body.removeClass("search_area_active " + this.name + "_area_active");
            if (!silent) {
                return this.area.trigger('area_deactivated', [this]);
            }
        };

        SearchArea.prototype.isMobile = function() {
            return window.innerWidth < MOBILE_WIDTH;
        };

        SearchArea.prototype.scrollToSearch = function() {
            var top;
            if (this.isMobile()) {
                top = this.main[0].getBoundingClientRect().top;
                return window.scrollTo(0, top + window.scrollY - SCROLL_MARGIN);
            }
        };

        return SearchArea;

    })();

}).call(this);
(function() {
    var __bind = function(fn, me) { return function() { return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }

            function ctor() { this.constructor = child; }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };

    this.Input = (function(_super) {
        __extends(Input, _super);

        function Input(prefix) {
            this.handleResultsWrap = __bind(this.handleResultsWrap, this);
            this.setResultsOverflowType = __bind(this.setResultsOverflowType, this);
            this.handleResize = __bind(this.handleResize, this);
            Input.__super__.constructor.call(this, prefix);
            this.showMore = this.area.find('.show_more');
            this.showLess = this.area.find('.show_less');
            this.showMore.click((function(_this) {
                return function() {
                    _this.toggleMoreResults(true);
                    return _this.area.trigger('show_more');
                };
            })(this));
            this.showLess.click((function(_this) {
                return function() {
                    _this.toggleMoreResults(false);
                    _this.area.trigger('show_less');
                    return _this.list.scrollTop(0);
                };
            })(this));
            $(window).smartResize(this.handleResize.debounce(250));
            this.setResultsOverflowType();
        }

        Input.prototype.toggleMoreResults = function(show) {
            this.list.toggleClass('viewing_all', show);
            this.showLess.toggle(show);
            return this.showMore.toggle(!show);
        };

        Input.prototype.appendResult = function(character, extra_class) {
            if (extra_class == null) {
                extra_class = '';
            }
            return this.list.append("<a href='/search/" + character + "' class='result " + extra_class + "'>" + character + "</a>");
        };

        Input.prototype.appendLabel = function(label) {
            return this.list.append("<span class='result_label'>" + label + "</span>");
        };

        Input.prototype.handleResize = function() {
            if (this.list) {
                this.setResultsOverflowType();
                return this.handleResultsWrap();
            }
        };

        Input.prototype.emptyResults = function() {
            this.list.empty().append(this.instructions);
            this.handleResultsWrap();
            return this.list.removeClass('showing_results');
        };

        Input.prototype.setResultsOverflowType = function() {
            return this.resultsHorizontalScroll = this.isMobile();
        };

        Input.prototype.handleResultsWrap = function() {
            var overflow;
            this.list.css('width', 'auto');
            this.list.removeClass('overflowing');
            if (this.resultsHorizontalScroll) {
                this.list.css('white-space', 'nowrap');
                if (this.list[0].scrollWidth > this.list[0].clientWidth) {
                    this.list.width(Math.ceil(this.list[0].scrollWidth / 2) + 50);
                }
                this.list.css('white-space', 'normal');
            } else {
                overflow = this.list[0].scrollHeight > this.list[0].clientHeight;
                this.showMore.toggle(overflow);
                this.showLess.toggle(!overflow && this.list.hasClass('viewing_all'));
                this.list.toggleClass('overflowing', overflow);
            }
            this.list.toggleClass('showing_results', this.list.find('.result').length > 0);
            return this.area.trigger('results_changed');
        };

        return Input;

    })(SearchArea);

}).call(this);
(function() {
    var __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }

            function ctor() { this.constructor = child; }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };

    this.HandwritingInput = (function(_super) {
        __extends(HandwritingInput, _super);

        function HandwritingInput() {
            var panel, _i, _len, _ref;
            HandwritingInput.__super__.constructor.call(this, 'handwriting');
            this.url = this.area.data('url');
            this.list = this.area.find('.list');
            this.inputs = this.area.find('.inputs');
            this.panels = this.area.find('.panel');
            _ref = this.panels;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                panel = _ref[_i];
                this.setupPanel(panel);
            }
            this.setupEvents(this.area);
            this.instructions = this.list.find('.instructions');
            this.defaultPanelWidth = this.panels.first().width();
            this.calculateDimensions();
            this.deactivate();
        }

        HandwritingInput.prototype.setupEvents = function() {
            return this.list.on('click', '.result', (function(_this) {
                return function(evt) {
                    if (!Event.withMeta(evt)) {
                        evt.preventDefault();
                        _this.setCandidate($(evt.target).text());
                        return _this.confirmCandidate();
                    }
                };
            })(this));
        };

        HandwritingInput.prototype.setupPanel = function(el) {
            var $el, backButton, canvas, panel, resetButton;
            $el = $(el);
            backButton = $el.find('.back').attr('disabled', 'disabled');
            resetButton = $el.find('.reset').attr('disabled', 'disabled');
            canvas = $el.find('canvas');
            panel = new KanjiHandwriting(canvas[0]);
            panel.onStrokeStart = (function(_this) {
                return function() {
                    if (_this.currentPanel && _this.currentPanel !== panel) {
                        _this.confirmCandidate();
                        _this.currentPanel.reset();
                    }
                    _this.currentPanel = panel;
                    $el.addClass('drawing');
                    resetButton.removeAttr('disabled');
                    if (panel.strokes.length > 1) {
                        return backButton.removeAttr('disabled');
                    }
                };
            })(this);
            panel.onStrokeEnd = (function(_this) {
                return function() {
                    return _this.query(panel);
                };
            })(this);
            panel.onReset = function() {
                $el.removeClass('drawing');
                resetButton.attr('disabled', 'disabled');
                return backButton.attr('disabled', 'disabled');
            };
            backButton.click((function(_this) {
                return function() {
                    if (panel.strokes.length > 1) {
                        panel.back();
                        _this.query(panel);
                        if (panel.strokes.length === 1) {
                            return backButton.attr('disabled', 'disabled');
                        }
                    }
                };
            })(this));
            resetButton.click((function(_this) {
                return function() {
                    panel.reset();
                    return _this.removeCandidate();
                };
            })(this));
            return $el.resize((function(_this) {
                return function(event, targetWidth) {
                    event.stopPropagation();
                    return panel.resizeToWidth(targetWidth);
                };
            })(this));
        };

        HandwritingInput.prototype.query = function(panel) {
            return $.ajax({
                url: this.url,
                type: 'post',
                data: {
                    sexp: panel.toSexp()
                },
                success: (function(_this) {
                    return function(results) {
                        return _this.setResult(results);
                    };
                })(this)
            });
        };

        HandwritingInput.prototype.setResult = function(results) {
            this.list.empty();
            results.each((function(_this) {
                return function(kanji, i) {
                    return _this.appendResult(kanji);
                };
            })(this));
            this.handleResultsWrap();
            return this.setCandidate(results.charAt(0));
        };

        HandwritingInput.prototype.calculateDimensions = function() {
            var targetWidth;
            targetWidth = Math.min(this.area.outerWidth(true), this.defaultPanelWidth);
            if (targetWidth !== this.currentPanelWidth) {
                this.panels.trigger('resize', targetWidth);
                this.inputs.css('max-height', this.panels.first().height());
                return this.currentPanelWidth = targetWidth;
            }
        };

        HandwritingInput.prototype.setCandidate = function(candidate) {
            this.list.trigger('candidate_chosen', candidate);
            return this.candidate = candidate;
        };

        HandwritingInput.prototype.confirmCandidate = function() {
            if (this.candidate) {
                this.list.trigger('candidate_confirmed');
            }
            return this.clearCandidate();
        };

        HandwritingInput.prototype.clearCandidate = function() {
            if (this.currentPanel) {
                this.currentPanel.reset();
            }
            return this.candidate = null;
        };

        HandwritingInput.prototype.setCharacter = function(character) {
            return this.list.trigger('character_chosen', character);
        };

        HandwritingInput.prototype.removeCandidate = function() {
            return this.list.trigger('candidate_removed');
        };

        return HandwritingInput;

    })(Input);

}).call(this);
/*
 * Redrawing elements that need to force a paint.
 */

(function($) {

    $.fn.redraw = function() {

        this.each(function() {
            this.style.display = 'none';
            this.offsetHeight;
            this.style.display = 'block';
        });

    }

})(jQuery);
(function() {
    var __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }

            function ctor() { this.constructor = child; }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

    this.RadicalInput = (function(_super) {
        var HEIGHT_MARGIN;

        __extends(RadicalInput, _super);

        HEIGHT_MARGIN = 15;

        function RadicalInput() {
            RadicalInput.__super__.constructor.call(this, 'radical');
            this.MAX_KANJI_RESULTS = 36;
            this.list = this.area.find('.list');
            this.table = this.area.find('.radical_table');
            this.radicals = this.area.find('.radical');
            this.resetRadicalsButton = this.area.find('.reset_radicals');
            this.allRadicals = this.area.find('.radical');
            this.inputMethods = $('#input_methods');
            this.instructions = this.list.find('.instructions');
            this.toggleCombinedMode(true);
            this.setupEvents();
            this.reset();
            this.radicals.addClass('available');
            this.deactivate();
        }

        RadicalInput.prototype.setupTouch = function() {
            if (Modernizr.touch) {
                return this.table.touchZoomGrid({
                    selector: '.radical'
                });
            }
        };

        RadicalInput.prototype.setupEvents = function() {
            this.table.on('click', '.radical', (function(_this) {
                return function(evt) {
                    var combine, radical, radicalAlreadySelected, radicalCannotBeCombined, radk;
                    radical = $(evt.target);
                    radk = radical.data('radk') || radical.text();
                    combine = true;
                    radicalCannotBeCombined = function() {
                        return combine && !radical.hasClass('available');
                    };
                    radicalAlreadySelected = function() {
                        return __indexOf.call(_this.selected_radicals, radk) >= 0;
                    };
                    if (radicalAlreadySelected()) {
                        if (_this.selected_radicals.any(radk)) {
                            _this.selected_radicals = _this.selected_radicals.remove(radk);
                            radical.removeClass('selected');
                            if (_this.selected_radicals.length === 0) {
                                _this.reset();
                                return;
                            } else {
                                _this.getKanji();
                                return;
                            }
                        }
                    }
                    if (radicalCannotBeCombined()) {
                        return;
                    }
                    if (!combine) {
                        _this.reset();
                    }
                    _this.selected_radicals.push(radk);
                    radical.addClass('selected');
                    return _this.getKanji();
                };
            })(this));
            this.list.on('click', '.result', (function(_this) {
                return function(evt) {
                    evt.preventDefault();
                    return _this.list.trigger('character_chosen', $(evt.target).text());
                };
            })(this));
            this.resetRadicalsButton.on('click', (function(_this) {
                return function() {
                    return _this.reset();
                };
            })(this));
            return this.area.on('area_activated', (function(_this) {
                return function(evt, area) {
                    if (area.name === 'radical') {
                        return _this.setHeight();
                    }
                };
            })(this));
        };

        RadicalInput.prototype.reset = function() {
            this.selected_radicals = [];
            return this.allRadicals.removeClass('selected').addClass('available');
        };

        RadicalInput.prototype.toggleCombinedMode = function(state) {
            this.combinedModeOn = state;
            return this.toggleCombined(state);
        };

        RadicalInput.prototype.toggleCombined = function(show) {
            return this.area.toggleClass('combined_mode', show);
        };

        RadicalInput.prototype.setAvailableRadicals = function(validRadicals) {
            this.radicals.each((function(_this) {
                return function(i, radical) {
                    var radk;
                    radical = $(radical);
                    radk = radical.data('radk') || radical.text();
                    return radical.toggleClass('available', _this.selected_radicals.none(radk) && !!validRadicals[radk]);
                };
            })(this));
            return this.table.redraw();
        };

        RadicalInput.prototype.setHeight = function() {
            var height;
            if (this.isMobile()) {
                height = window.innerHeight - this.table[0].getBoundingClientRect().top - HEIGHT_MARGIN - this.inputMethods[0].clientHeight;
                return this.table.css('max-height', height);
            } else {
                return this.table.css('max-height', 'none');
            }
        };

        RadicalInput.prototype.getKanji = function() {
            return $.ajax({
                type: 'GET',
                url: '/radicals/' + this.selected_radicals.join(','),
                dataType: 'json',
                success: (function(_this) {
                    return function(data) {
                        var current_strokes;
                        current_strokes = 0;
                        if (data.kanji && data.kanji.length > 0) {
                            _this.list.empty();
                            $.each(data.kanji, function(i, kanji) {
                                if (current_strokes < kanji.strokes) {
                                    _this.appendLabel(kanji.strokes);
                                    current_strokes = kanji.strokes;
                                }
                                return _this.appendResult(kanji.kanji, "g" + kanji.grade);
                            });
                        } else {
                            _this.message('No kanji found with those parts');
                        }
                        _this.setAvailableRadicals(data.is_valid_radical);
                        return _this.handleResultsWrap();
                    };
                })(this)
            });
        };

        return RadicalInput;

    })(Input);

}).call(this);
(function() {
    var __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }

            function ctor() { this.constructor = child; }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };

    this.SpeechInput = (function(_super) {
        __extends(SpeechInput, _super);

        function SpeechInput() {
            SpeechInput.__super__.constructor.call(this, 'speech');
            this.SpeechRecognition = Modernizr.speech;
            this.englishButton = this.area.find('button.english');
            this.japaneseButton = this.area.find('button.japanese');
            this.results = this.area.find('.speech_results');
            this.englishButton.click((function(_this) {
                return function() {
                    _this.startRecognition();
                    return false;
                };
            })(this));
            this.japaneseButton.click((function(_this) {
                return function() {
                    _this.startRecognition('ja-JP');
                    return false;
                };
            })(this));
            this.deactivate();
        }

        SpeechInput.prototype.activate = function(silent) {
            SpeechInput.__super__.activate.call(this, silent);
            return this.startRecognition();
        };

        SpeechInput.prototype.deactivate = function(silent) {
            SpeechInput.__super__.deactivate.call(this, silent);
            return this.stopRecognition();
        };

        SpeechInput.prototype.startRecognition = function(lang) {
            if (lang == null) {
                lang = 'en-US';
            }
            this.processedResults = [];
            this.processedResultsIndex = 0;
            this.stopRecognition();
            this.session = new this.SpeechRecognition;
            this.session.continuous = true;
            this.session.interimResults = true;
            this.session.lang = lang;
            this.session.addEventListener('result', (function(_this) {
                return function(event) {
                    var final, i, results, _i, _ref, _ref1;
                    results = [];
                    final = false;
                    for (i = _i = _ref = _this.processedResultsIndex, _ref1 = event.resultIndex; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
                        results.push(event.results[i][0].transcript);
                        final = event.results[i].isFinal;
                    }
                    return _this.processTranscript(results, final);
                };
            })(this));
            return this.session.start();
        };

        SpeechInput.prototype.stopRecognition = function() {
            if (this.session) {
                this.session.stop();
            }
            return this.session = null;
        };

        SpeechInput.prototype.processTranscript = function(results, final) {
            if (final) {
                this.processedResults = this.processedResults.concat(results);
                this.processedResultsIndex += results.length;
                this.findCommands();
                results = [];
            }
            this.outputResults(this.processedResults.concat(results));
            return this.area.trigger('speech_result_added');
        };

        SpeechInput.prototype.findCommands = function() {
            var command, split;
            split = this.processedResults.pop().trim().split(' ');
            command = split.last().toLowerCase();
            switch (command) {
                case 'back':
                case 'æˆ»ã‚‹':
                    if (split.length === 1) {
                        return this.processedResults.pop();
                    }
                    break;
                case 'clear':
                case 'ã‚¯ãƒªã‚¢':
                    return this.processedResults = [];
                case 'stop':
                case 'ã‚„ã‚ã‚‹':
                    return this.stopRecognition();
                case 'japanese':
                case 'æ—¥æœ¬èªž':
                    return this.startRecognition('ja-JP');
                case 'english':
                case 'è‹±èªž':
                    return this.startRecognition();
                case 'input':
                case 'æ±ºå®š':
                    this.processedResults.push(split.to(-1).join(' '));
                    return this.area.trigger('speech_confirmed', [this.processedResults.join('')]);
                case 'submit':
                case 'search':
                case 'æ¤œç´¢':
                    this.processedResults.push(split.to(-1).join(' '));
                    return this.area.trigger('speech_submitted', [this.processedResults.join('')]);
                default:
                    return this.processedResults.push(split.join(' '));
            }
        };

        SpeechInput.prototype.outputResults = function(results) {
            return this.results.html(results.map(function(r) {
                return "<span class=\"result\">" + (r.trim()) + "</span>";
            }));
        };

        SpeechInput.prototype.getVolumeLevel = function() {};

        return SpeechInput;

    })(Input);

}).call(this);
(function() {

    var defineProperty = Object.defineProperty || function(obj, name, desc) {
        obj[name] = desc.value;
    };

    var getOwnPropertyNames = Object.getOwnPropertyNames || function(obj) {
        var names = [];
        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) continue;
            names.push(key);
        }
        return names;
    };

    var defineMethod = function(obj, name, method, enumerable) {
        defineProperty(obj, name, {
            value: method,
            writable: true,
            configurable: true,
            enumerable: !!enumerable
        });
    };

    var mixin = function(source) {
        extend.call(this, source);
        extend.call(this.prototype, source.prototype);
    };

    var extend = function(obj, enumerable) {
        var names = getOwnPropertyNames(obj),
            i = names.length,
            key;
        while (i--) {
            key = names[i];
            if (key && (!(key in this) || key === 'toString')) {
                defineMethod(this, key, obj[key], enumerable !== false);
            }
        }
    };

    // "inherits" can be called in both the construtor of the inheriting class:
    //
    // var Foo = Class(function Foo() {
    //   this.inherits(new Bar());
    // });
    //
    // ... or outside it:
    //
    // var Foo = Class(function Foo() {});
    // Foo.inherits(Bar);
    //
    // The idea behind this is that often the constructor of the parent class needs
    // to be called, and calling it outside the context of the child class' constructor
    // often makes no sense. So, the first method makes sense when the parent's constructor
    // needs to be called, and the second makes sense when Foo simply inherits Bar's methods.
    // This is effectively identical to a mixin, and in fact this is not true prototypal
    // inheritance as the properties are being mixed in as non-enumerable methods instead of
    // actually setting the prototype object itself. This could be done through __proto__,
    // but it's dirtier and IE could not be supported.
    var inherits = function(parent) {
        var target = typeof this === 'function' ? this.prototype : this;
        if (typeof parent === 'function') {
            extend.call(target, parent.prototype, false);
        } else {
            extend.call(target, parent, false);
            extend.call(target, parent.constructor.prototype, false);
        }
    };

    Class = function(constructor) {
        // Don't want to define methods on Function.prototype (yet),
        // so define them directly for now.
        defineMethod(constructor, 'mixin', mixin, true);
        defineMethod(constructor, 'extend', extend, true);
        defineMethod(constructor, 'inherits', inherits);
        defineMethod(constructor.prototype, 'extend', extend);
        defineMethod(constructor.prototype, 'inherits', inherits);
        return constructor;
    };

})();

var Canvas = Class(function Canvas(canvas) {
    this.setupCanvas(canvas);
});

Canvas.prototype.extend({

    setupCanvas: function(canvas) {
        var context = canvas.getContext && canvas.getContext("2d");
        if (!canvas || !context) return;
        this.context = context;
        this.canvas = canvas;
        this.pixelRatio = Math.min(2, window.devicePixelRatio || 1);
        this.setDimensions(canvas.width, canvas.height);
    },

    setDimensions: function(w, h) {
        var dw = w,
            dh = h;
        if (this.pixelRatio > 1) {
            dw *= this.pixelRatio;
            dh *= this.pixelRatio;
        }
        this.width = this.canvas.width = dw;
        this.height = this.canvas.height = dh;
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
    },

    clear: function() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

});


var Point = Class(function Point(x, y) {
    this.x = x;
    this.y = y;
});

Point.DEGREES_IN_RADIANS = 57.2957795;
Point.DEFAULT_SIZE = 3;
Point.COLORS = ['red', 'green', 'blue', 'orange', 'pink', 'purple', 'gray'];

Point.extend({

    degToRad: function(deg) {
        return deg / Point.DEGREES_IN_RADIANS;
    },

    radToDeg: function(rad) {
        var deg = rad * Point.DEGREES_IN_RADIANS;
        while (deg < 0) deg += 360;
        return deg;
    },

    vector: function(deg, len) {
        var rad = Point.degToRad(deg);
        return new Point(Math.cos(rad) * len, Math.sin(rad) * len);
    },

    nextColor: function() {
        var index = this.colorIndex;
        if (index === undefined || index == this.COLORS.length - 1) {
            index = 0;
        } else {
            index += 1;
        }
        this.colorIndex = index;
        return this.COLORS[index];
    }


});

Point.prototype.extend({

    toString: function(point) {
        return 'Point: ' + this.x + ',' + this.y;
    },

    add: function(point) {
        return new Point(this.x + point.x, this.y + point.y);
    },

    subtract: function(point) {
        return new Point(this.x - point.x, this.y - point.y);
    },

    multiply: function(n) {
        return Point.vector(this.angle(), this.length() * n);
    },

    divide: function(n) {
        return Point.vector(this.angle(), this.length() / n);
    },

    angle: function(deg) {
        var len, rad;
        if (deg === undefined) {
            return Point.radToDeg(Math.atan2(this.y, this.x));
        } else {
            return Point.vector(deg, this.length());
        }
    },

    rotate: function(deg) {
        return this.angle(this.angle() + deg);
    },

    length: function(l) {
        if (l === undefined) {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        } else {
            return Point.vector(this.angle(), l);
        }
    },

    move: function(ctx) {
        ctx.moveTo(this.x, this.y);
    },

    drawPoint: function(ctx, size) {
        size = size || Point.DEFAULT_SIZE;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2, true);
        ctx.fill();
    },

    drawGuide: function(ctx, num) {
        ctx.font = "bold 9px sans-serif";
        ctx.fillStyle = '#000';
        ctx.fillText(num + ' ' + Math.round(this.x) + ',' + Math.round(this.y), this.x, this.y);
    },

    draw: function(ctx, lastPoint) {
        var inHandle, outHandle;
        inHandle = this.inHandle ? this.inHandle : this;
        if (lastPoint) {
            outHandle = lastPoint.outHandle || lastPoint;
        }
        if (inHandle && outHandle) {
            ctx.bezierCurveTo(outHandle.x, outHandle.y, inHandle.x, inHandle.y, this.x, this.y);
        } else {
            ctx.lineTo(this.x, this.y);
        }
        return this;
    },

    drawHandles: function(ctx) {
        ctx.fillStyle = Point.nextColor();
        ctx.beginPath();
        if (this.inHandle) {
            ctx.arc(this.inHandle.x, this.inHandle.y, 3, 0, Math.PI * 2, true);
        }
        if (this.outHandle) {
            ctx.arc(this.outHandle.x, this.outHandle.y, 3, 0, Math.PI * 2, true);
        }
        ctx.fill()
    }

});


var Color = Class(function Color() {
    if (typeof arguments[0] === 'string') {
        this.setFromHex(arguments[0]);
    } else {
        this.red = arguments[0] || 0;
        this.blue = arguments[1] || 0;
        this.green = arguments[2] || 0;
        this.alpha = arguments[3] || 0;
    }
});

Color.prototype.extend({

    setFromHex: function(hex) {
        hex = hex.replace(/#/, '');
        if (hex.length < 6) {
            hex = hex.replace(/(.)/g, '$1$1');
        }
        this.red = parseInt(hex.slice(0, 2), 16);
        this.green = parseInt(hex.slice(2, 4), 16);
        this.blue = parseInt(hex.slice(4, 6), 16);
        this.alpha = 1;
    },

    toString: function() {
        return 'rgba(' + [this.red, this.green, this.blue, this.alpha].join(',') + ')';
    },

    set: function(ctx, line) {
        if (line) {
            ctx.strokeStyle = this.toString();
        } else {
            ctx.fillStyle = this.toString();
        }
    }

});

var Shadow = Class(function Shadow(color, xOffset, yOffset, blur) {
    this.color = color;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.blur = blur;
});

Shadow.prototype.extend({

    set: function(ctx) {
        ctx.shadowColor = this.color ? this.color.toString() : null;
        ctx.shadowOffsetX = this.xOffset || 0;
        ctx.shadowOffsetY = this.yOffset || 0;
        ctx.shadowBlur = this.blur || 0;
    }

});

var LineStyle = Class(function LineStyle(s, cap, miter, join) {
    var match;

    match = s.match(/(\d+\.?\d*)px/);
    this.px = match ? match[1] : 1;

    match = s.match(/(#[0-9a-f]{3,6}|rgba?\(.+\))/);
    this.color = new Color(match ? match[1] : '#000');

    this.cap = cap || 'round';
    this.miter = miter || 'round';
    this.join = join || 'round';
});

LineStyle.prototype.extend({

    toString: function() {
        return this.px + 'px ' + this.color.toString();
    },

    set: function(ctx) {
        ctx.lineWidth = this.px;
        ctx.lineCap = this.cap;
        ctx.lineMiter = this.miter;
        ctx.lineJoin = this.join;
        this.color.set(ctx, true);
    }

});
// Dependencies: jQuery

(function(global) {

    var Event = Class(function Events() {});

    var COMMAND_KEY_CODE = 91;
    var CTRL_KEY_CODE = 17;
    var SHIFT_KEY_CODE = 16;
    var ALT_KEY_CODE = 18;

    Event.withMeta = function(evt) {
        return evt.ctrlKey || evt.metaKey;
    }

    Event.isMeta = function(evt) {
        return evt.which === CTRL_KEY_CODE || evt.which === COMMAND_KEY_CODE;
    }

    Event.Listener = {

        setupListeners: function() {
            if (!this.eventListeners) {
                this.eventListeners = [];
            }
        },

        listener: function(target) {
            this.setupListeners();
            this.eventListeners.push(target);
        },

        broadcast: function(name) {
            var handlerName = 'on' + name;
            var args = Array.prototype.slice.call(arguments, 1);
            this.eventListeners.forEach(function(listener) {
                if (listener[handlerName]) {
                    listener[handlerName].apply(listener, args);
                }
            }, this);
        }

    };

    global.Event = Event;

})(this);

var ImageMap = Class(function ImageMap(container) {
    this.id = ImageMap.getNextId();
    this.map = $('<map/>').attr({
        id: this.id,
        name: this.id
    });
    this.image = $('<img/>').attr({
        src: ImageMap.getTransparent(),
        ismap: true,
        usemap: '#' + this.id
    }).css({
        top: 0,
        left: 0,
        position: 'absolute'
    });
    container.append(this.map);
    container.append(this.image);

});

ImageMap.extend({

    getNextId: function() {
        if (!this._id) {
            this._id = 0;
        }
        this._id += 1;
        return 'image_map_' + this._id;
    },

    getTransparent: function() {
        // base64 encode for a 1px transparent gif
        var pixel = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        return 'data:image/gif;base64,' + pixel;
    }

});

ImageMap.prototype.extend({

    setDimensions: function(w, h) {
        this.image.css({ width: w, height: h });
    },

    addArea: function(points, connect) {
        var area = $('<area shape="poly" />');
        area.attr('coords', points.map(function(p) {
            return p.x + ',' + p.y;
        }).join(','));
        area.on('mouseenter', function(evt) {
            if (connect.onMouseEnter) {
                connect.onMouseEnter(evt);
            }
        });
        area.on('mouseleave', function(evt) {
            if (connect.onMouseLeave) {
                connect.onMouseLeave(evt);
            }
        });
        area.on('click', function(evt) {
            if (connect.onClick) {
                connect.onClick(evt);
            }
        });
        this.map.append(area);
    }

});
// DERP. Trigger asset rebuild

var Animation = Class(function Animation() {});

Animation.mixin(Canvas);

Animation.prototype.extend(Event.Listener);
Animation.prototype.extend({

    reset: function() {
        this.relativePosition = 0;
        this.maxPosition = this.totalFrames - 1;
        this.completed = false;
        this.animating = false;
        window.cancelAnimationFrame(this.requestId);
    },

    ease: function(v, vmax) {
        return -vmax / 2 * (Math.cos(Math.PI * v / vmax) - 1);
    },

    getCurrentFrame: function() {
        var easedPosition = this.ease(this.relativePosition, this.maxPosition);
        return Math.min(1 + Math.round(easedPosition), this.totalFrames);
    },

    advance: function() {
        if (this.relativePosition >= this.maxPosition) {
            if (!this.completed) {
                this.animating = false;
                this.completed = true;
                this.broadcast('AnimationComplete', this);
            }
        } else {
            this.relativePosition += this.speed;
        }
    },

    drawCurrentFrameAndAdvance: function() {
        this.drawFrame(this.getCurrentFrame());
        this.advance();
    },

    drawCurrentFrameAndRequestNext: function() {
        var self = this;
        this.clear();
        this.animating = true;
        this.drawCurrentFrameAndAdvance();
        if (this.animating) {
            this.requestId = window.requestAnimationFrame(function() {
                self.drawCurrentFrameAndRequestNext();
            });
        }
    },

    animate: function() {
        if (this.animating) return;
        this.reset();
        this.drawCurrentFrameAndRequestNext();
    }
});

// requestAnimationFrame polyfill

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


var Kanji = Class(function Kanji(svgCommands, container, options) {

    options = options || {};

    var canvas = container.find('canvas');

    this.setupCanvas(canvas.get(0));
    this.imageMap = new ImageMap(container.find('.stage'));
    this.imageMap.setDimensions(150, 150);

    // KanjiVG dimensions are 109x109
    this.scale = Math.min(this.width, this.height) / 109;

    // TODO: Derive this from KanjiStroke?
    this.setBrush(options['brush']);

    this.build(svgCommands);

    this.setSpeed(Kanji.getSetting('speed'));
    this.setThickness(Kanji.getSetting('thickness'));
});

Kanji.mixin(Canvas);
Kanji.mixin(ImageMap);

// TODO: This needs to be a global settings object!

Kanji.HAS_LOCAL_STORAGE = !!window.localStorage;

Kanji.setSetting = function(name, val) {
    if (!Kanji.HAS_LOCAL_STORAGE) return;
    localStorage[name] = val;
};

Kanji.getSetting = function(name) {
    var val, num;
    if (Kanji.HAS_LOCAL_STORAGE) {
        val = localStorage[name];
        num = parseFloat(val);
        if (!isNaN(num)) {
            val = num;
        }
    }
    if (val === undefined) {
        val = Kanji['DEFAULT_' + name.toUpperCase()];
    }
    return val;
};

Kanji.prototype.extend(Event.Listener);
Kanji.prototype.extend({

    setBrush: function(url) {
        var img = new Image(),
            self = this;
        img.src = url;
        img.onload = this.onBrushLoaded.bind(this);
        this.brush = img;
    },

    onBrushLoaded: function() {
        if (this.drawOnBrushLoaded) {
            this.draw();
        }
    },

    build: function(svgCommands) {
        this.strokes = svgCommands.map(function(c, i) {
            var k = new KanjiStroke({
                scale: this.scale,
                brush: this.brush,
                context: this.context,
                pressurePoint: true
            });
            k.number = i + 1;
            k.listener(this);
            k.buildPointsFromSVG(c);
            // Scale for the image map is in CSS pixels, not device pixels,
            // so divide by the pixel ratio here.
            this.imageMap.addArea(k.getOutline(5, this.scale / this.pixelRatio), k);
            return k;
        }, this);
    },

    setSpeed: function(speed) {
        if (speed < Kanji.MIN_SPEED || speed > Kanji.MAX_SPEED) {
            return;
        }
        this.strokes.forEach(function(s) {
            s.speed = speed;
        });
        this.speed = speed;
        this.delayBetweenStrokes = 250;
        Kanji.setSetting('speed', speed);
    },

    setThickness: function(thickness) {
        if (thickness < Kanji.MIN_THICKNESS || thickness > Kanji.MAX_THICKNESS) {
            return;
        }
        thickness = thickness.round(1);
        this.strokes.forEach(function(s) {
            s.strokeThickness = thickness;
        });
        this.thickness = thickness;
        this.draw();
        Kanji.setSetting('thickness', thickness);
    },

    drawNumbers: function() {
        this.clear();
        this.draw();
        this.strokes.forEach(function(s) {
            s.drawNumber();
        });
    },

    drawPoints: function() {
        this.clear();
        this.strokes.forEach(function(s) {
            s.drawPoints();
        });
    },

    draw: function(guides, handles) {
        if (!this.brush.complete) {
            this.drawOnBrushLoaded = true;
            return;
        }
        this.clear();
        this.strokes.forEach(function(s) {
            s.draw(guides, handles);
        });
    },

    animateFromStart: function() {
        this.singleStrokeMode = false;
        this.animatingAll = true;
        this.strokes.forEach(function(s) {
            s.reset();
        });
        this.clear();
        clearTimeout(this.timer);
        this.strokes[0].animate();
    },

    animateSingleStroke: function(num) {
        this.singleStrokeMode = true;
        this.strokes[num - 1].animate();
    },

    onAnimationComplete: function(stroke) {
        if (this.singleStrokeMode) return;
        // .number is equal to the array index + 1
        var next = this.strokes[stroke.number];
        if (next) {
            this.timer = setTimeout(function() {
                next.animate();
            }, this.delayBetweenStrokes);
        }
        this.animatingAll = !!next;
    },

    onBeforeFrame: function(stroke) {
        var i;
        this.clear();
        if (this.singleStrokeMode) {
            // Draw all strokes except currently animating one
            for (i = 0, len = this.strokes.length; i < len; i++) {
                if (this.strokes[i] !== stroke) {
                    this.strokes[i].draw();
                }
            }
        } else {
            // Draw all strokes up to the current onee
            for (i = 0, len = stroke.number - 1; i < len; i++) {
                this.strokes[i].draw();
            }
        }
    },

    onStrokeEnter: function(stroke) {
        if (this.animatingAll) return;
        stroke.color = stroke.highlightedColor;
        this.clear();
        this.draw();
    },

    onStrokeLeave: function(stroke) {
        if (this.animatingAll) return;
        stroke.color = stroke.mainColor;
        this.clear();
        this.draw();
    },

    onStrokeClick: function(stroke) {
        if (this.animatingAll) return;
        stroke.color = stroke.mainColor;
        this.animateSingleStroke(stroke.number);
    }

});


Kanji.MIN_SPEED = 0.3;
Kanji.MAX_SPEED = 3;

Kanji.MIN_THICKNESS = 0.2;
Kanji.MAX_THICKNESS = 3;

Kanji.DEFAULT_SPEED = 1.5;
Kanji.DEFAULT_THICKNESS = 1.2;

var KanjiStroke = Class(function KanjiStroke(options) {

    this.options = options;

    this.scale = this.options.scale || 1;
    this.context = this.options.context;
    this.style = this.options.style;

    this.points = [];
    this.listeners = [];
    this.speed = 1;

    this.brushScale = .10 * this.scale;
    this.brushRotation = true;
    this.pressurePointRadius = 15 * this.scale;
    this.pointsBisectThreshold = 1;
    this.outlineBisectThreshold = 6 * this.scale;
    this.strokeThickness = 0.8 * this.scale;

    this.mainColor = new Color('#777');
    this.darkColor = new Color('#777');
    this.mainShadow = new Shadow();

    this.highlightedColor = new Color('#bbb');
    this.pressurePointColor = new Color(255, 0, 0, 0.2);

    this.numberRadius = 10;
    this.numberCircleColor = new Color('#b77');
    this.numberCircleShadow = new Shadow(new Color(0, 0, 0, 0.2), 0, 2, 2);
    this.numberTextColor = new Color(255, 255, 255, 1);
    this.numberTextShadow = new Shadow(new Color(0, 0, 0, 0.5), 0, -1, 0);

    this.color = this.mainColor;
    this.shadow = this.mainShadow;

});

KanjiStroke.mixin(Animation);

KanjiStroke.prototype.extend(Event.Listener);
KanjiStroke.extend({

    DISTANCE_BETWEEN_POINTS: 20,

    cachedThicknesses: {},
    cachedRotations: {},

    getThicknessForTime: function(codepoint, t) {
        var map = this.cachedThicknesses[codepoint] || this.buildThicknessMap(codepoint);
        return map[Math.round(t * 100)];
    },

    getRotationForTime: function(codepoint, t) {
        var map = this.cachedRotations[codepoint] || this.buildRotationMap(codepoint);
        return map[t.toFixed(2)];
    },

    buildThicknessMap: function(codepoint) {
        var guide = KanjiStroke.LINE_GUIDES[codepoint] || KanjiStroke.LINE_GUIDES['default'];
        var map = {};

        var split = guide.split(',').map(function(l) {
            var s = l.split(' L');
            return [parseInt(s[0]), parseInt(s[1])];
        });
        split.forEach(function(set, i) {
            var startTime = set[0];
            if (startTime == 100) {
                return;
            }
            var startThickness = set[1];
            var next = split[i + 1];
            var stopTime = next ? next[0] : 100;
            var stopThickness = next ? next[1] : startThickness;
            var dThickness = stopThickness - startThickness;
            var dTime = stopTime - startTime;
            var time = startTime;
            while (time <= stopTime) {
                map[time] = ((((time - startTime) / dTime) * dThickness) + startThickness) / 100;
                time++;
            }
        });
        this.cachedThicknesses[codepoint] = map;
        return map;
    },

    buildRotationMap: function(codepoint) {
        var guide = KanjiStroke.BRUSH_ROTATION[codepoint] || KanjiStroke.BRUSH_ROTATION['default'];
        var map = {};

        var split = guide.split(' ').map(function(l) {
            var s = l.split(':');
            return [parseFloat(s[0]), parseFloat(s[1])];
        });
        split.forEach(function(set, i) {
            var startTime = set[0];
            if (startTime == 1) {
                return;
            }
            var startRotation = set[1];
            var next = split[i + 1];
            var stopTime = next ? next[0] : 1;
            var stopRotation = next ? next[1] : startRotation;
            var dRotation = stopRotation - startRotation;
            var dTime = stopTime - startTime;
            var time = startTime;
            while (time <= stopTime) {
                map[time.toFixed(2)] = Point.degToRad((((time - startTime) / dTime) * dRotation) + startRotation);
                time += .01;
            }
        });
        this.cachedRotations[codepoint] = map;
        return map;
    }

});

KanjiStroke.prototype.extend({

    addPoint: function(points) {
        this.points = this.points.concat(points);
        return this;
    },

    buildPointsFromSVG: function(svg, ignoreLast) {
        var self, commands, currentPoint, split;
        if (!svg) return;

        split = svg.split(':');
        svg = split[1];
        self = this;
        commands = parseCommands(svg);

        this.codepoint = split[0];

        function parseCommands(svg) {
            var split = svg.split(/(?=[mcls])/i),
                result = [],
                str, command, points, group;
            // Handle repeated commands
            for (var i = 0; i < split.length; i++) {
                str = split[i];
                command = str.charAt(0);
                group = getCommandPoints(command, str.slice(1).trim());
                for (var j = 0; j < group.length; j++) {
                    result.push({
                        command: command,
                        points: group[j]
                    });
                }
            }
            return result;
        }

        // Get points for an SVG command while
        // handling repeated command groups.
        function getCommandPoints(command, str) {
            var points, group = [],
                n;
            points = str.split(/[, ]|(?=-)/).map(parseFloat);
            switch (command.toLowerCase()) {
                case 'm':
                    n = 2;
                    break;
                case 'l':
                    n = 2;
                    break;
                case 'c':
                    n = 6;
                    break;
                case 's':
                    n = 6;
                    break;
            }
            if (points.length % n !== 0) {
                console.warn('Unexpected number of points in SVG command');
            }
            do {
                group.push(points.slice(0, n));
                points = points.slice(n);
            } while (points.length);
            return group;
        }

        function moveAbsolute(p) {
            var p = getNewPoint(p[0], p[1]);
            self.addPoint(p);
            currentPoint = p;
        }

        function lineRelative(points) {
            points[0] += currentPoint.x;
            points[1] += currentPoint.y;
            lineAbsolute(points);
        }

        function lineAbsolute(points) {
            var target = getNewPoint(points[0], points[1]);
            self.addPoint(target);
            currentPoint = target;
        }

        function shorthandCurveAbsolute(bezierPoints) {
            var outHandle;
            if (currentPoint.inHandle) {
                outHandle = currentPoint.add(currentPoint.subtract(currentPoint.inHandle));
            } else {
                outHandle = getNewPoint(currentPoint.x, currentPoint.y);
            }
            bezierPoints.unshift(outHandle.y);
            bezierPoints.unshift(outHandle.x);
            curveAbsolute(bezierPoints);
        }

        function shorthandCurveRelative(bezierPoints) {
            var outHandle;
            if (currentPoint.inHandle) {
                outHandle = currentPoint.inHandle.subtract(currentPoint).multiply(-1);
            } else {
                outHandle = getNewPoint(0, 0);
            }
            bezierPoints.unshift(outHandle.y);
            bezierPoints.unshift(outHandle.x);
            curveRelative(bezierPoints);
        }

        function curveRelative(bezierPoints, skipFirst) {
            bezierPoints[0] += currentPoint.x;
            bezierPoints[1] += currentPoint.y;
            bezierPoints[2] += currentPoint.x;
            bezierPoints[3] += currentPoint.y;
            bezierPoints[4] += currentPoint.x;
            bezierPoints[5] += currentPoint.y;
            curveAbsolute(bezierPoints);
        }

        function curveAbsolute(bezierPoints) {
            var target, inHandleX, inHandleY, outHandleX, outHandleY, targetX, targetY;
            currentPoint.outHandle = getNewPoint(bezierPoints[0], bezierPoints[1]);
            target = getNewPoint(bezierPoints[4], bezierPoints[5]);
            target.inHandle = getNewPoint(bezierPoints[2], bezierPoints[3]);
            self.addPoint(target);
            currentPoint = target;
        }

        function getNewPoint(x, y) {
            return new Point(x, y);
        }

        function runCommand(c, index, commands) {
            if (ignoreLast && index === commands.length - 1) {
                return;
            }
            switch (c.command) {
                case 'M':
                    moveAbsolute(c.points);
                    break;
                case 'm':
                    moveAbsolute(c.points);
                    break;
                case 'C':
                    curveAbsolute(c.points);
                    break;
                case 'c':
                    curveRelative(c.points);
                    break;
                case 'S':
                    shorthandCurveAbsolute(c.points);
                    break;
                case 's':
                    shorthandCurveRelative(c.points);
                    break;
                case 'L':
                    lineAbsolute(c.points);
                    break;
                case 'l':
                    lineRelative(c.points);
                    break;
            }
        }

        commands.forEach(runCommand);

        this.minimalPoints = this.removeAdjacentPoints(this.points);
        this.points = this.bisectToThreshold(this.minimalPoints);
        this.totalFrames = this.points.length;
    },

    removeAdjacentPoints: function(points) {
        var currentPoint = points[0],
            result = [currentPoint];
        points.from(1).forEach(function(p, i) {
            var nextPoint = p;
            var distance = nextPoint.subtract(currentPoint).length();
            if (distance > this.pointsBisectThreshold) {
                result.push(nextPoint);
                currentPoint = nextPoint;
            }
        }, this);
        return result;
    },

    inspectPoints: function(points) {
        console.info(points.join('\n'));
    },

    bisectToThreshold: function(points) {

        function splitBezier(p1, p2) {

            var t = 0.5;

            var x1 = p1.x;
            var y1 = p1.y;
            var x2 = p1.outHandle ? p1.outHandle.x : p1.x;
            var y2 = p1.outHandle ? p1.outHandle.y : p1.y;
            var x3 = p2.inHandle ? p2.inHandle.x : p2.x;
            var y3 = p2.inHandle ? p2.inHandle.y : p2.y;
            var x4 = p2.x;
            var y4 = p2.y;

            var x12 = (x2 - x1) * t + x1;
            var y12 = (y2 - y1) * t + y1;

            var x23 = (x3 - x2) * t + x2;
            var y23 = (y3 - y2) * t + y2;

            var x34 = (x4 - x3) * t + x3;
            var y34 = (y4 - y3) * t + y3;

            var x123 = (x23 - x12) * t + x12;
            var y123 = (y23 - y12) * t + y12;

            var x234 = (x34 - x23) * t + x23;
            var y234 = (y34 - y23) * t + y23;

            var x1234 = (x234 - x123) * t + x123;
            var y1234 = (y234 - y123) * t + y123;

            if (p1.outHandle) {
                p1.outHandle = p1.add(p1.outHandle.subtract(p1).multiply(0.5));
            }
            if (p2.inHandle) {
                p2.inHandle = p2.add(p2.inHandle.subtract(p2).multiply(0.5));
            }
            var p = new Point(x1234, y1234);
            p.inHandle = new Point(x123, y123);
            p.outHandle = p.add(p.subtract(p.inHandle));
            return p;
        }

        var currentPoint, nextPoint, result = points.concat(),
            i = 1;
        currentPoint = result[0];
        var kill = 0;

        while (nextPoint = result[i]) {
            var dist = nextPoint.subtract(currentPoint).length();
            if (dist > this.pointsBisectThreshold) {
                result.splice(i, 0, splitBezier(currentPoint, nextPoint));
            } else {
                // Move on
                currentPoint = nextPoint;
                i++;
            }

            // REMOVE ME!
            kill++;
            if (kill > 1000) {
                console.info("DEAD AT", kill);
                break;
            }
        }

        return result;

    },

    /*
  bisectToThreshold: function(points, threshold) {
    for(var i = 0; i < 10; i++) {
      points = this.bisectPoints(points, threshold);
    }
    return points;
  },

  bisectPoints: function(points, threshold) {

    var bisectedPoints  = [];
    var earmarkedPoints = {};

    function splitBezier(p1, p2) {

      var t = 0.5;

      var x1 = p1.x;
      var y1 = p1.y;
      var x2 = p1.outHandle ? p1.outHandle.x : p1.x;
      var y2 = p1.outHandle ? p1.outHandle.y : p1.y;
      var x3 = p2.inHandle ? p2.inHandle.x : p2.x;
      var y3 = p2.inHandle ? p2.inHandle.y : p2.y;
      var x4 = p2.x;
      var y4 = p2.y;

      var x12 = (x2 - x1) * t + x1;
      var y12 = (y2 - y1) * t + y1;

      var x23 = (x3 - x2) * t + x2;
      var y23 = (y3 - y2) * t + y2;

      var x34 = (x4 - x3) * t + x3;
      var y34 = (y4 - y3) * t + y3;

      var x123 = (x23 - x12) * t + x12;
      var y123 = (y23 - y12) * t + y12;

      var x234 = (x34 - x23) * t + x23;
      var y234 = (y34 - y23) * t + y23;

      var x1234 = (x234 - x123) * t + x123;
      var y1234 = (y234 - y123) * t + y123;

      if(p1.outHandle) {
        p1.outHandle = p1.add(p1.outHandle.subtract(p1).multiply(0.5));
      }
      if(p2.inHandle) {
        p2.inHandle = p2.add(p2.inHandle.subtract(p2).multiply(0.5));
      }
      var p = new Point(x1234, y1234);
      p.inHandle = new Point(x123, y123);
      p.outHandle = p.add(p.subtract(p.inHandle));
      return p;
    }

    points.forEach(function(p, i, points) {
      var thisPoint      = p;
      var nextPoint      = points.at(i + 1);
      var distanceToNext = nextPoint.subtract(thisPoint).length();
      if(nextPoint.inHandle && distanceToNext > threshold) {
        earmarkedPoints[i] = true;
        earmarkedPoints[points.length - (i + 2)] = true;
      }
    });

    points.forEach(function(p, i, points) {
      var thisPoint = p;
      var nextPoint = points.at(i + 1);
      bisectedPoints.push(thisPoint);
      if(earmarkedPoints[i]) {
        bisectedPoints.push(splitBezier(thisPoint, nextPoint));
      }
    });

    return bisectedPoints;
  },

  rescale: function() {
    this.points.forEach(this.rescalePoint, this);
    if(this.outline) {
      this.outline.forEach(this.rescalePoint, this);
    }
  },

  rescalePoint: function(p) {
    p.x = p.x * this.scale;
    p.y = p.y * this.scale;
    if(p.inHandle)  this.rescalePoint(p.inHandle);
    if(p.outHandle) this.rescalePoint(p.outHandle);
  },

  createOutline: function() {
    this.outline = this.getOutline(this.strokeThickness);
    this.outline = this.bisectToThreshold(this.outline, this.outlineBisectThreshold);
    this.extendStrokeEdges();
  },
 */

    getOutline: function(thickness, scale) {
        var points = this.minimalPoints,
            result = [],
            i, len, half;

        function createTopPoint(original, offset) {
            var point = original.subtract(offset);
            // Note that we are creating an outline (2D) from a set of points (1D), that will end
            // up being drawn in sequential order around the outline, so we need to flip the "top"
            // (subtracted) point's inHandle and outHandle, or they will be reversed upon final output.
            if (original.inHandle) {
                point.outHandle = original.inHandle.subtract(offset);
            }
            if (original.outHandle) {
                point.inHandle = original.outHandle.subtract(offset);
            }
            return point.multiply(scale);
        }

        function createBottomPoint(original, offset) {
            var point = original.add(offset);
            if (original.inHandle) {
                point.inHandle = original.inHandle.add(offset);
            }
            if (original.outHandle) {
                point.outHandle = original.outHandle.add(offset);
            }
            return point.multiply(scale);
        }

        function pushTangentPoints(point, vector) {
            var offset = vector.rotate(90).length((thickness || 5) * (point.thickness || 2));
            result.unshift(createTopPoint(point, offset));
            result.push(createBottomPoint(point, offset));
        }

        pushTangentPoints(points.first(), points.at(1).subtract(points.first()));

        for (i = 1, len = points.length - 1; i < len; i++) {
            pushTangentPoints(points.at(i), points.at(i + 1).subtract(points.at(i - 1)));
        }

        pushTangentPoints(points.last(), points.last().subtract(points.at(-2)));

        half = Math.floor(points.length);
        result = result.slice(half).concat(result.slice(0, half));
        return result;
    },

    /*
  calculateStrokeThickness: function() {

    var i, len, p1, p2, delta, t, thickness;

    for(i = 0, len = this.outline.length; i < len; i++) {
      t = (i > len / 2 ? len - i : i) / len;
      p1 = this.outline.at(i);
      p2 = this.outline.at(-i);
      delta = p2.subtract(p1);
      thickness = KanjiStroke.getThicknessForTime(this.codepoint, t);

      if(thickness > 1) {
        this.outline[i] = p1.subtract(delta.multiply(thickness - 1));
      } else if(thickness < 1) {
        this.outline[i] = p1.add(delta.multiply(1 - thickness));
      }
    }
  },

  extendStrokeEdges: function() {
    this.extendStrokeEdge(this.outline.at(0), this.outline.at(-1));
    this.extendStrokeEdge(this.outline.at(this.outline.length / 2), this.outline.at((this.outline.length / 2) - 1 ));
  },

  extendStrokeEdge: function(p1, p2) {
    p1.inHandle  = this.extendHandle(p1, p1, p2);
    p2.outHandle = this.extendHandle(p2, p1, p2);
  },

  extendHandle: function(point, p1, p2) {
    return point.subtract(p2.subtract(p1).rotate(90).multiply(0.5));
  },

  smoothOutline: function(factor) {
    var outline = this.outline;
    outline.forEach(function(point, i) {
      var nextSegment = outline.at(i + 1).subtract(point);
      var lastSegment = point.subtract(outline.at(i - 1));
      point.inHandle  = point.subtract(nextSegment.length(lastSegment.length() / factor));
      point.outHandle = point.add(lastSegment.length(nextSegment.length() / factor));
    });
  },
 */

    // Simple moving average

    smoothPoints: function(factor) {
        if (this.smoothed) {
            return;
        }
        factor = factor || 5;
        var average = [];
        this.points.slice(0, -1).forEach(function(p) {
            var xSum = 0,
                ySum = 0,
                n = factor;
            average.push(new Point(p.x, p.y));
            if (average.length > factor) {
                // Remove first element
                average.splice(0, 1);
            }
            average.forEach(function(p) {
                xSum += p.x;
                ySum += p.y;
            });
            if (average.length < factor) {
                n = average.length;
            }
            p.x = xSum / n;
            p.y = ySum / n;
        });
        this.smoothed = true;
    },

    onMouseEnter: function(evt) {
        this.broadcast('StrokeEnter', this);
    },

    onMouseLeave: function(e) {
        this.broadcast('StrokeLeave', this);
    },

    onClick: function(e) {
        this.broadcast('StrokeClick', this);
    },

    drawFrame: function(frame) {
        var ctx = this.context;
        this.broadcast('BeforeFrame', this);
        this.color.set(ctx);
        this.shadow.set(ctx);
        this.drawBrush(frame);
        if (this.options.pressurePoint) {
            this.drawPressurePoint(frame);
        }
    },

    /* DELETE
  drawFrameOutline: function(frame) {
    var i, len, points, ctx = this.context;
    this.broadcast('BeforeFrame', this);
    this.color.set(ctx);
    this.shadow.set(ctx);
    points = this.outline.slice(0, frame).concat(this.outline.slice(-frame));
    ctx.beginPath();
    points.last().move(ctx);
    for(i = 0, len = points.length; i < len; i++) {
      points[i].draw(ctx, points.at(i - 1));
    }
    ctx.closePath();
    ctx.fill();
    if(this.pressurePoint) {
      this.drawPressurePoint(frame);
    }
  },
 */

    drawLine: function() {
        var self = this;
        var ctx = this.context;
        this.style.set(ctx);
        ctx.beginPath();
        this.points.forEach(function(p) {
            if (this.scale > 1) {
                p = p.multiply(this.scale);
            }
            p.draw(ctx);
        }, this);
        ctx.stroke();
    },

    drawPressurePoint: function(frame) {
        var ctx = this.context,
            x, y;
        var point = this.points[frame];
        if (point) {
            this.pressurePointColor.set(ctx);
            ctx.beginPath();
            x = point.x * this.scale;
            y = point.y * this.scale;
            ctx.arc(x, y, this.pressurePointRadius, 0, Math.PI * 2, true);
            ctx.fill();
        }
    },

    draw: function() {
        this.drawBrush();
    },

    drawBrush: function(to) {
        var ctx = this.context,
            brush = this.options.brush,
            w = brush.width * this.brushScale,
            h = brush.height * this.brushScale,
            xOffset = w / 2,
            yOffset = h / 2;
        if (to === undefined) {
            to = this.points.length;
        }
        for (var i = 0; i < to; i++) {
            var t = Math.round(i / this.points.length * 100) / 100;
            var p = this.points[i];
            var x = (p.x * this.scale) - xOffset;
            var y = (p.y * this.scale) - yOffset;
            ctx.save()
            ctx.translate(x, y);
            if (this.brushRotation) {
                ctx.rotate(KanjiStroke.getRotationForTime(this.codepoint, t));
            }
            ctx.drawImage(brush, 0, 0, w, h);
            ctx.restore();
        }
    },

    drawPoints: function(to) {
        var i, ctx = this.context;
        if (to === undefined) {
            to = this.points.length;
        }
        //this.darkColor.set(ctx);
        for (i = 0; i < to; i++) {
            this.points[i].drawPoint(ctx, 4);
        }
    },

    drawNumber: function() {
        var ctx = this.context,
            point = this.outline[this.outline.length / 2];
        // Not exactly 0 as strokes overlap, but fallback.
        point = this.points[3] || this.points[0];
        var radius = this.numberRadius;
        var fontSize = radius + 1;
        var xOffset = fontSize / 3;
        var yOffset = fontSize / 3;
        ctx.moveTo(point.x, point.y);
        this.numberCircleShadow.set(ctx);
        this.numberCircleColor.set(ctx);
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        this.numberTextShadow.set(ctx);
        this.numberTextColor.set(ctx);
        ctx.font = 'bold ' + fontSize + 'px sans-serif';
        ctx.fillText(this.number, point.x - xOffset, point.y + yOffset);
    },

    drawArrow: function() {
        var ctx, point, first, next, vector;
        ctx = this.context;
        first = this.points[0];
        next = this.points[5] || this.points[3] || this.points[1];
        vector = next.subtract(first);
        ctx.save();
        ctx.translate(first.x, first.y);
        ctx.rotate(Point.degToRad(vector.angle()));
        ctx.translate(-first.x, -first.y);
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,0,0,0.3)';
        point = first.add(new Point(0, -15)).draw(ctx);
        point = point.add(new Point(12, 0)).draw(ctx);
        point = point.add(new Point(0, -4)).draw(ctx);
        point = point.add(new Point(10, 7)).draw(ctx);
        point = point.add(new Point(-10, 7)).draw(ctx);
        point = point.add(new Point(0, -4)).draw(ctx);
        point = point.add(new Point(-12, 0)).draw(ctx);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    },

    drawOutline: function(handles, guides) {
        var i, points, len, ctx = this.context;
        this.color.set(ctx);
        points = this.outline;
        len = points.length;
        ctx.beginPath();
        points.last().move(ctx);
        for (i = 0; i < len; i++) {
            points.at(i).draw(ctx, points.at(i - 1), i);
        }
        ctx.closePath();
        ctx.fill();
        if (guides) {
            for (i = 0; i < len; i++) {
                points.at(i).drawGuide(ctx, i);
            }
        }
        if (handles) {
            for (i = 0; i < len; i++) {
                if (points[i].drawHandles) {
                    points[i].drawHandles(ctx, i / len);
                }
            }
        }
    }

});




















// Keeping this down here as it makes my MacVim very slow :)

KanjiStroke.extend({

    BRUSH_ROTATION: {
        'default': '0:0 1:0',
        // ã‡‘
        '31d1': '0:0 .5:-10 1:0',
        // ã‡
        '31d0': '0:0 .5:-15 1:0',
        // ã‡’
        '31d2': '0:-45 1:-55',
        // ã‡
        '31cf': '0:-15 .05:0 .6:-20 1:-45',
    },

    LINE_GUIDES: {
        'default': '0 L100',
        // 2nd
        '31c4': '0 L100',
        '31d4': '0 L100',
        // å„¿ 2nd
        '31df': '0 L100',
        // æ—¥ 2nd
        '31d5': '0 L100,35 L150,40 L120,60 L50',
        // ä»Š 4th
        '31d6': '0 L100',
        // ä¹ƒ 2nd
        '31cc': '0 L100',
        // æ‰Œ 3rd
        '31c0': '0 L100',
        // æ‰Œ 2nd
        '31da': '0 L100',
        // åŽ‚ 1st
        '31d0': '0 L130,20 L100',
        // äº» 2nd
        '31d1': '0 L120,100 L80',
        // äº» 1st
        '31d2': '0 L140,100 L40',
        // åˆ 1st
        '31c7': '0 L100',
        // åˆ 2nd
        '31cf': '0 L100,80 L180,100 L80'
    }

});
/** noUiSlider
 ** @author: LÃ©on Gersen
 ** @documentation: http://refreshless.com/nouislider/
 **/
/*jslint browser: true, devel: true, plusplus: true, white: true, unparam: true */

(function($, undefined) {

    "use strict";

    if ($.zepto && !$.fn.removeData) {
        throw new ReferenceError("Zepto is loaded without the data module.");
    }

    $.fn.noUiSlider = function(options) {

        var namespace = '.nui'
            // Create a shorthand for document event binding.
            ,
            all = $(document)
            // Create a map of touch and mouse actions.
            ,
            actions = {
                start: 'mousedown touchstart',
                move: 'mousemove touchmove',
                end: 'mouseup touchend'
            }
            // Make a copy of the current 'val' function.
            ,
            $VAL = $.fn.val
            // Define a set of standard HTML classes for
            // the various structures noUiSlider uses.
            ,
            clsList = [
                'noUi-base' // 0
                , 'noUi-origin' // 1
                , 'noUi-handle' // 2
                , 'noUi-input' // 3
                , 'noUi-active' // 4
                , 'noUi-state-tap' // 5
                , 'noUi-target' // 6
                , '-lower' // 7
                , '-upper' // 8
                , 'noUi-connect' // 9
                , 'noUi-vertical' // 10
                , 'noUi-horizontal' // 11
                , 'noUi-background' // 12
                , 'noUi-z-index' // 13
            ]
            // Define an extendible object with base classes for the various
            // structure elements in the slider. These can be extended by simply
            // pushing to the array, which reduces '.addClass()' calls.
            ,
            stdCls = {
                base: [clsList[0]],
                origin: [clsList[1]],
                handle: [clsList[2]]
            }
            // This object contains some well tested functions to convert
            // values to and from percentages. It can be a bit strange to wrap
            // your head around the individual calls, but they'll do their job
            // with all positive and negative input values.
            ,
            percentage = {
                to: function(range, value) {
                    value = range[0] < 0 ? value + Math.abs(range[0]) : value - range[0];
                    return (value * 100) / this.len(range);
                },
                from: function(range, value) {
                    return (value * 100) / this.len(range);
                },
                is: function(range, value) {
                    return ((value * this.len(range)) / 100) + range[0];
                },
                len: function(range) {
                    return (range[0] > range[1] ? range[0] - range[1] : range[1] - range[0]);
                }
            }
            // Event handlers bound to elements to perform basic tasks.
            ,
            eventHandlers = [
                // Assign input field values to the slider,
                // and signal unevaluated input.
                function() {

                    this.target.val([!this.i ? this.val() : null, this.i ? this.val() : null], { trusted: false });

                }
                // Shorthand for stopping propagation on an object.
                // Calling a function prevents having to define
                // one within other code.
                ,
                function(e) {
                    e.stopPropagation();
                }
            ];

        // When the browser supports MsPointerEvents,
        // don't bind touch or mouse events. The touch events are
        // currently only implemented by IE10, but they are stable
        // and convenient to use. IE11 implements pointerEvents without
        // a prefix, which breaks compatibility with the IE10 implementation.
        if (window.navigator.pointerEnabled) {
            actions = {
                start: 'pointerdown',
                move: 'pointermove',
                end: 'pointerup'
            };
        } else if (window.navigator.msPointerEnabled) {
            actions = {
                start: 'MSPointerDown',
                move: 'MSPointerMove',
                end: 'MSPointerUp'
            };
        }

        // Test an array of objects, and calls them if they are a function.
        function call(f, scope, args) {

            // Allow the passing of an unwrapped function.
            // Leaves other code a more comprehensible.
            if (!$.isArray(f)) {
                f = [f];
            }

            $.each(f, function(i, q) {
                if (typeof q === "function") {
                    q.call(scope, args);
                }
            });
        }

        function instance(object) {
            return object instanceof $ || ($.zepto && $.zepto.isZ(object));
        }

        function fixEvent(e) {

            // Required (in at the very least Chrome) to prevent
            // scrolling and panning while attempting to slide.
            // The tap event also depends on this. This doesn't
            // seem to prevent panning in Firefox, which is an issue.
            // Prevent-default will also stop Chrome from setting a text-cursor.
            e.preventDefault();

            // Filter the event to register the type,
            // which can be touch, mouse or pointer. Since noUiSlider 4
            // so longer binds touch OR mouse, but rather touch AND mouse,
            // offset changes need to be made on an event specific basis.
            var touch = e.type.indexOf('touch') === 0,
                mouse = e.type.indexOf('mouse') === 0,
                pointer = e.type.indexOf('pointer') === 0,
                x, y, event = e;

            // IE10 implemented pointer events with a prefix,
            // so we'll needs to check for those, too.
            if (e.type.indexOf('MSPointer') === 0) {
                pointer = true;
            }

            // Get the originalEvent, if the event has been wrapped
            // by jQuery. Zepto doesn't wrap the event.
            if (e.originalEvent) {
                e = e.originalEvent;
            }

            if (touch) {
                // noUiSlider supports one movement at a time, for now.
                // It is therefore safe to select the first 'changedTouch'.
                x = e.changedTouches[0].pageX;
                y = e.changedTouches[0].pageY;
            }
            if (mouse || pointer) {

                // Polyfill the pageXOffset and pageYOffset
                // variables for IE7 and IE8;
                if (!pointer && window.pageXOffset === undefined) {
                    window.pageXOffset = document.documentElement.scrollLeft;
                    window.pageYOffset = document.documentElement.scrollTop;
                }

                x = e.clientX + window.pageXOffset;
                y = e.clientY + window.pageYOffset;
            }

            return $.extend(event, { x: x, y: y });

        }

        // Handler for attaching events trough a proxy
        function attach(events, target, callback, scope, noAbstraction) {

            // Add the noUiSlider namespace to all events.
            events = events.replace(/\s/g, namespace + ' ') + namespace;

            // The 'noAbstraction' argument can be set to prevent
            // event checking, and instead just proxy the event to
            // the right namespace. 'noAbstraction' can be level 1 or 2.
            if (noAbstraction) {
                if (noAbstraction > 1) {
                    scope = $.extend(target, scope);
                }
                return target.on(events, $.proxy(callback, scope));
            }

            // Make the callback available in a lower scope
            scope.handler = callback;

            return target.on(events, $.proxy(function(e) {

                // Test if there is anything that should prevent an event
                // from being handled, such as a disabled state or an active
                // 'tap' transition. Prevent interaction with disabled sliders.
                if (this.target.is('[class*="noUi-state-"], [disabled]')) {
                    return false;
                }

                // Call the event handler with the original event as argument.
                // The handler won't know it has been passed trough this
                // proxy, and it won't have to filter event validity, because
                // that was done here. Since the scope can just be 'this',
                // there is no need to use .call().
                this.handler(fixEvent(e));

            }, scope));
        }

        // Checks whether a variable is numerical.
        function isNumeric(a) {
            return !isNaN(parseFloat(a)) && isFinite(a);
        }

        // jQuery doesn't have a method to return a CSS value as a percentage.
        function getPercentage(a) {
            return parseFloat(this.style[a]);
        }

        function test(o, set) {

            // Checks whether a variable is a candidate to be a
            // valid serialization target.
            function ser(r) {
                return (instance(r) || typeof r === 'string' || r === false);
            }

            //  These tests are structured with an item for every option available.
            //  Every item contains an 'r' flag, which marks a required option, and
            //  a 't' function, which in turn takes some arguments:
            //  - the value for the option
            //  - [optional] a reference to options object
            //  - [optional] the option name
            //  The testing function returns false when an error is detected,
            //  or true when everything is OK. Every test also has an 'init'
            //  method which appends the parent object to all children.

            var TESTS = {
                    /*  Handles.
                     *  Has default, can be 1 or 2.
                     */
                    "handles": {
                        r: true,
                        t: function(q) {
                            q = parseInt(q, 10);
                            return (q === 1 || q === 2);
                        }
                    }
                    /*  Range.
                     *  Must be an array of two numerical floats,
                     *  which can't be identical.
                     */
                    ,
                    "range": {
                        r: true,
                        t: function(q, o, w) {
                            if (q.length !== 2) {
                                return false;
                            }
                            // Reset the array to floats
                            q = [parseFloat(q[0]), parseFloat(q[1])];
                            // Test if those floats are numerical
                            if (!isNumeric(q[0]) || !isNumeric(q[1])) {
                                return false;
                            }
                            // When this test is run for range, the values can't
                            // be identical.
                            if (w === "range" && q[0] === q[1]) {
                                return false;
                            }
                            // The lowest value must really be the lowest value.
                            if (q[1] < q[0]) {
                                return false;
                            }
                            o[w] = q;
                            return true;
                        }
                    }
                    /*  Start.
                     *  Must be an array of two numerical floats when handles = 2;
                     *  Uses 'range' test.
                     *  When handles = 1, a single float is also allowed.
                     */
                    ,
                    "start": {
                        r: true,
                        t: function(q, o, w) {
                            if (o.handles === 1) {
                                if ($.isArray(q)) {
                                    q = q[0];
                                }
                                q = parseFloat(q);
                                o.start = [q];
                                return isNumeric(q);
                            }
                            return this.parent.range.t(q, o, w);
                        }
                    }
                    /*  Connect.
                     *  Must be true or false when handles = 2;
                     *  Can use 'lower' and 'upper' when handles = 1.
                     */
                    ,
                    "connect": {
                        t: function(q, o) {
                            return (q === true ||
                                q === false ||
                                (q === 'lower' && o.handles === 1) ||
                                (q === 'upper' && o.handles === 1));
                        }
                    }
                    /*  Connect.
                     *  Will default to horizontal, not required.
                     */
                    ,
                    "orientation": {
                        t: function(q) {
                            return (q === "horizontal" || q === "vertical");
                        }
                    }
                    /*  Margin.
                     *  Must be a float, has a default value.
                     */
                    ,
                    "margin": {
                        r: true,
                        t: function(q, o, w) {
                            q = parseFloat(q);
                            o[w] = q;
                            return isNumeric(q);
                        }
                    }
                    /*  Serialization.
                     *  Required, but has default. 'resolution' and 'mark' option,
                     *  are allowed to be missing, 'to' isn't. Must be an array
                     *  when using two handles, can be a single value
                     *  when using one handle. 'mark' can only be period (.) or
                     *  comma (,) to make sure the value can be parsed properly.
                     */
                    ,
                    "serialization": {
                        r: true,
                        t: function(q, o) {

                            if (!q.resolution) {
                                o.serialization.resolution = 0.01;
                            } else {
                                switch (q.resolution) {
                                    case 1:
                                    case 0.1:
                                    case 0.01:
                                    case 0.001:
                                    case 0.0001:
                                    case 0.00001:
                                        break;
                                    default:
                                        return false;
                                }
                            }

                            if (!q.mark) {
                                o.serialization.mark = '.';
                            } else {
                                return (q.mark === '.' || q.mark === ',');
                            }

                            if (q.to) {

                                if (o.handles === 1) {
                                    // Wrap the value for one handle into an array.
                                    if (!$.isArray(q.to)) {
                                        q.to = [q.to];
                                    }
                                    // Write back to the options object;
                                    o.serialization.to = q.to;
                                    // Run test for valid serialization target.
                                    return ser(q.to[0]);
                                }
                                return (q.to.length === 2 && ser(q.to[0]) && ser(q.to[1]));

                            }

                            // If no 'to' option is specified,
                            // the serialization option is invalid.
                            return false;

                        }
                    }
                    /*  Slide.
                     *  Not required. Must be a function.
                     */
                    ,
                    "slide": {
                        t: function(q) {
                            return typeof q === "function";
                        }
                    }
                    /*  Set.
                     *  Not required. Must be a function.
                     *  Tested using the 'slide' test.
                     */
                    ,
                    "set": {
                        t: function(q, o) {
                            return this.parent.slide.t(q, o);
                        }
                    }
                    /*  Step.
                     *  Not required. Tested using the 'margin' test.
                     */
                    ,
                    "step": {
                        t: function(q, o, w) {
                            return this.parent.margin.t(q, o, w);
                        }
                    }
                    /*  [init]
                     *  Not an option test. Calling this method will return the
                     *  parent object with some cross references that allow
                     *  crawling the object in an upward direction, which
                     *  normally isn't possible in JavaScript.
                     */
                    ,
                    "init": function() {
                        var obj = this;
                        $.each(obj, function(i, c) {
                            c.parent = obj;
                        });
                        delete this.init;
                        return this;
                    }
                },

                // Prepare a set of tests, by adding some internal reference
                // values not available in native JavaScript object implementation.
                a = TESTS.init();

            // Loop all provided tests;
            // 'v' is the option set, 'i' is the index for the current test.
            $.each(a, function(i, v) {

                // If the value is required but not set,
                // or if the test fails, throw an error.
                if ((v.r && (!o[i] && o[i] !== 0)) || ((o[i] || o[i] === 0) && !v.t(o[i], o, i))) {

                    // For debugging purposes it might be very useful to know
                    // what option caused the trouble. Since throwing an error
                    // will prevent further script execution, log the error
                    // first. Test for console, as it might not be available.
                    if (console && console.log && console.group) {
                        console.group("Invalid noUiSlider initialisation:");
                        console.log("Option:\t", i);
                        console.log("Value:\t", o[i]);
                        console.log("Slider:\t", set[0]);
                        console.groupEnd();
                    }

                    throw new RangeError("noUiSlider");
                }

            });

        }

        function closest(value, to) {
            // Round a value to the closest 'to'.
            // Used with the 'step' option.
            return Math.round(value / to) * to;
        }

        function format(value, target) {

            // Round the value to the resolution that was set
            // with the serialization options.
            value = value.toFixed(target.data('decimals'));

            // Apply the proper decimal mark to the value.
            return value.replace('.', target.data('mark'));

        }

        function setHandle(handle, to, forgive) {

            var nui = handle.data('nui').options
                // Get the array of handles from the base.
                // Will be undefined at initialisation.
                ,
                handles = handle.data('nui').base.data('handles')
                // Get some settings from the handle;
                ,
                style = handle.data('nui').style,
                hLimit;

            // Make sure the value can be parsed.
            // This will catch any potential NaN, even though
            // no internal function calling setHandle should pass
            // invalided parameters.
            if (!isNumeric(to)) {
                return false;
            }

            // Ignore the call if the handle won't move anyway.
            if (to === handle[0].gPct(style)) {
                return false;
            }

            // Limit 'to' to 0 - 100
            to = to < 0 ? 0 : to > 100 ? 100 : to;

            // Handle the step option, or ignore it.
            if (nui.step && !forgive) {
                to = closest(to, percentage.from(nui.range, nui.step));
            }

            // Stop handling this call if the handle won't step to a new value.
            if (to === handle[0].gPct(style)) {
                return false;
            }

            // We're done if this is the only handle,
            // if the handle bounce is trusted to the user
            // or on initialisation when handles isn't defined yet.
            if (handle.siblings('.' + clsList[1]).length && !forgive && handles) {

                // Otherwise, the handle should bounce,
                // and stop at the other handle.
                if (handle.data('nui').number) {
                    hLimit = handles[0][0].gPct(style) + nui.margin;
                    to = to < hLimit ? hLimit : to;
                } else {
                    hLimit = handles[1][0].gPct(style) - nui.margin;
                    to = to > hLimit ? hLimit : to;
                }

                // Stop handling this call if the handle can't move past another.
                if (to === handle[0].gPct(style)) {
                    return false;
                }

            }

            // Fix for the z-index issue where the lower handle gets stuck
            // below the upper one. Since this function is called for every
            // movement, toggleClass cannot be used.
            if (handle.data('nui').number === 0 && to > 95) {
                handle.addClass(clsList[13]);
            } else {
                handle.removeClass(clsList[13]);
            }

            // Set handle to new location
            handle.css(style, to + '%');

            // Write the value to the serialization object.
            handle.data('store').val(
                format(percentage.is(nui.range, to), handle.data('nui').target)
            );

            return true;

        }

        function store(handle, S) {

            var i = handle.data('nui').number,
                scope = {
                    target: handle.data('nui').target,
                    options: handle.data('nui').options,
                    handle: handle,
                    i: i
                };

            if (instance(S.to[i])) {

                // Add a change event to the supplied jQuery object, which
                // will just trigger the 'val' function on the parent. In some
                // cases, the change event will not fire on select elements,
                // so listen to 'blur' too.
                attach('change blur', S.to[i], eventHandlers[0], scope, 2);

                // Triggering the 'set' callback should not occur on the 'blur'
                // event, so bind it only to 'change'.
                attach('change', S.to[i], scope.options.set, scope.target, 1);

                return S.to[i];
            }

            if (typeof S.to[i] === "string") {

                // Append a new object to the noUiSlider base,
                // prevent change events flowing upward.
                return $('<input type="hidden" name="' + S.to[i] + '">')
                    .appendTo(handle)
                    .addClass(clsList[3])
                    .change(eventHandlers[1]);
            }

            if (S.to[i] === false) {

                // Create an object capable of handling all jQuery calls.
                return {
                    // The value will be stored a data on the handle.
                    val: function(a) {
                            // Value function provides a getter and a setter.
                            // Can't just test for !a, as a might be 0.
                            // When no argument is provided, return the value.
                            // Otherwise, set the value.
                            if (a === undefined) {
                                return this.handleElement.data('nui-val');
                            }
                            this.handleElement.data('nui-val', a);
                        }
                        // The object could be mistaken for a jQuery object,
                        // make sure that doesn't trigger any errors.
                        ,
                    hasClass: function() {
                            return false;
                        }
                        // The val function needs access to the handle.
                        ,
                    handleElement: handle
                };
            }
        }

        function move(event) {

            // This function is called often, keep it light.

            var base = this.base,
                style = base.data('style')
                // Subtract the initial movement from the current event,
                // while taking vertical sliders into account.
                ,
                proposal = event.x - this.startEvent.x,
                baseSize = style === 'left' ? base.width() : base.height();

            // This loop prevents a long ternary for the proposal variable.
            if (style === 'top') {
                proposal = event.y - this.startEvent.y;
            }

            proposal = this.position + ((proposal * 100) / baseSize);

            setHandle(this.handle, proposal);

            // Trigger the 'slide' event, pass the target so that it is 'this'.
            call(base.data('options').slide, base.data('target'));

        }

        function end() {

            var base = this.base,
                handle = this.handle;

            // The handle is no longer active, so remove
            // the class.
            handle.children().removeClass(clsList[4]);

            // Unbind move and end events, to prevent
            // them stacking up over and over;
            all.off(actions.move);
            all.off(actions.end);

            // Some text-selection events are bound to the body.
            $('body').off(namespace);

            // Trigger the change event.
            base.data('target').change();

            // Trigger the 'end' callback.
            call(handle.data('nui').options.set, base.data('target'));

        }

        function start(event) {

            var handle = this.handle,
                position = handle[0].gPct(handle.data('nui').style);

            handle.children().addClass(clsList[4]);

            // Attach the move event handler, while
            // passing all relevant information along.
            attach(actions.move, all, move, {
                startEvent: event,
                position: position,
                base: this.base,
                target: this.target,
                handle: handle
            });

            attach(actions.end, all, end, {
                base: this.base,
                target: this.target,
                handle: handle
            });

            // Prevent text selection when dragging the handles.
            // This doesn't prevent the browser defaulting to the I like cursor.
            $('body').on(
                'selectstart' + namespace,
                function() { return false; }
            );
        }

        function selfEnd(event) {

            // Stop propagation so that the tap handler doesn't interfere;
            event.stopPropagation();

            // Trigger the end handler. Supply the current scope,
            // which contains all required information.
            end.call(this);
        }

        function tap(event) {

            // If the target contains an active handle, don't trigger
            // this event. Tapping shouldn't be possible while dragging.
            if (this.base.find('.' + clsList[4]).length) {
                return;
            }

            // Getting variables from the event is not required, but
            // shortens other expressions and is far more convenient;
            var i, handle, hCenter, base = this.base,
                handles = this.handles,
                style = base.data('style'),
                eventXY = event[style === 'left' ? 'x' : 'y'],
                baseSize = style === 'left' ? base.width() : base.height(),
                offset = {
                    handles: [],
                    base: {
                        left: base.offset().left,
                        top: base.offset().top
                    }
                };

            // Loop handles and add data to the offset list.
            for (i = 0; i < handles.length; i++) {
                offset.handles.push({
                    left: handles[i].offset().left,
                    top: handles[i].offset().top
                });
            }

            // Calculate the central point between the handles;
            hCenter = handles.length === 1 ? 0 :
                ((offset.handles[0][style] + offset.handles[1][style]) / 2);

            // If there is just one handle,
            // or the lower handles in closest to the event,
            // select the first handle. Otherwise, pick the second.
            if (handles.length === 1 || eventXY < hCenter) {
                handle = handles[0];
            } else {
                handle = handles[1];
            }

            // Flag the slider as it is now in a transitional state.
            // Transition takes 300 ms, so re-enable the slider afterwards.
            base.addClass(clsList[5]);
            setTimeout(function() {
                base.removeClass(clsList[5]);
            }, 300);

            // Calculate the new position for the handle and
            // trigger the movement.
            setHandle(
                handle, (((eventXY - offset.base[style]) * 100) / baseSize)
            );

            // Trigger the 'slide' and 'set' callbacks,
            // pass the target so that it is 'this'.
            call([handle.data('nui').options.slide, handle.data('nui').options.set], base.data('target'));

            base.data('target').change();

        }

        function create(options) {

            return this.each(function(index, target) {

                // Target is the wrapper that will receive all external
                // scripting interaction. It has no styling and serves no
                // other function.
                target = $(target);
                target.addClass(clsList[6]);

                // Base is the internal main 'bar'.
                var i, style, decimals, handle, base = $('<div/>').appendTo(target),
                    handles = [],
                    cls = {
                        base: stdCls.base,
                        origin: [
                            stdCls.origin.concat([clsList[1] + clsList[7]]), stdCls.origin.concat([clsList[1] + clsList[8]])
                        ],
                        handle: [
                            stdCls.handle.concat([clsList[2] + clsList[7]]), stdCls.handle.concat([clsList[2] + clsList[8]])
                        ]
                    };

                // Set defaults where applicable;
                options = $.extend({
                    handles: 2,
                    margin: 0,
                    orientation: "horizontal"
                }, options) || {};

                // Set a default for serialization;
                if (!options.serialization) {
                    options.serialization = {
                        to: [false, false],
                        resolution: 0.01,
                        mark: '.'
                    };
                }

                // Run all options through a testing mechanism to ensure correct
                // input. The test function will throw errors, so there is
                // no need to capture the result of this call. It should be noted
                // that options might get modified to be handled properly. E.g.
                // wrapping integers in arrays.
                test(options, target);

                // I can't type serialization any more, and it doesn't compress
                // very well, so shorten it.
                options.S = options.serialization;

                // Apply the required connection classes to the elements
                // that need them. Some classes are made up for several segments
                // listed in the class list, to allow easy renaming and provide
                // a minor compression benefit.
                if (options.connect) {

                    if (options.connect === "lower") {
                        // Add some styling classes to the base;
                        cls.base.push(clsList[9], clsList[9] + clsList[7]);
                        // When using the option 'Lower', there is only one
                        // handle, and thus only one origin.
                        cls.origin[0].push(clsList[12]);
                    } else {
                        cls.base.push(clsList[9] + clsList[8], clsList[12]);
                        cls.origin[0].push(clsList[9]);
                    }

                } else {
                    cls.base.push(clsList[12]);
                }

                // Parse the syntactic sugar that is the serialization
                // resolution option to a usable integer.
                style = options.orientation === 'vertical' ? 'top' : 'left';

                decimals = options.S.resolution.toString().split('.');

                // Checking for a string "1", since the resolution needs
                // to be cast to a string to split in on the period.
                decimals = decimals[0] === "1" ? 0 : decimals[1].length;

                // Add classes for horizontal and vertical sliders.
                // The horizontal class is provided for completeness,
                // as it isn't used in the default theme.
                if (options.orientation === "vertical") {
                    cls.base.push(clsList[10]);
                } else {
                    cls.base.push(clsList[11]);
                }

                // Merge base classes with default;
                base.addClass(cls.base.join(" ")).data('target', target);

                // Make data accessible in functions throughout the plugin.
                target.data({
                    base: base,
                    mark: options.S.mark,
                    decimals: decimals
                });

                for (i = 0; i < options.handles; i++) {

                    handle = $('<div><div/></div>').appendTo(base);

                    // Add all default and option-specific classes to the
                    // origins and handles.
                    handle.addClass(cls.origin[i].join(" "));
                    handle.children().addClass(cls.handle[i].join(" "));

                    // These events are only bound to the visual handle element,
                    // not the 'real' origin element.
                    attach(actions.start, handle.children(), start, {
                        base: base,
                        target: target,
                        handle: handle
                    });

                    attach(actions.end, handle.children(), selfEnd, {
                        base: base,
                        target: target,
                        handle: handle
                    });

                    // Make sure every handle has access to all primary
                    // variables. Can't uses jQuery's .data( obj ) structure
                    // here, as 'store' needs some values from the 'nui' object.
                    handle.data('nui', {
                        target: target,
                        decimals: decimals,
                        options: options,
                        base: base,
                        style: style,
                        number: i
                    }).data('store', store(
                        handle, options.S
                    ));

                    // Write a function to the native DOM element, since
                    // jQuery wont let me get the current value in percentages.
                    handle[0].gPct = getPercentage;

                    // Make handles loop-able
                    handles.push(handle);

                    // Set the handle to its initial position;
                    setHandle(handle, percentage.to(options.range, options.start[i]));

                }

                // The base could use the handles too;
                base.data({
                    options: options,
                    handles: handles,
                    style: style
                });

                // Add a reference to the handles on the target as well.
                target.data({
                    handles: handles
                });

                // Attach the the tap event to the slider base.
                attach(actions.end, base, tap, {
                    base: base,
                    target: target,
                    handles: handles
                });

            });

        }

        function getValue() {

            var re = [];

            // Loop the handles, and get the value from the input
            // for every handle on its' own.
            $.each($(this).data('handles'), function(i, handle) {
                re.push(handle.data('store').val());
            });

            // If the slider has just one handle, return a single value.
            // Otherwise, return an array.
            return (re.length === 1 ? re[0] : re);
        }

        function val(args, modifiers) {

            // If the function is called without arguments,
            // act as a 'getter'. Call the getValue function
            // in the same scope as this call.
            if (args === undefined) {
                return getValue.call(this);
            }

            // Passing the modifiers argument is not required.
            // The input might also be 'true', to indicate that the
            // 'set' event should be called.
            modifiers = modifiers === true ? { trigger: true } : (modifiers || {});

            // If the val is to be set to a number, which is valid
            // when using a one-handle slider, wrap it in an array.
            if (!$.isArray(args)) {
                args = [args];
            }

            // Setting is handled properly for each slider in the data set.
            // Note that the val method is called on the target, which can
            // therefore be used in the function.
            return this.each(function(index, target) {

                // Make sure 'target' is a jQuery element.
                target = $(target);

                $.each($(this).data('handles'), function(j, handle) {

                    // The set request might want to ignore this handle.
                    // Test for 'undefined' too, as a two-handle slider
                    // can still be set with an integer.
                    if (args[j] === null || args[j] === undefined) {
                        return;
                    }

                    // Calculate a new position for the handle.
                    var value, current, range = handle.data('nui').options.range,
                        to = args[j],
                        result;

                    // Assume the input can be trusted.
                    modifiers.trusted = true;

                    // Handle user facing input correction. The value is
                    // 'trusted' when a developer provides it from the 'val'
                    // method, not when it comes from an input element.
                    if (modifiers.trusted === false || args.length === 1) {
                        modifiers.trusted = false;
                    }

                    // If one handle isn't set, the other can't move past it.
                    if (args.length === 2 && $.inArray(null, args) >= 0) {
                        modifiers.trusted = false;
                    }

                    // Add support for the comma (,) as a decimal symbol.
                    // Replace it by a period so it is handled properly by
                    // parseFloat. Omitting this would result in a removal
                    // of decimals. This is relevant on trusted input too,
                    // as a developer might input a comma separated string
                    // using the 'val' method.
                    if ($.type(to) === "string") {
                        to = to.replace(',', '.');
                    }

                    // Calculate the new handle position
                    to = percentage.to(range, parseFloat(to));

                    // Set handle to new location, and make sure developer
                    // input is always accepted. The 'trusted' flag indicates
                    // input that is not coming from user facing elements.
                    result = setHandle(handle, to, modifiers.trusted);

                    // The 'val' method allows for an external modifier,
                    // to specify a request for an 'set' event.
                    if (modifiers.trigger) {
                        call(handle.data('nui').options.set, target);
                    }

                    // If the value of the input doesn't match the slider,
                    // reset it.
                    if (!result) {

                        // Get the 'store' object, which can be an input
                        // element or a wrapper around a 'data' call.
                        value = handle.data('store').val();

                        // Get the value for the current position.
                        current = percentage.is(
                            range, handle[0].gPct(handle.data('nui').style)
                        );

                        // Sometimes the input is changed to a value the slider
                        // has rejected. This can occur when using 'select' or
                        // 'input[type="number"]' elements. In this case,
                        // set the value back to the input.
                        if (value !== current) {
                            handle.data('store').val(format(current, target));
                        }
                    }
                });
            });
        }

        // Overwrite the native jQuery 'val' function
        // with a simple handler. noUiSlider will use the internal
        // value method, anything else will use the standard method.
        $.fn.val = function() {
            return this.hasClass(clsList[6]) ?
                val.apply(this, arguments) :
                $VAL.apply(this, arguments);
        };

        return create.call(this, options);

    };

}($));












(function() {


}).call(this);
(function() {
    var ListAdder;

    ListAdder = (function() {
        function ListAdder() {
            this.init_show_link();
            this.init_add_link();
            this.init_remove_link();
        }

        ListAdder.prototype.init_show_link = function() {
            return $('.show_list_adder_link').on('click', function(e) {
                var add_to_existing, adder, form_ele, link, list, object_id, type, _i, _len;
                e.preventDefault();
                type = $(this).attr('data-type');
                object_id = $(this).attr('data-object-id');
                adder = $(this).siblings('.add_to_list_adder').first();
                if (adder.length > 0) {
                    return adder.remove();
                } else {
                    if (user_lists.length > 0) {
                        add_to_existing = "<ul class=\"user_lists\">";
                        for (_i = 0, _len = user_lists.length; _i < _len; _i++) {
                            list = user_lists[_i];
                            link = "<li><a href='#' class='add_to_list_link' data-type='" + type + "' data-object-id='" + object_id + "' data-list-id='" + list.id + "'>Add to <strong>" + list.name + "</strong></a></li>";
                            add_to_existing = add_to_existing + link;
                        }
                        add_to_existing = add_to_existing + "</ul><hr />";
                    } else {
                        add_to_existing = "";
                    }
                    $(this).parent().append("<div class=\"add_to_list_adder\">\n  " + add_to_existing + "\n  Add to a new list:\n  <div>\n    <form accept-charset=\"UTF-8\" id=\"create_list_" + type + "_" + object_id + "\" name=\"create_list\" action=\"/lists\" method=\"post\">\n      <label for=\"name\">Name (required): </label>\n      <input name=\"name\"></input><br/>\n      <label for=\"description\">Description: </label>\n      <textarea name=\"description\"></textarea>\n      <input type=\"submit\" value=\"Save\" />\n    </form>\n  </div>\n</div>");
                    form_ele = $("#create_list_" + type + "_" + object_id);
                    return form_ele.on('submit', function(e) {
                        var description, name;
                        e.preventDefault();
                        name = form_ele.children('input[name=name]').first().val();
                        description = form_ele.children('input[name=description]').first().val();
                        return $.ajax("/lists", {
                            data: {
                                'object_id': object_id,
                                'type': type,
                                'list[name]': name,
                                'list[description]': description
                            },
                            type: 'POST',
                            dataType: 'json',
                            error: function(jqXHR, textStatus, errorThrown) {
                                form_ele.parent().html("<strong>Something went wrong :/</strong>");
                                return console.log("Error: " + textStatus);
                            },
                            success: function(data, textStatus, jqXHR) {
                                return form_ele.parent().html("<strong>Added!</strong>");
                            }
                        });
                    });
                }
            });
        };

        ListAdder.prototype.init_add_link = function() {
            return $('.add_to_list_link').on('click', function(e) {
                var link, list_id, object_id, type;
                e.preventDefault();
                type = $(this).attr('data-type');
                object_id = $(this).attr('data-object-id');
                list_id = $(this).attr('data-list-id');
                link = $(this);
                return $.ajax("/lists/" + list_id, {
                    data: {
                        add: true,
                        object_id: object_id,
                        type: type,
                        _method: 'PATCH'
                    },
                    type: 'POST',
                    dataType: 'json',
                    error: function(jqXHR, textStatus, errorThrown) {
                        link.parent().html("<strong class='add_to_list_link'>Something went wrong :/</strong>");
                        return console.log("Error: " + textStatus);
                    },
                    success: function(data, textStatus, jqXHR) {
                        return link.parent().html("<strong class='add_to_list_link'>Added!</strong>");
                    }
                });
            });
        };

        ListAdder.prototype.init_remove_link = function() {
            return $('.remove_from_list_link').on('click', function(e) {
                var link, list_id, object_id, type;
                e.preventDefault();
                type = $(this).attr('data-type');
                object_id = $(this).attr('data-object-id');
                list_id = $(this).attr('data-list-id');
                link = $(this);
                return $.ajax("/lists/" + list_id, {
                    data: {
                        remove: true,
                        object_id: object_id,
                        type: type,
                        _method: 'PATCH'
                    },
                    type: 'POST',
                    dataType: 'json',
                    error: function(jqXHR, textStatus, errorThrown) {
                        link.parent().html("<strong>Something went wrong :/</strong>");
                        return console.log("Error: " + textStatus);
                    },
                    success: function(data, textStatus, jqXHR) {
                        return link.closest('.concept,.kanji_light_block').first().fadeOut(500, function() {
                            return $(this).remove();
                        });
                    }
                });
            });
        };

        return ListAdder;

    })();

    $(function() {});

}).call(this);
(function() {
    var RadicalSetup, Representations, Searcher, Zen;

    $.fn.log = function() {
        console.log(this);
        return this;
    };

    Searcher = (function() {
        Searcher.search = function(query, live) {
            $('.search').data('live', live);
            $('.search').submit();
            return $('#zen_bar div').html('');
        };

        Searcher.focus = function() {
            var keyword;
            keyword = $('.search .keyword').first();
            keyword.focus();
            if (keyword.select) {
                return keyword.select();
            }
        };

        function Searcher() {
            if ($('#zen_bar').length > 0) {
                $('#zen_bar').addClass('focus');
            } else if ($('#new_discussion').length > 0) {
                $('#discussion_title').focus();
            } else {
                if (!Modernizr.touch || (Modernizr.touch && !((new MobileDetect(window.navigator.userAgent)).mobile()))) {
                    Searcher.focus();
                }
            }
            $('.search-form_clear-button_js').click(function(e) {
                e.preventDefault();
                $('.search .keyword').val("");
                return Searcher.focus();
            });
            $('#search').submit(function(e) {
                var query, token;
                query = $('.search .keyword').val();
                if (query.split(/\s+/).length > 5 || query.length > 50) {
                    $('.search').attr('method', 'POST');
                    token = $('meta[name="csrf-token"]').attr('content');
                    return $(this).prepend("<input type='hidden' name='authenticity_token' value='" + token + "'>");
                } else {
                    e.preventDefault();
                    if ($('#main_results').length > 0 && $('.search').data('live')) {
                        return $.post("/search/" + (encodeURIComponent(query)), function(data) {
                            $('#main_results').replaceWith(data);
                            return window.history.pushState('', '', "/search/" + (encodeURIComponent(query)));
                        });
                    } else {
                        return window.location = "" + location.protocol + "//" + location.host + "/search/" + (encodeURIComponent(query));
                    }
                }
            });
        }

        return Searcher;

    })();

    Zen = (function() {
        function Zen() {
            $('#zen_bar a').on('click', function(e) {
                var query;
                e.preventDefault();
                $('#zen_bar .current').each(function() {
                    return $(this).removeClass('current');
                });
                $(this).addClass('current');
                query = $(this).attr('data-word');
                return $.post("/search/\"" + (encodeURIComponent(query)) + "\"?zen=true", function(data) {
                    return $('#main_results').replaceWith(data);
                });
            });
            $('.search .keyword').bind('focus', function(e) {
                return $('#zen_bar').removeClass('focus');
            });
            $('#zen_bar').bind('click', function(e) {
                return $('#zen_bar').addClass('focus');
            });
            $('.search .keyword').keydown(function(e) {
                if (9 === e.keyCode && $('#ime:visible').length < 1) {
                    e.preventDefault();
                    $('#zen_bar').click();
                    return $('.search .keyword').blur();
                }
            });
            $(document).keydown(function(e) {
                if ($('#zen_bar').hasClass('focus')) {
                    switch (e.keyCode) {
                        case 37:
                        case 72:
                        case 65:
                            return $('.current').closest('li').prevAll().children('a').first().click();
                        case 39:
                        case 76:
                        case 68:
                            return $('.current').closest('li').nextAll().children('a').first().click();
                    }
                }
            });
        }

        return Zen;

    })();

    RadicalSetup = (function() {
        function RadicalSetup() {
            this.initialized = false;
            $('#kanji_container a').on('click', function(e) {
                e.preventDefault();
                Searcher.search($(this).text(), true);
                return $('#radical_search').remove();
            });
            $(document.body).click(function() {
                return $('#radical_search').remove();
            });
        }

        return RadicalSetup;

    })();

    Representations = (function() {
        function Representations() {
            $(document).on('mouseenter', '.representations .all .representation', function(event) {
                var el, primary;
                el = $(this);
                primary = el.parents('.representations').find('.primary .representation');
                el.siblings().removeClass('active');
                el.addClass('active');
                return primary.html(el.html());
            });
            $(document).on('mouseleave', '.representations', function(event) {
                return $(this).find('.all .representation:first').mouseenter();
            });
            $(document).on('click', '.representations .all a', function(event) {
                return event.preventDefault();
            });
        }

        return Representations;

    })();

    $(document).ready(function() {
        new Searcher;
        new Search($('#search'));
        new Zen;
        new RadicalSetup;
        new Representations;
        return $('[title]').tooltip();
    });

}).call(this);

(function($) {

    $.fn.smartRange = function(options) {
        var input, caret, range, hidden;

        input = this;
        options = options || {};
        range = options.range || input.siblings('.range:first');
        hidden = options.hidden || false;

        function onBlur() {
            caret = input.caret();
            updateRange();
        }

        function onInteracted() {
            caret = input.caret();
            input.trigger('caret_changed');
            range.hide();
        }

        function setRangeHidden() {
            hidden = true;
            range.hide();
        }

        function setRangeVisible() {
            hidden = false;
            updateRange();
        }

        function setupRange() {
            range.css({
                'font-size': input.css('font-size'),
                'font-weight': input.css('font-weight')
            });
            caret = input.caret();
        }

        function updateRange() {
            var val, wrapped;
            if (caret.start === caret.end || hidden) {
                range.hide();
            } else {
                val = input.val();
                range.toggle(caret.start !== caret.end);
                html = val.split('').map(function(l, i) {
                    var classAttr, selected;
                    selected = i >= caret.start && i < caret.end;
                    classAttr = selected ? 'selected character' : 'character';
                    return '<span class="' + classAttr + '"><span class="text">' + l + '</span></span>';
                }).join('');
                range.html(html).show();
            }
        }

        function insert(str, select) {
            var text = caret.replace(str);
            caret.end = caret.start + str.length;
            if (!select) {
                caret.start = caret.end;
            }
            input.val(text);
            if (input.is(':focus')) {
                input.caret(caret);
            }
            updateRange();
        }

        function deselect() {
            if (caret.start !== caret.end) {
                caret.start = caret.end;
                updateRange();
            }
        }

        function selectAll() {
            caret.start = 0;
            caret.end = input.val().length;
            updateRange();
        }

        input.on('blur', onBlur);
        input.on('click keyup', onInteracted);

        setupRange();

        return {
            insert: insert,
            show: setRangeVisible,
            hide: setRangeHidden,
            deselect: deselect,
            selectAll: selectAll
        };
    }

})(jQuery);

/*
 *  Smart Resize
 *
 *  Mobile Safari bundled with iOS as of v6.1.3 fires an extra window resize
 *  event after scrolling the page *if* there are position: fixed elements in
 *  the page. This very simple plugin will prevent those events from being
 *  fired and also forward orientationchange events. This plugin should only
 *  be required if you are using position: fixed elements.
 *
 */

(function($) {

    $.fn.smartResize = function(handler) {

        this.on('resize', function name() {
            if (Modernizr.touch) return;
            handler.apply(this, arguments);
        });

        this.on('orientationchange', function name() {
            handler.apply(this, arguments);
        });

    }

})(jQuery);

(function($) {


    // Elements must all be the same dimensions

    var DEFAULT_SCALE = 3;
    var DEFAULT_TIME_TO_DISAPPEAR = 100;
    var DEFAULT_TOP_OFFSET = -80;
    var DEFAULT_HOVER_CLASS_NAME = 'touch-hover';

    var transformProperty;

    function getTransformProperty() {
        ['transform', 'webkitTransform'].forEach(function(prop) {
            if (document.body.style[prop] !== undefined) {
                transformProperty = prop;
            }
        });
    }

    $.fn.touchZoomGrid = function(options) {

        // The grid
        var grid;
        // Elements
        var elements, gridElement, currentHover, closestOffsetHidden;
        // Dimensions
        var elementWidth, elementHeight, gridLeftOffset, gridTopOffset, gridRightEdge, elementProtrusion;
        // Options
        var scale, offsetTop, canceled;

        options = options || {};

        elements = this.find(options.selector || '*');
        gridElement = this;

        gridRightEdge = 0;
        scale = options.scale || DEFAULT_SCALE;
        offsetTop = options.offsetTop || DEFAULT_TOP_OFFSET;

        function getTouches(evt) {
            return evt.originalEvent.touches;
        }

        function setTransform(el, offsetX, offsetY) {
            var transform = 'translate(' + offsetX + 'px, ' + offsetY + 'px) scale(' + scale + ')';
            el.css(transformProperty, transform);
        }

        function setClosestOffsetHidden() {
            var el = gridElement;
            do {
                el = el.parent();
            } while (el[0] !== document.body && el.css('overflow') !== 'hidden');
            closestOffsetHidden = el.offset().top;
        }

        function constrainHorizontalToGrid(x) {
            var gridLeftProtrusion, gridRightProtrusion, offsetX = 0;
            gridLeftProtrusion = x - elementProtrusion;
            gridRightProtrusion = gridRightEdge - x - elementWidth - elementProtrusion;

            if (gridLeftProtrusion < 0) {
                offsetX -= gridLeftProtrusion;
            } else if (gridRightProtrusion < 0) {
                offsetX += gridRightProtrusion;
            }
            return offsetX;
        }

        function constrainVertical(y) {
            var verticalSpace, offsetY = offsetTop;
            verticalSpace = gridTopOffset + y - Math.max(closestOffsetHidden, window.pageYOffset);
            if (verticalSpace + offsetY - elementProtrusion < 0) {
                offsetY *= -1;
            }
            return offsetY;
        }

        function hoverOn(el, gridX, gridY) {
            var x, y;
            x = constrainHorizontalToGrid(gridX * elementWidth);
            y = constrainVertical(gridY * elementHeight);
            setTransform(el, x, y, scale);
            el.addClass(DEFAULT_HOVER_CLASS_NAME);
        }

        function currentHoverOff() {
            if (currentHover) {
                currentHover.removeClass(DEFAULT_HOVER_CLASS_NAME);
                currentHover.css(transformProperty, 'none');
                currentHover = null;
            }
        }

        function buildGrid() {
            var offset;
            grid = {};
            offset = gridElement.offset();
            gridLeftOffset = offset.left;
            gridTopOffset = offset.top;
            setClosestOffsetHidden();
            elements.each(function() {
                var el, height, width, offset, x, y;
                el = $(this);
                height = el.outerHeight(true);
                width = el.outerWidth(true);
                offset = el.offset();
                x = Math.floor((offset.left - gridLeftOffset) / width);
                y = Math.floor((offset.top - gridTopOffset) / height);
                grid[x + ',' + y] = el;
                elementWidth = width;
                elementHeight = height;
                gridRightEdge = Math.max(gridRightEdge, (x * elementWidth) + elementWidth);
            });
            elementProtrusion = (elementWidth / 2) * (scale - 1);
        }

        function setElementHover(evt, touches) {
            var touches, touch, gridX, gridY, el;

            if (canceled) {
                return;
            }

            if (touches.length > 1) {
                currentHoverOff();
                canceled = true;
                return;
            }

            touch = touches[0];
            gridX = Math.floor((touch.pageX - gridLeftOffset) / elementWidth);
            gridY = Math.floor((touch.pageY - gridTopOffset) / elementHeight);
            el = grid[gridX + ',' + gridY];

            if (el && el != currentHover) {
                currentHoverOff();
                hoverOn(el, gridX, gridY, touch.pageX, touch.pageY);
                currentHover = el;
            }

            evt.preventDefault();
        }

        gridElement.on('touchstart', function(evt) {
            var touches = getTouches(evt);
            if (touches.length > 1) {
                currentHoverOff();
            } else {
                canceled = false;
                setElementHover(evt, touches);
            }
        });
        gridElement.on('touchmove', function(evt) {
            setElementHover(evt, getTouches(evt));
        });
        gridElement.on('touchend', function(evt) {
            if (currentHover) {
                currentHover.click();
                setTimeout(function() {
                    currentHoverOff();
                }, DEFAULT_TIME_TO_DISAPPEAR);
            }
        });

        $(window).smartResize(buildGrid);
        buildGrid();

    }

    getTransformProperty();


})(jQuery);

var CanvasPaint = Class(function CanvasPaint() {});

CanvasPaint.prototype.extend(Event.Listener);
CanvasPaint.prototype.extend({

    setOffset: function(x, y) {
        var rect = this.canvas.getBoundingClientRect();
        this.startX = rect.left;
        this.startY = rect.top;
    },

    getEventCoordinates: function(evt) {
        var pos = {};
        evt.preventDefault();
        if (evt.targetTouches && evt.targetTouches[0]) {
            pos.x = evt.targetTouches[0]['clientX'];
            pos.y = evt.targetTouches[0]['clientY'];
        } else if (evt.changedTouches && evt.changedTouches[0]) {
            pos.x = evt.changedTouches[0]['clientX'];
            pos.y = evt.changedTouches[0]['clientY'];
        } else {
            pos.x = evt.clientX;
            pos.y = evt.clientY;
        }
        pos.x -= this.startX;
        pos.y -= this.startY;
        return pos;
    },

    onStart: function(evt) {
        if (this.isMultiTouch(evt)) return;
        this.down = true;
        this.setOffset();
        this.broadcast('BeforePaintStart');
        this.broadcast('PaintStart', this.getEventCoordinates(evt));
    },

    onStop: function(evt) {
        if (!this.down || this.isMultiTouch(evt)) return;
        this.broadcast('PaintStop', this.getEventCoordinates(evt));
        this.down = false;
    },

    onMove: function(evt) {
        if (!this.down || this.isMultiTouch(evt)) return;
        evt.preventDefault();
        this.broadcast('Paint', this.getEventCoordinates(evt));
    },

    isMultiTouch: function(evt) {
        return evt.targetTouches && evt.targetTouches.length > 1;
    },

    setupPaintEvents: function() {
        if (Modernizr.touch) {
            this.canvas.addEventListener('touchstart', this.onStart.bind(this), false);
            this.canvas.addEventListener('touchend', this.onStop.bind(this), false);
            this.canvas.addEventListener('touchcancel', this.onStop.bind(this), false);
            this.canvas.addEventListener('touchmove', this.onMove.bind(this), false);
        } else {
            this.canvas.addEventListener('mousedown', this.onStart.bind(this), false);
            this.canvas.addEventListener('mouseup', this.onStop.bind(this), false);
            this.canvas.addEventListener('mouseout', this.onStop.bind(this), false);
            this.canvas.addEventListener('mousemove', this.onMove.bind(this), false);
        }
    }

});


KanjiSexp = {

    toSexp: function() {
        return this.getSexpExpression('character', [
            this.getSexpExpression('width', this.width),
            this.getSexpExpression('height', this.height),
            this.getSexpExpression('strokes', this.getSexpStrokes())
        ]);
    },

    getSexpStrokes: function() {
        return this.strokes.map(this.getSexpStroke, this);
    },

    getSexpStroke: function(stroke) {
        return this.getSexpExpression('', this.getSexpPoints(stroke))
    },

    getSexpPoints: function(stroke) {
        return stroke.points.map(this.getSexpPoint, this);
    },

    getSexpPoint: function(point) {
        var ratio = this.pixelRatio || 1;
        return this.getSexpExpression('', (point.x * ratio | 0) + ' ' + (point.y * ratio | 0));
    },

    getSexpExpression: function(name, value) {
        if (Array.isArray(value)) {
            value = value.join(' ');
        }
        return '(' + name + (name ? ' ' : '') + value + ')';
    }

};

// Requires jQuery and Modernizr

var KanjiHandwriting = Class(function KanjiHandwriting(el) {
    this.setupCanvas(el);
    this.setupPaintEvents();
    this.strokes = [];
    this.listener(this); // Listens to own paint events
    this.ratio = this.width / this.height;
    this.scale = this.pixelRatio;
    this.lineWidth = 4 * this.scale;
});

KanjiHandwriting.mixin(CanvasPaint);
KanjiHandwriting.mixin(Canvas);
KanjiHandwriting.prototype.extend(KanjiSexp);

KanjiHandwriting.prototype.extend({

    reset: function() {
        this.clear();
        this.strokes = [];
        this.broadcast('Reset');
    },

    back: function() {
        this.strokes.pop();
        this.draw();
    },

    draw: function() {
        this.clear();
        this.strokes.forEach(function(s) {
            s.drawLine();
        });
    },

    resizeToWidth: function(w) {
        var ratio = w / this.width;
        if (ratio === 1) return;
        this.strokes.forEach(function(s) {
            s.scale = ratio * this.scale;
            s.rescale();
        }, this);
        this.setDimensions(w, Math.floor(w / this.ratio));
        this.draw();
    },

    dimLastStroke: function() {
        if (!this.currentStroke) return;
        this.currentStroke.style = new LineStyle(this.lineWidth + 'px #aaa');
    },

    onPaintStart: function(pos) {
        var stroke = new KanjiStroke({
            scale: this.scale,
            style: new LineStyle(this.lineWidth + 'px #000'),
            context: this.context
        });
        stroke.addPoint(new Point(pos.x, pos.y));
        this.currentStroke = stroke;
        this.strokes.push(stroke);
        this.broadcast('StrokeStart');
    },

    onPaint: function(pos) {
        this.currentStroke.addPoint(new Point(pos.x, pos.y));
        this.draw();
    },

    onPaintStop: function(pos) {
        this.currentStroke.addPoint(new Point(pos.x, pos.y));
        this.smoothPoints();
        this.dimLastStroke();
        this.draw();
        this.broadcast('StrokeEnd');
    },

    smoothPoints: function() {
        this.strokes.forEach(function(s) {
            s.smoothPoints();
        });
    }

});

(function() {
    var __bind = function(fn, me) { return function() { return fn.apply(me, arguments); }; };

    this.Search = (function() {
        function Search(el) {
            this.turnOffArea = __bind(this.turnOffArea, this);
            this.turnOnArea = __bind(this.turnOnArea, this);
            this.deactivateCurrentArea = __bind(this.deactivateCurrentArea, this);
            this.form = el;
            this.keyword = el.find('.keyword');
            this.mainArea = el.find('.main');
            this.subArea = el.find('.sub');
            this.canSelectAll = true;
            this.range = this.keyword.smartRange({
                hidden: true
            });
            this.setupEvents();
            this.setupComponents();
            this.checkInputLink();
        }

        Search.prototype.setupComponents = function() {
            this.radicalInput = new RadicalInput;
            this.handwritingInput = new HandwritingInput;
            this.speechInput = new SpeechInput;
            this.filters = new Filters;
            return this.advancedOptions = new SearchArea('advanced');
        };

        Search.prototype.setupEvents = function() {
            $(window).smartResize(this.recalculateDimensions.debounce(250).bind(this));
            this.form.on('character_chosen', (function(_this) {
                return function(event, character) {
                    return _this.range.insert(character);
                };
            })(this));
            this.form.on('candidate_chosen', (function(_this) {
                return function(event, character) {
                    return _this.range.insert(character, true);
                };
            })(this));
            this.form.on('candidate_confirmed', (function(_this) {
                return function(event) {
                    return _this.range.deselect();
                };
            })(this));
            this.form.on('candidate_removed', (function(_this) {
                return function(event) {
                    return _this.range.insert('');
                };
            })(this));
            this.form.on('speech_confirmed', (function(_this) {
                return function(event, text) {
                    return _this.range.insert(text, true);
                };
            })(this));
            this.form.on('speech_submitted', (function(_this) {
                return function(event, text) {
                    _this.range.insert(text, true);
                    return _this.form.submit();
                };
            })(this));
            this.form.on('speech_result_added show_more show_less results_changed', (function(_this) {
                return function(event) {
                    return _this.setAreaHeight();
                };
            })(this));
            this.form.on('area_activated', this.turnOnArea);
            this.form.on('area_deactivated', this.turnOffArea);
            this.form.on('area_will_activate', this.deactivateCurrentArea);
            return this.keyword.on('caret_changed', (function(_this) {
                return function() {
                    _this.handwritingInput.clearCandidate();
                    return _this.canSelectAll = false;
                };
            })(this));
        };

        Search.prototype.deactivateCurrentArea = function() {
            if (this.currentArea) {
                return this.currentArea.deactivate(true);
            }
        };

        Search.prototype.turnOnRange = function() {
            if (this.canSelectAll) {
                this.range.selectAll();
            }
            return this.range.show();
        };

        Search.prototype.turnOnArea = function(event, area) {
            this.currentArea = area;
            this.turnOnRange();
            this.mainArea.addClass('in');
            return this.setAreaHeight();
        };

        Search.prototype.turnOffArea = function(event, area) {
            this.currentArea = null;
            this.mainArea.removeClass('in');
            this.range.hide();
            return this.setAreaHeight();
        };

        Search.prototype.setAreaHeight = function() {
            if (this.currentArea) {
                return this.subArea.height(this.currentArea.area.outerHeight());
            } else {
                return this.subArea.height(0);
            }
        };

        Search.prototype.recalculateDimensions = function() {
            this.handwritingInput.calculateDimensions();
            this.radicalInput.setHeight();
            return this.setAreaHeight();
        };

        Search.prototype.checkInputLink = function() {
            var input_type;
            input_type = window.location.hash;
            if (input_type == null) {
                input_type = "#" + (Object.getURLParam('input'));
            }
            switch (input_type) {
                case '#radical':
                    return this.radicalInput.activate();
                case '#handwriting':
                    return this.handwritingInput.activate();
                case '#speech':
                    return this.speechInput.activate();
            }
        };

        return Search;

    })();

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
var strokeOrderDiagram = function(element, svgDocument) {
    var s = Snap(element);
    var diagramSize = 200;
    var coordRe = '(?:\\d+(?:\\.\\d+)?)';
    var strokeRe = new RegExp('^[LMT]\\s*(' + coordRe + ')[,\\s](' + coordRe + ')', 'i');
    var f = Snap(svgDocument.getElementsByTagName('svg')[0]);
    var allPaths = f.selectAll("path");
    var drawnPaths = [];
    var canvasWidth = (allPaths.length * diagramSize) / 2;
    var canvasHeight = diagramSize / 2;
    var frameSize = diagramSize / 2;
    var frameOffsetMatrix = new Snap.Matrix()
    frameOffsetMatrix.translate((-frameSize / 16) + 2, (-frameSize / 16) + 2);

    // Set drawing area
    s.node.style.width = canvasWidth + "px";
    s.node.style.height = canvasHeight + "px";
    s.node.setAttribute("viewBox", "0 0 " + canvasWidth + " " + canvasHeight);

    // Draw global guides
    var boundingBoxTop = s.line(1, 1, canvasWidth - 1, 1);
    var boundingBoxLeft = s.line(1, 1, 1, canvasHeight - 1);
    var boundingBoxBottom = s.line(1, canvasHeight - 1, canvasWidth - 1, canvasHeight - 1);
    var horizontalGuide = s.line(0, canvasHeight / 2, canvasWidth, canvasHeight / 2);
    boundingBoxTop.attr({ "class": "stroke_order_diagram--bounding_box" });
    boundingBoxLeft.attr({ "class": "stroke_order_diagram--bounding_box" });
    boundingBoxBottom.attr({ "class": "stroke_order_diagram--bounding_box" });
    horizontalGuide.attr({ "class": "stroke_order_diagram--guide_line" });

    // Draw strokes
    var pathNumber = 1;
    allPaths.forEach(function(currentPath) {
        var moveFrameMatrix = new Snap.Matrix()
        moveFrameMatrix.translate((frameSize * (pathNumber - 1)) - 4, -4);

        // Draw frame guides
        var verticalGuide = s.line((frameSize * pathNumber) - (frameSize / 2), 1, (frameSize * pathNumber) - (frameSize / 2), canvasHeight - 1);
        var frameBoxRight = s.line((frameSize * pathNumber) - 1, 1, (frameSize * pathNumber) - 1, canvasHeight - 1);
        verticalGuide.attr({ "class": "stroke_order_diagram--guide_line" });
        frameBoxRight.attr({ "class": "stroke_order_diagram--bounding_box" });

        // Draw previous strokes
        drawnPaths.forEach(function(existingPath) {
            var localPath = existingPath.clone();
            localPath.transform(moveFrameMatrix);
            localPath.attr({ "class": "stroke_order_diagram--existing_path" })
            s.append(localPath);
        });

        // Draw current stroke
        currentPath.transform(frameOffsetMatrix);
        currentPath.transform(moveFrameMatrix);
        currentPath.attr({ "class": "stroke_order_diagram--current_path" })
        s.append(currentPath);

        // Draw stroke start point
        var match = strokeRe.exec(currentPath.node.getAttribute('d'));
        var pathStartX = match[1];
        var pathStartY = match[2];
        var strokeStart = s.circle(pathStartX, pathStartY, 4);
        strokeStart.attr({ "class": "stroke_order_diagram--path_start" });
        strokeStart.transform(moveFrameMatrix);

        pathNumber++;
        drawnPaths.push(currentPath.clone());
    });
};
(function() {


}).call(this);
// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//




















$(document).foundation();