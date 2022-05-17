!(function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ?
        (module.exports = e()) :
        "function" == typeof define && define.amd ?
        define(e) :
        ((t =
                "undefined" != typeof globalThis ? globalThis : t || self).bootstrap =
            e());
})(this, function() {
    "use strict";
    const t = {
            find: (t, e = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e, t)),
            findOne: (t, e = document.documentElement) =>
                Element.prototype.querySelector.call(e, t),
            children: (t, e) => [].concat(...t.children).filter((t) => t.matches(e)),
            parents(t, e) {
                const i = [];
                let n = t.parentNode;
                for (; n && n.nodeType === Node.ELEMENT_NODE && 3 !== n.nodeType;)
                    n.matches(e) && i.push(n), (n = n.parentNode);
                return i;
            },
            prev(t, e) {
                let i = t.previousElementSibling;
                for (; i;) {
                    if (i.matches(e)) return [i];
                    i = i.previousElementSibling;
                }
                return [];
            },
            next(t, e) {
                let i = t.nextElementSibling;
                for (; i;) {
                    if (i.matches(e)) return [i];
                    i = i.nextElementSibling;
                }
                return [];
            },
        },
        e = (t) => {
            do {
                t += Math.floor(1e6 * Math.random());
            } while (document.getElementById(t));
            return t;
        },
        i = (t) => {
            let e = t.getAttribute("data-bs-target");
            if (!e || "#" === e) {
                let i = t.getAttribute("href");
                if (!i || (!i.includes("#") && !i.startsWith("."))) return null;
                i.includes("#") && !i.startsWith("#") && (i = "#" + i.split("#")[1]),
                    (e = i && "#" !== i ? i.trim() : null);
            }
            return e;
        },
        n = (t) => {
            const e = i(t);
            return e && document.querySelector(e) ? e : null;
        },
        s = (t) => {
            const e = i(t);
            return e ? document.querySelector(e) : null;
        },
        o = (t) => {
            t.dispatchEvent(new Event("transitionend"));
        },
        r = (t) =>
        !(!t || "object" != typeof t) &&
        (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType),
        a = (e) =>
        r(e) ?
        e.jquery ?
        e[0] :
        e :
        "string" == typeof e && e.length > 0 ?
        t.findOne(e) :
        null,
        l = (t, e, i) => {
            Object.keys(i).forEach((n) => {
                const s = i[n],
                    o = e[n],
                    a =
                    o && r(o) ?
                    "element" :
                    null == (l = o) ?
                    "" + l : {}.toString
                    .call(l)
                    .match(/\s([a-z]+)/i)[1]
                    .toLowerCase();
                var l;
                if (!new RegExp(s).test(a))
                    throw new TypeError(
                        `${t.toUpperCase()}: Option "${n}" provided type "${a}" but expected type "${s}".`
                    );
            });
        },
        c = (t) =>
        !(!r(t) || 0 === t.getClientRects().length) &&
        "visible" === getComputedStyle(t).getPropertyValue("visibility"),
        h = (t) =>
        !t ||
        t.nodeType !== Node.ELEMENT_NODE ||
        !!t.classList.contains("disabled") ||
        (void 0 !== t.disabled ?
            t.disabled :
            t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")),
        d = (t) => {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof t.getRootNode) {
                const e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null;
            }
            return t instanceof ShadowRoot ?
                t :
                t.parentNode ?
                d(t.parentNode) :
                null;
        },
        u = () => {},
        f = (t) => t.offsetHeight,
        p = () => {
            const { jQuery: t } = window;
            return t && !document.body.hasAttribute("data-bs-no-jquery") ? t : null;
        },
        m = [],
        g = () => "rtl" === document.documentElement.dir,
        _ = (t) => {
            var e;
            (e = () => {
                const e = p();
                if (e) {
                    const i = t.NAME,
                        n = e.fn[i];
                    (e.fn[i] = t.jQueryInterface),
                    (e.fn[i].Constructor = t),
                    (e.fn[i].noConflict = () => ((e.fn[i] = n), t.jQueryInterface));
                }
            }),
            "loading" === document.readyState ?
                (m.length ||
                    document.addEventListener("DOMContentLoaded", () => {
                        m.forEach((t) => t());
                    }),
                    m.push(e)) :
                e();
        },
        b = (t) => {
            "function" == typeof t && t();
        },
        v = (t, e, i = !0) => {
            if (!i) return void b(t);
            const n =
                ((t) => {
                    if (!t) return 0;
                    let { transitionDuration: e, transitionDelay: i } =
                    window.getComputedStyle(t);
                    const n = Number.parseFloat(e),
                        s = Number.parseFloat(i);
                    return n || s ?
                        ((e = e.split(",")[0]),
                            (i = i.split(",")[0]),
                            1e3 * (Number.parseFloat(e) + Number.parseFloat(i))) :
                        0;
                })(e) + 5;
            let s = !1;
            const r = ({ target: i }) => {
                i === e && ((s = !0), e.removeEventListener("transitionend", r), b(t));
            };
            e.addEventListener("transitionend", r),
                setTimeout(() => {
                    s || o(e);
                }, n);
        },
        y = (t, e, i, n) => {
            let s = t.indexOf(e);
            if (-1 === s) return t[!i && n ? t.length - 1 : 0];
            const o = t.length;
            return (
                (s += i ? 1 : -1),
                n && (s = (s + o) % o),
                t[Math.max(0, Math.min(s, o - 1))]
            );
        },
        w = /[^.]*(?=\..*)\.|.*/,
        E = /\..*/,
        A = /::\d+$/,
        T = {};
    let O = 1;
    const C = { mouseenter: "mouseover", mouseleave: "mouseout" },
        k = /^(mouseenter|mouseleave)/i,
        L = new Set([
            "click",
            "dblclick",
            "mouseup",
            "mousedown",
            "contextmenu",
            "mousewheel",
            "DOMMouseScroll",
            "mouseover",
            "mouseout",
            "mousemove",
            "selectstart",
            "selectend",
            "keydown",
            "keypress",
            "keyup",
            "orientationchange",
            "touchstart",
            "touchmove",
            "touchend",
            "touchcancel",
            "pointerdown",
            "pointermove",
            "pointerup",
            "pointerleave",
            "pointercancel",
            "gesturestart",
            "gesturechange",
            "gestureend",
            "focus",
            "blur",
            "change",
            "reset",
            "select",
            "submit",
            "focusin",
            "focusout",
            "load",
            "unload",
            "beforeunload",
            "resize",
            "move",
            "DOMContentLoaded",
            "readystatechange",
            "error",
            "abort",
            "scroll",
        ]);

    function x(t, e) {
        return (e && `${e}::${O++}`) || t.uidEvent || O++;
    }

    function D(t) {
        const e = x(t);
        return (t.uidEvent = e), (T[e] = T[e] || {}), T[e];
    }

    function S(t, e, i = null) {
        const n = Object.keys(t);
        for (let s = 0, o = n.length; s < o; s++) {
            const o = t[n[s]];
            if (o.originalHandler === e && o.delegationSelector === i) return o;
        }
        return null;
    }

    function I(t, e, i) {
        const n = "string" == typeof e,
            s = n ? i : e;
        let o = M(t);
        return L.has(o) || (o = t), [n, s, o];
    }

    function N(t, e, i, n, s) {
        if ("string" != typeof e || !t) return;
        if ((i || ((i = n), (n = null)), k.test(e))) {
            const t = (t) =>
                function(e) {
                    if (!e.relatedTarget ||
                        (e.relatedTarget !== e.delegateTarget &&
                            !e.delegateTarget.contains(e.relatedTarget))
                    )
                        return t.call(this, e);
                };
            n ? (n = t(n)) : (i = t(i));
        }
        const [o, r, a] = I(e, i, n),
            l = D(t),
            c = l[a] || (l[a] = {}),
            h = S(c, r, o ? i : null);
        if (h) return void(h.oneOff = h.oneOff && s);
        const d = x(r, e.replace(w, "")),
            u = o ?
            (function(t, e, i) {
                return function n(s) {
                    const o = t.querySelectorAll(e);
                    for (let { target: r } = s; r && r !== this; r = r.parentNode)
                        for (let a = o.length; a--;)
                            if (o[a] === r)
                                return (
                                    (s.delegateTarget = r),
                                    n.oneOff && P.off(t, s.type, e, i),
                                    i.apply(r, [s])
                                );
                    return null;
                };
            })(t, i, n) :
            (function(t, e) {
                return function i(n) {
                    return (
                        (n.delegateTarget = t),
                        i.oneOff && P.off(t, n.type, e),
                        e.apply(t, [n])
                    );
                };
            })(t, i);
        (u.delegationSelector = o ? i : null),
        (u.originalHandler = r),
        (u.oneOff = s),
        (u.uidEvent = d),
        (c[d] = u),
        t.addEventListener(a, u, o);
    }

    function j(t, e, i, n, s) {
        const o = S(e[i], n, s);
        o && (t.removeEventListener(i, o, Boolean(s)), delete e[i][o.uidEvent]);
    }

    function M(t) {
        return (t = t.replace(E, "")), C[t] || t;
    }
    const P = {
            on(t, e, i, n) {
                N(t, e, i, n, !1);
            },
            one(t, e, i, n) {
                N(t, e, i, n, !0);
            },
            off(t, e, i, n) {
                if ("string" != typeof e || !t) return;
                const [s, o, r] = I(e, i, n),
                    a = r !== e,
                    l = D(t),
                    c = e.startsWith(".");
                if (void 0 !== o) {
                    if (!l || !l[r]) return;
                    return void j(t, l, r, o, s ? i : null);
                }
                c &&
                    Object.keys(l).forEach((i) => {
                        !(function(t, e, i, n) {
                            const s = e[i] || {};
                            Object.keys(s).forEach((o) => {
                                if (o.includes(n)) {
                                    const n = s[o];
                                    j(t, e, i, n.originalHandler, n.delegationSelector);
                                }
                            });
                        })(t, l, i, e.slice(1));
                    });
                const h = l[r] || {};
                Object.keys(h).forEach((i) => {
                    const n = i.replace(A, "");
                    if (!a || e.includes(n)) {
                        const e = h[i];
                        j(t, l, r, e.originalHandler, e.delegationSelector);
                    }
                });
            },
            trigger(t, e, i) {
                if ("string" != typeof e || !t) return null;
                const n = p(),
                    s = M(e),
                    o = e !== s,
                    r = L.has(s);
                let a,
                    l = !0,
                    c = !0,
                    h = !1,
                    d = null;
                return (
                    o &&
                    n &&
                    ((a = n.Event(e, i)),
                        n(t).trigger(a),
                        (l = !a.isPropagationStopped()),
                        (c = !a.isImmediatePropagationStopped()),
                        (h = a.isDefaultPrevented())),
                    r ?
                    ((d = document.createEvent("HTMLEvents")), d.initEvent(s, l, !0)) :
                    (d = new CustomEvent(e, { bubbles: l, cancelable: !0 })),
                    void 0 !== i &&
                    Object.keys(i).forEach((t) => {
                        Object.defineProperty(d, t, { get: () => i[t] });
                    }),
                    h && d.preventDefault(),
                    c && t.dispatchEvent(d),
                    d.defaultPrevented && void 0 !== a && a.preventDefault(),
                    d
                );
            },
        },
        H = new Map();
    var R = {
        set(t, e, i) {
            H.has(t) || H.set(t, new Map());
            const n = H.get(t);
            n.has(e) || 0 === n.size ?
                n.set(e, i) :
                console.error(
                    `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
              Array.from(n.keys())[0]
            }.`
                );
        },
        get: (t, e) => (H.has(t) && H.get(t).get(e)) || null,
        remove(t, e) {
            if (!H.has(t)) return;
            const i = H.get(t);
            i.delete(e), 0 === i.size && H.delete(t);
        },
    };
    class B {
        constructor(t) {
            (t = a(t)) &&
            ((this._element = t),
                R.set(this._element, this.constructor.DATA_KEY, this));
        }
        dispose() {
            R.remove(this._element, this.constructor.DATA_KEY),
                P.off(this._element, this.constructor.EVENT_KEY),
                Object.getOwnPropertyNames(this).forEach((t) => {
                    this[t] = null;
                });
        }
        _queueCallback(t, e, i = !0) {
            v(t, e, i);
        }
        static getInstance(t) {
            return R.get(t, this.DATA_KEY);
        }
        static getOrCreateInstance(t, e = {}) {
            return (
                this.getInstance(t) || new this(t, "object" == typeof e ? e : null)
            );
        }
        static get VERSION() {
            return "5.0.2";
        }
        static get NAME() {
            throw new Error(
                'You have to implement the static method "NAME", for each component!'
            );
        }
        static get DATA_KEY() {
            return "bs." + this.NAME;
        }
        static get EVENT_KEY() {
            return "." + this.DATA_KEY;
        }
    }
    class W extends B {
        static get NAME() {
            return "alert";
        }
        close(t) {
            const e = t ? this._getRootElement(t) : this._element,
                i = this._triggerCloseEvent(e);
            null === i || i.defaultPrevented || this._removeElement(e);
        }
        _getRootElement(t) {
            return s(t) || t.closest(".alert");
        }
        _triggerCloseEvent(t) {
            return P.trigger(t, "close.bs.alert");
        }
        _removeElement(t) {
            t.classList.remove("show");
            const e = t.classList.contains("fade");
            this._queueCallback(() => this._destroyElement(t), t, e);
        }
        _destroyElement(t) {
            t.remove(), P.trigger(t, "closed.bs.alert");
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = W.getOrCreateInstance(this);
                "close" === t && e[t](this);
            });
        }
        static handleDismiss(t) {
            return function(e) {
                e && e.preventDefault(), t.close(this);
            };
        }
    }
    P.on(
            document,
            "click.bs.alert.data-api",
            '[data-bs-dismiss="alert"]',
            W.handleDismiss(new W())
        ),
        _(W);
    class q extends B {
        static get NAME() {
            return "button";
        }
        toggle() {
            this._element.setAttribute(
                "aria-pressed",
                this._element.classList.toggle("active")
            );
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = q.getOrCreateInstance(this);
                "toggle" === t && e[t]();
            });
        }
    }

    function z(t) {
        return (
            "true" === t ||
            ("false" !== t &&
                (t === Number(t).toString() ?
                    Number(t) :
                    "" === t || "null" === t ?
                    null :
                    t))
        );
    }

    function $(t) {
        return t.replace(/[A-Z]/g, (t) => "-" + t.toLowerCase());
    }
    P.on(
            document,
            "click.bs.button.data-api",
            '[data-bs-toggle="button"]',
            (t) => {
                t.preventDefault();
                const e = t.target.closest('[data-bs-toggle="button"]');
                q.getOrCreateInstance(e).toggle();
            }
        ),
        _(q);
    const U = {
            setDataAttribute(t, e, i) {
                t.setAttribute("data-bs-" + $(e), i);
            },
            removeDataAttribute(t, e) {
                t.removeAttribute("data-bs-" + $(e));
            },
            getDataAttributes(t) {
                if (!t) return {};
                const e = {};
                return (
                    Object.keys(t.dataset)
                    .filter((t) => t.startsWith("bs"))
                    .forEach((i) => {
                        let n = i.replace(/^bs/, "");
                        (n = n.charAt(0).toLowerCase() + n.slice(1, n.length)),
                        (e[n] = z(t.dataset[i]));
                    }),
                    e
                );
            },
            getDataAttribute: (t, e) => z(t.getAttribute("data-bs-" + $(e))),
            offset(t) {
                const e = t.getBoundingClientRect();
                return {
                    top: e.top + document.body.scrollTop,
                    left: e.left + document.body.scrollLeft,
                };
            },
            position: (t) => ({ top: t.offsetTop, left: t.offsetLeft }),
        },
        F = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0,
        },
        V = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean",
        },
        K = "next",
        X = "prev",
        Y = "left",
        Q = "right",
        G = { ArrowLeft: Q, ArrowRight: Y };
    class Z extends B {
        constructor(e, i) {
            super(e),
                (this._items = null),
                (this._interval = null),
                (this._activeElement = null),
                (this._isPaused = !1),
                (this._isSliding = !1),
                (this.touchTimeout = null),
                (this.touchStartX = 0),
                (this.touchDeltaX = 0),
                (this._config = this._getConfig(i)),
                (this._indicatorsElement = t.findOne(
                    ".carousel-indicators",
                    this._element
                )),
                (this._touchSupported =
                    "ontouchstart" in document.documentElement ||
                    navigator.maxTouchPoints > 0),
                (this._pointerEvent = Boolean(window.PointerEvent)),
                this._addEventListeners();
        }
        static get Default() {
            return F;
        }
        static get NAME() {
            return "carousel";
        }
        next() {
            this._slide(K);
        }
        nextWhenVisible() {
            !document.hidden && c(this._element) && this.next();
        }
        prev() {
            this._slide(X);
        }
        pause(e) {
            e || (this._isPaused = !0),
                t.findOne(".carousel-item-next, .carousel-item-prev", this._element) &&
                (o(this._element), this.cycle(!0)),
                clearInterval(this._interval),
                (this._interval = null);
        }
        cycle(t) {
            t || (this._isPaused = !1),
                this._interval &&
                (clearInterval(this._interval), (this._interval = null)),
                this._config &&
                this._config.interval &&
                !this._isPaused &&
                (this._updateInterval(),
                    (this._interval = setInterval(
                        (document.visibilityState ? this.nextWhenVisible : this.next).bind(
                            this
                        ),
                        this._config.interval
                    )));
        }
        to(e) {
            this._activeElement = t.findOne(".active.carousel-item", this._element);
            const i = this._getItemIndex(this._activeElement);
            if (e > this._items.length - 1 || e < 0) return;
            if (this._isSliding)
                return void P.one(this._element, "slid.bs.carousel", () => this.to(e));
            if (i === e) return this.pause(), void this.cycle();
            const n = e > i ? K : X;
            this._slide(n, this._items[e]);
        }
        _getConfig(t) {
            return (
                (t = {
                    ...F,
                    ...U.getDataAttributes(this._element),
                    ...("object" == typeof t ? t : {}),
                }),
                l("carousel", t, V),
                t
            );
        }
        _handleSwipe() {
            const t = Math.abs(this.touchDeltaX);
            if (t <= 40) return;
            const e = t / this.touchDeltaX;
            (this.touchDeltaX = 0), e && this._slide(e > 0 ? Q : Y);
        }
        _addEventListeners() {
            this._config.keyboard &&
                P.on(this._element, "keydown.bs.carousel", (t) => this._keydown(t)),
                "hover" === this._config.pause &&
                (P.on(this._element, "mouseenter.bs.carousel", (t) => this.pause(t)),
                    P.on(this._element, "mouseleave.bs.carousel", (t) => this.cycle(t))),
                this._config.touch &&
                this._touchSupported &&
                this._addTouchEventListeners();
        }
        _addTouchEventListeners() {
            const e = (t) => {
                    !this._pointerEvent ||
                        ("pen" !== t.pointerType && "touch" !== t.pointerType) ?
                        this._pointerEvent || (this.touchStartX = t.touches[0].clientX) :
                        (this.touchStartX = t.clientX);
                },
                i = (t) => {
                    this.touchDeltaX =
                        t.touches && t.touches.length > 1 ?
                        0 :
                        t.touches[0].clientX - this.touchStartX;
                },
                n = (t) => {
                    !this._pointerEvent ||
                        ("pen" !== t.pointerType && "touch" !== t.pointerType) ||
                        (this.touchDeltaX = t.clientX - this.touchStartX),
                        this._handleSwipe(),
                        "hover" === this._config.pause &&
                        (this.pause(),
                            this.touchTimeout && clearTimeout(this.touchTimeout),
                            (this.touchTimeout = setTimeout(
                                (t) => this.cycle(t),
                                500 + this._config.interval
                            )));
                };
            t.find(".carousel-item img", this._element).forEach((t) => {
                    P.on(t, "dragstart.bs.carousel", (t) => t.preventDefault());
                }),
                this._pointerEvent ?
                (P.on(this._element, "pointerdown.bs.carousel", (t) => e(t)),
                    P.on(this._element, "pointerup.bs.carousel", (t) => n(t)),
                    this._element.classList.add("pointer-event")) :
                (P.on(this._element, "touchstart.bs.carousel", (t) => e(t)),
                    P.on(this._element, "touchmove.bs.carousel", (t) => i(t)),
                    P.on(this._element, "touchend.bs.carousel", (t) => n(t)));
        }
        _keydown(t) {
            if (/input|textarea/i.test(t.target.tagName)) return;
            const e = G[t.key];
            e && (t.preventDefault(), this._slide(e));
        }
        _getItemIndex(e) {
            return (
                (this._items =
                    e && e.parentNode ? t.find(".carousel-item", e.parentNode) : []),
                this._items.indexOf(e)
            );
        }
        _getItemByOrder(t, e) {
            const i = t === K;
            return y(this._items, e, i, this._config.wrap);
        }
        _triggerSlideEvent(e, i) {
            const n = this._getItemIndex(e),
                s = this._getItemIndex(
                    t.findOne(".active.carousel-item", this._element)
                );
            return P.trigger(this._element, "slide.bs.carousel", {
                relatedTarget: e,
                direction: i,
                from: s,
                to: n,
            });
        }
        _setActiveIndicatorElement(e) {
            if (this._indicatorsElement) {
                const i = t.findOne(".active", this._indicatorsElement);
                i.classList.remove("active"), i.removeAttribute("aria-current");
                const n = t.find("[data-bs-target]", this._indicatorsElement);
                for (let t = 0; t < n.length; t++)
                    if (
                        Number.parseInt(n[t].getAttribute("data-bs-slide-to"), 10) ===
                        this._getItemIndex(e)
                    ) {
                        n[t].classList.add("active"),
                            n[t].setAttribute("aria-current", "true");
                        break;
                    }
            }
        }
        _updateInterval() {
            const e =
                this._activeElement ||
                t.findOne(".active.carousel-item", this._element);
            if (!e) return;
            const i = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
            i
                ?
                ((this._config.defaultInterval =
                        this._config.defaultInterval || this._config.interval),
                    (this._config.interval = i)) :
                (this._config.interval =
                    this._config.defaultInterval || this._config.interval);
        }
        _slide(e, i) {
            const n = this._directionToOrder(e),
                s = t.findOne(".active.carousel-item", this._element),
                o = this._getItemIndex(s),
                r = i || this._getItemByOrder(n, s),
                a = this._getItemIndex(r),
                l = Boolean(this._interval),
                c = n === K,
                h = c ? "carousel-item-start" : "carousel-item-end",
                d = c ? "carousel-item-next" : "carousel-item-prev",
                u = this._orderToDirection(n);
            if (r && r.classList.contains("active"))
                return void(this._isSliding = !1);
            if (this._isSliding) return;
            if (this._triggerSlideEvent(r, u).defaultPrevented) return;
            if (!s || !r) return;
            (this._isSliding = !0),
            l && this.pause(),
                this._setActiveIndicatorElement(r),
                (this._activeElement = r);
            const p = () => {
                P.trigger(this._element, "slid.bs.carousel", {
                    relatedTarget: r,
                    direction: u,
                    from: o,
                    to: a,
                });
            };
            if (this._element.classList.contains("slide")) {
                r.classList.add(d), f(r), s.classList.add(h), r.classList.add(h);
                const t = () => {
                    r.classList.remove(h, d),
                        r.classList.add("active"),
                        s.classList.remove("active", d, h),
                        (this._isSliding = !1),
                        setTimeout(p, 0);
                };
                this._queueCallback(t, s, !0);
            } else s.classList.remove("active"), r.classList.add("active"), (this._isSliding = !1), p();
            l && this.cycle();
        }
        _directionToOrder(t) {
            return [Q, Y].includes(t) ?
                g() ?
                t === Y ?
                X :
                K :
                t === Y ?
                K :
                X :
                t;
        }
        _orderToDirection(t) {
            return [K, X].includes(t) ?
                g() ?
                t === X ?
                Y :
                Q :
                t === X ?
                Q :
                Y :
                t;
        }
        static carouselInterface(t, e) {
            const i = Z.getOrCreateInstance(t, e);
            let { _config: n } = i;
            "object" == typeof e && (n = {...n, ...e });
            const s = "string" == typeof e ? e : n.slide;
            if ("number" == typeof e) i.to(e);
            else if ("string" == typeof s) {
                if (void 0 === i[s]) throw new TypeError(`No method named "${s}"`);
                i[s]();
            } else n.interval && n.ride && (i.pause(), i.cycle());
        }
        static jQueryInterface(t) {
            return this.each(function() {
                Z.carouselInterface(this, t);
            });
        }
        static dataApiClickHandler(t) {
            const e = s(this);
            if (!e || !e.classList.contains("carousel")) return;
            const i = {...U.getDataAttributes(e), ...U.getDataAttributes(this) },
                n = this.getAttribute("data-bs-slide-to");
            n && (i.interval = !1),
                Z.carouselInterface(e, i),
                n && Z.getInstance(e).to(n),
                t.preventDefault();
        }
    }
    P.on(
            document,
            "click.bs.carousel.data-api",
            "[data-bs-slide], [data-bs-slide-to]",
            Z.dataApiClickHandler
        ),
        P.on(window, "load.bs.carousel.data-api", () => {
            const e = t.find('[data-bs-ride="carousel"]');
            for (let t = 0, i = e.length; t < i; t++)
                Z.carouselInterface(e[t], Z.getInstance(e[t]));
        }),
        _(Z);
    const J = { toggle: !0, parent: "" },
        tt = { toggle: "boolean", parent: "(string|element)" };
    class et extends B {
        constructor(e, i) {
            super(e),
                (this._isTransitioning = !1),
                (this._config = this._getConfig(i)),
                (this._triggerArray = t.find(
                    `[data-bs-toggle="collapse"][href="#${this._element.id}"],[data-bs-toggle="collapse"][data-bs-target="#${this._element.id}"]`
                ));
            const s = t.find('[data-bs-toggle="collapse"]');
            for (let e = 0, i = s.length; e < i; e++) {
                const i = s[e],
                    o = n(i),
                    r = t.find(o).filter((t) => t === this._element);
                null !== o &&
                    r.length &&
                    ((this._selector = o), this._triggerArray.push(i));
            }
            (this._parent = this._config.parent ? this._getParent() : null),
            this._config.parent ||
                this._addAriaAndCollapsedClass(this._element, this._triggerArray),
                this._config.toggle && this.toggle();
        }
        static get Default() {
            return J;
        }
        static get NAME() {
            return "collapse";
        }
        toggle() {
            this._element.classList.contains("show") ? this.hide() : this.show();
        }
        show() {
            if (this._isTransitioning || this._element.classList.contains("show"))
                return;
            let e, i;
            this._parent &&
                ((e = t
                        .find(".show, .collapsing", this._parent)
                        .filter((t) =>
                            "string" == typeof this._config.parent ?
                            t.getAttribute("data-bs-parent") === this._config.parent :
                            t.classList.contains("collapse")
                        )),
                    0 === e.length && (e = null));
            const n = t.findOne(this._selector);
            if (e) {
                const t = e.find((t) => n !== t);
                if (((i = t ? et.getInstance(t) : null), i && i._isTransitioning))
                    return;
            }
            if (P.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
            e &&
                e.forEach((t) => {
                    n !== t && et.collapseInterface(t, "hide"),
                        i || R.set(t, "bs.collapse", null);
                });
            const s = this._getDimension();
            this._element.classList.remove("collapse"),
                this._element.classList.add("collapsing"),
                (this._element.style[s] = 0),
                this._triggerArray.length &&
                this._triggerArray.forEach((t) => {
                    t.classList.remove("collapsed"),
                        t.setAttribute("aria-expanded", !0);
                }),
                this.setTransitioning(!0);
            const o = "scroll" + (s[0].toUpperCase() + s.slice(1));
            this._queueCallback(
                    () => {
                        this._element.classList.remove("collapsing"),
                            this._element.classList.add("collapse", "show"),
                            (this._element.style[s] = ""),
                            this.setTransitioning(!1),
                            P.trigger(this._element, "shown.bs.collapse");
                    },
                    this._element, !0
                ),
                (this._element.style[s] = this._element[o] + "px");
        }
        hide() {
            if (this._isTransitioning || !this._element.classList.contains("show"))
                return;
            if (P.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
            const t = this._getDimension();
            (this._element.style[t] =
                this._element.getBoundingClientRect()[t] + "px"),
            f(this._element),
                this._element.classList.add("collapsing"),
                this._element.classList.remove("collapse", "show");
            const e = this._triggerArray.length;
            if (e > 0)
                for (let t = 0; t < e; t++) {
                    const e = this._triggerArray[t],
                        i = s(e);
                    i &&
                        !i.classList.contains("show") &&
                        (e.classList.add("collapsed"), e.setAttribute("aria-expanded", !1));
                }
            this.setTransitioning(!0),
                (this._element.style[t] = ""),
                this._queueCallback(
                    () => {
                        this.setTransitioning(!1),
                            this._element.classList.remove("collapsing"),
                            this._element.classList.add("collapse"),
                            P.trigger(this._element, "hidden.bs.collapse");
                    },
                    this._element, !0
                );
        }
        setTransitioning(t) {
            this._isTransitioning = t;
        }
        _getConfig(t) {
            return (
                ((t = {...J, ...t }).toggle = Boolean(t.toggle)),
                l("collapse", t, tt),
                t
            );
        }
        _getDimension() {
            return this._element.classList.contains("width") ? "width" : "height";
        }
        _getParent() {
            let { parent: e } = this._config;
            e = a(e);
            const i = `[data-bs-toggle="collapse"][data-bs-parent="${e}"]`;
            return (
                t.find(i, e).forEach((t) => {
                    const e = s(t);
                    this._addAriaAndCollapsedClass(e, [t]);
                }),
                e
            );
        }
        _addAriaAndCollapsedClass(t, e) {
            if (!t || !e.length) return;
            const i = t.classList.contains("show");
            e.forEach((t) => {
                i ? t.classList.remove("collapsed") : t.classList.add("collapsed"),
                    t.setAttribute("aria-expanded", i);
            });
        }
        static collapseInterface(t, e) {
            let i = et.getInstance(t);
            const n = {
                ...J,
                ...U.getDataAttributes(t),
                ...("object" == typeof e && e ? e : {}),
            };
            if (
                (!i &&
                    n.toggle &&
                    "string" == typeof e &&
                    /show|hide/.test(e) &&
                    (n.toggle = !1),
                    i || (i = new et(t, n)),
                    "string" == typeof e)
            ) {
                if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
                i[e]();
            }
        }
        static jQueryInterface(t) {
            return this.each(function() {
                et.collapseInterface(this, t);
            });
        }
    }
    P.on(
            document,
            "click.bs.collapse.data-api",
            '[data-bs-toggle="collapse"]',
            function(e) {
                ("A" === e.target.tagName ||
                    (e.delegateTarget && "A" === e.delegateTarget.tagName)) &&
                e.preventDefault();
                const i = U.getDataAttributes(this),
                    s = n(this);
                t.find(s).forEach((t) => {
                    const e = et.getInstance(t);
                    let n;
                    e
                        ?
                        (null === e._parent &&
                            "string" == typeof i.parent &&
                            ((e._config.parent = i.parent), (e._parent = e._getParent())),
                            (n = "toggle")) :
                        (n = i),
                        et.collapseInterface(t, n);
                });
            }
        ),
        _(et);
    var it = "top",
        nt = "bottom",
        st = "right",
        ot = "left",
        rt = [it, nt, st, ot],
        at = rt.reduce(function(t, e) {
            return t.concat([e + "-start", e + "-end"]);
        }, []),
        lt = [].concat(rt, ["auto"]).reduce(function(t, e) {
            return t.concat([e, e + "-start", e + "-end"]);
        }, []),
        ct = [
            "beforeRead",
            "read",
            "afterRead",
            "beforeMain",
            "main",
            "afterMain",
            "beforeWrite",
            "write",
            "afterWrite",
        ];

    function ht(t) {
        return t ? (t.nodeName || "").toLowerCase() : null;
    }

    function dt(t) {
        if (null == t) return window;
        if ("[object Window]" !== t.toString()) {
            var e = t.ownerDocument;
            return (e && e.defaultView) || window;
        }
        return t;
    }

    function ut(t) {
        return t instanceof dt(t).Element || t instanceof Element;
    }

    function ft(t) {
        return t instanceof dt(t).HTMLElement || t instanceof HTMLElement;
    }

    function pt(t) {
        return (
            "undefined" != typeof ShadowRoot &&
            (t instanceof dt(t).ShadowRoot || t instanceof ShadowRoot)
        );
    }
    var mt = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function(t) {
            var e = t.state;
            Object.keys(e.elements).forEach(function(t) {
                var i = e.styles[t] || {},
                    n = e.attributes[t] || {},
                    s = e.elements[t];
                ft(s) &&
                    ht(s) &&
                    (Object.assign(s.style, i),
                        Object.keys(n).forEach(function(t) {
                            var e = n[t];
                            !1 === e ?
                                s.removeAttribute(t) :
                                s.setAttribute(t, !0 === e ? "" : e);
                        }));
            });
        },
        effect: function(t) {
            var e = t.state,
                i = {
                    popper: {
                        position: e.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0",
                    },
                    arrow: { position: "absolute" },
                    reference: {},
                };
            return (
                Object.assign(e.elements.popper.style, i.popper),
                (e.styles = i),
                e.elements.arrow && Object.assign(e.elements.arrow.style, i.arrow),
                function() {
                    Object.keys(e.elements).forEach(function(t) {
                        var n = e.elements[t],
                            s = e.attributes[t] || {},
                            o = Object.keys(
                                e.styles.hasOwnProperty(t) ? e.styles[t] : i[t]
                            ).reduce(function(t, e) {
                                return (t[e] = ""), t;
                            }, {});
                        ft(n) &&
                            ht(n) &&
                            (Object.assign(n.style, o),
                                Object.keys(s).forEach(function(t) {
                                    n.removeAttribute(t);
                                }));
                    });
                }
            );
        },
        requires: ["computeStyles"],
    };

    function gt(t) {
        return t.split("-")[0];
    }

    function _t(t) {
        var e = t.getBoundingClientRect();
        return {
            width: e.width,
            height: e.height,
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            x: e.left,
            y: e.top,
        };
    }

    function bt(t) {
        var e = _t(t),
            i = t.offsetWidth,
            n = t.offsetHeight;
        return (
            Math.abs(e.width - i) <= 1 && (i = e.width),
            Math.abs(e.height - n) <= 1 && (n = e.height), { x: t.offsetLeft, y: t.offsetTop, width: i, height: n }
        );
    }

    function vt(t, e) {
        var i = e.getRootNode && e.getRootNode();
        if (t.contains(e)) return !0;
        if (i && pt(i)) {
            var n = e;
            do {
                if (n && t.isSameNode(n)) return !0;
                n = n.parentNode || n.host;
            } while (n);
        }
        return !1;
    }

    function yt(t) {
        return dt(t).getComputedStyle(t);
    }

    function wt(t) {
        return ["table", "td", "th"].indexOf(ht(t)) >= 0;
    }

    function Et(t) {
        return (
            (ut(t) ? t.ownerDocument : t.document) || window.document
        ).documentElement;
    }

    function At(t) {
        return "html" === ht(t) ?
            t :
            t.assignedSlot || t.parentNode || (pt(t) ? t.host : null) || Et(t);
    }

    function Tt(t) {
        return ft(t) && "fixed" !== yt(t).position ? t.offsetParent : null;
    }

    function Ot(t) {
        for (var e = dt(t), i = Tt(t); i && wt(i) && "static" === yt(i).position;)
            i = Tt(i);
        return i &&
            ("html" === ht(i) || ("body" === ht(i) && "static" === yt(i).position)) ?
            e :
            i ||
            (function(t) {
                var e = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
                if (-1 !== navigator.userAgent.indexOf("Trident") &&
                    ft(t) &&
                    "fixed" === yt(t).position
                )
                    return null;
                for (
                    var i = At(t); ft(i) && ["html", "body"].indexOf(ht(i)) < 0;

                ) {
                    var n = yt(i);
                    if (
                        "none" !== n.transform ||
                        "none" !== n.perspective ||
                        "paint" === n.contain ||
                        -1 !== ["transform", "perspective"].indexOf(n.willChange) ||
                        (e && "filter" === n.willChange) ||
                        (e && n.filter && "none" !== n.filter)
                    )
                        return i;
                    i = i.parentNode;
                }
                return null;
            })(t) ||
            e;
    }

    function Ct(t) {
        return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
    }
    var kt = Math.max,
        Lt = Math.min,
        xt = Math.round;

    function Dt(t, e, i) {
        return kt(t, Lt(e, i));
    }

    function St(t) {
        return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, t);
    }

    function It(t, e) {
        return e.reduce(function(e, i) {
            return (e[i] = t), e;
        }, {});
    }
    var Nt = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function(t) {
                var e,
                    i = t.state,
                    n = t.name,
                    s = t.options,
                    o = i.elements.arrow,
                    r = i.modifiersData.popperOffsets,
                    a = gt(i.placement),
                    l = Ct(a),
                    c = [ot, st].indexOf(a) >= 0 ? "height" : "width";
                if (o && r) {
                    var h = (function(t, e) {
                            return St(
                                "number" !=
                                typeof(t =
                                    "function" == typeof t ?
                                    t(
                                        Object.assign({}, e.rects, { placement: e.placement })
                                    ) :
                                    t) ?
                                t :
                                It(t, rt)
                            );
                        })(s.padding, i),
                        d = bt(o),
                        u = "y" === l ? it : ot,
                        f = "y" === l ? nt : st,
                        p =
                        i.rects.reference[c] +
                        i.rects.reference[l] -
                        r[l] -
                        i.rects.popper[c],
                        m = r[l] - i.rects.reference[l],
                        g = Ot(o),
                        _ = g ? ("y" === l ? g.clientHeight || 0 : g.clientWidth || 0) : 0,
                        b = p / 2 - m / 2,
                        v = h[u],
                        y = _ - d[c] - h[f],
                        w = _ / 2 - d[c] / 2 + b,
                        E = Dt(v, w, y),
                        A = l;
                    i.modifiersData[n] = (((e = {})[A] = E), (e.centerOffset = E - w), e);
                }
            },
            effect: function(t) {
                var e = t.state,
                    i = t.options.element,
                    n = void 0 === i ? "[data-popper-arrow]" : i;
                null != n &&
                    ("string" != typeof n || (n = e.elements.popper.querySelector(n))) &&
                    vt(e.elements.popper, n) &&
                    (e.elements.arrow = n);
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"],
        },
        jt = { top: "auto", right: "auto", bottom: "auto", left: "auto" };

    function Mt(t) {
        var e,
            i = t.popper,
            n = t.popperRect,
            s = t.placement,
            o = t.offsets,
            r = t.position,
            a = t.gpuAcceleration,
            l = t.adaptive,
            c = t.roundOffsets,
            h = !0 === c ?
            (function(t) {
                var e = t.x,
                    i = t.y,
                    n = window.devicePixelRatio || 1;
                return { x: xt(xt(e * n) / n) || 0, y: xt(xt(i * n) / n) || 0 };
            })(o) :
            "function" == typeof c ?
            c(o) :
            o,
            d = h.x,
            u = void 0 === d ? 0 : d,
            f = h.y,
            p = void 0 === f ? 0 : f,
            m = o.hasOwnProperty("x"),
            g = o.hasOwnProperty("y"),
            _ = ot,
            b = it,
            v = window;
        if (l) {
            var y = Ot(i),
                w = "clientHeight",
                E = "clientWidth";
            y === dt(i) &&
                "static" !== yt((y = Et(i))).position &&
                ((w = "scrollHeight"), (E = "scrollWidth")),
                (y = y),
                s === it && ((b = nt), (p -= y[w] - n.height), (p *= a ? 1 : -1)),
                s === ot && ((_ = st), (u -= y[E] - n.width), (u *= a ? 1 : -1));
        }
        var A,
            T = Object.assign({ position: r }, l && jt);
        return a ?
            Object.assign({},
                T,
                (((A = {})[b] = g ? "0" : ""),
                    (A[_] = m ? "0" : ""),
                    (A.transform =
                        (v.devicePixelRatio || 1) < 2 ?
                        "translate(" + u + "px, " + p + "px)" :
                        "translate3d(" + u + "px, " + p + "px, 0)"),
                    A)
            ) :
            Object.assign({},
                T,
                (((e = {})[b] = g ? p + "px" : ""),
                    (e[_] = m ? u + "px" : ""),
                    (e.transform = ""),
                    e)
            );
    }
    var Pt = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function(t) {
                var e = t.state,
                    i = t.options,
                    n = i.gpuAcceleration,
                    s = void 0 === n || n,
                    o = i.adaptive,
                    r = void 0 === o || o,
                    a = i.roundOffsets,
                    l = void 0 === a || a,
                    c = {
                        placement: gt(e.placement),
                        popper: e.elements.popper,
                        popperRect: e.rects.popper,
                        gpuAcceleration: s,
                    };
                null != e.modifiersData.popperOffsets &&
                    (e.styles.popper = Object.assign({},
                        e.styles.popper,
                        Mt(
                            Object.assign({}, c, {
                                offsets: e.modifiersData.popperOffsets,
                                position: e.options.strategy,
                                adaptive: r,
                                roundOffsets: l,
                            })
                        )
                    )),
                    null != e.modifiersData.arrow &&
                    (e.styles.arrow = Object.assign({},
                        e.styles.arrow,
                        Mt(
                            Object.assign({}, c, {
                                offsets: e.modifiersData.arrow,
                                position: "absolute",
                                adaptive: !1,
                                roundOffsets: l,
                            })
                        )
                    )),
                    (e.attributes.popper = Object.assign({}, e.attributes.popper, {
                        "data-popper-placement": e.placement,
                    }));
            },
            data: {},
        },
        Ht = { passive: !0 },
        Rt = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function() {},
            effect: function(t) {
                var e = t.state,
                    i = t.instance,
                    n = t.options,
                    s = n.scroll,
                    o = void 0 === s || s,
                    r = n.resize,
                    a = void 0 === r || r,
                    l = dt(e.elements.popper),
                    c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
                return (
                    o &&
                    c.forEach(function(t) {
                        t.addEventListener("scroll", i.update, Ht);
                    }),
                    a && l.addEventListener("resize", i.update, Ht),
                    function() {
                        o &&
                            c.forEach(function(t) {
                                t.removeEventListener("scroll", i.update, Ht);
                            }),
                            a && l.removeEventListener("resize", i.update, Ht);
                    }
                );
            },
            data: {},
        },
        Bt = { left: "right", right: "left", bottom: "top", top: "bottom" };

    function Wt(t) {
        return t.replace(/left|right|bottom|top/g, function(t) {
            return Bt[t];
        });
    }
    var qt = { start: "end", end: "start" };

    function zt(t) {
        return t.replace(/start|end/g, function(t) {
            return qt[t];
        });
    }

    function $t(t) {
        var e = dt(t);
        return { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
    }

    function Ut(t) {
        return _t(Et(t)).left + $t(t).scrollLeft;
    }

    function Ft(t) {
        var e = yt(t),
            i = e.overflow,
            n = e.overflowX,
            s = e.overflowY;
        return /auto|scroll|overlay|hidden/.test(i + s + n);
    }

    function Vt(t, e) {
        var i;
        void 0 === e && (e = []);
        var n = (function t(e) {
                return ["html", "body", "#document"].indexOf(ht(e)) >= 0 ?
                    e.ownerDocument.body :
                    ft(e) && Ft(e) ?
                    e :
                    t(At(e));
            })(t),
            s = n === (null == (i = t.ownerDocument) ? void 0 : i.body),
            o = dt(n),
            r = s ? [o].concat(o.visualViewport || [], Ft(n) ? n : []) : n,
            a = e.concat(r);
        return s ? a : a.concat(Vt(At(r)));
    }

    function Kt(t) {
        return Object.assign({}, t, {
            left: t.x,
            top: t.y,
            right: t.x + t.width,
            bottom: t.y + t.height,
        });
    }

    function Xt(t, e) {
        return "viewport" === e ?
            Kt(
                (function(t) {
                    var e = dt(t),
                        i = Et(t),
                        n = e.visualViewport,
                        s = i.clientWidth,
                        o = i.clientHeight,
                        r = 0,
                        a = 0;
                    return (
                        n &&
                        ((s = n.width),
                            (o = n.height),
                            /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
                            ((r = n.offsetLeft), (a = n.offsetTop))), { width: s, height: o, x: r + Ut(t), y: a }
                    );
                })(t)
            ) :
            ft(e) ?
            (function(t) {
                var e = _t(t);
                return (
                    (e.top = e.top + t.clientTop),
                    (e.left = e.left + t.clientLeft),
                    (e.bottom = e.top + t.clientHeight),
                    (e.right = e.left + t.clientWidth),
                    (e.width = t.clientWidth),
                    (e.height = t.clientHeight),
                    (e.x = e.left),
                    (e.y = e.top),
                    e
                );
            })(e) :
            Kt(
                (function(t) {
                    var e,
                        i = Et(t),
                        n = $t(t),
                        s = null == (e = t.ownerDocument) ? void 0 : e.body,
                        o = kt(
                            i.scrollWidth,
                            i.clientWidth,
                            s ? s.scrollWidth : 0,
                            s ? s.clientWidth : 0
                        ),
                        r = kt(
                            i.scrollHeight,
                            i.clientHeight,
                            s ? s.scrollHeight : 0,
                            s ? s.clientHeight : 0
                        ),
                        a = -n.scrollLeft + Ut(t),
                        l = -n.scrollTop;
                    return (
                        "rtl" === yt(s || i).direction &&
                        (a += kt(i.clientWidth, s ? s.clientWidth : 0) - o), { width: o, height: r, x: a, y: l }
                    );
                })(Et(t))
            );
    }

    function Yt(t) {
        return t.split("-")[1];
    }

    function Qt(t) {
        var e,
            i = t.reference,
            n = t.element,
            s = t.placement,
            o = s ? gt(s) : null,
            r = s ? Yt(s) : null,
            a = i.x + i.width / 2 - n.width / 2,
            l = i.y + i.height / 2 - n.height / 2;
        switch (o) {
            case it:
                e = { x: a, y: i.y - n.height };
                break;
            case nt:
                e = { x: a, y: i.y + i.height };
                break;
            case st:
                e = { x: i.x + i.width, y: l };
                break;
            case ot:
                e = { x: i.x - n.width, y: l };
                break;
            default:
                e = { x: i.x, y: i.y };
        }
        var c = o ? Ct(o) : null;
        if (null != c) {
            var h = "y" === c ? "height" : "width";
            switch (r) {
                case "start":
                    e[c] = e[c] - (i[h] / 2 - n[h] / 2);
                    break;
                case "end":
                    e[c] = e[c] + (i[h] / 2 - n[h] / 2);
            }
        }
        return e;
    }

    function Gt(t, e) {
        void 0 === e && (e = {});
        var i = e,
            n = i.placement,
            s = void 0 === n ? t.placement : n,
            o = i.boundary,
            r = void 0 === o ? "clippingParents" : o,
            a = i.rootBoundary,
            l = void 0 === a ? "viewport" : a,
            c = i.elementContext,
            h = void 0 === c ? "popper" : c,
            d = i.altBoundary,
            u = void 0 !== d && d,
            f = i.padding,
            p = void 0 === f ? 0 : f,
            m = St("number" != typeof p ? p : It(p, rt)),
            g = "popper" === h ? "reference" : "popper",
            _ = t.elements.reference,
            b = t.rects.popper,
            v = t.elements[u ? g : h],
            y = (function(t, e, i) {
                var n =
                    "clippingParents" === e ?
                    (function(t) {
                        var e = Vt(At(t)),
                            i = ["absolute", "fixed"].indexOf(yt(t).position) >= 0 &&
                            ft(t) ?
                            Ot(t) :
                            t;
                        return ut(i) ?
                            e.filter(function(t) {
                                return ut(t) && vt(t, i) && "body" !== ht(t);
                            }) : [];
                    })(t) : [].concat(e),
                    s = [].concat(n, [i]),
                    o = s[0],
                    r = s.reduce(function(e, i) {
                        var n = Xt(t, i);
                        return (
                            (e.top = kt(n.top, e.top)),
                            (e.right = Lt(n.right, e.right)),
                            (e.bottom = Lt(n.bottom, e.bottom)),
                            (e.left = kt(n.left, e.left)),
                            e
                        );
                    }, Xt(t, o));
                return (
                    (r.width = r.right - r.left),
                    (r.height = r.bottom - r.top),
                    (r.x = r.left),
                    (r.y = r.top),
                    r
                );
            })(ut(v) ? v : v.contextElement || Et(t.elements.popper), r, l),
            w = _t(_),
            E = Qt({ reference: w, element: b, strategy: "absolute", placement: s }),
            A = Kt(Object.assign({}, b, E)),
            T = "popper" === h ? A : w,
            O = {
                top: y.top - T.top + m.top,
                bottom: T.bottom - y.bottom + m.bottom,
                left: y.left - T.left + m.left,
                right: T.right - y.right + m.right,
            },
            C = t.modifiersData.offset;
        if ("popper" === h && C) {
            var k = C[s];
            Object.keys(O).forEach(function(t) {
                var e = [st, nt].indexOf(t) >= 0 ? 1 : -1,
                    i = [it, nt].indexOf(t) >= 0 ? "y" : "x";
                O[t] += k[i] * e;
            });
        }
        return O;
    }

    function Zt(t, e) {
        void 0 === e && (e = {});
        var i = e,
            n = i.placement,
            s = i.boundary,
            o = i.rootBoundary,
            r = i.padding,
            a = i.flipVariations,
            l = i.allowedAutoPlacements,
            c = void 0 === l ? lt : l,
            h = Yt(n),
            d = h ?
            a ?
            at :
            at.filter(function(t) {
                return Yt(t) === h;
            }) :
            rt,
            u = d.filter(function(t) {
                return c.indexOf(t) >= 0;
            });
        0 === u.length && (u = d);
        var f = u.reduce(function(e, i) {
            return (
                (e[i] = Gt(t, {
                    placement: i,
                    boundary: s,
                    rootBoundary: o,
                    padding: r,
                })[gt(i)]),
                e
            );
        }, {});
        return Object.keys(f).sort(function(t, e) {
            return f[t] - f[e];
        });
    }
    var Jt = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function(t) {
            var e = t.state,
                i = t.options,
                n = t.name;
            if (!e.modifiersData[n]._skip) {
                for (
                    var s = i.mainAxis,
                        o = void 0 === s || s,
                        r = i.altAxis,
                        a = void 0 === r || r,
                        l = i.fallbackPlacements,
                        c = i.padding,
                        h = i.boundary,
                        d = i.rootBoundary,
                        u = i.altBoundary,
                        f = i.flipVariations,
                        p = void 0 === f || f,
                        m = i.allowedAutoPlacements,
                        g = e.options.placement,
                        _ = gt(g),
                        b =
                        l ||
                        (_ !== g && p ?
                            (function(t) {
                                if ("auto" === gt(t)) return [];
                                var e = Wt(t);
                                return [zt(t), e, zt(e)];
                            })(g) : [Wt(g)]),
                        v = [g].concat(b).reduce(function(t, i) {
                            return t.concat(
                                "auto" === gt(i) ?
                                Zt(e, {
                                    placement: i,
                                    boundary: h,
                                    rootBoundary: d,
                                    padding: c,
                                    flipVariations: p,
                                    allowedAutoPlacements: m,
                                }) :
                                i
                            );
                        }, []),
                        y = e.rects.reference,
                        w = e.rects.popper,
                        E = new Map(),
                        A = !0,
                        T = v[0],
                        O = 0; O < v.length; O++
                ) {
                    var C = v[O],
                        k = gt(C),
                        L = "start" === Yt(C),
                        x = [it, nt].indexOf(k) >= 0,
                        D = x ? "width" : "height",
                        S = Gt(e, {
                            placement: C,
                            boundary: h,
                            rootBoundary: d,
                            altBoundary: u,
                            padding: c,
                        }),
                        I = x ? (L ? st : ot) : L ? nt : it;
                    y[D] > w[D] && (I = Wt(I));
                    var N = Wt(I),
                        j = [];
                    if (
                        (o && j.push(S[k] <= 0),
                            a && j.push(S[I] <= 0, S[N] <= 0),
                            j.every(function(t) {
                                return t;
                            }))
                    ) {
                        (T = C), (A = !1);
                        break;
                    }
                    E.set(C, j);
                }
                if (A)
                    for (
                        var M = function(t) {
                                var e = v.find(function(e) {
                                    var i = E.get(e);
                                    if (i)
                                        return i.slice(0, t).every(function(t) {
                                            return t;
                                        });
                                });
                                if (e) return (T = e), "break";
                            },
                            P = p ? 3 : 1; P > 0 && "break" !== M(P); P--
                    );
                e.placement !== T &&
                    ((e.modifiersData[n]._skip = !0), (e.placement = T), (e.reset = !0));
            }
        },
        requiresIfExists: ["offset"],
        data: { _skip: !1 },
    };

    function te(t, e, i) {
        return (
            void 0 === i && (i = { x: 0, y: 0 }), {
                top: t.top - e.height - i.y,
                right: t.right - e.width + i.x,
                bottom: t.bottom - e.height + i.y,
                left: t.left - e.width - i.x,
            }
        );
    }

    function ee(t) {
        return [it, st, nt, ot].some(function(e) {
            return t[e] >= 0;
        });
    }
    var ie = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function(t) {
                var e = t.state,
                    i = t.name,
                    n = e.rects.reference,
                    s = e.rects.popper,
                    o = e.modifiersData.preventOverflow,
                    r = Gt(e, { elementContext: "reference" }),
                    a = Gt(e, { altBoundary: !0 }),
                    l = te(r, n),
                    c = te(a, s, o),
                    h = ee(l),
                    d = ee(c);
                (e.modifiersData[i] = {
                    referenceClippingOffsets: l,
                    popperEscapeOffsets: c,
                    isReferenceHidden: h,
                    hasPopperEscaped: d,
                }),
                (e.attributes.popper = Object.assign({}, e.attributes.popper, {
                    "data-popper-reference-hidden": h,
                    "data-popper-escaped": d,
                }));
            },
        },
        ne = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function(t) {
                var e = t.state,
                    i = t.options,
                    n = t.name,
                    s = i.offset,
                    o = void 0 === s ? [0, 0] : s,
                    r = lt.reduce(function(t, i) {
                        return (
                            (t[i] = (function(t, e, i) {
                                var n = gt(t),
                                    s = [ot, it].indexOf(n) >= 0 ? -1 : 1,
                                    o =
                                    "function" == typeof i ?
                                    i(Object.assign({}, e, { placement: t })) :
                                    i,
                                    r = o[0],
                                    a = o[1];
                                return (
                                    (r = r || 0),
                                    (a = (a || 0) * s), [ot, st].indexOf(n) >= 0 ? { x: a, y: r } : { x: r, y: a }
                                );
                            })(i, e.rects, o)),
                            t
                        );
                    }, {}),
                    a = r[e.placement],
                    l = a.x,
                    c = a.y;
                null != e.modifiersData.popperOffsets &&
                    ((e.modifiersData.popperOffsets.x += l),
                        (e.modifiersData.popperOffsets.y += c)),
                    (e.modifiersData[n] = r);
            },
        },
        se = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function(t) {
                var e = t.state,
                    i = t.name;
                e.modifiersData[i] = Qt({
                    reference: e.rects.reference,
                    element: e.rects.popper,
                    strategy: "absolute",
                    placement: e.placement,
                });
            },
            data: {},
        },
        oe = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function(t) {
                var e = t.state,
                    i = t.options,
                    n = t.name,
                    s = i.mainAxis,
                    o = void 0 === s || s,
                    r = i.altAxis,
                    a = void 0 !== r && r,
                    l = i.boundary,
                    c = i.rootBoundary,
                    h = i.altBoundary,
                    d = i.padding,
                    u = i.tether,
                    f = void 0 === u || u,
                    p = i.tetherOffset,
                    m = void 0 === p ? 0 : p,
                    g = Gt(e, {
                        boundary: l,
                        rootBoundary: c,
                        padding: d,
                        altBoundary: h,
                    }),
                    _ = gt(e.placement),
                    b = Yt(e.placement),
                    v = !b,
                    y = Ct(_),
                    w = "x" === y ? "y" : "x",
                    E = e.modifiersData.popperOffsets,
                    A = e.rects.reference,
                    T = e.rects.popper,
                    O =
                    "function" == typeof m ?
                    m(Object.assign({}, e.rects, { placement: e.placement })) :
                    m,
                    C = { x: 0, y: 0 };
                if (E) {
                    if (o || a) {
                        var k = "y" === y ? it : ot,
                            L = "y" === y ? nt : st,
                            x = "y" === y ? "height" : "width",
                            D = E[y],
                            S = E[y] + g[k],
                            I = E[y] - g[L],
                            N = f ? -T[x] / 2 : 0,
                            j = "start" === b ? A[x] : T[x],
                            M = "start" === b ? -T[x] : -A[x],
                            P = e.elements.arrow,
                            H = f && P ? bt(P) : { width: 0, height: 0 },
                            R = e.modifiersData["arrow#persistent"] ?
                            e.modifiersData["arrow#persistent"].padding : { top: 0, right: 0, bottom: 0, left: 0 },
                            B = R[k],
                            W = R[L],
                            q = Dt(0, A[x], H[x]),
                            z = v ? A[x] / 2 - N - q - B - O : j - q - B - O,
                            $ = v ? -A[x] / 2 + N + q + W + O : M + q + W + O,
                            U = e.elements.arrow && Ot(e.elements.arrow),
                            F = U ? ("y" === y ? U.clientTop || 0 : U.clientLeft || 0) : 0,
                            V = e.modifiersData.offset ?
                            e.modifiersData.offset[e.placement][y] :
                            0,
                            K = E[y] + z - V - F,
                            X = E[y] + $ - V;
                        if (o) {
                            var Y = Dt(f ? Lt(S, K) : S, D, f ? kt(I, X) : I);
                            (E[y] = Y), (C[y] = Y - D);
                        }
                        if (a) {
                            var Q = "x" === y ? it : ot,
                                G = "x" === y ? nt : st,
                                Z = E[w],
                                J = Z + g[Q],
                                tt = Z - g[G],
                                et = Dt(f ? Lt(J, K) : J, Z, f ? kt(tt, X) : tt);
                            (E[w] = et), (C[w] = et - Z);
                        }
                    }
                    e.modifiersData[n] = C;
                }
            },
            requiresIfExists: ["offset"],
        };

    function re(t, e, i) {
        void 0 === i && (i = !1);
        var n,
            s,
            o = Et(e),
            r = _t(t),
            a = ft(e),
            l = { scrollLeft: 0, scrollTop: 0 },
            c = { x: 0, y: 0 };
        return (
            (a || (!a && !i)) &&
            (("body" !== ht(e) || Ft(o)) &&
                (l =
                    (n = e) !== dt(n) && ft(n) ? { scrollLeft: (s = n).scrollLeft, scrollTop: s.scrollTop } :
                    $t(n)),
                ft(e) ?
                (((c = _t(e)).x += e.clientLeft), (c.y += e.clientTop)) :
                o && (c.x = Ut(o))), {
                x: r.left + l.scrollLeft - c.x,
                y: r.top + l.scrollTop - c.y,
                width: r.width,
                height: r.height,
            }
        );
    }
    var ae = { placement: "bottom", modifiers: [], strategy: "absolute" };

    function le() {
        for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
            e[i] = arguments[i];
        return !e.some(function(t) {
            return !(t && "function" == typeof t.getBoundingClientRect);
        });
    }

    function ce(t) {
        void 0 === t && (t = {});
        var e = t,
            i = e.defaultModifiers,
            n = void 0 === i ? [] : i,
            s = e.defaultOptions,
            o = void 0 === s ? ae : s;
        return function(t, e, i) {
            void 0 === i && (i = o);
            var s,
                r,
                a = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, ae, o),
                    modifiersData: {},
                    elements: { reference: t, popper: e },
                    attributes: {},
                    styles: {},
                },
                l = [],
                c = !1,
                h = {
                    state: a,
                    setOptions: function(i) {
                        d(),
                            (a.options = Object.assign({}, o, a.options, i)),
                            (a.scrollParents = {
                                reference: ut(t) ?
                                    Vt(t) : t.contextElement ?
                                    Vt(t.contextElement) : [],
                                popper: Vt(e),
                            });
                        var s,
                            r,
                            c = (function(t) {
                                var e = (function(t) {
                                    var e = new Map(),
                                        i = new Set(),
                                        n = [];
                                    return (
                                        t.forEach(function(t) {
                                            e.set(t.name, t);
                                        }),
                                        t.forEach(function(t) {
                                            i.has(t.name) ||
                                                (function t(s) {
                                                    i.add(s.name), []
                                                        .concat(
                                                            s.requires || [],
                                                            s.requiresIfExists || []
                                                        )
                                                        .forEach(function(n) {
                                                            if (!i.has(n)) {
                                                                var s = e.get(n);
                                                                s && t(s);
                                                            }
                                                        }),
                                                        n.push(s);
                                                })(t);
                                        }),
                                        n
                                    );
                                })(t);
                                return ct.reduce(function(t, i) {
                                    return t.concat(
                                        e.filter(function(t) {
                                            return t.phase === i;
                                        })
                                    );
                                }, []);
                            })(
                                ((s = [].concat(n, a.options.modifiers)),
                                    (r = s.reduce(function(t, e) {
                                        var i = t[e.name];
                                        return (
                                            (t[e.name] = i ?
                                                Object.assign({}, i, e, {
                                                    options: Object.assign({}, i.options, e.options),
                                                    data: Object.assign({}, i.data, e.data),
                                                }) :
                                                e),
                                            t
                                        );
                                    }, {})),
                                    Object.keys(r).map(function(t) {
                                        return r[t];
                                    }))
                            );
                        return (
                            (a.orderedModifiers = c.filter(function(t) {
                                return t.enabled;
                            })),
                            a.orderedModifiers.forEach(function(t) {
                                var e = t.name,
                                    i = t.options,
                                    n = void 0 === i ? {} : i,
                                    s = t.effect;
                                if ("function" == typeof s) {
                                    var o = s({ state: a, name: e, instance: h, options: n });
                                    l.push(o || function() {});
                                }
                            }),
                            h.update()
                        );
                    },
                    forceUpdate: function() {
                        if (!c) {
                            var t = a.elements,
                                e = t.reference,
                                i = t.popper;
                            if (le(e, i)) {
                                (a.rects = {
                                    reference: re(e, Ot(i), "fixed" === a.options.strategy),
                                    popper: bt(i),
                                }),
                                (a.reset = !1),
                                (a.placement = a.options.placement),
                                a.orderedModifiers.forEach(function(t) {
                                    return (a.modifiersData[t.name] = Object.assign({},
                                        t.data
                                    ));
                                });
                                for (var n = 0; n < a.orderedModifiers.length; n++)
                                    if (!0 !== a.reset) {
                                        var s = a.orderedModifiers[n],
                                            o = s.fn,
                                            r = s.options,
                                            l = void 0 === r ? {} : r,
                                            d = s.name;
                                        "function" == typeof o &&
                                            (a =
                                                o({ state: a, options: l, name: d, instance: h }) || a);
                                    } else(a.reset = !1), (n = -1);
                            }
                        }
                    },
                    update:
                        ((s = function() {
                                return new Promise(function(t) {
                                    h.forceUpdate(), t(a);
                                });
                            }),
                            function() {
                                return (
                                    r ||
                                    (r = new Promise(function(t) {
                                        Promise.resolve().then(function() {
                                            (r = void 0), t(s());
                                        });
                                    })),
                                    r
                                );
                            }),
                    destroy: function() {
                        d(), (c = !0);
                    },
                };
            if (!le(t, e)) return h;

            function d() {
                l.forEach(function(t) {
                        return t();
                    }),
                    (l = []);
            }
            return (
                h.setOptions(i).then(function(t) {
                    !c && i.onFirstUpdate && i.onFirstUpdate(t);
                }),
                h
            );
        };
    }
    var he = ce(),
        de = ce({ defaultModifiers: [Rt, se, Pt, mt] }),
        ue = ce({ defaultModifiers: [Rt, se, Pt, mt, ne, Jt, oe, Nt, ie] }),
        fe = Object.freeze({
            __proto__: null,
            popperGenerator: ce,
            detectOverflow: Gt,
            createPopperBase: he,
            createPopper: ue,
            createPopperLite: de,
            top: it,
            bottom: nt,
            right: st,
            left: ot,
            auto: "auto",
            basePlacements: rt,
            start: "start",
            end: "end",
            clippingParents: "clippingParents",
            viewport: "viewport",
            popper: "popper",
            reference: "reference",
            variationPlacements: at,
            placements: lt,
            beforeRead: "beforeRead",
            read: "read",
            afterRead: "afterRead",
            beforeMain: "beforeMain",
            main: "main",
            afterMain: "afterMain",
            beforeWrite: "beforeWrite",
            write: "write",
            afterWrite: "afterWrite",
            modifierPhases: ct,
            applyStyles: mt,
            arrow: Nt,
            computeStyles: Pt,
            eventListeners: Rt,
            flip: Jt,
            hide: ie,
            offset: ne,
            popperOffsets: se,
            preventOverflow: oe,
        });
    const pe = new RegExp("ArrowUp|ArrowDown|Escape"),
        me = g() ? "top-end" : "top-start",
        ge = g() ? "top-start" : "top-end",
        _e = g() ? "bottom-end" : "bottom-start",
        be = g() ? "bottom-start" : "bottom-end",
        ve = g() ? "left-start" : "right-start",
        ye = g() ? "right-start" : "left-start",
        we = {
            offset: [0, 2],
            boundary: "clippingParents",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null,
            autoClose: !0,
        },
        Ee = {
            offset: "(array|string|function)",
            boundary: "(string|element)",
            reference: "(string|element|object)",
            display: "string",
            popperConfig: "(null|object|function)",
            autoClose: "(boolean|string)",
        };
    class Ae extends B {
        constructor(t, e) {
            super(t),
                (this._popper = null),
                (this._config = this._getConfig(e)),
                (this._menu = this._getMenuElement()),
                (this._inNavbar = this._detectNavbar()),
                this._addEventListeners();
        }
        static get Default() {
            return we;
        }
        static get DefaultType() {
            return Ee;
        }
        static get NAME() {
            return "dropdown";
        }
        toggle() {
            h(this._element) ||
                (this._element.classList.contains("show") ? this.hide() : this.show());
        }
        show() {
            if (h(this._element) || this._menu.classList.contains("show")) return;
            const t = Ae.getParentFromElement(this._element),
                e = { relatedTarget: this._element };
            if (!P.trigger(this._element, "show.bs.dropdown", e).defaultPrevented) {
                if (this._inNavbar) U.setDataAttribute(this._menu, "popper", "none");
                else {
                    if (void 0 === fe)
                        throw new TypeError(
                            "Bootstrap's dropdowns require Popper (https://popper.js.org)"
                        );
                    let e = this._element;
                    "parent" === this._config.reference ?
                        (e = t) :
                        r(this._config.reference) ?
                        (e = a(this._config.reference)) :
                        "object" == typeof this._config.reference &&
                        (e = this._config.reference);
                    const i = this._getPopperConfig(),
                        n = i.modifiers.find(
                            (t) => "applyStyles" === t.name && !1 === t.enabled
                        );
                    (this._popper = ue(e, this._menu, i)),
                    n && U.setDataAttribute(this._menu, "popper", "static");
                }
                "ontouchstart" in document.documentElement &&
                    !t.closest(".navbar-nav") && []
                    .concat(...document.body.children)
                    .forEach((t) => P.on(t, "mouseover", u)),
                    this._element.focus(),
                    this._element.setAttribute("aria-expanded", !0),
                    this._menu.classList.toggle("show"),
                    this._element.classList.toggle("show"),
                    P.trigger(this._element, "shown.bs.dropdown", e);
            }
        }
        hide() {
            if (h(this._element) || !this._menu.classList.contains("show")) return;
            const t = { relatedTarget: this._element };
            this._completeHide(t);
        }
        dispose() {
            this._popper && this._popper.destroy(), super.dispose();
        }
        update() {
            (this._inNavbar = this._detectNavbar()),
            this._popper && this._popper.update();
        }
        _addEventListeners() {
            P.on(this._element, "click.bs.dropdown", (t) => {
                t.preventDefault(), this.toggle();
            });
        }
        _completeHide(t) {
            P.trigger(this._element, "hide.bs.dropdown", t).defaultPrevented ||
                ("ontouchstart" in document.documentElement && []
                    .concat(...document.body.children)
                    .forEach((t) => P.off(t, "mouseover", u)),
                    this._popper && this._popper.destroy(),
                    this._menu.classList.remove("show"),
                    this._element.classList.remove("show"),
                    this._element.setAttribute("aria-expanded", "false"),
                    U.removeDataAttribute(this._menu, "popper"),
                    P.trigger(this._element, "hidden.bs.dropdown", t));
        }
        _getConfig(t) {
            if (
                ((t = {
                        ...this.constructor.Default,
                        ...U.getDataAttributes(this._element),
                        ...t,
                    }),
                    l("dropdown", t, this.constructor.DefaultType),
                    "object" == typeof t.reference &&
                    !r(t.reference) &&
                    "function" != typeof t.reference.getBoundingClientRect)
            )
                throw new TypeError(
                    "dropdown".toUpperCase() +
                    ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.'
                );
            return t;
        }
        _getMenuElement() {
            return t.next(this._element, ".dropdown-menu")[0];
        }
        _getPlacement() {
            const t = this._element.parentNode;
            if (t.classList.contains("dropend")) return ve;
            if (t.classList.contains("dropstart")) return ye;
            const e =
                "end" ===
                getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
            return t.classList.contains("dropup") ? (e ? ge : me) : e ? be : _e;
        }
        _detectNavbar() {
            return null !== this._element.closest(".navbar");
        }
        _getOffset() {
            const { offset: t } = this._config;
            return "string" == typeof t ?
                t.split(",").map((t) => Number.parseInt(t, 10)) :
                "function" == typeof t ?
                (e) => t(e, this._element) :
                t;
        }
        _getPopperConfig() {
            const t = {
                placement: this._getPlacement(),
                modifiers: [{
                        name: "preventOverflow",
                        options: { boundary: this._config.boundary },
                    },
                    { name: "offset", options: { offset: this._getOffset() } },
                ],
            };
            return (
                "static" === this._config.display &&
                (t.modifiers = [{ name: "applyStyles", enabled: !1 }]), {
                    ...t,
                    ...("function" == typeof this._config.popperConfig ?
                        this._config.popperConfig(t) :
                        this._config.popperConfig),
                }
            );
        }
        _selectMenuItem({ key: e, target: i }) {
            const n = t
                .find(
                    ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
                    this._menu
                )
                .filter(c);
            n.length && y(n, i, "ArrowDown" === e, !n.includes(i)).focus();
        }
        static dropdownInterface(t, e) {
            const i = Ae.getOrCreateInstance(t, e);
            if ("string" == typeof e) {
                if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
                i[e]();
            }
        }
        static jQueryInterface(t) {
            return this.each(function() {
                Ae.dropdownInterface(this, t);
            });
        }
        static clearMenus(e) {
            if (e && (2 === e.button || ("keyup" === e.type && "Tab" !== e.key)))
                return;
            const i = t.find('[data-bs-toggle="dropdown"]');
            for (let t = 0, n = i.length; t < n; t++) {
                const n = Ae.getInstance(i[t]);
                if (!n || !1 === n._config.autoClose) continue;
                if (!n._element.classList.contains("show")) continue;
                const s = { relatedTarget: n._element };
                if (e) {
                    const t = e.composedPath(),
                        i = t.includes(n._menu);
                    if (
                        t.includes(n._element) ||
                        ("inside" === n._config.autoClose && !i) ||
                        ("outside" === n._config.autoClose && i)
                    )
                        continue;
                    if (
                        n._menu.contains(e.target) &&
                        (("keyup" === e.type && "Tab" === e.key) ||
                            /input|select|option|textarea|form/i.test(e.target.tagName))
                    )
                        continue;
                    "click" === e.type && (s.clickEvent = e);
                }
                n._completeHide(s);
            }
        }
        static getParentFromElement(t) {
            return s(t) || t.parentNode;
        }
        static dataApiKeydownHandler(e) {
            if (
                /input|textarea/i.test(e.target.tagName) ?
                "Space" === e.key ||
                ("Escape" !== e.key &&
                    (("ArrowDown" !== e.key && "ArrowUp" !== e.key) ||
                        e.target.closest(".dropdown-menu"))) :
                !pe.test(e.key)
            )
                return;
            const i = this.classList.contains("show");
            if (!i && "Escape" === e.key) return;
            if ((e.preventDefault(), e.stopPropagation(), h(this))) return;
            const n = () =>
                this.matches('[data-bs-toggle="dropdown"]') ?
                this :
                t.prev(this, '[data-bs-toggle="dropdown"]')[0];
            return "Escape" === e.key ?
                (n().focus(), void Ae.clearMenus()) :
                "ArrowUp" === e.key || "ArrowDown" === e.key ?
                (i || n().click(), void Ae.getInstance(n())._selectMenuItem(e)) :
                void((i && "Space" !== e.key) || Ae.clearMenus());
        }
    }
    P.on(
            document,
            "keydown.bs.dropdown.data-api",
            '[data-bs-toggle="dropdown"]',
            Ae.dataApiKeydownHandler
        ),
        P.on(
            document,
            "keydown.bs.dropdown.data-api",
            ".dropdown-menu",
            Ae.dataApiKeydownHandler
        ),
        P.on(document, "click.bs.dropdown.data-api", Ae.clearMenus),
        P.on(document, "keyup.bs.dropdown.data-api", Ae.clearMenus),
        P.on(
            document,
            "click.bs.dropdown.data-api",
            '[data-bs-toggle="dropdown"]',
            function(t) {
                t.preventDefault(), Ae.dropdownInterface(this);
            }
        ),
        _(Ae);
    class Te {
        constructor() {
            this._element = document.body;
        }
        getWidth() {
            const t = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - t);
        }
        hide() {
            const t = this.getWidth();
            this._disableOverFlow(),
                this._setElementAttributes(this._element, "paddingRight", (e) => e + t),
                this._setElementAttributes(
                    ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                    "paddingRight",
                    (e) => e + t
                ),
                this._setElementAttributes(".sticky-top", "marginRight", (e) => e - t);
        }
        _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow"),
                (this._element.style.overflow = "hidden");
        }
        _setElementAttributes(t, e, i) {
            const n = this.getWidth();
            this._applyManipulationCallback(t, (t) => {
                if (t !== this._element && window.innerWidth > t.clientWidth + n)
                    return;
                this._saveInitialAttribute(t, e);
                const s = window.getComputedStyle(t)[e];
                t.style[e] = i(Number.parseFloat(s)) + "px";
            });
        }
        reset() {
            this._resetElementAttributes(this._element, "overflow"),
                this._resetElementAttributes(this._element, "paddingRight"),
                this._resetElementAttributes(
                    ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                    "paddingRight"
                ),
                this._resetElementAttributes(".sticky-top", "marginRight");
        }
        _saveInitialAttribute(t, e) {
            const i = t.style[e];
            i && U.setDataAttribute(t, e, i);
        }
        _resetElementAttributes(t, e) {
            this._applyManipulationCallback(t, (t) => {
                const i = U.getDataAttribute(t, e);
                void 0 === i ?
                    t.style.removeProperty(e) :
                    (U.removeDataAttribute(t, e), (t.style[e] = i));
            });
        }
        _applyManipulationCallback(e, i) {
            r(e) ? i(e) : t.find(e, this._element).forEach(i);
        }
        isOverflowing() {
            return this.getWidth() > 0;
        }
    }
    const Oe = {
            isVisible: !0,
            isAnimated: !1,
            rootElement: "body",
            clickCallback: null,
        },
        Ce = {
            isVisible: "boolean",
            isAnimated: "boolean",
            rootElement: "(element|string)",
            clickCallback: "(function|null)",
        };
    class ke {
        constructor(t) {
            (this._config = this._getConfig(t)),
            (this._isAppended = !1),
            (this._element = null);
        }
        show(t) {
            this._config.isVisible ?
                (this._append(),
                    this._config.isAnimated && f(this._getElement()),
                    this._getElement().classList.add("show"),
                    this._emulateAnimation(() => {
                        b(t);
                    })) :
                b(t);
        }
        hide(t) {
            this._config.isVisible ?
                (this._getElement().classList.remove("show"),
                    this._emulateAnimation(() => {
                        this.dispose(), b(t);
                    })) :
                b(t);
        }
        _getElement() {
            if (!this._element) {
                const t = document.createElement("div");
                (t.className = "modal-backdrop"),
                this._config.isAnimated && t.classList.add("fade"),
                    (this._element = t);
            }
            return this._element;
        }
        _getConfig(t) {
            return (
                ((t = {...Oe, ...("object" == typeof t ? t : {}) }).rootElement = a(
                    t.rootElement
                )),
                l("backdrop", t, Ce),
                t
            );
        }
        _append() {
            this._isAppended ||
                (this._config.rootElement.appendChild(this._getElement()),
                    P.on(this._getElement(), "mousedown.bs.backdrop", () => {
                        b(this._config.clickCallback);
                    }),
                    (this._isAppended = !0));
        }
        dispose() {
            this._isAppended &&
                (P.off(this._element, "mousedown.bs.backdrop"),
                    this._element.remove(),
                    (this._isAppended = !1));
        }
        _emulateAnimation(t) {
            v(t, this._getElement(), this._config.isAnimated);
        }
    }
    const Le = { backdrop: !0, keyboard: !0, focus: !0 },
        xe = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
        };
    class De extends B {
        constructor(e, i) {
            super(e),
                (this._config = this._getConfig(i)),
                (this._dialog = t.findOne(".modal-dialog", this._element)),
                (this._backdrop = this._initializeBackDrop()),
                (this._isShown = !1),
                (this._ignoreBackdropClick = !1),
                (this._isTransitioning = !1),
                (this._scrollBar = new Te());
        }
        static get Default() {
            return Le;
        }
        static get NAME() {
            return "modal";
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t);
        }
        show(t) {
            this._isShown ||
                this._isTransitioning ||
                P.trigger(this._element, "show.bs.modal", { relatedTarget: t })
                .defaultPrevented ||
                ((this._isShown = !0),
                    this._isAnimated() && (this._isTransitioning = !0),
                    this._scrollBar.hide(),
                    document.body.classList.add("modal-open"),
                    this._adjustDialog(),
                    this._setEscapeEvent(),
                    this._setResizeEvent(),
                    P.on(
                        this._element,
                        "click.dismiss.bs.modal",
                        '[data-bs-dismiss="modal"]',
                        (t) => this.hide(t)
                    ),
                    P.on(this._dialog, "mousedown.dismiss.bs.modal", () => {
                        P.one(this._element, "mouseup.dismiss.bs.modal", (t) => {
                            t.target === this._element && (this._ignoreBackdropClick = !0);
                        });
                    }),
                    this._showBackdrop(() => this._showElement(t)));
        }
        hide(t) {
            if (
                (t && ["A", "AREA"].includes(t.target.tagName) && t.preventDefault(), !this._isShown || this._isTransitioning)
            )
                return;
            if (P.trigger(this._element, "hide.bs.modal").defaultPrevented) return;
            this._isShown = !1;
            const e = this._isAnimated();
            e && (this._isTransitioning = !0),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                P.off(document, "focusin.bs.modal"),
                this._element.classList.remove("show"),
                P.off(this._element, "click.dismiss.bs.modal"),
                P.off(this._dialog, "mousedown.dismiss.bs.modal"),
                this._queueCallback(() => this._hideModal(), this._element, e);
        }
        dispose() {
            [window, this._dialog].forEach((t) => P.off(t, ".bs.modal")),
                this._backdrop.dispose(),
                super.dispose(),
                P.off(document, "focusin.bs.modal");
        }
        handleUpdate() {
            this._adjustDialog();
        }
        _initializeBackDrop() {
            return new ke({
                isVisible: Boolean(this._config.backdrop),
                isAnimated: this._isAnimated(),
            });
        }
        _getConfig(t) {
            return (
                (t = {
                    ...Le,
                    ...U.getDataAttributes(this._element),
                    ...("object" == typeof t ? t : {}),
                }),
                l("modal", t, xe),
                t
            );
        }
        _showElement(e) {
            const i = this._isAnimated(),
                n = t.findOne(".modal-body", this._dialog);
            (this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
            document.body.appendChild(this._element),
                (this._element.style.display = "block"),
                this._element.removeAttribute("aria-hidden"),
                this._element.setAttribute("aria-modal", !0),
                this._element.setAttribute("role", "dialog"),
                (this._element.scrollTop = 0),
                n && (n.scrollTop = 0),
                i && f(this._element),
                this._element.classList.add("show"),
                this._config.focus && this._enforceFocus(),
                this._queueCallback(
                    () => {
                        this._config.focus && this._element.focus(),
                            (this._isTransitioning = !1),
                            P.trigger(this._element, "shown.bs.modal", { relatedTarget: e });
                    },
                    this._dialog,
                    i
                );
        }
        _enforceFocus() {
            P.off(document, "focusin.bs.modal"),
                P.on(document, "focusin.bs.modal", (t) => {
                    document === t.target ||
                        this._element === t.target ||
                        this._element.contains(t.target) ||
                        this._element.focus();
                });
        }
        _setEscapeEvent() {
            this._isShown ?
                P.on(this._element, "keydown.dismiss.bs.modal", (t) => {
                    this._config.keyboard && "Escape" === t.key ?
                        (t.preventDefault(), this.hide()) :
                        this._config.keyboard ||
                        "Escape" !== t.key ||
                        this._triggerBackdropTransition();
                }) :
                P.off(this._element, "keydown.dismiss.bs.modal");
        }
        _setResizeEvent() {
            this._isShown ?
                P.on(window, "resize.bs.modal", () => this._adjustDialog()) :
                P.off(window, "resize.bs.modal");
        }
        _hideModal() {
            (this._element.style.display = "none"),
            this._element.setAttribute("aria-hidden", !0),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                (this._isTransitioning = !1),
                this._backdrop.hide(() => {
                    document.body.classList.remove("modal-open"),
                        this._resetAdjustments(),
                        this._scrollBar.reset(),
                        P.trigger(this._element, "hidden.bs.modal");
                });
        }
        _showBackdrop(t) {
            P.on(this._element, "click.dismiss.bs.modal", (t) => {
                    this._ignoreBackdropClick ?
                        (this._ignoreBackdropClick = !1) :
                        t.target === t.currentTarget &&
                        (!0 === this._config.backdrop ?
                            this.hide() :
                            "static" === this._config.backdrop &&
                            this._triggerBackdropTransition());
                }),
                this._backdrop.show(t);
        }
        _isAnimated() {
            return this._element.classList.contains("fade");
        }
        _triggerBackdropTransition() {
            if (P.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented)
                return;
            const { classList: t, scrollHeight: e, style: i } = this._element,
                n = e > document.documentElement.clientHeight;
            (!n && "hidden" === i.overflowY) ||
            t.contains("modal-static") ||
                (n || (i.overflowY = "hidden"),
                    t.add("modal-static"),
                    this._queueCallback(() => {
                        t.remove("modal-static"),
                            n ||
                            this._queueCallback(() => {
                                i.overflowY = "";
                            }, this._dialog);
                    }, this._dialog),
                    this._element.focus());
        }
        _adjustDialog() {
            const t =
                this._element.scrollHeight > document.documentElement.clientHeight,
                e = this._scrollBar.getWidth(),
                i = e > 0;
            ((!i && t && !g()) || (i && !t && g())) &&
            (this._element.style.paddingLeft = e + "px"),
            ((i && !t && !g()) || (!i && t && g())) &&
            (this._element.style.paddingRight = e + "px");
        }
        _resetAdjustments() {
            (this._element.style.paddingLeft = ""),
            (this._element.style.paddingRight = "");
        }
        static jQueryInterface(t, e) {
            return this.each(function() {
                const i = De.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                    i[t](e);
                }
            });
        }
    }
    P.on(
            document,
            "click.bs.modal.data-api",
            '[data-bs-toggle="modal"]',
            function(t) {
                const e = s(this);
                ["A", "AREA"].includes(this.tagName) && t.preventDefault(),
                    P.one(e, "show.bs.modal", (t) => {
                        t.defaultPrevented ||
                            P.one(e, "hidden.bs.modal", () => {
                                c(this) && this.focus();
                            });
                    }),
                    De.getOrCreateInstance(e).toggle(this);
            }
        ),
        _(De);
    const Se = { backdrop: !0, keyboard: !0, scroll: !1 },
        Ie = { backdrop: "boolean", keyboard: "boolean", scroll: "boolean" };
    class Ne extends B {
        constructor(t, e) {
            super(t),
                (this._config = this._getConfig(e)),
                (this._isShown = !1),
                (this._backdrop = this._initializeBackDrop()),
                this._addEventListeners();
        }
        static get NAME() {
            return "offcanvas";
        }
        static get Default() {
            return Se;
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t);
        }
        show(t) {
            this._isShown ||
                P.trigger(this._element, "show.bs.offcanvas", { relatedTarget: t })
                .defaultPrevented ||
                ((this._isShown = !0),
                    (this._element.style.visibility = "visible"),
                    this._backdrop.show(),
                    this._config.scroll ||
                    (new Te().hide(), this._enforceFocusOnElement(this._element)),
                    this._element.removeAttribute("aria-hidden"),
                    this._element.setAttribute("aria-modal", !0),
                    this._element.setAttribute("role", "dialog"),
                    this._element.classList.add("show"),
                    this._queueCallback(
                        () => {
                            P.trigger(this._element, "shown.bs.offcanvas", {
                                relatedTarget: t,
                            });
                        },
                        this._element, !0
                    ));
        }
        hide() {
            this._isShown &&
                (P.trigger(this._element, "hide.bs.offcanvas").defaultPrevented ||
                    (P.off(document, "focusin.bs.offcanvas"),
                        this._element.blur(),
                        (this._isShown = !1),
                        this._element.classList.remove("show"),
                        this._backdrop.hide(),
                        this._queueCallback(
                            () => {
                                this._element.setAttribute("aria-hidden", !0),
                                    this._element.removeAttribute("aria-modal"),
                                    this._element.removeAttribute("role"),
                                    (this._element.style.visibility = "hidden"),
                                    this._config.scroll || new Te().reset(),
                                    P.trigger(this._element, "hidden.bs.offcanvas");
                            },
                            this._element, !0
                        )));
        }
        dispose() {
            this._backdrop.dispose(),
                super.dispose(),
                P.off(document, "focusin.bs.offcanvas");
        }
        _getConfig(t) {
            return (
                (t = {
                    ...Se,
                    ...U.getDataAttributes(this._element),
                    ...("object" == typeof t ? t : {}),
                }),
                l("offcanvas", t, Ie),
                t
            );
        }
        _initializeBackDrop() {
            return new ke({
                isVisible: this._config.backdrop,
                isAnimated: !0,
                rootElement: this._element.parentNode,
                clickCallback: () => this.hide(),
            });
        }
        _enforceFocusOnElement(t) {
            P.off(document, "focusin.bs.offcanvas"),
                P.on(document, "focusin.bs.offcanvas", (e) => {
                    document === e.target ||
                        t === e.target ||
                        t.contains(e.target) ||
                        t.focus();
                }),
                t.focus();
        }
        _addEventListeners() {
            P.on(
                    this._element,
                    "click.dismiss.bs.offcanvas",
                    '[data-bs-dismiss="offcanvas"]',
                    () => this.hide()
                ),
                P.on(this._element, "keydown.dismiss.bs.offcanvas", (t) => {
                    this._config.keyboard && "Escape" === t.key && this.hide();
                });
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = Ne.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
                        throw new TypeError(`No method named "${t}"`);
                    e[t](this);
                }
            });
        }
    }
    P.on(
            document,
            "click.bs.offcanvas.data-api",
            '[data-bs-toggle="offcanvas"]',
            function(e) {
                const i = s(this);
                if ((["A", "AREA"].includes(this.tagName) && e.preventDefault(), h(this)))
                    return;
                P.one(i, "hidden.bs.offcanvas", () => {
                    c(this) && this.focus();
                });
                const n = t.findOne(".offcanvas.show");
                n && n !== i && Ne.getInstance(n).hide(),
                    Ne.getOrCreateInstance(i).toggle(this);
            }
        ),
        P.on(window, "load.bs.offcanvas.data-api", () =>
            t.find(".offcanvas.show").forEach((t) => Ne.getOrCreateInstance(t).show())
        ),
        _(Ne);
    const je = new Set([
            "background",
            "cite",
            "href",
            "itemtype",
            "longdesc",
            "poster",
            "src",
            "xlink:href",
        ]),
        Me = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i,
        Pe =
        /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
        He = (t, e) => {
            const i = t.nodeName.toLowerCase();
            if (e.includes(i))
                return (!je.has(i) || Boolean(Me.test(t.nodeValue) || Pe.test(t.nodeValue)));
            const n = e.filter((t) => t instanceof RegExp);
            for (let t = 0, e = n.length; t < e; t++)
                if (n[t].test(i)) return !0;
            return !1;
        };

    function Re(t, e, i) {
        if (!t.length) return t;
        if (i && "function" == typeof i) return i(t);
        const n = new window.DOMParser().parseFromString(t, "text/html"),
            s = Object.keys(e),
            o = [].concat(...n.body.querySelectorAll("*"));
        for (let t = 0, i = o.length; t < i; t++) {
            const i = o[t],
                n = i.nodeName.toLowerCase();
            if (!s.includes(n)) {
                i.remove();
                continue;
            }
            const r = [].concat(...i.attributes),
                a = [].concat(e["*"] || [], e[n] || []);
            r.forEach((t) => {
                He(t, a) || i.removeAttribute(t.nodeName);
            });
        }
        return n.body.innerHTML;
    }
    const Be = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        We = new Set(["sanitize", "allowList", "sanitizeFn"]),
        qe = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(array|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacements: "array",
            boundary: "(string|element)",
            customClass: "(string|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            allowList: "object",
            popperConfig: "(null|object|function)",
        },
        ze = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: g() ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: g() ? "right" : "left",
        },
        $e = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: [0, 0],
            container: !1,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            boundary: "clippingParents",
            customClass: "",
            sanitize: !0,
            sanitizeFn: null,
            allowList: {
                "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "srcset", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: [],
            },
            popperConfig: null,
        },
        Ue = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip",
        };
    class Fe extends B {
        constructor(t, e) {
            if (void 0 === fe)
                throw new TypeError(
                    "Bootstrap's tooltips require Popper (https://popper.js.org)"
                );
            super(t),
                (this._isEnabled = !0),
                (this._timeout = 0),
                (this._hoverState = ""),
                (this._activeTrigger = {}),
                (this._popper = null),
                (this._config = this._getConfig(e)),
                (this.tip = null),
                this._setListeners();
        }
        static get Default() {
            return $e;
        }
        static get NAME() {
            return "tooltip";
        }
        static get Event() {
            return Ue;
        }
        static get DefaultType() {
            return qe;
        }
        enable() {
            this._isEnabled = !0;
        }
        disable() {
            this._isEnabled = !1;
        }
        toggleEnabled() {
            this._isEnabled = !this._isEnabled;
        }
        toggle(t) {
            if (this._isEnabled)
                if (t) {
                    const e = this._initializeOnDelegatedTarget(t);
                    (e._activeTrigger.click = !e._activeTrigger.click),
                    e._isWithActiveTrigger() ? e._enter(null, e) : e._leave(null, e);
                } else {
                    if (this.getTipElement().classList.contains("show"))
                        return void this._leave(null, this);
                    this._enter(null, this);
                }
        }
        dispose() {
            clearTimeout(this._timeout),
                P.off(
                    this._element.closest(".modal"),
                    "hide.bs.modal",
                    this._hideModalHandler
                ),
                this.tip && this.tip.remove(),
                this._popper && this._popper.destroy(),
                super.dispose();
        }
        show() {
            if ("none" === this._element.style.display)
                throw new Error("Please use show on visible elements");
            if (!this.isWithContent() || !this._isEnabled) return;
            const t = P.trigger(this._element, this.constructor.Event.SHOW),
                i = d(this._element),
                n =
                null === i ?
                this._element.ownerDocument.documentElement.contains(
                    this._element
                ) :
                i.contains(this._element);
            if (t.defaultPrevented || !n) return;
            const s = this.getTipElement(),
                o = e(this.constructor.NAME);
            s.setAttribute("id", o),
                this._element.setAttribute("aria-describedby", o),
                this.setContent(),
                this._config.animation && s.classList.add("fade");
            const r =
                "function" == typeof this._config.placement ?
                this._config.placement.call(this, s, this._element) :
                this._config.placement,
                a = this._getAttachment(r);
            this._addAttachmentClass(a);
            const { container: l } = this._config;
            R.set(s, this.constructor.DATA_KEY, this),
                this._element.ownerDocument.documentElement.contains(this.tip) ||
                (l.appendChild(s),
                    P.trigger(this._element, this.constructor.Event.INSERTED)),
                this._popper ?
                this._popper.update() :
                (this._popper = ue(this._element, s, this._getPopperConfig(a))),
                s.classList.add("show");
            const c =
                "function" == typeof this._config.customClass ?
                this._config.customClass() :
                this._config.customClass;
            c && s.classList.add(...c.split(" ")),
                "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach((t) => {
                    P.on(t, "mouseover", u);
                });
            const h = this.tip.classList.contains("fade");
            this._queueCallback(
                () => {
                    const t = this._hoverState;
                    (this._hoverState = null),
                    P.trigger(this._element, this.constructor.Event.SHOWN),
                        "out" === t && this._leave(null, this);
                },
                this.tip,
                h
            );
        }
        hide() {
            if (!this._popper) return;
            const t = this.getTipElement();
            if (
                P.trigger(this._element, this.constructor.Event.HIDE).defaultPrevented
            )
                return;
            t.classList.remove("show"),
                "ontouchstart" in document.documentElement && []
                .concat(...document.body.children)
                .forEach((t) => P.off(t, "mouseover", u)),
                (this._activeTrigger.click = !1),
                (this._activeTrigger.focus = !1),
                (this._activeTrigger.hover = !1);
            const e = this.tip.classList.contains("fade");
            this._queueCallback(
                    () => {
                        this._isWithActiveTrigger() ||
                            ("show" !== this._hoverState && t.remove(),
                                this._cleanTipClass(),
                                this._element.removeAttribute("aria-describedby"),
                                P.trigger(this._element, this.constructor.Event.HIDDEN),
                                this._popper && (this._popper.destroy(), (this._popper = null)));
                    },
                    this.tip,
                    e
                ),
                (this._hoverState = "");
        }
        update() {
            null !== this._popper && this._popper.update();
        }
        isWithContent() {
            return Boolean(this.getTitle());
        }
        getTipElement() {
            if (this.tip) return this.tip;
            const t = document.createElement("div");
            return (
                (t.innerHTML = this._config.template),
                (this.tip = t.children[0]),
                this.tip
            );
        }
        setContent() {
            const e = this.getTipElement();
            this.setElementContent(t.findOne(".tooltip-inner", e), this.getTitle()),
                e.classList.remove("fade", "show");
        }
        setElementContent(t, e) {
            if (null !== t)
                return r(e) ?
                    ((e = a(e)),
                        void(this._config.html ?
                            e.parentNode !== t && ((t.innerHTML = ""), t.appendChild(e)) :
                            (t.textContent = e.textContent))) :
                    void(this._config.html ?
                        (this._config.sanitize &&
                            (e = Re(e, this._config.allowList, this._config.sanitizeFn)),
                            (t.innerHTML = e)) :
                        (t.textContent = e));
        }
        getTitle() {
            let t = this._element.getAttribute("data-bs-original-title");
            return (
                t ||
                (t =
                    "function" == typeof this._config.title ?
                    this._config.title.call(this._element) :
                    this._config.title),
                t
            );
        }
        updateAttachment(t) {
            return "right" === t ? "end" : "left" === t ? "start" : t;
        }
        _initializeOnDelegatedTarget(t, e) {
            const i = this.constructor.DATA_KEY;
            return (
                (e = e || R.get(t.delegateTarget, i)) ||
                ((e = new this.constructor(
                        t.delegateTarget,
                        this._getDelegateConfig()
                    )),
                    R.set(t.delegateTarget, i, e)),
                e
            );
        }
        _getOffset() {
            const { offset: t } = this._config;
            return "string" == typeof t ?
                t.split(",").map((t) => Number.parseInt(t, 10)) :
                "function" == typeof t ?
                (e) => t(e, this._element) :
                t;
        }
        _getPopperConfig(t) {
            const e = {
                placement: t,
                modifiers: [{
                        name: "flip",
                        options: { fallbackPlacements: this._config.fallbackPlacements },
                    },
                    { name: "offset", options: { offset: this._getOffset() } },
                    {
                        name: "preventOverflow",
                        options: { boundary: this._config.boundary },
                    },
                    {
                        name: "arrow",
                        options: { element: `.${this.constructor.NAME}-arrow` },
                    },
                    {
                        name: "onChange",
                        enabled: !0,
                        phase: "afterWrite",
                        fn: (t) => this._handlePopperPlacementChange(t),
                    },
                ],
                onFirstUpdate: (t) => {
                    t.options.placement !== t.placement &&
                        this._handlePopperPlacementChange(t);
                },
            };
            return {
                ...e,
                ...("function" == typeof this._config.popperConfig ?
                    this._config.popperConfig(e) :
                    this._config.popperConfig),
            };
        }
        _addAttachmentClass(t) {
            this.getTipElement().classList.add(
                "bs-tooltip-" + this.updateAttachment(t)
            );
        }
        _getAttachment(t) {
            return ze[t.toUpperCase()];
        }
        _setListeners() {
            this._config.trigger.split(" ").forEach((t) => {
                    if ("click" === t)
                        P.on(
                            this._element,
                            this.constructor.Event.CLICK,
                            this._config.selector,
                            (t) => this.toggle(t)
                        );
                    else if ("manual" !== t) {
                        const e =
                            "hover" === t ?
                            this.constructor.Event.MOUSEENTER :
                            this.constructor.Event.FOCUSIN,
                            i =
                            "hover" === t ?
                            this.constructor.Event.MOUSELEAVE :
                            this.constructor.Event.FOCUSOUT;
                        P.on(this._element, e, this._config.selector, (t) => this._enter(t)),
                            P.on(this._element, i, this._config.selector, (t) =>
                                this._leave(t)
                            );
                    }
                }),
                (this._hideModalHandler = () => {
                    this._element && this.hide();
                }),
                P.on(
                    this._element.closest(".modal"),
                    "hide.bs.modal",
                    this._hideModalHandler
                ),
                this._config.selector ?
                (this._config = {
                    ...this._config,
                    trigger: "manual",
                    selector: "",
                }) :
                this._fixTitle();
        }
        _fixTitle() {
            const t = this._element.getAttribute("title"),
                e = typeof this._element.getAttribute("data-bs-original-title");
            (t || "string" !== e) &&
            (this._element.setAttribute("data-bs-original-title", t || ""), !t ||
                this._element.getAttribute("aria-label") ||
                this._element.textContent ||
                this._element.setAttribute("aria-label", t),
                this._element.setAttribute("title", ""));
        }
        _enter(t, e) {
            (e = this._initializeOnDelegatedTarget(t, e)),
            t && (e._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0),
                e.getTipElement().classList.contains("show") || "show" === e._hoverState ?
                (e._hoverState = "show") :
                (clearTimeout(e._timeout),
                    (e._hoverState = "show"),
                    e._config.delay && e._config.delay.show ?
                    (e._timeout = setTimeout(() => {
                        "show" === e._hoverState && e.show();
                    }, e._config.delay.show)) :
                    e.show());
        }
        _leave(t, e) {
            (e = this._initializeOnDelegatedTarget(t, e)),
            t &&
                (e._activeTrigger["focusout" === t.type ? "focus" : "hover"] =
                    e._element.contains(t.relatedTarget)),
                e._isWithActiveTrigger() ||
                (clearTimeout(e._timeout),
                    (e._hoverState = "out"),
                    e._config.delay && e._config.delay.hide ?
                    (e._timeout = setTimeout(() => {
                        "out" === e._hoverState && e.hide();
                    }, e._config.delay.hide)) :
                    e.hide());
        }
        _isWithActiveTrigger() {
            for (const t in this._activeTrigger)
                if (this._activeTrigger[t]) return !0;
            return !1;
        }
        _getConfig(t) {
            const e = U.getDataAttributes(this._element);
            return (
                Object.keys(e).forEach((t) => {
                    We.has(t) && delete e[t];
                }),
                ((t = {
                    ...this.constructor.Default,
                    ...e,
                    ...("object" == typeof t && t ? t : {}),
                }).container = !1 === t.container ? document.body : a(t.container)),
                "number" == typeof t.delay &&
                (t.delay = { show: t.delay, hide: t.delay }),
                "number" == typeof t.title && (t.title = t.title.toString()),
                "number" == typeof t.content && (t.content = t.content.toString()),
                l("tooltip", t, this.constructor.DefaultType),
                t.sanitize && (t.template = Re(t.template, t.allowList, t.sanitizeFn)),
                t
            );
        }
        _getDelegateConfig() {
            const t = {};
            if (this._config)
                for (const e in this._config)
                    this.constructor.Default[e] !== this._config[e] &&
                    (t[e] = this._config[e]);
            return t;
        }
        _cleanTipClass() {
            const t = this.getTipElement(),
                e = t.getAttribute("class").match(Be);
            null !== e &&
                e.length > 0 &&
                e.map((t) => t.trim()).forEach((e) => t.classList.remove(e));
        }
        _handlePopperPlacementChange(t) {
            const { state: e } = t;
            e &&
                ((this.tip = e.elements.popper),
                    this._cleanTipClass(),
                    this._addAttachmentClass(this._getAttachment(e.placement)));
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = Fe.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    _(Fe);
    const Ve = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        Ke = {
            ...Fe.Default,
            placement: "right",
            offset: [0, 8],
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        },
        Xe = {...Fe.DefaultType, content: "(string|element|function)" },
        Ye = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover",
        };
    class Qe extends Fe {
        static get Default() {
            return Ke;
        }
        static get NAME() {
            return "popover";
        }
        static get Event() {
            return Ye;
        }
        static get DefaultType() {
            return Xe;
        }
        isWithContent() {
            return this.getTitle() || this._getContent();
        }
        getTipElement() {
            return (
                this.tip ||
                ((this.tip = super.getTipElement()),
                    this.getTitle() || t.findOne(".popover-header", this.tip).remove(),
                    this._getContent() || t.findOne(".popover-body", this.tip).remove()),
                this.tip
            );
        }
        setContent() {
            const e = this.getTipElement();
            this.setElementContent(t.findOne(".popover-header", e), this.getTitle());
            let i = this._getContent();
            "function" == typeof i && (i = i.call(this._element)),
                this.setElementContent(t.findOne(".popover-body", e), i),
                e.classList.remove("fade", "show");
        }
        _addAttachmentClass(t) {
            this.getTipElement().classList.add(
                "bs-popover-" + this.updateAttachment(t)
            );
        }
        _getContent() {
            return (
                this._element.getAttribute("data-bs-content") || this._config.content
            );
        }
        _cleanTipClass() {
            const t = this.getTipElement(),
                e = t.getAttribute("class").match(Ve);
            null !== e &&
                e.length > 0 &&
                e.map((t) => t.trim()).forEach((e) => t.classList.remove(e));
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = Qe.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    _(Qe);
    const Ge = { offset: 10, method: "auto", target: "" },
        Ze = { offset: "number", method: "string", target: "(string|element)" };
    class Je extends B {
        constructor(t, e) {
            super(t),
                (this._scrollElement =
                    "BODY" === this._element.tagName ? window : this._element),
                (this._config = this._getConfig(e)),
                (this._selector = `${this._config.target} .nav-link, ${this._config.target} .list-group-item, ${this._config.target} .dropdown-item`),
                (this._offsets = []),
                (this._targets = []),
                (this._activeTarget = null),
                (this._scrollHeight = 0),
                P.on(this._scrollElement, "scroll.bs.scrollspy", () => this._process()),
                this.refresh(),
                this._process();
        }
        static get Default() {
            return Ge;
        }
        static get NAME() {
            return "scrollspy";
        }
        refresh() {
            const e =
                this._scrollElement === this._scrollElement.window ?
                "offset" :
                "position",
                i = "auto" === this._config.method ? e : this._config.method,
                s = "position" === i ? this._getScrollTop() : 0;
            (this._offsets = []),
            (this._targets = []),
            (this._scrollHeight = this._getScrollHeight()),
            t
                .find(this._selector)
                .map((e) => {
                    const o = n(e),
                        r = o ? t.findOne(o) : null;
                    if (r) {
                        const t = r.getBoundingClientRect();
                        if (t.width || t.height) return [U[i](r).top + s, o];
                    }
                    return null;
                })
                .filter((t) => t)
                .sort((t, e) => t[0] - e[0])
                .forEach((t) => {
                    this._offsets.push(t[0]), this._targets.push(t[1]);
                });
        }
        dispose() {
            P.off(this._scrollElement, ".bs.scrollspy"), super.dispose();
        }
        _getConfig(t) {
            if (
                "string" !=
                typeof(t = {
                    ...Ge,
                    ...U.getDataAttributes(this._element),
                    ...("object" == typeof t && t ? t : {}),
                }).target &&
                r(t.target)
            ) {
                let { id: i } = t.target;
                i || ((i = e("scrollspy")), (t.target.id = i)), (t.target = "#" + i);
            }
            return l("scrollspy", t, Ze), t;
        }
        _getScrollTop() {
            return this._scrollElement === window ?
                this._scrollElement.pageYOffset :
                this._scrollElement.scrollTop;
        }
        _getScrollHeight() {
            return (
                this._scrollElement.scrollHeight ||
                Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight
                )
            );
        }
        _getOffsetHeight() {
            return this._scrollElement === window ?
                window.innerHeight :
                this._scrollElement.getBoundingClientRect().height;
        }
        _process() {
            const t = this._getScrollTop() + this._config.offset,
                e = this._getScrollHeight(),
                i = this._config.offset + e - this._getOffsetHeight();
            if ((this._scrollHeight !== e && this.refresh(), t >= i)) {
                const t = this._targets[this._targets.length - 1];
                this._activeTarget !== t && this._activate(t);
            } else {
                if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0)
                    return (this._activeTarget = null), void this._clear();
                for (let e = this._offsets.length; e--;)
                    this._activeTarget !== this._targets[e] &&
                    t >= this._offsets[e] &&
                    (void 0 === this._offsets[e + 1] || t < this._offsets[e + 1]) &&
                    this._activate(this._targets[e]);
            }
        }
        _activate(e) {
            (this._activeTarget = e), this._clear();
            const i = this._selector
                .split(",")
                .map((t) => `${t}[data-bs-target="${e}"],${t}[href="${e}"]`),
                n = t.findOne(i.join(","));
            n.classList.contains("dropdown-item") ?
                (t
                    .findOne(".dropdown-toggle", n.closest(".dropdown"))
                    .classList.add("active"),
                    n.classList.add("active")) :
                (n.classList.add("active"),
                    t.parents(n, ".nav, .list-group").forEach((e) => {
                        t
                            .prev(e, ".nav-link, .list-group-item")
                            .forEach((t) => t.classList.add("active")),
                            t.prev(e, ".nav-item").forEach((e) => {
                                t.children(e, ".nav-link").forEach((t) =>
                                    t.classList.add("active")
                                );
                            });
                    })),
                P.trigger(this._scrollElement, "activate.bs.scrollspy", {
                    relatedTarget: e,
                });
        }
        _clear() {
            t.find(this._selector)
                .filter((t) => t.classList.contains("active"))
                .forEach((t) => t.classList.remove("active"));
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = Je.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    P.on(window, "load.bs.scrollspy.data-api", () => {
            t.find('[data-bs-spy="scroll"]').forEach((t) => new Je(t));
        }),
        _(Je);
    class ti extends B {
        static get NAME() {
            return "tab";
        }
        show() {
            if (
                this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                this._element.classList.contains("active")
            )
                return;
            let e;
            const i = s(this._element),
                n = this._element.closest(".nav, .list-group");
            if (n) {
                const i =
                    "UL" === n.nodeName || "OL" === n.nodeName ?
                    ":scope > li > .active" :
                    ".active";
                (e = t.find(i, n)), (e = e[e.length - 1]);
            }
            const o = e ?
                P.trigger(e, "hide.bs.tab", { relatedTarget: this._element }) :
                null;
            if (
                P.trigger(this._element, "show.bs.tab", { relatedTarget: e })
                .defaultPrevented ||
                (null !== o && o.defaultPrevented)
            )
                return;
            this._activate(this._element, n);
            const r = () => {
                P.trigger(e, "hidden.bs.tab", { relatedTarget: this._element }),
                    P.trigger(this._element, "shown.bs.tab", { relatedTarget: e });
            };
            i ? this._activate(i, i.parentNode, r) : r();
        }
        _activate(e, i, n) {
            const s = (!i || ("UL" !== i.nodeName && "OL" !== i.nodeName) ?
                    t.children(i, ".active") :
                    t.find(":scope > li > .active", i)
                )[0],
                o = n && s && s.classList.contains("fade"),
                r = () => this._transitionComplete(e, s, n);
            s && o ?
                (s.classList.remove("show"), this._queueCallback(r, e, !0)) :
                r();
        }
        _transitionComplete(e, i, n) {
            if (i) {
                i.classList.remove("active");
                const e = t.findOne(":scope > .dropdown-menu .active", i.parentNode);
                e && e.classList.remove("active"),
                    "tab" === i.getAttribute("role") &&
                    i.setAttribute("aria-selected", !1);
            }
            e.classList.add("active"),
                "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0),
                f(e),
                e.classList.contains("fade") && e.classList.add("show");
            let s = e.parentNode;
            if (
                (s && "LI" === s.nodeName && (s = s.parentNode),
                    s && s.classList.contains("dropdown-menu"))
            ) {
                const i = e.closest(".dropdown");
                i &&
                    t
                    .find(".dropdown-toggle", i)
                    .forEach((t) => t.classList.add("active")),
                    e.setAttribute("aria-expanded", !0);
            }
            n && n();
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = ti.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    P.on(
            document,
            "click.bs.tab.data-api",
            '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
            function(t) {
                ["A", "AREA"].includes(this.tagName) && t.preventDefault(),
                    h(this) || ti.getOrCreateInstance(this).show();
            }
        ),
        _(ti);
    const ei = { animation: "boolean", autohide: "boolean", delay: "number" },
        ii = { animation: !0, autohide: !0, delay: 5e3 };
    class ni extends B {
        constructor(t, e) {
            super(t),
                (this._config = this._getConfig(e)),
                (this._timeout = null),
                (this._hasMouseInteraction = !1),
                (this._hasKeyboardInteraction = !1),
                this._setListeners();
        }
        static get DefaultType() {
            return ei;
        }
        static get Default() {
            return ii;
        }
        static get NAME() {
            return "toast";
        }
        show() {
            P.trigger(this._element, "show.bs.toast").defaultPrevented ||
                (this._clearTimeout(),
                    this._config.animation && this._element.classList.add("fade"),
                    this._element.classList.remove("hide"),
                    f(this._element),
                    this._element.classList.add("showing"),
                    this._queueCallback(
                        () => {
                            this._element.classList.remove("showing"),
                                this._element.classList.add("show"),
                                P.trigger(this._element, "shown.bs.toast"),
                                this._maybeScheduleHide();
                        },
                        this._element,
                        this._config.animation
                    ));
        }
        hide() {
            this._element.classList.contains("show") &&
                (P.trigger(this._element, "hide.bs.toast").defaultPrevented ||
                    (this._element.classList.remove("show"),
                        this._queueCallback(
                            () => {
                                this._element.classList.add("hide"),
                                    P.trigger(this._element, "hidden.bs.toast");
                            },
                            this._element,
                            this._config.animation
                        )));
        }
        dispose() {
            this._clearTimeout(),
                this._element.classList.contains("show") &&
                this._element.classList.remove("show"),
                super.dispose();
        }
        _getConfig(t) {
            return (
                (t = {
                    ...ii,
                    ...U.getDataAttributes(this._element),
                    ...("object" == typeof t && t ? t : {}),
                }),
                l("toast", t, this.constructor.DefaultType),
                t
            );
        }
        _maybeScheduleHide() {
            this._config.autohide &&
                (this._hasMouseInteraction ||
                    this._hasKeyboardInteraction ||
                    (this._timeout = setTimeout(() => {
                        this.hide();
                    }, this._config.delay)));
        }
        _onInteraction(t, e) {
            switch (t.type) {
                case "mouseover":
                case "mouseout":
                    this._hasMouseInteraction = e;
                    break;
                case "focusin":
                case "focusout":
                    this._hasKeyboardInteraction = e;
            }
            if (e) return void this._clearTimeout();
            const i = t.relatedTarget;
            this._element === i ||
                this._element.contains(i) ||
                this._maybeScheduleHide();
        }
        _setListeners() {
            P.on(
                    this._element,
                    "click.dismiss.bs.toast",
                    '[data-bs-dismiss="toast"]',
                    () => this.hide()
                ),
                P.on(this._element, "mouseover.bs.toast", (t) =>
                    this._onInteraction(t, !0)
                ),
                P.on(this._element, "mouseout.bs.toast", (t) =>
                    this._onInteraction(t, !1)
                ),
                P.on(this._element, "focusin.bs.toast", (t) =>
                    this._onInteraction(t, !0)
                ),
                P.on(this._element, "focusout.bs.toast", (t) =>
                    this._onInteraction(t, !1)
                );
        }
        _clearTimeout() {
            clearTimeout(this._timeout), (this._timeout = null);
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = ni.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t](this);
                }
            });
        }
    }
    return (
        _(ni), {
            Alert: W,
            Button: q,
            Carousel: Z,
            Collapse: et,
            Dropdown: Ae,
            Modal: De,
            Offcanvas: Ne,
            Popover: Qe,
            ScrollSpy: Je,
            Tab: ti,
            Toast: ni,
            Tooltip: Fe,
        }
    );
});
//# sourceMappingURL=bootstrap.bundle.min.js.map