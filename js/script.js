var spinner = function() {
					"use strict";
					var t = t => 2 * Math.PI / t;
					var e = t => {
						const {
							originX: e,
							originY: n,
							spinnerRadius: i,
							pinRadius: r
						} = t;
						return `<circle cx=${e} cy=${n} r=${i-2*r} fill=transparent stroke-width=${4*r} stroke=var(--shade) />`
					};
					var n = t => {
						const {
							viewBoxSize: e,
							originX: n,
							originY: i,
							spinnerRadius: r
						} = t;
						return `<mask id="mask"><rect width="${e}" height="${e}" fill="#000"/><circle cx=${n} cy=${i} r=${r} fill="#fff"/></mask>`
					};
					var i = t =>
						`<path d="M${t-4} 3 h12 l-6 10z" fill=var(--shade) stroke-linejoin="round" stroke-width=2 stroke=var(--text) />`;
					var r = (t, e, n, i) => [n * Math.cos(i) + t, n * Math.sin(i) + e];
					var s = (e, n) => {
						const {
							originX: i,
							originY: s,
							spinnerRadius: a,
							pinRadius: o
						} = n;
						let l = "",
							h = Math.min(e, 60);
						const c = t(h);
						for (let t = 0; t < h; t++) {
							const e = r(i, s, a - 2 * o, c * t);
							l += `<circle cx=${e[0]} cy=${e[1]} r=${o} />`
						}
						return `<g fill=var(--text)>${l}</g>`
					};
					var a = (t, e, n, i, s, a) => {
						a && (s = 2 * Math.PI - .01);
						const o = r(t, e, n, i),
							l = r(t, e, n, s),
							h = s - i <= Math.PI ? 0 : 1,
							c = s < i ? 0 : 1;
						return `M${o[0]} ${o[1]} A${n} ${n} 0 ${h} ${c} ${l[0]} ${l[1]}`
					};
					var o = (e, n) => {
						const {
							originX: i,
							originY: s,
							spinnerRadius: o,
							arcTextOffset: l,
							straightTextOffset: h,
							straightTextOffsetInner: c,
							fontSize: d
						} = n, p = e.length, u = t(p), m = o - l;
						return e.map(((t, e) => {
							const n = p > 20 || ((t, e, n, i) => {
									const r = e * n;
									return t.length * i * .6 > r
								})(t, u, m, d) || u < 1,
								l = u * e,
								g = l + u;
							let f = "";
							if (n) {
								f = ((t, e, n, i, s, a, o) => {
									const l = i + s / 2 - a / 2 / n * .7,
										h = r(t, e, n, l),
										c = r(t, e, o, l);
									return `M${h[0]} ${h[1]}L${c[0]} ${c[1]}`
								})(i, s, o - h, l, u, d, c)
							} else {
								f = a(i, s, m, l, g, p < 2)
							}
							return {
								path: `<path id=t${e} d="${f}" />`,
								text: `<text fill=var(--text)><textPath ${n?"":"text-anchor=middle startOffset=50%"} href=#t${e}>${t}</textPath></text>`
							}
						}))
					};
					var l = t => t.map(((t, e) => ((t, e) =>
						`\n    <pattern id=p${t} width=4 height=4 patternUnits=userSpaceOnUse >\n    <path d="m0 0h4v4h-4z"/><path d="${e}" fill="#fff" />\n    </pattern>\n    <mask id=m${t} width="4" height="4"><path d="m0 0h1000v1000h-1000z" fill="url(#p${t})"/></mask>`
					)(e, t))).join("");
					var h = (e, n) => {
						const {
							originX: i,
							originY: s,
							spinnerRadius: a,
							viewBoxSize: o,
							colors: l,
							patterns: h,
							patternColors: c
						} = n, d = e.length;
						return e.map(((e, n) => ((e, n) => {
							const d = "m" + n % h.length,
								p = l.length,
								u = c.length;
							let m = n % p;
							e - n == 1 && 0 === m && p > 2 && (m += 2);
							let g = l[m],
								f = c[m % u],
								v = `M0 0h${o}v${o}h-${o}`;
							if (e > 2) {
								const o = t(e),
									l = o * n,
									h = l + o,
									c = r(i, s, 2 * a, l),
									d = r(i, s, 2 * a, h);
								v = `M${i} ${s} L${c[0]} ${c[1]} L${d[0]} ${d[1]}z`
							} else n > 0 && (v = `M0 0 v${s} h${o} v-${i}`);
							return e > 50 ? `<path d="${v}" fill=${g} />` :
								`<path d="${v}" fill=${g} /><path d="${v}" fill=${f} mask="url(#${d})" />`
						})(d, n))).join("")
					};
					const c = {
						spinnerRadius: 195,
						originX: 200,
						originY: 200,
						viewBoxSize: 400,
						pinRadius: 2,
						arcTextOffset: 30,
						straightTextOffset: 10,
						straightTextOffsetInner: 20,
						fontSize: 12,
						colors: [...[, , , , ]].map(((t, e) => `var(--c${e}-bg)`)),
						patternColors: [...[, , , , ]].map(((t, e) => `var(--c${e})`)),
						patterns: ["m1 2a1 1 0 102 0a1 1 0 10-2 0", "m0 0h1l3 3v1h-1l-3-3z M3 0h1v1z M0 3v1h1z",
							"m0 4v-1l2-2l2 2v1l-2-2z"
						],
						animationName: ""
					};
					var d = (r, a = c) => {
						a = { ...c,
							...a
						};
						const d = t(r.length);
						a.fontSize = r.length > 100 ? d * a.spinnerRadius * .9 : 12;
						const p = o(r, a),
							u = l(a.patterns),
							m = n(a),
							g = h(r, a),
							f = s(r.length, a),
							v = i(a.originX),
							$ = e(a);
						return `\n            <div id="spinner-inner">\n            <svg viewBox="0 0 ${a.viewBoxSize} ${a.viewBoxSize}" height=100% width=100% font-size="${a.fontSize}">\n                <defs>\n                ${u}\n                ${m}\n                ${p.map((t=>t.path)).join("")}\n                </defs>\n                <g>\n                <circle cx=${a.originX} cy=${a.originY} r=${a.spinnerRadius} fill=var(--base) />\n                <g style="mask:url(#mask);">\n                ${g}\n                </g>\n                ${$}\n                ${f}\n                ${p.map((t=>t.text)).join("")}\n                </g>\n                \n                <circle cx=${a.originX} cy=${a.originY} r=5 fill=var(--base) stroke=var(--shade) stroke-width=2></circle>\n            </svg>\n            </div>\n            <div id="ticker">\n                <svg viewBox="0 0 ${a.viewBoxSize} ${a.viewBoxSize}" height=100% width=100%>\n                    ${v}\n                </svg>\n            </div>\n            `
					};
					var p = t => {
						let e = t % (2 * Math.PI);
						return e < 0 && (e += 2 * Math.PI), e
					};
					var u = (t, e, n) => (t - e) * (t - n) <= 0;
					var m = t => t[t.length * Math.random() | 0];
					var g = (t, e) => Math.floor(Math.random() * (e - t + 1)) + t;
					const f = new(window.AudioContext || window.webkitAudioContext);

					function v(t) {
						this.audioContext = t
					}
					v.prototype.setup = function() {
						this.gain = this.audioContext.createGain();
						this.bandpass = this.audioContext.createBiquadFilter(), this.bandpass.type = "bandpass", this.bandpass.frequency
							.value =
							9e3, this.highpass = this.audioContext.createBiquadFilter(), this.highpass.type = "highpass", this.highpass.frequency
							.value = 4500, this.lowpass = this.audioContext.createBiquadFilter(), this.lowpass.type = "lowpass", this.lowpass
							.frequency.value = 2500, this.oscillators = [], [2, 3, 4.16, 5.43, 6.79, 8.21].forEach((t => {
								const e = this.audioContext.createOscillator();
								e.type = "square", e.frequency.value = 40 * t, e.frequency.exponentialRampToValueAtTime(.001, this.audioContext
									.currentTime + 1), this.oscillators.push(e)
							})), this.oscillators.forEach((t => t.connect(this.bandpass))), this.bandpass.connect(this.highpass).connect(
								this.lowpass).connect(this.gain).connect(this.audioContext.destination)
					}, v.prototype.trigger = function() {
						this.setup(), this.gain.gain.setValueAtTime(1, this.audioContext.currentTime), this.gain.gain.exponentialRampToValueAtTime(
							.01, this.audioContext.currentTime + .06), this.oscillators.forEach((t => {
							t.start(this.audioContext.currentTime + .01), t.stop(this.audioContext.currentTime + .07)
						}))
					};
					var $ = () => {
						new v(f).trigger()
					};
					var x = () => {
						const t = window.location.search.substring(1);
						if (!t) return;
						let e = {};
						return t.split("&").forEach((t => {
							const n = t.split("="),
								i = n[0],
								r = n[1].split("+").map((t => decodeURIComponent(t))),
								s = r.length > 1 ? r : r[0];
							e[i] = s
						})), e
					};
					var w = t => t.replace(/-./g, (t => t.toUpperCase()[1]));
					var y = t => {
						const e = window.getComputedStyle(t, null);
						let n = "transform";
						const i = e.getPropertyValue("-webkit-transform") || e.getPropertyValue("-moz-transform") || e.getPropertyValue(
							"-ms-transform") || e.getPropertyValue("-o-transform") || e.getPropertyValue(n);
						let r = 0;
						if ("none" !== i) {
							const t = i.split("(")[1].split(")")[0].split(","),
								e = t[0],
								n = t[1];
							r = Math.atan2(n, e)
						}
						return r < 0 ? r += 2 * Math.PI : r
					};
					var T = t => (t.split(",").length - 1 > 2 && (t = t.split(",").map((t => t.trim())).join("\n")), t);
					var k = (t, e = "copy", n = !0) => {
						document.getElementById(e).value = n ? window.location.href.split("?")[0] + t : t
					};
					window.updateCopyBox = k;
					const M = {};
					["spinner", "form", "list", "tada", "tada-text", "remove-button", "remove-name", "reset-wheel", "sound"].forEach(
						(t => {
							M[w(t)] = document.getElementById(t)
						}));
					const I = 2 * Math.PI,
						C = Math.PI / 2,
						b = [
							[.19, 1, .22, 1],
							[.19, 1, .22, 1],
							[.19, 1, .22, 1],
							[0, 1.3, .3, 1.01],
							[.02, .28, .31, 1],
							[.24, .98, .32, 1],
							[0, 1, 3, 1.001]
						],
						R = (M.spinner.animate, window.matchMedia("(prefers-reduced-motion: reduce)").matches),
						B = {
							maxNumberOfPins: 60,
							spinnerValues: [],
							sound: !1,
							sectorAngle: 0,
							pinRadiansWithTickerOffset: [],
							extraRotations: 3,
							timingFunction: b[0],
							spinDuration: 5e3,
							winningRadian: 0,
							currentAngle: 0,
							winner: "",
							isSpinning: !1
						},
						z = () => {
							B.spinnerValues = S(), P(), M.resetWheel.disabled = !0, M.removeButton.disabled = !0, F(B.spinnerValues)
						},
						P = () => {
							const t = d(B.spinnerValues);
							M.spinner.innerHTML = t;
							const e = B.spinnerValues.length;
							B.sectorAngle = I / e, B.pinRadiansWithTickerOffset = V(e, B.maxNumberOfPins), M.spinnerInner = document.getElementById(
								"spinner-inner"), M.ticker = document.getElementById("ticker")
						},
						S = () => M.list.value.split("\n").filter((t => t.trim())).map((t => t.trim())),
						V = (t, e) => {
							let n = [],
								i = Math.min(t, e),
								r = I / i;
							for (let t = 0; t < i; t++) n.push(r * t);
							return n.map((t => p(t - C)))
						},
						E = (t, e) => {
							M.spinnerInner.style.transitionTimingFunction = `cubic-bezier(${t.join(",")})`, M.spinnerInner.style.transitionProperty =
								"transform", M.spinnerInner.style.transitionDuration = e / 1e3 + "s"
						},
						O = {
							startTimestamp: null,
							lastTimestamp: null,
							down: !0
						},
						A = t => {
							O.startTimestamp || (O.startTimestamp = t), O.lastTimestamp || (O.lastTimestamp = t);
							const e = t - O.startTimestamp,
								n = y(M.spinnerInner);
							q(n) ? (M.ticker.style.transform = "translateY(-3px)", O.down && B.sound && $(), O.down = !1) : t - O.lastTimestamp >
								20 && (M.ticker.style.transform = "translateY(0)", O.down = !0), e < B.spinDuration ? window.requestAnimationFrame(
									A) : O.startTimestamp = null
						},
						q = t => B.pinRadiansWithTickerOffset.some((e => u(t, e - .05, e + .05))),
						L = t => {
							M.tada.classList.add("highlight"), M.tadaText.textContent = t, M.removeName.textContent = t, M.removeButton.disabled = !
								1, setTimeout((() => {
									M.tada.classList.remove("highlight")
								}), 2e3)
						},
						F = t => {
							const e = t.map((t => encodeURIComponent(t))).join("+");
							k("?values=" + e)
						},
						Y = () => {
							M.tadaText.textContent = "", M.removeButton.disabled = !0, M.removeName.textContent = "winner"
						};
					let j = "";
					(() => {
						const t = x();
						t && t.values && (M.list.value = t.values.join("\n"), document.getElementById("show-more").checked = !1)
					})(), z(), M.form.addEventListener("submit", (t => {
						t && t.preventDefault();
						let e = new FormData(form),
							n = {};
						for (let [t, i] of e.entries()) n[t] = i;
						B.sound = n.sound || !1, (() => {
							if (B.isSpinning) return;
							B.isSpinning = !0, Y(), B.spinDuration = R ? 0 : 1e3 * g(5, 7), B.timingFunction = m(b), B.winningRadian =
								Math.random() * Math.PI * 2, B.extraRotations = g(3, 4), E(B.timingFunction, B.spinDuration);
							const t = B.extraRotations * I,
								e = B.winningRadian + t,
								n = Math.floor(p(-e - C) / B.sectorAngle);
							B.winner = B.spinnerValues[n], M.spinnerInner.style.transform = `rotate(${e}rad) translateZ(0)`, B.currentAngle =
								p(e), window.requestAnimationFrame(A), setTimeout((() => {
									B.isSpinning = !1, M.spinnerInner.style.transitionDuration = "0s", M.spinnerInner.style.transform =
										`rotate(${B.currentAngle}rad) translateZ(0)`, L(B.winner)
								}), B.spinDuration)
						})()
					})), M.list.addEventListener("input", (t => {
						(t => {
							let e = t.target.value;
							e.length > j.length + 5 && (e = T(e), t.target.value = e), j = e
						})(t), z()
					})), M.removeButton.addEventListener("click", (() => {
						let t = B.spinnerValues.indexOf(B.winner);
						B.spinnerValues.splice(t, 1), P(), M.resetWheel.disabled = !1, M.removeButton.disabled = !0
					})), M.resetWheel.addEventListener("click", z);
					M.sound.addEventListener("change", (t => {
						t.target.checked && $()
					}));
					return {}
				}();