import test from "node:test";
import assert from "node:assert/strict";
import { setupPageMotion } from "../src/lib/page-motion.js";

function fixture(reduced = false) {
  const observers = [];
  const listeners = new Map();
  const animations = [];
  const target = {
    contains: () => false,
    matches: () => false,
    animate: (frames, options) => {
      const animation = {
        frames, options, cancelled: false,
        cancel() { this.cancelled = true; },
        finished: new Promise(() => {}),
      };
      animations.push(animation);
      return animation;
    },
  };
  const preference = {
    matches: reduced,
    addEventListener: (_, callback) => listeners.set("preference", callback),
    removeEventListener: () => listeners.delete("preference"),
  };
  const root = {
    ownerDocument: { activeElement: null },
    querySelectorAll: () => [target],
    addEventListener: (_, callback) => listeners.set("focus", callback),
    removeEventListener: () => listeners.delete("focus"),
  };
  const environment = {
    matchMedia: () => preference,
    IntersectionObserver: class {
      constructor(callback) {
        this.callback = callback;
        this.observed = new Set();
        observers.push(this);
      }
      observe(target) { this.observed.add(target); }
      unobserve(target) { this.observed.delete(target); }
      disconnect() { this.observed.clear(); }
    },
  };
  const reveal = (isIntersecting = true) => observers.at(-1).callback([{ target, isIntersecting }]);
  return { root, target, preference, environment, observers, listeners, animations, reveal };
}

test("only visible blocks animate, once, without hiding content or holding final styles", () => {
  const f = fixture();
  setupPageMotion(f.root, f.environment);
  f.reveal(false);
  assert.equal(f.animations.length, 0);
  f.reveal(); f.reveal();
  assert.equal(f.animations.length, 1);
  assert.equal(f.observers[0].observed.size, 0);
  assert.ok(f.animations[0].frames.every((frame) => Object.keys(frame).join() === "transform"));
  assert.equal(f.animations[0].options.fill, undefined);
});

test("reduced motion initially skips observation and animations", () => {
  const f = fixture(true);
  setupPageMotion(f.root, f.environment);
  assert.equal(f.observers.length, 0);
  assert.equal(f.animations.length, 0);
});

test("changing motion preference immediately cancels active motion and never replays seen blocks", () => {
  const f = fixture();
  setupPageMotion(f.root, f.environment);
  f.reveal();
  f.preference.matches = true;
  f.listeners.get("preference")();
  assert.equal(f.animations[0].cancelled, true);
  assert.equal(f.observers[0].observed.size, 0);
  f.preference.matches = false;
  f.listeners.get("preference")();
  assert.equal(f.observers.at(-1).observed.size, 0);
});

test("keyboard focus cancels movement and skips animation of focused blocks", () => {
  const f = fixture();
  setupPageMotion(f.root, f.environment);
  f.reveal();
  f.listeners.get("focus")({ target: { closest: () => f.target } });
  assert.equal(f.animations[0].cancelled, true);
  const g = fixture();
  g.target.contains = () => true;
  setupPageMotion(g.root, g.environment);
  g.reveal();
  assert.equal(g.animations.length, 0);
});

test("direct section targets do not move", () => {
  const f = fixture();
  f.target.matches = () => true;
  setupPageMotion(f.root, f.environment);
  f.reveal();
  assert.equal(f.animations.length, 0);
});

test("cleanup removes all listeners, observation and active animation", () => {
  const f = fixture();
  const cleanup = setupPageMotion(f.root, f.environment);
  f.reveal(); cleanup();
  assert.equal(f.listeners.size, 0);
  assert.equal(f.observers[0].observed.size, 0);
  assert.equal(f.animations[0].cancelled, true);
});

test("missing browser features leave content alone", () => {
  const f = fixture();
  assert.doesNotThrow(() => setupPageMotion(f.root, {})());
  delete f.target.animate;
  setupPageMotion(f.root, f.environment);
  assert.doesNotThrow(f.reveal);
  assert.equal(f.animations.length, 0);
});
