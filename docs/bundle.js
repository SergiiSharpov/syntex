!(function(n) {
    let e = {}; function s(a) {
        if(e[a]) {
            return e[a].exports;
        }let t = e[a] = {i: a,
            l: !1,
            exports: {}};

        return n[a].call(t.exports, t, t.exports, s), t.l = !0, t.exports;
    }s.m = n, s.c = e, s.d = function(n, e, a) {
        s.o(n, e) || Object.defineProperty(n, e, {enumerable: !0,
            get: a});
    }, s.r = function(n) {
        typeof Symbol !== "undefined" && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(n, "__esModule", {value: !0});
    }, s.t = function(n, e) {
        if(1 & e && (n = s(n)), 8 & e) {
            return n;
        }if(4 & e && typeof n === "object" && n && n.__esModule) {
            return n;
        }let a = Object.create(null); if(s.r(a), Object.defineProperty(a, "default", {enumerable: !0,
            value: n}), 2 & e && typeof n !== "string") {
            for(let t in n) {
                s.d(a, t, ((e) => {
                    return n[e];
                }).bind(null, t));
            }
        }

        return a;
    }, s.n = function(n) {
        let e = n && n.__esModule ? function() {
            return n.default;
        } : function() {
            return n;
        };

        return s.d(e, "a", e), e;
    }, s.o = function(n, e) {
        return Object.prototype.hasOwnProperty.call(n, e);
    }, s.p = "", s(s.s = 36);
}([
    function(n, e, s) {
        (function(e) {
            let s = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {},
                a = (function() {
                    var n = /\blang(?:uage)?-([\w-]+)\b/i,
                        e = 0,
                        a = s.Prism = {manual: s.Prism && s.Prism.manual,
                            disableWorkerMessageHandler: s.Prism && s.Prism.disableWorkerMessageHandler,
                            util: {encode(n) {
                                return n instanceof t ? new t(n.type, a.util.encode(n.content), n.alias) : a.util.type(n) === "Array" ? n.map(a.util.encode) : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").
                                    replace(/\u00a0/g, " ");
                            },
                                type: function(n) {
                                return Object.prototype.toString.call(n).match(/\[object (\w+)\]/)[1];
                            },
                                objId: function(n) {
                                return n.__id || Object.defineProperty(n, "__id", {value: ++e}), n.__id;
                            },
                            clone: function(n, e) {
                                    let s = a.util.type(n); switch(e = e || {}, s) {
                                case"Object": if(e[a.util.objId(n)]) {
                                        return e[a.util.objId(n)];
                                    }var t = {}; for(let r in e[a.util.objId(n)] = t, n) {
                                    n.hasOwnProperty(r) && (t[r] = a.util.clone(n[r], e));
                                }

                                    return t; case"Array": if(e[a.util.objId(n)]) {
                                            return e[a.util.objId(n)];
                                        }t = [];

                                    return e[a.util.objId(n)] = t, n.forEach((n, s) => {
                                            t[s] = a.util.clone(n, e);
                                        }), t;
                                }

                                    return n;
                                }},
                            languages: {extend(n, e) {
                                let s = a.util.clone(a.languages[n]); for(let t in e) {
                                    s[t] = e[t];
                                }

                                return s;
                            },
                            insertBefore: function(n, e, s, t) {
                                    var r = (t = t || a.languages)[n]; if(arguments.length == 2) {
                                    for(var o in s = arguments[1]) {
                                            s.hasOwnProperty(o) && (r[o] = s[o]);
                                        }

                                    return r;
                                }let p = {}; for(let l in r) {
                                        if(r.hasOwnProperty(l)) {
                                        if(l == e) {
                                                for(var o in s) {
                                                s.hasOwnProperty(o) && (p[o] = s[o]);
                                            }
                                            }p[l] = r[l];
                                    }
                                    }

                                    return a.languages.DFS(a.languages, function(e, s) {
                                    s === t[n] && e != n && (this[e] = p);
                                }), t[n] = p;
                                },
                            DFS: function(n, e, s, t) {
                                    for(let r in t = t || {}, n) {
                                    n.hasOwnProperty(r) && (e.call(n, r, n[r], s || r), a.util.type(n[r]) !== "Object" || t[a.util.objId(n[r])] ? a.util.type(n[r]) !== "Array" || t[a.util.objId(n[r])] || (t[a.util.objId(n[r])] = !0, a.languages.DFS(n[r], e, r, t)) : (t[a.util.objId(n[r])] = !0, a.languages.DFS(n[r], e, null, t)));
                                }
                                }},
                            plugins: {},
                            highlightAll(n, e) {
                                a.highlightAllUnder(document, n, e);
                            },
                            highlightAllUnder(n, e, s) {
                                let t = {callback: s,
                                    selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'}; a.hooks.run("before-highlightall", t); for(var r, o = t.elements || n.querySelectorAll(t.selector), p = 0; r = o[p++];) {
                                        a.highlightElement(r, !0 === e, t.callback);
                                    }
                            },
                            highlightElement(e, t, r) {
                                for(var o, p, l = e; l && !n.test(l.className);) {
                                    l = l.parentNode;
                                }l && (o = (l.className.match(n) || [, ""])[1].toLowerCase(), p = a.languages[o]), e.className = `${e.className.replace(n, "").replace(/\s+/g, " ")} language-${o}`, e.parentNode && (l = e.parentNode, (/pre/i).test(l.nodeName) && (l.className = `${l.className.replace(n, "").replace(/\s+/g, " ")} language-${o}`)); let i = {element: e,
                                    language: o,
                                    grammar: p,
                                    code: e.textContent}; if(a.hooks.run("before-sanity-check", i), !i.code || !i.grammar) {
                                        return i.code && (a.hooks.run("before-highlight", i), i.element.textContent = i.code, a.hooks.run("after-highlight", i)), void a.hooks.run("complete", i);
                                }if(a.hooks.run("before-highlight", i), t && s.Worker) {
                                        var c = new Worker(a.filename); c.onmessage = function(n) {
                                        i.highlightedCode = n.data, a.hooks.run("before-insert", i), i.element.innerHTML = i.highlightedCode, r && r.call(i.element), a.hooks.run("after-highlight", i), a.hooks.run("complete", i);
                                    }, c.postMessage(JSON.stringify({language: i.language,
                                            code: i.code,
                                            immediateClose: !0}));
                                    }else {
                                        i.highlightedCode = a.highlight(i.code, i.grammar, i.language), a.hooks.run("before-insert", i), i.element.innerHTML = i.highlightedCode, r && r.call(e), a.hooks.run("after-highlight", i), a.hooks.run("complete", i);
                                    }
                            },
                            highlight(n, e, s) {
                                let r = {code: n,
                                    grammar: e,
                                    language: s};

                                return a.hooks.run("before-tokenize", r), r.tokens = a.tokenize(r.code, r.grammar), a.hooks.run("after-tokenize", r), t.stringify(a.util.encode(r.tokens), r.language);
                            },
                            matchGrammar(n, e, s, t, r, o, p) {
                                let l = a.Token; for(let i in s) {
                                    if(s.hasOwnProperty(i) && s[i]) {
                                        if(i == p) {
                                            return;
                                        }let c = s[i]; c = a.util.type(c) === "Array" ? c : [c]; for(let d = 0; d < c.length; ++d) {
                                            let u = c[d],
                                                f = u.inside,
                                                h = Boolean(u.lookbehind),
                                                b = Boolean(u.greedy),
                                                g = 0,
                                                m = u.alias; if(b && !u.pattern.global) {
                                                    let y = u.pattern.toString().match(/[imuy]*$/)[0]; u.pattern = RegExp(u.pattern.source, `${y}g`);
                                                }u = u.pattern || u; for(let k = t, v = r; k < e.length; v += e[k].length, ++k) {
                                                var x = e[k]; if(e.length > n.length) {
                                                        return;
                                                    }if(!(x instanceof l)) {
                                                    if(b && k != e.length - 1) {
                                                            if(u.lastIndex = v, !(E = u.exec(n))) {
                                                            break;
                                                        }for(var S = E.index + (h ? E[1].length : 0), T = E.index + E[0].length, N = k, w = v, A = e.length; N < A && (w < T || !e[N].type && !e[N - 1].greedy); ++N) {
                                                                S >= (w += e[N].length) && (++k, v = w);
                                                            }if(e[k] instanceof l) {
                                                            continue;
                                                        }M = N - k, x = n.slice(v, w), E.index -= v;
                                                        }else{
                                                            u.lastIndex = 0; var E = u.exec(x),
                                                            M = 1;
                                                        }if(E) {
                                                        h && (g = E[1] ? E[1].length : 0); T = (S = E.index + g) + (E = E[0].slice(g)).length; let j = x.slice(0, S),
                                                                O = x.slice(T),
                                                                _ = [k, M]; j && (++k, v += j.length, _.push(j)); let I = new l(i, f ? a.tokenize(E, f) : E, m, E, b); if(_.push(I), O && _.push(O), Array.prototype.splice.apply(e, _), M != 1 && a.matchGrammar(n, e, s, k, v, !0, i), o) {
                                                            break;
                                                        }
                                                    }else if(o) {
                                                            break;
                                                        }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            tokenize(n, e, s) {
                                let t = [n],
                                    r = e.rest; if(r) {
                                        for(let o in r) {
                                        e[o] = r[o];
                                    }delete e.rest;
                                    }

                                return a.matchGrammar(n, t, e, 0, 0, !1), t;
                            },
                            hooks: {all: {},
                                add(n, e) {
                                    let s = a.hooks.all; s[n] = s[n] || [], s[n].push(e);
                                },
                                run(n, e) {
                                    let s = a.hooks.all[n]; if(s && s.length) {
                                        for(var t, r = 0; t = s[r++];) {
                                            t(e);
                                        }
                                    }
                                }}},
                        t = a.Token = function(n, e, s, a, t) {
                            this.type = n, this.content = e, this.alias = s, this.length = 0 | (a || "").length, this.greedy = Boolean(t);
                        }; if(t.stringify = function(n, e, s) {
                            if(typeof n === "string") {
                            return n;
                        }if(a.util.type(n) === "Array") {
                                return n.map((s) => {
                                return t.stringify(s, e, n);
                            }).join("");
                            }let r = {type: n.type,
                            content: t.stringify(n.content, e, s),
                            tag: "span",
                            classes: ["token", n.type],
                            attributes: {},
                            language: e,
                            parent: s}; if(n.alias) {
                                    let o = a.util.type(n.alias) === "Array" ? n.alias : [n.alias]; Array.prototype.push.apply(r.classes, o);
                        }a.hooks.run("wrap", r); let p = Object.keys(r.attributes).map((n) => {
                                return `${n}="${(r.attributes[n] || "").replace(/"/g, "&quot;")}"`;
                            }).
                            join(" ");

                            return`<${r.tag} class="${r.classes.join(" ")}"${p ? ` ${p}` : ""}>${r.content}</${r.tag}>`;
                    }, !s.document) {
                        return s.addEventListener ? (a.disableWorkerMessageHandler || s.addEventListener("message", (n) => {
                                let e = JSON.parse(n.data),
                                t = e.language,
                                r = e.code,
                                o = e.immediateClose; s.postMessage(a.highlight(r, a.languages[t], t)), o && s.close();
                            }, !1), s.Prism) : s.Prism;
                        }let r = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

                    return r && (a.filename = r.src, a.manual || r.hasAttribute("data-manual") || (document.readyState !== "loading" ? window.requestAnimationFrame ? window.requestAnimationFrame(a.highlightAll) : window.setTimeout(a.highlightAll, 16) : document.addEventListener("DOMContentLoaded", a.highlightAll))), s.Prism;
                }()); void 0 !== n && n.exports && (n.exports = a), void 0 !== e && (e.Prism = a), a.languages.markup = {comment: /<!--[\s\S]*?-->/,
                    prolog: /<\?[\s\S]+?\?>/,
                    doctype: /<!DOCTYPE[\s\S]+?>/i,
                    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
                tag: {pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
                        greedy: !0,
                        inside: {tag: {pattern: /^<\/?[^\s>\/]+/i,
                        inside: {punctuation: /^<\/?/,
                                namespace: /^[^\s>\/:]+:/}},
                        "attr-value": {pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
                        inside: {punctuation: [
                                /^=/, {pattern: /(^|[^\\])["']/,
                                lookbehind: !0}
                            ]}},
                        punctuation: /\/?>/,
                        "attr-name": {pattern: /[^\s>\/]+/,
                        inside: {namespace: /^[^\s>\/:]+:/}}}},
                    entity: /&#?[\da-z]{1,8};/i}, a.languages.markup.tag.inside["attr-value"].inside.entity = a.languages.markup.entity, a.hooks.add("wrap", (n) => {
                    "entity" === n.type && (n.attributes.title = n.content.replace(/&amp;/, "&"));
                }), a.languages.xml = a.languages.markup, a.languages.html = a.languages.markup, a.languages.mathml = a.languages.markup, a.languages.svg = a.languages.markup, a.languages.css = {comment: /\/\*[\s\S]*?\*\//,
                atrule: {pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
                        inside: {rule: /@[\w-]+/}},
                url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
                selector: /[^{}\s][^{};]*?(?=\s*\{)/,
                string: {pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                        greedy: !0},
                property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
                important: /\B!important\b/i,
                function: /[-a-z0-9]+(?=\()/i,
                punctuation: /[(){};:]/}, a.languages.css.atrule.inside.rest = a.languages.css, a.languages.markup && (a.languages.insertBefore("markup", "tag", {style: {pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
                        lookbehind: !0,
                        inside: a.languages.css,
                alias: "language-css",
                greedy: !0}}), a.languages.insertBefore("inside", "attr-value", {"style-attr": {pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                inside: {"attr-name": {pattern: /^\s*style/i,
                                inside: a.languages.markup.tag.inside},
                                punctuation: /^\s*=\s*['"]|['"]\s*$/,
                                "attr-value": {pattern: /.+/i,
                    inside: a.languages.css}},
                alias: "language-css"}}, a.languages.markup.tag)), a.languages.clike = {comment: [
                                {pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
                    lookbehind: !0}, {pattern: /(^|[^\\:])\/\/.*/,
                                lookbehind: !0,
                                greedy: !0}
                            ],
                                string: {pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                            greedy: !0},
                                "class-name": {pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
                            lookbehind: !0,
                            inside: {punctuation: /[.\\]/}},
                                keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
                                boolean: /\b(?:true|false)\b/,
                                function: /[a-z0-9_]+(?=\()/i,
                                number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
                                operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
            punctuation: /[{}[\];(),.:]/}, a.languages.javascript = a.languages.extend("clike", {keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
                            number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
                            function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
                            operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}), a.languages.insertBefore("javascript", "keyword", {regex: {pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
                    lookbehind: !0,
                greedy: !0},
                    "function-variable": {pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
                alias: "function"},
                    constant: /\b[A-Z][A-Z\d_]*\b/}), a.languages.insertBefore("javascript", "string", {"template-string": {pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
                greedy: !0,
                inside: {interpolation: {pattern: /\${[^}]+}/,
                            inside: {"interpolation-punctuation": {pattern: /^\${|}$/,
                        alias: "punctuation"},
                    rest: null}},
                string: /[\s\S]+/}}}), a.languages.javascript["template-string"].inside.interpolation.inside.rest = a.languages.javascript, a.languages.markup && a.languages.insertBefore("markup", "tag", {script: {pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
                        lookbehind: !0,
                inside: a.languages.javascript,
                        alias: "language-javascript",
                        greedy: !0}}), a.languages.js = a.languages.javascript, typeof self !== "undefined" && self.Prism && self.document && document.querySelector && (self.Prism.fileHighlight = function() {
                    var n = {js: "javascript",
                    py: "python",
                    rb: "ruby",
                    ps1: "powershell",
                    psm1: "powershell",
                    sh: "bash",
                    bat: "batch",
                    h: "c",
                    tex: "latex"}; Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach((e) => {
                                for(var s, t = e.getAttribute("data-src"), r = e, o = /\blang(?:uage)?-([\w-]+)\b/i; r && !o.test(r.className);) {
                        r = r.parentNode;
                    }if(r && (s = (e.className.match(o) || [, ""])[1]), !s) {
                                        let p = (t.match(/\.(\w+)$/) || [, ""])[1]; s = n[p] || p;
                                    }let l = document.createElement("code"); l.className = `language-${s}`, e.textContent = "", l.textContent = "Loading…", e.appendChild(l); let i = new XMLHttpRequest(); i.open("GET", t, !0), i.onreadystatechange = function() {
                        i.readyState == 4 && (i.status < 400 && i.responseText ? (l.textContent = i.responseText, a.highlightElement(l)) : i.status >= 400 ? l.textContent = `✖ Error ${i.status} while fetching file: ${i.statusText}` : l.textContent = "✖ Error: File does not exist or is empty");
                    }, i.send(null);
                            }), a.plugins.toolbar && a.plugins.toolbar.registerButton("download-file", (n) => {
                    let e = n.element.parentNode; if(e && (/pre/i).test(e.nodeName) && e.hasAttribute("data-src") && e.hasAttribute("data-download-link")) {
                                        let s = e.getAttribute("data-src"),
                            a = document.createElement("a");

                                        return a.textContent = e.getAttribute("data-download-link-label") || "Download", a.setAttribute("download", ""), a.href = s, a;
                                    }
                });
                }, document.addEventListener("DOMContentLoaded", self.Prism.fileHighlight));
        }).call(this, s(12));
    }, function(n, e, s) {
        "use strict";

        n.exports = function() {};
    }, function(n, e, s) {
        "use strict";

        e.__esModule = !0; e.addLeadingSlash = function(n) {
            returnn.charAt(0) === "/" ? n : `/${n}`;
        }, e.stripLeadingSlash = function(n) {
            returnn.charAt(0) === "/" ? n.substr(1) : n;
        }; let a = e.hasBasename = function(n, e) {
            return new RegExp(`^${e}(\\/|\\?|#|$)`, "i").test(n);
        }; e.stripBasename = function(n, e) {
            return a(n, e) ? n.substr(e.length) : n;
        }, e.stripTrailingSlash = function(n) {
            returnn.charAt(n.length - 1) === "/" ? n.slice(0, -1) : n;
        }, e.parsePath = function(n) {
            let e = n || "/",
                s = "",
                a = "",
                t = e.indexOf("#"); t !== -1 && (a = e.substr(t), e = e.substr(0, t)); let r = e.indexOf("?");

            returnr !== -1 && (s = e.substr(r), e = e.substr(0, r)), {pathname: e,
                search: s === "?" ? "" : s,
                hash: a === "#" ? "" : a};
        }, e.createPath = function(n) {
            let e = n.pathname,
                s = n.search,
                a = n.hash,
                t = e || "/";

            return s && s !== "?" && (t += s.charAt(0) === "?" ? s : `?${s}`), a && a !== "#" && (t += a.charAt(0) === "#" ? a : `#${a}`), t;
        };
    }, function(n, e) {
        n.exports = function(n) {
            let e = [];

            return e.toString = function() {
                return this.map((e) => {
                    let s = (function(n, e) {
                        let s = n[1] || "",
                            a = n[3]; if(!a) {
                                return s;
                            }if(e && typeof btoa === "function") {
                            let t = (function(n) {
                                        return`/*# sourceMappingURL=data:application/json;charset=utf-8;base64,${btoa(unescape(encodeURIComponent(JSON.stringify(n))))} */`;
                                    }(a)),
                                    r = a.sources.map((n) => {
                                    return`/*# sourceURL=${a.sourceRoot}${n} */`;
                                });

                            return[s].concat(r).concat([t]).
                                join("\n");
                        }

                        return[s].join("\n");
                    }(e, n));

                    return e[2] ? `@media ${e[2]}{${s}}` : s;
                }).join("");
            }, e.i = function(n, s) {
                typeof n === "string" && (n = [[null, n, ""]]); for(var a = {}, t = 0; t < this.length; t++) {
                    let r = this[t][0]; typeof r === "number" && (a[r] = !0);
                }for(t = 0; t < n.length; t++) {
                    let o = n[t]; typeof o[0] === "number" && a[o[0]] || (s && !o[2] ? o[2] = s : s && (o[2] = `(${o[2]}) and (${s})`), e.push(o));
                }
            }, e;
        };
    }, function(n, e, s) {
        let a = {},
            t = (function(n) {
                let e;

                return function() {
                    return void 0 === e && (e = n.apply(this, arguments)), e;
                };
            }(() => {
                return window && document && document.all && !window.atob;
            })),
            r = (function(n) {
                let e = {};

                return function(n, s) {
                    if(typeof n === "function") {
                        return n();
                    }if(void 0 === e[n]) {
                        let a = function(n, e) {
                            return e ? e.querySelector(n) : document.querySelector(n);
                        }.call(this, n, s); if(window.HTMLIFrameElement && a instanceof window.HTMLIFrameElement) {
                            try{
                                a = a.contentDocument.head;
                            }catch(n) {
                                a = null;
                            }
                        }e[n] = a;
                    }

                    return e[n];
                };
            }()),
            o = null,
            p = 0,
            l = [],
            i = s(33); function c(n, e) {
                for(let s = 0; s < n.length; s++) {
                let t = n[s],
                        r = a[t.id]; if(r) {
                        r.refs++; for(var o = 0; o < r.parts.length; o++) {
                                r.parts[o](t.parts[o]);
                            }for(;o < t.parts.length; o++) {
                        r.parts.push(g(t.parts[o], e));
                    }
                    }else{
                    var p = []; for(o = 0; o < t.parts.length; o++) {
                                p.push(g(t.parts[o], e));
                            }a[t.id] = {id: t.id,
                        refs: 1,
                        parts: p};
                }
            }
            }function d(n, e) {
            for(var s = [], a = {}, t = 0; t < n.length; t++) {
                    let r = n[t],
                    o = e.base ? r[0] + e.base : r[0],
                    p = {css: r[1],
                            media: r[2],
                            sourceMap: r[3]}; a[o] ? a[o].parts.push(p) : s.push(a[o] = {id: o,
                    parts: [p]});
                }

            return s;
        }function u(n, e) {
                let s = r(n.insertInto); if(!s) {
                throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            }let a = l[l.length - 1]; if(n.insertAt === "top") {
                    a ? a.nextSibling ? s.insertBefore(e, a.nextSibling) : s.appendChild(e) : s.insertBefore(e, s.firstChild), l.push(e);
                }else if(n.insertAt === "bottom") {
                s.appendChild(e);
            }else{
                if(typeof n.insertAt !== "object" || !n.insertAt.before) {
                        throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
                    }let t = r(n.insertAt.before, s); s.insertBefore(e, t);
            }
            }function f(n) {
            if(n.parentNode === null) {
                    return!1;
                }n.parentNode.removeChild(n); let e = l.indexOf(n); e >= 0 && l.splice(e, 1);
        }function h(n) {
                let e = document.createElement("style"); if(void 0 === n.attrs.type && (n.attrs.type = "text/css"), void 0 === n.attrs.nonce) {
                let a = (function() {
                        0;

                        return s.nc;
                    }()); a && (n.attrs.nonce = a);
            }

                return b(e, n.attrs), u(n, e), e;
            }function b(n, e) {
            Object.keys(e).forEach((s) => {
                    n.setAttribute(s, e[s]);
                });
        }function g(n, e) {
                let s, a, t, r; if(e.transform && n.css) {
                if(!(r = e.transform(n.css))) {
                        return function() {};
                    }n.css = r;
            }if(e.singleton) {
                    let l = p++; s = o || (o = h(e)), a = y.bind(null, s, l, !1), t = y.bind(null, s, l, !0);
                }else {
                    n.sourceMap && typeof URL === "function" && typeof URL.createObjectURL === "function" && typeof URL.revokeObjectURL === "function" && typeof Blob === "function" && typeof btoa === "function" ? (s = (function(n) {
                    let e = document.createElement("link");

                    return void 0 === n.attrs.type && (n.attrs.type = "text/css"), n.attrs.rel = "stylesheet", b(e, n.attrs), u(n, e), e;
                }(e)), a = function(n, e, s) {
                        let a = s.css,
                        t = s.sourceMap,
                        r = void 0 === e.convertToAbsoluteUrls && t; (e.convertToAbsoluteUrls || r) && (a = i(a)); t && (a += `\n/*# sourceMappingURL=data:application/json;base64,${btoa(unescape(encodeURIComponent(JSON.stringify(t))))} */`); let o = new Blob([a], {type: "text/css"}),
                        p = n.href; n.href = URL.createObjectURL(o), p && URL.revokeObjectURL(p);
                    }.bind(null, s, e), t = function() {
                    f(s), s.href && URL.revokeObjectURL(s.href);
                }) : (s = h(e), a = function(n, e) {
                        let s = e.css,
                        a = e.media; a && n.setAttribute("media", a); if(n.styleSheet) {
                        n.styleSheet.cssText = s;
                    }else{
                        for(;n.firstChild;) {
                                n.removeChild(n.firstChild);
                            }n.appendChild(document.createTextNode(s));
                            }
                    }.bind(null, s), t = function() {
                    f(s);
                });
                }

                return a(n), function(e) {
                if(e) {
                        if(e.css === n.css && e.media === n.media && e.sourceMap === n.sourceMap) {
                        return;
                    }a(n = e);
                    }else {
                        t();
                    }
            };
            }n.exports = function(n, e) {
            if(typeof DEBUG !== "undefined" && DEBUG && typeof document !== "object") {
                    throw new Error("The style-loader cannot be used in a non-browser environment");
                }(e = e || {}).attrs = typeof e.attrs === "object" ? e.attrs : {}, e.singleton || typeof e.singleton === "boolean" || (e.singleton = t()), e.insertInto || (e.insertInto = "head"), e.insertAt || (e.insertAt = "bottom"); let s = d(n, e);

            return c(s, e), function(n) {
                    for(var t = [], r = 0; r < s.length; r++) {
                    let o = s[r]; (p = a[o.id]).refs--, t.push(p);
                }n && c(d(n, e), e); for(r = 0; r < t.length; r++) {
                        var p; if((p = t[r]).refs === 0) {
                        for(let l = 0; l < p.parts.length; l++) {
                                p.parts[l]();
                            }delete a[p.id];
                    }
                    }
                };
        }; let m = (function() {
                let n = [];

                return function(e, s) {
                return n[e] = s, n.filter(Boolean).join("\n");
            };
            }()); function y(n, e, s, a) {
            let t = s ? "" : a.css; if(n.styleSheet) {
                    n.styleSheet.cssText = m(e, t);
                }else{
                    let r = document.createTextNode(t),
                    o = n.childNodes; o[e] && n.removeChild(o[e]), o.length ? n.insertBefore(r, o[e]) : n.appendChild(r);
                }
        }
    }, function(n, e, s) {
        "use strict";

        e.__esModule = !0; let a = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(n) {
                return typeof n;
            } : function(n) {
                return n && typeof Symbol === "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
            },
            t = Object.assign || function(n) {
                for(let e = 1; e < arguments.length; e++) {
                    let s = arguments[e]; for(let a in s) {
                        Object.prototype.hasOwnProperty.call(s, a) && (n[a] = s[a]);
                    }
                }

                return n;
            },
            r = d(s(1)),
            o = d(s(6)),
            p = s(7),
            l = s(2),
            i = d(s(10)),
            c = s(11); function d(n) {
                return n && n.__esModule ? n : {default: n};
            }let u = function() {
            try{
                    return window.history.state || {};
                }catch(n) {
                    return{};
                }
        }; e.default = function() {
                let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; (0, o.default)(c.canUseDOM, "Browser history needs a DOM"); var e = window.history,
                s = (0, c.supportsHistory)(),
                d = !(0, c.supportsPopStateOnHashChange)(),
                f = n.forceRefresh,
                h = void 0 !== f && f,
                b = n.getUserConfirmation,
                g = void 0 === b ? c.getConfirmation : b,
                m = n.keyLength,
                y = void 0 === m ? 6 : m,
                k = n.basename ? (0, l.stripTrailingSlash)((0, l.addLeadingSlash)(n.basename)) : "",
                v = function(n) {
                        let e = n || {},
                        s = e.key,
                        a = e.state,
                        t = window.location,
                        o = t.pathname + t.search + t.hash;

                        return(0, r.default)(!k || (0, l.hasBasename)(o, k), `You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "${o}" to begin with "${k}".`), k && (o = (0, l.stripBasename)(o, k)), (0, p.createLocation)(o, a, s);
                    },
                x = function() {
                        return Math.random().toString(36).
                        substr(2, y);
                    },
                S = (0, i.default)(),
                T = function(n) {
                        t(C, n), C.length = e.length, S.notifyListeners(C.location, C.action);
                    },
                N = function(n) {
                        (0, c.isExtraneousPopstateEvent)(n) || E(v(n.state));
                    },
                w = function() {
                        E(v(u()));
                    },
                A = !1,
                E = function(n) {
                        A ? (A = !1, T()) : S.confirmTransitionTo(n, "POP", g, (e) => {
                        e ? T({action: "POP",
                                location: n}) : M(n);
                    });
                    },
                M = function(n) {
                        let e = C.location,
                        s = O.indexOf(e.key); s === -1 && (s = 0); let a = O.indexOf(n.key); a === -1 && (a = 0); let t = s - a; t && (A = !0, I(t));
                    },
                j = v(u()),
                O = [j.key],
                _ = function(n) {
                        return k + (0, l.createPath)(n);
                    },
                I = function(n) {
                        e.go(n);
                    },
                P = 0,
                R = function(n) {
                        (P += n) === 1 ? ((0, c.addEventListener)(window, "popstate", N), d && (0, c.addEventListener)(window, "hashchange", w)) : P === 0 && ((0, c.removeEventListener)(window, "popstate", N), d && (0, c.removeEventListener)(window, "hashchange", w));
                    },
                z = !1,
                C = {length: e.length,
                        action: "POP",
                        location: j,
                        createHref: _,
                        push(n, t) {
                        (0, r.default)(!((void 0 === n ? "undefined" : a(n)) === "object" && void 0 !== n.state && void 0 !== t), "You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored"); let o = (0, p.createLocation)(n, t, x(), C.location); S.confirmTransitionTo(o, "PUSH", g, (n) => {
                                if(n) {
                                let a = _(o),
                                        t = o.key,
                                        p = o.state; if(s) {
                                    if(e.pushState({key: t,
                                                state: p}, null, a), h) {
                                        window.location.href = a;
                                            }else{
                                        let l = O.indexOf(C.location.key),
                                                i = O.slice(0, l === -1 ? 0 : l + 1); i.push(o.key), O = i, T({action: "PUSH",
                                                location: o});
                                    }
                                }else{
                                    (0, r.default)(void 0 === p, "Browser history cannot push state in browsers that do not support HTML5 history"), window.location.href = a;
                                    }
                            }
                            });
                    },
                        replace(n, t) {
                        (0, r.default)(!((void 0 === n ? "undefined" : a(n)) === "object" && void 0 !== n.state && void 0 !== t), "You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored"); let o = (0, p.createLocation)(n, t, x(), C.location); S.confirmTransitionTo(o, "REPLACE", g, (n) => {
                                if(n) {
                                let a = _(o),
                                        t = o.key,
                                        p = o.state; if(s) {
                                    if(e.replaceState({key: t,
                                                state: p}, null, a), h) {
                                                window.location.replace(a);
                                            }else{
                                                let l = O.indexOf(C.location.key); l !== -1 && (O[l] = o.key), T({action: "REPLACE",
                                            location: o});
                                            }
                                }else{
                                    (0, r.default)(void 0 === p, "Browser history cannot replace state in browsers that do not support HTML5 history"), window.location.replace(a);
                                    }
                            }
                            });
                    },
                        go: I,
                        goBack() {
                        return I(-1);
                    },
                        goForward() {
                        return I(1);
                    },
                        block() {
                        let n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                                e = S.setPrompt(n);

                        return z || (R(1), z = !0), function() {
                                return z && (z = !1, R(-1)), e();
                            };
                    },
                        listen(n) {
                        let e = S.appendListener(n);

                        return R(1), function() {
                                R(-1), e();
                            };
                    }};

                return C;
            };
    }, function(n, e, s) {
        "use strict";

        n.exports = function(n, e, s, a, t, r, o, p) {
            if(!n) {
                let l; if(void 0 === e) {
                    l = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                }else{
                    let i = [s, a, t, r, o, p],
                        c = 0; (l = new Error(e.replace(/%s/g, () => {
                        return i[c++];
                    }))).name = "Invariant Violation";
                }throw l.framesToPop = 1, l;
            }
        };
    }, function(n, e, s) {
        "use strict";

        e.__esModule = !0, e.locationsAreEqual = e.createLocation = void 0; let a = Object.assign || function(n) {
                for(let e = 1; e < arguments.length; e++) {
                    let s = arguments[e]; for(let a in s) {
                        Object.prototype.hasOwnProperty.call(s, a) && (n[a] = s[a]);
                    }
                }

                return n;
            },
            t = p(s(8)),
            r = p(s(9)),
            o = s(2); function p(n) {
            return n && n.__esModule ? n : {default: n};
        }e.createLocation = function(n, e, s, r) {
                let p = void 0; typeof n === "string" ? (p = (0, o.parsePath)(n)).state = e : (void 0 === (p = {...n}).pathname && (p.pathname = ""), p.search ? p.search.charAt(0) !== "?" && (p.search = `?${p.search}`) : p.search = "", p.hash ? p.hash.charAt(0) !== "#" && (p.hash = `#${p.hash}`) : p.hash = "", void 0 !== e && void 0 === p.state && (p.state = e)); try{
                p.pathname = decodeURI(p.pathname);
            }catch(n) {
                throw n instanceof URIError ? new URIError(`Pathname "${p.pathname}" could not be decoded. This is likely caused by an invalid percent-encoding.`) : n;
            }

                return s && (p.key = s), r ? p.pathname ? p.pathname.charAt(0) !== "/" && (p.pathname = (0, t.default)(p.pathname, r.pathname)) : p.pathname = r.pathname : p.pathname || (p.pathname = "/"), p;
            }, e.locationsAreEqual = function(n, e) {
            return n.pathname === e.pathname && n.search === e.search && n.hash === e.hash && n.key === e.key && (0, r.default)(n.state, e.state);
        };
    }, function(n, e, s) {
        "use strict";

        function a(n) {
            returnn.charAt(0) === "/";
        }function t(n, e) {
            for(let s = e, a = s + 1, t = n.length; a < t; s += 1, a += 1) {
                n[s] = n[a];
            }n.pop();
        }s.r(e), e.default = function(n) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                s = n && n.split("/") || [],
                r = e && e.split("/") || [],
                o = n && a(n),
                p = e && a(e),
                l = o || p; if(n && a(n) ? r = s : s.length && (r.pop(), r = r.concat(s)), !r.length) {
                return"/";
            }let i = void 0; if(r.length) {
                    let c = r[r.length - 1]; i = c === "." || c === ".." || c === "";
                }else {
                    i = !1;
                }for(var d = 0, u = r.length; u >= 0; u--) {
                let f = r[u]; f === "." ? t(r, u) : f === ".." ? (t(r, u), d++) : d && (t(r, u), d--);
            }if(!l) {
                    for(;d--; d) {
                    r.unshift("..");
                }
                }!l || r[0] === "" || r[0] && a(r[0]) || r.unshift(""); let h = r.join("/");

            return i && h.substr(-1) !== "/" && (h += "/"), h;
        };
    }, function(n, e, s) {
        "use strict";

        s.r(e); let a = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(n) {
            return typeof n;
        } : function(n) {
            return n && typeof Symbol === "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        }; e.default = function n(e, s) {
            if(e === s) {
                return!0;
            }if(e == null || s == null) {
                return!1;
            }if(Array.isArray(e)) {
                return Array.isArray(s) && e.length === s.length && e.every((e, a) => {
                    return n(e, s[a]);
                });
            }let t = void 0 === e ? "undefined" : a(e); if(t !== (void 0 === s ? "undefined" : a(s))) {
                return!1;
            }if(t === "object") {
                let r = e.valueOf(),
                    o = s.valueOf(); if(r !== e || o !== s) {
                    return n(r, o);
                }let p = Object.keys(e),
                        l = Object.keys(s);

                return p.length === l.length && p.every((a) => {
                    return n(e[a], s[a]);
                });
            }

            return!1;
        };
    }, function(n, e, s) {
        "use strict";

        e.__esModule = !0; let a = (function(n) {
            return n && n.__esModule ? n : {default: n};
        }(s(1))); e.default = function() {
            let n = null,
                e = [];

            return{setPrompt(e) {
                return(0, a.default)(n == null, "A history supports only one prompt at a time"), n = e, function() {
                    n === e && (n = null);
                };
            },
            confirmTransitionTo(e, s, t, r) {
                    if(n != null) {
                    let o = typeof n === "function" ? n(e, s) : n; typeof o === "string" ? typeof t === "function" ? t(o, r) : ((0, a.default)(!1, "A history needs a getUserConfirmation function in order to use a prompt message"), r(!0)) : r(!1 !== o);
                }else {
                    r(!0);
                }
                },
            appendListener(n) {
                    let s = !0,
                    a = function() {
                            s && n(...arguments);
                        };

                    return e.push(a), function() {
                    s = !1, e = e.filter((n) => {
                            return n !== a;
                        });
                };
                },
            notifyListeners() {
                    for(var n = arguments.length, s = Array(n), a = 0; a < n; a++) {
                    s[a] = arguments[a];
                }e.forEach((n) => {
                        return n(...s);
                    });
                }};
        };
    }, function(n, e, s) {
        "use strict";

        e.__esModule = !0; e.canUseDOM = !(typeof window === "undefined" || !window.document || !window.document.createElement), e.addEventListener = function(n, e, s) {
            return n.addEventListener ? n.addEventListener(e, s, !1) : n.attachEvent(`on${e}`, s);
        }, e.removeEventListener = function(n, e, s) {
            return n.removeEventListener ? n.removeEventListener(e, s, !1) : n.detachEvent(`on${e}`, s);
        }, e.getConfirmation = function(n, e) {
            return e(window.confirm(n));
        }, e.supportsHistory = function() {
            let n = window.navigator.userAgent;

            return(n.indexOf("Android 2.") === -1 && n.indexOf("Android 4.0") === -1 || n.indexOf("Mobile Safari") === -1 || n.indexOf("Chrome") !== -1 || n.indexOf("Windows Phone") !== -1) && (window.history && "pushState" in window.history);
        }, e.supportsPopStateOnHashChange = function() {
            returnwindow.navigator.userAgent.indexOf("Trident") === -1;
        }, e.supportsGoWithoutReloadUsingHash = function() {
            returnwindow.navigator.userAgent.indexOf("Firefox") === -1;
        }, e.isExtraneousPopstateEvent = function(n) {
            return void 0 === n.state && navigator.userAgent.indexOf("CriOS") === -1;
        };
    }, function(n, e) {
        let s; s = (function() {
            return this;
        }()); try{
            s = s || Function("return this")() || (0, eval)("this");
        }catch(n) {
            typeof window === "object" && (s = window);
        }n.exports = s;
    }, function(n, e, s) {
        const a = {}; ((n) => {
            n.keys().forEach((e) => a[e.slice(2)] = n(e));
        })(s(14)), n.exports = a;
    }, function(n, e, s) {
        let a = {"./Default.html": 15,
            "./LexicalAnalysis.html": 16,
            "./Parsing.html": 17,
            "./ParsingTips.html": 18,
            "./SolversTips.html": 19,
            "./reference/classes/AnalyzerNode.html": 20,
            "./reference/classes/BlockNode.html": 21,
            "./reference/classes/CombinedNode.html": 22,
            "./reference/classes/EventEmitter.html": 23,
            "./reference/classes/FunctionNode.html": 24,
            "./reference/classes/SequenceNode.html": 25,
            "./reference/classes/StringSolver.html": 26,
            "./reference/classes/SyntaxAnalyzer.html": 27,
            "./reference/classes/SyntaxNode.html": 28,
            "./reference/classes/TokenGroup.html": 29,
            "./reference/classes/TokenSolver.html": 30}; function t(n) {
                let e = r(n);

                return s(e);
            }function r(n) {
            let e = a[n]; if(!(e + 1)) {
                    let s = new Error(`Cannot find module '${n}'`); throw s.code = "MODULE_NOT_FOUND", s;
                }

            return e;
        }t.keys = function() {
                return Object.keys(a);
            }, t.resolve = r, n.exports = t, t.id = 14;
    }, function(n, e) {
        n.exports = " <img src=https://img.shields.io/npm/v/syntex.svg> <img src=https://img.shields.io/npm/l/syntex.svg> <h1>Syntex Documentation</h1> <p> Syntex is fully customizable parser for any programming language that you can imagine. </p> <p> Syntex gives you an ability to build lexical and syntax tree from your code. </p>";
    }, function(n, e) {
        n.exports = '<h1>Lexical analysis</h1> <hr/> <h3> To determine the type of tokens you must follow these steps: </h3> <p> <span class="bold blue">1)</span> You must define <a href=# class=link>token types</a>. </p> <pre class=language-js>\n<code class=language-js>\nconst MyTokenTypes = {\n    KEYWORD: "Keyword",\n    IDENTIFIER: "Identifier",\n    OPERATOR: "Operator",\n    DELIMITER: "Delimiter",\n    LINEBREAK: "Linebreak",\n    STRING: "String",\n    NUMERIC: "Numeric",\n    UNKNOWN: \'Unknown\'\n};\n</code>\n</pre> <br/> <p> <span class="bold blue">2)</span> You must define <a href=# class=link>solvers</a> for your token types </p> <pre class=language-js>\n<code class=language-js>\nimport {StringSolver} from "syntex";\n\nconst solvers = {};\n\nsolvers[MyTokenTypes.KEYWORD] = {\n    include: [\n        \'const\',\n        \'let\'\n    ]\n};\n\nsolvers[MyTokenTypes.NUMERIC] = {\n    regexp: /[0-9.]+/gm\n};\n\nsolvers[MyTokenTypes.STRING] = {\n    type: StringSolver,\n    delimiters: [\'"\', "\'", \'`\']\n};\n\nsolvers[MyTokenTypes.IDENTIFIER] = {\n    regexp: /[a-zA-Z_][a-zA-Z_0-9]+/gm\n};\n\nsolvers[MyTokenTypes.DELIMITER] = {\n    default: true\n};\n</code>\n</pre> <p> <span class="bold blue">3)</span> The next step is to generate a token group using token types and solvers that where created before. </p> <pre class=language-js>\n<code class=language-js>\nimport {generateTokenGroup} from "syntex";\n\nlet group = generateTokenGroup(MyTokenTypes, solvers);\n</code>\n</pre> <p> <span class="bold blue">4)</span> Finally you should use the generated group to tokenize your program. </p> <pre class=language-js>\n<code class=language-js>\nlet tokens = group.solve(program);\n</code>\n</pre> <p> <span class=bold>The result is: </span> </p> <pre class=language-js>\n<code class=language-js>\n[\n  {\n    "type": "Keyword",\n    "value": "let",\n    "range": [0, 3]\n  },\n  {\n    "type": "Identifier",\n    "value": "a",\n    "range": [4, 5]\n  },\n  {\n    "type": "Delimiter",\n    "value": "=",\n    "range": [6, 7]\n  },\n  {\n    "type": "Numeric",\n    "value": "50",\n    "range": [8, 10]\n  },\n  {\n    "type": "Delimiter",\n    "value": ";",\n    "range": [11, 12]\n  }\n]\n</code>\n</pre>';
    }, function(n, e) {
        n.exports = '<h1>Parsing</h1> <h3>To build an Abstract Syntax Tree you should follow these steps:</h3> <p> <span class="bold blue">1)</span> You must define <a href=# class=link>node types</a>. </p> <pre class=language-js>\n<code class=language-js>\nconst MyNodeTypes = {\n    BLOCK: "BlockDefinition",\n    DECLARATION: "Declaration",\n    COMMENT_MULTIPLE: "CommentMultiple",\n    METHOD_CALLING: "MethodCalling",\n    ARGUMENTS: "ArgumentsDefinition"\n};\n</code>\n</pre> <br/> <p> <span class="bold blue">2)</span> You must define <a href=# class=link>SyntaxNode</a>s. </p> <pre class=language-js>\n<code class=language-js>\nimport {BlockNode, SequenceNode} from "syntex/classes/syntaxAnalyzer";\n\nlet declaration = new SequenceNode({\n    tokenType: MyTokenTypes.KEYWORD, // Start point to parse node\n    type: MyNodeTypes.DECLARATION, // Node type\n    sequence: [ // Sequence of tokens to test\n        {type: MyTokenTypes.KEYWORD}, // First must be KEYWORD\n        {type: MyTokenTypes.IDENTIFIER}, // Second must be an IDENTIFIER\n        {type: MyTokenTypes.DELIMITER}, // Third must be DELIMITER\n        {type: [MyTokenTypes.NUMERIC, MyTokenTypes.STRING]}, //  Fourth must be NUMERIC or STRING\n        \';\' // Fifth must be a ;\n    ],\n    onError: (e) => {\n        //e - Syntax error\n    }\n});\n</code>\n</pre> <p> <span class=bold>OR / AND</span> </p> <pre class=language-js>\n<code class=language-js>\nimport {BlockNode, SequenceNode} from "syntex/classes/syntaxAnalyzer";\n\nlet ArgumentNode = new BlockNode({\n    tokenType: MyTokenTypes.OPERATOR, // Start point to parse node\n    values: [\'(\', \')\'], // There should be opener and closer brackets\n    type: MyNodeTypes.ARGUMENTS, // Node type\n    subNodes: [] // What to use to parse child nodes\n});\n\nlet methodCall = new SequenceNode({\n    tokenType: MyTokenTypes.IDENTIFIER, // Start point to parse node\n    type: MyNodeTypes.METHOD_CALLING, // Node type\n    sequence: [\n        {type: MyTokenTypes.IDENTIFIER}, // Firth must be an IDENTIFIER\n        ArgumentNode, // Second should be an ArgumentNode\n        \';\' // Third should be a ;\n    ],\n    subNodes: [ArgumentNode], // What to use to parse child nodes\n    onError: (e) => {\n        //e - Syntax error\n    }\n})\n</code>\n</pre> <br/> <p> <span class="bold blue">3)</span> You must create a <a href=# class=link>SyntaxAnalyzer</a> and pass nodes to it. </p> <pre class=language-js>\n<code class=language-js>\nlet analyzer = new SyntaxAnalyzer([declaration, methodCall]);\n</code>\n</pre> <p> <span class="bold blue">4)</span> Finally you must set a program and call <a href=# class=link>analyze</a> method of analyzer to parse syntax tree. </p> <pre class=language-js>\n<code class=language-js>\nanalyzer.program = program;\nanalyzer.analyze(tokens);\n\nconsole.log(analyzer.tree); // You will see the Abstract Syntax Tree\n</code>\n</pre> ';
    }, function(n, e) {
        n.exports = "<h1>Comments</h1> <pre class=language-js>\n<code class=language-js>\nimport {BlockNode} from \"syntex/classes/syntaxAnalyzer\";\n\nnew BlockNode({\n    tokenType: DefaultTokenTypes.OPERATOR,\n    values: ['/*', '*/'],\n    type: DefaultNodeTypes.COMMENT_MULTIPLE,\n    subNodes: []\n})\n</code>\n</pre> <br/> <h1>Scope</h1> <pre class=language-js>\n<code class=language-js>\nimport {BlockNode} from \"syntex/classes/syntaxAnalyzer\";\n\nnew BlockNode({\n    tokenType: DefaultTokenTypes.OPERATOR,\n    values: ['{', '}'],\n    type: DefaultNodeTypes.BLOCK,\n    subNodes: []\n})\n</code>\n</pre> <br/> <h1>Variable declaration</h1> <pre class=language-js>\n<code class=language-js>\nimport {SequenceNode} from \"syntex/classes/syntaxAnalyzer\";\n\nnew SequenceNode({\n    tokenType: DefaultTokenTypes.KEYWORD,\n    type: DefaultNodeTypes.DECLARATION,\n    sequence: [\n        {type: DefaultTokenTypes.KEYWORD},\n        {type: DefaultTokenTypes.IDENTIFIER},\n        {type: DefaultTokenTypes.OPERATOR},\n        {type: [DefaultTokenTypes.STRING, DefaultTokenTypes.NUMERIC, DefaultTokenTypes.IDENTIFIER]},\n        ';'\n    ]\n})\n</code>\n</pre> <br/> <h1>Method calling</h1> <pre class=language-js>\n<code class=language-js>\nimport {SequenceNode, BlockNode} from \"syntex/classes/syntaxAnalyzer\";\n\nlet ArgumentNode = new BlockNode({\n    tokenType: DefaultTokenTypes.OPERATOR,\n    values: ['(', ')'],\n    type: DefaultNodeTypes.ARGUMENTS,\n    subNodes: []\n});\n\nnew SequenceNode({\n    tokenType: DefaultTokenTypes.IDENTIFIER,\n    type: DefaultNodeTypes.METHOD_CALLING,\n    sequence: [\n        {type: DefaultTokenTypes.IDENTIFIER},\n        ArgumentNode,\n        ';'\n    ],\n    subNodes: [ArgumentNode]\n})\n</code>\n</pre> <br/> <h1>Class definition</h1> <pre class=language-js>\n<code class=language-js>\nimport {SequenceNode, BlockNode} from \"syntex/classes/syntaxAnalyzer\";\n\nlet ScopeNode = new BlockNode({\n    tokenType: DefaultTokenTypes.OPERATOR,\n    values: ['{', '}'],\n    type: DefaultNodeTypes.BLOCK\n});\n\nnew SequenceNode({\n    tokenType: DefaultTokenTypes.IDENTIFIER,\n    type: DefaultNodeTypes.CLASS_DEFINITION,\n    sequence: [\n        'class',\n        {type: DefaultTokenTypes.IDENTIFIER},\n        ScopeNode\n    ]\n})\n</code>\n</pre> <br/> ";
    }, function(n, e) {
        n.exports = "<h1>Strings</h1> <pre class=language-js>\n<code class=language-js>\nimport {StringSolver} from \"syntex\";\n\nsolvers[MyTokenTypes.STRING] = {\n    type: StringSolver, // Extends by StringSolver\n    delimiters: ['\"', \"'\", '`'] // Symbols that should implement strings\n};\n</code>\n</pre> <br/> <h1>Numbers</h1> <pre class=language-js>\n<code class=language-js>\nsolvers[MyTokenTypes.NUMERIC] = {\n    regexp: /[0-9.]+/gm\n};\n</code>\n</pre> <br/> <h1>Identifiers</h1> <pre class=language-js>\n<code class=language-js>\nsolvers[MyTokenTypes.IDENTIFIER] = {\n    regexp: /[a-zA-Z_][a-zA-Z_0-9]+/gm\n};\n</code>\n</pre> <br/> <h1>Operators</h1> <pre class=language-js>\n<code class=language-js>\nsolvers[MyTokenTypes.OPERATOR] = {\n    symbols: [\n        '(', ')',\n        '}', '{',\n        '[', ']',\n        '=', '*',\n        \"&lsaquo;\", \"&rsaquo;\",\n        '&', '|',\n        '/',\n        '+', '-',\n        ';', ':',\n        ',', '.',\n        '?', '!',\n    ]\n};\n</code>\n</pre> <br/> <h1>Keywords</h1> <pre class=language-js>\n<code class=language-js>\nsolvers[MyTokenTypes.KEYWORD] = {\n    include: [\n        'let', 'const', 'var',\n        'class', 'function', 'static',\n        'import', 'require', 'this'\n    ]\n};\n</code>\n</pre> ";
    }, function(n, e) {
        n.exports = '<h3><a href=#classes/EventEmitter class=link>EventEmitter</a> &#8594;</h3><h1>AnalyzerNode</h1><p>Analyzer node helps to build AST</p><p class=props>Constructor</p><p>See the base <a href=#classes/EventEmitter class=link>EventEmitter</a> class for common arguments.</p><h4 class="def docConstructor">AnalyzerNode(<span class="def link">props.tokenType</span>&nbsp;:&nbsp;<span class=param>String</span>,&nbsp;<span class="def link">props.type</span>&nbsp;:&nbsp;<span class=param>String</span>,&nbsp;<span class="def link">props.subNodes</span>&nbsp;:&nbsp;<span class=param>Arrayundefined</span>,&nbsp;<span class="def link">props.important</span>&nbsp;:&nbsp;<span class=param>Boolean</span>)</h4><div class=sub_descr><span class=link>props.tokenType</span> - Type of the token to start parse from<br><span class=link>props.type</span> - Type of the AnalyzerNode<br><span class=link>props.subNodes</span> - Sub nodes that will be used to parse children nodes, if not present - defaultNodes of SyntaxAnalyzer will be used<br><span class=link>props.important</span> - If false then sequence will be parsed even that node is not exist in the array of tokens</div><hr/><p class=props>Properties</p><p>See the base <a href=#classes/EventEmitter class=link>EventEmitter</a> class for common properties.</p><p class="descr docProperty">.<span class="def link">tokenType</span>&nbsp;:&nbsp;<span class=param>String</span></p><p class=sub_descr> Type of the token to start parse from </p><p class="descr docProperty">.<span class="def link">type</span>&nbsp;:&nbsp;<span class=param>String</span></p><p class=sub_descr> Type of the AnalyzerNode </p><p class="descr docProperty">.<span class="def link">subNodes</span>&nbsp;:&nbsp;<span class=param>String</span></p><p class=sub_descr> Sub nodes that will be used to parse children nodes, if not present - defaultNodes of SyntaxAnalyzer will be used </p><p class="descr docProperty">.<span class="def link">important</span>&nbsp;:&nbsp;<span class=param>Boolean</span></p><p class=sub_descr> If false then sequence will be parsed even that node is not exist in the array of tokens </p><p class="descr docProperty">.<span class="def link">lastNode</span>&nbsp;:&nbsp;<span class=param>AnalyzerNode</span></p><p class=sub_descr> Last created node </p><hr/><p class=props>Static</p><p>See the base <a href=#classes/EventEmitter class=link>EventEmitter</a> class for common static methods.</p><p class="descr docMethod"><span class="def link">getContentFromRange</span>(<span class="def link">content</span>&nbsp;:&nbsp;<span class=param>String</span>,&nbsp;<span class="def link">list</span>&nbsp;:&nbsp;<span class=param>Array</span>,&nbsp;<span class="def link">start</span>&nbsp;:&nbsp;<span class=param>Number</span>,&nbsp;<span class="def link">end</span>&nbsp;:&nbsp;<span class=param>Number</span>)&nbsp;:&nbsp;<span class=param>Void</span></p><p class=sub_descr> Returns content from source code using start, end tokens </p><br/><p class=props>Methods</p><p>See the base <a href=#classes/EventEmitter class=link>EventEmitter</a> class for common methods.</p><p class="descr docMethod"><span class="def link">test</span>(<span class="def link">tokenList</span>&nbsp;:&nbsp;<span class=param>Array</span>,&nbsp;<span class="def link">index</span>&nbsp;:&nbsp;<span class=param>Number</span>,&nbsp;<span class="def link">parent</span>&nbsp;:&nbsp;<span class=param>SyntaxNode</span>,&nbsp;<span class="def link">analyzer</span>&nbsp;:&nbsp;<span class=param>SyntaxAnalyzer</span>)&nbsp;:&nbsp;<span class=param>null</span></p><p class=sub_descr> Returns true if token list contain current node starting from current position </p><br/><p class="descr docMethod"><span class="def link">run</span>(<span class="def link">tokenList</span>&nbsp;:&nbsp;<span class=param>Array</span>,&nbsp;<span class="def link">index</span>&nbsp;:&nbsp;<span class=param>Number</span>,&nbsp;<span class="def link">parent</span>&nbsp;:&nbsp;<span class=param>SyntaxNode</span>,&nbsp;<span class="def link">analyzer</span>&nbsp;:&nbsp;<span class=param>SyntaxAnalyzer</span>)&nbsp;:&nbsp;<span class=param>null</span></p><p class=sub_descr> Updates syntax tree if token list contain current node starting from current position </p><br/><p class="descr docMethod"><span class="def link">getError</span>()&nbsp;:&nbsp;<span class=param>Object</span></p><p class=sub_descr> Returns syntax error </p><br/>';
    }, function(n, e) {
        n.exports = '<h3><a href=#classes/EventEmitter class=link>EventEmitter</a> &#8594;<a href=#classes/AnalyzerNode class=link>AnalyzerNode</a> &#8594;</h3><h1>BlockNode</h1><p>Block node helps to parse block inside token list</p><p class=props>Constructor</p><p>See the base <a href=#classes/AnalyzerNode class=link>AnalyzerNode</a> class for common arguments.</p><h4 class="def docConstructor">BlockNode(<span class="def link">props.values</span>&nbsp;:&nbsp;<span class=param>Array</span>)</h4><div class=sub_descr><span class=link>props.values</span> - Array that contains opener and closer symbols</div><hr/>';
    }, function(n, e) {
        n.exports = '<h3><a href=#classes/EventEmitter class=link>EventEmitter</a> &#8594;<a href=#classes/AnalyzerNode class=link>AnalyzerNode</a> &#8594;</h3><h1>CombinedNode</h1><p>Helps to build AST using sequence of symbols</p><p class=props>Constructor</p><p>See the base <a href=#classes/AnalyzerNode class=link>AnalyzerNode</a> class for common arguments.</p><h4 class="def docConstructor">CombinedNode(<span class="def link">props.boundaries</span>&nbsp;:&nbsp;<span class=param>Array</span>)</h4><div class=sub_descr><span class=link>props.boundaries</span> - Array of symbols that should be used to stop parsing</div><hr/><p class=props>Properties</p><p>See the base <a href=#classes/AnalyzerNode class=link>AnalyzerNode</a> class for common properties.</p><p class="descr docProperty">.<span class="def link">boundaries</span>&nbsp;:&nbsp;<span class=param>Array</span></p><p class=sub_descr> Array of symbols that should be used to stop parsing </p><hr/>';
    }, function(n, e) {
        n.exports = '<h1>EventEmitter</h1><p>Class that helps to emit events</p><p class=props>Methods</p><p class="descr docMethod"><span class="def link">off</span>(<span class="def link">event</span>&nbsp;:&nbsp;<span class=param>String</span>,&nbsp;<span class="def link">callback</span>&nbsp;:&nbsp;<span class=param>Function</span>)&nbsp;:&nbsp;<span class=param>Void</span></p><p class=sub_descr> Clear listeners of the target event. If callback is not defined - remove all listeners </p><div class=sub_descr><span class=link>event</span> - Name of the event<br><span class=link>callback</span> - Callback that should be removed</div><br/><p class="descr docMethod"><span class="def link">on</span>(<span class="def link">event</span>&nbsp;:&nbsp;<span class=param>String</span>,&nbsp;<span class="def link">callback</span>&nbsp;:&nbsp;<span class=param>Function</span>)&nbsp;:&nbsp;<span class=param>Void</span></p><p class=sub_descr> Add event listener </p><div class=sub_descr><span class=link>event</span> - Name of the event<br><span class=link>callback</span> - Callback that will be executed</div><br/><p class="descr docMethod"><span class="def link">once</span>(<span class="def link">event</span>&nbsp;:&nbsp;<span class=param>String</span>,&nbsp;<span class="def link">callback</span>&nbsp;:&nbsp;<span class=param>Function</span>)&nbsp;:&nbsp;<span class=param>Void</span></p><p class=sub_descr> Add event listener once. It will be deleted after first execution </p><br/><p class="descr docMethod"><span class="def link">emit</span>(<span class="def link">event</span>&nbsp;:&nbsp;<span class=param>String</span>,&nbsp;<span class="def link">data</span>&nbsp;:&nbsp;<span class=param>Object | null</span>)&nbsp;:&nbsp;<span class=param>null</span></p><p class=sub_descr> Emit\'s event </p><div class=sub_descr><span class=link>event</span> - Name of the event<br><span class=link>data</span> - Data tha will be passed to the listener</div><br/>';
    }, function(n, e) {
        n.exports = '<h3><a href=#classes/EventEmitter class=link>EventEmitter</a> &#8594;<a href=#classes/AnalyzerNode class=link>AnalyzerNode</a> &#8594;</h3><h1>FunctionNode</h1><p>Helps to build AST using user functions</p><p class=props>Constructor</p><p>See the base <a href=#classes/AnalyzerNode class=link>AnalyzerNode</a> class for common arguments.</p><h4 class="def docConstructor">FunctionNode(<span class="def link">props.onTest</span>&nbsp;:&nbsp;<span class=param>Function</span>,&nbsp;<span class="def link">props.onRun</span>&nbsp;:&nbsp;<span class=param>Function</span>)</h4><div class=sub_descr><span class=link>props.onTest</span> - Used to test if array of the tokens contains current Node<br><span class=link>props.onRun</span> - Used to create a child Node if array of the tokens contains current Node</div><hr/><p class=props>Properties</p><p>See the base <a href=#classes/AnalyzerNode class=link>AnalyzerNode</a> class for common properties.</p><p class="descr docProperty">.<span class="def link">onTest</span>&nbsp;:&nbsp;<span class=param>Function</span></p><p class=sub_descr> Used to test if array of the tokens contains current Node </p><p class="descr docProperty">.<span class="def link">onRun</span>&nbsp;:&nbsp;<span class=param>Function</span></p><p class=sub_descr> Used to create a child Node if array of the tokens contains current Node </p><hr/>';
    }, function(n, e) {
        n.exports = '<h3><a href=#classes/EventEmitter class=link>EventEmitter</a> &#8594;<a href=#classes/AnalyzerNode class=link>AnalyzerNode</a> &#8594;</h3><h1>SequenceNode</h1><p>Sequence node helps to parse groups of tokens from token list</p><p class=props>Constructor</p><p>See the base <a href=#classes/AnalyzerNode class=link>AnalyzerNode</a> class for common arguments.</p><h4 class="def docConstructor">SequenceNode(<span class="def link">props.sequence</span>&nbsp;:&nbsp;<span class=param>Array</span>,&nbsp;<span class="def link">props.onError</span>&nbsp;:&nbsp;<span class=param>Function</span>)</h4><div class=sub_descr><span class=link>props.sequence</span> - The sequence of Node\'s, Tokens, Regular expressions, Objects<br><span class=link>props.onError</span> - The Syntax error callback</div><hr/><p class=props>Methods</p><p>See the base <a href=#classes/AnalyzerNode class=link>AnalyzerNode</a> class for common methods.</p><p class="descr docMethod"><span class="def link">getError</span>()&nbsp;:&nbsp;<span class=param>boolean</span></p><p class=sub_descr> Emit\'s the syntax error if it present </p><br/>';
    }, function(n, e) {
        n.exports = '<h3><a href=#classes/TokenSolver class=link>TokenSolver</a> &#8594;</h3><h1>StringSolver</h1><p>Helps to solve strings</p><p class=props>Properties</p><p>See the base <a href=#classes/TokenSolver class=link>TokenSolver</a> class for common properties.</p><p class="descr docProperty">.<span class="def link">delimiters</span>&nbsp;:&nbsp;<span class=param>Array</span></p><p class=sub_descr> Array of symbols that used to determine string </p><hr/>';
    }, function(n, e) {
        n.exports = '<h1>SyntaxAnalyzer</h1><p>Syntax analyzer is used to build AST from token list</p><p class=props>Constructor</p><h4 class="def docConstructor">SyntaxAnalyzer(<span class="def link">defaultNodes</span>&nbsp;:&nbsp;<span class=param>Array</span>)</h4><div class=sub_descr><span class=link>defaultNodes</span> - Array of default nodes</div><hr/><p class=props>Properties</p><p class="descr docProperty">.<span class="def link">tree</span>&nbsp;:&nbsp;<span class=param>SyntaxNode</span></p><p class=sub_descr> Root node of the AST </p><p class="descr docProperty">.<span class="def link">defaultNodeProps</span>&nbsp;:&nbsp;<span class=param>Array</span></p><p class=sub_descr> Array of default nodes </p><p class="descr docProperty">.<span class="def link">program</span>&nbsp;:&nbsp;<span class=param>String</span></p><p class=sub_descr> Program source code </p><hr/><p class=props>Static</p><p class="descr docMethod"><span class="def link">parseBlock</span>(<span class="def link">list</span>&nbsp;:&nbsp;<span class=param>Array</span>,&nbsp;<span class="def link">pos</span>&nbsp;:&nbsp;<span class=param>Number</span>,&nbsp;<span class="def link">opener</span>&nbsp;:&nbsp;<span class=param>String</span>,&nbsp;<span class="def link">closer</span>&nbsp;:&nbsp;<span class=param>String</span>)&nbsp;:&nbsp;<span class=param>Object | null</span></p><p class=sub_descr> Parses token list block starting from current position using opener and closer symbols </p><div class=sub_descr><span class=link>list</span> - Array of tokens<br><span class=link>pos</span> - Start position<br><span class=link>opener</span> - Block opening symbol<br><span class=link>closer</span> - Block ending symbol</div><br/><p class="descr docMethod"><span class="def link">getReducedValue</span>(<span class="def link">arr</span>&nbsp;:&nbsp;<span class=param>Array</span>,&nbsp;<span class="def link">i</span>&nbsp;:&nbsp;<span class=param>Number</span>,&nbsp;<span class="def link">count</span>&nbsp;:&nbsp;<span class=param>Number</span>,&nbsp;<span class="def link">key</span>&nbsp;:&nbsp;<span class=param>String</span>)&nbsp;:&nbsp;<span class=param>Void</span></p><p class=sub_descr> Returns reduced value from token list using start position, count and key </p><div class=sub_descr><span class=link>arr</span> - Array of tokens<br><span class=link>i</span> - Index to start from<br><span class=link>count</span> - Count of tokens to reduce<br><span class=link>key</span> - Value should be reduced by this key</div><br/><p class="descr docMethod"><span class="def link">parseMultipleBlock</span>(<span class="def link">list</span>&nbsp;:&nbsp;<span class=param>Array</span>,&nbsp;<span class="def link">pos</span>&nbsp;:&nbsp;<span class=param>Number</span>,&nbsp;<span class="def link">openers</span>&nbsp;:&nbsp;<span class=param>String</span>,&nbsp;<span class="def link">closers</span>&nbsp;:&nbsp;<span class=param>String</span>)&nbsp;:&nbsp;<span class=param>Object | null</span></p><p class=sub_descr> Parses token list block starting from current position using openers and closers symbols </p><div class=sub_descr><span class=link>list</span> - Array of tokens<br><span class=link>pos</span> - Start position<br><span class=link>openers</span> - Block opening symbols<br><span class=link>closers</span> - Block ending symbols</div><br/><p class=props>Methods</p><p class="descr docMethod"><span class="def link">analyze</span>(<span class="def link">tokenList</span>&nbsp;:&nbsp;<span class=param>Array</span>,&nbsp;<span class="def link">parent</span>&nbsp;:&nbsp;<span class=param>SyntaxNode</span>,&nbsp;<span class="def link">analyzerNodes</span>&nbsp;:&nbsp;<span class=param>Array</span>)&nbsp;:&nbsp;<span class=param>Void</span></p><p class=sub_descr> Analyzes token list using parent and analyzer nodes </p><div class=sub_descr><span class=link>tokenList</span> - List of the tokens to parse<br><span class=link>parent</span> - Parent node<br><span class=link>analyzerNodes</span> - Array of AnalyzerNodes</div><br/>';
    }, function(n, e) {
        n.exports = '<h1>SyntaxNode</h1><p>Base node of AST</p><p class=props>Properties</p><p class="descr docProperty">.<span class="def link">childs</span>&nbsp;:&nbsp;<span class=param>Array</span></p><p class=sub_descr> Array of child nodes </p><p class="descr docProperty">.<span class="def link">range</span>&nbsp;:&nbsp;<span class=param>Array</span></p><p class=sub_descr> Start & End point of the Node in the source code </p><hr/><p class=props>Methods</p><p class="descr docMethod"><span class="def link">findUp</span>(<span class="def link">nodeType</span>&nbsp;:&nbsp;<span class=param>String</span>)&nbsp;:&nbsp;<span class=param>SyntaxNode | null</span></p><p class=sub_descr> Finds a node with target type going through each parent node </p><div class=sub_descr><span class=link>nodeType</span> - Type of the node to search</div><br/><p class="descr docMethod"><span class="def link">findDown</span>(<span class="def link">nodeType</span>&nbsp;:&nbsp;<span class=param>String</span>)&nbsp;:&nbsp;<span class=param>SyntaxNode | null</span></p><p class=sub_descr> Finds a node with target type going through each child node </p><div class=sub_descr><span class=link>nodeType</span> - Type of the node to search</div><br/><p class="descr docMethod"><span class="def link">findIndex</span>(<span class="def link">node</span>&nbsp;:&nbsp;<span class=param>SyntaxNode</span>)&nbsp;:&nbsp;<span class=param>Number</span></p><p class=sub_descr> Returns index of passed node through the parent node, returns -1 if Node doesn\'t exist </p><div class=sub_descr><span class=link>node</span> - SyntaxNode to search</div><br/><p class="descr docMethod"><span class="def link">nextSibling</span>()&nbsp;:&nbsp;<span class=param>SyntaxNode | null</span></p><p class=sub_descr> Returns next sibling Node or null </p><br/><p class="descr docMethod"><span class="def link">prevSibling</span>()&nbsp;:&nbsp;<span class=param>SyntaxNode | null</span></p><p class=sub_descr> Returns previous sibling Node or null </p><br/><p class="descr docMethod"><span class="def link">traverse</span>(<span class="def link">callback</span>&nbsp;:&nbsp;<span class=param>Function</span>)&nbsp;:&nbsp;<span class=param>Void</span></p><p class=sub_descr> Execute a callback for each child node </p><div class=sub_descr><span class=link>callback</span> - Callback function</div><br/><p class="descr docMethod"><span class="def link">traverseAncestor</span>(<span class="def link">callback</span>&nbsp;:&nbsp;<span class=param>Function</span>)&nbsp;:&nbsp;<span class=param>Void</span></p><p class=sub_descr> Execute a callback for each parent node </p><div class=sub_descr><span class=link>callback</span> - Callback function</div><br/><p class="descr docMethod"><span class="def link">append</span>(<span class="def link">node</span>&nbsp;:&nbsp;<span class=param>SyntaxNode</span>)&nbsp;:&nbsp;<span class=param>Void</span></p><p class=sub_descr> Appends node to the target </p><div class=sub_descr><span class=link>node</span> - Node that will be attached to this</div><br/>';
    }, function(n, e) {
        n.exports = '<h1>TokenGroup</h1><p>Group that collect solvers and can be used to solve array of tokens</p><p class=props>Constructor</p><h4 class="def docConstructor">TokenGroup(<span class="def link">solvers</span>&nbsp;:&nbsp;<span class=param>Object</span>,&nbsp;<span class="def link">defaultSolverId</span>&nbsp;:&nbsp;<span class=param>String</span>)</h4><div class=sub_descr><span class=link>solvers</span> - Object that contains solvers as SolverName => SolverInstance<br><span class=link>defaultSolverId</span> - Name of the default solver</div><hr/><p class=props>Properties</p><p class="descr docProperty">.<span class="def link">solvers</span>&nbsp;:&nbsp;<span class=param>Object</span></p><p class=sub_descr> Object that contains solvers as SolverName => SolverInstance </p><p class="descr docProperty">.<span class="def link">defaultSolver</span>&nbsp;:&nbsp;<span class=param>String</span></p><p class=sub_descr> Name of the default solver </p><p class="descr docProperty">.<span class="def link">regexp</span>&nbsp;:&nbsp;<span class=param>RegExp</span></p><p class=sub_descr> Final regular expression that created with solvers </p><hr/><p class=props>Methods</p><p class="descr docMethod"><span class="def link">solve</span>(<span class="def link">program</span>&nbsp;:&nbsp;<span class=param>String</span>)&nbsp;:&nbsp;<span class=param>Array</span></p><p class=sub_descr> Solves array of tokens </p><br/>';
    }, function(n, e) {
        n.exports = '<h1>TokenSolver</h1><p>Base class for solving tokens</p><p class=props>Properties</p><p class="descr docProperty">.<span class="def link">include</span>&nbsp;:&nbsp;<span class=param>Array</span></p><p class=sub_descr> Array of words that can be used to parse token </p><p class="descr docProperty">.<span class="def link">symbols</span>&nbsp;:&nbsp;<span class=param>Array</span></p><p class=sub_descr> Array of symbols that can be used to parse token </p><p class="descr docProperty">.<span class="def link">regexp</span>&nbsp;:&nbsp;<span class=param>RegExp</span></p><p class=sub_descr> Regular expression to parse token </p><p class="descr docProperty">.<span class="def link">priority</span>&nbsp;:&nbsp;<span class=param>Number</span></p><p class=sub_descr> Priority for this token </p><hr/><p class=props>Methods</p><p class="descr docMethod"><span class="def link">solve</span>(<span class="def link">token</span>&nbsp;:&nbsp;<span class=param>Object</span>,&nbsp;<span class="def link">target</span>&nbsp;:&nbsp;<span class=param>Number</span>,&nbsp;<span class="def link">tokenList</span>&nbsp;:&nbsp;<span class=param>Array</span>,&nbsp;<span class="def link">program</span>&nbsp;:&nbsp;<span class=param>String</span>)&nbsp;:&nbsp;<span class=param>Object | null</span></p><p class=sub_descr> Solves token in token list </p><div class=sub_descr><span class=link>token</span> - Current token<br><span class=link>target</span> - Index of current token<br><span class=link>tokenList</span> - List of the tokens<br><span class=link>program</span> - Source code</div><br/><p class="descr docMethod"><span class="def link">build</span>()&nbsp;:&nbsp;<span class=param>*</span></p><p class=sub_descr> Used to build regexp from self properties } </p><br/>';
    }, function(n, e, s) {
        let a = s(32); typeof a === "string" && (a = [[n.i, a, ""]]); let t = {hmr: !0,
            transform: void 0,
            insertInto: void 0}; s(4)(a, t); a.locals && (n.exports = a.locals);
    }, function(n, e, s) {
        (n.exports = s(3)(!1)).push([n.i, '/**\n * prism.js Coy theme for JavaScript, CoffeeScript, CSS and HTML\n * Based on https://github.com/tshedor/workshop-wp-theme (Example: http://workshop.kansan.com/category/sessions/basics or http://workshop.timshedor.com/category/sessions/basics);\n * @author Tim  Shedor\n */\n\ncode[class*="language-"],\npre[class*="language-"] {\n\tcolor: black;\n\tbackground: none;\n\tfont-family: Consolas, Monaco, \'Andale Mono\', \'Ubuntu Mono\', monospace;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\n/* Code blocks */\npre[class*="language-"] {\n\tposition: relative;\n\tmargin: .5em 0;\n\toverflow: visible;\n\tpadding: 0;\n}\npre[class*="language-"]>code {\n\tposition: relative;\n\tborder-left: 10px solid #358ccb;\n\tbox-shadow: -1px 0px 0px 0px #358ccb, 0px 0px 0px 1px #dfdfdf;\n\tbackground-color: #fdfdfd;\n\tbackground-image: linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%);\n\tbackground-size: 3em 3em;\n\tbackground-origin: content-box;\n\tbackground-attachment: local;\n}\n\ncode[class*="language"] {\n\tmax-height: inherit;\n\theight: inherit;\n\tpadding: 0 1em;\n\tdisplay: block;\n\toverflow: auto;\n}\n\n/* Margin bottom to accomodate shadow */\n:not(pre) > code[class*="language-"],\npre[class*="language-"] {\n\tbackground-color: #fdfdfd;\n\t-webkit-box-sizing: border-box;\n\t-moz-box-sizing: border-box;\n\tbox-sizing: border-box;\n\tmargin-bottom: 1em;\n}\n\n/* Inline code */\n:not(pre) > code[class*="language-"] {\n\tposition: relative;\n\tpadding: .2em;\n\tborder-radius: 0.3em;\n\tcolor: #c92c2c;\n\tborder: 1px solid rgba(0, 0, 0, 0.1);\n\tdisplay: inline;\n\twhite-space: normal;\n}\n\npre[class*="language-"]:before,\npre[class*="language-"]:after {\n\tcontent: \'\';\n\tz-index: -2;\n\tdisplay: block;\n\tposition: absolute;\n\tbottom: 0.75em;\n\tleft: 0.18em;\n\twidth: 40%;\n\theight: 20%;\n\tmax-height: 13em;\n\tbox-shadow: 0px 13px 8px #979797;\n\t-webkit-transform: rotate(-2deg);\n\t-moz-transform: rotate(-2deg);\n\t-ms-transform: rotate(-2deg);\n\t-o-transform: rotate(-2deg);\n\ttransform: rotate(-2deg);\n}\n\n:not(pre) > code[class*="language-"]:after,\npre[class*="language-"]:after {\n\tright: 0.75em;\n\tleft: auto;\n\t-webkit-transform: rotate(2deg);\n\t-moz-transform: rotate(2deg);\n\t-ms-transform: rotate(2deg);\n\t-o-transform: rotate(2deg);\n\ttransform: rotate(2deg);\n}\n\n.token.comment,\n.token.block-comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: #7D8B99;\n}\n\n.token.punctuation {\n\tcolor: #5F6364;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.function-name,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #c92c2c;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.function,\n.token.builtin,\n.token.inserted {\n\tcolor: #2f9c0a;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.token.variable {\n\tcolor: #a67f59;\n\tbackground: rgba(255, 255, 255, 0.5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword,\n.token.class-name {\n\tcolor: #1990b8;\n}\n\n.token.regex,\n.token.important {\n\tcolor: #e90;\n}\n\n.language-css .token.string,\n.style .token.string {\n\tcolor: #a67f59;\n\tbackground: rgba(255, 255, 255, 0.5);\n}\n\n.token.important {\n\tfont-weight: normal;\n}\n\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n\n.namespace {\n\topacity: .7;\n}\n\n@media screen and (max-width: 767px) {\n\tpre[class*="language-"]:before,\n\tpre[class*="language-"]:after {\n\t\tbottom: 14px;\n\t\tbox-shadow: none;\n\t}\n\n}\n\n/* Plugin styles */\n.token.tab:not(:empty):before,\n.token.cr:before,\n.token.lf:before {\n\tcolor: #e0d7d1;\n}\n\n/* Plugin styles: Line Numbers */\npre[class*="language-"].line-numbers.line-numbers {\n\tpadding-left: 0;\n}\n\npre[class*="language-"].line-numbers.line-numbers code {\n\tpadding-left: 3.8em;\n}\n\npre[class*="language-"].line-numbers.line-numbers .line-numbers-rows {\n\tleft: 0;\n}\n\n/* Plugin styles: Line Highlight */\npre[class*="language-"][data-line] {\n\tpadding-top: 0;\n\tpadding-bottom: 0;\n\tpadding-left: 0;\n}\npre[data-line] code {\n\tposition: relative;\n\tpadding-left: 4em;\n}\npre .line-highlight {\n\tmargin-top: 0;\n}\n', ""]);
    }, function(n, e) {
        n.exports = function(n) {
            let e = typeof window !== "undefined" && window.location; if(!e) {
                throw new Error("fixUrls requires window.location");
            }if(!n || typeof n !== "string") {
                return n;
            }let s = `${e.protocol}//${e.host}`,
                a = s + e.pathname.replace(/\/[^\/]*$/, "/");

            return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, (n, e) => {
                let t,
                    r = e.trim().replace(/^"(.*)"$/, (n, e) => {
                        return e;
                    }).
                        replace(/^'(.*)'$/, (n, e) => {
                            return e;
                        });

                return(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i).test(r) ? n : (t = r.indexOf("//") === 0 ? r : r.indexOf("/") === 0 ? s + r : a + r.replace(/^\.\//, ""), `url(${JSON.stringify(t)})`);
            });
        };
    }, function(n, e, s) {
        let a = s(35); typeof a === "string" && (a = [[n.i, a, ""]]); let t = {hmr: !0,
            transform: void 0,
            insertInto: void 0}; s(4)(a, t); a.locals && (n.exports = a.locals);
    }, function(n, e, s) {
        (e = n.exports = s(3)(!1)).push([n.i, "@import url(https://fonts.googleapis.com/css?family=Roboto:100);", ""]), e.push([n.i, 'body {\n    margin: 0;\n    background-color: #fefefe;\n    color: #212128;\n    animation: 1.0s fadeIn ease-out;\n}\n\nnav, main {\n    font-family: Roboto;\n    font-weight: 100;\n    box-sizing: border-box;\n}\n\nh1, h2, h3, h4, h5 {\n    font-family: Roboto;\n    font-weight: 100;\n}\n\ncode[class*="language-"] {\n    margin-bottom: -23px;\n}\n\nnav.menu {\n    background-color: #f8f8f9;\n    width: 260px;\n    height: 100vh;\n    position: fixed;\n\n    z-index: 10;\n\n    display: flex;\n    flex-direction: column;\n}\n\nmain.content {\n    height: 100vh;\n    width: 100vw;\n    padding-left: 260px;\n    overflow-y: auto;\n}\n\n.content .content_main {\n    padding: 32px;\n}\n\n.slide-to-right {\n    animation: 0.5s slideToRight ease-in-out;\n}\n\n.slide-from-left {\n    animation: 0.5s slideFromLeft ease-in-out;\n}\n\n@keyframes slideFromLeft {\n    0% {\n        transform: translate(-30%, 0);\n        opacity: 0;\n    }\n    100% {\n        transform: translate(0, 0);\n        opacity: 1;\n    }\n}\n\n@keyframes slideToRight {\n    0% {\n        transform: translate(0, 0);\n        opacity: 1;\n    }\n    100% {\n        transform: translate(30%, 0);\n        opacity: 0;\n    }\n}\n\n@keyframes slideFromBottom {\n    0% {\n        transform: translate(0, 30%);\n        opacity: 0;\n    }\n    100% {\n        transform: translate(0, 0);\n        opacity: 1;\n    }\n}\n\n@keyframes fadeIn {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n\n.menu hr {\n    width: 100%;\n    margin: 0;\n    border-top: 0;\n    box-sizing: border-box;\n}\n\n.menu_item {\n    display: flex;\n    height: 48px;\n    align-items: center;\n    justify-content: center;\n}\n\n.menu_item.menu_head {\n    font-size: 26px;\n    margin: 16px;\n}\n\n.menu_item.menu_search input {\n    height: 100%;\n    border: 0;\n    outline: 0;\n    width: 100%;\n    font-size: 14px;\n    padding: 0 8px;\n    background-color: transparent;\n}\n\n.menu_item.full_height {\n    height: 100%;\n    flex: 1;\n}\n\n.list {\n    overflow-y: auto;\n    justify-content: flex-start;\n    align-items: flex-start;\n    flex-direction: column;\n    padding: 8px 16px;\n\n    animation: 0.75s slideFromBottom ease-out;\n}\n\n.link {\n    color: #42a5f5;\n    cursor: pointer;\n    text-decoration: none;\n}\n\n.content .link {\n    font-weight: 600;\n}\n\n.content .attr {\n    color: #42a5f5;\n    cursor: pointer;\n    text-decoration: none;\n    font-weight: 400;\n    font-size: 14px;\n}\n\n.content .descr {\n    margin: 2px 0;\n}\n\n.content .sub_descr {\n    font-size: 14px;\n}\n\n.sub_descr .link {\n    font-size: 13px;\n    color: #1976D2;\n}\n\n.content .props {\n    color: #81c784;\n    font-weight: 600;\n    font-size: 18px;\n}\n\n.content .param {\n    color: #a0a0b4;\n    font-weight: 500;\n}\n\n.content .def {\n    /*color: #212128;*/\n    font-weight: 400;\n}\n\n.content .pd {\n    padding: 16px;\n    padding-right: 0;\n    margin: 0;\n}\n\n.content hr {\n    border-top: 0;\n}\n\n.docMethod > .def:first-child {\n    font-weight: 600;\n}\n\n.bold {\n    font-weight: 600;\n}\n\n.blue {\n    color: #42a5f5;\n}\n\n.list .head {\n    font-size: 20px;\n    margin: 14px 0;\n}\n\n.list .subhead {\n    font-size: 16px;\n    color: #333333;\n    margin: 6px 0;\n}\n\n.list .link {\n    font-size: 14px;\n    padding: 1px 0;\n}\n\n/*\ncode[class*="language-"] {\n    margin-bottom: -47px;\n}*/\n', ""]);
    }, function(n, e, s) {
        "use strict";

        s.r(e); let a = s(5),
            t = s.n(a); class r {
                constructor() {
                this.map = {};
            }

                on(n, e) {
                this.map[n] || (this.map[n] = []), this.map[n].push(e);
            }

                off(n, e) {
                return Boolean(this.map[n]) && (this.map[n] = this.map[n].map((n) => n !== e), !0);
            }

                clear(n) {
                this.map[n] = null;
            }

                clearAll() {
                this.map = {};
            }

                dispatch(n, e) {
                if(!this.map[n]) {
                        return!1;
                    }for(let s of this.map[n]) {
                    s({data: e,
                            type: n});
                }
            }
        }let o = s(0),
            p = s.n(o); s(31), s(34); const l = s(13); let i = document.querySelector(".content .content_main"),
            c = new class extends r {
                    constructor(n, e) {
                    super(), this.routes = n, this.pages = e, this.history = t()(), this.currentPage = "default", this.unlisten = this.history.listen(() => {
                            this.processHash();
                        });
                }

                    dispatchDefaultPage() {
                    if(!this.currentPage) {
                            return!1;
                        }this.currentPage = "", this.dispatch("route-changed", {route: "default",
                        parts: [],
                        content: this.pages[this.routes.default]});
                }

                    update() {
                    this.processHash();
                }

                    processHash() {
                    if(this.history.location.hash) {
                            let n = this.getHashInfo(this.history.location.hash),
                            e = this.routes[n.join("/")]; if(e && e === this.currentPage) {
                            return!1;
                                }e ? this.pages[e] && (this.dispatch("route-changed", {route: e,
                            parts: n,
                            content: this.pages[e]}), this.currentPage = e) : this.dispatchDefaultPage();
                        }else {
                            this.dispatchDefaultPage();
                        }
                }

                    getHashInfo(n) {
                    return n.slice(1).split("/");
                }

                    destroy() {
                    this.unlisten();
                }
            }({default: "Default.html",
                LexicalAnalysis: "LexicalAnalysis.html",
                Parsing: "Parsing.html",
                SolversTips: "SolversTips.html",
                ParsingTips: "ParsingTips.html",
                "classes/TokenSolver": "reference/classes/TokenSolver.html",
                "classes/StringSolver": "reference/classes/StringSolver.html",
                "classes/TokenGroup": "reference/classes/TokenGroup.html",
                "classes/SyntaxNode": "reference/classes/SyntaxNode.html",
                "classes/SyntaxAnalyzer": "reference/classes/SyntaxAnalyzer.html",
                "classes/AnalyzerNode": "reference/classes/AnalyzerNode.html",
                "classes/SequenceNode": "reference/classes/SequenceNode.html",
                "classes/BlockNode": "reference/classes/BlockNode.html",
                "classes/CombinedNode": "reference/classes/CombinedNode.html",
                "classes/FunctionNode": "reference/classes/FunctionNode.html",
                "classes/EventEmitter": "reference/classes/EventEmitter.html"}, l); c.on("route-changed", (n) => {
                    !(function(n, e, s) {
                n.classList.add("slide-to-right"), n.style.webkitAnimationPlayState = "running", setTimeout(() => {
                            n.classList.remove("slide-to-right"), (function(n) {
                        for(;n.firstChild;) {
                                    n.removeChild(n.firstChild);
                                }
                    }(i)), i.innerHTML = e, document.querySelector(".content").scrollTop = 0, s(), n.classList.add("slide-from-left"), setTimeout(() => {
                                n.classList.remove("slide-from-left");
                            }, 450);
                        }, 450);
            }(i, n.data.content, () => {
                        !(function(n, e) {
                    n.forEach((n) => {
                                n.innerHTML = p.a.highlight(`${n.innerText}\n`, p.a.languages[e], e);
                            });
                }(i.querySelectorAll("code.language-js"), "javascript"));
                    }));
        }), c.update(), console.log(l);
    }
]));
